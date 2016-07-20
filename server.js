// server.js

// set up ========================
var express = require('express');
// create our app w/ express
var app = express();
// mongoose for mongodb
var mongoose = require('mongoose');
// log requests to the console (express4)
var morgan = require('morgan');
// extract information from HTML POST (express4)
var bodyParser = require('body-parser');
// simulate DELETE and PUT (express4)
var methodOverride = require('method-override');

var port = process.env.PORT || 8080;


// load the mongo db stuff from ./config/
var database = require('./config/database');
// connect to mongoDB database on modulus.io
mongoose.connect(database.url);


// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));
// log every request to the console
app.use(morgan('dev'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({'extended':'true'}));
// parse application/json
app.use(bodyParser.json());
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());


// load the routes
require('./app/routes')(app);

// The Express application
// -------------------------------------------------------------
app.get('/', function(req, res) {
    // Load the single view file
    // (angular will handle the page changes on the front-end)
    res.sendFile('index.html'), { root: __dirname };
});


// listen (start app with node server.js)
// ======================================
//listen (start app with node server.js)
app.listen(port);
console.log("App listening on port " + port);

