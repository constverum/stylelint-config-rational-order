const stylelint = require('stylelint');
const propertiesOrderRule = require('stylelint-order/rules/properties-order');
const configCreator = require('../config/configCreator');

const ruleName = 'plugin/rational-order';

module.exports = stylelint.createPlugin(ruleName, (enabled = true, options = {}, context) => {
  if (!enabled) {
    return () => {};
  }

  const expectation = configCreator(options);

  return propertiesOrderRule(expectation, undefined, context);
});

module.exports.ruleName = ruleName;
