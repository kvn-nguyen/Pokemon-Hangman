import React, { useState, useEffect } from "react";
import Pokemon from "../assets/Pokemon";

const Word = () => {
    const [pokemonList, setPokemonList] = useState(Pokemon);
    const [gamePlayable, setGamePlayable] = useState(true);
    const [currentPokemon, setCurrentPokemon] = useState(pokemonList[Math.floor(Math.random() * pokemonList.length)]); // Math.floor(Math.random() * pokemonList.length)
    const [pokedex, setPokedex] = useState([]);
    const [correctGuess, setCorrectGuess] = useState([]);
    const [incorrectGuess, setIncorrectGuess] = useState([]);
    const [lives, setLives] = useState(10);
    const [pokemonCaught, setPokemonCaught] = useState(0);
    const [displayPokedex, setDisplayPokedex] = useState(false);
    const [restartGame, setRestartGame] = useState(false);
    const [displayRestart, setDisplayRestart] = useState(false);
    const [clickRestart, setClickRestart] = useState(false);

    const maskedName = currentPokemon.split("").map(letter => 
        correctGuess.includes(letter) ? letter : "_"
    );
    useEffect(() => {
        const handleKeyDown = event => {
            const { key, keyCode } = event;
            if (gamePlayable && ((keyCode >= 65 && keyCode <= 90) || keyCode === 222 || keyCode === 190)) {
                const letter = key.toLowerCase();
                if (currentPokemon.includes(letter)) {
                    (!correctGuess.includes(letter)) 
                    &&
                    setCorrectGuess(currentLetter => [...currentLetter, letter]);
                } else {
                    (!incorrectGuess.includes(letter)) 
                    &&
                    setIncorrectGuess(currentLetter => [...currentLetter, letter]);
                }
            }
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [correctGuess, incorrectGuess, gamePlayable]);

    useEffect(() => {
        if (!maskedName.includes('_')) {
            setPokemonList(pokemonList.filter((elm, index) => elm !== currentPokemon))
            setPokedex([...pokedex, currentPokemon])
            setCurrentPokemon(pokemonList[Math.floor(Math.random() * pokemonList.length)])
            setPokemonCaught(pokemonCaught+1)
            setCorrectGuess([])
            setIncorrectGuess([])
        }
    },[correctGuess]);

    useEffect(() => {
        if (incorrectGuess.length >= 8) {
            setLives(lives-1)
            setCorrectGuess([])
            setIncorrectGuess([])
        }
    }, [incorrectGuess]);

    useEffect(() => {
        lives === 0 && setGamePlayable(false)
        gamePlayable === false && setRestartGame(true)
        if (restartGame === true) {
            setDisplayRestart(true)
            if (clickRestart === true) {
                setDisplayRestart(false)
                setClickRestart(false)
                setRestartGame(false)
                setPokemonList(Pokemon)
                setGamePlayable(true)
                setCurrentPokemon(pokemonList[Math.floor(Math.random() * pokemonList.length)])
                setPokedex([])
                setCorrectGuess([])
                setIncorrectGuess([])
                setLives(10)
                setPokemonCaught(0)
                setDisplayPokedex(false)
            }
        }
    }, [lives, gamePlayable, restartGame, displayRestart, clickRestart])

    const onClickDex = () => setDisplayPokedex(open => !open)
    const onClickRestart = () => setClickRestart(true)

    return (
        <div className="context-container">
            <div className="dex-container">            
                <h4>Pokemon Caught: {pokemonCaught} </h4>
                <button onClick={onClickDex}>Pokedex:</button>
                <div className="pokedex-container">{ displayPokedex ? pokedex.map(pkmn => <div key={pkmn} className="pokedex-entry">{pkmn}</div>) : null}</div>
            </div>
            <div className="play-container">
                {displayRestart ? <h1>GAME OVER</h1> : <h2>{maskedName}</h2>}
                <p>Wrong Letters: {incorrectGuess.join(" ")}</p>
                <p>Attempts Left: {8 - incorrectGuess.length}</p>
                <p>Pokeballs Left: {lives}</p>
                {displayRestart && <button onClick={onClickRestart}>Restart Game</button>}
            </div>
        </div>
    );
}

export default Word;