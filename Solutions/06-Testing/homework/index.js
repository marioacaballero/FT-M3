const express = require('express');
const bodyParser = require('body-parser');
const { sumArray, numString, pluck } = require('./utils.js');
const app = express();

app.use(bodyParser.json()); // for parsing application/json

app.get('/', (req, res) => {
  res.send({
    message: 'hola',
  });
});

app.get('/test', (req, res) => {
  return res.json({ message: 'hola' })
})

app.post('/sum', (req, res) => {
  const { a, b } = req.body;
  return res.json({ result: a + b })
})

app.post('/product', (req, res) => {
  const { a, b } = req.body
  if (typeof b !== 'number' || typeof a != 'number') return res.sendStatus(400);
  res.send({
    result: req.body.a * req.body.b,
  });
});

app.post('/sumArray', (req, res) => {
  const { array, num } = req.body;
  const result = sumArray(array, num)
  return res.json({
    result
  })
})

app.post('/numString', (req, res) => {
  const { string } = req.body;
  if(typeof string !== "string" || string === "") return res.sendStatus(400)
  return res.json({ result: string.length })
})

app.post('/pluck', (req, res) => {
  const { array, string } = req.body;
  if( !Array.isArray(array) || typeof string !== "string" || string === "") return res.sendStatus(400)
  
  const result = array.reduce((result, item) => {
    if(item.hasOwnProperty(string)) {
      result = [...result, item[string]]
    }
    return result
  }, [])
  
  return res.json({ result })
})

app.listen(3000);

module.exports = app; // Exportamos app para que supertest session la pueda ejecutar


function sumArray(array, n) {
  if (!Array.isArray(array) || typeof n !== "number") throw new TypeError('array');
  for(var i = 0; i < array.length ; i ++) {
    for(var j = i + 1; j < array.length ; j ++) {
      if ( array[i] + array[j] === n) return true;
    }
  }
  return false;
};