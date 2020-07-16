"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SiteTitleEdit;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _coreData = require("@wordpress/core-data");

var _i18n = require("@wordpress/i18n");

var _blockEditor = require("@wordpress/block-editor");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
function SiteTitleEdit(_ref) {
  var attributes = _ref.attributes,
      setAttributes = _ref.setAttributes;
  var level = attributes.level,
      align = attributes.align;

  var _useEntityProp = (0, _coreData.useEntityProp)('root', 'site', 'title'),
      _useEntityProp2 = (0, _slicedToArray2.default)(_useEntityProp, 2),
      title = _useEntityProp2[0],
      setTitle = _useEntityProp2[1];

  var tagName = 0 === level ? 'p' : 'h' + level;
  return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_blockEditor.BlockControls, null, (0, _element.createElement)(_blockEditor.AlignmentToolbar, {
    value: align,
    onChange: function onChange(nextAlign) {
      setAttributes({
        align: nextAlign
      });
    }
  })), (0, _element.createElement)(_blockEditor.RichText, {
    tagName: _blockEditor.__experimentalBlock[tagName],
    placeholder: (0, _i18n.__)('Site Title'),
    value: title,
    onChange: setTitle,
    className: (0, _classnames2.default)((0, _defineProperty2.default)({}, "has-text-align-".concat(align), align)),
    allowedFormats: [],
    disableLineBreaks: true
  }));
}
//# sourceMappingURL=edit.js.map