import React, { useState, useEffect } from 'react';

import { displayTimer } from '../utils.js';


function Timer({ timerRef }) {
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        const timerIntervalId = setInterval(() => setTimer(prev => prev + 1), 1000);
        timerRef.current = timer;
        return () => clearInterval(timerIntervalId);
    }, [timer, timerRef])

    return (
        <div className='mt-9'>
            <p className='text-xl text-gray-700 dark:text-gray-400'>{displayTimer(timer)}</p>
        </div>
    )
}

export default Timer;