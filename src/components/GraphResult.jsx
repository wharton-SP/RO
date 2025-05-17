import React, { useState, useRef, useEffect } from 'react';

const GraphResult = ({ flow }) => {
    const [nodes, setNodes] = useState([]);
    const edges = flow.edges || [];
    const svgRef = useRef(null);
    const [draggingNode, setDraggingNode] = useState(null);

    // Met à jour les nodes à chaque changement de flow
    useEffect(() => {
        setNodes(flow.nodes || []);
    }, [flow]);

    const handleMouseMove = (e) => {
        if (!draggingNode) return;
        const rect = svgRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setNodes(prevNodes =>
            prevNodes.map(n =>
                n.id === draggingNode ? { ...n, x, y } : n
            )
        );
    };

    const handleMouseUp = () => {
        setDraggingNode(null);
    };

    const handleNodeMouseDown = (id) => {
        setDraggingNode(id);
    };

    if (nodes.length === 0) {
        return <p className="text-center text-gray-500 mt-4">Aucun graphe à afficher.</p>;
    }

    return (
        <div className="mt-8">
            <h2 className="text-lg font-semibold text-center mb-2">Résultat du flot maximal</h2>
            <svg
                ref={svgRef}
                width="100%"
                height="600px"
                style={{ border: '1px solid #ccc', cursor: 'move' }}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
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
                    const midX = (fromNode.x + toNode.x) / 2;
                    const midY = (fromNode.y + toNode.y) / 2;
                    return (
                        <g key={i}>
                            <line
                                x1={fromNode.x}
                                y1={fromNode.y}
                                x2={toNode.x}
                                y2={toNode.y}
                                stroke="black"
                                strokeWidth="2"
                                markerEnd="url(#arrow)"
                            />
                            <text x={midX} y={midY - 5} textAnchor="middle" fill="red">
                                {edge.weight}
                            </text>
                        </g>
                    );
                })}

                {nodes.map((node) => (
                    <g
                        key={node.id}
                        transform={`translate(${node.x},${node.y})`}
                        onMouseDown={() => handleNodeMouseDown(node.id)}
                        style={{ cursor: 'pointer' }}
                    >
                        <circle r="20" fill={node.special ? "#32cd32" : "#1e90ff"} />
                        <text x="0" y="5" textAnchor="middle" fill="white">{node.id}</text>
                    </g>
                ))}
            </svg>
        </div>
    );
};

export default GraphResult;
