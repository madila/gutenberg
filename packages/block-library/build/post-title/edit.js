"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PostTitleEdit;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _data = require("@wordpress/data");

var _blockEditor = require("@wordpress/block-editor");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _headingLevelDropdown = _interopRequireDefault(require("../heading/heading-level-dropdown"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function PostTitleEdit(_ref) {
  var attributes = _ref.attributes,
      setAttributes = _ref.setAttributes,
      context = _ref.context;
  var level = attributes.level,
      align = attributes.align;
  var postType = context.postType,
      postId = context.postId;
  var tagName = 0 === level ? 'p' : 'h' + level;
  var post = (0, _data.useSelect)(function (select) {
    return select('core').getEditedEntityRecord('postType', postType, postId);
  }, [postType, postId]);

  if (!post) {
    return null;
  }

  return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_blockEditor.BlockControls, null, (0, _element.createElement)(_components.ToolbarGroup, null, (0, _element.createElement)(_headingLevelDropdown.default, {
    selectedLevel: level,
    onChange: function onChange(newLevel) {
      return setAttributes({
        level: newLevel
      });
    }
  })), (0, _element.createElement)(_blockEditor.AlignmentToolbar, {
    value: align,
    onChange: function onChange(nextAlign) {
      setAttributes({
        align: nextAlign
      });
    }
  })), (0, _element.createElement)(_blockEditor.__experimentalBlock, {
    tagName: tagName,
    className: (0, _classnames2.default)((0, _defineProperty2.default)({}, "has-text-align-".concat(align), align))
  }, post.title || (0, _i18n.__)('Post Title')));
}
//# sourceMappingURL=edit.js.map