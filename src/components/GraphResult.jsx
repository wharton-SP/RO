import React, { useState, useRef, useEffect } from 'react';

const GraphResult = ({ result, coo, theme }) => {
    const [nodes, setNodes] = useState([]);
    const [flow, setFlow] = useState([]);
    const [stepIndex, setStepIndex] = useState(0);
    const [draggingNode, setDraggingNode] = useState(null);
    const [visitedMinEdges, setVisitedMinEdges] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const svgRef = useRef(null);
    const [arrowColor, setArrowColor] = useState("black");
    const [bg, setBg] = useState("bg-white");

    const steps = result?.steps || [];
    const currentStep = steps[stepIndex] || {};

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
            weight: parseInt(edge[2], 10),
        })) : [];

    const goToNextStep = () => {
        if (stepIndex < steps.length - 1) setStepIndex(prev => prev + 1);
    };

    const goToPreviousStep = () => {
        if (stepIndex > 0) setStepIndex(prev => prev - 1);
    };

    const togglePlay = () => setIsPlaying(!isPlaying);

    useEffect(() => {
        if (!isPlaying) return;

        const interval = setInterval(() => {
            setStepIndex(prev => {
                if (prev < steps.length - 1) return prev + 1;
                setIsPlaying(false);
                return prev;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isPlaying, steps.length]);

    useEffect(() => {
        if (result?.steps?.length && coo?.length) {
            setNodes(coo);
            if (currentStep.graph) setFlow(formatData(currentStep.graph));

            const collectedMinEdges = [];
            for (let i = 0; i <= stepIndex - 1; i++) {
                const step = result.steps[i];
                const nextStep = result.steps[i + 1];

                if (
                    step?.type === "min_edge" &&
                    nextStep?.type === "path_min" &&
                    Array.isArray(nextStep.path)
                ) {
                    const [from, to] = step.edge;
                    const foundInPath = nextStep.path.some(
                        ([pathFrom, pathTo]) =>
                            Array.isArray(pathFrom)
                                ? pathFrom[0] === from && pathFrom[1] === to
                                : pathFrom === from && pathTo === to
                    );
                    if (foundInPath) {
                        collectedMinEdges.push([from, to]);
                    }
                }
            }

            setVisitedMinEdges(collectedMinEdges);
        }
    }, [stepIndex, result, coo]);

    useEffect(() => {
        if (theme === "Dark") {
            setBg("bg-gray-700");
            setArrowColor("white");
        } else {
            setBg("bg-gray-200");
            setArrowColor("black");
        }
    }, [theme]);

    if (!result?.steps || !coo?.length) {
        return <p className="text-center text-gray-500 mt-4">Chargement du graphe...</p>;
    }

    return (
        <div>
            <div className='flex items-center gap-4 justify-center mb-2'>
                <button onClick={goToPreviousStep} className='btn btn-secondary' disabled={stepIndex === 0}>⬅ Prev</button>
                <button onClick={togglePlay} className='btn btn-accent'>{isPlaying ? "⏸ Pause" : "▶ Play"}</button>
                <button onClick={goToNextStep} className='btn btn-secondary' disabled={stepIndex === steps.length - 1}>Next ➡</button>
                <span className="text-sm font-medium">
                    Étape {stepIndex + 1} / {steps.length}
                    {currentStep.type && <span className="ml-2 badge badge-info">{currentStep.type}</span>}
                </span>
            </div>

            <svg
                ref={svgRef}
                width="100%"
                height="500px"
                className={`${bg} rounded-md shadow-sm m-4`}
                style={{ cursor: 'grab' }}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            >
                <defs>
                    <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto">
                        <path d="M0,0 L10,5 L0,10 Z" fill={arrowColor} />
                    </marker>
                </defs>

                {flow.map((edge, i) => {
                    const fromNode = nodes.find(n => n.id === edge.from);
                    const toNode = nodes.find(n => n.id === edge.to);
                    if (!fromNode || !toNode) return null;

                    const { x1, y1, x2, y2 } = getEdgeCoords(fromNode.x, fromNode.y, toNode.x, toNode.y);
                    const midX = (fromNode.x + toNode.x) / 2;
                    const midY = (fromNode.y + toNode.y) / 2;

                    let color = arrowColor;

                    if (visitedMinEdges.some(([from, to]) => from === edge.from && to === edge.to)) {
                        color = "#f87171";
                    }
                    else if (
                        currentStep.type === "min_edge" &&
                        currentStep.edge?.[0] === edge.from &&
                        currentStep.edge?.[1] === edge.to
                    ) {
                        color = "#f97316"; 
                    }
                    if (currentStep.type === "path_min" &&
                        currentStep.path?.some(([from, to]) => from === edge.from && to === edge.to)) {
                        color = "#4ade80"; 
                    }

                    return (
                        <g key={i} style={{ opacity: 0, animation: "fadeIn 0.4s ease forwards" }}>
                            <line
                                x1={x1}
                                y1={y1}
                                x2={x2}
                                y2={y2}
                                stroke={color}
                                strokeWidth="2"
                                markerEnd="url(#arrow)"
                            />
                            <text x={midX} y={midY - 5} textAnchor="middle" fill={color} className="text-sm">
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
                        style={{ opacity: 0, animation: "fadeIn 0.4s ease forwards" }}
                    >
                        <circle r="20" fill="#2563eb" />
                        <text x="0" y="5" textAnchor="middle" fill="white" className="text-sm font-semibold">
                            {node.id}
                        </text>
                    </g>
                ))}
            </svg>

            <style>{`
                @keyframes fadeIn {
                    to { opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default GraphResult;
