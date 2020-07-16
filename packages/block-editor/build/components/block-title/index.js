"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = BlockTitle;

var _data = require("@wordpress/data");

var _blocks = require("@wordpress/blocks");

/**
 * WordPress dependencies
 */

/**
 * Renders the block's configured title as a string, or empty if the title
 * cannot be determined.
 *
 * @example
 *
 * ```jsx
 * <BlockTitle clientId="afd1cb17-2c08-4e7a-91be-007ba7ddc3a1" />
 * ```
 *
 * @param {Object} props
 * @param {string} props.clientId Client ID of block.
 *
 * @return {?string} Block title.
 */
function BlockTitle(_ref) {
  var clientId = _ref.clientId;
  var name = (0, _data.useSelect)(function (select) {
    if (!clientId) {
      return null;
    }

    var _select = select('core/block-editor'),
        getBlockName = _select.getBlockName;

    return getBlockName(clientId);
  }, [clientId]);

  if (!name) {
    return null;
  }

  var blockType = (0, _blocks.getBlockType)(name);

  if (!blockType) {
    return null;
  }

  return blockType.title;
}
//# sourceMappingURL=index.js.map