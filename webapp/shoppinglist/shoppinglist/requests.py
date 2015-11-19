""" Module which will handle storage of information, model

    @author Daniel Luker
    @date 11/10/2015
"""
import json
from django.http import HttpResponseRedirect
from shoppinglist.models import ShoppingList
from shoppinglist.lib.util import JsonResponse
from . import views

POST = "POST"


def get_lists(request):
    """ Retrieves all of the lists for a specified user """
    # TODO
    # print(request)
    # return [['shampoo', 'rice', 'pizza', 'canteloupe', ]]


def save_list(request):
    """ Saves the specified shopping list """
    if request.method != POST:
        raise Exception("Call to this method must be post!", request)
    data = json.loads(request.POST.get('bundle'))
    received_list = ShoppingList(
        name=data['name'],
        numberOfItems=data['numberOfItems'],
        contents=data['contents'],
    )
    received_list.save()
    return views.home(request)


def check_email(request):
    """ Checks for the existence of an email address """
    email_check = request.POST.get('email')
    if email_check is None:
        # return JsonResponse({'valid': False})
        return HttpResponseRedirect('/')
    # result = User.objects(email__exact=email_check).next() is not None
    result = True
    return JsonResponse({'exists': result})
