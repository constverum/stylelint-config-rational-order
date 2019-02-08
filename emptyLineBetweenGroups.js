const special = require('./groups/special');
const positioning = require('./groups/positioning');
const boxModel = require('./groups/boxModel');
const typography = require('./groups/typography');
const visual = require('./groups/visual');
const animation = require('./groups/animation');
const misc = require('./groups/misc');
const config = require('./config');

const setEmptyLine = ([groupName, properties]) => ({
  emptyLineBefore: 'always',
  properties,
  groupName,
});

const rational = [
  ['Special', special],
  ['Positioning', positioning],
  ['Box Model', boxModel({ border: true })],
  ['Typography', typography],
  ['Visual', visual({ border: false })],
  ['Animation', animation],
  ['Misc', misc],
].map(group => setEmptyLine(group));

module.exports = config(rational);
