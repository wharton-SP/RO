import React, { useState, useRef, useEffect } from 'react';

const FinalFlow = ({ result, coo, theme }) => {
    const [flow, setFlow] = useState({});
    const [nodes, setNodes] = useState([]);
    const svgRef = useRef(null);
    const [draggingNode, setDraggingNode] = useState(null);
    const [saturedEdges, setSaturedEdges] = useState({});
    const [bg, setBg] = useState("bg-white")
    const [arrowColor, setArrowColor] = useState("black");

    const formatData = (data) => {
        if (!Array.isArray(data)) return [];
        return data.map(edge => ({
            from: edge[0],
            to: edge[1],
            weight: parseInt(edge[2], 10),
        }));
    };

    useEffect(() => {

        if (theme === "Dark") {
            console.log("d");
            setBg("bg-gray-700")
            setArrowColor("white")
        }
        else {
            console.log("l");
            setBg("bg-gray-200")
            setArrowColor("black")
        }
    }, [theme])

    useEffect(() => {

        setSaturedEdges(formatData(result.arcSatureFinal))

        if (result.flotFinal) {
            setFlow(formatData(result.flotFinal));
            setNodes(coo);
        }

    }, [result, coo]);

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

    const handleMouseUp = () => setDraggingNode(null);
    const handleNodeMouseDown = (id) => setDraggingNode(id);

    if (nodes.length === 0) {
        return <p className="text-center text-gray-500 mt-4">Aucun graphe à afficher.</p>;
    }

    const edges = flow || [];

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
        <div className="p-4">
            <div className='w-full relative'>
                <div className='absolute -bottom-12 left-5 text-blue-600 bg-blue-300 w-max px-2 py-1 rounded-full text-sm drop-shadow-lg drop-shadow-blue-500'>Flot Complet</div>
            </div>
            <svg
                ref={svgRef}
                width="100%"
                height="500px"
                className={`${bg} rounded-md cursor-move border-2`}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            >
                <defs>
                    <marker
                        id="arrow"
                        markerWidth="4"
                        markerHeight="4"
                        refX="3"
                        refY="2"
                        orient="auto"
                        markerUnits="userSpaceOnUse"
                    >
                        <path d="M0,0 L4,2 L0,4 Z" fill={arrowColor} />
                    </marker>
                </defs>

                {edges.map((edge, i) => {
                    const fromNode = nodes.find(n => n.id === edge.from);
                    const toNode = nodes.find(n => n.id === edge.to);
                    if (!fromNode || !toNode) return null;

                    const { x1, y1, x2, y2 } = getEdgeCoords(fromNode.x, fromNode.y, toNode.x, toNode.y);
                    const midX = (fromNode.x + toNode.x) / 2;
                    const midY = (fromNode.y + toNode.y) / 2;

                    let color = arrowColor;
                    let strokeWidth = 2;


                    return (
                        <g key={i}>
                            <line
                                x1={x1}
                                y1={y1}
                                x2={x2}
                                y2={y2}
                                stroke={color}
                                strokeWidth={strokeWidth}
                                markerEnd="url(#arrow)"
                            />
                            <text
                                x={midX}
                                y={midY - 5}
                                textAnchor="middle"
                                fill={
                                    saturedEdges.some(se => se.from === edge.from && se.to === edge.to)
                                        ? "red"
                                        : arrowColor
                                }
                            >
                                {edge.weight}
                            </text>

                        </g>
                    );
                })}

                {nodes.map((node) => {

                    return (
                        <g
                            key={node.id}
                            transform={`translate(${node.x},${node.y})`}
                            onMouseDown={() => handleNodeMouseDown(node.id)}
                            style={{ cursor: 'pointer' }}
                        >
                            <circle r="20" fill={node.special ? "#32cd32" : "#1e90ff"} />
                            <text x="0" y="5" textAnchor="middle" fill="white">{node.id}</text>
                        </g>
                    );
                })}
            </svg>

            <div className="mt-4 flex justify-center gap-8 text-sm text-gray-700">
                <div><span className="inline-block w-4 h-4 bg-red-600 rounded-full mr-2"></span> Arête min_edge</div>
                <div><span className="inline-block w-4 h-4 bg-green-600 rounded-full mr-2"></span> Chemin minimal</div>
                <div><span className="inline-block w-4 h-4 bg-white rounded-full mr-2"></span> Autres arêtes</div>
            </div>
        </div>
    );
};

export default FinalFlow;
