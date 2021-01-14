from django.shortcuts import render
from rest_framework import status

from .models import Xss
from .serializers import XssSerializer
from rest_framework.response import Response
from rest_framework.views import APIView

# Create your views here.

class XssAPIView(APIView):
    def get(self, request):
        xss_s = Xss.objects.all()
        serializers = XssSerializer(xss_s, many = True)
        return Response(serializers.data)

    def post(self, request):
        serializers = XssSerializer(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
