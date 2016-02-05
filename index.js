(function() {
    'use strict';

    var express = require('express'),
        exphbs = require('express-handlebars'),
        path = require('path');

    var app = express();

    /* Handlebars Layouts */
    var hbs = exphbs.create({
        defaultLayout: 'main',
        layoutsDir: __dirname + '/templates/layouts',
        partialsDir: __dirname + '/templates/partials',
        helpers: {
            "is_eq": function(a, b, opts) {
                return a == b ? opts.fn(this) : opts.inverse(this);
            }
        }
    });

    app.engine('handlebars', hbs.engine);
    app.set('view engine', 'handlebars');
    app.set('views', __dirname + '/templates');

    app.get('/', function(req, res, next) {
        res.render('home', {
            title: 'Home',
            site: 'home'
        });
    });

    app.get('/u/', function(req, res, next) {
        res.redirect('/');
    });

    app.get('/u/:userId', function(req, res, next) {
        // FIXME
        res.render('index', {
            title: 'User Profile',
            site: 'user_profile'
        });
    });

    /* static stuff like css, js with static middleware */
    app.use('/public', express.static(__dirname + '/public'));

    var port = process.env.PORT || 8887;
    app.listen(port);
    console.log('Listening at localhost:' + port);
})();
