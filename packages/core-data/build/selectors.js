"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAuthors = getAuthors;
exports.getCurrentUser = getCurrentUser;
exports.getEntitiesByKind = getEntitiesByKind;
exports.getEntity = getEntity;
exports.getEntityRecord = getEntityRecord;
exports.__experimentalGetEntityRecordNoResolver = __experimentalGetEntityRecordNoResolver;
exports.getEntityRecords = getEntityRecords;
exports.getEntityRecordEdits = getEntityRecordEdits;
exports.hasEditsForEntityRecord = hasEditsForEntityRecord;
exports.isAutosavingEntityRecord = isAutosavingEntityRecord;
exports.isSavingEntityRecord = isSavingEntityRecord;
exports.getLastEntitySaveError = getLastEntitySaveError;
exports.getUndoEdit = getUndoEdit;
exports.getRedoEdit = getRedoEdit;
exports.hasUndo = hasUndo;
exports.hasRedo = hasRedo;
exports.getCurrentTheme = getCurrentTheme;
exports.getThemeSupports = getThemeSupports;
exports.getEmbedPreview = getEmbedPreview;
exports.isPreviewEmbedFallback = isPreviewEmbedFallback;
exports.hasUploadPermissions = hasUploadPermissions;
exports.canUser = canUser;
exports.getAutosaves = getAutosaves;
exports.getAutosave = getAutosave;
exports.getReferenceByDistinctEdits = exports.hasFetchedAutosaves = exports.getEditedEntityRecord = exports.getEntityRecordNonTransientEdits = exports.__experimentalGetDirtyEntityRecords = exports.getRawEntityRecord = exports.getUserQueryResults = exports.isRequestingEmbedPreview = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _rememo = _interopRequireDefault(require("rememo"));

var _lodash = require("lodash");

var _data = require("@wordpress/data");

var _deprecated = _interopRequireDefault(require("@wordpress/deprecated"));

var _name = require("./name");

var _queriedData = require("./queried-data");

var _entities = require("./entities");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Returns true if a request is in progress for embed preview data, or false
 * otherwise.
 *
 * @param {Object} state Data state.
 * @param {string} url   URL the preview would be for.
 *
 * @return {boolean} Whether a request is in progress for an embed preview.
 */
var isRequestingEmbedPreview = (0, _data.createRegistrySelector)(function (select) {
  return function (state, url) {
    return select('core/data').isResolving(_name.REDUCER_KEY, 'getEmbedPreview', [url]);
  };
});
/**
 * Returns all available authors.
 *
 * @param {Object} state Data state.
 *
 * @return {Array} Authors list.
 */

exports.isRequestingEmbedPreview = isRequestingEmbedPreview;

function getAuthors(state) {
  return getUserQueryResults(state, 'authors');
}
/**
 * Returns the current user.
 *
 * @param {Object} state Data state.
 *
 * @return {Object} Current user object.
 */


function getCurrentUser(state) {
  return state.currentUser;
}
/**
 * Returns all the users returned by a query ID.
 *
 * @param {Object} state   Data state.
 * @param {string} queryID Query ID.
 *
 * @return {Array} Users list.
 */


var getUserQueryResults = (0, _rememo.default)(function (state, queryID) {
  var queryResults = state.users.queries[queryID];
  return (0, _lodash.map)(queryResults, function (id) {
    return state.users.byId[id];
  });
}, function (state, queryID) {
  return [state.users.queries[queryID], state.users.byId];
});
/**
 * Returns whether the entities for the give kind are loaded.
 *
 * @param {Object} state   Data state.
 * @param {string} kind  Entity kind.
 *
 * @return {boolean} Whether the entities are loaded
 */

exports.getUserQueryResults = getUserQueryResults;

