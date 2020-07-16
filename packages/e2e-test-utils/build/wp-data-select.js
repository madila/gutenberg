"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wpDataSelect = wpDataSelect;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

/**
 * Queries the WordPress data module.
 *
 * @param {string}    store      Store to query e.g: core/editor, core/blocks...
 * @param {string}    selector   Selector to exectute e.g: getBlocks.
 * @param {...Object} parameters Parameters to pass to the selector.
 *
 * @return {Promise<?Object>} Result of querying.
 */
function wpDataSelect(_x, _x2) {
  return _wpDataSelect.apply(this, arguments);
}

function _wpDataSelect() {
  _wpDataSelect = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(store, selector) {
    var _page;

    var _len,
        parameters,
        _key,
        _args = arguments;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            for (_len = _args.length, parameters = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
              parameters[_key - 2] = _args[_key];
            }

            return _context.abrupt("return", (_page = page).evaluate.apply(_page, [function (_store, _selector) {
              var _window$wp$data$selec;

              for (var _len2 = arguments.length, _parameters = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
                _parameters[_key2 - 2] = arguments[_key2];
              }

              return (_window$wp$data$selec = window.wp.data.select(_store))[_selector].apply(_window$wp$data$selec, _parameters);
            }, store, selector].concat(parameters)));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _wpDataSelect.apply(this, arguments);
}
//# sourceMappingURL=wp-data-select.js.map