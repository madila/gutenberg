"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = InstalledBlocksPrePublishPanel;

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

var _editPost = require("@wordpress/edit-post");

var _data = require("@wordpress/data");

var _compactList = _interopRequireDefault(require("../../components/compact-list"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function InstalledBlocksPrePublishPanel() {
  var newBlockTypes = (0, _data.useSelect)(function (select) {
    return select('core/block-directory').getNewBlockTypes();
  }, []);

  if (!newBlockTypes.length) {
    return null;
  }

  return (0, _element.createElement)(_editPost.PluginPrePublishPanel, {
    icon: "block-default",
    title: (0, _i18n.sprintf)( // translators: %d: number of blocks (number).
    (0, _i18n._n)('Added: %d block', 'Added: %d blocks', newBlockTypes.length), newBlockTypes.length),
    initialOpen: true
  }, (0, _element.createElement)("p", {
    className: "installed-blocks-pre-publish-panel__copy"
  }, (0, _i18n._n)('The following block has been added to your site.', 'The following blocks have been added to your site.', newBlockTypes.length)), (0, _element.createElement)(_compactList.default, {
    items: newBlockTypes
  }));
}
//# sourceMappingURL=index.js.map