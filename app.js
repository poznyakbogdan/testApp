    // set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

    // configuration =================

    mongoose.connect('mongodb://localhost/testApp');
    console.log(mongoose.connection.readyState);
    app.use(express.static(__dirname + '/frontend'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

    // routes ============

    app.get("/", (req, res) => {
        res.sendFile("/frontend/index.html");
    })

    // db examples =========

    var Schema = mongoose.Schema;

    var blogSchema = new Schema({
      name:  String,
      age: Number
    });

    var Blog = mongoose.model('Blog', blogSchema);

    var blog = new Blog({
        name: "Bogdan",
        age: 20
    });

    blog.save( err => {
        console.log("saved!");
    });
    // listen (start app with node server.js) ======================================
    app.listen(8080);
    console.log("App listening on port 8080");

    Blog.find({"name": "Bogdan"}, (err, res) => {
        console.log(res);
    })