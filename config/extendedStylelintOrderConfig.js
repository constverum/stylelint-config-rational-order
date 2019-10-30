const path = require('path');
const specialProps = require('../groups/special');

module.exports = ({
  'border-in-box-model': borderInBoxModel = false,
  'empty-line-between-groups': emptyLineBetweenGroups = false,
  'no-empty-lines-between-properties': noEmptyLinesBetweenProperties = true,
} = {}) => ({
  plugins: ['stylelint-order', path.join(__dirname, '../plugin')],
  rules: {
    'order/properties-order': [],
    'property-no-unknown': [
      true,
      {
        ignoreProperties: specialProps,
      },
    ],
    'plugin/rational-order': [
      true,
      {
        'border-in-box-model': borderInBoxModel,
        'empty-line-between-groups': emptyLineBetweenGroups,
        'no-empty-lines-between-properties': noEmptyLinesBetweenProperties,
      },
    ],
  },
});
