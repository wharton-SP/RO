import React from 'react'
import { Link } from 'react-router-dom'
import ThemeChanger from '../components/UI/ThemeChanger'

const Landing = () => {
    return (
        <div>
            <ThemeChanger/>
            <Link to="/home">Home</Link>
        </div>
    )
}

export default Landing