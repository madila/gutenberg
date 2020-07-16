"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _reactNative = require("react-native");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _icons = require("@wordpress/icons");

var _compose = require("@wordpress/compose");

var _mediaEdit = require("../media-edit");

var _imageWithFocalpoint = require("../image-with-focalpoint");

var _style = _interopRequireDefault(require("./style.scss"));

var _iconRetry = _interopRequireDefault(require("./icon-retry"));

var _iconCustomize = _interopRequireDefault(require("./icon-customize"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var ICON_TYPE = {
  PLACEHOLDER: 'placeholder',
  RETRY: 'retry',
  UPLOAD: 'upload'
};

function editImageComponent(_ref) {
  var open = _ref.open,
      mediaOptions = _ref.mediaOptions;
  return (0, _element.createElement)(_reactNative.TouchableWithoutFeedback, {
    onPress: open
  }, (0, _element.createElement)(_reactNative.View, {
    style: _style.default.editContainer
  }, (0, _element.createElement)(_reactNative.View, {
    style: _style.default.edit
  }, mediaOptions(), (0, _element.createElement)(_components.Icon, (0, _extends2.default)({
    size: 16,
    icon: _iconCustomize.default
  }, _style.default.iconCustomise)))));
}

var ImageComponent = function ImageComponent(_ref2) {
  var align = _ref2.align,
      alt = _ref2.alt,
      isSelected = _ref2.isSelected,
      isUploadFailed = _ref2.isUploadFailed,
      isUploadInProgress = _ref2.isUploadInProgress,
      onSelectMediaUploadOption = _ref2.onSelectMediaUploadOption,
      openMediaOptions = _ref2.openMediaOptions,
      retryMessage = _ref2.retryMessage,
      url = _ref2.url,
      imageWidth = _ref2.width,
      focalPoint = _ref2.focalPoint;

  var _useState = (0, _element.useState)(null),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      imageData = _useState2[0],
      setImageData = _useState2[1];

  var _useState3 = (0, _element.useState)(null),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      containerSize = _useState4[0],
      setContainerSize = _useState4[1];

  (0, _element.useEffect)(function () {
    if (url) {
      _reactNative.Image.getSize(url, function (imgWidth, imgHeight) {
        setImageData({
          aspectRatio: imgWidth / imgHeight,
          width: imgWidth,
          height: imgHeight
        });
      });
    }
  }, [url]);

  var onContainerLayout = function onContainerLayout(event) {
    var _event$nativeEvent$la = event.nativeEvent.layout,
        height = _event$nativeEvent$la.height,
        width = _event$nativeEvent$la.width;

    if (width !== 0 && height !== 0 && ((containerSize === null || containerSize === void 0 ? void 0 : containerSize.width) !== width || (containerSize === null || containerSize === void 0 ? void 0 : containerSize.height) !== height)) {
      setContainerSize({
        width: width,
        height: height
      });
    }
  };

  var getIcon = function getIcon(iconType) {
    var iconStyle;

    switch (iconType) {
      case ICON_TYPE.RETRY:
        return (0, _element.createElement)(_components.Icon, (0, _extends2.default)({
          icon: _iconRetry.default
        }, _style.default.iconRetry));

      case ICON_TYPE.PLACEHOLDER:
        iconStyle = iconPlaceholderStyles;
        break;

      case ICON_TYPE.UPLOAD:
        iconStyle = iconUploadStyles;
        break;
    }

    return (0, _element.createElement)(_components.Icon, (0, _extends2.default)({
      icon: _icons.image
    }, iconStyle));
  };

  var iconPlaceholderStyles = (0, _compose.usePreferredColorSchemeStyle)(_style.default.iconPlaceholder, _style.default.iconPlaceholderDark);
  var iconUploadStyles = (0, _compose.usePreferredColorSchemeStyle)(_style.default.iconUpload, _style.default.iconUploadDark);
  var placeholderStyles = (0, _compose.usePreferredColorSchemeStyle)(_style.default.imageContainerUpload, _style.default.imageContainerUploadDark);
  var customWidth = (imageData === null || imageData === void 0 ? void 0 : imageData.width) < (containerSize === null || containerSize === void 0 ? void 0 : containerSize.width) ? imageData === null || imageData === void 0 ? void 0 : imageData.width : '100%';
  var imageContainerStyles = [_style.default.imageContent, {
    width: imageData && imageWidth > 0 && imageWidth < (containerSize === null || containerSize === void 0 ? void 0 : containerSize.width) ? imageWidth : customWidth
  }, focalPoint && _style.default.focalPointContainer];
  var imageStyles = [{
    opacity: isUploadInProgress ? 0.3 : 1,
    height: containerSize === null || containerSize === void 0 ? void 0 : containerSize.height
  }, focalPoint && _style.default.focalPoint, focalPoint && (0, _imageWithFocalpoint.getImageWithFocalPointStyles)(focalPoint, containerSize, imageData), !focalPoint && imageData && containerSize && {
    height: (imageData === null || imageData === void 0 ? void 0 : imageData.width) > (containerSize === null || containerSize === void 0 ? void 0 : containerSize.width) ? (containerSize === null || containerSize === void 0 ? void 0 : containerSize.width) / (imageData === null || imageData === void 0 ? void 0 : imageData.aspectRatio) : undefined
  }];
  return (0, _element.createElement)(_reactNative.View, {
    style: [_style.default.container, // only set alignItems if an image exists because alignItems causes the placeholder
    // to disappear when an aligned image can't be downloaded
    // https://github.com/wordpress-mobile/gutenberg-mobile/issues/1592
    imageData && align && {
      alignItems: align
    }],
    onLayout: onContainerLayout
  }, (0, _element.createElement)(_reactNative.View, {
    accessible: true,
    disabled: !isSelected,
    accessibilityLabel: alt,
    accessibilityHint: (0, _i18n.__)('Double tap and hold to edit'),
    accessibilityRole: 'imagebutton',
    key: url,
    style: imageContainerStyles
  }, isSelected && !(isUploadInProgress || isUploadFailed) && (0, _element.createElement)(_reactNative.View, {
    style: [_style.default.imageBorder, {
      height: containerSize === null || containerSize === void 0 ? void 0 : containerSize.height
    }]
  }), !imageData ? (0, _element.createElement)(_reactNative.View, {
    style: placeholderStyles
  }, (0, _element.createElement)(_reactNative.View, {
    style: _style.default.imageUploadingIconContainer
  }, getIcon(ICON_TYPE.UPLOAD))) : (0, _element.createElement)(_reactNative.View, {
    style: focalPoint && _style.default.focalPointContent
  }, (0, _element.createElement)(_reactNative.Image, (0, _extends2.default)({
    aspectRatio: imageData === null || imageData === void 0 ? void 0 : imageData.aspectRatio,
    style: imageStyles,
    source: {
      uri: url
    }
  }, !focalPoint && {
    resizeMethod: 'scale'
  }))), isUploadFailed && (0, _element.createElement)(_reactNative.View, {
    style: [_style.default.imageContainer, _style.default.retryContainer]
  }, (0, _element.createElement)(_reactNative.View, {
    style: _style.default.modalIcon
  }, getIcon(ICON_TYPE.RETRY)), (0, _element.createElement)(_reactNative.Text, {
    style: _style.default.uploadFailedText
  }, retryMessage)), isSelected && !isUploadInProgress && !isUploadFailed && (imageData || focalPoint) && (0, _element.createElement)(_mediaEdit.MediaEdit, {
    onSelect: onSelectMediaUploadOption,
    source: {
      uri: url
    },
    openReplaceMediaOptions: openMediaOptions,
    render: editImageComponent
  })));
};

var _default = ImageComponent;
exports.default = _default;
//# sourceMappingURL=index.native.js.map