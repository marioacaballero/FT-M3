const fs = require('fs');
const m2 = require('./module2.js');
const modulo1 = require('./modulo1.js');

console.log(modulo1.nombre);

const moment = require('moment'); // se importa igual como si fuera un modulo core o nativo

console.log('Nodemon arranca de nuevo')
const date = moment().format('MM Do YYYY, h:mm:ss a');

console.log(date);
