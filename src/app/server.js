const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

// const auth = require('../middleware/auth');

module.exports = async (app) => {
    app.set('view engine', 'html');
    // app.use('/static', express.static('static'));
    // app.use('/js', express.static('js'));
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    // app.use(auth());
};


module.exports = () => {
    return new Promise((resolve, rejects) => {
         mongoose.connect('mongodb://localhost:27017/JT', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const db = mongoose.connection;
        db.on('error', err => {
            console.error('Database error: ', err.message);
            rejects(err.message);
        });
        db.on('open', () => {
            console.log('Database connected');
            resolve();
        });
    });
};
