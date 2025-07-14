from app.services.findMinEdge import minEdge
from app.services.bfs import pathThroughSpecificEdge
from app.services.updateGraph import updateGraph, update_flow_graph
from app.services.mark import find_augmenting_path
from app.services.verifySaturedBlocked import finalSaturedEdge

from collections import OrderedDict

def fordFulkerson(graphOriginal):
    graph = [(e["source"], e["target"], e["capacity"]) for e in graphOriginal]
    flow_graph = [(u, v, 0) for u, v, c in graph]
    residual_graph = graph.copy()

    satured_edges = set()
    blocked_edges = set()
    step_list = [{"type": "graph_update", "graph": list(flow_graph)}]
    marked_path_list = []
    residual_graph_evolution = []  # ✅ Ajout : tableau pour suivre l'évolution du graphe résiduel
    max_flow = 0

    while True:
        available_edges = [e for e in residual_graph if e not in blocked_edges and e[2] > 0]
        if not available_edges:
            break

        min_e = minEdge(available_edges)
        if min_e is None:
            continue

        step_list.append({"type": "min_edge", "edge": list(min_e)})

        path = pathThroughSpecificEdge(residual_graph, min_e, satured_edges)
        if not path:
            blocked_edges.add(min_e)
            step_list.append({
                "type": "graph_update",
                "graph": list(flow_graph),
                "satured": list(satured_edges),
                "blocked": list(blocked_edges)
            })
            # ✅ Sauvegarde de l'état du graphe résiduel même quand on bloque une arête
            residual_graph_evolution.append(list(residual_graph))
            continue

        step_list.append({"type": "path_min", "path": list(path)})

        min_capacity = min_e[2]
        flow_graph, residual_graph = updateGraph(flow_graph, residual_graph, min_capacity, path)

        # ✅ Sauvegarde après mise à jour
        residual_graph_evolution.append(list(residual_graph))

        for u, v, c in path:
            for ru, rv, rc in residual_graph:
                if (ru, rv) == (u, v) and rc == 0:
                    satured_edges.add((u, v, 0))

        max_flow += min_capacity
        step_list.append({
            "type": "graph_update",
            "graph": list(flow_graph),
            "satured": list(satured_edges),
            "blocked": list(blocked_edges)
        })

    while True:
        marked_path = find_augmenting_path(flow_graph, satured_edges)
        if marked_path is None:
            break

        cap_back = [v for _, s, v in marked_path if s == '-']
        min_back = min(cap_back) if cap_back else 0
        max_flow += min_back

        flow_graph = update_flow_graph(marked_path, flow_graph, min_back)

        # ✅ Pas de graphe résiduel ici car on n’en modifie pas explicitement
        # Si tu veux, tu peux reconstruire le résiduel à partir du flow_graph ici.

        current_node_markings = {}
        for (u, v), sign, _ in marked_path:
            if u[0] not in current_node_markings:
                current_node_markings[u[0]] = sign
            if v[0] not in current_node_markings:
                current_node_markings[v[0]] = sign

        marked_path_list.append({
            "type": "marked_path",
            "path": [(u, s, c) for u, s, c in marked_path],
            "graph": list(flow_graph),
            "node_markings": current_node_markings
        })

    final_satured = finalSaturedEdge(graph, flow_graph)

    return {
        "steps": step_list,
        "marked_paths": marked_path_list,
        "residual_graph_evolution": residual_graph_evolution, 
        "final": {
            "max_flow": max_flow,
            "final_flow": list(flow_graph),
            "final_satured": list(final_satured),
            "blocked_edges": list(blocked_edges)
        }
    }
