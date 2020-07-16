"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRegistrySelector = createRegistrySelector;
exports.createRegistryControl = createRegistryControl;

var _defaultRegistry = _interopRequireDefault(require("./default-registry"));

/**
 * Internal dependencies
 */

/** @typedef {import('./registry').WPDataRegistry} WPDataRegistry */

/**
 * Mark a selector as a registry selector.
 *
 * @param {Function} registrySelector Function receiving a registry object and returning a state selector.
 *
 * @return {Function} marked registry selector.
 */
function createRegistrySelector(registrySelector) {
  var selector = function selector() {
    return registrySelector(selector.registry.select).apply(void 0, arguments);
  };
  /**
   * Flag indicating to selector registration mapping that the selector should
   * be mapped as a registry selector.
   *
   * @type {boolean}
   */


  selector.isRegistrySelector = true;
  /**
   * Registry on which to call `select`, stubbed for non-standard usage to
   * use the default registry.
   *
   * @type {WPDataRegistry}
   */

  selector.registry = _defaultRegistry.default;
  return selector;
}
/**
 * Mark a control as a registry control.
 *
 * @param {Function} registryControl Function receiving a registry object and returning a control.
 *
 * @return {Function} marked registry control.
 */


function createRegistryControl(registryControl) {
  registryControl.isRegistryControl = true;
  return registryControl;
}
//# sourceMappingURL=factory.js.map