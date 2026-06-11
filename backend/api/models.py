from django.db import models

class Download(models.Model):
    url = models.URLField()
    format_id = models.CharField(max_length=20)
    status = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)