'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:
function $Promise(executor) {
  this._state = "pending"
  this._value = undefined
  this._handlerGroups = []
  executor(this._internalResolve.bind(this), this._internalReject.bind(this))
}

$Promise.prototype._internalResolve = function (value) {
  if (this._state === "pending") {
    this._state = "fulfilled"
    this._value = value
    this._callHandlers()
  }
}
$Promise.prototype._internalReject = function (value) {
  if (this._state === "pending") {
    this._state = "rejected"
    this._value = value
    this._callHandlers()
  }
}
$Promise.prototype._callHandlers = function () {
  while (this._handlerGroups.length) {
    const cb = this._handlerGroups.shift()
    if (this._state === "fulfilled") {
      if (cb.successCb) {
        try {
          const result = cb.successCb(this._value)
          if (result instanceof $Promise) {
            return result.then(
              value => cb.downstreamPromise._internalResolve(value),
              error => cb.downstreamPromise._internalReject(error)
            )
          } else {
            cb.downstreamPromise._internalResolve(result)
          }
        } catch (err) {
          cb.downstreamPromise._internalReject(err)
        }
      } else {
        return cb.downstreamPromise._internalResolve(this._value)
      }
    } else if (this._state === "rejected") {
      if (cb.errorCb) {
        try {
          const result = cb.errorCb(this._value)
          if (result instanceof $Promise) {
            return result.then(
              value => cb.downstreamPromise._internalResolve(value),
              error => cb.downstreamPromise._internalReject(error)
            )
          } else {
            cb.downstreamPromise._internalResolve(result)
          }
        } catch (err) {
          cb.downstreamPromise._internalReject(err)
        }
      } else {
        return cb.downstreamPromise._internalReject(this._value)
      }
    }
  }
}

$Promise.prototype.then = function (successCb, errorCb) {
  if (typeof successCb !== "function") successCb = false
  if (typeof errorCb !== "function") errorCb = false

  // Nueva promesa que debemos retornar
  const downstreamPromise = new $Promise(() => { })
  this._handlerGroups.push({
    successCb,
    errorCb,
    downstreamPromise
  })
  if (this._state !== "pending") this._callHandlers()
  return downstreamPromise
}
$Promise.prototype.catch = function (errorCb) {
  return this.then(null, errorCb)
}

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