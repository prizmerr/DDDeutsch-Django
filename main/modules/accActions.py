from django.http import HttpResponse
from django.db import Error
from django.contrib.auth.models import User
from datetime import datetime, timedelta, timezone
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
    return HttpResponse("/")

def logIn(req):
    name = req.POST.get("login")
    password = req.POST.get("password")
    user = authenticate(req, username=name, password=password)
    if user is not None:
        login(req, user)
        return HttpResponse("logged")
    else:
        return HttpResponse("notFound")
    
def updateRepeats(req):
    id = req.user.id
    if id != None:
        tz = timezone(timedelta(hours=3))
        user = UserStat.objects.get(user_id=id)
        updated = user.updated.date()
        now = datetime.now(tz=tz)
        days = (now.date() - updated).days
        repeats = user.repeatsInWeek[days:]+[0 for _ in range(days)]
        UserStat.objects.filter(user_id=id).update(repeatsInWeek=repeats, updated=now)
        return HttpResponse("success")
    else:
        return HttpResponse("unlogged")

def getUserInfo(req):
    id = req.user.id
    user = User.objects.get(id=id)
    return HttpResponse(f"{user.username};{user.email}")

def changePass(req):
    if req.POST.get("key") == None:
        oldPass = req.POST.get("oldPass")
        newPass = req.POST.get("newPass")
        id = req.user.id
        user = authenticate(username=req.user.username, password=oldPass)
        if user != None:
            user = User.objects.get(id=id)
            user.set_password(newPass)
            user.save()
            return HttpResponse("success")
        else:
            return HttpResponse("wrongPass")
    else:
        newPass = req.POST.get("newPass")
        id = req.POST.get("id")
        user = User.objects.get(id=id)
        user.set_password(newPass)
        user.save()
        return HttpResponse("success")
    
def getLogin(req):
    return HttpResponse(req.user.username)

def deleteAcc(req):
    oldPass = req.POST.get("oldPass")
    user = authenticate(username=req.user.username, password=oldPass)
    id = req.user.id
    if user != None:
        UserStat.objects.get(user_id=id).delete()
        WordsStat.objects.filter(user_id=id).delete()
        User.objects.get(id=id).delete()
        return HttpResponse("/")
    else:
        return HttpResponse("wrongPass")
    
def changeEmail(req):
    newEmail = req.POST.get("newEmail")
    id = req.user.id
    User.objects.filter(id=id).update(email=newEmail)
    return HttpResponse("success")