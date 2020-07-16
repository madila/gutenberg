"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = QueryControls;

var _element = require("@wordpress/element");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _i18n = require("@wordpress/i18n");

var _categorySelect = _interopRequireDefault(require("./category-select"));

var _ = require("../");

var _authorSelect = _interopRequireDefault(require("./author-select"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var DEFAULT_MIN_ITEMS = 1;
var DEFAULT_MAX_ITEMS = 100;
var MAX_CATEGORIES_SUGGESTIONS = 20;

function QueryControls(_ref) {
  var authorList = _ref.authorList,
      selectedAuthorId = _ref.selectedAuthorId,
      categoriesList = _ref.categoriesList,
      selectedCategoryId = _ref.selectedCategoryId,
      categorySuggestions = _ref.categorySuggestions,
      selectedCategories = _ref.selectedCategories,
      numberOfItems = _ref.numberOfItems,
      order = _ref.order,
      orderBy = _ref.orderBy,
      _ref$maxItems = _ref.maxItems,
      maxItems = _ref$maxItems === void 0 ? DEFAULT_MAX_ITEMS : _ref$maxItems,
      _ref$minItems = _ref.minItems,
      minItems = _ref$minItems === void 0 ? DEFAULT_MIN_ITEMS : _ref$minItems,
      onCategoryChange = _ref.onCategoryChange,
      onAuthorChange = _ref.onAuthorChange,
      onNumberOfItemsChange = _ref.onNumberOfItemsChange,
      onOrderChange = _ref.onOrderChange,
      onOrderByChange = _ref.onOrderByChange;
  return [onOrderChange && onOrderByChange && (0, _element.createElement)(_.SelectControl, {
    key: "query-controls-order-select",
    label: (0, _i18n.__)('Order by'),
    value: "".concat(orderBy, "/").concat(order),
    options: [{
      label: (0, _i18n.__)('Newest to oldest'),
      value: 'date/desc'
    }, {
      label: (0, _i18n.__)('Oldest to newest'),
      value: 'date/asc'
    }, {
      /* translators: label for ordering posts by title in ascending order */
      label: (0, _i18n.__)('A → Z'),
      value: 'title/asc'
    }, {
      /* translators: label for ordering posts by title in descending order */
      label: (0, _i18n.__)('Z → A'),
      value: 'title/desc'
    }],
    onChange: function onChange(value) {
      var _value$split = value.split('/'),
          _value$split2 = (0, _slicedToArray2.default)(_value$split, 2),
          newOrderBy = _value$split2[0],
          newOrder = _value$split2[1];

      if (newOrder !== order) {
        onOrderChange(newOrder);
      }

      if (newOrderBy !== orderBy) {
        onOrderByChange(newOrderBy);
      }
    }
  }), categoriesList && onCategoryChange && (0, _element.createElement)(_categorySelect.default, {
    key: "query-controls-category-select",
    categoriesList: categoriesList,
    label: (0, _i18n.__)('Category'),
    noOptionLabel: (0, _i18n.__)('All'),
    selectedCategoryId: selectedCategoryId
  }), categorySuggestions && onCategoryChange && (0, _element.createElement)(_.FormTokenField, {
    key: "query-controls-categories-select",
    label: (0, _i18n.__)('Categories'),
    value: selectedCategories && selectedCategories.map(function (item) {
      return {
        id: item.id,
        value: item.name || item.value
      };
    }),
    suggestions: Object.keys(categorySuggestions),
    onChange: onCategoryChange,
    maxSuggestions: MAX_CATEGORIES_SUGGESTIONS
  }), onAuthorChange && (0, _element.createElement)(_authorSelect.default, {
    key: "query-controls-author-select",
    authorList: authorList,
    label: (0, _i18n.__)('Author'),
    noOptionLabel: (0, _i18n.__)('All'),
    selectedAuthorId: selectedAuthorId,
    onChange: onAuthorChange
  }), onNumberOfItemsChange && (0, _element.createElement)(_.RangeControl, {
    key: "query-controls-range-control",
    label: (0, _i18n.__)('Number of items'),
    value: numberOfItems,
    onChange: onNumberOfItemsChange,
    min: minItems,
    max: maxItems,
    required: true
  })];
}
//# sourceMappingURL=index.js.map