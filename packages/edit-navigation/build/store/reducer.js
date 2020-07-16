"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapping = mapping;
exports.processingQueue = processingQueue;
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _data = require("@wordpress/data");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Internal to edit-navigation package.
 *
 * Stores menuItemId -> clientId mapping which is necessary for saving the navigation.
 *
 * @param {Object} state Redux state
 * @param {Object} action Redux action
 * @return {Object} Updated state
 */
function mapping(state, action) {
  var type = action.type,
      postId = action.postId,
      rest = (0, _objectWithoutProperties2.default)(action, ["type", "postId"]);

  if (type === 'SET_MENU_ITEM_TO_CLIENT_ID_MAPPING') {
    return _objectSpread({}, state, (0, _defineProperty2.default)({}, postId, rest.mapping));
  }

  return state || {};
}
/**
 * Internal to edit-navigation package.
 *
 * Enables serializeProcessing action wrapper by storing the underlying execution
 * state and any pending actions.
 *
 * @param {Object} state Redux state
 * @param {Object} action Redux action
 * @return {Object} Updated state
 */


function processingQueue(state, action) {
  var _state$postId;

  var type = action.type,
      postId = action.postId,
      rest = (0, _objectWithoutProperties2.default)(action, ["type", "postId"]);

  switch (type) {
    case 'START_PROCESSING_POST':
      return _objectSpread({}, state, (0, _defineProperty2.default)({}, postId, _objectSpread({}, state[postId], {
        inProgress: true
      })));

    case 'FINISH_PROCESSING_POST':
      return _objectSpread({}, state, (0, _defineProperty2.default)({}, postId, _objectSpread({}, state[postId], {
        inProgress: false
      })));

    case 'POP_PENDING_ACTION':
      var postState = _objectSpread({}, state[postId]);

      if ('pendingActions' in postState) {
        var _postState$pendingAct;

        postState.pendingActions = (_postState$pendingAct = postState.pendingActions) === null || _postState$pendingAct === void 0 ? void 0 : _postState$pendingAct.filter(function (item) {
          return item !== rest.action;
        });
      }

      return _objectSpread({}, state, (0, _defineProperty2.default)({}, postId, postState));

    case 'ENQUEUE_AFTER_PROCESSING':
      var pendingActions = ((_state$postId = state[postId]) === null || _state$postId === void 0 ? void 0 : _state$postId.pendingActions) || [];

      if (!pendingActions.includes(rest.action)) {
        return _objectSpread({}, state, (0, _defineProperty2.default)({}, postId, _objectSpread({}, state[postId], {
          pendingActions: [].concat((0, _toConsumableArray2.default)(pendingActions), [rest.action])
        })));
      }

      break;
  }

  return state || {};
}

var _default = (0, _data.combineReducers)({
  mapping: mapping,
  processingQueue: processingQueue
});

exports.default = _default;
//# sourceMappingURL=reducer.js.map