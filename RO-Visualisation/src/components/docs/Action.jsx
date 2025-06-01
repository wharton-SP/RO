import React from 'react'
import action from './../../assets/images/action.gif'
import { SquareMousePointer } from 'lucide-react'

const Action = () => {
    return (
        <section id="actions">
            <h2 className='flex items-center gap-3'><SquareMousePointer />
                <span className='text-4xl font-bold'>
                    Action sur les noeuds.
                </span>
            </h2>
            <div className='pt-2'>
                <p className='italic badge badge-soft badge-warning'>On peut renommer les noeuds ou les supprimer.</p>
            </div>
            <div>
                <p className='font-bold menu-title text-lg'>Renommer ?</p>
                <p className='px-5 pb-2'>
                    - <kbd className="kbd">Clic Droite</kbd> sur le nœud.
                </p>
                <p className='font-bold menu-title text-lg'>Supprimer ?</p>
                <p className='px-5'>
                    - Fait un <kbd className="kbd">Double Clic</kbd> sur le nœud.
                </p>
            </div>
            <div className='w-full flex justify-center py-3'>
                <img src={action} className='w-3/4 rounded-lg'></img>
            </div>
        </section>

    )
}

export default Action