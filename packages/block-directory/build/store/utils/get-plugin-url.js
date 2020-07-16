"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPluginUrl;

/**
 * Get the plugin's direct API link out of a block-directory response.
 *
 * @param {Object} block The block object
 *
 * @return {string} The plugin URL, if exists.
 */
function getPluginUrl(block) {
  if (!block) {
    return false;
  }

  var link = block.links['wp:plugin'] || block.links.self;

  if (link && link.length) {
    return link[0].href;
  }

  return false;
}
//# sourceMappingURL=get-plugin-url.js.map