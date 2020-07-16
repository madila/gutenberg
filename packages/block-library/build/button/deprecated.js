"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _lodash = require("lodash");

var _classnames4 = _interopRequireDefault(require("classnames"));

var _blockEditor = require("@wordpress/block-editor");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var migrateCustomColorsAndGradients = function migrateCustomColorsAndGradients(attributes) {
  if (!attributes.customTextColor && !attributes.customBackgroundColor && !attributes.customGradient) {
    return attributes;
  }

  var style = {
    color: {}
  };

  if (attributes.customTextColor) {
    style.color.text = attributes.customTextColor;
  }

  if (attributes.customBackgroundColor) {
    style.color.background = attributes.customBackgroundColor;
  }

  if (attributes.customGradient) {
    style.color.gradient = attributes.customGradient;
  }

  return _objectSpread({}, (0, _lodash.omit)(attributes, ['customTextColor', 'customBackgroundColor', 'customGradient']), {
    style: style
  });
};

var oldColorsMigration = function oldColorsMigration(attributes) {
  return migrateCustomColorsAndGradients((0, _lodash.omit)(_objectSpread({}, attributes, {
    customTextColor: attributes.textColor && '#' === attributes.textColor[0] ? attributes.textColor : undefined,
    customBackgroundColor: attributes.color && '#' === attributes.color[0] ? attributes.color : undefined
  }), ['color', 'textColor']));
};

