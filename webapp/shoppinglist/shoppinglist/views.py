""" Module which will define the views

    @author Daniel Luker
    @date 10/30/2015
"""

# from django.http import HttpResponse
from django.shortcuts import render_to_response

# import datetime


def initial(request):
    """ Point of entry for the application """
    # TODO
    return render_to_response('index.html')


def home(request):
    """ Once session has been verified, displays the homepage """
    return render_to_response('home.html')
