import { Bolt } from 'lucide-react'
import build from "./../../assets/images/build.gif"

const Build = () => {
    return (
        <section id="construction">
            <h2 className='flex items-center gap-3'><Bolt /> <span className='text-4xl font-bold'>Construction du Graphe</span></h2>
            <div>
                <p className='font-bold menu-title text-lg'>Comment ajouter des noeuds ?</p>
                <p className='px-5'> - C'est simple, Cliquez n’importe où dans la zone de dessin.</p>
                <p className='font-bold menu-title text-lg'>Sélection d'un noeud et Création d'un arc.</p>
                <p className='px-5'>
                    <p className='flex gap-2'>
                        - <kbd className="kbd">Shift</kbd> + <kbd className="kbd">Clic</kbd> sur le nœud.
                        <div className='italic badge badge-soft badge-warning'>Le nœud sélectionné est entouré d’un cercle jaune.</div>
                    </p>
                    <p>
                        - Sélectionne le nœud de départ, puis sélectionne le nœud d’arrivée pour ajouter une arête créeant ainsi un arc .
                    </p>

                </p>
                <p className='font-bold menu-title text-lg'>Deplacer un noeud ? Rien de plus simple</p>
                <p className='px-5'>
                    - <kbd className='kbd'>Clic (Maintenir)</kbd> sur un noeud et deplacer la souris.
                </p>
            </div>

            <div className='w-full flex justify-center py-3'>
                <img src={build} className='w-3/4 rounded-lg'></img>
            </div>
        </section>
    )
}

export default Build