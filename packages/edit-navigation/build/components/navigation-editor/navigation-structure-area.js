"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = NavigationStructureArea;

var _element = require("@wordpress/element");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _compose = require("@wordpress/compose");

var _blockEditor = require("@wordpress/block-editor");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

/**
 * WordPress dependencies
 */
function NavigationStructureArea(_ref) {
  var _blocks$;

  var blocks = _ref.blocks,
      initialOpen = _ref.initialOpen;

  var _useState = (0, _element.useState)((_blocks$ = blocks[0]) === null || _blocks$ === void 0 ? void 0 : _blocks$.clientId),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      selectedBlockId = _useState2[0],
      setSelectedBlockId = _useState2[1];

  var isSmallScreen = (0, _compose.useViewportMatch)('medium', '<');
  var showNavigationStructure = !!blocks.length;
  var content = showNavigationStructure && (0, _element.createElement)(_blockEditor.__experimentalBlockNavigationTree, {
    blocks: blocks,
    selectedBlockClientId: selectedBlockId,
    selectBlock: function selectBlock(id) {
      setSelectedBlockId(id);
    },
    __experimentalFeatures: true,
    showNestedBlocks: true,
    showAppender: true,
    showBlockMovers: true
  });
  return isSmallScreen ? (0, _element.createElement)(_components.Panel, {
    className: "edit-navigation-editor__navigation-structure-panel"
  }, (0, _element.createElement)(_components.PanelBody, {
    title: (0, _i18n.__)('Navigation structure'),
    initialOpen: initialOpen
  }, content)) : (0, _element.createElement)(_components.Card, {
    className: "edit-navigation-editor__navigation-structure-card"
  }, (0, _element.createElement)(_components.CardHeader, {
    className: "edit-navigation-editor__navigation-structure-header"
  }, (0, _i18n.__)('Navigation structure')), (0, _element.createElement)(_components.CardBody, null, content));
}
//# sourceMappingURL=navigation-structure-area.js.map