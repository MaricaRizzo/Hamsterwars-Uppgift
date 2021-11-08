const express = require('express');
const app = express();
const hamstersRouter = require('./routes/hamsters.js');
const cors = require('cors');
const index = require('../../src/App.tsx')

const PORT = process.env.PORT || 1337




//middleware
app.use( express.urlencoded({ extended: true }) )
app.use( express.json() )

app.use( cors() )

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}, `, req.body);
    next()
})

app.use( '/', index)
app.use('/img', express.static(__dirname + '/../hamsters'))


//routes / endpoints

app.use('/hamsters', hamstersRouter)


app.listen(PORT, () => {
    console.log('Listening on port: ' + PORT)
})
