""" Module which will define the views

    @author Daniel Luker
    @date 10/30/2015
"""

# from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib.auth.decorators import login_required
from django.template import RequestContext
from shoppinglist.lib.util import JsonResponse

from shoppinglist.models import UserObject

# DEBUG
# import pdb

# import datetime


def initial(request, show_login=False):
    """ Point of entry for the application """
    cookie = request.COOKIES.get("show_login")
    if cookie is not None and cookie == "true":
        show_login = True
    if request.GET.get("show_login") == 'true':
        show_login = True
    response = render_to_response('index.html', RequestContext(request))
    response.set_cookie("show_login", "true" if show_login else "false")
    return response


def initial_login(request):
    """ Returns to the homepage, and shows login modal """
    return initial(request, True)


def forgot_password(request):
    """ Displays the page to recover lost/forgotten passwords """
    return render_to_response('forgot_password.html', RequestContext(request))


@login_required
@ensure_csrf_cookie
def home(request):
    """ If the user is logged in, display the homepage """
    return render_to_response('home.html', RequestContext(request))


@login_required
@ensure_csrf_cookie
def new_list(request):
    """ Show the page to create new list """
    return render_to_response('new_list.html', RequestContext(request))


@login_required
def home_layout(request, layout):
    """ Fetch the required layout """
    if layout == 'controls':
        result = UserObject.objects.get(user__exact=request.user).layout
        return JsonResponse({'controls': result})
    return None
