from django.contrib import admin
from .models import UserStat, WordsStat, MainWord

admin.site.register(UserStat)
admin.site.register(WordsStat)
admin.site.register(MainWord)