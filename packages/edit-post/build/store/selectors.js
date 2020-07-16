"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEditorMode = getEditorMode;
exports.getPreferences = getPreferences;
exports.getPreference = getPreference;
exports.isPublishSidebarOpened = isPublishSidebarOpened;
exports.isEditorPanelRemoved = isEditorPanelRemoved;
exports.isEditorPanelEnabled = isEditorPanelEnabled;
exports.isEditorPanelOpened = isEditorPanelOpened;
exports.isModalActive = isModalActive;
exports.isFeatureActive = isFeatureActive;
exports.isMetaBoxLocationVisible = isMetaBoxLocationVisible;
exports.isMetaBoxLocationActive = isMetaBoxLocationActive;
exports.getMetaBoxesPerLocation = getMetaBoxesPerLocation;
exports.hasMetaBoxes = hasMetaBoxes;
exports.isSavingMetaBoxes = isSavingMetaBoxes;
exports.__experimentalGetPreviewDeviceType = __experimentalGetPreviewDeviceType;
exports.isInserterOpened = isInserterOpened;
exports.getAllMetaBoxes = exports.getActiveMetaBoxLocations = exports.isPluginItemPinned = exports.getActiveGeneralSidebarName = exports.isPluginSidebarOpened = exports.isEditorSidebarOpened = void 0;

var _rememo = _interopRequireDefault(require("rememo"));

var _lodash = require("lodash");

var _data = require("@wordpress/data");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Returns the current editing mode.
 *
 * @param {Object} state Global application state.
 *
 * @return {string} Editing mode.
 */
function getEditorMode(state) {
  return getPreference(state, 'editorMode', 'visual');
}
/**
 * Returns true if the editor sidebar is opened.
 *
 * @param {Object} state Global application state
 *
 * @return {boolean} Whether the editor sidebar is opened.
 */


var isEditorSidebarOpened = (0, _data.createRegistrySelector)(function (select) {
  return function () {
    var activeGeneralSidebar = select('core/interface').getActiveComplementaryArea('core/edit-post');
    return (0, _lodash.includes)(['edit-post/document', 'edit-post/block'], activeGeneralSidebar);
  };
});
/**
 * Returns true if the plugin sidebar is opened.
 *
 * @param {Object} state Global application state
 * @return {boolean}     Whether the plugin sidebar is opened.
 */

exports.isEditorSidebarOpened = isEditorSidebarOpened;
var isPluginSidebarOpened = (0, _data.createRegistrySelector)(function (select) {
  return function () {
    var activeGeneralSidebar = select('core/interface').getActiveComplementaryArea('core/edit-post');
    return !!activeGeneralSidebar && !(0, _lodash.includes)(['edit-post/document', 'edit-post/block'], activeGeneralSidebar);
  };
});
/**
 * Returns the current active general sidebar name, or null if there is no
 * general sidebar active. The active general sidebar is a unique name to
 * identify either an editor or plugin sidebar.
 *
 * Examples:
 *
 *  - `edit-post/document`
 *  - `my-plugin/insert-image-sidebar`
 *
 * @param {Object} state Global application state.
 *
 * @return {?string} Active general sidebar name.
 */

exports.isPluginSidebarOpened = isPluginSidebarOpened;
var getActiveGeneralSidebarName = (0, _data.createRegistrySelector)(function (select) {
  return function () {
    return select('core/interface').getActiveComplementaryArea('core/edit-post');
  };
});
/**
 * Returns the preferences (these preferences are persisted locally).
 *
 * @param {Object} state Global application state.
 *
 * @return {Object} Preferences Object.
 */

exports.getActiveGeneralSidebarName = getActiveGeneralSidebarName;

function getPreferences(state) {
  return state.preferences;
}
/**
 *
 * @param {Object} state         Global application state.
 * @param {string} preferenceKey Preference Key.
 * @param {*}      defaultValue  Default Value.
 *
 * @return {*} Preference Value.
 */


function getPreference(state, preferenceKey, defaultValue) {
  var preferences = getPreferences(state);
  var value = preferences[preferenceKey];
  return value === undefined ? defaultValue : value;
}
/**
 * Returns true if the publish sidebar is opened.
 *
 * @param {Object} state Global application state
 *
 * @return {boolean} Whether the publish sidebar is open.
 */


function isPublishSidebarOpened(state) {
  return state.publishSidebarActive;
}
/**
 * Returns true if the given panel was programmatically removed, or false otherwise.
 * All panels are not removed by default.
 *
 * @param {Object} state     Global application state.
 * @param {string} panelName A string that identifies the panel.
 *
 * @return {boolean} Whether or not the panel is removed.
 */


function isEditorPanelRemoved(state, panelName) {
  return (0, _lodash.includes)(state.removedPanels, panelName);
}
/**
 * Returns true if the given panel is enabled, or false otherwise. Panels are
 * enabled by default.
 *
 * @param {Object} state     Global application state.
 * @param {string} panelName A string that identifies the panel.
 *
 * @return {boolean} Whether or not the panel is enabled.
 */


