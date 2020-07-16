"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllBlocks = getAllBlocks;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _wpDataSelect = require("./wp-data-select");

/**
 * Internal dependencies
 */

/**
 * Returns an array with all blocks; Equivalent to calling wp.data.select( 'core/block-editor' ).getBlocks();
 *
 * @return {Promise} Promise resolving with an array containing all blocks in the document.
 */
function getAllBlocks() {
  return _getAllBlocks.apply(this, arguments);
}

function _getAllBlocks() {
  _getAllBlocks = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", (0, _wpDataSelect.wpDataSelect)('core/block-editor', 'getBlocks'));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getAllBlocks.apply(this, arguments);
}
//# sourceMappingURL=get-all-blocks.js.map