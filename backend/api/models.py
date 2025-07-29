from django.db import models
from django.contrib.auth.models import User

class Article(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    title = models.CharField(max_length=255)
    summary = models.TextField()
    content = models.TextField()
    url = models.URLField()
    topic = models.CharField(max_length=100)
    published_at = models.DateTimeField()
