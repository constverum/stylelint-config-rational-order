const stylelint = require('stylelint');
const plugin = require('../plugin');
const ruleName = plugin.ruleName;
const extendConfig = require('../config/extendedStylelintOrderConfig');

function getPluginOptions(code, rules) {
  return {
    code,
    configBasedir: __dirname,
    config: {
      plugins: ['../plugin'],
      rules,
    },
  };
}

describe('stylelint-config-rational-order/extended', () => {
  describe('order with borderInBoxModel=false', () => {
    const config = extendConfig({ borderInBoxModel: false });
    const wrong = `
      a {
        position: relative;
        color: red;
        display: block;
        border: 1px solid blue;
        background: white;
      }
    `;
    const correct = `
      a {
        position: relative;
        display: block;
        color: red;
        background: white;
        border: 1px solid blue;
      }
    `;

    it('wrong', done => {
      stylelint
        .lint({
          code: wrong,
          config,
        })
        .then(output => {
          const { errored } = output;
          const { warnings } = output.results[0];
          const expectedWarnings = [
            'Expected "display" to come before "color" in group "Box Model" (order/properties-order)',
            'Expected "background" to come before "border" in group "Visual" (order/properties-order)',
          ];
          expect(errored).toBeTruthy();
          warnings.forEach(({ text }, idx) => {
            expect(text).toEqual(expect.stringContaining(expectedWarnings[idx]));
          });
        });

      return done();
    });

    it('correct', done => {
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
        });

      return done();
    });
  });

  describe('order with borderInBoxModel=true', () => {
    const config = extendConfig({ borderInBoxModel: true });
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

    it('wrong', done => {
      stylelint
        .lint({
          code: wrong,
          config,
        })
        .then(output => {
          const { errored } = output;
          const { warnings } = output.results[0];
          const expectedWarnings = [
            `Expected "border" to come before "background" in group "Box Model" (order/properties-order)`,
          ];
          expect(errored).toBeTruthy();
          warnings.forEach(({ text }, idx) => {
            expect(text).toEqual(expect.stringContaining(expectedWarnings[idx]));
          });

          return done();
        });
    });

    it('correct', done => {
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

          return done();
        });
    });
  });
});

describe('stylelint-config-rational-order/plugin', () => {
  describe('correct order with enabled', () => {
    it('with default (borderInBoxModel=false and emptyLineBeetweenGroup=false)', done => {
      const rules = {
        [ruleName]: true,
      };
      const correct = `
      a {
        position: relative;
        display: block;
        color: red;
        background: white;
        border: 1px solid blue;
      }
    `;

      return stylelint
        .lint(getPluginOptions(correct, rules))
        .then(output => {
          const { errored } = output;
          const { warnings } = output.results[0];

          expect(errored).toBeFalsy();
          expect(warnings).toHaveLength(0);

          return done();
        })
        .catch(error => done(error));
    });

    it('with borderInBoxModel=true and emptyLineBeetweenGroup=false', done => {
      const rules = {
        [ruleName]: [
          true,
          {
            borderInBoxModel: true,
          },
        ],
      };
      const correct = `
      a {
        position: relative;
        display: block;
        border: 1px solid blue;
        color: red;
        background: white;
      }
    `;

      return stylelint
        .lint(getPluginOptions(correct, rules))
        .then(output => {
          const { errored } = output;
          const { warnings } = output.results[0];

          expect(errored).toBeFalsy();
          expect(warnings).toHaveLength(0);

          return done();
        })
        .catch(error => done(error));
    });

    it('with borderInBoxModel=false and emptyLineBeetweenGroup=true', done => {
      const rules = {
        [ruleName]: [
          true,
          {
            emptyLineBeetweenGroup: true,
          },
        ],
      };
      const correct = `
      a {
        position: relative;

        display: block;
        
        color: red;
        
        background: white;
        border: 1px solid blue;
      }
    `;

      return stylelint
        .lint(getPluginOptions(correct, rules))
        .then(output => {
          const { errored } = output;
          const { warnings } = output.results[0];

          expect(errored).toBeFalsy();
          expect(warnings).toHaveLength(0);

          return done();
        })
        .catch(error => done(error));
    });

    it('with borderInBoxModel=true and emptyLineBeetweenGroup=true', done => {
      const rules = {
        [ruleName]: [
          true,
          {
            emptyLineBeetweenGroup: true,
            borderInBoxModel: true,
          },
        ],
      };
      const correct = `
        a {
          position: relative;

          display: block;
          border: 1px solid blue;
          
          color: red;
          
          background: white;
        }
      `;

      return stylelint
        .lint(getPluginOptions(correct, rules))
        .then(output => {
          const { errored } = output;
          const { warnings } = output.results[0];

          expect(errored).toBeFalsy();
          expect(warnings).toHaveLength(0);

          return done();
        })
        .catch(error => done(error));
    });
  });

  describe('with disabled', () => {
    it('correct', done => {
      const rules = {
        [ruleName]: false,
      };
      const wrong = `
      a {
        position: relative;
        display: block;
        color: red;
        background: white;
        border: 1px solid blue;
      }
    `;

      return stylelint
        .lint(getPluginOptions(wrong, rules))
        .then(output => {
          const { errored } = output;
          const { warnings } = output.results[0];

          expect(errored).toBeFalsy();
          expect(warnings).toHaveLength(0);

          return done();
        })
        .catch(error => done(error));
    });
  });
});
