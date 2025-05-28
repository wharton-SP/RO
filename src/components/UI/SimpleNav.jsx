import React from 'react'
import ThemeChanger from './ThemeChanger'
import { Link } from 'react-router-dom'

const SimpleNav = ({ handleThemeChange }) => {
    return (
        <div className="navbar bg-base-100 shadow-sm flex justify-between">
            <Link to="/" className="text-xl">RO | Flot Max</Link>
            <ThemeChanger handleThemeChange={handleThemeChange} />
        </div>
    )
}

export default SimpleNav