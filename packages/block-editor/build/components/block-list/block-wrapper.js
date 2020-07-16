"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Block = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = require("lodash");

var _dom = require("@wordpress/dom");

var _keycodes = require("@wordpress/keycodes");

var _i18n = require("@wordpress/i18n");

var _data = require("@wordpress/data");

var _dom2 = require("../../utils/dom");

var _useMovingAnimation = _interopRequireDefault(require("../use-moving-animation"));

var _rootContainer = require("./root-container");

var _block = require("./block");

var _blockWrapperElements = _interopRequireDefault(require("./block-wrapper-elements"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var BlockComponent = (0, _element.forwardRef)(function (_ref, wrapper) {
  var children = _ref.children,
      _ref$tagName = _ref.tagName,
      TagName = _ref$tagName === void 0 ? 'div' : _ref$tagName,
      __unstableIsHtml = _ref.__unstableIsHtml,
      props = (0, _objectWithoutProperties2.default)(_ref, ["children", "tagName", "__unstableIsHtml"]);
  var onSelectionStart = (0, _element.useContext)(_rootContainer.Context);
  var setBlockNodes = (0, _element.useContext)(_rootContainer.SetBlockNodes);

  var _useContext = (0, _element.useContext)(_block.BlockListBlockContext),
      clientId = _useContext.clientId,
      rootClientId = _useContext.rootClientId,
      isSelected = _useContext.isSelected,
      isFirstMultiSelected = _useContext.isFirstMultiSelected,
      isLastMultiSelected = _useContext.isLastMultiSelected,
      isPartOfMultiSelection = _useContext.isPartOfMultiSelection,
      enableAnimation = _useContext.enableAnimation,
      index = _useContext.index,
      className = _useContext.className,
      isLocked = _useContext.isLocked,
      name = _useContext.name,
      mode = _useContext.mode,
      blockTitle = _useContext.blockTitle,
      wrapperProps = _useContext.wrapperProps;

  var _useSelect = (0, _data.useSelect)(function (select) {
    var _select = select('core/block-editor'),
        getSelectedBlocksInitialCaretPosition = _select.getSelectedBlocksInitialCaretPosition,
        _isMultiSelecting = _select.isMultiSelecting,
        _isNavigationMode = _select.isNavigationMode;

    return {
      shouldFocusFirstElement: isSelected && !_isMultiSelecting() && !_isNavigationMode(),
      initialPosition: isSelected ? getSelectedBlocksInitialCaretPosition() : undefined
    };
  }, [isSelected]),
      initialPosition = _useSelect.initialPosition,
      shouldFocusFirstElement = _useSelect.shouldFocusFirstElement,
      isNavigationMode = _useSelect.isNavigationMode;

  var _useDispatch = (0, _data.useDispatch)('core/block-editor'),
      insertDefaultBlock = _useDispatch.insertDefaultBlock,
      removeBlock = _useDispatch.removeBlock;

  var fallbackRef = (0, _element.useRef)();
  var isAligned = wrapperProps && !!wrapperProps['data-align'];
  wrapper = wrapper || fallbackRef;

  var _useState = (0, _element.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      isHovered = _useState2[0],
      setHovered = _useState2[1]; // Provide the selected node, or the first and last nodes of a multi-
  // selection, so it can be used to position the contextual block toolbar.
  // We only provide what is necessary, and remove the nodes again when they
  // are no longer selected.


  (0, _element.useEffect)(function () {
    if (isSelected || isFirstMultiSelected || isLastMultiSelected) {
      var node = wrapper.current;
      setBlockNodes(function (nodes) {
        return _objectSpread({}, nodes, (0, _defineProperty2.default)({}, clientId, node));
      });
      return function () {
        setBlockNodes(function (nodes) {
          return (0, _lodash.omit)(nodes, clientId);
        });
      };
    }
  }, [isSelected, isFirstMultiSelected, isLastMultiSelected]); // translators: %s: Type of block (i.e. Text, Image etc)

  var blockLabel = (0, _i18n.sprintf)((0, _i18n.__)('Block: %s'), blockTitle); // Handing the focus of the block on creation and update

  /**
   * When a block becomes selected, transition focus to an inner tabbable.
   */

  var focusTabbable = function focusTabbable() {
    // Focus is captured by the wrapper node, so while focus transition
    // should only consider tabbables within editable display, since it
    // may be the wrapper itself or a side control which triggered the
    // focus event, don't unnecessary transition to an inner tabbable.
    if (document.activeElement && (0, _dom2.isInsideRootBlock)(wrapper.current, document.activeElement)) {
      return;
    } // Find all tabbables within node.


    var textInputs = _dom.focus.tabbable.find(wrapper.current).filter(_dom.isTextField) // Exclude inner blocks and block appenders
    .filter(function (node) {
      return (0, _dom2.isInsideRootBlock)(wrapper.current, node) && !node.closest('.block-list-appender');
    }); // If reversed (e.g. merge via backspace), use the last in the set of
    // tabbables.


    var isReverse = -1 === initialPosition;
    var target = (isReverse ? _lodash.last : _lodash.first)(textInputs) || wrapper.current;
    (0, _dom.placeCaretAtHorizontalEdge)(target, isReverse);
  };

  (0, _element.useEffect)(function () {
    if (shouldFocusFirstElement) {
      focusTabbable();
    }
  }, [shouldFocusFirstElement]); // Block Reordering animation

  (0, _useMovingAnimation.default)(wrapper, isSelected || isPartOfMultiSelection, isSelected || isFirstMultiSelected, enableAnimation, index);
  /**
   * Interprets keydown event intent to remove or insert after block if key
   * event occurs on wrapper node. This can occur when the block has no text
   * fields of its own, particularly after initial insertion, to allow for
   * easy deletion and continuous writing flow to add additional content.
   *
   * @param {KeyboardEvent} event Keydown event.
   */

  var onKeyDown = function onKeyDown(event) {
    var keyCode = event.keyCode,
        target = event.target;

    if (props.onKeyDown) {
      props.onKeyDown(event);
    }

    if (keyCode !== _keycodes.ENTER && keyCode !== _keycodes.BACKSPACE && keyCode !== _keycodes.DELETE) {
      return;
    }

    if (target !== wrapper.current || (0, _dom.isTextField)(target)) {
      return;
    }

    event.preventDefault();

    if (keyCode === _keycodes.ENTER) {
      insertDefaultBlock({}, rootClientId, index + 1);
    } else {
      removeBlock(clientId);
    }
  };

  var onMouseLeave = function onMouseLeave(_ref2) {
    var which = _ref2.which,
        buttons = _ref2.buttons;

    // The primary button must be pressed to initiate selection. Fall back
    // to `which` if the standard `buttons` property is falsy. There are
    // cases where Firefox might always set `buttons` to `0`.
    // See https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons
    // See https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/which
    if ((buttons || which) === 1) {
      onSelectionStart(clientId);
    }
  };

  var htmlSuffix = mode === 'html' && !__unstableIsHtml ? '-visual' : '';
  var blockElementId = "block-".concat(clientId).concat(htmlSuffix);

  function onMouseOver(event) {
    if (event.defaultPrevented) {
      return;
    }

    event.preventDefault();

    if (isHovered) {
      return;
    }

    setHovered(true);
  }

  function onMouseOut(event) {
    if (event.defaultPrevented) {
      return;
    }

    event.preventDefault();

    if (!isHovered) {
      return;
    }

    setHovered(false);
  }

  return (// eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    (0, _element.createElement)(TagName // Overrideable props.
    , (0, _extends2.default)({
      "aria-label": blockLabel,
      role: "group"
    }, (0, _lodash.omit)(wrapperProps, ['data-align']), props, {
      id: blockElementId,
      ref: wrapper,
      className: (0, _classnames.default)(className, props.className, wrapperProps && wrapperProps.className, {
        'is-hovered': isHovered,
        'wp-block': !isAligned
      }),
      "data-block": clientId,
      "data-type": name,
      "data-title": blockTitle // Only allow shortcuts when a blocks is selected and not locked.
      ,
      onKeyDown: isSelected && !isLocked ? onKeyDown : undefined // Only allow selection to be started from a selected block.
      ,
      onMouseLeave: isSelected ? onMouseLeave : undefined // No need to have these listeners for hover class in edit mode.
      ,
      onMouseOver: isNavigationMode ? onMouseOver : undefined,
      onMouseOut: isNavigationMode ? onMouseOut : undefined,
      tabIndex: "0",
      style: _objectSpread({}, wrapperProps ? wrapperProps.style : {}, {}, props.style || {})
    }), children)
  );
});

var ExtendedBlockComponent = _blockWrapperElements.default.reduce(function (acc, element) {
  acc[element] = (0, _element.forwardRef)(function (props, ref) {
    return (0, _element.createElement)(BlockComponent, (0, _extends2.default)({}, props, {
      ref: ref,
      tagName: element
    }));
  });
  return acc;
}, BlockComponent);

var Block = ExtendedBlockComponent;
exports.Block = Block;
//# sourceMappingURL=block-wrapper.js.map