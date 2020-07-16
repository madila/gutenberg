"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _element = require("@wordpress/element");

var _reactNativeBridge = require("@wordpress/react-native-bridge");

/**
 * WordPress dependencies
 */

/**
 * Returns the color scheme value when it changes. Possible values: [ 'light', 'dark' ]
 *
 * @return {string} return current color scheme.
 */
function usePreferredColorScheme() {
  var _useState = (0, _element.useState)(_reactNativeBridge.isInitialColorSchemeDark ? 'dark' : 'light'),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      currentColorScheme = _useState2[0],
      setCurrentColorScheme = _useState2[1];

  (0, _element.useEffect)(function () {
    (0, _reactNativeBridge.subscribePreferredColorScheme)(function (_ref) {
      var isPreferredColorSchemeDark = _ref.isPreferredColorSchemeDark;
      var colorScheme = isPreferredColorSchemeDark ? 'dark' : 'light';

      if (colorScheme !== currentColorScheme) {
        setCurrentColorScheme(colorScheme);
      }
    });
  });
  return currentColorScheme;
}

var _default = usePreferredColorScheme;
exports.default = _default;
//# sourceMappingURL=index.android.js.map