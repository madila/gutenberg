"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _icons = require("@wordpress/icons");

var _panel = _interopRequireDefault(require("./panel"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function TableOfContents(_ref, ref) {
  var hasOutlineItemsDisabled = _ref.hasOutlineItemsDisabled,
      props = (0, _objectWithoutProperties2.default)(_ref, ["hasOutlineItemsDisabled"]);
  var hasBlocks = (0, _data.useSelect)(function (select) {
    return !!select('core/block-editor').getBlockCount();
  }, []);
  return (0, _element.createElement)(_components.Dropdown, {
    position: "bottom",
    className: "table-of-contents",
    contentClassName: "table-of-contents__popover",
    renderToggle: function renderToggle(_ref2) {
      var isOpen = _ref2.isOpen,
          onToggle = _ref2.onToggle;
      return (0, _element.createElement)(_components.Button, (0, _extends2.default)({}, props, {
        ref: ref,
        onClick: hasBlocks ? onToggle : undefined,
        icon: _icons.info,
        "aria-expanded": isOpen,
        label: (0, _i18n.__)('Content structure'),
        tooltipPosition: "bottom",
        "aria-disabled": !hasBlocks
      }));
    },
    renderContent: function renderContent(_ref3) {
      var onClose = _ref3.onClose;
      return (0, _element.createElement)(_panel.default, {
        onRequestClose: onClose,
        hasOutlineItemsDisabled: hasOutlineItemsDisabled
      });
    }
  });
}

var _default = (0, _element.forwardRef)(TableOfContents);

exports.default = _default;
//# sourceMappingURL=index.js.map