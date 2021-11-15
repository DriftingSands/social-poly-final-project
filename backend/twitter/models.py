from django.db import models
from user.models import User

# def get_upload_path(instance, filename):
#     model = instance.model.__class__._meta
#     name = model.verbose_name_plural.replace(' ', '_')
#     return f'{name}/images/{filename}'


class Tweet(models.Model):
    title = models.CharField(max_length=255, blank=True)
    content = models.TextField()
    author = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name='tweets')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    send_time = models.CharField(max_length=250, blank=True)
    images = models.ImageField(blank=True)

    class Meta:
        verbose_name_plural = "Tweets"

    def __str__(self):
        return f'Id {self.id} -- ' \
               f'{self.title}'


class Image(models.Model):
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='images/')
    default = models.BooleanField(default=False)
    width = models.FloatField(default=100)
    length = models.FloatField(default=100)
    tweet_to = models.ForeignKey(to=Tweet, on_delete=models.CASCADE)

