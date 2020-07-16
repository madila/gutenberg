"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleFeature = toggleFeature;
exports.__experimentalSetPreviewDeviceType = __experimentalSetPreviewDeviceType;
exports.setTemplate = setTemplate;
exports.addTemplate = addTemplate;
exports.removeTemplate = removeTemplate;
exports.setTemplatePart = setTemplatePart;
exports.setPage = setPage;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _dataControls = require("@wordpress/data-controls");

var _controls = require("./controls");

var _marked = /*#__PURE__*/_regenerator.default.mark(addTemplate),
    _marked2 = /*#__PURE__*/_regenerator.default.mark(removeTemplate),
    _marked3 = /*#__PURE__*/_regenerator.default.mark(setPage);

/**
 * Returns an action object used to toggle a feature flag.
 *
 * @param {string} feature Feature name.
 *
 * @return {Object} Action object.
 */
function toggleFeature(feature) {
  return {
    type: 'TOGGLE_FEATURE',
    feature: feature
  };
}
/**
 * Returns an action object used to toggle the width of the editing canvas.
 *
 * @param {string} deviceType
 *
 * @return {Object} Action object.
 */


function __experimentalSetPreviewDeviceType(deviceType) {
  return {
    type: 'SET_PREVIEW_DEVICE_TYPE',
    deviceType: deviceType
  };
}
/**
 * Returns an action object used to set a template.
 *
 * @param {number} templateId The template ID.
 *
 * @return {Object} Action object.
 */


function setTemplate(templateId) {
  return {
    type: 'SET_TEMPLATE',
    templateId: templateId
  };
}
/**
 * Adds a new template, and sets it as the current template.
 *
 * @param {Object} template The template.
 *
 * @return {Object} Action object used to set the current template.
 */


function addTemplate(template) {
  var newTemplate;
  return _regenerator.default.wrap(function addTemplate$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _dataControls.dispatch)('core', 'saveEntityRecord', 'postType', 'wp_template', template);

        case 2:
          newTemplate = _context.sent;
          return _context.abrupt("return", {
            type: 'SET_TEMPLATE',
            templateId: newTemplate.id
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}
/**
 * Removes a template, and updates the current page and template.
 *
 * @param {number} templateId The template ID.
 *
 * @return {Object} Action object used to set the current page and template.
 */


function removeTemplate(templateId) {
  return _regenerator.default.wrap(function removeTemplate$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _dataControls.apiFetch)({
            path: "/wp/v2/templates/".concat(templateId),
            method: 'DELETE'
          });

        case 2:
          _context2.t0 = _dataControls.dispatch;
          _context2.next = 5;
          return (0, _dataControls.select)('core/edit-site', 'getPage');

        case 5:
          _context2.t1 = _context2.sent;
          return _context2.abrupt("return", (0, _context2.t0)('core/edit-site', 'setPage', _context2.t1));

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2);
}
/**
 * Returns an action object used to set a template part.
 *
 * @param {number} templatePartId The template part ID.
 *
 * @return {Object} Action object.
 */


function setTemplatePart(templatePartId) {
  return {
    type: 'SET_TEMPLATE_PART',
    templatePartId: templatePartId
  };
}
/**
 * Resolves the template for a page and sets them.
 *
 * @param {Object} page         The page object.
 * @param {string} page.type    The page type.
 * @param {string} page.slug    The page slug.
 * @param {string} page.path    The page path.
 * @param {Object} page.context The page context.
 *
 * @return {Object} Action object.
 */


function setPage(page) {
  var templateId;
  return _regenerator.default.wrap(function setPage$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _controls.findTemplate)(page.path);

        case 2:
          templateId = _context3.sent;
          return _context3.abrupt("return", {
            type: 'SET_PAGE',
            page: page,
            templateId: templateId
          });

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3);
}
//# sourceMappingURL=actions.js.map