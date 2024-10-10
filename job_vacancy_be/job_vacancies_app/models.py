from django.db import models

class JobVacancy(models.Model):
    title = models.CharField(max_length=255)
    teaser = models.TextField(blank=True, null= True)
    company_name = models.CharField(max_length=255)
    location = models.CharField(max_length=255, blank=True, null=True)
    work_type = models.CharField(max_length=100, blank=True, null=True)
    salary = models.CharField(max_length=100, blank=True, null=True)
    role = models.CharField(max_length=255, blank=True, null=True)
    keyword = models.CharField(max_length=255, blank=True, null=True)
    listing_date = models.DateField(blank=True, null=True)
    bullet_points = models.TextField(blank=True, null= True)

    def __str__(self):
        return self.title