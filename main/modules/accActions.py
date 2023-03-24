from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.db import Error
from django.contrib.auth.models import User
from datetime import timedelta
from ..models import WordsStat, MainWord, UserStat
from django.contrib.auth import authenticate, login, logout

def tryToRegister(req):
    usname = req.POST.get("login", "undef")
    password = req.POST.get("password", "undef")
    email = req.POST.get("email", "undef")
    if usname == "undef" or password == "undef" or email == "undef":
        return HttpResponse("error")
    if User.objects.filter(username=usname).count() != 0:
        return HttpResponse("loginExists")
    if User.objects.filter(email=email).count() != 0:
        return HttpResponse("emailExists")
    try:
        user = User.objects.create_user(usname, email, password)
        user.save()
        try:
            id = user.id
            newStat = UserStat.objects.create(user_id=id)
            newStat.save()
            insertWords = []
            words = MainWord.objects.all()
            for word in words:
                insertWords.append(WordsStat(user_id=id, word=word.word, article=word.article, \
                                             example = word.example, translate=word.translate, transcription=word.transcription))
            bulk = WordsStat.objects.bulk_create(insertWords)
            authUser = authenticate(req, username=usname, password=password)
            login(req, authUser)
            return HttpResponse("saved")
        except Error:
            return HttpResponse("error")
    except Error:
        return HttpResponse("error")

def logOut(req):
    logout(req)
    return HttpResponseRedirect("/")

def logIn(req):
    name = req.POST.get("login")
    password = req.POST.get("password")
    user = authenticate(req, username=name, password=password)
    if user is not None:
        login(req, user)
        return HttpResponse("logged")
    else:
        return HttpResponse("notFound")