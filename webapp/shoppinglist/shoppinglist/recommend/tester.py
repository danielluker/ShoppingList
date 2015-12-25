""" Class to test the graph functionality

    @author Daniel F. Luker
    @date 7th December 2015
"""

import graph


def test_graph_1():
    """ testing an interconnected graph """
    data = ['potatoes', 'milk', 'eggs', 'rice']
    test_graph = graph.Graph()
    for value in data:
        test_graph.add(value)
    print(test_graph)
    test_graph.add_relationship('milk', 'eggs')
    test_graph.add_relationship('eggs', 'rice')
    test_graph.add_relationship('milk', 'potatoes')
    test_graph.add_relationship('milk', 'rice')
    test_graph.add_relationship('milk', 'eggs')
    print(test_graph)
    return test_graph


def test_graph_2():
    data1 = ['potatoes', 'milk', 'eggs', 'rice']
    data2 = ['milk', 'cereal', 'pizza']
    data3 = ['beer', 'pizza', 'chips']
    data4 = ['milk', 'cereal']
    data5 = ['milk', 'cereal', 'eggs']
    test_graph = graph.Graph()
    test_graph.add_relationship_list(data1)
    test_graph.add_relationship_list(data2)
    test_graph.add_relationship_list(data3)
    test_graph.add_relationship_list(data4)
    test_graph.add_relationship_list(data5)
    print(test_graph)
    foot = test_graph.get_relationships('milk')
    print(foot)
    return test_graph

if __name__ == '__main__':
    test_graph_2()
