"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

var _blockEditor = require("@wordpress/block-editor");

/**
 * WordPress dependencies
 */
function DownloadableBlockIcon(_ref) {
  var icon = _ref.icon,
      title = _ref.title;
  return (0, _element.createElement)("div", {
    className: "block-directory-downloadable-block-icon"
  }, icon.match(/\.(jpeg|jpg|gif|png|svg)(?:\?.*)?$/) !== null ? (0, _element.createElement)("img", {
    src: icon,
    alt: (0, _i18n.sprintf)( // translators: %s: Name of the plugin e.g: "Akismet".
    (0, _i18n.__)('%s block icon'), title)
  }) : (0, _element.createElement)(_blockEditor.BlockIcon, {
    icon: icon,
    showColors: true
  }));
}

var _default = DownloadableBlockIcon;
exports.default = _default;
//# sourceMappingURL=index.js.map