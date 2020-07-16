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

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = require("lodash");

var _moment = _interopRequireDefault(require("moment"));

var _i18n = require("@wordpress/i18n");

var _button = _interopRequireDefault(require("../button"));

var _buttonGroup = _interopRequireDefault(require("../button-group"));

var _timezone = _interopRequireDefault(require("./timezone"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Module Constants
 */
var TIMEZONELESS_FORMAT = 'YYYY-MM-DDTHH:mm:ss';

var TimePicker = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(TimePicker, _Component);

  var _super = _createSuper(TimePicker);

  function TimePicker() {
    var _this;

    (0, _classCallCheck2.default)(this, TimePicker);
    _this = _super.apply(this, arguments);
    _this.state = {
      day: '',
      month: '',
      year: '',
      hours: '',
      minutes: '',
      am: '',
      date: null
    };
    _this.changeDate = _this.changeDate.bind((0, _assertThisInitialized2.default)(_this));
    _this.updateMonth = _this.updateMonth.bind((0, _assertThisInitialized2.default)(_this));
    _this.onChangeMonth = _this.onChangeMonth.bind((0, _assertThisInitialized2.default)(_this));
    _this.updateDay = _this.updateDay.bind((0, _assertThisInitialized2.default)(_this));
    _this.onChangeDay = _this.onChangeDay.bind((0, _assertThisInitialized2.default)(_this));
    _this.updateYear = _this.updateYear.bind((0, _assertThisInitialized2.default)(_this));
    _this.onChangeYear = _this.onChangeYear.bind((0, _assertThisInitialized2.default)(_this));
    _this.updateHours = _this.updateHours.bind((0, _assertThisInitialized2.default)(_this));
    _this.updateMinutes = _this.updateMinutes.bind((0, _assertThisInitialized2.default)(_this));
    _this.onChangeHours = _this.onChangeHours.bind((0, _assertThisInitialized2.default)(_this));
    _this.onChangeMinutes = _this.onChangeMinutes.bind((0, _assertThisInitialized2.default)(_this));
    _this.renderMonth = _this.renderMonth.bind((0, _assertThisInitialized2.default)(_this));
    _this.renderDay = _this.renderDay.bind((0, _assertThisInitialized2.default)(_this));
    _this.renderDayMonthFormat = _this.renderDayMonthFormat.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(TimePicker, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.syncState(this.props);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props = this.props,
          currentTime = _this$props.currentTime,
          is12Hour = _this$props.is12Hour;

      if (currentTime !== prevProps.currentTime || is12Hour !== prevProps.is12Hour) {
        this.syncState(this.props);
      }
    }
    /**
     * Function that sets the date state and calls the onChange with a new date.
     * The date is truncated at the minutes.
     *
     * @param {Object} newDate The date object.
     */

  }, {
    key: "changeDate",
    value: function changeDate(newDate) {
      var dateWithStartOfMinutes = newDate.clone().startOf('minute');
      this.setState({
        date: dateWithStartOfMinutes
      });
      this.props.onChange(newDate.format(TIMEZONELESS_FORMAT));
    }
  }, {
    key: "getMaxHours",
    value: function getMaxHours() {
      return this.props.is12Hour ? 12 : 23;
    }
  }, {
    key: "getMinHours",
    value: function getMinHours() {
      return this.props.is12Hour ? 1 : 0;
    }
  }, {
    key: "syncState",
    value: function syncState(_ref) {
      var currentTime = _ref.currentTime,
          is12Hour = _ref.is12Hour;
      var selected = currentTime ? (0, _moment.default)(currentTime) : (0, _moment.default)();
      var day = selected.format('DD');
      var month = selected.format('MM');
      var year = selected.format('YYYY');
      var minutes = selected.format('mm');
      var am = selected.format('H') <= 11 ? 'AM' : 'PM';
      var hours = selected.format(is12Hour ? 'hh' : 'HH');
      var date = currentTime ? (0, _moment.default)(currentTime) : (0, _moment.default)();
      this.setState({
        day: day,
        month: month,
        year: year,
        minutes: minutes,
        hours: hours,
        am: am,
        date: date
      });
    }
  }, {
    key: "updateHours",
    value: function updateHours() {
      var is12Hour = this.props.is12Hour;
      var _this$state = this.state,
          am = _this$state.am,
          hours = _this$state.hours,
          date = _this$state.date;
      var value = parseInt(hours, 10);

      if (value === date.hour()) {
        return;
      }

      if (!(0, _lodash.isInteger)(value) || is12Hour && (value < 1 || value > 12) || !is12Hour && (value < 0 || value > 23)) {
        this.syncState(this.props);
        return;
      }

      var newDate = is12Hour ? date.clone().hours(am === 'AM' ? value % 12 : (value % 12 + 12) % 24) : date.clone().hours(value);
      this.changeDate(newDate);
    }
  }, {
    key: "updateMinutes",
    value: function updateMinutes() {
      var _this$state2 = this.state,
          minutes = _this$state2.minutes,
          date = _this$state2.date;
      var value = parseInt(minutes, 10);

      if (value === date.minute()) {
        return;
      }

      if (!(0, _lodash.isInteger)(value) || value < 0 || value > 59) {
        this.syncState(this.props);
        return;
      }

      var newDate = date.clone().minutes(value);
      this.changeDate(newDate);
    }
  }, {
    key: "updateDay",
    value: function updateDay() {
      var _this$state3 = this.state,
          day = _this$state3.day,
          date = _this$state3.date;
      var value = parseInt(day, 10);

      if (value === date.date()) {
        return;
      }

      if (!(0, _lodash.isInteger)(value) || value < 1 || value > 31) {
        this.syncState(this.props);
        return;
      }

      var newDate = date.clone().date(value);
      this.changeDate(newDate);
    }
  }, {
    key: "updateMonth",
    value: function updateMonth() {
      var _this$state4 = this.state,
          month = _this$state4.month,
          date = _this$state4.date;
      var value = parseInt(month, 10);

      if (value === date.month() + 1) {
        return;
      }

      if (!(0, _lodash.isInteger)(value) || value < 1 || value > 12) {
        this.syncState(this.props);
        return;
      }

      var newDate = date.clone().month(value - 1);
      this.changeDate(newDate);
    }
  }, {
    key: "updateYear",
    value: function updateYear() {
      var _this$state5 = this.state,
          year = _this$state5.year,
          date = _this$state5.date;
      var value = parseInt(year, 10);

      if (value === date.year()) {
        return;
      }

      if (!(0, _lodash.isInteger)(value) || value < 0 || value > 9999) {
        this.syncState(this.props);
        return;
      }

      var newDate = date.clone().year(value);
      this.changeDate(newDate);
    }
  }, {
    key: "updateAmPm",
    value: function updateAmPm(value) {
      var _this2 = this;

      return function () {
        var _this2$state = _this2.state,
            am = _this2$state.am,
            date = _this2$state.date,
            hours = _this2$state.hours;

        if (am === value) {
          return;
        }

        var newDate;

        if (value === 'PM') {
          newDate = date.clone().hours((parseInt(hours, 10) % 12 + 12) % 24);
        } else {
          newDate = date.clone().hours(parseInt(hours, 10) % 12);
        }

        _this2.changeDate(newDate);
      };
    }
  }, {
    key: "onChangeDay",
    value: function onChangeDay(event) {
      this.setState({
        day: event.target.value
      });
    }
  }, {
    key: "onChangeMonth",
    value: function onChangeMonth(event) {
      this.setState({
        month: event.target.value
      });
    }
  }, {
    key: "onChangeYear",
    value: function onChangeYear(event) {
      this.setState({
        year: event.target.value
      });
    }
  }, {
    key: "onChangeHours",
    value: function onChangeHours(event) {
      this.setState({
        hours: event.target.value
      });
    }
  }, {
    key: "onChangeMinutes",
    value: function onChangeMinutes(event) {
      var minutes = event.target.value;
      this.setState({
        minutes: minutes === '' ? '' : ('0' + minutes).slice(-2)
      });
    }
  }, {
    key: "renderMonth",
    value: function renderMonth(month) {
      return (0, _element.createElement)("div", {
        key: "render-month",
        className: "components-datetime__time-field components-datetime__time-field-month"
      }, (0, _element.createElement)("select", {
        "aria-label": (0, _i18n.__)('Month'),
        className: "components-datetime__time-field-month-select",
        value: month,
        onChange: this.onChangeMonth,
        onBlur: this.updateMonth
      }, (0, _element.createElement)("option", {
        value: "01"
      }, (0, _i18n.__)('January')), (0, _element.createElement)("option", {
        value: "02"
      }, (0, _i18n.__)('February')), (0, _element.createElement)("option", {
        value: "03"
      }, (0, _i18n.__)('March')), (0, _element.createElement)("option", {
        value: "04"
      }, (0, _i18n.__)('April')), (0, _element.createElement)("option", {
        value: "05"
      }, (0, _i18n.__)('May')), (0, _element.createElement)("option", {
        value: "06"
      }, (0, _i18n.__)('June')), (0, _element.createElement)("option", {
        value: "07"
      }, (0, _i18n.__)('July')), (0, _element.createElement)("option", {
        value: "08"
      }, (0, _i18n.__)('August')), (0, _element.createElement)("option", {
        value: "09"
      }, (0, _i18n.__)('September')), (0, _element.createElement)("option", {
        value: "10"
      }, (0, _i18n.__)('October')), (0, _element.createElement)("option", {
        value: "11"
      }, (0, _i18n.__)('November')), (0, _element.createElement)("option", {
        value: "12"
      }, (0, _i18n.__)('December'))));
    }
  }, {
    key: "renderDay",
    value: function renderDay(day) {
      return (0, _element.createElement)("div", {
        key: "render-day",
        className: "components-datetime__time-field components-datetime__time-field-day"
      }, (0, _element.createElement)("input", {
        "aria-label": (0, _i18n.__)('Day'),
        className: "components-datetime__time-field-day-input",
        type: "number",
        value: day,
        step: 1,
        min: 1,
        onChange: this.onChangeDay,
        onBlur: this.updateDay
      }));
    }
  }, {
    key: "renderDayMonthFormat",
    value: function renderDayMonthFormat(is12Hour) {
      var _this$state6 = this.state,
          day = _this$state6.day,
          month = _this$state6.month;
      var layout = [this.renderDay(day), this.renderMonth(month)];
      return is12Hour ? layout : layout.reverse();
    }
  }, {
    key: "render",
    value: function render() {
      var is12Hour = this.props.is12Hour;
      var _this$state7 = this.state,
          year = _this$state7.year,
          minutes = _this$state7.minutes,
          hours = _this$state7.hours,
          am = _this$state7.am;
      return (0, _element.createElement)("div", {
        className: (0, _classnames.default)('components-datetime__time')
      }, (0, _element.createElement)("fieldset", null, (0, _element.createElement)("legend", {
        className: "components-datetime__time-legend invisible"
      }, (0, _i18n.__)('Date')), (0, _element.createElement)("div", {
        className: "components-datetime__time-wrapper"
      }, this.renderDayMonthFormat(is12Hour), (0, _element.createElement)("div", {
        className: "components-datetime__time-field components-datetime__time-field-year"
      }, (0, _element.createElement)("input", {
        "aria-label": (0, _i18n.__)('Year'),
        className: "components-datetime__time-field-year-input",
        type: "number",
        step: 1,
        value: year,
        onChange: this.onChangeYear,
        onBlur: this.updateYear
      })))), (0, _element.createElement)("fieldset", null, (0, _element.createElement)("legend", {
        className: "components-datetime__time-legend invisible"
      }, (0, _i18n.__)('Time')), (0, _element.createElement)("div", {
        className: "components-datetime__time-wrapper"
      }, (0, _element.createElement)("div", {
        className: "components-datetime__time-field components-datetime__time-field-time"
      }, (0, _element.createElement)("input", {
        "aria-label": (0, _i18n.__)('Hours'),
        className: "components-datetime__time-field-hours-input",
        type: "number",
        step: 1,
        min: this.getMinHours(),
        max: this.getMaxHours(),
        value: hours,
        onChange: this.onChangeHours,
        onBlur: this.updateHours
      }), (0, _element.createElement)("span", {
        className: "components-datetime__time-separator",
        "aria-hidden": "true"
      }, ":"), (0, _element.createElement)("input", {
        "aria-label": (0, _i18n.__)('Minutes'),
        className: "components-datetime__time-field-minutes-input",
        type: "number",
        min: 0,
        max: 59,
        value: minutes,
        onChange: this.onChangeMinutes,
        onBlur: this.updateMinutes
      })), is12Hour && (0, _element.createElement)(_buttonGroup.default, {
        className: "components-datetime__time-field components-datetime__time-field-am-pm"
      }, (0, _element.createElement)(_button.default, {
        isPrimary: am === 'AM',
        isSecondary: am !== 'AM',
        onClick: this.updateAmPm('AM'),
        className: "components-datetime__time-am-button"
      }, (0, _i18n.__)('AM')), (0, _element.createElement)(_button.default, {
        isPrimary: am === 'PM',
        isSecondary: am !== 'PM',
        onClick: this.updateAmPm('PM'),
        className: "components-datetime__time-pm-button"
      }, (0, _i18n.__)('PM'))), (0, _element.createElement)(_timezone.default, null))));
    }
  }]);
  return TimePicker;
}(_element.Component);

var _default = TimePicker;
exports.default = _default;
//# sourceMappingURL=time.js.map