const express = require('express');
const { v4: uuidv4 } = require("uuid");

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
let myArray = [];

app.post('/users', (req, res) => {
    const { name, email } = req.body;
    if (!name|| !email) {return res.status(400).json({ error: "Must need name and email" });} 
    const person = { id: uuidv4(), name, email };
    myArray.push(person);
    res.status(201).json(person);
});

app.get('/users/:id', (req, res) => {
    const person = myArray.find(x => x.id === req.params.id);
    if (!person) {return res.status(404).json({ error: "User does not exist" });}
    res.json(person);
});

app.put('/users/:id', (req, res) => {
    const person = myArray.find(x => x.id === req.params.id);
    if (!person) {return res.status(404).json({ error: "User does not exist" });}
    const { name, email } = req.body;
    if (!name || !email) {return res.status(400).json({ error: "Must need name and email" });}
    person.name = name;
    person.email = email;
    res.json(person);
});

app.delete('/users/:id', (req, res) => {
    const i = myArray.findIndex(x => x.id === req.params.id);
    if (i === -1) {return res.status(404).json({ error: "User does not exist" });}
    myArray.splice(i, 1);
    res.status(204).send(); 
});
// If necessary to add imports, please do so in the section above

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing