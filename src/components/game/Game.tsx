import { useEffect, useState } from 'react';
import { Hamster } from '../../models/Hamster';
import FighterCard from './FighterCard'
import '../../styles/game.css'

type Hamsters = Hamster;

const baseUrl = 'http://localhost:1337';

const Game = () => {

    const [fighters, setFighters] = useState<Hamsters[] | null>(null)
    

    useEffect(() => {
        getFighters(setFighters)
    }, [])

    function newGame() {
        getFighters(setFighters)
    }


    function updateWin(id: string, wins: number, games: number) {
        const newWins = wins + 1;
        const newGames = games + 1;

        return fetch(baseUrl + '/hamsters/' + id, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({wins: newWins, games: newGames})
        })
        
    }
    

    return (
        <div className='game'>
            <h2>Let the fight begin!</h2>
            <p>Click on the cutest hamster</p>

            <section className="fighters">
                {fighters
                ? fighters.map(fighter => (
                    <FighterCard fighter={fighter} key={fighter.id} updateWin={updateWin}/>
                ))
                : 'Loading fighters...'}
            </section>

            <button onClick={newGame}>New Game</button>

        </div>
    )
};



async function getFighters(saveFighters: any) {
    const response = await fetch(baseUrl + '/hamsters');
    const data = await response.json()
    const fighters = await data.sort(() => .5 - Math.random()).slice(0,2)
    saveFighters(fighters)
};

export default Game 