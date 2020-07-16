"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AutoBlockUninstaller;

var _blocks = require("@wordpress/blocks");

var _data = require("@wordpress/data");

var _element = require("@wordpress/element");

/**
 * WordPress dependencies
 */
function AutoBlockUninstaller() {
  var _useDispatch = (0, _data.useDispatch)('core/block-directory'),
      uninstallBlockType = _useDispatch.uninstallBlockType;

  var shouldRemoveBlockTypes = (0, _data.useSelect)(function (select) {
    var _select = select('core/editor'),
        isAutosavingPost = _select.isAutosavingPost,
        isSavingPost = _select.isSavingPost;

    return isSavingPost() && !isAutosavingPost();
  }, []);
  var unusedBlockTypes = (0, _data.useSelect)(function (select) {
    return select('core/block-directory').getUnusedBlockTypes();
  }, []);
  (0, _element.useEffect)(function () {
    if (shouldRemoveBlockTypes && unusedBlockTypes.length) {
      unusedBlockTypes.forEach(function (blockType) {
        uninstallBlockType(blockType);
        (0, _blocks.unregisterBlockType)(blockType.name);
      });
    }
  }, [shouldRemoveBlockTypes]);
  return null;
}
//# sourceMappingURL=index.js.map