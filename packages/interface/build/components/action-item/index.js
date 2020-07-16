"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _lodash = require("lodash");

var _components = require("@wordpress/components");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function ActionItemSlot(_ref) {
  var name = _ref.name,
      _ref$as = _ref.as,
      as = _ref$as === void 0 ? [_components.ButtonGroup, _components.Button] : _ref$as,
      _ref$fillProps = _ref.fillProps,
      fillProps = _ref$fillProps === void 0 ? {} : _ref$fillProps,
      bubblesVirtually = _ref.bubblesVirtually,
      props = (0, _objectWithoutProperties2.default)(_ref, ["name", "as", "fillProps", "bubblesVirtually"]);

  var _as = (0, _slicedToArray2.default)(as, 2),
      Container = _as[0],
      Item = _as[1];

  return (0, _element.createElement)(_components.Slot, {
    name: name,
    bubblesVirtually: bubblesVirtually,
    fillProps: _objectSpread({
      as: Item
    }, fillProps)
  }, function (fills) {
    return !(0, _lodash.isEmpty)(fills) && (0, _element.createElement)(Container, props, fills);
  });
}

function ActionItem(_ref2) {
  var name = _ref2.name,
      as = _ref2.as,
      onClick = _ref2.onClick,
      props = (0, _objectWithoutProperties2.default)(_ref2, ["name", "as", "onClick"]);
  return (0, _element.createElement)(_components.Fill, {
    name: name
  }, function (fillProps) {
    var fpOnClick = fillProps.onClick,
        fpAs = fillProps.as;
    var Item = as || fpAs || _components.Button;
    return (0, _element.createElement)(Item, (0, _extends2.default)({
      onClick: onClick || fpOnClick ? function () {
        (onClick || _lodash.noop).apply(void 0, arguments);

        (fpOnClick || _lodash.noop).apply(void 0, arguments);
      } : undefined
    }, props));
  });
}

ActionItem.Slot = ActionItemSlot;
var _default = ActionItem;
exports.default = _default;
//# sourceMappingURL=index.js.map