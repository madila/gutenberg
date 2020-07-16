"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.singleEnableItems = singleEnableItems;
exports.multipleEnableItems = multipleEnableItems;
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _lodash = require("lodash");

var _data = require("@wordpress/data");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Reducer to keep tract of the active area per scope.
 *
 * @param {boolean} state           Previous state.
 * @param {Object}  action          Action object.
 * @param {string}  action.type     Action type.
 * @param {string}  action.itemType Type of item.
 * @param {string}  action.scope    Item scope.
 * @param {string}  action.item     Item name.
 *
 * @return {Object} Updated state.
 */
function singleEnableItems() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _ref = arguments.length > 1 ? arguments[1] : undefined,
      type = _ref.type,
      itemType = _ref.itemType,
      scope = _ref.scope,
      item = _ref.item;

  if (type !== 'SET_SINGLE_ENABLE_ITEM' || !itemType || !scope) {
    return state;
  }

  return _objectSpread({}, state, (0, _defineProperty2.default)({}, itemType, _objectSpread({}, state[itemType], (0, _defineProperty2.default)({}, scope, item || null))));
}
/**
 * Reducer keeping track of the "pinned" items per scope.
 *
 * @param {boolean} state           Previous state.
 * @param {Object}  action          Action object.
 * @param {string}  action.type     Action type.
 * @param {string}  action.itemType Type of item.
 * @param {string}  action.scope    Item scope.
 * @param {string}  action.item     Item name.
 * @param {boolean} action.isEnable Whether the item is pinned.
 *
 * @return {Object} Updated state.
 */


function multipleEnableItems() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _ref2 = arguments.length > 1 ? arguments[1] : undefined,
      type = _ref2.type,
      itemType = _ref2.itemType,
      scope = _ref2.scope,
      item = _ref2.item,
      isEnable = _ref2.isEnable;

  if (type !== 'SET_MULTIPLE_ENABLE_ITEM' || !itemType || !scope || !item || (0, _lodash.get)(state, [itemType, scope, item]) === isEnable) {
    return state;
  }

  var currentTypeState = state[itemType] || {};
  var currentScopeState = currentTypeState[scope] || {};
  return _objectSpread({}, state, (0, _defineProperty2.default)({}, itemType, _objectSpread({}, currentTypeState, (0, _defineProperty2.default)({}, scope, _objectSpread({}, currentScopeState, (0, _defineProperty2.default)({}, item, isEnable || false))))));
}

var enableItems = (0, _data.combineReducers)({
  singleEnableItems: singleEnableItems,
  multipleEnableItems: multipleEnableItems
});

var _default = (0, _data.combineReducers)({
  enableItems: enableItems
});

exports.default = _default;
//# sourceMappingURL=reducer.js.map