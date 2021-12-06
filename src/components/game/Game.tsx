import { useEffect, useState } from 'react';
import { Hamster } from '../../models/Hamster';
import FighterCard from './FighterCard'
import '../../styles/game.css'
import FighterCardOverlay from './FighterCardOverlay';

type Hamsters = Hamster;

const Game = () => {

    const [fighters, setFighters] = useState<Hamsters[] | null >(null);
    const [showInfo, setShowInfo] = useState(false);
   
    

    useEffect(() => {
        getFighters(setFighters)
    }, [])


    
    function handleShowInfo(){
            
            if(showInfo === true ){
                setShowInfo(false)
            } else if(showInfo === false) {
                setShowInfo(true)
            }
        }

    function newGame() {
        getFighters(setFighters)
        handleShowInfo()
    }


    function updateWin(id: string, wins: number, games: number) {
        const newWins = wins + 1;
        const newGames = games + 1;

        return fetch('/hamsters/' + id, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({wins: newWins, games: newGames})
        })
        
    }

    function updateDefeats(id:string, defeats: number, games: number) {
        const newDefeats = defeats + 1;
        const newGames = games + 1;

        return fetch('/hamsters/' + id, {
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
            };

            handleShowInfo();
            
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
                    <div className="fighterCardContainer" key={fighter.id}>
                        <FighterCard fighter={fighter} updateWinnersAndLosers={updateWinnersAndLosers} />
                        {showInfo && <FighterCardOverlay fighter={fighter.id} showInfo={showInfo}/>}
                    </div>
                ))
                : 'Loading fighters...'}
            </section>

            <button className="gameButton" onClick={newGame}>New Game</button>

        </div>
    )
};

    

async function getFighters(saveFighters: any) {
    try {
    const response = await fetch('/hamsters');
    const data = await response.json()
    const fighters = await data.sort(() => .5 - Math.random()).slice(0,2)
    saveFighters(fighters)
    } catch (error) {
        saveFighters(null)
     }
};

export default Game 

