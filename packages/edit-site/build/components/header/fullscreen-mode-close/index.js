"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _data = require("@wordpress/data");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _icons = require("@wordpress/icons");

/**
 * WordPress dependencies
 */
function FullscreenModeClose(_ref) {
  var icon = _ref.icon;

  var _useSelect = (0, _data.useSelect)(function (select) {
    var _select = select('core/edit-site'),
        isFeatureActive = _select.isFeatureActive;

    var _select2 = select('core'),
        getEntityRecord = _select2.getEntityRecord;

    var _select3 = select('core/data'),
        isResolving = _select3.isResolving;

    var siteData = getEntityRecord('root', '__unstableBase', undefined) || {};
    return {
      isActive: isFeatureActive('fullscreenMode'),
      isRequestingSiteIcon: isResolving('core', 'getEntityRecord', ['root', '__unstableBase', undefined]),
      siteIconUrl: siteData.site_icon_url
    };
  }, []),
      isActive = _useSelect.isActive,
      isRequestingSiteIcon = _useSelect.isRequestingSiteIcon,
      siteIconUrl = _useSelect.siteIconUrl;

  if (!isActive) {
    return null;
  }

  var buttonIcon = (0, _element.createElement)(_components.Icon, {
    size: "36px",
    icon: _icons.wordpress
  });

  if (siteIconUrl) {
    buttonIcon = (0, _element.createElement)("img", {
      alt: (0, _i18n.__)('Site Icon'),
      className: "edit-site-fullscreen-mode-close_site-icon",
      src: siteIconUrl
    });
  } else if (isRequestingSiteIcon) {
    buttonIcon = null;
  } else if (icon) {
    buttonIcon = (0, _element.createElement)(_components.Icon, {
      size: "36px",
      icon: icon
    });
  }

  return (0, _element.createElement)(_components.Button, {
    className: "edit-site-fullscreen-mode-close has-icon",
    href: "index.php",
    label: (0, _i18n.__)('Back'),
    showTooltip: true
  }, buttonIcon);
}

var _default = FullscreenModeClose;
exports.default = _default;
//# sourceMappingURL=index.js.map