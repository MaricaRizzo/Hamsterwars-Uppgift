const database = require('../database.js')
const connect = database.connect
const db = connect()

const USERS ='hamsters';

clear();

async function clear() {
    const usersRef = db.collection(USERS);
    const usersSnapshot = await usersRef.get();

    if( usersSnapshot.empty ) {
        return 
    };

    usersSnapshot.forEach(docRef => {
        usersRef.doc(docRef.id).delete()
    });
}