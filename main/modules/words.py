import logging
from django.http import HttpResponse
from ..models import WordsStat, UserStat
from django.contrib.auth import authenticate
from json import loads, dumps
import datetime
from .accActions import updateRepeats
from django.db import Error

logger = logging.getLogger(__name__)

def saveWord(req):
    tableId = req.POST.get("tableId")
    word = loads(req.POST.get("word"))  # word, article, translate, transcription, example, word_id
    try:
        if word["word_id"] == "":
            WordsStat.objects.create(word=word["word"], article=word["article"], translate=word["translate"], transcription=word["transcription"], 
                                     example=word["example"], table_id=tableId, user_id=req.user.id)
        else:
            WordsStat.objects.filter(id=word["word_id"], user_id=req.user.id, table_id=tableId).update(word=word["word"], article=word["article"], translate=word["translate"], 
                                                                transcription=word["transcription"], example=word["example"])
        return HttpResponse("success")
    except Error as err:
        logger.error(err)
        return HttpResponse("error")

def deleteWord(req):
    tableId = req.POST.get("tableId")
    user_id = req.user.id
    wordId = req.POST.get("wordId")
    try:
        WordsStat.objects.filter(id=wordId, user_id=user_id, table_id=tableId).delete()
        return HttpResponse("success")
    except Error as err:
        logger.error(err)
        return HttpResponse("error")

def createList(req):
    id = req.user.id
    name = req.POST.get("name")
    try:
        wordsListsNames = UserStat.objects.get(user_id=id).wordsListsNames
        if name in wordsListsNames.split(";"):
            return HttpResponse("exists")
        names = wordsListsNames + f";{name}"
        UserStat.objects.filter(user_id=id).update(wordsListsNames=names)
        return HttpResponse("success")
    except Error as err:
        logger.error(err)
        return HttpResponse("error")

def deleteList(req):
    password = req.POST.get("pass")
    listId = int(req.POST.get("listId"))
    id = req.user.id
    user = authenticate(username=req.user.username, password=password)
    if user != None:
        try:
            wordsListsNames = UserStat.objects.get(user_id=id).wordsListsNames
            wordsLists = wordsListsNames.split(";")
            listName = wordsLists[listId]
            wordsListsNames = wordsListsNames.replace(f";{listName}", "", 1)
            UserStat.objects.filter(user_id=id).update(wordsListsNames=wordsListsNames)
            WordsStat.objects.filter(user_id=id, table_id=listId).delete()
            return HttpResponse("success")
        except Error as err:
            logger.error(err)
            return HttpResponse("error")
    else:
        return HttpResponse("wrongPass")
    
def renameList(req):
    listId = int(req.POST.get("listId"))
    newName = req.POST.get("name")
    id = req.user.id
    try:
        wordsListsNames = UserStat.objects.get(user_id=id).wordsListsNames
        wordsLists = wordsListsNames.split(";")
        if newName in wordsLists:
            return HttpResponse("exists")
        listName = wordsLists[listId]
        wordsListsNames = wordsListsNames.replace(f";{listName}", f";{newName}", 1)
        UserStat.objects.filter(user_id=id).update(wordsListsNames=wordsListsNames)
        return HttpResponse("success")
    except Error as err:
        logger.error(err)
        HttpResponse("error")

def getAllWords(req):
    try:
        wordsObjs = WordsStat.objects.filter(user_id=req.user.id)
        words=[]
        for i in wordsObjs:
            words.append({"article":i.article, "example":i.example, "lastRepeat":int(i.lastRepeat.utcnow().timestamp()), 
                          "nextRepeat":int(i.nextRepeat.utcnow().timestamp()), "repeats":i.repeats, "transcription":i.transcription, 
                          "translate":i.translate, "word":i.word, "word_id":i.id, "table_id":i.table_id})
        return HttpResponse(dumps(words))
    except Error as err:
        logger.error(err)
        return HttpResponse("error")

def updateWords(req):
    try:
        wordsList = loads(req.POST.get("words")) + loads(req.POST.get("wrongWords"))
        for i in wordsList:
            WordsStat.objects.filter(id=i["word_id"], table_id=i["table_id"]).update(
                repeats=int(i["repeats"]),
                lastRepeat=datetime.datetime.utcfromtimestamp(int(i["lastRepeat"])//1000+3600*3),
                nextRepeat=datetime.datetime.utcfromtimestamp(int(i["nextRepeat"])//1000+3600*3)
            )
    except Error as err:
        logger.error(err)
        return HttpResponse("error")

    updateRepeats(req)
    try:
        userStat = UserStat.objects.get(user_id=req.user.id)
        repeats = list(map(int, userStat.repeatsInWeek))
        repeats[-1] += int(req.POST.get("wordsRepeated"))
        studingWords = userStat.wordsBeingStudied
        studingWords += int(req.POST.get("newWords"))

        UserStat.objects.update(repeatsInWeek=repeats, wordsBeingStudied=studingWords)

        return HttpResponse("success")
    except Error as err:
        logger.error(err)
        return HttpResponse("error")