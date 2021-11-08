import { useEffect, useState } from 'react';
import { Hamster } from '../../models/Hamster';
import FighterCard from './FighterCard'
import '../../styles/game.css'

type Hamsters = Hamster;

const baseUrl = 'http://localhost:1337';

const Game = () => {

    const [fighters, setFighters] = useState<Hamsters[] | null >(null)
    

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

    function updateDefeats(id:string, defeats: number, games: number) {
        const newDefeats = defeats + 1;
        const newGames = games + 1;

        return fetch(baseUrl + '/hamsters/' + id, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({defeats: newDefeats, games: newGames})
        })
        
    }

    function updateWinnersAndLosers(winnerId: string) {
        
        if( fighters ) { 
            const winner = fighters.find(fighter => fighter.id === winnerId);
            const loser = fighters.find(fighter => fighter.id !== winnerId);
            if(winner){
              updateWin(winner.id, winner.wins, winner.games);  
            }
            if(loser){
                updateDefeats(loser.id, loser.defeats, loser.games);
            }
        } else {
            console.log('fighters is undefined')
        }
        
     }
     
    

    return (
        <div className='game'>
            <h2>Let the fight begin!</h2>
            <p>Click on the cutest hamster</p>

            <section className="fighters">
                {fighters
                ? fighters.map(fighter => (
                    <FighterCard fighter={fighter} key={fighter.id} updateWinnersAndLosers={updateWinnersAndLosers}/>
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