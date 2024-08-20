import React, { memo } from 'react';

const WordBox = memo(function WordBox({ children }) {
    return (
        <div className='flex flex-row mx-3 mb-4'>
            {children}
        </div>
    )
});

export default WordBox;