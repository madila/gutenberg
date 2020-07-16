"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = require("lodash");

var _keycodes = require("@wordpress/keycodes");

var _deprecated = _interopRequireDefault(require("@wordpress/deprecated"));

var _formatEdit = _interopRequireDefault(require("./format-edit"));

var _create = require("../create");

var _toDom = require("../to-dom");

var _toHtmlString = require("../to-html-string");

var _remove = require("../remove");

var _removeFormat = require("../remove-format");

var _isCollapsed = require("../is-collapsed");

var _specialCharacters = require("../special-characters");

var _indentListItems = require("../indent-list-items");

var _getActiveFormats = require("../get-active-formats");

var _updateFormats = require("../update-formats");

var _removeLineSeparator = require("../remove-line-separator");

var _isEmpty = require("../is-empty");

var _withFormatTypes = _interopRequireDefault(require("./with-format-types"));

var _useBoundaryStyle = require("./use-boundary-style");

var _useInlineWarning = require("./use-inline-warning");

var _insert = require("../insert");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/** @typedef {import('@wordpress/element').WPSyntheticEvent} WPSyntheticEvent */

/**
 * All inserting input types that would insert HTML into the DOM.
 *
 * @see https://www.w3.org/TR/input-events-2/#interface-InputEvent-Attributes
 *
 * @type {Set}
 */
var INSERTION_INPUT_TYPES_TO_IGNORE = new Set(['insertParagraph', 'insertOrderedList', 'insertUnorderedList', 'insertHorizontalRule', 'insertLink']);
/**
 * In HTML, leading and trailing spaces are not visible, and multiple spaces
 * elsewhere are visually reduced to one space. This rule prevents spaces from
 * collapsing so all space is visible in the editor and can be removed. It also
 * prevents some browsers from inserting non-breaking spaces at the end of a
 * line to prevent the space from visually disappearing. Sometimes these non
 * breaking spaces can linger in the editor causing unwanted non breaking spaces
 * in between words. If also prevent Firefox from inserting a trailing `br` node
 * to visualise any trailing space, causing the element to be saved.
 *
 * > Authors are encouraged to set the 'white-space' property on editing hosts
 * > and on markup that was originally created through these editing mechanisms
 * > to the value 'pre-wrap'. Default HTML whitespace handling is not well
 * > suited to WYSIWYG editing, and line wrapping will not work correctly in
 * > some corner cases if 'white-space' is left at its default value.
 *
 * https://html.spec.whatwg.org/multipage/interaction.html#best-practices-for-in-page-editors
 *
 * @type {string}
 */

var whiteSpace = 'pre-wrap';
/**
 * Default style object for the editable element.
 *
 * @type {Object<string,string>}
 */

var defaultStyle = {
  whiteSpace: whiteSpace
};
var EMPTY_ACTIVE_FORMATS = [];

function createPrepareEditableTree(props, prefix) {
  var fns = Object.keys(props).reduce(function (accumulator, key) {
    if (key.startsWith(prefix)) {
      accumulator.push(props[key]);
    }

    return accumulator;
  }, []);
  return function (value) {
    return fns.reduce(function (accumulator, fn) {
      return fn(accumulator, value.text);
    }, value.formats);
  };
}
/**
 * If the selection is set on the placeholder element, collapse the selection to
 * the start (before the placeholder).
 *
 * @param {Window} defaultView
 */


function fixPlaceholderSelection(defaultView) {
  var selection = defaultView.getSelection();
  var anchorNode = selection.anchorNode,
      anchorOffset = selection.anchorOffset;

  if (anchorNode.nodeType !== anchorNode.ELEMENT_NODE) {
    return;
  }

  var targetNode = anchorNode.childNodes[anchorOffset];

  if (!targetNode || targetNode.nodeType !== targetNode.ELEMENT_NODE || !targetNode.getAttribute('data-rich-text-placeholder')) {
    return;
  }

  selection.collapseToStart();
}

