import '../../styles/home.css';
import { useEffect, useState } from 'react';
import { Hamster } from '../../models/Hamster';


type Hamsters = Hamster;



const Home = () => {

    const [cutest, setCutest] = useState<Hamsters | null>(null)
    
    useEffect(() => {
        sendRequest(setCutest)
    }, [])



    console.log(cutest)

    return (
        <div className="home">
            <section className="about">
                <h2>Welcome to Hamsterwars!</h2>
                <p>The game where hamsters fight to see who´s the cutest.</p>
                <p>Cast your vote by clicking on your favorite hamster and let the war begin!</p>
            </section>

            <section className="cutest">
                <h3>The cutest of them all:</h3>

                {cutest
                ? <div>
                    <h2>{cutest.name}</h2>
                    <img src={'assets/' + cutest.imgName} alt={'Picture of ' + cutest.name} />
                </div>
                : 'Loading cutest...'}

            </section>

        </div>
    )
};

async function sendRequest(saveCutest: any) {
    const baseUrl = 'http://localhost:1337';
    const response = await fetch(baseUrl + '/hamsters/cutest');
    const cutest = await response.json()
    const randomCutest = await cutest[Math.floor(Math.random() * cutest.length)]
    saveCutest(randomCutest)
};



export default Home