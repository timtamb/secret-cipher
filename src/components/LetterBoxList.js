import React, { memo, useState, useEffect, useCallback } from 'react';
import WordBox from './WordBox';
import LetterBox from './LetterBox';


const LetterBoxList = memo(function LetterBoxList({ encryptedMessage, message, setHintsUsed, handleSubmit }) {
    const [userInputs, setUserInputs] = useState(new Array(encryptedMessage.length).fill(''));
    const [activeIndex, setActiveIndex] = useState(0);
    let activeLetter = encryptedMessage[activeIndex]

    const handleArrowMovement = useCallback((move) => {
        // finds the next alphabet character in the direction specified by 'move' and highlights it.
        // move is 'ArrowLeft' or 'ArrowRight'
        let newIndex = activeIndex;
        if (move === 'ArrowLeft') {
            while (newIndex > 0) {
                newIndex -= 1
                if (encryptedMessage[newIndex].match(/[a-z]/i)) {
                    setActiveIndex(newIndex);
                    return
                }
            }

        } else {
            while (newIndex < encryptedMessage.length - 1) {
                newIndex += 1
                if (encryptedMessage[newIndex].match(/[a-z]/i)) {
                    setActiveIndex(newIndex);
                    return
                }
            }
        }
    }, [activeIndex, encryptedMessage]);

    const handleLetterInput = useCallback((letter) => {
        let updatedInputs = encryptedMessage.split('').map((char, index) => { return char === activeLetter ? letter : userInputs[index] });
        setUserInputs(updatedInputs);
    }, [activeLetter, encryptedMessage, userInputs]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.keyCode >= 65 && event.keyCode <= 90) {
                handleLetterInput(event.key.toLowerCase());
                handleArrowMovement('ArrowRight');
            } else if (event.key === 'Esc' || event.key === 'Backspace') {
                handleLetterInput('');
                handleArrowMovement('ArrowLeft');
            } else if (event.key === 'Delete') {
                handleLetterInput('');
            } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                handleArrowMovement(event.key);
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        };
    }, [handleArrowMovement, handleLetterInput]);

    const handleLetterClick = useCallback((index) => {
        setActiveIndex(index);
    }, []);

    const handleClearClick = () => {
        setUserInputs([]);
        setActiveIndex(0);
        activeLetter = '';
    };

    const handleSubmitClick = () => {
        handleSubmit(userInputs);
    };

    const revealLetter = (indexToReveal) => {
        setActiveIndex(indexToReveal);
        activeLetter = encryptedMessage[indexToReveal];
        handleLetterInput(message.charAt(indexToReveal));
        setHintsUsed(prev => prev + 1);
    };

    const handleHintClick = () => {
        // randomly select a letter to fill
        // iterates over userInputs until first incorrect character is found
        let indexToFill = Math.floor(Math.random() * message.length);
        const startingIndex = indexToFill;
        while (userInputs[indexToFill] === message.charAt(indexToFill) || message.charAt(indexToFill).match(/[a-z]/i) == null) {
            indexToFill = (indexToFill + 1) % message.length;
            if (indexToFill === startingIndex) {
                return;
            }
        }
        revealLetter(indexToFill);
    };

    const calculateDuplicatedUserInputs = () => {
        const cipher = {};
        userInputs.forEach((l, index) => {
            if (l !== '') {
                if (l in cipher) {
                    cipher[l].add(encryptedMessage[index]);
                } else {
                    cipher[l] = new Set(encryptedMessage[index]);
                }
            }
        });

        const dupes = []
        for (let key in cipher) {
            if (cipher[key].size > 1) {
                dupes.push(key);
            }
        }
        return dupes;
    }

    const duplicatedUserInputs = calculateDuplicatedUserInputs();
    const words = encryptedMessage.split(' ');
    // Gets the index of the first letter of each word for calculating later
    const wordStartingIndexes = [0].concat(words.map((value => word => value += word.length + 1)(0)));

    return (
        <>
            <div className='container flex flex-wrap justify-center items-center text-center'>
                {words.map((word, wIndex) => (
                    <WordBox key={"word_" + wIndex}>
                        {word.split('').map((letter, lIndex) => {
                            const letterIndex = wordStartingIndexes[wIndex] + lIndex;
                            return <LetterBox
                                key={"letter_" + letterIndex}
                                letter={letter}
                                index={letterIndex}
                                isActiveLetter={letter === activeLetter}
                                isActiveIndex={letterIndex === activeIndex}
                                isDuplicated={duplicatedUserInputs.includes(userInputs[letterIndex])}
                                userInput={userInputs[letterIndex]}
                                handleLetterClick={handleLetterClick}
                            />
                        })}
                    </WordBox>
                ))}
            </div>
            <div className='flex flex-row'>
                <button onClick={handleSubmitClick} className='mt-6 mr-6 px-3 py-2 border-2 border-green-950 bg-green-500 hover:bg-green-600 active:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 dark:active:bg-green-900'>submit</button>
                <button onClick={handleHintClick} className='mt-6 mr-6 px-3 py-2 border-2 border-amber-950 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-800 dark:active:bg-amber-900'>hint</button>
                <button onClick={handleClearClick} className='mt-6 px-3 py-2 border-2 border-gray-900 bg-gray-400 hover:bg-gray-500 active:bg-gray-600 dark:bg-gray-500 dark:hover:bg-gray-600 dark:active:bg-gray-700'>clear</button>
            </div>
        </>
    )
});

export default LetterBoxList;