function isEditorPanelEnabled(state, panelName) {
  var panels = getPreference(state, 'panels');
  return !isEditorPanelRemoved(state, panelName) && (0, _lodash.get)(panels, [panelName, 'enabled'], true);
}
/**
 * Returns true if the given panel is open, or false otherwise. Panels are
 * closed by default.
 *
 * @param  {Object}  state     Global application state.
 * @param  {string}  panelName A string that identifies the panel.
 *
 * @return {boolean} Whether or not the panel is open.
 */


function isEditorPanelOpened(state, panelName) {
  var panels = getPreference(state, 'panels');
  return (0, _lodash.get)(panels, [panelName]) === true || (0, _lodash.get)(panels, [panelName, 'opened']) === true;
}
/**
 * Returns true if a modal is active, or false otherwise.
 *
 * @param  {Object}  state 	   Global application state.
 * @param  {string}  modalName A string that uniquely identifies the modal.
 *
 * @return {boolean} Whether the modal is active.
 */


function isModalActive(state, modalName) {
  return state.activeModal === modalName;
}
/**
 * Returns whether the given feature is enabled or not.
 *
 * @param {Object} state   Global application state.
 * @param {string} feature Feature slug.
 *
 * @return {boolean} Is active.
 */


function isFeatureActive(state, feature) {
  return (0, _lodash.get)(state.preferences.features, [feature], false);
}
/**
 * Returns true if the plugin item is pinned to the header.
 * When the value is not set it defaults to true.
 *
 * @param  {Object}  state      Global application state.
 * @param  {string}  pluginName Plugin item name.
 *
 * @return {boolean} Whether the plugin item is pinned.
 */


var isPluginItemPinned = (0, _data.createRegistrySelector)(function (select) {
  return function (pluginName) {
    return select('core/interface').isItemPinned('core/edit-post', pluginName);
  };
});
/**
 * Returns an array of active meta box locations.
 *
 * @param {Object} state Post editor state.
 *
 * @return {string[]} Active meta box locations.
 */

exports.isPluginItemPinned = isPluginItemPinned;
var getActiveMetaBoxLocations = (0, _rememo.default)(function (state) {
  return Object.keys(state.metaBoxes.locations).filter(function (location) {
    return isMetaBoxLocationActive(state, location);
  });
}, function (state) {
  return [state.metaBoxes.locations];
});
/**
 * Returns true if a metabox location is active and visible
 *
 * @param {Object} state    Post editor state.
 * @param {string} location Meta box location to test.
 *
 * @return {boolean} Whether the meta box location is active and visible.
 */

exports.getActiveMetaBoxLocations = getActiveMetaBoxLocations;

function isMetaBoxLocationVisible(state, location) {
  return isMetaBoxLocationActive(state, location) && (0, _lodash.some)(getMetaBoxesPerLocation(state, location), function (_ref) {
    var id = _ref.id;
    return isEditorPanelEnabled(state, "meta-box-".concat(id));
  });
}
/**
 * Returns true if there is an active meta box in the given location, or false
 * otherwise.
 *
 * @param {Object} state    Post editor state.
 * @param {string} location Meta box location to test.
 *
 * @return {boolean} Whether the meta box location is active.
 */


function isMetaBoxLocationActive(state, location) {
  var metaBoxes = getMetaBoxesPerLocation(state, location);
  return !!metaBoxes && metaBoxes.length !== 0;
}
/**
 * Returns the list of all the available meta boxes for a given location.
 *
 * @param {Object} state    Global application state.
 * @param {string} location Meta box location to test.
 *
 * @return {?Array} List of meta boxes.
 */


function getMetaBoxesPerLocation(state, location) {
  return state.metaBoxes.locations[location];
}
/**
 * Returns the list of all the available meta boxes.
 *
 * @param {Object} state Global application state.
 *
 * @return {Array} List of meta boxes.
 */


var getAllMetaBoxes = (0, _rememo.default)(function (state) {
  return (0, _lodash.flatten)((0, _lodash.values)(state.metaBoxes.locations));
}, function (state) {
  return [state.metaBoxes.locations];
});
/**
 * Returns true if the post is using Meta Boxes
 *
 * @param  {Object} state Global application state
 *
 * @return {boolean} Whether there are metaboxes or not.
 */

exports.getAllMetaBoxes = getAllMetaBoxes;

function hasMetaBoxes(state) {
  return getActiveMetaBoxLocations(state).length > 0;
}
/**
 * Returns true if the Meta Boxes are being saved.
 *
 * @param   {Object}  state Global application state.
 *
 * @return {boolean} Whether the metaboxes are being saved.
 */


function isSavingMetaBoxes(state) {
  return state.metaBoxes.isSaving;
}
/**
 * Returns the current editing canvas device type.
 *
 * @param {Object} state Global application state.
 *
 * @return {string} Device type.
 */


function __experimentalGetPreviewDeviceType(state) {
  return state.deviceType;
}
/**
 * Returns true if the inserter is opened.
 *
 * @param  {Object}  state Global application state.
 *
 * @return {boolean} Whether the inserter is opened.
 */


function isInserterOpened(state) {
  return state.isInserterOpened;
}
//# sourceMappingURL=selectors.js.map