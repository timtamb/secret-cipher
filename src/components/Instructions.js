import React from 'react';

export default function Instructions() {

    return (
        <>
            <div className='text-center text-lg text-gray-800 dark:text-white'>
                <p className='mb-9 text-xl'>decrypt the message by typing letter substitutions until you reveal the hidden message.</p>
                <p className='mb-3'>click a box to select it and type a letter to fill it.</p>
                <p className='mb-3'>use the left and right arrow keys to move the selected box.</p>
                <p className='mb-3'>use backspace or delete to clear the selected box.</p>
                <p className='mb-3'>click clear to remove all letters.</p>
                <p className='mb-9'>click submit when you think you've solved it.</p>
                <p className='mb-9 text-xl'>good luck!</p>
            </div>
        </>
    )
}