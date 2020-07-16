"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _lodash = require("lodash");

var _data = require("@wordpress/data");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _url = require("@wordpress/url");

var _icons = require("@wordpress/icons");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
function FullscreenModeClose() {
  var _useSelect = (0, _data.useSelect)(function (select) {
    var _select = select('core/editor'),
        getCurrentPostType = _select.getCurrentPostType;

    var _select2 = select('core/edit-post'),
        isFeatureActive = _select2.isFeatureActive;

    var _select3 = select('core/data'),
        isResolving = _select3.isResolving;

    var _select4 = select('core'),
        getEntityRecord = _select4.getEntityRecord,
        getPostType = _select4.getPostType;

    var siteData = getEntityRecord('root', '__unstableBase', undefined) || {};
    return {
      isActive: isFeatureActive('fullscreenMode'),
      isRequestingSiteIcon: isResolving('core', 'getEntityRecord', ['root', '__unstableBase', undefined]),
      postType: getPostType(getCurrentPostType()),
      siteIconUrl: siteData.site_icon_url
    };
  }, []),
      isActive = _useSelect.isActive,
      isRequestingSiteIcon = _useSelect.isRequestingSiteIcon,
      postType = _useSelect.postType,
      siteIconUrl = _useSelect.siteIconUrl;

  if (!isActive || !postType) {
    return null;
  }

  var buttonIcon = (0, _element.createElement)(_components.Icon, {
    size: "36px",
    icon: _icons.wordpress
  });

  if (siteIconUrl) {
    buttonIcon = (0, _element.createElement)("img", {
      alt: (0, _i18n.__)('Site Icon'),
      className: "edit-post-fullscreen-mode-close_site-icon",
      src: siteIconUrl
    });
  } else if (isRequestingSiteIcon) {
    buttonIcon = null;
  }

  return (0, _element.createElement)(_components.Button, {
    className: "edit-post-fullscreen-mode-close has-icon",
    href: (0, _url.addQueryArgs)('edit.php', {
      post_type: postType.slug
    }),
    label: (0, _lodash.get)(postType, ['labels', 'view_items'], (0, _i18n.__)('Back')),
    showTooltip: true
  }, buttonIcon);
}

var _default = FullscreenModeClose;
exports.default = _default;
//# sourceMappingURL=index.js.map