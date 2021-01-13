from rest_framework import serializers
from .models import xss


class xssSerializer(serializers.ModelSerializer):
    class Meta:
        model = xss
        fields = ('url', 'form')