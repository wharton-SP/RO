def updateGraph(flow, residual, min_capacity, pathPassMin):
    """
    Update the flow and residual graphs based on the minimum capacity and the path passing through the minimum edge.
    
    Args:
        flow (list): The flow graph.
        residual (list): The residual graph.
        min_capacity (int): The minimum capacity of the edge.
        pathPassMin (list): The path passing through the minimum edge.
        
    Returns:
        tuple: Updated flow and residual graphs.
    """
    
    # Update flow_graph and residual_graph
    for edge in pathPassMin:
        source, target = edge[0], edge[1]
        
        # Update flow_graph
        for i, flow_edge in enumerate(flow):
            if flow_edge[0] == source and flow_edge[1] == target:
                flow[i] = (source, target, flow_edge[2] + min_capacity)
                break
        
        # Update residual_graph
        for i, residual_edge in enumerate(residual):
            if residual_edge[0] == source and residual_edge[1] == target:
                residual[i] = (source, target, residual_edge[2] - min_capacity)
                break
    
    return flow, residual

def update_flow_graph(flow_graph, marked_path):
    # Construire un dictionnaire pour accès rapide
    flow_dict = {(u, v): f for (u, v, f) in flow_graph}

    # Trouver la capacité minimale sur le chemin (ce qu'on peut pousser)
    min_cap = min(cap for (_, _, cap) in marked_path)

    for (u, v), sign, _ in marked_path:
        if sign == '+':
            flow_dict[(u, v)] = flow_dict.get((u, v), 0) + min_cap
        else:  # signe '-'
            # On modifie l'arc inverse
            if (u, v) in flow_dict:
                flow_dict[(u, v)] = flow_dict[(u, v)] - min_cap
            else:
                # Si l’arc inverse n’était pas dans le graphe, on l'ajoute
                flow_dict[(u, v)] = -min_cap

    # Reconvertir en liste de triplets
    updated_flow_graph = [(u, v, f) for (u, v), f in flow_dict.items()]
    return updated_flow_graph
