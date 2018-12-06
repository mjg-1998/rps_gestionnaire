const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


require('./src/models');
const apiRouter = require('./src/routes');




mongoose.connect('mongodb://localhost/rps', {useNewUrlParser: true});
mongoose.connection.on('error', console.error.bind(console, 'co error'));
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function () {
    const app = express();

    app.use(bodyParser.urlencoded({extended: false})); // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());

    app.use(function (req, res, next) {
        if (app.get('env') === 'development') {
            console.log(`${req.method} ${req.baseUrl}`);
        }
        req.data = {};
        next();
    });

    app.use('/', apiRouter);

    app.use(express.static(__dirname + '/public'));


    app.use(function (req, res, next) {
        next({
            message: `Error 404 : ${req.method} ${req.url} introuvable`,
            status: 404
        });
    });

    app.use(function (err, req, res, next) {
        const status = err.status || 500;
        res.status(status);
        if (app.get('env') === 'development') {
            console.error(err);
        }

        res.format({
            'text/plain': function () {
                res.send(err.message);
            },

            'text/html': function () {
                res.send(
                    `<!DOCTYPE html>
                <html lang="fr">
                    <head>
                        <meta charset="utf-8">
                    <title>Erreur ${status}</title>
                    </head>
                    <body>
                        <pre>${err.message}</pre>
                    </body>
                </html>`
                );
            },

            'application/json': function () {
                res.send({"message": err.message});
            },

            'default': function () {
                res.status(406).send("\"Accept\" Header Not Acceptable.");
            }
        });
    });


    app.listen(3000, function () {
        console.log("Server listening on port 3000");

    });
});