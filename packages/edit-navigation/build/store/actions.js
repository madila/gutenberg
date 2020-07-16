"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveNavigationPost = exports.createMissingMenuItems = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _lodash = require("lodash");

var _uuid = require("uuid");

var _i18n = require("@wordpress/i18n");

var _blocks = require("@wordpress/blocks");

var _controls = require("./controls");

var _utils = require("./utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _marked = /*#__PURE__*/_regenerator.default.mark(batchSave);

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Creates a menu item for every block that doesn't have an associated menuItem.
 * Requests POST /wp/v2/menu-items once for every menu item created.
 *
 * @param {Object} post A navigation post to process
 * @return {Function} An action creator
 */
var createMissingMenuItems = serializeProcessing( /*#__PURE__*/_regenerator.default.mark(function _callee(post) {
  var menuId, mapping, clientIdToMenuId, stack, block, menuItem, menuItems;
  return _regenerator.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          menuId = post.meta.menuId;
          _context.next = 3;
          return {
            type: 'GET_MENU_ITEM_TO_CLIENT_ID_MAPPING',
            postId: post.id
          };

        case 3:
          mapping = _context.sent;
          clientIdToMenuId = (0, _lodash.invert)(mapping);
          stack = [post.blocks[0]];

        case 6:
          if (!stack.length) {
            _context.next = 21;
            break;
          }

          block = stack.pop();

          if (block.clientId in clientIdToMenuId) {
            _context.next = 18;
            break;
          }

          _context.next = 11;
          return (0, _controls.apiFetch)({
            path: "/__experimental/menu-items",
            method: 'POST',
            data: {
              title: 'Placeholder',
              url: 'Placeholder',
              menu_order: 0
            }
          });

        case 11:
          menuItem = _context.sent;
          mapping[menuItem.id] = block.clientId;
          _context.next = 15;
          return (0, _controls.resolveMenuItems)(menuId);

        case 15:
          menuItems = _context.sent;
          _context.next = 18;
          return (0, _controls.dispatch)('core', 'receiveEntityRecords', 'root', 'menuItem', [].concat((0, _toConsumableArray2.default)(menuItems), [menuItem]), (0, _utils.menuItemsQuery)(menuId), false);

        case 18:
          stack.push.apply(stack, (0, _toConsumableArray2.default)(block.innerBlocks));
          _context.next = 6;
          break;

        case 21:
          _context.next = 23;
          return {
            type: 'SET_MENU_ITEM_TO_CLIENT_ID_MAPPING',
            postId: post.id,
            mapping: mapping
          };

        case 23:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}));
/**
 * Converts all the blocks into menu items and submits a batch request to save everything at once.
 *
 * @param {Object} post A navigation post to process
 * @return {Function} An action creator
 */

exports.createMissingMenuItems = createMissingMenuItems;
var saveNavigationPost = serializeProcessing( /*#__PURE__*/_regenerator.default.mark(function _callee2(post) {
  var menuId, menuItemsByClientId, response;
  return _regenerator.default.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          menuId = post.meta.menuId;
          _context2.t0 = mapMenuItemsByClientId;
          _context2.next = 4;
          return (0, _controls.resolveMenuItems)(menuId);

        case 4:
          _context2.t1 = _context2.sent;
          _context2.next = 7;
          return (0, _controls.getMenuItemToClientIdMapping)(post.id);

        case 7:
          _context2.t2 = _context2.sent;
          menuItemsByClientId = (0, _context2.t0)(_context2.t1, _context2.t2);
          _context2.prev = 9;
          return _context2.delegateYield(batchSave(menuId, menuItemsByClientId, post.blocks[0]), "t3", 11);

        case 11:
          response = _context2.t3;

          if (response.success) {
            _context2.next = 14;
            break;
          }

          throw new Error();

        case 14:
          _context2.next = 16;
          return (0, _controls.dispatch)('core/notices', 'createSuccessNotice', (0, _i18n.__)('Navigation saved.'), {
            type: 'snackbar'
          });

        case 16:
          _context2.next = 22;
          break;

        case 18:
          _context2.prev = 18;
          _context2.t4 = _context2["catch"](9);
          _context2.next = 22;
          return (0, _controls.dispatch)('core/notices', 'createErrorNotice', (0, _i18n.__)('There was an error.'), {
            type: 'snackbar'
          });

        case 22:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, null, [[9, 18]]);
}));
exports.saveNavigationPost = saveNavigationPost;

function mapMenuItemsByClientId(menuItems, clientIdsByMenuId) {
  var result = {};

  if (!menuItems || !clientIdsByMenuId) {
    return result;
  }

  var _iterator = _createForOfIteratorHelper(menuItems),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var menuItem = _step.value;
      var clientId = clientIdsByMenuId[menuItem.id];

      if (clientId) {
        result[clientId] = menuItem;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return result;
}

function batchSave(menuId, menuItemsByClientId, navigationBlock) {
  var _yield$apiFetch, nonce, stylesheet, body;

  return _regenerator.default.wrap(function batchSave$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _controls.apiFetch)({
            path: '/__experimental/customizer-nonces/get-save-nonce'
          });

        case 2:
          _yield$apiFetch = _context3.sent;
          nonce = _yield$apiFetch.nonce;
          stylesheet = _yield$apiFetch.stylesheet;

          if (nonce) {
            _context3.next = 7;
            break;
          }

          throw new Error();

        case 7:
          // eslint-disable-next-line no-undef
          body = new FormData();
          body.append('wp_customize', 'on');
          body.append('customize_theme', stylesheet);
          body.append('nonce', nonce);
          body.append('customize_changeset_uuid', (0, _uuid.v4)());
          body.append('customize_autosaved', 'on');
          body.append('customize_changeset_status', 'publish');
          body.append('action', 'customize_save');
          body.append('customized', computeCustomizedAttribute(navigationBlock.innerBlocks, menuId, menuItemsByClientId));
          _context3.next = 18;
          return (0, _controls.apiFetch)({
            url: '/wp-admin/admin-ajax.php',
            method: 'POST',
            body: body
          });

        case 18:
          return _context3.abrupt("return", _context3.sent);

        case 19:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked);
}

