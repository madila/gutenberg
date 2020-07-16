"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFeatureActive = isFeatureActive;
exports.__experimentalGetPreviewDeviceType = __experimentalGetPreviewDeviceType;
exports.getHomeTemplateId = getHomeTemplateId;
exports.getTemplateId = getTemplateId;
exports.getTemplatePartId = getTemplatePartId;
exports.getTemplateType = getTemplateType;
exports.getPage = getPage;
exports.getShowOnFront = getShowOnFront;
exports.getSettings = exports.getCanUserCreateMedia = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _lodash = require("lodash");

var _rememo = _interopRequireDefault(require("rememo"));

var _data = require("@wordpress/data");

var _mediaUtils = require("@wordpress/media-utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Returns whether the given feature is enabled or not.
 *
 * @param {Object} state   Global application state.
 * @param {string} feature Feature slug.
 *
 * @return {boolean} Is active.
 */
function isFeatureActive(state, feature) {
  return (0, _lodash.get)(state.preferences.features, [feature], false);
}
/**
 * Returns the current editing canvas device type.
 *
 * @param {Object} state Global application state.
 *
 * @return {string} Device type.
 */


function __experimentalGetPreviewDeviceType(state) {
  return state.deviceType;
}
/**
 * Returns whether the current user can create media or not.
 *
 * @param {Object} state Global application state.
 *
 * @return {Object} Whether the current user can create media or not.
 */


var getCanUserCreateMedia = (0, _data.createRegistrySelector)(function (select) {
  return function () {
    return select('core').canUser('create', 'media');
  };
});
/**
 * Returns the settings, taking into account active features and permissions.
 *
 * @param {Object}   state             Global application state.
 * @param {Function} setIsInserterOpen Setter for the open state of the global inserter.
 *
 * @return {Object} Settings.
 */

exports.getCanUserCreateMedia = getCanUserCreateMedia;
var getSettings = (0, _rememo.default)(function (state, setIsInserterOpen) {
  var settings = _objectSpread({}, state.settings, {
    focusMode: isFeatureActive(state, 'focusMode'),
    hasFixedToolbar: isFeatureActive(state, 'fixedToolbar'),
    __experimentalSetIsInserterOpened: setIsInserterOpen
  });

  var canUserCreateMedia = getCanUserCreateMedia(state);

  if (!canUserCreateMedia) {
    return settings;
  }

  settings.mediaUpload = function (_ref) {
    var _onError = _ref.onError,
        rest = (0, _objectWithoutProperties2.default)(_ref, ["onError"]);
    (0, _mediaUtils.uploadMedia)(_objectSpread({
      wpAllowedMimeTypes: state.settings.allowedMimeTypes,
      onError: function onError(_ref2) {
        var message = _ref2.message;
        return _onError(message);
      }
    }, rest));
  };

  return settings;
}, function (state) {
  return [getCanUserCreateMedia(state), state.settings, isFeatureActive(state, 'focusMode'), isFeatureActive(state, 'fixedToolbar')];
});
/**
 * Returns the current home template ID.
 *
 * @param {Object} state Global application state.
 *
 * @return {number} Home template ID.
 */

exports.getSettings = getSettings;

function getHomeTemplateId(state) {
  return state.homeTemplateId;
}
/**
 * Returns the current template ID.
 *
 * @param {Object} state Global application state.
 *
 * @return {number} Template ID.
 */


function getTemplateId(state) {
  return state.templateId;
}
/**
 * Returns the current template part ID.
 *
 * @param {Object} state Global application state.
 *
 * @return {number} Template part ID.
 */


function getTemplatePartId(state) {
  return state.templatePartId;
}
/**
 * Returns the current template type.
 *
 * @param {Object} state Global application state.
 *
 * @return {string} Template type.
 */


function getTemplateType(state) {
  return state.templateType;
}
/**
 * Returns the current page object.
 *
 * @param {Object} state Global application state.
 *
 * @return {Object} Page.
 */


function getPage(state) {
  return state.page;
}
/**
 * Returns the site's current `show_on_front` setting.
 *
 * @param {Object} state Global application state.
 *
 * @return {Object} The setting.
 */


function getShowOnFront(state) {
  return state.showOnFront;
}
//# sourceMappingURL=selectors.js.map