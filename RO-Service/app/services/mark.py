def find_augmenting_path(flow, saturated_edges):
    from collections import defaultdict

    graph = defaultdict(list)
    flow_dict = {}

    for u, v, f in flow:
        graph[u].append(v)
        graph[v].append(u) 
        flow_dict[(u, v)] = f

    visited = set()

    def dfs(node, path):
        if node == 'ω':
            return path

        visited.add(node)

        for neighbor in graph[node]:
            if any(u == node and v == neighbor for (u, v, f) in saturated_edges):
                continue
            if neighbor not in visited and flow_dict.get((node, neighbor), 0) > 0:
                res = dfs(neighbor, path + [((node, neighbor), '+', flow_dict[(node, neighbor)])])
                if res:
                    return res

        for neighbor in graph[node]:
            if (neighbor, node) in flow_dict and flow_dict[(neighbor, node)] > 0:
                if neighbor not in visited:
                    res = dfs(neighbor, path + [((neighbor, node), '-', flow_dict[(neighbor, node)])])
                    if res:
                        return res

        return None

    return dfs('α', [])