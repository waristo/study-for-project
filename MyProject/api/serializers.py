from rest_framework import serializers
from .models import Xss


class XssSerializer(serializers.ModelSerializer):
    class Meta:
        model = Xss
        fields = ['url', 'detail']