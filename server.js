const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

// Declare constats required
const app = express();
const port = process.env.PORT || 3000;
const nav = [
  { link: '#home', title: 'home' },
  { link: '#about', title: 'about' },
  { link: '#service', title: 'service' },
  { link: '#team', title: 'team' },
  { link: '#portfolio', title: 'portfolio' },
  { link: '#blog', title: 'blog' },
  { link: '#contact', title: 'contact' }
];

// Use Midddlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('tiny'));

const userRoute = require('./src/routes');

// Use static files
app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/popper.js/dist')));

// Use Route
app.use('/api/user/', userRoute);

// Set the template engine
app.set('views', './src/views');
app.set('view engine', 'ejs');

// Home Template
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Amelia analytics',
    nav
  });
});

app.listen(port, () => {
  debug(`${chalk.magenta('Server Listening on Port 3000. Browse to localhost:3000')}`);
});
