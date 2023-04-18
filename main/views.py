from .modules.enter import *
from .modules.accActions import *
from .modules.study import *
from .modules.email import *
from .modules.words import *
from django.http import HttpResponse
from pathlib import Path

def robots(req):
    mdir = Path(__file__).resolve().parent.parent
    f = open(mdir / "robots.txt")
    return HttpResponse(f.read(), content_type='text/plain')

def sitemap(req):
    mdir = Path(__file__).resolve().parent.parent
    f = open(mdir / "sitemap.xml")
    return HttpResponse(f.read(), content_type='text/plain')