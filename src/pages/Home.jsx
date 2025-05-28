import React, { useEffect, useState } from 'react';
import Graph from '../components/Graph';
import GraphResult from '../components/GraphResult';
import FinalFlow from '../components/finalFlow';
import sendData from '../utils/Flow';

const Home = ({ theme }) => {
    const [resultFlow, setResultFlow] = useState({});
    const [coo, setCoo] = useState({});
    const [isFinalGraph, setIsFinalGraph] = useState(false)
    const [showResult, setShowResult] = useState(false);

    const setFinalDisplay = (bool) => {
        setIsFinalGraph(bool)
    }

    const handleData = async (data) => {
        console.log("data : " + data);
        if (data !== null) {
            try {
                const flow = await sendData(data);
                setResultFlow(flow);
                setCoo(data.nodes);
                setShowResult(true);
            } catch (error) {
                console.error("Erreur lors de l'envoi des données :", error);
            }
        } else {
            setShowResult(false);
            console.log("Here");
            console.log(showResult);


        }
    };

    useEffect(() => {
    }, [resultFlow]);

    return (
        <div className="App min-h-screen">
            <Graph sendData={handleData} theme={theme} />

            {showResult ? (
                <>
                    <GraphResult result={resultFlow} coo={coo} finalF={setFinalDisplay} theme={theme} />
                    {isFinalGraph && (
                        <FinalFlow result={resultFlow} coo={coo} theme={theme} />
                    )}
                </>
            ) : (
                <div className='h-10 w-screen' >
                    <div className="skeleton h-full w-full flex items-center justify-center gap-2">
                        <span>En Attente de Graph à Afficher </span>
                        <span className="loading loading-dots loading-md"></span>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Home;