""" Module which will handle storage of information, model

    @author Daniel Luker
    @date 11/10/2015
"""
import json

from django.http import HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User

from django.core.exceptions import ObjectDoesNotExist, MultipleObjectsReturned

from shoppinglist.models import ShoppingList, UserObject
from shoppinglist.lib.util import JsonResponse

from . import views

POST = "POST"
GET = "GET"


@login_required
def get_all_lists(request):
    """ Retrieves all of the lists for a specified user """
    result = UserObject.objects.get(user__exact=request.user).next()
    return JsonResponse(result)


@login_required
def get_list(request):
    """ Retrieves a single list """
    if request.method == POST:
        name = request.POST.get('list_name')
    elif request.method == GET:
        name = request.GET.get('list_name')
    else:
        raise Exception("Call to this method must be post or get!", request)
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
    else:
        result = ShoppingList(name=name)
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
    messages = _get_or_fetch_messages(request)
    return JsonResponse({'message_count': messages.length()})


@login_required
def get_user_recommendations(request):
    """ Retrieves the map containing the recommendations for this user """
    product = request.GET.get('product')
    request.session['recommendations'].get_relationships(product)


@login_required
def get_messages(request):
    """ Retrieves all the messages for this user """
    return JsonResponse({'messages': _get_or_fetch_messages(request)})


@login_required
def get_timeline(request):
    """ Retrieves the timeline for the currently logged in user """
    timeline = UserObject.objects.get(user__exact=request.user).timeline
    return JsonResponse({'timeline': timeline})


def _get_or_fetch_messages(request, force=False):
    """ Helper method to check if messages exist in the current session,
        and to retrieve them from the database if they're not loaded
    """
    messages = request.session['messages']
    if messages is None or force:
        messages = UserObject.objects.get(user__exact=request.user).messages
        request.session['messages'] = messages
    return messages
