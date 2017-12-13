const stylelint = require('stylelint');
const stylelintConfig = require('.');

const wrong = 'a { position: relative; color: red; display: block; border: 1px solid blue; background: white; }';
const correct = 'a { position: relative; display: block; color: red; background: white; border: 1px solid blue; }';

test('wrong order', () => (
  stylelint.lint({
    code: wrong,
    config: stylelintConfig,
  }).then((output) => {
    const { errored } = output;
    const { warnings } = output.results[0];
    expect(errored).toBeTruthy();
    expect(warnings[0].text).toEqual('Expected "display" to come before "color" (order/properties-order)');
    expect(warnings[1].text).toEqual('Expected "background" to come before "border" (order/properties-order)');
  })
));

test('correct order', () => (
  stylelint.lint({
    code: correct,
    config: stylelintConfig,
  }).then((output) => {
    const { errored } = output;
    const { warnings } = output.results[0];
    expect(errored).toBeFalsy();
    expect(warnings).toHaveLength(0);
  })
));
