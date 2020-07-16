"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiFetch = apiFetch;
exports.getPendingActions = getPendingActions;
exports.isProcessingPost = isProcessingPost;
exports.getMenuItemToClientIdMapping = getMenuItemToClientIdMapping;
exports.getNavigationPostForMenu = getNavigationPostForMenu;
exports.resolveMenuItems = resolveMenuItems;
exports.select = select;
exports.dispatch = dispatch;
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _apiFetch = _interopRequireDefault(require("@wordpress/api-fetch"));

var _data = require("@wordpress/data");

var _utils = require("./utils");

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Trigger an API Fetch request.
 *
 * @param {Object} request API Fetch Request Object.
 * @return {Object} control descriptor.
 */
function apiFetch(request) {
  return {
    type: 'API_FETCH',
    request: request
  };
}
/**
 * Returns a list of pending actions for given post id.
 *
 * @param {number} postId Post ID.
 * @return {Array} List of pending actions.
 */


function getPendingActions(postId) {
  return {
    type: 'GET_PENDING_ACTIONS',
    postId: postId
  };
}
/**
 * Returns boolean indicating whether or not an action processing specified
 * post is currently running.
 *
 * @param {number} postId Post ID.
 * @return {Object} Action.
 */


function isProcessingPost(postId) {
  return {
    type: 'IS_PROCESSING_POST',
    postId: postId
  };
}
/**
 * Selects menuItemId -> clientId mapping (necessary for saving the navigation).
 *
 * @param {number} postId Navigation post ID.
 * @return {Object} Action.
 */


function getMenuItemToClientIdMapping(postId) {
  return {
    type: 'GET_MENU_ITEM_TO_CLIENT_ID_MAPPING',
    postId: postId
  };
}
/**
 * Resolves navigation post for given menuId.
 *
 * @see selectors.js
 * @param {number} menuId Menu ID.
 * @return {Object} Action.
 */


function getNavigationPostForMenu(menuId) {
  return {
    type: 'SELECT',
    registryName: 'core/edit-navigation',
    selectorName: 'getNavigationPostForMenu',
    args: [menuId]
  };
}
/**
 * Resolves menu items for given menu id.
 *
 * @param {number} menuId Menu ID.
 * @return {Object} Action.
 */


function resolveMenuItems(menuId) {
  return {
    type: 'RESOLVE_MENU_ITEMS',
    query: (0, _utils.menuItemsQuery)(menuId)
  };
}
/**
 * Calls a selector using chosen registry.
 *
 * @param {string} registryName Registry name.
 * @param {string} selectorName Selector name.
 * @param {Array} args          Selector arguments.
 * @return {Object} control descriptor.
 */


function select(registryName, selectorName) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  return {
    type: 'SELECT',
    registryName: registryName,
    selectorName: selectorName,
    args: args
  };
}
/**
 * Dispatches an action using chosen registry.
 *
 * @param {string} registryName Registry name.
 * @param {string} actionName   Action name.
 * @param {Array} args          Selector arguments.
 * @return {Object} control descriptor.
 */


function dispatch(registryName, actionName) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    args[_key2 - 2] = arguments[_key2];
  }

  return {
    type: 'DISPATCH',
    registryName: registryName,
    actionName: actionName,
    args: args
  };
}

var controls = {
  API_FETCH: function API_FETCH(_ref) {
    var request = _ref.request;
    return (0, _apiFetch.default)(request);
  },
  SELECT: (0, _data.createRegistryControl)(function (registry) {
    return function (_ref2) {
      var _registry$select;

      var registryName = _ref2.registryName,
          selectorName = _ref2.selectorName,
          args = _ref2.args;
      return (_registry$select = registry.select(registryName))[selectorName].apply(_registry$select, (0, _toConsumableArray2.default)(args));
    };
  }),
  GET_PENDING_ACTIONS: (0, _data.createRegistryControl)(function (registry) {
    return function (_ref3) {
      var _getState$processingQ;

      var postId = _ref3.postId;
      return ((_getState$processingQ = getState(registry).processingQueue[postId]) === null || _getState$processingQ === void 0 ? void 0 : _getState$processingQ.pendingActions) || [];
    };
  }),
  IS_PROCESSING_POST: (0, _data.createRegistryControl)(function (registry) {
    return function (_ref4) {
      var _getState$processingQ2;

      var postId = _ref4.postId;
      return (_getState$processingQ2 = getState(registry).processingQueue[postId]) === null || _getState$processingQ2 === void 0 ? void 0 : _getState$processingQ2.inProgress;
    };
  }),
  GET_MENU_ITEM_TO_CLIENT_ID_MAPPING: (0, _data.createRegistryControl)(function (registry) {
    return function (_ref5) {
      var postId = _ref5.postId;
      return getState(registry).mapping[postId] || {};
    };
  }),
  DISPATCH: (0, _data.createRegistryControl)(function (registry) {
    return function (_ref6) {
      var _registry$dispatch;

      var registryName = _ref6.registryName,
          actionName = _ref6.actionName,
          args = _ref6.args;
      return (_registry$dispatch = registry.dispatch(registryName))[actionName].apply(_registry$dispatch, (0, _toConsumableArray2.default)(args));
    };
  }),
  RESOLVE_MENU_ITEMS: (0, _data.createRegistryControl)(function (registry) {
    return function (_ref7) {
      var query = _ref7.query;
      return registry.__experimentalResolveSelect('core').getMenuItems(query);
    };
  })
};

var getState = function getState(registry) {
  return registry.stores['core/edit-navigation'].store.getState();
};

var _default = controls;
exports.default = _default;
//# sourceMappingURL=controls.js.map