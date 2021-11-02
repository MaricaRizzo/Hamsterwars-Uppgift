import { Hamster } from '../../models/Hamster';

interface CardGridProps {
    hamster: Hamster;
    handleDelete: (id: string) => void
}

const HamsterCardOverlay = ({ hamster, handleDelete }: CardGridProps) => {

    return (
        <div className="galleryCardOverlay">
            <li>Name: {hamster.name}</li>
            <li>Age: {hamster.age}</li>
            <li>Loves: {hamster.loves}</li>
            <li>Favorite Food: {hamster.favFood}</li>
            <li>Games: {hamster.games}</li>
            <li>Wins: {hamster.wins}</li>
            <li>Defeats: {hamster.defeats}</li>
            <button onClick={() => handleDelete(hamster.id)}>Delete Hamster</button>
        </div>
    )
}



export default HamsterCardOverlay