""" Module which will define the views

    @author Daniel Luker
    @date 10/30/2015
"""

# from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.views.decorators.csrf import ensure_csrf_cookie
from django.template import RequestContext
from django.http import HttpResponseRedirect

# import datetime


def initial(request, show_login=False):
    """ Point of entry for the application """
    cookie = request.COOKIES.get("show_login")
    if cookie is not None and cookie == "true":
        show_login = True
    response = render_to_response('index.html', RequestContext(request))
    response.set_cookie("show_login", "true" if show_login else "false")
    return response


@ensure_csrf_cookie
def home(request):
    """ Once session has been verified, displays the homepage """
    if not request.user.is_authenticated():
        response = HttpResponseRedirect('/')
        response.set_cookie("show_login", "true", 3600)
        return response
    return render_to_response('home.html', RequestContext(request))
