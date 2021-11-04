import { Hamster } from '../../models/Hamster';

interface CardGridProps {
    hamster: Hamster;
}

const HamsterCard = ({ hamster }: CardGridProps) => {

    return (
        <div className="galleryCard">
            <img src={'assets/hamsters/' + hamster.imgName} alt={'Picture of ' + hamster.name} />
            <h2>{hamster.name}</h2>
        </div>
    )
}

export default HamsterCard