import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
    return (
        <div>
            <Link to="/home" className='btn btn-primary'>Home</Link>
        </div>
    )
}

export default Landing