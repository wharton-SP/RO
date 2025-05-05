import React, { useState, useRef, useEffect, useCallback } from 'react';

const WeightedGraph = () => {
    const containerRef = useRef(null);
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [scale, setScale] = useState(1);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [draggingNode, setDraggingNode] = useState(null);

    const dragStart = useRef({ x: 0, y: 0 });
    const initialOffset = useRef({ x: 0, y: 0 });
    const initialNodePosition = useRef({ x: 0, y: 0 });

    // Données du graphe
    const graphData = [
        ["α", "A", 35], ["α", "B", 25], ["α", "C", 25],
        ["A", "D", 10], ["A", "E", 5], ["A", "G", 20],
        ["B", "D", 10], ["B", "E", 5], ["B", "F", 10],
        ["C", "F", 10], ["C", "G", 15],
        ["D", "ω", 20], ["E", "ω", 10], ["F", "ω", 20], ["G", "ω", 35]
    ];

    // Initialisation du graphe
    useEffect(() => {
        const uniqueNodes = [...new Set(graphData.flatMap(edge => [edge[0], edge[1]]))];
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const radius = Math.min(window.innerWidth, window.innerHeight) * 0.4;
        const angleStep = (2 * Math.PI) / uniqueNodes.length;

        const nodePositions = uniqueNodes.reduce((acc, label, index) => {
            const angle = angleStep * index;
            acc[label] = {
                x: centerX + radius * Math.cos(angle),
                y: centerY + radius * Math.sin(angle)
            };
            return acc;
        }, {});

        const createdNodes = uniqueNodes.map(label => ({
            id: label,
            x: nodePositions[label].x,
            y: nodePositions[label].y,
            label
        }));

        const createdEdges = graphData.map(([from, to, weight]) => ({
            from,
            to,
            weight,
            id: `${from}-${to}`
        }));

        setNodes(createdNodes);
        setEdges(createdEdges);
    }, []);

    // Gestionnaire d'événements pour le déplacement du canvas
    const handleMouseDown = useCallback((e) => {
        if (e.target === containerRef.current) {
            setIsDragging(true);
            dragStart.current = { x: e.clientX, y: e.clientY };
            initialOffset.current = { ...offset };
        }
    }, [offset]);

    const handleMouseMove = useCallback((e) => {
        if (draggingNode) {
            // Déplacement d'un nœud spécifique
            const deltaX = (e.clientX - dragStart.current.x) / scale;
            const deltaY = (e.clientY - dragStart.current.y) / scale;

            setNodes(prevNodes =>
                prevNodes.map(node =>
                    node.id === draggingNode.id ? {
                        ...node,
                        x: initialNodePosition.current.x + deltaX,
                        y: initialNodePosition.current.y + deltaY
                    } : node
                )
            );
        } else if (isDragging) {
            // Déplacement du canvas
            const dx = e.clientX - dragStart.current.x;
            const dy = e.clientY - dragStart.current.y;
            setOffset({
                x: initialOffset.current.x + dx,
                y: initialOffset.current.y + dy
            });
        }
    }, [draggingNode, isDragging, scale]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
        setDraggingNode(null);
    }, []);

    // Gestionnaire pour le déplacement des nœuds
    const handleNodeMouseDown = useCallback((e, node) => {
        e.stopPropagation();
        setDraggingNode(node);
        dragStart.current = { x: e.clientX, y: e.clientY };
        initialNodePosition.current = { x: node.x, y: node.y };
    }, []);

    // Gestion du zoom
    const handleWheel = useCallback((e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        setScale(prev => Math.min(Math.max(0.5, prev * delta), 3));
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: '#f5f5f5',
                cursor: draggingNode || isDragging ? 'grabbing' : 'grab',
                overflow: 'hidden'
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
        >
            {/* Nœuds */}
            {nodes.map(node => (
                <div
                    key={node.id}
                    onMouseDown={(e) => handleNodeMouseDown(e, node)}
                    style={{
                        position: 'absolute',
                        zIndex: 30,
                        left: (node.x * scale) + offset.x,
                        top: (node.y * scale) + offset.y,
                        transform: 'translate(-50%, -50%)',
                        width: 30,
                        height: 30,
                        borderRadius: '50%',
                        backgroundColor: '#4285f4',
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontWeight: 'bold',
                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                        cursor: 'pointer',
                        userSelect: 'none',
                        transition: draggingNode?.id === node.id ? 'none' : 'left 0.1s, top 0.1s'
                    }}
                >
                    {node.label}
                </div>
            ))}

            {/* Arêtes */}
            {edges.map(edge => {
                const node1 = nodes.find(n => n.id === edge.from);
                const node2 = nodes.find(n => n.id === edge.to);
                if (!node1 || !node2) return null;

                const x1 = (node1.x * scale) + offset.x;
                const y1 = (node1.y * scale) + offset.y;
                const x2 = (node2.x * scale) + offset.x;
                const y2 = (node2.y * scale) + offset.y;

                const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
                const angle = Math.atan2(y2 - y1, x2 - x1);

                return (
                    <React.Fragment key={edge.id}>
                        <div
                            style={{
                                position: 'absolute',
                                left: x1,
                                top: y1,
                                width: length,
                                height: 2,
                                backgroundColor: '#666',
                                transform: `rotate(${angle}rad)`,
                                transformOrigin: '0 0',
                                zIndex: 10
                            }}
                        />
                        <div
                            style={{
                                position: 'absolute',
                                left: (x1 + x2) / 2,
                                top: (y1 + y2) / 2,
                                transform: `translate(-50%, -50%) rotate(${angle}rad)`,
                                backgroundColor: 'white',
                                padding: '2px 8px',
                                borderRadius: 4,
                                fontSize: 12,
                                fontWeight: 'bold',
                                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                                border: '1px solid #eee',
                                zIndex: 20
                            }}
                        >
                            {edge.weight}
                        </div>
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default WeightedGraph;