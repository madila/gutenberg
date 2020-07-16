"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SpacingPanelControl;

var _element = require("@wordpress/element");

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _inspectorControls = _interopRequireDefault(require("../inspector-controls"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function SpacingPanelControl(_ref) {
  var children = _ref.children,
      props = (0, _objectWithoutProperties2.default)(_ref, ["children"]);
  var isSpacingEnabled = (0, _data.useSelect)(function (select) {
    var _select = select('core/block-editor'),
        getSettings = _select.getSettings;

    return (0, _lodash.get)(getSettings(), '__experimentalEnableCustomSpacing');
  }, []);
  if (!isSpacingEnabled) return null;
  return (0, _element.createElement)(_inspectorControls.default, props, (0, _element.createElement)(_components.PanelBody, {
    title: (0, _i18n.__)('Spacing')
  }, children));
}
//# sourceMappingURL=index.js.map