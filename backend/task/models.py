from django.db import models


class Task(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)
    user = models.CharField(max_length=120)

    def _str_(self):
        return self.title


class User(models.Model):
    first = models.CharField(max_length=120)
    last = models.CharField(max_length=120)

    def _str_(self):
        return self.first + " " + self.last
