"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchDownloadableBlocks = fetchDownloadableBlocks;
exports.receiveDownloadableBlocks = receiveDownloadableBlocks;
exports.installBlockType = installBlockType;
exports.uninstallBlockType = uninstallBlockType;
exports.addInstalledBlockType = addInstalledBlockType;
exports.removeInstalledBlockType = removeInstalledBlockType;
exports.setIsInstalling = setIsInstalling;
exports.setErrorNotice = setErrorNotice;
exports.clearErrorNotice = clearErrorNotice;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _i18n = require("@wordpress/i18n");

var _dataControls = require("@wordpress/data-controls");

var _controls = require("./controls");

var _getPluginUrl = _interopRequireDefault(require("./utils/get-plugin-url"));

var _marked = /*#__PURE__*/_regenerator.default.mark(installBlockType),
    _marked2 = /*#__PURE__*/_regenerator.default.mark(uninstallBlockType);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Returns an action object used in signalling that the downloadable blocks
 * have been requested and is loading.
 *
 * @param {string} filterValue Search string.
 *
 * @return {Object} Action object.
 */
function fetchDownloadableBlocks(filterValue) {
  return {
    type: 'FETCH_DOWNLOADABLE_BLOCKS',
    filterValue: filterValue
  };
}
/**
 * Returns an action object used in signalling that the downloadable blocks
 * have been updated.
 *
 * @param {Array}  downloadableBlocks Downloadable blocks.
 * @param {string} filterValue        Search string.
 *
 * @return {Object} Action object.
 */


function receiveDownloadableBlocks(downloadableBlocks, filterValue) {
  return {
    type: 'RECEIVE_DOWNLOADABLE_BLOCKS',
    downloadableBlocks: downloadableBlocks,
    filterValue: filterValue
  };
}
/**
 * Action triggered to install a block plugin.
 *
 * @param {Object} block The block item returned by search.
 *
 * @return {boolean} Whether the block was successfully installed & loaded.
 */


function installBlockType(block) {
  var id, assets, success, url, links, response, registeredBlocks, message, isFatal, fatalAPIErrors;
  return _regenerator.default.wrap(function installBlockType$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          id = block.id, assets = block.assets;
          success = false;
          _context.next = 4;
          return clearErrorNotice(id);

        case 4:
          _context.prev = 4;

          if (!(!Array.isArray(assets) || !assets.length)) {
            _context.next = 7;
            break;
          }

          throw new Error((0, _i18n.__)('Block has no assets.'));

        case 7:
          _context.next = 9;
          return setIsInstalling(block.id, true);

        case 9:
          // If we have a wp:plugin link, the plugin is installed but inactive.
          url = (0, _getPluginUrl.default)(block);
          links = {};

          if (!url) {
            _context.next = 16;
            break;
          }

          _context.next = 14;
          return (0, _dataControls.apiFetch)({
            url: url,
            data: {
              status: 'active'
            },
            method: 'PUT'
          });

        case 14:
          _context.next = 20;
          break;

        case 16:
          _context.next = 18;
          return (0, _dataControls.apiFetch)({
            path: 'wp/v2/plugins',
            data: {
              slug: block.id,
              status: 'active'
            },
            method: 'POST'
          });

        case 18:
          response = _context.sent;
          // Add the `self` link for newly-installed blocks.
          links = response._links;

        case 20:
          _context.next = 22;
          return addInstalledBlockType(_objectSpread({}, block, {
            links: _objectSpread({}, block.links, {}, links)
          }));

        case 22:
          _context.next = 24;
          return (0, _controls.loadAssets)(assets);

        case 24:
          _context.next = 26;
          return (0, _dataControls.select)('core/blocks', 'getBlockTypes');

        case 26:
          registeredBlocks = _context.sent;

          if (!(!registeredBlocks.length || !registeredBlocks.filter(function (i) {
            return i.name === block.name;
          }).length)) {
            _context.next = 29;
            break;
          }

          throw new Error((0, _i18n.__)('Error registering block. Try reloading the page.'));

        case 29:
          success = true;
          _context.next = 40;
          break;

        case 32:
          _context.prev = 32;
          _context.t0 = _context["catch"](4);
          message = _context.t0.message || (0, _i18n.__)('An error occurred.'); // Errors we throw are fatal

          isFatal = _context.t0 instanceof Error; // Specific API errors that are fatal

          fatalAPIErrors = {
            folder_exists: (0, _i18n.__)('This block is already installed. Try reloading the page.'),
            unable_to_connect_to_filesystem: (0, _i18n.__)('Error installing block. You can reload the page and try again.')
          };

          if (fatalAPIErrors[_context.t0.code]) {
            isFatal = true;
            message = fatalAPIErrors[_context.t0.code];
          }

          _context.next = 40;
          return setErrorNotice(id, message, isFatal);

        case 40:
          _context.next = 42;
          return setIsInstalling(block.id, false);

        case 42:
          return _context.abrupt("return", success);

        case 43:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[4, 32]]);
}
/**
 * Action triggered to uninstall a block plugin.
 *
 * @param {Object} block The blockType object.
 */


