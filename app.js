const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded( { extended: true }));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('You are on the main page of the app')
})





app.listen(PORT, () => {
    console.log('Server listening on port', PORT)
})