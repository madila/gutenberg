"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = NavigationEditor;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _blockEditor = require("@wordpress/block-editor");

var _compose = require("@wordpress/compose");

var _components = require("@wordpress/components");

var _shortcuts = _interopRequireDefault(require("./shortcuts"));

var _blockEditorArea = _interopRequireDefault(require("./block-editor-area"));

var _navigationStructureArea = _interopRequireDefault(require("./navigation-structure-area"));

var _useNavigationBlockEditor = _interopRequireDefault(require("./use-navigation-block-editor"));

var _data = require("@wordpress/data");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function NavigationEditor(_ref) {
  var menuId = _ref.menuId,
      blockEditorSettings = _ref.blockEditorSettings,
      onDeleteMenu = _ref.onDeleteMenu;

  var _useSelect = (0, _data.useSelect)(function (select) {
    return {
      post: select('core/edit-navigation').getNavigationPostForMenu(menuId),
      hasResolved: select('core/edit-navigation').hasResolvedNavigationPost(menuId)
    };
  }),
      post = _useSelect.post,
      hasResolved = _useSelect.hasResolved;

  return (0, _element.createElement)("div", {
    className: "edit-navigation-editor"
  }, (0, _element.createElement)(_blockEditor.BlockEditorKeyboardShortcuts.Register, null), (0, _element.createElement)(_shortcuts.default.Register, null), !hasResolved ? (0, _element.createElement)(_components.Spinner, null) : (0, _element.createElement)(NavigationPostEditor, {
    post: post,
    blockEditorSettings: blockEditorSettings,
    onDeleteMenu: onDeleteMenu
  }));
}

function NavigationPostEditor(_ref2) {
  var post = _ref2.post,
      blockEditorSettings = _ref2.blockEditorSettings,
      onDeleteMenu = _ref2.onDeleteMenu;
  var isLargeViewport = (0, _compose.useViewportMatch)('medium');

  var _useNavigationBlockEd = (0, _useNavigationBlockEditor.default)(post),
      _useNavigationBlockEd2 = (0, _slicedToArray2.default)(_useNavigationBlockEd, 3),
      blocks = _useNavigationBlockEd2[0],
      onInput = _useNavigationBlockEd2[1],
      onChange = _useNavigationBlockEd2[2];

  var _useDispatch = (0, _data.useDispatch)('core/edit-navigation'),
      saveNavigationPost = _useDispatch.saveNavigationPost;

  var save = function save() {
    return saveNavigationPost(post);
  };

  return (0, _element.createElement)(_blockEditor.BlockEditorProvider, {
    value: blocks,
    onInput: onInput,
    onChange: onChange,
    settings: _objectSpread({}, blockEditorSettings, {
      templateLock: 'all',
      hasFixedToolbar: true
    }),
    useSubRegistry: false
  }, (0, _element.createElement)(_blockEditor.BlockEditorKeyboardShortcuts, null), (0, _element.createElement)(_shortcuts.default, {
    saveBlocks: save
  }), (0, _element.createElement)(_navigationStructureArea.default, {
    blocks: blocks,
    initialOpen: isLargeViewport
  }), (0, _element.createElement)(_blockEditorArea.default, {
    saveBlocks: save,
    menuId: post.meta.menuId,
    onDeleteMenu: onDeleteMenu
  }));
}
//# sourceMappingURL=index.js.map