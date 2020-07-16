"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

var _data = require("@wordpress/data");

var _wordCount = _interopRequireDefault(require("../word-count"));

var _documentOutline = _interopRequireDefault(require("../document-outline"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function TableOfContentsPanel(_ref) {
  var hasOutlineItemsDisabled = _ref.hasOutlineItemsDisabled,
      onRequestClose = _ref.onRequestClose;

  var _useSelect = (0, _data.useSelect)(function (select) {
    var _select = select('core/block-editor'),
        getGlobalBlockCount = _select.getGlobalBlockCount;

    return {
      headingCount: getGlobalBlockCount('core/heading'),
      paragraphCount: getGlobalBlockCount('core/paragraph'),
      numberOfBlocks: getGlobalBlockCount()
    };
  }, []),
      headingCount = _useSelect.headingCount,
      paragraphCount = _useSelect.paragraphCount,
      numberOfBlocks = _useSelect.numberOfBlocks;

  return (
    /*
     * Disable reason: The `list` ARIA role is redundant but
     * Safari+VoiceOver won't announce the list otherwise.
     */

    /* eslint-disable jsx-a11y/no-redundant-roles */
    (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)("div", {
      className: "table-of-contents__wrapper",
      role: "note",
      "aria-label": (0, _i18n.__)('Document Statistics'),
      tabIndex: "0"
    }, (0, _element.createElement)("ul", {
      role: "list",
      className: "table-of-contents__counts"
    }, (0, _element.createElement)("li", {
      className: "table-of-contents__count"
    }, (0, _i18n.__)('Words'), (0, _element.createElement)(_wordCount.default, null)), (0, _element.createElement)("li", {
      className: "table-of-contents__count"
    }, (0, _i18n.__)('Headings'), (0, _element.createElement)("span", {
      className: "table-of-contents__number"
    }, headingCount)), (0, _element.createElement)("li", {
      className: "table-of-contents__count"
    }, (0, _i18n.__)('Paragraphs'), (0, _element.createElement)("span", {
      className: "table-of-contents__number"
    }, paragraphCount)), (0, _element.createElement)("li", {
      className: "table-of-contents__count"
    }, (0, _i18n.__)('Blocks'), (0, _element.createElement)("span", {
      className: "table-of-contents__number"
    }, numberOfBlocks)))), headingCount > 0 && (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)("hr", null), (0, _element.createElement)("h2", {
      className: "table-of-contents__title"
    }, (0, _i18n.__)('Document Outline')), (0, _element.createElement)(_documentOutline.default, {
      onSelect: onRequestClose,
      hasOutlineItemsDisabled: hasOutlineItemsDisabled
    })))
    /* eslint-enable jsx-a11y/no-redundant-roles */

  );
}

var _default = TableOfContentsPanel;
exports.default = _default;
//# sourceMappingURL=panel.js.map