const stylelint = require('stylelint');
const propertiesOrderRule = require('stylelint-order/rules/properties-order');
const configCreator = require('../config/configCreator');

const ruleName = 'plugin/rational-order';

const PER_GROUP_SETTINGS = {
  'border-in-box-model': [true, false],
  'empty-line-between-groups': ['always', 'never', 'threshold'],
  'empty-lines-within-groups': [true, false],
  'property-order': ['flexible'],
};

const SECONDARY_SETTINGS = {
  'disable-fix': [true, false],
  'empty-line-before-unspecified': ['always', 'never', 'threshold'],
  'empty-line-property-threshold': [o => Number.isInteger(o)],
  unspecified: ['top', 'bottom', 'bottomAlphabetical', 'ignore'],
};

module.exports = stylelint.createPlugin(
  ruleName,
  (enabled, options, context) => (postcssRoot, postcssResult) => {
    const validOptions = stylelint.utils.validateOptions(
      postcssResult,
      ruleName,
      {
        actual: enabled,
        possible: [true, false],
      },
      {
        actual: options,
        optional: true,
        possible: {
          ...PER_GROUP_SETTINGS,
          ...SECONDARY_SETTINGS,
        },
      },
    );

    if (!enabled || !validOptions) {
      return;
    }

    const resolvedGroupSettings = Object.keys(PER_GROUP_SETTINGS).reduce((acc, val) => {
      acc[val] = options[val];
      return acc;
    }, {});
    const resolvedSecondarySettings = Object.keys(SECONDARY_SETTINGS).reduce((acc, val) => {
      acc[val] = options[val];
      return acc;
    }, {});

    const primaryOptions = configCreator.groupSettings(resolvedGroupSettings);
    const secondaryOptions = configCreator.secondarySettings(resolvedSecondarySettings);

    propertiesOrderRule(primaryOptions, secondaryOptions, context)(postcssRoot, postcssResult);
  },
);

module.exports.ruleName = ruleName;
