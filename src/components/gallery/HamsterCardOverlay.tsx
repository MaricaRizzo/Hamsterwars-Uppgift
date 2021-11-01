import { Hamster } from '../../models/Hamster';

interface CardGridProps {
    hamster: Hamster;
}

const HamsterCardOverlay = ({ hamster }: CardGridProps) => {

    return (
        <div className="galleryCardOverlay">
            <li>Name: {hamster.name}</li>
            <li>Age: {hamster.age}</li>
            <li>Loves: {hamster.loves}</li>
            <li>Favorite Food: {hamster.favFood}</li>
            <li>Games: {hamster.games}</li>
            <li>Wins: {hamster.wins}</li>
            <li>Defeats: {hamster.defeats}</li>
            <button>Delete Hamster</button>
        </div>
    )
}

export default HamsterCardOverlay