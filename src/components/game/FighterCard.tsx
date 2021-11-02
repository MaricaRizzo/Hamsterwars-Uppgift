import { Hamster } from '../../models/Hamster';

interface CardGridProps {
    fighter: Hamster;
}

const FighterCard = ({ fighter }: CardGridProps) => {

    return (
        <div className="fighterCard">
            <img src={'assets/' + fighter.imgName} alt={'Picture of ' + fighter.name} />
            <h3>{fighter.name}</h3>
        </div>
    )
}

export default FighterCard