"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clickBlockToolbarButton = clickBlockToolbarButton;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _showBlockToolbar = require("./show-block-toolbar");

/**
 * Internal dependencies
 */

/**
 * Clicks a block toolbar button.
 *
 * @param {string} label  The text string of the button label.
 * @param {string} [type] The type of button label: 'ariaLabel' or 'content'.
 */
function clickBlockToolbarButton(_x) {
  return _clickBlockToolbarButton.apply(this, arguments);
}

function _clickBlockToolbarButton() {
  _clickBlockToolbarButton = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(label) {
    var type,
        BLOCK_TOOLBAR_SELECTOR,
        button,
        BUTTON_SELECTOR,
        _yield$page$$x,
        _yield$page$$x2,
        _args = arguments;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            type = _args.length > 1 && _args[1] !== undefined ? _args[1] : 'ariaLabel';
            _context.next = 3;
            return (0, _showBlockToolbar.showBlockToolbar)();

          case 3:
            BLOCK_TOOLBAR_SELECTOR = 'block-editor-block-toolbar';

            if (!(type === 'ariaLabel')) {
              _context.next = 9;
              break;
            }

            BUTTON_SELECTOR = ".".concat(BLOCK_TOOLBAR_SELECTOR, " button[aria-label=\"").concat(label, "\"]");
            _context.next = 8;
            return page.waitForSelector(BUTTON_SELECTOR);

          case 8:
            button = _context.sent;

          case 9:
            if (!(type === 'content')) {
              _context.next = 15;
              break;
            }

            _context.next = 12;
            return page.$x("//*[@class='".concat(BLOCK_TOOLBAR_SELECTOR, "']//button[contains(text(), '").concat(label, "')]"));

          case 12:
            _yield$page$$x = _context.sent;
            _yield$page$$x2 = (0, _slicedToArray2.default)(_yield$page$$x, 1);
            button = _yield$page$$x2[0];

          case 15:
            _context.next = 17;
            return button.evaluate(function (element) {
              return element.scrollIntoView();
            });

          case 17:
            _context.next = 19;
            return button.click();

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _clickBlockToolbarButton.apply(this, arguments);
}
//# sourceMappingURL=click-block-toolbar-button.js.map