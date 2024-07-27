from django.contrib.auth import get_user_model
from django.contrib.auth.backends import BaseBackend
from django.db.models import Q

class EmailAuth(BaseBackend):
    def authenticate(self, request, email=None, password=None):
        User = get_user_model()
        try:
            # Check if the user exists with the given email or username
            user = User.objects.get(Q(email=email))
        except User.DoesNotExist:
            return None

        # Verify the password
        if user.check_password(password):
            return user
        return None

    def get_user(self, user_id):
        User = get_user_model()
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
