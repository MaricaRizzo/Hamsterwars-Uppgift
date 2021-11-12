import { Hamster } from '../../models/Hamster';

interface CardGridProps {
    hamster: Hamster;
}

const HamsterCard = ({ hamster }: CardGridProps) => {

    let imgSrc = ""
        if(hamster.imgName.startsWith("http")){
            imgSrc= hamster.imgName
        } else {
           imgSrc='assets/hamsters/' + hamster.imgName
        }

    return (
        <div className="galleryCard">
            <img src={imgSrc} alt={'Picture of ' + hamster.name}/>
            <h2>{hamster.name}</h2>
        </div>
    )
}


export default HamsterCard