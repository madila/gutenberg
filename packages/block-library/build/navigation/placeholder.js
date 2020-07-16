"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _lodash = require("lodash");

var _classnames = _interopRequireDefault(require("classnames"));

var _blocks3 = require("@wordpress/blocks");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _i18n = require("@wordpress/i18n");

var _icons = require("@wordpress/icons");

var _createDataTree = _interopRequireDefault(require("./create-data-tree"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var CREATE_EMPTY_OPTION_VALUE = '__CREATE_EMPTY__';
var CREATE_FROM_PAGES_OPTION_VALUE = '__CREATE_FROM_PAGES__';
/**
 * Get instruction text for the Placeholder component.
 *
 * @param {boolean} hasMenus Flag that indicates if there are menus.
 * @param {boolean} hasPages Flag that indicates if there are pages.
 *
 * @return {string} Text to display as the placeholder instructions.
 */

function getPlaceholderInstructions(hasMenus, hasPages) {
  if (hasMenus && hasPages) {
    return (0, _i18n.__)('Use an existing menu here, include all top-level pages, or add an empty Navigation block.');
  } else if (hasMenus && !hasPages) {
    return (0, _i18n.__)('Use an existing menu here, or add an empty Navigation block.');
  } else if (!hasMenus && hasPages) {
    return (0, _i18n.__)('Include all existing pages here, or add an empty Navigation block.');
  }

  return (0, _i18n.__)('Create an empty navigation.');
}
/**
 * Return the menu id if the user has one selected.
 *
 * @param {Object} selectedCreateOption An object containing details of
 *                                      the selected create option.
 *
 * @return {number|undefined} The menu id.
 */


function getSelectedMenu(selectedCreateOption) {
  var optionId = selectedCreateOption === null || selectedCreateOption === void 0 ? void 0 : selectedCreateOption.id;
  return optionId !== undefined && Number.isInteger(optionId) ? optionId : undefined;
}
/**
 * A recursive function that maps menu item nodes to blocks.
 *
 * @param {Object[]} nodes An array of menu items.
 *
 * @return {WPBlock[]} An array of blocks.
 */


function mapMenuItemsToBlocks(nodes) {
  return nodes.map(function (_ref) {
    var title = _ref.title,
        type = _ref.type,
        url = _ref.link,
        id = _ref.id,
        children = _ref.children;
    var innerBlocks = children && children.length ? mapMenuItemsToBlocks(children) : [];
    return (0, _blocks3.createBlock)('core/navigation-link', {
      type: type,
      id: id,
      url: url,
      label: !title.rendered ? (0, _i18n.__)('(no title)') : (0, _lodash.escape)(title.rendered),
      opensInNewTab: false
    }, innerBlocks);
  });
}
/**
 * Convert a flat menu item structure to a nested blocks structure.
 *
 * @param {Object[]} menuItems An array of menu items.
 *
 * @return {WPBlock[]} An array of blocks.
 */


function convertMenuItemsToBlocks(menuItems) {
  if (!menuItems) {
    return null;
  }

  var menuTree = (0, _createDataTree.default)(menuItems);
  return mapMenuItemsToBlocks(menuTree);
}
/**
 * Convert pages to blocks.
 *
 * @param {Object[]} pages An array of pages.
 *
 * @return {WPBlock[]} An array of blocks.
 */


function convertPagesToBlocks(pages) {
  if (!pages) {
    return null;
  }

  return pages.map(function (_ref2) {
    var title = _ref2.title,
        type = _ref2.type,
        url = _ref2.link,
        id = _ref2.id;
    return (0, _blocks3.createBlock)('core/navigation-link', {
      type: type,
      id: id,
      url: url,
      label: !title.rendered ? (0, _i18n.__)('(no title)') : (0, _lodash.escape)(title.rendered),
      opensInNewTab: false
    });
  });
}

function NavigationPlaceholder(_ref3, ref) {
  var onCreate = _ref3.onCreate;

  var _useState = (0, _element.useState)(),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      selectedCreateOption = _useState2[0],
      setSelectedCreateOption = _useState2[1];

  var _useState3 = (0, _element.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      isCreatingFromMenu = _useState4[0],
      setIsCreatingFromMenu = _useState4[1];

  var _useSelect = (0, _data.useSelect)(function (select) {
    var _select = select('core'),
        getEntityRecords = _select.getEntityRecords,
        getMenus = _select.getMenus,
        getMenuItems = _select.getMenuItems,
        isResolving = _select.isResolving,
        hasFinishedResolution = _select.hasFinishedResolution;

    var pagesParameters = ['postType', 'page', {
      parent: 0,
      order: 'asc',
      orderby: 'id'
    }];
    var menusParameters = [{
      per_page: -1
    }];
    var selectedMenu = getSelectedMenu(selectedCreateOption);
    var hasSelectedMenu = selectedMenu !== undefined;
    var menuItemsParameters = hasSelectedMenu ? [{
      menus: selectedMenu,
      per_page: -1
    }] : undefined;
    return {
      pages: getEntityRecords.apply(void 0, pagesParameters),
      isResolvingPages: isResolving('getEntityRecords', pagesParameters),
      hasResolvedPages: hasFinishedResolution('getEntityRecords', pagesParameters),
      menus: getMenus.apply(void 0, menusParameters),
      isResolvingMenus: isResolving('getMenus', menusParameters),
      hasResolvedMenus: hasFinishedResolution('getMenus', menusParameters),
      menuItems: hasSelectedMenu ? getMenuItems.apply(void 0, (0, _toConsumableArray2.default)(menuItemsParameters)) : undefined,
      hasResolvedMenuItems: hasSelectedMenu ? hasFinishedResolution('getMenuItems', menuItemsParameters) : false
    };
  }, [selectedCreateOption]),
      pages = _useSelect.pages,
      isResolvingPages = _useSelect.isResolvingPages,
      hasResolvedPages = _useSelect.hasResolvedPages,
      menus = _useSelect.menus,
      isResolvingMenus = _useSelect.isResolvingMenus,
      hasResolvedMenus = _useSelect.hasResolvedMenus,
      menuItems = _useSelect.menuItems,
      hasResolvedMenuItems = _useSelect.hasResolvedMenuItems;

  var hasPages = !!(hasResolvedPages && (pages === null || pages === void 0 ? void 0 : pages.length));
  var hasMenus = !!(hasResolvedMenus && (menus === null || menus === void 0 ? void 0 : menus.length));
  var isLoading = isResolvingPages || isResolvingMenus;
  var createOptions = (0, _element.useMemo)(function () {
    return [].concat((0, _toConsumableArray2.default)(hasMenus ? menus : []), [{
      id: CREATE_EMPTY_OPTION_VALUE,
      name: (0, _i18n.__)('Create empty Navigation'),
      className: 'is-create-empty-option'
    }], (0, _toConsumableArray2.default)(hasPages ? [{
      id: CREATE_FROM_PAGES_OPTION_VALUE,
      name: (0, _i18n.__)('Create from all top-level pages')
    }] : []));
  }, [menus, hasMenus, hasPages]);
  var createFromMenu = (0, _element.useCallback)(function () {
    // If an empty menu was selected, create an empty block.
    if (!menuItems.length) {
      var _blocks = [(0, _blocks3.createBlock)('core/navigation-link')];
      onCreate(_blocks);
      return;
    }

    var blocks = convertMenuItemsToBlocks(menuItems);
    var selectNavigationBlock = true;
    onCreate(blocks, selectNavigationBlock);
  });
  var onCreateButtonClick = (0, _element.useCallback)(function () {
    if (!selectedCreateOption) {
      return;
    }

    var key = selectedCreateOption.key;

    switch (key) {
      case CREATE_EMPTY_OPTION_VALUE:
        {
          var blocks = [(0, _blocks3.createBlock)('core/navigation-link')];
          onCreate(blocks);
          return;
        }

      case CREATE_FROM_PAGES_OPTION_VALUE:
        {
          var _blocks2 = convertPagesToBlocks(pages);

          var selectNavigationBlock = true;
          onCreate(_blocks2, selectNavigationBlock);
          return;
        }
      // The default case indicates that a menu was selected.

      default:
        // If we have menu items, create the block right away.
        if (hasResolvedMenuItems) {
          createFromMenu();
          return;
        } // Otherwise, create the block when resolution finishes.


        setIsCreatingFromMenu(true);
    }
  });
  (0, _element.useEffect)(function () {
    // If the user selected a menu but we had to wait for menu items to
    // finish resolving, then create the block once resolution finishes.
    if (isCreatingFromMenu && hasResolvedMenuItems) {
      createFromMenu();
      setIsCreatingFromMenu(false);
    }
  }, [isCreatingFromMenu, hasResolvedMenuItems]);

  if (hasMenus && !selectedCreateOption) {
    setSelectedCreateOption(createOptions[0]);
  }

  return (0, _element.createElement)(_components.Placeholder, {
    className: "wp-block-navigation-placeholder",
    icon: _icons.navigation,
    label: (0, _i18n.__)('Navigation')
  }, isLoading && (0, _element.createElement)("div", {
    ref: ref
  }, (0, _element.createElement)(_components.Spinner, null), " ", (0, _i18n.__)('Loading…')), !isLoading && (0, _element.createElement)("div", {
    ref: ref,
    className: "wp-block-navigation-placeholder__actions"
  }, (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_components.CustomSelectControl, {
    className: (0, _classnames.default)('wp-block-navigation-placeholder__select-control', {
      'has-menus': hasMenus
    }),
    label: !isLoading ? getPlaceholderInstructions(hasMenus, hasPages) : undefined,
    value: selectedCreateOption || createOptions[0],
    onChange: function onChange(_ref4) {
      var selectedItem = _ref4.selectedItem;

      if ((selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.key) === selectedCreateOption) {
        return;
      }

      setSelectedCreateOption(selectedItem);
      setIsCreatingFromMenu(false);
    },
    options: createOptions.map(function (option) {
      return _objectSpread({}, option, {
        key: option.id
      });
    })
  }), (0, _element.createElement)(_components.Button, {
    isSecondary: true,
    className: "wp-block-navigation-placeholder__button",
    disabled: !selectedCreateOption,
    isBusy: isCreatingFromMenu,
    onClick: onCreateButtonClick
  }, (0, _i18n.__)('Create')))));
}

var _default = (0, _element.forwardRef)(NavigationPlaceholder);

exports.default = _default;
//# sourceMappingURL=placeholder.js.map