"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useBoundaryStyle = useBoundaryStyle;

var _element = require("@wordpress/element");

/**
 * WordPress dependencies
 */

/**
 * Calculates and renders the format boundary style when the active formats
 * change.
 */
function useBoundaryStyle(_ref) {
  var activeFormats = _ref.activeFormats,
      ref = _ref.ref;
  (0, _element.useEffect)(function () {
    // There's no need to recalculate the boundary styles if no formats are
    // active, because no boundary styles will be visible.
    if (!activeFormats || !activeFormats.length) {
      return;
    }

    var boundarySelector = '*[data-rich-text-format-boundary]';
    var element = ref.current.querySelector(boundarySelector);

    if (!element) {
      return;
    }

    var ownerDocument = element.ownerDocument;
    var defaultView = ownerDocument.defaultView;
    var computedStyle = defaultView.getComputedStyle(element);
    var newColor = computedStyle.color.replace(')', ', 0.2)').replace('rgb', 'rgba');
    var selector = ".rich-text:focus ".concat(boundarySelector);
    var rule = "background-color: ".concat(newColor);
    var style = "".concat(selector, " {").concat(rule, "}");
    var globalStyleId = 'rich-text-boundary-style';
    var globalStyle = ownerDocument.getElementById(globalStyleId);

    if (!globalStyle) {
      globalStyle = ownerDocument.createElement('style');
      globalStyle.id = globalStyleId;
      ownerDocument.head.appendChild(globalStyle);
    }

    if (globalStyle.innerHTML !== style) {
      globalStyle.innerHTML = style;
    }
  }, [activeFormats]);
}
//# sourceMappingURL=use-boundary-style.js.map