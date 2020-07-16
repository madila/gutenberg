"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _lodash = require("lodash");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _complementaryAreaContext = _interopRequireDefault(require("../complementary-area-context"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function ComplementaryAreaToggle(_ref) {
  var _ref$as = _ref.as,
      as = _ref$as === void 0 ? _components.Button : _ref$as,
      scope = _ref.scope,
      identifier = _ref.identifier,
      icon = _ref.icon,
      selectedIcon = _ref.selectedIcon,
      props = (0, _objectWithoutProperties2.default)(_ref, ["as", "scope", "identifier", "icon", "selectedIcon"]);
  var ComponentToUse = as;
  var isSelected = (0, _data.useSelect)(function (select) {
    return select('core/interface').getActiveComplementaryArea(scope) === identifier;
  }, [identifier]);

  var _useDispatch = (0, _data.useDispatch)('core/interface'),
      enableComplementaryArea = _useDispatch.enableComplementaryArea,
      disableComplementaryArea = _useDispatch.disableComplementaryArea;

  return (0, _element.createElement)(ComponentToUse, (0, _extends2.default)({
    icon: selectedIcon && isSelected ? selectedIcon : icon,
    onClick: function onClick() {
      if (isSelected) {
        disableComplementaryArea(scope);
      } else {
        enableComplementaryArea(scope, identifier);
      }
    }
  }, (0, _lodash.omit)(props, ['name'])));
}

var _default = (0, _complementaryAreaContext.default)(ComplementaryAreaToggle);

exports.default = _default;
//# sourceMappingURL=index.js.map