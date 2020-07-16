"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SaveButton;

var _element = require("@wordpress/element");

var _lodash = require("lodash");

var _data = require("@wordpress/data");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
function SaveButton(_ref) {
  var openEntitiesSavedStates = _ref.openEntitiesSavedStates;

  var _useSelect = (0, _data.useSelect)(function (select) {
    var _select = select('core'),
        __experimentalGetDirtyEntityRecords = _select.__experimentalGetDirtyEntityRecords,
        isSavingEntityRecord = _select.isSavingEntityRecord;

    var dirtyEntityRecords = __experimentalGetDirtyEntityRecords();

    return {
      isDirty: dirtyEntityRecords.length > 0,
      isSaving: (0, _lodash.some)(dirtyEntityRecords, function (record) {
        return isSavingEntityRecord(record.kind, record.name, record.key);
      }),
      templateType: select('core/edit-site').getTemplateType()
    };
  }),
      isDirty = _useSelect.isDirty,
      isSaving = _useSelect.isSaving;

  var disabled = !isDirty || isSaving;
  return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_components.Button, {
    isPrimary: true,
    className: "edit-site-save-button__button",
    "aria-disabled": disabled,
    disabled: disabled,
    isBusy: isSaving,
    onClick: disabled ? undefined : openEntitiesSavedStates
  }, (0, _i18n.__)('Update Design')));
}
//# sourceMappingURL=index.js.map