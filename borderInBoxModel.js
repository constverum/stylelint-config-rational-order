const special = require('./groups/special');
const positioning = require('./groups/positioning');
const boxModel = require('./groups/boxModel');
const typography = require('./groups/typography');
const visual = require('./groups/visual');
const animation = require('./groups/animation');
const misc = require('./groups/misc');
const config = require('./config');

const rationalBorderInBoxModel = [
  ...special,
  ...positioning,
  ...boxModel({ border: true }),
  ...typography,
  ...visual({ border: false }),
  ...animation,
  ...misc,
];

module.exports = config(rationalBorderInBoxModel);
