""" Module which will define the views

    @author Daniel Luker
    @date 10/30/2015
"""

# from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.views.decorators.csrf import ensure_csrf_cookie
from django.template import RequestContext

# import datetime


def initial(request):
    """ Point of entry for the application """
    # TODO
    return render_to_response('index.html')


@ensure_csrf_cookie
def home(request):
    """ Once session has been verified, displays the homepage """
    context = RequestContext(request)
    return render_to_response('home.html', context)