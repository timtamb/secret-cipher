import React, { useState, useEffect } from 'react'
import { IoSunny, IoMoon } from 'react-icons/io5';


function MyNavbar() {
    const [darkMode, setDarkMode] = useState(true)

    // Ideally shouldn't use document.body in here?
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [darkMode])

    const handleClick = () => {
        setDarkMode(!darkMode);
    }

    return (
        <nav className="w-screen absolute top-0 left-0 p-4 flex justify-between font-mono text-gray-700 dark:text-gray-200">
            <h1 className="mx-auto text-2xl font-extrabold">_secret_cipher_</h1>
            <div className="absolute right-0 top-0 h-full flex">
                <button className="mr-4" onClick={handleClick}>
                    {darkMode ? <IoMoon /> : <IoSunny />}
                </button>
            </div>
        </nav>
    )
}

export default MyNavbar