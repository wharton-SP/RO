import React from 'react'
import { Link } from 'react-router-dom'
import { FileText } from 'lucide-react'

const Landing = () => {
    return (
        <div className='absolute h-screen w-screen -z-10 top-0 left-0 overflow-hidden flex justify-center items-center'>
            <div className='relative flex items-center gap-2'>
                <div className='flex flex-col gap-5'>
                    <div>
                        <h1 className='uppercase text-5xl font-bold'>
                            Flot Maximal <span className='text-primary text-4xl'>.</span>
                        </h1>
                        <h3 className='font-bold text-2xl'>Recherche Operationnelle (R.O.)</h3>
                    </div>
                    <p>
                        Basé sur l'algorythme de Ford Fulkerson.
                    </p>
                    <div className='flex gap-5'>
                        <Link to="/home" className='btn btn-primary'>Commencer</Link>
                        <Link to="/docs" className='btn btn-outline btn-primary'>
                            <FileText size={20}/>
                            Docs
                        </Link>
                    </div>
                </div>
                <div>
                    Graph Representation
                </div>
            </div>
        </div>
    )
}

export default Landing