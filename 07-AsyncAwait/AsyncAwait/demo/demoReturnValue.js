function resolveAfter2Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Promesa resuelta!");
    }, 2000);
  });
}

async function asyncCallSuccessPromise() {
  console.log("Iniciando asyncCallSuccessPromise");
  const result = await resolveAfter2Seconds();
  return result;
}

async function asyncCallSuccessNoPromise() {
  console.log("Iniciando asyncCallSuccessNoPromise");
  return "Franco"; // === return Promise.resolve("Franco")
}

async function asyncCallError() {
  try {
    console.log("Iniciando asyncCallError");
    throw new Error(":(");
  } catch (error) {
    console.log(error)
  }
}

async function asyncCallNoResponse() {
  console.log("Iniciando asyncCallNoResponse");
  const result = await resolveAfter2Seconds();
}

var p1 = asyncCallSuccessPromise().then((data) => console.log(data));
var p2 = asyncCallSuccessNoPromise().then((data) => console.log(data));
var p3 = asyncCallError().then(
  (data) => console.log(data),
  (err) => console.log(err)
);
var p4 = asyncCallNoResponse().then((data) => console.log(data));

// Ver p1, p2, p3 y p4 en la consola luego de pasado 2 segundos
