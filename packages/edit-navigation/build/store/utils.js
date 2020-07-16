"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.menuItemsQuery = menuItemsQuery;
exports.buildNavigationPostId = exports.POST_TYPE = exports.KIND = void 0;

/**
 * "Kind" of the navigation post.
 *
 * @type {string}
 */
var KIND = 'root';
/**
 * "post type" of the navigation post.
 *
 * @type {string}
 */

exports.KIND = KIND;
var POST_TYPE = 'postType';
/**
 * Builds an ID for a new navigation post.
 *
 * @param {number} menuId Menu id.
 * @return {string} An ID.
 */

exports.POST_TYPE = POST_TYPE;

var buildNavigationPostId = function buildNavigationPostId(menuId) {
  return "navigation-post-".concat(menuId);
};
/**
 * Builds a query to resolve menu items.
 *
 * @param {number} menuId Menu id.
 * @return {Object} Query.
 */


exports.buildNavigationPostId = buildNavigationPostId;

function menuItemsQuery(menuId) {
  return {
    menus: menuId,
    per_page: -1
  };
}
//# sourceMappingURL=utils.js.map