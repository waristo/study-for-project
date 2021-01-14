from django.urls import path
from .views import XssAPIView


urlpatterns = [
    path('xss/', XssAPIView.as_view())
]