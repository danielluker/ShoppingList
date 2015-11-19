""" Module which will handle the login and the authentication requests

    @author Daniel Luker
    @date 11/17/2015
"""
import json
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
# from django.http import HttpResponseRedirect
from shoppinglist.lib.util import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
# from . import views


def register_user(request):
    """ Saves the user onto the database """
    usrnm, password, email = retrieve_user_password_email(request)
    n_user = User.objects.create_user(usrnm, email, password)
    n_user.save()
    new_user = authenticate(username=usrnm, password=password)
    if new_user is not None and new_user.is_active:
        login(request, new_user)
        return JsonResponse({
            'valid': True,
            'next': 'home/'})
    return JsonResponse({'valid': False})


@ensure_csrf_cookie
def login_user(request):
    """ Login function """
    username, password = retrieve_user_password(request)
    _user = authenticate(username=username, password=password)
    if _user is not None:
        if _user.is_active:
            login(request, _user)
            return JsonResponse({
                'valid': True,
                'next': '/home',
                })
            # return HttpResponseRedirect('/home')
        # else:
            # Inactive account
            # return views.home(request)
    else:
        return JsonResponse({'valid': False})
        # Wrong username/password
        # return views.home(request)


def retrieve_password_email(request):
    """ Helper function to unpack the username and the password from the
    request
    Raises an exception if the request wasn't made via POST
    """
    info = json.loads(request.POST.get('user'))
    email = info['email']
    password = info['password']
    return password, email


def retrieve_user_password_email(request):
    """ Helper function to return the username, password and email """
    password, email = retrieve_password_email(request)
    username = email.split("@")[0]
    return username, password, email


def retrieve_user_password(request):
    """ Helper method to return just the username and the password """
    password, email = retrieve_password_email(request)
    return email.split("@")[0], password
