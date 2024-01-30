const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const { Schema } = mongoose;

const AccountSchema = new Schema({
    name: String,
    balance: Number,
});

let Account = mongoose.model('Account', AccountSchema);

Account.getAllAccounts = function (req, res) {
    Account.find({}, function (err, data) {
        if (err) return console.error('No se pudo Obtener todas las cuentas.');

        res.status(200).json({
            accounts: data
        })
    });
}

Account.createAccount = function (req, res) {
    let account = new Account({ name: req.body.name, balance: req.body.balance });

    account.save(function (err, data) {
        if (err) return console.error('No se pudo Crear la cuenta nueva.');

        res.status(201).json({
            account: data
        })
    });
}

Account.showOneAccount = function (id, req, res) {
    Account.findById({ id }, function (err, data) {
        if (err) return console.error('No se pudo Obtener la cuenta: ' + id);

        res.status(200).json({
            account: data
        })
    });
}

Account.updateAccount = function (id, req, res) {
    Account.findByIdAndUpdate({ id }, { name: req.body.name, balance: req.body.balance }, { new: true }, function (err, data) {
        if (err) return console.error('No se pudo Actualizar la cuenta: ' + id);

        res.status(200).json({
            account: data
        })
    });
}

Account.deleteAccount = function (id, req, res) {
    Account.findByIdAndRemove({ id }, function (err, data) {
        if (err) return console.error('No se pudo Eliminar la cuenta: ' + id);

        res.status(204).json({
            account: data
        })
    });
}

module.exports = Bicycle;