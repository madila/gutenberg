"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Parts of this source were derived and modified from react-native-web,
 * released under the MIT license.
 *
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 */
var Platform = {
  OS: 'web',
  select: function select(spec) {
    return 'web' in spec ? spec.web : spec.default;
  }
};
/**
 * Component used to detect the current Platform being used.
 * Use Platform.OS === 'web' to detect if running on web enviroment.
 *
 * This is the same concept as the React Native implementation.
 *
 * @see https://facebook.github.io/react-native/docs/platform-specific-code#platform-module
 *
 * Here is an example of how to use the select method:
 * @example
 * ```js
 * import { Platform } from '@wordpress/element';
 *
 * const placeholderLabel = Platform.select( {
 *   native: __( 'Add media' ),
 *   web: __( 'Drag images, upload new ones or select files from your library.' ),
 * } );
 * ```
 */

var _default = Platform;
exports.default = _default;
//# sourceMappingURL=platform.js.map