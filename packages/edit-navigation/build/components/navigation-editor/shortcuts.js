"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _data = require("@wordpress/data");

var _keyboardShortcuts = require("@wordpress/keyboard-shortcuts");

var _i18n = require("@wordpress/i18n");

/**
 * WordPress dependencies
 */
function NavigationEditorShortcuts(_ref) {
  var saveBlocks = _ref.saveBlocks;
  (0, _keyboardShortcuts.useShortcut)('core/edit-navigation/save-menu', (0, _element.useCallback)(function (event) {
    event.preventDefault();
    saveBlocks();
  }), {
    bindGlobal: true
  });

  var _useDispatch = (0, _data.useDispatch)('core'),
      redo = _useDispatch.redo,
      undo = _useDispatch.undo;

  (0, _keyboardShortcuts.useShortcut)('core/edit-navigation/undo', function (event) {
    undo();
    event.preventDefault();
  }, {
    bindGlobal: true
  });
  (0, _keyboardShortcuts.useShortcut)('core/edit-navigation/redo', function (event) {
    redo();
    event.preventDefault();
  }, {
    bindGlobal: true
  });
  return null;
}

function RegisterNavigationEditorShortcuts() {
  var _useDispatch2 = (0, _data.useDispatch)('core/keyboard-shortcuts'),
      registerShortcut = _useDispatch2.registerShortcut;

  (0, _element.useEffect)(function () {
    registerShortcut({
      name: 'core/edit-navigation/save-menu',
      category: 'global',
      description: (0, _i18n.__)('Save the navigation currently being edited.'),
      keyCombination: {
        modifier: 'primary',
        character: 's'
      }
    });
    registerShortcut({
      name: 'core/edit-navigation/undo',
      category: 'global',
      description: (0, _i18n.__)('Undo your last changes.'),
      keyCombination: {
        modifier: 'primary',
        character: 'z'
      }
    });
    registerShortcut({
      name: 'core/edit-navigation/redo',
      category: 'global',
      description: (0, _i18n.__)('Redo your last undo.'),
      keyCombination: {
        modifier: 'primaryShift',
        character: 'z'
      }
    });
  }, [registerShortcut]);
  return null;
}

NavigationEditorShortcuts.Register = RegisterNavigationEditorShortcuts;
var _default = NavigationEditorShortcuts;
exports.default = _default;
//# sourceMappingURL=shortcuts.js.map