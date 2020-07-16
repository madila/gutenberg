"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = require("lodash");

var _reactNative = require("react-native");

var _keycodes = require("@wordpress/keycodes");

var _deprecated = _interopRequireDefault(require("@wordpress/deprecated"));

var _components = require("@wordpress/components");

var _compose = require("@wordpress/compose");

var _button = _interopRequireDefault(require("../button"));

var _dropdown = _interopRequireDefault(require("../dropdown"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function mergeProps() {
  var defaultProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var mergedProps = _objectSpread({}, defaultProps, {}, props);

  if (props.className && defaultProps.className) {
    mergedProps.className = (0, _classnames.default)(props.className, defaultProps.className);
  }

  return mergedProps;
}

function DropdownMenu(_ref) {
  var children = _ref.children,
      className = _ref.className,
      controls = _ref.controls,
      _ref$icon = _ref.icon,
      icon = _ref$icon === void 0 ? 'menu' : _ref$icon,
      label = _ref.label,
      popoverProps = _ref.popoverProps,
      toggleProps = _ref.toggleProps,
      menuLabel = _ref.menuLabel,
      position = _ref.position;

  if (menuLabel) {
    (0, _deprecated.default)('`menuLabel` prop in `DropdownComponent`', {
      alternative: '`menuProps` object and its `aria-label` property',
      plugin: 'Gutenberg'
    });
  }

  if (position) {
    (0, _deprecated.default)('`position` prop in `DropdownComponent`', {
      alternative: '`popoverProps` object and its `position` property',
      plugin: 'Gutenberg'
    });
  }

  if ((0, _lodash.isEmpty)(controls) && !(0, _lodash.isFunction)(children)) {
    return null;
  } // Normalize controls to nested array of objects (sets of controls)


  var controlSets;

  if (!(0, _lodash.isEmpty)(controls)) {
    controlSets = controls;

    if (!Array.isArray(controlSets[0])) {
      controlSets = [controlSets];
    }
  }

  var mergedPopoverProps = mergeProps({
    className: 'components-dropdown-menu__popover',
    position: position
  }, popoverProps);
  return (0, _element.createElement)(_dropdown.default, {
    className: (0, _classnames.default)('components-dropdown-menu', className),
    popoverProps: mergedPopoverProps,
    renderToggle: function renderToggle(_ref2) {
      var isOpen = _ref2.isOpen,
          onToggle = _ref2.onToggle;

      var openOnArrowDown = function openOnArrowDown(event) {
        if (!isOpen && event.keyCode === _keycodes.DOWN) {
          event.preventDefault();
          event.stopPropagation();
          onToggle();
        }
      };

      var mergedToggleProps = mergeProps({
        className: (0, _classnames.default)('components-dropdown-menu__toggle', {
          'is-opened': isOpen
        })
      }, toggleProps);
      return (0, _element.createElement)(_button.default, (0, _extends2.default)({}, mergedToggleProps, {
        icon: icon,
        onClick: function onClick(event) {
          onToggle(event);

          if (mergedToggleProps.onClick) {
            mergedToggleProps.onClick(event);
          }
        },
        onKeyDown: function onKeyDown(event) {
          openOnArrowDown(event);

          if (mergedToggleProps.onKeyDown) {
            mergedToggleProps.onKeyDown(event);
          }
        },
        "aria-haspopup": "true",
        "aria-expanded": isOpen,
        label: label,
        showTooltip: true
      }), mergedToggleProps.children);
    },
    renderContent: function renderContent(_ref3) {
      var isOpen = _ref3.isOpen,
          onClose = _ref3.onClose,
          props = (0, _objectWithoutProperties2.default)(_ref3, ["isOpen", "onClose"]);
      return (0, _element.createElement)(_components.BottomSheet, {
        hideHeader: true,
        isVisible: isOpen,
        onClose: onClose
      }, (0, _lodash.isFunction)(children) ? children(props) : null, (0, _element.createElement)(_components.PanelBody, {
        title: label,
        style: {
          paddingLeft: 0,
          paddingRight: 0
        }
      }, (0, _lodash.flatMap)(controlSets, function (controlSet, indexOfSet) {
        return controlSet.map(function (control, indexOfControl) {
          return (0, _element.createElement)(_components.BottomSheet.Cell, {
            key: [indexOfSet, indexOfControl].join(),
            label: control.title,
            onPress: function onPress() {
              onClose();

              if (control.onClick) {
                control.onClick();
              }
            },
            editable: false,
            icon: control.icon,
            leftAlign: true,
            isSelected: control.isActive,
            separatorType: _reactNative.Platform.OS === 'android' ? 'none' : 'leftMargin'
          });
        });
      })));
    }
  });
}

var _default = (0, _compose.withPreferredColorScheme)(DropdownMenu);

exports.default = _default;
//# sourceMappingURL=index.native.js.map