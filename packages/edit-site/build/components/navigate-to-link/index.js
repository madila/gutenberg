"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = NavigateToLink;

var _element = require("@wordpress/element");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _url = require("@wordpress/url");

var _data = require("@wordpress/data");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _utils = require("../../utils");

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function NavigateToLink(_ref) {
  var type = _ref.type,
      id = _ref.id,
      activePage = _ref.activePage,
      onActivePageChange = _ref.onActivePageChange;
  var pageEntity = (0, _data.useSelect)(function (select) {
    return type && id && type !== 'URL' && select('core').getEntityRecord('postType', type, id);
  }, [type, id]);
  var registry = (0, _data.useRegistry)();

  var _useState = (0, _element.useState)(),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      templateId = _useState2[0],
      setTemplateId = _useState2[1];

  (0, _element.useEffect)(function () {
    if (pageEntity) (0, _utils.findTemplate)(pageEntity.link, registry.__experimentalResolveSelect('core').getEntityRecords).then(function (newTemplateId) {
      return setTemplateId(newTemplateId);
    }, function () {
      return setTemplateId(null);
    });
  }, [pageEntity === null || pageEntity === void 0 ? void 0 : pageEntity.link, registry]);
  var onClick = (0, _element.useMemo)(function () {
    if (!pageEntity || !templateId) return null;
    var path = (0, _url.getPathAndQueryString)(pageEntity.link);
    if (path === activePage.path) return null;
    return function () {
      return onActivePageChange({
        type: type,
        slug: pageEntity.slug,
        path: path,
        context: {
          postType: pageEntity.type,
          postId: pageEntity.id
        }
      });
    };
  }, [pageEntity, templateId, activePage.path, onActivePageChange]);
  return onClick && (0, _element.createElement)(_components.Button, {
    icon: "welcome-write-blog",
    label: (0, _i18n.__)('Edit Page Template'),
    onClick: onClick
  });
}
//# sourceMappingURL=index.js.map