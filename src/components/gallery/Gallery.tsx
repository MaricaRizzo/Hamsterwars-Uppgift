import { useEffect, useState } from 'react';
import HamsterCard from './HamsterCard';
import HamsterCardOverlay from './HamsterCardOverlay';
import AddHamster from './Form';
import { Hamster } from '../../models/Hamster';
import '../../styles/gallery.css';

type Hamsters = Hamster;


const HamsterGallery = () => {

    const [data, setData] = useState<Hamsters[] | null>(null)

    useEffect(() => {
        sendRequest(setData)
    }, [])

    return (
        <div>
            <h2>Gallery</h2>

            <section className='gallery'>

                <AddHamster />

                {data 
                ? data.map(hamster => (
                    <div>
                <HamsterCard hamster={hamster} key={hamster.id} />
                <HamsterCardOverlay hamster={hamster} />
                </div>
                )) 
                : 'Loading hamsters...'}

            </section>
        </div>
    )
};

async function sendRequest(saveData: any) {
    const baseUrl = 'http://localhost:1337';
    const response = await fetch(baseUrl + '/hamsters');
    const data = await response.json()
    saveData(data)

};


export default HamsterGallery