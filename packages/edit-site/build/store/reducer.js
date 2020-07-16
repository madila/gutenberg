"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deviceType = deviceType;
exports.settings = settings;
exports.homeTemplateId = homeTemplateId;
exports.templateId = templateId;
exports.templatePartId = templatePartId;
exports.templateType = templateType;
exports.page = page;
exports.showOnFront = showOnFront;
exports.default = exports.preferences = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _lodash = require("lodash");

var _data = require("@wordpress/data");

var _defaults = require("./defaults");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Higher-order reducer creator which provides the given initial state for the
 * original reducer.
 *
 * @param {*} initialState Initial state to provide to reducer.
 *
 * @return {Function} Higher-order reducer.
 */
var createWithInitialState = function createWithInitialState(initialState) {
  return function (reducer) {
    return function () {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
      var action = arguments.length > 1 ? arguments[1] : undefined;
      return reducer(state, action);
    };
  };
};
/**
 * Reducer returning the user preferences.
 *
 * @param {Object}  state Current state.
 *
 * @return {Object} Updated state.
 */


var preferences = (0, _lodash.flow)([_data.combineReducers, createWithInitialState(_defaults.PREFERENCES_DEFAULTS)])({
  features: function features(state, action) {
    if (action.type === 'TOGGLE_FEATURE') {
      return _objectSpread({}, state, (0, _defineProperty2.default)({}, action.feature, !state[action.feature]));
    }

    return state;
  }
});
/**
 * Reducer returning the editing canvas device type.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */

exports.preferences = preferences;

function deviceType() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Desktop';
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'SET_PREVIEW_DEVICE_TYPE':
      return action.deviceType;
  }

  return state;
}
/**
 * Reducer returning the settings.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */


function settings() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'UPDATE_SETTINGS':
      return _objectSpread({}, state, {}, action.settings);
  }

  return state;
}
/**
 * Reducer returning the home template ID.
 *
 * @param {Object} state Current state.
 *
 * @return {Object} Updated state.
 */


function homeTemplateId(state) {
  return state;
}
/**
 * Reducer returning the template ID.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */


function templateId(state, action) {
  switch (action.type) {
    case 'SET_TEMPLATE':
    case 'SET_PAGE':
      return action.templateId;
  }

  return state;
}
/**
 * Reducer returning the template part ID.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */


function templatePartId(state, action) {
  switch (action.type) {
    case 'SET_TEMPLATE_PART':
      return action.templatePartId;
  }

  return state;
}
/**
 * Reducer returning the template type.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */


function templateType(state, action) {
  switch (action.type) {
    case 'SET_TEMPLATE':
    case 'SET_PAGE':
      return 'wp_template';

    case 'SET_TEMPLATE_PART':
      return 'wp_template_part';
  }

  return state;
}
/**
 * Reducer returning the page being edited.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */


function page() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'SET_PAGE':
      return action.page;
  }

  return state;
}
/**
 * Reducer returning the site's `show_on_front` setting.
 *
 * @param {Object} state Current state.
 *
 * @return {Object} Updated state.
 */


function showOnFront(state) {
  return state;
}

var _default = (0, _data.combineReducers)({
  preferences: preferences,
  deviceType: deviceType,
  settings: settings,
  homeTemplateId: homeTemplateId,
  templateId: templateId,
  templatePartId: templatePartId,
  templateType: templateType,
  page: page,
  showOnFront: showOnFront
});

exports.default = _default;
//# sourceMappingURL=reducer.js.map