from django.db import models


class xss(models.Model):
    url = models.URLField()
    form = models.JSONField()

    def __str__(self):
        return self.url
