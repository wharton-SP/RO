import React, { useState, useRef } from 'react';

const Graph = ({ sendData }) => {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [draggingNode, setDraggingNode] = useState(null);
    const svgRef = useRef(null);
    const [selectedNode, setSelectedNode] = useState(null);
    const nextIdRef = useRef(0);

    const MIN_DISTANCE = 50;

    const addNode = (e) => {
        const rect = svgRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const tooClose = nodes.some(n => Math.hypot(n.x - x, n.y - y) < MIN_DISTANCE);
        if (tooClose) {
            alert("Trop proche d’un autre nœud !");
            return;
        }

        const label = String.fromCharCode(65 + nextIdRef.current);
        nextIdRef.current += 1;
        setNodes([...nodes, { id: label, x, y }]);
    };

    const removeNode = (id) => {
        setNodes(nodes.filter((n) => n.id !== id));
        setEdges(edges.filter((e) => e.from !== id && e.to !== id));
    };

    const renameNode = (id) => {
        const newLabel = prompt("Entrez un nouveau nom (lettre majuscule unique) :", id);
        if (!newLabel || newLabel.length !== 1 || !/[A-Z]/.test(newLabel)) return;
        if (nodes.some(n => n.id === newLabel && n.id !== id)) {
            alert("Ce nom est déjà utilisé.");
            return;
        }

        setNodes(nodes.map(n => n.id === id ? { ...n, id: newLabel } : n));
        setEdges(edges.map(e => ({
            from: e.from === id ? newLabel : e.from,
            to: e.to === id ? newLabel : e.to,
            weight: e.weight
        })));
    };

    const handleNodeMouseDown = (id) => {
        setDraggingNode(id);
    };

    const handleMouseMove = (e) => {
        if (!draggingNode) return;
        const rect = svgRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setNodes(nodes.map(n => n.id === draggingNode ? { ...n, x, y } : n));
    };

    const handleMouseUp = () => {
        setDraggingNode(null);
    };

    const connectNodes = (from, to) => {
        if (from === to || edges.find(e => e.from === from && e.to === to)) return;
        const weight = prompt(`Entrez le poids de l'arête entre ${from} et ${to}`);
        if (weight) {
            setEdges([...edges, { from, to, weight }]);
        }
    };

    const handleNodeClick = (id) => {
        if (!selectedNode) {
            setSelectedNode(id);
        } else {
            connectNodes(selectedNode, id);
            setSelectedNode(null);
        }
    };

    const removeEdge = (index) => {
        setEdges(edges.filter((_, i) => i !== index));
    };

    const exportGraph = () => {
        const data = JSON.stringify({ nodes, edges }, null, 2);
        const blob = new Blob([data], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "graph.json";
        a.click();
        URL.revokeObjectURL(url);
    };

    const importGraph = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "application/json";

        input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const { nodes: newNodes, edges: newEdges } = JSON.parse(event.target.result);
                    setNodes(newNodes);
                    setEdges(newEdges);
                    // Met à jour nextIdRef avec le prochain label dispo
                    const maxCharCode = newNodes.reduce((max, n) => Math.max(max, n.id.charCodeAt(0)), 64);
                    nextIdRef.current = maxCharCode - 64 + 1;
                } catch (err) {
                    alert("Fichier invalide !", err);
                }
            };
            reader.readAsText(file);
        };

        input.click();
    };

    const addSuperNode = (type) => {
        if (nodes.some(n => n.id === type)) {
            alert(`Le nœud spécial ${type} existe déjà.`);
            return;
        }

        const rect = svgRef.current.getBoundingClientRect();
        const x = type === 'α' ? 50 : rect.width - 50;
        const y = rect.height / 2;

        setNodes([...nodes, { id: type, x, y, special: true }]);
    };

    const calculateFlow = () => {
        const data = { nodes, edges };
        sendData(data);
    };

    const getEdgeCoords = (x1, y1, x2, y2, r = 20) => {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const length = Math.sqrt(dx * dx + dy * dy);
        const offsetX = (dx / length) * r;
        const offsetY = (dy / length) * r;
        return {
            x1: x1 + offsetX,
            y1: y1 + offsetY,
            x2: x2 - offsetX,
            y2: y2 - offsetY,
        };
    };

    return (
        <>
            <div style={{ marginBottom: '10px' }}>
                <button onClick={exportGraph}>Exporter le graphe</button>
                <button onClick={importGraph} style={{ marginLeft: '10px' }}>Importer un graphe</button>
                <button onClick={() => addSuperNode('α')}>α</button>
                <button onClick={() => addSuperNode('ω')}>ω</button>
                <button onClick={calculateFlow} style={{ marginLeft: '10px' }} >Calculer Flot Max</button>
            </div>

            <svg
                ref={svgRef}
                width="100%"
                height="600px"
                style={{ border: '1px solid #ccc', cursor: 'crosshair' }}
                onClick={addNode}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onContextMenu={(e) => e.preventDefault()}
            >
                <defs>
                    <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto">
                        <path d="M0,0 L10,5 L0,10 Z" fill="black" />
                    </marker>
                </defs>

                {edges.map((edge, i) => {

                    const fromNode = nodes.find(n => n.id === edge.from);
                    const toNode = nodes.find(n => n.id === edge.to);
                    if (!fromNode || !toNode) return null;

                    const { x1, y1, x2, y2 } = getEdgeCoords(fromNode.x, fromNode.y, toNode.x, toNode.y);

                    if (!fromNode || !toNode) return null;
                    const midX = (fromNode.x + toNode.x) / 2;
                    const midY = (fromNode.y + toNode.y) / 2;
                    return (
                        <g key={i} onDoubleClick={() => removeEdge(i)} style={{ cursor: 'pointer' }}>
                            <line
                                x1={x1}
                                y1={y1}
                                x2={x2}
                                y2={y2}
                                stroke="black"
                                strokeWidth="2"
                                markerEnd="url(#arrow)"
                            />
                            <text x={midX} y={midY - 5} textAnchor="middle" fill="black">{edge.weight}</text>
                        </g>
                    );
                })}

                {nodes.map((node) => (
                    <g
                        key={node.id}
                        transform={`translate(${node.x},${node.y})`}
                        onMouseDown={() => handleNodeMouseDown(node.id)}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleNodeClick(node.id);
                        }}
                        onDoubleClick={(e) => {
                            e.stopPropagation();
                            removeNode(node.id);
                        }}
                        onContextMenu={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            renameNode(node.id);
                        }}
                        style={{ cursor: 'pointer' }}
                    >
                        {selectedNode === node.id && (
                            <circle r="24" fill="none" stroke="yellow" strokeWidth="3" />
                        )}
                        <circle r="20" fill="#1e90ff" />
                        <text x="0" y="5" textAnchor="middle" fill="white">{node.id}</text>
                    </g>
                ))}
            </svg>
        </>
    );
};

export default Graph;
