var { expect } = require('chai');
var suma = require('./index.js');

describe('suma', function() {

  it('should be a function', function() {
    expect(suma).to.be.a('function');
  });

  it('suma 1, y 2 deberia dar 3', function() {
    expect(suma(1,2)).to.be.equal(3);
  });
    it('suma 10 con -10 deberia dar 0', function() {
    expect(suma(10,-10)).to.be.equal(0);
  });


  
});