"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = BlockEditorArea;

var _element = require("@wordpress/element");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classnames = _interopRequireDefault(require("classnames"));

var _blockEditor = require("@wordpress/block-editor");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _i18n = require("@wordpress/i18n");

var _deleteMenuButton = _interopRequireDefault(require("../delete-menu-button"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function BlockEditorArea(_ref) {
  var onDeleteMenu = _ref.onDeleteMenu,
      menuId = _ref.menuId,
      saveBlocks = _ref.saveBlocks;

  var _useSelect = (0, _data.useSelect)(function (select) {
    var _getBlocks$;

    var _select = select('core/block-editor'),
        isNavigationMode = _select.isNavigationMode,
        getBlockSelectionStart = _select.getBlockSelectionStart,
        getBlock = _select.getBlock,
        getBlocks = _select.getBlocks;

    var selectionStartClientId = getBlockSelectionStart();
    var rootClientId = (_getBlocks$ = getBlocks()[0]) === null || _getBlocks$ === void 0 ? void 0 : _getBlocks$.clientId;
    return {
      selectionStartClientId: selectionStartClientId,
      rootBlockId: rootClientId,
      isNavigationModeActive: isNavigationMode(),
      isRootBlockSelected: !!selectionStartClientId && rootClientId === selectionStartClientId,
      hasSelectedBlock: !!selectionStartClientId && !!getBlock(selectionStartClientId)
    };
  }, []),
      rootBlockId = _useSelect.rootBlockId,
      isNavigationModeActive = _useSelect.isNavigationModeActive,
      isRootBlockSelected = _useSelect.isRootBlockSelected,
      hasSelectedBlock = _useSelect.hasSelectedBlock;

  var _useDispatch = (0, _data.useDispatch)('core'),
      saveMenu = _useDispatch.saveMenu;

  var menu = (0, _data.useSelect)(function (select) {
    return select('core').getMenu(menuId);
  }, [menuId]);

  var _useState = (0, _element.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      autoAddPages = _useState2[0],
      setAutoAddPages = _useState2[1];

  (0, _element.useEffect)(function () {
    if (menu) {
      setAutoAddPages(menu.auto_add);
    }
  }, [menuId]); // Select the navigation block when it becomes available

  var _useDispatch2 = (0, _data.useDispatch)('core/block-editor'),
      selectBlock = _useDispatch2.selectBlock;

  (0, _element.useEffect)(function () {
    if (rootBlockId) {
      selectBlock(rootBlockId);
    }
  }, [rootBlockId]);
  return (0, _element.createElement)(_components.Card, {
    className: "edit-navigation-editor__block-editor-area"
  }, (0, _element.createElement)(_components.CardHeader, null, (0, _element.createElement)("div", {
    className: "edit-navigation-editor__block-editor-area-header-text"
  }, (0, _i18n.__)('Navigation menu')), (0, _element.createElement)(_components.Button, {
    isPrimary: true,
    onClick: saveBlocks
  }, (0, _i18n.__)('Save navigation'))), (0, _element.createElement)(_components.CardBody, null, (0, _element.createElement)(_blockEditor.NavigableToolbar, {
    className: (0, _classnames.default)('edit-navigation-editor__block-editor-toolbar', {
      'is-hidden': isNavigationModeActive || isRootBlockSelected
    }),
    "aria-label": (0, _i18n.__)('Block tools')
  }, hasSelectedBlock && !isRootBlockSelected && (0, _element.createElement)(_blockEditor.BlockToolbar, {
    hideDragHandle: true,
    __experimentalExpandedControl: true
  })), (0, _element.createElement)(_components.Popover.Slot, {
    name: "block-toolbar"
  }), (0, _element.createElement)("div", {
    className: "editor-styles-wrapper"
  }, (0, _element.createElement)(_blockEditor.WritingFlow, null, (0, _element.createElement)(_blockEditor.ObserveTyping, null, (0, _element.createElement)(_blockEditor.BlockList, null))))), (0, _element.createElement)(_components.CardFooter, null, (0, _element.createElement)(_components.CheckboxControl, {
    label: (0, _i18n.__)('Automatically add new top-level pages to this menu'),
    help: (0, _i18n.__)('New menu items will automatically appear in this menu as new top level pages are added to your site'),
    onChange: /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setAutoAddPages(!autoAddPages);
              saveMenu(_objectSpread({}, menu, {
                auto_add: !autoAddPages
              }));

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })),
    checked: autoAddPages
  }), (0, _element.createElement)(_deleteMenuButton.default, {
    menuId: menuId,
    onDelete: onDeleteMenu
  })));
}
//# sourceMappingURL=block-editor-area.js.map