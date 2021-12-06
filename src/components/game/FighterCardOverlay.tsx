import { Hamster } from '../../models/Hamster';
import { useEffect, useState } from 'react';

interface CardGridProps {
    fighter: string;
    showInfo: boolean;
}

type Hamsters = Hamster;

const FighterCardOverlay = ({ fighter, showInfo }: CardGridProps) => {

    const [updatedData, setUpdatedData] = useState<Hamsters | null>(null);

    useEffect(() => {
        const controller = new AbortController(); 
        const signal = controller.signal;
    
        (async () => { 
          try {
            const response = await fetch('/hamsters/' + fighter, { signal });
            const data = await response.json();
    
            setUpdatedData(data);
          } catch (error) {
            console.log(error)
          }
        })();
    
        return () => {
          controller.abort();
        };
      }, [showInfo, fighter]);


      
    
    return (
        <div className="fighterCardOverlay" >
           {updatedData ?
           <div>
            <li>Name: {updatedData.name}</li>
            <li>Age: {updatedData.age}</li>
            <li>Loves: {updatedData.loves}</li>
            <li>Favorite Food: {updatedData.favFood}</li>
            <li>Games: {updatedData.games}</li>
            <li>Wins: {updatedData.wins}</li>
            <li>Defeats: {updatedData.defeats}</li>
            </div>
            : 'Loading info...'
            }

        </div>
    )
}




export default FighterCardOverlay