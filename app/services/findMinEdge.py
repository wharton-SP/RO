def minEdge(edges):
    """
    Trouve l'arc avec la capacité minimum dans le graphe.
    """
    if not edges:
        return None  

    return min((edge for edge in edges if edge[2] > 0), key=lambda edge: edge[2], default=None)
