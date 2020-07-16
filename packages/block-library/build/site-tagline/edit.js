"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SiteTaglineEdit;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _coreData = require("@wordpress/core-data");

var _blockEditor = require("@wordpress/block-editor");

var _i18n = require("@wordpress/i18n");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
function SiteTaglineEdit(_ref) {
  var attributes = _ref.attributes,
      setAttributes = _ref.setAttributes;
  var align = attributes.align;

  var _useEntityProp = (0, _coreData.useEntityProp)('root', 'site', 'description'),
      _useEntityProp2 = (0, _slicedToArray2.default)(_useEntityProp, 2),
      siteTagline = _useEntityProp2[0],
      setSiteTagline = _useEntityProp2[1];

  return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_blockEditor.BlockControls, null, (0, _element.createElement)(_blockEditor.AlignmentToolbar, {
    onChange: function onChange(newAlign) {
      return setAttributes({
        align: newAlign
      });
    },
    value: align
  })), (0, _element.createElement)(_blockEditor.RichText, {
    allowedFormats: [],
    className: (0, _classnames2.default)((0, _defineProperty2.default)({}, "has-text-align-".concat(align), align)),
    onChange: setSiteTagline,
    placeholder: (0, _i18n.__)('Site Tagline'),
    tagName: _blockEditor.__experimentalBlock.p,
    value: siteTagline
  }));
}
//# sourceMappingURL=edit.js.map