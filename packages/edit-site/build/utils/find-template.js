"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findTemplate;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _url = require("@wordpress/url");

/**
 * WordPress dependencies
 */

/**
 * Browser dependencies
 */
var _window = window,
    fetch = _window.fetch;
/**
 * Find the template for a given page path.
 *
 * @param {string}   path The page path.
 * @param {Function} getEntityRecords The promise-returning `getEntityRecords` selector to use.
 *
 * @return {number} The found template ID.
 */

function findTemplate(_x, _x2) {
  return _findTemplate.apply(this, arguments);
}

function _findTemplate() {
  _findTemplate = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(path, getEntityRecords) {
    var _yield$fetch$then, data, newTemplateId;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch((0, _url.addQueryArgs)(path, {
              '_wp-find-template': true
            })).then(function (res) {
              return res.json();
            });

          case 2:
            _yield$fetch$then = _context.sent;
            data = _yield$fetch$then.data;
            newTemplateId = data.ID;

            if (!(newTemplateId === null)) {
              _context.next = 9;
              break;
            }

            _context.next = 8;
            return getEntityRecords('postType', 'wp_template', {
              resolved: true,
              slug: data.post_name
            });

          case 8:
            newTemplateId = _context.sent[0].id;

          case 9:
            return _context.abrupt("return", newTemplateId);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _findTemplate.apply(this, arguments);
}
//# sourceMappingURL=find-template.js.map