from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from . import models
from . import serializers
from . import helper

# SignIn
# Work of SignUp is done by add_employee function
@api_view(['POST'])
def sign_in(request):
    if request.method == 'POST':
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, email=email, password=password)

        if user is None:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            if not User.objects.get(email=email).is_active:
                return Response({'error': 'Account deactivated. Please contact Stark Industries for more information'}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                login(request, user)
                job_position_id = models.Employees.objects.filter(user_id=user.id).values_list("job_position",  flat=True).first()
                job_position = models.JobPositions.objects.filter(pk=job_position_id).values_list("name",   flat=True).first()
                # Get jwt access and refresh tokens
                token = helper.get_tokens_for_user(user)
                return Response({
                    "message": 'Sign-in successful',
                    "user": {
                        "id": user.id,
                        "first_name": user.first_name,
                        "last_name": user.last_name,
                        "is_active": user.is_active,
                    },
                    "employee": {
                        "job_position": job_position,
                    },
                    "token": {
                        "access": token["access"],
                        "refresh": token["refresh"],
                    }
                }, status=status.HTTP_200_OK)
    return Response({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        refresh_token = request.data.get("refresh")
        if not refresh_token:
            return Response({"error": "Refresh token is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Blacklist the refresh token
        token = RefreshToken(refresh_token)
        token.blacklist()

        return Response({"message": "Logout successful"}, status=status.HTTP_205_RESET_CONTENT)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

# Departments
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_departments(request):
    try:
        page = int(request.GET.get("p")) if request.GET.get("p") else None
        pagesize = int(request.GET.get("ps")) if request.GET.get("ps") else None
    except ValueError:
        return Response({"error": "Invalid page or page size"}, status=400)

    if page is None and pagesize is None:
        # Return all data if page and pageSize doesn't received in query-param
        departments = models.Departments.objects.all()
    else:
        start_index, end_index = helper.get_row_range(page, pagesize)
        departments = models.Departments.objects.all()[start_index:end_index]
    total_rows_fetched = departments.count()
    serializer = serializers.DepartmentsSerializer(departments, many=True)
    return Response({
        "count": total_rows_fetched,
        "rows": serializer.data
    })

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_departments_totalrowcounts(request):
    total_rows = models.Departments.objects.all().count()
    return Response({
        "count": total_rows,
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_department(request):
    serializer = serializers.DepartmentsSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_department(request):
    id = request.data.get("id")
    dep_name = request.data.get("name")
    try:
        department = models.Departments.objects.get(pk=id)
    except models.Departments.DoesNotExist:
        return Response({"error": "Department not found."}, status=status.HTTP_404_NOT_FOUND)

    serializer = serializers.DepartmentsSerializer(department, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Department updated successfully.", "department": serializer.data}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_department(request, pk):
    id = pk
    if not id:
        return Response({"error": "No IDs provided."}, status=status.HTTP_400_BAD_REQUEST)
        
    department = models.Departments.objects.filter(pk=id)
    if not department.exists():
        return Response({"error": "No departments found with the given ID."}, status=status.HTTP_404_NOT_FOUND)
    
    count, _ = department.delete()
    
    return Response({"message": f"{count} department deleted successfully."}, status=status.HTTP_200_OK)

# Employees
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_employees(request):
    try:
        page = int(request.GET.get("p"))
        pagesize = int(request.GET.get("ps"))
    except ValueError:
        return Response({"error": "Invalid page or page size"}, status=400)

    start_index, end_index = helper.get_row_range(page, pagesize)
    users = User.objects.all().order_by("-id")[start_index:end_index]
    total_rows_fetched = users.count()
    serializer = serializers.UserSerializer(users, many=True)
    return Response({
        "count": total_rows_fetched,
        "rows": serializer.data
    })

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_one_employee(request, pk):
    user = User.objects.get(pk=pk)
    employee = models.Employees.objects.get(user=pk)

    user_serializer = serializers.UserSerializer(user)
    employee_serializer = serializers.EmployeesSerializer(employee)
    return Response({
        "employee": {**user_serializer.data, **employee_serializer.data}
    })

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_employees_totalrowcounts(request):
    total_rows = models.Employees.objects.all().count()
    return Response({
        "count": total_rows,
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_employee(request):
    email = request.data.get("email")
    if request.method == 'POST':
        # Check if user already exist
        if User.objects.filter(email=email).exists():
            return Response({"error": "Email already exists"}, status=status.HTTP_409_CONFLICT)
        # if not then -> adding the user and create employee profile
        else:
            User.objects.create_user(
                email = email,
                password = request.data.get("password"),
                first_name = request.data.get("first_name"),
                last_name = request.data.get("last_name"),
                username = request.data.get("contact"),
                is_superuser = False,
                is_staff = True,
                is_active = True,
            )
            user_data = User.objects.get(email=email)
            serializer = serializers.EmployeesSerializer(data={
                "contact": request.data.get("contact"),
                "job_position": request.data.get("job_position"),
                "address": request.data.get("address"),
                "city": request.data.get("city"),
                "postal_code": request.data.get("postal_code"),
                "state": request.data.get("state"),
                "country": request.data.get("country"),
                "working_from": request.data.get("working_from").replace("/", "-"),
                "user": user_data.id,
            })
            if serializer.is_valid():
                serializer.save()
                return Response({
                    "message": "Employee created successfully",
                    "user": {
                        "id": user_data.id,
                        "first_name": user_data.first_name,
                        "last_name": user_data.last_name,
                        "last_name": user_data.last_name,
                    },
                    "employee": {
                        "job_position": models.JobPositions.objects.get(id=request.data.get("job_position")).name
                    },
                }, status=status.HTTP_201_CREATED)
            user_data.delete()
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def toogle_employee_status(request):
    id = int(request.data.get("id"))
    if not id:
        return Response({"error": "No IDs provided."}, status=status.HTTP_400_BAD_REQUEST)
        
    user = User.objects.get(pk=id)
    if not user:
        return Response({"error": "No user found with the given ID."}, status=status.HTTP_404_NOT_FOUND)
    
    is_active = not user.is_active
    serializer = serializers.UserSerializer(user, data={"is_active": is_active}, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User status changed successfully"}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Identification Types
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_identification_type(request):
    if request.method == 'POST':
        serializer = serializers.IdentificationTypeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Job Positions
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_job_position(request):
    if request.method == 'POST':
        serializer = serializers.JobPositionsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_job_positions_totalrowcounts(request):
    total_rows = models.JobPositions.objects.all().count()
    return Response({
        "count": total_rows,
    })

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_job_positions(request):
    try:
        page = int(request.GET.get("p")) if request.GET.get("p") else None
        pagesize = int(request.GET.get("ps")) if request.GET.get("ps") else None
    except ValueError:
        return Response({"error": "Invalid page or page size"}, status=400)

    if page is None and pagesize is None:
        # Return all data if page and pageSize doesn't received in query-param
        job_positions = models.JobPositions.objects.all()
    else:
        start_index, end_index = helper.get_row_range(page, pagesize)
        job_positions = models.JobPositions.objects.all()[start_index:end_index]
    total_rows_fetched = job_positions.count()
    serializer = serializers.JobPositionsSerializer(job_positions, many=True)
    return Response({
        "count": total_rows_fetched,
        "rows": serializer.data
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_job_position(request):
    id = request.data.get("id")
    try:
        job_position = models.JobPositions.objects.get(pk=id)
    except models.JobPositions.DoesNotExist:
        return Response({"error": "Job position not found."}, status=status.HTTP_404_NOT_FOUND)

    serializer = serializers.JobPositionsSerializer(job_position, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Job position updated successfully.", "job_position": serializer.data}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_job_position(request, pk):
    id = pk
    if not id:
        return Response({"error": "No IDs provided."}, status=status.HTTP_400_BAD_REQUEST)
        
    job_position = models.JobPositions.objects.filter(pk=id)
    if not job_position.exists():
        return Response({"error": "No Job Position found with the given ID."}, status=status.HTTP_404_NOT_FOUND)
    
    count, _ = job_position.delete()
    
    return Response({"message": f"{count} Job Position deleted successfully."}, status=status.HTTP_200_OK)

# Countries
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_countries(request):
    countries = models.Countries.objects.all()
    total_rows_fetched = countries.count()
    serializer = serializers.CountriesSerializer(countries, many=True)
    return Response({
        "count": total_rows_fetched,
        "rows": serializer.data
    })