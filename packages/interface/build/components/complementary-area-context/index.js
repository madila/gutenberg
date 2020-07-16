"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _plugins = require("@wordpress/plugins");

/**
 * WordPress dependencies
 */
var _default = (0, _plugins.withPluginContext)(function (context, ownProps) {
  return {
    icon: ownProps.icon || context.icon,
    identifier: ownProps.identifier || "".concat(context.name, "/").concat(ownProps.name)
  };
});

exports.default = _default;
//# sourceMappingURL=index.js.map