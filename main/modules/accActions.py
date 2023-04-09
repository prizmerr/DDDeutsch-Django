import logging
from django.http import HttpResponse, JsonResponse
from django.db import Error
from django.contrib.auth.models import User
from datetime import datetime, timedelta, timezone
from ..models import WordsStat, MainWord, UserStat
from django.contrib.auth import authenticate, login, logout

logger = logging.getLogger(__name__)

def tryToRegister(req):
    usname = req.POST.get("login", "undef")
    password = req.POST.get("password", "undef")
    email = req.POST.get("email", "undef")
    if usname == "undef" or password == "undef" or email == "undef":
        return HttpResponse("error")
    try:
        if User.objects.filter(username=usname).count() != 0:
            return HttpResponse("loginExists")
        if User.objects.filter(email=email).count() != 0 or email == "dddeutsch.help@gmail.com":
            return HttpResponse("emailExists")
        user = User.objects.create_user(usname, email, password)
        user.save()

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
    except Error as err:
        logger.error(err)
        return HttpResponse("error")

def logOut(req):
    try:
        logout(req)
    except Exception as ex:
        logger.error(ex)
    finally:
        return HttpResponse("/")

def logIn(req):
    try:
        name = req.POST.get("login")
        password = req.POST.get("password")
        user = authenticate(req, username=name, password=password)
        if user is not None:
            login(req, user)
            return HttpResponse("logged")
        else:
            return HttpResponse("notFound")
    except Exception as ex:
        logger.error(ex)
        return HttpResponse("error")
    
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
        return JsonResponse({"0":list(map(int, repeats))})
    else:
        return HttpResponse("unlogged")

def getUserInfo(req):
    try:
        id = req.user.id
        user = User.objects.get(id=id)
        return HttpResponse(f"{user.username};{user.email}")
    except Error as err:
        logger.error(err)
        return HttpResponse("error")
    except Exception as ex:
        logger.error(ex)
        return HttpResponse("error")

def changePass(req):
    if req.POST.get("key") == None:
        try:
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
        except Exception as ex:
            logger.error(ex)
            return HttpResponse("error")
    else:
        try:
            newPass = req.POST.get("newPass")
            id = req.POST.get("id")
            user = User.objects.get(id=id)
            user.set_password(newPass)
            user.save()
            return HttpResponse("success")
        except Exception as ex:
            logger.error(ex)
            return HttpResponse("error")
    
def getLogin(req):
    try:
        return HttpResponse(req.user.username)
    except Exception as ex:
        logger.error(ex)
        return HttpResponse("error")

def deleteAcc(req):
    try:
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
    except Error as err:
        logger.error(err)
        return HttpResponse("error")
    except Exception as ex:
        logger.error(ex)
        return HttpResponse('error')
    
def changeEmail(req):
    try:
        newEmail = req.POST.get("newEmail")
        id = req.user.id
        User.objects.filter(id=id).update(email=newEmail)
        return HttpResponse("success")
    except Exception as ex:
        logger.error(ex)
        return HttpResponse("error")

def getUserStats(req):
    try:
        id = req.user.id
        stats = UserStat.objects.get(user_id=id)
        wordsListsNames = stats.wordsListsNames.split(";")
        wordsBeingStudied = stats.wordsBeingStudied
        repeatsInWeek = list(map(int, stats.repeatsInWeek))
        wordsLists = []
        for i in range(len(wordsListsNames)):
            wordsLists.append(list(WordsStat.objects.filter(table_id=i, user_id=id).values()))
        return JsonResponse({"wordsListsNames":wordsListsNames, "wordsBeingStudied":wordsBeingStudied, 
                             "wordsLists":wordsLists, "repeatsInWeek":repeatsInWeek})
    except Error as err:
        logger.error(err)
        return HttpResponse("error")
    except Exception as ex:
        logger.error(ex)
        return HttpResponse("error")