"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TemplatePartEdit;

var _element = require("@wordpress/element");

var _data = require("@wordpress/data");

var _useTemplatePartPost = _interopRequireDefault(require("./use-template-part-post"));

var _namePanel = _interopRequireDefault(require("./name-panel"));

var _innerBlocks = _interopRequireDefault(require("./inner-blocks"));

var _placeholder = _interopRequireDefault(require("./placeholder"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function TemplatePartEdit(_ref) {
  var _ref$attributes = _ref.attributes,
      _postId = _ref$attributes.postId,
      slug = _ref$attributes.slug,
      theme = _ref$attributes.theme,
      setAttributes = _ref.setAttributes,
      clientId = _ref.clientId,
      isSelected = _ref.isSelected;
  var initialPostId = (0, _element.useRef)(_postId);
  var initialSlug = (0, _element.useRef)(slug);
  var initialTheme = (0, _element.useRef)(theme); // Resolve the post ID if not set, and load its post.

  var postId = (0, _useTemplatePartPost.default)(_postId, slug, theme); // Set the post ID, once found, so that edits persist,
  // but wait until the third inner blocks change,
  // because the first 2 are just the template part
  // content loading.

  var _useSelect = (0, _data.useSelect)(function (select) {
    var _select = select('core/block-editor'),
        getBlocks = _select.getBlocks,
        getHasSelectedInnerBlock = _select.hasSelectedInnerBlock;

    return {
      innerBlocks: getBlocks(clientId),
      hasSelectedInnerBlock: getHasSelectedInnerBlock(clientId, true)
    };
  }, [clientId]),
      innerBlocks = _useSelect.innerBlocks,
      hasSelectedInnerBlock = _useSelect.hasSelectedInnerBlock;

  var _useDispatch = (0, _data.useDispatch)('core'),
      editEntityRecord = _useDispatch.editEntityRecord;

  var blockChanges = (0, _element.useRef)(0);
  (0, _element.useEffect)(function () {
    if (blockChanges.current < 4) blockChanges.current++;

    if (blockChanges.current === 3 && (initialPostId.current === undefined || initialPostId.current === null) && postId !== undefined && postId !== null) {
      setAttributes({
        postId: postId
      });
      editEntityRecord('postType', 'wp_template_part', postId, {
        status: 'publish'
      });
    }
  }, [innerBlocks]);

  if (postId) {
    // Part of a template file, post ID already resolved.
    return (0, _element.createElement)(_element.Fragment, null, (isSelected || hasSelectedInnerBlock) && (0, _element.createElement)(_namePanel.default, {
      postId: postId,
      setAttributes: setAttributes
    }), (0, _element.createElement)(_innerBlocks.default, {
      postId: postId,
      hasInnerBlocks: innerBlocks.length > 0
    }));
  }

  if (!initialSlug.current && !initialTheme.current) {
    // Fresh new block.
    return (0, _element.createElement)(_placeholder.default, {
      setAttributes: setAttributes
    });
  } // Part of a template file, post ID not resolved yet.


  return null;
}
//# sourceMappingURL=index.js.map