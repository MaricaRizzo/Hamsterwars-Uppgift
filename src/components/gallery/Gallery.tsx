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

    async function handleDelete(id: string) {
    await deleteHamster(id);
    sendRequest(setData)
    }

    return (
        <div>
            <h2>Gallery</h2>

            <section className='gallery'>

                <AddHamster />

                {data 
                ? data.map(hamster => (
                    <div>
                <HamsterCard hamster={hamster} key={hamster.id} />
                <HamsterCardOverlay hamster={hamster} handleDelete={handleDelete}/>
                </div>
                )) 
                : 'Loading hamsters...'}

            </section>
        </div>
    )
};

async function sendRequest(saveData: any) {
    const response = await fetch('/hamsters');
    const data = await response.json()
    saveData(data)

};


async function deleteHamster(id: string) {
    const response = await fetch('/hamsters/' + id, {method: 'DELETE'})
    const data = await response.json
    console.log(data)
}


export default HamsterGallery