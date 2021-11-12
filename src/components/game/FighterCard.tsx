import { Hamster } from '../../models/Hamster';

interface CardGridProps {
    fighter: Hamster;
    updateWinnersAndLosers: (winnerId: string) => void;
}

const FighterCard = ({ fighter, updateWinnersAndLosers }: CardGridProps) => {

    let imgSrc = ""
        if(fighter.imgName.startsWith("http")){
            imgSrc= fighter.imgName
        } else {
           imgSrc='assets/hamsters/' + fighter.imgName
        }

    return (
        <div className="fighterCard" onClick={() => updateWinnersAndLosers(fighter.id) }>
            <img src={imgSrc} alt={'Picture of ' + fighter.name} />
            <h3>{fighter.name}</h3>
        </div>
    )
}

export default FighterCard