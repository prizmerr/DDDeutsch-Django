from django.db import models
from django_mysql.models import ListCharField
from datetime import datetime

class UserStat(models.Model):
    user_id = models.SmallIntegerField(default=0)
    repeatsInWeek = ListCharField(
        base_field = models.CharField(max_length=3),
        size = 7,
        max_length = (3*9),
        default = [0,0,0,0,0,0,0]
    )
    wordsBeingStudied = models.SmallIntegerField(default=0)
    wordsListsNames = models.TextField(default="Основные слова")  # ";name"
    updated = models.DateTimeField(default=datetime.now())

class WordsStat(models.Model):
    user_id = models.SmallIntegerField(default=0)
    table_id = models.SmallIntegerField(default=0)
    word = models.CharField(max_length=32)
    article = models.CharField(max_length=3)
    example = models.TextField()
    translate = models.CharField(max_length=32)
    transcription = models.CharField(max_length=45)
    lastRepeat = models.DateTimeField(default=datetime.now())
    nextRepeat = models.DateTimeField(default=datetime.now())
    repeats = models.SmallIntegerField(default=0)

class MainWord(models.Model):
    table_id = models.SmallIntegerField()
    table_id.default = 0
    word = models.CharField(max_length=32)
    article = models.CharField(max_length=3)
    example = models.TextField()
    translate = models.CharField(max_length=32)
    transcription = models.CharField(max_length=45)
    repeats = models.SmallIntegerField()