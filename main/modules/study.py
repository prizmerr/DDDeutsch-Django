from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.models import User
from datetime import timedelta

def profil(req):
    return render(req, "profil.html")