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

var _classnames = _interopRequireDefault(require("classnames"));

var _dom = require("@wordpress/dom");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
var _createContext = (0, _element.createContext)(false),
    Consumer = _createContext.Consumer,
    Provider = _createContext.Provider;
/**
 * Names of control nodes which qualify for disabled behavior.
 *
 * See WHATWG HTML Standard: 4.10.18.5: "Enabling and disabling form controls: the disabled attribute".
 *
 * @see https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#enabling-and-disabling-form-controls:-the-disabled-attribute
 *
 * @type {string[]}
 */


var DISABLED_ELIGIBLE_NODE_NAMES = ['BUTTON', 'FIELDSET', 'INPUT', 'OPTGROUP', 'OPTION', 'SELECT', 'TEXTAREA'];

function Disabled(_ref) {
  var className = _ref.className,
      children = _ref.children,
      props = (0, _objectWithoutProperties2.default)(_ref, ["className", "children"]);
  var node = (0, _element.useRef)();

  var disable = function disable() {
    _dom.focus.focusable.find(node.current).forEach(function (focusable) {
      if ((0, _lodash.includes)(DISABLED_ELIGIBLE_NODE_NAMES, focusable.nodeName)) {
        focusable.setAttribute('disabled', '');
      }

      if (focusable.hasAttribute('tabindex')) {
        focusable.removeAttribute('tabindex');
      }

      if (focusable.hasAttribute('contenteditable')) {
        focusable.setAttribute('contenteditable', 'false');
      }
    });
  }; // Debounce re-disable since disabling process itself will incur
  // additional mutations which should be ignored.


  var debouncedDisable = (0, _element.useCallback)((0, _lodash.debounce)(disable, {
    leading: true
  }), []);
  (0, _element.useLayoutEffect)(function () {
    disable();
    var observer = new window.MutationObserver(debouncedDisable);
    observer.observe(node.current, {
      childList: true,
      attributes: true,
      subtree: true
    });
    return function () {
      observer.disconnect();
      debouncedDisable.cancel();
    };
  }, []);
  return (0, _element.createElement)(Provider, {
    value: true
  }, (0, _element.createElement)("div", (0, _extends2.default)({
    ref: node,
    className: (0, _classnames.default)(className, 'components-disabled')
  }, props), children));
}

Disabled.Consumer = Consumer;
var _default = Disabled;
exports.default = _default;
//# sourceMappingURL=index.js.map