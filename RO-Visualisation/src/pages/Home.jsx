import React, { useEffect, useState } from 'react';
import Graph from '../components/Graph';
import GraphResult from '../components/GraphResult';
import FinalFlow from '../components/finalFlow';
import sendData from '../utils/Flow';
import Waiting from "./../assets/images/waiting.gif"

const Home = ({ theme }) => {
    const [resultFlow, setResultFlow] = useState(null);
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
                alert("Une erreur s’est produite lors de l’envoi du graphe. Veuillez réessayer.");
            }

        } else {

            setShowResult(false);
            console.log("Here");
            console.log(showResult);

        }
    };

    useEffect(() => {
        console.log(resultFlow);
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
                <div className='absolute right-15 bottom-11 w-max' >
                    <div className="tooltip translate-y-36 w-full">
                        <div className="tooltip-content -translate-x-10">
                            <div className="animate-bounce  text-accent text-xs font-black">J'attend le graph !</div>
                        </div>
                        <button className="opacity-0 w-full h-20">Hover me</button>
                    </div>
                    <img src={Waiting} alt="Une personne qui attent" />
                </div>
            )}

        </div>
    );
};

export default Home;