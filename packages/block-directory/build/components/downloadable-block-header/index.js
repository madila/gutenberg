"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _blockRatings = _interopRequireDefault(require("../block-ratings"));

var _downloadableBlockIcon = _interopRequireDefault(require("../downloadable-block-icon"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function DownloadableBlockHeader(_ref) {
  var icon = _ref.icon,
      title = _ref.title,
      rating = _ref.rating,
      ratingCount = _ref.ratingCount,
      _ref$isLoading = _ref.isLoading,
      isLoading = _ref$isLoading === void 0 ? false : _ref$isLoading,
      _ref$isInstallable = _ref.isInstallable,
      isInstallable = _ref$isInstallable === void 0 ? true : _ref$isInstallable,
      _onClick = _ref.onClick;
  return (0, _element.createElement)("div", {
    className: "block-directory-downloadable-block-header__row"
  }, (0, _element.createElement)(_downloadableBlockIcon.default, {
    icon: icon,
    title: title
  }), (0, _element.createElement)("div", {
    className: "block-directory-downloadable-block-header__column"
  }, (0, _element.createElement)("h2", {
    className: "block-directory-downloadable-block-header__title"
  }, title), (0, _element.createElement)(_blockRatings.default, {
    rating: rating,
    ratingCount: ratingCount
  })), (0, _element.createElement)(_components.Button, {
    isSecondary: true,
    isBusy: isLoading,
    disabled: isLoading || !isInstallable,
    onClick: function onClick(event) {
      event.preventDefault();

      if (!isLoading && isInstallable) {
        _onClick();
      }
    }
  }, isLoading ? (0, _i18n.__)('Adding…') : (0, _i18n.__)('Add block')));
}

var _default = DownloadableBlockHeader;
exports.default = _default;
//# sourceMappingURL=index.js.map