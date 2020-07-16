"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNavigationPostForMenu = getNavigationPostForMenu;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _lodash = require("lodash");

var _blocks = require("@wordpress/blocks");

var _controls = require("./controls");

var _utils = require("./utils");

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _marked = /*#__PURE__*/_regenerator.default.mark(getNavigationPostForMenu);

/**
 * Creates a "stub" navigation post reflecting the contents of menu with id=menuId. The
 * post is meant as a convenient to only exists in runtime and should never be saved. It
 * enables a convenient way of editing the navigation by using a regular post editor.
 *
 * Fetches all menu items, converts them into blocks, and hydrates a new post with them.
 *
 * @param {number} menuId The id of menu to create a post from
 * @return {void}
 */
function getNavigationPostForMenu(menuId) {
  var stubPost, args, menuItems, _createNavigationBloc, _createNavigationBloc2, navigationBlock, menuItemIdToClientId;

  return _regenerator.default.wrap(function getNavigationPostForMenu$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          stubPost = createStubPost(menuId); // Persist an empty post to warm up the state

          _context.next = 3;
          return persistPost(stubPost);

        case 3:
          // Dispatch startResolution to skip the execution of the real getEntityRecord resolver - it would
          // issue an http request and fail.
          args = [_utils.KIND, _utils.POST_TYPE, stubPost.id];
          _context.next = 6;
          return (0, _controls.dispatch)('core', 'startResolution', 'getEntityRecord', args);

        case 6:
          _context.next = 8;
          return (0, _controls.resolveMenuItems)(menuId);

        case 8:
          menuItems = _context.sent;
          _createNavigationBloc = createNavigationBlock(menuItems), _createNavigationBloc2 = (0, _slicedToArray2.default)(_createNavigationBloc, 2), navigationBlock = _createNavigationBloc2[0], menuItemIdToClientId = _createNavigationBloc2[1];
          _context.next = 12;
          return {
            type: 'SET_MENU_ITEM_TO_CLIENT_ID_MAPPING',
            postId: stubPost.id,
            mapping: menuItemIdToClientId
          };

        case 12:
          _context.next = 14;
          return persistPost(createStubPost(menuId, navigationBlock));

        case 14:
          _context.next = 16;
          return (0, _controls.dispatch)('core', 'finishResolution', 'getEntityRecord', args);

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

var createStubPost = function createStubPost(menuId, navigationBlock) {
  var id = (0, _utils.buildNavigationPostId)(menuId);
  return {
    id: id,
    slug: id,
    status: 'draft',
    type: 'page',
    blocks: [navigationBlock],
    meta: {
      menuId: menuId
    }
  };
};

var persistPost = function persistPost(post) {
  return (0, _controls.dispatch)('core', 'receiveEntityRecords', _utils.KIND, _utils.POST_TYPE, post, {
    id: post.id
  }, false);
};
/**
 * Converts an adjacency list of menuItems into a navigation block.
 *
 * @param {Array} menuItems a list of menu items
 * @return {Object} Navigation block
 */


function createNavigationBlock(menuItems) {
  var itemsByParentID = (0, _lodash.groupBy)(menuItems, 'parent');
  var menuItemIdToClientId = {};

  var menuItemsToTreeOfBlocks = function menuItemsToTreeOfBlocks(items) {
    var innerBlocks = [];

    if (!items) {
      return;
    }

    var sortedItems = (0, _lodash.sortBy)(items, 'menu_order');

    var _iterator = _createForOfIteratorHelper(sortedItems),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _itemsByParentID$item;

        var item = _step.value;
        var menuItemInnerBlocks = [];

        if ((_itemsByParentID$item = itemsByParentID[item.id]) === null || _itemsByParentID$item === void 0 ? void 0 : _itemsByParentID$item.length) {
          menuItemInnerBlocks = menuItemsToTreeOfBlocks(itemsByParentID[item.id]);
        }

        var block = convertMenuItemToBlock(item, menuItemInnerBlocks);
        menuItemIdToClientId[item.id] = block.clientId;
        innerBlocks.push(block);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return innerBlocks;
  }; // menuItemsToTreeOfBlocks takes an array of top-level menu items and recursively creates all their innerBlocks


  var innerBlocks = menuItemsToTreeOfBlocks(itemsByParentID[0] || []);
  var navigationBlock = (0, _blocks.createBlock)('core/navigation', {}, innerBlocks);
  return [navigationBlock, menuItemIdToClientId];
}

function convertMenuItemToBlock(menuItem) {
  var innerBlocks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (menuItem.type === 'html') {
    var parsedBlocks = (0, _blocks.parse)(menuItem.content.raw);

    if (parsedBlocks.length !== 1) {
      return (0, _blocks.createBlock)('core/freeform', {
        originalContent: menuItem.content.raw
      });
    }

    return parsedBlocks[0];
  }

  var attributes = {
    label: menuItem.title.rendered,
    url: menuItem.url
  };
  return (0, _blocks.createBlock)('core/navigation-link', attributes, innerBlocks);
}
//# sourceMappingURL=resolvers.js.map