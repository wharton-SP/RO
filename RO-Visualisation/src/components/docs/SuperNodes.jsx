import React from 'react'
import source from './../../assets/images/source.gif'

const SuperNodes = () => {
    return (
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
            <div className='w-full flex justify-center py-3'>
                <img src={source} className='w-3/4 rounded-lg'></img>
            </div>
        </section>

    )
}

export default SuperNodes