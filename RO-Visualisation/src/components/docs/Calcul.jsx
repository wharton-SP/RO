import React from 'react'

const Calcul = () => {
    return (
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
    )
}

export default Calcul