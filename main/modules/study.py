from django.shortcuts import render

def profil(req):
    return render(req, "profil.html")

def stats(req):
    return render(req, "stats.html")

def learning(req):
    isDemo = req.GET.get("demo") != None
    return render(req, "learning.html", context={"demo":isDemo})