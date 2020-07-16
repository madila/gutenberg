"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__experimentalGetAllAnnotationsForBlock = __experimentalGetAllAnnotationsForBlock;
exports.__experimentalGetAnnotations = __experimentalGetAnnotations;
exports.__experimentalGetAnnotationsForRichText = exports.__experimentalGetAnnotationsForBlock = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _rememo = _interopRequireDefault(require("rememo"));

var _lodash = require("lodash");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Shared reference to an empty array for cases where it is important to avoid
 * returning a new array reference on every invocation, as in a connected or
 * other pure component which performs `shouldComponentUpdate` check on props.
 * This should be used as a last resort, since the normalized data should be
 * maintained by the reducer result in state.
 *
 * @type {Array}
 */
var EMPTY_ARRAY = [];
/**
 * Returns the annotations for a specific client ID.
 *
 * @param {Object} state Editor state.
 * @param {string} clientId The ID of the block to get the annotations for.
 *
 * @return {Array} The annotations applicable to this block.
 */

var __experimentalGetAnnotationsForBlock = (0, _rememo.default)(function (state, blockClientId) {
  var _state$blockClientId;

  return ((_state$blockClientId = state === null || state === void 0 ? void 0 : state[blockClientId]) !== null && _state$blockClientId !== void 0 ? _state$blockClientId : []).filter(function (annotation) {
    return annotation.selector === 'block';
  });
}, function (state, blockClientId) {
  var _state$blockClientId2;

  return [(_state$blockClientId2 = state === null || state === void 0 ? void 0 : state[blockClientId]) !== null && _state$blockClientId2 !== void 0 ? _state$blockClientId2 : EMPTY_ARRAY];
});

exports.__experimentalGetAnnotationsForBlock = __experimentalGetAnnotationsForBlock;

function __experimentalGetAllAnnotationsForBlock(state, blockClientId) {
  var _state$blockClientId3;

  return (_state$blockClientId3 = state === null || state === void 0 ? void 0 : state[blockClientId]) !== null && _state$blockClientId3 !== void 0 ? _state$blockClientId3 : EMPTY_ARRAY;
}
/**
 * Returns the annotations that apply to the given RichText instance.
 *
 * Both a blockClientId and a richTextIdentifier are required. This is because
 * a block might have multiple `RichText` components. This does mean that every
 * block needs to implement annotations itself.
 *
 * @param {Object} state              Editor state.
 * @param {string} blockClientId      The client ID for the block.
 * @param {string} richTextIdentifier Unique identifier that identifies the given RichText.
 * @return {Array} All the annotations relevant for the `RichText`.
 */


var __experimentalGetAnnotationsForRichText = (0, _rememo.default)(function (state, blockClientId, richTextIdentifier) {
  var _state$blockClientId4;

  return ((_state$blockClientId4 = state === null || state === void 0 ? void 0 : state[blockClientId]) !== null && _state$blockClientId4 !== void 0 ? _state$blockClientId4 : []).filter(function (annotation) {
    return annotation.selector === 'range' && richTextIdentifier === annotation.richTextIdentifier;
  }).map(function (annotation) {
    var range = annotation.range,
        other = (0, _objectWithoutProperties2.default)(annotation, ["range"]);
    return _objectSpread({}, range, {}, other);
  });
}, function (state, blockClientId) {
  var _state$blockClientId5;

  return [(_state$blockClientId5 = state === null || state === void 0 ? void 0 : state[blockClientId]) !== null && _state$blockClientId5 !== void 0 ? _state$blockClientId5 : EMPTY_ARRAY];
});
/**
 * Returns all annotations in the editor state.
 *
 * @param {Object} state Editor state.
 * @return {Array} All annotations currently applied.
 */


exports.__experimentalGetAnnotationsForRichText = __experimentalGetAnnotationsForRichText;

function __experimentalGetAnnotations(state) {
  return (0, _lodash.flatMap)(state, function (annotations) {
    return annotations;
  });
}
//# sourceMappingURL=selectors.js.map