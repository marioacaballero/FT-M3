"use strict";

var Promise = require("bluebird"),
  async = require("async"),
  exerciseUtils = require("./utils");

var readFile = exerciseUtils.readFile,
  promisifiedReadFile = exerciseUtils.promisifiedReadFile,
  blue = exerciseUtils.blue,
  magenta = exerciseUtils.magenta;

var args = process.argv.slice(2).map(function (st) {
  return st.toUpperCase();
});

module.exports = {
  problemA: problemA,
  problemB: problemB,
  problemC: problemC,
  problemD: problemD,
  problemE: problemE,
};

// corre cada problema dado como un argumento del command-line para procesar
args.forEach(function (arg) {
  var problem = module.exports["problem" + arg];
  if (problem) problem();
});

function problemA() {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * A. loggea el poema dos stanza uno y stanza dos en cualquier orden
   *    pero loggea 'done' cuando ambos hayan terminado
   *    (ignora errores)
   *    nota: lecturas ocurriendo paralelamente (en simultaneo)
   *
   */

  // callback version
  // async.each(['poem-two/stanza-01.txt', 'poem-two/stanza-02.txt'],
  //   function (filename, eachDone) {
  //     readFile(filename, function (err, stanza) {
  //       console.log('-- A. callback version --');
  //       blue(stanza);
  //       eachDone();
  //     });
  //   },
  //   function (err) {
  //     console.log('-- A. callback version done --');
  //   }
  // );

  // promise version
  // ???
  const promiseOne = promisifiedReadFile("poem-two/stanza-01.txt");
  const promiseTwo = promisifiedReadFile("poem-two/stanza-02.txt");

  Promise.all([promiseOne, promiseTwo]) //yo le coloco un arreglo de promesas que se lanzan en paralelo y una vez que todas se resuelven el .then las recibe como un arreglo de respuestas.
    //no importa cual se resuelve primero, el Promise.all se encarga de ubicarlas en su respectivo lugar
    .then((values) => {
      //como los tengo que devolver por separado le hago a cada elemento el console.log  (que seria la funcion blue)
      blue(values[0]);
      blue(values[1]);
      console.log("done");
    });
}

function problemB() {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * B. loggea todas las stanzas en poema dos, en cualquier orden y loggea
   *    'done' cuando todas hayan terminado
   *    (ignora errores)
   *    nota: las lecturas ocurren en paralelo (en simultaneo)
   *
   */

  var filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return "poem-two/" + "stanza-0" + n + ".txt";
  });

  // callback version
  // async.each(
  //   filenames,
  //   function (filename, eachDone) {
  //     readFile(filename, function (err, stanza) {
  //       console.log("-- B. callback version --");
  //       blue(stanza);
  //       eachDone();
  //     });
  //   },
  //   function (err) {
  //     console.log("-- B. callback version done --");
  //   }
  // );

  // promise version
  // ???
  const arrPromises = filenames.map(promisifiedReadFile); //como la funcion tiene un solo argumento puedo pasarle directamente la funcion

  Promise.all(arrPromises).then((values) => {
    values.forEach((poema) => blue(poema)); //al igual que en el anterior, necesito hacerle a cada uno el console.log, por eso uso un forEach
    console.log("done");
  });
}

function problemC() {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * C. Lee y loggea todas las stanzas en el poema dos, *en orden* y
   *    loggea 'done cuando hayan terminado todas
   *    (ignorá errores)
   *    nota: las lecturas ocurren en serie (solo cuando las previas
   *    hayan terminado)
   *
   */

  var filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return "poem-two/" + "stanza-0" + n + ".txt";
  });

  // callback version
  // async.eachSeries(
  //   filenames,
  //   function (filename, eachDone) {
  //     readFile(filename, function (err, stanza) {
  //       console.log("-- C. callback version --");
  //       blue(stanza);
  //       eachDone();
  //     });
  //   },
  //   function (err) {
  //     console.log("-- C. callback version done --");
  //   }
  // );

  // promise version
  // ???
  filenames
    .reduce((promise, path) => {
      return promise.then((data) => {
        if (data) blue(data);

        return promisifiedReadFile(path);
      });
    }, Promise.resolve()) //Promise.resolve() para tener una respuesta sincronica y poder encadenar los .then
    .then((dataFinal) => blue(dataFinal)) //con este ultimo tomo el ultimo path y lo concateno. Esto es debido al metodo reduce.
    .finally(() => console.log("done"));

  //Esto se resolveria de la siguiente manera --> Promise.then().then().then().then() para poder ir esperando a que se resuelva la anterior antes de seguir con la nueva.
}

function problemD() {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * D. loggea todas las stanzas en el poema dos *en orden* asegurandote
   *    de fallar para cualquier error y logueando un 'done cuando todas
   *    hayan terminado
   *    nota: las lecturas ocurren en serie (solo cuando las previas
   *    hayan terminado)
   *
   */

  var filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return "poem-two/" + "stanza-0" + n + ".txt";
  });
  var randIdx = Math.floor(Math.random() * filenames.length);
  filenames[randIdx] = "wrong-file-name-" + (randIdx + 1) + ".txt";

  // callback version
  // async.eachSeries(
  //   filenames,
  //   function (filename, eachDone) {
  //     readFile(filename, function (err, stanza) {
  //       console.log("-- D. callback version --");
  //       if (err) return eachDone(err);
  //       blue(stanza);
  //       eachDone();
  //     });
  //   },
  //   function (err) {
  //     if (err) magenta(new Error(err));
  //     console.log("-- D. callback version done --");
  //   }
  // );

  // promise version
  // ???
  filenames
    .reduce((promise, path) => {
      return promise.then(
        (data) => {
          if (data) blue(data);

          return promisifiedReadFile(path);
        }
        /*(error) => {
          magenta(new Error(error));
          return promisifiedReadFile(path); //manejo el error promesa a promesa, de esta manera si una falla puedo seguir leyendo las otras. Es decir, me salgo de la serie con el error, la saltea y si se resuelve el error me vuelvo a meter a la serie.
          // si utilizo un .cath() directamente salteo todo y me voy hasta el catch cuando tenga un error.
        }*/
      );
    }, Promise.resolve())
    .then(
      (dataFinal) => blue(dataFinal)
      /*(error) => magenta(new Error(error))*/
    )
    .catch((err) => magenta(new Error(err)))
    .finally(() => console.log("done"));
}

function problemE() {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * E. Haz una versión promisificada de fs.writeFile
   *
   */

  var fs = require("fs");
  function promisifiedWriteFile(filename, str) {
    // tu código aquí
  }
}
