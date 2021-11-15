from django.db import models
from user.models import User


def user_directory_path(instance, filename):
    return f'user/{instance.id}/{filename}'


class LinkedInPost(models.Model):
    content = models.TextField()
    link = models.TextField(blank=True, null=True)
    image = models.ImageField(blank=True, null=True)
    author = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name='linkedin_posts')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    post_date_time = models.CharField(max_length=255, blank=True, null=True)


