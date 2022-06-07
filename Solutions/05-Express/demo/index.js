var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express(); // nos oculta el uso de http.createServer

var posts = [];

// configuracion de app
// cargando las rutas en un orden determinado
// MIDDLEWARE
app.use(morgan('tiny')); // para todas las rutas, poara todos llos verbos
app.use(bodyParser.json());
app.post('/api/', function(req, res) {
    posts.push(req.body)
    res.sendStatus(200);
});

app.get('/api/:index', function(req, res ){
  res.send(posts[req.params.index]);
})

// poner a correr el server

app.listen(1337);
