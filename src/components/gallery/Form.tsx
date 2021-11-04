import { useState } from "react"

const AddHamster = () => {

    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [loves, setLoves] = useState('');
    const [favFood, setFavFood] = useState('');
    const [imgName, setImgName] = useState('');


    const nameIsValid = isValidName(name)
    const lovesIsValid = isValidLoves(loves)
    const foodIsValid = isValidFood(favFood)
	const ageIsValid = isValidAge(age)

	const formIsValid = nameIsValid && ageIsValid && lovesIsValid && foodIsValid



     function handleSubmit() {
        const newObject = {name, age, loves, favFood, imgName, wins:0, defeats:0, games:0 };

        const baseUrl = 'http://localhost:1337';
        
        return fetch(baseUrl + '/hamsters', {
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


function isValidName(name: string): boolean {
	return name.length >= 2
}

function isValidAge(age: number): boolean {
	if( isNaN(age) ) return false
	if( age < 0 ) return false
	let ageString = String(age)
	if( ageString.includes(',') || ageString.includes('.') ) return false
	return true
}

function isValidLoves(loves: string): boolean {
	return loves.length >= 2
}

function isValidFood(food: string): boolean {
	return food.length >= 2
}




export default AddHamster