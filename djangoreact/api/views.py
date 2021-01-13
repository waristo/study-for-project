from django.shortcuts import render
from rest_framework import viewsets
from .serializers import xssSerializer
from .models import xss

class xssView(viewsets.ModelViewSet):
    serializer_class = xssSerializer
    queryset = xss.objects.all()