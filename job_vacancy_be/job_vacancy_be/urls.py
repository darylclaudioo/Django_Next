"""
URL configuration for job_vacancy_be project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from job_vacancies_app import views

urlpatterns = [
    path('job/', views.get_all_job, name='get_all_job'),
    path('job/<int:id>/', views.get_job_by_id, name='get_job_by_id'),
    path('job/create/', views.create_job, name='create_job'),
    path('job/edit/<int:id>/', views.edit_job, name='edit_job'),
    path('job/delete/<int:id>/', views.delete_job, name='delete_job'),
    path('admin/', admin.site.urls),
    path('scrape-jobs/<str:keyword>/', views.scrape_jobs, name='scrape_jobs'),
    path('job/<str:keyword>/', views.get_jobs_by_keyword, name='get_jobs_by_keyword'), 
    path('job/export/excel/', views.export_jobs_to_excel, name='export_jobs_to_excel'), 

]
