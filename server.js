/* IMPORTS/REQUIRES */
const express = require('express');
const logger = require('morgan');
const errorhandler = require('errorhandler');
const bodyParser = require('body-parser');
/* IMPORTS/REQUIRES */

let app = express(); // <--- Express() Launch!

let store = {};
store.accounts = [];

/* MIDDLEWARE */
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(errorhandler());
/* MIDDLEWARE */

/* *********** */
/* PAGE ROUTES */
/* *********** */
app.get('/accounts', (req, res) => {
    res.status(200).send(store.accounts);
});

app.post('/accounts', (req, res) => {
    let newAccount = req.body;
    let id = store.accounts.length;

    store.accounts.push(newAccount);
    res.status(201).send({ ID: id })
});

app.get('/accounts/:id', (req, res) => {
    res.status(200).send(store.accounts[req.params.id]);
});

app.put('/accounts/:id', (req, res) => {
    store.accounts[req.params.id] = req.body;
    res.status(200).send(store.accounts[req.params.id]);
});

app.delete('/accounts/:id', (req, res) => {
    store.accounts.splice(req.params.id, 1);
    res.status(204).send('Accont: ' + req.params.id + ' deleted. Forever!');
});


/* *********** */
/* LISTEN PORT */
/* *********** */

app.listen(3000);
console.log("I'm Up!");