from app.services.findMinEdge import minEdge
from app.services.bfs import pathThroughSpecificEdge
from app.services.updateGraph import updateGraph, update_flow_graph
from app.services.mark import find_augmenting_path
from app.services.verifySaturedBlocked import finalSaturedEdge

def save_step(flow_graph, step_list, step_set, satured_edges, blocked_edges, min_edge=None, path_min=None):
    print("Enregistrement de l'étape...")
    flow_state = tuple(flow_graph)
    if flow_state not in step_set:
        step_data = {
            "graph": list(flow_graph),
            "satured": list(satured_edges),
            "blocked": list(blocked_edges),
            "min_edge": min_edge,
            "path_min": path_min
        }
        step_list.append(step_data)
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
    marked_path_list = []

    # Étape initiale
    save_step(flow_graph, step, step_set, satured_edges, blocked_edges)
    
    while True:
        print("111111111111111111111111111111111111111111111111")
        print("111111111111111111111111111111111111111111111111")
        available_edges = [edge for edge in residual_graph 
                        if edge not in blocked_edges and edge[2] > 0]
        
        if not available_edges:
            print("🚫 Plus d'arête disponible. Fin.")
            break
            
        min_edge = minEdge(available_edges)
        print("Arête minimale trouvée:", min_edge)
        
        pathPassMin = pathThroughSpecificEdge(residual_graph, min_edge, satured_edges)
        if not pathPassMin:
            print("🚫 Chemin bloqué pour l'arête min. Blocage de l'arête.")
            blocked_edges.add(min_edge)
            save_step(flow_graph, step, step_set, satured_edges, blocked_edges, min_edge=min_edge)
            continue
                    
        path_has_saturated = any((u, v, 0) in satured_edges for (u, v, c) in pathPassMin)
        if path_has_saturated:
            print("🚫 Chemin contient des arêtes saturées. Blocage.")
            path_blocked.add(tuple(pathPassMin))
            print("******************************************")
            print("Chemin bloquée :", path_blocked)
            print("******************************************")
            blocked_edges.add(min_edge)
            
            # Enregistrer l'étape avec flow inchangé mais min_edge et path_min renseignés            
            continue
        
        print("---------------------------------------------------------")
        print("Chemin passant par minimale :", pathPassMin)
        print("---------------------------------------------------------")
        
        min_capacity = min_edge[2]
        print("\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\")
        print("Flow :", flow_graph)
        print("\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\")
        
        flow_graph, residual_graph = updateGraph(flow_graph, residual_graph, min_capacity, pathPassMin)
        
        for u, v, c in pathPassMin:
            for i, (ru, rv, rc) in enumerate(residual_graph):
                if (ru, rv) == (u, v) and rc == 0:
                    satured_edges.add((u, v, 0))
        
        maximum_flow += min_capacity
        print("///////////////////////////////////////////////")
        print("Flow :", flow_graph)
        print("//////////////////////////////////////////////")
        
        save_step(flow_graph, step, step_set, satured_edges, blocked_edges, min_edge=min_edge, path_min=pathPassMin)

    fully_flow = flow_graph
    
    while True:
        marked_path = find_augmenting_path(flow_graph, satured_edges)
        
        if marked_path is None:
            print("🚫 Plus de chemin augmentant. Fin.")
            break
        else: 
            marked_path_list.append(marked_path)
            cap_back = [val for (_, signe, val) in marked_path if signe == '-']
            
            min_back = min(cap_back) if cap_back else 0
            maximum_flow += min_back
            
            flow_graph = update_flow_graph(marked_path, flow_graph, min_back)
            
            

    # Construction du dictionnaire des étapes
    etapes_dict = [etape for etape in step]


    print("---------------------------------------------------------")
    print("Flot maximum :", maximum_flow)
    print("---------------------------------------------------------")
    print("Flot complet :", fully_flow) 
    print("---------------------------------------------------------")
    print("Arêtes saturées :", satured_edges)
    print("---------------------------------------------------------")
    print("Arêtes bloquées :", blocked_edges)
    print("---------------------------------------------------------") 
    print("Chemins marqués :", marked_path_list)
    print("---------------------------------------------------------")
    print("Flot final :", flow_graph)
    print("---------------------------------------------------------")
    print("Étapes :")
    for i, etape in enumerate(etapes_dict, 1):
        print(f"Étape {i} :", etape)
    print("---------------------------------------------------------")
    final_saturated = finalSaturedEdge(graph, flow_graph)
    print("Arcs saturés finaux :", final_saturated)
    print("---------------------------------------------------------")
    print("Fin de l'algorithme Ford-Fulkerson")
    
    return {
        "flotMax": maximum_flow,
        "flotComplet": fully_flow,
        "arcSature": list(satured_edges),
        "arcBloque": list(blocked_edges),
        "cheminMarque": marked_path_list,
        "flotFinal": flow_graph,
        "etapes": etapes_dict,
        "arcSatureFinal": final_saturated
    }

