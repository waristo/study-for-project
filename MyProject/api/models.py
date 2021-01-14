from django.db import models


class Xss(models.Model):
    url = models.URLField(max_length=100)
    detail = models.JSONField(max_length=300)

    def __str__(self):
        return self.url