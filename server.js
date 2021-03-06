const express = require("express");
const hbs = require('hbs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
   return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
 return text.toUpperCase();
});

// app.use((req, res, next) => {
//     res.render('updating.hbs');
// });

app.get('/', (req, res) => {
    res.render('home.hbs', {
        welcomeMessage: 'Welcome to the ',
        pageTitle: 'Home Page',
    });
});

app.get('/hello', (request, response) => {
    response.send("<h1>Hello Express</h1>");
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Couldn\'t fulfill request'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects Portfolio Page'
    });
});

app.listen(port, () => {
    console.log(`Server is up and running at http://localhost:${port}`);
});
