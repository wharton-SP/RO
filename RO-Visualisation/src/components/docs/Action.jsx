import React from 'react'
import action from './../../assets/images/action.gif'

const Action = () => {
    return (
        <section id="actions">
            <h2>🖱️ 3. Actions sur les Nœuds</h2>
            <ul>
                <li>🖱️ <strong>Renommer un nœud :</strong> clic droit.</li>
                <li>❌ <strong>Supprimer un nœud :</strong> double-clic.</li>
            </ul>
            <div className='w-full flex justify-center py-3'>
                <img src={action} className='w-3/4 rounded-lg'></img>
            </div>
        </section>

    )
}

export default Action