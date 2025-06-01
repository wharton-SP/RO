import React from 'react'
import source from './../../assets/images/source.gif'
import { Blend } from 'lucide-react'

const SuperNodes = () => {
    return (
        <section id="source-puits">
            <h2 className='flex items-center gap-3'><Blend /> <span className='text-4xl font-bold'>Noeuds Fictifs : Source et Puits</span></h2>
            <div className='pt-2'>
                <p className='italic badge badge-soft badge-warning'>Ces deux nœuds sont requis pour lancer le calcul.</p>
            </div>
            <div>
                <p className='font-bold menu-title text-lg'>Comment les ajouter ?</p>
                <p className='px-5 pb-2'>
                    - Cliquez sur <button className="btn btn-sm btn-primary">α</button> pour définir le
                    <strong> nœud source</strong>.
                </p>
                <p className='px-5'>
                    - Cliquez sur <button className="btn btn-sm btn-primary">ω</button> pour définir le
                    <strong> nœud puits</strong>.
                </p>
            </div>
            <div className='w-full flex justify-center py-3'>
                <img src={source} className='w-3/4 rounded-lg'></img>
            </div>
        </section>

    )
}

export default SuperNodes