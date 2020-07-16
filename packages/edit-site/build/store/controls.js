"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findTemplate = findTemplate;
exports.default = void 0;

var _data = require("@wordpress/data");

var _utils = require("../utils");

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Find the template for a given page path.
 *
 * @param {string} path The page path.
 *
 * @return {number} The found template ID.
 */
function findTemplate(path) {
  return {
    type: 'FIND_TEMPLATE',
    path: path
  };
}

var controls = {
  FIND_TEMPLATE: (0, _data.createRegistryControl)(function (registry) {
    return function (_ref) {
      var path = _ref.path;
      return (0, _utils.findTemplate)(path, registry.__experimentalResolveSelect('core').getEntityRecords);
    };
  })
};
var _default = controls;
exports.default = _default;
//# sourceMappingURL=controls.js.map