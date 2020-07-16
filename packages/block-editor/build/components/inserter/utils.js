"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.includeVariationsInInserterItems = includeVariationsInInserterItems;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Normalizes an inserter block types list and includes variations as separate items.
 *
 * @param {Array} items Denormalized inserter items
 * @return {Array} Normalized inserter items.
 */
function includeVariationsInInserterItems(items) {
  return items.reduce(function (result, item) {
    var _item$variations = item.variations,
        variations = _item$variations === void 0 ? [] : _item$variations;
    var hasDefaultVariation = variations.some(function (_ref) {
      var isDefault = _ref.isDefault;
      return isDefault;
    }); // If there is no default inserter variation provided,
    // then default block type is displayed.

    if (!hasDefaultVariation) {
      result.push(item);
    }

    if (variations.length) {
      result = result.concat(variations.map(function (variation) {
        return _objectSpread({}, item, {
          id: "".concat(item.id, "-").concat(variation.name),
          icon: variation.icon || item.icon,
          title: variation.title || item.title,
          description: variation.description || item.description,
          // If `example` is explicitly undefined for the variation, the preview will not be shown.
          example: variation.hasOwnProperty('example') ? variation.example : item.example,
          initialAttributes: _objectSpread({}, item.initialAttributes, {}, variation.attributes),
          innerBlocks: variation.innerBlocks
        });
      }));
    }

    return result;
  }, []);
}
//# sourceMappingURL=utils.js.map