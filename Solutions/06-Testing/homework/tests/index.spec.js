const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../index.js'); // Importo el archivo de entrada del server de express.

const agent = session(app);

describe('Test de APIS', () => {
  describe('GET /', () => {
    it('responds with 200', () => agent.get('/').expect(200));
    it('responds with and object with message `hola`', () =>
        agent.get('/').then((res) => {
          expect(res.body.message).to.be.equal('hola');
        }));
  });

  describe('GET /test', () => {
    it('responds with 200', () => agent.get('/test').expect(200));
    it('responds with and object with message `test`', () =>
      agent.get('/test').then((res) => {
        expect(res.body.message).to.be.equal('test');
      }));
  });

  describe('POST /sum', () => {
    it('responds with 200', () => agent.post('/sum').send({a:1, b:1}).expect(200));
    it('responds with 400', () => agent.post('/sum').expect(400));
    it('responds with the sum of 2 and 3', () =>
      agent.post('/sum')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).to.be.equal(5);
        })
    );
    it('responds with the sum of 0 and 3', () =>
      agent.post('/sum')
        .send({a: 0, b: 3})
        .then((res) => {
          expect(res.body.result).to.be.equal(3);
        })
    );
  });

  describe('POST /producto', () => {
    it('responds with 200', () => agent.post('/product').send({a:3, b:0}).expect(200));
    it('responds with 400', () => agent.post('/product').send({a:'asdas', b:1}).expect(400));
    it('responds with 400', () => agent.post('/product').expect(400));
    it('responds with the product of 2 and 3', () =>
      agent.post('/product')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).to.be.equal(6);
        })
    );
    it('responds with the product of 3 and 3', () =>
      agent.post('/product')
        .send({a: 3, b: 3})
        .then((res) => {
          expect(res.body.result).to.be.equal(9);
        })
    );
  });

  describe('POST /sumArray', () => {
    it('responds with 400', () => agent.post('/sumArray').expect(400));
    it('responds with 200', () => agent.post('/sumArray').send({ array: [], num: 0 }).expect(200));
    it('responds with true', () =>
      agent.post('/sumArray')
        .send({array: [2,5,7,10,11,15,20], num: 13})
        .then((res) => {
          expect(res.body.result).to.be.equal(true);
      }));
  });
  describe('POST /numString', () => {
    it('responds with 400', () => agent.post('/numString').expect(400));
    it('responds with 400 if param is not string', () => agent.post('/numString').send({string: 123}).expect(400));
    it('responds with 200', () => agent.post('/numString').send({ string: 'asdas' }).expect(200));
    it('responds with 4', () =>
      agent.post('/numString')
        .send({ string: 'aaaa' })
        .then((res) => {
          expect(res.body.result).to.be.equal(4);
    }));
    it('responds with 10', () =>
      agent.post('/numString')
        .send({ string: 'aaaaabbbbb' })
        .then((res) => {
          expect(res.body.result).to.be.equal(10);
     }));
  });
  describe('POST /pluck', () => {
    it('responds with 400', () => agent.post('/pluck').expect(400));
    it('responds with 400 with wrong params', () => {
       return  agent.post('/pluck')
          .send({ array: 'asdas', name: 1231 })
          .expect(400);
    });
    it('responds with 200', () => agent.post('/pluck').send({ array: [], name: 'sadsa' }).expect(200));
    it('responds with prices', () =>
      agent.post('/pluck')
      .send({
        array: [{ name: 'p1', price: 100, },
          { name: 'p2', price: 200, },
          { name: 'p3', price: 300,}
        ],
        name: 'price'
      }).then((res) => {
         expect(res.body.result).to.be.deep.equal([100, 200, 300]);
      }));

    it('responds with names', () =>
      agent.post('/pluck')
      .send({
        array: [{ name: 'p1', price: 100, },
          { name: 'p2', price: 200, },
          { name: 'p3', price: 300,}
        ],
        name: 'name'
      }).then((res) => {
         expect(res.body.result).to.be.deep.equal(['p1', 'p2', 'p3']);
      }));
     });
});

