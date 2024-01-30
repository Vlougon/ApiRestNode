/* IMPORTS/REQUIRES */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const errorhandler = require('errorhandler');
const bodyParser = require('body-parser');
/* IMPORTS/REQUIRES */

let app = express(); // <--- Express() Launch!

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const { Schema } = mongoose;

const AccountSchema = new Schema({
    name: String,
    balance: Number,
});

let Account = mongoose.model('Account', AccountSchema);

/* MIDDLEWARE */
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(errorhandler());
/* MIDDLEWARE */

/* *********** */
/* PAGE ROUTES */
/* *********** */
app.get('/accounts', (req, res) => {
    Account.find({}, function (err, data) {
        if (err) return res.status(404);

        res.status(200).json({
            accounts: data
        })
    });
});

app.post('/accounts', (req, res) => {
    let account = new Account({ name: req.body.name, balance: req.body.balance });

    account.save(function (err, data) {
        if (err) return res.status(422);

        res.status(201).json({
            account: data
        })
    });
});

app.get('/account/:id', (req, res) => {
    const id = req.params.id;

    Account.findById({ _id: id }, function (err, data) {
        if (err) return res.status(404);

        res.status(200).json({
            account: data
        })
    });
});

app.put('/accounts/:id', (req, res) => {
    const id = req.params.id;

    Account.findByIdAndUpdate({ _id: id }, { name: req.body.name, balance: req.body.balance }, { new: true }, function (err, data) {
        if (err) return res.status(422);

        res.status(200).json({
            account: data
        })
    });
});

app.delete('/accounts/:id', (req, res) => {
    const id = req.params.id;

    Account.findByIdAndRemove({ _id: id }, function (err, data) {
        if (err) return res.status(422);

        res.status(204).json({
            account: data
        })
    });
});


/* *********** */
/* LISTEN PORT */
/* *********** */

app.listen(3000);
console.log("I'm Up!");