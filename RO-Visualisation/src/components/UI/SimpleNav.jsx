import React from 'react'
import ThemeChanger from './ThemeChanger'
import { Link } from 'react-router-dom'

// eslint-disable-next-line no-unused-vars
const SimpleNav = ({ handleThemeChange }) => {
    return (
        <div className="navbar bg-base-100 shadow-sm flex justify-between px-10">
            <Link to="/" className="text-xl">R.O. | Flot Maximal</Link>
            <div className='flex items-center gap-3'>
                <div className='flex gap-5'>
                    <Link to="/" className='hover:underline hover:text-primary transition-all'>Accueil</Link>
                    <Link to="/home" className='hover:underline hover:text-primary transition-all'>Graph</Link>
                    {/* <Link to="/docs" className='hover:underline hover:text-primary transition-all'>Docs</Link> */}
                </div>
            </div>
        </div>
    )
}

export default SimpleNav