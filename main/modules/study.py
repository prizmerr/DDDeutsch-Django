from django.shortcuts import render

def profil(req):
    return render(req, "profil.html")

def stats(req):
    return render(req, "stats.html")

def learning(req):
    return render(req, "learning.html")