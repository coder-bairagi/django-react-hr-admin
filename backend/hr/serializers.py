from rest_framework import serializers
from django.contrib.auth.models import User
from . import models
from django.utils import timezone
from .helper import format_datetime

class IdentificationTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.IdentificationType
        fields = "__all__"

class DepartmentsSerializer(serializers.ModelSerializer):
    formatted_created_at = serializers.SerializerMethodField()
    formatted_updated_at = serializers.SerializerMethodField()

    class Meta:
        model = models.Departments
        fields = ["id", "name", "formatted_created_at", "formatted_updated_at"]

    def get_formatted_created_at(self, obj):
        return format_datetime(obj.created_at)

    def get_formatted_updated_at(self, obj):
        return format_datetime(obj.updated_at)

class JobPositionsSerializer(serializers.ModelSerializer):
    formatted_created_at = serializers.SerializerMethodField()
    formatted_updated_at = serializers.SerializerMethodField()
    department_name = serializers.SerializerMethodField()

    class Meta:
        model = models.JobPositions
        fields = "__all__"
    
    def get_formatted_created_at(self, obj):
        return format_datetime(obj.created_at)

    def get_formatted_updated_at(self, obj):
        return format_datetime(obj.updated_at)
    
    def get_department_name(self, obj):
        return obj.department.name if obj.department else None

class InterviewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Interviews
        fields = "__all__"

class CountriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Countries
        fields = ["id", "name", "nicename"]

class EmployeesSerializer(serializers.ModelSerializer):
    job_position_name = serializers.CharField(source='job_position.name', read_only=True)
    country_name = serializers.CharField(source='country.name', read_only=True)
    
    class Meta:
        model = models.Employees
        fields = "__all__"

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "first_name", "last_name", "email", "is_active"]

