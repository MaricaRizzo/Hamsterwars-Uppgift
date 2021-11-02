import { useEffect, useState } from 'react';
import { Hamster } from '../../models/Hamster';
import FighterCard from './FighterCard'
import '../../styles/game.css'

type Hamsters = Hamster;

const Game = () => {

    const [fighters, setFighters] = useState<Hamsters[] | null>(null)
    

    useEffect(() => {
        getFighters(setFighters)
    }, [])

    function newGame() {
        getFighters(setFighters)
    }

console.log(fighters)

    return (
        <div className='game'>
            <h2>Let the fight begin!</h2>
            <p>Click on the cutest hamster</p>

            <section className="fighters">
                {fighters
                ? fighters.map(fighter => (
                    <FighterCard fighter={fighter} key={fighter.id} />
                ))
                : 'Loading fighters...'}
            </section>

            <button onClick={newGame}>New Game</button>

        </div>
    )
};



async function getFighters(saveFighters: any) {
    const baseUrl = 'http://localhost:1337';
    const response = await fetch(baseUrl + '/hamsters');
    const data = await response.json()
    const fighters = await data.sort(() => .5 - Math.random()).slice(0,2)
    saveFighters(fighters)
};


export default Game