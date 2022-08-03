const path = require('path');
const specialProps = require('../groups/special');

module.exports = ({
  'border-in-box-model': borderInBoxModel = false,
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
      },
    ],
  },
});
