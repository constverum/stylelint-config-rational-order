const configCreator = require('./configCreator');

module.exports = ({ borderInBoxModel }) => ({
  plugins: 'stylelint-order',
  rules: {
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['composes'],
      },
    ],
    'order/properties-order': configCreator({ borderInBoxModel }),
  },
});