function uninstallBlockType(block) {
  return _regenerator.default.wrap(function uninstallBlockType$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return (0, _dataControls.apiFetch)({
            url: (0, _getPluginUrl.default)(block),
            data: {
              status: 'inactive'
            },
            method: 'PUT'
          });

        case 3:
          _context2.next = 5;
          return (0, _dataControls.apiFetch)({
            url: (0, _getPluginUrl.default)(block),
            method: 'DELETE'
          });

        case 5:
          _context2.next = 7;
          return removeInstalledBlockType(block);

        case 7:
          _context2.next = 13;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          _context2.next = 13;
          return (0, _dataControls.dispatch)('core/notices', 'createErrorNotice', _context2.t0.message || (0, _i18n.__)('An error occurred.'));

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, null, [[0, 9]]);
}
/**
 * Returns an action object used to add a newly installed block type.
 *
 * @param {Object} item The block item with the block id and name.
 *
 * @return {Object} Action object.
 */


function addInstalledBlockType(item) {
  return {
    type: 'ADD_INSTALLED_BLOCK_TYPE',
    item: item
  };
}
/**
 * Returns an action object used to remove a newly installed block type.
 *
 * @param {string} item The block item with the block id and name.
 *
 * @return {Object} Action object.
 */


function removeInstalledBlockType(item) {
  return {
    type: 'REMOVE_INSTALLED_BLOCK_TYPE',
    item: item
  };
}
/**
 * Returns an action object used to indicate install in progress
 *
 * @param {string} blockId
 * @param {boolean} isInstalling
 *
 * @return {Object} Action object.
 */


function setIsInstalling(blockId, isInstalling) {
  return {
    type: 'SET_INSTALLING_BLOCK',
    blockId: blockId,
    isInstalling: isInstalling
  };
}
/**
 * Sets an error notice string to be displayed to the user
 *
 * @param {string} blockId The ID of the block plugin. eg: my-block
 * @param {string} message  The message shown in the notice.
 * @param {boolean} isFatal Whether the user can recover from the error
 *
 * @return {Object} Action object.
 */


function setErrorNotice(blockId, message) {
  var isFatal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  return {
    type: 'SET_ERROR_NOTICE',
    blockId: blockId,
    message: message,
    isFatal: isFatal
  };
}
/**
 * Sets the error notice to empty for specific block
 *
 * @param {string} blockId The ID of the block plugin. eg: my-block
 *
 * @return {Object} Action object.
 */


function clearErrorNotice(blockId) {
  return {
    type: 'CLEAR_ERROR_NOTICE',
    blockId: blockId
  };
}
//# sourceMappingURL=actions.js.map