function getEntitiesByKind(state, kind) {
  return (0, _lodash.filter)(state.entities.config, {
    kind: kind
  });
}
/**
 * Returns the entity object given its kind and name.
 *
 * @param {Object} state   Data state.
 * @param {string} kind  Entity kind.
 * @param {string} name  Entity name.
 *
 * @return {Object} Entity
 */


function getEntity(state, kind, name) {
  return (0, _lodash.find)(state.entities.config, {
    kind: kind,
    name: name
  });
}
/**
 * Returns the Entity's record object by key.
 *
 * @param {Object} state  State tree
 * @param {string} kind   Entity kind.
 * @param {string} name   Entity name.
 * @param {number} key    Record's key
 *
 * @return {Object?} Record.
 */


function getEntityRecord(state, kind, name, key) {
  return (0, _lodash.get)(state.entities.data, [kind, name, 'queriedData', 'items', key]);
}
/**
 * Returns the Entity's record object by key. Doesn't trigger a resolver nor requests the entity from the API if the entity record isn't available in the local state.
 *
 * @param {Object} state  State tree
 * @param {string} kind   Entity kind.
 * @param {string} name   Entity name.
 * @param {number} key    Record's key
 *
 * @return {Object?} Record.
 */


function __experimentalGetEntityRecordNoResolver(state, kind, name, key) {
  return getEntityRecord(state, kind, name, key);
}
/**
 * Returns the entity's record object by key,
 * with its attributes mapped to their raw values.
 *
 * @param {Object} state  State tree.
 * @param {string} kind   Entity kind.
 * @param {string} name   Entity name.
 * @param {number} key    Record's key.
 *
 * @return {Object?} Object with the entity's raw attributes.
 */


var getRawEntityRecord = (0, _rememo.default)(function (state, kind, name, key) {
  var record = getEntityRecord(state, kind, name, key);
  return record && Object.keys(record).reduce(function (accumulator, _key) {
    // Because edits are the "raw" attribute values,
    // we return those from record selectors to make rendering,
    // comparisons, and joins with edits easier.
    accumulator[_key] = (0, _lodash.get)(record[_key], 'raw', record[_key]);
    return accumulator;
  }, {});
}, function (state) {
  return [state.entities.data];
});
/**
 * Returns the Entity's records.
 *
 * @param {Object}  state  State tree
 * @param {string}  kind   Entity kind.
 * @param {string}  name   Entity name.
 * @param {?Object} query  Optional terms query.
 *
 * @return {?Array} Records.
 */

exports.getRawEntityRecord = getRawEntityRecord;

function getEntityRecords(state, kind, name, query) {
  var queriedState = (0, _lodash.get)(state.entities.data, [kind, name, 'queriedData']);

  if (!queriedState) {
    return [];
  }

  return (0, _queriedData.getQueriedItems)(queriedState, query);
}
/**
 * Returns the  list of dirty entity records.
 *
 * @param {Object} state State tree.
 *
 * @return {[{ title: string, key: string, name: string, kind: string }]} The list of updated records
 */


var __experimentalGetDirtyEntityRecords = (0, _rememo.default)(function (state) {
  var data = state.entities.data;
  var dirtyRecords = [];
  Object.keys(data).forEach(function (kind) {
    Object.keys(data[kind]).forEach(function (name) {
      var primaryKeys = Object.keys(data[kind][name].edits).filter(function (primaryKey) {
        return hasEditsForEntityRecord(state, kind, name, primaryKey);
      });

      if (primaryKeys.length) {
        var entity = getEntity(state, kind, name);
        primaryKeys.forEach(function (primaryKey) {
          var entityRecord = getEntityRecord(state, kind, name, primaryKey);
          dirtyRecords.push({
            // We avoid using primaryKey because it's transformed into a string
            // when it's used as an object key.
            key: entityRecord[entity.key || _entities.DEFAULT_ENTITY_KEY],
            title: !entity.getTitle ? '' : entity.getTitle(entityRecord),
            name: name,
            kind: kind
          });
        });
      }
    });
  });
  return dirtyRecords;
}, function (state) {
  return [state.entities.data];
});
/**
 * Returns the specified entity record's edits.
 *
 * @param {Object} state    State tree.
 * @param {string} kind     Entity kind.
 * @param {string} name     Entity name.
 * @param {number} recordId Record ID.
 *
 * @return {Object?} The entity record's edits.
 */


