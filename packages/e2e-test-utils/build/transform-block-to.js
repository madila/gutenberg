"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformBlockTo = transformBlockTo;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _showBlockToolbar = require("./show-block-toolbar");

/**
 * Internal dependencies
 */

/**
 * Converts editor's block type.
 *
 * @param {string} name Block name.
 */
function transformBlockTo(_x) {
  return _transformBlockTo.apply(this, arguments);
}

function _transformBlockTo() {
  _transformBlockTo = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(name) {
    var switcherToggle, xpath, insertButton, BLOCK_SELECTOR, BLOCK_NAME_SELECTOR;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _showBlockToolbar.showBlockToolbar)();

          case 2:
            _context.next = 4;
            return page.waitForSelector('.block-editor-block-switcher__toggle');

          case 4:
            switcherToggle = _context.sent;
            _context.next = 7;
            return switcherToggle.evaluate(function (element) {
              return element.scrollIntoView();
            });

          case 7:
            _context.next = 9;
            return page.waitForSelector('.block-editor-block-switcher__toggle', {
              visible: true
            });

          case 9:
            _context.next = 11;
            return switcherToggle.click();

          case 11:
            _context.next = 13;
            return page.waitForSelector('.block-editor-block-switcher__container', {
              visible: true
            });

          case 13:
            // Find the block button option within the switcher popover.
            xpath = "//*[contains(@class, \"block-editor-block-switcher__popover\")]//button[.='".concat(name, "']");
            _context.next = 16;
            return page.waitForXPath(xpath, {
              visible: true
            });

          case 16:
            insertButton = _context.sent;
            _context.next = 19;
            return insertButton.evaluate(function (element) {
              return element.scrollIntoView();
            });

          case 19:
            _context.next = 21;
            return insertButton.click();

          case 21:
            // Wait for the transformed block to appear.
            BLOCK_SELECTOR = '.block-editor-block-list__block';
            BLOCK_NAME_SELECTOR = "[data-title=\"".concat(name, "\"]");
            _context.next = 25;
            return page.waitForSelector("".concat(BLOCK_SELECTOR).concat(BLOCK_NAME_SELECTOR));

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _transformBlockTo.apply(this, arguments);
}
//# sourceMappingURL=transform-block-to.js.map