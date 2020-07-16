"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = htmlFormattingRemover;

var _utils = require("./utils");

/**
 * Internal dependencies
 */
function isFormattingSpace(character) {
  return character === ' ' || character === '\r' || character === '\n' || character === '\t';
}
/**
 * Removes spacing that formats HTML.
 *
 * @see https://www.w3.org/TR/css-text-3/#white-space-processing
 *
 * @param {Node} node The node to be processed.
 * @return {void}
 */


function htmlFormattingRemover(node) {
  if (node.nodeType !== node.TEXT_NODE) {
    return;
  } // Ignore pre content. Note that this does not use Element#closest due to
  // a combination of (a) node may not be Element and (b) node.parentElement
  // does not have full support in all browsers (Internet Exporer).
  //
  // See: https://developer.mozilla.org/en-US/docs/Web/API/Node/parentElement#Browser_compatibility

  /** @type {Node?} */


  var parent = node;

  while (parent = parent.parentNode) {
    if (parent.nodeType === window.Node.ELEMENT_NODE && parent.nodeName === 'PRE') {
      return;
    }
  } // First, replace any sequence of HTML formatting space with a single space.


  var newData = node.data.replace(/[ \r\n\t]+/g, ' '); // Remove the leading space if the text element is at the start of a block,
  // is preceded by a line break element, or has a space in the previous
  // node.

  if (newData[0] === ' ') {
    var previousSibling = (0, _utils.getSibling)(node, 'previous');

    if (!previousSibling || previousSibling.nodeName === 'BR' || previousSibling.textContent.slice(-1) === ' ') {
      newData = newData.slice(1);
    }
  } // Remove the trailing space if the text element is at the end of a block,
  // is succeded by a line break element, or has a space in the next text
  // node.


  if (newData[newData.length - 1] === ' ') {
    var nextSibling = (0, _utils.getSibling)(node, 'next');

    if (!nextSibling || nextSibling.nodeName === 'BR' || nextSibling.nodeType === nextSibling.TEXT_NODE && isFormattingSpace(nextSibling.textContent[0])) {
      newData = newData.slice(0, -1);
    }
  } // If there's no data left, remove the node, so `previousSibling` stays
  // accurate. Otherwise, update the node data.


  if (!newData) {
    node.parentNode.removeChild(node);
  } else {
    node.data = newData;
  }
}
//# sourceMappingURL=html-formatting-remover.js.map