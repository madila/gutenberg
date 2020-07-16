"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _lodash = require("lodash");

var _hooks = require("@wordpress/hooks");

var _pluginContext = require("../plugin-context");

var _api = require("../../api");

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * A component that renders all plugin fills in a hidden div.
 *
 * @example
 * <caption>ES5</caption>
 * ```js
 * // Using ES5 syntax
 * var el = wp.element.createElement;
 * var PluginArea = wp.plugins.PluginArea;
 *
 * function Layout() {
 * 	return el(
 * 		'div',
 * 		{},
 * 		'Content of the page',
 * 		PluginArea
 * 	);
 * }
 * ```
 *
 * @example
 * <caption>ESNext</caption>
 * ```js
 * // Using ESNext syntax
 * import { PluginArea } from '@wordpress/plugins';
 *
 * const Layout = () => (
 * 	<div>
 * 		Content of the page
 * 		<PluginArea />
 * 	</div>
 * );
 * ```
 *
 * @return {WPComponent} The component to be rendered.
 */
var PluginArea = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(PluginArea, _Component);

  var _super = _createSuper(PluginArea);

  function PluginArea() {
    var _this;

    (0, _classCallCheck2.default)(this, PluginArea);
    _this = _super.apply(this, arguments);
    _this.setPlugins = _this.setPlugins.bind((0, _assertThisInitialized2.default)(_this));
    _this.state = _this.getCurrentPluginsState();
    return _this;
  }

  (0, _createClass2.default)(PluginArea, [{
    key: "getCurrentPluginsState",
    value: function getCurrentPluginsState() {
      return {
        plugins: (0, _lodash.map)((0, _api.getPlugins)(), function (_ref) {
          var icon = _ref.icon,
              name = _ref.name,
              render = _ref.render;
          return {
            Plugin: render,
            context: {
              name: name,
              icon: icon
            }
          };
        })
      };
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      (0, _hooks.addAction)('plugins.pluginRegistered', 'core/plugins/plugin-area/plugins-registered', this.setPlugins);
      (0, _hooks.addAction)('plugins.pluginUnregistered', 'core/plugins/plugin-area/plugins-unregistered', this.setPlugins);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      (0, _hooks.removeAction)('plugins.pluginRegistered', 'core/plugins/plugin-area/plugins-registered');
      (0, _hooks.removeAction)('plugins.pluginUnregistered', 'core/plugins/plugin-area/plugins-unregistered');
    }
  }, {
    key: "setPlugins",
    value: function setPlugins() {
      this.setState(this.getCurrentPluginsState);
    }
  }, {
    key: "render",
    value: function render() {
      return (0, _element.createElement)("div", {
        style: {
          display: 'none'
        }
      }, (0, _lodash.map)(this.state.plugins, function (_ref2) {
        var context = _ref2.context,
            Plugin = _ref2.Plugin;
        return (0, _element.createElement)(_pluginContext.PluginContextProvider, {
          key: context.name,
          value: context
        }, (0, _element.createElement)(Plugin, null));
      }));
    }
  }]);
  return PluginArea;
}(_element.Component);

var _default = PluginArea;
exports.default = _default;
//# sourceMappingURL=index.js.map