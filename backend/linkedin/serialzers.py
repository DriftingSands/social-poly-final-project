from rest_framework import serializers
from .models import LinkedInPost


class LinkedInPostSerializer(serializers.ModelSerializer):

    class Meta:
        model = LinkedInPost
        fields = ['id', 'content', 'link', 'image', 'author', 'created', 'updated', 'post_date_time']
        read_only_fields = ['author']
