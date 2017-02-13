const testify = require('../../../index');
const winston = require('winston');

const modes = {
  'no-args': function testifyNoArgs() {
    testify();
  },
  'explicit-winston': function testifyExplicitWinston() {
    testify(winston);
  },
  'logger-instance': function testifyLoggerInstance() {
    const logger = new winston.Logger();
    testify(logger);
  },
  'loggers-array': function testifyLoggersArray() {
    const loggers = [
      new winston.Logger(),
      new winston.Logger(),
    ];

    testify(loggers);
  },
  'logging-container': function testifyLoggingContainer() {
    const container = new winston.Container();

    testify(container);
  },
};

try {
  modes[process.env.TESTIFY_MODE]();
} catch (e) {
  throw Error(`Unknown mode: '${process.env.TESTIFY_MODE}'`);
}