function computeCustomizedAttribute(blocks, menuId, menuItemsByClientId) {
  var blocksList = blocksTreeToFlatList(blocks);
  var dataList = blocksList.map(function (_ref) {
    var block = _ref.block,
        parentId = _ref.parentId,
        position = _ref.position;
    return blockToRequestItem(block, parentId, position);
  }); // Create an object like { "nav_menu_item[12]": {...}} }

  var computeKey = function computeKey(item) {
    return "nav_menu_item[".concat(item.id, "]");
  };

  var dataObject = (0, _lodash.keyBy)(dataList, computeKey); // Deleted menu items should be sent as false, e.g. { "nav_menu_item[13]": false }

  for (var clientId in menuItemsByClientId) {
    var key = computeKey(menuItemsByClientId[clientId]);

    if (!(key in dataObject)) {
      dataObject[key] = false;
    }
  }

  return JSON.stringify(dataObject);

  function blocksTreeToFlatList(innerBlocks) {
    var parentId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    return innerBlocks.flatMap(function (block, index) {
      var _getMenuItemForBlock;

      return [{
        block: block,
        parentId: parentId,
        position: index + 1
      }].concat(blocksTreeToFlatList(block.innerBlocks, (_getMenuItemForBlock = getMenuItemForBlock(block)) === null || _getMenuItemForBlock === void 0 ? void 0 : _getMenuItemForBlock.id));
    });
  }

  function blockToRequestItem(block, parentId, position) {
    var menuItem = (0, _lodash.omit)(getMenuItemForBlock(block), 'menus', 'meta');
    var attributes;

    if (block.name === 'core/navigation-link') {
      var _block$attributes;

      attributes = {
        type: 'custom',
        title: (_block$attributes = block.attributes) === null || _block$attributes === void 0 ? void 0 : _block$attributes.label,
        original_title: '',
        url: block.attributes.url
      };
    } else {
      attributes = {
        type: 'html',
        content: (0, _blocks.serialize)(block)
      };
    }

    return _objectSpread({}, menuItem, {}, attributes, {
      position: position,
      classes: (menuItem.classes || []).join(' '),
      xfn: (menuItem.xfn || []).join(' '),
      nav_menu_term_id: menuId,
      menu_item_parent: parentId,
      status: 'publish',
      _invalid: false
    });
  }

  function getMenuItemForBlock(block) {
    return (0, _lodash.omit)(menuItemsByClientId[block.clientId] || {}, '_links');
  }
}
/**
 * This wrapper guarantees serial execution of data processing actions.
 *
 * Examples:
 * * saveNavigationPost() needs to wait for all the missing items to be created.
 * * Concurrent createMissingMenuItems() could result in sending more requests than required.
 *
 * @param {Function} callback An action creator to wrap
 * @return {Function} Original callback wrapped in a serial execution context
 */


function serializeProcessing(callback) {
  return /*#__PURE__*/_regenerator.default.mark(function _callee3(post) {
    var postId, isProcessing, pendingActions, serializedCallback;
    return _regenerator.default.wrap(function _callee3$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            postId = post.id;
            _context4.next = 3;
            return (0, _controls.isProcessingPost)(postId);

          case 3:
            isProcessing = _context4.sent;

            if (!isProcessing) {
              _context4.next = 8;
              break;
            }

            _context4.next = 7;
            return {
              type: 'ENQUEUE_AFTER_PROCESSING',
              postId: postId,
              action: callback
            };

          case 7:
            return _context4.abrupt("return", {
              status: 'pending'
            });

          case 8:
            _context4.next = 10;
            return {
              type: 'POP_PENDING_ACTION',
              postId: postId,
              action: callback
            };

          case 10:
            _context4.next = 12;
            return {
              type: 'START_PROCESSING_POST',
              postId: postId
            };

          case 12:
            _context4.prev = 12;
            _context4.t0 = callback;
            _context4.next = 16;
            return (0, _controls.getNavigationPostForMenu)(post.meta.menuId);

          case 16:
            _context4.t1 = _context4.sent;
            return _context4.delegateYield((0, _context4.t0)(_context4.t1), "t2", 18);

          case 18:
            _context4.prev = 18;
            _context4.next = 21;
            return {
              type: 'FINISH_PROCESSING_POST',
              postId: postId,
              action: callback
            };

          case 21:
            _context4.next = 23;
            return (0, _controls.getPendingActions)(postId);

          case 23:
            pendingActions = _context4.sent;

            if (!pendingActions.length) {
              _context4.next = 27;
              break;
            }

            serializedCallback = serializeProcessing(pendingActions[0]);
            return _context4.delegateYield(serializedCallback(post), "t3", 27);

          case 27:
            return _context4.finish(18);

          case 28:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee3, null, [[12,, 18, 28]]);
  });
}
//# sourceMappingURL=actions.js.map