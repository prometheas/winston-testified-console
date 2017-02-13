const expect = require('chai').expect;
const winston = require('winston');

describe('Sample mocha test', () => {
  it('should test a thing', () => {
    expect(1).to.equal(1);
    winston.info('log output');
  });
});