var blockAttributes = {
  url: {
    type: 'string',
    source: 'attribute',
    selector: 'a',
    attribute: 'href'
  },
  title: {
    type: 'string',
    source: 'attribute',
    selector: 'a',
    attribute: 'title'
  },
  text: {
    type: 'string',
    source: 'html',
    selector: 'a'
  }
};
var deprecated = [{
  supports: {
    align: true,
    alignWide: false,
    __experimentalColor: {
      gradients: true
    }
  },
  attributes: _objectSpread({}, blockAttributes, {
    linkTarget: {
      type: 'string',
      source: 'attribute',
      selector: 'a',
      attribute: 'target'
    },
    rel: {
      type: 'string',
      source: 'attribute',
      selector: 'a',
      attribute: 'rel'
    },
    placeholder: {
      type: 'string'
    },
    borderRadius: {
      type: 'number'
    },
    backgroundColor: {
      type: 'string'
    },
    textColor: {
      type: 'string'
    },
    gradient: {
      type: 'string'
    },
    style: {
      type: 'object'
    }
  }),
  save: function save(_ref) {
    var attributes = _ref.attributes;
    var borderRadius = attributes.borderRadius,
        linkTarget = attributes.linkTarget,
        rel = attributes.rel,
        text = attributes.text,
        title = attributes.title,
        url = attributes.url;
    var buttonClasses = (0, _classnames4.default)('wp-block-button__link', {
      'no-border-radius': borderRadius === 0
    });
    var buttonStyle = {
      borderRadius: borderRadius ? borderRadius + 'px' : undefined
    };
    return (0, _element.createElement)(_blockEditor.RichText.Content, {
      tagName: "a",
      className: buttonClasses,
      href: url,
      title: title,
      style: buttonStyle,
      value: text,
      target: linkTarget,
      rel: rel
    });
  }
}, {
  supports: {
    align: true,
    alignWide: false
  },
  attributes: _objectSpread({}, blockAttributes, {
    linkTarget: {
      type: 'string',
      source: 'attribute',
      selector: 'a',
      attribute: 'target'
    },
    rel: {
      type: 'string',
      source: 'attribute',
      selector: 'a',
      attribute: 'rel'
    },
    placeholder: {
      type: 'string'
    },
    borderRadius: {
      type: 'number'
    },
    backgroundColor: {
      type: 'string'
    },
    textColor: {
      type: 'string'
    },
    customBackgroundColor: {
      type: 'string'
    },
    customTextColor: {
      type: 'string'
    },
    customGradient: {
      type: 'string'
    },
    gradient: {
      type: 'string'
    }
  }),
  isEligible: function isEligible(attributes) {
    return !!attributes.customTextColor || !!attributes.customBackgroundColor || !!attributes.customGradient;
  },
  migrate: migrateCustomColorsAndGradients,
  save: function save(_ref2) {
    var _classnames;

    var attributes = _ref2.attributes;
    var backgroundColor = attributes.backgroundColor,
        borderRadius = attributes.borderRadius,
        customBackgroundColor = attributes.customBackgroundColor,
        customTextColor = attributes.customTextColor,
        customGradient = attributes.customGradient,
        linkTarget = attributes.linkTarget,
        gradient = attributes.gradient,
        rel = attributes.rel,
        text = attributes.text,
        textColor = attributes.textColor,
        title = attributes.title,
        url = attributes.url;
    var textClass = (0, _blockEditor.getColorClassName)('color', textColor);
    var backgroundClass = !customGradient && (0, _blockEditor.getColorClassName)('background-color', backgroundColor);
    var gradientClass = (0, _blockEditor.__experimentalGetGradientClass)(gradient);
    var buttonClasses = (0, _classnames4.default)('wp-block-button__link', (_classnames = {
      'has-text-color': textColor || customTextColor
    }, (0, _defineProperty2.default)(_classnames, textClass, textClass), (0, _defineProperty2.default)(_classnames, 'has-background', backgroundColor || customBackgroundColor || customGradient || gradient), (0, _defineProperty2.default)(_classnames, backgroundClass, backgroundClass), (0, _defineProperty2.default)(_classnames, 'no-border-radius', borderRadius === 0), (0, _defineProperty2.default)(_classnames, gradientClass, gradientClass), _classnames));
    var buttonStyle = {
      background: customGradient ? customGradient : undefined,
      backgroundColor: backgroundClass || customGradient || gradient ? undefined : customBackgroundColor,
      color: textClass ? undefined : customTextColor,
      borderRadius: borderRadius ? borderRadius + 'px' : undefined
    }; // The use of a `title` attribute here is soft-deprecated, but still applied
    // if it had already been assigned, for the sake of backward-compatibility.
    // A title will no longer be assigned for new or updated button block links.

    return (0, _element.createElement)("div", null, (0, _element.createElement)(_blockEditor.RichText.Content, {
      tagName: "a",
      className: buttonClasses,
      href: url,
      title: title,
      style: buttonStyle,
      value: text,
      target: linkTarget,
      rel: rel
    }));
  }
}, {
  attributes: _objectSpread({}, blockAttributes, {
    align: {
      type: 'string',
      default: 'none'
    },
    backgroundColor: {
      type: 'string'
    },
    textColor: {
      type: 'string'
    },
    customBackgroundColor: {
      type: 'string'
    },
    customTextColor: {
      type: 'string'
    },
    linkTarget: {
      type: 'string',
      source: 'attribute',
      selector: 'a',
      attribute: 'target'
    },
    rel: {
      type: 'string',
      source: 'attribute',
      selector: 'a',
      attribute: 'rel'
    },
    placeholder: {
      type: 'string'
    }
  }),
  isEligible: function isEligible(attribute) {
    return attribute.className && attribute.className.includes('is-style-squared');
  },
  migrate: function migrate(attributes) {
    var newClassName = attributes.className;

    if (newClassName) {
      newClassName = newClassName.replace(/is-style-squared[\s]?/, '').trim();
    }

    return migrateCustomColorsAndGradients(_objectSpread({}, attributes, {
      className: newClassName ? newClassName : undefined,
      borderRadius: 0
    }));
  },
  save: function save(_ref3) {
    var _classnames2;

    var attributes = _ref3.attributes;
    var backgroundColor = attributes.backgroundColor,
        customBackgroundColor = attributes.customBackgroundColor,
        customTextColor = attributes.customTextColor,
        linkTarget = attributes.linkTarget,
        rel = attributes.rel,
        text = attributes.text,
        textColor = attributes.textColor,
        title = attributes.title,
        url = attributes.url;
    var textClass = (0, _blockEditor.getColorClassName)('color', textColor);
    var backgroundClass = (0, _blockEditor.getColorClassName)('background-color', backgroundColor);
    var buttonClasses = (0, _classnames4.default)('wp-block-button__link', (_classnames2 = {
      'has-text-color': textColor || customTextColor
    }, (0, _defineProperty2.default)(_classnames2, textClass, textClass), (0, _defineProperty2.default)(_classnames2, 'has-background', backgroundColor || customBackgroundColor), (0, _defineProperty2.default)(_classnames2, backgroundClass, backgroundClass), _classnames2));
    var buttonStyle = {
      backgroundColor: backgroundClass ? undefined : customBackgroundColor,
      color: textClass ? undefined : customTextColor
    };
    return (0, _element.createElement)("div", null, (0, _element.createElement)(_blockEditor.RichText.Content, {
      tagName: "a",
      className: buttonClasses,
      href: url,
      title: title,
      style: buttonStyle,
      value: text,
      target: linkTarget,
      rel: rel
    }));
  }
}, {
  attributes: _objectSpread({}, blockAttributes, {
    align: {
      type: 'string',
      default: 'none'
    },
    backgroundColor: {
      type: 'string'
    },
    textColor: {
      type: 'string'
    },
    customBackgroundColor: {
      type: 'string'
    },
    customTextColor: {
      type: 'string'
    }
  }),
  migrate: oldColorsMigration,
  save: function save(_ref4) {
    var _classnames3;

    var attributes = _ref4.attributes;
    var url = attributes.url,
        text = attributes.text,
        title = attributes.title,
        backgroundColor = attributes.backgroundColor,
        textColor = attributes.textColor,
        customBackgroundColor = attributes.customBackgroundColor,
        customTextColor = attributes.customTextColor;
    var textClass = (0, _blockEditor.getColorClassName)('color', textColor);
    var backgroundClass = (0, _blockEditor.getColorClassName)('background-color', backgroundColor);
    var buttonClasses = (0, _classnames4.default)('wp-block-button__link', (_classnames3 = {
      'has-text-color': textColor || customTextColor
    }, (0, _defineProperty2.default)(_classnames3, textClass, textClass), (0, _defineProperty2.default)(_classnames3, 'has-background', backgroundColor || customBackgroundColor), (0, _defineProperty2.default)(_classnames3, backgroundClass, backgroundClass), _classnames3));
    var buttonStyle = {
      backgroundColor: backgroundClass ? undefined : customBackgroundColor,
      color: textClass ? undefined : customTextColor
    };
    return (0, _element.createElement)("div", null, (0, _element.createElement)(_blockEditor.RichText.Content, {
      tagName: "a",
      className: buttonClasses,
      href: url,
      title: title,
      style: buttonStyle,
      value: text
    }));
  }
}, {
  attributes: _objectSpread({}, blockAttributes, {
    color: {
      type: 'string'
    },
    textColor: {
      type: 'string'
    },
    align: {
      type: 'string',
      default: 'none'
    }
  }),
  save: function save(_ref5) {
    var attributes = _ref5.attributes;
    var url = attributes.url,
        text = attributes.text,
        title = attributes.title,
        align = attributes.align,
        color = attributes.color,
        textColor = attributes.textColor;
    var buttonStyle = {
      backgroundColor: color,
      color: textColor
    };
    var linkClass = 'wp-block-button__link';
    return (0, _element.createElement)("div", {
      className: "align".concat(align)
    }, (0, _element.createElement)(_blockEditor.RichText.Content, {
      tagName: "a",
      className: linkClass,
      href: url,
      title: title,
      style: buttonStyle,
      value: text
    }));
  },
  migrate: oldColorsMigration
}, {
  attributes: _objectSpread({}, blockAttributes, {
    color: {
      type: 'string'
    },
    textColor: {
      type: 'string'
    },
    align: {
      type: 'string',
      default: 'none'
    }
  }),
  save: function save(_ref6) {
    var attributes = _ref6.attributes;
    var url = attributes.url,
        text = attributes.text,
        title = attributes.title,
        align = attributes.align,
        color = attributes.color,
        textColor = attributes.textColor;
    return (0, _element.createElement)("div", {
      className: "align".concat(align),
      style: {
        backgroundColor: color
      }
    }, (0, _element.createElement)(_blockEditor.RichText.Content, {
      tagName: "a",
      href: url,
      title: title,
      style: {
        color: textColor
      },
      value: text
    }));
  },
  migrate: oldColorsMigration
}];
var _default = deprecated;
exports.default = _default;
//# sourceMappingURL=deprecated.js.map