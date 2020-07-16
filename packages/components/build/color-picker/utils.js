"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.colorToState = colorToState;
exports.isValidHex = isValidHex;
exports.simpleCheckForValidColor = simpleCheckForValidColor;
exports.calculateAlphaChange = calculateAlphaChange;
exports.calculateHueChange = calculateHueChange;
exports.calculateSaturationChange = calculateSaturationChange;

var _lodash = require("lodash");

var _tinycolor = _interopRequireDefault(require("tinycolor2"));

/**
 * Parts of this source were derived and modified from react-color,
 * released under the MIT license.
 *
 * https://github.com/casesandberg/react-color/
 *
 * Copyright (c) 2015 Case Sandberg
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * External dependencies
 */

/**
 * Given a hex color, get all other color properties (rgb, alpha, etc).
 *
 * @param {Object|string} data A hex color string or an object with a hex property
 * @param {string} oldHue A reference to the hue of the previous color, otherwise dragging the saturation to zero will reset the current hue to zero as well. See https://github.com/casesandberg/react-color/issues/29#issuecomment-132686909.
 * @return {Object} An object of different color representations.
 */
function colorToState() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var oldHue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var color = data.hex ? (0, _tinycolor.default)(data.hex) : (0, _tinycolor.default)(data);
  var hsl = color.toHsl();
  hsl.h = Math.round(hsl.h);
  hsl.s = Math.round(hsl.s * 100);
  hsl.l = Math.round(hsl.l * 100);
  var hsv = color.toHsv();
  hsv.h = Math.round(hsv.h);
  hsv.s = Math.round(hsv.s * 100);
  hsv.v = Math.round(hsv.v * 100);
  var rgb = color.toRgb();
  var hex = color.toHex();

  if (hsl.s === 0) {
    hsl.h = oldHue || 0;
    hsv.h = oldHue || 0;
  }

  var transparent = hex === '000000' && rgb.a === 0;
  return {
    color: color,
    hex: transparent ? 'transparent' : "#".concat(hex),
    hsl: hsl,
    hsv: hsv,
    oldHue: data.h || oldHue || hsl.h,
    rgb: rgb,
    source: data.source
  };
}
/**
 * Get the top/left offsets of a point in a container, also returns the container width/height.
 *
 * @param {Event} e Mouse or touch event with a location coordinate.
 * @param {HTMLElement} container The container div, returned point is relative to this container.
 * @return {Object} An object of the offset positions & container size.
 */


function getPointOffset(e, container) {
  e.preventDefault();

  var _container$getBoundin = container.getBoundingClientRect(),
      containerLeft = _container$getBoundin.left,
      containerTop = _container$getBoundin.top,
      width = _container$getBoundin.width,
      height = _container$getBoundin.height;

  var x = typeof e.pageX === 'number' ? e.pageX : e.touches[0].pageX;
  var y = typeof e.pageY === 'number' ? e.pageY : e.touches[0].pageY;
  var left = x - (containerLeft + window.pageXOffset);
  var top = y - (containerTop + window.pageYOffset);

  if (left < 0) {
    left = 0;
  } else if (left > width) {
    left = width;
  } else if (top < 0) {
    top = 0;
  } else if (top > height) {
    top = height;
  }

  return {
    top: top,
    left: left,
    width: width,
    height: height
  };
}
/**
 * Check if a string is a valid hex color code.
 *
 * @param {string} hex A possible hex color.
 * @return {boolean} True if the color is a valid hex color.
 */


function isValidHex(hex) {
  // disable hex4 and hex8
  var lh = String(hex).charAt(0) === '#' ? 1 : 0;
  return hex.length !== 4 + lh && hex.length < 7 + lh && (0, _tinycolor.default)(hex).isValid();
}
/**
 * Check an object for any valid color properties.
 *
 * @param {Object} data A possible object representing a color.
 * @return {Object|boolean} If a valid representation of color, returns the data object. Otherwise returns false.
 */


function simpleCheckForValidColor(data) {
  var keysToCheck = ['r', 'g', 'b', 'a', 'h', 's', 'l', 'v'];
  var checked = 0;
  var passed = 0;
  (0, _lodash.each)(keysToCheck, function (letter) {
    if (data[letter]) {
      checked += 1;

      if (!isNaN(data[letter])) {
        passed += 1;
      }
    }
  });
  return checked === passed ? data : false;
}
/**
 * Calculate the current alpha based on a mouse or touch event
 *
 * @param {Event} e A mouse or touch event on the alpha bar.
 * @param {Object} props The current component props
 * @param {HTMLElement} container The container div for the alpha bar graph.
 * @return {Object|null} If the alpha value has changed, returns a new color object.
 */


function calculateAlphaChange(e, props, container) {
  var _getPointOffset = getPointOffset(e, container),
      left = _getPointOffset.left,
      width = _getPointOffset.width;

  var a = left < 0 ? 0 : Math.round(left * 100 / width) / 100;

  if (props.hsl.a !== a) {
    return {
      h: props.hsl.h,
      s: props.hsl.s,
      l: props.hsl.l,
      a: a,
      source: 'rgb'
    };
  }

  return null;
}
/**
 * Calculate the current hue based on a mouse or touch event
 *
 * @param {Event} e A mouse or touch event on the hue bar.
 * @param {Object} props The current component props
 * @param {HTMLElement} container The container div for the hue bar graph.
 * @return {Object|null} If the hue value has changed, returns a new color object.
 */


function calculateHueChange(e, props, container) {
  var _getPointOffset2 = getPointOffset(e, container),
      left = _getPointOffset2.left,
      width = _getPointOffset2.width;

  var percent = left * 100 / width;
  var h = left >= width ? 359 : 360 * percent / 100;

  if (props.hsl.h !== h) {
    return {
      h: h,
      s: props.hsl.s,
      l: props.hsl.l,
      a: props.hsl.a,
      source: 'rgb'
    };
  }

  return null;
}
/**
 * Calculate the current saturation & brightness based on a mouse or touch event
 *
 * @param {Event} e A mouse or touch event on the saturation graph.
 * @param {Object} props The current component props
 * @param {HTMLElement} container The container div for the 2D saturation graph.
 * @return {Object} Returns a new color object.
 */


function calculateSaturationChange(e, props, container) {
  var _getPointOffset3 = getPointOffset(e, container),
      top = _getPointOffset3.top,
      left = _getPointOffset3.left,
      width = _getPointOffset3.width,
      height = _getPointOffset3.height;

  var saturation = left < 0 ? 0 : left * 100 / width;
  var bright = top >= height ? 0 : -(top * 100 / height) + 100; // `v` values less than 1 are considered in the [0,1] range, causing unexpected behavior at the bottom
  // of the chart. To fix this, we assume any value less than 1 should be 0 brightness.

  if (bright < 1) {
    bright = 0;
  }

  return {
    h: props.hsl.h,
    s: saturation,
    v: bright,
    a: props.hsl.a,
    source: 'rgb'
  };
}
//# sourceMappingURL=utils.js.map