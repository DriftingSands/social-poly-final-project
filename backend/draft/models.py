from django.db import models
from user.models import User


class Draft(models.Model):
    title = models.CharField(max_length=255, blank=True)
    content = models.TextField()
    author = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name='drafts')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    image = models.ImageField(blank=True)
    send_time = models.CharField(max_length=255, blank=True, null=True)
    is_twitter = models.BooleanField(null=True)
    is_linkedin = models.BooleanField(null=True)
    is_facebook = models.BooleanField(null=True)
    is_tiktok = models.BooleanField(null=True)
    is_instagram = models.BooleanField(null=True)

    def __str__(self):
        return f'Id {self.id} -- ' \
               f'{self.title}'