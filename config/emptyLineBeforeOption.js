module.exports = emptyLineBetweenGroups => {
  if (emptyLineBetweenGroups === 'threshold') return 'threshold';
  return emptyLineBetweenGroups ? 'always' : 'never';
};
