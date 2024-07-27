from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from hr import views

urlpatterns = [
    # Below are API end-points
    # JWT
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    # Auth Related Routes [sign-in, forgot-password]
    path('sign-in', views.sign_in),
    path('logout', views.logout),
    # Departments
    path('get-departments/totalrowcounts', views.get_departments_totalrowcounts),
    path('get-departments', views.get_departments),
    path('add-department', views.add_department),
    path('update-department', views.update_department),
    path('delete-department/<int:pk>', views.delete_department),
    # Add Job Position
    path('get-job-positions/totalrowcounts', views.get_job_positions_totalrowcounts),
    path('get-job-positions', views.get_job_positions),
    path('add-job-position', views.add_job_position),
    path('update-job-position', views.update_job_position),
    path('delete-job-position/<int:pk>', views.delete_job_position),
    # Employees
    path('get-employees/totalrowcounts', views.get_employees_totalrowcounts),
    path('get-employees', views.get_employees),
    path('get-employee/<int:pk>', views.get_one_employee),
    path('toogle-employee-status', views.toogle_employee_status),
    path('add-employee', views.add_employee),
    # Add Identification Type
    path('add-identification-type', views.add_identification_type),
    # Add Countries
    path('get-countries', views.get_countries),
]
