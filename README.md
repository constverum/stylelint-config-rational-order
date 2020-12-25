# stylelint-config-rational-order

[![NPM version][version-img]][npm-url]
[![NPM downloads][downloads-img]][npm-url]
[![Build status][ci-img]][ci-url]
[![License][l-img]][l-url]

Stylelint config that sorts related property declarations by grouping together following the order:

1.  Positioning
2.  Box Model
3.  Typography
4.  Visual
5.  Animation
6.  Misc

```css
.declaration-order {
  /* Positioning */
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;

  /* Box Model */
  display: block;
  float: right;
  width: 100px;
  height: 100px;
  margin: 10px;
  padding: 10px;

  /* Typography */
  color: #888;
  font: normal 16px Helvetica, sans-serif;
  line-height: 1.3;
  text-align: center;

  /* Visual */
  background-color: #eee;
  border: 1px solid #888;
  border-radius: 4px;
  opacity: 1;

  /* Animation */
  transition: all 1s;

  /* Misc */
  user-select: none;
}
```

## Usage

1.  Add `stylelint`, `stylelint-order` and this package to your project:

```bash
npm install --save-dev stylelint stylelint-order stylelint-config-rational-order
# or, if you prefer yarn over npm:
yarn add --dev stylelint stylelint-order stylelint-config-rational-order
```

2.  Add this package to the end of your extends array inside Stylelint
    configuration (.stylelintrc for example):

```javascript
{
  "extends": [
    // "stylelint-config-standard",
    "stylelint-config-rational-order"
  ]
}
```

This shareable config contains the following:
```javascript
{
  "plugins": [
    "stylelint-order",
    "stylelint-config-rational-order/plugin"
  ],
  "rules": {
    "order/properties-order": [],
    "plugin/rational-order": [true, {
      "border-in-box-model": false,
      "empty-line-between-groups": "never"
    }]
  }
}
```

Since it adds `stylelint-order` and `stylelint-config-rational-order` to plugins and also adds required rules, you don't have to do this yourself when extending this config.


## Optional options / rules

#### border-in-box-model

Defines to which group the **border** property belongs to.

If `true` **border** property belongs to the **box model section**.
The default value is `false` (**border** property belongs to the **visual section**).


#### disable-fix

Prevent Stylelint autofixes from changing property order.


#### empty-line-before-unspecified

If a rule contains properties which are not explicitly managed by `stylelint-order` and [`unspecified`](#unspecified) is enabled, this option determines whether the unspecified properties should be padded with a blank line.

* **`always`.** Require an empty line for rules with any number of properties.
* **`never`.** Forbid an empty line for rules with any number of properties.
* **`threshold`.** Require an empty line for rules with more than [`empty-line-property-threshold`](#empty-line-property-threshold) declarations.


#### empty-line-between-groups

Sets the `emptyLineBefore` option of `stylelint-order`'s [`properties-order` rule](https://github.com/hudochenkov/stylelint-order/blob/master/rules/properties-order/README.md).

* **`always`.** Require an empty line for rules with any number of properties.
* **`never`.** Forbid an empty line for rules with any number of properties.
* **`threshold`.** Require an empty line for rules with more than [`empty-line-property-threshold`](#empty-line-property-threshold) declarations.

**Incorrect** code when this rule is enabled:

```css
/* { "empty-line-between-groups": "never" } */
.klass {
  display: block;
  width: 100vw;

  font: normal 62.5%/1.2 -apple-system, sans-serif ;
}
```


#### empty-line-property-threshold

If [`empty-line-before-unspecified`](#empty-line-before-unspecified) or [`empty-line-between-groups`](#empty-line-between-groups) is set to `threshold`, this sets the minimum number of declarations a rule must contain before the blank lines will be enforced.

**Incorrect** code for this rule:

```css
/* { "empty-line-between-groups": "threshold", "empty-line-property-threshold": 3 } */

.klass {
  position: absolute;
  top: 0;
  left: 0;
  color: rebeccapurple;
}
```

**Correct** code for this rule:

```css
/* { "empty-line-between-groups": "threshold", "empty-line-property-threshold": 3 } */

.klass-1 {
  position: absolute;
  top: 0;
  left: 0;

  color: rebeccapurple;
}

.klass-2 {
  position: absolute;
  color: rebeccapurple;
}
```


#### empty-lines-within-groups

Sets whether it's permissible for empty lines to appear within groups of properties.

If set to `true` (the default), Stylelint will not return errors when groups contain arbitrary empty lines. If set to `false`, visual grouping is enforced in addition to logical grouping.


#### property-order

By default, properties within a group must appear in the order they're specified in the Stylelint configuration. If `property-order` is set to `flexible`, properties within a group can be declared in any order.


#### unspecified

Set how `stylelint-order` should handle properties which are not explicitly managed by the plugin.

* **`bottom`.** Unrecognized properties appear at the end of the rule, but may be specified in any order.
* **`bottomAlphabetical`.** Unrecognized properties appear at the end of the rule, sorted alphabetically.
* **`ignore`.** Unrecognized properties may appear anywhere.
* **`top`.** Unrecognized properties appear before defined properties.

## FAQ

<details>
  <summary>Why should I use the rational order and group and sort CSS properties by type instead of alphabetical order?</summary>

  The pros and cons of both ways in detail:

* [Happy Potter and the Order of CSS](https://dev.to/thekashey/happy-potter-and-the-order-of-css-5ec)
* [“Outside In” — Ordering CSS Properties by Importance](https://webdesign.tutsplus.com/articles/outside-in-ordering-css-properties-by-importance--cms-21685)
</details>

## Credits

* [Code Guide by @mdo](http://codeguide.co/)
* [Code Guide by HTML Academy](https://github.com/htmlacademy/codeguide)


[npm-url]: https://www.npmjs.com/package/stylelint-config-rational-order
[downloads-img]: https://img.shields.io/npm/dt/stylelint-config-rational-order.svg?style=flat-square
[version-img]: https://img.shields.io/npm/v/stylelint-config-rational-order.svg?style=flat-square
[ci-url]: https://travis-ci.org/constverum/stylelint-config-rational-order
[ci-img]: https://img.shields.io/travis/constverum/stylelint-config-rational-order.svg?style=flat-square
[l-url]: https://www.npmjs.com/package/stylelint-config-rational-order
[l-img]: https://img.shields.io/npm/l/stylelint-config-rational-order.svg?style=flat-square
