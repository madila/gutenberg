"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showBlockToolbar = showBlockToolbar;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

/**
 * The block toolbar is not always visible while typing.
 * Call this function to reveal it.
 */
function showBlockToolbar() {
  return _showBlockToolbar.apply(this, arguments);
}

function _showBlockToolbar() {
  _showBlockToolbar = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return page.mouse.move(50, 50);

          case 2:
            _context.next = 4;
            return page.mouse.move(100, 100);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _showBlockToolbar.apply(this, arguments);
}
//# sourceMappingURL=show-block-toolbar.js.map