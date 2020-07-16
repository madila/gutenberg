"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PostSavedState;

var _element = require("@wordpress/element");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classnames = _interopRequireDefault(require("classnames"));

var _components = require("@wordpress/components");

var _compose = require("@wordpress/compose");

var _data = require("@wordpress/data");

var _i18n = require("@wordpress/i18n");

var _icons = require("@wordpress/icons");

var _keycodes = require("@wordpress/keycodes");

var _postSwitchToDraftButton = _interopRequireDefault(require("../post-switch-to-draft-button"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Component showing whether the post is saved or not and providing save
 * buttons.
 *
 * @param {Object}   props               Component props.
 * @param {?boolean} props.forceIsDirty  Whether to force the post to be marked
 *                                       as dirty.
 * @param {?boolean} props.forceIsSaving Whether to force the post to be marked
 *                                       as being saved.
 *
 * @return {import('@wordpress/element').WPComponent} The component.
 */
function PostSavedState(_ref) {
  var forceIsDirty = _ref.forceIsDirty,
      forceIsSaving = _ref.forceIsSaving;

  var _useState = (0, _element.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      forceSavedMessage = _useState2[0],
      setForceSavedMessage = _useState2[1];

  var isLargeViewport = (0, _compose.useViewportMatch)('small');

  var _useSelect = (0, _data.useSelect)(function (select) {
    var _getCurrentPost$_link, _getCurrentPost, _getCurrentPost$_link2;

    var _select = select('core/editor'),
        isEditedPostNew = _select.isEditedPostNew,
        isCurrentPostPublished = _select.isCurrentPostPublished,
        isCurrentPostScheduled = _select.isCurrentPostScheduled,
        isEditedPostDirty = _select.isEditedPostDirty,
        isSavingPost = _select.isSavingPost,
        isEditedPostSaveable = _select.isEditedPostSaveable,
        getCurrentPost = _select.getCurrentPost,
        isAutosavingPost = _select.isAutosavingPost,
        getEditedPostAttribute = _select.getEditedPostAttribute;

    return {
      isAutosaving: isAutosavingPost(),
      isDirty: forceIsDirty || isEditedPostDirty(),
      isNew: isEditedPostNew(),
      isPending: 'pending' === getEditedPostAttribute('status'),
      isPublished: isCurrentPostPublished(),
      isSaving: forceIsSaving || isSavingPost(),
      isSaveable: isEditedPostSaveable(),
      isScheduled: isCurrentPostScheduled(),
      hasPublishAction: (_getCurrentPost$_link = (_getCurrentPost = getCurrentPost()) === null || _getCurrentPost === void 0 ? void 0 : (_getCurrentPost$_link2 = _getCurrentPost['_links']) === null || _getCurrentPost$_link2 === void 0 ? void 0 : _getCurrentPost$_link2['wp:action-publish']) !== null && _getCurrentPost$_link !== void 0 ? _getCurrentPost$_link : false
    };
  }, [forceIsDirty, forceIsSaving]),
      isAutosaving = _useSelect.isAutosaving,
      isDirty = _useSelect.isDirty,
      isNew = _useSelect.isNew,
      isPending = _useSelect.isPending,
      isPublished = _useSelect.isPublished,
      isSaveable = _useSelect.isSaveable,
      isSaving = _useSelect.isSaving,
      isScheduled = _useSelect.isScheduled,
      hasPublishAction = _useSelect.hasPublishAction;

  var _useDispatch = (0, _data.useDispatch)('core/editor'),
      savePost = _useDispatch.savePost;

  var wasSaving = (0, _compose.usePrevious)(isSaving);
  (0, _element.useEffect)(function () {
    var timeoutId;

    if (wasSaving && !isSaving) {
      setForceSavedMessage(true);
      timeoutId = setTimeout(function () {
        setForceSavedMessage(false);
      }, 1000);
    }

    return function () {
      return clearTimeout(timeoutId);
    };
  }, [isSaving]);

  if (isSaving) {
    // TODO: Classes generation should be common across all return
    // paths of this function, including proper naming convention for
    // the "Save Draft" button.
    var classes = (0, _classnames.default)('editor-post-saved-state', 'is-saving', {
      'is-autosaving': isAutosaving
    });
    return (0, _element.createElement)(_components.Animate, {
      type: "loading"
    }, function (_ref2) {
      var animateClassName = _ref2.className;
      return (0, _element.createElement)("span", {
        className: (0, _classnames.default)(classes, animateClassName)
      }, (0, _element.createElement)(_icons.Icon, {
        icon: _icons.cloud
      }), isAutosaving ? (0, _i18n.__)('Autosaving') : (0, _i18n.__)('Saving'));
    });
  }

  if (isPublished || isScheduled) {
    return (0, _element.createElement)(_postSwitchToDraftButton.default, null);
  }

  if (!isSaveable) {
    return null;
  }

  if (forceSavedMessage || !isNew && !isDirty) {
    return (0, _element.createElement)("span", {
      className: "editor-post-saved-state is-saved"
    }, (0, _element.createElement)(_icons.Icon, {
      icon: _icons.check
    }), (0, _i18n.__)('Saved'));
  } // Once the post has been submitted for review this button
  // is not needed for the contributor role.


  if (!hasPublishAction && isPending) {
    return null;
  }

  var label = isPending ? (0, _i18n.__)('Save as pending') : (0, _i18n.__)('Save draft');

  if (!isLargeViewport) {
    return (0, _element.createElement)(_components.Button, {
      className: "editor-post-save-draft",
      label: label,
      onClick: function onClick() {
        return savePost();
      },
      shortcut: _keycodes.displayShortcut.primary('s'),
      icon: _icons.cloudUpload
    });
  }

  return (0, _element.createElement)(_components.Button, {
    className: "editor-post-save-draft",
    onClick: function onClick() {
      return savePost();
    },
    shortcut: _keycodes.displayShortcut.primary('s'),
    isTertiary: true
  }, label);
}
//# sourceMappingURL=index.js.map