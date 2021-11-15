from rest_framework import serializers

from draft.models import Draft


class DraftSerializer(serializers.ModelSerializer):

    class Meta:
        model = Draft
        fields = ['id', 'title', 'content', 'created', 'updated', 'author', 'image', 'send_time', 'is_twitter',
                  'is_linkedin', 'is_facebook', 'is_tiktok', 'is_instagram']
        read_only_fields = ['author']