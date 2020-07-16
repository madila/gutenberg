"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Sidebar;

var _element = require("@wordpress/element");

var _lodash = require("lodash");

var _classnames = _interopRequireDefault(require("classnames"));

var _i18n = require("@wordpress/i18n");

var _interface = require("@wordpress/interface");

var _blockEditor = require("@wordpress/block-editor");

var _icons = require("@wordpress/icons");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _blockAreas = _interopRequireDefault(require("./block-areas"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
var SIDEBAR_ACTIVE_BY_DEFAULT = _element.Platform.select({
  web: true,
  native: false
});
/**
 * Internal dependencies
 */


var CORE_WIDGET_COMPLEMENTARY_AREAS = {
  'edit-widgets/block-areas': (0, _i18n.__)('Block areas'),
  'edit-widgets/block-inspector': (0, _i18n.__)('Block')
};

function ComplementaryAreaHeader(_ref) {
  var activeComplementaryArea = _ref.activeComplementaryArea;

  var _useDispatch = (0, _data.useDispatch)('core/interface'),
      enableComplementaryArea = _useDispatch.enableComplementaryArea;

  return (0, _element.createElement)("ul", null, (0, _lodash.map)(CORE_WIDGET_COMPLEMENTARY_AREAS, function (label, identifier) {
    var isActive = identifier === activeComplementaryArea;
    return (0, _element.createElement)("li", {
      key: identifier
    }, (0, _element.createElement)(_components.Button, {
      onClick: function onClick() {
        return enableComplementaryArea('core/edit-widgets', identifier);
      },
      className: (0, _classnames.default)('edit-widgets-sidebar__panel-tab', {
        'is-active': isActive
      }),
      "aria-label": isActive ? // translators: %s: sidebar label e.g: "Block areas".
      (0, _i18n.sprintf)((0, _i18n.__)('%s (selected)'), label) : label,
      "data-label": label
    }, label));
  }));
}

function Sidebar() {
  var _useDispatch2 = (0, _data.useDispatch)('core/interface'),
      enableComplementaryArea = _useDispatch2.enableComplementaryArea;

  var _useSelect = (0, _data.useSelect)(function (select) {
    var activeArea = select('core/interface').getActiveComplementaryArea('core/edit-widgets');
    var isSidebarOpen = !!activeArea;

    var _select = select('core/block-editor'),
        getBlockSelectionStart = _select.getBlockSelectionStart,
        getBlockRootClientId = _select.getBlockRootClientId;

    var selectionStart = getBlockSelectionStart();

    if (!CORE_WIDGET_COMPLEMENTARY_AREAS[activeArea]) {
      if (!selectionStart) {
        activeArea = 'edit-widgets/block-areas';
      } else {
        activeArea = 'edit-widgets/block-inspector';
      }
    }

    return {
      currentArea: activeArea,
      hasSelectedNonAreaBlock: !!(selectionStart && getBlockRootClientId(selectionStart)),
      isGeneralSidebarOpen: isSidebarOpen
    };
  }, []),
      currentArea = _useSelect.currentArea,
      hasSelectedNonAreaBlock = _useSelect.hasSelectedNonAreaBlock,
      isGeneralSidebarOpen = _useSelect.isGeneralSidebarOpen; // currentArea, and isGeneralSidebarOpen are intentionally left out from the dependencies,
  // because we want to run the effect when a block is selected/unselected and not when the sidebar state changes.


  (0, _element.useEffect)(function () {
    if (hasSelectedNonAreaBlock && currentArea === 'edit-widgets/block-areas' && isGeneralSidebarOpen) {
      enableComplementaryArea('core/edit-widgets', 'edit-widgets/block-inspector');
    }

    if (!hasSelectedNonAreaBlock && currentArea === 'edit-widgets/block-inspector' && isGeneralSidebarOpen) {
      enableComplementaryArea('core/edit-widgets', 'edit-widgets/block-areas');
    }
  }, [hasSelectedNonAreaBlock, enableComplementaryArea]);
  return (0, _element.createElement)(_interface.ComplementaryArea, {
    className: "edit-widgets-sidebar",
    header: (0, _element.createElement)(ComplementaryAreaHeader, {
      activeComplementaryArea: currentArea
    }),
    headerClassName: "edit-widgets-sidebar__panel-tabs",
    scope: "core/edit-widgets",
    identifier: currentArea,
    icon: _icons.cog,
    isActiveByDefault: SIDEBAR_ACTIVE_BY_DEFAULT
  }, currentArea === 'edit-widgets/block-areas' && (0, _element.createElement)(_blockAreas.default, null), currentArea === 'edit-widgets/block-inspector' && (0, _element.createElement)(_blockEditor.BlockInspector, null));
}
//# sourceMappingURL=index.js.map