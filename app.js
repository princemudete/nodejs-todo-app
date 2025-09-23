var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

// set up template engine
app.set('view engine', 'ejs');

// static files
app.use(express.static('public'));

// fire controllers
todoController(app);

// listen on port 3000
app.listen(300)
    console.log('You are listening to port 3000');