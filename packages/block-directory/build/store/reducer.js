"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.errorNotices = exports.blockManagement = exports.downloadableBlocks = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _lodash = require("lodash");

var _data = require("@wordpress/data");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Reducer returning an array of downloadable blocks.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */
var downloadableBlocks = function downloadableBlocks() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'FETCH_DOWNLOADABLE_BLOCKS':
      return _objectSpread({}, state, (0, _defineProperty2.default)({}, action.filterValue, {
        isRequesting: true
      }));

    case 'RECEIVE_DOWNLOADABLE_BLOCKS':
      return _objectSpread({}, state, (0, _defineProperty2.default)({}, action.filterValue, {
        results: action.downloadableBlocks,
        isRequesting: false
      }));
  }

  return state;
};
/**
 * Reducer managing the installation and deletion of blocks.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */


exports.downloadableBlocks = downloadableBlocks;

var blockManagement = function blockManagement() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    installedBlockTypes: [],
    isInstalling: {}
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'ADD_INSTALLED_BLOCK_TYPE':
      return _objectSpread({}, state, {
        installedBlockTypes: [].concat((0, _toConsumableArray2.default)(state.installedBlockTypes), [action.item])
      });

    case 'REMOVE_INSTALLED_BLOCK_TYPE':
      return _objectSpread({}, state, {
        installedBlockTypes: state.installedBlockTypes.filter(function (blockType) {
          return blockType.name !== action.item.name;
        })
      });

    case 'SET_INSTALLING_BLOCK':
      return _objectSpread({}, state, {
        isInstalling: _objectSpread({}, state.isInstalling, (0, _defineProperty2.default)({}, action.blockId, action.isInstalling))
      });
  }

  return state;
};
/**
 * Reducer returning an object of error notices.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */


exports.blockManagement = blockManagement;

var errorNotices = function errorNotices() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'SET_ERROR_NOTICE':
      return _objectSpread({}, state, (0, _defineProperty2.default)({}, action.blockId, {
        message: action.message,
        isFatal: action.isFatal
      }));

    case 'CLEAR_ERROR_NOTICE':
      return (0, _lodash.omit)(state, action.blockId);
  }

  return state;
};

exports.errorNotices = errorNotices;

var _default = (0, _data.combineReducers)({
  downloadableBlocks: downloadableBlocks,
  blockManagement: blockManagement,
  errorNotices: errorNotices
});

exports.default = _default;
//# sourceMappingURL=reducer.js.map