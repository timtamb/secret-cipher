import React from 'react';

import { displayTimer } from '../utils.js';


export default function GameEndScreen({ timestamp, hintsUsed }) {

    return (
        <>
            <div className='font-mono text-2xl text-center text-gray-800 dark:text-white mb-6'>
                <p className='mb-4 text-3xl font-black'>success!</p>
                <p>your time: {displayTimer(timestamp)}</p>
                <p>hints used: {hintsUsed}</p>
            </div>
        </>
    )
}