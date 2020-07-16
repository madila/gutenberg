"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trashAllPosts = trashAllPosts;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _url = require("@wordpress/url");

var _switchUserToAdmin = require("./switch-user-to-admin");

var _switchUserToTest = require("./switch-user-to-test");

var _visitAdminPage = require("./visit-admin-page");

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Navigates to the post listing screen and bulk-trashes any posts which exist.
 *
 * @param {string} postType - String slug for type of post to trash.
 *
 * @return {Promise} Promise resolving once posts have been trashed.
 */
function trashAllPosts() {
  return _trashAllPosts.apply(this, arguments);
}

function _trashAllPosts() {
  _trashAllPosts = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    var postType,
        query,
        bulkSelector,
        _args = arguments;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            postType = _args.length > 0 && _args[0] !== undefined ? _args[0] : 'post';
            _context.next = 3;
            return (0, _switchUserToAdmin.switchUserToAdmin)();

          case 3:
            // Visit `/wp-admin/edit.php` so we can see a list of posts and delete them.
            query = (0, _url.addQueryArgs)('', {
              post_type: postType
            }).slice(1);
            _context.next = 6;
            return (0, _visitAdminPage.visitAdminPage)('edit.php', query);

          case 6:
            _context.next = 8;
            return page.$('#bulk-action-selector-top');

          case 8:
            bulkSelector = _context.sent;

            if (bulkSelector) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return");

          case 11:
            _context.next = 13;
            return page.waitForSelector('[id^=cb-select-all-]');

          case 13:
            _context.next = 15;
            return page.click('[id^=cb-select-all-]');

          case 15:
            _context.next = 17;
            return page.select('#bulk-action-selector-top', 'trash');

          case 17:
            _context.next = 19;
            return page.click('#doaction');

          case 19:
            _context.next = 21;
            return page.waitForXPath('//*[contains(@class, "updated notice")]/p[contains(text(), "moved to the Trash.")]');

          case 21:
            _context.next = 23;
            return (0, _switchUserToTest.switchUserToTest)();

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _trashAllPosts.apply(this, arguments);
}
//# sourceMappingURL=posts.js.map