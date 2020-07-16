"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Slot = exports.Fill = void 0;

var _element = require("@wordpress/element");

var _components = require("@wordpress/components");

/**
 * Defines as extensibility slot for the Status & visibility panel.
 */

/**
 * WordPress dependencies
 */
var _createSlotFill = (0, _components.createSlotFill)('PluginPostStatusInfo'),
    Fill = _createSlotFill.Fill,
    Slot = _createSlotFill.Slot;
/**
 * Renders a row in the Status & visibility panel of the Document sidebar.
 * It should be noted that this is named and implemented around the function it serves
 * and not its location, which may change in future iterations.
 *
 * @param {Object}    props             Component properties.
 * @param {string}    [props.className] An optional class name added to the row.
 * @param {WPElement} props.children    Children to be rendered.
 *
 * @example
 * <caption>ES5</caption>
 * ```js
 * // Using ES5 syntax
 * var __ = wp.i18n.__;
 * var PluginPostStatusInfo = wp.editPost.PluginPostStatusInfo;
 *
 * function MyPluginPostStatusInfo() {
 * 	return wp.element.createElement(
 * 		PluginPostStatusInfo,
 * 		{
 * 			className: 'my-plugin-post-status-info',
 * 		},
 * 		__( 'My post status info' )
 * 	)
 * }
 * ```
 *
 * @example
 * <caption>ESNext</caption>
 * ```jsx
 * // Using ESNext syntax
 * import { __ } from '@wordpress/i18n';
 * import { PluginPostStatusInfo } from '@wordpress/edit-post';
 *
 * const MyPluginPostStatusInfo = () => (
 * 	<PluginPostStatusInfo
 * 		className="my-plugin-post-status-info"
 * 	>
 * 		{ __( 'My post status info' ) }
 * 	</PluginPostStatusInfo>
 * );
 * ```
 *
 * @return {WPComponent} The component to be rendered.
 */


exports.Slot = Slot;
exports.Fill = Fill;

var PluginPostStatusInfo = function PluginPostStatusInfo(_ref) {
  var children = _ref.children,
      className = _ref.className;
  return (0, _element.createElement)(Fill, null, (0, _element.createElement)(_components.PanelRow, {
    className: className
  }, children));
};

PluginPostStatusInfo.Slot = Slot;
var _default = PluginPostStatusInfo;
exports.default = _default;
//# sourceMappingURL=index.js.map