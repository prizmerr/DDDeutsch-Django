from django.contrib import admin
from django.urls import path, include, re_path
from main import views


urlAccActions = [
    path('tryToRegister/', views.tryToRegister),
    path('logout/', views.logOut),
    path('login/', views.logIn),
    path('updateRepeatsInWeek/', views.updateRepeats),
    path('getUserInfo/', views.getUserInfo),
    path('changePass/', views.changePass),
    path('getLogin/', views.getLogin),
    path('deleteAcc/', views.deleteAcc),
    path('changeEmail/', views.changeEmail),
    path('getUserStats/', views.getUserStats)
]

urlStudy = [
    path('profil/', views.profil),
    path('stats/', views.stats),
    path('learning/', views.learning)
]

urlEmail = [
    path('sendCode/', views.sendCode),
    path('checkCodes/', views.checkCodes),
    path('sendMessage/', views.sendMessage)
]

urlWords = [
    path('saveWord/', views.saveWord),
    path('createList/', views.createList),
    path('deleteList/', views.deleteList),
    path('renameList/', views.renameList),
    path('saveWord/', views.saveWord),
    path('deleteWord/', views.deleteWord),
    path('getAllWords/', views.getAllWords),
    path('updateWords/', views.updateWords)
]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.startPage),
    path('enter/sitemap.xml/', views.sitemap),
    path('enter/', views.enterPage),
    path('enter/register/', views.registerPage),
    path('setCookie/', views.setCookie),
    path('accActions/', include(urlAccActions)),
    path('study/', include(urlStudy)),
    path('email/', include(urlEmail)),
    path('words/', include(urlWords)),
    re_path(r'robots.txt/?$', views.robots),
    re_path(r'sitemap.xml/?$', views.sitemap),
]

handler404 = "main.views.page404"