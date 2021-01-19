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
    const parsedData = JSON.parse(rawData);
    res.json(parsedData);
});

app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    const rawData = fs.readFileSync(path.join(__dirname, "./db/db.json"));
    const parsedData = JSON.parse(rawData);
    //if this is the first input we set the id the 0, otherwise we set it to 1 + the last element in the array, this is to ensure that we
    //dont get repeat id's when we delete later
    newNote.id = parsedData.length === 0 ? 0 : parsedData[parsedData.length-1].id + 1
    parsedData.push(newNote);
    fs.writeFileSync(path.join(__dirname, "./db/db.json"), JSON.stringify(parsedData))
    res.status(200).send(parsedData)
});

app.delete("/api/notes/:id", (req, res) => {
    const idToDelete = parseInt(req.params.id);

    const rawData = fs.readFileSync(path.join(__dirname, "./db/db.json"));
    const parsedData = JSON.parse(rawData);
    console.log(parsedData)
    const filteredData = parsedData.filter(elem => elem.id !== idToDelete);
    console.log(filteredData)
    fs.writeFileSync(path.join(__dirname, "./db/db.json"), JSON.stringify(filteredData))
    res.status(200).send(filteredData)
})

//this enables us to serve the static js and css files

app.use(express.static(path.join(__dirname, "./public")));

//default route, everything undefined goes to our home page

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => {
    console.log('Server listening on port', PORT)
});