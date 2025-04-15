from app.services.findMinEdge import minEdge
from app.services.bfs import pathThroughSpecificEdge
from app.services.updateGraph import updateGraph, update_flow_graph
from app.services.mark import find_augmenting_path

def save_step(flow_graph, step_list, step_set):
    flow_state = tuple(flow_graph)
    if flow_state not in step_set:
        step_list.append(flow_state)
        step_set.add(flow_state)


def fordFulkerson(graphOriginal):
    
    graph = [(edge["source"], edge["target"], edge["capacity"]) for edge in graphOriginal]
    
    flow_graph = [(u, v, 0) for (u, v, c) in graph]
    residual_graph = graph.copy()
    satured_edges = set()
    blocked_edges = set()
    path_blocked = set()
    maximum_flow = 0
    step = []
    step_set = set()

    
    save_step(flow_graph, step, step_set)
    
    while True:
        
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
                    
        path_has_saturated = any((u, v, 0) in satured_edges for (u, v, c) in pathPassMin)
        if path_has_saturated:
            print("🚫 Chemin contient des arêtes saturées. Blocage.")
            path_blocked.add(tuple(pathPassMin))
            blocked_edges.add(min_edge)
            continue
            
        min_capacity = min_edge[2]
        
        flow_graph, residual_graph = updateGraph(flow_graph, residual_graph, min_capacity, pathPassMin)
        
        for u, v, c in pathPassMin:
            for i, (ru, rv, rc) in enumerate(residual_graph):
                if (ru, rv) == (u, v) and rc == 0:
                    satured_edges.add((u, v, 0))
        
        maximum_flow += min_capacity
        
        save_step(flow_graph, step, step_set)

    fully_flow = flow_graph
    
    while True :
        marked_path = find_augmenting_path(flow_graph, satured_edges)
        
        if marked_path == None :
            print("🚫 Plus de chemin augmentant. Fin.")
            break
        else : 
            cap_back = [val for (_, signe, val) in marked_path if signe == '-']
            
            min_back = min(cap_back) if cap_back else 0
            maximum_flow += min_back
            
            flow_graph = update_flow_graph(marked_path, flow_graph, min_back)
            
            save_step(flow_graph, step, step_set)

    print("Étapes :")
    for i, etape in enumerate(step):
        print(f"Étape {i + 1}: {etape}")

    return {
        "Flot Max": maximum_flow,
        "Flot Complet ": fully_flow,
        "Flot Final ": flow_graph        
    }