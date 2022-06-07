function sumPromise(a, b) {
  return new Promise((resolve, reject) => {
    if(typeof a !== "number" || typeof b !== "number") {
      throw new TypeError('Argumento esperado debe ser numerico')
    }
    resolve(a + b)
  })
}

// sumPromise().then((result) => console.log(result))
// sumPromise('', 4)
//   .then(result => console.log(result))
//   .catch(error => console.error("Ups!!!"))

(async () => {
  try {
    const resultA = await sumPromise(1, 5)
    const resultB = await sumPromise("hola", 5)
    console.log(resultA, resultB)
  } catch (error) {
    console.error("Ups!!!")
  }
})()


