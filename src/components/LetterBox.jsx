import React, { memo } from 'react';

const LetterBox = memo(function LetterBox(props) {

    const handleClick = () => {
        props.handleLetterClick(props.index);
    }

    const getLetterColour = () => {
        let color = ' text-gray-700 dark:text-gray-400';
        if (props.isDuplicated) {
            color = ' text-red-700 dark:text-red-500'
        }
        return color;
    }

    const getBackgroundColour = () => {
        let color = '';
        if (props.isActiveIndex) {
            color = ' bg-amber-400 dark:bg-amber-700';
        } else if (props.isActiveLetter) {
            color = ' bg-amber-400 dark:bg-amber-800 bg-opacity-40 dark:bg-opacity-50';
        }
        return color;
    }

    if ([',', '.', '?', "'", ':', ';', '!'].includes(props.letter)) {
        return (
            <div className={'h-12 w-6 flex justify-center items-center text-3xl' + getLetterColour()}>
                <p className='w-6 bg-inherit focus:outline-none caret-transparent'>{props.letter}</p>
            </div>
        )
    } else {
        return (
            <div className={'flex flex-col' + getLetterColour()}>
                <div className={'border-2 border-gray-700 dark:border-gray-500 hover:bg-amber-600' + getBackgroundColour()}>
                    <div className='h-12 w-6 flex justify-center items-center text-3xl'>
                        <input
                            className='h-full w-6 text-center bg-inherit focus:outline-none hover:cursor-pointer caret-transparent'
                            type='text'
                            value={props.userInput || ''}
                            readOnly={true}
                            onClick={handleClick}
                        />
                    </div>
                </div>
                <p className='mx-auto text-gray-700 dark:text-gray-500'>{props.letter}</p>
            </div>
        )
    }
});

export default LetterBox;