import React, { useState } from "react";
import { BookOpenIcon, Bolt, Blend, SquareMousePointer, Workflow, ArrowDownUp, CircleHelp } from "lucide-react";
import Build from "../components/docs/Build";
import SuperNodes from "../components/docs/SuperNodes";
import Action from "../components/docs/Action";
import Calcul from "../components/docs/Calcul";
import ImporExport from "../components/docs/ImporExport";
import AnimatedPage from "../components/animation/AnimatedPage";

const Docs = () => {

    const [section, setSection] = useState("Build");

    const isSection = (section) => {
        setSection(section)
    }

    return (

        <div className='absolute w-screen h-screen -z-10 top-0 left-0  pt-15 overflow-hidden rounded-xl' >
            <AnimatedPage>
                <div className="w-screen" style={{height: "calc(100vh - 1rem)"}}>
                    <div className="flex flex-col lg:flex-row  p-4 gap-6" style={{height: "92%"}}>
                        {/* Sidebar gauche */}
                        <aside className="lg:w-1/4 w-full bg-base-200 p-4 rounded-xl shadow-md ">
                            <h1 className="menu-title text-3xl font-bold flex items-center gap-2">
                                <BookOpenIcon size={30} />
                                Documentation
                            </h1>
                            <ul className="menu">
                                <li>
                                    <h2 className="menu-title uppercase">Sommaire</h2>
                                    <ul>
                                        <li><div onClick={() => isSection("Build")}><Bolt /> Construction du Graphe</div></li>
                                        <li><div onClick={() => isSection("Source")}><Blend /> Source et Puits</div></li>
                                        <li><div onClick={() => isSection("Action")}><SquareMousePointer /> Actions sur les Nœuds</div></li>
                                        <li><div onClick={() => isSection("Calcul")}><Workflow /> Calcul du Flot Max</div></li>
                                        <li><div onClick={() => isSection("ImpExp")}><ArrowDownUp /> Import / Export</div></li>
                                    </ul>
                                </li>
                            </ul>
                        </aside>
                        {/* Contenu principal */}
                        <main className="lg:w-3/4 w-full flex flex-col gap-4">
                            <div className="w-full bg-base-200 p-4 rounded-xl shadow-md h-full overflow-y-scroll">
                                {(section === "Build") && <Build />}
                                {(section === "Source") && <SuperNodes />}
                                {(section === "Action") && <Action />}
                                {(section === "Calcul") && <Calcul />}
                                {(section === "ImpExp") && <ImporExport />}
                            </div>

                        </main>
                    </div>
                </div>
            </AnimatedPage>
        </div>
    );
};

export default Docs;
