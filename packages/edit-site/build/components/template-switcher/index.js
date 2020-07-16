"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TemplateSwitcher;

var _element = require("@wordpress/element");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _i18n = require("@wordpress/i18n");

var _data = require("@wordpress/data");

var _components = require("@wordpress/components");

var _icons = require("@wordpress/icons");

var _utils = require("../../utils");

var _templatePreview = _interopRequireDefault(require("./template-preview"));

var _themePreview = _interopRequireDefault(require("./theme-preview"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var TEMPLATE_OVERRIDES = {
  page: function page(slug) {
    return "page-".concat(slug);
  },
  category: function category(slug) {
    return "category-".concat(slug);
  },
  post: function post(slug) {
    return "single-post-".concat(slug);
  }
};

function TemplateLabel(_ref) {
  var template = _ref.template,
      homeId = _ref.homeId;
  return (0, _element.createElement)(_element.Fragment, null, template.slug, ' ', template.id === homeId && (0, _element.createElement)(_components.Tooltip, {
    text: (0, _i18n.__)('Home')
  }, (0, _element.createElement)("div", {
    className: "edit-site-template-switcher__label-home-icon"
  }, (0, _element.createElement)(_icons.Icon, {
    icon: _icons.home
  }))), template.status !== 'auto-draft' && (0, _element.createElement)(_components.Tooltip, {
    text: (0, _i18n.__)('Customized')
  }, (0, _element.createElement)("span", {
    className: "edit-site-template-switcher__label-customized-dot"
  })));
}

function TemplateSwitcher(_ref2) {
  var page = _ref2.page,
      activeId = _ref2.activeId,
      activeTemplatePartId = _ref2.activeTemplatePartId,
      isTemplatePart = _ref2.isTemplatePart,
      onActiveIdChange = _ref2.onActiveIdChange,
      onActiveTemplatePartIdChange = _ref2.onActiveTemplatePartIdChange,
      onAddTemplate = _ref2.onAddTemplate,
      onRemoveTemplate = _ref2.onRemoveTemplate;

  var _useState = (0, _element.useState)(),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      hoveredTemplate = _useState2[0],
      setHoveredTemplate = _useState2[1];

  var _useState3 = (0, _element.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      themePreviewVisible = _useState4[0],
      setThemePreviewVisible = _useState4[1];

  var onHoverTemplatePart = function onHoverTemplatePart(id) {
    setHoveredTemplate({
      id: id,
      type: 'template-part'
    });
  };

  var onMouseEnterTheme = function onMouseEnterTheme() {
    setThemePreviewVisible(function () {
      return true;
    });
  };

  var onMouseLeaveTheme = function onMouseLeaveTheme() {
    setThemePreviewVisible(function () {
      return false;
    });
  };

  var registry = (0, _data.useRegistry)();

  var _useState5 = (0, _element.useState)(),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      homeId = _useState6[0],
      setHomeId = _useState6[1];

  (0, _element.useEffect)(function () {
    (0, _utils.findTemplate)('/', registry.__experimentalResolveSelect('core').getEntityRecords).then(function (newHomeId) {
      return setHomeId(newHomeId);
    }, function () {
      return setHomeId(null);
    });
  }, [registry]);

  var _useSelect = (0, _data.useSelect)(function (select) {
    var _select = select('core'),
        getCurrentTheme = _select.getCurrentTheme,
        getEntityRecord = _select.getEntityRecord,
        getEntityRecords = _select.getEntityRecords;

    var _template = getEntityRecord('postType', 'wp_template', activeId);

    return {
      currentTheme: getCurrentTheme(),
      template: _template,
      templateParts: _template ? getEntityRecords('postType', 'wp_template_part', {
        resolved: true,
        template: _template.slug
      }) : null
    };
  }, [activeId]),
      currentTheme = _useSelect.currentTheme,
      template = _useSelect.template,
      templateParts = _useSelect.templateParts;

  var templateItem = {
    label: template ? (0, _element.createElement)(TemplateLabel, {
      template: template,
      homeId: homeId
    }) : (0, _i18n.__)('Loading…'),
    value: activeId,
    slug: template ? template.slug : (0, _i18n.__)('Loading…'),
    content: template === null || template === void 0 ? void 0 : template.content
  };
  var templatePartItems = templateParts === null || templateParts === void 0 ? void 0 : templateParts.map(function (templatePart) {
    return {
      label: (0, _element.createElement)(TemplateLabel, {
        template: templatePart
      }),
      value: templatePart.id,
      slug: templatePart.slug
    };
  });
  var overwriteSlug = TEMPLATE_OVERRIDES[page.type] && page.slug && TEMPLATE_OVERRIDES[page.type](page.slug);

  var overwriteTemplate = function overwriteTemplate() {
    return onAddTemplate({
      slug: overwriteSlug,
      title: overwriteSlug,
      status: 'publish',
      content: templateItem.content.raw
    });
  };

  var revertToParent = /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              onRemoveTemplate(activeId);

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function revertToParent() {
      return _ref3.apply(this, arguments);
    };
  }();

  return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_components.DropdownMenu, {
    popoverProps: {
      className: 'edit-site-template-switcher__popover',
      position: 'bottom right'
    },
    icon: null,
    label: (0, _i18n.__)('Switch Template'),
    toggleProps: {
      children: (isTemplatePart ? templatePartItems : [templateItem]).find(function (choice) {
        return choice.value === (isTemplatePart ? activeTemplatePartId : activeId);
      }).slug
    }
  }, function () {
    return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_components.MenuGroup, {
      label: (0, _i18n.__)('Template')
    }, (0, _element.createElement)(_components.MenuItem, {
      onClick: function onClick() {
        return onActiveIdChange(activeId);
      }
    }, templateItem.label), overwriteSlug && overwriteSlug !== templateItem.slug && (0, _element.createElement)(_components.MenuItem, {
      icon: _icons.plus,
      onClick: overwriteTemplate
    }, (0, _i18n.__)('Overwrite Template')), overwriteSlug === templateItem.slug && (0, _element.createElement)(_components.MenuItem, {
      icon: _icons.undo,
      onClick: revertToParent
    }, (0, _i18n.__)('Revert to Parent'))), (0, _element.createElement)(_components.MenuGroup, {
      label: (0, _i18n.__)('Template Parts')
    }, (0, _element.createElement)(_components.MenuItemsChoice, {
      choices: templatePartItems,
      value: isTemplatePart ? activeTemplatePartId : undefined,
      onSelect: onActiveTemplatePartIdChange,
      onHover: onHoverTemplatePart
    })), (0, _element.createElement)(_components.MenuGroup, {
      label: (0, _i18n.__)('Current theme')
    }, (0, _element.createElement)(_components.MenuItem, {
      onMouseEnter: onMouseEnterTheme,
      onMouseLeave: onMouseLeaveTheme
    }, currentTheme.name.raw)), !!(hoveredTemplate === null || hoveredTemplate === void 0 ? void 0 : hoveredTemplate.id) && (0, _element.createElement)(_templatePreview.default, {
      item: hoveredTemplate
    }), themePreviewVisible && (0, _element.createElement)(_themePreview.default, {
      theme: currentTheme
    }), (0, _element.createElement)("div", {
      className: "edit-site-template-switcher__footer"
    }));
  }));
}
//# sourceMappingURL=index.js.map