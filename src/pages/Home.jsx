import React, { useEffect, useState } from 'react';
import Graph from '../components/Graph';
import GraphResult from '../components/GraphResult';
import sendData from '../utils/Flow';

const Home = () => {
    const [resultFlow, setResultFlow] = useState({
        nodes: [],
        edges: []
    });

    const handleData = async (data) => {
        try {
            const flow = await sendData(data);
            setResultFlow(flow);
        } catch (error) {
            console.error("Erreur lors de l'envoi des données :", error);
        }
    };

    useEffect(() => {
        console.log("Flow result updated:", resultFlow);

    }, [resultFlow]);

    return (
        <div className="App">
            <h1 className="text-xl font-bold text-center my-4">Graphe Pondéré Interactif</h1>
            <Graph sendData={handleData} />
            <GraphResult flow={resultFlow} />
        </div>
    );
};

export default Home;