"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEmbedEditComponent = getEmbedEditComponent;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _util = require("./util");

var _embedControls = _interopRequireDefault(require("./embed-controls"));

var _embedLoading = _interopRequireDefault(require("./embed-loading"));

var _embedPlaceholder = _interopRequireDefault(require("./embed-placeholder"));

var _embedPreview = _interopRequireDefault(require("./embed-preview"));

var _classnames = _interopRequireDefault(require("classnames"));

var _i18n = require("@wordpress/i18n");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function getResponsiveHelp(checked) {
  return checked ? (0, _i18n.__)('This embed will preserve its aspect ratio when the browser is resized.') : (0, _i18n.__)('This embed may not preserve its aspect ratio when the browser is resized.');
}

function getEmbedEditComponent(title, icon) {
  var responsive = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var previewable = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  return function EmbedEditComponent(props) {
    var attributes = props.attributes,
        cannotEmbed = props.cannotEmbed,
        fetching = props.fetching,
        isSelected = props.isSelected,
        onReplace = props.onReplace,
        preview = props.preview,
        setAttributes = props.setAttributes,
        themeSupportsResponsive = props.themeSupportsResponsive,
        tryAgain = props.tryAgain,
        insertBlocksAfter = props.insertBlocksAfter;

    var _useState = (0, _element.useState)(attributes.url),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        url = _useState2[0],
        setURL = _useState2[1];

    var _useState3 = (0, _element.useState)(false),
        _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
        isEditingURL = _useState4[0],
        setIsEditingURL = _useState4[1];
    /**
     * @return {Object} Attributes derived from the preview, merged with the current attributes.
     */


    var getMergedAttributes = function getMergedAttributes() {
      var className = attributes.className,
          allowResponsive = attributes.allowResponsive;
      return _objectSpread({}, attributes, {}, (0, _util.getAttributesFromPreview)(preview, title, className, responsive, allowResponsive));
    };

    var handleIncomingPreview = function handleIncomingPreview() {
      setAttributes(getMergedAttributes());

      if (onReplace) {
        var upgradedBlock = (0, _util.createUpgradedEmbedBlock)(props, getMergedAttributes());

        if (upgradedBlock) {
          onReplace(upgradedBlock);
        }
      }
    };

    var toggleResponsive = function toggleResponsive() {
      var allowResponsive = attributes.allowResponsive,
          className = attributes.className;
      var html = preview.html;
      var newAllowResponsive = !allowResponsive;
      setAttributes({
        allowResponsive: newAllowResponsive,
        className: (0, _util.getClassNames)(html, className, responsive && newAllowResponsive)
      });
    };

    (0, _element.useEffect)(function () {
      if (!(preview === null || preview === void 0 ? void 0 : preview.html)) {
        return;
      } // If we can embed the url, bail early.


      if (!cannotEmbed) {
        return;
      } // At this stage, we either have a new preview or a new URL, but we can't embed it.
      // If we are already fetching the preview, bail early.


      if (fetching) {
        return;
      } // At this stage, we're not fetching the preview, so we know it can't be embedded, so try
      // removing any trailing slash, and resubmit.


      var newURL = attributes.url.replace(/\/$/, '');
      setURL(newURL);
      setIsEditingURL(false);
      setAttributes({
        url: newURL
      });
    }, [preview === null || preview === void 0 ? void 0 : preview.html, attributes.url]);
    (0, _element.useEffect)(function () {
      if (preview && !isEditingURL) {
        handleIncomingPreview();
      }
    }, [preview, isEditingURL]);

    if (fetching) {
      return (0, _element.createElement)(_embedLoading.default, null);
    } // translators: %s: type of embed e.g: "YouTube", "Twitter", etc. "Embed" is used when no specific type exists


    var label = (0, _i18n.sprintf)((0, _i18n.__)('%s URL'), title); // No preview, or we can't embed the current URL, or we've clicked the edit button.

    if (!preview || cannotEmbed || isEditingURL) {
      return (0, _element.createElement)(_embedPlaceholder.default, {
        icon: icon,
        label: label,
        onSubmit: function onSubmit(event) {
          if (event) {
            event.preventDefault();
          }

          setIsEditingURL(false);
          setAttributes({
            url: url
          });
        },
        value: url,
        cannotEmbed: cannotEmbed,
        onChange: function onChange(event) {
          return setURL(event.target.value);
        },
        fallback: function fallback() {
          return (0, _util.fallback)(url, onReplace);
        },
        tryAgain: tryAgain
      });
    } // Even though we set attributes that get derived from the preview,
    // we don't access them directly because for the initial render,
    // the `setAttributes` call will not have taken effect. If we're
    // rendering responsive content, setting the responsive classes
    // after the preview has been rendered can result in unwanted
    // clipping or scrollbars. The `getAttributesFromPreview` function
    // that `getMergedAttributes` uses is memoized so that we're not
    // calculating them on every render.


    var previewAttributes = getMergedAttributes(props, title, responsive);
    var caption = previewAttributes.caption,
        type = previewAttributes.type,
        allowResponsive = previewAttributes.allowResponsive;
    var className = (0, _classnames.default)(previewAttributes.className, props.className);
    return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_embedControls.default, {
      showEditButton: preview && !cannotEmbed,
      themeSupportsResponsive: themeSupportsResponsive,
      blockSupportsResponsive: responsive,
      allowResponsive: allowResponsive,
      getResponsiveHelp: getResponsiveHelp,
      toggleResponsive: toggleResponsive,
      switchBackToURLInput: function switchBackToURLInput() {
        return setIsEditingURL(true);
      }
    }), (0, _element.createElement)(_embedPreview.default, {
      preview: preview,
      previewable: previewable,
      className: className,
      url: url,
      type: type,
      caption: caption,
      onCaptionChange: function onCaptionChange(value) {
        return setAttributes({
          caption: value
        });
      },
      isSelected: isSelected,
      icon: icon,
      label: label,
      insertBlocksAfter: insertBlocksAfter
    }));
  };
}
//# sourceMappingURL=edit.js.map