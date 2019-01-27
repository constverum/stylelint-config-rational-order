const stylelint = require('stylelint');
const config = require('./borderInBoxModel');

const wrong = `
  a {
    position: relative;
    display: block;
    color: red;
    background: white;
    border: 1px solid blue;
  }
`;
const correct = `
  a {
    position: relative;
    display: block;
    width: auto;
    margin: 10px;
    padding: 10px;
    border: 1px solid blue;
    overflow: auto;
    color: red;
    background: white;
  }
`;

test('wrong order', () =>
  stylelint
    .lint({
      code: wrong,
      config,
    })
    .then(output => {
      const { errored } = output;
      const { warnings } = output.results[0];
      const expectedWarnings = [
        'Expected "border" to come before "background" (order/properties-order)',
      ];
      expect(errored).toBeTruthy();
      expect(warnings.length).toEqual(expectedWarnings.length);
      warnings.forEach(({ text }, idx) => {
        expect(text).toEqual(expect.stringContaining(expectedWarnings[idx]));
      });
    }));

test('correct order', () =>
  stylelint
    .lint({
      code: correct,
      config,
    })
    .then(output => {
      const { errored } = output;
      const { warnings } = output.results[0];
      expect(errored).toBeFalsy();
      expect(warnings).toHaveLength(0);
    }));
