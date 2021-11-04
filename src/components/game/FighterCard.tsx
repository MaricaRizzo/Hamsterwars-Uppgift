import { Hamster } from '../../models/Hamster';

interface CardGridProps {
    fighter: Hamster;
    updateWin: (id:string, wins:number, games:number) => void
}

const FighterCard = ({ fighter, updateWin }: CardGridProps) => {

    return (
        <div className="fighterCard" onClick={() => updateWin(fighter.id, fighter.wins, fighter.games) }>
            <img src={'assets/hamsters/' + fighter.imgName} alt={'Picture of ' + fighter.name} />
            <h3>{fighter.name}</h3>
        </div>
    )
}

export default FighterCard