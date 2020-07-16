"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flattenBlocks = void 0;

var flattenBlocks = function flattenBlocks(blocks) {
  return blocks.flatMap(function (item) {
    return [item].concat(flattenBlocks(item.innerBlocks || []));
  });
};

exports.flattenBlocks = flattenBlocks;
//# sourceMappingURL=helpers.js.map