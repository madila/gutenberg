"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _data = require("@wordpress/data");

var _components = require("@wordpress/components");

var _coreData = require("@wordpress/core-data");

var _blockEditor = require("@wordpress/block-editor");

var _compose = require("@wordpress/compose");

var _interface = require("@wordpress/interface");

var _editor = require("@wordpress/editor");

var _i18n = require("@wordpress/i18n");

var _plugins = require("@wordpress/plugins");

var _icons = require("@wordpress/icons");

var _notices = _interopRequireDefault(require("../notices"));

var _header = _interopRequireDefault(require("../header"));

var _sidebar = require("../sidebar");

var _blockEditor2 = _interopRequireDefault(require("../block-editor"));

var _keyboardShortcuts = _interopRequireDefault(require("../keyboard-shortcuts"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var interfaceLabels = {
  leftSidebar: (0, _i18n.__)('Block Library')
};

function Editor() {
  var _useState = (0, _element.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      isInserterOpen = _useState2[0],
      setIsInserterOpen = _useState2[1];

  var isMobile = (0, _compose.useViewportMatch)('medium', '<');

  var _useSelect = (0, _data.useSelect)(function (_select) {
    var _select2 = _select('core/edit-site'),
        isFeatureActive = _select2.isFeatureActive,
        __experimentalGetPreviewDeviceType = _select2.__experimentalGetPreviewDeviceType,
        getSettings = _select2.getSettings,
        getTemplateId = _select2.getTemplateId,
        getTemplatePartId = _select2.getTemplatePartId,
        getTemplateType = _select2.getTemplateType,
        getPage = _select2.getPage;

    var _templateId = getTemplateId();

    var _templatePartId = getTemplatePartId();

    var _templateType = getTemplateType();

    return {
      isFullscreenActive: isFeatureActive('fullscreenMode'),
      deviceType: __experimentalGetPreviewDeviceType(),
      sidebarIsOpened: !!_select('core/interface').getActiveComplementaryArea('core/edit-site'),
      settings: getSettings(),
      templateId: _templateId,
      templatePartId: _templatePartId,
      templateType: _templateType,
      page: getPage(),
      template: _select('core').getEntityRecord('postType', _templateType, _templateType === 'wp_template' ? _templateId : _templatePartId),
      select: _select
    };
  }, []),
      isFullscreenActive = _useSelect.isFullscreenActive,
      deviceType = _useSelect.deviceType,
      sidebarIsOpened = _useSelect.sidebarIsOpened,
      settings = _useSelect.settings,
      templateId = _useSelect.templateId,
      templatePartId = _useSelect.templatePartId,
      templateType = _useSelect.templateType,
      page = _useSelect.page,
      template = _useSelect.template,
      select = _useSelect.select;

  var _useDispatch = (0, _data.useDispatch)('core'),
      editEntityRecord = _useDispatch.editEntityRecord;

  var _useDispatch2 = (0, _data.useDispatch)('core/edit-site'),
      setPage = _useDispatch2.setPage;

  var inlineStyles = (0, _blockEditor.__experimentalUseResizeCanvas)(deviceType);

  var _useState3 = (0, _element.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      isEntitiesSavedStatesOpen = _useState4[0],
      setIsEntitiesSavedStatesOpen = _useState4[1];

  var openEntitiesSavedStates = (0, _element.useCallback)(function () {
    return setIsEntitiesSavedStatesOpen(true);
  }, []);
  var closeEntitiesSavedStates = (0, _element.useCallback)(function (entitiesToSave) {
    if (entitiesToSave) {
      var _select3 = select('core'),
          getEditedEntityRecord = _select3.getEditedEntityRecord;

      entitiesToSave.forEach(function (_ref) {
        var kind = _ref.kind,
            name = _ref.name,
            key = _ref.key;
        var record = getEditedEntityRecord(kind, name, key);
        editEntityRecord(kind, name, key, {
          status: 'publish',
          title: record.slug
        });
      });
    }

    setIsEntitiesSavedStatesOpen(false);
  }, [select]); // Set default query for misplaced Query Loop blocks, and
  // provide the root `queryContext` for top-level Query Loop
  // and Query Pagination blocks.

  var blockContext = (0, _element.useMemo)(function () {
    return _objectSpread({}, page.context, {
      query: page.context.query || {
        categoryIds: []
      },
      queryContext: [page.context.queryContext || {
        page: 1
      }, function (newQueryContext) {
        return setPage(_objectSpread({}, page, {
          context: _objectSpread({}, page.context, {
            queryContext: _objectSpread({}, page.context.queryContext, {}, newQueryContext)
          })
        }));
      }]
    });
  }, [page.context]);
  return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_blockEditor.__unstableEditorStyles, {
    styles: settings.styles
  }), (0, _element.createElement)(_interface.FullscreenMode, {
    isActive: isFullscreenActive
  }), (0, _element.createElement)(_components.SlotFillProvider, null, (0, _element.createElement)(_components.DropZoneProvider, null, (0, _element.createElement)(_coreData.EntityProvider, {
    kind: "root",
    type: "site"
  }, (0, _element.createElement)(_coreData.EntityProvider, {
    kind: "postType",
    type: templateType,
    id: templateType === 'wp_template' ? templateId : templatePartId
  }, (0, _element.createElement)(_blockEditor.BlockContextProvider, {
    value: blockContext
  }, (0, _element.createElement)(_components.FocusReturnProvider, null, (0, _element.createElement)(_keyboardShortcuts.default.Register, null), (0, _element.createElement)(_sidebar.SidebarComplementaryAreaFills, null), (0, _element.createElement)(_interface.InterfaceSkeleton, {
    labels: interfaceLabels,
    leftSidebar: isInserterOpen && (0, _element.createElement)("div", {
      className: "edit-site-editor__inserter-panel"
    }, (0, _element.createElement)("div", {
      className: "edit-site-editor__inserter-panel-header"
    }, (0, _element.createElement)(_components.Button, {
      icon: _icons.close,
      onClick: function onClick() {
        return setIsInserterOpen(false);
      }
    })), (0, _element.createElement)("div", {
      className: "edit-site-editor__inserter-panel-content"
    }, (0, _element.createElement)(_blockEditor.__experimentalLibrary, {
      showInserterHelpPanel: true,
      onSelect: function onSelect() {
        if (isMobile) {
          setIsInserterOpen(false);
        }
      }
    }))),
    sidebar: sidebarIsOpened && (0, _element.createElement)(_interface.ComplementaryArea.Slot, {
      scope: "core/edit-site"
    }),
    header: (0, _element.createElement)(_header.default, {
      openEntitiesSavedStates: openEntitiesSavedStates,
      isInserterOpen: isInserterOpen,
      onToggleInserter: function onToggleInserter() {
        return setIsInserterOpen(!isInserterOpen);
      }
    }),
    content: (0, _element.createElement)(_blockEditor.BlockSelectionClearer, {
      className: "edit-site-visual-editor",
      style: inlineStyles
    }, (0, _element.createElement)(_notices.default, null), (0, _element.createElement)(_components.Popover.Slot, {
      name: "block-toolbar"
    }), template && (0, _element.createElement)(_blockEditor2.default, {
      setIsInserterOpen: setIsInserterOpen
    }), (0, _element.createElement)(_keyboardShortcuts.default, null)),
    actions: (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_editor.EntitiesSavedStates, {
      isOpen: isEntitiesSavedStatesOpen,
      close: closeEntitiesSavedStates
    }), !isEntitiesSavedStatesOpen && (0, _element.createElement)("div", {
      className: "edit-site-editor__toggle-save-panel"
    }, (0, _element.createElement)(_components.Button, {
      isSecondary: true,
      className: "edit-site-editor__toggle-save-panel-button",
      onClick: openEntitiesSavedStates,
      "aria-expanded": false
    }, (0, _i18n.__)('Open save panel')))),
    footer: (0, _element.createElement)(_blockEditor.BlockBreadcrumb, null)
  }), (0, _element.createElement)(_components.Popover.Slot, null), (0, _element.createElement)(_plugins.PluginArea, null))))))));
}

var _default = Editor;
exports.default = _default;
//# sourceMappingURL=index.js.map