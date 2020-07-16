"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classnames = _interopRequireDefault(require("classnames"));

var _icons = require("@wordpress/icons");

var _complementaryAreaToggle = _interopRequireDefault(require("../complementary-area-toggle"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var ComplementaryAreaHeader = function ComplementaryAreaHeader(_ref) {
  var smallScreenTitle = _ref.smallScreenTitle,
      children = _ref.children,
      className = _ref.className,
      toggleButtonProps = _ref.toggleButtonProps;
  var toggleButton = (0, _element.createElement)(_complementaryAreaToggle.default, (0, _extends2.default)({
    icon: _icons.closeSmall
  }, toggleButtonProps));
  return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)("div", {
    className: "components-panel__header interface-complementary-area-header__small"
  }, smallScreenTitle && (0, _element.createElement)("span", {
    className: "interface-complementary-area-header__small-title"
  }, smallScreenTitle), toggleButton), (0, _element.createElement)("div", {
    className: (0, _classnames.default)('components-panel__header', 'interface-complementary-area-header', className),
    tabIndex: -1
  }, children, toggleButton));
};

var _default = ComplementaryAreaHeader;
exports.default = _default;
//# sourceMappingURL=index.js.map