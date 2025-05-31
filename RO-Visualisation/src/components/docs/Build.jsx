import React from 'react'

const Build = () => {
    return (
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
    )
}

export default Build