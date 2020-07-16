"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

var _hooks = require("@wordpress/hooks");

var _components = require("@wordpress/components");

var _compose = require("@wordpress/compose");

var _data = require("@wordpress/data");

var _blockEditor = require("@wordpress/block-editor");

var _check = _interopRequireDefault(require("./check"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var ALLOWED_MEDIA_TYPES = ['image']; // Used when labels from post type were not yet loaded or when they are not present.

var DEFAULT_FEATURE_IMAGE_LABEL = (0, _i18n.__)('Featured image');
var DEFAULT_SET_FEATURE_IMAGE_LABEL = (0, _i18n.__)('Set featured image');
var DEFAULT_REMOVE_FEATURE_IMAGE_LABEL = (0, _i18n.__)('Remove image');

function PostFeaturedImage(_ref) {
  var currentPostId = _ref.currentPostId,
      featuredImageId = _ref.featuredImageId,
      onUpdateImage = _ref.onUpdateImage,
      onDropImage = _ref.onDropImage,
      onRemoveImage = _ref.onRemoveImage,
      media = _ref.media,
      postType = _ref.postType,
      noticeUI = _ref.noticeUI;
  var postLabel = (0, _lodash.get)(postType, ['labels'], {});
  var instructions = (0, _element.createElement)("p", null, (0, _i18n.__)('To edit the featured image, you need permission to upload media.'));
  var mediaWidth, mediaHeight, mediaSourceUrl;

  if (media) {
    var mediaSize = (0, _hooks.applyFilters)('editor.PostFeaturedImage.imageSize', 'post-thumbnail', media.id, currentPostId);

    if ((0, _lodash.has)(media, ['media_details', 'sizes', mediaSize])) {
      // use mediaSize when available
      mediaWidth = media.media_details.sizes[mediaSize].width;
      mediaHeight = media.media_details.sizes[mediaSize].height;
      mediaSourceUrl = media.media_details.sizes[mediaSize].source_url;
    } else {
      // get fallbackMediaSize if mediaSize is not available
      var fallbackMediaSize = (0, _hooks.applyFilters)('editor.PostFeaturedImage.imageSize', 'thumbnail', media.id, currentPostId);

      if ((0, _lodash.has)(media, ['media_details', 'sizes', fallbackMediaSize])) {
        // use fallbackMediaSize when mediaSize is not available
        mediaWidth = media.media_details.sizes[fallbackMediaSize].width;
        mediaHeight = media.media_details.sizes[fallbackMediaSize].height;
        mediaSourceUrl = media.media_details.sizes[fallbackMediaSize].source_url;
      } else {
        // use full image size when mediaFallbackSize and mediaSize are not available
        mediaWidth = media.media_details.width;
        mediaHeight = media.media_details.height;
        mediaSourceUrl = media.source_url;
      }
    }
  }

  return (0, _element.createElement)(_check.default, null, noticeUI, (0, _element.createElement)("div", {
    className: "editor-post-featured-image"
  }, (0, _element.createElement)(_blockEditor.MediaUploadCheck, {
    fallback: instructions
  }, (0, _element.createElement)(_blockEditor.MediaUpload, {
    title: postLabel.featured_image || DEFAULT_FEATURE_IMAGE_LABEL,
    onSelect: onUpdateImage,
    unstableFeaturedImageFlow: true,
    allowedTypes: ALLOWED_MEDIA_TYPES,
    modalClass: !featuredImageId ? 'editor-post-featured-image__media-modal' : 'editor-post-featured-image__media-modal',
    render: function render(_ref2) {
      var open = _ref2.open;
      return (0, _element.createElement)("div", {
        className: "editor-post-featured-image__container"
      }, (0, _element.createElement)(_components.Button, {
        className: !featuredImageId ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview',
        onClick: open,
        "aria-label": !featuredImageId ? null : (0, _i18n.__)('Edit or update the image')
      }, !!featuredImageId && media && (0, _element.createElement)(_components.ResponsiveWrapper, {
        naturalWidth: mediaWidth,
        naturalHeight: mediaHeight,
        isInline: true
      }, (0, _element.createElement)("img", {
        src: mediaSourceUrl,
        alt: ""
      })), !!featuredImageId && !media && (0, _element.createElement)(_components.Spinner, null), !featuredImageId && (postLabel.set_featured_image || DEFAULT_SET_FEATURE_IMAGE_LABEL)), (0, _element.createElement)(_components.DropZone, {
        onFilesDrop: onDropImage
      }));
    },
    value: featuredImageId
  })), !!featuredImageId && media && !media.isLoading && (0, _element.createElement)(_blockEditor.MediaUploadCheck, null, (0, _element.createElement)(_blockEditor.MediaUpload, {
    title: postLabel.featured_image || DEFAULT_FEATURE_IMAGE_LABEL,
    onSelect: onUpdateImage,
    unstableFeaturedImageFlow: true,
    allowedTypes: ALLOWED_MEDIA_TYPES,
    modalClass: "editor-post-featured-image__media-modal",
    render: function render(_ref3) {
      var open = _ref3.open;
      return (0, _element.createElement)(_components.Button, {
        onClick: open,
        isSecondary: true
      }, (0, _i18n.__)('Replace Image'));
    }
  })), !!featuredImageId && (0, _element.createElement)(_blockEditor.MediaUploadCheck, null, (0, _element.createElement)(_components.Button, {
    onClick: onRemoveImage,
    isLink: true,
    isDestructive: true
  }, postLabel.remove_featured_image || DEFAULT_REMOVE_FEATURE_IMAGE_LABEL))));
}

var applyWithSelect = (0, _data.withSelect)(function (select) {
  var _select = select('core'),
      getMedia = _select.getMedia,
      getPostType = _select.getPostType;

  var _select2 = select('core/editor'),
      getCurrentPostId = _select2.getCurrentPostId,
      getEditedPostAttribute = _select2.getEditedPostAttribute;

  var featuredImageId = getEditedPostAttribute('featured_media');
  return {
    media: featuredImageId ? getMedia(featuredImageId) : null,
    currentPostId: getCurrentPostId(),
    postType: getPostType(getEditedPostAttribute('type')),
    featuredImageId: featuredImageId
  };
});
var applyWithDispatch = (0, _data.withDispatch)(function (dispatch, _ref4, _ref5) {
  var noticeOperations = _ref4.noticeOperations;
  var select = _ref5.select;

  var _dispatch = dispatch('core/editor'),
      editPost = _dispatch.editPost;

  return {
    onUpdateImage: function onUpdateImage(image) {
      editPost({
        featured_media: image.id
      });
    },
    onDropImage: function onDropImage(filesList) {
      select('core/block-editor').getSettings().mediaUpload({
        allowedTypes: ['image'],
        filesList: filesList,
        onFileChange: function onFileChange(_ref6) {
          var _ref7 = (0, _slicedToArray2.default)(_ref6, 1),
              image = _ref7[0];

          editPost({
            featured_media: image.id
          });
        },
        onError: function onError(message) {
          noticeOperations.removeAllNotices();
          noticeOperations.createErrorNotice(message);
        }
      });
    },
    onRemoveImage: function onRemoveImage() {
      editPost({
        featured_media: 0
      });
    }
  };
});

var _default = (0, _compose.compose)(_components.withNotices, applyWithSelect, applyWithDispatch, (0, _components.withFilters)('editor.PostFeaturedImage'))(PostFeaturedImage);

exports.default = _default;
//# sourceMappingURL=index.js.map