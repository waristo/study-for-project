from django.db import models


class Xss(models.Model):
    url = models.URLField(max_length=100)
    vulnerable = models.BooleanField()

    def __str__(self):
        return self.url