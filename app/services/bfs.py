from collections import defaultdict, deque

def pathThroughSpecificEdge(edges, specific_edge):
    """
    Trouve un chemin dans le graphe passant par un arc spécifique et retourne les arcs du chemin.

    :param edges: Liste de tuples représentant les arcs (source, target, capacity).
    :param specific_edge: Tuple représentant l'arc spécifique (source, target, capacity).
    :return: Liste des arcs représentant le chemin passant par l'arc spécifique ou None si aucun chemin n'existe.
    """
    # Construire un graphe sous forme de dictionnaire d'adjacence
    graph = defaultdict(list)
    for source, target, capacity in edges:
        graph[source].append((target, capacity))

    # Vérifier si l'arc spécifique est valide
    if specific_edge[0] not in graph or specific_edge[1] not in [t[0] for t in graph[specific_edge[0]]]:
        return None

    # BFS pour trouver un chemin
    def bfs_path(source, target):
        queue = deque([(source, [])])  # La file contient le chemin sous forme de liste d'arcs
        visited = set()

        while queue:
            current, path = queue.popleft()
            if current == target:
                return path
            if current not in visited:
                visited.add(current)
                for neighbor, capacity in graph[current]:
                    if neighbor not in visited:
                        queue.append((neighbor, path + [(current, neighbor, capacity)]))
        return None

    # Cas 1: L'arête spécifique part de α
    if specific_edge[0] == 'α':
        # Trouver le chemin après l'arc spécifique
        path_from_specific = bfs_path(specific_edge[1], "ω")
        if not path_from_specific:
            return None
        return [specific_edge] + path_from_specific

    # Cas 2: L'arête spécifique arrive à ω
    elif specific_edge[1] == 'ω':
        # Trouver le chemin avant l'arc spécifique
        path_to_specific = bfs_path("α", specific_edge[0])
        if not path_to_specific:
            return None
        return path_to_specific + [specific_edge]

    # Cas général: L'arête est au milieu
    else:
        # Trouver le chemin jusqu'à l'arc spécifique
        path_to_specific = bfs_path("α", specific_edge[0])
        if not path_to_specific:
            return None

        # Ajouter l'arc spécifique au chemin
        path_to_specific.append(specific_edge)

        # Trouver le chemin après l'arc spécifique
        path_from_specific = bfs_path(specific_edge[1], "ω")
        if not path_from_specific:
            return None

        # Combiner les deux chemins
        return path_to_specific + path_from_specific