import React from 'react'
// eslint-disable-next-line no-unused-vars
import {motion} from 'framer-motion'
import ThumbGraph from '../ThumbGraph'

const BrowserLayout = ({theme}) => {
    return (
        <div className="mockup-browser border border-base-300 h-full w-full">
            <div className="mockup-browser-toolbar">
                <div className="input">https://RO-xxxxxx/xxxx</div>
            </div>
            <motion.div layoutId='graphBox' className='flex justify-center items-center h-full'>
                <ThumbGraph theme={theme}/>
            </motion.div>
        </div>
    )
}

export default BrowserLayout