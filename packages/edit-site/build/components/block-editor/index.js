"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = BlockEditor;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _data = require("@wordpress/data");

var _coreData = require("@wordpress/core-data");

var _blockEditor = require("@wordpress/block-editor");

var _navigateToLink = _interopRequireDefault(require("../navigate-to-link"));

var _sidebar = require("../sidebar");

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function BlockEditor(_ref) {
  var setIsInserterOpen = _ref.setIsInserterOpen;

  var _useSelect = (0, _data.useSelect)(function (select) {
    var _select = select('core/edit-site'),
        getSettings = _select.getSettings,
        getTemplateType = _select.getTemplateType,
        getPage = _select.getPage;

    return {
      settings: getSettings(setIsInserterOpen),
      templateType: getTemplateType(),
      page: getPage()
    };
  }, [setIsInserterOpen]),
      settings = _useSelect.settings,
      templateType = _useSelect.templateType,
      page = _useSelect.page;

  var _useEntityBlockEditor = (0, _coreData.useEntityBlockEditor)('postType', templateType),
      _useEntityBlockEditor2 = (0, _slicedToArray2.default)(_useEntityBlockEditor, 3),
      blocks = _useEntityBlockEditor2[0],
      onInput = _useEntityBlockEditor2[1],
      onChange = _useEntityBlockEditor2[2];

  var _useDispatch = (0, _data.useDispatch)('core/edit-site'),
      setPage = _useDispatch.setPage;

  return (0, _element.createElement)(_blockEditor.BlockEditorProvider, {
    settings: settings,
    value: blocks,
    onInput: onInput,
    onChange: onChange,
    useSubRegistry: false
  }, (0, _element.createElement)(_blockEditor.BlockEditorKeyboardShortcuts, null), (0, _element.createElement)(_blockEditor.__experimentalLinkControl.ViewerFill, null, (0, _element.useCallback)(function (fillProps) {
    return (0, _element.createElement)(_navigateToLink.default, (0, _extends2.default)({}, fillProps, {
      activePage: page,
      onActivePageChange: setPage
    }));
  }, [page])), (0, _element.createElement)(_sidebar.SidebarInspectorFill, null, (0, _element.createElement)(_blockEditor.BlockInspector, null)), (0, _element.createElement)("div", {
    className: "editor-styles-wrapper edit-site-block-editor__editor-styles-wrapper"
  }, (0, _element.createElement)(_blockEditor.WritingFlow, null, (0, _element.createElement)(_blockEditor.ObserveTyping, null, (0, _element.createElement)(_blockEditor.BlockList, {
    className: "edit-site-block-editor__block-list"
  })))));
}
//# sourceMappingURL=index.js.map