import { Bolt } from 'lucide-react'
import build from "./../../assets/images/build.gif"

const Build = () => {
    return (
        <section id="construction">
            <h2 className='flex items-center gap-3'><Bolt /> <span className='text-lg font-bold'>Construction du Graphe</span></h2>
            <ul>
                <li>👉 Cliquez n’importe où dans la zone de dessin pour <strong>ajouter un nœud</strong>.</li>
                <li>
                    👉 Pour <strong>ajouter une arête</strong> :
                    <kbd className="kbd">Shift</kbd> + <kbd className="kbd">Clic</kbd> sur le nœud de départ, puis
                    <kbd className="kbd">Shift</kbd> + <kbd className="kbd">Clic</kbd> sur le nœud d’arrivée.
                </li>
                <li>Le nœud sélectionné est entouré d’un cercle jaune.</li>
                <li>Vous pouvez déplacer les nœuds à tout moment, même s’ils ne sont pas sélectionnés.</li>
            </ul>
            <div className='w-full flex justify-center py-3'>
                <img src={build} className='w-3/4 rounded-lg'></img>
            </div>
        </section>
    )
}

export default Build