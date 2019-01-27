const borderProps = require('./border');

const partOne = [
  'list-style',
  'list-style-position',
  'list-style-type',
  'list-style-image',
  'table-layout',
  'empty-cells',
  'caption-side',
  'background',
  'background-color',
  'background-image',
  'background-repeat',
  'background-position',
  'background-position-x',
  'background-position-y',
  'background-size',
  'background-clip',
  'background-origin',
  'background-attachment',
  'background-blend-mode',
  'box-decoration-break',
];

const partTwo = [
  'outline',
  'outline-width',
  'outline-style',
  'outline-color',
  'outline-offset',
  'box-shadow',
  'transform',
  'transform-origin',
  'transform-style',
  'backface-visibility',
  'perspective',
  'perspective-origin',
  'visibility',
  'cursor',
  'opacity',
  'filter',
  'backdrop-filter',
];

module.exports = ({ border }) => [].concat(partOne, border ? borderProps : [], partTwo);
