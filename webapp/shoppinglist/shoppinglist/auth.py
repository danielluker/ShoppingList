""" Module which will handle the login and the authentication requests

    @author Daniel Luker
    @date 11/17/2015
"""
import json
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie
from django.core.exceptions import ObjectDoesNotExist, MultipleObjectsReturned

from shoppinglist.models import UserObject
from shoppinglist.lib.util import JsonResponse

# from djutils.decorators import async


@ensure_csrf_cookie
def register_user(request):
    """ Saves the user onto the database """
    usrnm, password, email = retrieve_user_password_email(request)
    try:
        result = User.objects.get(email__exact=email) is not None
    except ObjectDoesNotExist:
        result = False
    except MultipleObjectsReturned:
        result = True
    if result is True:
        return JsonResponse({'valid': False})
    n_user = User.objects.create_user(usrnm, email, password)
    n_user.save()
    n_user_obj = UserObject(user=n_user, shoppinglists=[])
    n_user_obj.save()
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
            load_data(request, _user)
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


# @async
def load_data(request, user):
    """ Loads all necessary data from the database into the current session """
    # request.session['recommend'] = Graph.objects.get(user__exact=user.id)
    pass


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


def logout_user(request):
    """ Logs out the current user and returns the home page """
    logout(request)
    return JsonResponse({'next': '/'})