function RichText(_ref) {
  var _ref$tagName = _ref.tagName,
      TagName = _ref$tagName === void 0 ? 'div' : _ref$tagName,
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? '' : _ref$value,
      selectionStart = _ref.selectionStart,
      selectionEnd = _ref.selectionEnd,
      children = _ref.children,
      allowedFormats = _ref.allowedFormats,
      withoutInteractiveFormatting = _ref.withoutInteractiveFormatting,
      formatTypes = _ref.formatTypes,
      style = _ref.style,
      className = _ref.className,
      placeholder = _ref.placeholder,
      disabled = _ref.disabled,
      preserveWhiteSpace = _ref.preserveWhiteSpace,
      onPaste = _ref.onPaste,
      _ref$format = _ref.format,
      format = _ref$format === void 0 ? 'string' : _ref$format,
      onDelete = _ref.onDelete,
      onEnter = _ref.onEnter,
      onSelectionChange = _ref.onSelectionChange,
      onChange = _ref.onChange,
      onFocus = _ref.unstableOnFocus,
      setFocusedElement = _ref.setFocusedElement,
      instanceId = _ref.instanceId,
      multilineTag = _ref.__unstableMultilineTag,
      multilineRootTag = _ref.__unstableMultilineRootTag,
      disableFormats = _ref.__unstableDisableFormats,
      didAutomaticChange = _ref.__unstableDidAutomaticChange,
      inputRule = _ref.__unstableInputRule,
      markAutomaticChange = _ref.__unstableMarkAutomaticChange,
      allowPrefixTransformations = _ref.__unstableAllowPrefixTransformations,
      undo = _ref.__unstableUndo,
      isCaretWithinFormattedText = _ref.__unstableIsCaretWithinFormattedText,
      onEnterFormattedText = _ref.__unstableOnEnterFormattedText,
      onExitFormattedText = _ref.__unstableOnExitFormattedText,
      onCreateUndoLevel = _ref.__unstableOnCreateUndoLevel,
      isSelected = _ref.__unstableIsSelected,
      ref = _ref.forwardedRef,
      remainingProps = (0, _objectWithoutProperties2.default)(_ref, ["tagName", "value", "selectionStart", "selectionEnd", "children", "allowedFormats", "withoutInteractiveFormatting", "formatTypes", "style", "className", "placeholder", "disabled", "preserveWhiteSpace", "onPaste", "format", "onDelete", "onEnter", "onSelectionChange", "onChange", "unstableOnFocus", "setFocusedElement", "instanceId", "__unstableMultilineTag", "__unstableMultilineRootTag", "__unstableDisableFormats", "__unstableDidAutomaticChange", "__unstableInputRule", "__unstableMarkAutomaticChange", "__unstableAllowPrefixTransformations", "__unstableUndo", "__unstableIsCaretWithinFormattedText", "__unstableOnEnterFormattedText", "__unstableOnExitFormattedText", "__unstableOnCreateUndoLevel", "__unstableIsSelected", "forwardedRef"]);

  var _useState = (0, _element.useState)(),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      _useState2$ = _useState2[0],
      activeFormats = _useState2$ === void 0 ? [] : _useState2$,
      setActiveFormats = _useState2[1];

  function getDoc() {
    return ref.current.ownerDocument;
  }

  function getWin() {
    return getDoc().defaultView;
  }
  /**
   * Converts the outside data structure to our internal representation.
   *
   * @param {*} string The outside value, data type depends on props.
   *
   * @return {Object} An internal rich-text value.
   */


  function formatToValue(string) {
    if (disableFormats) {
      return {
        text: string,
        formats: Array(string.length),
        replacements: Array(string.length)
      };
    }

    if (format !== 'string') {
      return string;
    }

    var prepare = createPrepareEditableTree(remainingProps, 'format_value_functions');
    var result = (0, _create.create)({
      html: string,
      multilineTag: multilineTag,
      multilineWrapperTags: multilineTag === 'li' ? ['ul', 'ol'] : undefined,
      preserveWhiteSpace: preserveWhiteSpace
    });
    result.formats = prepare(result);
    return result;
  }
  /**
   * Removes editor only formats from the value.
   *
   * Editor only formats are applied using `prepareEditableTree`, so we need to
   * remove them before converting the internal state
   *
   * @param {Object} val The internal rich-text value.
   *
   * @return {Object} A new rich-text value.
   */


  function removeEditorOnlyFormats(val) {
    formatTypes.forEach(function (formatType) {
      // Remove formats created by prepareEditableTree, because they are editor only.
      if (formatType.__experimentalCreatePrepareEditableTree) {
        val = (0, _removeFormat.removeFormat)(val, formatType.name, 0, val.text.length);
      }
    });
    return val;
  }
  /**
   * Converts the internal value to the external data format.
   *
   * @param {Object} val The internal rich-text value.
   *
   * @return {*} The external data format, data type depends on props.
   */


  function valueToFormat(val) {
    if (disableFormats) {
      return val.text;
    }

    val = removeEditorOnlyFormats(val);

    if (format !== 'string') {
      return;
    }

    return (0, _toHtmlString.toHTMLString)({
      value: val,
      multilineTag: multilineTag,
      preserveWhiteSpace: preserveWhiteSpace
    });
  } // Internal values are updated synchronously, unlike props and state.


  var _value = (0, _element.useRef)(value);

  var record = (0, _element.useRef)((0, _element.useMemo)(function () {
    var initialRecord = formatToValue(value);
    initialRecord.start = selectionStart;
    initialRecord.end = selectionEnd;
    return initialRecord;
  }, []));

  function createRecord() {
    var selection = getWin().getSelection();
    var range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
    return (0, _create.create)({
      element: ref.current,
      range: range,
      multilineTag: multilineTag,
      multilineWrapperTags: multilineTag === 'li' ? ['ul', 'ol'] : undefined,
      __unstableIsEditableTree: true,
      preserveWhiteSpace: preserveWhiteSpace
    });
  }

  function applyRecord(newRecord) {
    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        domOnly = _ref2.domOnly;

    (0, _toDom.apply)({
      value: newRecord,
      current: ref.current,
      multilineTag: multilineTag,
      multilineWrapperTags: multilineTag === 'li' ? ['ul', 'ol'] : undefined,
      prepareEditableTree: createPrepareEditableTree(remainingProps, 'format_prepare_functions'),
      __unstableDomOnly: domOnly,
      placeholder: placeholder
    });
  }
  /**
   * Handles a paste event.
   *
   * Saves the pasted data as plain text in `pastedPlainText`.
   *
   * @param {ClipboardEvent} event The paste event.
   */


  function handlePaste(event) {
    if (!isSelected) {
      event.preventDefault();
      return;
    }

    var clipboardData = event.clipboardData;
    var items = clipboardData.items,
        files = clipboardData.files; // In Edge these properties can be null instead of undefined, so a more
    // rigorous test is required over using default values.

    items = (0, _lodash.isNil)(items) ? [] : items;
    files = (0, _lodash.isNil)(files) ? [] : files;
    var plainText = '';
    var html = ''; // IE11 only supports `Text` as an argument for `getData` and will
    // otherwise throw an invalid argument error, so we try the standard
    // arguments first, then fallback to `Text` if they fail.

    try {
      plainText = clipboardData.getData('text/plain');
      html = clipboardData.getData('text/html');
    } catch (error1) {
      try {
        html = clipboardData.getData('Text');
      } catch (error2) {
        // Some browsers like UC Browser paste plain text by default and
        // don't support clipboardData at all, so allow default
        // behaviour.
        return;
      }
    }

    event.preventDefault(); // Allows us to ask for this information when we get a report.

    window.console.log('Received HTML:\n\n', html);
    window.console.log('Received plain text:\n\n', plainText);

    if (disableFormats) {
      handleChange((0, _insert.insert)(record.current, plainText));
      return;
    }

    var transformed = formatTypes.reduce(function (accumlator, _ref3) {
      var __unstablePasteRule = _ref3.__unstablePasteRule;

      // Only allow one transform.
      if (__unstablePasteRule && accumlator === record.current) {
        accumlator = __unstablePasteRule(record.current, {
          html: html,
          plainText: plainText
        });
      }

      return accumlator;
    }, record.current);

    if (transformed !== record.current) {
      handleChange(transformed);
      return;
    }

    if (onPaste) {
      files = Array.from(files);
      Array.from(items).forEach(function (item) {
        if (!item.getAsFile) {
          return;
        }

        var file = item.getAsFile();

        if (!file) {
          return;
        }

        var name = file.name,
            type = file.type,
            size = file.size;

        if (!(0, _lodash.find)(files, {
          name: name,
          type: type,
          size: size
        })) {
          files.push(file);
        }
      });
      onPaste({
        value: removeEditorOnlyFormats(record.current),
        onChange: handleChange,
        html: html,
        plainText: plainText,
        files: files,
        activeFormats: activeFormats
      });
    }
  }
  /**
   * Handles delete on keydown:
   * - outdent list items,
   * - delete content if everything is selected,
   * - trigger the onDelete prop when selection is uncollapsed and at an edge.
   *
   * @param {WPSyntheticEvent} event A synthetic keyboard event.
   */


  function handleDelete(event) {
    var keyCode = event.keyCode;

    if (keyCode !== _keycodes.DELETE && keyCode !== _keycodes.BACKSPACE && keyCode !== _keycodes.ESCAPE) {
      return;
    }

    if (didAutomaticChange) {
      event.preventDefault();
      undo();
      return;
    }

    if (keyCode === _keycodes.ESCAPE) {
      return;
    }

    var currentValue = createRecord();
    var start = currentValue.start,
        end = currentValue.end,
        text = currentValue.text;
    var isReverse = keyCode === _keycodes.BACKSPACE; // Always handle full content deletion ourselves.

    if (start === 0 && end !== 0 && end === text.length) {
      handleChange((0, _remove.remove)(currentValue));
      event.preventDefault();
      return;
    }

    if (multilineTag) {
      var newValue; // Check to see if we should remove the first item if empty.

      if (isReverse && currentValue.start === 0 && currentValue.end === 0 && (0, _isEmpty.isEmptyLine)(currentValue)) {
        newValue = (0, _removeLineSeparator.removeLineSeparator)(currentValue, !isReverse);
      } else {
        newValue = (0, _removeLineSeparator.removeLineSeparator)(currentValue, isReverse);
      }

      if (newValue) {
        handleChange(newValue);
        event.preventDefault();
        return;
      }
    } // Only process delete if the key press occurs at an uncollapsed edge.


    if (!onDelete || !(0, _isCollapsed.isCollapsed)(currentValue) || activeFormats.length || isReverse && start !== 0 || !isReverse && end !== text.length) {
      return;
    }

    onDelete({
      isReverse: isReverse,
      value: currentValue
    });
    event.preventDefault();
  }
  /**
   * Triggers the `onEnter` prop on keydown.
   *
   * @param {WPSyntheticEvent} event A synthetic keyboard event.
   */


  function handleEnter(event) {
    if (event.keyCode !== _keycodes.ENTER) {
      return;
    }

    event.preventDefault();

    if (!onEnter) {
      return;
    }

    onEnter({
      value: removeEditorOnlyFormats(createRecord()),
      onChange: handleChange,
      shiftKey: event.shiftKey
    });
  }
  /**
   * Indents list items on space keydown.
   *
   * @param {WPSyntheticEvent} event A synthetic keyboard event.
   */


  function handleSpace(event) {
    var keyCode = event.keyCode,
        shiftKey = event.shiftKey,
        altKey = event.altKey,
        metaKey = event.metaKey,
        ctrlKey = event.ctrlKey;

    if ( // Only override when no modifiers are pressed.
    shiftKey || altKey || metaKey || ctrlKey || keyCode !== _keycodes.SPACE || multilineTag !== 'li') {
      return;
    }

    var currentValue = createRecord();

    if (!(0, _isCollapsed.isCollapsed)(currentValue)) {
      return;
    }

    var text = currentValue.text,
        start = currentValue.start;
    var characterBefore = text[start - 1]; // The caret must be at the start of a line.

    if (characterBefore && characterBefore !== _specialCharacters.LINE_SEPARATOR) {
      return;
    }

    handleChange((0, _indentListItems.indentListItems)(currentValue, {
      type: multilineRootTag
    }));
    event.preventDefault();
  }
  /**
   * Handles horizontal keyboard navigation when no modifiers are pressed. The
   * navigation is handled separately to move correctly around format
   * boundaries.
   *
   * @param {WPSyntheticEvent} event A synthetic keyboard event.
   */


  function handleHorizontalNavigation(event) {
    var keyCode = event.keyCode,
        shiftKey = event.shiftKey,
        altKey = event.altKey,
        metaKey = event.metaKey,
        ctrlKey = event.ctrlKey;

    if ( // Only override left and right keys without modifiers pressed.
    shiftKey || altKey || metaKey || ctrlKey || keyCode !== _keycodes.LEFT && keyCode !== _keycodes.RIGHT) {
      return;
    }

    var _record$current = record.current,
        text = _record$current.text,
        formats = _record$current.formats,
        start = _record$current.start,
        end = _record$current.end,
        _record$current$activ = _record$current.activeFormats,
        currentActiveFormats = _record$current$activ === void 0 ? [] : _record$current$activ;
    var collapsed = (0, _isCollapsed.isCollapsed)(record.current); // To do: ideally, we should look at visual position instead.

    var _getWin$getComputedSt = getWin().getComputedStyle(ref.current),
        direction = _getWin$getComputedSt.direction;

    var reverseKey = direction === 'rtl' ? _keycodes.RIGHT : _keycodes.LEFT;
    var isReverse = event.keyCode === reverseKey; // If the selection is collapsed and at the very start, do nothing if
    // navigating backward.
    // If the selection is collapsed and at the very end, do nothing if
    // navigating forward.

    if (collapsed && currentActiveFormats.length === 0) {
      if (start === 0 && isReverse) {
        return;
      }

      if (end === text.length && !isReverse) {
        return;
      }
    } // If the selection is not collapsed, let the browser handle collapsing
    // the selection for now. Later we could expand this logic to set
    // boundary positions if needed.


    if (!collapsed) {
      return;
    } // In all other cases, prevent default behaviour.


    event.preventDefault();
    var formatsBefore = formats[start - 1] || EMPTY_ACTIVE_FORMATS;
    var formatsAfter = formats[start] || EMPTY_ACTIVE_FORMATS;
    var newActiveFormatsLength = currentActiveFormats.length;
    var source = formatsAfter;

    if (formatsBefore.length > formatsAfter.length) {
      source = formatsBefore;
    } // If the amount of formats before the caret and after the caret is
    // different, the caret is at a format boundary.


    if (formatsBefore.length < formatsAfter.length) {
      if (!isReverse && currentActiveFormats.length < formatsAfter.length) {
        newActiveFormatsLength++;
      }

      if (isReverse && currentActiveFormats.length > formatsBefore.length) {
        newActiveFormatsLength--;
      }
    } else if (formatsBefore.length > formatsAfter.length) {
      if (!isReverse && currentActiveFormats.length > formatsAfter.length) {
        newActiveFormatsLength--;
      }

      if (isReverse && currentActiveFormats.length < formatsBefore.length) {
        newActiveFormatsLength++;
      }
    }

    if (newActiveFormatsLength !== currentActiveFormats.length) {
      var _newActiveFormats = source.slice(0, newActiveFormatsLength);

      var _newValue = _objectSpread({}, record.current, {
        activeFormats: _newActiveFormats
      });

      record.current = _newValue;
      applyRecord(_newValue);
      setActiveFormats(_newActiveFormats);
      return;
    }

    var newPos = start + (isReverse ? -1 : 1);
    var newActiveFormats = isReverse ? formatsBefore : formatsAfter;

    var newValue = _objectSpread({}, record.current, {
      start: newPos,
      end: newPos,
      activeFormats: newActiveFormats
    });

    record.current = newValue;
    applyRecord(newValue);
    onSelectionChange(newPos, newPos);
    setActiveFormats(newActiveFormats);
  }

  function handleKeyDown(event) {
    if (event.defaultPrevented) {
      return;
    }

    handleDelete(event);
    handleEnter(event);
    handleSpace(event);
    handleHorizontalNavigation(event);
  }

  var lastHistoryValue = (0, _element.useRef)(value);

  function createUndoLevel() {
    // If the content is the same, no level needs to be created.
    if (lastHistoryValue.current === _value.current) {
      return;
    }

    onCreateUndoLevel();
    lastHistoryValue.current = _value.current;
  }

  var isComposing = (0, _element.useRef)(false);
  var timeout = (0, _element.useRef)();
  /**
   * Handle input on the next selection change event.
   *
   * @param {WPSyntheticEvent} event Synthetic input event.
   */

  function handleInput(event) {
    // Do not trigger a change if characters are being composed. Browsers
    // will usually emit a final `input` event when the characters are
    // composed.
    // As of December 2019, Safari doesn't support nativeEvent.isComposing.
    if (isComposing.current) {
      return;
    }

    var inputType;

    if (event) {
      inputType = event.inputType;
    }

    if (!inputType && event && event.nativeEvent) {
      inputType = event.nativeEvent.inputType;
    } // The browser formatted something or tried to insert HTML.
    // Overwrite it. It will be handled later by the format library if
    // needed.


    if (inputType && (inputType.indexOf('format') === 0 || INSERTION_INPUT_TYPES_TO_IGNORE.has(inputType))) {
      applyRecord(record.current);
      return;
    }

    var currentValue = createRecord();
    var _record$current2 = record.current,
        start = _record$current2.start,
        _record$current2$acti = _record$current2.activeFormats,
        oldActiveFormats = _record$current2$acti === void 0 ? [] : _record$current2$acti; // Update the formats between the last and new caret position.

    var change = (0, _updateFormats.updateFormats)({
      value: currentValue,
      start: start,
      end: currentValue.start,
      formats: oldActiveFormats
    });
    handleChange(change, {
      withoutHistory: true
    }); // Create an undo level when input stops for over a second.

    getWin().clearTimeout(timeout.current);
    timeout.current = getWin().setTimeout(createUndoLevel, 1000); // Only run input rules when inserting text.

    if (inputType !== 'insertText') {
      return;
    }

    if (allowPrefixTransformations && inputRule) {
      inputRule(change, valueToFormat);
    }

    var transformed = formatTypes.reduce(function (accumlator, _ref4) {
      var __unstableInputRule = _ref4.__unstableInputRule;

      if (__unstableInputRule) {
        accumlator = __unstableInputRule(accumlator);
      }

      return accumlator;
    }, change);

    if (transformed !== change) {
      createUndoLevel();
      handleChange(_objectSpread({}, transformed, {
        activeFormats: oldActiveFormats
      }));
      markAutomaticChange();
    }
  }

  function handleCompositionStart() {
    isComposing.current = true; // Do not update the selection when characters are being composed as
    // this rerenders the component and might distroy internal browser
    // editing state.

    getDoc().removeEventListener('selectionchange', handleSelectionChange);
  }

  function handleCompositionEnd() {
    isComposing.current = false; // Ensure the value is up-to-date for browsers that don't emit a final
    // input event after composition.

    handleInput({
      inputType: 'insertText'
    }); // Tracking selection changes can be resumed.

    getDoc().addEventListener('selectionchange', handleSelectionChange);
  }

  var didMount = (0, _element.useRef)(false);
  /**
   * Syncs the selection to local state. A callback for the `selectionchange`
   * native events, `keyup`, `mouseup` and `touchend` synthetic events, and
   * animation frames after the `focus` event.
   *
   * @param {Event|WPSyntheticEvent|DOMHighResTimeStamp} event
   */

  function handleSelectionChange(event) {
    if (!ref.current) {
      return;
    }

    if (document.activeElement !== ref.current) {
      return;
    }

    if (event.type !== 'selectionchange' && !isSelected) {
      return;
    }

    if (disabled) {
      return;
    } // In case of a keyboard event, ignore selection changes during
    // composition.


    if (isComposing.current) {
      return;
    }

    var _createRecord = createRecord(),
        start = _createRecord.start,
        end = _createRecord.end,
        text = _createRecord.text;

    var oldRecord = record.current; // Fallback mechanism for IE11, which doesn't support the input event.
    // Any input results in a selection change.

    if (text !== oldRecord.text) {
      handleInput();
      return;
    }

    if (start === oldRecord.start && end === oldRecord.end) {
      // Sometimes the browser may set the selection on the placeholder
      // element, in which case the caret is not visible. We need to set
      // the caret before the placeholder if that's the case.
      if (oldRecord.text.length === 0 && start === 0) {
        fixPlaceholderSelection(getWin());
      }

      return;
    }

    var newValue = _objectSpread({}, oldRecord, {
      start: start,
      end: end,
      // Allow `getActiveFormats` to get new `activeFormats`.
      activeFormats: undefined
    });

    var newActiveFormats = (0, _getActiveFormats.getActiveFormats)(newValue, EMPTY_ACTIVE_FORMATS); // Update the value with the new active formats.

    newValue.activeFormats = newActiveFormats;

    if (!isCaretWithinFormattedText && newActiveFormats.length) {
      onEnterFormattedText();
    } else if (isCaretWithinFormattedText && !newActiveFormats.length) {
      onExitFormattedText();
    } // It is important that the internal value is updated first,
    // otherwise the value will be wrong on render!


    record.current = newValue;
    applyRecord(newValue, {
      domOnly: true
    });
    onSelectionChange(start, end);
    setActiveFormats(newActiveFormats);
  }
  /**
   * Sync the value to global state. The node tree and selection will also be
   * updated if differences are found.
   *
   * @param {Object}  newRecord         The record to sync and apply.
   * @param {Object}  $2                Named options.
   * @param {boolean} $2.withoutHistory If true, no undo level will be
   *                                    created.
   */


  function handleChange(newRecord) {
    var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        withoutHistory = _ref5.withoutHistory;

    if (disableFormats) {
      newRecord.formats = Array(newRecord.text.length);
      newRecord.replacements = Array(newRecord.text.length);
    }

    applyRecord(newRecord);
    var start = newRecord.start,
        end = newRecord.end,
        _newRecord$activeForm = newRecord.activeFormats,
        newActiveFormats = _newRecord$activeForm === void 0 ? [] : _newRecord$activeForm;
    var changeHandlers = (0, _lodash.pickBy)(remainingProps, function (v, key) {
      return key.startsWith('format_on_change_functions_');
    });
    Object.values(changeHandlers).forEach(function (changeHandler) {
      changeHandler(newRecord.formats, newRecord.text);
    });
    _value.current = valueToFormat(newRecord);
    record.current = newRecord; // Selection must be updated first, so it is recorded in history when
    // the content change happens.

    onSelectionChange(start, end);
    onChange(_value.current);
    setActiveFormats(newActiveFormats);

    if (!withoutHistory) {
      createUndoLevel();
    }
  }
  /**
   * Select object when they are clicked. The browser will not set any
   * selection when clicking e.g. an image.
   *
   * @param {WPSyntheticEvent} event Synthetic mousedown or touchstart event.
   */


  function handlePointerDown(event) {
    var target = event.target; // If the child element has no text content, it must be an object.

    if (target === ref.current || target.textContent) {
      return;
    }

    var parentNode = target.parentNode;
    var index = Array.from(parentNode.childNodes).indexOf(target);
    var range = getDoc().createRange();
    var selection = getWin().getSelection();
    range.setStart(target.parentNode, index);
    range.setEnd(target.parentNode, index + 1);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  var rafId = (0, _element.useRef)();
  /**
   * Handles a focus event on the contenteditable field, calling the
   * `unstableOnFocus` prop callback if one is defined. The callback does not
   * receive any arguments.
   *
   * This is marked as a private API and the `unstableOnFocus` prop is not
   * documented, as the current requirements where it is used are subject to
   * future refactoring following `isSelected` handling.
   *
   * In contrast with `setFocusedElement`, this is only triggered in response
   * to focus within the contenteditable field, whereas `setFocusedElement`
   * is triggered on focus within any `RichText` descendent element.
   *
   * @see setFocusedElement
   *
   * @private
   */

  function handleFocus() {
    if (onFocus) {
      onFocus();
    }

    if (!isSelected) {
      // We know for certain that on focus, the old selection is invalid.
      // It will be recalculated on the next mouseup, keyup, or touchend
      // event.
      var index = undefined;
      record.current = _objectSpread({}, record.current, {
        start: index,
        end: index,
        activeFormats: EMPTY_ACTIVE_FORMATS
      });
      onSelectionChange(index, index);
      setActiveFormats(EMPTY_ACTIVE_FORMATS);
    } else {
      onSelectionChange(record.current.start, record.current.end);
      setActiveFormats((0, _getActiveFormats.getActiveFormats)(_objectSpread({}, record.current, {
        activeFormats: undefined
      }), EMPTY_ACTIVE_FORMATS));
    } // Update selection as soon as possible, which is at the next animation
    // frame. The event listener for selection changes may be added too late
    // at this point, but this focus event is still too early to calculate
    // the selection.


    rafId.current = getWin().requestAnimationFrame(handleSelectionChange);
    getDoc().addEventListener('selectionchange', handleSelectionChange);

    if (setFocusedElement) {
      (0, _deprecated.default)('wp.blockEditor.RichText setFocusedElement prop', {
        alternative: 'selection state from the block editor store.'
      });
      setFocusedElement(instanceId);
    }
  }

  function handleBlur() {
    getDoc().removeEventListener('selectionchange', handleSelectionChange);
  }

  function applyFromProps() {
    _value.current = value;
    record.current = formatToValue(value);
    record.current.start = selectionStart;
    record.current.end = selectionEnd;
    applyRecord(record.current);
  }

  (0, _element.useEffect)(function () {
    if (didMount.current) {
      applyFromProps();
    }
  }, [TagName, placeholder]);
  (0, _element.useEffect)(function () {
    if (didMount.current && value !== _value.current) {
      applyFromProps();
    }
  }, [value]);
  (0, _element.useEffect)(function () {
    if (!didMount.current) {
      return;
    }

    if (isSelected && (selectionStart !== record.current.start || selectionEnd !== record.current.end)) {
      applyFromProps();
    } else {
      record.current = _objectSpread({}, record.current, {
        start: selectionStart,
        end: selectionEnd
      });
    }
  }, [selectionStart, selectionEnd, isSelected]);
  var prefix = 'format_prepare_props_';

  var predicate = function predicate(v, key) {
    return key.startsWith(prefix);
  };

  var prepareProps = (0, _lodash.pickBy)(remainingProps, predicate);
  (0, _element.useEffect)(function () {
    if (didMount.current) {
      applyFromProps();
    }
  }, Object.values(prepareProps));
  (0, _element.useLayoutEffect)(function () {
    applyRecord(record.current, {
      domOnly: true
    });
    didMount.current = true;
    return function () {
      getDoc().removeEventListener('selectionchange', handleSelectionChange);
      getWin().cancelAnimationFrame(rafId.current);
      getWin().clearTimeout(timeout.current);
    };
  }, []);

  function focus() {
    ref.current.focus();
    applyRecord(record.current);
  }

  var ariaProps = (0, _lodash.pickBy)(remainingProps, function (v, key) {
    return (0, _lodash.startsWith)(key, 'aria-');
  });

  var editableProps = _objectSpread({
    // Overridable props.
    role: 'textbox',
    'aria-multiline': '',
    'aria-label': placeholder
  }, ariaProps, {
    ref: ref,
    style: style ? _objectSpread({}, style, {
      whiteSpace: whiteSpace
    }) : defaultStyle,
    className: (0, _classnames.default)('rich-text', className),
    onPaste: handlePaste,
    onInput: handleInput,
    onCompositionStart: handleCompositionStart,
    onCompositionEnd: handleCompositionEnd,
    onKeyDown: handleKeyDown,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onMouseDown: handlePointerDown,
    onTouchStart: handlePointerDown,
    // Selection updates must be done at these events as they
    // happen before the `selectionchange` event. In some cases,
    // the `selectionchange` event may not even fire, for
    // example when the window receives focus again on click.
    onKeyUp: handleSelectionChange,
    onMouseUp: handleSelectionChange,
    onTouchEnd: handleSelectionChange,
    // Do not set the attribute if disabled.
    contentEditable: disabled ? undefined : true,
    suppressContentEditableWarning: !disabled
  });

  (0, _useBoundaryStyle.useBoundaryStyle)({
    ref: ref,
    activeFormats: activeFormats
  });
  (0, _useInlineWarning.useInlineWarning)({
    ref: ref
  });
  return (0, _element.createElement)(_element.Fragment, null, isSelected && (0, _element.createElement)(_formatEdit.default, {
    allowedFormats: allowedFormats,
    withoutInteractiveFormatting: withoutInteractiveFormatting,
    value: record.current,
    onChange: handleChange,
    onFocus: focus,
    formatTypes: formatTypes
  }), children && children({
    isSelected: isSelected,
    value: record.current,
    onChange: handleChange,
    onFocus: focus,
    editableProps: editableProps,
    editableTagName: TagName
  }), !children && (0, _element.createElement)(TagName, editableProps));
}

var RichTextWrapper = (0, _withFormatTypes.default)(RichText);
/**
 * Renders a rich content input, providing users with the option to format the
 * content.
 */

var _default = (0, _element.forwardRef)(function (props, ref) {
  return (0, _element.createElement)(RichTextWrapper, (0, _extends2.default)({}, props, {
    forwardedRef: ref
  }));
});

exports.default = _default;
//# sourceMappingURL=index.js.map