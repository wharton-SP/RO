from app.services.findMinEdge import minEdge
from app.services.bfs import pathThroughSpecificEdge
from app.services.updateGraph import updateGraph, update_flow_graph
from app.services.mark import find_augmenting_path

def fordFulkerson(graphOriginal):
    # Conversion du graphe
    graph = [(edge["source"], edge["target"], edge["capacity"]) for edge in graphOriginal]
    
    # Initialisation
    flow_graph = [(u, v, 0) for (u, v, c) in graph]
    residual_graph = graph.copy()
    satured_edges = set()
    blocked_edges = set()
    path_blocked = set()
    maximum_flow = 0
    
    while True:
        # Filtrer les arêtes non bloquées avec capacité > 0
        available_edges = [edge for edge in residual_graph 
                        if edge not in blocked_edges and edge[2] > 0]
        
        if not available_edges:
            print("🚫 Plus d'arête disponible. Fin.")
            break
            
        min_edge = minEdge(available_edges)
        print("Arête minimale trouvée:", min_edge)
        
        pathPassMin = pathThroughSpecificEdge(residual_graph, min_edge)
        if not pathPassMin:
            print("🚫 Chemin bloqué pour l'arête min. Blocage de l'arête.")
            blocked_edges.add(min_edge)
            continue
            
        print("Chemin trouvé:", pathPassMin)
        
        # Vérification des arêtes saturées dans le chemin
        path_has_saturated = any((u, v, 0) in satured_edges for (u, v, c) in pathPassMin)
        if path_has_saturated:
            print("🚫 Chemin contient des arêtes saturées. Blocage.")
            path_blocked.add(tuple(pathPassMin))
            blocked_edges.add(min_edge)
            continue
            
        min_capacity = min_edge[2]
        
        # Mise à jour des graphes
        flow_graph, residual_graph = updateGraph(flow_graph, residual_graph, min_capacity, pathPassMin)
        
        # Marquer les Nouvelles arêtes saturées
        for u, v, c in pathPassMin:
            for i, (ru, rv, rc) in enumerate(residual_graph):
                if (ru, rv) == (u, v) and rc == 0:
                    satured_edges.add((u, v, 0))
        
        maximum_flow += min_capacity
        
        print("Saturated edges:", satured_edges)
        print("Blocked edges:", blocked_edges)
        print("Blocked paths:", path_blocked)
        print("Current flow:", maximum_flow)
        print("----------------------")
    
    print("Residual graph:", residual_graph)
    print("-------------------------------------------------------------------------")
    print("Flow graph:", flow_graph)
    print("*************************************************************************")
    
    marked_path = find_augmenting_path(flow_graph, satured_edges)
    print("saturated edges:", satured_edges)
    print("Marked path:", marked_path)
    
    print("*************************************************************************")
    
    updateGraph = update_flow_graph(flow_graph, marked_path)
    print("Updated flow graph:", updateGraph)
    
    print("*************************************************************************")
        
    return {
        "Flot Max": maximum_flow,
        "Graphe de Flot": [
            {"source": u, "target": v, "flow": f} for (u, v, f) in flow_graph
        ],
        "Graphe Résiduel": [
            {"source": u, "target": v, "capacity": c} for (u, v, c) in residual_graph
        ]
    }