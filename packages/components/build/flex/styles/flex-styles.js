"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Block = exports.Item = exports.Flex = void 0;

var _styledBase = _interopRequireDefault(require("@emotion/styled-base"));

var _core = require("@emotion/core");

function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }

var alignStyle = function alignStyle(_ref2) {
  var align = _ref2.align;
  var aligns = {
    top: 'flex-start',
    bottom: 'flex-end'
  };
  var value = aligns[align] || align;
  return /*#__PURE__*/(0, _core.css)({
    alignItems: value
  }, process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvZmxleC9zdHlsZXMvZmxleC1zdHlsZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBYVEiLCJmaWxlIjoiQHdvcmRwcmVzcy9jb21wb25lbnRzL3NyYy9mbGV4L3N0eWxlcy9mbGV4LXN0eWxlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL2NvcmUnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuXG5jb25zdCBhbGlnblN0eWxlID0gKCB7IGFsaWduIH0gKSA9PiB7XG5cdGNvbnN0IGFsaWducyA9IHtcblx0XHR0b3A6ICdmbGV4LXN0YXJ0Jyxcblx0XHRib3R0b206ICdmbGV4LWVuZCcsXG5cdH07XG5cdGNvbnN0IHZhbHVlID0gYWxpZ25zWyBhbGlnbiBdIHx8IGFsaWduO1xuXG5cdHJldHVybiBjc3MoIHtcblx0XHRhbGlnbkl0ZW1zOiB2YWx1ZSxcblx0fSApO1xufTtcblxuY29uc3QganVzdGlmeVN0eWxlID0gKCB7IGp1c3RpZnksIGlzUmV2ZXJzZWQgfSApID0+IHtcblx0Y29uc3QganVzdGlmaWVzID0ge1xuXHRcdGxlZnQ6ICdmbGV4LXN0YXJ0Jyxcblx0XHRyaWdodDogJ2ZsZXgtZW5kJyxcblx0fTtcblx0bGV0IHZhbHVlID0ganVzdGlmaWVzWyBqdXN0aWZ5IF0gfHwganVzdGlmeTtcblxuXHRpZiAoIGlzUmV2ZXJzZWQgJiYganVzdGlmaWVzWyBqdXN0aWZ5IF0gKSB7XG5cdFx0dmFsdWUgPSBqdXN0aWZ5ID09PSAnbGVmdCcgPyBqdXN0aWZpZXMucmlnaHQgOiBqdXN0aWZpZXMubGVmdDtcblx0fVxuXG5cdHJldHVybiBjc3MoIHtcblx0XHRqdXN0aWZ5Q29udGVudDogdmFsdWUsXG5cdH0gKTtcbn07XG5cbmNvbnN0IGdhcFN0eWxlID0gKCB7IGdhcCwgaXNSZXZlcnNlZCB9ICkgPT4ge1xuXHRjb25zdCBiYXNlID0gNDtcblx0Y29uc3QgdmFsdWUgPSB0eXBlb2YgZ2FwID09PSAnbnVtYmVyJyA/IGJhc2UgKiBnYXAgOiBiYXNlO1xuXHRjb25zdCBkaXIgPSBpc1JldmVyc2VkID8gJ2xlZnQnIDogJ3JpZ2h0Jztcblx0Y29uc3QgcGFkZGluZyA9IGBwYWRkaW5nLSR7IGRpciB9YDtcblxuXHRyZXR1cm4gY3NzYFxuXHRcdD4gKiB7XG5cdFx0XHQkeyBwYWRkaW5nIH06ICR7IHZhbHVlIH1weDtcblxuXHRcdFx0JjpsYXN0LWNoaWxkIHtcblx0XHRcdFx0JHsgcGFkZGluZyB9OiAwO1xuXHRcdFx0fVxuXHRcdH1cblx0YDtcbn07XG5cbmNvbnN0IHJldmVyc2VkU3R5bGVzID0gKCB7IGlzUmV2ZXJzZWQgfSApID0+IHtcblx0aWYgKCAhIGlzUmV2ZXJzZWQgKSByZXR1cm4gJyc7XG5cblx0cmV0dXJuIGNzc2Bcblx0XHRmbGV4LWRpcmVjdGlvbjogcm93LXJldmVyc2U7XG5cdGA7XG59O1xuXG5leHBvcnQgY29uc3QgRmxleCA9IHN0eWxlZC5kaXZgXG5cdGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG5cdGRpc3BsYXk6IGZsZXg7XG5cblx0JHsgYWxpZ25TdHlsZSB9O1xuXHQkeyBqdXN0aWZ5U3R5bGUgfTtcblx0JHsgZ2FwU3R5bGUgfTtcblx0JHsgcmV2ZXJzZWRTdHlsZXMgfTtcbmA7XG5cbmV4cG9ydCBjb25zdCBJdGVtID0gc3R5bGVkLmRpdmBcblx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcblx0bWluLXdpZHRoOiAwO1xuXHRtYXgtd2lkdGg6IDEwMCU7XG5gO1xuXG5leHBvcnQgY29uc3QgQmxvY2sgPSBzdHlsZWQoIEl0ZW0gKWBcblx0ZmxleDogMTtcbmA7XG4iXX0= */");
};

var justifyStyle = function justifyStyle(_ref3) {
  var justify = _ref3.justify,
      isReversed = _ref3.isReversed;
  var justifies = {
    left: 'flex-start',
    right: 'flex-end'
  };
  var value = justifies[justify] || justify;

  if (isReversed && justifies[justify]) {
    value = justify === 'left' ? justifies.right : justifies.left;
  }

  return /*#__PURE__*/(0, _core.css)({
    justifyContent: value
  }, process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvZmxleC9zdHlsZXMvZmxleC1zdHlsZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNkJRIiwiZmlsZSI6IkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvZmxleC9zdHlsZXMvZmxleC1zdHlsZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9jb3JlJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcblxuY29uc3QgYWxpZ25TdHlsZSA9ICggeyBhbGlnbiB9ICkgPT4ge1xuXHRjb25zdCBhbGlnbnMgPSB7XG5cdFx0dG9wOiAnZmxleC1zdGFydCcsXG5cdFx0Ym90dG9tOiAnZmxleC1lbmQnLFxuXHR9O1xuXHRjb25zdCB2YWx1ZSA9IGFsaWduc1sgYWxpZ24gXSB8fCBhbGlnbjtcblxuXHRyZXR1cm4gY3NzKCB7XG5cdFx0YWxpZ25JdGVtczogdmFsdWUsXG5cdH0gKTtcbn07XG5cbmNvbnN0IGp1c3RpZnlTdHlsZSA9ICggeyBqdXN0aWZ5LCBpc1JldmVyc2VkIH0gKSA9PiB7XG5cdGNvbnN0IGp1c3RpZmllcyA9IHtcblx0XHRsZWZ0OiAnZmxleC1zdGFydCcsXG5cdFx0cmlnaHQ6ICdmbGV4LWVuZCcsXG5cdH07XG5cdGxldCB2YWx1ZSA9IGp1c3RpZmllc1sganVzdGlmeSBdIHx8IGp1c3RpZnk7XG5cblx0aWYgKCBpc1JldmVyc2VkICYmIGp1c3RpZmllc1sganVzdGlmeSBdICkge1xuXHRcdHZhbHVlID0ganVzdGlmeSA9PT0gJ2xlZnQnID8ganVzdGlmaWVzLnJpZ2h0IDoganVzdGlmaWVzLmxlZnQ7XG5cdH1cblxuXHRyZXR1cm4gY3NzKCB7XG5cdFx0anVzdGlmeUNvbnRlbnQ6IHZhbHVlLFxuXHR9ICk7XG59O1xuXG5jb25zdCBnYXBTdHlsZSA9ICggeyBnYXAsIGlzUmV2ZXJzZWQgfSApID0+IHtcblx0Y29uc3QgYmFzZSA9IDQ7XG5cdGNvbnN0IHZhbHVlID0gdHlwZW9mIGdhcCA9PT0gJ251bWJlcicgPyBiYXNlICogZ2FwIDogYmFzZTtcblx0Y29uc3QgZGlyID0gaXNSZXZlcnNlZCA/ICdsZWZ0JyA6ICdyaWdodCc7XG5cdGNvbnN0IHBhZGRpbmcgPSBgcGFkZGluZy0keyBkaXIgfWA7XG5cblx0cmV0dXJuIGNzc2Bcblx0XHQ+ICoge1xuXHRcdFx0JHsgcGFkZGluZyB9OiAkeyB2YWx1ZSB9cHg7XG5cblx0XHRcdCY6bGFzdC1jaGlsZCB7XG5cdFx0XHRcdCR7IHBhZGRpbmcgfTogMDtcblx0XHRcdH1cblx0XHR9XG5cdGA7XG59O1xuXG5jb25zdCByZXZlcnNlZFN0eWxlcyA9ICggeyBpc1JldmVyc2VkIH0gKSA9PiB7XG5cdGlmICggISBpc1JldmVyc2VkICkgcmV0dXJuICcnO1xuXG5cdHJldHVybiBjc3NgXG5cdFx0ZmxleC1kaXJlY3Rpb246IHJvdy1yZXZlcnNlO1xuXHRgO1xufTtcblxuZXhwb3J0IGNvbnN0IEZsZXggPSBzdHlsZWQuZGl2YFxuXHRib3gtc2l6aW5nOiBib3JkZXItYm94O1xuXHRkaXNwbGF5OiBmbGV4O1xuXG5cdCR7IGFsaWduU3R5bGUgfTtcblx0JHsganVzdGlmeVN0eWxlIH07XG5cdCR7IGdhcFN0eWxlIH07XG5cdCR7IHJldmVyc2VkU3R5bGVzIH07XG5gO1xuXG5leHBvcnQgY29uc3QgSXRlbSA9IHN0eWxlZC5kaXZgXG5cdGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG5cdG1pbi13aWR0aDogMDtcblx0bWF4LXdpZHRoOiAxMDAlO1xuYDtcblxuZXhwb3J0IGNvbnN0IEJsb2NrID0gc3R5bGVkKCBJdGVtIClgXG5cdGZsZXg6IDE7XG5gO1xuIl19 */");
};

var gapStyle = function gapStyle(_ref4) {
  var gap = _ref4.gap,
      isReversed = _ref4.isReversed;
  var base = 4;
  var value = typeof gap === 'number' ? base * gap : base;
  var dir = isReversed ? 'left' : 'right';
  var padding = "padding-".concat(dir);
  return /*#__PURE__*/(0, _core.css)("> *{", padding, ":", value, "px;&:last-child{", padding, ":0;}}" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvZmxleC9zdHlsZXMvZmxleC1zdHlsZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBd0NXIiwiZmlsZSI6IkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvZmxleC9zdHlsZXMvZmxleC1zdHlsZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9jb3JlJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcblxuY29uc3QgYWxpZ25TdHlsZSA9ICggeyBhbGlnbiB9ICkgPT4ge1xuXHRjb25zdCBhbGlnbnMgPSB7XG5cdFx0dG9wOiAnZmxleC1zdGFydCcsXG5cdFx0Ym90dG9tOiAnZmxleC1lbmQnLFxuXHR9O1xuXHRjb25zdCB2YWx1ZSA9IGFsaWduc1sgYWxpZ24gXSB8fCBhbGlnbjtcblxuXHRyZXR1cm4gY3NzKCB7XG5cdFx0YWxpZ25JdGVtczogdmFsdWUsXG5cdH0gKTtcbn07XG5cbmNvbnN0IGp1c3RpZnlTdHlsZSA9ICggeyBqdXN0aWZ5LCBpc1JldmVyc2VkIH0gKSA9PiB7XG5cdGNvbnN0IGp1c3RpZmllcyA9IHtcblx0XHRsZWZ0OiAnZmxleC1zdGFydCcsXG5cdFx0cmlnaHQ6ICdmbGV4LWVuZCcsXG5cdH07XG5cdGxldCB2YWx1ZSA9IGp1c3RpZmllc1sganVzdGlmeSBdIHx8IGp1c3RpZnk7XG5cblx0aWYgKCBpc1JldmVyc2VkICYmIGp1c3RpZmllc1sganVzdGlmeSBdICkge1xuXHRcdHZhbHVlID0ganVzdGlmeSA9PT0gJ2xlZnQnID8ganVzdGlmaWVzLnJpZ2h0IDoganVzdGlmaWVzLmxlZnQ7XG5cdH1cblxuXHRyZXR1cm4gY3NzKCB7XG5cdFx0anVzdGlmeUNvbnRlbnQ6IHZhbHVlLFxuXHR9ICk7XG59O1xuXG5jb25zdCBnYXBTdHlsZSA9ICggeyBnYXAsIGlzUmV2ZXJzZWQgfSApID0+IHtcblx0Y29uc3QgYmFzZSA9IDQ7XG5cdGNvbnN0IHZhbHVlID0gdHlwZW9mIGdhcCA9PT0gJ251bWJlcicgPyBiYXNlICogZ2FwIDogYmFzZTtcblx0Y29uc3QgZGlyID0gaXNSZXZlcnNlZCA/ICdsZWZ0JyA6ICdyaWdodCc7XG5cdGNvbnN0IHBhZGRpbmcgPSBgcGFkZGluZy0keyBkaXIgfWA7XG5cblx0cmV0dXJuIGNzc2Bcblx0XHQ+ICoge1xuXHRcdFx0JHsgcGFkZGluZyB9OiAkeyB2YWx1ZSB9cHg7XG5cblx0XHRcdCY6bGFzdC1jaGlsZCB7XG5cdFx0XHRcdCR7IHBhZGRpbmcgfTogMDtcblx0XHRcdH1cblx0XHR9XG5cdGA7XG59O1xuXG5jb25zdCByZXZlcnNlZFN0eWxlcyA9ICggeyBpc1JldmVyc2VkIH0gKSA9PiB7XG5cdGlmICggISBpc1JldmVyc2VkICkgcmV0dXJuICcnO1xuXG5cdHJldHVybiBjc3NgXG5cdFx0ZmxleC1kaXJlY3Rpb246IHJvdy1yZXZlcnNlO1xuXHRgO1xufTtcblxuZXhwb3J0IGNvbnN0IEZsZXggPSBzdHlsZWQuZGl2YFxuXHRib3gtc2l6aW5nOiBib3JkZXItYm94O1xuXHRkaXNwbGF5OiBmbGV4O1xuXG5cdCR7IGFsaWduU3R5bGUgfTtcblx0JHsganVzdGlmeVN0eWxlIH07XG5cdCR7IGdhcFN0eWxlIH07XG5cdCR7IHJldmVyc2VkU3R5bGVzIH07XG5gO1xuXG5leHBvcnQgY29uc3QgSXRlbSA9IHN0eWxlZC5kaXZgXG5cdGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG5cdG1pbi13aWR0aDogMDtcblx0bWF4LXdpZHRoOiAxMDAlO1xuYDtcblxuZXhwb3J0IGNvbnN0IEJsb2NrID0gc3R5bGVkKCBJdGVtIClgXG5cdGZsZXg6IDE7XG5gO1xuIl19 */"));
};

var _ref = process.env.NODE_ENV === "production" ? {
  name: "8kj89b",
  styles: "flex-direction:row-reverse;"
} : {
  name: "8kj89b",
  styles: "flex-direction:row-reverse;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvZmxleC9zdHlsZXMvZmxleC1zdHlsZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBc0RXIiwiZmlsZSI6IkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvZmxleC9zdHlsZXMvZmxleC1zdHlsZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9jb3JlJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcblxuY29uc3QgYWxpZ25TdHlsZSA9ICggeyBhbGlnbiB9ICkgPT4ge1xuXHRjb25zdCBhbGlnbnMgPSB7XG5cdFx0dG9wOiAnZmxleC1zdGFydCcsXG5cdFx0Ym90dG9tOiAnZmxleC1lbmQnLFxuXHR9O1xuXHRjb25zdCB2YWx1ZSA9IGFsaWduc1sgYWxpZ24gXSB8fCBhbGlnbjtcblxuXHRyZXR1cm4gY3NzKCB7XG5cdFx0YWxpZ25JdGVtczogdmFsdWUsXG5cdH0gKTtcbn07XG5cbmNvbnN0IGp1c3RpZnlTdHlsZSA9ICggeyBqdXN0aWZ5LCBpc1JldmVyc2VkIH0gKSA9PiB7XG5cdGNvbnN0IGp1c3RpZmllcyA9IHtcblx0XHRsZWZ0OiAnZmxleC1zdGFydCcsXG5cdFx0cmlnaHQ6ICdmbGV4LWVuZCcsXG5cdH07XG5cdGxldCB2YWx1ZSA9IGp1c3RpZmllc1sganVzdGlmeSBdIHx8IGp1c3RpZnk7XG5cblx0aWYgKCBpc1JldmVyc2VkICYmIGp1c3RpZmllc1sganVzdGlmeSBdICkge1xuXHRcdHZhbHVlID0ganVzdGlmeSA9PT0gJ2xlZnQnID8ganVzdGlmaWVzLnJpZ2h0IDoganVzdGlmaWVzLmxlZnQ7XG5cdH1cblxuXHRyZXR1cm4gY3NzKCB7XG5cdFx0anVzdGlmeUNvbnRlbnQ6IHZhbHVlLFxuXHR9ICk7XG59O1xuXG5jb25zdCBnYXBTdHlsZSA9ICggeyBnYXAsIGlzUmV2ZXJzZWQgfSApID0+IHtcblx0Y29uc3QgYmFzZSA9IDQ7XG5cdGNvbnN0IHZhbHVlID0gdHlwZW9mIGdhcCA9PT0gJ251bWJlcicgPyBiYXNlICogZ2FwIDogYmFzZTtcblx0Y29uc3QgZGlyID0gaXNSZXZlcnNlZCA/ICdsZWZ0JyA6ICdyaWdodCc7XG5cdGNvbnN0IHBhZGRpbmcgPSBgcGFkZGluZy0keyBkaXIgfWA7XG5cblx0cmV0dXJuIGNzc2Bcblx0XHQ+ICoge1xuXHRcdFx0JHsgcGFkZGluZyB9OiAkeyB2YWx1ZSB9cHg7XG5cblx0XHRcdCY6bGFzdC1jaGlsZCB7XG5cdFx0XHRcdCR7IHBhZGRpbmcgfTogMDtcblx0XHRcdH1cblx0XHR9XG5cdGA7XG59O1xuXG5jb25zdCByZXZlcnNlZFN0eWxlcyA9ICggeyBpc1JldmVyc2VkIH0gKSA9PiB7XG5cdGlmICggISBpc1JldmVyc2VkICkgcmV0dXJuICcnO1xuXG5cdHJldHVybiBjc3NgXG5cdFx0ZmxleC1kaXJlY3Rpb246IHJvdy1yZXZlcnNlO1xuXHRgO1xufTtcblxuZXhwb3J0IGNvbnN0IEZsZXggPSBzdHlsZWQuZGl2YFxuXHRib3gtc2l6aW5nOiBib3JkZXItYm94O1xuXHRkaXNwbGF5OiBmbGV4O1xuXG5cdCR7IGFsaWduU3R5bGUgfTtcblx0JHsganVzdGlmeVN0eWxlIH07XG5cdCR7IGdhcFN0eWxlIH07XG5cdCR7IHJldmVyc2VkU3R5bGVzIH07XG5gO1xuXG5leHBvcnQgY29uc3QgSXRlbSA9IHN0eWxlZC5kaXZgXG5cdGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG5cdG1pbi13aWR0aDogMDtcblx0bWF4LXdpZHRoOiAxMDAlO1xuYDtcblxuZXhwb3J0IGNvbnN0IEJsb2NrID0gc3R5bGVkKCBJdGVtIClgXG5cdGZsZXg6IDE7XG5gO1xuIl19 */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};

var reversedStyles = function reversedStyles(_ref5) {
  var isReversed = _ref5.isReversed;
  if (!isReversed) return '';
  return _ref;
};

var Flex = (0, _styledBase.default)("div", {
  target: "eboqfv50",
  label: "Flex"
})("box-sizing:border-box;display:flex;", alignStyle, ";", justifyStyle, ";", gapStyle, ";", reversedStyles, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvZmxleC9zdHlsZXMvZmxleC1zdHlsZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBMkQ4QiIsImZpbGUiOiJAd29yZHByZXNzL2NvbXBvbmVudHMvc3JjL2ZsZXgvc3R5bGVzL2ZsZXgtc3R5bGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vY29yZSc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5cbmNvbnN0IGFsaWduU3R5bGUgPSAoIHsgYWxpZ24gfSApID0+IHtcblx0Y29uc3QgYWxpZ25zID0ge1xuXHRcdHRvcDogJ2ZsZXgtc3RhcnQnLFxuXHRcdGJvdHRvbTogJ2ZsZXgtZW5kJyxcblx0fTtcblx0Y29uc3QgdmFsdWUgPSBhbGlnbnNbIGFsaWduIF0gfHwgYWxpZ247XG5cblx0cmV0dXJuIGNzcygge1xuXHRcdGFsaWduSXRlbXM6IHZhbHVlLFxuXHR9ICk7XG59O1xuXG5jb25zdCBqdXN0aWZ5U3R5bGUgPSAoIHsganVzdGlmeSwgaXNSZXZlcnNlZCB9ICkgPT4ge1xuXHRjb25zdCBqdXN0aWZpZXMgPSB7XG5cdFx0bGVmdDogJ2ZsZXgtc3RhcnQnLFxuXHRcdHJpZ2h0OiAnZmxleC1lbmQnLFxuXHR9O1xuXHRsZXQgdmFsdWUgPSBqdXN0aWZpZXNbIGp1c3RpZnkgXSB8fCBqdXN0aWZ5O1xuXG5cdGlmICggaXNSZXZlcnNlZCAmJiBqdXN0aWZpZXNbIGp1c3RpZnkgXSApIHtcblx0XHR2YWx1ZSA9IGp1c3RpZnkgPT09ICdsZWZ0JyA/IGp1c3RpZmllcy5yaWdodCA6IGp1c3RpZmllcy5sZWZ0O1xuXHR9XG5cblx0cmV0dXJuIGNzcygge1xuXHRcdGp1c3RpZnlDb250ZW50OiB2YWx1ZSxcblx0fSApO1xufTtcblxuY29uc3QgZ2FwU3R5bGUgPSAoIHsgZ2FwLCBpc1JldmVyc2VkIH0gKSA9PiB7XG5cdGNvbnN0IGJhc2UgPSA0O1xuXHRjb25zdCB2YWx1ZSA9IHR5cGVvZiBnYXAgPT09ICdudW1iZXInID8gYmFzZSAqIGdhcCA6IGJhc2U7XG5cdGNvbnN0IGRpciA9IGlzUmV2ZXJzZWQgPyAnbGVmdCcgOiAncmlnaHQnO1xuXHRjb25zdCBwYWRkaW5nID0gYHBhZGRpbmctJHsgZGlyIH1gO1xuXG5cdHJldHVybiBjc3NgXG5cdFx0PiAqIHtcblx0XHRcdCR7IHBhZGRpbmcgfTogJHsgdmFsdWUgfXB4O1xuXG5cdFx0XHQmOmxhc3QtY2hpbGQge1xuXHRcdFx0XHQkeyBwYWRkaW5nIH06IDA7XG5cdFx0XHR9XG5cdFx0fVxuXHRgO1xufTtcblxuY29uc3QgcmV2ZXJzZWRTdHlsZXMgPSAoIHsgaXNSZXZlcnNlZCB9ICkgPT4ge1xuXHRpZiAoICEgaXNSZXZlcnNlZCApIHJldHVybiAnJztcblxuXHRyZXR1cm4gY3NzYFxuXHRcdGZsZXgtZGlyZWN0aW9uOiByb3ctcmV2ZXJzZTtcblx0YDtcbn07XG5cbmV4cG9ydCBjb25zdCBGbGV4ID0gc3R5bGVkLmRpdmBcblx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcblx0ZGlzcGxheTogZmxleDtcblxuXHQkeyBhbGlnblN0eWxlIH07XG5cdCR7IGp1c3RpZnlTdHlsZSB9O1xuXHQkeyBnYXBTdHlsZSB9O1xuXHQkeyByZXZlcnNlZFN0eWxlcyB9O1xuYDtcblxuZXhwb3J0IGNvbnN0IEl0ZW0gPSBzdHlsZWQuZGl2YFxuXHRib3gtc2l6aW5nOiBib3JkZXItYm94O1xuXHRtaW4td2lkdGg6IDA7XG5cdG1heC13aWR0aDogMTAwJTtcbmA7XG5cbmV4cG9ydCBjb25zdCBCbG9jayA9IHN0eWxlZCggSXRlbSApYFxuXHRmbGV4OiAxO1xuYDtcbiJdfQ== */"));
exports.Flex = Flex;
var Item = (0, _styledBase.default)("div", {
  target: "eboqfv51",
  label: "Item"
})(process.env.NODE_ENV === "production" ? {
  name: "13luw5d",
  styles: "box-sizing:border-box;min-width:0;max-width:100%;"
} : {
  name: "13luw5d",
  styles: "box-sizing:border-box;min-width:0;max-width:100%;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvZmxleC9zdHlsZXMvZmxleC1zdHlsZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBcUU4QiIsImZpbGUiOiJAd29yZHByZXNzL2NvbXBvbmVudHMvc3JjL2ZsZXgvc3R5bGVzL2ZsZXgtc3R5bGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vY29yZSc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5cbmNvbnN0IGFsaWduU3R5bGUgPSAoIHsgYWxpZ24gfSApID0+IHtcblx0Y29uc3QgYWxpZ25zID0ge1xuXHRcdHRvcDogJ2ZsZXgtc3RhcnQnLFxuXHRcdGJvdHRvbTogJ2ZsZXgtZW5kJyxcblx0fTtcblx0Y29uc3QgdmFsdWUgPSBhbGlnbnNbIGFsaWduIF0gfHwgYWxpZ247XG5cblx0cmV0dXJuIGNzcygge1xuXHRcdGFsaWduSXRlbXM6IHZhbHVlLFxuXHR9ICk7XG59O1xuXG5jb25zdCBqdXN0aWZ5U3R5bGUgPSAoIHsganVzdGlmeSwgaXNSZXZlcnNlZCB9ICkgPT4ge1xuXHRjb25zdCBqdXN0aWZpZXMgPSB7XG5cdFx0bGVmdDogJ2ZsZXgtc3RhcnQnLFxuXHRcdHJpZ2h0OiAnZmxleC1lbmQnLFxuXHR9O1xuXHRsZXQgdmFsdWUgPSBqdXN0aWZpZXNbIGp1c3RpZnkgXSB8fCBqdXN0aWZ5O1xuXG5cdGlmICggaXNSZXZlcnNlZCAmJiBqdXN0aWZpZXNbIGp1c3RpZnkgXSApIHtcblx0XHR2YWx1ZSA9IGp1c3RpZnkgPT09ICdsZWZ0JyA/IGp1c3RpZmllcy5yaWdodCA6IGp1c3RpZmllcy5sZWZ0O1xuXHR9XG5cblx0cmV0dXJuIGNzcygge1xuXHRcdGp1c3RpZnlDb250ZW50OiB2YWx1ZSxcblx0fSApO1xufTtcblxuY29uc3QgZ2FwU3R5bGUgPSAoIHsgZ2FwLCBpc1JldmVyc2VkIH0gKSA9PiB7XG5cdGNvbnN0IGJhc2UgPSA0O1xuXHRjb25zdCB2YWx1ZSA9IHR5cGVvZiBnYXAgPT09ICdudW1iZXInID8gYmFzZSAqIGdhcCA6IGJhc2U7XG5cdGNvbnN0IGRpciA9IGlzUmV2ZXJzZWQgPyAnbGVmdCcgOiAncmlnaHQnO1xuXHRjb25zdCBwYWRkaW5nID0gYHBhZGRpbmctJHsgZGlyIH1gO1xuXG5cdHJldHVybiBjc3NgXG5cdFx0PiAqIHtcblx0XHRcdCR7IHBhZGRpbmcgfTogJHsgdmFsdWUgfXB4O1xuXG5cdFx0XHQmOmxhc3QtY2hpbGQge1xuXHRcdFx0XHQkeyBwYWRkaW5nIH06IDA7XG5cdFx0XHR9XG5cdFx0fVxuXHRgO1xufTtcblxuY29uc3QgcmV2ZXJzZWRTdHlsZXMgPSAoIHsgaXNSZXZlcnNlZCB9ICkgPT4ge1xuXHRpZiAoICEgaXNSZXZlcnNlZCApIHJldHVybiAnJztcblxuXHRyZXR1cm4gY3NzYFxuXHRcdGZsZXgtZGlyZWN0aW9uOiByb3ctcmV2ZXJzZTtcblx0YDtcbn07XG5cbmV4cG9ydCBjb25zdCBGbGV4ID0gc3R5bGVkLmRpdmBcblx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcblx0ZGlzcGxheTogZmxleDtcblxuXHQkeyBhbGlnblN0eWxlIH07XG5cdCR7IGp1c3RpZnlTdHlsZSB9O1xuXHQkeyBnYXBTdHlsZSB9O1xuXHQkeyByZXZlcnNlZFN0eWxlcyB9O1xuYDtcblxuZXhwb3J0IGNvbnN0IEl0ZW0gPSBzdHlsZWQuZGl2YFxuXHRib3gtc2l6aW5nOiBib3JkZXItYm94O1xuXHRtaW4td2lkdGg6IDA7XG5cdG1heC13aWR0aDogMTAwJTtcbmA7XG5cbmV4cG9ydCBjb25zdCBCbG9jayA9IHN0eWxlZCggSXRlbSApYFxuXHRmbGV4OiAxO1xuYDtcbiJdfQ== */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
});
exports.Item = Item;
var Block = ( /*#__PURE__*/0, _styledBase.default)(Item, {
  target: "eboqfv52",
  label: "Block"
})(process.env.NODE_ENV === "production" ? {
  name: "1rr4qq7",
  styles: "flex:1;"
} : {
  name: "1rr4qq7",
  styles: "flex:1;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvZmxleC9zdHlsZXMvZmxleC1zdHlsZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBMkVtQyIsImZpbGUiOiJAd29yZHByZXNzL2NvbXBvbmVudHMvc3JjL2ZsZXgvc3R5bGVzL2ZsZXgtc3R5bGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vY29yZSc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5cbmNvbnN0IGFsaWduU3R5bGUgPSAoIHsgYWxpZ24gfSApID0+IHtcblx0Y29uc3QgYWxpZ25zID0ge1xuXHRcdHRvcDogJ2ZsZXgtc3RhcnQnLFxuXHRcdGJvdHRvbTogJ2ZsZXgtZW5kJyxcblx0fTtcblx0Y29uc3QgdmFsdWUgPSBhbGlnbnNbIGFsaWduIF0gfHwgYWxpZ247XG5cblx0cmV0dXJuIGNzcygge1xuXHRcdGFsaWduSXRlbXM6IHZhbHVlLFxuXHR9ICk7XG59O1xuXG5jb25zdCBqdXN0aWZ5U3R5bGUgPSAoIHsganVzdGlmeSwgaXNSZXZlcnNlZCB9ICkgPT4ge1xuXHRjb25zdCBqdXN0aWZpZXMgPSB7XG5cdFx0bGVmdDogJ2ZsZXgtc3RhcnQnLFxuXHRcdHJpZ2h0OiAnZmxleC1lbmQnLFxuXHR9O1xuXHRsZXQgdmFsdWUgPSBqdXN0aWZpZXNbIGp1c3RpZnkgXSB8fCBqdXN0aWZ5O1xuXG5cdGlmICggaXNSZXZlcnNlZCAmJiBqdXN0aWZpZXNbIGp1c3RpZnkgXSApIHtcblx0XHR2YWx1ZSA9IGp1c3RpZnkgPT09ICdsZWZ0JyA/IGp1c3RpZmllcy5yaWdodCA6IGp1c3RpZmllcy5sZWZ0O1xuXHR9XG5cblx0cmV0dXJuIGNzcygge1xuXHRcdGp1c3RpZnlDb250ZW50OiB2YWx1ZSxcblx0fSApO1xufTtcblxuY29uc3QgZ2FwU3R5bGUgPSAoIHsgZ2FwLCBpc1JldmVyc2VkIH0gKSA9PiB7XG5cdGNvbnN0IGJhc2UgPSA0O1xuXHRjb25zdCB2YWx1ZSA9IHR5cGVvZiBnYXAgPT09ICdudW1iZXInID8gYmFzZSAqIGdhcCA6IGJhc2U7XG5cdGNvbnN0IGRpciA9IGlzUmV2ZXJzZWQgPyAnbGVmdCcgOiAncmlnaHQnO1xuXHRjb25zdCBwYWRkaW5nID0gYHBhZGRpbmctJHsgZGlyIH1gO1xuXG5cdHJldHVybiBjc3NgXG5cdFx0PiAqIHtcblx0XHRcdCR7IHBhZGRpbmcgfTogJHsgdmFsdWUgfXB4O1xuXG5cdFx0XHQmOmxhc3QtY2hpbGQge1xuXHRcdFx0XHQkeyBwYWRkaW5nIH06IDA7XG5cdFx0XHR9XG5cdFx0fVxuXHRgO1xufTtcblxuY29uc3QgcmV2ZXJzZWRTdHlsZXMgPSAoIHsgaXNSZXZlcnNlZCB9ICkgPT4ge1xuXHRpZiAoICEgaXNSZXZlcnNlZCApIHJldHVybiAnJztcblxuXHRyZXR1cm4gY3NzYFxuXHRcdGZsZXgtZGlyZWN0aW9uOiByb3ctcmV2ZXJzZTtcblx0YDtcbn07XG5cbmV4cG9ydCBjb25zdCBGbGV4ID0gc3R5bGVkLmRpdmBcblx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcblx0ZGlzcGxheTogZmxleDtcblxuXHQkeyBhbGlnblN0eWxlIH07XG5cdCR7IGp1c3RpZnlTdHlsZSB9O1xuXHQkeyBnYXBTdHlsZSB9O1xuXHQkeyByZXZlcnNlZFN0eWxlcyB9O1xuYDtcblxuZXhwb3J0IGNvbnN0IEl0ZW0gPSBzdHlsZWQuZGl2YFxuXHRib3gtc2l6aW5nOiBib3JkZXItYm94O1xuXHRtaW4td2lkdGg6IDA7XG5cdG1heC13aWR0aDogMTAwJTtcbmA7XG5cbmV4cG9ydCBjb25zdCBCbG9jayA9IHN0eWxlZCggSXRlbSApYFxuXHRmbGV4OiAxO1xuYDtcbiJdfQ== */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
});
exports.Block = Block;
//# sourceMappingURL=flex-styles.js.map