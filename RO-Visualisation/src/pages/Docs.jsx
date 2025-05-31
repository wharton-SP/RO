import React from "react";
import {
    BookOpenIcon,
    RocketIcon,
    GitBranchIcon,
    UploadIcon,
    MousePointerClickIcon,
    InfoIcon,
    Bolt,
    Blend,
    SquareMousePointer,
    Workflow,
    ArrowDownUp,
    CircleHelp,
} from "lucide-react";

const Docs = () => {
    return (
        <div className="flex flex-col lg:flex-row h-full p-4 gap-6">
            {/* Sidebar gauche */}
            <aside className="lg:w-1/4 w-full bg-base-200 p-4 rounded-xl shadow-md h-fit sticky top-4">
                <ul className="menu">
                    <li>
                        <h2 className="menu-title uppercase">Sommaire</h2>
                        <ul>
                            <li><a href="#construction"><Bolt /> Construction du Graphe</a></li>
                            <li><a href="#source-puits"><Blend /> Source et Puits</a></li>
                            <li><a href="#actions"><SquareMousePointer /> Actions sur les Nœuds</a></li>
                            <li><a href="#calcul"><Workflow /> Calcul du Flot Max</a></li>
                            <li><a href="#import-export"><ArrowDownUp /> Import / Export</a></li>
                            <li><a href="#aide"><CircleHelp /> Aide</a></li>
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

                <section id="construction">
                    <h2>🧱 1. Construction du Graphe</h2>
                    <ul>
                        <li>👉 Cliquez n’importe où dans la zone de dessin pour <strong>ajouter un nœud</strong>.</li>
                        <li>
                            👉 Pour <strong>ajouter une arête</strong> :
                            <kbd className="kbd">Shift</kbd> + clic sur le nœud de départ, puis
                            <kbd className="kbd">Shift</kbd> + clic sur le nœud d’arrivée.
                        </li>
                        <li>Le nœud sélectionné est entouré d’un cercle jaune.</li>
                        <li>Vous pouvez déplacer les nœuds à tout moment, même s’ils ne sont pas sélectionnés.</li>
                    </ul>
                </section>

                <div className="divider"></div>

                <section id="source-puits">
                    <h2>🔵 2. Nœuds spéciaux : Source et Puits</h2>
                    <ul>
                        <li>
                            🡒 Cliquez sur <button className="btn btn-sm btn-primary">α</button> pour définir le
                            <strong> nœud source</strong>.
                        </li>
                        <li>
                            🡒 Cliquez sur <button className="btn btn-sm btn-secondary">ω</button> pour définir le
                            <strong> nœud puits</strong>.
                        </li>
                        <li>⚠️ Ces deux nœuds sont requis pour lancer le calcul.</li>
                    </ul>
                </section>

                <div className="divider"></div>

                <section id="actions">
                    <h2>🖱️ 3. Actions sur les Nœuds</h2>
                    <ul>
                        <li>🖱️ <strong>Renommer un nœud :</strong> clic droit.</li>
                        <li>❌ <strong>Supprimer un nœud :</strong> double-clic.</li>
                    </ul>
                </section>

                <div className="divider"></div>

                <section id="calcul">
                    <h2>🚀 4. Calcul du Flot Max</h2>
                    <p>
                        Une fois le graphe prêt, cliquez sur le bouton
                        <button className="btn btn-accent btn-sm mx-2">Flot Max</button>
                        pour lancer l’algorithme.
                    </p>
                    <p>
                        Les étapes du calcul seront affichées de façon progressive : chemins augmentants, mise à jour des flots, etc.
                    </p>
                </section>

                <div className="divider"></div>

                <section id="import-export">
                    <h2>📂 5. Import / Export</h2>
                    <ul>
                        <li>
                            💾 <strong>Exporter :</strong>
                            <button className="btn btn-outline btn-sm mx-2">Exporter</button> pour sauvegarder le graphe.
                        </li>
                        <li>
                            📁 <strong>Importer :</strong>
                            <button className="btn btn-outline btn-sm mx-2">Importer</button> pour charger un fichier JSON.
                        </li>
                    </ul>
                </section>

                <div className="divider"></div>

                <section id="aide">
                    <h2>❓ Aide</h2>
                    <p>
                        Besoin d’aide ? Consultez la FAQ dans l’app ou contactez l’équipe projet.
                    </p>
                </section>
            </main>
        </div>
    );
};

export default Docs;
