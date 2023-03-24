from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User
from datetime import timedelta
from django.core.mail import send_mail
from django.conf import settings
from random import randint
from django.contrib.auth import authenticate

def sendCode(req):
    username = req.POST.get("username")
    print(username)
    if username != None:
        try:
            user = User.objects.get(username=username)
            code = randint(1000, 9999)
            send_mail(
                subject="Код подтверждения",
                message="",
                html_message=f"<h1><b>{code}</b></h1>",
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[user.email]
            )
            return JsonResponse({'id':user.id,'code':code*45})
        except User.DoesNotExist:
            return HttpResponse("notFound")
    else:
        username = req.user.username
        email = req.POST.get("email")
        if email == "dddeutsch.help@gmail.com":
            return HttpResponse("adminEmail")
        try:
            user = User.objects.get(email=email)
            return HttpResponse("emEx")
        except User.DoesNotExist:
            code = randint(1000, 9999)
            send_mail(
                subject="Код подтверждения",
                message="",
                html_message=f"<h1><b>{code}</b></h1>",
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[email]
            )
            return HttpResponse(code*45)
    
def checkCodes(req):
    c1 = int(req.POST.get("code1"))
    c2 = int(req.POST.get("code2"))*45
    return HttpResponse(c1==c2)

def sendMessage(req):
    email = req.user.email
    username = req.user.username
    mess = req.POST.get("message")
    send_mail(
        subject=f"Обращение от {email} ({username})",
        message=mess,
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[settings.EMAIL_HOST_USER]
    )
    return HttpResponse("success")