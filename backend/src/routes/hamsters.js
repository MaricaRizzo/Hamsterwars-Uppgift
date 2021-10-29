const express = require('express');
const router = express.Router();
const database = require('../database.js');
const connect = database.connect
const db = connect()
const USERS ='hamsters'



// GET ALL
router.get('/', async (req, res) => {
    let array = await getAll();
    if( array.length === 0 ) {
        res.status(404).send('We couldn´t find any hamsters')
    } else {
       res.status(200).send(array) 
    }
    
});

async function getAll() {

    const userRef = db.collection(USERS);
    const usersSnapshot = await userRef.get()

    if ( usersSnapshot.empty ) {
        return []
    };

    const array = [];
    await usersSnapshot.forEach(async docRef => {
        const data = await docRef.data();
        data.id = docRef.id;
        array.push(data)    
    })
    
    return array
};






// GET RANDOM

router.get('/random', async (req, res) => {
    let array = await getAll();
    let randomHamster = array[Math.floor(Math.random() * array.length)];
    res.status(200).send(randomHamster)
});






//GET CUTEST

router.get('/cutest', async (req, res) => {
    let cutest = await getCutest()
    res.status(200).send(cutest)
})


async function getCutest() {
    let data = await getAll();
    let cutest = [];

    let max = data.map(h => h.wins - h.defeats).reduce((acc, cur) => Math.max(acc, cur), -1000);

    data.map(h => {if ( h.wins - h.defeats === max ) {
            cutest.push(h)
        } 
    })
    
    return(cutest)
}






//GET :ID
router.get('/:id', async (req, res) => {
    const maybeHamster = await getOne(req.params.id);
    if( maybeHamster === null ) {
        res.status(404).send('Hamster not found!')
    } else {
        res.status(200).send(maybeHamster) 
    }
});


async function getOne(id) {
    const docRef = db.collection(USERS).doc(id);
    const docSnapshot = await docRef.get();
    if( docSnapshot.exists ) {
        const hamster = await docSnapshot.data();
        return hamster
    } else {
        return null
    };
};





// PUT :ID

router.put('/:id', async (req, res) => {
    const newData = req.body;
    const maybeHamster = req.params.id
    let ids = await getIds();

    if( !isHamsterData(newData) ) {
        res.status(400).send('Must send hamster data.')
        return
    } else if( !ids.includes(maybeHamster) ) {
        res.status(404).send('Hamster not found!')
    } else {
        await updateOne(req.params.id, newData)
        res.sendStatus(200)
    }
    
})


async function updateOne(id, object) {
    const settings = { merge: true};
    await db.collection(USERS).doc(id).set(object, settings);
}

function isHamsterData(maybe) {
    if( (typeof maybe) !== 'object' ) {
        return false
    };

    let keys = Object.keys(maybe);
    if( keys.includes('defeats') || keys.includes('favFood') || keys.includes('wins') || keys.includes('games') || keys.includes('name') || keys.includes('age') || keys.includes('loves') || keys.includes('imgName') ) {
        return true
    }

    return false
}

async function getIds() {
    let data = await getAll();
    let ids = []
    data.forEach(e => ids.push( e.id))
    return ids
}





//POST NEW

router.post('/', async (req, res) => {
    const maybeBody = req.body

    if( !isHamsterObject(maybeBody) ) {
        res.status(400).send('Must send a hamster object.')
        return
    }

    let newId = await addOne(maybeBody);

    res.status(200).send({ id: newId})

})

async function addOne(object) {
    const docRef = await db.collection(USERS).add(object);
    console.log('Added document with the id ' + docRef.id)
    return docRef.id
}

function isHamsterObject(maybe) {
    if( (typeof maybe) !== 'object' ) {
        return false
    };

    let keys = Object.keys(maybe);
    if( !keys.includes('defeats') || !keys.includes('favFood') || !keys.includes('wins') || !keys.includes('games') || !keys.includes('name') || !keys.includes('age') || !keys.includes('loves') || !keys.includes('imgName') ) {
        return false
    }

    return true
}







//DELETE :ID

router.delete('/:id', async (req, res) => {
    const maybeHamster = req.params.id
    let ids = await getIds();

    if( !ids.includes(maybeHamster) ) {
        res.status(404).send('Hamster not found!')
    } else {
    await deleteOne(req.params.id);
       res.sendStatus(200)
    }  

})

async function deleteOne(id) {
    const docRef = db.collection(USERS).doc(id);
    await docRef.delete();
}

module.exports = router
