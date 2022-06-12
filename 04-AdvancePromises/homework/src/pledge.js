"use strict";
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:

function $Promise(executor) {
  if (typeof executor !== "function") {
    throw new TypeError("Executor doesn't is function");
  }
  this._state = "pending";
  this._handlerGroups = [];
  executor(
    (data) => this._internalResolve(data),
    (data) => this._internalReject(data)
  );
}

$Promise.prototype._internalResolve = function (data) {
  if (this._state === "pending") {
    this._state = "fulfilled";
    this._value = data;
    this._callHandlers(); //succesCB y errorCB ---> succesCB
  }
};

$Promise.prototype._internalReject = function (data) {
  if (this._state === "pending") {
    this._state = "rejected";
    this._value = data;
    this._callHandlers(); //succesCB y errorCB ---> errorCB
  }
};

$Promise.prototype.then = function (succes, error) {
  if (typeof succes !== "function") succes = false;
  if (typeof error !== "function") error = false;
  this._handlerGroups = [
    ...this._handlerGroups,
    { successCb: succes, errorCb: error },
  ];
  if (this._state !== "pending") {
    this._callHandlers();
  }
};

$Promise.prototype._callHandlers = function () {
  while (this._handlerGroups.length > 0) {
    let actual = this._handlerGroups.shift();
    if (this._state === "fulfilled")
      actual.successCb && actual.successCb(this._value);
    if (this._state === "rejected")
      actual.errorCb && actual.errorCb(this._value);
  }
};

$Promise.prototype.catch = function (errorCb) {
  return this.then(null, errorCb);
};

// const promesa1 = new $Promise(function(resol, reject){
//   setTimeout(reject(), 1000)
// })

// promesa1.then((data)=>{

// })

module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
