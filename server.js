const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongo = require('mongoose');

(function connect() {
    return new Promise((resolve, reject) => {
        mongo.connect('mongodb://localhost:27017/JT', {
           useNewUrlParser: true,
           useUnifiedTopology: true
       });
       const db = mongo.connection;
       db.on('error', err => {
           console.error('Database error: ', err.message);
           reject(err.message);
       });
       db.on('open', () => {
           console.log('Database connected');
           resolve();
       });
    });

})();

const app = express();
app.use(bodyParser());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const Schema = mongo.Schema;

const UserSchema = new Schema({
    email: { type: String },
    password: { type: String }
}, { versionKey: false });

const model = mongo.model('users', UserSchema, 'users');

app.post('/api/SaveUser', function (req, res) {
    const mod = new model(req.body);
    if (req.body.mode == 'Save') {
        mod.save(function (err, data) {
            if (err) {
                res.send(err);
            } else {
                res.send({ data: 'Record has been Inserted..!!' });
            }
        });
    } else {
        model.findByIdAndUpdate(req.body.id, { email: req.body.email, password: req.body.password },
            function (err, data) {
                if (err) {
                    res.send(err);
                } else {
                    res.send({ data: 'Record has been Updated..!!' });
                }
            });
    }
})
app.post('/api/deleteUser', function (req, res) {
    model.remove({ _id: req.body.id }, function (err) {
        if (err) {
            res.send(err);
        } else {
            res.send({ data: 'Record has been Deleted..!!' });
        }
    });
});

app.get('/api/getUser', function (req, res) {
    model.find({}, function (err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

app.listen(3000, function () {
    console.log('App listening on port 3000');
});