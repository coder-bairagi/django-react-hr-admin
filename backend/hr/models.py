from django.db import models
from datetime import date
from django.contrib.auth.models import User

class IdentificationType(models.Model):
    id = models.AutoField
    type = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Departments(models.Model):
    id = models.AutoField
    name = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class JobPositions(models.Model):
    id = models.AutoField
    name = models.CharField(max_length=40)
    department = models.ForeignKey(Departments, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Interviews(models.Model):
    id = models.AutoField
    datetime = models.DateTimeField()
    candidate_first_name = models.CharField(max_length=50)
    candidate_last_name = models.CharField(max_length=100)
    interviewer_first_name = models.CharField(max_length=50)
    interviewer_last_name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Countries(models.Model):
    id = models.AutoField
    iso = models.CharField(max_length=2) 
    name = models.CharField(max_length=80)
    nicename = models.CharField(max_length=80)
    iso3 = models.CharField(max_length=3, null=True, blank=True)
    numcode = models.CharField(max_length=6, null=True, blank=True)
    phonecode = models.CharField(max_length=5)

class Employees(models.Model):
    id = models.AutoField
    contact = models.CharField(max_length=15)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    country = models.ForeignKey(Countries, on_delete=models.CASCADE)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    job_position = models.ForeignKey(JobPositions, on_delete=models.CASCADE)
    working_from = models.DateField(default=date.today)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)