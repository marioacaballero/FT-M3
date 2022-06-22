function* fizzBuzzGenerator(max) {
  // Tu código acá:
  let counter = 0;
  if (max) {
    while (counter < max) {
      counter++;
      if (counter % 3 === 0 && counter % 5 === 0) {
        yield "Fizz Buzz";
      } else if (counter % 3 === 0) {
        yield "Fizz";
      } else if (counter % 5 === 0) {
        yield "Buzz";
      } else yield counter;
    }
  } else {
    while (true) {
      counter++;
      if (counter % 3 === 0 && counter % 5 === 0) {
        yield "Fizz Buzz";
      } else if (counter % 3 === 0) {
        yield "Fizz";
      } else if (counter % 5 === 0) {
        yield "Buzz";
      } else yield counter;
    }
  }
}

module.exports = fizzBuzzGenerator;
