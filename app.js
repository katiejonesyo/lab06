const express = require('express');
const app = express();
const Bots = require('./models/bots')
app.use(express.json());
require('dotenv').config();


app.get('/', (req, res) => {
    res.send('Hello World')
});

app.get('/bots', (req, res) => {
    Bots
     .find()
     .then(bots => res.send(bots))

});

app.get('/bots/:id', (req, res)  => {
    Bots
    .findById(req.params.id)
    .then((bots) => res.send(bots))
});


app.post('/bots', async(req, res) => {
    Bots
    .insert(req.body)
    .then(bots => res.send(bots));
});


app.put('/bots/:id', (req, res)  => {
    Bots
    .update(req.params.id, req.body)
    .then((bots) => res.send(bots))
});


app.delete('/bots/:id',(req, res) => {
    Bots
    .delete(req.params.id)
    .then((bots) => res.send(bots));
});

module.exports = app;
