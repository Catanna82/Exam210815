const express = require('express');
// const path = require('path');
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
app.use(bodyParser({ limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

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

const CommentsSchema = new Schema({
    email: { type: String },
    description: { type: String }
}, { versionKey: false });

const AlbumsSchema = new Schema({
    albumName: { type: String },
    category: { type: String },
    images: { type: Array }
}, { versionKey: false });

const albumsModel = mongo.model('albums', AlbumsSchema, 'albums');
const commentsModel = mongo.model('comments', CommentsSchema, 'comments');

app.post('/api/saveAlbums', function (req, res) {
    const mod = new albumsModel(req.body);
    albumsModel.find({ albumName: req.body.albumName }, function (err, data) {
        if (err) {
            res.send(err);
        } else {
            if (data.length === 0) {
                mod.save(function (err, data) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send({ data: 'Record has been Inserted..!!' });
                    }
                });
            }
        }
    });

});

const model = mongo.model('users', UserSchema, 'users');

app.post('/api/SaveUser', function (req, res) {
    const mod = new model(req.body);
    mod.save(function (err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send({ data: 'Record has been Inserted..!!' });
        }
    });
});

app.post('/api/deleteUser', function (req, res) {
    model.remove({ _id: req.body.id }, function (err) {
        if (err) {
            res.send(err);
        } else {
            res.send({ data: 'Record has been Deleted..!!' });
        }
    });
});

app.post('/api/login', function (req, res) {
    model.find(req.body, function (err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data[0]);
        }
    });
});

app.post('/api/saveComment', function (req, res) {
    const mod = new commentsModel(req.body);
    mod.save(function (err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send({ data: 'Record has been Inserted..!!' });
        }
    });
});

app.get('/api/loadComment', function (req, res) {
    commentsModel.find({}, function (err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

app.get('/api/loadImages', function (req, res) {
    albumsModel.find({}, function (err, data) {
        if (err) {
            res.send(err);
        } else {
            const images = data.reduce((acc, e) => {
                return acc.concat(e.images);
            }, []);

            let viewImg = [];
            function getRandom(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
            for (let index = 0; index < 9; index++) {
                const num = getRandom(0, images.length - 1);
                let el = images.splice(num, 1);
                viewImg = viewImg.concat(el);
            }
            res.send(viewImg);
        }
    });
});

app.get('/api/loadAlbums', function (req, res) {
    albumsModel.find({}, function (err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data.map((a) => a.albumName));
        }
    });
});

app.get(`/api/loadAlbums/:albumName`, function (req, res) {
    albumsModel.findOne(req.params, function (err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data.images);
        }
    });
});

app.listen(3000, function () {
    console.log('App listening on port 3000');
});