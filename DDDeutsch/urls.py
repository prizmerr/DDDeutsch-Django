from django.contrib import admin
from django.urls import path, include
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
]

urlStudy = [
    path('profil/', views.profil)
]

urlEmail = [
    path('sendCode/', views.sendCode),
    path('checkCodes/', views.checkCodes),
    path('sendMessage/', views.sendMessage)
]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.startPage),
    path('enter/', views.enterPage),
    path('enter/register/', views.registerPage),
    path('setCookie/', views.setCookie),
    path('accActions/', include(urlAccActions)),
    path('study/', include(urlStudy)),
    path('email/', include(urlEmail))
]
