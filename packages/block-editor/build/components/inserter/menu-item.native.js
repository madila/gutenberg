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

var _reactNative = require("react-native");

var _components = require("@wordpress/components");

var _compose = require("@wordpress/compose");

var _i18n = require("@wordpress/i18n");

var _style = _interopRequireDefault(require("./style.scss"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var MenuItem = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(MenuItem, _Component);

  var _super = _createSuper(MenuItem);

  function MenuItem() {
    var _this;

    (0, _classCallCheck2.default)(this, MenuItem);
    _this = _super.apply(this, arguments);
    _this.onPress = _this.onPress.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(MenuItem, [{
    key: "onPress",
    value: function onPress() {
      var _this$props = this.props,
          onSelect = _this$props.onSelect,
          item = _this$props.item;
      onSelect(item);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          getStylesFromColorScheme = _this$props2.getStylesFromColorScheme,
          item = _this$props2.item,
          itemWidth = _this$props2.itemWidth,
          maxWidth = _this$props2.maxWidth;
      var modalIconWrapperStyle = getStylesFromColorScheme(_style.default.modalIconWrapper, _style.default.modalIconWrapperDark);
      var modalIconStyle = getStylesFromColorScheme(_style.default.modalIcon, _style.default.modalIconDark);
      var modalItemLabelStyle = getStylesFromColorScheme(_style.default.modalItemLabel, _style.default.modalItemLabelDark);
      var clipboardBlockStyles = getStylesFromColorScheme(_style.default.clipboardBlock, _style.default.clipboardBlockDark);
      var isClipboardBlock = item.id === 'clipboard';
      return (0, _element.createElement)(_reactNative.TouchableHighlight, {
        style: _style.default.touchableArea,
        underlayColor: "transparent",
        activeOpacity: 0.5,
        accessibilityLabel: item.title,
        onPress: this.onPress
      }, (0, _element.createElement)(_reactNative.View, {
        style: [_style.default.modalItem, {
          width: maxWidth
        }]
      }, (0, _element.createElement)(_reactNative.View, {
        style: [modalIconWrapperStyle, itemWidth && {
          width: itemWidth
        }, isClipboardBlock && clipboardBlockStyles]
      }, (0, _element.createElement)(_reactNative.View, {
        style: modalIconStyle
      }, (0, _element.createElement)(_components.Icon, {
        icon: item.icon.src,
        fill: modalIconStyle.fill,
        size: modalIconStyle.width
      }))), (0, _element.createElement)(_reactNative.Text, {
        style: modalItemLabelStyle
      }, isClipboardBlock ? (0, _i18n.__)('Copied block') : item.title)));
    }
  }]);
  return MenuItem;
}(_element.Component);

var _default = (0, _compose.withPreferredColorScheme)(MenuItem);

exports.default = _default;
//# sourceMappingURL=menu-item.native.js.map