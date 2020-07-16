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

var _compose = require("@wordpress/compose");

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Browser dependencies
 */
var _window = window,
    FocusEvent = _window.FocusEvent;

var WpEmbedPreview = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(WpEmbedPreview, _Component);

  var _super = _createSuper(WpEmbedPreview);

  function WpEmbedPreview() {
    var _this;

    (0, _classCallCheck2.default)(this, WpEmbedPreview);
    _this = _super.apply(this, arguments);
    _this.checkFocus = _this.checkFocus.bind((0, _assertThisInitialized2.default)(_this));
    _this.node = (0, _element.createRef)();
    return _this;
  }
  /**
   * Checks whether the wp embed iframe is the activeElement,
   * if it is dispatch a focus event.
   */


  (0, _createClass2.default)(WpEmbedPreview, [{
    key: "checkFocus",
    value: function checkFocus() {
      var _document = document,
          activeElement = _document.activeElement;

      if (activeElement.tagName !== 'IFRAME' || activeElement.parentNode !== this.node.current) {
        return;
      }

      var focusEvent = new FocusEvent('focus', {
        bubbles: true
      });
      activeElement.dispatchEvent(focusEvent);
    }
  }, {
    key: "render",
    value: function render() {
      var html = this.props.html;
      return (0, _element.createElement)("div", {
        ref: this.node,
        className: "wp-block-embed__wrapper",
        dangerouslySetInnerHTML: {
          __html: html
        }
      });
    }
  }]);
  return WpEmbedPreview;
}(_element.Component);

var _default = (0, _compose.withGlobalEvents)({
  blur: 'checkFocus'
})(WpEmbedPreview);

exports.default = _default;
//# sourceMappingURL=wp-embed-preview.js.map