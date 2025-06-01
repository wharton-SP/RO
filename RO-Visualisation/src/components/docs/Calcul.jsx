import { Workflow } from 'lucide-react'
import React from 'react'

const Calcul = () => {
    return (
        <section id="calcul">
            <h2 className='flex items-center gap-3'><Workflow /> <span className='text-4xl font-bold'>Calcul du Flot Maximal.</span></h2>
            <div className='pt-2'>
                <p className='italic badge badge-soft badge-warning'>Assurez-vous que votre graph est prêt.</p>
            </div>
            <div>
                <p className='font-bold menu-title text-lg'>Lancer le calcul</p>
                <p className='px-5 pb-2'>
                    - Appuye juste sur <button className="btn btn-sm btn-secondary"><Workflow /> Flot Max</button>
                </p>
                <p>
                    Les étapes du calcul seront affichées de façon progressive : chemins augmentants, mise à jour des flots, etc.
                </p>
            </div>
            <div className='pt-2'>
                <p className='italic badge badge-soft badge-info'>Le graph sera envoyer vers le backend où il sera traité. Il sera ensuite retourné avec les etapes de résolution.</p>
            </div>
        </section>
    )
}

export default Calcul