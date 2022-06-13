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
  let downstreamPromise = new $Promise(function (resolve, reject) {});
  this._handlerGroups.push({
    successCb: succes,
    errorCb: error,
    downstreamPromise,
  });
  if (this._state !== "pending") {
    this._callHandlers(); //llama en el caso de tener un .then cuando la promesa ya se resolvio. Ya que una vez resuelta no se van a ejecutar los resolve o reject de la promesa, necesito ejecutarlos en el .then
  }
  return downstreamPromise;
};

$Promise.prototype._callHandlers = function () {
  while (this._handlerGroups.length > 0) {
    let actual = this._handlerGroups.shift();
    if (this._state === "fulfilled") {
      if (actual.successCb) {
        //Si tengo handlerResolve
        try {
          //El try catch se utiliza para cuando yo no se si el programa me va a tirar un error, y en caso de que lo haga pueda seguir corriendo capturando el error y dandome la opcion de hacer algo al respecto con eso.
          let result = actual.successCb(this._value); //cuando ejecuto el successCb me puede dar 3 resultados, una promesa, un valor o un error. Lo guardo en una variable para verificar cual de las 3 es la que tengo. Utilizo el "try catch", donde en el try pongo el resultado de valor y promesa, y en el catch el resultado de error.
          if (result instanceof $Promise) {
            //Si el resultado es una promesa
            //Le puedo aplicar un then, pasandole un handlerResolve y un handlerReject
            return result.then(
              (data) => actual.downstreamPromise._internalResolve(data), //si result se resuleve, downstreamPromise se resuelve.
              (error) => actual.downstreamPromise._internalReject(error) //si result se rechaza, downstreamPromise se rechaza
            );
          } else {
            //Si es un valor
            actual.downstreamPromise._internalResolve(result);
          }
        } catch (error) {
          //Si es un error
          actual.downstreamPromise._internalReject(error);
        }
      } else {
        //Si no tengo un handlerResolve
        actual.downstreamPromise._internalResolve(this._value);
      }
    }
    if (this._state === "rejected") {
      if (actual.errorCb) {
        try {
          let result = actual.errorCb(this._value);
          if (result instanceof $Promise) {
            return result.then(
              (data) => actual.downstreamPromise._internalResolve(data),
              (error) => actual.downstreamPromise._internalReject(error)
            );
          } else {
            actual.downstreamPromise._internalResolve(result);
          }
        } catch (error) {
          actual.downstreamPromise._internalReject(error);
        }
      } else {
        actual.downstreamPromise._internalReject(this._value);
      }
    }
  }
};

$Promise.prototype.catch = function (errorCb) {
  return this.then(null, errorCb);
};

/*
const promesa1 = new $Promise(function(resol, reject){
  setTimeout(reject(), 1000)
})

promesa1.then((data)=>{
  console.log(data);
  return promesa2

})
*/

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
