"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _lodash = require("lodash");

var _classnames2 = _interopRequireDefault(require("classnames"));

var _blockEditor = require("@wordpress/block-editor");

var _data = require("@wordpress/data");

var _components = require("@wordpress/components");

var _compose = require("@wordpress/compose");

var _i18n = require("@wordpress/i18n");

var _useBlockNavigator2 = _interopRequireDefault(require("./use-block-navigator"));

var _blockColorsSelector = _interopRequireDefault(require("./block-colors-selector"));

var navIcons = _interopRequireWildcard(require("./icons"));

var _placeholder = _interopRequireDefault(require("./placeholder"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function Navigation(_ref) {
  var _classnames;

  var selectedBlockHasDescendants = _ref.selectedBlockHasDescendants,
      attributes = _ref.attributes,
      clientId = _ref.clientId,
      fontSize = _ref.fontSize,
      hasExistingNavItems = _ref.hasExistingNavItems,
      isImmediateParentOfSelectedBlock = _ref.isImmediateParentOfSelectedBlock,
      isSelected = _ref.isSelected,
      setAttributes = _ref.setAttributes,
      setFontSize = _ref.setFontSize,
      updateInnerBlocks = _ref.updateInnerBlocks,
      className = _ref.className;
  //
  // HOOKS
  //
  var ref = (0, _element.useRef)();

  var _useDispatch = (0, _data.useDispatch)('core/block-editor'),
      selectBlock = _useDispatch.selectBlock;

  var _experimentalUseColo = (0, _blockEditor.__experimentalUseColors)([{
    name: 'textColor',
    property: 'color'
  }, {
    name: 'backgroundColor',
    className: 'has-background'
  }], {
    contrastCheckers: [{
      backgroundColor: true,
      textColor: true,
      fontSize: fontSize.size
    }],
    colorDetector: {
      targetRef: ref
    },
    colorPanelProps: {
      initialOpen: true
    }
  }, [fontSize.size]),
      TextColor = _experimentalUseColo.TextColor,
      BackgroundColor = _experimentalUseColo.BackgroundColor,
      ColorPanel = _experimentalUseColo.ColorPanel;

  var _useBlockNavigator = (0, _useBlockNavigator2.default)(clientId),
      navigatorToolbarButton = _useBlockNavigator.navigatorToolbarButton,
      navigatorModal = _useBlockNavigator.navigatorModal; //
  // HANDLERS
  //


  function handleItemsAlignment(align) {
    return function () {
      var itemsJustification = attributes.itemsJustification === align ? undefined : align;
      setAttributes({
        itemsJustification: itemsJustification
      });
    };
  } // If we don't have existing items then show the Placeholder


  if (!hasExistingNavItems) {
    return (0, _element.createElement)(_blockEditor.__experimentalBlock.div, null, (0, _element.createElement)(_placeholder.default, {
      ref: ref,
      onCreate: function onCreate(blocks, selectNavigationBlock) {
        updateInnerBlocks(blocks);

        if (selectNavigationBlock) {
          selectBlock(clientId);
        }
      }
    }));
  }

  var blockInlineStyles = {
    fontSize: fontSize.size ? fontSize.size + 'px' : undefined
  };
  var blockClassNames = (0, _classnames2.default)(className, (_classnames = {}, (0, _defineProperty2.default)(_classnames, "items-justified-".concat(attributes.itemsJustification), attributes.itemsJustification), (0, _defineProperty2.default)(_classnames, fontSize.class, fontSize.class), (0, _defineProperty2.default)(_classnames, 'is-vertical', attributes.orientation === 'vertical'), _classnames)); // UI State: rendered Block UI

  return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_blockEditor.BlockControls, null, (0, _element.createElement)(_components.Toolbar, {
    icon: attributes.itemsJustification ? navIcons["justify".concat((0, _lodash.upperFirst)(attributes.itemsJustification), "Icon")] : navIcons.justifyLeftIcon,
    label: (0, _i18n.__)('Change items justification'),
    isCollapsed: true,
    controls: [{
      icon: navIcons.justifyLeftIcon,
      title: (0, _i18n.__)('Justify items left'),
      isActive: 'left' === attributes.itemsJustification,
      onClick: handleItemsAlignment('left')
    }, {
      icon: navIcons.justifyCenterIcon,
      title: (0, _i18n.__)('Justify items center'),
      isActive: 'center' === attributes.itemsJustification,
      onClick: handleItemsAlignment('center')
    }, {
      icon: navIcons.justifyRightIcon,
      title: (0, _i18n.__)('Justify items right'),
      isActive: 'right' === attributes.itemsJustification,
      onClick: handleItemsAlignment('right')
    }]
  }), (0, _element.createElement)(_components.ToolbarGroup, null, navigatorToolbarButton), (0, _element.createElement)(_blockColorsSelector.default, {
    TextColor: TextColor,
    BackgroundColor: BackgroundColor
  }, ColorPanel)), navigatorModal, (0, _element.createElement)(_blockEditor.InspectorControls, null, (0, _element.createElement)(_components.PanelBody, {
    title: (0, _i18n.__)('Text settings')
  }, (0, _element.createElement)(_blockEditor.FontSizePicker, {
    value: fontSize.size,
    onChange: setFontSize
  }))), (0, _element.createElement)(_blockEditor.InspectorControls, null, (0, _element.createElement)(_components.PanelBody, {
    title: (0, _i18n.__)('Display settings')
  }, (0, _element.createElement)(_components.ToggleControl, {
    checked: attributes.showSubmenuIcon,
    onChange: function onChange(value) {
      setAttributes({
        showSubmenuIcon: value
      });
    },
    label: (0, _i18n.__)('Show submenu indicator icons')
  }))), (0, _element.createElement)(TextColor, null, (0, _element.createElement)(BackgroundColor, null, (0, _element.createElement)(_blockEditor.__experimentalBlock.nav, {
    className: blockClassNames,
    style: blockInlineStyles
  }, (0, _element.createElement)(_blockEditor.InnerBlocks, {
    ref: ref,
    allowedBlocks: ['core/navigation-link', 'core/search'],
    renderAppender: isImmediateParentOfSelectedBlock && !selectedBlockHasDescendants || isSelected ? _blockEditor.InnerBlocks.DefaultAppender : false,
    templateInsertUpdatesSelection: false,
    orientation: attributes.orientation || 'horizontal',
    __experimentalTagName: "ul",
    __experimentalAppenderTagName: "li",
    __experimentalPassedProps: {
      className: 'wp-block-navigation__container'
    },
    __experimentalCaptureToolbars: true // Template lock set to false here so that the Nav
    // Block on the experimental menus screen does not
    // inherit templateLock={ 'all' }.
    ,
    templateLock: false
  })))));
}

