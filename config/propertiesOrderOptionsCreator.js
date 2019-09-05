const emptyLineBeforeOption = require('./emptyLineBeforeOption');

module.exports = ({
  'empty-line-between-groups': emptyLineBetweenGroups = false,
  'empty-line-minimum-property-threshold': emptyLineMinimumPropertyThreshold = 0,
} = {}) => ({
  emptyLineBeforeUnspecified: emptyLineBeforeOption(emptyLineBetweenGroups),
  emptyLineMinimumPropertyThreshold,
});
