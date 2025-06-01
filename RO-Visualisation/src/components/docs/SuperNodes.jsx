import React from 'react'
import source from './../../assets/images/source.gif'
import { Blend } from 'lucide-react'

const SuperNodes = () => {
    return (
        <section id="source-puits">
            <h2 className='flex items-center gap-3'><Blend /> <span className='text-lg font-bold'>Noeuds Fictifs : Source et Puits</span></h2>
            <ul>
                <li>
                    🡒 Cliquez sur <button className="btn btn-sm btn-primary">α</button> pour définir le
                    <strong> nœud source</strong>.
                </li>
                <li>
                    🡒 Cliquez sur <button className="btn btn-sm btn-primary">ω</button> pour définir le
                    <strong> nœud puits</strong>.
                </li>
                <li className=' italic badge badge-soft badge-warning'>Ces deux nœuds sont requis pour lancer le calcul.</li>
            </ul>
            <div className='w-full flex justify-center py-3'>
                <img src={source} className='w-3/4 rounded-lg'></img>
            </div>
        </section>

    )
}

export default SuperNodes