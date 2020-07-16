"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _element = require("@wordpress/element");

/**
 * WordPress dependencies
 */

/**
 * A custom hook that calculates a step value (used by elements like input
 * [type="number"]). This value can be modified based on whether the Shift
 * key is being held down.
 *
 * For example, a shiftStep of 10, and a step of 1...
 * Starting from 10, the next incremented value will be 11.
 *
 * Holding down shift...
 * Starting from 10, the next incremented value will be 20.
 *
 * @param {Object} props Properties for the hook.
 * @param {boolean} [props.isShiftStepEnabled=true] Determines if jumping values with shift is enabled
 * @param {number} [props.shiftStep=10] Multiplier to jump by, when holding shift key.
 * @param {number} [props.step=1] Multiplier to jump by, when not-holding shift key.
 *
 * @return {number} The jump step value.
 */
function useJumpStep(_ref) {
  var _ref$isShiftStepEnabl = _ref.isShiftStepEnabled,
      isShiftStepEnabled = _ref$isShiftStepEnabl === void 0 ? true : _ref$isShiftStepEnabl,
      _ref$shiftStep = _ref.shiftStep,
      shiftStep = _ref$shiftStep === void 0 ? 10 : _ref$shiftStep,
      _ref$step = _ref.step,
      step = _ref$step === void 0 ? 1 : _ref$step;

  var _useState = (0, _element.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      isShiftKey = _useState2[0],
      setIsShiftKey = _useState2[1];

  (0, _element.useEffect)(function () {
    var handleShiftKeyToggle = function handleShiftKeyToggle(event) {
      setIsShiftKey(event.shiftKey);
    };

    window.addEventListener('keydown', handleShiftKeyToggle);
    window.addEventListener('keyup', handleShiftKeyToggle);
    return function () {
      window.removeEventListener('keydown', handleShiftKeyToggle);
      window.removeEventListener('keyup', handleShiftKeyToggle);
    };
  }, []);
  var isEnabled = isShiftStepEnabled && isShiftKey;
  return isEnabled ? shiftStep * step : step;
}

var _default = useJumpStep;
exports.default = _default;
//# sourceMappingURL=use-jump-step.js.map