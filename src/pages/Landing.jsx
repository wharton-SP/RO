import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
    return (
        <div className='absolute h-screen w-screen -z-10 top-0 left-0 overflow-hidden flex justify-center items-center'>
            <div className='relative'>
                
                <Link to="/home" className='btn btn-primary'>Home</Link>
            </div>
        </div>
    )
}

export default Landing