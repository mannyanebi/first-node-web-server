console.log('Starting Server.js');

//requiring the express module (3rd Party)
const express = require('express');

//default const value for port
const port = process.env.PORT || 3000;

let app = express();

//requiring the hbs express hbs plugin
const hbs = require('hbs')

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.use(function (req, res, next) {
    let now = new Date().toString();
    console.log(`Time ${now} ${req.method} ${req.url}`);
    next();
});


hbs.registerHelper('getCurrentYear', function () {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', function (text) {
    return text.toUpperCase();
});

app.get('/', function (req, res) {
    // res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs', {
        pageTitle: 'Home Page'
    })
});

app.get('/about', function (req, res) {
    res.render('about.hbs', {
        pageTitle: 'About Mustache Page'
    })
});

app.get('/projects', function (req, res) {
    res.render('projects.hbs', {
        pageTitle: 'Our Portfolio'
    })
});

app.listen(port, function () {
    console.log('Server has started and listening at port ', port);
})