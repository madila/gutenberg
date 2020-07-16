"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CodeEdit;

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

var _blockEditor = require("@wordpress/block-editor");

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function CodeEdit(_ref) {
  var attributes = _ref.attributes,
      setAttributes = _ref.setAttributes;
  return (0, _element.createElement)(_blockEditor.__experimentalBlock.pre, null, (0, _element.createElement)(_blockEditor.PlainText, {
    __experimentalVersion: 2,
    tagName: "code",
    value: attributes.content,
    onChange: function onChange(content) {
      return setAttributes({
        content: content
      });
    },
    placeholder: (0, _i18n.__)('Write code…'),
    "aria-label": (0, _i18n.__)('Code')
  }));
}
//# sourceMappingURL=edit.js.map