exports.__experimentalGetDirtyEntityRecords = __experimentalGetDirtyEntityRecords;

function getEntityRecordEdits(state, kind, name, recordId) {
  return (0, _lodash.get)(state.entities.data, [kind, name, 'edits', recordId]);
}
/**
 * Returns the specified entity record's non transient edits.
 *
 * Transient edits don't create an undo level, and
 * are not considered for change detection.
 * They are defined in the entity's config.
 *
 * @param {Object} state    State tree.
 * @param {string} kind     Entity kind.
 * @param {string} name     Entity name.
 * @param {number} recordId Record ID.
 *
 * @return {Object?} The entity record's non transient edits.
 */


var getEntityRecordNonTransientEdits = (0, _rememo.default)(function (state, kind, name, recordId) {
  var _ref = getEntity(state, kind, name) || {},
      transientEdits = _ref.transientEdits;

  var edits = getEntityRecordEdits(state, kind, name, recordId) || {};

  if (!transientEdits) {
    return edits;
  }

  return Object.keys(edits).reduce(function (acc, key) {
    if (!transientEdits[key]) {
      acc[key] = edits[key];
    }

    return acc;
  }, {});
}, function (state) {
  return [state.entities.config, state.entities.data];
});
/**
 * Returns true if the specified entity record has edits,
 * and false otherwise.
 *
 * @param {Object} state    State tree.
 * @param {string} kind     Entity kind.
 * @param {string} name     Entity name.
 * @param {number} recordId Record ID.
 *
 * @return {boolean} Whether the entity record has edits or not.
 */

exports.getEntityRecordNonTransientEdits = getEntityRecordNonTransientEdits;

function hasEditsForEntityRecord(state, kind, name, recordId) {
  return isSavingEntityRecord(state, kind, name, recordId) || Object.keys(getEntityRecordNonTransientEdits(state, kind, name, recordId)).length > 0;
}
/**
 * Returns the specified entity record, merged with its edits.
 *
 * @param {Object} state    State tree.
 * @param {string} kind     Entity kind.
 * @param {string} name     Entity name.
 * @param {number} recordId Record ID.
 *
 * @return {Object?} The entity record, merged with its edits.
 */


var getEditedEntityRecord = (0, _rememo.default)(function (state, kind, name, recordId) {
  return _objectSpread({}, getRawEntityRecord(state, kind, name, recordId), {}, getEntityRecordEdits(state, kind, name, recordId));
}, function (state) {
  return [state.entities.data];
});
/**
 * Returns true if the specified entity record is autosaving, and false otherwise.
 *
 * @param {Object} state    State tree.
 * @param {string} kind     Entity kind.
 * @param {string} name     Entity name.
 * @param {number} recordId Record ID.
 *
 * @return {boolean} Whether the entity record is autosaving or not.
 */

exports.getEditedEntityRecord = getEditedEntityRecord;

function isAutosavingEntityRecord(state, kind, name, recordId) {
  var _get = (0, _lodash.get)(state.entities.data, [kind, name, 'saving', recordId], {}),
      pending = _get.pending,
      isAutosave = _get.isAutosave;

  return Boolean(pending && isAutosave);
}
/**
 * Returns true if the specified entity record is saving, and false otherwise.
 *
 * @param {Object} state    State tree.
 * @param {string} kind     Entity kind.
 * @param {string} name     Entity name.
 * @param {number} recordId Record ID.
 *
 * @return {boolean} Whether the entity record is saving or not.
 */


