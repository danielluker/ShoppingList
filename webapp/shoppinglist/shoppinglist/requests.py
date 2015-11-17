""" Module which will handle storage of information, model

    @author Daniel Luker
    @date 11/10/2015
"""
import json
from shoppinglist.models import ShoppingList
from . import views

POST = "POST"


def get_lists(request):
    """ Retrieves all of the lists for a specified user """
    # TODO
    # print(request)
    # return [['shampoo', 'rice', 'pizza', 'canteloupe', ]]


def save_list(request):
    """ Saves the specified shopping list """

    
    # print request
    # if request.method != POST:
    #     raise Exception("Call to this method must be post!", request)
    data = json.loads(request.POST.get('bundle'))
    received_list = ShoppingList(
        name=data['name'],
        numberOfItems=data['numberOfItems'],
        contents=data['contents'],
    )
    # received_list.name = data["name"]
    # for key in data:
    #     received_list.contents[key] = data[key]
    # received_list.numberOfItems = data["numberOfItems"]
    received_list.save()

    print("Successfully saved object to database")
    # raise Exception("", data)
    # print(request.POST)
    # user = new User()

    # return request
    return views.home(request)
