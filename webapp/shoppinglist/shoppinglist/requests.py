""" Module which will handle storage of information, model

    @author Daniel Luker
    @date 11/10/2015
"""
import json

from django.http import HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User

from django.core.exceptions import ObjectDoesNotExist, MultipleObjectsReturned

from shoppinglist.models import ShoppingList
from shoppinglist.lib.util import JsonResponse

from . import views

POST = "POST"


@login_required
def get_all_lists(request):
    """ Retrieves all of the lists for a specified user """
    # TODO
    # print(request)
    # return [['shampoo', 'rice', 'pizza', 'canteloupe', ]]
    pass


@login_required
def get_list(request):
    """ Retrieves a single list """
    if request.method != POST:
        raise Exception("Call to this method must be post!", request)
    name = request.POST.get('list_name')
    # result = ShoppingList.objects.get(name__exact=name).next()
    ## DEV
    if name == 'Groceries':
        result = ShoppingList(name="Groceries", numberOfItems=5, contents={})
        result.contents['Potatoes'] = 5
        result.contents['Milk'] = 1
        result.contents['Rice'] = 1
    elif name == 'Christmas':
        result = ShoppingList(name="Christmas", numberOfItems=12, contents={})
        result.contents['Turkey'] = 1
        result.contents['Wine'] = 2
        result.contents['Crackers'] = 4
        result.contents['Pudding'] = 1
    return JsonResponse({'list': json.dumps({
        'name': name,
        'contents': result.contents
        })})


@login_required
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
    try:
        result = User.objects.get(email__exact=email_check) is not None
    except ObjectDoesNotExist:
        result = False
    except MultipleObjectsReturned:
        result = True
    # result = True
    return JsonResponse({'exists': result})


@login_required
def get_message_count(request):
    """ Gets the number of unread/new messages from the database """
    # user = request.user.username
    return JsonResponse({'message_count': 5})
