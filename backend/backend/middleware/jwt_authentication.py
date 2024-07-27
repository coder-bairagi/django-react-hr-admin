import jwt
from django.conf import settings
from django.http import JsonResponse

class JWTAuthenticationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
         # Define paths to bypass JWT authentication
        bypass_paths = [
            '/api/hr/',  # Root path for the browsable API interface
            '/api/hr/sign-in',  # Remove it before deploying api
            '/api/hr/add-employee',  # Remove it before deploying api
        ]
        
        # Get the current path
        current_path = request.path_info

        # Check if the current path should bypass JWT authentication
        if current_path not in bypass_paths:
            auth_header = request.headers.get('Authorization')
            if auth_header:
                try:
                    token = auth_header.split(' ')[1]
                    payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
                    request.user_id = payload.get('id')
                except jwt.ExpiredSignatureError:
                    return JsonResponse({"detail": "Token has expired"}, status=401)
                except jwt.InvalidTokenError:
                    return JsonResponse({"detail": "Invalid token"}, status=401)
            else:
                return JsonResponse({'message': 'Authorization header missing'}, status=401)
        
        response = self.get_response(request)
        return response
