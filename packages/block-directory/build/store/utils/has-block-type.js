"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hasBlockType;

/**
 * Check if a block list contains a specific block type. Recursively searches
 * through `innerBlocks` if they exist.
 *
 * @param {Object} blockType A block object to search for.
 * @param {Object[]} blocks  The list of blocks to look through.
 *
 * @return {boolean} Whether the blockType is found.
 */
function hasBlockType(blockType) {
  var blocks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (!blocks.length) {
    return false;
  }

  if (blocks.some(function (_ref) {
    var name = _ref.name;
    return name === blockType.name;
  })) {
    return true;
  }

  for (var i = 0; i < blocks.length; i++) {
    if (hasBlockType(blockType, blocks[i].innerBlocks)) {
      return true;
    }
  }

  return false;
}
//# sourceMappingURL=has-block-type.js.map