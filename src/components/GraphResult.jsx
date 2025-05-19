import React, { useState, useRef, useEffect } from 'react';

const GraphResult = ({ result, coo }) => {
    const [flow, setFlow] = useState({});
    const [currentStep, setCurrentStep] = useState(0);
    const [subStep, setSubStep] = useState(0);
    const [maxStep, setMaxStep] = useState(0);
    const [nodes, setNodes] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const intervalRef = useRef(null);
    const svgRef = useRef(null);
    const [draggingNode, setDraggingNode] = useState(null);

    const formatData = (data) => {
        return data.map(edge => ({
            from: edge[0],
            to: edge[1],
            weight: parseInt(edge[2], 10),
        }));
    };

    const shouldSkipIntermediateSteps = (etape) => {
        return (!etape.min_edge || etape.min_edge.length === 0) &&
            (!etape.path_min || etape.path_min.length === 0);
    };

    useEffect(() => {
        if (result.etapes) {
            setFlow(formatData(result.etapes[0].graph));
            setNodes(coo);
            setMaxStep(result.etapes.length - 1);
            setCurrentStep(0);
            setSubStep(shouldSkipIntermediateSteps(result.etapes[0]) ? 2 : 0);
        }
    }, [result, coo]);

    useEffect(() => {
        if (subStep === 2) {
            setFlow(formatData(result.etapes[currentStep].graph));
        }
    }, [subStep, currentStep, result]);

    useEffect(() => {
        if (isPlaying) {
            intervalRef.current = setInterval(() => {
                setSubStep(prevSub => {
                    const etape = result.etapes[currentStep];
                    if (shouldSkipIntermediateSteps(etape)) {
                        setSubStep(2);
                        setCurrentStep(prevStep => {
                            if (prevStep < maxStep) {
                                const nextEtape = result.etapes[prevStep + 1];
                                setSubStep(shouldSkipIntermediateSteps(nextEtape) ? 2 : 0);
                                return prevStep + 1;
                            } else {
                                clearInterval(intervalRef.current);
                                setIsPlaying(false);
                                return prevStep;
                            }
                        });
                        return 2;
                    } else if (prevSub < 2) {
                        return prevSub + 1;
                    } else {
                        setSubStep(0);
                        setCurrentStep(prevStep => {
                            if (prevStep < maxStep) {
                                const nextEtape = result.etapes[prevStep + 1];
                                setSubStep(shouldSkipIntermediateSteps(nextEtape) ? 2 : 0);
                                return prevStep + 1;
                            } else {
                                clearInterval(intervalRef.current);
                                setIsPlaying(false);
                                return prevStep;
                            }
                        });
                        return 0;
                    }
                });
            }, 1000);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [isPlaying]);

    const handleStepNext = () => {
        const etape = result.etapes[currentStep];

        if (shouldSkipIntermediateSteps(etape)) {
            if (currentStep < maxStep) {
                const nextEtape = result.etapes[currentStep + 1];
                setCurrentStep(currentStep + 1);
                setSubStep(shouldSkipIntermediateSteps(nextEtape) ? 2 : 0);
            }
        } else {
            if (subStep < 2) {
                setSubStep(subStep + 1);
            } else if (currentStep < maxStep) {
                const nextEtape = result.etapes[currentStep + 1];
                setCurrentStep(currentStep + 1);
                setSubStep(shouldSkipIntermediateSteps(nextEtape) ? 2 : 0);
            }
        }
    };

    const handleStepPrev = () => {
        if (subStep > 0) {
            setSubStep(subStep - 1);
        } else if (currentStep > 0) {
            const prevEtape = result.etapes[currentStep - 1];
            setCurrentStep(currentStep - 1);
            setSubStep(shouldSkipIntermediateSteps(prevEtape) ? 2 : 2);
        }
    };

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
    const currentEtape = result.etapes[currentStep];
    const minEdge = currentEtape.min_edge;
    const pathMin = currentEtape.path_min || [];

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
        <div className="mt-8">
            <h2 className="text-lg font-semibold text-center mb-2">Résultat du flot maximal</h2>

            <div className="flex justify-center gap-4 mb-4">
                <button
                    onClick={handleStepPrev}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    disabled={currentStep === 0 && subStep === 0}
                >
                    Étape précédente
                </button>
                <button
                    onClick={handleStepNext}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    disabled={currentStep === maxStep && subStep === 2}
                >
                    Étape suivante
                </button>
                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`px-4 py-2 rounded ${isPlaying ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} text-white`}
                >
                    {isPlaying ? 'Pause' : 'Lecture auto'}
                </button>
            </div>

            <p className="text-center text-sm text-gray-600 mb-2">
                {['Affichage de l’arête min_edge', 'Affichage du chemin path_min', 'Affichage du graphe complet'][subStep]}
            </p>

            <svg
                ref={svgRef}
                width="100%"
                height="600px"
                style={{ border: '1px solid #ccc', cursor: 'move' }}
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
                        <path d="M0,0 L4,2 L0,4 Z" fill="black" />
                    </marker>
                </defs>

                {edges.map((edge, i) => {
                    const fromNode = nodes.find(n => n.id === edge.from);
                    const toNode = nodes.find(n => n.id === edge.to);
                    if (!fromNode || !toNode) return null;

                    const { x1, y1, x2, y2 } = getEdgeCoords(fromNode.x, fromNode.y, toNode.x, toNode.y);
                    const midX = (fromNode.x + toNode.x) / 2;
                    const midY = (fromNode.y + toNode.y) / 2;

                    const isMinEdge = minEdge && edge.from === minEdge[0] && edge.to === minEdge[1];
                    const isInPathMin = pathMin.some(p => p[0] === edge.from && p[1] === edge.to);

                    let color = "black";
                    let strokeWidth = 2;

                    if (subStep === 0 && isMinEdge) {
                        color = "red";
                        strokeWidth = 4;
                    } else if (subStep === 1 && (isMinEdge || isInPathMin)) {
                        color = isMinEdge ? "red" : "green";
                        strokeWidth = isMinEdge ? 4 : 3;
                    } else if (subStep === 2) {
                        if (isMinEdge) {
                            color = "red";
                            strokeWidth = 4;
                        } else if (isInPathMin) {
                            color = "green";
                            strokeWidth = 3;
                        }
                    }

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

            <div className="mt-4 flex justify-center gap-8 text-sm text-gray-700">
                <div><span className="inline-block w-4 h-4 bg-red-600 rounded-full mr-2"></span> Arête min_edge</div>
                <div><span className="inline-block w-4 h-4 bg-green-600 rounded-full mr-2"></span> Chemin minimal</div>
                <div><span className="inline-block w-4 h-4 bg-black rounded-full mr-2"></span> Autres arêtes</div>
            </div>
        </div>
    );
};

export default GraphResult;
