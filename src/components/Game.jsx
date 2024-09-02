import React, { useState, useRef, useCallback } from 'react'
import { Fireworks } from 'fireworks-js'

import Instructions from './Instructions';
import GameEndScreen from './GameEndScreen';
import LetterBoxList from './LetterBoxList';
import Timer from './Timer';
import { getRandomMessage, generateSubstitutionCipher, generateEncryptedMessage } from '../utils';


export default function Game() {
    const [gameActive, setGameActive] = useState(false);
    const [gameEnd, setGameEnd] = useState(false);
    const [message, setMessage] = useState('');
    const [encryptedMessage, setEncryptedMessage] = useState('');
    const [result, setResult] = useState(0);
    const [hintsUsed, setHintsUsed] = useState(0);
    const timerRef = useRef(null);
    const fireworksRef = useRef(null);

    const handleSubmit = useCallback((userInputs) => {
        const handleGameEnd = () => {
            const fireworks = new Fireworks(fireworksRef.current, {
                speed: 3,
            });
            fireworks.start();
            setTimeout(() => fireworks.waitStop(true), 5000);
            setResult(timerRef.current);
            setGameActive(false);
            setGameEnd(true);
        }

        let finalAnswer = '';
        for (let i = 0; i < message.length; i++) {
            if (message[i].match(/[a-z]/i)) {
                finalAnswer += userInputs[i];
            } else {
                finalAnswer += message[i];
            }
        }
        if (finalAnswer === message) {
            handleGameEnd();
        } else {
            alert('Something is incorrect...');
        }
    }, [message]);

    const fetchRandomMessage = async () => {
        try {
            const requestOptions = {
                method: "GET",
                redirect: "follow"
            };
            const response = await fetch('http://127.0.0.1:8000/api/get_random_quote/', requestOptions);
            return response.json();
        } catch (error) {
            // As a fallback, return one of the hardcoded quotes in utils
            console.log('ERROR:', error.message);
            return getRandomMessage();
        }
    }

    const handleGameStart = async () => {
        let messageToEncrypt = await fetchRandomMessage();
        setMessage(messageToEncrypt);
        const encMessage = generateEncryptedMessage(generateSubstitutionCipher(), messageToEncrypt);
        setEncryptedMessage(encMessage);
        setHintsUsed(0);
        setGameEnd(false);
        setResult(0);
        setGameActive(true);
    };

    const renderGame = () => {
        let gameView = (
            <>
                <LetterBoxList encryptedMessage={encryptedMessage} message={message} setHintsUsed={setHintsUsed} handleSubmit={handleSubmit} handleGameStart={handleGameStart} />
                <Timer timerRef={timerRef} />
            </>
        )
        if (!gameActive) {
            gameView = (
                <>
                    {gameEnd ? <GameEndScreen timestamp={result} hintsUsed={hintsUsed} /> : <Instructions />}
                    <button className='px-4 py-2 font-mono font-bold border-2 border-amber-950 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-800 dark:active:bg-amber-900' onClick={handleGameStart}>
                        {gameEnd ? 'play again' : 'play'}
                    </button>
                </>
            )
        }
        return gameView
    }

    return (
        <>
            <div className="fixed bg-gray-200 dark:bg-gray-800 h-screen w-screen -z-50"></div>
            <div ref={fireworksRef} className='fixed left-0 top-0 w-screen h-screen -z-10'></div>
            <div>
                <div id="game" className="h-screen flex flex-col p-8 justify-center items-center font-mono">
                    {renderGame()}
                </div>
            </div>
        </>
    );
}