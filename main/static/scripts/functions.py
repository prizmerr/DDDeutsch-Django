def checkCookies(req):
    if len(req.COOKIES) != 0:
        return True
    else: return False