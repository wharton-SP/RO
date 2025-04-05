def minEdge(edges):
    """
    Trouve l'arc avec la capacité minimum dans le graphe.
    """
    if not edges:
        return None  # Retourne None si la liste est vide

    # Utilise la fonction min pour trouver l'arc avec la capacité minimum
    return min((edge for edge in edges if edge[2] > 0), key=lambda edge: edge[2], default=None)
