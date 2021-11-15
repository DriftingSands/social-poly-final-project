from rest_framework import serializers

from twitter.models import Tweet, Image


class TwitterSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tweet
        fields = ['id', 'title', 'content', 'created', 'updated', 'author', 'send_time', 'images']
        read_only_fields = ['author']

class ImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Image
        fields = ['id', 'name', 'image', 'length', 'width', 'default', 'tweet_to']
        read_only_fields = ['name']

