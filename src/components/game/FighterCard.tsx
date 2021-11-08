import { Hamster } from '../../models/Hamster';

interface CardGridProps {
    fighter: Hamster;
    updateWinnersAndLosers: (winnerId: string) => void
}

const FighterCard = ({ fighter, updateWinnersAndLosers }: CardGridProps) => {

    return (
        <div className="fighterCard" onClick={() => updateWinnersAndLosers(fighter.id) }>
            <img src={'assets/hamsters/' + fighter.imgName} alt={'Picture of ' + fighter.name} />
            <h3>{fighter.name}</h3>
        </div>
    )
}

export default FighterCard