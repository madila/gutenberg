"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = BlockAreas;

var _element = require("@wordpress/element");

var _data = require("@wordpress/data");

var _icons = require("@wordpress/icons");

var _blockEditor = require("@wordpress/block-editor");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

/**
 * WordPress dependencies
 */
function BlockArea(_ref) {
  var clientId = _ref.clientId;

  var _useSelect = (0, _data.useSelect)(function (select) {
    var _select = select('core/block-editor'),
        getBlockAttributes = _select.getBlockAttributes,
        getBlockSelectionStart = _select.getBlockSelectionStart;

    return {
      name: getBlockAttributes(clientId).name,
      selectedBlock: getBlockSelectionStart()
    };
  }, [clientId]),
      name = _useSelect.name,
      selectedBlock = _useSelect.selectedBlock;

  var _useDispatch = (0, _data.useDispatch)('core/block-editor'),
      selectBlock = _useDispatch.selectBlock;

  var isSelected = selectedBlock === clientId;
  return (0, _element.createElement)("li", null, (0, _element.createElement)(_components.Button, {
    "aria-expanded": isSelected,
    onClick: isSelected ? undefined : function () {
      selectBlock(clientId);
    }
  }, name, (0, _element.createElement)("span", {
    className: "edit-widgets-block-areas__edit"
  }, (0, _i18n.__)('Edit'))));
}

function BlockAreas() {
  var blockOrder = (0, _data.useSelect)(function (select) {
    return select('core/block-editor').getBlockOrder();
  });
  var hasBlockAreas = blockOrder.length > 0;
  return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)("div", {
    className: "edit-widgets-block-areas"
  }, (0, _element.createElement)("div", {
    className: "edit-widgets-block-areas__top-container"
  }, (0, _element.createElement)(_blockEditor.BlockIcon, {
    icon: _icons.blockDefault
  }), (0, _element.createElement)("div", null, (0, _element.createElement)("p", null, (0, _i18n.__)('Block Areas (also known as "Widget Areas") are global parts in your site\'s layout that can accept blocks. These vary by theme, but are typically parts like your Sidebar or Footer.')), !hasBlockAreas && (0, _element.createElement)("p", null, (0, _i18n.__)('Your theme does not contain block areas.')))), hasBlockAreas && (0, _element.createElement)("ul", null, blockOrder.map(function (clientId) {
    return (0, _element.createElement)(BlockArea, {
      key: clientId,
      clientId: clientId
    });
  }))));
}
//# sourceMappingURL=block-areas.js.map