"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CompactList;

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

var _downloadableBlockIcon = _interopRequireDefault(require("../downloadable-block-icon"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function CompactList(_ref) {
  var items = _ref.items;

  if (!items.length) {
    return null;
  }

  return (0, _element.createElement)("ul", {
    className: "block-directory-compact-list"
  }, items.map(function (_ref2) {
    var icon = _ref2.icon,
        id = _ref2.id,
        title = _ref2.title,
        author = _ref2.author;
    return (0, _element.createElement)("li", {
      key: id,
      className: "block-directory-compact-list__item"
    }, (0, _element.createElement)(_downloadableBlockIcon.default, {
      icon: icon,
      title: title
    }), (0, _element.createElement)("div", {
      className: "block-directory-compact-list__item-details"
    }, (0, _element.createElement)("div", {
      className: "block-directory-compact-list__item-title"
    }, title), (0, _element.createElement)("div", {
      className: "block-directory-compact-list__item-author"
    }, (0, _i18n.sprintf)(
    /* translators: %s: Name of the block author. */
    (0, _i18n.__)('By %s'), author))));
  }));
}
//# sourceMappingURL=index.js.map