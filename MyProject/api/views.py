import json

from django.shortcuts import render
from rest_framework import status

from .models import Xss
from .serializers import XssSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from .scan import scan_xss
# Create your views here.

class XssAPIView(APIView):
    def get(self, request):
        xss_s = Xss.objects.all()
        serializers = XssSerializer(xss_s, many = True)
        return Response(serializers.data)

    def put(self, request):
        data = json.loads(request.body)
        url = data["url"]
        #url = "https://xss-game.appspot.com/level1/frame"
        vulnerable = scan_xss(url)
        try:
            newXss = Xss.objects.get(url = url)
            newXss.vulnerable = vulnerable
        except:
            newXss = Xss(url=url, vulnerable=vulnerable)
        newXss.save()
        serializers = XssSerializer(newXss)
        # if serializers.is_valid():
        #     serializers.save()
        return Response(serializers.data, status=status.HTTP_201_CREATED)
        # return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
