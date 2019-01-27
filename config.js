module.exports = propsOrder => ({
  plugins: 'stylelint-order',
  rules: {
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['composes'],
      },
    ],
    'order/properties-order': propsOrder,
  },
});