var _default = (0, _compose.compose)([(0, _blockEditor.withFontSizes)('fontSize'), (0, _data.withSelect)(function (select, _ref2) {
  var _getClientIdsOfDescen;

  var clientId = _ref2.clientId;
  var innerBlocks = select('core/block-editor').getBlocks(clientId);

  var _select = select('core/block-editor'),
      getClientIdsOfDescendants = _select.getClientIdsOfDescendants,
      hasSelectedInnerBlock = _select.hasSelectedInnerBlock,
      getSelectedBlockClientId = _select.getSelectedBlockClientId;

  var isImmediateParentOfSelectedBlock = hasSelectedInnerBlock(clientId, false);
  var selectedBlockId = getSelectedBlockClientId();
  var selectedBlockHasDescendants = !!((_getClientIdsOfDescen = getClientIdsOfDescendants([selectedBlockId])) === null || _getClientIdsOfDescen === void 0 ? void 0 : _getClientIdsOfDescen.length);
  return {
    isImmediateParentOfSelectedBlock: isImmediateParentOfSelectedBlock,
    selectedBlockHasDescendants: selectedBlockHasDescendants,
    hasExistingNavItems: !!innerBlocks.length
  };
}), (0, _data.withDispatch)(function (dispatch, _ref3) {
  var clientId = _ref3.clientId;
  return {
    updateInnerBlocks: function updateInnerBlocks(blocks) {
      if ((blocks === null || blocks === void 0 ? void 0 : blocks.length) === 0) {
        return false;
      }

      dispatch('core/block-editor').replaceInnerBlocks(clientId, blocks);
    }
  };
})])(Navigation);

exports.default = _default;
//# sourceMappingURL=edit.js.map