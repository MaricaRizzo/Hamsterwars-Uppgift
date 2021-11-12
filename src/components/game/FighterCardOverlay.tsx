import { Hamster } from '../../models/Hamster';

interface CardGridProps {
    fighter: Hamster;
}

const FighterCardOverlay = ({ fighter }: CardGridProps) => {

    return (
        <div className="fighterCardOverlay" >
            <li>Name: {fighter.name}</li>
            <li>Age: {fighter.age}</li>
            <li>Loves: {fighter.loves}</li>
            <li>Favorite Food: {fighter.favFood}</li>
            <li>Games: {fighter.games}</li>
            <li>Wins: {fighter.wins}</li>
            <li>Defeats: {fighter.defeats}</li>
        </div>
    )
}

export default FighterCardOverlay