"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMenuItemForClientId = exports.hasResolvedNavigationPost = exports.getNavigationPostForMenu = void 0;

var _lodash = require("lodash");

var _data = require("@wordpress/data");

var _utils = require("./utils");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Returns a "stub" navigation post reflecting the contents of menu with id=menuId. The
 * post is meant as a convenient to only exists in runtime and should never be saved. It
 * enables a convenient way of editing the navigation by using a regular post editor.
 *
 * Related resolver fetches all menu items, converts them into blocks, and hydrates a new post with them.
 *
 * @param {number} menuId The id of menu to create a post from.
 * @return {null|Object} Post once the resolver fetches it, otherwise null
 */
var getNavigationPostForMenu = (0, _data.createRegistrySelector)(function (select) {
  return function (state, menuId) {
    // When the record is unavailable, calling getEditedEntityRecord triggers a http
    // request via it's related resolver. Let's return nothing until getNavigationPostForMenu
    // resolver marks the record as resolved.
    if (!hasResolvedNavigationPost(state, menuId)) {
      return null;
    }

    return select('core').getEditedEntityRecord(_utils.KIND, _utils.POST_TYPE, (0, _utils.buildNavigationPostId)(menuId));
  };
});
/**
 * Returns true if the navigation post related to menuId was already resolved.
 *
 * @param {number} menuId The id of menu.
 * @return {boolean} True if the navigation post related to menuId was already resolved, false otherwise.
 */

exports.getNavigationPostForMenu = getNavigationPostForMenu;
var hasResolvedNavigationPost = (0, _data.createRegistrySelector)(function (select) {
  return function (state, menuId) {
    return select('core').hasFinishedResolution('getEntityRecord', [_utils.KIND, _utils.POST_TYPE, (0, _utils.buildNavigationPostId)(menuId)]);
  };
});
/**
 * Returns a menu item represented by the block with id clientId.
 *
 * @param {number} postId    Navigation post id
 * @param {number} clientId  Block clientId
 * @return {Object|null} Menu item entity
 */

exports.hasResolvedNavigationPost = hasResolvedNavigationPost;
var getMenuItemForClientId = (0, _data.createRegistrySelector)(function (select) {
  return function (state, postId, clientId) {
    var mapping = (0, _lodash.invert)(state.mapping[postId]);
    return select('core').getMenuItem(mapping[clientId]);
  };
});
exports.getMenuItemForClientId = getMenuItemForClientId;
//# sourceMappingURL=selectors.js.map