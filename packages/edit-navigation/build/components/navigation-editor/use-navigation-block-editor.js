"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useNavigationBlockEditor;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _data = require("@wordpress/data");

var _element = require("@wordpress/element");

var _coreData = require("@wordpress/core-data");

var _utils = require("../../store/utils");

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function useNavigationBlockEditor(post) {
  var _useDispatch = (0, _data.useDispatch)('core/edit-navigation'),
      createMissingMenuItems = _useDispatch.createMissingMenuItems;

  var _useEntityBlockEditor = (0, _coreData.useEntityBlockEditor)(_utils.KIND, _utils.POST_TYPE, {
    id: post.id
  }),
      _useEntityBlockEditor2 = (0, _slicedToArray2.default)(_useEntityBlockEditor, 3),
      blocks = _useEntityBlockEditor2[0],
      onInput = _useEntityBlockEditor2[1],
      _onChange = _useEntityBlockEditor2[2];

  var onChange = (0, _element.useCallback)( /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(updatedBlocks) {
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _onChange(updatedBlocks);

            case 2:
              createMissingMenuItems(post);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }(), [blocks, onChange]);
  return [blocks, onInput, onChange];
}
//# sourceMappingURL=use-navigation-block-editor.js.map