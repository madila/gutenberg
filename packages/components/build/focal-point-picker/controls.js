"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FocalPointPickerControls;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

var _focalPointPickerStyle = require("./styles/focal-point-picker-style");

var _utils = require("./utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var TEXTCONTROL_MIN = 0;
var TEXTCONTROL_MAX = 100;

function FocalPointPickerControls(_ref) {
  var _ref$onChange = _ref.onChange,
      onChange = _ref$onChange === void 0 ? _lodash.noop : _ref$onChange,
      _ref$percentages = _ref.percentages,
      percentages = _ref$percentages === void 0 ? {
    x: 0.5,
    y: 0.5
  } : _ref$percentages;
  var valueX = (0, _utils.fractionToPercentage)(percentages.x);
  var valueY = (0, _utils.fractionToPercentage)(percentages.y);

  var handleOnXChange = function handleOnXChange(next) {
    onChange(_objectSpread({}, percentages, {
      x: parseInt(next) / 100
    }));
  };

  var handleOnYChange = function handleOnYChange(next) {
    onChange(_objectSpread({}, percentages, {
      y: parseInt(next) / 100
    }));
  };

  return (0, _element.createElement)(_focalPointPickerStyle.ControlWrapper, {
    className: "focal-point-picker__controls"
  }, (0, _element.createElement)(UnitControl, {
    label: (0, _i18n.__)('Left'),
    value: valueX,
    onChange: handleOnXChange,
    dragDirection: "e"
  }), (0, _element.createElement)(UnitControl, {
    label: (0, _i18n.__)('Top'),
    value: valueY,
    onChange: handleOnYChange,
    dragDirection: "s"
  }));
}

function UnitControl(props) {
  return (0, _element.createElement)(_focalPointPickerStyle.UnitControl, (0, _extends2.default)({
    className: "focal-point-picker__controls-position-unit-control",
    labelPosition: "side",
    max: TEXTCONTROL_MAX,
    min: TEXTCONTROL_MIN,
    unit: "%",
    units: [{
      value: '%',
      label: '%'
    }]
  }, props));
}
//# sourceMappingURL=controls.js.map