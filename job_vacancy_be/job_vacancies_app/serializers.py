from rest_framework import serializers
from .models import JobVacancy

class JobvacanctSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobVacancy
        fields = '__all__'