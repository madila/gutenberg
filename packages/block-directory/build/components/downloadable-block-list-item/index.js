"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DownloadableBlockListItem;

var _element = require("@wordpress/element");

var _data = require("@wordpress/data");

var _downloadableBlockAuthorInfo = _interopRequireDefault(require("../downloadable-block-author-info"));

var _downloadableBlockHeader = _interopRequireDefault(require("../downloadable-block-header"));

var _downloadableBlockInfo = _interopRequireDefault(require("../downloadable-block-info"));

var _downloadableBlockNotice = _interopRequireDefault(require("../downloadable-block-notice"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function DownloadableBlockListItem(_ref) {
  var item = _ref.item,
      onClick = _ref.onClick;

  var _useSelect = (0, _data.useSelect)(function (select) {
    var _select = select('core/block-directory'),
        isInstalling = _select.isInstalling,
        getErrorNoticeForBlock = _select.getErrorNoticeForBlock;

    var notice = getErrorNoticeForBlock(item.id);
    var hasFatal = notice && notice.isFatal;
    return {
      isLoading: isInstalling(item.id),
      isInstallable: !hasFatal
    };
  }, [item]),
      isLoading = _useSelect.isLoading,
      isInstallable = _useSelect.isInstallable;

  var icon = item.icon,
      title = item.title,
      description = item.description,
      rating = item.rating,
      activeInstalls = item.activeInstalls,
      ratingCount = item.ratingCount,
      author = item.author,
      humanizedUpdated = item.humanizedUpdated,
      authorBlockCount = item.authorBlockCount,
      authorBlockRating = item.authorBlockRating;
  return (0, _element.createElement)("li", {
    className: "block-directory-downloadable-block-list-item"
  }, (0, _element.createElement)("article", {
    className: "block-directory-downloadable-block-list-item__panel"
  }, (0, _element.createElement)("header", {
    className: "block-directory-downloadable-block-list-item__header"
  }, (0, _element.createElement)(_downloadableBlockHeader.default, {
    icon: icon,
    onClick: onClick,
    title: title,
    rating: rating,
    ratingCount: ratingCount,
    isLoading: isLoading,
    isInstallable: isInstallable
  })), (0, _element.createElement)("section", {
    className: "block-directory-downloadable-block-list-item__body"
  }, (0, _element.createElement)(_downloadableBlockNotice.default, {
    onClick: onClick,
    block: item
  }), (0, _element.createElement)(_downloadableBlockInfo.default, {
    activeInstalls: activeInstalls,
    description: description,
    humanizedUpdated: humanizedUpdated
  })), (0, _element.createElement)("footer", {
    className: "block-directory-downloadable-block-list-item__footer"
  }, (0, _element.createElement)(_downloadableBlockAuthorInfo.default, {
    author: author,
    authorBlockCount: authorBlockCount,
    authorBlockRating: authorBlockRating
  }))));
}
//# sourceMappingURL=index.js.map