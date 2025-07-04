import React, { useState, useRef, useEffect } from 'react';

const FinalFlow = ({ result, coo, theme }) => {
    const [nodes, setNodes] = useState([]);
    const [flow, setFlow] = useState([]);
    const [saturatedEdges, setSaturatedEdges] = useState([]);
    const [draggingNode, setDraggingNode] = useState(null);

    const svgRef = useRef(null);
    const [arrowColor, setArrowColor] = useState("black");
    const [bg, setBg] = useState("bg-white");

    const handleNodeMouseDown = (id) => setDraggingNode(id);
    const handleMouseMove = (e) => {
        if (!draggingNode) return;
        const rect = svgRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setNodes(nodes.map(n => n.id === draggingNode ? { ...n, x, y } : n));
    };
    const handleMouseUp = () => setDraggingNode(null);

    const getEdgeCoords = (x1, y1, x2, y2, r = 20) => {
        const dx = x2 - x1, dy = y2 - y1;
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

    const formatData = (data) =>
        Array.isArray(data) ? data.map(edge => ({
            from: edge[0],
            to: edge[1],
            weight: parseInt(edge[2], 10)
        })) : [];

    useEffect(() => {
        if (result?.steps?.length && coo?.length) {
            setNodes(coo);
            setFlow(formatData(result.final.final_flow));
            setSaturatedEdges(formatData(result.final.final_satured));
        }
    }, [result, coo]);

    useEffect(() => {
        if (theme === "Dark") {
            setBg("bg-gray-700");
            setArrowColor("white");
        } else {
            setBg("bg-gray-200");
            setArrowColor("black");
        }
    }, [theme]);

    const isSaturated = (edge) =>
        saturatedEdges.some(se => se.from === edge.from && se.to === edge.to);

    if (!result?.steps || !coo?.length) return <p className="text-center text-gray-500 mt-4">Chargement du graphe...</p>;

    return (
        <div className='px-20 py-5 flex flex-col gap-5'>
            <div className='relative'>
                <span className={`absolute -bottom-18 left-10 text-sm font-medium badge badge-primary badge-dash transition-all`}>
                    Flot Maximal
                </span>
            </div>
            <div>
                <svg ref={svgRef} width="100%" height="500px" className={`${bg} rounded-md shadow-sm m-4 cursor-default`} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
                    <defs>
                        <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto">
                            <path d="M0,0 L10,5 L0,10 Z" fill="currentColor" />
                        </marker>
                    </defs>

                    {flow.map((edge, i) => {
                        const fromNode = nodes.find(n => n.id === edge.from);
                        const toNode = nodes.find(n => n.id === edge.to);
                        if (!fromNode || !toNode) return null;

                        const { x1, y1, x2, y2 } = getEdgeCoords(fromNode.x, fromNode.y, toNode.x, toNode.y);
                        const midX = (fromNode.x + toNode.x) / 2;
                        const midY = (fromNode.y + toNode.y) / 2;

                        const strokeColor = isSaturated(edge) ? "#f87171" : arrowColor;

                        return (
                            <g key={i} style={{ opacity: 0, animation: "fadeIn 0.4s ease forwards" }}>
                                <line
                                    x1={x1}
                                    y1={y1}
                                    x2={x2}
                                    y2={y2}
                                    stroke={strokeColor}
                                    strokeWidth="2"
                                    markerEnd="url(#arrow)"
                                />
                                <text x={midX} y={midY - 5} textAnchor="middle" fill={strokeColor} className="text-sm">
                                    {edge.weight}
                                </text>
                            </g>
                        );
                    })}

                    {nodes.map((node) => (
                        <g key={node.id} transform={`translate(${node.x},${node.y})`} className='cursor-grab active:cursor-grabbing' onMouseDown={() => handleNodeMouseDown(node.id)} style={{ opacity: 0, animation: "fadeIn 0.4s ease forwards" }}>
                            <circle r="20" className="fill-current text-primary" />
                            <text x="0" y="5" textAnchor="middle" fill="white" className=" fill-current text-sm text-primary-content font-semibold">{node.id}</text>
                        </g>
                    ))}
                </svg>
            </div>

            <style>{`
                @keyframes fadeIn {
                    to { opacity: 1; }
                }
            `}</style>
        </div >
    );
};

export default FinalFlow;
