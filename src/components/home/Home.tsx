import '../../styles/home.css';
import { useEffect, useState } from 'react';
import { Hamster } from '../../models/Hamster';


type Hamsters = Hamster;



const Home = () => {

    const [cutest, setCutest] = useState<Hamsters | null>(null);
    
    useEffect(() => {
        sendRequest(setCutest)
    }, [])


    return (
        <div className="home">
            <section className="about">
                <h2>Welcome to Hamsterwars!</h2>
                <p>The game where hamsters fight to see who´s the cutest.</p>
                <p>Cast your vote by clicking on your favorite hamster and let the war begin!</p>
            </section>

            <section className="cutest">
                

                {cutest
                ? <div>
                    <h3>The cutest of them all:</h3>
                    <h2>{cutest.name}</h2>
                    <img src={'assets/hamsters/' + cutest.imgName} alt={'Picture of ' + cutest.name} />
                </div>
                : <div className="error">
                    <h3>Couldn´t connect to the server!</h3>
                    <button onClick={() => sendRequest(setCutest)}>Try again</button>
                    </div> 
                }
                

            </section>

        </div>
    )
};

async function sendRequest(saveCutest: any) {
    try {
    const response = await fetch('/hamsters/cutest');
    if (!response.ok) {
        throw Error(response.statusText);
      }
    const cutest = await response.json()
    const randomCutest = await cutest[Math.floor(Math.random() * cutest.length)]
    saveCutest(randomCutest)
    } catch (error) {
       saveCutest(null)
    }
};



export default Home