const admin = require("firebase-admin");

let serviceAccount;

if( process.env.FIREBASE_KEY ) {
    serviceAccount = JSON.parse(process.env.FIREBASE_KEY)
} else {
    serviceAccount = require("./secrets/firebase-key.json");
}

function connect() {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    const db = admin.firestore()
    return db
}

module.exports = { connect }