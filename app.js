const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded( { extended: true }));

app.use(express.json());

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});



app.get("/api/notes", (req, res) => {
    const rawData = fs.readFileSync(path.join(__dirname, "./db/db.json"));
    const parsedData = JSON.parse(rawData)
    res.json(parsedData)
})



app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => {
    console.log('Server listening on port', PORT)
});