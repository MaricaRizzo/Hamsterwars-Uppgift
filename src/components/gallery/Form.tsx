import { useState } from "react";
import validator from 'validator';

const AddHamster = () => {

    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [loves, setLoves] = useState('');
    const [favFood, setFavFood] = useState('');
    const [imgName, setImgName] = useState('');


    const nameIsValid = isValidString(name)
    const lovesIsValid = isValidString(loves)
    const foodIsValid = isValidString(favFood)
	const ageIsValid = isValidAge(age)
    const urlIsValid = isValidUrl(imgName)

	const formIsValid = nameIsValid && ageIsValid && lovesIsValid && foodIsValid && urlIsValid



     function handleSubmit() {
        const newObject = {name, age, loves, favFood, imgName, wins:0, defeats:0, games:0 };

        
        return fetch('/hamsters', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newObject)
        })
    }





    return (
        <div className="form">

            <h3>Add a new hamster to the game!</h3>

            <form className="addHamster" onSubmit={handleSubmit}>
                <label>Name: 
                <input type="text" onChange={e => setName(e.target.value)}/>
                </label>

                <label>Age: 
                <input type="number" className={ageIsValid ? 'valid' : 'invalid'}
				onChange={e => setAge(Number(e.target.value))}/>
                </label>

                <label>Loves: 
                <input type="text" onChange={e => setLoves(e.target.value)}/>
                </label>

                <label>Favorite food: 
                <input type="text" onChange={e => setFavFood(e.target.value)}/>
                </label>

                <label>Image link: 
                <input type="text" onChange={e => setImgName(e.target.value)}/>
                </label>

                <input type="submit" value="Add" disabled={!formIsValid} />

            </form>
        </div>
    )
}


function isValidString(value: string): boolean {
    if (validator.isAlpha(value) && value.length >= 2) {
        return true
    } else {
        return false
    }
}

function isValidAge(age: number): boolean {
	let ageString = String(age)
	if(validator.isNumeric(ageString) && age > 0) {
        return true
    } else {
	return false
    }
}



function isValidUrl(url: string): boolean {
    if (validator.isURL(url)) {
        return true
      } else {
        return false
      }
}




export default AddHamster