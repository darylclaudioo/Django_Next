from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
import openpyxl
from django.http import HttpResponse
from .models import JobVacancy
from .serializers import JobvacanctSerializer
from .scraper import scrape_jobstreet

# Create your views here.
@api_view(['GET'])
def get_all_job(request):
    job = JobVacancy.objects.all()
    serializer = JobvacanctSerializer(job, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_job_by_id(request, id):
    try:
        job = JobVacancy.objects.get(pk=id)
    except JobVacancy.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = JobvacanctSerializer(job)
    return Response(serializer.data)


@api_view(['GET'])
def get_jobs_by_keyword(request, keyword):
    jobs = JobVacancy.objects.filter(keyword__icontains=keyword)  # Filter by keyword
    if jobs.exists():
        serializer = JobvacanctSerializer(jobs, many=True)
        return Response(serializer.data)
    else:
        return Response({"message": "No jobs found for the given keyword."}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def create_job(request):
    serializer = JobvacanctSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def edit_job(request, id):
    try:
        job = JobVacancy.objects.get(pk=id)
    except JobVacancy.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = JobvacanctSerializer(job, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_job(request, id):
    try:
        job = JobVacancy.objects.get(pk=id)
    except JobVacancy.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    job.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def scrape_jobs(request, keyword):
    try:
        jobs = scrape_jobstreet(keyword)
        
        for job_data in jobs:
            JobVacancy.objects.create(**job_data)
        
        return Response({"message": f"Successfully scraped and saved {len(jobs)} jobs for keyword: {keyword}"})
    except Exception as e:
        return Response({"error": str(e)}, status=500)
    
@api_view(['GET'])
def export_jobs_to_excel(request):
    # Create a new Excel workbook and worksheet
    workbook = openpyxl.Workbook()
    worksheet = workbook.active
    worksheet.title = 'Job Vacancies'

    # Add the headers to the worksheet
    headers = ['Title', 'Teaser', 'Company Name', 'Location', 'Work Type', 'Salary', 'Role', 'Keyword', 'Listing Date', 'Bullet Points']
    worksheet.append(headers)

    # Fetch all job vacancies from the database
    jobs = JobVacancy.objects.all()

    # Add the job data to the worksheet
    for job in jobs:
        worksheet.append([
            job.title,
            job.teaser,
            job.company_name,
            job.location,
            job.work_type,
            job.salary,
            job.role,
            job.keyword,
            job.listing_date,
            job.bullet_points
        ])

    # Create an HTTP response with the correct Excel content type
    response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response['Content-Disposition'] = 'attachment; filename="job_vacancies.xlsx"'

    # Save the workbook to the response
    workbook.save(response)

    return response