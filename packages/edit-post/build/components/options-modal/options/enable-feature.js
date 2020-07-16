"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _compose = require("@wordpress/compose");

var _data = require("@wordpress/data");

var _base = _interopRequireDefault(require("./base"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var _default = (0, _compose.compose)((0, _data.withSelect)(function (select, _ref) {
  var featureName = _ref.featureName;

  var _select = select('core/edit-post'),
      isFeatureActive = _select.isFeatureActive;

  return {
    isChecked: isFeatureActive(featureName)
  };
}), (0, _data.withDispatch)(function (dispatch, _ref2) {
  var featureName = _ref2.featureName;
  return {
    onChange: function onChange() {
      return dispatch('core/edit-post').toggleFeature(featureName);
    }
  };
}))(_base.default);

exports.default = _default;
//# sourceMappingURL=enable-feature.js.map