function isSavingEntityRecord(state, kind, name, recordId) {
  return (0, _lodash.get)(state.entities.data, [kind, name, 'saving', recordId, 'pending'], false);
}
/**
 * Returns the specified entity record's last save error.
 *
 * @param {Object} state    State tree.
 * @param {string} kind     Entity kind.
 * @param {string} name     Entity name.
 * @param {number} recordId Record ID.
 *
 * @return {Object?} The entity record's save error.
 */


function getLastEntitySaveError(state, kind, name, recordId) {
  return (0, _lodash.get)(state.entities.data, [kind, name, 'saving', recordId, 'error']);
}
/**
 * Returns the current undo offset for the
 * entity records edits history. The offset
 * represents how many items from the end
 * of the history stack we are at. 0 is the
 * last edit, -1 is the second last, and so on.
 *
 * @param {Object} state State tree.
 *
 * @return {number} The current undo offset.
 */


function getCurrentUndoOffset(state) {
  return state.undo.offset;
}
/**
 * Returns the previous edit from the current undo offset
 * for the entity records edits history, if any.
 *
 * @param {Object} state State tree.
 *
 * @return {Object?} The edit.
 */


function getUndoEdit(state) {
  return state.undo[state.undo.length - 2 + getCurrentUndoOffset(state)];
}
/**
 * Returns the next edit from the current undo offset
 * for the entity records edits history, if any.
 *
 * @param {Object} state State tree.
 *
 * @return {Object?} The edit.
 */


function getRedoEdit(state) {
  return state.undo[state.undo.length + getCurrentUndoOffset(state)];
}
/**
 * Returns true if there is a previous edit from the current undo offset
 * for the entity records edits history, and false otherwise.
 *
 * @param {Object} state State tree.
 *
 * @return {boolean} Whether there is a previous edit or not.
 */


function hasUndo(state) {
  return Boolean(getUndoEdit(state));
}
/**
 * Returns true if there is a next edit from the current undo offset
 * for the entity records edits history, and false otherwise.
 *
 * @param {Object} state State tree.
 *
 * @return {boolean} Whether there is a next edit or not.
 */


function hasRedo(state) {
  return Boolean(getRedoEdit(state));
}
/**
 * Return the current theme.
 *
 * @param {Object} state Data state.
 *
 * @return {Object}      The current theme.
 */


function getCurrentTheme(state) {
  return state.themes[state.currentTheme];
}
/**
 * Return theme supports data in the index.
 *
 * @param {Object} state Data state.
 *
 * @return {*}           Index data.
 */


function getThemeSupports(state) {
  return state.themeSupports;
}
/**
 * Returns the embed preview for the given URL.
 *
 * @param {Object} state    Data state.
 * @param {string} url      Embedded URL.
 *
 * @return {*} Undefined if the preview has not been fetched, otherwise, the preview fetched from the embed preview API.
 */


function getEmbedPreview(state, url) {
  return state.embedPreviews[url];
}
/**
 * Determines if the returned preview is an oEmbed link fallback.
 *
 * WordPress can be configured to return a simple link to a URL if it is not embeddable.
 * We need to be able to determine if a URL is embeddable or not, based on what we
 * get back from the oEmbed preview API.
 *
 * @param {Object} state    Data state.
 * @param {string} url      Embedded URL.
 *
 * @return {boolean} Is the preview for the URL an oEmbed link fallback.
 */


function isPreviewEmbedFallback(state, url) {
  var preview = state.embedPreviews[url];
  var oEmbedLinkCheck = '<a href="' + url + '">' + url + '</a>';

  if (!preview) {
    return false;
  }

  return preview.html === oEmbedLinkCheck;
}
/**
 * Returns whether the current user can upload media.
 *
 * Calling this may trigger an OPTIONS request to the REST API via the
 * `canUser()` resolver.
 *
 * https://developer.wordpress.org/rest-api/reference/
 *
 * @deprecated since 5.0. Callers should use the more generic `canUser()` selector instead of
 *             `hasUploadPermissions()`, e.g. `canUser( 'create', 'media' )`.
 *
 * @param {Object} state Data state.
 *
 * @return {boolean} Whether or not the user can upload media. Defaults to `true` if the OPTIONS
 *                   request is being made.
 */


