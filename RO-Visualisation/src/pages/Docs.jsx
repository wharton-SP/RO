import React, { useState } from "react";
import { BookOpenIcon, Bolt, Blend, SquareMousePointer, Workflow, ArrowDownUp, CircleHelp } from "lucide-react";
import Build from "../components/docs/Build";
import SuperNodes from "../components/docs/SuperNodes";
import Action from "../components/docs/Action";
import Calcul from "../components/docs/Calcul";
import ImporExport from "../components/docs/ImporExport";
import Help from "../components/docs/Help";

const Docs = () => {

    const [section, setSection] = useState("Build");

    const isSection = (section) => {
        setSection(section)
    }

    return (
        <div className="flex flex-col lg:flex-row h-full p-4 gap-6">
            {/* Sidebar gauche */}
            <aside className="lg:w-1/4 w-full bg-base-200 p-4 rounded-xl shadow-md h-fit sticky top-4">
                <ul className="menu">
                    <li>
                        <h2 className="menu-title uppercase">Sommaire</h2>
                        <ul>
                            <li><div onClick={() => isSection("Build")}><Bolt /> Construction du Graphe</div></li>
                            <li><div onClick={() => isSection("Source")}><Blend /> Source et Puits</div></li>
                            <li><div onClick={() => isSection("Action")}><SquareMousePointer /> Actions sur les Nœuds</div></li>
                            <li><div onClick={() => isSection("Calcul")}><Workflow /> Calcul du Flot Max</div></li>
                            <li><div onClick={() => isSection("ImpExp")}><ArrowDownUp /> Import / Export</div></li>
                            <li><div onClick={() => isSection("Help")}><CircleHelp /> Aide</div></li>
                        </ul>
                    </li>
                </ul>
            </aside>

            {/* Contenu principal */}
            <main className="lg:w-3/4 w-full prose prose-lg max-w-none">
                <h1 className="text-3xl font-bold flex items-center gap-2">
                    <BookOpenIcon className="w-6 h-6" />
                    Documentation – Visualisateur Flot Max (RO)
                </h1>

                <p>
                    Cette application vous permet de <strong>dessiner un graphe</strong>, de <strong>calculer un flot
                        maximal</strong> et d’<strong>afficher les étapes</strong> de l’algorithme de façon interactive.
                </p>

                <div className="divider"></div>

                {(section === "Build") && <Build />}
                {(section === "Source") && <SuperNodes />}
                {(section === "Action") && <Action />}
                {(section === "Calcul") && <Calcul />}
                {(section === "ImpExp") && <ImporExport />}
                {(section === "Help") && <Help />}

            </main>
        </div>
    );
};

export default Docs;
