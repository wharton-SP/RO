import React from 'react'
// eslint-disable-next-line no-unused-vars
import {motion} from 'framer-motion'
import ThumbGraph from '../ThumbGraph'

const BrowserLayout = ({theme}) => {
    return (
        <div className="mockup-window border border-base-300 h-full w-full">
            <motion.div layoutId='graphBox' className='flex justify-center items-center h-full'>
                <ThumbGraph theme={theme}/>
            </motion.div>
        </div>
    )
}

export default BrowserLayout