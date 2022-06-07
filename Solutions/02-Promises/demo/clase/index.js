function sumar(a, b) {
  return new Promise((resolve, reject) => {
    if (typeof a !== "number" || typeof b !== "number") {
      reject("Argumentos inválidos")
    }
    const result = a + b;
    resolve(result)
  })
}

function timeout() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("Finalizo el timer"), 15000)
  })
}

console.log("Arranco el timer")

const t = timeout()
t.then(onResolve, onReject)


function onResolve(value) {
  console.log("ok", value)
}

function onReject(value) {
  console.log("error", value)
}
