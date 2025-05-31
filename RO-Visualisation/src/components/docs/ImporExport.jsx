import React from 'react'

const ImporExport = () => {
    return (
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
    )
}

export default ImporExport