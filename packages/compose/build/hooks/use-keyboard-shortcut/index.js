"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mousetrap = _interopRequireDefault(require("mousetrap"));

require("mousetrap/plugins/global-bind/mousetrap-global-bind");

var _lodash = require("lodash");

var _element = require("@wordpress/element");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * A block selection object.
 *
 * @typedef {Object} WPKeyboardShortcutConfig
 *
 * @property {boolean} [bindGlobal]  Handle keyboard events anywhere including inside textarea/input fields.
 * @property {string}  [eventName]   Event name used to trigger the handler, defaults to keydown.
 * @property {boolean} [isDisabled]  Disables the keyboard handler if the value is true.
 * @property {Object}  [target]      React reference to the DOM element used to catch the keyboard event.
 */

/**
 * Return true if platform is MacOS.
 *
 * @param {Object} _window   window object by default; used for DI testing.
 *
 * @return {boolean} True if MacOS; false otherwise.
 */
function isAppleOS() {
  var _window = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;

  var platform = _window.navigator.platform;
  return platform.indexOf('Mac') !== -1 || (0, _lodash.includes)(['iPad', 'iPhone'], platform);
}
/**
 * Attach a keyboard shortcut handler.
 *
 * @param {string[]|string}         shortcuts  Keyboard Shortcuts.
 * @param {Function}                callback   Shortcut callback.
 * @param {WPKeyboardShortcutConfig} options    Shortcut options.
 */


function useKeyboardShortcut(shortcuts, callback) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$bindGlobal = _ref.bindGlobal,
      bindGlobal = _ref$bindGlobal === void 0 ? false : _ref$bindGlobal,
      _ref$eventName = _ref.eventName,
      eventName = _ref$eventName === void 0 ? 'keydown' : _ref$eventName,
      _ref$isDisabled = _ref.isDisabled,
      isDisabled = _ref$isDisabled === void 0 ? false : _ref$isDisabled,
      target = _ref.target;

  var currentCallback = (0, _element.useRef)(callback);
  (0, _element.useEffect)(function () {
    currentCallback.current = callback;
  }, [callback]);
  (0, _element.useEffect)(function () {
    if (isDisabled) {
      return;
    }

    var mousetrap = new _mousetrap.default(target ? target.current : document);
    (0, _lodash.castArray)(shortcuts).forEach(function (shortcut) {
      var keys = shortcut.split('+'); // Determines whether a key is a modifier by the length of the string.
      // E.g. if I add a pass a shortcut Shift+Cmd+M, it'll determine that
      // the modifiers are Shift and Cmd because they're not a single character.

      var modifiers = new Set(keys.filter(function (value) {
        return value.length > 1;
      }));
      var hasAlt = modifiers.has('alt');
      var hasShift = modifiers.has('shift'); // This should be better moved to the shortcut registration instead.

      if (isAppleOS() && (modifiers.size === 1 && hasAlt || modifiers.size === 2 && hasAlt && hasShift)) {
        throw new Error("Cannot bind ".concat(shortcut, ". Alt and Shift+Alt modifiers are reserved for character input."));
      }

      var bindFn = bindGlobal ? 'bindGlobal' : 'bind';
      mousetrap[bindFn](shortcut, function () {
        return currentCallback.current.apply(currentCallback, arguments);
      }, eventName);
    });
    return function () {
      mousetrap.reset();
    };
  }, [shortcuts, bindGlobal, eventName, target, isDisabled]);
}

var _default = useKeyboardShortcut;
exports.default = _default;
//# sourceMappingURL=index.js.map