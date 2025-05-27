import React from 'react'
import ThemeChanger from './ThemeChanger'

const SimpleNav = () => {
    return (
        <div className="navbar bg-base-100 shadow-sm flex justify-between">
            <a className="btn btn-ghost text-xl">RO | Flot Max</a>
            <ThemeChanger />
        </div>
    )
}

export default SimpleNav