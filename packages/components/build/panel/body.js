"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelBody = PanelBody;
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = require("lodash");

var _reactMergeRefs = _interopRequireDefault(require("react-merge-refs"));

var _compose = require("@wordpress/compose");

var _icons = require("@wordpress/icons");

var _button = _interopRequireDefault(require("../button"));

var _icon = _interopRequireDefault(require("../icon"));

var _utils = require("../utils");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function PanelBody(_ref, ref) {
  var children = _ref.children,
      className = _ref.className,
      icon = _ref.icon,
      initialOpen = _ref.initialOpen,
      _ref$onToggle = _ref.onToggle,
      onToggle = _ref$onToggle === void 0 ? _lodash.noop : _ref$onToggle,
      opened = _ref.opened,
      title = _ref.title;

  var _useControlledState = (0, _utils.useControlledState)(opened, {
    initial: initialOpen === undefined ? true : initialOpen
  }),
      _useControlledState2 = (0, _slicedToArray2.default)(_useControlledState, 2),
      isOpened = _useControlledState2[0],
      setIsOpened = _useControlledState2[1];

  var nodeRef = (0, _element.useRef)(); // Defaults to 'smooth' scrolling
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView

  var scrollBehavior = (0, _compose.useReducedMotion)() ? 'auto' : 'smooth';

  var handleOnToggle = function handleOnToggle(event) {
    event.preventDefault();
    var next = !isOpened;
    setIsOpened(next);
    onToggle(next);
  }; // Runs after initial render


  (0, _utils.useUpdateEffect)(function () {
    if (isOpened) {
      /*
       * Scrolls the content into view when visible.
       * This improves the UX when there are multiple stacking <PanelBody />
       * components in a scrollable container.
       */
      if (nodeRef.current.scrollIntoView) {
        nodeRef.current.scrollIntoView({
          inline: 'nearest',
          block: 'nearest',
          behavior: scrollBehavior
        });
      }
    }
  }, [isOpened, scrollBehavior]);
  var classes = (0, _classnames.default)('components-panel__body', className, {
    'is-opened': isOpened
  });
  return (0, _element.createElement)("div", {
    className: classes,
    ref: (0, _reactMergeRefs.default)([nodeRef, ref])
  }, (0, _element.createElement)(PanelBodyTitle, {
    icon: icon,
    isOpened: isOpened,
    onClick: handleOnToggle,
    title: title
  }), isOpened && children);
}

var PanelBodyTitle = (0, _element.forwardRef)(function (_ref2, ref) {
  var isOpened = _ref2.isOpened,
      icon = _ref2.icon,
      title = _ref2.title,
      props = (0, _objectWithoutProperties2.default)(_ref2, ["isOpened", "icon", "title"]);
  if (!title) return null;
  return (0, _element.createElement)("h2", {
    className: "components-panel__body-title"
  }, (0, _element.createElement)(_button.default, (0, _extends2.default)({
    className: "components-panel__body-toggle",
    ref: ref
  }, props), (0, _element.createElement)("span", {
    "aria-hidden": "true"
  }, (0, _element.createElement)(_icon.default, {
    className: "components-panel__arrow",
    icon: isOpened ? _icons.chevronUp : _icons.chevronDown
  })), title, icon && (0, _element.createElement)(_icon.default, {
    icon: icon,
    className: "components-panel__icon",
    size: 20
  })));
});
var ForwardedComponent = (0, _element.forwardRef)(PanelBody);
ForwardedComponent.displayName = 'PanelBody';
var _default = ForwardedComponent;
exports.default = _default;
//# sourceMappingURL=body.js.map