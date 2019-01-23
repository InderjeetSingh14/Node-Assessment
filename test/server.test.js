const fs = require('fs');

const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('./../server');

chai.use(chaiHttp);

let should = chai.should();

describe('GET /readFile ', () => {
  it('should read file', (done) => {
    chai.request(app)
      .get('/readFile')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("Object");
        done()
      });
  });
});

describe('GET /product/:parameter1/:parameter2', () => {
  it('should return product of 2 numbers', (done) => {
    chai.request(app)
      .get('/product/11/7')
      .end((err, res) => {
        res.should.have.status(200);
        res.text.should.equal('11 * 7 is 77');
        done()
      });
  });
  it('should return error message if paramaters are not a number', (done) => {
    chai.request(app)
      .get('/product/11/z#')
      .end((err, res) => {
        res.should.have.status(400);
        res.text.should.equal('Both Parameters should be a number');
        done()
      });
  });
});

describe('POST /writeFile', () => {
  it('should write the file', (done) => {
    chai.request(app)
      .post('/writeFile')
      .attach('data',fs.readFileSync('./assets/writeData.txt'),'./assets/writeData.txt')
      .end((err, res) => {
        res.should.have.status(200);
        res.text.should.equal("File Successfully Saved");
        done()
      });
  });
});

describe('GET /firstNonRepeatingCharacter/:name', () => {
  it('should return first non-repeating character from string name', (done) => {
    chai.request(app)
      .get('/firstNonRepeatingCharacter/nounce')
      .end((err, res) => {
        res.should.have.status(200);
        res.text.should.equal('o');
        done()
      });
  });
  it('should not return first non-repeating character from string name if name has all repeating characters', (done) => {
    chai.request(app)
      .get('/firstNonRepeatingCharacter/nono')
      .end((err, res) => {
        res.should.have.status(400);
        res.text.should.equal('No Non Repeating Character Found');
        done()
      });
  });
});