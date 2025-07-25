import React, { useEffect, useState } from 'react';
import Graph from '../components/Graph';
import GraphResult from '../components/GraphResult';
import FinalFlow from '../components/finalFlow';
import sendData from '../utils/Flow';
import AnimatedPage from '../components/animation/AnimatedPage';
import { motion, AnimatePresence } from "framer-motion";
import GraphEdgesTable from '../components/Table';
import { CircleX, Info } from 'lucide-react';

const Home = ({ theme }) => {
    const [resultFlow, setResultFlow] = useState(null);
    const [coo, setCoo] = useState({});
    const [isFinalGraph, setIsFinalGraph] = useState(false)
    const [showResult, setShowResult] = useState(false);
    const [isErase, setIsErase] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const setFinalDisplay = (bool) => {
        setIsFinalGraph(bool)
    }

    const clear = () => {
        setResultFlow(null);
        setCoo({});
        setIsFinalGraph(false);
        setShowResult(false);
        setIsErase(false);
    };

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

    useEffect(() => {
        if (isErase) {
            clear();
        }
    }, [isErase]);

    const toggleOverlay = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <AnimatedPage>
            <div className="App min-h-screen">
                <Graph sendData={handleData} theme={theme} clear={setIsErase} />

                {showResult ? (
                    <>
                        <GraphResult result={resultFlow} coo={coo} finalF={setFinalDisplay} theme={theme} />
                        {isFinalGraph && (
                            <FinalFlow result={resultFlow} coo={coo} theme={theme} />
                        )}
                        <div className="fixed z-20 right-5 bottom-5 flex items-center justify-center">
                            <button onClick={toggleOverlay} className='btn btn-primary'><Info size={18} /> Tableau</button>

                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        className="fixed inset-0 bg-base-200 flex items-center justify-center z-20"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <motion.div
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0.9, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className=" text-2xl"
                                        >
                                            <GraphEdgesTable data={resultFlow} />
                                            <button onClick={toggleOverlay} className='fixed top-5 right-5 text-error p-5 hover:rotate-180 hover:scale-105 transition-all'><CircleX /></button>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </>
                ) : (
                    <div className='absolute right-15 bottom-11 w-max' >

                    </div>
                )}
            </div>
        </AnimatedPage>
    );
};

export default Home;