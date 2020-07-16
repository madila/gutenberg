"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.storeConfig = void 0;

var _data = require("@wordpress/data");

var _reducer = _interopRequireDefault(require("./reducer"));

var resolvers = _interopRequireWildcard(require("./resolvers"));

var selectors = _interopRequireWildcard(require("./selectors"));

var actions = _interopRequireWildcard(require("./actions"));

var _controls = _interopRequireDefault(require("./controls"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Module Constants
 */
var MODULE_KEY = 'core/edit-navigation';
/**
 * Block editor data store configuration.
 *
 * @see https://github.com/WordPress/gutenberg/blob/master/packages/data/README.md#registerStore
 *
 * @type {Object}
 */

var storeConfig = {
  reducer: _reducer.default,
  controls: _controls.default,
  selectors: selectors,
  resolvers: resolvers,
  actions: actions
};
exports.storeConfig = storeConfig;
var store = (0, _data.registerStore)(MODULE_KEY, storeConfig);
var _default = store;
exports.default = _default;
//# sourceMappingURL=index.js.map