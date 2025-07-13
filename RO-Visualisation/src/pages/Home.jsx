import React, { useEffect, useState } from 'react';
import Graph from '../components/Graph';
import GraphResult from '../components/GraphResult';
import FinalFlow from '../components/finalFlow';
import sendData from '../utils/Flow';
import AnimatedPage from '../components/animation/AnimatedPage';
import GraphEdgesTable from '../components/Table';
import { Info } from 'lucide-react';

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
        <AnimatedPage>
            <div className="App min-h-screen">
                <Graph sendData={handleData} theme={theme} />

                {showResult ? (
                    <>
                        <GraphResult result={resultFlow} coo={coo} finalF={setFinalDisplay} theme={theme} />
                        {isFinalGraph && (
                            <FinalFlow result={resultFlow} coo={coo} theme={theme} />
                        )}
                        <div className='fixed right-15 bottom-11 w-max'>
                            <button className="btn btn-info" onClick={() => document.getElementById('my_modal_2').showModal()}><Info/> Détails</button>
                            <dialog id="my_modal_2" className="modal">
                                <div className='modal-box'>
                                    <GraphEdgesTable data={resultFlow}/>
                                </div>
                                <form method="dialog" className="modal-backdrop">
                                    <button>close</button>
                                </form>
                            </dialog>
                        </div>
                    </>
                ) : (
                    <div className='absolute right-15 bottom-11 w-max' >

                    </div>
                )}
                {/* <div className='absolute top-0 left-0 z-20 flex h-max min-h-screen w-screen bg-primary'>
                    <GraphEdgesTable />
                </div> */}
            </div>
        </AnimatedPage>
    );
};

export default Home;