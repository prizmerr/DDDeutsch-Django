from django.http import HttpResponse, JsonResponse
from django.db import Error
from django.contrib.auth.models import User
from datetime import datetime, timedelta, timezone
from ..models import WordsStat, MainWord, UserStat
from django.contrib.auth import authenticate, login, logout
from json import loads

def saveWord(req):
    tableId = req.POST.get("tableId")
    word = loads(req.POST.get("word"))  # word, article, translate, transcription, example, word_id
    if word["word_id"] == "":
        WordsStat.objects.create(word=word["word"], article=word["article"], translate=word["translate"], transcription=word["transcription"], 
                                 example=word["example"], table_id=tableId, user_id=req.user.id)
    else:
        WordsStat.objects.filter(id=word["word_id"], user_id=req.user.id, table_id=tableId).update(word=word["word"], article=word["article"], translate=word["translate"], 
                                                            transcription=word["transcription"], example=word["example"])
    return HttpResponse("success")

def deleteWord(req):
    tableId = req.POST.get("tableId")
    user_id = req.user.id
    wordId = req.POST.get("wordId")
    WordsStat.objects.filter(id=wordId, user_id=user_id, table_id=tableId).delete()
    return HttpResponse("success")

def createList(req):
    id = req.user.id
    name = req.POST.get("name")
    wordsListsNames = UserStat.objects.get(user_id=id).wordsListsNames
    if name in wordsListsNames.split(";"):
        return HttpResponse("exists")
    names = wordsListsNames + f";{name}"
    UserStat.objects.filter(user_id=id).update(wordsListsNames=names)
    return HttpResponse("success")

def deleteList(req):
    password = req.POST.get("pass")
    listId = int(req.POST.get("listId"))
    id = req.user.id
    user = authenticate(username=req.user.username, password=password)
    if user != None:
        wordsListsNames = UserStat.objects.get(user_id=id).wordsListsNames
        wordsLists = wordsListsNames.split(";")
        listName = wordsLists[listId]
        wordsListsNames = wordsListsNames.replace(f";{listName}", "", 1)
        UserStat.objects.filter(user_id=id).update(wordsListsNames=wordsListsNames)
        WordsStat.objects.filter(user_id=id, table_id=listId).delete()
        return HttpResponse("success")
    else:
        return HttpResponse("wrongPass")
    
def renameList(req):
    listId = int(req.POST.get("listId"))
    newName = req.POST.get("name")
    id = req.user.id
    wordsListsNames = UserStat.objects.get(user_id=id).wordsListsNames
    wordsLists = wordsListsNames.split(";")
    if newName in wordsLists:
        return HttpResponse("exists")
    listName = wordsLists[listId]
    wordsListsNames = wordsListsNames.replace(f";{listName}", f";{newName}", 1)
    UserStat.objects.filter(user_id=id).update(wordsListsNames=wordsListsNames)
    return HttpResponse("success")