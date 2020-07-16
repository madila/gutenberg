"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ComplementaryAreaMoreMenuItem;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _icons = require("@wordpress/icons");

var _complementaryAreaToggle = _interopRequireDefault(require("../complementary-area-toggle"));

var _actionItem = _interopRequireDefault(require("../action-item"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function ComplementaryAreaMoreMenuItem(_ref) {
  var scope = _ref.scope,
      target = _ref.target,
      props = (0, _objectWithoutProperties2.default)(_ref, ["scope", "target"]);
  return (0, _element.createElement)(_complementaryAreaToggle.default, (0, _extends2.default)({
    as: function as(toggleProps) {
      return (0, _element.createElement)(_actionItem.default, (0, _extends2.default)({
        name: "".concat(scope, "/plugin-more-menu")
      }, toggleProps));
    },
    role: "menuitemcheckbox",
    selectedIcon: _icons.check,
    name: target,
    scope: scope
  }, props));
}
//# sourceMappingURL=index.js.map