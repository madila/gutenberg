"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _lodash = require("lodash");

var _dataControls = require("@wordpress/data-controls");

var _actions = require("./actions");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var _default = {
  getDownloadableBlocks: /*#__PURE__*/_regenerator.default.mark(function getDownloadableBlocks(filterValue) {
    var results, blocks;
    return _regenerator.default.wrap(function getDownloadableBlocks$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (filterValue) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return");

          case 2:
            _context.prev = 2;
            _context.next = 5;
            return (0, _actions.fetchDownloadableBlocks)(filterValue);

          case 5:
            _context.next = 7;
            return (0, _dataControls.apiFetch)({
              path: "wp/v2/block-directory/search?term=".concat(filterValue)
            });

          case 7:
            results = _context.sent;
            blocks = results.map(function (result) {
              return (0, _lodash.mapKeys)(result, function (value, key) {
                return (0, _lodash.camelCase)(key);
              });
            });
            _context.next = 11;
            return (0, _actions.receiveDownloadableBlocks)(blocks, filterValue);

          case 11:
            _context.next = 15;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](2);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, getDownloadableBlocks, null, [[2, 13]]);
  })
};
exports.default = _default;
//# sourceMappingURL=resolvers.js.map