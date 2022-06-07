function sumArray(array, n) {
  return new Promise(function(resolve, reject) {
    if (!Array.isArray(array) || typeof n !== 'number') return reject();
    for(var i = 0; i < array.length; i++) {
      for(var j = i+1; j < array.length; j++) {
        if (array[i] + array[j] === n) return resolve(true);
      }
    }
    return resolve(false);
  });
}

function numString(string) {
  return new Promise(function(resolve, reject) {
  if (typeof string !== 'string') return reject();
    resolve(string.length);
  });
}

function pluck(array, prop) {
  return new Promise(function(resolve, reject) {
    if (!Array.isArray(array) || typeof prop !== 'string') return reject();
    resolve(array.map(function(elem) {
      return elem[prop];
    }));
  });
}

module.exports = {
    sumArray: sumArray,
    numString: numString,
    pluck: pluck,
}

