def isSatured(residual, satured_edges):
    """
    Check if an edge is saturated in the residual graph and add it if not already present.
    
    Args:
        residual (list): The residual graph.
        satured_edges (list): Current list of saturated edges.
        
    Returns:
        list: Updated list of saturated edges (without duplicates).
    """
    for edge in residual:
        if edge[2] == 0 and edge not in satured_edges:  # Évite les doublons
            satured_edges.append(edge)
    
    return satured_edges

def isBlocked(path, satured_edges, path_blocked, blocked_edges):
    """
    Check if a path is blocked due to saturated edges and update the blocked edges and paths.
    Avoids duplicate entries in blocked_edges and path_blocked.

    Args:
        path (list): The path to check.
        satured_edges (list): List of saturated edges.
        path_blocked (list): List of blocked paths (to be updated).
        blocked_edges (list): List of blocked edges (to be updated).

    Returns:
        tuple: Updated blocked_edges and path_blocked lists (without duplicates).
    """
    for edge in path:
        if edge in satured_edges and edge not in blocked_edges:  # Évite les doublons
            blocked_edges.append(edge)
            if path not in path_blocked:  # Évite les chemins en double
                path_blocked.append(path)
    
    return blocked_edges, path_blocked

def finalSaturedEdge(graph, flow_graph):
    """
    Compare les arcs du graphe original avec ceux du flow_graph pour déterminer
    les arcs saturés (flot == capacité).

    :param graph: liste d'arcs du graphe original, sous forme [(u, v, capacité), ...]
    :param flow_graph: liste d'arcs avec flot actuel, sous forme [(u, v, flot), ...]
    :return: liste des arcs saturés [(u, v, capacité)]
    """
    saturated_edges = []

    # Création d’un dictionnaire pour accéder rapidement au flot par (u, v)
    flow_dict = {(u, v): f for (u, v, f) in flow_graph}

    for (u, v, capacity) in graph:
        flow = flow_dict.get((u, v), 0)
        if flow == capacity:
            saturated_edges.append((u, v, capacity))

    return saturated_edges
