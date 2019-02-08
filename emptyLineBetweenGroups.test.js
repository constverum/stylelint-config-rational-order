const stylelint = require('stylelint');
const config = require('./emptyLineBetweenGroups');

const wrong = `
  a {
    position: relative;
    display: block;
    color: red;
    border: 1px solid blue;
    background: white;
  }
`;
const correct = `
  a {
    position: relative;

    display: block;
    width: auto;
    margin: 10px;
    padding: 10px;

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
        'Expected "border" to come before "color" in group "Box Model" (order/properties-order)',
        'Expected an empty line before property "display" (order/properties-order)',
        'Expected an empty line before property "color" (order/properties-order)',
        'Expected an empty line before property "border" (order/properties-order)',
        'Expected an empty line before property "background" (order/properties-order)',
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
