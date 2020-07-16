"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
function ThemePreview(_ref) {
  var _ref$theme = _ref.theme,
      author = _ref$theme.author,
      description = _ref$theme.description,
      name = _ref$theme.name,
      screenshot = _ref$theme.screenshot,
      version = _ref$theme.version;
  return (0, _element.createElement)("div", {
    className: "edit-site-template-switcher__theme-preview"
  }, (0, _element.createElement)("span", {
    className: "edit-site-template-switcher__theme-preview-name",
    dangerouslySetInnerHTML: {
      /* name.rendered is sanitized on the server side. */
      __html: name.rendered
    }
  }), ' ', (0, _element.createElement)("span", {
    className: "edit-site-template-switcher__theme-preview-version"
  }, 'v' + version), (0, _element.createElement)("div", {
    className: "edit-site-template-switcher__theme-preview-byline"
  }, // translators: %s: theme author name.
  (0, _i18n.sprintf)((0, _i18n.__)('By %s'), [author.raw])), (0, _element.createElement)("img", {
    className: "edit-site-template-switcher__theme-preview-screenshot",
    src: screenshot,
    alt: 'Theme Preview'
  }), (0, _element.createElement)("div", {
    className: "edit-site-template-switcher__theme-preview-description"
  }, (0, _lodash.truncate)(
  /* Not using description.rendered here, as we might contain after an opening HTML tag. */
  description.raw, {
    length: 120,
    separator: /\. +/
  })));
}

var _default = ThemePreview;
exports.default = _default;
//# sourceMappingURL=theme-preview.js.map