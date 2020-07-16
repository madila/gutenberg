"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeEditor = initializeEditor;

var _element = require("@wordpress/element");

require("@wordpress/core-data");

require("@wordpress/block-editor");

require("@wordpress/viewport");

require("@wordpress/notices");

require("@wordpress/format-library");

require("./store");

var _editor = _interopRequireDefault(require("./editor"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var editorInitialized = false;
/**
 * Initializes the Editor and returns a componentProvider
 * that can be registered with `AppRegistry.registerComponent`
 *
 * @param {string}  id           Unique identifier for editor instance.
 * @param {Object}  postType     Post type of the post to edit.
 * @param {Object}  postId       ID of the post to edit (unused right now)
 */

function initializeEditor(id, postType, postId) {
  if (editorInitialized) {
    return;
  }

  editorInitialized = true;
  (0, _element.render)((0, _element.createElement)(_editor.default, {
    postId: postId,
    postType: postType
  }), id);
}
//# sourceMappingURL=index.native.js.map