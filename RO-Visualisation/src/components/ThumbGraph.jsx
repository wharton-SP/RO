import React, { useEffect, useRef, useState } from 'react';

const ThumbGraph = ({ theme }) => {
    const svgRef = useRef(null);
    const [arrowColor, setArrowColor] = useState("black");
    const [bg, setBg] = useState("bg-white");
    const [nodes, setNodes] = useState([]);
    const [draggingNode, setDraggingNode] = useState(null);

    const STORAGE_KEY = "thumb_graph_nodes";

    const defaultNodes = [
        { id: 'α', x: 10, y: 120 },
        { id: 'R', x: 160, y: 50 },
        { id: 'O', x: 160, y: 200 },
        { id: 'ω', x: 300, y: 120 },
    ];

    const edges = [
        { from: 'α', to: 'R', weight: 10 },
        { from: 'α', to: 'O', weight: 5 },
        { from: 'R', to: 'ω', weight: 8 },
        { from: 'O', to: 'ω', weight: 3 },
    ];

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

    const handleNodeMouseDown = (id) => {
        setDraggingNode(id);
    };

    const handleMouseMove = (e) => {
        if (!draggingNode) return;
        const rect = svgRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const updatedNodes = nodes.map(n =>
            n.id === draggingNode ? { ...n, x, y } : n
        );
        setNodes(updatedNodes);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNodes));
    };

    const handleMouseUp = () => {
        setDraggingNode(null);
    };

    useEffect(() => {
        if (theme === "Dark") {
            setBg("bg-gray-700");
            setArrowColor("white");
        } else {
            setBg("bg-gray-200");
            setArrowColor("black");
        }
    }, [theme]);

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) {
                    setNodes(parsed);
                    return;
                }
            } catch (e) {
                console.warn("Invalid graph data in localStorage", e);
            }
        }
        setNodes(defaultNodes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <svg
            ref={svgRef}
            viewBox="0 0 320 280"
            className={`${bg} rounded-md shadow-sm m-4 h-full w-full`}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto">
                    <path d="M0,0 L10,5 L0,10 Z" fill={arrowColor} />
                </marker>
            </defs>

            {edges.map((edge, i) => {
                const fromNode = nodes.find(n => n.id === edge.from);
                const toNode = nodes.find(n => n.id === edge.to);
                if (!fromNode || !toNode) return null;

                const { x1, y1, x2, y2 } = getEdgeCoords(fromNode.x, fromNode.y, toNode.x, toNode.y);

                return (
                    <g key={i}>
                        <line
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke={arrowColor}
                            strokeWidth="2"
                            markerEnd="url(#arrow)"
                        />
                    </g>
                );
            })}

            {nodes.map((node) => (
                <g
                    key={node.id}
                    transform={`translate(${node.x},${node.y})`}
                    onMouseDown={() => handleNodeMouseDown(node.id)}
                    style={{ cursor: 'grab' }}
                >
                    <circle r="20" className="fill-current text-primary" />
                    <text x="0" y="5" textAnchor="middle" className="fill-current text-primary-content text-sm font-semibold">
                        {node.id}
                    </text>
                </g>
            ))}
        </svg>
    );
};

export default ThumbGraph;
