from django.conf import settings
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils import timezone

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

def get_row_range(page, page_size):
    """
    Calculate the range of rows to fetch from the database based on pagination.

    Args:
    page (int): The current page number (0-indexed).
    page_size (int): The number of rows per page.

    Returns:
    tuple: A tuple containing the start and end index for the row range.
    """
    start_index = page * page_size
    end_index = start_index + page_size
    return start_index, end_index

def format_datetime(field):
    # Convert to local timezone
    local_time = field.astimezone(timezone.get_current_timezone())
    return local_time.strftime("%d-%m-%Y %I:%M %p")