"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isRequestingDownloadableBlocks = isRequestingDownloadableBlocks;
exports.getDownloadableBlocks = getDownloadableBlocks;
exports.getInstalledBlockTypes = getInstalledBlockTypes;
exports.isInstalling = isInstalling;
exports.getErrorNotices = getErrorNotices;
exports.getErrorNoticeForBlock = getErrorNoticeForBlock;
exports.getUnusedBlockTypes = exports.getNewBlockTypes = void 0;

var _data = require("@wordpress/data");

var _hasBlockType = _interopRequireDefault(require("./utils/has-block-type"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Returns true if application is requesting for downloadable blocks.
 *
 * @param {Object} state Global application state.
 * @param {string} filterValue Search string.
 *
 *
 * @return {Array} Downloadable blocks
 */
function isRequestingDownloadableBlocks(state, filterValue) {
  if (!state.downloadableBlocks[filterValue] || !state.downloadableBlocks[filterValue].isRequesting) {
    return false;
  }

  return state.downloadableBlocks[filterValue].isRequesting;
}
/**
 * Returns the available uninstalled blocks
 *
 * @param {Object} state       Global application state.
 * @param {string} filterValue Search string.
 *
 * @return {Array} Downloadable blocks
 */


function getDownloadableBlocks(state, filterValue) {
  if (!state.downloadableBlocks[filterValue] || !state.downloadableBlocks[filterValue].results) {
    return [];
  }

  return state.downloadableBlocks[filterValue].results;
}
/**
 * Returns the block types that have been installed on the server.
 *
 * @param {Object} state Global application state.
 *
 * @return {Array} Block type items.
 */


function getInstalledBlockTypes(state) {
  return state.blockManagement.installedBlockTypes;
}
/**
 * Returns block types that have been installed on the server and used in the
 * current post.
 *
 * @param {Object} state Global application state.
 *
 * @return {Array} Block type items.
 */


var getNewBlockTypes = (0, _data.createRegistrySelector)(function (select) {
  return function (state) {
    var usedBlockTree = select('core/block-editor').getBlocks();
    var installedBlockTypes = getInstalledBlockTypes(state);
    var newBlockTypes = [];
    installedBlockTypes.forEach(function (blockType) {
      if ((0, _hasBlockType.default)(blockType, usedBlockTree)) {
        newBlockTypes.push(blockType);
      }
    });
    return newBlockTypes;
  };
});
/**
 * Returns the block types that have been installed on the server but are not
 * used in the current post.
 *
 * @param {Object} state Global application state.
 *
 * @return {Array} Block type items.
 */

exports.getNewBlockTypes = getNewBlockTypes;
var getUnusedBlockTypes = (0, _data.createRegistrySelector)(function (select) {
  return function (state) {
    var usedBlockTree = select('core/block-editor').getBlocks();
    var installedBlockTypes = getInstalledBlockTypes(state);
    var newBlockTypes = [];
    installedBlockTypes.forEach(function (blockType) {
      if (!(0, _hasBlockType.default)(blockType, usedBlockTree)) {
        newBlockTypes.push(blockType);
      }
    });
    return newBlockTypes;
  };
});
/**
 * Returns true if application is calling install endpoint.
 *
 * @param {Object} state Global application state.
 * @param {string} blockId Id of the block.
 *
 * @return {boolean} Whether its currently installing
 */

exports.getUnusedBlockTypes = getUnusedBlockTypes;

function isInstalling(state, blockId) {
  return state.blockManagement.isInstalling[blockId] || false;
}
/**
 * Returns the error notices
 *
 * @param {Object} state Global application state.
 *
 * @return {Object} Object with error notices.
 */


function getErrorNotices(state) {
  return state.errorNotices;
}
/**
 * Returns the error notice for a given block.
 *
 * @param {Object} state   Global application state.
 * @param {string} blockId The ID of the block plugin. eg: my-block
 *
 * @return {string|boolean} The error text, or false if no error.
 */


function getErrorNoticeForBlock(state, blockId) {
  return state.errorNotices[blockId];
}
//# sourceMappingURL=selectors.js.map