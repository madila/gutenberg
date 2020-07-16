"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useResizeLabel = useResizeLabel;
exports.POSITIONS = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _lodash = require("lodash");

var _reactResizeAware = _interopRequireDefault(require("react-resize-aware"));

var _element = require("@wordpress/element");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
var _window = window,
    clearTimeout = _window.clearTimeout,
    setTimeout = _window.setTimeout;
var POSITIONS = {
  bottom: 'bottom',
  corner: 'corner'
};
/**
 * @typedef {Object} UseResizeLabelProps
 *
 * @property {undefined|string} label The label value.
 * @property {Function} resizeListener Element to be rendered for resize listening events.
 */

/**
 * Custom hook that manages resize listener events. It also provides a label
 * based on current resize width x height values.
 *
 * @param {Object} props
 * @param {string} props.axis Only shows the label corresponding to the axis.
 * @param {number} props.fadeTimeout Duration (ms) before deactivating the resize label.
 * @param {boolean} props.onResize Callback when a resize occurs. Provides { width, height } callback.
 * @param {string} props.position Adjusts label value.
 * @param {boolean} props.showPx Whether to add `PX` to the label.
 *
 * @return {UseResizeLabelProps} Properties for hook.
 */

exports.POSITIONS = POSITIONS;

function useResizeLabel(_ref) {
  var axis = _ref.axis,
      _ref$fadeTimeout = _ref.fadeTimeout,
      fadeTimeout = _ref$fadeTimeout === void 0 ? 180 : _ref$fadeTimeout,
      _ref$onResize = _ref.onResize,
      onResize = _ref$onResize === void 0 ? _lodash.noop : _ref$onResize,
      _ref$position = _ref.position,
      position = _ref$position === void 0 ? POSITIONS.bottom : _ref$position,
      _ref$showPx = _ref.showPx,
      showPx = _ref$showPx === void 0 ? false : _ref$showPx;

  /*
   * The width/height values derive from this special useResizeAware hook.
   * This custom hook uses injects an iFrame into the element, allowing it
   * to tap into the onResize (window) callback events.
   */
  var _useResizeAware = (0, _reactResizeAware.default)(),
      _useResizeAware2 = (0, _slicedToArray2.default)(_useResizeAware, 2),
      resizeListener = _useResizeAware2[0],
      sizes = _useResizeAware2[1];
  /*
   * Indicates if the x/y axis is preferred.
   * If set, we will avoid resetting the moveX and moveY values.
   * This will allow for the preferred axis values to persist in the label.
   */


  var isAxisControlled = !!axis;
  /*
   * The moveX and moveY values are used to track whether the label should
   * display width, height, or width x height.
   */

  var _useState = (0, _element.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      moveX = _useState2[0],
      setMoveX = _useState2[1];

  var _useState3 = (0, _element.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      moveY = _useState4[0],
      setMoveY = _useState4[1];
  /*
   * Cached dimension values to check for width/height updates from the
   * sizes property from useResizeAware()
   */


  var heightRef = (0, _element.useRef)(height);
  var widthRef = (0, _element.useRef)(width);
  /*
   * This timeout is used with setMoveX and setMoveY to determine of
   * both width and height values have changed at (roughly) the same time.
   */

  var moveTimeoutRef = (0, _element.useRef)();
  var width = sizes.width,
      height = sizes.height;

  var unsetMoveXY = function unsetMoveXY() {
    /*
     * If axis is controlled, we will avoid resetting the moveX and moveY values.
     * This will allow for the preferred axis values to persist in the label.
     */
    if (isAxisControlled) return;
    setMoveX(false);
    setMoveY(false);
  };

  var debounceUnsetMoveXY = function debounceUnsetMoveXY() {
    if (moveTimeoutRef.current) {
      clearTimeout(moveTimeoutRef.current);
    }

    moveTimeoutRef.current = setTimeout(unsetMoveXY, fadeTimeout);
  };

  (0, _element.useEffect)(function () {
    /*
     * On the initial render of useResizeAware, the height and width values are
     * null. They are calculated then set using via an internal useEffect hook.
     */
    var isRendered = width !== null || height !== null;
    if (!isRendered) return;
    var didWidthChange = width !== widthRef.current;
    var didHeightChange = height !== heightRef.current;
    if (!didWidthChange && !didHeightChange) return;
    /*
     * After the initial render, the useResizeAware will set the first
     * width and height values. We'll sync those values with our
     * width and height refs. However, we shouldn't render our Tooltip
     * label on this first cycle.
     */

    if (width && !widthRef.current && height && !heightRef.current) {
      widthRef.current = width;
      heightRef.current = height;
      return;
    }
    /*
     * After the first cycle, we can track width and height changes.
     */


    if (didWidthChange) {
      setMoveX(true);
      widthRef.current = width;
    }

    if (didHeightChange) {
      setMoveY(true);
      heightRef.current = height;
    }

    onResize({
      width: width,
      height: height
    });
    debounceUnsetMoveXY();
  }, [width, height]);
  var label = getSizeLabel({
    axis: axis,
    height: height,
    moveX: moveX,
    moveY: moveY,
    position: position,
    showPx: showPx,
    width: width
  });
  return {
    label: label,
    resizeListener: resizeListener
  };
}
/**
 * Gets the resize label based on width and height values (as well as recent changes).
 *
 * @param {Object} props
 * @param {string} props.axis Only shows the label corresponding to the axis.
 * @param {number} props.height Height value.
 * @param {boolean} props.moveX Recent width (x axis) changes.
 * @param {boolean} props.moveY Recent width (y axis) changes.
 * @param {string} props.position Adjusts label value.
 * @param {boolean} props.showPx Whether to add `PX` to the label.
 * @param {number} props.width Width value.
 *
 * @return {undefined | string} The rendered label.
 */


function getSizeLabel(_ref2) {
  var axis = _ref2.axis,
      height = _ref2.height,
      _ref2$moveX = _ref2.moveX,
      moveX = _ref2$moveX === void 0 ? false : _ref2$moveX,
      _ref2$moveY = _ref2.moveY,
      moveY = _ref2$moveY === void 0 ? false : _ref2$moveY,
      _ref2$position = _ref2.position,
      position = _ref2$position === void 0 ? POSITIONS.bottom : _ref2$position,
      _ref2$showPx = _ref2.showPx,
      showPx = _ref2$showPx === void 0 ? false : _ref2$showPx,
      width = _ref2.width;
  if (!moveX && !moveY) return null;
  /*
   * Corner position...
   * We want the label to appear like width x height.
   */

  if (position === POSITIONS.corner) {
    return "".concat(width, " x ").concat(height);
  }
  /*
   * Other POSITIONS...
   * The label will combine both width x height values if both
   * values have recently been changed.
   *
   * Otherwise, only width or height will be displayed.
   * The `PX` unit will be added, if specified by the `showPx` prop.
   */


  var labelUnit = showPx ? ' px' : '';

  if (axis) {
    if (axis === 'x' && moveX) {
      return "".concat(width).concat(labelUnit);
    }

    if (axis === 'y' && moveY) {
      return "".concat(height).concat(labelUnit);
    }
  }

  if (moveX && moveY) {
    return "".concat(width, " x ").concat(height);
  }

  if (moveX) {
    return "".concat(width).concat(labelUnit);
  }

  if (moveY) {
    return "".concat(height).concat(labelUnit);
  }

  return null;
}
//# sourceMappingURL=utils.js.map