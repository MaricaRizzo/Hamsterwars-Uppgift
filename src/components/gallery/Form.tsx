const AddHamster = () => {

    return (
        <div className="form">

            <h3>Add a new hamster to the game!</h3>

            <form className="addHamster">
                <label>Name: 
                <input type="text" />
                </label>

                <label>Age: 
                <input type="number" />
                </label>

                <label>Loves: 
                <input type="text" />
                </label>

                <label>Favorite food: 
                <input type="text" />
                </label>

                <label>Image link: 
                <input type="text" />
                </label>

                <input type="submit" value="Add" />

            </form>
        </div>
    )
}

export default AddHamster