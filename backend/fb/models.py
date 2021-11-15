from django.db import models
from user.models import User


class FacebookPost(models.Model):
    title = models.CharField(max_length=255, blank=True)
    content = models.TextField()
    author = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name='facebook_posts')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    send_time = models.CharField(max_length=250, blank=True)
    images = models.ImageField(blank=True)

    class Meta:
        verbose_name_plural = "Posts"

    def __str__(self):
        return f'Id {self.id} -- ' \
               f'{self.title}'
