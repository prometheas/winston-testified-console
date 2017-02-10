/**
 * Unit tests for the `index` module.
 *
 * NOTE: unit tests should never make any network requests, so please remember to mock
 *       any objects that would otherwise take such actions.
 */

const expect = require('chai').expect;
const winston = require('winston');

const testifyLogger = require('../../index.js');

describe('#testifyLogger() [unit]', () => {
  describe('usage with winston.Logger instance', () => {
    const returnTrue = () => (true);
    let logger;

    beforeEach(() => {
      logger = new winston.Logger();
    });

    it('should add entries for all logger levels to the console transport `stderrLevels` object', () => {
      logger.add(winston.transports.Console);

      testifyLogger(logger, returnTrue);

      Object.keys(logger.levels).forEach((level) => {
        expect(logger.transports.console.stderrLevels[level]).to.be.true;
      });
    });

    it('should not throw when there is no console transport', () => {
      logger.add(winston.transports.File, { filename: './foo.log' });

      expect(() => {
        testifyLogger(logger, returnTrue);
      }).not.to.throw();
    });

    it('should throw when console transport has no `stderrLevels` property', () => {
      logger.add(winston.transports.Console);

      delete logger.transports.console.stderrLevels;
      expect(() => {
        testifyLogger(logger, returnTrue);
      }).to.throw();
    });

    it('should throw when console transport has a non-object `stderrLevels` property', () => {
      logger.add(winston.transports.Console);

      logger.transports.console.stderrLevels = 1;
      expect(() => {
        testifyLogger(logger, returnTrue);
      }).to.throw();
    });
  });
});
