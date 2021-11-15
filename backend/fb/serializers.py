from rest_framework import serializers

from fb.models import FacebookPost


class FacebookSerializer(serializers.ModelSerializer):

    class Meta:
        model = FacebookPost
        fields = ['id', 'title', 'content', 'created', 'updated', 'author', 'send_time', 'images']
        read_only_fields = ['author']
