from django.db import models


class Quote(models.Model):
    quote = models.CharField(max_length=200)
    author = models.CharField(max_length=50)

    def __str__(self):
        return self.text
