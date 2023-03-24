from django.contrib import admin
from django.urls import path, include
from main import views


urlAccActions = [
    path('tryToRegister/', views.tryToRegister),
    path('logout/', views.logOut),
    path('login/', views.logIn)
]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.startPage),
    path('enter/', views.enterPage),
    path('enter/register/', views.registerPage),
    path('setCookie/', views.setCookie),
    path('accActions/', include(urlAccActions))
]
