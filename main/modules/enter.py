from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.models import User
from datetime import timedelta

def startPage(req):
    if req.user.is_authenticated:
        return HttpResponseRedirect("/study/profile/")
    else:
        return HttpResponseRedirect("/enter/")
    
def enterPage(req):
    if req.user.is_authenticated:
        return HttpResponseRedirect("/study/profile/")
    else:
        return render(req, "login.html")
    
def setCookie(req):
    res = HttpResponse('')
    res.set_cookie('cookie', 'true', timedelta(hours=24*30), None)
    return res

def registerPage(req):
    if req.user.is_authenticated:
        return HttpResponseRedirect("/study/profile/")
    else:
        return render(req, "register.html")