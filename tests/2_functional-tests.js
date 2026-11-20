const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Functional Tests', () => {
  
  it('valid input such as 10L', (done) => {
    chai.request(app)
      .get('/api/convert?input=10L')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('initNum', 10);
        expect(res.body).to.have.property('initUnit', 'L');
        expect(res.body).to.have.property('returnNum', 2.64172);
        expect(res.body).to.have.property('returnUnit', 'gal');
        expect(res.body).to.have.property('string', '10 liters converts to 2.64172 gallons');
        done();
      });
  });
  
  it('invalid input such as 32g', (done) => {
    chai.request(app)
      .get('/api/convert?input=32g')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('error', 'invalid unit');
        done();
      });
  });
  
  it('invalid number such as 3/7.2/4kg', (done) => {
    chai.request(app)
      .get('/api/convert?input=3/7.2/4kg')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('error', 'invalid number');
        done();
      });
  });
  
  it('invalid number and unit such as 3/7.2/4kilomegagram', (done) => {
    chai.request(app)
      .get('/api/convert?input=3/7.2/4kilomegagram')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('error', 'invalid number and unit');
        done();
      });
  });
  
  it('no number such as kg', (done) => {
    chai.request(app)
      .get('/api/convert?input=kg')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('initNum', 1);
        expect(res.body).to.have.property('initUnit', 'kg');
        expect(res.body).to.have.property('returnNum', 2.20462);
        expect(res.body).to.have.property('returnUnit', 'lbs');
        expect(res.body).to.have.property('string', '1 kilograms converts to 2.20462 pounds');
        done();
      });
  });
  
});