function hasUploadPermissions(state) {
  (0, _deprecated.default)("select( 'core' ).hasUploadPermissions()", {
    alternative: "select( 'core' ).canUser( 'create', 'media' )"
  });
  return (0, _lodash.defaultTo)(canUser(state, 'create', 'media'), true);
}
/**
 * Returns whether the current user can perform the given action on the given
 * REST resource.
 *
 * Calling this may trigger an OPTIONS request to the REST API via the
 * `canUser()` resolver.
 *
 * https://developer.wordpress.org/rest-api/reference/
 *
 * @param {Object}   state            Data state.
 * @param {string}   action           Action to check. One of: 'create', 'read', 'update', 'delete'.
 * @param {string}   resource         REST resource to check, e.g. 'media' or 'posts'.
 * @param {string=}  id               Optional ID of the rest resource to check.
 *
 * @return {boolean|undefined} Whether or not the user can perform the action,
 *                             or `undefined` if the OPTIONS request is still being made.
 */


function canUser(state, action, resource, id) {
  var key = (0, _lodash.compact)([action, resource, id]).join('/');
  return (0, _lodash.get)(state, ['userPermissions', key]);
}
/**
 * Returns the latest autosaves for the post.
 *
 * May return multiple autosaves since the backend stores one autosave per
 * author for each post.
 *
 * @param {Object} state    State tree.
 * @param {string} postType The type of the parent post.
 * @param {number} postId   The id of the parent post.
 *
 * @return {?Array} An array of autosaves for the post, or undefined if there is none.
 */


function getAutosaves(state, postType, postId) {
  return state.autosaves[postId];
}
/**
 * Returns the autosave for the post and author.
 *
 * @param {Object} state    State tree.
 * @param {string} postType The type of the parent post.
 * @param {number} postId   The id of the parent post.
 * @param {number} authorId The id of the author.
 *
 * @return {?Object} The autosave for the post and author.
 */


function getAutosave(state, postType, postId, authorId) {
  if (authorId === undefined) {
    return;
  }

  var autosaves = state.autosaves[postId];
  return (0, _lodash.find)(autosaves, {
    author: authorId
  });
}
/**
 * Returns true if the REST request for autosaves has completed.
 *
 * @param {Object} state State tree.
 * @param {string} postType The type of the parent post.
 * @param {number} postId   The id of the parent post.
 *
 * @return {boolean} True if the REST request was completed. False otherwise.
 */


var hasFetchedAutosaves = (0, _data.createRegistrySelector)(function (select) {
  return function (state, postType, postId) {
    return select(_name.REDUCER_KEY).hasFinishedResolution('getAutosaves', [postType, postId]);
  };
});
/**
 * Returns a new reference when edited values have changed. This is useful in
 * inferring where an edit has been made between states by comparison of the
 * return values using strict equality.
 *
 * @example
 *
 * ```
 * const hasEditOccurred = (
 *    getReferenceByDistinctEdits( beforeState ) !==
 *    getReferenceByDistinctEdits( afterState )
 * );
 * ```
 *
 * @param {Object} state Editor state.
 *
 * @return {*} A value whose reference will change only when an edit occurs.
 */

exports.hasFetchedAutosaves = hasFetchedAutosaves;
var getReferenceByDistinctEdits = (0, _rememo.default)(function () {
  return [];
}, function (state) {
  return [state.undo.length, state.undo.offset];
});
exports.getReferenceByDistinctEdits = getReferenceByDistinctEdits;
//# sourceMappingURL=selectors.js.map