import React, { useState, useRef, useEffect } from 'react';
import { ArrowBigRightDash, ArrowBigLeftDash, Pause, Play, ChevronLeft, ChevronsLeft, ChevronsRight } from 'lucide-react';
import formatMarkedPath from '../utils/formatting';

const GraphResult = ({ result, coo, finalF, theme }) => {
    const [nodes, setNodes] = useState([]);
    const [flow, setFlow] = useState([]);
    const [stepIndex, setStepIndex] = useState(0);
    const [draggingNode, setDraggingNode] = useState(null);
    const [visitedMinEdges, setVisitedMinEdges] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [markingsToDisplay, setMarkingsToDisplay] = useState([]);
    const [markingIndex, setMarkingIndex] = useState(-1);

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
        Array.isArray(data) ? data.map(edge => ({ from: edge[0], to: edge[1], weight: parseInt(edge[2], 10) })) : [];

    const goToNextStep = () => {
        if (stepIndex < steps.length - 1) {
            setStepIndex(prev => prev + 1);
        } else if (stepIndex === steps.length - 1 && markingIndex < markingsToDisplay.length - 1) {
            setMarkingIndex(prev => prev + 1);
        }
    };

    const goToPreviousStep = () => {
        if (markingIndex >= 0) {
            setMarkingIndex(prev => prev - 1);
        } else if (stepIndex > 0) {
            setStepIndex(prev => prev - 1);
        }
    };

    const togglePlay = () => setIsPlaying(!isPlaying);

    useEffect(() => {
        if (!isPlaying) return;
        const interval = setInterval(() => {
            if (stepIndex < steps.length - 1) {
                setStepIndex(prev => prev + 1);
            } else if (markingIndex < markingsToDisplay.length - 1) {
                setMarkingIndex(prev => prev + 1);
            } else {
                setIsPlaying(false);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [isPlaying, stepIndex, markingIndex, steps.length, markingsToDisplay.length]);

    useEffect(() => {
        if (result?.steps?.length && coo?.length) {
            setNodes(coo);
            if (currentStep.graph) setFlow(formatData(currentStep.graph));

            const collectedMinEdges = [];
            for (let i = 0; i <= stepIndex - 1; i++) {
                const step = steps[i];
                const next = steps[i + 1];
                if (step?.type === "min_edge" && next?.type === "path_min" && Array.isArray(next.path)) {
                    const [from, to] = step.edge;
                    const found = next.path.some(([f, t]) => f === from && t === to);
                    if (found) collectedMinEdges.push([from, to]);
                }
            }
            setVisitedMinEdges(collectedMinEdges);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stepIndex, result, coo]);

    useEffect(() => {
        if (stepIndex === steps.length - 1 && result?.marked_paths?.[0]?.node_markings) {

            const markings = formatMarkedPath(result.marked_paths[0].path);

            console.log(formatMarkedPath(result.marked_paths[0].path));

            setMarkingsToDisplay(markings);
            setMarkingIndex(-1);
        } else {
            setMarkingsToDisplay([]);
            setMarkingIndex(-1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stepIndex, result]);

    useEffect(() => {
        if (stepIndex === steps.length - 1) finalF(true)
    }, [finalF, stepIndex, steps.length])

    useEffect(() => {
        if (theme === "Dark") {
            setBg("bg-gray-700");
            setArrowColor("white");
        } else {
            setBg("bg-gray-200");
            setArrowColor("black");
        }
    }, [theme]);

    if (!result?.steps || !coo?.length) return <p className="text-center text-gray-500 mt-4">Chargement du graphe...</p>;

    return (
        <div className='px-20 py-5 flex flex-col gap-5'>
            <div className='relative flex items-center gap-4 '>
                <button onClick={togglePlay} className='btn btn-accent'>{isPlaying ? <Pause /> : <Play />}</button>
                <button onClick={goToPreviousStep} className='btn btn-secondary'><ChevronsLeft /></button>
                <button onClick={goToNextStep} className='btn btn-secondary'><ChevronsRight /></button>
                <span className={`${(stepIndex === steps.length - 1) ? "opacity-100" : "opacity-0"} absolute -bottom-18 left-10 text-sm font-medium badge badge-primary badge-dash transition-all`}>
                    Flot Complet
                </span>
            </div>

            <div>
                <svg ref={svgRef} width="100%" height="500px" className={`${bg} rounded-md shadow-sm m-4 cursor-default`} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
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

                        if (visitedMinEdges.some(([f, t]) => f === edge.from && t === edge.to)) {
                            color = "#f87171"; // rouge pâle
                        } else if (currentStep.type === "min_edge" && currentStep.edge?.[0] === edge.from && currentStep.edge?.[1] === edge.to) {
                            color = "#f97316"; // orange
                        }
                        if (currentStep.type === "path_min" && currentStep.path?.some(([f, t]) => f === edge.from && t === edge.to)) {
                            color = "#4ade80"; // vert pâle
                        }

                        return (
                            <g key={i} style={{ opacity: 0, animation: "fadeIn 0.4s ease forwards" }}>
                                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="2" markerEnd="url(#arrow)" />
                                <text x={midX} y={midY - 5} textAnchor="middle" fill={color} className="text-sm">{edge.weight}</text>
                            </g>
                        );
                    })}

                    {nodes.map((node) => (
                        <g key={node.id} transform={`translate(${node.x},${node.y})`} className='cursor-grab active:cursor-grabbing' onMouseDown={() => handleNodeMouseDown(node.id)} style={{ opacity: 0, animation: "fadeIn 0.4s ease forwards" }}>
                            <circle r="20" className="fill-current text-primary" />
                            <text x="0" y="5" textAnchor="middle" fill="white" className=" fill-current text-sm text-primary-content font-semibold">{node.id}</text>
                        </g>
                    ))}

                    {markingsToDisplay.slice(0, markingIndex + 1).map(({ id, sign }) => {
                        const node = nodes.find(n => n.id === id);
                        if (!node) return null;
                        return (
                            <text
                                key={`mark-${id}`}
                                x={node.x}
                                y={node.y - 30}
                                textAnchor="middle"
                                fill={sign === '+' ? '#22c55e' : '#ef4444'}
                                fontSize="16"
                                style={{ opacity: 0, animation: "fadeIn 0.3s ease forwards" }}
                            >
                                {sign}
                            </text>
                        );
                    })}
                </svg>
            </div>

            <style>{`
                @keyframes fadeIn {
                    to { opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default GraphResult;
