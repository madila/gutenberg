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

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _blockEditor = require("@wordpress/block-editor");

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var ErrorBoundary = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(ErrorBoundary, _Component);

  var _super = _createSuper(ErrorBoundary);

  function ErrorBoundary() {
    var _this;

    (0, _classCallCheck2.default)(this, ErrorBoundary);
    _this = _super.apply(this, arguments);
    _this.reboot = _this.reboot.bind((0, _assertThisInitialized2.default)(_this));
    _this.state = {
      error: null
    };
    return _this;
  }

  (0, _createClass2.default)(ErrorBoundary, [{
    key: "componentDidCatch",
    value: function componentDidCatch(error) {
      this.setState({
        error: error
      });
    }
  }, {
    key: "reboot",
    value: function reboot() {
      if (this.props.onError) {
        this.props.onError();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var error = this.state.error;

      if (!error) {
        return this.props.children;
      }

      return (0, _element.createElement)(_blockEditor.Warning, {
        className: "navigation-editor-error-boundary",
        actions: [(0, _element.createElement)(_components.Button, {
          key: "recovery",
          onClick: this.reboot,
          isSecondary: true
        }, (0, _i18n.__)('Attempt Recovery'))]
      }, (0, _i18n.__)('The navigation editor has encountered an unexpected error.'));
    }
  }]);
  return ErrorBoundary;
}(_element.Component);

var _default = ErrorBoundary;
exports.default = _default;
//# sourceMappingURL=index.js.map