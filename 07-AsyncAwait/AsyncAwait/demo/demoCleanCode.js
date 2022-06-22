const fs = require("fs");

function promisifiedReadFile(filename) {
  return new Promise(function (resolve, reject) {
    fs.readFile(filename, "utf8", function (err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

const readFilePromise = (archivo) => {
  promisifiedReadFile(archivo).then((file) => {
    console.log("Log promise file: ", file);
    return "Lectura exitosa";
  });
  console.log("done");
};

readFilePromise("archivo.txt");

const readFileAsync = async (archivo) => {
  console.log("Log async file: ", await promisifiedReadFile(archivo));
  console.log("done");
  return "Lectura exitosa";
};

readFileAsync("archivo.txt").then((data) => console.log(data));
