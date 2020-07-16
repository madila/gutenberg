"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TemplatePartPlaceholder;

var _element = require("@wordpress/element");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _i18n = require("@wordpress/i18n");

var _data = require("@wordpress/data");

var _url = require("@wordpress/url");

var _components = require("@wordpress/components");

var _icons = require("@wordpress/icons");

var _blockEditor = require("@wordpress/block-editor");

var _templatePartPreviews = _interopRequireDefault(require("./template-part-previews"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function TemplatePartPlaceholder(_ref) {
  var setAttributes = _ref.setAttributes;

  var _useDispatch = (0, _data.useDispatch)('core'),
      saveEntityRecord = _useDispatch.saveEntityRecord;

  var onCreate = (0, _element.useCallback)( /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    var title, slug, templatePart;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            title = 'Untitled Template Part';
            slug = (0, _url.cleanForSlug)(title);
            _context.next = 4;
            return saveEntityRecord('postType', 'wp_template_part', {
              title: title,
              status: 'publish',
              slug: slug,
              meta: {
                theme: 'custom'
              }
            });

          case 4:
            templatePart = _context.sent;
            setAttributes({
              postId: templatePart.id,
              slug: templatePart.slug,
              theme: templatePart.meta.theme
            });

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })), [setAttributes]);

  var _useState = (0, _element.useState)(''),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      filterValue = _useState2[0],
      setFilterValue = _useState2[1];

  return (0, _element.createElement)(_components.Placeholder, {
    icon: _icons.blockDefault,
    label: (0, _i18n.__)('Template Part'),
    instructions: (0, _i18n.__)('Create a new template part or pick an existing one from the list.')
  }, (0, _element.createElement)(_components.Dropdown, {
    contentClassName: "wp-block-template-part__placeholder-preview-dropdown-content",
    position: "bottom right left",
    renderToggle: function renderToggle(_ref3) {
      var isOpen = _ref3.isOpen,
          onToggle = _ref3.onToggle;
      return (0, _element.createElement)(_components.ButtonGroup, null, (0, _element.createElement)(_components.Button, {
        isPrimary: true,
        onClick: onToggle,
        "aria-expanded": isOpen
      }, (0, _i18n.__)('Choose existing')), (0, _element.createElement)(_components.Button, {
        onClick: onCreate
      }, (0, _i18n.__)('New template part')));
    },
    renderContent: function renderContent() {
      return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_blockEditor.__experimentalSearchForm, {
        onChange: setFilterValue,
        className: "wp-block-template-part__placeholder-preview-search-form"
      }), (0, _element.createElement)("div", {
        className: "wp-block-template-part__placeholder-preview-container"
      }, (0, _element.createElement)(_templatePartPreviews.default, {
        setAttributes: setAttributes,
        filterValue: filterValue
      })));
    }
  }));
}
//# sourceMappingURL=index.js.map