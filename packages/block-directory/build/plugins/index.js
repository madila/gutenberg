"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _element = require("@wordpress/element");

var _plugins = require("@wordpress/plugins");

var _autoBlockUninstaller = _interopRequireDefault(require("../components/auto-block-uninstaller"));

var _inserterMenuDownloadableBlocksPanel = _interopRequireDefault(require("./inserter-menu-downloadable-blocks-panel"));

var _installedBlocksPrePublishPanel = _interopRequireDefault(require("./installed-blocks-pre-publish-panel"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
(0, _plugins.registerPlugin)('block-directory', {
  render: function render() {
    return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_autoBlockUninstaller.default, null), (0, _element.createElement)(_inserterMenuDownloadableBlocksPanel.default, null), (0, _element.createElement)(_installedBlocksPrePublishPanel.default, null));
  }
});
//# sourceMappingURL=index.js.map