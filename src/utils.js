export const MESSAGES = [
    'the future belongs to those who believe in the beauty of their dreams.',
    'if you shoot for the moon and miss, you land amongst the stars.',
    'You must be the change you wish to see in the world.',
    'Do one thing every day that scares you.',
    'It is during our darkest moments that we must focus to see the light.',
    'It takes courage to grow up and become who you really are.',
    'Don\'t sit down and wait for the opportunities to come. Get up and make them.',
    'Don\'t count the days, make the days count.',
    'Failure is the condiment that gives success its flavor.',
    'To live is the rarest thing in the world. Most people just exist.',
    'A problem is a chance for you to do your best.',
    'The most common way people give up their power is by thinking they don\'t have any.',
    'Love yourself first and everything else falls into line.',
    'It always seems impossible until it\'s done.',
    'It is never too late to be what you might have been.',
    'Definitions belong to the definers, not the defined.',
    'You are never too old to set another goal or to dream a new dream.',
]

export const getRandomMessage = () => {
    const messagesIndex = Math.floor(Math.random() * MESSAGES.length)
    const message = MESSAGES[messagesIndex].toLowerCase()
    return message
}

export const generateSubstitutionCipher = () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const cipherDict = {};
    alphabet.forEach(letter => cipherDict[letter] = '');

    for (let i in cipherDict) {
        const letterToAdd = alphabet.splice(Math.floor(Math.random() * alphabet.length), 1)[0];
        cipherDict[i] = letterToAdd;
    }

    return cipherDict;
}

export const generateEncryptedMessage = (cipher, messageToEncrypt) => {
    const cleanedMessage = messageToEncrypt.toLowerCase();
    let encrypted = '';

    for (let i = 0; i < cleanedMessage.length; i++) {
        const charToEncode = cleanedMessage[i];
        if (charToEncode in cipher) {
            encrypted += cipher[charToEncode];
        } else {
            encrypted += charToEncode;
        }
    }

    return encrypted;
}

export const displayTimer = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 60 / 60)
    const mins = Math.floor(timeInSeconds / 60 % 60)
    const seconds = timeInSeconds % 60
    return `${hours > 0 ? hours + ':' : ''}${mins < 10 ? '0' + mins : mins}:${seconds < 10 ? '0' + seconds : seconds}`
}