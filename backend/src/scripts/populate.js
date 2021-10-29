const database = require('../database.js')
const connect = database.connect
const db = connect()

const USERS ='hamsters'

const data = require('../data.json')

populate();

async function populate() {
    data.forEach( object => {
        db.collection(USERS).add(object)
    }); 
}