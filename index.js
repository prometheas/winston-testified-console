/**
 * The purpose of this package.
 */
const winston = require('winston');

/**
 * Answers whether the specified logger instance's transports list includes
 * a Console transport.
 *
 * @param  {Object}  transports the deconstructed `transports` property of the
 *                              specified Logger instance.
 *
 * @return {Boolean}
 */
function hasConsoleTransport({ transports }) {
  return (
    transports
    && transports.console
  );
}

/**
 * The default test for whether execution is presently happening in a testing
 * environment.
 *
 * Any `NODE_ENV` environment variable values that begin with `test` will
 * qualify, including `test`, `tests`, and `testing`.
 *
 * @return {Boolean}
 */
function isTestingEnv() {
  return /^test/.test(process.env.NODE_ENV);
}

/**
 * Main module function.
 *
 * It "testifies" a logger's Console transport when the `isTesting` function
 * returns `true` (thus indicating the runtime is a testing environment) by
 * directing all console-bound output to stderr.
 *
 * @param  {winston.Logger}  logger       Winston Logger instance
 * @param  {Function}        [isTesting]  function whose return value indicates
 *                                        whether execution is testing env.
 */
module.exports = (logger = winston, isTesting = isTestingEnv) => {
  const { transports } = logger || winston;
  const levels = Object.keys(logger.levels);

  if (!isTesting()) {
    return;
  }

  if (hasConsoleTransport(logger)) {
    if (typeof transports.console.stderrLevels !== 'object') {
      throw Error('Console transport instance is missing `stderrLevels` property');
    }

    transports.console.stderrLevels = {};
    levels.forEach((level) => {
      transports.console.stderrLevels[level] = true;
    });
  }
};
