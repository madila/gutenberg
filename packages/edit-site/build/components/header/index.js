"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Header;

var _element = require("@wordpress/element");

var _compose = require("@wordpress/compose");

var _blockEditor = require("@wordpress/block-editor");

var _data = require("@wordpress/data");

var _interface = require("@wordpress/interface");

var _i18n = require("@wordpress/i18n");

var _icons = require("@wordpress/icons");

var _components = require("@wordpress/components");

var _moreMenu = _interopRequireDefault(require("./more-menu"));

var _pageSwitcher = _interopRequireDefault(require("../page-switcher"));

var _templateSwitcher = _interopRequireDefault(require("../template-switcher"));

var _saveButton = _interopRequireDefault(require("../save-button"));

var _undo = _interopRequireDefault(require("./undo-redo/undo"));

var _redo = _interopRequireDefault(require("./undo-redo/redo"));

var _fullscreenModeClose = _interopRequireDefault(require("./fullscreen-mode-close"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function Header(_ref) {
  var openEntitiesSavedStates = _ref.openEntitiesSavedStates,
      isInserterOpen = _ref.isInserterOpen,
      onToggleInserter = _ref.onToggleInserter;

  var _useSelect = (0, _data.useSelect)(function (select) {
    var _select = select('core/edit-site'),
        __experimentalGetPreviewDeviceType = _select.__experimentalGetPreviewDeviceType,
        isFeatureActive = _select.isFeatureActive,
        getTemplateId = _select.getTemplateId,
        getTemplatePartId = _select.getTemplatePartId,
        getTemplateType = _select.getTemplateType,
        getPage = _select.getPage,
        getShowOnFront = _select.getShowOnFront;

    return {
      deviceType: __experimentalGetPreviewDeviceType(),
      hasFixedToolbar: isFeatureActive('fixedToolbar'),
      templateId: getTemplateId(),
      templatePartId: getTemplatePartId(),
      templateType: getTemplateType(),
      page: getPage(),
      showOnFront: getShowOnFront()
    };
  }, []),
      deviceType = _useSelect.deviceType,
      hasFixedToolbar = _useSelect.hasFixedToolbar,
      templateId = _useSelect.templateId,
      templatePartId = _useSelect.templatePartId,
      templateType = _useSelect.templateType,
      page = _useSelect.page,
      showOnFront = _useSelect.showOnFront;

  var _useDispatch = (0, _data.useDispatch)('core/edit-site'),
      setPreviewDeviceType = _useDispatch.__experimentalSetPreviewDeviceType,
      setTemplate = _useDispatch.setTemplate,
      addTemplate = _useDispatch.addTemplate,
      removeTemplate = _useDispatch.removeTemplate,
      setTemplatePart = _useDispatch.setTemplatePart,
      setPage = _useDispatch.setPage;

  var isLargeViewport = (0, _compose.useViewportMatch)('medium');
  var displayBlockToolbar = !isLargeViewport || deviceType !== 'Desktop' || hasFixedToolbar;
  return (0, _element.createElement)("div", {
    className: "edit-site-header"
  }, (0, _element.createElement)(_interface.__experimentalMainDashboardButton.Slot, null, (0, _element.createElement)(_fullscreenModeClose.default, null)), (0, _element.createElement)("div", {
    className: "edit-site-header__toolbar"
  }, (0, _element.createElement)(_components.Button, {
    isPrimary: true,
    isPressed: isInserterOpen,
    onClick: onToggleInserter,
    icon: _icons.plus,
    label: (0, _i18n._x)('Add block', 'Generic label for block inserter button')
  }), (0, _element.createElement)(_blockEditor.ToolSelector, null), (0, _element.createElement)(_undo.default, null), (0, _element.createElement)(_redo.default, null), (0, _element.createElement)(_blockEditor.BlockNavigationDropdown, null), displayBlockToolbar && (0, _element.createElement)("div", {
    className: "edit-site-header-toolbar__block-toolbar"
  }, (0, _element.createElement)(_blockEditor.BlockToolbar, {
    hideDragHandle: true
  })), (0, _element.createElement)("div", {
    className: "edit-site-header__toolbar-switchers"
  }, (0, _element.createElement)(_pageSwitcher.default, {
    showOnFront: showOnFront,
    activePage: page,
    onActivePageChange: setPage
  }), (0, _element.createElement)("div", {
    className: "edit-site-header__toolbar-switchers-separator"
  }, "/"), (0, _element.createElement)(_templateSwitcher.default, {
    page: page,
    activeId: templateId,
    activeTemplatePartId: templatePartId,
    isTemplatePart: templateType === 'wp_template_part',
    onActiveIdChange: setTemplate,
    onActiveTemplatePartIdChange: setTemplatePart,
    onAddTemplate: addTemplate,
    onRemoveTemplate: removeTemplate
  }))), (0, _element.createElement)("div", {
    className: "edit-site-header__actions"
  }, (0, _element.createElement)(_blockEditor.__experimentalPreviewOptions, {
    deviceType: deviceType,
    setDeviceType: setPreviewDeviceType
  }), (0, _element.createElement)(_saveButton.default, {
    openEntitiesSavedStates: openEntitiesSavedStates
  }), (0, _element.createElement)(_interface.PinnedItems.Slot, {
    scope: "core/edit-site"
  }), (0, _element.createElement)(_moreMenu.default, null)));
}
//# sourceMappingURL=index.js.map