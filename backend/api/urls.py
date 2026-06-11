from django.urls import path
from .views import (
    video_info,
    start_download
)

urlpatterns = [
    path("info/", video_info),
    path("download/",start_download),
]