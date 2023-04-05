from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from datetime import timedelta

def startPage(req):
    if req.user.is_authenticated:
        return HttpResponseRedirect("/study/profil/")
    else:
        return HttpResponseRedirect("/enter/")
    
def enterPage(req):
    if req.user.is_authenticated:
        return HttpResponseRedirect("/study/profil/")
    else:
        return render(req, "login.html")
    
def setCookie(req):
    res = HttpResponse('')
    res.set_cookie('cookie', 'true', timedelta(hours=24*30), None)
    return res

def registerPage(req):
    if req.user.is_authenticated:
        return HttpResponseRedirect("/study/profil/")
    else:
        return render(req, "register.html")