"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = registerEditSiteStore;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _data = require("@wordpress/data");

var _dataControls = require("@wordpress/data-controls");

var _reducer = _interopRequireDefault(require("./reducer"));

var actions = _interopRequireWildcard(require("./actions"));

var selectors = _interopRequireWildcard(require("./selectors"));

var _controls = _interopRequireDefault(require("./controls"));

var _constants = require("./constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function registerEditSiteStore(initialState) {
  var store = (0, _data.registerStore)(_constants.STORE_KEY, {
    reducer: _reducer.default,
    actions: actions,
    selectors: selectors,
    controls: _objectSpread({}, _dataControls.controls, {}, _controls.default),
    persist: ['preferences'],
    initialState: initialState
  }); // We set the initial page here to include the template fetch which will
  // resolve the correct homepage template.

  store.dispatch(actions.setPage(initialState.page));
  return store;
}
//# sourceMappingURL=index.js.map