// eslint-disable-next-line no-unused-vars
import React, { useState, useCallback, useEffect } from 'react';

const GraphBuilder = ({ onSave }) => {
    const [mode, setMode] = useState('addNode'); // 'addNode', 'addEdge', 'delete'
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [selectedNode, setSelectedNode] = useState(null);
    const [capacityInput, setCapacityInput] = useState('');
    const [showCapacityDialog, setShowCapacityDialog] = useState(false);
    const [tempEdge, setTempEdge] = useState(null);

    // Ajout des nœuds fictifs initiaux
    useEffect(() => {
        setNodes(prev => [
            ...prev,
            { id: 'α', x: 100, y: 300, fixed: true },
            { id: 'ω', x: 900, y: 300, fixed: true }
        ]);
    }, []);

    const handleCanvasClick = (e) => {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (mode === 'addNode') {
            const newNode = {
                id: `N${nodes.length + 1}`,
                x,
                y,
                fixed: false
            };
            setNodes([...nodes, newNode]);
        }
    };

    const handleNodeClick = (node, e) => {
        e.stopPropagation();

        if (mode === 'delete') {
            setNodes(nodes.filter(n => n.id !== node.id));
            setEdges(edges.filter(edge =>
                edge.source !== node.id && edge.target !== node.id
            ));
        } else if (mode === 'addEdge') {
            if (!selectedNode) {
                setSelectedNode(node.id);
            } else {
                setTempEdge({ source: selectedNode, target: node.id });
                setShowCapacityDialog(true);
            }
        }
    };

    const handleSaveCapacity = () => {
        if (capacityInput && !isNaN(capacityInput)) {
            setEdges([...edges, {
                source: tempEdge.source,
                target: tempEdge.target,
                capacity: parseInt(capacityInput)
            }]);
            setShowCapacityDialog(false);
            setSelectedNode(null);
            setCapacityInput('');
        }
    };

    const exportGraph = () => {
        return edges.map(edge => ({
            source: edge.source,
            target: edge.target,
            capacity: edge.capacity
        }));
    };

    return (
        <div style={{ position: 'relative', height: '600px', border: '1px solid #ccc' }}>
            {/* Toolbar */}
            <div style={{ padding: '10px', background: '#f0f0f0' }}>
                <button onClick={() => setMode('addNode')} style={{ marginRight: 10 }}>
                    Ajouter Nœud
                </button>
                <button onClick={() => setMode('addEdge')} style={{ marginRight: 10 }}>
                    Ajouter Arête
                </button>
                <button onClick={() => setMode('delete')} style={{ marginRight: 10 }}>
                    Supprimer
                </button>
                <button
                    onClick={() => onSave(exportGraph())}
                    style={{ float: 'right' }}
                >
                    Exporter
                </button>
            </div>

            {/* Canvas */}
            <div
                onClick={handleCanvasClick}
                style={{
                    position: 'relative',
                    height: 'calc(100% - 50px)',
                    cursor: 'crosshair'
                }}
            >
                {/* Arêtes */}
                {edges.map((edge, i) => {
                    const sourceNode = nodes.find(n => n.id === edge.source);
                    const targetNode = nodes.find(n => n.id === edge.target);

                    return (
                        <div key={i}>
                            <svg style={{
                                position: 'absolute',
                                pointerEvents: 'none',
                                overflow: 'visible'
                            }}>
                                <line
                                    x1={sourceNode.x}
                                    y1={sourceNode.y}
                                    x2={targetNode.x}
                                    y2={targetNode.y}
                                    stroke="#666"
                                    strokeWidth="2"
                                />
                                <text
                                    x={(sourceNode.x + targetNode.x) / 2}
                                    y={(sourceNode.y + targetNode.y) / 2}
                                    textAnchor="middle"
                                    fill="#333"
                                    fontSize="12"
                                    dy="-5"
                                >
                                    {edge.capacity}
                                </text>
                            </svg>
                        </div>
                    );
                })}

                {/* Nœuds */}
                {nodes.map(node => (
                    <div
                        key={node.id}
                        onClick={(e) => handleNodeClick(node, e)}
                        style={{
                            position: 'absolute',
                            left: node.x - 20,
                            top: node.y - 20,
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            background: node.fixed ? '#4CAF50' : '#2196F3',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            border: selectedNode === node.id ? '3px solid #FFC107' : 'none',
                            transform: `scale(${selectedNode === node.id ? 1.1 : 1})`,
                            transition: 'all 0.2s'
                        }}
                    >
                        {node.id}
                    </div>
                ))}

                {/* Dialogue de capacité */}
                {showCapacityDialog && (
                    <div style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: 'white',
                        padding: '20px',
                        borderRadius: '5px',
                        boxShadow: '0 0 10px rgba(0,0,0,0.2)'
                    }}>
                        <h3>Capacité de l'arête :</h3>
                        <input
                            type="number"
                            value={capacityInput}
                            onChange={(e) => setCapacityInput(e.target.value)}
                            autoFocus
                            style={{ marginRight: 10 }}
                        />
                        <button onClick={handleSaveCapacity}>Valider</button>
                        <button onClick={() => setShowCapacityDialog(false)}>Annuler</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GraphBuilder;