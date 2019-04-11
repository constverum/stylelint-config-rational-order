const special = require('../groups/special');
const positioning = require('../groups/positioning');
const boxModel = require('../groups/boxModel');
const typography = require('../groups/typography');
const visual = require('../groups/visual');
const animation = require('../groups/animation');
const misc = require('../groups/misc');

const configCreator = ({ borderInBoxModel = false, emptyLineBeetweenGroup = false }) => {
  return [
    ['Special', special],
    ['Positioning', positioning],
    ['Box Model', boxModel({ border: borderInBoxModel })],
    ['Typography', typography],
    ['Visual', visual({ border: !borderInBoxModel })],
    ['Animation', animation],
    ['Misc', misc],
  ].map(([groupName, properties]) => ({
    emptyLineBefore: emptyLineBeetweenGroup ? 'always' : 'never',
    properties,
    groupName,
  }));
};

module.exports = configCreator;
