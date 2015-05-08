!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.pestle=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./src/core.coffee":[function(_dereq_,module,exports){

/**
 * The core layer will depend on the base layer and will provide
 * the core set of functionality to application framework
 * @author Francisco Ramini <framini at gmail.com>
 */
(function(root, factory) {
  return module.exports = root.Pestle = factory(root, {});
})(window, function(root, Pestle) {
  var Base, ExtManager;
  Base = _dereq_('./base.coffee');
  ExtManager = _dereq_('./util/extmanager.coffee');
  Pestle = new Base.Events();
  Pestle.Module = _dereq_('./util/module.coffee');
  Pestle.modules = {};
  Pestle.Core = (function() {
    Core.prototype.version = "0.0.1";

    Core.prototype.cfg = {
      debug: {
        logLevel: 5
      },
      namespace: 'platform',
      extension: {},
      component: {}
    };

    function Core(config) {
      var Components, ResponsiveDesign, ResponsiveImages;
      if (config == null) {
        config = {};
      }
      this.setConfig(config);
      this.started = false;
      this.extManager = new ExtManager();
      this.sandbox = Base.util.clone(Base);
      this.sandboxes = {};
      Components = _dereq_('./extension/components.coffee');
      ResponsiveDesign = _dereq_('./extension/responsivedesign.coffee');
      ResponsiveImages = _dereq_('./extension/responsiveimages.coffee');
      this.extManager.add(Components);
      this.extManager.add(ResponsiveDesign);
      this.extManager.add(ResponsiveImages);
    }

    Core.prototype.addExtension = function(ext) {
      if (!this.started) {
        return this.extManager.add(ext);
      } else {
        Base.log.error("The Core has already been started. You can not add new extensions at this point.");
        throw new Error('You can not add extensions when the Core has already been started.');
      }
    };

    Core.prototype.setConfig = function(config) {
      var msg;
      if (!this.started) {
        if (Base.util.isObject(config)) {
          if (!Base.util.isEmpty(this.config)) {
            return this.config = Base.util.defaults(config, this.config);
          } else {
            return this.config = Base.util.defaults(config, this.cfg);
          }
        } else {
          msg = "[setConfig method] only accept an object as a parameter and you're passing: " + typeof config;
          Base.log.error(msg);
          throw new Error(msg);
        }
      } else {
        Base.log.error("Pestle has already been started. You can not set up configs at this point.");
        throw new Error('You can not set up configs when Pestle has already started.');
      }
    };

    Core.prototype.setComponentConfig = function(comp, config) {
      var msg;
      if (!this.started) {
        if (!(comp && Base.util.isString(comp))) {
          msg = "[setComponentConfig method] 1st param should be a string, you're passing:" + typeof config;
          Base.log.error(msg);
          throw new Error(msg);
        }
        if (Base.util.isObject(config)) {
          if (!Base.util.isEmpty(this.config)) {
            return this.config.component[comp] = Base.util.defaults(config, this.config.component[comp]);
          } else {
            this.config = this.config || {};
            return this.config.component[comp] = Base.util.defaults(config, this.cfg.component[comp]);
          }
        } else {
          msg = "[setComponentConfig method] 2nd param should be an object & you're passing:" + typeof config;
          Base.log.error(msg);
          throw new Error(msg);
        }
      } else {
        Base.log.error("Pestle has already been started. You can not add new extensions at this point.");
        throw new Error('You can not add extensions when Pestle has already started.');
      }
    };

    Core.prototype.start = function(selector) {
      var cb;
      if (selector == null) {
        selector = '';
      }
      Base.log.setConfig(this.config.debug);
      if (this.started && selector !== '') {
        Base.log.info("Pestle is initializing a component");
        return this.sandbox.startComponents(selector, this);
      } else {
        Base.log.info("Pestle started the initializing process");
        this.started = true;
        this.extManager.init(this);
        cb = $.Callbacks("unique memory");
        Base.util.each(this.extManager.getInitializedExtensions(), (function(_this) {
          return function(ext, i) {
            if (ext) {
              if (Base.util.isFunction(ext.afterAppStarted) && ext.activated) {
                if (ext.optionKey === "components") {
                  ext.afterAppStarted(selector, _this);
                } else {
                  ext.afterAppStarted(_this);
                }
              }
              if (Base.util.isFunction(ext.afterAppInitialized) && ext.activated) {
                return cb.add(ext.afterAppInitialized);
              }
            }
          };
        })(this));
        return cb.fire(this);
      }
    };

    Core.prototype.createSandbox = function(name, opts) {
      return this.sandboxes[name] = Base.util.extend({}, this.sandbox, {
        name: name
      });
    };

    Core.prototype.getInitializedComponents = function() {
      return this.sandbox.getInitializedComponents();
    };

    return Core;

  })();
  return Pestle;
});



},{"./base.coffee":"/home/dirigaray/projects/pestle/src/base.coffee","./extension/components.coffee":"/home/dirigaray/projects/pestle/src/extension/components.coffee","./extension/responsivedesign.coffee":"/home/dirigaray/projects/pestle/src/extension/responsivedesign.coffee","./extension/responsiveimages.coffee":"/home/dirigaray/projects/pestle/src/extension/responsiveimages.coffee","./util/extmanager.coffee":"/home/dirigaray/projects/pestle/src/util/extmanager.coffee","./util/module.coffee":"/home/dirigaray/projects/pestle/src/util/module.coffee"}],"/home/dirigaray/projects/pestle/node_modules/cookies-js/src/cookies.js":[function(_dereq_,module,exports){
/*
 * Cookies.js - 1.1.0
 * https://github.com/ScottHamper/Cookies
 *
 * This is free and unencumbered software released into the public domain.
 */
(function (global, undefined) {
    'use strict';

    var factory = function (window) {
        if (typeof window.document !== 'object') {
            throw new Error('Cookies.js requires a `window` with a `document` object');
        }

        var Cookies = function (key, value, options) {
            return arguments.length === 1 ?
                Cookies.get(key) : Cookies.set(key, value, options);
        };

        // Allows for setter injection in unit tests
        Cookies._document = window.document;

        // Used to ensure cookie keys do not collide with
        // built-in `Object` properties
        Cookies._cacheKeyPrefix = 'cookey.'; // Hurr hurr, :)

        Cookies.defaults = {
            path: '/',
            secure: false
        };

        Cookies.get = function (key) {
            if (Cookies._cachedDocumentCookie !== Cookies._document.cookie) {
                Cookies._renewCache();
            }

            return Cookies._cache[Cookies._cacheKeyPrefix + key];
        };

        Cookies.set = function (key, value, options) {
            options = Cookies._getExtendedOptions(options);
            options.expires = Cookies._getExpiresDate(value === undefined ? -1 : options.expires);

            Cookies._document.cookie = Cookies._generateCookieString(key, value, options);

            return Cookies;
        };

        Cookies.expire = function (key, options) {
            return Cookies.set(key, undefined, options);
        };

        Cookies._getExtendedOptions = function (options) {
            return {
                path: options && options.path || Cookies.defaults.path,
                domain: options && options.domain || Cookies.defaults.domain,
                expires: options && options.expires || Cookies.defaults.expires,
                secure: options && options.secure !== undefined ?  options.secure : Cookies.defaults.secure
            };
        };

        Cookies._isValidDate = function (date) {
            return Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime());
        };

        Cookies._getExpiresDate = function (expires, now) {
            now = now || new Date();
            switch (typeof expires) {
                case 'number': expires = new Date(now.getTime() + expires * 1000); break;
                case 'string': expires = new Date(expires); break;
            }

            if (expires && !Cookies._isValidDate(expires)) {
                throw new Error('`expires` parameter cannot be converted to a valid Date instance');
            }

            return expires;
        };

        Cookies._generateCookieString = function (key, value, options) {
            key = key.replace(/[^#$&+\^`|]/g, encodeURIComponent);
            key = key.replace(/\(/g, '%28').replace(/\)/g, '%29');
            value = (value + '').replace(/[^!#$&-+\--:<-\[\]-~]/g, encodeURIComponent);
            options = options || {};

            var cookieString = key + '=' + value;
            cookieString += options.path ? ';path=' + options.path : '';
            cookieString += options.domain ? ';domain=' + options.domain : '';
            cookieString += options.expires ? ';expires=' + options.expires.toUTCString() : '';
            cookieString += options.secure ? ';secure' : '';

            return cookieString;
        };

        Cookies._getCacheFromString = function (documentCookie) {
            var cookieCache = {};
            var cookiesArray = documentCookie ? documentCookie.split('; ') : [];

            for (var i = 0; i < cookiesArray.length; i++) {
                var cookieKvp = Cookies._getKeyValuePairFromCookieString(cookiesArray[i]);

                if (cookieCache[Cookies._cacheKeyPrefix + cookieKvp.key] === undefined) {
                    cookieCache[Cookies._cacheKeyPrefix + cookieKvp.key] = cookieKvp.value;
                }
            }

            return cookieCache;
        };

        Cookies._getKeyValuePairFromCookieString = function (cookieString) {
            // "=" is a valid character in a cookie value according to RFC6265, so cannot `split('=')`
            var separatorIndex = cookieString.indexOf('=');

            // IE omits the "=" when the cookie value is an empty string
            separatorIndex = separatorIndex < 0 ? cookieString.length : separatorIndex;

            return {
                key: decodeURIComponent(cookieString.substr(0, separatorIndex)),
                value: decodeURIComponent(cookieString.substr(separatorIndex + 1))
            };
        };

        Cookies._renewCache = function () {
            Cookies._cache = Cookies._getCacheFromString(Cookies._document.cookie);
            Cookies._cachedDocumentCookie = Cookies._document.cookie;
        };

        Cookies._areEnabled = function () {
            var testKey = 'cookies.js';
            var areEnabled = Cookies.set(testKey, 1).get(testKey) === '1';
            Cookies.expire(testKey);
            return areEnabled;
        };

        Cookies.enabled = Cookies._areEnabled();

        return Cookies;
    };

    var cookiesExport = typeof global.document === 'object' ? factory(global) : factory;

    // AMD support
    if (typeof define === 'function' && define.amd) {
        define(function () { return cookiesExport; });
    // CommonJS/Node.js support
    } else if (typeof exports === 'object') {
        // Support Node.js specific `module.exports` (which can be a function)
        if (typeof module === 'object' && typeof module.exports === 'object') {
            exports = module.exports = cookiesExport;
        }
        // But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
        exports.Cookies = cookiesExport;
    } else {
        global.Cookies = cookiesExport;
    }
})(typeof window === 'undefined' ? this : window);
},{}],"/home/dirigaray/projects/pestle/node_modules/imager.js/Imager.js":[function(_dereq_,module,exports){
;
(function(window, document) {

    'use strict';

    var defaultWidths, getKeys, nextTick, addEvent, getNaturalWidth;

    nextTick = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
    };

    function applyEach(collection, callbackEach) {
        var i = 0,
            length = collection.length,
            new_collection = [];

        for (; i < length; i++) {
            new_collection[i] = callbackEach(collection[i], i);
        }

        return new_collection;
    }

    function returnDirectValue(value) {
        return value;
    }

    getNaturalWidth = (function() {
        if (Object.prototype.hasOwnProperty.call(document.createElement('img'), 'naturalWidth')) {
            return function(image) {
                return image.naturalWidth;
            };
        }
        // IE8 and below lacks the naturalWidth property
        return function(source) {
            var img = document.createElement('img');
            img.src = source.src;
            return img.width;
        };
    })();

    addEvent = (function() {
        if (document.addEventListener) {
            return function addStandardEventListener(el, eventName, fn) {
                return el.addEventListener(eventName, fn, false);
            };
        } else {
            return function addIEEventListener(el, eventName, fn) {
                return el.attachEvent('on' + eventName, fn);
            };
        }
    })();

    defaultWidths = [96, 130, 165, 200, 235, 270, 304, 340, 375, 410, 445, 485, 520, 555, 590, 625, 660, 695, 736];

    getKeys = typeof Object.keys === 'function' ? Object.keys : function(object) {
        var keys = [],
            key;

        for (key in object) {
            keys.push(key);
        }

        return keys;
    };


    /*
        Construct a new Imager instance, passing an optional configuration object.

        Example usage:

            {
                // Available widths for your images
                availableWidths: [Number],

                // Selector to be used to locate your div placeholders
                selector: '',

                // Class name to give your resizable images
                className: '',

                // If set to true, Imager will update the src attribute of the relevant images
                onResize: Boolean,

                // Toggle the lazy load functionality on or off
                lazyload: Boolean,

                // Used alongside the lazyload feature (helps performance by setting a higher delay)
                scrollDelay: Number
            }

        @param {object} configuration settings
        @return {object} instance of Imager
     */
    function Imager(elements, opts) {
        var self = this,
            doc = document;

        opts = opts || {};

        if (elements !== undefined) {
            // first argument is selector string
            if (typeof elements === 'string') {
                opts.selector = elements;
                elements = undefined;
            }

            // first argument is the `opts` object, `elements` is implicitly the `opts.selector` string
            else if (typeof elements.length === 'undefined') {
                opts = elements;
                elements = undefined;
            }
        }

        this.imagesOffScreen = [];
        this.viewportHeight = doc.documentElement.clientHeight;
        this.selector = opts.selector || '.delayed-image-load';
        this.className = opts.className || 'image-replace';
        this.gif = doc.createElement('img');
        this.gif.src = 'data:image/gif;base64,R0lGODlhEAAJAIAAAP///wAAACH5BAEAAAAALAAAAAAQAAkAAAIKhI+py+0Po5yUFQA7';
        this.gif.className = this.className;
        this.gif.alt = '';
        this.scrollDelay = opts.scrollDelay || 250;
        this.onResize = opts.hasOwnProperty('onResize') ? opts.onResize : true;
        this.lazyload = opts.hasOwnProperty('lazyload') ? opts.lazyload : false;
        this.scrolled = false;
        this.availablePixelRatios = opts.availablePixelRatios || [1, 2];
        this.availableWidths = opts.availableWidths || defaultWidths;
        this.onImagesReplaced = opts.onImagesReplaced || function() {};
        this.widthsMap = {};
        this.refreshPixelRatio();
        this.widthInterpolator = opts.widthInterpolator || returnDirectValue;
        this.deltaSquare = opts.deltaSquare || 1.5;
        this.squareSelector = opts.squareSelector || 'sqrcrop';
        this.adaptSelector = this.adaptSelector || 'adapt';
        this.allowedExtensions = ["jpg","bmp","png","jpeg"];

        // Needed as IE8 adds a default `width`/`height` attribute…
        this.gif.removeAttribute('height');
        this.gif.removeAttribute('width');

        if (typeof this.availableWidths !== 'function') {
            if (typeof this.availableWidths.length === 'number') {
                this.widthsMap = Imager.createWidthsMap(this.availableWidths, this.widthInterpolator);
            } else {
                this.widthsMap = this.availableWidths;
                this.availableWidths = getKeys(this.availableWidths);
            }

            this.availableWidths = this.availableWidths.sort(function(a, b) {
                return a - b;
            });
        }



        if (elements) {
            this.divs = applyEach(elements, returnDirectValue);
            this.selector = null;
        } else {
            this.divs = applyEach(doc.querySelectorAll(this.selector), returnDirectValue);
        }

        this.changeDivsToEmptyImages();

        nextTick(function() {
            self.init();
        });
    }

    Imager.prototype.scrollCheck = function() {
        if (this.scrolled) {
            if (!this.imagesOffScreen.length) {
                window.clearInterval(this.interval);
            }

            this.divs = this.imagesOffScreen.slice(0); // copy by value, don't copy by reference
            this.imagesOffScreen.length = 0;
            this.changeDivsToEmptyImages();
            this.scrolled = false;
        }
    };

    Imager.prototype.init = function() {
        this.initialized = true;
        this.checkImagesNeedReplacing(this.divs);

        if (this.onResize) {
            this.registerResizeEvent();
        }

        if (this.lazyload) {
            this.registerScrollEvent();
        }
    };

    Imager.prototype.createGif = function(element) {
        // if the element is already a responsive image then we don't replace it again
        if (element.className.match(new RegExp('(^| )' + this.className + '( |$)'))) {
            return element;
        }

        var elementClassName = element.getAttribute('data-class');
        var elementWidth = element.getAttribute('data-width');
        var gif = this.gif.cloneNode(false);

        if (elementWidth) {
            gif.width = elementWidth;
            gif.setAttribute('data-width', elementWidth);
        }

        gif.className = (elementClassName ? elementClassName + ' ' : '') + this.className;
        gif.setAttribute('data-src', element.getAttribute('data-src'));
        gif.setAttribute('alt', element.getAttribute('data-alt') || this.gif.alt);
        gif.setAttribute('itemprop', element.getAttribute('data-itemprop') || "contentUrl");

        // Check if the data-title attribute is there
        var titleText = element.getAttribute('data-title');
        if (titleText) {
            gif.setAttribute('title', titleText);
        }

        element.parentNode.replaceChild(gif, element);

        return gif;
    };

    Imager.prototype.changeDivsToEmptyImages = function() {
        var self = this;

        applyEach(this.divs, function(element, i) {
            if (self.lazyload) {
                if (self.isThisElementOnScreen(element)) {
                    self.divs[i] = self.createGif(element);
                } else {
                    self.imagesOffScreen.push(element);
                }
            } else {
                self.divs[i] = self.createGif(element);
            }
        });

        if (this.initialized) {
            this.checkImagesNeedReplacing(this.divs);
        }
    };

    Imager.prototype.isThisElementOnScreen = function(element) {
        // document.body.scrollTop was working in Chrome but didn't work on Firefox, so had to resort to window.pageYOffset
        // but can't fallback to document.body.scrollTop as that doesn't work in IE with a doctype (?) so have to use document.documentElement.scrollTop
        var offset = Imager.getPageOffset();
        var elementOffsetTop = 0;

        if (element.offsetParent) {
            do {
                elementOffsetTop += element.offsetTop;
            }
            while (element = element.offsetParent);
        }

        return (elementOffsetTop < (this.viewportHeight + offset)) ? true : false;
    };

    Imager.prototype.checkImagesNeedReplacing = function(images) {
        var self = this;

        if (!this.isResizing) {
            this.isResizing = true;
            this.refreshPixelRatio();

            applyEach(images, function(image) {
                self.replaceImagesBasedOnScreenDimensions(image);
            });

            this.isResizing = false;
            this.onImagesReplaced(images);
        }
    };

    Imager.prototype.replaceImagesBasedOnScreenDimensions = function(image) {
        var computedWidth, src, naturalWidth;

        naturalWidth = getNaturalWidth(image);
        computedWidth = typeof this.availableWidths === 'function' ? this.availableWidths(image) : this.determineAppropriateResolution(image);

        image.width = computedWidth;

        if (image.src !== this.gif.src && computedWidth <= naturalWidth) {
            return;
        }

        if (this.isExtensionAllowed(image)) {
            src = this.changeImageSrcToUseNewImageDimensions(this.buildUrlStructure(image.getAttribute('data-src'), image), computedWidth);
        } else {
            src = this.removeModifiersfromImageSrc(image.getAttribute('data-src'));
        }

        image.src = src;
    };

    Imager.prototype.removeModifiersfromImageSrc = function(src) {
        var regExp = new RegExp("\\/{width}\\/{pixel_ratio}", "g");
        return src.replace(regExp, '');
    };

    Imager.prototype.isExtensionAllowed = function(image) {
        var imageExtension = this.getImageExtension(image);
        return imageExtension ? this.allowedExtensions.indexOf(imageExtension.toLowerCase()) > -1 : false;
    };

    Imager.prototype.getImageExtension = function(image) {
        var regExp = new RegExp("\\/.*\\.(.*)\\/{width}\\/{pixel_ratio}?", "gi");
        var match = regExp.exec(image.getAttribute('data-src'));
        return match ? match[1] : "";
    };

    Imager.prototype.determineAppropriateResolution = function(image) {
        return Imager.getClosestValue(image.getAttribute('data-width') || image.parentNode.clientWidth, this.availableWidths);
    };

    /**
     * Updates the device pixel ratio value used by Imager
     *
     * It is performed before each replacement loop, in case a user zoomed in/out
     * and thus updated the `window.devicePixelRatio` value.
     *
     * @api
     * @since 1.0.1
     */
    Imager.prototype.refreshPixelRatio = function refreshPixelRatio() {
        this.devicePixelRatio = Imager.getClosestValue(Imager.getPixelRatio(), this.availablePixelRatios);
    };

    Imager.prototype.changeImageSrcToUseNewImageDimensions = function(src, selectedWidth) {
        return src
            .replace(/{width}/g, Imager.transforms.width(selectedWidth, this.widthsMap))
            .replace(/{pixel_ratio}/g, Imager.transforms.pixelRatio(this.devicePixelRatio));
    };

    Imager.prototype.buildUrlStructure = function(src, image) {
        var squareSelector = this.isImageContainerSquare(image) ? '.' + this.squareSelector : '';

        var regExp = new RegExp("\\.(" + this.allowedExtensions.join("|")  + ")\\/({width})\\/({pixel_ratio})?", "gi");

        return src.replace(regExp, '.' + this.adaptSelector + '.$2.$3' + squareSelector + '.$1');
    };

    Imager.prototype.isImageContainerSquare = function(image) {
        return (image.parentNode.clientWidth / image.parentNode.clientHeight) <= this.deltaSquare
    };

    Imager.getPixelRatio = function getPixelRatio(context) {
        return (context || window)['devicePixelRatio'] || 1;
    };

    Imager.createWidthsMap = function createWidthsMap(widths, interpolator) {
        var map = {},
            i = widths.length;

        while (i--) {
            map[widths[i]] = interpolator(widths[i]);
        }

        return map;
    };

    Imager.transforms = {
        pixelRatio: function(value) {
            return value;
        },
        width: function(width, map) {
            return map[width] || width;
        }
    };

    /**
     * Returns the closest upper value.
     *
     * ```js
     * var candidates = [1, 1.5, 2];
     *
     * Imager.getClosestValue(0.8, candidates); // -> 1
     * Imager.getClosestValue(1, candidates); // -> 1
     * Imager.getClosestValue(1.3, candidates); // -> 1.5
     * Imager.getClosestValue(3, candidates); // -> 2
     * ```
     *
     * @api
     * @since 1.0.1
     * @param {Number} baseValue
     * @param {Array.<Number>} candidates
     * @returns {Number}
     */
    Imager.getClosestValue = function getClosestValue(baseValue, candidates) {
        var i = candidates.length,
            selectedWidth = candidates[i - 1];

        baseValue = parseFloat(baseValue, 10);

        while (i--) {
            if (baseValue <= candidates[i]) {
                selectedWidth = candidates[i];
            }
        }

        return selectedWidth;
    };

    Imager.prototype.registerResizeEvent = function() {
        var self = this;

        addEvent(window, 'resize', function() {
            self.checkImagesNeedReplacing(self.divs);
        });
    };

    Imager.prototype.registerScrollEvent = function() {
        var self = this;

        this.scrolled = false;

        this.interval = window.setInterval(function() {
            self.scrollCheck();
        }, self.scrollDelay);

        addEvent(window, 'scroll', function() {
            self.scrolled = true;
        });
    };

    Imager.getPageOffsetGenerator = function getPageVerticalOffset(testCase) {
        if (testCase) {
            return function() {
                return window.pageYOffset;
            };
        } else {
            return function() {
                return document.documentElement.scrollTop;
            };
        }
    };

    // This form is used because it seems impossible to stub `window.pageYOffset`
    Imager.getPageOffset = Imager.getPageOffsetGenerator(Object.prototype.hasOwnProperty.call(window, 'pageYOffset'));

    // Exporting for testing purpose
    Imager.applyEach = applyEach;

    /* global module, exports: true, define */
    if (typeof module === 'object' && typeof module.exports === 'object') {
        // CommonJS, just export
        module.exports = exports = Imager;
    } else if (typeof define === 'function' && define.amd) {
        // AMD support
        define(function() {
            return Imager;
        });
    } else if (typeof window === 'object') {
        // If no AMD and we are in the browser, attach to window
        window.Imager = Imager;
    }
    /* global -module, -exports, -define */

}(window, document));
},{}],"/home/dirigaray/projects/pestle/node_modules/ismobilejs/isMobile.js":[function(_dereq_,module,exports){
/**
 * isMobile.js v0.3.5
 *
 * A simple library to detect Apple phones and tablets,
 * Android phones and tablets, other mobile devices (like blackberry, mini-opera and windows phone),
 * and any kind of seven inch device, via user agent sniffing.
 *
 * @author: Kai Mallea (kmallea@gmail.com)
 *
 * @license: http://creativecommons.org/publicdomain/zero/1.0/
 */
(function (global) {

    var apple_phone         = /iPhone/i,
        apple_ipod          = /iPod/i,
        apple_tablet        = /iPad/i,
        android_phone       = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i, // Match 'Android' AND 'Mobile'
        android_tablet      = /Android/i,
        windows_phone       = /IEMobile/i,
        windows_tablet      = /(?=.*\bWindows\b)(?=.*\bARM\b)/i, // Match 'Windows' AND 'ARM'
        other_blackberry    = /BlackBerry/i,
        other_blackberry_10 = /BB10/i,
        other_opera         = /Opera Mini/i,
        other_firefox       = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i, // Match 'Firefox' AND 'Mobile'
        seven_inch = new RegExp(
            '(?:' +         // Non-capturing group

            'Nexus 7' +     // Nexus 7

            '|' +           // OR

            'BNTV250' +     // B&N Nook Tablet 7 inch

            '|' +           // OR

            'Kindle Fire' + // Kindle Fire

            '|' +           // OR

            'Silk' +        // Kindle Fire, Silk Accelerated

            '|' +           // OR

            'GT-P1000' +    // Galaxy Tab 7 inch

            ')',            // End non-capturing group

            'i');           // Case-insensitive matching

    var match = function(regex, userAgent) {
        return regex.test(userAgent);
    };

    var IsMobileClass = function(userAgent) {
        var ua = userAgent || navigator.userAgent;

        this.apple = {
            phone:  match(apple_phone, ua),
            ipod:   match(apple_ipod, ua),
            tablet: match(apple_tablet, ua),
            device: match(apple_phone, ua) || match(apple_ipod, ua) || match(apple_tablet, ua)
        };
        this.android = {
            phone:  match(android_phone, ua),
            tablet: !match(android_phone, ua) && match(android_tablet, ua),
            device: match(android_phone, ua) || match(android_tablet, ua)
        };
        this.windows = {
            phone:  match(windows_phone, ua),
            tablet: match(windows_tablet, ua),
            device: match(windows_phone, ua) || match(windows_tablet, ua)
        };
        this.other = {
            blackberry:   match(other_blackberry, ua),
            blackberry10: match(other_blackberry_10, ua),
            opera:        match(other_opera, ua),
            firefox:      match(other_firefox, ua),
            device:       match(other_blackberry, ua) || match(other_blackberry_10, ua) || match(other_opera, ua) || match(other_firefox, ua)
        };
        this.seven_inch = match(seven_inch, ua);
        this.any = this.apple.device || this.android.device || this.windows.device || this.other.device || this.seven_inch;
        // excludes 'other' devices and ipods, targeting touchscreen phones
        this.phone = this.apple.phone || this.android.phone || this.windows.phone;
        // excludes 7 inch devices, classifying as phone or tablet is left to the user
        this.tablet = this.apple.tablet || this.android.tablet || this.windows.tablet;

        if (typeof window === 'undefined') {
            return this;
        }
    };

    var instantiate = function() {
        var IM = new IsMobileClass();
        IM.Class = IsMobileClass;
        return IM;
    };

    if (typeof module != 'undefined' && module.exports && typeof window === 'undefined') {
        //node
        module.exports = IsMobileClass;
    } else if (typeof module != 'undefined' && module.exports && typeof window !== 'undefined') {
        //browserify
        module.exports = instantiate();
    } else if (typeof define === 'function' && define.amd) {
        //AMD
        define(global.isMobile = instantiate());
    } else {
        global.isMobile = instantiate();
    }

})(this);

},{}],"/home/dirigaray/projects/pestle/node_modules/loglevel/lib/loglevel.js":[function(_dereq_,module,exports){
/*
* loglevel - https://github.com/pimterry/loglevel
*
* Copyright (c) 2013 Tim Perry
* Licensed under the MIT license.
*/
(function (root, definition) {
    if (typeof module === 'object' && module.exports && typeof _dereq_ === 'function') {
        module.exports = definition();
    } else if (typeof define === 'function' && typeof define.amd === 'object') {
        define(definition);
    } else {
        root.log = definition();
    }
}(this, function () {
    var self = {};
    var noop = function() {};
    var undefinedType = "undefined";

    function realMethod(methodName) {
        if (typeof console === undefinedType) {
            return false; // We can't build a real method without a console to log to
        } else if (console[methodName] !== undefined) {
            return bindMethod(console, methodName);
        } else if (console.log !== undefined) {
            return bindMethod(console, 'log');
        } else {
            return noop;
        }
    }

    function bindMethod(obj, methodName) {
        var method = obj[methodName];
        if (typeof method.bind === 'function') {
            return method.bind(obj);
        } else {
            try {
                return Function.prototype.bind.call(method, obj);
            } catch (e) {
                // Missing bind shim or IE8 + Modernizr, fallback to wrapping
                return function() {
                    return Function.prototype.apply.apply(method, [obj, arguments]);
                };
            }
        }
    }

    function enableLoggingWhenConsoleArrives(methodName, level) {
        return function () {
            if (typeof console !== undefinedType) {
                replaceLoggingMethods(level);
                self[methodName].apply(self, arguments);
            }
        };
    }

    var logMethods = [
        "trace",
        "debug",
        "info",
        "warn",
        "error"
    ];

    function replaceLoggingMethods(level) {
        for (var i = 0; i < logMethods.length; i++) {
            var methodName = logMethods[i];
            self[methodName] = (i < level) ? noop : self.methodFactory(methodName, level);
        }
    }

    function persistLevelIfPossible(levelNum) {
        var levelName = (logMethods[levelNum] || 'silent').toUpperCase();

        // Use localStorage if available
        try {
            window.localStorage['loglevel'] = levelName;
            return;
        } catch (ignore) {}

        // Use session cookie as fallback
        try {
            window.document.cookie = "loglevel=" + levelName + ";";
        } catch (ignore) {}
    }

    function loadPersistedLevel() {
        var storedLevel;

        try {
            storedLevel = window.localStorage['loglevel'];
        } catch (ignore) {}

        if (typeof storedLevel === undefinedType) {
            try {
                storedLevel = /loglevel=([^;]+)/.exec(window.document.cookie)[1];
            } catch (ignore) {}
        }
        
        if (self.levels[storedLevel] === undefined) {
            storedLevel = "WARN";
        }

        self.setLevel(self.levels[storedLevel]);
    }

    /*
     *
     * Public API
     *
     */

    self.levels = { "TRACE": 0, "DEBUG": 1, "INFO": 2, "WARN": 3,
        "ERROR": 4, "SILENT": 5};

    self.methodFactory = function (methodName, level) {
        return realMethod(methodName) ||
               enableLoggingWhenConsoleArrives(methodName, level);
    };

    self.setLevel = function (level) {
        if (typeof level === "string" && self.levels[level.toUpperCase()] !== undefined) {
            level = self.levels[level.toUpperCase()];
        }
        if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {
            persistLevelIfPossible(level);
            replaceLoggingMethods(level);
            if (typeof console === undefinedType && level < self.levels.SILENT) {
                return "No console available for logging";
            }
        } else {
            throw "log.setLevel() called with invalid level: " + level;
        }
    };

    self.enableAll = function() {
        self.setLevel(self.levels.TRACE);
    };

    self.disableAll = function() {
        self.setLevel(self.levels.SILENT);
    };

    // Grab the current global log variable in case of overwrite
    var _log = (typeof window !== undefinedType) ? window.log : undefined;
    self.noConflict = function() {
        if (typeof window !== undefinedType &&
               window.log === self) {
            window.log = _log;
        }

        return self;
    };

    loadPersistedLevel();
    return self;
}));

},{}],"/home/dirigaray/projects/pestle/node_modules/raven-js/dist/raven.js":[function(_dereq_,module,exports){
/*! Raven.js 1.1.18 (8ad15bc) | github.com/getsentry/raven-js */

/*
 * Includes TraceKit
 * https://github.com/getsentry/TraceKit
 *
 * Copyright 2015 Matt Robenolt and other contributors
 * Released under the BSD license
 * https://github.com/getsentry/raven-js/blob/master/LICENSE
 *
 */
;(function(window, undefined){
'use strict';

/*
 TraceKit - Cross brower stack traces - github.com/occ/TraceKit
 MIT license
*/

var TraceKit = {
    remoteFetching: false,
    collectWindowErrors: true,
    // 3 lines before, the offending line, 3 lines after
    linesOfContext: 7
};

// global reference to slice
var _slice = [].slice;
var UNKNOWN_FUNCTION = '?';


/**
 * TraceKit.wrap: Wrap any function in a TraceKit reporter
 * Example: func = TraceKit.wrap(func);
 *
 * @param {Function} func Function to be wrapped
 * @return {Function} The wrapped func
 */
TraceKit.wrap = function traceKitWrapper(func) {
    function wrapped() {
        try {
            return func.apply(this, arguments);
        } catch (e) {
            TraceKit.report(e);
            throw e;
        }
    }
    return wrapped;
};

/**
 * TraceKit.report: cross-browser processing of unhandled exceptions
 *
 * Syntax:
 *   TraceKit.report.subscribe(function(stackInfo) { ... })
 *   TraceKit.report.unsubscribe(function(stackInfo) { ... })
 *   TraceKit.report(exception)
 *   try { ...code... } catch(ex) { TraceKit.report(ex); }
 *
 * Supports:
 *   - Firefox: full stack trace with line numbers, plus column number
 *              on top frame; column number is not guaranteed
 *   - Opera:   full stack trace with line and column numbers
 *   - Chrome:  full stack trace with line and column numbers
 *   - Safari:  line and column number for the top frame only; some frames
 *              may be missing, and column number is not guaranteed
 *   - IE:      line and column number for the top frame only; some frames
 *              may be missing, and column number is not guaranteed
 *
 * In theory, TraceKit should work on all of the following versions:
 *   - IE5.5+ (only 8.0 tested)
 *   - Firefox 0.9+ (only 3.5+ tested)
 *   - Opera 7+ (only 10.50 tested; versions 9 and earlier may require
 *     Exceptions Have Stacktrace to be enabled in opera:config)
 *   - Safari 3+ (only 4+ tested)
 *   - Chrome 1+ (only 5+ tested)
 *   - Konqueror 3.5+ (untested)
 *
 * Requires TraceKit.computeStackTrace.
 *
 * Tries to catch all unhandled exceptions and report them to the
 * subscribed handlers. Please note that TraceKit.report will rethrow the
 * exception. This is REQUIRED in order to get a useful stack trace in IE.
 * If the exception does not reach the top of the browser, you will only
 * get a stack trace from the point where TraceKit.report was called.
 *
 * Handlers receive a stackInfo object as described in the
 * TraceKit.computeStackTrace docs.
 */
TraceKit.report = (function reportModuleWrapper() {
    var handlers = [],
        lastArgs = null,
        lastException = null,
        lastExceptionStack = null;

    /**
     * Add a crash handler.
     * @param {Function} handler
     */
    function subscribe(handler) {
        installGlobalHandler();
        handlers.push(handler);
    }

    /**
     * Remove a crash handler.
     * @param {Function} handler
     */
    function unsubscribe(handler) {
        for (var i = handlers.length - 1; i >= 0; --i) {
            if (handlers[i] === handler) {
                handlers.splice(i, 1);
            }
        }
    }

    /**
     * Remove all crash handlers.
     */
    function unsubscribeAll() {
        uninstallGlobalHandler();
        handlers = [];
    }

    /**
     * Dispatch stack information to all handlers.
     * @param {Object.<string, *>} stack
     */
    function notifyHandlers(stack, isWindowError) {
        var exception = null;
        if (isWindowError && !TraceKit.collectWindowErrors) {
          return;
        }
        for (var i in handlers) {
            if (hasKey(handlers, i)) {
                try {
                    handlers[i].apply(null, [stack].concat(_slice.call(arguments, 2)));
                } catch (inner) {
                    exception = inner;
                }
            }
        }

        if (exception) {
            throw exception;
        }
    }

    var _oldOnerrorHandler, _onErrorHandlerInstalled;

    /**
     * Ensures all global unhandled exceptions are recorded.
     * Supported by Gecko and IE.
     * @param {string} message Error message.
     * @param {string} url URL of script that generated the exception.
     * @param {(number|string)} lineNo The line number at which the error
     * occurred.
     * @param {?(number|string)} colNo The column number at which the error
     * occurred.
     * @param {?Error} ex The actual Error object.
     */
    function traceKitWindowOnError(message, url, lineNo, colNo, ex) {
        var stack = null;

        if (lastExceptionStack) {
            TraceKit.computeStackTrace.augmentStackTraceWithInitialElement(lastExceptionStack, url, lineNo, message);
            processLastException();
        } else if (ex) {
            // New chrome and blink send along a real error object
            // Let's just report that like a normal error.
            // See: https://mikewest.org/2013/08/debugging-runtime-errors-with-window-onerror
            stack = TraceKit.computeStackTrace(ex);
            notifyHandlers(stack, true);
        } else {
            var location = {
                'url': url,
                'line': lineNo,
                'column': colNo
            };
            location.func = TraceKit.computeStackTrace.guessFunctionName(location.url, location.line);
            location.context = TraceKit.computeStackTrace.gatherContext(location.url, location.line);
            stack = {
                'message': message,
                'url': document.location.href,
                'stack': [location]
            };
            notifyHandlers(stack, true);
        }

        if (_oldOnerrorHandler) {
            return _oldOnerrorHandler.apply(this, arguments);
        }

        return false;
    }

    function installGlobalHandler ()
    {
        if (_onErrorHandlerInstalled) {
            return;
        }
        _oldOnerrorHandler = window.onerror;
        window.onerror = traceKitWindowOnError;
        _onErrorHandlerInstalled = true;
    }

    function uninstallGlobalHandler ()
    {
        if (!_onErrorHandlerInstalled) {
            return;
        }
        window.onerror = _oldOnerrorHandler;
        _onErrorHandlerInstalled = false;
        _oldOnerrorHandler = undefined;
    }

    function processLastException() {
        var _lastExceptionStack = lastExceptionStack,
            _lastArgs = lastArgs;
        lastArgs = null;
        lastExceptionStack = null;
        lastException = null;
        notifyHandlers.apply(null, [_lastExceptionStack, false].concat(_lastArgs));
    }

    /**
     * Reports an unhandled Error to TraceKit.
     * @param {Error} ex
     * @param {?boolean} rethrow If false, do not re-throw the exception.
     * Only used for window.onerror to not cause an infinite loop of
     * rethrowing.
     */
    function report(ex, rethrow) {
        var args = _slice.call(arguments, 1);
        if (lastExceptionStack) {
            if (lastException === ex) {
                return; // already caught by an inner catch block, ignore
            } else {
              processLastException();
            }
        }

        var stack = TraceKit.computeStackTrace(ex);
        lastExceptionStack = stack;
        lastException = ex;
        lastArgs = args;

        // If the stack trace is incomplete, wait for 2 seconds for
        // slow slow IE to see if onerror occurs or not before reporting
        // this exception; otherwise, we will end up with an incomplete
        // stack trace
        window.setTimeout(function () {
            if (lastException === ex) {
                processLastException();
            }
        }, (stack.incomplete ? 2000 : 0));

        if (rethrow !== false) {
            throw ex; // re-throw to propagate to the top level (and cause window.onerror)
        }
    }

    report.subscribe = subscribe;
    report.unsubscribe = unsubscribe;
    report.uninstall = unsubscribeAll;
    return report;
}());

/**
 * TraceKit.computeStackTrace: cross-browser stack traces in JavaScript
 *
 * Syntax:
 *   s = TraceKit.computeStackTrace(exception) // consider using TraceKit.report instead (see below)
 * Returns:
 *   s.name              - exception name
 *   s.message           - exception message
 *   s.stack[i].url      - JavaScript or HTML file URL
 *   s.stack[i].func     - function name, or empty for anonymous functions (if guessing did not work)
 *   s.stack[i].args     - arguments passed to the function, if known
 *   s.stack[i].line     - line number, if known
 *   s.stack[i].column   - column number, if known
 *   s.stack[i].context  - an array of source code lines; the middle element corresponds to the correct line#
 *
 * Supports:
 *   - Firefox:  full stack trace with line numbers and unreliable column
 *               number on top frame
 *   - Opera 10: full stack trace with line and column numbers
 *   - Opera 9-: full stack trace with line numbers
 *   - Chrome:   full stack trace with line and column numbers
 *   - Safari:   line and column number for the topmost stacktrace element
 *               only
 *   - IE:       no line numbers whatsoever
 *
 * Tries to guess names of anonymous functions by looking for assignments
 * in the source code. In IE and Safari, we have to guess source file names
 * by searching for function bodies inside all page scripts. This will not
 * work for scripts that are loaded cross-domain.
 * Here be dragons: some function names may be guessed incorrectly, and
 * duplicate functions may be mismatched.
 *
 * TraceKit.computeStackTrace should only be used for tracing purposes.
 * Logging of unhandled exceptions should be done with TraceKit.report,
 * which builds on top of TraceKit.computeStackTrace and provides better
 * IE support by utilizing the window.onerror event to retrieve information
 * about the top of the stack.
 *
 * Note: In IE and Safari, no stack trace is recorded on the Error object,
 * so computeStackTrace instead walks its *own* chain of callers.
 * This means that:
 *  * in Safari, some methods may be missing from the stack trace;
 *  * in IE, the topmost function in the stack trace will always be the
 *    caller of computeStackTrace.
 *
 * This is okay for tracing (because you are likely to be calling
 * computeStackTrace from the function you want to be the topmost element
 * of the stack trace anyway), but not okay for logging unhandled
 * exceptions (because your catch block will likely be far away from the
 * inner function that actually caused the exception).
 *
 */
TraceKit.computeStackTrace = (function computeStackTraceWrapper() {
    var debug = false,
        sourceCache = {};

    /**
     * Attempts to retrieve source code via XMLHttpRequest, which is used
     * to look up anonymous function names.
     * @param {string} url URL of source code.
     * @return {string} Source contents.
     */
    function loadSource(url) {
        if (!TraceKit.remoteFetching) { //Only attempt request if remoteFetching is on.
            return '';
        }
        try {
            var getXHR = function() {
                try {
                    return new window.XMLHttpRequest();
                } catch (e) {
                    // explicitly bubble up the exception if not found
                    return new window.ActiveXObject('Microsoft.XMLHTTP');
                }
            };

            var request = getXHR();
            request.open('GET', url, false);
            request.send('');
            return request.responseText;
        } catch (e) {
            return '';
        }
    }

    /**
     * Retrieves source code from the source code cache.
     * @param {string} url URL of source code.
     * @return {Array.<string>} Source contents.
     */
    function getSource(url) {
        if (!isString(url)) return [];
        if (!hasKey(sourceCache, url)) {
            // URL needs to be able to fetched within the acceptable domain.  Otherwise,
            // cross-domain errors will be triggered.
            var source = '';
            if (url.indexOf(document.domain) !== -1) {
                source = loadSource(url);
            }
            sourceCache[url] = source ? source.split('\n') : [];
        }

        return sourceCache[url];
    }

    /**
     * Tries to use an externally loaded copy of source code to determine
     * the name of a function by looking at the name of the variable it was
     * assigned to, if any.
     * @param {string} url URL of source code.
     * @param {(string|number)} lineNo Line number in source code.
     * @return {string} The function name, if discoverable.
     */
    function guessFunctionName(url, lineNo) {
        var reFunctionArgNames = /function ([^(]*)\(([^)]*)\)/,
            reGuessFunction = /['"]?([0-9A-Za-z$_]+)['"]?\s*[:=]\s*(function|eval|new Function)/,
            line = '',
            maxLines = 10,
            source = getSource(url),
            m;

        if (!source.length) {
            return UNKNOWN_FUNCTION;
        }

        // Walk backwards from the first line in the function until we find the line which
        // matches the pattern above, which is the function definition
        for (var i = 0; i < maxLines; ++i) {
            line = source[lineNo - i] + line;

            if (!isUndefined(line)) {
                if ((m = reGuessFunction.exec(line))) {
                    return m[1];
                } else if ((m = reFunctionArgNames.exec(line))) {
                    return m[1];
                }
            }
        }

        return UNKNOWN_FUNCTION;
    }

    /**
     * Retrieves the surrounding lines from where an exception occurred.
     * @param {string} url URL of source code.
     * @param {(string|number)} line Line number in source code to centre
     * around for context.
     * @return {?Array.<string>} Lines of source code.
     */
    function gatherContext(url, line) {
        var source = getSource(url);

        if (!source.length) {
            return null;
        }

        var context = [],
            // linesBefore & linesAfter are inclusive with the offending line.
            // if linesOfContext is even, there will be one extra line
            //   *before* the offending line.
            linesBefore = Math.floor(TraceKit.linesOfContext / 2),
            // Add one extra line if linesOfContext is odd
            linesAfter = linesBefore + (TraceKit.linesOfContext % 2),
            start = Math.max(0, line - linesBefore - 1),
            end = Math.min(source.length, line + linesAfter - 1);

        line -= 1; // convert to 0-based index

        for (var i = start; i < end; ++i) {
            if (!isUndefined(source[i])) {
                context.push(source[i]);
            }
        }

        return context.length > 0 ? context : null;
    }

    /**
     * Escapes special characters, except for whitespace, in a string to be
     * used inside a regular expression as a string literal.
     * @param {string} text The string.
     * @return {string} The escaped string literal.
     */
    function escapeRegExp(text) {
        return text.replace(/[\-\[\]{}()*+?.,\\\^$|#]/g, '\\$&');
    }

    /**
     * Escapes special characters in a string to be used inside a regular
     * expression as a string literal. Also ensures that HTML entities will
     * be matched the same as their literal friends.
     * @param {string} body The string.
     * @return {string} The escaped string.
     */
    function escapeCodeAsRegExpForMatchingInsideHTML(body) {
        return escapeRegExp(body).replace('<', '(?:<|&lt;)').replace('>', '(?:>|&gt;)').replace('&', '(?:&|&amp;)').replace('"', '(?:"|&quot;)').replace(/\s+/g, '\\s+');
    }

    /**
     * Determines where a code fragment occurs in the source code.
     * @param {RegExp} re The function definition.
     * @param {Array.<string>} urls A list of URLs to search.
     * @return {?Object.<string, (string|number)>} An object containing
     * the url, line, and column number of the defined function.
     */
    function findSourceInUrls(re, urls) {
        var source, m;
        for (var i = 0, j = urls.length; i < j; ++i) {
            // console.log('searching', urls[i]);
            if ((source = getSource(urls[i])).length) {
                source = source.join('\n');
                if ((m = re.exec(source))) {
                    // console.log('Found function in ' + urls[i]);

                    return {
                        'url': urls[i],
                        'line': source.substring(0, m.index).split('\n').length,
                        'column': m.index - source.lastIndexOf('\n', m.index) - 1
                    };
                }
            }
        }

        // console.log('no match');

        return null;
    }

    /**
     * Determines at which column a code fragment occurs on a line of the
     * source code.
     * @param {string} fragment The code fragment.
     * @param {string} url The URL to search.
     * @param {(string|number)} line The line number to examine.
     * @return {?number} The column number.
     */
    function findSourceInLine(fragment, url, line) {
        var source = getSource(url),
            re = new RegExp('\\b' + escapeRegExp(fragment) + '\\b'),
            m;

        line -= 1;

        if (source && source.length > line && (m = re.exec(source[line]))) {
            return m.index;
        }

        return null;
    }

    /**
     * Determines where a function was defined within the source code.
     * @param {(Function|string)} func A function reference or serialized
     * function definition.
     * @return {?Object.<string, (string|number)>} An object containing
     * the url, line, and column number of the defined function.
     */
    function findSourceByFunctionBody(func) {
        var urls = [window.location.href],
            scripts = document.getElementsByTagName('script'),
            body,
            code = '' + func,
            codeRE = /^function(?:\s+([\w$]+))?\s*\(([\w\s,]*)\)\s*\{\s*(\S[\s\S]*\S)\s*\}\s*$/,
            eventRE = /^function on([\w$]+)\s*\(event\)\s*\{\s*(\S[\s\S]*\S)\s*\}\s*$/,
            re,
            parts,
            result;

        for (var i = 0; i < scripts.length; ++i) {
            var script = scripts[i];
            if (script.src) {
                urls.push(script.src);
            }
        }

        if (!(parts = codeRE.exec(code))) {
            re = new RegExp(escapeRegExp(code).replace(/\s+/g, '\\s+'));
        }

        // not sure if this is really necessary, but I don’t have a test
        // corpus large enough to confirm that and it was in the original.
        else {
            var name = parts[1] ? '\\s+' + parts[1] : '',
                args = parts[2].split(',').join('\\s*,\\s*');

            body = escapeRegExp(parts[3]).replace(/;$/, ';?'); // semicolon is inserted if the function ends with a comment.replace(/\s+/g, '\\s+');
            re = new RegExp('function' + name + '\\s*\\(\\s*' + args + '\\s*\\)\\s*{\\s*' + body + '\\s*}');
        }

        // look for a normal function definition
        if ((result = findSourceInUrls(re, urls))) {
            return result;
        }

        // look for an old-school event handler function
        if ((parts = eventRE.exec(code))) {
            var event = parts[1];
            body = escapeCodeAsRegExpForMatchingInsideHTML(parts[2]);

            // look for a function defined in HTML as an onXXX handler
            re = new RegExp('on' + event + '=[\\\'"]\\s*' + body + '\\s*[\\\'"]', 'i');

            if ((result = findSourceInUrls(re, urls[0]))) {
                return result;
            }

            // look for ???
            re = new RegExp(body);

            if ((result = findSourceInUrls(re, urls))) {
                return result;
            }
        }

        return null;
    }

    // Contents of Exception in various browsers.
    //
    // SAFARI:
    // ex.message = Can't find variable: qq
    // ex.line = 59
    // ex.sourceId = 580238192
    // ex.sourceURL = http://...
    // ex.expressionBeginOffset = 96
    // ex.expressionCaretOffset = 98
    // ex.expressionEndOffset = 98
    // ex.name = ReferenceError
    //
    // FIREFOX:
    // ex.message = qq is not defined
    // ex.fileName = http://...
    // ex.lineNumber = 59
    // ex.columnNumber = 69
    // ex.stack = ...stack trace... (see the example below)
    // ex.name = ReferenceError
    //
    // CHROME:
    // ex.message = qq is not defined
    // ex.name = ReferenceError
    // ex.type = not_defined
    // ex.arguments = ['aa']
    // ex.stack = ...stack trace...
    //
    // INTERNET EXPLORER:
    // ex.message = ...
    // ex.name = ReferenceError
    //
    // OPERA:
    // ex.message = ...message... (see the example below)
    // ex.name = ReferenceError
    // ex.opera#sourceloc = 11  (pretty much useless, duplicates the info in ex.message)
    // ex.stacktrace = n/a; see 'opera:config#UserPrefs|Exceptions Have Stacktrace'

    /**
     * Computes stack trace information from the stack property.
     * Chrome and Gecko use this property.
     * @param {Error} ex
     * @return {?Object.<string, *>} Stack trace information.
     */
    function computeStackTraceFromStackProp(ex) {
        if (!ex.stack) {
            return null;
        }

        var chrome = /^\s*at (.*?) ?\(?((?:file|https?|chrome-extension):.*?):(\d+)(?::(\d+))?\)?\s*$/i,
            gecko = /^\s*(.*?)(?:\((.*?)\))?@((?:file|https?|chrome).*?):(\d+)(?::(\d+))?\s*$/i,
            lines = ex.stack.split('\n'),
            stack = [],
            parts,
            element,
            reference = /^(.*) is undefined$/.exec(ex.message);

        for (var i = 0, j = lines.length; i < j; ++i) {
            if ((parts = gecko.exec(lines[i]))) {
                element = {
                    'url': parts[3],
                    'func': parts[1] || UNKNOWN_FUNCTION,
                    'args': parts[2] ? parts[2].split(',') : '',
                    'line': +parts[4],
                    'column': parts[5] ? +parts[5] : null
                };
            } else if ((parts = chrome.exec(lines[i]))) {
                element = {
                    'url': parts[2],
                    'func': parts[1] || UNKNOWN_FUNCTION,
                    'line': +parts[3],
                    'column': parts[4] ? +parts[4] : null
                };
            } else {
                continue;
            }

            if (!element.func && element.line) {
                element.func = guessFunctionName(element.url, element.line);
            }

            if (element.line) {
                element.context = gatherContext(element.url, element.line);
            }

            stack.push(element);
        }

        if (!stack.length) {
            return null;
        }

        if (stack[0].line && !stack[0].column && reference) {
            stack[0].column = findSourceInLine(reference[1], stack[0].url, stack[0].line);
        } else if (!stack[0].column && !isUndefined(ex.columnNumber)) {
            // FireFox uses this awesome columnNumber property for its top frame
            // Also note, Firefox's column number is 0-based and everything else expects 1-based,
            // so adding 1
            stack[0].column = ex.columnNumber + 1;
        }

        return {
            'name': ex.name,
            'message': ex.message,
            'url': document.location.href,
            'stack': stack
        };
    }

    /**
     * Computes stack trace information from the stacktrace property.
     * Opera 10 uses this property.
     * @param {Error} ex
     * @return {?Object.<string, *>} Stack trace information.
     */
    function computeStackTraceFromStacktraceProp(ex) {
        // Access and store the stacktrace property before doing ANYTHING
        // else to it because Opera is not very good at providing it
        // reliably in other circumstances.
        var stacktrace = ex.stacktrace;

        var testRE = / line (\d+), column (\d+) in (?:<anonymous function: ([^>]+)>|([^\)]+))\((.*)\) in (.*):\s*$/i,
            lines = stacktrace.split('\n'),
            stack = [],
            parts;

        for (var i = 0, j = lines.length; i < j; i += 2) {
            if ((parts = testRE.exec(lines[i]))) {
                var element = {
                    'line': +parts[1],
                    'column': +parts[2],
                    'func': parts[3] || parts[4],
                    'args': parts[5] ? parts[5].split(',') : [],
                    'url': parts[6]
                };

                if (!element.func && element.line) {
                    element.func = guessFunctionName(element.url, element.line);
                }
                if (element.line) {
                    try {
                        element.context = gatherContext(element.url, element.line);
                    } catch (exc) {}
                }

                if (!element.context) {
                    element.context = [lines[i + 1]];
                }

                stack.push(element);
            }
        }

        if (!stack.length) {
            return null;
        }

        return {
            'name': ex.name,
            'message': ex.message,
            'url': document.location.href,
            'stack': stack
        };
    }

    /**
     * NOT TESTED.
     * Computes stack trace information from an error message that includes
     * the stack trace.
     * Opera 9 and earlier use this method if the option to show stack
     * traces is turned on in opera:config.
     * @param {Error} ex
     * @return {?Object.<string, *>} Stack information.
     */
    function computeStackTraceFromOperaMultiLineMessage(ex) {
        // Opera includes a stack trace into the exception message. An example is:
        //
        // Statement on line 3: Undefined variable: undefinedFunc
        // Backtrace:
        //   Line 3 of linked script file://localhost/Users/andreyvit/Projects/TraceKit/javascript-client/sample.js: In function zzz
        //         undefinedFunc(a);
        //   Line 7 of inline#1 script in file://localhost/Users/andreyvit/Projects/TraceKit/javascript-client/sample.html: In function yyy
        //           zzz(x, y, z);
        //   Line 3 of inline#1 script in file://localhost/Users/andreyvit/Projects/TraceKit/javascript-client/sample.html: In function xxx
        //           yyy(a, a, a);
        //   Line 1 of function script
        //     try { xxx('hi'); return false; } catch(ex) { TraceKit.report(ex); }
        //   ...

        var lines = ex.message.split('\n');
        if (lines.length < 4) {
            return null;
        }

        var lineRE1 = /^\s*Line (\d+) of linked script ((?:file|https?)\S+)(?:: in function (\S+))?\s*$/i,
            lineRE2 = /^\s*Line (\d+) of inline#(\d+) script in ((?:file|https?)\S+)(?:: in function (\S+))?\s*$/i,
            lineRE3 = /^\s*Line (\d+) of function script\s*$/i,
            stack = [],
            scripts = document.getElementsByTagName('script'),
            inlineScriptBlocks = [],
            parts,
            i,
            len,
            source;

        for (i in scripts) {
            if (hasKey(scripts, i) && !scripts[i].src) {
                inlineScriptBlocks.push(scripts[i]);
            }
        }

        for (i = 2, len = lines.length; i < len; i += 2) {
            var item = null;
            if ((parts = lineRE1.exec(lines[i]))) {
                item = {
                    'url': parts[2],
                    'func': parts[3],
                    'line': +parts[1]
                };
            } else if ((parts = lineRE2.exec(lines[i]))) {
                item = {
                    'url': parts[3],
                    'func': parts[4]
                };
                var relativeLine = (+parts[1]); // relative to the start of the <SCRIPT> block
                var script = inlineScriptBlocks[parts[2] - 1];
                if (script) {
                    source = getSource(item.url);
                    if (source) {
                        source = source.join('\n');
                        var pos = source.indexOf(script.innerText);
                        if (pos >= 0) {
                            item.line = relativeLine + source.substring(0, pos).split('\n').length;
                        }
                    }
                }
            } else if ((parts = lineRE3.exec(lines[i]))) {
                var url = window.location.href.replace(/#.*$/, ''),
                    line = parts[1];
                var re = new RegExp(escapeCodeAsRegExpForMatchingInsideHTML(lines[i + 1]));
                source = findSourceInUrls(re, [url]);
                item = {
                    'url': url,
                    'line': source ? source.line : line,
                    'func': ''
                };
            }

            if (item) {
                if (!item.func) {
                    item.func = guessFunctionName(item.url, item.line);
                }
                var context = gatherContext(item.url, item.line);
                var midline = (context ? context[Math.floor(context.length / 2)] : null);
                if (context && midline.replace(/^\s*/, '') === lines[i + 1].replace(/^\s*/, '')) {
                    item.context = context;
                } else {
                    // if (context) alert("Context mismatch. Correct midline:\n" + lines[i+1] + "\n\nMidline:\n" + midline + "\n\nContext:\n" + context.join("\n") + "\n\nURL:\n" + item.url);
                    item.context = [lines[i + 1]];
                }
                stack.push(item);
            }
        }
        if (!stack.length) {
            return null; // could not parse multiline exception message as Opera stack trace
        }

        return {
            'name': ex.name,
            'message': lines[0],
            'url': document.location.href,
            'stack': stack
        };
    }

    /**
     * Adds information about the first frame to incomplete stack traces.
     * Safari and IE require this to get complete data on the first frame.
     * @param {Object.<string, *>} stackInfo Stack trace information from
     * one of the compute* methods.
     * @param {string} url The URL of the script that caused an error.
     * @param {(number|string)} lineNo The line number of the script that
     * caused an error.
     * @param {string=} message The error generated by the browser, which
     * hopefully contains the name of the object that caused the error.
     * @return {boolean} Whether or not the stack information was
     * augmented.
     */
    function augmentStackTraceWithInitialElement(stackInfo, url, lineNo, message) {
        var initial = {
            'url': url,
            'line': lineNo
        };

        if (initial.url && initial.line) {
            stackInfo.incomplete = false;

            if (!initial.func) {
                initial.func = guessFunctionName(initial.url, initial.line);
            }

            if (!initial.context) {
                initial.context = gatherContext(initial.url, initial.line);
            }

            var reference = / '([^']+)' /.exec(message);
            if (reference) {
                initial.column = findSourceInLine(reference[1], initial.url, initial.line);
            }

            if (stackInfo.stack.length > 0) {
                if (stackInfo.stack[0].url === initial.url) {
                    if (stackInfo.stack[0].line === initial.line) {
                        return false; // already in stack trace
                    } else if (!stackInfo.stack[0].line && stackInfo.stack[0].func === initial.func) {
                        stackInfo.stack[0].line = initial.line;
                        stackInfo.stack[0].context = initial.context;
                        return false;
                    }
                }
            }

            stackInfo.stack.unshift(initial);
            stackInfo.partial = true;
            return true;
        } else {
            stackInfo.incomplete = true;
        }

        return false;
    }

    /**
     * Computes stack trace information by walking the arguments.caller
     * chain at the time the exception occurred. This will cause earlier
     * frames to be missed but is the only way to get any stack trace in
     * Safari and IE. The top frame is restored by
     * {@link augmentStackTraceWithInitialElement}.
     * @param {Error} ex
     * @return {?Object.<string, *>} Stack trace information.
     */
    function computeStackTraceByWalkingCallerChain(ex, depth) {
        var functionName = /function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i,
            stack = [],
            funcs = {},
            recursion = false,
            parts,
            item,
            source;

        for (var curr = computeStackTraceByWalkingCallerChain.caller; curr && !recursion; curr = curr.caller) {
            if (curr === computeStackTrace || curr === TraceKit.report) {
                // console.log('skipping internal function');
                continue;
            }

            item = {
                'url': null,
                'func': UNKNOWN_FUNCTION,
                'line': null,
                'column': null
            };

            if (curr.name) {
                item.func = curr.name;
            } else if ((parts = functionName.exec(curr.toString()))) {
                item.func = parts[1];
            }

            if ((source = findSourceByFunctionBody(curr))) {
                item.url = source.url;
                item.line = source.line;

                if (item.func === UNKNOWN_FUNCTION) {
                    item.func = guessFunctionName(item.url, item.line);
                }

                var reference = / '([^']+)' /.exec(ex.message || ex.description);
                if (reference) {
                    item.column = findSourceInLine(reference[1], source.url, source.line);
                }
            }

            if (funcs['' + curr]) {
                recursion = true;
            }else{
                funcs['' + curr] = true;
            }

            stack.push(item);
        }

        if (depth) {
            // console.log('depth is ' + depth);
            // console.log('stack is ' + stack.length);
            stack.splice(0, depth);
        }

        var result = {
            'name': ex.name,
            'message': ex.message,
            'url': document.location.href,
            'stack': stack
        };
        augmentStackTraceWithInitialElement(result, ex.sourceURL || ex.fileName, ex.line || ex.lineNumber, ex.message || ex.description);
        return result;
    }

    /**
     * Computes a stack trace for an exception.
     * @param {Error} ex
     * @param {(string|number)=} depth
     */
    function computeStackTrace(ex, depth) {
        var stack = null;
        depth = (depth == null ? 0 : +depth);

        try {
            // This must be tried first because Opera 10 *destroys*
            // its stacktrace property if you try to access the stack
            // property first!!
            stack = computeStackTraceFromStacktraceProp(ex);
            if (stack) {
                return stack;
            }
        } catch (e) {
            if (debug) {
                throw e;
            }
        }

        try {
            stack = computeStackTraceFromStackProp(ex);
            if (stack) {
                return stack;
            }
        } catch (e) {
            if (debug) {
                throw e;
            }
        }

        try {
            stack = computeStackTraceFromOperaMultiLineMessage(ex);
            if (stack) {
                return stack;
            }
        } catch (e) {
            if (debug) {
                throw e;
            }
        }

        try {
            stack = computeStackTraceByWalkingCallerChain(ex, depth + 1);
            if (stack) {
                return stack;
            }
        } catch (e) {
            if (debug) {
                throw e;
            }
        }

        return {};
    }

    computeStackTrace.augmentStackTraceWithInitialElement = augmentStackTraceWithInitialElement;
    computeStackTrace.computeStackTraceFromStackProp = computeStackTraceFromStackProp;
    computeStackTrace.guessFunctionName = guessFunctionName;
    computeStackTrace.gatherContext = gatherContext;

    return computeStackTrace;
}());

'use strict';

// First, check for JSON support
// If there is no JSON, we no-op the core features of Raven
// since JSON is required to encode the payload
var _Raven = window.Raven,
    hasJSON = !!(typeof JSON === 'object' && JSON.stringify),
    lastCapturedException,
    lastEventId,
    globalServer,
    globalUser,
    globalKey,
    globalProject,
    globalOptions = {
        logger: 'javascript',
        ignoreErrors: [],
        ignoreUrls: [],
        whitelistUrls: [],
        includePaths: [],
        collectWindowErrors: true,
        tags: {},
        maxMessageLength: 100,
        extra: {}
    },
    authQueryString,
    isRavenInstalled = false,

    objectPrototype = Object.prototype,
    startTime = now();

/*
 * The core Raven singleton
 *
 * @this {Raven}
 */
var Raven = {
    VERSION: '1.1.18',

    debug: true,

    /*
     * Allow multiple versions of Raven to be installed.
     * Strip Raven from the global context and returns the instance.
     *
     * @return {Raven}
     */
    noConflict: function() {
        window.Raven = _Raven;
        return Raven;
    },

    /*
     * Configure Raven with a DSN and extra options
     *
     * @param {string} dsn The public Sentry DSN
     * @param {object} options Optional set of of global options [optional]
     * @return {Raven}
     */
    config: function(dsn, options) {
        if (globalServer) {
            logDebug('error', 'Error: Raven has already been configured');
            return Raven;
        }
        if (!dsn) return Raven;

        var uri = parseDSN(dsn),
            lastSlash = uri.path.lastIndexOf('/'),
            path = uri.path.substr(1, lastSlash);

        // merge in options
        if (options) {
            each(options, function(key, value){
                globalOptions[key] = value;
            });
        }

        // "Script error." is hard coded into browsers for errors that it can't read.
        // this is the result of a script being pulled in from an external domain and CORS.
        globalOptions.ignoreErrors.push(/^Script error\.?$/);
        globalOptions.ignoreErrors.push(/^Javascript error: Script error\.? on line 0$/);

        // join regexp rules into one big rule
        globalOptions.ignoreErrors = joinRegExp(globalOptions.ignoreErrors);
        globalOptions.ignoreUrls = globalOptions.ignoreUrls.length ? joinRegExp(globalOptions.ignoreUrls) : false;
        globalOptions.whitelistUrls = globalOptions.whitelistUrls.length ? joinRegExp(globalOptions.whitelistUrls) : false;
        globalOptions.includePaths = joinRegExp(globalOptions.includePaths);

        globalKey = uri.user;
        globalProject = uri.path.substr(lastSlash + 1);

        // assemble the endpoint from the uri pieces
        globalServer = '//' + uri.host +
                      (uri.port ? ':' + uri.port : '') +
                      '/' + path + 'api/' + globalProject + '/store/';

        if (uri.protocol) {
            globalServer = uri.protocol + ':' + globalServer;
        }

        if (globalOptions.fetchContext) {
            TraceKit.remoteFetching = true;
        }

        if (globalOptions.linesOfContext) {
            TraceKit.linesOfContext = globalOptions.linesOfContext;
        }

        TraceKit.collectWindowErrors = !!globalOptions.collectWindowErrors;

        setAuthQueryString();

        // return for chaining
        return Raven;
    },

    /*
     * Installs a global window.onerror error handler
     * to capture and report uncaught exceptions.
     * At this point, install() is required to be called due
     * to the way TraceKit is set up.
     *
     * @return {Raven}
     */
    install: function() {
        if (isSetup() && !isRavenInstalled) {
            TraceKit.report.subscribe(handleStackInfo);
            isRavenInstalled = true;
        }

        return Raven;
    },

    /*
     * Wrap code within a context so Raven can capture errors
     * reliably across domains that is executed immediately.
     *
     * @param {object} options A specific set of options for this context [optional]
     * @param {function} func The callback to be immediately executed within the context
     * @param {array} args An array of arguments to be called with the callback [optional]
     */
    context: function(options, func, args) {
        if (isFunction(options)) {
            args = func || [];
            func = options;
            options = undefined;
        }

        return Raven.wrap(options, func).apply(this, args);
    },

    /*
     * Wrap code within a context and returns back a new function to be executed
     *
     * @param {object} options A specific set of options for this context [optional]
     * @param {function} func The function to be wrapped in a new context
     * @return {function} The newly wrapped functions with a context
     */
    wrap: function(options, func) {
        // 1 argument has been passed, and it's not a function
        // so just return it
        if (isUndefined(func) && !isFunction(options)) {
            return options;
        }

        // options is optional
        if (isFunction(options)) {
            func = options;
            options = undefined;
        }

        // At this point, we've passed along 2 arguments, and the second one
        // is not a function either, so we'll just return the second argument.
        if (!isFunction(func)) {
            return func;
        }

        // We don't wanna wrap it twice!
        if (func.__raven__) {
            return func;
        }

        function wrapped() {
            var args = [], i = arguments.length,
                deep = !options || options && options.deep !== false;
            // Recursively wrap all of a function's arguments that are
            // functions themselves.

            while(i--) args[i] = deep ? Raven.wrap(options, arguments[i]) : arguments[i];

            try {
                /*jshint -W040*/
                return func.apply(this, args);
            } catch(e) {
                Raven.captureException(e, options);
                throw e;
            }
        }

        // copy over properties of the old function
        for (var property in func) {
            if (hasKey(func, property)) {
                wrapped[property] = func[property];
            }
        }

        // Signal that this function has been wrapped already
        // for both debugging and to prevent it to being wrapped twice
        wrapped.__raven__ = true;
        wrapped.__inner__ = func;

        return wrapped;
    },

    /*
     * Uninstalls the global error handler.
     *
     * @return {Raven}
     */
    uninstall: function() {
        TraceKit.report.uninstall();
        isRavenInstalled = false;

        return Raven;
    },

    /*
     * Manually capture an exception and send it over to Sentry
     *
     * @param {error} ex An exception to be logged
     * @param {object} options A specific set of options for this error [optional]
     * @return {Raven}
     */
    captureException: function(ex, options) {
        // If not an Error is passed through, recall as a message instead
        if (!isError(ex)) return Raven.captureMessage(ex, options);

        // Store the raw exception object for potential debugging and introspection
        lastCapturedException = ex;

        // TraceKit.report will re-raise any exception passed to it,
        // which means you have to wrap it in try/catch. Instead, we
        // can wrap it here and only re-raise if TraceKit.report
        // raises an exception different from the one we asked to
        // report on.
        try {
            TraceKit.report(ex, options);
        } catch(ex1) {
            if(ex !== ex1) {
                throw ex1;
            }
        }

        return Raven;
    },

    /*
     * Manually send a message to Sentry
     *
     * @param {string} msg A plain message to be captured in Sentry
     * @param {object} options A specific set of options for this message [optional]
     * @return {Raven}
     */
    captureMessage: function(msg, options) {
        // config() automagically converts ignoreErrors from a list to a RegExp so we need to test for an
        // early call; we'll error on the side of logging anything called before configuration since it's
        // probably something you should see:
        if (!!globalOptions.ignoreErrors.test && globalOptions.ignoreErrors.test(msg)) {
            return;
        }

        // Fire away!
        send(
            objectMerge({
                message: msg + ''  // Make sure it's actually a string
            }, options)
        );

        return Raven;
    },

    /*
     * Set/clear a user to be sent along with the payload.
     *
     * @param {object} user An object representing user data [optional]
     * @return {Raven}
     */
    setUserContext: function(user) {
        globalUser = user;

        return Raven;
    },

    /*
     * Set extra attributes to be sent along with the payload.
     *
     * @param {object} extra An object representing extra data [optional]
     * @return {Raven}
     */
    setExtraContext: function(extra) {
        globalOptions.extra = extra || {};

        return Raven;
    },

    /*
     * Set tags to be sent along with the payload.
     *
     * @param {object} tags An object representing tags [optional]
     * @return {Raven}
     */
    setTagsContext: function(tags) {
        globalOptions.tags = tags || {};

        return Raven;
    },

    /*
     * Set release version of application
     *
     * @param {string} release Typically something like a git SHA to identify version
     * @return {Raven}
     */
    setReleaseContext: function(release) {
        globalOptions.release = release;

        return Raven;
    },

    /*
     * Get the latest raw exception that was captured by Raven.
     *
     * @return {error}
     */
    lastException: function() {
        return lastCapturedException;
    },

    /*
     * Get the last event id
     *
     * @return {string}
     */
    lastEventId: function() {
        return lastEventId;
    },

    /*
     * Determine if Raven is setup and ready to go.
     *
     * @return {boolean}
     */
    isSetup: function() {
        return isSetup();
    }
};

Raven.setUser = Raven.setUserContext; // To be deprecated

function triggerEvent(eventType, options) {
    var event, key;

    options = options || {};

    eventType = 'raven' + eventType.substr(0,1).toUpperCase() + eventType.substr(1);

    if (document.createEvent) {
        event = document.createEvent('HTMLEvents');
        event.initEvent(eventType, true, true);
    } else {
        event = document.createEventObject();
        event.eventType = eventType;
    }

    for (key in options) if (hasKey(options, key)) {
        event[key] = options[key];
    }

    if (document.createEvent) {
        // IE9 if standards
        document.dispatchEvent(event);
    } else {
        // IE8 regardless of Quirks or Standards
        // IE9 if quirks
        try {
            document.fireEvent('on' + event.eventType.toLowerCase(), event);
        } catch(e) {}
    }
}

var dsnKeys = 'source protocol user pass host port path'.split(' '),
    dsnPattern = /^(?:(\w+):)?\/\/(\w+)(:\w+)?@([\w\.-]+)(?::(\d+))?(\/.*)/;

function RavenConfigError(message) {
    this.name = 'RavenConfigError';
    this.message = message;
}
RavenConfigError.prototype = new Error();
RavenConfigError.prototype.constructor = RavenConfigError;

/**** Private functions ****/
function parseDSN(str) {
    var m = dsnPattern.exec(str),
        dsn = {},
        i = 7;

    try {
        while (i--) dsn[dsnKeys[i]] = m[i] || '';
    } catch(e) {
        throw new RavenConfigError('Invalid DSN: ' + str);
    }

    if (dsn.pass)
        throw new RavenConfigError('Do not specify your private key in the DSN!');

    return dsn;
}

function isUndefined(what) {
    return typeof what === 'undefined';
}

function isFunction(what) {
    return typeof what === 'function';
}

function isString(what) {
    return typeof what === 'string';
}

function isObject(what) {
    return typeof what === 'object' && what !== null;
}

function isEmptyObject(what) {
    for (var k in what) return false;
    return true;
}

// Sorta yanked from https://github.com/joyent/node/blob/aa3b4b4/lib/util.js#L560
// with some tiny modifications
function isError(what) {
    return isObject(what) &&
        objectPrototype.toString.call(what) === '[object Error]' ||
        what instanceof Error;
}

/**
 * hasKey, a better form of hasOwnProperty
 * Example: hasKey(MainHostObject, property) === true/false
 *
 * @param {Object} host object to check property
 * @param {string} key to check
 */
function hasKey(object, key) {
    return objectPrototype.hasOwnProperty.call(object, key);
}

function each(obj, callback) {
    var i, j;

    if (isUndefined(obj.length)) {
        for (i in obj) {
            if (hasKey(obj, i)) {
                callback.call(null, i, obj[i]);
            }
        }
    } else {
        j = obj.length;
        if (j) {
            for (i = 0; i < j; i++) {
                callback.call(null, i, obj[i]);
            }
        }
    }
}


function setAuthQueryString() {
    authQueryString =
        '?sentry_version=4' +
        '&sentry_client=raven-js/' + Raven.VERSION +
        '&sentry_key=' + globalKey;
}


function handleStackInfo(stackInfo, options) {
    var frames = [];

    if (stackInfo.stack && stackInfo.stack.length) {
        each(stackInfo.stack, function(i, stack) {
            var frame = normalizeFrame(stack);
            if (frame) {
                frames.push(frame);
            }
        });
    }

    triggerEvent('handle', {
        stackInfo: stackInfo,
        options: options
    });

    processException(
        stackInfo.name,
        stackInfo.message,
        stackInfo.url,
        stackInfo.lineno,
        frames,
        options
    );
}

function normalizeFrame(frame) {
    if (!frame.url) return;

    // normalize the frames data
    var normalized = {
        filename:   frame.url,
        lineno:     frame.line,
        colno:      frame.column,
        'function': frame.func || '?'
    }, context = extractContextFromFrame(frame), i;

    if (context) {
        var keys = ['pre_context', 'context_line', 'post_context'];
        i = 3;
        while (i--) normalized[keys[i]] = context[i];
    }

    normalized.in_app = !( // determine if an exception came from outside of our app
        // first we check the global includePaths list.
        !globalOptions.includePaths.test(normalized.filename) ||
        // Now we check for fun, if the function name is Raven or TraceKit
        /(Raven|TraceKit)\./.test(normalized['function']) ||
        // finally, we do a last ditch effort and check for raven.min.js
        /raven\.(min\.)?js$/.test(normalized.filename)
    );

    return normalized;
}

function extractContextFromFrame(frame) {
    // immediately check if we should even attempt to parse a context
    if (!frame.context || !globalOptions.fetchContext) return;

    var context = frame.context,
        pivot = ~~(context.length / 2),
        i = context.length, isMinified = false;

    while (i--) {
        // We're making a guess to see if the source is minified or not.
        // To do that, we make the assumption if *any* of the lines passed
        // in are greater than 300 characters long, we bail.
        // Sentry will see that there isn't a context
        if (context[i].length > 300) {
            isMinified = true;
            break;
        }
    }

    if (isMinified) {
        // The source is minified and we don't know which column. Fuck it.
        if (isUndefined(frame.column)) return;

        // If the source is minified and has a frame column
        // we take a chunk of the offending line to hopefully shed some light
        return [
            [],  // no pre_context
            context[pivot].substr(frame.column, 50), // grab 50 characters, starting at the offending column
            []   // no post_context
        ];
    }

    return [
        context.slice(0, pivot),    // pre_context
        context[pivot],             // context_line
        context.slice(pivot + 1)    // post_context
    ];
}

function processException(type, message, fileurl, lineno, frames, options) {
    var stacktrace, label, i;

    // In some instances message is not actually a string, no idea why,
    // so we want to always coerce it to one.
    message += '';

    // Sometimes an exception is getting logged in Sentry as
    // <no message value>
    // This can only mean that the message was falsey since this value
    // is hardcoded into Sentry itself.
    // At this point, if the message is falsey, we bail since it's useless
    if (type === 'Error' && !message) return;

    if (globalOptions.ignoreErrors.test(message)) return;

    if (frames && frames.length) {
        fileurl = frames[0].filename || fileurl;
        // Sentry expects frames oldest to newest
        // and JS sends them as newest to oldest
        frames.reverse();
        stacktrace = {frames: frames};
    } else if (fileurl) {
        stacktrace = {
            frames: [{
                filename: fileurl,
                lineno: lineno,
                in_app: true
            }]
        };
    }

    // Truncate the message to a max of characters
    message = truncate(message, globalOptions.maxMessageLength);

    if (globalOptions.ignoreUrls && globalOptions.ignoreUrls.test(fileurl)) return;
    if (globalOptions.whitelistUrls && !globalOptions.whitelistUrls.test(fileurl)) return;

    label = lineno ? message + ' at ' + lineno : message;

    // Fire away!
    send(
        objectMerge({
            // sentry.interfaces.Exception
            exception: {
                type: type,
                value: message
            },
            // sentry.interfaces.Stacktrace
            stacktrace: stacktrace,
            culprit: fileurl,
            message: label
        }, options)
    );
}

function objectMerge(obj1, obj2) {
    if (!obj2) {
        return obj1;
    }
    each(obj2, function(key, value){
        obj1[key] = value;
    });
    return obj1;
}

function truncate(str, max) {
    return str.length <= max ? str : str.substr(0, max) + '\u2026';
}

function now() {
    return +new Date();
}

function getHttpData() {
    var http = {
        url: document.location.href,
        headers: {
            'User-Agent': navigator.userAgent
        }
    };

    if (document.referrer) {
        http.headers.Referer = document.referrer;
    }

    return http;
}

function send(data) {
    if (!isSetup()) return;

    data = objectMerge({
        project: globalProject,
        logger: globalOptions.logger,
        platform: 'javascript',
        // sentry.interfaces.Http
        request: getHttpData()
    }, data);

    // Merge in the tags and extra separately since objectMerge doesn't handle a deep merge
    data.tags = objectMerge(objectMerge({}, globalOptions.tags), data.tags);
    data.extra = objectMerge(objectMerge({}, globalOptions.extra), data.extra);

    // Send along our own collected metadata with extra
    data.extra = objectMerge({
        'session:duration': now() - startTime
    }, data.extra);

    // If there are no tags/extra, strip the key from the payload alltogther.
    if (isEmptyObject(data.tags)) delete data.tags;

    if (globalUser) {
        // sentry.interfaces.User
        data.user = globalUser;
    }

    // Include the release iff it's defined in globalOptions
    if (globalOptions.release) data.release = globalOptions.release;

    if (isFunction(globalOptions.dataCallback)) {
        data = globalOptions.dataCallback(data);
    }

    // Check if the request should be filtered or not
    if (isFunction(globalOptions.shouldSendCallback) && !globalOptions.shouldSendCallback(data)) {
        return;
    }

    // Send along an event_id if not explicitly passed.
    // This event_id can be used to reference the error within Sentry itself.
    // Set lastEventId after we know the error should actually be sent
    lastEventId = data.event_id || (data.event_id = uuid4());

    makeRequest(data);
}


function makeRequest(data) {
    var img = new Image(),
        src = globalServer + authQueryString + '&sentry_data=' + encodeURIComponent(JSON.stringify(data));

    img.crossOrigin = 'anonymous';
    img.onload = function success() {
        triggerEvent('success', {
            data: data,
            src: src
        });
    };
    img.onerror = img.onabort = function failure() {
        triggerEvent('failure', {
            data: data,
            src: src
        });
    };
    img.src = src;
}

function isSetup() {
    if (!hasJSON) return false;  // needs JSON support
    if (!globalServer) {
        logDebug('error', 'Error: Raven has not been configured.');
        return false;
    }
    return true;
}

function joinRegExp(patterns) {
    // Combine an array of regular expressions and strings into one large regexp
    // Be mad.
    var sources = [],
        i = 0, len = patterns.length,
        pattern;

    for (; i < len; i++) {
        pattern = patterns[i];
        if (isString(pattern)) {
            // If it's a string, we need to escape it
            // Taken from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
            sources.push(pattern.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"));
        } else if (pattern && pattern.source) {
            // If it's a regexp already, we want to extract the source
            sources.push(pattern.source);
        }
        // Intentionally skip other cases
    }
    return new RegExp(sources.join('|'), 'i');
}

// http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#2117523
function uuid4() {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0,
            v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

function logDebug(level, message) {
    if (window.console && console[level] && Raven.debug) {
        console[level](message);
    }
}

function afterLoad() {
    // Attempt to initialize Raven on load
    var RavenConfig = window.RavenConfig;
    if (RavenConfig) {
        Raven.config(RavenConfig.dsn, RavenConfig.config).install();
    }
}
afterLoad();

// Expose Raven to the world
if (typeof define === 'function' && define.amd) {
    // AMD
    window.Raven = Raven;
    define('raven', [], function() {
      return Raven;
    });
} else if (typeof module === 'object') {
    // browserify
    module.exports = Raven;
} else if (typeof exports === 'object') {
    // CommonJS
    exports = Raven;
} else {
    // Everything else
    window.Raven = Raven;
}

})(window);

},{}],"/home/dirigaray/projects/pestle/node_modules/verge/verge.js":[function(_dereq_,module,exports){
/*!
 * verge 1.9.1+201402130803
 * https://github.com/ryanve/verge
 * MIT License 2013 Ryan Van Etten
 */

(function(root, name, make) {
  if (typeof module != 'undefined' && module['exports']) module['exports'] = make();
  else root[name] = make();
}(this, 'verge', function() {

  var xports = {}
    , win = typeof window != 'undefined' && window
    , doc = typeof document != 'undefined' && document
    , docElem = doc && doc.documentElement
    , matchMedia = win['matchMedia'] || win['msMatchMedia']
    , mq = matchMedia ? function(q) {
        return !!matchMedia.call(win, q).matches;
      } : function() {
        return false;
      }
    , viewportW = xports['viewportW'] = function() {
        var a = docElem['clientWidth'], b = win['innerWidth'];
        return a < b ? b : a;
      }
    , viewportH = xports['viewportH'] = function() {
        var a = docElem['clientHeight'], b = win['innerHeight'];
        return a < b ? b : a;
      };
  
  /** 
   * Test if a media query is active. Like Modernizr.mq
   * @since 1.6.0
   * @return {boolean}
   */  
  xports['mq'] = mq;

  /** 
   * Normalized matchMedia
   * @since 1.6.0
   * @return {MediaQueryList|Object}
   */ 
  xports['matchMedia'] = matchMedia ? function() {
    // matchMedia must be binded to window
    return matchMedia.apply(win, arguments);
  } : function() {
    // Gracefully degrade to plain object
    return {};
  };

  /**
   * @since 1.8.0
   * @return {{width:number, height:number}}
   */
  function viewport() {
    return {'width':viewportW(), 'height':viewportH()};
  }
  xports['viewport'] = viewport;
  
  /** 
   * Cross-browser window.scrollX
   * @since 1.0.0
   * @return {number}
   */
  xports['scrollX'] = function() {
    return win.pageXOffset || docElem.scrollLeft; 
  };

  /** 
   * Cross-browser window.scrollY
   * @since 1.0.0
   * @return {number}
   */
  xports['scrollY'] = function() {
    return win.pageYOffset || docElem.scrollTop; 
  };

  /**
   * @param {{top:number, right:number, bottom:number, left:number}} coords
   * @param {number=} cushion adjustment
   * @return {Object}
   */
  function calibrate(coords, cushion) {
    var o = {};
    cushion = +cushion || 0;
    o['width'] = (o['right'] = coords['right'] + cushion) - (o['left'] = coords['left'] - cushion);
    o['height'] = (o['bottom'] = coords['bottom'] + cushion) - (o['top'] = coords['top'] - cushion);
    return o;
  }

  /**
   * Cross-browser element.getBoundingClientRect plus optional cushion.
   * Coords are relative to the top-left corner of the viewport.
   * @since 1.0.0
   * @param {Element|Object} el element or stack (uses first item)
   * @param {number=} cushion +/- pixel adjustment amount
   * @return {Object|boolean}
   */
  function rectangle(el, cushion) {
    el = el && !el.nodeType ? el[0] : el;
    if (!el || 1 !== el.nodeType) return false;
    return calibrate(el.getBoundingClientRect(), cushion);
  }
  xports['rectangle'] = rectangle;

  /**
   * Get the viewport aspect ratio (or the aspect ratio of an object or element)
   * @since 1.7.0
   * @param {(Element|Object)=} o optional object with width/height props or methods
   * @return {number}
   * @link http://w3.org/TR/css3-mediaqueries/#orientation
   */
  function aspect(o) {
    o = null == o ? viewport() : 1 === o.nodeType ? rectangle(o) : o;
    var h = o['height'], w = o['width'];
    h = typeof h == 'function' ? h.call(o) : h;
    w = typeof w == 'function' ? w.call(o) : w;
    return w/h;
  }
  xports['aspect'] = aspect;

  /**
   * Test if an element is in the same x-axis section as the viewport.
   * @since 1.0.0
   * @param {Element|Object} el
   * @param {number=} cushion
   * @return {boolean}
   */
  xports['inX'] = function(el, cushion) {
    var r = rectangle(el, cushion);
    return !!r && r.right >= 0 && r.left <= viewportW();
  };

  /**
   * Test if an element is in the same y-axis section as the viewport.
   * @since 1.0.0
   * @param {Element|Object} el
   * @param {number=} cushion
   * @return {boolean}
   */
  xports['inY'] = function(el, cushion) {
    var r = rectangle(el, cushion);
    return !!r && r.bottom >= 0 && r.top <= viewportH();
  };

  /**
   * Test if an element is in the viewport.
   * @since 1.0.0
   * @param {Element|Object} el
   * @param {number=} cushion
   * @return {boolean}
   */
  xports['inViewport'] = function(el, cushion) {
    // Equiv to `inX(el, cushion) && inY(el, cushion)` but just manually do both 
    // to avoid calling rectangle() twice. It gzips just as small like this.
    var r = rectangle(el, cushion);
    return !!r && r.bottom >= 0 && r.right >= 0 && r.top <= viewportH() && r.left <= viewportW();
  };

  return xports;
}));
},{}],"/home/dirigaray/projects/pestle/node_modules/wolfy87-eventemitter/EventEmitter.js":[function(_dereq_,module,exports){
/*!
 * EventEmitter v4.2.11 - git.io/ee
 * Unlicense - http://unlicense.org/
 * Oliver Caldwell - http://oli.me.uk/
 * @preserve
 */

;(function () {
    'use strict';

    /**
     * Class for managing events.
     * Can be extended to provide event functionality in other classes.
     *
     * @class EventEmitter Manages event registering and emitting.
     */
    function EventEmitter() {}

    // Shortcuts to improve speed and size
    var proto = EventEmitter.prototype;
    var exports = this;
    var originalGlobalValue = exports.EventEmitter;

    /**
     * Finds the index of the listener for the event in its storage array.
     *
     * @param {Function[]} listeners Array of listeners to search through.
     * @param {Function} listener Method to look for.
     * @return {Number} Index of the specified listener, -1 if not found
     * @api private
     */
    function indexOfListener(listeners, listener) {
        var i = listeners.length;
        while (i--) {
            if (listeners[i].listener === listener) {
                return i;
            }
        }

        return -1;
    }

    /**
     * Alias a method while keeping the context correct, to allow for overwriting of target method.
     *
     * @param {String} name The name of the target method.
     * @return {Function} The aliased method
     * @api private
     */
    function alias(name) {
        return function aliasClosure() {
            return this[name].apply(this, arguments);
        };
    }

    /**
     * Returns the listener array for the specified event.
     * Will initialise the event object and listener arrays if required.
     * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
     * Each property in the object response is an array of listener functions.
     *
     * @param {String|RegExp} evt Name of the event to return the listeners from.
     * @return {Function[]|Object} All listener functions for the event.
     */
    proto.getListeners = function getListeners(evt) {
        var events = this._getEvents();
        var response;
        var key;

        // Return a concatenated array of all matching events if
        // the selector is a regular expression.
        if (evt instanceof RegExp) {
            response = {};
            for (key in events) {
                if (events.hasOwnProperty(key) && evt.test(key)) {
                    response[key] = events[key];
                }
            }
        }
        else {
            response = events[evt] || (events[evt] = []);
        }

        return response;
    };

    /**
     * Takes a list of listener objects and flattens it into a list of listener functions.
     *
     * @param {Object[]} listeners Raw listener objects.
     * @return {Function[]} Just the listener functions.
     */
    proto.flattenListeners = function flattenListeners(listeners) {
        var flatListeners = [];
        var i;

        for (i = 0; i < listeners.length; i += 1) {
            flatListeners.push(listeners[i].listener);
        }

        return flatListeners;
    };

    /**
     * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
     *
     * @param {String|RegExp} evt Name of the event to return the listeners from.
     * @return {Object} All listener functions for an event in an object.
     */
    proto.getListenersAsObject = function getListenersAsObject(evt) {
        var listeners = this.getListeners(evt);
        var response;

        if (listeners instanceof Array) {
            response = {};
            response[evt] = listeners;
        }

        return response || listeners;
    };

    /**
     * Adds a listener function to the specified event.
     * The listener will not be added if it is a duplicate.
     * If the listener returns true then it will be removed after it is called.
     * If you pass a regular expression as the event name then the listener will be added to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addListener = function addListener(evt, listener) {
        var listeners = this.getListenersAsObject(evt);
        var listenerIsWrapped = typeof listener === 'object';
        var key;

        for (key in listeners) {
            if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
                listeners[key].push(listenerIsWrapped ? listener : {
                    listener: listener,
                    once: false
                });
            }
        }

        return this;
    };

    /**
     * Alias of addListener
     */
    proto.on = alias('addListener');

    /**
     * Semi-alias of addListener. It will add a listener that will be
     * automatically removed after its first execution.
     *
     * @param {String|RegExp} evt Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addOnceListener = function addOnceListener(evt, listener) {
        return this.addListener(evt, {
            listener: listener,
            once: true
        });
    };

    /**
     * Alias of addOnceListener.
     */
    proto.once = alias('addOnceListener');

    /**
     * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
     * You need to tell it what event names should be matched by a regex.
     *
     * @param {String} evt Name of the event to create.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.defineEvent = function defineEvent(evt) {
        this.getListeners(evt);
        return this;
    };

    /**
     * Uses defineEvent to define multiple events.
     *
     * @param {String[]} evts An array of event names to define.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.defineEvents = function defineEvents(evts) {
        for (var i = 0; i < evts.length; i += 1) {
            this.defineEvent(evts[i]);
        }
        return this;
    };

    /**
     * Removes a listener function from the specified event.
     * When passed a regular expression as the event name, it will remove the listener from all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to remove the listener from.
     * @param {Function} listener Method to remove from the event.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeListener = function removeListener(evt, listener) {
        var listeners = this.getListenersAsObject(evt);
        var index;
        var key;

        for (key in listeners) {
            if (listeners.hasOwnProperty(key)) {
                index = indexOfListener(listeners[key], listener);

                if (index !== -1) {
                    listeners[key].splice(index, 1);
                }
            }
        }

        return this;
    };

    /**
     * Alias of removeListener
     */
    proto.off = alias('removeListener');

    /**
     * Adds listeners in bulk using the manipulateListeners method.
     * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
     * You can also pass it a regular expression to add the array of listeners to all events that match it.
     * Yeah, this function does quite a bit. That's probably a bad thing.
     *
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addListeners = function addListeners(evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(false, evt, listeners);
    };

    /**
     * Removes listeners in bulk using the manipulateListeners method.
     * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be removed.
     * You can also pass it a regular expression to remove the listeners from all events that match it.
     *
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to remove.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeListeners = function removeListeners(evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(true, evt, listeners);
    };

    /**
     * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
     * The first argument will determine if the listeners are removed (true) or added (false).
     * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be added/removed.
     * You can also pass it a regular expression to manipulate the listeners of all events that match it.
     *
     * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
        var i;
        var value;
        var single = remove ? this.removeListener : this.addListener;
        var multiple = remove ? this.removeListeners : this.addListeners;

        // If evt is an object then pass each of its properties to this method
        if (typeof evt === 'object' && !(evt instanceof RegExp)) {
            for (i in evt) {
                if (evt.hasOwnProperty(i) && (value = evt[i])) {
                    // Pass the single listener straight through to the singular method
                    if (typeof value === 'function') {
                        single.call(this, i, value);
                    }
                    else {
                        // Otherwise pass back to the multiple function
                        multiple.call(this, i, value);
                    }
                }
            }
        }
        else {
            // So evt must be a string
            // And listeners must be an array of listeners
            // Loop over it and pass each one to the multiple method
            i = listeners.length;
            while (i--) {
                single.call(this, evt, listeners[i]);
            }
        }

        return this;
    };

    /**
     * Removes all listeners from a specified event.
     * If you do not specify an event then all listeners will be removed.
     * That means every event will be emptied.
     * You can also pass a regex to remove all events that match it.
     *
     * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeEvent = function removeEvent(evt) {
        var type = typeof evt;
        var events = this._getEvents();
        var key;

        // Remove different things depending on the state of evt
        if (type === 'string') {
            // Remove all listeners for the specified event
            delete events[evt];
        }
        else if (evt instanceof RegExp) {
            // Remove all events matching the regex.
            for (key in events) {
                if (events.hasOwnProperty(key) && evt.test(key)) {
                    delete events[key];
                }
            }
        }
        else {
            // Remove all listeners in all events
            delete this._events;
        }

        return this;
    };

    /**
     * Alias of removeEvent.
     *
     * Added to mirror the node API.
     */
    proto.removeAllListeners = alias('removeEvent');

    /**
     * Emits an event of your choice.
     * When emitted, every listener attached to that event will be executed.
     * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
     * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
     * So they will not arrive within the array on the other side, they will be separate.
     * You can also pass a regular expression to emit to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
     * @param {Array} [args] Optional array of arguments to be passed to each listener.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.emitEvent = function emitEvent(evt, args) {
        var listeners = this.getListenersAsObject(evt);
        var listener;
        var i;
        var key;
        var response;

        for (key in listeners) {
            if (listeners.hasOwnProperty(key)) {
                i = listeners[key].length;

                while (i--) {
                    // If the listener returns true then it shall be removed from the event
                    // The function is executed either with a basic call or an apply if there is an args array
                    listener = listeners[key][i];

                    if (listener.once === true) {
                        this.removeListener(evt, listener.listener);
                    }

                    response = listener.listener.apply(this, args || []);

                    if (response === this._getOnceReturnValue()) {
                        this.removeListener(evt, listener.listener);
                    }
                }
            }
        }

        return this;
    };

    /**
     * Alias of emitEvent
     */
    proto.trigger = alias('emitEvent');

    /**
     * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
     * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
     * @param {...*} Optional additional arguments to be passed to each listener.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.emit = function emit(evt) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(evt, args);
    };

    /**
     * Sets the current value to check against when executing listeners. If a
     * listeners return value matches the one set here then it will be removed
     * after execution. This value defaults to true.
     *
     * @param {*} value The new value to check for when executing listeners.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.setOnceReturnValue = function setOnceReturnValue(value) {
        this._onceReturnValue = value;
        return this;
    };

    /**
     * Fetches the current value to check against when executing listeners. If
     * the listeners return value matches this one then it should be removed
     * automatically. It will return true by default.
     *
     * @return {*|Boolean} The current value to check for or the default, true.
     * @api private
     */
    proto._getOnceReturnValue = function _getOnceReturnValue() {
        if (this.hasOwnProperty('_onceReturnValue')) {
            return this._onceReturnValue;
        }
        else {
            return true;
        }
    };

    /**
     * Fetches the events object and creates one if required.
     *
     * @return {Object} The events storage object.
     * @api private
     */
    proto._getEvents = function _getEvents() {
        return this._events || (this._events = {});
    };

    /**
     * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.
     *
     * @return {Function} Non conflicting EventEmitter class.
     */
    EventEmitter.noConflict = function noConflict() {
        exports.EventEmitter = originalGlobalValue;
        return EventEmitter;
    };

    // Expose the class either via AMD, CommonJS or the global object
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return EventEmitter;
        });
    }
    else if (typeof module === 'object' && module.exports){
        module.exports = EventEmitter;
    }
    else {
        exports.EventEmitter = EventEmitter;
    }
}.call(this));

},{}],"/home/dirigaray/projects/pestle/src/base.coffee":[function(_dereq_,module,exports){

/**
 * The purpose of this layer is to declare and abstract the access to
 * the core base of libraries that the rest of the stack (the app framework)
 * will depend.
 * @author Francisco Ramini <framini at gmail.com>
 */
(function(root, factory) {
  return module.exports = factory(root, {});
})(window, function(root, Base) {
  var Utils, VersionChecker, dependencies;
  dependencies = [
    {
      "name": "jQuery",
      "required": "1.10",
      "obj": root.$,
      "version": root.$ ? root.$.fn.jquery : 0
    }, {
      "name": "Underscore",
      "required": "1.7.0",
      "obj": root._,
      "version": root._ ? root._.VERSION : 0
    }
  ];
  VersionChecker = _dereq_('./util/versionchecker.coffee');
  VersionChecker.check(dependencies);
  Base.log = _dereq_('./util/logger.coffee');
  Base.device = _dereq_('./util/devicedetection.coffee');
  Base.cookies = _dereq_('./util/cookies.coffee');
  Base.vp = _dereq_('./util/viewportdetection.coffee');
  Base.Imager = _dereq_('imager.js');
  Base.Events = _dereq_('./util/eventbus.coffee');
  Utils = _dereq_('./util/general.coffee');
  Base.util = root._.extend(Utils, root._);
  return Base;
});



},{"./util/cookies.coffee":"/home/dirigaray/projects/pestle/src/util/cookies.coffee","./util/devicedetection.coffee":"/home/dirigaray/projects/pestle/src/util/devicedetection.coffee","./util/eventbus.coffee":"/home/dirigaray/projects/pestle/src/util/eventbus.coffee","./util/general.coffee":"/home/dirigaray/projects/pestle/src/util/general.coffee","./util/logger.coffee":"/home/dirigaray/projects/pestle/src/util/logger.coffee","./util/versionchecker.coffee":"/home/dirigaray/projects/pestle/src/util/versionchecker.coffee","./util/viewportdetection.coffee":"/home/dirigaray/projects/pestle/src/util/viewportdetection.coffee","imager.js":"/home/dirigaray/projects/pestle/node_modules/imager.js/Imager.js"}],"/home/dirigaray/projects/pestle/src/extension/components.coffee":[function(_dereq_,module,exports){
(function(root, factory) {
  return module.exports = factory(root, {});
})(window, function(root, Ext) {
  var Base, Component, Module;
  Base = _dereq_('./../base.coffee');
  Module = _dereq_('./../util/module.coffee');
  Component = (function() {
    function Component() {}

    Component.initializedComponents = {};


    /**
     * startAll method
     * This method will look for components to start within the passed selector
     * and call their .initialize() method
     * @author Francisco Ramini <francisco.ramini at globant.com>
     * @param  {[type]} selector = 'body'. CSS selector to tell the app where to look for components
     * @return {[type]}
     */

    Component.startAll = function(selector, app, namespace) {
      var cmpclone, components;
      if (selector == null) {
        selector = 'body';
      }
      if (namespace == null) {
        namespace = Pestle.modules;
      }
      components = Component.parse(selector, app.config.namespace);
      cmpclone = Base.util.clone(components);
      Base.log.info("Parsed components");
      Base.log.debug(cmpclone);
      if (!Base.util.isEmpty(components)) {
        Base.util.each(namespace, function(definition, name) {
          if (!Base.util.isFunction(definition)) {
            return Module.extend(name, definition);
          }
        });
      }
      Base.util.extend(namespace, Pestle.Module.list);
      Component.instantiate(components, app);
      return {
        all: Component.initializedComponents,
        "new": cmpclone
      };
    };


    /**
     * the parse method will look for components defined using
     * the configured namespace and living within the passed
     * CSS selector
     * @author Francisco Ramini <framini at gmail.com>
     * @param  {[type]} selector  [description]
     * @param  {[type]} namespace [description]
     * @return {[type]}           [description]
     */

    Component.parse = function(selector, namespace) {
      var cssSelectors, list, namespaces;
      list = [];
      if (Base.util.isArray(namespace)) {
        namespaces = namespace;
      } else if (Base.util.isString(namespace)) {
        namespaces = namespace.split(',');
      }
      cssSelectors = [];
      Base.util.each(namespaces, function(ns, i) {
        return cssSelectors.push("[data-" + ns + "-component]");
      });
      $(selector).find(cssSelectors.join(',')).each(function(i, comp) {
        var ns, options;
        if (!$(comp).data('pestle-guid')) {
          ns = (function() {
            namespace = "";
            Base.util.each(namespaces, function(ns, i) {
              if ($(comp).data(ns + "-component")) {
                return namespace = ns;
              }
            });
            return namespace;
          })();
          options = Component.parseComponentOptions(this, ns);
          return list.push({
            name: options.name,
            options: options
          });
        }
      });
      return list;
    };

    Component.parseComponentOptions = function(el, namespace, opts) {
      var data, length, name, options;
      options = Base.util.clone(opts || {});
      options.el = el;
      data = $(el).data();
      name = '';
      length = 0;
      Base.util.each(data, function(v, k) {
        k = k.replace(new RegExp("^" + namespace), "");
        k = k.charAt(0).toLowerCase() + k.slice(1);
        if (k !== "component") {
          options[k] = v;
          return length++;
        } else {
          return name = v;
        }
      });
      options.length = length + 1;
      return Component.buildOptionsObject(name, options);
    };

    Component.buildOptionsObject = function(name, options) {
      options.name = name;
      return options;
    };

    Component.instantiate = function(components, app) {
      var m, mod, modx, sb;
      if (components.length > 0) {
        m = components.shift();
        if (!Base.util.isEmpty(Pestle.modules) && Pestle.modules[m.name] && m.options) {
          mod = Pestle.modules[m.name];
          sb = app.createSandbox(m.name);
          m.options.guid = Base.util.uniqueId(m.name + "_");
          m.options.__defaults__ = app.config.component[m.name];
          modx = new mod({
            sandbox: sb,
            options: m.options
          });
          modx.initialize();
          $(m.options.el).data('pestle-guid', m.options.guid);
          Component.initializedComponents[m.options.guid] = modx;
        }
        return Component.instantiate(components, app);
      }
    };

    return Component;

  })();
  return {
    initialize: function(app) {
      var initializedComponents;
      Base.log.info("[ext] Component extension initialized");
      initializedComponents = {};
      app.sandbox.startComponents = function(selector, app) {
        return initializedComponents = Component.startAll(selector, app);
      };
      app.sandbox.getInitializedComponents = function() {
        return initializedComponents.all;
      };
      return app.sandbox.getLastestInitializedComponents = function() {
        return initializedComponents["new"];
      };
    },
    afterAppStarted: function(selector, app) {
      var s;
      Base.log.info("Calling startComponents from afterAppStarted");
      s = selector ? selector : null;
      return app.sandbox.startComponents(s, app);
    },
    name: 'Component Extension',
    classes: Component,
    optionKey: 'components'
  };
});



},{"./../base.coffee":"/home/dirigaray/projects/pestle/src/base.coffee","./../util/module.coffee":"/home/dirigaray/projects/pestle/src/util/module.coffee"}],"/home/dirigaray/projects/pestle/src/extension/responsivedesign.coffee":[function(_dereq_,module,exports){

/**
 * This extension will be triggering events once the Device in which the
 * user is navigating the site is detected. Its fucionality mostly depends
 * on the configurations settings (provided by default, but they can be overriden)
 */
(function(root, factory) {
  return module.exports = factory(root, {});
})(window, function(root, Ext) {
  var Base, ResponsiveDesign;
  Base = _dereq_('./../base.coffee');
  ResponsiveDesign = (function() {
    ResponsiveDesign.prototype.cfg = {
      waitLimit: 300,
      windowResizeEvent: true,
      breakpoints: [
        {
          name: "mobile",
          bpmin: 0,
          bpmax: 767
        }, {
          name: "tablet",
          bpmin: 768,
          bpmax: 959
        }, {
          name: "desktop",
          bpmin: 960
        }
      ]
    };

    function ResponsiveDesign(config) {
      if (config == null) {
        config = {};
      }
      Base.util.bindAll(this, "_init", "detectDevice", "_checkViewport", "_attachWindowHandlers", "getDevice", "_resizeHandler");
      this.config = Base.util.extend({}, this.cfg, config);
      this._init();
    }

    ResponsiveDesign.prototype._init = function() {
      if (this.config.windowResizeEvent) {
        this._attachWindowHandlers();
      }
      return this.detectDevice();
    };

    ResponsiveDesign.prototype._attachWindowHandlers = function() {
      var lazyResize;
      lazyResize = Base.util.debounce(this._resizeHandler, this.config.waitLimit);
      return $(window).resize(lazyResize);
    };

    ResponsiveDesign.prototype._resizeHandler = function() {
      Pestle.emit("rwd:windowresize");
      return this.detectDevice();
    };

    ResponsiveDesign.prototype.detectDevice = function() {
      var UADetector, bp, capitalizedBPName, evt, msg, stateUA, vp, vpd;
      bp = this.config.breakpoints;
      vp = Base.vp.viewportW();
      vpd = this._checkViewport(vp, bp);
      if (!Base.util.isEmpty(vpd)) {
        capitalizedBPName = Base.util.string.capitalize(vpd.name);
        if (Base.util.isFunction(Base.device['is' + capitalizedBPName])) {
          UADetector = Base.device['is' + capitalizedBPName];
        }
        stateUA = false;
        if (Base.util.isFunction(UADetector)) {
          stateUA = UADetector();
        }
        if (stateUA || vpd.name) {
          evt = 'rwd:' + vpd.name.toLowerCase();
          Base.log.info("[ext] Responsive Design extension is triggering the following");
          Base.log.info(evt);
          Pestle.emit(evt);
          return this.device = vpd.name.toLowerCase();
        }
      } else {
        msg = "[ext] The passed settings to the Responsive Design Extension " + "might not be correct since we haven't been able to detect an " + "asociated breakpoint to the current viewport";
        return Base.log.warn(msg);
      }
    };

    ResponsiveDesign.prototype.getDevice = function() {
      return this.device;
    };


    /**
     * detect if the current viewport
     * correspond to any of the defined bp in the config setting
     * @param  {[type]} vp [number. Current viewport]
     * @param  {[type]} breakpoints [clone of the breakpoint key object]
     * @return {[type]} the breakpoint that corresponds to the currently
     *                  detected viewport
     */

    ResponsiveDesign.prototype._checkViewport = function(vp, breakpoints) {
      var breakpoint;
      breakpoint = Base.util.filter(breakpoints, function(bp) {
        if (vp >= bp.bpmin) {
          if (bp.bpmax && bp.bpmax !== 0) {
            if (vp <= bp.bpmax) {
              return true;
            } else {
              return false;
            }
          } else {
            return true;
          }
        } else {
          return false;
        }
      });
      if (breakpoint.length > 0) {
        return breakpoint.shift();
      } else {
        return {};
      }
    };

    return ResponsiveDesign;

  })();
  return {
    initialize: function(app) {
      var config, rwd;
      Base.log.info("[ext] Responsive Design Extension initialized");
      config = {};
      if (app.config.extension && app.config.extension[this.optionKey]) {
        config = Base.util.defaults({}, app.config.extension[this.optionKey]);
      }
      rwd = new ResponsiveDesign(config);
      app.sandbox.rwd = function() {
        return rwd.detectDevice();
      };
      return app.sandbox.rwd.getDevice = function() {
        return rwd.getDevice();
      };
    },
    afterAppInitialized: function(app) {
      Base.log.info("afterAppInitialized method from ResponsiveDesign");
      return app.sandbox.rwd();
    },
    name: 'Responsive Design Extension',
    optionKey: 'responsivedesign'
  };
});



},{"./../base.coffee":"/home/dirigaray/projects/pestle/src/base.coffee"}],"/home/dirigaray/projects/pestle/src/extension/responsiveimages.coffee":[function(_dereq_,module,exports){

/**
 * This extension will be handling the creation of the responsive images
 */
(function(root, factory) {
  return module.exports = factory(root, {});
})(window, function(root, Ext) {
  var Base, ResponsiveImages;
  Base = _dereq_('./../base.coffee');
  ResponsiveImages = (function() {
    ResponsiveImages.prototype.cfg = {
      availableWidths: [133, 152, 162, 225, 210, 224, 280, 352, 470, 536, 590, 676, 710, 768, 885, 945, 1190],
      availablePixelRatios: [1, 2, 3],
      defaultSelector: '.delayed-image-load',
      lazymode: true
    };

    function ResponsiveImages(config) {
      if (config == null) {
        config = {};
      }
      Base.util.bindAll(this, "_init", "_createListeners", "_createInstance");
      this.config = Base.util.extend({}, this.cfg, config);
      this._init();
    }

    ResponsiveImages.prototype._init = function() {
      if (this.config.lazymode) {
        this._createListeners();
      }
      return this._createInstance();
    };

    ResponsiveImages.prototype._createListeners = function() {
      return Pestle.on('responsiveimages:create', this._createInstance);
    };

    ResponsiveImages.prototype._createInstance = function(options) {
      var opts, selector;
      if (options == null) {
        options = {};
      }
      Base.log.info("[ext] Responsive Images Extension creating a new Imager instance");
      selector = options.selector || this.config.defaultSelector;
      opts = !Base.util.isEmpty(options) ? options : this.config;
      return new Base.Imager(selector, opts);
    };

    return ResponsiveImages;

  })();
  return {
    initialize: function(app) {
      var config;
      Base.log.info("[ext] Responsive Images Extension initialized");
      config = {};
      if (app.config.extension && app.config.extension[this.optionKey]) {
        config = Base.util.defaults({}, app.config.extension[this.optionKey]);
      }
      return app.sandbox.responsiveimages = function() {
        var rp;
        rp = new ResponsiveImages(config);
        return Pestle.emit('responsiveimages:initialized');
      };
    },
    afterAppInitialized: function(app) {
      Base.log.info("afterAppInitialized method from ResponsiveImages");
      return app.sandbox.responsiveimages();
    },
    name: 'Responsive Images Extension',
    optionKey: 'responsiveimages'
  };
});



},{"./../base.coffee":"/home/dirigaray/projects/pestle/src/base.coffee"}],"/home/dirigaray/projects/pestle/src/util/cookies.coffee":[function(_dereq_,module,exports){
(function(root, factory) {
  return module.exports = factory(root, {});
})(window, function(root, Cookies) {
  var cookies;
  cookies = _dereq_('cookies-js');
  Cookies = {
    set: function(key, value, options) {
      return cookies.set(key, value, options);
    },
    get: function(key) {
      return cookies.get(key);
    },
    expire: function(key, options) {
      return cookies.expire(key, options);
    }
  };
  return Cookies;
});



},{"cookies-js":"/home/dirigaray/projects/pestle/node_modules/cookies-js/src/cookies.js"}],"/home/dirigaray/projects/pestle/src/util/devicedetection.coffee":[function(_dereq_,module,exports){
(function(root, factory) {
  return module.exports = factory(root, {});
})(window, function(root, DeviceDetection) {
  var isMobile;
  isMobile = _dereq_('ismobilejs');
  DeviceDetection = {
    isMobile: function() {
      return isMobile.phone;
    },
    isTablet: function() {
      return isMobile.tablet;
    },
    isIphone: function() {
      return isMobile.apple.phone;
    },
    isIpod: function() {
      return isMobile.apple.ipod;
    },
    isIpad: function() {
      return isMobile.apple.tablet;
    },
    isApple: function() {
      return isMobile.apple.device;
    },
    isAndroidPhone: function() {
      return isMobile.android.phone;
    },
    isAndroidTablet: function() {
      return isMobile.android.tablet;
    },
    isAndroidDevice: function() {
      return isMobile.android.device;
    },
    isWindowsPhone: function() {
      return isMobile.windows.phone;
    },
    isWindowsTablet: function() {
      return isMobile.windows.tablet;
    },
    isWindowsDevice: function() {
      return isMobile.windows.device;
    }
  };
  return DeviceDetection;
});



},{"ismobilejs":"/home/dirigaray/projects/pestle/node_modules/ismobilejs/isMobile.js"}],"/home/dirigaray/projects/pestle/src/util/eventbus.coffee":[function(_dereq_,module,exports){
var __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __hasProp = {}.hasOwnProperty;

(function(root, factory) {
  return module.exports = factory(root, {});
})(window, function(root, EventBus) {
  var EventEmitter;
  EventEmitter = _dereq_('wolfy87-eventemitter');

  /**
   * class that serves as a facade for the EventEmitter class
   */
  EventBus = (function(_super) {
    __extends(EventBus, _super);

    function EventBus() {
      return EventBus.__super__.constructor.apply(this, arguments);
    }

    return EventBus;

  })(EventEmitter);
  return EventBus;
});



},{"wolfy87-eventemitter":"/home/dirigaray/projects/pestle/node_modules/wolfy87-eventemitter/EventEmitter.js"}],"/home/dirigaray/projects/pestle/src/util/extmanager.coffee":[function(_dereq_,module,exports){

/**
 * The Extension Mananger will provide the base set of functionalities
 * to make the Core library extensible.
 * @author Francisco Ramini <framini at gmail.com>
 */
(function(root, factory) {
  return module.exports = factory(root, {});
})(window, function(root, ExtManager) {
  var Base;
  Base = _dereq_('../base.coffee');
  ExtManager = (function() {

    /**
     * Defaults configs for the module
     * @type {[type]}
     */
    ExtManager.prototype._extensionConfigDefaults = {
      activated: true
    };

    function ExtManager() {
      this._extensions = [];
      this._initializedExtensions = [];
    }

    ExtManager.prototype.add = function(ext) {
      var msg;
      if (!ext.name) {
        msg = "The extension doesn't have a name associated. It will be hepfull " + "if you have assing all of your extensions a name for better debugging";
        Base.log.warn(msg);
      }
      Base.util.each(this._extensions, function(xt, i) {
        if (_.isEqual(xt, ext)) {
          throw new Error("Extension: " + ext.name + " already exists.");
        }
      });
      return this._extensions.push(ext);
    };

    ExtManager.prototype.init = function(context) {
      var xtclone;
      xtclone = Base.util.clone(this._extensions);
      Base.log.info("Added extensions (still not initialized):");
      Base.log.debug(xtclone);
      this._initExtension(this._extensions, context);
      Base.log.info("Initialized extensions:");
      return Base.log.debug(this._initializedExtensions);
    };

    ExtManager.prototype._initExtension = function(extensions, context) {
      var xt;
      if (extensions.length > 0) {
        xt = extensions.shift();
        if (this._isExtensionAllowedToBeActivated(xt, context.config)) {
          xt.activated = true;
          xt.initialize(context);
          this._initializedExtensions.push(xt);
        } else {
          xt.activated = false;
        }
        return this._initExtension(extensions, context);
      }
    };

    ExtManager.prototype._isExtensionAllowedToBeActivated = function(xt, config) {
      var activated, msg;
      if (!xt.optionKey) {
        msg = "The optionKey is required and was not defined by: " + xt.name;
        Base.log.error(msg);
        throw new Error(msg);
      }
      if (config.extension && config.extension[xt.optionKey] && config.extension[xt.optionKey].hasOwnProperty('activated')) {
        activated = config.extension[xt.optionKey].activated;
      } else {
        activated = this._extensionConfigDefaults.activated;
      }
      return activated;
    };

    ExtManager.prototype.getInitializedExtensions = function() {
      return this._initializedExtensions;
    };

    ExtManager.prototype.getInitializedExtensionByName = function(name) {
      return Base.util.where(this._initializedExtensions, {
        optionKey: name
      });
    };

    ExtManager.prototype.getExtensions = function() {
      return this._extensions;
    };

    ExtManager.prototype.getExtensionByName = function(name) {
      return Base.util.where(this._extensions, {
        optionKey: name
      });
    };

    return ExtManager;

  })();
  return ExtManager;
});



},{"../base.coffee":"/home/dirigaray/projects/pestle/src/base.coffee"}],"/home/dirigaray/projects/pestle/src/util/general.coffee":[function(_dereq_,module,exports){
(function(root, factory) {
  return module.exports = factory(root, {});
})(window, function(root, Utils) {
  Utils = {

    /**
     * Function to compare library versioning
     */
    versionCompare: function(v1, v2, options) {
      var i, isValidPart, lexicographical, v1parts, v2parts, zeroExtend;
      isValidPart = function(x) {
        return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
      };
      lexicographical = options && options.lexicographical;
      zeroExtend = options && options.zeroExtend;
      v1parts = v1.split(".");
      v2parts = v2.split(".");
      if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
        return NaN;
      }
      if (zeroExtend) {
        while (v1parts.length < v2parts.length) {
          v1parts.push("0");
        }
        while (v2parts.length < v1parts.length) {
          v2parts.push("0");
        }
      }
      if (!lexicographical) {
        v1parts = v1parts.map(Number);
        v2parts = v2parts.map(Number);
      }
      i = -1;
      while (i < v1parts.length) {
        i++;
        if (v2parts.length < i) {
          return 1;
        }
        if (v1parts[i] === v2parts[i]) {
          continue;
        } else if (v1parts[i] > v2parts[i]) {
          return 1;
        } else if (v2parts[i] > v1parts[i]) {
          return -1;
        }
      }
      if (v1parts.length !== v2parts.length) {
        return -1;
      }
      return 0;
    },
    string: {
      capitalize: function(str) {
        str = (str == null ? "" : String(str));
        return str.charAt(0).toUpperCase() + str.slice(1);
      }
    }
  };
  return Utils;
});



},{}],"/home/dirigaray/projects/pestle/src/util/logger.coffee":[function(_dereq_,module,exports){
(function(root, factory) {
  return module.exports = factory(root, {});
})(window, function(root, Logger) {
  var loglevel, sentry;
  loglevel = _dereq_('loglevel');
  sentry = _dereq_('./sentry.coffee');
  Logger = {
    setLevel: function(level) {
      return loglevel.setLevel(level);
    },
    setConfig: function(config) {
      loglevel.setLevel(config.logLevel);
      if (config.sentry) {
        return sentry.initialize(config.sentry);
      }
    },
    trace: function(msg) {
      return loglevel.trace(msg);
    },
    debug: function(msg) {
      return loglevel.debug(msg);
    },
    info: function(msg) {
      return loglevel.info(msg);
    },
    warn: function(msg) {
      return loglevel.warn(msg);
    },
    error: function(msg) {
      loglevel.error(msg);
      return sentry.sendMessage(msg);
    }
  };
  return Logger;
});



},{"./sentry.coffee":"/home/dirigaray/projects/pestle/src/util/sentry.coffee","loglevel":"/home/dirigaray/projects/pestle/node_modules/loglevel/lib/loglevel.js"}],"/home/dirigaray/projects/pestle/src/util/module.coffee":[function(_dereq_,module,exports){

/**
 * This will provide the functionality to define Modules
 * and provide a way to extend them
 * @author Francisco Ramini <framini at gmail.com>
 */
(function(root, factory) {
  return module.exports = factory(root, {});
})(window, function(root, Module) {
  var Base, Modules, extend;
  Base = _dereq_('../base.coffee');
  Module = (function() {
    function Module(opt) {
      this.sandbox = opt.sandbox;
      this.options = opt.options;
      this.setElement();
    }

    return Module;

  })();
  Modules = (function() {
    function Modules() {}

    Modules.list = {};


    /**
     * just an alias for the extend method
     * @author Francisco Ramini <framini at gmail.com>
     * @param  {[String]} name
     * @param  {[Object]} definition
     */

    Modules.add = function(name, definition) {
      return this.extend(name, definition, Module);
    };


    /**
     * getter for retrieving modules definitions
     * @author Francisco Ramini <framini at gmail.com>
     * @param  {[type]} name
     * @return {[Function/undefined]}
     */

    Modules.get = function(name) {
      if (Base.util.isString(name) && this.list[name]) {
        return this.list[name];
      } else {
        return void 0;
      }
    };


    /**
     * this will allows us to simplify and have more control
     * over adding/defining modules
     * @author Francisco Ramini <framini at gmail.com>
     * @param  {[String]} name
     * @param  {[Object]} definition
     * @param  {[String/Function]} BaseClass
     */

    Modules.extend = function(name, definition, BaseClass) {
      var bc, extendedClass, extendedDefinition, msg;
      if (Base.util.isString(name) && Base.util.isObject(definition)) {
        if (!BaseClass) {
          BaseClass = Module;
        } else {
          if (Base.util.isString(BaseClass)) {
            bc = this.list[BaseClass];
            if (bc) {
              BaseClass = bc;
            } else {
              msg = '[Module/ ' + name(+' ]: is trying to extend [' + BaseClass + '] which does not exist');
              Base.log.error(msg);
              throw new Error(msg);
            }
          } else if (Base.util.isFunction(BaseClass)) {
            BaseClass = BaseClass;
          }
        }
        extendedClass = extend.call(BaseClass, definition);
        if (!Base.util.has(this.list, name)) {
          extendedDefinition = extend.call(BaseClass, definition);
          this.list[name] = extendedDefinition;
          return extendedDefinition;
        } else {
          msg = '[Component:' + name + '] have already been defined';
          Base.log.warn(msg);
          return this;
        }
      }
    };

    return Modules;

  })();
  Base.util.extend(Module.prototype, Base.Events, {
    initialize: function() {
      var msg;
      msg = '[Component/' + this.options.name + ']:' + 'Doesn\'t have an initialize method defined';
      return Base.log.warn(msg);
    },
    setElement: function() {
      this.undelegateEvents();
      this.el = this.options.el;
      this.$el = $(this.el);
      return this.delegateEvents();
    },
    delegateEvents: function(events) {
      var delegateEventSplitter, key, match, method;
      delegateEventSplitter = /^(\S+)\s*(.*)$/;
      if (!(events || (events = Base.util.result(this, "events")))) {
        return;
      }
      this.undelegateEvents();
      for (key in events) {
        method = events[key];
        if (!Base.util.isFunction(method)) {
          method = this[events[key]];
        }
        if (!method) {
          continue;
        }
        match = key.match(delegateEventSplitter);
        this.delegate(match[1], match[2], Base.util.bind(method, this));
      }
      return this;
    },
    delegate: function(eventName, selector, listener) {
      this.$el.on(eventName + ".pestleEvent" + this.options.guid, selector, listener);
      return this;
    },
    undelegateEvents: function() {
      if (this.$el) {
        this.$el.off('.pestleEvent' + this.options.guid);
      }
      return this;
    },
    stop: function() {
      this.undelegateEvents();
      if (this.$el) {
        return this.$el.remove();
      }
    }
  });
  extend = function(protoProps, staticProps) {
    var Surrogate, child, parent;
    parent = this;
    if (protoProps && Base.util.has(protoProps, "constructor")) {
      child = protoProps.constructor;
    } else {
      child = function() {
        return parent.apply(this, arguments);
      };
    }
    Base.util.extend(child, parent, staticProps);
    Surrogate = function() {
      this.constructor = child;
    };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;
    if (protoProps) {
      Base.util.extend(child.prototype, protoProps);
    }
    child.prototype._super_ = parent.prototype.initialize;
    return child;
  };
  Modules.Module = Module;
  return Modules;
});



},{"../base.coffee":"/home/dirigaray/projects/pestle/src/base.coffee"}],"/home/dirigaray/projects/pestle/src/util/sentry.coffee":[function(_dereq_,module,exports){
(function(root, factory) {
  return module.exports = factory(root, {});
})(window, function(root, Sentry) {
  var Raven;
  Raven = _dereq_('raven-js');
  Sentry = {
    initialize: function(config) {
      Raven.config(config.endPoint, config.options);
      return Raven.install();
    },
    sendMessage: function(msg) {
      if (Raven.isSetup()) {
        return Raven.captureMessage(msg);
      }
    }
  };
  return Sentry;
});



},{"raven-js":"/home/dirigaray/projects/pestle/node_modules/raven-js/dist/raven.js"}],"/home/dirigaray/projects/pestle/src/util/versionchecker.coffee":[function(_dereq_,module,exports){
(function(root, factory) {
  return module.exports = factory(root, {});
})(window, function(root, VersionChecker) {
  var Utils, log;
  log = _dereq_('./logger.coffee');
  Utils = _dereq_('./general.coffee');
  VersionChecker = {

    /**
     * Recursive method to check versioning for all the defined libraries
     * within the dependency array
     */
    check: function(dependencies) {
      var dp, msg;
      if (dependencies.length > 0) {
        dp = dependencies.shift();
        if (!dp.obj) {
          msg = dp.name + " is a hard dependency and it has to be loaded before pestle.js";
          log.error(msg);
          throw new Error(msg);
        }
        if (!(Utils.versionCompare(dp.version, dp.required) >= 0)) {
          msg = "[FAIL] " + dp.name + ": version required: " + dp.required + " <--> Loaded version: " + dp.version;
          log.error(msg);
          throw new Error(msg);
        }
        return VersionChecker.check(dependencies);
      }
    }
  };
  return VersionChecker;
});



},{"./general.coffee":"/home/dirigaray/projects/pestle/src/util/general.coffee","./logger.coffee":"/home/dirigaray/projects/pestle/src/util/logger.coffee"}],"/home/dirigaray/projects/pestle/src/util/viewportdetection.coffee":[function(_dereq_,module,exports){
(function(root, factory) {
  return module.exports = factory(root, {});
})(window, function(root, Viewport) {
  var viewport;
  viewport = _dereq_('verge');
  Viewport = {
    viewportW: function() {
      return viewport.viewportW();
    },
    viewportH: function(key) {
      return viewport.viewportH();
    },
    viewport: function(key) {
      return viewport.viewport();
    },
    inViewport: function(el, cushion) {
      return viewport.inViewport(el, cushion);
    },
    inX: function(el, cushion) {
      return viewport.inX(el, cushion);
    },
    inY: function(el, cushion) {
      return viewport.inY(el, cushion);
    },
    scrollX: function() {
      return viewport.scrollX();
    },
    scrollY: function() {
      return viewport.scrollY();
    },
    mq: function(mediaQueryString) {
      return viewport.mq(mediaQueryString);
    },
    rectangle: function(el, cushion) {
      return viewport.rectangle(el, cushion);
    },
    aspect: function(o) {
      return viewport.aspect(o);
    }
  };
  return Viewport;
});



},{"verge":"/home/dirigaray/projects/pestle/node_modules/verge/verge.js"}]},{},["./src/core.coffee"])("./src/core.coffee")
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9kaXJpZ2FyYXkvcHJvamVjdHMvcGVzdGxlL3NyYy9jb3JlLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9jb29raWVzLWpzL3NyYy9jb29raWVzLmpzIiwibm9kZV9tb2R1bGVzL2ltYWdlci5qcy9JbWFnZXIuanMiLCJub2RlX21vZHVsZXMvaXNtb2JpbGVqcy9pc01vYmlsZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2dsZXZlbC9saWIvbG9nbGV2ZWwuanMiLCJub2RlX21vZHVsZXMvcmF2ZW4tanMvZGlzdC9yYXZlbi5qcyIsIm5vZGVfbW9kdWxlcy92ZXJnZS92ZXJnZS5qcyIsIm5vZGVfbW9kdWxlcy93b2xmeTg3LWV2ZW50ZW1pdHRlci9FdmVudEVtaXR0ZXIuanMiLCIvaG9tZS9kaXJpZ2FyYXkvcHJvamVjdHMvcGVzdGxlL3NyYy9iYXNlLmNvZmZlZSIsIi9ob21lL2RpcmlnYXJheS9wcm9qZWN0cy9wZXN0bGUvc3JjL2V4dGVuc2lvbi9jb21wb25lbnRzLmNvZmZlZSIsIi9ob21lL2RpcmlnYXJheS9wcm9qZWN0cy9wZXN0bGUvc3JjL2V4dGVuc2lvbi9yZXNwb25zaXZlZGVzaWduLmNvZmZlZSIsIi9ob21lL2RpcmlnYXJheS9wcm9qZWN0cy9wZXN0bGUvc3JjL2V4dGVuc2lvbi9yZXNwb25zaXZlaW1hZ2VzLmNvZmZlZSIsIi9ob21lL2RpcmlnYXJheS9wcm9qZWN0cy9wZXN0bGUvc3JjL3V0aWwvY29va2llcy5jb2ZmZWUiLCIvaG9tZS9kaXJpZ2FyYXkvcHJvamVjdHMvcGVzdGxlL3NyYy91dGlsL2RldmljZWRldGVjdGlvbi5jb2ZmZWUiLCIvaG9tZS9kaXJpZ2FyYXkvcHJvamVjdHMvcGVzdGxlL3NyYy91dGlsL2V2ZW50YnVzLmNvZmZlZSIsIi9ob21lL2RpcmlnYXJheS9wcm9qZWN0cy9wZXN0bGUvc3JjL3V0aWwvZXh0bWFuYWdlci5jb2ZmZWUiLCIvaG9tZS9kaXJpZ2FyYXkvcHJvamVjdHMvcGVzdGxlL3NyYy91dGlsL2dlbmVyYWwuY29mZmVlIiwiL2hvbWUvZGlyaWdhcmF5L3Byb2plY3RzL3Blc3RsZS9zcmMvdXRpbC9sb2dnZXIuY29mZmVlIiwiL2hvbWUvZGlyaWdhcmF5L3Byb2plY3RzL3Blc3RsZS9zcmMvdXRpbC9tb2R1bGUuY29mZmVlIiwiL2hvbWUvZGlyaWdhcmF5L3Byb2plY3RzL3Blc3RsZS9zcmMvdXRpbC9zZW50cnkuY29mZmVlIiwiL2hvbWUvZGlyaWdhcmF5L3Byb2plY3RzL3Blc3RsZS9zcmMvdXRpbC92ZXJzaW9uY2hlY2tlci5jb2ZmZWUiLCIvaG9tZS9kaXJpZ2FyYXkvcHJvamVjdHMvcGVzdGxlL3NyYy91dGlsL3ZpZXdwb3J0ZGV0ZWN0aW9uLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQUE7Ozs7R0FBQTtBQUFBLENBS0MsU0FBQyxJQUFELEVBQU8sT0FBUCxHQUFBO1NBRUcsTUFBTSxDQUFDLE9BQVAsR0FBaUIsSUFBSSxDQUFDLE1BQUwsR0FBYyxPQUFBLENBQVEsSUFBUixFQUFjLEVBQWQsRUFGbEM7QUFBQSxDQUFELENBQUEsQ0FJRSxNQUpGLEVBSVUsU0FBQyxJQUFELEVBQU8sTUFBUCxHQUFBO0FBRU4sTUFBQSxnQkFBQTtBQUFBLEVBQUEsSUFBQSxHQUFhLE9BQUEsQ0FBUyxlQUFULENBQWIsQ0FBQTtBQUFBLEVBQ0EsVUFBQSxHQUFhLE9BQUEsQ0FBUywwQkFBVCxDQURiLENBQUE7QUFBQSxFQUlBLE1BQUEsR0FBYSxJQUFBLElBQUksQ0FBQyxNQUFMLENBQUEsQ0FKYixDQUFBO0FBQUEsRUFNQSxNQUFNLENBQUMsTUFBUCxHQUFnQixPQUFBLENBQVMsc0JBQVQsQ0FOaEIsQ0FBQTtBQUFBLEVBU0EsTUFBTSxDQUFDLE9BQVAsR0FBaUIsRUFUakIsQ0FBQTtBQUFBLEVBV00sTUFBTSxDQUFDO0FBRVQsbUJBQUEsT0FBQSxHQUFVLE9BQVYs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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25kQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy8wREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4ZEE7QUFBQTs7Ozs7R0FBQTtBQUFBLENBTUMsU0FBQyxJQUFELEVBQU8sT0FBUCxHQUFBO1NBRUcsTUFBTSxDQUFDLE9BQVAsR0FBaUIsT0FBQSxDQUFRLElBQVIsRUFBYyxFQUFkLEVBRnBC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b3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIjIyMqXG4gKiBUaGUgY29yZSBsYXllciB3aWxsIGRlcGVuZCBvbiB0aGUgYmFzZSBsYXllciBhbmQgd2lsbCBwcm92aWRlXG4gKiB0aGUgY29yZSBzZXQgb2YgZnVuY3Rpb25hbGl0eSB0byBhcHBsaWNhdGlvbiBmcmFtZXdvcmtcbiAqIEBhdXRob3IgRnJhbmNpc2NvIFJhbWluaSA8ZnJhbWluaSBhdCBnbWFpbC5jb20+XG4jIyNcbigocm9vdCwgZmFjdG9yeSkgLT5cblxuICAgIG1vZHVsZS5leHBvcnRzID0gcm9vdC5QZXN0bGUgPSBmYWN0b3J5KHJvb3QsIHt9KVxuXG4pKHdpbmRvdywgKHJvb3QsIFBlc3RsZSkgLT5cblxuICAgIEJhc2UgICAgICAgPSByZXF1aXJlKCcuL2Jhc2UuY29mZmVlJylcbiAgICBFeHRNYW5hZ2VyID0gcmVxdWlyZSgnLi91dGlsL2V4dG1hbmFnZXIuY29mZmVlJylcblxuICAgICMgd2UnbGwgdXNlIHRoZSBQZXN0bGUgb2JqZWN0IGFzIHRoZSBnbG9iYWwgRXZlbnQgYnVzXG4gICAgUGVzdGxlID0gbmV3IEJhc2UuRXZlbnRzKClcblxuICAgIFBlc3RsZS5Nb2R1bGUgPSByZXF1aXJlKCcuL3V0aWwvbW9kdWxlLmNvZmZlZScpXG5cbiAgICAjIE5hbWVzcGFjZSBmb3IgbW9kdWxlIGRlZmluaXRpb25cbiAgICBQZXN0bGUubW9kdWxlcyA9IHt9XG5cbiAgICBjbGFzcyBQZXN0bGUuQ29yZVxuICAgICAgICAjIGN1cnJlbnQgdmVyc2lvbiBvZiB0aGUgbGlicmFyeVxuICAgICAgICB2ZXJzaW9uOiBcIjAuMC4xXCJcblxuICAgICAgICBjZmc6XG4gICAgICAgICAgICBkZWJ1ZzpcbiAgICAgICAgICAgICAgICBsb2dMZXZlbDogNSAjIGJ5IGRlZmF1bHQgdGhlIGxvZ2dpbmcgd2lsbCBiZSBkaXNhYmxlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICMgdmFsdWVzIGNhbiBnbyBmcm9tIDAgdG8gNSAoNSBtZWFucyBkaXNhYmxlZClcbiAgICAgICAgICAgIG5hbWVzcGFjZTogJ3BsYXRmb3JtJ1xuXG4gICAgICAgICAgICBleHRlbnNpb246IHt9ICMgZGVmaW5lIHRoZSBuYW1lc3BhY2UgdG8gZGVmaW5lIGV4dGVuc2lvbiBzcGVjaWZpYyBzZXR0aW5nc1xuXG4gICAgICAgICAgICBjb21wb25lbnQ6IHt9ICMgZGVmaW5lIHRoZSBuYW1lc3BhY2UgdG8gZGVmaW5lIGNvbXBvbmVudCBzcGVjaWZpYyBzZXR0aW5nc1xuXG4gICAgICAgIGNvbnN0cnVjdG9yOiAoY29uZmlnID0ge30pIC0+XG4gICAgICAgICAgICAjIGluaXRpYWxpemUgdGhlIGNvbmZpZyBvYmplY3RcbiAgICAgICAgICAgIEBzZXRDb25maWcoY29uZmlnKVxuXG4gICAgICAgICAgICAjIHRoaXMgd2lsbCB0cmFjayB0aGUgc3RhdGUgb2YgdGhlIENvcmUuIFdoZW4gaXQgaXNcbiAgICAgICAgICAgICMgdHJ1ZSwgaXQgbWVhbnMgdGhlIFwic3RhcnQoKVwiIGhhcyBiZWVuIGNhbGxlZFxuICAgICAgICAgICAgQHN0YXJ0ZWQgPSBmYWxzZVxuXG4gICAgICAgICAgICAjIFRoZSBleHRlbnNpb24gbWFuYWdlciB3aWxsIGJlIG9uIGNoYXJnZSBvZiBsb2FkaW5nIGV4dGVuc2lvbnNcbiAgICAgICAgICAgICMgYW5kIG1ha2UgaXRzIGZ1bmN0aW9uYWxpdHkgYXZhaWxhYmxlIHRvIHRoZSBzdGFja1xuICAgICAgICAgICAgQGV4dE1hbmFnZXIgPSBuZXcgRXh0TWFuYWdlcigpXG5cbiAgICAgICAgICAgICMgdGhyb3VnaCB0aGlzIG9iamVjdCB0aGUgbW9kdWxlcyB3aWxsIGJlIGFjY2VzaW5nIHRoZSBtZXRob2RzIGRlZmluZWQgYnkgdGhlXG4gICAgICAgICAgICAjIGV4dGVuc2lvbnNcbiAgICAgICAgICAgIEBzYW5kYm94ID0gQmFzZS51dGlsLmNsb25lIEJhc2VcblxuICAgICAgICAgICAgIyBuYW1lc3BhY2UgdG8gaG9sZCBhbGwgdGhlIHNhbmRib3hlc1xuICAgICAgICAgICAgQHNhbmRib3hlcyA9IHt9XG5cbiAgICAgICAgICAgICMgUmVxdWlyZSBjb3JlIGV4dGVuc2lvbnNcbiAgICAgICAgICAgIENvbXBvbmVudHMgPSByZXF1aXJlKCcuL2V4dGVuc2lvbi9jb21wb25lbnRzLmNvZmZlZScpXG4gICAgICAgICAgICBSZXNwb25zaXZlRGVzaWduID0gcmVxdWlyZSgnLi9leHRlbnNpb24vcmVzcG9uc2l2ZWRlc2lnbi5jb2ZmZWUnKVxuICAgICAgICAgICAgUmVzcG9uc2l2ZUltYWdlcyA9IHJlcXVpcmUoJy4vZXh0ZW5zaW9uL3Jlc3BvbnNpdmVpbWFnZXMuY29mZmVlJylcblxuICAgICAgICAgICAgIyBBZGQgY29yZSBleHRlbnNpb25zIHRvIHRoZSBhcHBcbiAgICAgICAgICAgIEBleHRNYW5hZ2VyLmFkZChDb21wb25lbnRzKVxuICAgICAgICAgICAgQGV4dE1hbmFnZXIuYWRkKFJlc3BvbnNpdmVEZXNpZ24pXG4gICAgICAgICAgICBAZXh0TWFuYWdlci5hZGQoUmVzcG9uc2l2ZUltYWdlcylcblxuICAgICAgICBhZGRFeHRlbnNpb246IChleHQpIC0+XG4gICAgICAgICAgICAjIHdlJ2xsIG9ubHkgYWxsb3cgdG8gYWRkIG5ldyBleHRlbnNpb25zIGJlZm9yZVxuICAgICAgICAgICAgIyB0aGUgQ29yZSBnZXQgc3RhcnRlZFxuICAgICAgICAgICAgdW5sZXNzIEBzdGFydGVkXG4gICAgICAgICAgICAgICAgQGV4dE1hbmFnZXIuYWRkKGV4dClcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBCYXNlLmxvZy5lcnJvcihcIlRoZSBDb3JlIGhhcyBhbHJlYWR5IGJlZW4gc3RhcnRlZC4gWW91IGNhbiBub3QgYWRkIG5ldyBleHRlbnNpb25zIGF0IHRoaXMgcG9pbnQuXCIpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgY2FuIG5vdCBhZGQgZXh0ZW5zaW9ucyB3aGVuIHRoZSBDb3JlIGhhcyBhbHJlYWR5IGJlZW4gc3RhcnRlZC4nKVxuXG4gICAgICAgICMgcHJvdmlkZXMgYSB3YXkgZm9yIHNldHRpbmcgdXAgY29uZmlnc1xuICAgICAgICAjIGFmdGVyIFBlc3RsZSBoYXMgYmVlbiBpbnN0YW50aWF0ZWRcbiAgICAgICAgc2V0Q29uZmlnOiAoY29uZmlnKSAtPlxuICAgICAgICAgICAgdW5sZXNzIEBzdGFydGVkXG4gICAgICAgICAgICAgICAgaWYgQmFzZS51dGlsLmlzT2JqZWN0IGNvbmZpZ1xuICAgICAgICAgICAgICAgICAgICAjIGlmIHdlIGVudGVyIGhlcmUgaXQgbWVhbnMgUGVzdGxlIGhhcyBiZWVuIGFscmVhZHkgaW5pdGlhbGl6ZWRcbiAgICAgICAgICAgICAgICAgICAgIyBkdXJpbmcgaW5zdGFudGlhdGlvbiwgc28gd2UnbGwgdXNlIHRoZSBjb25maWcgb2JqZWN0IGFzIGFcbiAgICAgICAgICAgICAgICAgICAgIyBwcm92aWRlciBmb3IgZGVmYXVsdCB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICB1bmxlc3MgQmFzZS51dGlsLmlzRW1wdHkgQGNvbmZpZ1xuICAgICAgICAgICAgICAgICAgICAgICAgQGNvbmZpZyA9IEJhc2UudXRpbC5kZWZhdWx0cyBjb25maWcsIEBjb25maWdcbiAgICAgICAgICAgICAgICAgICAgIyBpZiBpdCBpcyBlbXB0eSwgaXQgbWVhbnMgd2UgYXJlIGdvaW5nIHNldHRpbmcgdXAgUGVzdGxlIGZvclxuICAgICAgICAgICAgICAgICAgICAjIHRoZSBmaXJzdCB0aW1lXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIEBjb25maWcgPSBCYXNlLnV0aWwuZGVmYXVsdHMgY29uZmlnLCBAY2ZnXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBtc2cgPSBcIltzZXRDb25maWcgbWV0aG9kXSBvbmx5IGFjY2VwdCBhbiBvYmplY3QgYXMgYSBwYXJhbWV0ZXIgYW5kIHlvdSdyZSBwYXNzaW5nOiBcIiArIHR5cGVvZiBjb25maWdcbiAgICAgICAgICAgICAgICAgICAgQmFzZS5sb2cuZXJyb3IobXNnKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIEJhc2UubG9nLmVycm9yKFwiUGVzdGxlIGhhcyBhbHJlYWR5IGJlZW4gc3RhcnRlZC4gWW91IGNhbiBub3Qgc2V0IHVwIGNvbmZpZ3MgYXQgdGhpcyBwb2ludC5cIilcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBjYW4gbm90IHNldCB1cCBjb25maWdzIHdoZW4gUGVzdGxlIGhhcyBhbHJlYWR5IHN0YXJ0ZWQuJylcblxuICAgICAgICBzZXRDb21wb25lbnRDb25maWc6IChjb21wLCBjb25maWcpIC0+XG4gICAgICAgICAgICB1bmxlc3MgQHN0YXJ0ZWRcblxuICAgICAgICAgICAgICAgIHVubGVzcyBjb21wIGFuZCBCYXNlLnV0aWwuaXNTdHJpbmcgY29tcFxuICAgICAgICAgICAgICAgICAgICBtc2cgPSBcIltzZXRDb21wb25lbnRDb25maWcgbWV0aG9kXSAxc3QgcGFyYW0gc2hvdWxkIGJlIGEgc3RyaW5nLCB5b3UncmUgcGFzc2luZzpcIiArIHR5cGVvZiBjb25maWdcbiAgICAgICAgICAgICAgICAgICAgQmFzZS5sb2cuZXJyb3IobXNnKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKVxuXG4gICAgICAgICAgICAgICAgaWYgQmFzZS51dGlsLmlzT2JqZWN0IGNvbmZpZ1xuICAgICAgICAgICAgICAgICAgICAjIGlmIHdlIGVudGVyIGhlcmUgaXQgbWVhbnMgUGVzdGxlIGhhcyBiZWVuIGFscmVhZHkgaW5pdGlhbGl6ZWRcbiAgICAgICAgICAgICAgICAgICAgIyBkdXJpbmcgaW5zdGFudGlhdGlvbiwgc28gd2UnbGwgdXNlIHRoZSBjb25maWcgb2JqZWN0IGFzIGFcbiAgICAgICAgICAgICAgICAgICAgIyBwcm92aWRlciBmb3IgZGVmYXVsdCB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICB1bmxlc3MgQmFzZS51dGlsLmlzRW1wdHkgQGNvbmZpZ1xuICAgICAgICAgICAgICAgICAgICAgICAgQGNvbmZpZy5jb21wb25lbnRbY29tcF0gPSBCYXNlLnV0aWwuZGVmYXVsdHMgY29uZmlnLCBAY29uZmlnLmNvbXBvbmVudFtjb21wXVxuXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIEBjb25maWcgPSBAY29uZmlnIG9yIHt9XG4gICAgICAgICAgICAgICAgICAgICAgICBAY29uZmlnLmNvbXBvbmVudFtjb21wXSA9IEJhc2UudXRpbC5kZWZhdWx0cyBjb25maWcsIEBjZmcuY29tcG9uZW50W2NvbXBdXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBtc2cgPSBcIltzZXRDb21wb25lbnRDb25maWcgbWV0aG9kXSAybmQgcGFyYW0gc2hvdWxkIGJlIGFuIG9iamVjdCAmIHlvdSdyZSBwYXNzaW5nOlwiICsgdHlwZW9mIGNvbmZpZ1xuICAgICAgICAgICAgICAgICAgICBCYXNlLmxvZy5lcnJvcihtc2cpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgQmFzZS5sb2cuZXJyb3IoXCJQZXN0bGUgaGFzIGFscmVhZHkgYmVlbiBzdGFydGVkLiBZb3UgY2FuIG5vdCBhZGQgbmV3IGV4dGVuc2lvbnMgYXQgdGhpcyBwb2ludC5cIilcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBjYW4gbm90IGFkZCBleHRlbnNpb25zIHdoZW4gUGVzdGxlIGhhcyBhbHJlYWR5IHN0YXJ0ZWQuJylcblxuICAgICAgICBzdGFydDogKHNlbGVjdG9yID0gJycpIC0+XG5cbiAgICAgICAgICAgICMgU2V0IHRoZSBsb2dnaW5nIGNvbmZpZ3VyYXRpb24gZm9yIHRoZSBhcHBcbiAgICAgICAgICAgIEJhc2UubG9nLnNldENvbmZpZyhAY29uZmlnLmRlYnVnKVxuXG4gICAgICAgICAgICAjIHRoaXMgd2lsbCBsZXQgdXMgaW5pdGlhbGl6ZSBjb21wb25lbnRzIGF0IGEgbGF0ZXIgc3RhZ2VcbiAgICAgICAgICAgIGlmIEBzdGFydGVkIGFuZCBzZWxlY3RvciBpc250ICcnXG5cbiAgICAgICAgICAgICAgICBCYXNlLmxvZy5pbmZvKFwiUGVzdGxlIGlzIGluaXRpYWxpemluZyBhIGNvbXBvbmVudFwiKVxuXG4gICAgICAgICAgICAgICAgQHNhbmRib3guc3RhcnRDb21wb25lbnRzIHNlbGVjdG9yLCBAXG5cblxuICAgICAgICAgICAgIyBpZiB3ZSBlbnRlciBoZXJlLCBpdCBtZWFucyBpdCBpcyB0aGUgZmlzdCB0aW1lIHRoZSBzdGFydFxuICAgICAgICAgICAgIyBtZXRob2QgaXMgY2FsbGVkIGFuZCB3ZSdsbCBoYXZlIHRvIGluaXRpYWxpemUgYWxsIHRoZSBleHRlbnNpb25zXG4gICAgICAgICAgICBlbHNlXG5cbiAgICAgICAgICAgICAgICBCYXNlLmxvZy5pbmZvKFwiUGVzdGxlIHN0YXJ0ZWQgdGhlIGluaXRpYWxpemluZyBwcm9jZXNzXCIpXG5cbiAgICAgICAgICAgICAgICBAc3RhcnRlZCA9IHRydWVcblxuICAgICAgICAgICAgICAgICMgSW5pdCBhbGwgdGhlIGV4dGVuc2lvbnNcbiAgICAgICAgICAgICAgICBAZXh0TWFuYWdlci5pbml0KEApXG5cbiAgICAgICAgICAgICAgICAjIENhbGxiYWNrIG9iamVjdCB0aGF0IGlzIGdvbm5hIGhvbGQgZnVuY3Rpb25zIHRvIGJlIGV4ZWN1dGVkXG4gICAgICAgICAgICAgICAgIyBhZnRlciBhbGwgZXh0ZW5zaW9ucyBoYXMgYmVlbiBpbml0aWFsaXplZCBhbmQgdGhlIGVhY2ggYWZ0ZXJBcHBTdGFydGVkXG4gICAgICAgICAgICAgICAgIyBtZXRob2QgZXhlY3V0ZWRcbiAgICAgICAgICAgICAgICBjYiA9ICQuQ2FsbGJhY2tzIFwidW5pcXVlIG1lbW9yeVwiXG5cbiAgICAgICAgICAgICAgICAjIE9uY2UgdGhlIGV4dGVuc2lvbnMgaGF2ZSBiZWVuIGluaXRpYWxpemVkLCBsZXRzIGNhbGwgdGhlIGFmdGVyQXBwU3RhcnRlZFxuICAgICAgICAgICAgICAgICMgZnJvbSBlYWNoIGV4dGVuc2lvblxuICAgICAgICAgICAgICAgICMgTm90ZTogVGhpcyBtZXRob2Qgd2lsbCBsZXQgZWFjaCBleHRlbnNpb24gdG8gYXV0b21hdGljYWxseSBleGVjdXRlIHNvbWUgY29kZVxuICAgICAgICAgICAgICAgICMgICAgICAgb25jZSB0aGUgYXBwIGhhcyBzdGFydGVkLlxuICAgICAgICAgICAgICAgIEJhc2UudXRpbC5lYWNoIEBleHRNYW5hZ2VyLmdldEluaXRpYWxpemVkRXh0ZW5zaW9ucygpLCAoZXh0LCBpKSA9PlxuXG4gICAgICAgICAgICAgICAgICAgIGlmIGV4dFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiBCYXNlLnV0aWwuaXNGdW5jdGlvbihleHQuYWZ0ZXJBcHBTdGFydGVkKSBhbmQgZXh0LmFjdGl2YXRlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICMgc2luY2UgdGhlIGNvbXBvbmVudCBleHRlbnNpb24gaXMgdGhlIGVudHJ5IHBvaW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBmb3IgaW5pdGlhbGl6aW5nIHRoZSBhcHAsIHdlJ2xsIGdpdmUgaXQgc3BlY2lhbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICMgdHJlYXRtZW50IGFuZCBnaXZlIGl0IHRoZSBhYmlsaXR5IHRvIHJlY2VpdmUgYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGV4dHJhIHBhcmFtZXRlciAodG8gc3RhcnQgY29tcG9uZW50cyB0aGF0IG9ubHkgYmVsb25nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIyB0byBhIHBhcnRpY3VsYXIgRE9NIGVsZW1lbnQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgZXh0Lm9wdGlvbktleSBpcyBcImNvbXBvbmVudHNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHQuYWZ0ZXJBcHBTdGFydGVkIHNlbGVjdG9yLCBAXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHQuYWZ0ZXJBcHBTdGFydGVkKEApXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIEJhc2UudXRpbC5pc0Z1bmN0aW9uKGV4dC5hZnRlckFwcEluaXRpYWxpemVkKSBhbmQgZXh0LmFjdGl2YXRlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNiLmFkZCBleHQuYWZ0ZXJBcHBJbml0aWFsaXplZFxuXG4gICAgICAgICAgICAgICAgIyBDYWxsIHRoZSAuYWZ0ZXJBcHBJbml0aWFsaXplZCBjYWxsYmFja3Mgd2l0aCBAIGFzIHBhcmFtZXRlclxuICAgICAgICAgICAgICAgIGNiLmZpcmUgQFxuXG4gICAgICAgIGNyZWF0ZVNhbmRib3g6IChuYW1lLCBvcHRzKSAtPlxuICAgICAgICAgICAgQHNhbmRib3hlc1tuYW1lXSA9IEJhc2UudXRpbC5leHRlbmQge30sIEBzYW5kYm94LCBuYW1lIDogbmFtZVxuXG4gICAgICAgIGdldEluaXRpYWxpemVkQ29tcG9uZW50czogKCkgLT5cbiAgICAgICAgICAgIEBzYW5kYm94LmdldEluaXRpYWxpemVkQ29tcG9uZW50cygpXG5cblxuICAgIHJldHVybiBQZXN0bGVcbilcbiIsIi8qXHJcbiAqIENvb2tpZXMuanMgLSAxLjEuMFxyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vU2NvdHRIYW1wZXIvQ29va2llc1xyXG4gKlxyXG4gKiBUaGlzIGlzIGZyZWUgYW5kIHVuZW5jdW1iZXJlZCBzb2Z0d2FyZSByZWxlYXNlZCBpbnRvIHRoZSBwdWJsaWMgZG9tYWluLlxyXG4gKi9cclxuKGZ1bmN0aW9uIChnbG9iYWwsIHVuZGVmaW5lZCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIHZhciBmYWN0b3J5ID0gZnVuY3Rpb24gKHdpbmRvdykge1xyXG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93LmRvY3VtZW50ICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nvb2tpZXMuanMgcmVxdWlyZXMgYSBgd2luZG93YCB3aXRoIGEgYGRvY3VtZW50YCBvYmplY3QnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBDb29raWVzID0gZnVuY3Rpb24gKGtleSwgdmFsdWUsIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPT09IDEgP1xyXG4gICAgICAgICAgICAgICAgQ29va2llcy5nZXQoa2V5KSA6IENvb2tpZXMuc2V0KGtleSwgdmFsdWUsIG9wdGlvbnMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIEFsbG93cyBmb3Igc2V0dGVyIGluamVjdGlvbiBpbiB1bml0IHRlc3RzXHJcbiAgICAgICAgQ29va2llcy5fZG9jdW1lbnQgPSB3aW5kb3cuZG9jdW1lbnQ7XHJcblxyXG4gICAgICAgIC8vIFVzZWQgdG8gZW5zdXJlIGNvb2tpZSBrZXlzIGRvIG5vdCBjb2xsaWRlIHdpdGhcclxuICAgICAgICAvLyBidWlsdC1pbiBgT2JqZWN0YCBwcm9wZXJ0aWVzXHJcbiAgICAgICAgQ29va2llcy5fY2FjaGVLZXlQcmVmaXggPSAnY29va2V5Lic7IC8vIEh1cnIgaHVyciwgOilcclxuXHJcbiAgICAgICAgQ29va2llcy5kZWZhdWx0cyA9IHtcclxuICAgICAgICAgICAgcGF0aDogJy8nLFxyXG4gICAgICAgICAgICBzZWN1cmU6IGZhbHNlXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgQ29va2llcy5nZXQgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgIGlmIChDb29raWVzLl9jYWNoZWREb2N1bWVudENvb2tpZSAhPT0gQ29va2llcy5fZG9jdW1lbnQuY29va2llKSB7XHJcbiAgICAgICAgICAgICAgICBDb29raWVzLl9yZW5ld0NhY2hlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBDb29raWVzLl9jYWNoZVtDb29raWVzLl9jYWNoZUtleVByZWZpeCArIGtleV07XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgQ29va2llcy5zZXQgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSwgb3B0aW9ucykge1xyXG4gICAgICAgICAgICBvcHRpb25zID0gQ29va2llcy5fZ2V0RXh0ZW5kZWRPcHRpb25zKG9wdGlvbnMpO1xyXG4gICAgICAgICAgICBvcHRpb25zLmV4cGlyZXMgPSBDb29raWVzLl9nZXRFeHBpcmVzRGF0ZSh2YWx1ZSA9PT0gdW5kZWZpbmVkID8gLTEgOiBvcHRpb25zLmV4cGlyZXMpO1xyXG5cclxuICAgICAgICAgICAgQ29va2llcy5fZG9jdW1lbnQuY29va2llID0gQ29va2llcy5fZ2VuZXJhdGVDb29raWVTdHJpbmcoa2V5LCB2YWx1ZSwgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gQ29va2llcztcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBDb29raWVzLmV4cGlyZSA9IGZ1bmN0aW9uIChrZXksIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIENvb2tpZXMuc2V0KGtleSwgdW5kZWZpbmVkLCBvcHRpb25zKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBDb29raWVzLl9nZXRFeHRlbmRlZE9wdGlvbnMgPSBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgcGF0aDogb3B0aW9ucyAmJiBvcHRpb25zLnBhdGggfHwgQ29va2llcy5kZWZhdWx0cy5wYXRoLFxyXG4gICAgICAgICAgICAgICAgZG9tYWluOiBvcHRpb25zICYmIG9wdGlvbnMuZG9tYWluIHx8IENvb2tpZXMuZGVmYXVsdHMuZG9tYWluLFxyXG4gICAgICAgICAgICAgICAgZXhwaXJlczogb3B0aW9ucyAmJiBvcHRpb25zLmV4cGlyZXMgfHwgQ29va2llcy5kZWZhdWx0cy5leHBpcmVzLFxyXG4gICAgICAgICAgICAgICAgc2VjdXJlOiBvcHRpb25zICYmIG9wdGlvbnMuc2VjdXJlICE9PSB1bmRlZmluZWQgPyAgb3B0aW9ucy5zZWN1cmUgOiBDb29raWVzLmRlZmF1bHRzLnNlY3VyZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIENvb2tpZXMuX2lzVmFsaWREYXRlID0gZnVuY3Rpb24gKGRhdGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChkYXRlKSA9PT0gJ1tvYmplY3QgRGF0ZV0nICYmICFpc05hTihkYXRlLmdldFRpbWUoKSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgQ29va2llcy5fZ2V0RXhwaXJlc0RhdGUgPSBmdW5jdGlvbiAoZXhwaXJlcywgbm93KSB7XHJcbiAgICAgICAgICAgIG5vdyA9IG5vdyB8fCBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGVvZiBleHBpcmVzKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdudW1iZXInOiBleHBpcmVzID0gbmV3IERhdGUobm93LmdldFRpbWUoKSArIGV4cGlyZXMgKiAxMDAwKTsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdzdHJpbmcnOiBleHBpcmVzID0gbmV3IERhdGUoZXhwaXJlcyk7IGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZXhwaXJlcyAmJiAhQ29va2llcy5faXNWYWxpZERhdGUoZXhwaXJlcykpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignYGV4cGlyZXNgIHBhcmFtZXRlciBjYW5ub3QgYmUgY29udmVydGVkIHRvIGEgdmFsaWQgRGF0ZSBpbnN0YW5jZScpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZXhwaXJlcztcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBDb29raWVzLl9nZW5lcmF0ZUNvb2tpZVN0cmluZyA9IGZ1bmN0aW9uIChrZXksIHZhbHVlLCBvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIGtleSA9IGtleS5yZXBsYWNlKC9bXiMkJitcXF5gfF0vZywgZW5jb2RlVVJJQ29tcG9uZW50KTtcclxuICAgICAgICAgICAga2V5ID0ga2V5LnJlcGxhY2UoL1xcKC9nLCAnJTI4JykucmVwbGFjZSgvXFwpL2csICclMjknKTtcclxuICAgICAgICAgICAgdmFsdWUgPSAodmFsdWUgKyAnJykucmVwbGFjZSgvW14hIyQmLStcXC0tOjwtXFxbXFxdLX5dL2csIGVuY29kZVVSSUNvbXBvbmVudCk7XHJcbiAgICAgICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cclxuICAgICAgICAgICAgdmFyIGNvb2tpZVN0cmluZyA9IGtleSArICc9JyArIHZhbHVlO1xyXG4gICAgICAgICAgICBjb29raWVTdHJpbmcgKz0gb3B0aW9ucy5wYXRoID8gJztwYXRoPScgKyBvcHRpb25zLnBhdGggOiAnJztcclxuICAgICAgICAgICAgY29va2llU3RyaW5nICs9IG9wdGlvbnMuZG9tYWluID8gJztkb21haW49JyArIG9wdGlvbnMuZG9tYWluIDogJyc7XHJcbiAgICAgICAgICAgIGNvb2tpZVN0cmluZyArPSBvcHRpb25zLmV4cGlyZXMgPyAnO2V4cGlyZXM9JyArIG9wdGlvbnMuZXhwaXJlcy50b1VUQ1N0cmluZygpIDogJyc7XHJcbiAgICAgICAgICAgIGNvb2tpZVN0cmluZyArPSBvcHRpb25zLnNlY3VyZSA/ICc7c2VjdXJlJyA6ICcnO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNvb2tpZVN0cmluZztcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBDb29raWVzLl9nZXRDYWNoZUZyb21TdHJpbmcgPSBmdW5jdGlvbiAoZG9jdW1lbnRDb29raWUpIHtcclxuICAgICAgICAgICAgdmFyIGNvb2tpZUNhY2hlID0ge307XHJcbiAgICAgICAgICAgIHZhciBjb29raWVzQXJyYXkgPSBkb2N1bWVudENvb2tpZSA/IGRvY3VtZW50Q29va2llLnNwbGl0KCc7ICcpIDogW107XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvb2tpZXNBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvb2tpZUt2cCA9IENvb2tpZXMuX2dldEtleVZhbHVlUGFpckZyb21Db29raWVTdHJpbmcoY29va2llc0FycmF5W2ldKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY29va2llQ2FjaGVbQ29va2llcy5fY2FjaGVLZXlQcmVmaXggKyBjb29raWVLdnAua2V5XSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29va2llQ2FjaGVbQ29va2llcy5fY2FjaGVLZXlQcmVmaXggKyBjb29raWVLdnAua2V5XSA9IGNvb2tpZUt2cC52YWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNvb2tpZUNhY2hlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIENvb2tpZXMuX2dldEtleVZhbHVlUGFpckZyb21Db29raWVTdHJpbmcgPSBmdW5jdGlvbiAoY29va2llU3RyaW5nKSB7XHJcbiAgICAgICAgICAgIC8vIFwiPVwiIGlzIGEgdmFsaWQgY2hhcmFjdGVyIGluIGEgY29va2llIHZhbHVlIGFjY29yZGluZyB0byBSRkM2MjY1LCBzbyBjYW5ub3QgYHNwbGl0KCc9JylgXHJcbiAgICAgICAgICAgIHZhciBzZXBhcmF0b3JJbmRleCA9IGNvb2tpZVN0cmluZy5pbmRleE9mKCc9Jyk7XHJcblxyXG4gICAgICAgICAgICAvLyBJRSBvbWl0cyB0aGUgXCI9XCIgd2hlbiB0aGUgY29va2llIHZhbHVlIGlzIGFuIGVtcHR5IHN0cmluZ1xyXG4gICAgICAgICAgICBzZXBhcmF0b3JJbmRleCA9IHNlcGFyYXRvckluZGV4IDwgMCA/IGNvb2tpZVN0cmluZy5sZW5ndGggOiBzZXBhcmF0b3JJbmRleDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBrZXk6IGRlY29kZVVSSUNvbXBvbmVudChjb29raWVTdHJpbmcuc3Vic3RyKDAsIHNlcGFyYXRvckluZGV4KSksXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogZGVjb2RlVVJJQ29tcG9uZW50KGNvb2tpZVN0cmluZy5zdWJzdHIoc2VwYXJhdG9ySW5kZXggKyAxKSlcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBDb29raWVzLl9yZW5ld0NhY2hlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBDb29raWVzLl9jYWNoZSA9IENvb2tpZXMuX2dldENhY2hlRnJvbVN0cmluZyhDb29raWVzLl9kb2N1bWVudC5jb29raWUpO1xyXG4gICAgICAgICAgICBDb29raWVzLl9jYWNoZWREb2N1bWVudENvb2tpZSA9IENvb2tpZXMuX2RvY3VtZW50LmNvb2tpZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBDb29raWVzLl9hcmVFbmFibGVkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgdGVzdEtleSA9ICdjb29raWVzLmpzJztcclxuICAgICAgICAgICAgdmFyIGFyZUVuYWJsZWQgPSBDb29raWVzLnNldCh0ZXN0S2V5LCAxKS5nZXQodGVzdEtleSkgPT09ICcxJztcclxuICAgICAgICAgICAgQ29va2llcy5leHBpcmUodGVzdEtleSk7XHJcbiAgICAgICAgICAgIHJldHVybiBhcmVFbmFibGVkO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIENvb2tpZXMuZW5hYmxlZCA9IENvb2tpZXMuX2FyZUVuYWJsZWQoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIENvb2tpZXM7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBjb29raWVzRXhwb3J0ID0gdHlwZW9mIGdsb2JhbC5kb2N1bWVudCA9PT0gJ29iamVjdCcgPyBmYWN0b3J5KGdsb2JhbCkgOiBmYWN0b3J5O1xyXG5cclxuICAgIC8vIEFNRCBzdXBwb3J0XHJcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XHJcbiAgICAgICAgZGVmaW5lKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvb2tpZXNFeHBvcnQ7IH0pO1xyXG4gICAgLy8gQ29tbW9uSlMvTm9kZS5qcyBzdXBwb3J0XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIC8vIFN1cHBvcnQgTm9kZS5qcyBzcGVjaWZpYyBgbW9kdWxlLmV4cG9ydHNgICh3aGljaCBjYW4gYmUgYSBmdW5jdGlvbilcclxuICAgICAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBjb29raWVzRXhwb3J0O1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBCdXQgYWx3YXlzIHN1cHBvcnQgQ29tbW9uSlMgbW9kdWxlIDEuMS4xIHNwZWMgKGBleHBvcnRzYCBjYW5ub3QgYmUgYSBmdW5jdGlvbilcclxuICAgICAgICBleHBvcnRzLkNvb2tpZXMgPSBjb29raWVzRXhwb3J0O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBnbG9iYWwuQ29va2llcyA9IGNvb2tpZXNFeHBvcnQ7XHJcbiAgICB9XHJcbn0pKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnID8gdGhpcyA6IHdpbmRvdyk7IiwiO1xuKGZ1bmN0aW9uKHdpbmRvdywgZG9jdW1lbnQpIHtcblxuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIHZhciBkZWZhdWx0V2lkdGhzLCBnZXRLZXlzLCBuZXh0VGljaywgYWRkRXZlbnQsIGdldE5hdHVyYWxXaWR0aDtcblxuICAgIG5leHRUaWNrID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgIHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBhcHBseUVhY2goY29sbGVjdGlvbiwgY2FsbGJhY2tFYWNoKSB7XG4gICAgICAgIHZhciBpID0gMCxcbiAgICAgICAgICAgIGxlbmd0aCA9IGNvbGxlY3Rpb24ubGVuZ3RoLFxuICAgICAgICAgICAgbmV3X2NvbGxlY3Rpb24gPSBbXTtcblxuICAgICAgICBmb3IgKDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBuZXdfY29sbGVjdGlvbltpXSA9IGNhbGxiYWNrRWFjaChjb2xsZWN0aW9uW2ldLCBpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXdfY29sbGVjdGlvbjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXR1cm5EaXJlY3RWYWx1ZSh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0TmF0dXJhbFdpZHRoID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpLCAnbmF0dXJhbFdpZHRoJykpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbihpbWFnZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpbWFnZS5uYXR1cmFsV2lkdGg7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIC8vIElFOCBhbmQgYmVsb3cgbGFja3MgdGhlIG5hdHVyYWxXaWR0aCBwcm9wZXJ0eVxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc291cmNlKSB7XG4gICAgICAgICAgICB2YXIgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgICAgICBpbWcuc3JjID0gc291cmNlLnNyYztcbiAgICAgICAgICAgIHJldHVybiBpbWcud2lkdGg7XG4gICAgICAgIH07XG4gICAgfSkoKTtcblxuICAgIGFkZEV2ZW50ID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGFkZFN0YW5kYXJkRXZlbnRMaXN0ZW5lcihlbCwgZXZlbnROYW1lLCBmbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZm4sIGZhbHNlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gYWRkSUVFdmVudExpc3RlbmVyKGVsLCBldmVudE5hbWUsIGZuKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsLmF0dGFjaEV2ZW50KCdvbicgKyBldmVudE5hbWUsIGZuKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9KSgpO1xuXG4gICAgZGVmYXVsdFdpZHRocyA9IFs5NiwgMTMwLCAxNjUsIDIwMCwgMjM1LCAyNzAsIDMwNCwgMzQwLCAzNzUsIDQxMCwgNDQ1LCA0ODUsIDUyMCwgNTU1LCA1OTAsIDYyNSwgNjYwLCA2OTUsIDczNl07XG5cbiAgICBnZXRLZXlzID0gdHlwZW9mIE9iamVjdC5rZXlzID09PSAnZnVuY3Rpb24nID8gT2JqZWN0LmtleXMgOiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICAgICAgdmFyIGtleXMgPSBbXSxcbiAgICAgICAgICAgIGtleTtcblxuICAgICAgICBmb3IgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICAgIGtleXMucHVzaChrZXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGtleXM7XG4gICAgfTtcblxuXG4gICAgLypcbiAgICAgICAgQ29uc3RydWN0IGEgbmV3IEltYWdlciBpbnN0YW5jZSwgcGFzc2luZyBhbiBvcHRpb25hbCBjb25maWd1cmF0aW9uIG9iamVjdC5cblxuICAgICAgICBFeGFtcGxlIHVzYWdlOlxuXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gQXZhaWxhYmxlIHdpZHRocyBmb3IgeW91ciBpbWFnZXNcbiAgICAgICAgICAgICAgICBhdmFpbGFibGVXaWR0aHM6IFtOdW1iZXJdLFxuXG4gICAgICAgICAgICAgICAgLy8gU2VsZWN0b3IgdG8gYmUgdXNlZCB0byBsb2NhdGUgeW91ciBkaXYgcGxhY2Vob2xkZXJzXG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICcnLFxuXG4gICAgICAgICAgICAgICAgLy8gQ2xhc3MgbmFtZSB0byBnaXZlIHlvdXIgcmVzaXphYmxlIGltYWdlc1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJycsXG5cbiAgICAgICAgICAgICAgICAvLyBJZiBzZXQgdG8gdHJ1ZSwgSW1hZ2VyIHdpbGwgdXBkYXRlIHRoZSBzcmMgYXR0cmlidXRlIG9mIHRoZSByZWxldmFudCBpbWFnZXNcbiAgICAgICAgICAgICAgICBvblJlc2l6ZTogQm9vbGVhbixcblxuICAgICAgICAgICAgICAgIC8vIFRvZ2dsZSB0aGUgbGF6eSBsb2FkIGZ1bmN0aW9uYWxpdHkgb24gb3Igb2ZmXG4gICAgICAgICAgICAgICAgbGF6eWxvYWQ6IEJvb2xlYW4sXG5cbiAgICAgICAgICAgICAgICAvLyBVc2VkIGFsb25nc2lkZSB0aGUgbGF6eWxvYWQgZmVhdHVyZSAoaGVscHMgcGVyZm9ybWFuY2UgYnkgc2V0dGluZyBhIGhpZ2hlciBkZWxheSlcbiAgICAgICAgICAgICAgICBzY3JvbGxEZWxheTogTnVtYmVyXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgQHBhcmFtIHtvYmplY3R9IGNvbmZpZ3VyYXRpb24gc2V0dGluZ3NcbiAgICAgICAgQHJldHVybiB7b2JqZWN0fSBpbnN0YW5jZSBvZiBJbWFnZXJcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBJbWFnZXIoZWxlbWVudHMsIG9wdHMpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICAgICAgZG9jID0gZG9jdW1lbnQ7XG5cbiAgICAgICAgb3B0cyA9IG9wdHMgfHwge307XG5cbiAgICAgICAgaWYgKGVsZW1lbnRzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIGZpcnN0IGFyZ3VtZW50IGlzIHNlbGVjdG9yIHN0cmluZ1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBlbGVtZW50cyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBvcHRzLnNlbGVjdG9yID0gZWxlbWVudHM7XG4gICAgICAgICAgICAgICAgZWxlbWVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGZpcnN0IGFyZ3VtZW50IGlzIHRoZSBgb3B0c2Agb2JqZWN0LCBgZWxlbWVudHNgIGlzIGltcGxpY2l0bHkgdGhlIGBvcHRzLnNlbGVjdG9yYCBzdHJpbmdcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBlbGVtZW50cy5sZW5ndGggPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgb3B0cyA9IGVsZW1lbnRzO1xuICAgICAgICAgICAgICAgIGVsZW1lbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbWFnZXNPZmZTY3JlZW4gPSBbXTtcbiAgICAgICAgdGhpcy52aWV3cG9ydEhlaWdodCA9IGRvYy5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgICB0aGlzLnNlbGVjdG9yID0gb3B0cy5zZWxlY3RvciB8fCAnLmRlbGF5ZWQtaW1hZ2UtbG9hZCc7XG4gICAgICAgIHRoaXMuY2xhc3NOYW1lID0gb3B0cy5jbGFzc05hbWUgfHwgJ2ltYWdlLXJlcGxhY2UnO1xuICAgICAgICB0aGlzLmdpZiA9IGRvYy5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgdGhpcy5naWYuc3JjID0gJ2RhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaEVBQUpBSUFBQVAvLy93QUFBQ0g1QkFFQUFBQUFMQUFBQUFBUUFBa0FBQUlLaEkrcHkrMFBvNXlVRlFBNyc7XG4gICAgICAgIHRoaXMuZ2lmLmNsYXNzTmFtZSA9IHRoaXMuY2xhc3NOYW1lO1xuICAgICAgICB0aGlzLmdpZi5hbHQgPSAnJztcbiAgICAgICAgdGhpcy5zY3JvbGxEZWxheSA9IG9wdHMuc2Nyb2xsRGVsYXkgfHwgMjUwO1xuICAgICAgICB0aGlzLm9uUmVzaXplID0gb3B0cy5oYXNPd25Qcm9wZXJ0eSgnb25SZXNpemUnKSA/IG9wdHMub25SZXNpemUgOiB0cnVlO1xuICAgICAgICB0aGlzLmxhenlsb2FkID0gb3B0cy5oYXNPd25Qcm9wZXJ0eSgnbGF6eWxvYWQnKSA/IG9wdHMubGF6eWxvYWQgOiBmYWxzZTtcbiAgICAgICAgdGhpcy5zY3JvbGxlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmF2YWlsYWJsZVBpeGVsUmF0aW9zID0gb3B0cy5hdmFpbGFibGVQaXhlbFJhdGlvcyB8fCBbMSwgMl07XG4gICAgICAgIHRoaXMuYXZhaWxhYmxlV2lkdGhzID0gb3B0cy5hdmFpbGFibGVXaWR0aHMgfHwgZGVmYXVsdFdpZHRocztcbiAgICAgICAgdGhpcy5vbkltYWdlc1JlcGxhY2VkID0gb3B0cy5vbkltYWdlc1JlcGxhY2VkIHx8IGZ1bmN0aW9uKCkge307XG4gICAgICAgIHRoaXMud2lkdGhzTWFwID0ge307XG4gICAgICAgIHRoaXMucmVmcmVzaFBpeGVsUmF0aW8oKTtcbiAgICAgICAgdGhpcy53aWR0aEludGVycG9sYXRvciA9IG9wdHMud2lkdGhJbnRlcnBvbGF0b3IgfHwgcmV0dXJuRGlyZWN0VmFsdWU7XG4gICAgICAgIHRoaXMuZGVsdGFTcXVhcmUgPSBvcHRzLmRlbHRhU3F1YXJlIHx8IDEuNTtcbiAgICAgICAgdGhpcy5zcXVhcmVTZWxlY3RvciA9IG9wdHMuc3F1YXJlU2VsZWN0b3IgfHwgJ3NxcmNyb3AnO1xuICAgICAgICB0aGlzLmFkYXB0U2VsZWN0b3IgPSB0aGlzLmFkYXB0U2VsZWN0b3IgfHwgJ2FkYXB0JztcbiAgICAgICAgdGhpcy5hbGxvd2VkRXh0ZW5zaW9ucyA9IFtcImpwZ1wiLFwiYm1wXCIsXCJwbmdcIixcImpwZWdcIl07XG5cbiAgICAgICAgLy8gTmVlZGVkIGFzIElFOCBhZGRzIGEgZGVmYXVsdCBgd2lkdGhgL2BoZWlnaHRgIGF0dHJpYnV0ZeKAplxuICAgICAgICB0aGlzLmdpZi5yZW1vdmVBdHRyaWJ1dGUoJ2hlaWdodCcpO1xuICAgICAgICB0aGlzLmdpZi5yZW1vdmVBdHRyaWJ1dGUoJ3dpZHRoJyk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmF2YWlsYWJsZVdpZHRocyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmF2YWlsYWJsZVdpZHRocy5sZW5ndGggPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53aWR0aHNNYXAgPSBJbWFnZXIuY3JlYXRlV2lkdGhzTWFwKHRoaXMuYXZhaWxhYmxlV2lkdGhzLCB0aGlzLndpZHRoSW50ZXJwb2xhdG9yKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy53aWR0aHNNYXAgPSB0aGlzLmF2YWlsYWJsZVdpZHRocztcbiAgICAgICAgICAgICAgICB0aGlzLmF2YWlsYWJsZVdpZHRocyA9IGdldEtleXModGhpcy5hdmFpbGFibGVXaWR0aHMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmF2YWlsYWJsZVdpZHRocyA9IHRoaXMuYXZhaWxhYmxlV2lkdGhzLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICAgICAgICAgIHJldHVybiBhIC0gYjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cblxuXG4gICAgICAgIGlmIChlbGVtZW50cykge1xuICAgICAgICAgICAgdGhpcy5kaXZzID0gYXBwbHlFYWNoKGVsZW1lbnRzLCByZXR1cm5EaXJlY3RWYWx1ZSk7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdG9yID0gbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGl2cyA9IGFwcGx5RWFjaChkb2MucXVlcnlTZWxlY3RvckFsbCh0aGlzLnNlbGVjdG9yKSwgcmV0dXJuRGlyZWN0VmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jaGFuZ2VEaXZzVG9FbXB0eUltYWdlcygpO1xuXG4gICAgICAgIG5leHRUaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2VsZi5pbml0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIEltYWdlci5wcm90b3R5cGUuc2Nyb2xsQ2hlY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsZWQpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pbWFnZXNPZmZTY3JlZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZGl2cyA9IHRoaXMuaW1hZ2VzT2ZmU2NyZWVuLnNsaWNlKDApOyAvLyBjb3B5IGJ5IHZhbHVlLCBkb24ndCBjb3B5IGJ5IHJlZmVyZW5jZVxuICAgICAgICAgICAgdGhpcy5pbWFnZXNPZmZTY3JlZW4ubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGl2c1RvRW1wdHlJbWFnZXMoKTtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBJbWFnZXIucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgIHRoaXMuY2hlY2tJbWFnZXNOZWVkUmVwbGFjaW5nKHRoaXMuZGl2cyk7XG5cbiAgICAgICAgaWYgKHRoaXMub25SZXNpemUpIHtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJSZXNpemVFdmVudCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubGF6eWxvYWQpIHtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJTY3JvbGxFdmVudCgpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIEltYWdlci5wcm90b3R5cGUuY3JlYXRlR2lmID0gZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgICAvLyBpZiB0aGUgZWxlbWVudCBpcyBhbHJlYWR5IGEgcmVzcG9uc2l2ZSBpbWFnZSB0aGVuIHdlIGRvbid0IHJlcGxhY2UgaXQgYWdhaW5cbiAgICAgICAgaWYgKGVsZW1lbnQuY2xhc3NOYW1lLm1hdGNoKG5ldyBSZWdFeHAoJyhefCApJyArIHRoaXMuY2xhc3NOYW1lICsgJyggfCQpJykpKSB7XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBlbGVtZW50Q2xhc3NOYW1lID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2xhc3MnKTtcbiAgICAgICAgdmFyIGVsZW1lbnRXaWR0aCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXdpZHRoJyk7XG4gICAgICAgIHZhciBnaWYgPSB0aGlzLmdpZi5jbG9uZU5vZGUoZmFsc2UpO1xuXG4gICAgICAgIGlmIChlbGVtZW50V2lkdGgpIHtcbiAgICAgICAgICAgIGdpZi53aWR0aCA9IGVsZW1lbnRXaWR0aDtcbiAgICAgICAgICAgIGdpZi5zZXRBdHRyaWJ1dGUoJ2RhdGEtd2lkdGgnLCBlbGVtZW50V2lkdGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2lmLmNsYXNzTmFtZSA9IChlbGVtZW50Q2xhc3NOYW1lID8gZWxlbWVudENsYXNzTmFtZSArICcgJyA6ICcnKSArIHRoaXMuY2xhc3NOYW1lO1xuICAgICAgICBnaWYuc2V0QXR0cmlidXRlKCdkYXRhLXNyYycsIGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXNyYycpKTtcbiAgICAgICAgZ2lmLnNldEF0dHJpYnV0ZSgnYWx0JywgZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYWx0JykgfHwgdGhpcy5naWYuYWx0KTtcbiAgICAgICAgZ2lmLnNldEF0dHJpYnV0ZSgnaXRlbXByb3AnLCBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1pdGVtcHJvcCcpIHx8IFwiY29udGVudFVybFwiKTtcblxuICAgICAgICAvLyBDaGVjayBpZiB0aGUgZGF0YS10aXRsZSBhdHRyaWJ1dGUgaXMgdGhlcmVcbiAgICAgICAgdmFyIHRpdGxlVGV4dCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXRpdGxlJyk7XG4gICAgICAgIGlmICh0aXRsZVRleHQpIHtcbiAgICAgICAgICAgIGdpZi5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGl0bGVUZXh0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVsZW1lbnQucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoZ2lmLCBlbGVtZW50KTtcblxuICAgICAgICByZXR1cm4gZ2lmO1xuICAgIH07XG5cbiAgICBJbWFnZXIucHJvdG90eXBlLmNoYW5nZURpdnNUb0VtcHR5SW1hZ2VzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICBhcHBseUVhY2godGhpcy5kaXZzLCBmdW5jdGlvbihlbGVtZW50LCBpKSB7XG4gICAgICAgICAgICBpZiAoc2VsZi5sYXp5bG9hZCkge1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLmlzVGhpc0VsZW1lbnRPblNjcmVlbihlbGVtZW50KSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmRpdnNbaV0gPSBzZWxmLmNyZWF0ZUdpZihlbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmltYWdlc09mZlNjcmVlbi5wdXNoKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi5kaXZzW2ldID0gc2VsZi5jcmVhdGVHaWYoZWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLmluaXRpYWxpemVkKSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrSW1hZ2VzTmVlZFJlcGxhY2luZyh0aGlzLmRpdnMpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIEltYWdlci5wcm90b3R5cGUuaXNUaGlzRWxlbWVudE9uU2NyZWVuID0gZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgICAvLyBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCB3YXMgd29ya2luZyBpbiBDaHJvbWUgYnV0IGRpZG4ndCB3b3JrIG9uIEZpcmVmb3gsIHNvIGhhZCB0byByZXNvcnQgdG8gd2luZG93LnBhZ2VZT2Zmc2V0XG4gICAgICAgIC8vIGJ1dCBjYW4ndCBmYWxsYmFjayB0byBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCBhcyB0aGF0IGRvZXNuJ3Qgd29yayBpbiBJRSB3aXRoIGEgZG9jdHlwZSAoPykgc28gaGF2ZSB0byB1c2UgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcFxuICAgICAgICB2YXIgb2Zmc2V0ID0gSW1hZ2VyLmdldFBhZ2VPZmZzZXQoKTtcbiAgICAgICAgdmFyIGVsZW1lbnRPZmZzZXRUb3AgPSAwO1xuXG4gICAgICAgIGlmIChlbGVtZW50Lm9mZnNldFBhcmVudCkge1xuICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgIGVsZW1lbnRPZmZzZXRUb3AgKz0gZWxlbWVudC5vZmZzZXRUb3A7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aGlsZSAoZWxlbWVudCA9IGVsZW1lbnQub2Zmc2V0UGFyZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoZWxlbWVudE9mZnNldFRvcCA8ICh0aGlzLnZpZXdwb3J0SGVpZ2h0ICsgb2Zmc2V0KSkgPyB0cnVlIDogZmFsc2U7XG4gICAgfTtcblxuICAgIEltYWdlci5wcm90b3R5cGUuY2hlY2tJbWFnZXNOZWVkUmVwbGFjaW5nID0gZnVuY3Rpb24oaW1hZ2VzKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICBpZiAoIXRoaXMuaXNSZXNpemluZykge1xuICAgICAgICAgICAgdGhpcy5pc1Jlc2l6aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaFBpeGVsUmF0aW8oKTtcblxuICAgICAgICAgICAgYXBwbHlFYWNoKGltYWdlcywgZnVuY3Rpb24oaW1hZ2UpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnJlcGxhY2VJbWFnZXNCYXNlZE9uU2NyZWVuRGltZW5zaW9ucyhpbWFnZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5pc1Jlc2l6aW5nID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLm9uSW1hZ2VzUmVwbGFjZWQoaW1hZ2VzKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBJbWFnZXIucHJvdG90eXBlLnJlcGxhY2VJbWFnZXNCYXNlZE9uU2NyZWVuRGltZW5zaW9ucyA9IGZ1bmN0aW9uKGltYWdlKSB7XG4gICAgICAgIHZhciBjb21wdXRlZFdpZHRoLCBzcmMsIG5hdHVyYWxXaWR0aDtcblxuICAgICAgICBuYXR1cmFsV2lkdGggPSBnZXROYXR1cmFsV2lkdGgoaW1hZ2UpO1xuICAgICAgICBjb21wdXRlZFdpZHRoID0gdHlwZW9mIHRoaXMuYXZhaWxhYmxlV2lkdGhzID09PSAnZnVuY3Rpb24nID8gdGhpcy5hdmFpbGFibGVXaWR0aHMoaW1hZ2UpIDogdGhpcy5kZXRlcm1pbmVBcHByb3ByaWF0ZVJlc29sdXRpb24oaW1hZ2UpO1xuXG4gICAgICAgIGltYWdlLndpZHRoID0gY29tcHV0ZWRXaWR0aDtcblxuICAgICAgICBpZiAoaW1hZ2Uuc3JjICE9PSB0aGlzLmdpZi5zcmMgJiYgY29tcHV0ZWRXaWR0aCA8PSBuYXR1cmFsV2lkdGgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzRXh0ZW5zaW9uQWxsb3dlZChpbWFnZSkpIHtcbiAgICAgICAgICAgIHNyYyA9IHRoaXMuY2hhbmdlSW1hZ2VTcmNUb1VzZU5ld0ltYWdlRGltZW5zaW9ucyh0aGlzLmJ1aWxkVXJsU3RydWN0dXJlKGltYWdlLmdldEF0dHJpYnV0ZSgnZGF0YS1zcmMnKSwgaW1hZ2UpLCBjb21wdXRlZFdpZHRoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNyYyA9IHRoaXMucmVtb3ZlTW9kaWZpZXJzZnJvbUltYWdlU3JjKGltYWdlLmdldEF0dHJpYnV0ZSgnZGF0YS1zcmMnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpbWFnZS5zcmMgPSBzcmM7XG4gICAgfTtcblxuICAgIEltYWdlci5wcm90b3R5cGUucmVtb3ZlTW9kaWZpZXJzZnJvbUltYWdlU3JjID0gZnVuY3Rpb24oc3JjKSB7XG4gICAgICAgIHZhciByZWdFeHAgPSBuZXcgUmVnRXhwKFwiXFxcXC97d2lkdGh9XFxcXC97cGl4ZWxfcmF0aW99XCIsIFwiZ1wiKTtcbiAgICAgICAgcmV0dXJuIHNyYy5yZXBsYWNlKHJlZ0V4cCwgJycpO1xuICAgIH07XG5cbiAgICBJbWFnZXIucHJvdG90eXBlLmlzRXh0ZW5zaW9uQWxsb3dlZCA9IGZ1bmN0aW9uKGltYWdlKSB7XG4gICAgICAgIHZhciBpbWFnZUV4dGVuc2lvbiA9IHRoaXMuZ2V0SW1hZ2VFeHRlbnNpb24oaW1hZ2UpO1xuICAgICAgICByZXR1cm4gaW1hZ2VFeHRlbnNpb24gPyB0aGlzLmFsbG93ZWRFeHRlbnNpb25zLmluZGV4T2YoaW1hZ2VFeHRlbnNpb24udG9Mb3dlckNhc2UoKSkgPiAtMSA6IGZhbHNlO1xuICAgIH07XG5cbiAgICBJbWFnZXIucHJvdG90eXBlLmdldEltYWdlRXh0ZW5zaW9uID0gZnVuY3Rpb24oaW1hZ2UpIHtcbiAgICAgICAgdmFyIHJlZ0V4cCA9IG5ldyBSZWdFeHAoXCJcXFxcLy4qXFxcXC4oLiopXFxcXC97d2lkdGh9XFxcXC97cGl4ZWxfcmF0aW99P1wiLCBcImdpXCIpO1xuICAgICAgICB2YXIgbWF0Y2ggPSByZWdFeHAuZXhlYyhpbWFnZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJykpO1xuICAgICAgICByZXR1cm4gbWF0Y2ggPyBtYXRjaFsxXSA6IFwiXCI7XG4gICAgfTtcblxuICAgIEltYWdlci5wcm90b3R5cGUuZGV0ZXJtaW5lQXBwcm9wcmlhdGVSZXNvbHV0aW9uID0gZnVuY3Rpb24oaW1hZ2UpIHtcbiAgICAgICAgcmV0dXJuIEltYWdlci5nZXRDbG9zZXN0VmFsdWUoaW1hZ2UuZ2V0QXR0cmlidXRlKCdkYXRhLXdpZHRoJykgfHwgaW1hZ2UucGFyZW50Tm9kZS5jbGllbnRXaWR0aCwgdGhpcy5hdmFpbGFibGVXaWR0aHMpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSBkZXZpY2UgcGl4ZWwgcmF0aW8gdmFsdWUgdXNlZCBieSBJbWFnZXJcbiAgICAgKlxuICAgICAqIEl0IGlzIHBlcmZvcm1lZCBiZWZvcmUgZWFjaCByZXBsYWNlbWVudCBsb29wLCBpbiBjYXNlIGEgdXNlciB6b29tZWQgaW4vb3V0XG4gICAgICogYW5kIHRodXMgdXBkYXRlZCB0aGUgYHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvYCB2YWx1ZS5cbiAgICAgKlxuICAgICAqIEBhcGlcbiAgICAgKiBAc2luY2UgMS4wLjFcbiAgICAgKi9cbiAgICBJbWFnZXIucHJvdG90eXBlLnJlZnJlc2hQaXhlbFJhdGlvID0gZnVuY3Rpb24gcmVmcmVzaFBpeGVsUmF0aW8oKSB7XG4gICAgICAgIHRoaXMuZGV2aWNlUGl4ZWxSYXRpbyA9IEltYWdlci5nZXRDbG9zZXN0VmFsdWUoSW1hZ2VyLmdldFBpeGVsUmF0aW8oKSwgdGhpcy5hdmFpbGFibGVQaXhlbFJhdGlvcyk7XG4gICAgfTtcblxuICAgIEltYWdlci5wcm90b3R5cGUuY2hhbmdlSW1hZ2VTcmNUb1VzZU5ld0ltYWdlRGltZW5zaW9ucyA9IGZ1bmN0aW9uKHNyYywgc2VsZWN0ZWRXaWR0aCkge1xuICAgICAgICByZXR1cm4gc3JjXG4gICAgICAgICAgICAucmVwbGFjZSgve3dpZHRofS9nLCBJbWFnZXIudHJhbnNmb3Jtcy53aWR0aChzZWxlY3RlZFdpZHRoLCB0aGlzLndpZHRoc01hcCkpXG4gICAgICAgICAgICAucmVwbGFjZSgve3BpeGVsX3JhdGlvfS9nLCBJbWFnZXIudHJhbnNmb3Jtcy5waXhlbFJhdGlvKHRoaXMuZGV2aWNlUGl4ZWxSYXRpbykpO1xuICAgIH07XG5cbiAgICBJbWFnZXIucHJvdG90eXBlLmJ1aWxkVXJsU3RydWN0dXJlID0gZnVuY3Rpb24oc3JjLCBpbWFnZSkge1xuICAgICAgICB2YXIgc3F1YXJlU2VsZWN0b3IgPSB0aGlzLmlzSW1hZ2VDb250YWluZXJTcXVhcmUoaW1hZ2UpID8gJy4nICsgdGhpcy5zcXVhcmVTZWxlY3RvciA6ICcnO1xuXG4gICAgICAgIHZhciByZWdFeHAgPSBuZXcgUmVnRXhwKFwiXFxcXC4oXCIgKyB0aGlzLmFsbG93ZWRFeHRlbnNpb25zLmpvaW4oXCJ8XCIpICArIFwiKVxcXFwvKHt3aWR0aH0pXFxcXC8oe3BpeGVsX3JhdGlvfSk/XCIsIFwiZ2lcIik7XG5cbiAgICAgICAgcmV0dXJuIHNyYy5yZXBsYWNlKHJlZ0V4cCwgJy4nICsgdGhpcy5hZGFwdFNlbGVjdG9yICsgJy4kMi4kMycgKyBzcXVhcmVTZWxlY3RvciArICcuJDEnKTtcbiAgICB9O1xuXG4gICAgSW1hZ2VyLnByb3RvdHlwZS5pc0ltYWdlQ29udGFpbmVyU3F1YXJlID0gZnVuY3Rpb24oaW1hZ2UpIHtcbiAgICAgICAgcmV0dXJuIChpbWFnZS5wYXJlbnROb2RlLmNsaWVudFdpZHRoIC8gaW1hZ2UucGFyZW50Tm9kZS5jbGllbnRIZWlnaHQpIDw9IHRoaXMuZGVsdGFTcXVhcmVcbiAgICB9O1xuXG4gICAgSW1hZ2VyLmdldFBpeGVsUmF0aW8gPSBmdW5jdGlvbiBnZXRQaXhlbFJhdGlvKGNvbnRleHQpIHtcbiAgICAgICAgcmV0dXJuIChjb250ZXh0IHx8IHdpbmRvdylbJ2RldmljZVBpeGVsUmF0aW8nXSB8fCAxO1xuICAgIH07XG5cbiAgICBJbWFnZXIuY3JlYXRlV2lkdGhzTWFwID0gZnVuY3Rpb24gY3JlYXRlV2lkdGhzTWFwKHdpZHRocywgaW50ZXJwb2xhdG9yKSB7XG4gICAgICAgIHZhciBtYXAgPSB7fSxcbiAgICAgICAgICAgIGkgPSB3aWR0aHMubGVuZ3RoO1xuXG4gICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgIG1hcFt3aWR0aHNbaV1dID0gaW50ZXJwb2xhdG9yKHdpZHRoc1tpXSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbWFwO1xuICAgIH07XG5cbiAgICBJbWFnZXIudHJhbnNmb3JtcyA9IHtcbiAgICAgICAgcGl4ZWxSYXRpbzogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgd2lkdGg6IGZ1bmN0aW9uKHdpZHRoLCBtYXApIHtcbiAgICAgICAgICAgIHJldHVybiBtYXBbd2lkdGhdIHx8IHdpZHRoO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGNsb3Nlc3QgdXBwZXIgdmFsdWUuXG4gICAgICpcbiAgICAgKiBgYGBqc1xuICAgICAqIHZhciBjYW5kaWRhdGVzID0gWzEsIDEuNSwgMl07XG4gICAgICpcbiAgICAgKiBJbWFnZXIuZ2V0Q2xvc2VzdFZhbHVlKDAuOCwgY2FuZGlkYXRlcyk7IC8vIC0+IDFcbiAgICAgKiBJbWFnZXIuZ2V0Q2xvc2VzdFZhbHVlKDEsIGNhbmRpZGF0ZXMpOyAvLyAtPiAxXG4gICAgICogSW1hZ2VyLmdldENsb3Nlc3RWYWx1ZSgxLjMsIGNhbmRpZGF0ZXMpOyAvLyAtPiAxLjVcbiAgICAgKiBJbWFnZXIuZ2V0Q2xvc2VzdFZhbHVlKDMsIGNhbmRpZGF0ZXMpOyAvLyAtPiAyXG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBAYXBpXG4gICAgICogQHNpbmNlIDEuMC4xXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGJhc2VWYWx1ZVxuICAgICAqIEBwYXJhbSB7QXJyYXkuPE51bWJlcj59IGNhbmRpZGF0ZXNcbiAgICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgICAqL1xuICAgIEltYWdlci5nZXRDbG9zZXN0VmFsdWUgPSBmdW5jdGlvbiBnZXRDbG9zZXN0VmFsdWUoYmFzZVZhbHVlLCBjYW5kaWRhdGVzKSB7XG4gICAgICAgIHZhciBpID0gY2FuZGlkYXRlcy5sZW5ndGgsXG4gICAgICAgICAgICBzZWxlY3RlZFdpZHRoID0gY2FuZGlkYXRlc1tpIC0gMV07XG5cbiAgICAgICAgYmFzZVZhbHVlID0gcGFyc2VGbG9hdChiYXNlVmFsdWUsIDEwKTtcblxuICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICBpZiAoYmFzZVZhbHVlIDw9IGNhbmRpZGF0ZXNbaV0pIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFdpZHRoID0gY2FuZGlkYXRlc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZWxlY3RlZFdpZHRoO1xuICAgIH07XG5cbiAgICBJbWFnZXIucHJvdG90eXBlLnJlZ2lzdGVyUmVzaXplRXZlbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIGFkZEV2ZW50KHdpbmRvdywgJ3Jlc2l6ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2VsZi5jaGVja0ltYWdlc05lZWRSZXBsYWNpbmcoc2VsZi5kaXZzKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIEltYWdlci5wcm90b3R5cGUucmVnaXN0ZXJTY3JvbGxFdmVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy5zY3JvbGxlZCA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuaW50ZXJ2YWwgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZWxmLnNjcm9sbENoZWNrKCk7XG4gICAgICAgIH0sIHNlbGYuc2Nyb2xsRGVsYXkpO1xuXG4gICAgICAgIGFkZEV2ZW50KHdpbmRvdywgJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2VsZi5zY3JvbGxlZCA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBJbWFnZXIuZ2V0UGFnZU9mZnNldEdlbmVyYXRvciA9IGZ1bmN0aW9uIGdldFBhZ2VWZXJ0aWNhbE9mZnNldCh0ZXN0Q2FzZSkge1xuICAgICAgICBpZiAodGVzdENhc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93LnBhZ2VZT2Zmc2V0O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gVGhpcyBmb3JtIGlzIHVzZWQgYmVjYXVzZSBpdCBzZWVtcyBpbXBvc3NpYmxlIHRvIHN0dWIgYHdpbmRvdy5wYWdlWU9mZnNldGBcbiAgICBJbWFnZXIuZ2V0UGFnZU9mZnNldCA9IEltYWdlci5nZXRQYWdlT2Zmc2V0R2VuZXJhdG9yKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh3aW5kb3csICdwYWdlWU9mZnNldCcpKTtcblxuICAgIC8vIEV4cG9ydGluZyBmb3IgdGVzdGluZyBwdXJwb3NlXG4gICAgSW1hZ2VyLmFwcGx5RWFjaCA9IGFwcGx5RWFjaDtcblxuICAgIC8qIGdsb2JhbCBtb2R1bGUsIGV4cG9ydHM6IHRydWUsIGRlZmluZSAqL1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIC8vIENvbW1vbkpTLCBqdXN0IGV4cG9ydFxuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBJbWFnZXI7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgLy8gQU1EIHN1cHBvcnRcbiAgICAgICAgZGVmaW5lKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIEltYWdlcjtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAvLyBJZiBubyBBTUQgYW5kIHdlIGFyZSBpbiB0aGUgYnJvd3NlciwgYXR0YWNoIHRvIHdpbmRvd1xuICAgICAgICB3aW5kb3cuSW1hZ2VyID0gSW1hZ2VyO1xuICAgIH1cbiAgICAvKiBnbG9iYWwgLW1vZHVsZSwgLWV4cG9ydHMsIC1kZWZpbmUgKi9cblxufSh3aW5kb3csIGRvY3VtZW50KSk7IiwiLyoqXG4gKiBpc01vYmlsZS5qcyB2MC4zLjVcbiAqXG4gKiBBIHNpbXBsZSBsaWJyYXJ5IHRvIGRldGVjdCBBcHBsZSBwaG9uZXMgYW5kIHRhYmxldHMsXG4gKiBBbmRyb2lkIHBob25lcyBhbmQgdGFibGV0cywgb3RoZXIgbW9iaWxlIGRldmljZXMgKGxpa2UgYmxhY2tiZXJyeSwgbWluaS1vcGVyYSBhbmQgd2luZG93cyBwaG9uZSksXG4gKiBhbmQgYW55IGtpbmQgb2Ygc2V2ZW4gaW5jaCBkZXZpY2UsIHZpYSB1c2VyIGFnZW50IHNuaWZmaW5nLlxuICpcbiAqIEBhdXRob3I6IEthaSBNYWxsZWEgKGttYWxsZWFAZ21haWwuY29tKVxuICpcbiAqIEBsaWNlbnNlOiBodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9wdWJsaWNkb21haW4vemVyby8xLjAvXG4gKi9cbihmdW5jdGlvbiAoZ2xvYmFsKSB7XG5cbiAgICB2YXIgYXBwbGVfcGhvbmUgICAgICAgICA9IC9pUGhvbmUvaSxcbiAgICAgICAgYXBwbGVfaXBvZCAgICAgICAgICA9IC9pUG9kL2ksXG4gICAgICAgIGFwcGxlX3RhYmxldCAgICAgICAgPSAvaVBhZC9pLFxuICAgICAgICBhbmRyb2lkX3Bob25lICAgICAgID0gLyg/PS4qXFxiQW5kcm9pZFxcYikoPz0uKlxcYk1vYmlsZVxcYikvaSwgLy8gTWF0Y2ggJ0FuZHJvaWQnIEFORCAnTW9iaWxlJ1xuICAgICAgICBhbmRyb2lkX3RhYmxldCAgICAgID0gL0FuZHJvaWQvaSxcbiAgICAgICAgd2luZG93c19waG9uZSAgICAgICA9IC9JRU1vYmlsZS9pLFxuICAgICAgICB3aW5kb3dzX3RhYmxldCAgICAgID0gLyg/PS4qXFxiV2luZG93c1xcYikoPz0uKlxcYkFSTVxcYikvaSwgLy8gTWF0Y2ggJ1dpbmRvd3MnIEFORCAnQVJNJ1xuICAgICAgICBvdGhlcl9ibGFja2JlcnJ5ICAgID0gL0JsYWNrQmVycnkvaSxcbiAgICAgICAgb3RoZXJfYmxhY2tiZXJyeV8xMCA9IC9CQjEwL2ksXG4gICAgICAgIG90aGVyX29wZXJhICAgICAgICAgPSAvT3BlcmEgTWluaS9pLFxuICAgICAgICBvdGhlcl9maXJlZm94ICAgICAgID0gLyg/PS4qXFxiRmlyZWZveFxcYikoPz0uKlxcYk1vYmlsZVxcYikvaSwgLy8gTWF0Y2ggJ0ZpcmVmb3gnIEFORCAnTW9iaWxlJ1xuICAgICAgICBzZXZlbl9pbmNoID0gbmV3IFJlZ0V4cChcbiAgICAgICAgICAgICcoPzonICsgICAgICAgICAvLyBOb24tY2FwdHVyaW5nIGdyb3VwXG5cbiAgICAgICAgICAgICdOZXh1cyA3JyArICAgICAvLyBOZXh1cyA3XG5cbiAgICAgICAgICAgICd8JyArICAgICAgICAgICAvLyBPUlxuXG4gICAgICAgICAgICAnQk5UVjI1MCcgKyAgICAgLy8gQiZOIE5vb2sgVGFibGV0IDcgaW5jaFxuXG4gICAgICAgICAgICAnfCcgKyAgICAgICAgICAgLy8gT1JcblxuICAgICAgICAgICAgJ0tpbmRsZSBGaXJlJyArIC8vIEtpbmRsZSBGaXJlXG5cbiAgICAgICAgICAgICd8JyArICAgICAgICAgICAvLyBPUlxuXG4gICAgICAgICAgICAnU2lsaycgKyAgICAgICAgLy8gS2luZGxlIEZpcmUsIFNpbGsgQWNjZWxlcmF0ZWRcblxuICAgICAgICAgICAgJ3wnICsgICAgICAgICAgIC8vIE9SXG5cbiAgICAgICAgICAgICdHVC1QMTAwMCcgKyAgICAvLyBHYWxheHkgVGFiIDcgaW5jaFxuXG4gICAgICAgICAgICAnKScsICAgICAgICAgICAgLy8gRW5kIG5vbi1jYXB0dXJpbmcgZ3JvdXBcblxuICAgICAgICAgICAgJ2knKTsgICAgICAgICAgIC8vIENhc2UtaW5zZW5zaXRpdmUgbWF0Y2hpbmdcblxuICAgIHZhciBtYXRjaCA9IGZ1bmN0aW9uKHJlZ2V4LCB1c2VyQWdlbnQpIHtcbiAgICAgICAgcmV0dXJuIHJlZ2V4LnRlc3QodXNlckFnZW50KTtcbiAgICB9O1xuXG4gICAgdmFyIElzTW9iaWxlQ2xhc3MgPSBmdW5jdGlvbih1c2VyQWdlbnQpIHtcbiAgICAgICAgdmFyIHVhID0gdXNlckFnZW50IHx8IG5hdmlnYXRvci51c2VyQWdlbnQ7XG5cbiAgICAgICAgdGhpcy5hcHBsZSA9IHtcbiAgICAgICAgICAgIHBob25lOiAgbWF0Y2goYXBwbGVfcGhvbmUsIHVhKSxcbiAgICAgICAgICAgIGlwb2Q6ICAgbWF0Y2goYXBwbGVfaXBvZCwgdWEpLFxuICAgICAgICAgICAgdGFibGV0OiBtYXRjaChhcHBsZV90YWJsZXQsIHVhKSxcbiAgICAgICAgICAgIGRldmljZTogbWF0Y2goYXBwbGVfcGhvbmUsIHVhKSB8fCBtYXRjaChhcHBsZV9pcG9kLCB1YSkgfHwgbWF0Y2goYXBwbGVfdGFibGV0LCB1YSlcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hbmRyb2lkID0ge1xuICAgICAgICAgICAgcGhvbmU6ICBtYXRjaChhbmRyb2lkX3Bob25lLCB1YSksXG4gICAgICAgICAgICB0YWJsZXQ6ICFtYXRjaChhbmRyb2lkX3Bob25lLCB1YSkgJiYgbWF0Y2goYW5kcm9pZF90YWJsZXQsIHVhKSxcbiAgICAgICAgICAgIGRldmljZTogbWF0Y2goYW5kcm9pZF9waG9uZSwgdWEpIHx8IG1hdGNoKGFuZHJvaWRfdGFibGV0LCB1YSlcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy53aW5kb3dzID0ge1xuICAgICAgICAgICAgcGhvbmU6ICBtYXRjaCh3aW5kb3dzX3Bob25lLCB1YSksXG4gICAgICAgICAgICB0YWJsZXQ6IG1hdGNoKHdpbmRvd3NfdGFibGV0LCB1YSksXG4gICAgICAgICAgICBkZXZpY2U6IG1hdGNoKHdpbmRvd3NfcGhvbmUsIHVhKSB8fCBtYXRjaCh3aW5kb3dzX3RhYmxldCwgdWEpXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMub3RoZXIgPSB7XG4gICAgICAgICAgICBibGFja2JlcnJ5OiAgIG1hdGNoKG90aGVyX2JsYWNrYmVycnksIHVhKSxcbiAgICAgICAgICAgIGJsYWNrYmVycnkxMDogbWF0Y2gob3RoZXJfYmxhY2tiZXJyeV8xMCwgdWEpLFxuICAgICAgICAgICAgb3BlcmE6ICAgICAgICBtYXRjaChvdGhlcl9vcGVyYSwgdWEpLFxuICAgICAgICAgICAgZmlyZWZveDogICAgICBtYXRjaChvdGhlcl9maXJlZm94LCB1YSksXG4gICAgICAgICAgICBkZXZpY2U6ICAgICAgIG1hdGNoKG90aGVyX2JsYWNrYmVycnksIHVhKSB8fCBtYXRjaChvdGhlcl9ibGFja2JlcnJ5XzEwLCB1YSkgfHwgbWF0Y2gob3RoZXJfb3BlcmEsIHVhKSB8fCBtYXRjaChvdGhlcl9maXJlZm94LCB1YSlcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zZXZlbl9pbmNoID0gbWF0Y2goc2V2ZW5faW5jaCwgdWEpO1xuICAgICAgICB0aGlzLmFueSA9IHRoaXMuYXBwbGUuZGV2aWNlIHx8IHRoaXMuYW5kcm9pZC5kZXZpY2UgfHwgdGhpcy53aW5kb3dzLmRldmljZSB8fCB0aGlzLm90aGVyLmRldmljZSB8fCB0aGlzLnNldmVuX2luY2g7XG4gICAgICAgIC8vIGV4Y2x1ZGVzICdvdGhlcicgZGV2aWNlcyBhbmQgaXBvZHMsIHRhcmdldGluZyB0b3VjaHNjcmVlbiBwaG9uZXNcbiAgICAgICAgdGhpcy5waG9uZSA9IHRoaXMuYXBwbGUucGhvbmUgfHwgdGhpcy5hbmRyb2lkLnBob25lIHx8IHRoaXMud2luZG93cy5waG9uZTtcbiAgICAgICAgLy8gZXhjbHVkZXMgNyBpbmNoIGRldmljZXMsIGNsYXNzaWZ5aW5nIGFzIHBob25lIG9yIHRhYmxldCBpcyBsZWZ0IHRvIHRoZSB1c2VyXG4gICAgICAgIHRoaXMudGFibGV0ID0gdGhpcy5hcHBsZS50YWJsZXQgfHwgdGhpcy5hbmRyb2lkLnRhYmxldCB8fCB0aGlzLndpbmRvd3MudGFibGV0O1xuXG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIGluc3RhbnRpYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBJTSA9IG5ldyBJc01vYmlsZUNsYXNzKCk7XG4gICAgICAgIElNLkNsYXNzID0gSXNNb2JpbGVDbGFzcztcbiAgICAgICAgcmV0dXJuIElNO1xuICAgIH07XG5cbiAgICBpZiAodHlwZW9mIG1vZHVsZSAhPSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cyAmJiB0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAvL25vZGVcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBJc01vYmlsZUNsYXNzO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSAhPSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cyAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAvL2Jyb3dzZXJpZnlcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBpbnN0YW50aWF0ZSgpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIC8vQU1EXG4gICAgICAgIGRlZmluZShnbG9iYWwuaXNNb2JpbGUgPSBpbnN0YW50aWF0ZSgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBnbG9iYWwuaXNNb2JpbGUgPSBpbnN0YW50aWF0ZSgpO1xuICAgIH1cblxufSkodGhpcyk7XG4iLCIvKlxyXG4qIGxvZ2xldmVsIC0gaHR0cHM6Ly9naXRodWIuY29tL3BpbXRlcnJ5L2xvZ2xldmVsXHJcbipcclxuKiBDb3B5cmlnaHQgKGMpIDIwMTMgVGltIFBlcnJ5XHJcbiogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxyXG4qL1xyXG4oZnVuY3Rpb24gKHJvb3QsIGRlZmluaXRpb24pIHtcclxuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyAmJiB0eXBlb2YgcmVxdWlyZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZGVmaW5pdGlvbigpO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUuYW1kID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIGRlZmluZShkZWZpbml0aW9uKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcm9vdC5sb2cgPSBkZWZpbml0aW9uKCk7XHJcbiAgICB9XHJcbn0odGhpcywgZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHNlbGYgPSB7fTtcclxuICAgIHZhciBub29wID0gZnVuY3Rpb24oKSB7fTtcclxuICAgIHZhciB1bmRlZmluZWRUeXBlID0gXCJ1bmRlZmluZWRcIjtcclxuXHJcbiAgICBmdW5jdGlvbiByZWFsTWV0aG9kKG1ldGhvZE5hbWUpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUgPT09IHVuZGVmaW5lZFR5cGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBXZSBjYW4ndCBidWlsZCBhIHJlYWwgbWV0aG9kIHdpdGhvdXQgYSBjb25zb2xlIHRvIGxvZyB0b1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY29uc29sZVttZXRob2ROYW1lXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBiaW5kTWV0aG9kKGNvbnNvbGUsIG1ldGhvZE5hbWUpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY29uc29sZS5sb2cgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYmluZE1ldGhvZChjb25zb2xlLCAnbG9nJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5vb3A7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGJpbmRNZXRob2Qob2JqLCBtZXRob2ROYW1lKSB7XHJcbiAgICAgICAgdmFyIG1ldGhvZCA9IG9ialttZXRob2ROYW1lXTtcclxuICAgICAgICBpZiAodHlwZW9mIG1ldGhvZC5iaW5kID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtZXRob2QuYmluZChvYmopO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQuY2FsbChtZXRob2QsIG9iaik7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIC8vIE1pc3NpbmcgYmluZCBzaGltIG9yIElFOCArIE1vZGVybml6ciwgZmFsbGJhY2sgdG8gd3JhcHBpbmdcclxuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmFwcGx5KG1ldGhvZCwgW29iaiwgYXJndW1lbnRzXSk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGVuYWJsZUxvZ2dpbmdXaGVuQ29uc29sZUFycml2ZXMobWV0aG9kTmFtZSwgbGV2ZWwpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09IHVuZGVmaW5lZFR5cGUpIHtcclxuICAgICAgICAgICAgICAgIHJlcGxhY2VMb2dnaW5nTWV0aG9kcyhsZXZlbCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmW21ldGhvZE5hbWVdLmFwcGx5KHNlbGYsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBsb2dNZXRob2RzID0gW1xyXG4gICAgICAgIFwidHJhY2VcIixcclxuICAgICAgICBcImRlYnVnXCIsXHJcbiAgICAgICAgXCJpbmZvXCIsXHJcbiAgICAgICAgXCJ3YXJuXCIsXHJcbiAgICAgICAgXCJlcnJvclwiXHJcbiAgICBdO1xyXG5cclxuICAgIGZ1bmN0aW9uIHJlcGxhY2VMb2dnaW5nTWV0aG9kcyhsZXZlbCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbG9nTWV0aG9kcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgbWV0aG9kTmFtZSA9IGxvZ01ldGhvZHNbaV07XHJcbiAgICAgICAgICAgIHNlbGZbbWV0aG9kTmFtZV0gPSAoaSA8IGxldmVsKSA/IG5vb3AgOiBzZWxmLm1ldGhvZEZhY3RvcnkobWV0aG9kTmFtZSwgbGV2ZWwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwZXJzaXN0TGV2ZWxJZlBvc3NpYmxlKGxldmVsTnVtKSB7XHJcbiAgICAgICAgdmFyIGxldmVsTmFtZSA9IChsb2dNZXRob2RzW2xldmVsTnVtXSB8fCAnc2lsZW50JykudG9VcHBlckNhc2UoKTtcclxuXHJcbiAgICAgICAgLy8gVXNlIGxvY2FsU3RvcmFnZSBpZiBhdmFpbGFibGVcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlWydsb2dsZXZlbCddID0gbGV2ZWxOYW1lO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfSBjYXRjaCAoaWdub3JlKSB7fVxyXG5cclxuICAgICAgICAvLyBVc2Ugc2Vzc2lvbiBjb29raWUgYXMgZmFsbGJhY2tcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB3aW5kb3cuZG9jdW1lbnQuY29va2llID0gXCJsb2dsZXZlbD1cIiArIGxldmVsTmFtZSArIFwiO1wiO1xyXG4gICAgICAgIH0gY2F0Y2ggKGlnbm9yZSkge31cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBsb2FkUGVyc2lzdGVkTGV2ZWwoKSB7XHJcbiAgICAgICAgdmFyIHN0b3JlZExldmVsO1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBzdG9yZWRMZXZlbCA9IHdpbmRvdy5sb2NhbFN0b3JhZ2VbJ2xvZ2xldmVsJ107XHJcbiAgICAgICAgfSBjYXRjaCAoaWdub3JlKSB7fVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHN0b3JlZExldmVsID09PSB1bmRlZmluZWRUeXBlKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBzdG9yZWRMZXZlbCA9IC9sb2dsZXZlbD0oW147XSspLy5leGVjKHdpbmRvdy5kb2N1bWVudC5jb29raWUpWzFdO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChpZ25vcmUpIHt9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChzZWxmLmxldmVsc1tzdG9yZWRMZXZlbF0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBzdG9yZWRMZXZlbCA9IFwiV0FSTlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZi5zZXRMZXZlbChzZWxmLmxldmVsc1tzdG9yZWRMZXZlbF0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgKlxyXG4gICAgICogUHVibGljIEFQSVxyXG4gICAgICpcclxuICAgICAqL1xyXG5cclxuICAgIHNlbGYubGV2ZWxzID0geyBcIlRSQUNFXCI6IDAsIFwiREVCVUdcIjogMSwgXCJJTkZPXCI6IDIsIFwiV0FSTlwiOiAzLFxyXG4gICAgICAgIFwiRVJST1JcIjogNCwgXCJTSUxFTlRcIjogNX07XHJcblxyXG4gICAgc2VsZi5tZXRob2RGYWN0b3J5ID0gZnVuY3Rpb24gKG1ldGhvZE5hbWUsIGxldmVsKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlYWxNZXRob2QobWV0aG9kTmFtZSkgfHxcclxuICAgICAgICAgICAgICAgZW5hYmxlTG9nZ2luZ1doZW5Db25zb2xlQXJyaXZlcyhtZXRob2ROYW1lLCBsZXZlbCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHNlbGYuc2V0TGV2ZWwgPSBmdW5jdGlvbiAobGV2ZWwpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGxldmVsID09PSBcInN0cmluZ1wiICYmIHNlbGYubGV2ZWxzW2xldmVsLnRvVXBwZXJDYXNlKCldICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgbGV2ZWwgPSBzZWxmLmxldmVsc1tsZXZlbC50b1VwcGVyQ2FzZSgpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBsZXZlbCA9PT0gXCJudW1iZXJcIiAmJiBsZXZlbCA+PSAwICYmIGxldmVsIDw9IHNlbGYubGV2ZWxzLlNJTEVOVCkge1xyXG4gICAgICAgICAgICBwZXJzaXN0TGV2ZWxJZlBvc3NpYmxlKGxldmVsKTtcclxuICAgICAgICAgICAgcmVwbGFjZUxvZ2dpbmdNZXRob2RzKGxldmVsKTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlID09PSB1bmRlZmluZWRUeXBlICYmIGxldmVsIDwgc2VsZi5sZXZlbHMuU0lMRU5UKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJObyBjb25zb2xlIGF2YWlsYWJsZSBmb3IgbG9nZ2luZ1wiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgXCJsb2cuc2V0TGV2ZWwoKSBjYWxsZWQgd2l0aCBpbnZhbGlkIGxldmVsOiBcIiArIGxldmVsO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgc2VsZi5lbmFibGVBbGwgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBzZWxmLnNldExldmVsKHNlbGYubGV2ZWxzLlRSQUNFKTtcclxuICAgIH07XHJcblxyXG4gICAgc2VsZi5kaXNhYmxlQWxsID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgc2VsZi5zZXRMZXZlbChzZWxmLmxldmVscy5TSUxFTlQpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBHcmFiIHRoZSBjdXJyZW50IGdsb2JhbCBsb2cgdmFyaWFibGUgaW4gY2FzZSBvZiBvdmVyd3JpdGVcclxuICAgIHZhciBfbG9nID0gKHR5cGVvZiB3aW5kb3cgIT09IHVuZGVmaW5lZFR5cGUpID8gd2luZG93LmxvZyA6IHVuZGVmaW5lZDtcclxuICAgIHNlbGYubm9Db25mbGljdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSB1bmRlZmluZWRUeXBlICYmXHJcbiAgICAgICAgICAgICAgIHdpbmRvdy5sb2cgPT09IHNlbGYpIHtcclxuICAgICAgICAgICAgd2luZG93LmxvZyA9IF9sb2c7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc2VsZjtcclxuICAgIH07XHJcblxyXG4gICAgbG9hZFBlcnNpc3RlZExldmVsKCk7XHJcbiAgICByZXR1cm4gc2VsZjtcclxufSkpO1xyXG4iLCIvKiEgUmF2ZW4uanMgMS4xLjE4ICg4YWQxNWJjKSB8IGdpdGh1Yi5jb20vZ2V0c2VudHJ5L3JhdmVuLWpzICovXG5cbi8qXG4gKiBJbmNsdWRlcyBUcmFjZUtpdFxuICogaHR0cHM6Ly9naXRodWIuY29tL2dldHNlbnRyeS9UcmFjZUtpdFxuICpcbiAqIENvcHlyaWdodCAyMDE1IE1hdHQgUm9iZW5vbHQgYW5kIG90aGVyIGNvbnRyaWJ1dG9yc1xuICogUmVsZWFzZWQgdW5kZXIgdGhlIEJTRCBsaWNlbnNlXG4gKiBodHRwczovL2dpdGh1Yi5jb20vZ2V0c2VudHJ5L3JhdmVuLWpzL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqXG4gKi9cbjsoZnVuY3Rpb24od2luZG93LCB1bmRlZmluZWQpe1xuJ3VzZSBzdHJpY3QnO1xuXG4vKlxuIFRyYWNlS2l0IC0gQ3Jvc3MgYnJvd2VyIHN0YWNrIHRyYWNlcyAtIGdpdGh1Yi5jb20vb2NjL1RyYWNlS2l0XG4gTUlUIGxpY2Vuc2VcbiovXG5cbnZhciBUcmFjZUtpdCA9IHtcbiAgICByZW1vdGVGZXRjaGluZzogZmFsc2UsXG4gICAgY29sbGVjdFdpbmRvd0Vycm9yczogdHJ1ZSxcbiAgICAvLyAzIGxpbmVzIGJlZm9yZSwgdGhlIG9mZmVuZGluZyBsaW5lLCAzIGxpbmVzIGFmdGVyXG4gICAgbGluZXNPZkNvbnRleHQ6IDdcbn07XG5cbi8vIGdsb2JhbCByZWZlcmVuY2UgdG8gc2xpY2VcbnZhciBfc2xpY2UgPSBbXS5zbGljZTtcbnZhciBVTktOT1dOX0ZVTkNUSU9OID0gJz8nO1xuXG5cbi8qKlxuICogVHJhY2VLaXQud3JhcDogV3JhcCBhbnkgZnVuY3Rpb24gaW4gYSBUcmFjZUtpdCByZXBvcnRlclxuICogRXhhbXBsZTogZnVuYyA9IFRyYWNlS2l0LndyYXAoZnVuYyk7XG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBGdW5jdGlvbiB0byBiZSB3cmFwcGVkXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gVGhlIHdyYXBwZWQgZnVuY1xuICovXG5UcmFjZUtpdC53cmFwID0gZnVuY3Rpb24gdHJhY2VLaXRXcmFwcGVyKGZ1bmMpIHtcbiAgICBmdW5jdGlvbiB3cmFwcGVkKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgVHJhY2VLaXQucmVwb3J0KGUpO1xuICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gd3JhcHBlZDtcbn07XG5cbi8qKlxuICogVHJhY2VLaXQucmVwb3J0OiBjcm9zcy1icm93c2VyIHByb2Nlc3Npbmcgb2YgdW5oYW5kbGVkIGV4Y2VwdGlvbnNcbiAqXG4gKiBTeW50YXg6XG4gKiAgIFRyYWNlS2l0LnJlcG9ydC5zdWJzY3JpYmUoZnVuY3Rpb24oc3RhY2tJbmZvKSB7IC4uLiB9KVxuICogICBUcmFjZUtpdC5yZXBvcnQudW5zdWJzY3JpYmUoZnVuY3Rpb24oc3RhY2tJbmZvKSB7IC4uLiB9KVxuICogICBUcmFjZUtpdC5yZXBvcnQoZXhjZXB0aW9uKVxuICogICB0cnkgeyAuLi5jb2RlLi4uIH0gY2F0Y2goZXgpIHsgVHJhY2VLaXQucmVwb3J0KGV4KTsgfVxuICpcbiAqIFN1cHBvcnRzOlxuICogICAtIEZpcmVmb3g6IGZ1bGwgc3RhY2sgdHJhY2Ugd2l0aCBsaW5lIG51bWJlcnMsIHBsdXMgY29sdW1uIG51bWJlclxuICogICAgICAgICAgICAgIG9uIHRvcCBmcmFtZTsgY29sdW1uIG51bWJlciBpcyBub3QgZ3VhcmFudGVlZFxuICogICAtIE9wZXJhOiAgIGZ1bGwgc3RhY2sgdHJhY2Ugd2l0aCBsaW5lIGFuZCBjb2x1bW4gbnVtYmVyc1xuICogICAtIENocm9tZTogIGZ1bGwgc3RhY2sgdHJhY2Ugd2l0aCBsaW5lIGFuZCBjb2x1bW4gbnVtYmVyc1xuICogICAtIFNhZmFyaTogIGxpbmUgYW5kIGNvbHVtbiBudW1iZXIgZm9yIHRoZSB0b3AgZnJhbWUgb25seTsgc29tZSBmcmFtZXNcbiAqICAgICAgICAgICAgICBtYXkgYmUgbWlzc2luZywgYW5kIGNvbHVtbiBudW1iZXIgaXMgbm90IGd1YXJhbnRlZWRcbiAqICAgLSBJRTogICAgICBsaW5lIGFuZCBjb2x1bW4gbnVtYmVyIGZvciB0aGUgdG9wIGZyYW1lIG9ubHk7IHNvbWUgZnJhbWVzXG4gKiAgICAgICAgICAgICAgbWF5IGJlIG1pc3NpbmcsIGFuZCBjb2x1bW4gbnVtYmVyIGlzIG5vdCBndWFyYW50ZWVkXG4gKlxuICogSW4gdGhlb3J5LCBUcmFjZUtpdCBzaG91bGQgd29yayBvbiBhbGwgb2YgdGhlIGZvbGxvd2luZyB2ZXJzaW9uczpcbiAqICAgLSBJRTUuNSsgKG9ubHkgOC4wIHRlc3RlZClcbiAqICAgLSBGaXJlZm94IDAuOSsgKG9ubHkgMy41KyB0ZXN0ZWQpXG4gKiAgIC0gT3BlcmEgNysgKG9ubHkgMTAuNTAgdGVzdGVkOyB2ZXJzaW9ucyA5IGFuZCBlYXJsaWVyIG1heSByZXF1aXJlXG4gKiAgICAgRXhjZXB0aW9ucyBIYXZlIFN0YWNrdHJhY2UgdG8gYmUgZW5hYmxlZCBpbiBvcGVyYTpjb25maWcpXG4gKiAgIC0gU2FmYXJpIDMrIChvbmx5IDQrIHRlc3RlZClcbiAqICAgLSBDaHJvbWUgMSsgKG9ubHkgNSsgdGVzdGVkKVxuICogICAtIEtvbnF1ZXJvciAzLjUrICh1bnRlc3RlZClcbiAqXG4gKiBSZXF1aXJlcyBUcmFjZUtpdC5jb21wdXRlU3RhY2tUcmFjZS5cbiAqXG4gKiBUcmllcyB0byBjYXRjaCBhbGwgdW5oYW5kbGVkIGV4Y2VwdGlvbnMgYW5kIHJlcG9ydCB0aGVtIHRvIHRoZVxuICogc3Vic2NyaWJlZCBoYW5kbGVycy4gUGxlYXNlIG5vdGUgdGhhdCBUcmFjZUtpdC5yZXBvcnQgd2lsbCByZXRocm93IHRoZVxuICogZXhjZXB0aW9uLiBUaGlzIGlzIFJFUVVJUkVEIGluIG9yZGVyIHRvIGdldCBhIHVzZWZ1bCBzdGFjayB0cmFjZSBpbiBJRS5cbiAqIElmIHRoZSBleGNlcHRpb24gZG9lcyBub3QgcmVhY2ggdGhlIHRvcCBvZiB0aGUgYnJvd3NlciwgeW91IHdpbGwgb25seVxuICogZ2V0IGEgc3RhY2sgdHJhY2UgZnJvbSB0aGUgcG9pbnQgd2hlcmUgVHJhY2VLaXQucmVwb3J0IHdhcyBjYWxsZWQuXG4gKlxuICogSGFuZGxlcnMgcmVjZWl2ZSBhIHN0YWNrSW5mbyBvYmplY3QgYXMgZGVzY3JpYmVkIGluIHRoZVxuICogVHJhY2VLaXQuY29tcHV0ZVN0YWNrVHJhY2UgZG9jcy5cbiAqL1xuVHJhY2VLaXQucmVwb3J0ID0gKGZ1bmN0aW9uIHJlcG9ydE1vZHVsZVdyYXBwZXIoKSB7XG4gICAgdmFyIGhhbmRsZXJzID0gW10sXG4gICAgICAgIGxhc3RBcmdzID0gbnVsbCxcbiAgICAgICAgbGFzdEV4Y2VwdGlvbiA9IG51bGwsXG4gICAgICAgIGxhc3RFeGNlcHRpb25TdGFjayA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBBZGQgYSBjcmFzaCBoYW5kbGVyLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXJcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzdWJzY3JpYmUoaGFuZGxlcikge1xuICAgICAgICBpbnN0YWxsR2xvYmFsSGFuZGxlcigpO1xuICAgICAgICBoYW5kbGVycy5wdXNoKGhhbmRsZXIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhIGNyYXNoIGhhbmRsZXIuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaGFuZGxlclxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHVuc3Vic2NyaWJlKGhhbmRsZXIpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IGhhbmRsZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgICAgICBpZiAoaGFuZGxlcnNbaV0gPT09IGhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVycy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYWxsIGNyYXNoIGhhbmRsZXJzLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHVuc3Vic2NyaWJlQWxsKCkge1xuICAgICAgICB1bmluc3RhbGxHbG9iYWxIYW5kbGVyKCk7XG4gICAgICAgIGhhbmRsZXJzID0gW107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGlzcGF0Y2ggc3RhY2sgaW5mb3JtYXRpb24gdG8gYWxsIGhhbmRsZXJzLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsICo+fSBzdGFja1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIG5vdGlmeUhhbmRsZXJzKHN0YWNrLCBpc1dpbmRvd0Vycm9yKSB7XG4gICAgICAgIHZhciBleGNlcHRpb24gPSBudWxsO1xuICAgICAgICBpZiAoaXNXaW5kb3dFcnJvciAmJiAhVHJhY2VLaXQuY29sbGVjdFdpbmRvd0Vycm9ycykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpIGluIGhhbmRsZXJzKSB7XG4gICAgICAgICAgICBpZiAoaGFzS2V5KGhhbmRsZXJzLCBpKSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXJzW2ldLmFwcGx5KG51bGwsIFtzdGFja10uY29uY2F0KF9zbGljZS5jYWxsKGFyZ3VtZW50cywgMikpKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChpbm5lcikge1xuICAgICAgICAgICAgICAgICAgICBleGNlcHRpb24gPSBpbm5lcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXhjZXB0aW9uKSB7XG4gICAgICAgICAgICB0aHJvdyBleGNlcHRpb247XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgX29sZE9uZXJyb3JIYW5kbGVyLCBfb25FcnJvckhhbmRsZXJJbnN0YWxsZWQ7XG5cbiAgICAvKipcbiAgICAgKiBFbnN1cmVzIGFsbCBnbG9iYWwgdW5oYW5kbGVkIGV4Y2VwdGlvbnMgYXJlIHJlY29yZGVkLlxuICAgICAqIFN1cHBvcnRlZCBieSBHZWNrbyBhbmQgSUUuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgRXJyb3IgbWVzc2FnZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIFVSTCBvZiBzY3JpcHQgdGhhdCBnZW5lcmF0ZWQgdGhlIGV4Y2VwdGlvbi5cbiAgICAgKiBAcGFyYW0geyhudW1iZXJ8c3RyaW5nKX0gbGluZU5vIFRoZSBsaW5lIG51bWJlciBhdCB3aGljaCB0aGUgZXJyb3JcbiAgICAgKiBvY2N1cnJlZC5cbiAgICAgKiBAcGFyYW0gez8obnVtYmVyfHN0cmluZyl9IGNvbE5vIFRoZSBjb2x1bW4gbnVtYmVyIGF0IHdoaWNoIHRoZSBlcnJvclxuICAgICAqIG9jY3VycmVkLlxuICAgICAqIEBwYXJhbSB7P0Vycm9yfSBleCBUaGUgYWN0dWFsIEVycm9yIG9iamVjdC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiB0cmFjZUtpdFdpbmRvd09uRXJyb3IobWVzc2FnZSwgdXJsLCBsaW5lTm8sIGNvbE5vLCBleCkge1xuICAgICAgICB2YXIgc3RhY2sgPSBudWxsO1xuXG4gICAgICAgIGlmIChsYXN0RXhjZXB0aW9uU3RhY2spIHtcbiAgICAgICAgICAgIFRyYWNlS2l0LmNvbXB1dGVTdGFja1RyYWNlLmF1Z21lbnRTdGFja1RyYWNlV2l0aEluaXRpYWxFbGVtZW50KGxhc3RFeGNlcHRpb25TdGFjaywgdXJsLCBsaW5lTm8sIG1lc3NhZ2UpO1xuICAgICAgICAgICAgcHJvY2Vzc0xhc3RFeGNlcHRpb24oKTtcbiAgICAgICAgfSBlbHNlIGlmIChleCkge1xuICAgICAgICAgICAgLy8gTmV3IGNocm9tZSBhbmQgYmxpbmsgc2VuZCBhbG9uZyBhIHJlYWwgZXJyb3Igb2JqZWN0XG4gICAgICAgICAgICAvLyBMZXQncyBqdXN0IHJlcG9ydCB0aGF0IGxpa2UgYSBub3JtYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTZWU6IGh0dHBzOi8vbWlrZXdlc3Qub3JnLzIwMTMvMDgvZGVidWdnaW5nLXJ1bnRpbWUtZXJyb3JzLXdpdGgtd2luZG93LW9uZXJyb3JcbiAgICAgICAgICAgIHN0YWNrID0gVHJhY2VLaXQuY29tcHV0ZVN0YWNrVHJhY2UoZXgpO1xuICAgICAgICAgICAgbm90aWZ5SGFuZGxlcnMoc3RhY2ssIHRydWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGxvY2F0aW9uID0ge1xuICAgICAgICAgICAgICAgICd1cmwnOiB1cmwsXG4gICAgICAgICAgICAgICAgJ2xpbmUnOiBsaW5lTm8sXG4gICAgICAgICAgICAgICAgJ2NvbHVtbic6IGNvbE5vXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbG9jYXRpb24uZnVuYyA9IFRyYWNlS2l0LmNvbXB1dGVTdGFja1RyYWNlLmd1ZXNzRnVuY3Rpb25OYW1lKGxvY2F0aW9uLnVybCwgbG9jYXRpb24ubGluZSk7XG4gICAgICAgICAgICBsb2NhdGlvbi5jb250ZXh0ID0gVHJhY2VLaXQuY29tcHV0ZVN0YWNrVHJhY2UuZ2F0aGVyQ29udGV4dChsb2NhdGlvbi51cmwsIGxvY2F0aW9uLmxpbmUpO1xuICAgICAgICAgICAgc3RhY2sgPSB7XG4gICAgICAgICAgICAgICAgJ21lc3NhZ2UnOiBtZXNzYWdlLFxuICAgICAgICAgICAgICAgICd1cmwnOiBkb2N1bWVudC5sb2NhdGlvbi5ocmVmLFxuICAgICAgICAgICAgICAgICdzdGFjayc6IFtsb2NhdGlvbl1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBub3RpZnlIYW5kbGVycyhzdGFjaywgdHJ1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoX29sZE9uZXJyb3JIYW5kbGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gX29sZE9uZXJyb3JIYW5kbGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbEdsb2JhbEhhbmRsZXIgKClcbiAgICB7XG4gICAgICAgIGlmIChfb25FcnJvckhhbmRsZXJJbnN0YWxsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBfb2xkT25lcnJvckhhbmRsZXIgPSB3aW5kb3cub25lcnJvcjtcbiAgICAgICAgd2luZG93Lm9uZXJyb3IgPSB0cmFjZUtpdFdpbmRvd09uRXJyb3I7XG4gICAgICAgIF9vbkVycm9ySGFuZGxlckluc3RhbGxlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdW5pbnN0YWxsR2xvYmFsSGFuZGxlciAoKVxuICAgIHtcbiAgICAgICAgaWYgKCFfb25FcnJvckhhbmRsZXJJbnN0YWxsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB3aW5kb3cub25lcnJvciA9IF9vbGRPbmVycm9ySGFuZGxlcjtcbiAgICAgICAgX29uRXJyb3JIYW5kbGVySW5zdGFsbGVkID0gZmFsc2U7XG4gICAgICAgIF9vbGRPbmVycm9ySGFuZGxlciA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwcm9jZXNzTGFzdEV4Y2VwdGlvbigpIHtcbiAgICAgICAgdmFyIF9sYXN0RXhjZXB0aW9uU3RhY2sgPSBsYXN0RXhjZXB0aW9uU3RhY2ssXG4gICAgICAgICAgICBfbGFzdEFyZ3MgPSBsYXN0QXJncztcbiAgICAgICAgbGFzdEFyZ3MgPSBudWxsO1xuICAgICAgICBsYXN0RXhjZXB0aW9uU3RhY2sgPSBudWxsO1xuICAgICAgICBsYXN0RXhjZXB0aW9uID0gbnVsbDtcbiAgICAgICAgbm90aWZ5SGFuZGxlcnMuYXBwbHkobnVsbCwgW19sYXN0RXhjZXB0aW9uU3RhY2ssIGZhbHNlXS5jb25jYXQoX2xhc3RBcmdzKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVwb3J0cyBhbiB1bmhhbmRsZWQgRXJyb3IgdG8gVHJhY2VLaXQuXG4gICAgICogQHBhcmFtIHtFcnJvcn0gZXhcbiAgICAgKiBAcGFyYW0gez9ib29sZWFufSByZXRocm93IElmIGZhbHNlLCBkbyBub3QgcmUtdGhyb3cgdGhlIGV4Y2VwdGlvbi5cbiAgICAgKiBPbmx5IHVzZWQgZm9yIHdpbmRvdy5vbmVycm9yIHRvIG5vdCBjYXVzZSBhbiBpbmZpbml0ZSBsb29wIG9mXG4gICAgICogcmV0aHJvd2luZy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiByZXBvcnQoZXgsIHJldGhyb3cpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBfc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICBpZiAobGFzdEV4Y2VwdGlvblN0YWNrKSB7XG4gICAgICAgICAgICBpZiAobGFzdEV4Y2VwdGlvbiA9PT0gZXgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vIGFscmVhZHkgY2F1Z2h0IGJ5IGFuIGlubmVyIGNhdGNoIGJsb2NrLCBpZ25vcmVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHByb2Nlc3NMYXN0RXhjZXB0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc3RhY2sgPSBUcmFjZUtpdC5jb21wdXRlU3RhY2tUcmFjZShleCk7XG4gICAgICAgIGxhc3RFeGNlcHRpb25TdGFjayA9IHN0YWNrO1xuICAgICAgICBsYXN0RXhjZXB0aW9uID0gZXg7XG4gICAgICAgIGxhc3RBcmdzID0gYXJncztcblxuICAgICAgICAvLyBJZiB0aGUgc3RhY2sgdHJhY2UgaXMgaW5jb21wbGV0ZSwgd2FpdCBmb3IgMiBzZWNvbmRzIGZvclxuICAgICAgICAvLyBzbG93IHNsb3cgSUUgdG8gc2VlIGlmIG9uZXJyb3Igb2NjdXJzIG9yIG5vdCBiZWZvcmUgcmVwb3J0aW5nXG4gICAgICAgIC8vIHRoaXMgZXhjZXB0aW9uOyBvdGhlcndpc2UsIHdlIHdpbGwgZW5kIHVwIHdpdGggYW4gaW5jb21wbGV0ZVxuICAgICAgICAvLyBzdGFjayB0cmFjZVxuICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAobGFzdEV4Y2VwdGlvbiA9PT0gZXgpIHtcbiAgICAgICAgICAgICAgICBwcm9jZXNzTGFzdEV4Y2VwdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAoc3RhY2suaW5jb21wbGV0ZSA/IDIwMDAgOiAwKSk7XG5cbiAgICAgICAgaWYgKHJldGhyb3cgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aHJvdyBleDsgLy8gcmUtdGhyb3cgdG8gcHJvcGFnYXRlIHRvIHRoZSB0b3AgbGV2ZWwgKGFuZCBjYXVzZSB3aW5kb3cub25lcnJvcilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlcG9ydC5zdWJzY3JpYmUgPSBzdWJzY3JpYmU7XG4gICAgcmVwb3J0LnVuc3Vic2NyaWJlID0gdW5zdWJzY3JpYmU7XG4gICAgcmVwb3J0LnVuaW5zdGFsbCA9IHVuc3Vic2NyaWJlQWxsO1xuICAgIHJldHVybiByZXBvcnQ7XG59KCkpO1xuXG4vKipcbiAqIFRyYWNlS2l0LmNvbXB1dGVTdGFja1RyYWNlOiBjcm9zcy1icm93c2VyIHN0YWNrIHRyYWNlcyBpbiBKYXZhU2NyaXB0XG4gKlxuICogU3ludGF4OlxuICogICBzID0gVHJhY2VLaXQuY29tcHV0ZVN0YWNrVHJhY2UoZXhjZXB0aW9uKSAvLyBjb25zaWRlciB1c2luZyBUcmFjZUtpdC5yZXBvcnQgaW5zdGVhZCAoc2VlIGJlbG93KVxuICogUmV0dXJuczpcbiAqICAgcy5uYW1lICAgICAgICAgICAgICAtIGV4Y2VwdGlvbiBuYW1lXG4gKiAgIHMubWVzc2FnZSAgICAgICAgICAgLSBleGNlcHRpb24gbWVzc2FnZVxuICogICBzLnN0YWNrW2ldLnVybCAgICAgIC0gSmF2YVNjcmlwdCBvciBIVE1MIGZpbGUgVVJMXG4gKiAgIHMuc3RhY2tbaV0uZnVuYyAgICAgLSBmdW5jdGlvbiBuYW1lLCBvciBlbXB0eSBmb3IgYW5vbnltb3VzIGZ1bmN0aW9ucyAoaWYgZ3Vlc3NpbmcgZGlkIG5vdCB3b3JrKVxuICogICBzLnN0YWNrW2ldLmFyZ3MgICAgIC0gYXJndW1lbnRzIHBhc3NlZCB0byB0aGUgZnVuY3Rpb24sIGlmIGtub3duXG4gKiAgIHMuc3RhY2tbaV0ubGluZSAgICAgLSBsaW5lIG51bWJlciwgaWYga25vd25cbiAqICAgcy5zdGFja1tpXS5jb2x1bW4gICAtIGNvbHVtbiBudW1iZXIsIGlmIGtub3duXG4gKiAgIHMuc3RhY2tbaV0uY29udGV4dCAgLSBhbiBhcnJheSBvZiBzb3VyY2UgY29kZSBsaW5lczsgdGhlIG1pZGRsZSBlbGVtZW50IGNvcnJlc3BvbmRzIHRvIHRoZSBjb3JyZWN0IGxpbmUjXG4gKlxuICogU3VwcG9ydHM6XG4gKiAgIC0gRmlyZWZveDogIGZ1bGwgc3RhY2sgdHJhY2Ugd2l0aCBsaW5lIG51bWJlcnMgYW5kIHVucmVsaWFibGUgY29sdW1uXG4gKiAgICAgICAgICAgICAgIG51bWJlciBvbiB0b3AgZnJhbWVcbiAqICAgLSBPcGVyYSAxMDogZnVsbCBzdGFjayB0cmFjZSB3aXRoIGxpbmUgYW5kIGNvbHVtbiBudW1iZXJzXG4gKiAgIC0gT3BlcmEgOS06IGZ1bGwgc3RhY2sgdHJhY2Ugd2l0aCBsaW5lIG51bWJlcnNcbiAqICAgLSBDaHJvbWU6ICAgZnVsbCBzdGFjayB0cmFjZSB3aXRoIGxpbmUgYW5kIGNvbHVtbiBudW1iZXJzXG4gKiAgIC0gU2FmYXJpOiAgIGxpbmUgYW5kIGNvbHVtbiBudW1iZXIgZm9yIHRoZSB0b3Btb3N0IHN0YWNrdHJhY2UgZWxlbWVudFxuICogICAgICAgICAgICAgICBvbmx5XG4gKiAgIC0gSUU6ICAgICAgIG5vIGxpbmUgbnVtYmVycyB3aGF0c29ldmVyXG4gKlxuICogVHJpZXMgdG8gZ3Vlc3MgbmFtZXMgb2YgYW5vbnltb3VzIGZ1bmN0aW9ucyBieSBsb29raW5nIGZvciBhc3NpZ25tZW50c1xuICogaW4gdGhlIHNvdXJjZSBjb2RlLiBJbiBJRSBhbmQgU2FmYXJpLCB3ZSBoYXZlIHRvIGd1ZXNzIHNvdXJjZSBmaWxlIG5hbWVzXG4gKiBieSBzZWFyY2hpbmcgZm9yIGZ1bmN0aW9uIGJvZGllcyBpbnNpZGUgYWxsIHBhZ2Ugc2NyaXB0cy4gVGhpcyB3aWxsIG5vdFxuICogd29yayBmb3Igc2NyaXB0cyB0aGF0IGFyZSBsb2FkZWQgY3Jvc3MtZG9tYWluLlxuICogSGVyZSBiZSBkcmFnb25zOiBzb21lIGZ1bmN0aW9uIG5hbWVzIG1heSBiZSBndWVzc2VkIGluY29ycmVjdGx5LCBhbmRcbiAqIGR1cGxpY2F0ZSBmdW5jdGlvbnMgbWF5IGJlIG1pc21hdGNoZWQuXG4gKlxuICogVHJhY2VLaXQuY29tcHV0ZVN0YWNrVHJhY2Ugc2hvdWxkIG9ubHkgYmUgdXNlZCBmb3IgdHJhY2luZyBwdXJwb3Nlcy5cbiAqIExvZ2dpbmcgb2YgdW5oYW5kbGVkIGV4Y2VwdGlvbnMgc2hvdWxkIGJlIGRvbmUgd2l0aCBUcmFjZUtpdC5yZXBvcnQsXG4gKiB3aGljaCBidWlsZHMgb24gdG9wIG9mIFRyYWNlS2l0LmNvbXB1dGVTdGFja1RyYWNlIGFuZCBwcm92aWRlcyBiZXR0ZXJcbiAqIElFIHN1cHBvcnQgYnkgdXRpbGl6aW5nIHRoZSB3aW5kb3cub25lcnJvciBldmVudCB0byByZXRyaWV2ZSBpbmZvcm1hdGlvblxuICogYWJvdXQgdGhlIHRvcCBvZiB0aGUgc3RhY2suXG4gKlxuICogTm90ZTogSW4gSUUgYW5kIFNhZmFyaSwgbm8gc3RhY2sgdHJhY2UgaXMgcmVjb3JkZWQgb24gdGhlIEVycm9yIG9iamVjdCxcbiAqIHNvIGNvbXB1dGVTdGFja1RyYWNlIGluc3RlYWQgd2Fsa3MgaXRzICpvd24qIGNoYWluIG9mIGNhbGxlcnMuXG4gKiBUaGlzIG1lYW5zIHRoYXQ6XG4gKiAgKiBpbiBTYWZhcmksIHNvbWUgbWV0aG9kcyBtYXkgYmUgbWlzc2luZyBmcm9tIHRoZSBzdGFjayB0cmFjZTtcbiAqICAqIGluIElFLCB0aGUgdG9wbW9zdCBmdW5jdGlvbiBpbiB0aGUgc3RhY2sgdHJhY2Ugd2lsbCBhbHdheXMgYmUgdGhlXG4gKiAgICBjYWxsZXIgb2YgY29tcHV0ZVN0YWNrVHJhY2UuXG4gKlxuICogVGhpcyBpcyBva2F5IGZvciB0cmFjaW5nIChiZWNhdXNlIHlvdSBhcmUgbGlrZWx5IHRvIGJlIGNhbGxpbmdcbiAqIGNvbXB1dGVTdGFja1RyYWNlIGZyb20gdGhlIGZ1bmN0aW9uIHlvdSB3YW50IHRvIGJlIHRoZSB0b3Btb3N0IGVsZW1lbnRcbiAqIG9mIHRoZSBzdGFjayB0cmFjZSBhbnl3YXkpLCBidXQgbm90IG9rYXkgZm9yIGxvZ2dpbmcgdW5oYW5kbGVkXG4gKiBleGNlcHRpb25zIChiZWNhdXNlIHlvdXIgY2F0Y2ggYmxvY2sgd2lsbCBsaWtlbHkgYmUgZmFyIGF3YXkgZnJvbSB0aGVcbiAqIGlubmVyIGZ1bmN0aW9uIHRoYXQgYWN0dWFsbHkgY2F1c2VkIHRoZSBleGNlcHRpb24pLlxuICpcbiAqL1xuVHJhY2VLaXQuY29tcHV0ZVN0YWNrVHJhY2UgPSAoZnVuY3Rpb24gY29tcHV0ZVN0YWNrVHJhY2VXcmFwcGVyKCkge1xuICAgIHZhciBkZWJ1ZyA9IGZhbHNlLFxuICAgICAgICBzb3VyY2VDYWNoZSA9IHt9O1xuXG4gICAgLyoqXG4gICAgICogQXR0ZW1wdHMgdG8gcmV0cmlldmUgc291cmNlIGNvZGUgdmlhIFhNTEh0dHBSZXF1ZXN0LCB3aGljaCBpcyB1c2VkXG4gICAgICogdG8gbG9vayB1cCBhbm9ueW1vdXMgZnVuY3Rpb24gbmFtZXMuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCBVUkwgb2Ygc291cmNlIGNvZGUuXG4gICAgICogQHJldHVybiB7c3RyaW5nfSBTb3VyY2UgY29udGVudHMuXG4gICAgICovXG4gICAgZnVuY3Rpb24gbG9hZFNvdXJjZSh1cmwpIHtcbiAgICAgICAgaWYgKCFUcmFjZUtpdC5yZW1vdGVGZXRjaGluZykgeyAvL09ubHkgYXR0ZW1wdCByZXF1ZXN0IGlmIHJlbW90ZUZldGNoaW5nIGlzIG9uLlxuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgZ2V0WEhSID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyB3aW5kb3cuWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGV4cGxpY2l0bHkgYnViYmxlIHVwIHRoZSBleGNlcHRpb24gaWYgbm90IGZvdW5kXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgd2luZG93LkFjdGl2ZVhPYmplY3QoJ01pY3Jvc29mdC5YTUxIVFRQJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIHJlcXVlc3QgPSBnZXRYSFIoKTtcbiAgICAgICAgICAgIHJlcXVlc3Qub3BlbignR0VUJywgdXJsLCBmYWxzZSk7XG4gICAgICAgICAgICByZXF1ZXN0LnNlbmQoJycpO1xuICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3QucmVzcG9uc2VUZXh0O1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXRyaWV2ZXMgc291cmNlIGNvZGUgZnJvbSB0aGUgc291cmNlIGNvZGUgY2FjaGUuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCBVUkwgb2Ygc291cmNlIGNvZGUuXG4gICAgICogQHJldHVybiB7QXJyYXkuPHN0cmluZz59IFNvdXJjZSBjb250ZW50cy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXRTb3VyY2UodXJsKSB7XG4gICAgICAgIGlmICghaXNTdHJpbmcodXJsKSkgcmV0dXJuIFtdO1xuICAgICAgICBpZiAoIWhhc0tleShzb3VyY2VDYWNoZSwgdXJsKSkge1xuICAgICAgICAgICAgLy8gVVJMIG5lZWRzIHRvIGJlIGFibGUgdG8gZmV0Y2hlZCB3aXRoaW4gdGhlIGFjY2VwdGFibGUgZG9tYWluLiAgT3RoZXJ3aXNlLFxuICAgICAgICAgICAgLy8gY3Jvc3MtZG9tYWluIGVycm9ycyB3aWxsIGJlIHRyaWdnZXJlZC5cbiAgICAgICAgICAgIHZhciBzb3VyY2UgPSAnJztcbiAgICAgICAgICAgIGlmICh1cmwuaW5kZXhPZihkb2N1bWVudC5kb21haW4pICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHNvdXJjZSA9IGxvYWRTb3VyY2UodXJsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNvdXJjZUNhY2hlW3VybF0gPSBzb3VyY2UgPyBzb3VyY2Uuc3BsaXQoJ1xcbicpIDogW107XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc291cmNlQ2FjaGVbdXJsXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmllcyB0byB1c2UgYW4gZXh0ZXJuYWxseSBsb2FkZWQgY29weSBvZiBzb3VyY2UgY29kZSB0byBkZXRlcm1pbmVcbiAgICAgKiB0aGUgbmFtZSBvZiBhIGZ1bmN0aW9uIGJ5IGxvb2tpbmcgYXQgdGhlIG5hbWUgb2YgdGhlIHZhcmlhYmxlIGl0IHdhc1xuICAgICAqIGFzc2lnbmVkIHRvLCBpZiBhbnkuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCBVUkwgb2Ygc291cmNlIGNvZGUuXG4gICAgICogQHBhcmFtIHsoc3RyaW5nfG51bWJlcil9IGxpbmVObyBMaW5lIG51bWJlciBpbiBzb3VyY2UgY29kZS5cbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBmdW5jdGlvbiBuYW1lLCBpZiBkaXNjb3ZlcmFibGUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ3Vlc3NGdW5jdGlvbk5hbWUodXJsLCBsaW5lTm8pIHtcbiAgICAgICAgdmFyIHJlRnVuY3Rpb25BcmdOYW1lcyA9IC9mdW5jdGlvbiAoW14oXSopXFwoKFteKV0qKVxcKS8sXG4gICAgICAgICAgICByZUd1ZXNzRnVuY3Rpb24gPSAvWydcIl0/KFswLTlBLVphLXokX10rKVsnXCJdP1xccypbOj1dXFxzKihmdW5jdGlvbnxldmFsfG5ldyBGdW5jdGlvbikvLFxuICAgICAgICAgICAgbGluZSA9ICcnLFxuICAgICAgICAgICAgbWF4TGluZXMgPSAxMCxcbiAgICAgICAgICAgIHNvdXJjZSA9IGdldFNvdXJjZSh1cmwpLFxuICAgICAgICAgICAgbTtcblxuICAgICAgICBpZiAoIXNvdXJjZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBVTktOT1dOX0ZVTkNUSU9OO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2FsayBiYWNrd2FyZHMgZnJvbSB0aGUgZmlyc3QgbGluZSBpbiB0aGUgZnVuY3Rpb24gdW50aWwgd2UgZmluZCB0aGUgbGluZSB3aGljaFxuICAgICAgICAvLyBtYXRjaGVzIHRoZSBwYXR0ZXJuIGFib3ZlLCB3aGljaCBpcyB0aGUgZnVuY3Rpb24gZGVmaW5pdGlvblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1heExpbmVzOyArK2kpIHtcbiAgICAgICAgICAgIGxpbmUgPSBzb3VyY2VbbGluZU5vIC0gaV0gKyBsaW5lO1xuXG4gICAgICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKGxpbmUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKChtID0gcmVHdWVzc0Z1bmN0aW9uLmV4ZWMobGluZSkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtWzFdO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoKG0gPSByZUZ1bmN0aW9uQXJnTmFtZXMuZXhlYyhsaW5lKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1bMV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFVOS05PV05fRlVOQ1RJT047XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0cmlldmVzIHRoZSBzdXJyb3VuZGluZyBsaW5lcyBmcm9tIHdoZXJlIGFuIGV4Y2VwdGlvbiBvY2N1cnJlZC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIFVSTCBvZiBzb3VyY2UgY29kZS5cbiAgICAgKiBAcGFyYW0geyhzdHJpbmd8bnVtYmVyKX0gbGluZSBMaW5lIG51bWJlciBpbiBzb3VyY2UgY29kZSB0byBjZW50cmVcbiAgICAgKiBhcm91bmQgZm9yIGNvbnRleHQuXG4gICAgICogQHJldHVybiB7P0FycmF5LjxzdHJpbmc+fSBMaW5lcyBvZiBzb3VyY2UgY29kZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnYXRoZXJDb250ZXh0KHVybCwgbGluZSkge1xuICAgICAgICB2YXIgc291cmNlID0gZ2V0U291cmNlKHVybCk7XG5cbiAgICAgICAgaWYgKCFzb3VyY2UubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjb250ZXh0ID0gW10sXG4gICAgICAgICAgICAvLyBsaW5lc0JlZm9yZSAmIGxpbmVzQWZ0ZXIgYXJlIGluY2x1c2l2ZSB3aXRoIHRoZSBvZmZlbmRpbmcgbGluZS5cbiAgICAgICAgICAgIC8vIGlmIGxpbmVzT2ZDb250ZXh0IGlzIGV2ZW4sIHRoZXJlIHdpbGwgYmUgb25lIGV4dHJhIGxpbmVcbiAgICAgICAgICAgIC8vICAgKmJlZm9yZSogdGhlIG9mZmVuZGluZyBsaW5lLlxuICAgICAgICAgICAgbGluZXNCZWZvcmUgPSBNYXRoLmZsb29yKFRyYWNlS2l0LmxpbmVzT2ZDb250ZXh0IC8gMiksXG4gICAgICAgICAgICAvLyBBZGQgb25lIGV4dHJhIGxpbmUgaWYgbGluZXNPZkNvbnRleHQgaXMgb2RkXG4gICAgICAgICAgICBsaW5lc0FmdGVyID0gbGluZXNCZWZvcmUgKyAoVHJhY2VLaXQubGluZXNPZkNvbnRleHQgJSAyKSxcbiAgICAgICAgICAgIHN0YXJ0ID0gTWF0aC5tYXgoMCwgbGluZSAtIGxpbmVzQmVmb3JlIC0gMSksXG4gICAgICAgICAgICBlbmQgPSBNYXRoLm1pbihzb3VyY2UubGVuZ3RoLCBsaW5lICsgbGluZXNBZnRlciAtIDEpO1xuXG4gICAgICAgIGxpbmUgLT0gMTsgLy8gY29udmVydCB0byAwLWJhc2VkIGluZGV4XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICAgICAgICAgIGlmICghaXNVbmRlZmluZWQoc291cmNlW2ldKSkge1xuICAgICAgICAgICAgICAgIGNvbnRleHQucHVzaChzb3VyY2VbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvbnRleHQubGVuZ3RoID4gMCA/IGNvbnRleHQgOiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEVzY2FwZXMgc3BlY2lhbCBjaGFyYWN0ZXJzLCBleGNlcHQgZm9yIHdoaXRlc3BhY2UsIGluIGEgc3RyaW5nIHRvIGJlXG4gICAgICogdXNlZCBpbnNpZGUgYSByZWd1bGFyIGV4cHJlc3Npb24gYXMgYSBzdHJpbmcgbGl0ZXJhbC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCBUaGUgc3RyaW5nLlxuICAgICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIGVzY2FwZWQgc3RyaW5nIGxpdGVyYWwuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZXNjYXBlUmVnRXhwKHRleHQpIHtcbiAgICAgICAgcmV0dXJuIHRleHQucmVwbGFjZSgvW1xcLVxcW1xcXXt9KCkqKz8uLFxcXFxcXF4kfCNdL2csICdcXFxcJCYnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFc2NhcGVzIHNwZWNpYWwgY2hhcmFjdGVycyBpbiBhIHN0cmluZyB0byBiZSB1c2VkIGluc2lkZSBhIHJlZ3VsYXJcbiAgICAgKiBleHByZXNzaW9uIGFzIGEgc3RyaW5nIGxpdGVyYWwuIEFsc28gZW5zdXJlcyB0aGF0IEhUTUwgZW50aXRpZXMgd2lsbFxuICAgICAqIGJlIG1hdGNoZWQgdGhlIHNhbWUgYXMgdGhlaXIgbGl0ZXJhbCBmcmllbmRzLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBib2R5IFRoZSBzdHJpbmcuXG4gICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgZXNjYXBlZCBzdHJpbmcuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZXNjYXBlQ29kZUFzUmVnRXhwRm9yTWF0Y2hpbmdJbnNpZGVIVE1MKGJvZHkpIHtcbiAgICAgICAgcmV0dXJuIGVzY2FwZVJlZ0V4cChib2R5KS5yZXBsYWNlKCc8JywgJyg/Ojx8Jmx0OyknKS5yZXBsYWNlKCc+JywgJyg/Oj58Jmd0OyknKS5yZXBsYWNlKCcmJywgJyg/OiZ8JmFtcDspJykucmVwbGFjZSgnXCInLCAnKD86XCJ8JnF1b3Q7KScpLnJlcGxhY2UoL1xccysvZywgJ1xcXFxzKycpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERldGVybWluZXMgd2hlcmUgYSBjb2RlIGZyYWdtZW50IG9jY3VycyBpbiB0aGUgc291cmNlIGNvZGUuXG4gICAgICogQHBhcmFtIHtSZWdFeHB9IHJlIFRoZSBmdW5jdGlvbiBkZWZpbml0aW9uLlxuICAgICAqIEBwYXJhbSB7QXJyYXkuPHN0cmluZz59IHVybHMgQSBsaXN0IG9mIFVSTHMgdG8gc2VhcmNoLlxuICAgICAqIEByZXR1cm4gez9PYmplY3QuPHN0cmluZywgKHN0cmluZ3xudW1iZXIpPn0gQW4gb2JqZWN0IGNvbnRhaW5pbmdcbiAgICAgKiB0aGUgdXJsLCBsaW5lLCBhbmQgY29sdW1uIG51bWJlciBvZiB0aGUgZGVmaW5lZCBmdW5jdGlvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBmaW5kU291cmNlSW5VcmxzKHJlLCB1cmxzKSB7XG4gICAgICAgIHZhciBzb3VyY2UsIG07XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBqID0gdXJscy5sZW5ndGg7IGkgPCBqOyArK2kpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdzZWFyY2hpbmcnLCB1cmxzW2ldKTtcbiAgICAgICAgICAgIGlmICgoc291cmNlID0gZ2V0U291cmNlKHVybHNbaV0pKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBzb3VyY2UgPSBzb3VyY2Uuam9pbignXFxuJyk7XG4gICAgICAgICAgICAgICAgaWYgKChtID0gcmUuZXhlYyhzb3VyY2UpKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnRm91bmQgZnVuY3Rpb24gaW4gJyArIHVybHNbaV0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAndXJsJzogdXJsc1tpXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdsaW5lJzogc291cmNlLnN1YnN0cmluZygwLCBtLmluZGV4KS5zcGxpdCgnXFxuJykubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2NvbHVtbic6IG0uaW5kZXggLSBzb3VyY2UubGFzdEluZGV4T2YoJ1xcbicsIG0uaW5kZXgpIC0gMVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdubyBtYXRjaCcpO1xuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERldGVybWluZXMgYXQgd2hpY2ggY29sdW1uIGEgY29kZSBmcmFnbWVudCBvY2N1cnMgb24gYSBsaW5lIG9mIHRoZVxuICAgICAqIHNvdXJjZSBjb2RlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmcmFnbWVudCBUaGUgY29kZSBmcmFnbWVudC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gc2VhcmNoLlxuICAgICAqIEBwYXJhbSB7KHN0cmluZ3xudW1iZXIpfSBsaW5lIFRoZSBsaW5lIG51bWJlciB0byBleGFtaW5lLlxuICAgICAqIEByZXR1cm4gez9udW1iZXJ9IFRoZSBjb2x1bW4gbnVtYmVyLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGZpbmRTb3VyY2VJbkxpbmUoZnJhZ21lbnQsIHVybCwgbGluZSkge1xuICAgICAgICB2YXIgc291cmNlID0gZ2V0U291cmNlKHVybCksXG4gICAgICAgICAgICByZSA9IG5ldyBSZWdFeHAoJ1xcXFxiJyArIGVzY2FwZVJlZ0V4cChmcmFnbWVudCkgKyAnXFxcXGInKSxcbiAgICAgICAgICAgIG07XG5cbiAgICAgICAgbGluZSAtPSAxO1xuXG4gICAgICAgIGlmIChzb3VyY2UgJiYgc291cmNlLmxlbmd0aCA+IGxpbmUgJiYgKG0gPSByZS5leGVjKHNvdXJjZVtsaW5lXSkpKSB7XG4gICAgICAgICAgICByZXR1cm4gbS5pbmRleDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERldGVybWluZXMgd2hlcmUgYSBmdW5jdGlvbiB3YXMgZGVmaW5lZCB3aXRoaW4gdGhlIHNvdXJjZSBjb2RlLlxuICAgICAqIEBwYXJhbSB7KEZ1bmN0aW9ufHN0cmluZyl9IGZ1bmMgQSBmdW5jdGlvbiByZWZlcmVuY2Ugb3Igc2VyaWFsaXplZFxuICAgICAqIGZ1bmN0aW9uIGRlZmluaXRpb24uXG4gICAgICogQHJldHVybiB7P09iamVjdC48c3RyaW5nLCAoc3RyaW5nfG51bWJlcik+fSBBbiBvYmplY3QgY29udGFpbmluZ1xuICAgICAqIHRoZSB1cmwsIGxpbmUsIGFuZCBjb2x1bW4gbnVtYmVyIG9mIHRoZSBkZWZpbmVkIGZ1bmN0aW9uLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGZpbmRTb3VyY2VCeUZ1bmN0aW9uQm9keShmdW5jKSB7XG4gICAgICAgIHZhciB1cmxzID0gW3dpbmRvdy5sb2NhdGlvbi5ocmVmXSxcbiAgICAgICAgICAgIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JyksXG4gICAgICAgICAgICBib2R5LFxuICAgICAgICAgICAgY29kZSA9ICcnICsgZnVuYyxcbiAgICAgICAgICAgIGNvZGVSRSA9IC9eZnVuY3Rpb24oPzpcXHMrKFtcXHckXSspKT9cXHMqXFwoKFtcXHdcXHMsXSopXFwpXFxzKlxce1xccyooXFxTW1xcc1xcU10qXFxTKVxccypcXH1cXHMqJC8sXG4gICAgICAgICAgICBldmVudFJFID0gL15mdW5jdGlvbiBvbihbXFx3JF0rKVxccypcXChldmVudFxcKVxccypcXHtcXHMqKFxcU1tcXHNcXFNdKlxcUylcXHMqXFx9XFxzKiQvLFxuICAgICAgICAgICAgcmUsXG4gICAgICAgICAgICBwYXJ0cyxcbiAgICAgICAgICAgIHJlc3VsdDtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNjcmlwdHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHZhciBzY3JpcHQgPSBzY3JpcHRzW2ldO1xuICAgICAgICAgICAgaWYgKHNjcmlwdC5zcmMpIHtcbiAgICAgICAgICAgICAgICB1cmxzLnB1c2goc2NyaXB0LnNyYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIShwYXJ0cyA9IGNvZGVSRS5leGVjKGNvZGUpKSkge1xuICAgICAgICAgICAgcmUgPSBuZXcgUmVnRXhwKGVzY2FwZVJlZ0V4cChjb2RlKS5yZXBsYWNlKC9cXHMrL2csICdcXFxccysnKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBub3Qgc3VyZSBpZiB0aGlzIGlzIHJlYWxseSBuZWNlc3NhcnksIGJ1dCBJIGRvbuKAmXQgaGF2ZSBhIHRlc3RcbiAgICAgICAgLy8gY29ycHVzIGxhcmdlIGVub3VnaCB0byBjb25maXJtIHRoYXQgYW5kIGl0IHdhcyBpbiB0aGUgb3JpZ2luYWwuXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIG5hbWUgPSBwYXJ0c1sxXSA/ICdcXFxccysnICsgcGFydHNbMV0gOiAnJyxcbiAgICAgICAgICAgICAgICBhcmdzID0gcGFydHNbMl0uc3BsaXQoJywnKS5qb2luKCdcXFxccyosXFxcXHMqJyk7XG5cbiAgICAgICAgICAgIGJvZHkgPSBlc2NhcGVSZWdFeHAocGFydHNbM10pLnJlcGxhY2UoLzskLywgJzs/Jyk7IC8vIHNlbWljb2xvbiBpcyBpbnNlcnRlZCBpZiB0aGUgZnVuY3Rpb24gZW5kcyB3aXRoIGEgY29tbWVudC5yZXBsYWNlKC9cXHMrL2csICdcXFxccysnKTtcbiAgICAgICAgICAgIHJlID0gbmV3IFJlZ0V4cCgnZnVuY3Rpb24nICsgbmFtZSArICdcXFxccypcXFxcKFxcXFxzKicgKyBhcmdzICsgJ1xcXFxzKlxcXFwpXFxcXHMqe1xcXFxzKicgKyBib2R5ICsgJ1xcXFxzKn0nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGxvb2sgZm9yIGEgbm9ybWFsIGZ1bmN0aW9uIGRlZmluaXRpb25cbiAgICAgICAgaWYgKChyZXN1bHQgPSBmaW5kU291cmNlSW5VcmxzKHJlLCB1cmxzKSkpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBsb29rIGZvciBhbiBvbGQtc2Nob29sIGV2ZW50IGhhbmRsZXIgZnVuY3Rpb25cbiAgICAgICAgaWYgKChwYXJ0cyA9IGV2ZW50UkUuZXhlYyhjb2RlKSkpIHtcbiAgICAgICAgICAgIHZhciBldmVudCA9IHBhcnRzWzFdO1xuICAgICAgICAgICAgYm9keSA9IGVzY2FwZUNvZGVBc1JlZ0V4cEZvck1hdGNoaW5nSW5zaWRlSFRNTChwYXJ0c1syXSk7XG5cbiAgICAgICAgICAgIC8vIGxvb2sgZm9yIGEgZnVuY3Rpb24gZGVmaW5lZCBpbiBIVE1MIGFzIGFuIG9uWFhYIGhhbmRsZXJcbiAgICAgICAgICAgIHJlID0gbmV3IFJlZ0V4cCgnb24nICsgZXZlbnQgKyAnPVtcXFxcXFwnXCJdXFxcXHMqJyArIGJvZHkgKyAnXFxcXHMqW1xcXFxcXCdcIl0nLCAnaScpO1xuXG4gICAgICAgICAgICBpZiAoKHJlc3VsdCA9IGZpbmRTb3VyY2VJblVybHMocmUsIHVybHNbMF0pKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGxvb2sgZm9yID8/P1xuICAgICAgICAgICAgcmUgPSBuZXcgUmVnRXhwKGJvZHkpO1xuXG4gICAgICAgICAgICBpZiAoKHJlc3VsdCA9IGZpbmRTb3VyY2VJblVybHMocmUsIHVybHMpKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBDb250ZW50cyBvZiBFeGNlcHRpb24gaW4gdmFyaW91cyBicm93c2Vycy5cbiAgICAvL1xuICAgIC8vIFNBRkFSSTpcbiAgICAvLyBleC5tZXNzYWdlID0gQ2FuJ3QgZmluZCB2YXJpYWJsZTogcXFcbiAgICAvLyBleC5saW5lID0gNTlcbiAgICAvLyBleC5zb3VyY2VJZCA9IDU4MDIzODE5MlxuICAgIC8vIGV4LnNvdXJjZVVSTCA9IGh0dHA6Ly8uLi5cbiAgICAvLyBleC5leHByZXNzaW9uQmVnaW5PZmZzZXQgPSA5NlxuICAgIC8vIGV4LmV4cHJlc3Npb25DYXJldE9mZnNldCA9IDk4XG4gICAgLy8gZXguZXhwcmVzc2lvbkVuZE9mZnNldCA9IDk4XG4gICAgLy8gZXgubmFtZSA9IFJlZmVyZW5jZUVycm9yXG4gICAgLy9cbiAgICAvLyBGSVJFRk9YOlxuICAgIC8vIGV4Lm1lc3NhZ2UgPSBxcSBpcyBub3QgZGVmaW5lZFxuICAgIC8vIGV4LmZpbGVOYW1lID0gaHR0cDovLy4uLlxuICAgIC8vIGV4LmxpbmVOdW1iZXIgPSA1OVxuICAgIC8vIGV4LmNvbHVtbk51bWJlciA9IDY5XG4gICAgLy8gZXguc3RhY2sgPSAuLi5zdGFjayB0cmFjZS4uLiAoc2VlIHRoZSBleGFtcGxlIGJlbG93KVxuICAgIC8vIGV4Lm5hbWUgPSBSZWZlcmVuY2VFcnJvclxuICAgIC8vXG4gICAgLy8gQ0hST01FOlxuICAgIC8vIGV4Lm1lc3NhZ2UgPSBxcSBpcyBub3QgZGVmaW5lZFxuICAgIC8vIGV4Lm5hbWUgPSBSZWZlcmVuY2VFcnJvclxuICAgIC8vIGV4LnR5cGUgPSBub3RfZGVmaW5lZFxuICAgIC8vIGV4LmFyZ3VtZW50cyA9IFsnYWEnXVxuICAgIC8vIGV4LnN0YWNrID0gLi4uc3RhY2sgdHJhY2UuLi5cbiAgICAvL1xuICAgIC8vIElOVEVSTkVUIEVYUExPUkVSOlxuICAgIC8vIGV4Lm1lc3NhZ2UgPSAuLi5cbiAgICAvLyBleC5uYW1lID0gUmVmZXJlbmNlRXJyb3JcbiAgICAvL1xuICAgIC8vIE9QRVJBOlxuICAgIC8vIGV4Lm1lc3NhZ2UgPSAuLi5tZXNzYWdlLi4uIChzZWUgdGhlIGV4YW1wbGUgYmVsb3cpXG4gICAgLy8gZXgubmFtZSA9IFJlZmVyZW5jZUVycm9yXG4gICAgLy8gZXgub3BlcmEjc291cmNlbG9jID0gMTEgIChwcmV0dHkgbXVjaCB1c2VsZXNzLCBkdXBsaWNhdGVzIHRoZSBpbmZvIGluIGV4Lm1lc3NhZ2UpXG4gICAgLy8gZXguc3RhY2t0cmFjZSA9IG4vYTsgc2VlICdvcGVyYTpjb25maWcjVXNlclByZWZzfEV4Y2VwdGlvbnMgSGF2ZSBTdGFja3RyYWNlJ1xuXG4gICAgLyoqXG4gICAgICogQ29tcHV0ZXMgc3RhY2sgdHJhY2UgaW5mb3JtYXRpb24gZnJvbSB0aGUgc3RhY2sgcHJvcGVydHkuXG4gICAgICogQ2hyb21lIGFuZCBHZWNrbyB1c2UgdGhpcyBwcm9wZXJ0eS5cbiAgICAgKiBAcGFyYW0ge0Vycm9yfSBleFxuICAgICAqIEByZXR1cm4gez9PYmplY3QuPHN0cmluZywgKj59IFN0YWNrIHRyYWNlIGluZm9ybWF0aW9uLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNvbXB1dGVTdGFja1RyYWNlRnJvbVN0YWNrUHJvcChleCkge1xuICAgICAgICBpZiAoIWV4LnN0YWNrKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjaHJvbWUgPSAvXlxccyphdCAoLio/KSA/XFwoPygoPzpmaWxlfGh0dHBzP3xjaHJvbWUtZXh0ZW5zaW9uKTouKj8pOihcXGQrKSg/OjooXFxkKykpP1xcKT9cXHMqJC9pLFxuICAgICAgICAgICAgZ2Vja28gPSAvXlxccyooLio/KSg/OlxcKCguKj8pXFwpKT9AKCg/OmZpbGV8aHR0cHM/fGNocm9tZSkuKj8pOihcXGQrKSg/OjooXFxkKykpP1xccyokL2ksXG4gICAgICAgICAgICBsaW5lcyA9IGV4LnN0YWNrLnNwbGl0KCdcXG4nKSxcbiAgICAgICAgICAgIHN0YWNrID0gW10sXG4gICAgICAgICAgICBwYXJ0cyxcbiAgICAgICAgICAgIGVsZW1lbnQsXG4gICAgICAgICAgICByZWZlcmVuY2UgPSAvXiguKikgaXMgdW5kZWZpbmVkJC8uZXhlYyhleC5tZXNzYWdlKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMCwgaiA9IGxpbmVzLmxlbmd0aDsgaSA8IGo7ICsraSkge1xuICAgICAgICAgICAgaWYgKChwYXJ0cyA9IGdlY2tvLmV4ZWMobGluZXNbaV0pKSkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSB7XG4gICAgICAgICAgICAgICAgICAgICd1cmwnOiBwYXJ0c1szXSxcbiAgICAgICAgICAgICAgICAgICAgJ2Z1bmMnOiBwYXJ0c1sxXSB8fCBVTktOT1dOX0ZVTkNUSU9OLFxuICAgICAgICAgICAgICAgICAgICAnYXJncyc6IHBhcnRzWzJdID8gcGFydHNbMl0uc3BsaXQoJywnKSA6ICcnLFxuICAgICAgICAgICAgICAgICAgICAnbGluZSc6ICtwYXJ0c1s0XSxcbiAgICAgICAgICAgICAgICAgICAgJ2NvbHVtbic6IHBhcnRzWzVdID8gK3BhcnRzWzVdIDogbnVsbFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGVsc2UgaWYgKChwYXJ0cyA9IGNocm9tZS5leGVjKGxpbmVzW2ldKSkpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0ge1xuICAgICAgICAgICAgICAgICAgICAndXJsJzogcGFydHNbMl0sXG4gICAgICAgICAgICAgICAgICAgICdmdW5jJzogcGFydHNbMV0gfHwgVU5LTk9XTl9GVU5DVElPTixcbiAgICAgICAgICAgICAgICAgICAgJ2xpbmUnOiArcGFydHNbM10sXG4gICAgICAgICAgICAgICAgICAgICdjb2x1bW4nOiBwYXJ0c1s0XSA/ICtwYXJ0c1s0XSA6IG51bGxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFlbGVtZW50LmZ1bmMgJiYgZWxlbWVudC5saW5lKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5mdW5jID0gZ3Vlc3NGdW5jdGlvbk5hbWUoZWxlbWVudC51cmwsIGVsZW1lbnQubGluZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChlbGVtZW50LmxpbmUpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNvbnRleHQgPSBnYXRoZXJDb250ZXh0KGVsZW1lbnQudXJsLCBlbGVtZW50LmxpbmUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzdGFjay5wdXNoKGVsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFzdGFjay5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0YWNrWzBdLmxpbmUgJiYgIXN0YWNrWzBdLmNvbHVtbiAmJiByZWZlcmVuY2UpIHtcbiAgICAgICAgICAgIHN0YWNrWzBdLmNvbHVtbiA9IGZpbmRTb3VyY2VJbkxpbmUocmVmZXJlbmNlWzFdLCBzdGFja1swXS51cmwsIHN0YWNrWzBdLmxpbmUpO1xuICAgICAgICB9IGVsc2UgaWYgKCFzdGFja1swXS5jb2x1bW4gJiYgIWlzVW5kZWZpbmVkKGV4LmNvbHVtbk51bWJlcikpIHtcbiAgICAgICAgICAgIC8vIEZpcmVGb3ggdXNlcyB0aGlzIGF3ZXNvbWUgY29sdW1uTnVtYmVyIHByb3BlcnR5IGZvciBpdHMgdG9wIGZyYW1lXG4gICAgICAgICAgICAvLyBBbHNvIG5vdGUsIEZpcmVmb3gncyBjb2x1bW4gbnVtYmVyIGlzIDAtYmFzZWQgYW5kIGV2ZXJ5dGhpbmcgZWxzZSBleHBlY3RzIDEtYmFzZWQsXG4gICAgICAgICAgICAvLyBzbyBhZGRpbmcgMVxuICAgICAgICAgICAgc3RhY2tbMF0uY29sdW1uID0gZXguY29sdW1uTnVtYmVyICsgMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAnbmFtZSc6IGV4Lm5hbWUsXG4gICAgICAgICAgICAnbWVzc2FnZSc6IGV4Lm1lc3NhZ2UsXG4gICAgICAgICAgICAndXJsJzogZG9jdW1lbnQubG9jYXRpb24uaHJlZixcbiAgICAgICAgICAgICdzdGFjayc6IHN0YWNrXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29tcHV0ZXMgc3RhY2sgdHJhY2UgaW5mb3JtYXRpb24gZnJvbSB0aGUgc3RhY2t0cmFjZSBwcm9wZXJ0eS5cbiAgICAgKiBPcGVyYSAxMCB1c2VzIHRoaXMgcHJvcGVydHkuXG4gICAgICogQHBhcmFtIHtFcnJvcn0gZXhcbiAgICAgKiBAcmV0dXJuIHs/T2JqZWN0LjxzdHJpbmcsICo+fSBTdGFjayB0cmFjZSBpbmZvcm1hdGlvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjb21wdXRlU3RhY2tUcmFjZUZyb21TdGFja3RyYWNlUHJvcChleCkge1xuICAgICAgICAvLyBBY2Nlc3MgYW5kIHN0b3JlIHRoZSBzdGFja3RyYWNlIHByb3BlcnR5IGJlZm9yZSBkb2luZyBBTllUSElOR1xuICAgICAgICAvLyBlbHNlIHRvIGl0IGJlY2F1c2UgT3BlcmEgaXMgbm90IHZlcnkgZ29vZCBhdCBwcm92aWRpbmcgaXRcbiAgICAgICAgLy8gcmVsaWFibHkgaW4gb3RoZXIgY2lyY3Vtc3RhbmNlcy5cbiAgICAgICAgdmFyIHN0YWNrdHJhY2UgPSBleC5zdGFja3RyYWNlO1xuXG4gICAgICAgIHZhciB0ZXN0UkUgPSAvIGxpbmUgKFxcZCspLCBjb2x1bW4gKFxcZCspIGluICg/Ojxhbm9ueW1vdXMgZnVuY3Rpb246IChbXj5dKyk+fChbXlxcKV0rKSlcXCgoLiopXFwpIGluICguKik6XFxzKiQvaSxcbiAgICAgICAgICAgIGxpbmVzID0gc3RhY2t0cmFjZS5zcGxpdCgnXFxuJyksXG4gICAgICAgICAgICBzdGFjayA9IFtdLFxuICAgICAgICAgICAgcGFydHM7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGogPSBsaW5lcy5sZW5ndGg7IGkgPCBqOyBpICs9IDIpIHtcbiAgICAgICAgICAgIGlmICgocGFydHMgPSB0ZXN0UkUuZXhlYyhsaW5lc1tpXSkpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSB7XG4gICAgICAgICAgICAgICAgICAgICdsaW5lJzogK3BhcnRzWzFdLFxuICAgICAgICAgICAgICAgICAgICAnY29sdW1uJzogK3BhcnRzWzJdLFxuICAgICAgICAgICAgICAgICAgICAnZnVuYyc6IHBhcnRzWzNdIHx8IHBhcnRzWzRdLFxuICAgICAgICAgICAgICAgICAgICAnYXJncyc6IHBhcnRzWzVdID8gcGFydHNbNV0uc3BsaXQoJywnKSA6IFtdLFxuICAgICAgICAgICAgICAgICAgICAndXJsJzogcGFydHNbNl1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgaWYgKCFlbGVtZW50LmZ1bmMgJiYgZWxlbWVudC5saW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuZnVuYyA9IGd1ZXNzRnVuY3Rpb25OYW1lKGVsZW1lbnQudXJsLCBlbGVtZW50LmxpbmUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5saW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmNvbnRleHQgPSBnYXRoZXJDb250ZXh0KGVsZW1lbnQudXJsLCBlbGVtZW50LmxpbmUpO1xuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChleGMpIHt9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCFlbGVtZW50LmNvbnRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5jb250ZXh0ID0gW2xpbmVzW2kgKyAxXV07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc3RhY2sucHVzaChlbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghc3RhY2subGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAnbmFtZSc6IGV4Lm5hbWUsXG4gICAgICAgICAgICAnbWVzc2FnZSc6IGV4Lm1lc3NhZ2UsXG4gICAgICAgICAgICAndXJsJzogZG9jdW1lbnQubG9jYXRpb24uaHJlZixcbiAgICAgICAgICAgICdzdGFjayc6IHN0YWNrXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTk9UIFRFU1RFRC5cbiAgICAgKiBDb21wdXRlcyBzdGFjayB0cmFjZSBpbmZvcm1hdGlvbiBmcm9tIGFuIGVycm9yIG1lc3NhZ2UgdGhhdCBpbmNsdWRlc1xuICAgICAqIHRoZSBzdGFjayB0cmFjZS5cbiAgICAgKiBPcGVyYSA5IGFuZCBlYXJsaWVyIHVzZSB0aGlzIG1ldGhvZCBpZiB0aGUgb3B0aW9uIHRvIHNob3cgc3RhY2tcbiAgICAgKiB0cmFjZXMgaXMgdHVybmVkIG9uIGluIG9wZXJhOmNvbmZpZy5cbiAgICAgKiBAcGFyYW0ge0Vycm9yfSBleFxuICAgICAqIEByZXR1cm4gez9PYmplY3QuPHN0cmluZywgKj59IFN0YWNrIGluZm9ybWF0aW9uLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNvbXB1dGVTdGFja1RyYWNlRnJvbU9wZXJhTXVsdGlMaW5lTWVzc2FnZShleCkge1xuICAgICAgICAvLyBPcGVyYSBpbmNsdWRlcyBhIHN0YWNrIHRyYWNlIGludG8gdGhlIGV4Y2VwdGlvbiBtZXNzYWdlLiBBbiBleGFtcGxlIGlzOlxuICAgICAgICAvL1xuICAgICAgICAvLyBTdGF0ZW1lbnQgb24gbGluZSAzOiBVbmRlZmluZWQgdmFyaWFibGU6IHVuZGVmaW5lZEZ1bmNcbiAgICAgICAgLy8gQmFja3RyYWNlOlxuICAgICAgICAvLyAgIExpbmUgMyBvZiBsaW5rZWQgc2NyaXB0IGZpbGU6Ly9sb2NhbGhvc3QvVXNlcnMvYW5kcmV5dml0L1Byb2plY3RzL1RyYWNlS2l0L2phdmFzY3JpcHQtY2xpZW50L3NhbXBsZS5qczogSW4gZnVuY3Rpb24genp6XG4gICAgICAgIC8vICAgICAgICAgdW5kZWZpbmVkRnVuYyhhKTtcbiAgICAgICAgLy8gICBMaW5lIDcgb2YgaW5saW5lIzEgc2NyaXB0IGluIGZpbGU6Ly9sb2NhbGhvc3QvVXNlcnMvYW5kcmV5dml0L1Byb2plY3RzL1RyYWNlS2l0L2phdmFzY3JpcHQtY2xpZW50L3NhbXBsZS5odG1sOiBJbiBmdW5jdGlvbiB5eXlcbiAgICAgICAgLy8gICAgICAgICAgIHp6eih4LCB5LCB6KTtcbiAgICAgICAgLy8gICBMaW5lIDMgb2YgaW5saW5lIzEgc2NyaXB0IGluIGZpbGU6Ly9sb2NhbGhvc3QvVXNlcnMvYW5kcmV5dml0L1Byb2plY3RzL1RyYWNlS2l0L2phdmFzY3JpcHQtY2xpZW50L3NhbXBsZS5odG1sOiBJbiBmdW5jdGlvbiB4eHhcbiAgICAgICAgLy8gICAgICAgICAgIHl5eShhLCBhLCBhKTtcbiAgICAgICAgLy8gICBMaW5lIDEgb2YgZnVuY3Rpb24gc2NyaXB0XG4gICAgICAgIC8vICAgICB0cnkgeyB4eHgoJ2hpJyk7IHJldHVybiBmYWxzZTsgfSBjYXRjaChleCkgeyBUcmFjZUtpdC5yZXBvcnQoZXgpOyB9XG4gICAgICAgIC8vICAgLi4uXG5cbiAgICAgICAgdmFyIGxpbmVzID0gZXgubWVzc2FnZS5zcGxpdCgnXFxuJyk7XG4gICAgICAgIGlmIChsaW5lcy5sZW5ndGggPCA0KSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBsaW5lUkUxID0gL15cXHMqTGluZSAoXFxkKykgb2YgbGlua2VkIHNjcmlwdCAoKD86ZmlsZXxodHRwcz8pXFxTKykoPzo6IGluIGZ1bmN0aW9uIChcXFMrKSk/XFxzKiQvaSxcbiAgICAgICAgICAgIGxpbmVSRTIgPSAvXlxccypMaW5lIChcXGQrKSBvZiBpbmxpbmUjKFxcZCspIHNjcmlwdCBpbiAoKD86ZmlsZXxodHRwcz8pXFxTKykoPzo6IGluIGZ1bmN0aW9uIChcXFMrKSk/XFxzKiQvaSxcbiAgICAgICAgICAgIGxpbmVSRTMgPSAvXlxccypMaW5lIChcXGQrKSBvZiBmdW5jdGlvbiBzY3JpcHRcXHMqJC9pLFxuICAgICAgICAgICAgc3RhY2sgPSBbXSxcbiAgICAgICAgICAgIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JyksXG4gICAgICAgICAgICBpbmxpbmVTY3JpcHRCbG9ja3MgPSBbXSxcbiAgICAgICAgICAgIHBhcnRzLFxuICAgICAgICAgICAgaSxcbiAgICAgICAgICAgIGxlbixcbiAgICAgICAgICAgIHNvdXJjZTtcblxuICAgICAgICBmb3IgKGkgaW4gc2NyaXB0cykge1xuICAgICAgICAgICAgaWYgKGhhc0tleShzY3JpcHRzLCBpKSAmJiAhc2NyaXB0c1tpXS5zcmMpIHtcbiAgICAgICAgICAgICAgICBpbmxpbmVTY3JpcHRCbG9ja3MucHVzaChzY3JpcHRzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoaSA9IDIsIGxlbiA9IGxpbmVzLmxlbmd0aDsgaSA8IGxlbjsgaSArPSAyKSB7XG4gICAgICAgICAgICB2YXIgaXRlbSA9IG51bGw7XG4gICAgICAgICAgICBpZiAoKHBhcnRzID0gbGluZVJFMS5leGVjKGxpbmVzW2ldKSkpIHtcbiAgICAgICAgICAgICAgICBpdGVtID0ge1xuICAgICAgICAgICAgICAgICAgICAndXJsJzogcGFydHNbMl0sXG4gICAgICAgICAgICAgICAgICAgICdmdW5jJzogcGFydHNbM10sXG4gICAgICAgICAgICAgICAgICAgICdsaW5lJzogK3BhcnRzWzFdXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKHBhcnRzID0gbGluZVJFMi5leGVjKGxpbmVzW2ldKSkpIHtcbiAgICAgICAgICAgICAgICBpdGVtID0ge1xuICAgICAgICAgICAgICAgICAgICAndXJsJzogcGFydHNbM10sXG4gICAgICAgICAgICAgICAgICAgICdmdW5jJzogcGFydHNbNF1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHZhciByZWxhdGl2ZUxpbmUgPSAoK3BhcnRzWzFdKTsgLy8gcmVsYXRpdmUgdG8gdGhlIHN0YXJ0IG9mIHRoZSA8U0NSSVBUPiBibG9ja1xuICAgICAgICAgICAgICAgIHZhciBzY3JpcHQgPSBpbmxpbmVTY3JpcHRCbG9ja3NbcGFydHNbMl0gLSAxXTtcbiAgICAgICAgICAgICAgICBpZiAoc2NyaXB0KSB7XG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZSA9IGdldFNvdXJjZShpdGVtLnVybCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZSA9IHNvdXJjZS5qb2luKCdcXG4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwb3MgPSBzb3VyY2UuaW5kZXhPZihzY3JpcHQuaW5uZXJUZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwb3MgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ubGluZSA9IHJlbGF0aXZlTGluZSArIHNvdXJjZS5zdWJzdHJpbmcoMCwgcG9zKS5zcGxpdCgnXFxuJykubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICgocGFydHMgPSBsaW5lUkUzLmV4ZWMobGluZXNbaV0pKSkge1xuICAgICAgICAgICAgICAgIHZhciB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5yZXBsYWNlKC8jLiokLywgJycpLFxuICAgICAgICAgICAgICAgICAgICBsaW5lID0gcGFydHNbMV07XG4gICAgICAgICAgICAgICAgdmFyIHJlID0gbmV3IFJlZ0V4cChlc2NhcGVDb2RlQXNSZWdFeHBGb3JNYXRjaGluZ0luc2lkZUhUTUwobGluZXNbaSArIDFdKSk7XG4gICAgICAgICAgICAgICAgc291cmNlID0gZmluZFNvdXJjZUluVXJscyhyZSwgW3VybF0pO1xuICAgICAgICAgICAgICAgIGl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgICAgICd1cmwnOiB1cmwsXG4gICAgICAgICAgICAgICAgICAgICdsaW5lJzogc291cmNlID8gc291cmNlLmxpbmUgOiBsaW5lLFxuICAgICAgICAgICAgICAgICAgICAnZnVuYyc6ICcnXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBpZiAoIWl0ZW0uZnVuYykge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmZ1bmMgPSBndWVzc0Z1bmN0aW9uTmFtZShpdGVtLnVybCwgaXRlbS5saW5lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIGNvbnRleHQgPSBnYXRoZXJDb250ZXh0KGl0ZW0udXJsLCBpdGVtLmxpbmUpO1xuICAgICAgICAgICAgICAgIHZhciBtaWRsaW5lID0gKGNvbnRleHQgPyBjb250ZXh0W01hdGguZmxvb3IoY29udGV4dC5sZW5ndGggLyAyKV0gOiBudWxsKTtcbiAgICAgICAgICAgICAgICBpZiAoY29udGV4dCAmJiBtaWRsaW5lLnJlcGxhY2UoL15cXHMqLywgJycpID09PSBsaW5lc1tpICsgMV0ucmVwbGFjZSgvXlxccyovLCAnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiAoY29udGV4dCkgYWxlcnQoXCJDb250ZXh0IG1pc21hdGNoLiBDb3JyZWN0IG1pZGxpbmU6XFxuXCIgKyBsaW5lc1tpKzFdICsgXCJcXG5cXG5NaWRsaW5lOlxcblwiICsgbWlkbGluZSArIFwiXFxuXFxuQ29udGV4dDpcXG5cIiArIGNvbnRleHQuam9pbihcIlxcblwiKSArIFwiXFxuXFxuVVJMOlxcblwiICsgaXRlbS51cmwpO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmNvbnRleHQgPSBbbGluZXNbaSArIDFdXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3RhY2sucHVzaChpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIXN0YWNrLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7IC8vIGNvdWxkIG5vdCBwYXJzZSBtdWx0aWxpbmUgZXhjZXB0aW9uIG1lc3NhZ2UgYXMgT3BlcmEgc3RhY2sgdHJhY2VcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAnbmFtZSc6IGV4Lm5hbWUsXG4gICAgICAgICAgICAnbWVzc2FnZSc6IGxpbmVzWzBdLFxuICAgICAgICAgICAgJ3VybCc6IGRvY3VtZW50LmxvY2F0aW9uLmhyZWYsXG4gICAgICAgICAgICAnc3RhY2snOiBzdGFja1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGZpcnN0IGZyYW1lIHRvIGluY29tcGxldGUgc3RhY2sgdHJhY2VzLlxuICAgICAqIFNhZmFyaSBhbmQgSUUgcmVxdWlyZSB0aGlzIHRvIGdldCBjb21wbGV0ZSBkYXRhIG9uIHRoZSBmaXJzdCBmcmFtZS5cbiAgICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCAqPn0gc3RhY2tJbmZvIFN0YWNrIHRyYWNlIGluZm9ybWF0aW9uIGZyb21cbiAgICAgKiBvbmUgb2YgdGhlIGNvbXB1dGUqIG1ldGhvZHMuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIG9mIHRoZSBzY3JpcHQgdGhhdCBjYXVzZWQgYW4gZXJyb3IuXG4gICAgICogQHBhcmFtIHsobnVtYmVyfHN0cmluZyl9IGxpbmVObyBUaGUgbGluZSBudW1iZXIgb2YgdGhlIHNjcmlwdCB0aGF0XG4gICAgICogY2F1c2VkIGFuIGVycm9yLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nPX0gbWVzc2FnZSBUaGUgZXJyb3IgZ2VuZXJhdGVkIGJ5IHRoZSBicm93c2VyLCB3aGljaFxuICAgICAqIGhvcGVmdWxseSBjb250YWlucyB0aGUgbmFtZSBvZiB0aGUgb2JqZWN0IHRoYXQgY2F1c2VkIHRoZSBlcnJvci5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSBXaGV0aGVyIG9yIG5vdCB0aGUgc3RhY2sgaW5mb3JtYXRpb24gd2FzXG4gICAgICogYXVnbWVudGVkLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGF1Z21lbnRTdGFja1RyYWNlV2l0aEluaXRpYWxFbGVtZW50KHN0YWNrSW5mbywgdXJsLCBsaW5lTm8sIG1lc3NhZ2UpIHtcbiAgICAgICAgdmFyIGluaXRpYWwgPSB7XG4gICAgICAgICAgICAndXJsJzogdXJsLFxuICAgICAgICAgICAgJ2xpbmUnOiBsaW5lTm9cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoaW5pdGlhbC51cmwgJiYgaW5pdGlhbC5saW5lKSB7XG4gICAgICAgICAgICBzdGFja0luZm8uaW5jb21wbGV0ZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICBpZiAoIWluaXRpYWwuZnVuYykge1xuICAgICAgICAgICAgICAgIGluaXRpYWwuZnVuYyA9IGd1ZXNzRnVuY3Rpb25OYW1lKGluaXRpYWwudXJsLCBpbml0aWFsLmxpbmUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWluaXRpYWwuY29udGV4dCkge1xuICAgICAgICAgICAgICAgIGluaXRpYWwuY29udGV4dCA9IGdhdGhlckNvbnRleHQoaW5pdGlhbC51cmwsIGluaXRpYWwubGluZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciByZWZlcmVuY2UgPSAvICcoW14nXSspJyAvLmV4ZWMobWVzc2FnZSk7XG4gICAgICAgICAgICBpZiAocmVmZXJlbmNlKSB7XG4gICAgICAgICAgICAgICAgaW5pdGlhbC5jb2x1bW4gPSBmaW5kU291cmNlSW5MaW5lKHJlZmVyZW5jZVsxXSwgaW5pdGlhbC51cmwsIGluaXRpYWwubGluZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzdGFja0luZm8uc3RhY2subGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGlmIChzdGFja0luZm8uc3RhY2tbMF0udXJsID09PSBpbml0aWFsLnVybCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhY2tJbmZvLnN0YWNrWzBdLmxpbmUgPT09IGluaXRpYWwubGluZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBhbHJlYWR5IGluIHN0YWNrIHRyYWNlXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXN0YWNrSW5mby5zdGFja1swXS5saW5lICYmIHN0YWNrSW5mby5zdGFja1swXS5mdW5jID09PSBpbml0aWFsLmZ1bmMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrSW5mby5zdGFja1swXS5saW5lID0gaW5pdGlhbC5saW5lO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2tJbmZvLnN0YWNrWzBdLmNvbnRleHQgPSBpbml0aWFsLmNvbnRleHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHN0YWNrSW5mby5zdGFjay51bnNoaWZ0KGluaXRpYWwpO1xuICAgICAgICAgICAgc3RhY2tJbmZvLnBhcnRpYWwgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdGFja0luZm8uaW5jb21wbGV0ZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29tcHV0ZXMgc3RhY2sgdHJhY2UgaW5mb3JtYXRpb24gYnkgd2Fsa2luZyB0aGUgYXJndW1lbnRzLmNhbGxlclxuICAgICAqIGNoYWluIGF0IHRoZSB0aW1lIHRoZSBleGNlcHRpb24gb2NjdXJyZWQuIFRoaXMgd2lsbCBjYXVzZSBlYXJsaWVyXG4gICAgICogZnJhbWVzIHRvIGJlIG1pc3NlZCBidXQgaXMgdGhlIG9ubHkgd2F5IHRvIGdldCBhbnkgc3RhY2sgdHJhY2UgaW5cbiAgICAgKiBTYWZhcmkgYW5kIElFLiBUaGUgdG9wIGZyYW1lIGlzIHJlc3RvcmVkIGJ5XG4gICAgICoge0BsaW5rIGF1Z21lbnRTdGFja1RyYWNlV2l0aEluaXRpYWxFbGVtZW50fS5cbiAgICAgKiBAcGFyYW0ge0Vycm9yfSBleFxuICAgICAqIEByZXR1cm4gez9PYmplY3QuPHN0cmluZywgKj59IFN0YWNrIHRyYWNlIGluZm9ybWF0aW9uLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNvbXB1dGVTdGFja1RyYWNlQnlXYWxraW5nQ2FsbGVyQ2hhaW4oZXgsIGRlcHRoKSB7XG4gICAgICAgIHZhciBmdW5jdGlvbk5hbWUgPSAvZnVuY3Rpb25cXHMrKFtfJGEtekEtWlxceEEwLVxcdUZGRkZdW18kYS16QS1aMC05XFx4QTAtXFx1RkZGRl0qKT9cXHMqXFwoL2ksXG4gICAgICAgICAgICBzdGFjayA9IFtdLFxuICAgICAgICAgICAgZnVuY3MgPSB7fSxcbiAgICAgICAgICAgIHJlY3Vyc2lvbiA9IGZhbHNlLFxuICAgICAgICAgICAgcGFydHMsXG4gICAgICAgICAgICBpdGVtLFxuICAgICAgICAgICAgc291cmNlO1xuXG4gICAgICAgIGZvciAodmFyIGN1cnIgPSBjb21wdXRlU3RhY2tUcmFjZUJ5V2Fsa2luZ0NhbGxlckNoYWluLmNhbGxlcjsgY3VyciAmJiAhcmVjdXJzaW9uOyBjdXJyID0gY3Vyci5jYWxsZXIpIHtcbiAgICAgICAgICAgIGlmIChjdXJyID09PSBjb21wdXRlU3RhY2tUcmFjZSB8fCBjdXJyID09PSBUcmFjZUtpdC5yZXBvcnQpIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnc2tpcHBpbmcgaW50ZXJuYWwgZnVuY3Rpb24nKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaXRlbSA9IHtcbiAgICAgICAgICAgICAgICAndXJsJzogbnVsbCxcbiAgICAgICAgICAgICAgICAnZnVuYyc6IFVOS05PV05fRlVOQ1RJT04sXG4gICAgICAgICAgICAgICAgJ2xpbmUnOiBudWxsLFxuICAgICAgICAgICAgICAgICdjb2x1bW4nOiBudWxsXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAoY3Vyci5uYW1lKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5mdW5jID0gY3Vyci5uYW1lO1xuICAgICAgICAgICAgfSBlbHNlIGlmICgocGFydHMgPSBmdW5jdGlvbk5hbWUuZXhlYyhjdXJyLnRvU3RyaW5nKCkpKSkge1xuICAgICAgICAgICAgICAgIGl0ZW0uZnVuYyA9IHBhcnRzWzFdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoKHNvdXJjZSA9IGZpbmRTb3VyY2VCeUZ1bmN0aW9uQm9keShjdXJyKSkpIHtcbiAgICAgICAgICAgICAgICBpdGVtLnVybCA9IHNvdXJjZS51cmw7XG4gICAgICAgICAgICAgICAgaXRlbS5saW5lID0gc291cmNlLmxpbmU7XG5cbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5mdW5jID09PSBVTktOT1dOX0ZVTkNUSU9OKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZnVuYyA9IGd1ZXNzRnVuY3Rpb25OYW1lKGl0ZW0udXJsLCBpdGVtLmxpbmUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciByZWZlcmVuY2UgPSAvICcoW14nXSspJyAvLmV4ZWMoZXgubWVzc2FnZSB8fCBleC5kZXNjcmlwdGlvbik7XG4gICAgICAgICAgICAgICAgaWYgKHJlZmVyZW5jZSkge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmNvbHVtbiA9IGZpbmRTb3VyY2VJbkxpbmUocmVmZXJlbmNlWzFdLCBzb3VyY2UudXJsLCBzb3VyY2UubGluZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZnVuY3NbJycgKyBjdXJyXSkge1xuICAgICAgICAgICAgICAgIHJlY3Vyc2lvbiA9IHRydWU7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBmdW5jc1snJyArIGN1cnJdID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3RhY2sucHVzaChpdGVtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkZXB0aCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2RlcHRoIGlzICcgKyBkZXB0aCk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnc3RhY2sgaXMgJyArIHN0YWNrLmxlbmd0aCk7XG4gICAgICAgICAgICBzdGFjay5zcGxpY2UoMCwgZGVwdGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgICAgICAgICduYW1lJzogZXgubmFtZSxcbiAgICAgICAgICAgICdtZXNzYWdlJzogZXgubWVzc2FnZSxcbiAgICAgICAgICAgICd1cmwnOiBkb2N1bWVudC5sb2NhdGlvbi5ocmVmLFxuICAgICAgICAgICAgJ3N0YWNrJzogc3RhY2tcbiAgICAgICAgfTtcbiAgICAgICAgYXVnbWVudFN0YWNrVHJhY2VXaXRoSW5pdGlhbEVsZW1lbnQocmVzdWx0LCBleC5zb3VyY2VVUkwgfHwgZXguZmlsZU5hbWUsIGV4LmxpbmUgfHwgZXgubGluZU51bWJlciwgZXgubWVzc2FnZSB8fCBleC5kZXNjcmlwdGlvbik7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29tcHV0ZXMgYSBzdGFjayB0cmFjZSBmb3IgYW4gZXhjZXB0aW9uLlxuICAgICAqIEBwYXJhbSB7RXJyb3J9IGV4XG4gICAgICogQHBhcmFtIHsoc3RyaW5nfG51bWJlcik9fSBkZXB0aFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNvbXB1dGVTdGFja1RyYWNlKGV4LCBkZXB0aCkge1xuICAgICAgICB2YXIgc3RhY2sgPSBudWxsO1xuICAgICAgICBkZXB0aCA9IChkZXB0aCA9PSBudWxsID8gMCA6ICtkZXB0aCk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFRoaXMgbXVzdCBiZSB0cmllZCBmaXJzdCBiZWNhdXNlIE9wZXJhIDEwICpkZXN0cm95cypcbiAgICAgICAgICAgIC8vIGl0cyBzdGFja3RyYWNlIHByb3BlcnR5IGlmIHlvdSB0cnkgdG8gYWNjZXNzIHRoZSBzdGFja1xuICAgICAgICAgICAgLy8gcHJvcGVydHkgZmlyc3QhIVxuICAgICAgICAgICAgc3RhY2sgPSBjb21wdXRlU3RhY2tUcmFjZUZyb21TdGFja3RyYWNlUHJvcChleCk7XG4gICAgICAgICAgICBpZiAoc3RhY2spIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhY2s7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGlmIChkZWJ1Zykge1xuICAgICAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgc3RhY2sgPSBjb21wdXRlU3RhY2tUcmFjZUZyb21TdGFja1Byb3AoZXgpO1xuICAgICAgICAgICAgaWYgKHN0YWNrKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YWNrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBpZiAoZGVidWcpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHN0YWNrID0gY29tcHV0ZVN0YWNrVHJhY2VGcm9tT3BlcmFNdWx0aUxpbmVNZXNzYWdlKGV4KTtcbiAgICAgICAgICAgIGlmIChzdGFjaykge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdGFjaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgaWYgKGRlYnVnKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzdGFjayA9IGNvbXB1dGVTdGFja1RyYWNlQnlXYWxraW5nQ2FsbGVyQ2hhaW4oZXgsIGRlcHRoICsgMSk7XG4gICAgICAgICAgICBpZiAoc3RhY2spIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhY2s7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGlmIChkZWJ1Zykge1xuICAgICAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge307XG4gICAgfVxuXG4gICAgY29tcHV0ZVN0YWNrVHJhY2UuYXVnbWVudFN0YWNrVHJhY2VXaXRoSW5pdGlhbEVsZW1lbnQgPSBhdWdtZW50U3RhY2tUcmFjZVdpdGhJbml0aWFsRWxlbWVudDtcbiAgICBjb21wdXRlU3RhY2tUcmFjZS5jb21wdXRlU3RhY2tUcmFjZUZyb21TdGFja1Byb3AgPSBjb21wdXRlU3RhY2tUcmFjZUZyb21TdGFja1Byb3A7XG4gICAgY29tcHV0ZVN0YWNrVHJhY2UuZ3Vlc3NGdW5jdGlvbk5hbWUgPSBndWVzc0Z1bmN0aW9uTmFtZTtcbiAgICBjb21wdXRlU3RhY2tUcmFjZS5nYXRoZXJDb250ZXh0ID0gZ2F0aGVyQ29udGV4dDtcblxuICAgIHJldHVybiBjb21wdXRlU3RhY2tUcmFjZTtcbn0oKSk7XG5cbid1c2Ugc3RyaWN0JztcblxuLy8gRmlyc3QsIGNoZWNrIGZvciBKU09OIHN1cHBvcnRcbi8vIElmIHRoZXJlIGlzIG5vIEpTT04sIHdlIG5vLW9wIHRoZSBjb3JlIGZlYXR1cmVzIG9mIFJhdmVuXG4vLyBzaW5jZSBKU09OIGlzIHJlcXVpcmVkIHRvIGVuY29kZSB0aGUgcGF5bG9hZFxudmFyIF9SYXZlbiA9IHdpbmRvdy5SYXZlbixcbiAgICBoYXNKU09OID0gISEodHlwZW9mIEpTT04gPT09ICdvYmplY3QnICYmIEpTT04uc3RyaW5naWZ5KSxcbiAgICBsYXN0Q2FwdHVyZWRFeGNlcHRpb24sXG4gICAgbGFzdEV2ZW50SWQsXG4gICAgZ2xvYmFsU2VydmVyLFxuICAgIGdsb2JhbFVzZXIsXG4gICAgZ2xvYmFsS2V5LFxuICAgIGdsb2JhbFByb2plY3QsXG4gICAgZ2xvYmFsT3B0aW9ucyA9IHtcbiAgICAgICAgbG9nZ2VyOiAnamF2YXNjcmlwdCcsXG4gICAgICAgIGlnbm9yZUVycm9yczogW10sXG4gICAgICAgIGlnbm9yZVVybHM6IFtdLFxuICAgICAgICB3aGl0ZWxpc3RVcmxzOiBbXSxcbiAgICAgICAgaW5jbHVkZVBhdGhzOiBbXSxcbiAgICAgICAgY29sbGVjdFdpbmRvd0Vycm9yczogdHJ1ZSxcbiAgICAgICAgdGFnczoge30sXG4gICAgICAgIG1heE1lc3NhZ2VMZW5ndGg6IDEwMCxcbiAgICAgICAgZXh0cmE6IHt9XG4gICAgfSxcbiAgICBhdXRoUXVlcnlTdHJpbmcsXG4gICAgaXNSYXZlbkluc3RhbGxlZCA9IGZhbHNlLFxuXG4gICAgb2JqZWN0UHJvdG90eXBlID0gT2JqZWN0LnByb3RvdHlwZSxcbiAgICBzdGFydFRpbWUgPSBub3coKTtcblxuLypcbiAqIFRoZSBjb3JlIFJhdmVuIHNpbmdsZXRvblxuICpcbiAqIEB0aGlzIHtSYXZlbn1cbiAqL1xudmFyIFJhdmVuID0ge1xuICAgIFZFUlNJT046ICcxLjEuMTgnLFxuXG4gICAgZGVidWc6IHRydWUsXG5cbiAgICAvKlxuICAgICAqIEFsbG93IG11bHRpcGxlIHZlcnNpb25zIG9mIFJhdmVuIHRvIGJlIGluc3RhbGxlZC5cbiAgICAgKiBTdHJpcCBSYXZlbiBmcm9tIHRoZSBnbG9iYWwgY29udGV4dCBhbmQgcmV0dXJucyB0aGUgaW5zdGFuY2UuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtSYXZlbn1cbiAgICAgKi9cbiAgICBub0NvbmZsaWN0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgd2luZG93LlJhdmVuID0gX1JhdmVuO1xuICAgICAgICByZXR1cm4gUmF2ZW47XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogQ29uZmlndXJlIFJhdmVuIHdpdGggYSBEU04gYW5kIGV4dHJhIG9wdGlvbnNcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkc24gVGhlIHB1YmxpYyBTZW50cnkgRFNOXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgT3B0aW9uYWwgc2V0IG9mIG9mIGdsb2JhbCBvcHRpb25zIFtvcHRpb25hbF1cbiAgICAgKiBAcmV0dXJuIHtSYXZlbn1cbiAgICAgKi9cbiAgICBjb25maWc6IGZ1bmN0aW9uKGRzbiwgb3B0aW9ucykge1xuICAgICAgICBpZiAoZ2xvYmFsU2VydmVyKSB7XG4gICAgICAgICAgICBsb2dEZWJ1ZygnZXJyb3InLCAnRXJyb3I6IFJhdmVuIGhhcyBhbHJlYWR5IGJlZW4gY29uZmlndXJlZCcpO1xuICAgICAgICAgICAgcmV0dXJuIFJhdmVuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZHNuKSByZXR1cm4gUmF2ZW47XG5cbiAgICAgICAgdmFyIHVyaSA9IHBhcnNlRFNOKGRzbiksXG4gICAgICAgICAgICBsYXN0U2xhc2ggPSB1cmkucGF0aC5sYXN0SW5kZXhPZignLycpLFxuICAgICAgICAgICAgcGF0aCA9IHVyaS5wYXRoLnN1YnN0cigxLCBsYXN0U2xhc2gpO1xuXG4gICAgICAgIC8vIG1lcmdlIGluIG9wdGlvbnNcbiAgICAgICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGVhY2gob3B0aW9ucywgZnVuY3Rpb24oa2V5LCB2YWx1ZSl7XG4gICAgICAgICAgICAgICAgZ2xvYmFsT3B0aW9uc1trZXldID0gdmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFwiU2NyaXB0IGVycm9yLlwiIGlzIGhhcmQgY29kZWQgaW50byBicm93c2VycyBmb3IgZXJyb3JzIHRoYXQgaXQgY2FuJ3QgcmVhZC5cbiAgICAgICAgLy8gdGhpcyBpcyB0aGUgcmVzdWx0IG9mIGEgc2NyaXB0IGJlaW5nIHB1bGxlZCBpbiBmcm9tIGFuIGV4dGVybmFsIGRvbWFpbiBhbmQgQ09SUy5cbiAgICAgICAgZ2xvYmFsT3B0aW9ucy5pZ25vcmVFcnJvcnMucHVzaCgvXlNjcmlwdCBlcnJvclxcLj8kLyk7XG4gICAgICAgIGdsb2JhbE9wdGlvbnMuaWdub3JlRXJyb3JzLnB1c2goL15KYXZhc2NyaXB0IGVycm9yOiBTY3JpcHQgZXJyb3JcXC4/IG9uIGxpbmUgMCQvKTtcblxuICAgICAgICAvLyBqb2luIHJlZ2V4cCBydWxlcyBpbnRvIG9uZSBiaWcgcnVsZVxuICAgICAgICBnbG9iYWxPcHRpb25zLmlnbm9yZUVycm9ycyA9IGpvaW5SZWdFeHAoZ2xvYmFsT3B0aW9ucy5pZ25vcmVFcnJvcnMpO1xuICAgICAgICBnbG9iYWxPcHRpb25zLmlnbm9yZVVybHMgPSBnbG9iYWxPcHRpb25zLmlnbm9yZVVybHMubGVuZ3RoID8gam9pblJlZ0V4cChnbG9iYWxPcHRpb25zLmlnbm9yZVVybHMpIDogZmFsc2U7XG4gICAgICAgIGdsb2JhbE9wdGlvbnMud2hpdGVsaXN0VXJscyA9IGdsb2JhbE9wdGlvbnMud2hpdGVsaXN0VXJscy5sZW5ndGggPyBqb2luUmVnRXhwKGdsb2JhbE9wdGlvbnMud2hpdGVsaXN0VXJscykgOiBmYWxzZTtcbiAgICAgICAgZ2xvYmFsT3B0aW9ucy5pbmNsdWRlUGF0aHMgPSBqb2luUmVnRXhwKGdsb2JhbE9wdGlvbnMuaW5jbHVkZVBhdGhzKTtcblxuICAgICAgICBnbG9iYWxLZXkgPSB1cmkudXNlcjtcbiAgICAgICAgZ2xvYmFsUHJvamVjdCA9IHVyaS5wYXRoLnN1YnN0cihsYXN0U2xhc2ggKyAxKTtcblxuICAgICAgICAvLyBhc3NlbWJsZSB0aGUgZW5kcG9pbnQgZnJvbSB0aGUgdXJpIHBpZWNlc1xuICAgICAgICBnbG9iYWxTZXJ2ZXIgPSAnLy8nICsgdXJpLmhvc3QgK1xuICAgICAgICAgICAgICAgICAgICAgICh1cmkucG9ydCA/ICc6JyArIHVyaS5wb3J0IDogJycpICtcbiAgICAgICAgICAgICAgICAgICAgICAnLycgKyBwYXRoICsgJ2FwaS8nICsgZ2xvYmFsUHJvamVjdCArICcvc3RvcmUvJztcblxuICAgICAgICBpZiAodXJpLnByb3RvY29sKSB7XG4gICAgICAgICAgICBnbG9iYWxTZXJ2ZXIgPSB1cmkucHJvdG9jb2wgKyAnOicgKyBnbG9iYWxTZXJ2ZXI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZ2xvYmFsT3B0aW9ucy5mZXRjaENvbnRleHQpIHtcbiAgICAgICAgICAgIFRyYWNlS2l0LnJlbW90ZUZldGNoaW5nID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChnbG9iYWxPcHRpb25zLmxpbmVzT2ZDb250ZXh0KSB7XG4gICAgICAgICAgICBUcmFjZUtpdC5saW5lc09mQ29udGV4dCA9IGdsb2JhbE9wdGlvbnMubGluZXNPZkNvbnRleHQ7XG4gICAgICAgIH1cblxuICAgICAgICBUcmFjZUtpdC5jb2xsZWN0V2luZG93RXJyb3JzID0gISFnbG9iYWxPcHRpb25zLmNvbGxlY3RXaW5kb3dFcnJvcnM7XG5cbiAgICAgICAgc2V0QXV0aFF1ZXJ5U3RyaW5nKCk7XG5cbiAgICAgICAgLy8gcmV0dXJuIGZvciBjaGFpbmluZ1xuICAgICAgICByZXR1cm4gUmF2ZW47XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogSW5zdGFsbHMgYSBnbG9iYWwgd2luZG93Lm9uZXJyb3IgZXJyb3IgaGFuZGxlclxuICAgICAqIHRvIGNhcHR1cmUgYW5kIHJlcG9ydCB1bmNhdWdodCBleGNlcHRpb25zLlxuICAgICAqIEF0IHRoaXMgcG9pbnQsIGluc3RhbGwoKSBpcyByZXF1aXJlZCB0byBiZSBjYWxsZWQgZHVlXG4gICAgICogdG8gdGhlIHdheSBUcmFjZUtpdCBpcyBzZXQgdXAuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtSYXZlbn1cbiAgICAgKi9cbiAgICBpbnN0YWxsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGlzU2V0dXAoKSAmJiAhaXNSYXZlbkluc3RhbGxlZCkge1xuICAgICAgICAgICAgVHJhY2VLaXQucmVwb3J0LnN1YnNjcmliZShoYW5kbGVTdGFja0luZm8pO1xuICAgICAgICAgICAgaXNSYXZlbkluc3RhbGxlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUmF2ZW47XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogV3JhcCBjb2RlIHdpdGhpbiBhIGNvbnRleHQgc28gUmF2ZW4gY2FuIGNhcHR1cmUgZXJyb3JzXG4gICAgICogcmVsaWFibHkgYWNyb3NzIGRvbWFpbnMgdGhhdCBpcyBleGVjdXRlZCBpbW1lZGlhdGVseS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIEEgc3BlY2lmaWMgc2V0IG9mIG9wdGlvbnMgZm9yIHRoaXMgY29udGV4dCBbb3B0aW9uYWxdXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuYyBUaGUgY2FsbGJhY2sgdG8gYmUgaW1tZWRpYXRlbHkgZXhlY3V0ZWQgd2l0aGluIHRoZSBjb250ZXh0XG4gICAgICogQHBhcmFtIHthcnJheX0gYXJncyBBbiBhcnJheSBvZiBhcmd1bWVudHMgdG8gYmUgY2FsbGVkIHdpdGggdGhlIGNhbGxiYWNrIFtvcHRpb25hbF1cbiAgICAgKi9cbiAgICBjb250ZXh0OiBmdW5jdGlvbihvcHRpb25zLCBmdW5jLCBhcmdzKSB7XG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKG9wdGlvbnMpKSB7XG4gICAgICAgICAgICBhcmdzID0gZnVuYyB8fCBbXTtcbiAgICAgICAgICAgIGZ1bmMgPSBvcHRpb25zO1xuICAgICAgICAgICAgb3B0aW9ucyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBSYXZlbi53cmFwKG9wdGlvbnMsIGZ1bmMpLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAqIFdyYXAgY29kZSB3aXRoaW4gYSBjb250ZXh0IGFuZCByZXR1cm5zIGJhY2sgYSBuZXcgZnVuY3Rpb24gdG8gYmUgZXhlY3V0ZWRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIEEgc3BlY2lmaWMgc2V0IG9mIG9wdGlvbnMgZm9yIHRoaXMgY29udGV4dCBbb3B0aW9uYWxdXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gYmUgd3JhcHBlZCBpbiBhIG5ldyBjb250ZXh0XG4gICAgICogQHJldHVybiB7ZnVuY3Rpb259IFRoZSBuZXdseSB3cmFwcGVkIGZ1bmN0aW9ucyB3aXRoIGEgY29udGV4dFxuICAgICAqL1xuICAgIHdyYXA6IGZ1bmN0aW9uKG9wdGlvbnMsIGZ1bmMpIHtcbiAgICAgICAgLy8gMSBhcmd1bWVudCBoYXMgYmVlbiBwYXNzZWQsIGFuZCBpdCdzIG5vdCBhIGZ1bmN0aW9uXG4gICAgICAgIC8vIHNvIGp1c3QgcmV0dXJuIGl0XG4gICAgICAgIGlmIChpc1VuZGVmaW5lZChmdW5jKSAmJiAhaXNGdW5jdGlvbihvcHRpb25zKSkge1xuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnM7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBvcHRpb25zIGlzIG9wdGlvbmFsXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKG9wdGlvbnMpKSB7XG4gICAgICAgICAgICBmdW5jID0gb3B0aW9ucztcbiAgICAgICAgICAgIG9wdGlvbnMgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBdCB0aGlzIHBvaW50LCB3ZSd2ZSBwYXNzZWQgYWxvbmcgMiBhcmd1bWVudHMsIGFuZCB0aGUgc2Vjb25kIG9uZVxuICAgICAgICAvLyBpcyBub3QgYSBmdW5jdGlvbiBlaXRoZXIsIHNvIHdlJ2xsIGp1c3QgcmV0dXJuIHRoZSBzZWNvbmQgYXJndW1lbnQuXG4gICAgICAgIGlmICghaXNGdW5jdGlvbihmdW5jKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmM7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXZSBkb24ndCB3YW5uYSB3cmFwIGl0IHR3aWNlIVxuICAgICAgICBpZiAoZnVuYy5fX3JhdmVuX18pIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gd3JhcHBlZCgpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gW10sIGkgPSBhcmd1bWVudHMubGVuZ3RoLFxuICAgICAgICAgICAgICAgIGRlZXAgPSAhb3B0aW9ucyB8fCBvcHRpb25zICYmIG9wdGlvbnMuZGVlcCAhPT0gZmFsc2U7XG4gICAgICAgICAgICAvLyBSZWN1cnNpdmVseSB3cmFwIGFsbCBvZiBhIGZ1bmN0aW9uJ3MgYXJndW1lbnRzIHRoYXQgYXJlXG4gICAgICAgICAgICAvLyBmdW5jdGlvbnMgdGhlbXNlbHZlcy5cblxuICAgICAgICAgICAgd2hpbGUoaS0tKSBhcmdzW2ldID0gZGVlcCA/IFJhdmVuLndyYXAob3B0aW9ucywgYXJndW1lbnRzW2ldKSA6IGFyZ3VtZW50c1tpXTtcblxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAvKmpzaGludCAtVzA0MCovXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgICAgICBSYXZlbi5jYXB0dXJlRXhjZXB0aW9uKGUsIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjb3B5IG92ZXIgcHJvcGVydGllcyBvZiB0aGUgb2xkIGZ1bmN0aW9uXG4gICAgICAgIGZvciAodmFyIHByb3BlcnR5IGluIGZ1bmMpIHtcbiAgICAgICAgICAgIGlmIChoYXNLZXkoZnVuYywgcHJvcGVydHkpKSB7XG4gICAgICAgICAgICAgICAgd3JhcHBlZFtwcm9wZXJ0eV0gPSBmdW5jW3Byb3BlcnR5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNpZ25hbCB0aGF0IHRoaXMgZnVuY3Rpb24gaGFzIGJlZW4gd3JhcHBlZCBhbHJlYWR5XG4gICAgICAgIC8vIGZvciBib3RoIGRlYnVnZ2luZyBhbmQgdG8gcHJldmVudCBpdCB0byBiZWluZyB3cmFwcGVkIHR3aWNlXG4gICAgICAgIHdyYXBwZWQuX19yYXZlbl9fID0gdHJ1ZTtcbiAgICAgICAgd3JhcHBlZC5fX2lubmVyX18gPSBmdW5jO1xuXG4gICAgICAgIHJldHVybiB3cmFwcGVkO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAqIFVuaW5zdGFsbHMgdGhlIGdsb2JhbCBlcnJvciBoYW5kbGVyLlxuICAgICAqXG4gICAgICogQHJldHVybiB7UmF2ZW59XG4gICAgICovXG4gICAgdW5pbnN0YWxsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgVHJhY2VLaXQucmVwb3J0LnVuaW5zdGFsbCgpO1xuICAgICAgICBpc1JhdmVuSW5zdGFsbGVkID0gZmFsc2U7XG5cbiAgICAgICAgcmV0dXJuIFJhdmVuO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAqIE1hbnVhbGx5IGNhcHR1cmUgYW4gZXhjZXB0aW9uIGFuZCBzZW5kIGl0IG92ZXIgdG8gU2VudHJ5XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2Vycm9yfSBleCBBbiBleGNlcHRpb24gdG8gYmUgbG9nZ2VkXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgQSBzcGVjaWZpYyBzZXQgb2Ygb3B0aW9ucyBmb3IgdGhpcyBlcnJvciBbb3B0aW9uYWxdXG4gICAgICogQHJldHVybiB7UmF2ZW59XG4gICAgICovXG4gICAgY2FwdHVyZUV4Y2VwdGlvbjogZnVuY3Rpb24oZXgsIG9wdGlvbnMpIHtcbiAgICAgICAgLy8gSWYgbm90IGFuIEVycm9yIGlzIHBhc3NlZCB0aHJvdWdoLCByZWNhbGwgYXMgYSBtZXNzYWdlIGluc3RlYWRcbiAgICAgICAgaWYgKCFpc0Vycm9yKGV4KSkgcmV0dXJuIFJhdmVuLmNhcHR1cmVNZXNzYWdlKGV4LCBvcHRpb25zKTtcblxuICAgICAgICAvLyBTdG9yZSB0aGUgcmF3IGV4Y2VwdGlvbiBvYmplY3QgZm9yIHBvdGVudGlhbCBkZWJ1Z2dpbmcgYW5kIGludHJvc3BlY3Rpb25cbiAgICAgICAgbGFzdENhcHR1cmVkRXhjZXB0aW9uID0gZXg7XG5cbiAgICAgICAgLy8gVHJhY2VLaXQucmVwb3J0IHdpbGwgcmUtcmFpc2UgYW55IGV4Y2VwdGlvbiBwYXNzZWQgdG8gaXQsXG4gICAgICAgIC8vIHdoaWNoIG1lYW5zIHlvdSBoYXZlIHRvIHdyYXAgaXQgaW4gdHJ5L2NhdGNoLiBJbnN0ZWFkLCB3ZVxuICAgICAgICAvLyBjYW4gd3JhcCBpdCBoZXJlIGFuZCBvbmx5IHJlLXJhaXNlIGlmIFRyYWNlS2l0LnJlcG9ydFxuICAgICAgICAvLyByYWlzZXMgYW4gZXhjZXB0aW9uIGRpZmZlcmVudCBmcm9tIHRoZSBvbmUgd2UgYXNrZWQgdG9cbiAgICAgICAgLy8gcmVwb3J0IG9uLlxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgVHJhY2VLaXQucmVwb3J0KGV4LCBvcHRpb25zKTtcbiAgICAgICAgfSBjYXRjaChleDEpIHtcbiAgICAgICAgICAgIGlmKGV4ICE9PSBleDEpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBleDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUmF2ZW47XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogTWFudWFsbHkgc2VuZCBhIG1lc3NhZ2UgdG8gU2VudHJ5XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbXNnIEEgcGxhaW4gbWVzc2FnZSB0byBiZSBjYXB0dXJlZCBpbiBTZW50cnlcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyBBIHNwZWNpZmljIHNldCBvZiBvcHRpb25zIGZvciB0aGlzIG1lc3NhZ2UgW29wdGlvbmFsXVxuICAgICAqIEByZXR1cm4ge1JhdmVufVxuICAgICAqL1xuICAgIGNhcHR1cmVNZXNzYWdlOiBmdW5jdGlvbihtc2csIG9wdGlvbnMpIHtcbiAgICAgICAgLy8gY29uZmlnKCkgYXV0b21hZ2ljYWxseSBjb252ZXJ0cyBpZ25vcmVFcnJvcnMgZnJvbSBhIGxpc3QgdG8gYSBSZWdFeHAgc28gd2UgbmVlZCB0byB0ZXN0IGZvciBhblxuICAgICAgICAvLyBlYXJseSBjYWxsOyB3ZSdsbCBlcnJvciBvbiB0aGUgc2lkZSBvZiBsb2dnaW5nIGFueXRoaW5nIGNhbGxlZCBiZWZvcmUgY29uZmlndXJhdGlvbiBzaW5jZSBpdCdzXG4gICAgICAgIC8vIHByb2JhYmx5IHNvbWV0aGluZyB5b3Ugc2hvdWxkIHNlZTpcbiAgICAgICAgaWYgKCEhZ2xvYmFsT3B0aW9ucy5pZ25vcmVFcnJvcnMudGVzdCAmJiBnbG9iYWxPcHRpb25zLmlnbm9yZUVycm9ycy50ZXN0KG1zZykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZpcmUgYXdheSFcbiAgICAgICAgc2VuZChcbiAgICAgICAgICAgIG9iamVjdE1lcmdlKHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBtc2cgKyAnJyAgLy8gTWFrZSBzdXJlIGl0J3MgYWN0dWFsbHkgYSBzdHJpbmdcbiAgICAgICAgICAgIH0sIG9wdGlvbnMpXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIFJhdmVuO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAqIFNldC9jbGVhciBhIHVzZXIgdG8gYmUgc2VudCBhbG9uZyB3aXRoIHRoZSBwYXlsb2FkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHVzZXIgQW4gb2JqZWN0IHJlcHJlc2VudGluZyB1c2VyIGRhdGEgW29wdGlvbmFsXVxuICAgICAqIEByZXR1cm4ge1JhdmVufVxuICAgICAqL1xuICAgIHNldFVzZXJDb250ZXh0OiBmdW5jdGlvbih1c2VyKSB7XG4gICAgICAgIGdsb2JhbFVzZXIgPSB1c2VyO1xuXG4gICAgICAgIHJldHVybiBSYXZlbjtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBTZXQgZXh0cmEgYXR0cmlidXRlcyB0byBiZSBzZW50IGFsb25nIHdpdGggdGhlIHBheWxvYWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZXh0cmEgQW4gb2JqZWN0IHJlcHJlc2VudGluZyBleHRyYSBkYXRhIFtvcHRpb25hbF1cbiAgICAgKiBAcmV0dXJuIHtSYXZlbn1cbiAgICAgKi9cbiAgICBzZXRFeHRyYUNvbnRleHQ6IGZ1bmN0aW9uKGV4dHJhKSB7XG4gICAgICAgIGdsb2JhbE9wdGlvbnMuZXh0cmEgPSBleHRyYSB8fCB7fTtcblxuICAgICAgICByZXR1cm4gUmF2ZW47XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogU2V0IHRhZ3MgdG8gYmUgc2VudCBhbG9uZyB3aXRoIHRoZSBwYXlsb2FkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHRhZ3MgQW4gb2JqZWN0IHJlcHJlc2VudGluZyB0YWdzIFtvcHRpb25hbF1cbiAgICAgKiBAcmV0dXJuIHtSYXZlbn1cbiAgICAgKi9cbiAgICBzZXRUYWdzQ29udGV4dDogZnVuY3Rpb24odGFncykge1xuICAgICAgICBnbG9iYWxPcHRpb25zLnRhZ3MgPSB0YWdzIHx8IHt9O1xuXG4gICAgICAgIHJldHVybiBSYXZlbjtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBTZXQgcmVsZWFzZSB2ZXJzaW9uIG9mIGFwcGxpY2F0aW9uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmVsZWFzZSBUeXBpY2FsbHkgc29tZXRoaW5nIGxpa2UgYSBnaXQgU0hBIHRvIGlkZW50aWZ5IHZlcnNpb25cbiAgICAgKiBAcmV0dXJuIHtSYXZlbn1cbiAgICAgKi9cbiAgICBzZXRSZWxlYXNlQ29udGV4dDogZnVuY3Rpb24ocmVsZWFzZSkge1xuICAgICAgICBnbG9iYWxPcHRpb25zLnJlbGVhc2UgPSByZWxlYXNlO1xuXG4gICAgICAgIHJldHVybiBSYXZlbjtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBHZXQgdGhlIGxhdGVzdCByYXcgZXhjZXB0aW9uIHRoYXQgd2FzIGNhcHR1cmVkIGJ5IFJhdmVuLlxuICAgICAqXG4gICAgICogQHJldHVybiB7ZXJyb3J9XG4gICAgICovXG4gICAgbGFzdEV4Y2VwdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBsYXN0Q2FwdHVyZWRFeGNlcHRpb247XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogR2V0IHRoZSBsYXN0IGV2ZW50IGlkXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG4gICAgbGFzdEV2ZW50SWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbGFzdEV2ZW50SWQ7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogRGV0ZXJtaW5lIGlmIFJhdmVuIGlzIHNldHVwIGFuZCByZWFkeSB0byBnby5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICovXG4gICAgaXNTZXR1cDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBpc1NldHVwKCk7XG4gICAgfVxufTtcblxuUmF2ZW4uc2V0VXNlciA9IFJhdmVuLnNldFVzZXJDb250ZXh0OyAvLyBUbyBiZSBkZXByZWNhdGVkXG5cbmZ1bmN0aW9uIHRyaWdnZXJFdmVudChldmVudFR5cGUsIG9wdGlvbnMpIHtcbiAgICB2YXIgZXZlbnQsIGtleTtcblxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgZXZlbnRUeXBlID0gJ3JhdmVuJyArIGV2ZW50VHlwZS5zdWJzdHIoMCwxKS50b1VwcGVyQ2FzZSgpICsgZXZlbnRUeXBlLnN1YnN0cigxKTtcblxuICAgIGlmIChkb2N1bWVudC5jcmVhdGVFdmVudCkge1xuICAgICAgICBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdIVE1MRXZlbnRzJyk7XG4gICAgICAgIGV2ZW50LmluaXRFdmVudChldmVudFR5cGUsIHRydWUsIHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnRPYmplY3QoKTtcbiAgICAgICAgZXZlbnQuZXZlbnRUeXBlID0gZXZlbnRUeXBlO1xuICAgIH1cblxuICAgIGZvciAoa2V5IGluIG9wdGlvbnMpIGlmIChoYXNLZXkob3B0aW9ucywga2V5KSkge1xuICAgICAgICBldmVudFtrZXldID0gb3B0aW9uc1trZXldO1xuICAgIH1cblxuICAgIGlmIChkb2N1bWVudC5jcmVhdGVFdmVudCkge1xuICAgICAgICAvLyBJRTkgaWYgc3RhbmRhcmRzXG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIElFOCByZWdhcmRsZXNzIG9mIFF1aXJrcyBvciBTdGFuZGFyZHNcbiAgICAgICAgLy8gSUU5IGlmIHF1aXJrc1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZG9jdW1lbnQuZmlyZUV2ZW50KCdvbicgKyBldmVudC5ldmVudFR5cGUudG9Mb3dlckNhc2UoKSwgZXZlbnQpO1xuICAgICAgICB9IGNhdGNoKGUpIHt9XG4gICAgfVxufVxuXG52YXIgZHNuS2V5cyA9ICdzb3VyY2UgcHJvdG9jb2wgdXNlciBwYXNzIGhvc3QgcG9ydCBwYXRoJy5zcGxpdCgnICcpLFxuICAgIGRzblBhdHRlcm4gPSAvXig/OihcXHcrKTopP1xcL1xcLyhcXHcrKSg6XFx3Kyk/QChbXFx3XFwuLV0rKSg/OjooXFxkKykpPyhcXC8uKikvO1xuXG5mdW5jdGlvbiBSYXZlbkNvbmZpZ0Vycm9yKG1lc3NhZ2UpIHtcbiAgICB0aGlzLm5hbWUgPSAnUmF2ZW5Db25maWdFcnJvcic7XG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbn1cblJhdmVuQ29uZmlnRXJyb3IucHJvdG90eXBlID0gbmV3IEVycm9yKCk7XG5SYXZlbkNvbmZpZ0Vycm9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFJhdmVuQ29uZmlnRXJyb3I7XG5cbi8qKioqIFByaXZhdGUgZnVuY3Rpb25zICoqKiovXG5mdW5jdGlvbiBwYXJzZURTTihzdHIpIHtcbiAgICB2YXIgbSA9IGRzblBhdHRlcm4uZXhlYyhzdHIpLFxuICAgICAgICBkc24gPSB7fSxcbiAgICAgICAgaSA9IDc7XG5cbiAgICB0cnkge1xuICAgICAgICB3aGlsZSAoaS0tKSBkc25bZHNuS2V5c1tpXV0gPSBtW2ldIHx8ICcnO1xuICAgIH0gY2F0Y2goZSkge1xuICAgICAgICB0aHJvdyBuZXcgUmF2ZW5Db25maWdFcnJvcignSW52YWxpZCBEU046ICcgKyBzdHIpO1xuICAgIH1cblxuICAgIGlmIChkc24ucGFzcylcbiAgICAgICAgdGhyb3cgbmV3IFJhdmVuQ29uZmlnRXJyb3IoJ0RvIG5vdCBzcGVjaWZ5IHlvdXIgcHJpdmF0ZSBrZXkgaW4gdGhlIERTTiEnKTtcblxuICAgIHJldHVybiBkc247XG59XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKHdoYXQpIHtcbiAgICByZXR1cm4gdHlwZW9mIHdoYXQgPT09ICd1bmRlZmluZWQnO1xufVxuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHdoYXQpIHtcbiAgICByZXR1cm4gdHlwZW9mIHdoYXQgPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGlzU3RyaW5nKHdoYXQpIHtcbiAgICByZXR1cm4gdHlwZW9mIHdoYXQgPT09ICdzdHJpbmcnO1xufVxuXG5mdW5jdGlvbiBpc09iamVjdCh3aGF0KSB7XG4gICAgcmV0dXJuIHR5cGVvZiB3aGF0ID09PSAnb2JqZWN0JyAmJiB3aGF0ICE9PSBudWxsO1xufVxuXG5mdW5jdGlvbiBpc0VtcHR5T2JqZWN0KHdoYXQpIHtcbiAgICBmb3IgKHZhciBrIGluIHdoYXQpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuLy8gU29ydGEgeWFua2VkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2pveWVudC9ub2RlL2Jsb2IvYWEzYjRiNC9saWIvdXRpbC5qcyNMNTYwXG4vLyB3aXRoIHNvbWUgdGlueSBtb2RpZmljYXRpb25zXG5mdW5jdGlvbiBpc0Vycm9yKHdoYXQpIHtcbiAgICByZXR1cm4gaXNPYmplY3Qod2hhdCkgJiZcbiAgICAgICAgb2JqZWN0UHJvdG90eXBlLnRvU3RyaW5nLmNhbGwod2hhdCkgPT09ICdbb2JqZWN0IEVycm9yXScgfHxcbiAgICAgICAgd2hhdCBpbnN0YW5jZW9mIEVycm9yO1xufVxuXG4vKipcbiAqIGhhc0tleSwgYSBiZXR0ZXIgZm9ybSBvZiBoYXNPd25Qcm9wZXJ0eVxuICogRXhhbXBsZTogaGFzS2V5KE1haW5Ib3N0T2JqZWN0LCBwcm9wZXJ0eSkgPT09IHRydWUvZmFsc2VcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaG9zdCBvYmplY3QgdG8gY2hlY2sgcHJvcGVydHlcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgdG8gY2hlY2tcbiAqL1xuZnVuY3Rpb24gaGFzS2V5KG9iamVjdCwga2V5KSB7XG4gICAgcmV0dXJuIG9iamVjdFByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KTtcbn1cblxuZnVuY3Rpb24gZWFjaChvYmosIGNhbGxiYWNrKSB7XG4gICAgdmFyIGksIGo7XG5cbiAgICBpZiAoaXNVbmRlZmluZWQob2JqLmxlbmd0aCkpIHtcbiAgICAgICAgZm9yIChpIGluIG9iaikge1xuICAgICAgICAgICAgaWYgKGhhc0tleShvYmosIGkpKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChudWxsLCBpLCBvYmpbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaiA9IG9iai5sZW5ndGg7XG4gICAgICAgIGlmIChqKSB7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgajsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChudWxsLCBpLCBvYmpbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5cbmZ1bmN0aW9uIHNldEF1dGhRdWVyeVN0cmluZygpIHtcbiAgICBhdXRoUXVlcnlTdHJpbmcgPVxuICAgICAgICAnP3NlbnRyeV92ZXJzaW9uPTQnICtcbiAgICAgICAgJyZzZW50cnlfY2xpZW50PXJhdmVuLWpzLycgKyBSYXZlbi5WRVJTSU9OICtcbiAgICAgICAgJyZzZW50cnlfa2V5PScgKyBnbG9iYWxLZXk7XG59XG5cblxuZnVuY3Rpb24gaGFuZGxlU3RhY2tJbmZvKHN0YWNrSW5mbywgb3B0aW9ucykge1xuICAgIHZhciBmcmFtZXMgPSBbXTtcblxuICAgIGlmIChzdGFja0luZm8uc3RhY2sgJiYgc3RhY2tJbmZvLnN0YWNrLmxlbmd0aCkge1xuICAgICAgICBlYWNoKHN0YWNrSW5mby5zdGFjaywgZnVuY3Rpb24oaSwgc3RhY2spIHtcbiAgICAgICAgICAgIHZhciBmcmFtZSA9IG5vcm1hbGl6ZUZyYW1lKHN0YWNrKTtcbiAgICAgICAgICAgIGlmIChmcmFtZSkge1xuICAgICAgICAgICAgICAgIGZyYW1lcy5wdXNoKGZyYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdHJpZ2dlckV2ZW50KCdoYW5kbGUnLCB7XG4gICAgICAgIHN0YWNrSW5mbzogc3RhY2tJbmZvLFxuICAgICAgICBvcHRpb25zOiBvcHRpb25zXG4gICAgfSk7XG5cbiAgICBwcm9jZXNzRXhjZXB0aW9uKFxuICAgICAgICBzdGFja0luZm8ubmFtZSxcbiAgICAgICAgc3RhY2tJbmZvLm1lc3NhZ2UsXG4gICAgICAgIHN0YWNrSW5mby51cmwsXG4gICAgICAgIHN0YWNrSW5mby5saW5lbm8sXG4gICAgICAgIGZyYW1lcyxcbiAgICAgICAgb3B0aW9uc1xuICAgICk7XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZUZyYW1lKGZyYW1lKSB7XG4gICAgaWYgKCFmcmFtZS51cmwpIHJldHVybjtcblxuICAgIC8vIG5vcm1hbGl6ZSB0aGUgZnJhbWVzIGRhdGFcbiAgICB2YXIgbm9ybWFsaXplZCA9IHtcbiAgICAgICAgZmlsZW5hbWU6ICAgZnJhbWUudXJsLFxuICAgICAgICBsaW5lbm86ICAgICBmcmFtZS5saW5lLFxuICAgICAgICBjb2xubzogICAgICBmcmFtZS5jb2x1bW4sXG4gICAgICAgICdmdW5jdGlvbic6IGZyYW1lLmZ1bmMgfHwgJz8nXG4gICAgfSwgY29udGV4dCA9IGV4dHJhY3RDb250ZXh0RnJvbUZyYW1lKGZyYW1lKSwgaTtcblxuICAgIGlmIChjb250ZXh0KSB7XG4gICAgICAgIHZhciBrZXlzID0gWydwcmVfY29udGV4dCcsICdjb250ZXh0X2xpbmUnLCAncG9zdF9jb250ZXh0J107XG4gICAgICAgIGkgPSAzO1xuICAgICAgICB3aGlsZSAoaS0tKSBub3JtYWxpemVkW2tleXNbaV1dID0gY29udGV4dFtpXTtcbiAgICB9XG5cbiAgICBub3JtYWxpemVkLmluX2FwcCA9ICEoIC8vIGRldGVybWluZSBpZiBhbiBleGNlcHRpb24gY2FtZSBmcm9tIG91dHNpZGUgb2Ygb3VyIGFwcFxuICAgICAgICAvLyBmaXJzdCB3ZSBjaGVjayB0aGUgZ2xvYmFsIGluY2x1ZGVQYXRocyBsaXN0LlxuICAgICAgICAhZ2xvYmFsT3B0aW9ucy5pbmNsdWRlUGF0aHMudGVzdChub3JtYWxpemVkLmZpbGVuYW1lKSB8fFxuICAgICAgICAvLyBOb3cgd2UgY2hlY2sgZm9yIGZ1biwgaWYgdGhlIGZ1bmN0aW9uIG5hbWUgaXMgUmF2ZW4gb3IgVHJhY2VLaXRcbiAgICAgICAgLyhSYXZlbnxUcmFjZUtpdClcXC4vLnRlc3Qobm9ybWFsaXplZFsnZnVuY3Rpb24nXSkgfHxcbiAgICAgICAgLy8gZmluYWxseSwgd2UgZG8gYSBsYXN0IGRpdGNoIGVmZm9ydCBhbmQgY2hlY2sgZm9yIHJhdmVuLm1pbi5qc1xuICAgICAgICAvcmF2ZW5cXC4obWluXFwuKT9qcyQvLnRlc3Qobm9ybWFsaXplZC5maWxlbmFtZSlcbiAgICApO1xuXG4gICAgcmV0dXJuIG5vcm1hbGl6ZWQ7XG59XG5cbmZ1bmN0aW9uIGV4dHJhY3RDb250ZXh0RnJvbUZyYW1lKGZyYW1lKSB7XG4gICAgLy8gaW1tZWRpYXRlbHkgY2hlY2sgaWYgd2Ugc2hvdWxkIGV2ZW4gYXR0ZW1wdCB0byBwYXJzZSBhIGNvbnRleHRcbiAgICBpZiAoIWZyYW1lLmNvbnRleHQgfHwgIWdsb2JhbE9wdGlvbnMuZmV0Y2hDb250ZXh0KSByZXR1cm47XG5cbiAgICB2YXIgY29udGV4dCA9IGZyYW1lLmNvbnRleHQsXG4gICAgICAgIHBpdm90ID0gfn4oY29udGV4dC5sZW5ndGggLyAyKSxcbiAgICAgICAgaSA9IGNvbnRleHQubGVuZ3RoLCBpc01pbmlmaWVkID0gZmFsc2U7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIC8vIFdlJ3JlIG1ha2luZyBhIGd1ZXNzIHRvIHNlZSBpZiB0aGUgc291cmNlIGlzIG1pbmlmaWVkIG9yIG5vdC5cbiAgICAgICAgLy8gVG8gZG8gdGhhdCwgd2UgbWFrZSB0aGUgYXNzdW1wdGlvbiBpZiAqYW55KiBvZiB0aGUgbGluZXMgcGFzc2VkXG4gICAgICAgIC8vIGluIGFyZSBncmVhdGVyIHRoYW4gMzAwIGNoYXJhY3RlcnMgbG9uZywgd2UgYmFpbC5cbiAgICAgICAgLy8gU2VudHJ5IHdpbGwgc2VlIHRoYXQgdGhlcmUgaXNuJ3QgYSBjb250ZXh0XG4gICAgICAgIGlmIChjb250ZXh0W2ldLmxlbmd0aCA+IDMwMCkge1xuICAgICAgICAgICAgaXNNaW5pZmllZCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpc01pbmlmaWVkKSB7XG4gICAgICAgIC8vIFRoZSBzb3VyY2UgaXMgbWluaWZpZWQgYW5kIHdlIGRvbid0IGtub3cgd2hpY2ggY29sdW1uLiBGdWNrIGl0LlxuICAgICAgICBpZiAoaXNVbmRlZmluZWQoZnJhbWUuY29sdW1uKSkgcmV0dXJuO1xuXG4gICAgICAgIC8vIElmIHRoZSBzb3VyY2UgaXMgbWluaWZpZWQgYW5kIGhhcyBhIGZyYW1lIGNvbHVtblxuICAgICAgICAvLyB3ZSB0YWtlIGEgY2h1bmsgb2YgdGhlIG9mZmVuZGluZyBsaW5lIHRvIGhvcGVmdWxseSBzaGVkIHNvbWUgbGlnaHRcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIFtdLCAgLy8gbm8gcHJlX2NvbnRleHRcbiAgICAgICAgICAgIGNvbnRleHRbcGl2b3RdLnN1YnN0cihmcmFtZS5jb2x1bW4sIDUwKSwgLy8gZ3JhYiA1MCBjaGFyYWN0ZXJzLCBzdGFydGluZyBhdCB0aGUgb2ZmZW5kaW5nIGNvbHVtblxuICAgICAgICAgICAgW10gICAvLyBubyBwb3N0X2NvbnRleHRcbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICByZXR1cm4gW1xuICAgICAgICBjb250ZXh0LnNsaWNlKDAsIHBpdm90KSwgICAgLy8gcHJlX2NvbnRleHRcbiAgICAgICAgY29udGV4dFtwaXZvdF0sICAgICAgICAgICAgIC8vIGNvbnRleHRfbGluZVxuICAgICAgICBjb250ZXh0LnNsaWNlKHBpdm90ICsgMSkgICAgLy8gcG9zdF9jb250ZXh0XG4gICAgXTtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc0V4Y2VwdGlvbih0eXBlLCBtZXNzYWdlLCBmaWxldXJsLCBsaW5lbm8sIGZyYW1lcywgb3B0aW9ucykge1xuICAgIHZhciBzdGFja3RyYWNlLCBsYWJlbCwgaTtcblxuICAgIC8vIEluIHNvbWUgaW5zdGFuY2VzIG1lc3NhZ2UgaXMgbm90IGFjdHVhbGx5IGEgc3RyaW5nLCBubyBpZGVhIHdoeSxcbiAgICAvLyBzbyB3ZSB3YW50IHRvIGFsd2F5cyBjb2VyY2UgaXQgdG8gb25lLlxuICAgIG1lc3NhZ2UgKz0gJyc7XG5cbiAgICAvLyBTb21ldGltZXMgYW4gZXhjZXB0aW9uIGlzIGdldHRpbmcgbG9nZ2VkIGluIFNlbnRyeSBhc1xuICAgIC8vIDxubyBtZXNzYWdlIHZhbHVlPlxuICAgIC8vIFRoaXMgY2FuIG9ubHkgbWVhbiB0aGF0IHRoZSBtZXNzYWdlIHdhcyBmYWxzZXkgc2luY2UgdGhpcyB2YWx1ZVxuICAgIC8vIGlzIGhhcmRjb2RlZCBpbnRvIFNlbnRyeSBpdHNlbGYuXG4gICAgLy8gQXQgdGhpcyBwb2ludCwgaWYgdGhlIG1lc3NhZ2UgaXMgZmFsc2V5LCB3ZSBiYWlsIHNpbmNlIGl0J3MgdXNlbGVzc1xuICAgIGlmICh0eXBlID09PSAnRXJyb3InICYmICFtZXNzYWdlKSByZXR1cm47XG5cbiAgICBpZiAoZ2xvYmFsT3B0aW9ucy5pZ25vcmVFcnJvcnMudGVzdChtZXNzYWdlKSkgcmV0dXJuO1xuXG4gICAgaWYgKGZyYW1lcyAmJiBmcmFtZXMubGVuZ3RoKSB7XG4gICAgICAgIGZpbGV1cmwgPSBmcmFtZXNbMF0uZmlsZW5hbWUgfHwgZmlsZXVybDtcbiAgICAgICAgLy8gU2VudHJ5IGV4cGVjdHMgZnJhbWVzIG9sZGVzdCB0byBuZXdlc3RcbiAgICAgICAgLy8gYW5kIEpTIHNlbmRzIHRoZW0gYXMgbmV3ZXN0IHRvIG9sZGVzdFxuICAgICAgICBmcmFtZXMucmV2ZXJzZSgpO1xuICAgICAgICBzdGFja3RyYWNlID0ge2ZyYW1lczogZnJhbWVzfTtcbiAgICB9IGVsc2UgaWYgKGZpbGV1cmwpIHtcbiAgICAgICAgc3RhY2t0cmFjZSA9IHtcbiAgICAgICAgICAgIGZyYW1lczogW3tcbiAgICAgICAgICAgICAgICBmaWxlbmFtZTogZmlsZXVybCxcbiAgICAgICAgICAgICAgICBsaW5lbm86IGxpbmVubyxcbiAgICAgICAgICAgICAgICBpbl9hcHA6IHRydWVcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gVHJ1bmNhdGUgdGhlIG1lc3NhZ2UgdG8gYSBtYXggb2YgY2hhcmFjdGVyc1xuICAgIG1lc3NhZ2UgPSB0cnVuY2F0ZShtZXNzYWdlLCBnbG9iYWxPcHRpb25zLm1heE1lc3NhZ2VMZW5ndGgpO1xuXG4gICAgaWYgKGdsb2JhbE9wdGlvbnMuaWdub3JlVXJscyAmJiBnbG9iYWxPcHRpb25zLmlnbm9yZVVybHMudGVzdChmaWxldXJsKSkgcmV0dXJuO1xuICAgIGlmIChnbG9iYWxPcHRpb25zLndoaXRlbGlzdFVybHMgJiYgIWdsb2JhbE9wdGlvbnMud2hpdGVsaXN0VXJscy50ZXN0KGZpbGV1cmwpKSByZXR1cm47XG5cbiAgICBsYWJlbCA9IGxpbmVubyA/IG1lc3NhZ2UgKyAnIGF0ICcgKyBsaW5lbm8gOiBtZXNzYWdlO1xuXG4gICAgLy8gRmlyZSBhd2F5IVxuICAgIHNlbmQoXG4gICAgICAgIG9iamVjdE1lcmdlKHtcbiAgICAgICAgICAgIC8vIHNlbnRyeS5pbnRlcmZhY2VzLkV4Y2VwdGlvblxuICAgICAgICAgICAgZXhjZXB0aW9uOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogbWVzc2FnZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIHNlbnRyeS5pbnRlcmZhY2VzLlN0YWNrdHJhY2VcbiAgICAgICAgICAgIHN0YWNrdHJhY2U6IHN0YWNrdHJhY2UsXG4gICAgICAgICAgICBjdWxwcml0OiBmaWxldXJsLFxuICAgICAgICAgICAgbWVzc2FnZTogbGFiZWxcbiAgICAgICAgfSwgb3B0aW9ucylcbiAgICApO1xufVxuXG5mdW5jdGlvbiBvYmplY3RNZXJnZShvYmoxLCBvYmoyKSB7XG4gICAgaWYgKCFvYmoyKSB7XG4gICAgICAgIHJldHVybiBvYmoxO1xuICAgIH1cbiAgICBlYWNoKG9iajIsIGZ1bmN0aW9uKGtleSwgdmFsdWUpe1xuICAgICAgICBvYmoxW2tleV0gPSB2YWx1ZTtcbiAgICB9KTtcbiAgICByZXR1cm4gb2JqMTtcbn1cblxuZnVuY3Rpb24gdHJ1bmNhdGUoc3RyLCBtYXgpIHtcbiAgICByZXR1cm4gc3RyLmxlbmd0aCA8PSBtYXggPyBzdHIgOiBzdHIuc3Vic3RyKDAsIG1heCkgKyAnXFx1MjAyNic7XG59XG5cbmZ1bmN0aW9uIG5vdygpIHtcbiAgICByZXR1cm4gK25ldyBEYXRlKCk7XG59XG5cbmZ1bmN0aW9uIGdldEh0dHBEYXRhKCkge1xuICAgIHZhciBodHRwID0ge1xuICAgICAgICB1cmw6IGRvY3VtZW50LmxvY2F0aW9uLmhyZWYsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdVc2VyLUFnZW50JzogbmF2aWdhdG9yLnVzZXJBZ2VudFxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGlmIChkb2N1bWVudC5yZWZlcnJlcikge1xuICAgICAgICBodHRwLmhlYWRlcnMuUmVmZXJlciA9IGRvY3VtZW50LnJlZmVycmVyO1xuICAgIH1cblxuICAgIHJldHVybiBodHRwO1xufVxuXG5mdW5jdGlvbiBzZW5kKGRhdGEpIHtcbiAgICBpZiAoIWlzU2V0dXAoKSkgcmV0dXJuO1xuXG4gICAgZGF0YSA9IG9iamVjdE1lcmdlKHtcbiAgICAgICAgcHJvamVjdDogZ2xvYmFsUHJvamVjdCxcbiAgICAgICAgbG9nZ2VyOiBnbG9iYWxPcHRpb25zLmxvZ2dlcixcbiAgICAgICAgcGxhdGZvcm06ICdqYXZhc2NyaXB0JyxcbiAgICAgICAgLy8gc2VudHJ5LmludGVyZmFjZXMuSHR0cFxuICAgICAgICByZXF1ZXN0OiBnZXRIdHRwRGF0YSgpXG4gICAgfSwgZGF0YSk7XG5cbiAgICAvLyBNZXJnZSBpbiB0aGUgdGFncyBhbmQgZXh0cmEgc2VwYXJhdGVseSBzaW5jZSBvYmplY3RNZXJnZSBkb2Vzbid0IGhhbmRsZSBhIGRlZXAgbWVyZ2VcbiAgICBkYXRhLnRhZ3MgPSBvYmplY3RNZXJnZShvYmplY3RNZXJnZSh7fSwgZ2xvYmFsT3B0aW9ucy50YWdzKSwgZGF0YS50YWdzKTtcbiAgICBkYXRhLmV4dHJhID0gb2JqZWN0TWVyZ2Uob2JqZWN0TWVyZ2Uoe30sIGdsb2JhbE9wdGlvbnMuZXh0cmEpLCBkYXRhLmV4dHJhKTtcblxuICAgIC8vIFNlbmQgYWxvbmcgb3VyIG93biBjb2xsZWN0ZWQgbWV0YWRhdGEgd2l0aCBleHRyYVxuICAgIGRhdGEuZXh0cmEgPSBvYmplY3RNZXJnZSh7XG4gICAgICAgICdzZXNzaW9uOmR1cmF0aW9uJzogbm93KCkgLSBzdGFydFRpbWVcbiAgICB9LCBkYXRhLmV4dHJhKTtcblxuICAgIC8vIElmIHRoZXJlIGFyZSBubyB0YWdzL2V4dHJhLCBzdHJpcCB0aGUga2V5IGZyb20gdGhlIHBheWxvYWQgYWxsdG9ndGhlci5cbiAgICBpZiAoaXNFbXB0eU9iamVjdChkYXRhLnRhZ3MpKSBkZWxldGUgZGF0YS50YWdzO1xuXG4gICAgaWYgKGdsb2JhbFVzZXIpIHtcbiAgICAgICAgLy8gc2VudHJ5LmludGVyZmFjZXMuVXNlclxuICAgICAgICBkYXRhLnVzZXIgPSBnbG9iYWxVc2VyO1xuICAgIH1cblxuICAgIC8vIEluY2x1ZGUgdGhlIHJlbGVhc2UgaWZmIGl0J3MgZGVmaW5lZCBpbiBnbG9iYWxPcHRpb25zXG4gICAgaWYgKGdsb2JhbE9wdGlvbnMucmVsZWFzZSkgZGF0YS5yZWxlYXNlID0gZ2xvYmFsT3B0aW9ucy5yZWxlYXNlO1xuXG4gICAgaWYgKGlzRnVuY3Rpb24oZ2xvYmFsT3B0aW9ucy5kYXRhQ2FsbGJhY2spKSB7XG4gICAgICAgIGRhdGEgPSBnbG9iYWxPcHRpb25zLmRhdGFDYWxsYmFjayhkYXRhKTtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBpZiB0aGUgcmVxdWVzdCBzaG91bGQgYmUgZmlsdGVyZWQgb3Igbm90XG4gICAgaWYgKGlzRnVuY3Rpb24oZ2xvYmFsT3B0aW9ucy5zaG91bGRTZW5kQ2FsbGJhY2spICYmICFnbG9iYWxPcHRpb25zLnNob3VsZFNlbmRDYWxsYmFjayhkYXRhKSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gU2VuZCBhbG9uZyBhbiBldmVudF9pZCBpZiBub3QgZXhwbGljaXRseSBwYXNzZWQuXG4gICAgLy8gVGhpcyBldmVudF9pZCBjYW4gYmUgdXNlZCB0byByZWZlcmVuY2UgdGhlIGVycm9yIHdpdGhpbiBTZW50cnkgaXRzZWxmLlxuICAgIC8vIFNldCBsYXN0RXZlbnRJZCBhZnRlciB3ZSBrbm93IHRoZSBlcnJvciBzaG91bGQgYWN0dWFsbHkgYmUgc2VudFxuICAgIGxhc3RFdmVudElkID0gZGF0YS5ldmVudF9pZCB8fCAoZGF0YS5ldmVudF9pZCA9IHV1aWQ0KCkpO1xuXG4gICAgbWFrZVJlcXVlc3QoZGF0YSk7XG59XG5cblxuZnVuY3Rpb24gbWFrZVJlcXVlc3QoZGF0YSkge1xuICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKSxcbiAgICAgICAgc3JjID0gZ2xvYmFsU2VydmVyICsgYXV0aFF1ZXJ5U3RyaW5nICsgJyZzZW50cnlfZGF0YT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcblxuICAgIGltZy5jcm9zc09yaWdpbiA9ICdhbm9ueW1vdXMnO1xuICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbiBzdWNjZXNzKCkge1xuICAgICAgICB0cmlnZ2VyRXZlbnQoJ3N1Y2Nlc3MnLCB7XG4gICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgc3JjOiBzcmNcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBpbWcub25lcnJvciA9IGltZy5vbmFib3J0ID0gZnVuY3Rpb24gZmFpbHVyZSgpIHtcbiAgICAgICAgdHJpZ2dlckV2ZW50KCdmYWlsdXJlJywge1xuICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgIHNyYzogc3JjXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgaW1nLnNyYyA9IHNyYztcbn1cblxuZnVuY3Rpb24gaXNTZXR1cCgpIHtcbiAgICBpZiAoIWhhc0pTT04pIHJldHVybiBmYWxzZTsgIC8vIG5lZWRzIEpTT04gc3VwcG9ydFxuICAgIGlmICghZ2xvYmFsU2VydmVyKSB7XG4gICAgICAgIGxvZ0RlYnVnKCdlcnJvcicsICdFcnJvcjogUmF2ZW4gaGFzIG5vdCBiZWVuIGNvbmZpZ3VyZWQuJyk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGpvaW5SZWdFeHAocGF0dGVybnMpIHtcbiAgICAvLyBDb21iaW5lIGFuIGFycmF5IG9mIHJlZ3VsYXIgZXhwcmVzc2lvbnMgYW5kIHN0cmluZ3MgaW50byBvbmUgbGFyZ2UgcmVnZXhwXG4gICAgLy8gQmUgbWFkLlxuICAgIHZhciBzb3VyY2VzID0gW10sXG4gICAgICAgIGkgPSAwLCBsZW4gPSBwYXR0ZXJucy5sZW5ndGgsXG4gICAgICAgIHBhdHRlcm47XG5cbiAgICBmb3IgKDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHBhdHRlcm4gPSBwYXR0ZXJuc1tpXTtcbiAgICAgICAgaWYgKGlzU3RyaW5nKHBhdHRlcm4pKSB7XG4gICAgICAgICAgICAvLyBJZiBpdCdzIGEgc3RyaW5nLCB3ZSBuZWVkIHRvIGVzY2FwZSBpdFxuICAgICAgICAgICAgLy8gVGFrZW4gZnJvbTogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9HdWlkZS9SZWd1bGFyX0V4cHJlc3Npb25zXG4gICAgICAgICAgICBzb3VyY2VzLnB1c2gocGF0dGVybi5yZXBsYWNlKC8oWy4qKz9ePSE6JHt9KCl8XFxbXFxdXFwvXFxcXF0pL2csIFwiXFxcXCQxXCIpKTtcbiAgICAgICAgfSBlbHNlIGlmIChwYXR0ZXJuICYmIHBhdHRlcm4uc291cmNlKSB7XG4gICAgICAgICAgICAvLyBJZiBpdCdzIGEgcmVnZXhwIGFscmVhZHksIHdlIHdhbnQgdG8gZXh0cmFjdCB0aGUgc291cmNlXG4gICAgICAgICAgICBzb3VyY2VzLnB1c2gocGF0dGVybi5zb3VyY2UpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEludGVudGlvbmFsbHkgc2tpcCBvdGhlciBjYXNlc1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFJlZ0V4cChzb3VyY2VzLmpvaW4oJ3wnKSwgJ2knKTtcbn1cblxuLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMDUwMzQvaG93LXRvLWNyZWF0ZS1hLWd1aWQtdXVpZC1pbi1qYXZhc2NyaXB0LzIxMTc1MjMjMjExNzUyM1xuZnVuY3Rpb24gdXVpZDQoKSB7XG4gICAgcmV0dXJuICd4eHh4eHh4eHh4eHg0eHh4eXh4eHh4eHh4eHh4eHh4eCcucmVwbGFjZSgvW3h5XS9nLCBmdW5jdGlvbihjKSB7XG4gICAgICAgIHZhciByID0gTWF0aC5yYW5kb20oKSoxNnwwLFxuICAgICAgICAgICAgdiA9IGMgPT0gJ3gnID8gciA6IChyJjB4M3wweDgpO1xuICAgICAgICByZXR1cm4gdi50b1N0cmluZygxNik7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGxvZ0RlYnVnKGxldmVsLCBtZXNzYWdlKSB7XG4gICAgaWYgKHdpbmRvdy5jb25zb2xlICYmIGNvbnNvbGVbbGV2ZWxdICYmIFJhdmVuLmRlYnVnKSB7XG4gICAgICAgIGNvbnNvbGVbbGV2ZWxdKG1lc3NhZ2UpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gYWZ0ZXJMb2FkKCkge1xuICAgIC8vIEF0dGVtcHQgdG8gaW5pdGlhbGl6ZSBSYXZlbiBvbiBsb2FkXG4gICAgdmFyIFJhdmVuQ29uZmlnID0gd2luZG93LlJhdmVuQ29uZmlnO1xuICAgIGlmIChSYXZlbkNvbmZpZykge1xuICAgICAgICBSYXZlbi5jb25maWcoUmF2ZW5Db25maWcuZHNuLCBSYXZlbkNvbmZpZy5jb25maWcpLmluc3RhbGwoKTtcbiAgICB9XG59XG5hZnRlckxvYWQoKTtcblxuLy8gRXhwb3NlIFJhdmVuIHRvIHRoZSB3b3JsZFxuaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIC8vIEFNRFxuICAgIHdpbmRvdy5SYXZlbiA9IFJhdmVuO1xuICAgIGRlZmluZSgncmF2ZW4nLCBbXSwgZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gUmF2ZW47XG4gICAgfSk7XG59IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKSB7XG4gICAgLy8gYnJvd3NlcmlmeVxuICAgIG1vZHVsZS5leHBvcnRzID0gUmF2ZW47XG59IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgIC8vIENvbW1vbkpTXG4gICAgZXhwb3J0cyA9IFJhdmVuO1xufSBlbHNlIHtcbiAgICAvLyBFdmVyeXRoaW5nIGVsc2VcbiAgICB3aW5kb3cuUmF2ZW4gPSBSYXZlbjtcbn1cblxufSkod2luZG93KTtcbiIsIi8qIVxyXG4gKiB2ZXJnZSAxLjkuMSsyMDE0MDIxMzA4MDNcclxuICogaHR0cHM6Ly9naXRodWIuY29tL3J5YW52ZS92ZXJnZVxyXG4gKiBNSVQgTGljZW5zZSAyMDEzIFJ5YW4gVmFuIEV0dGVuXHJcbiAqL1xyXG5cclxuKGZ1bmN0aW9uKHJvb3QsIG5hbWUsIG1ha2UpIHtcclxuICBpZiAodHlwZW9mIG1vZHVsZSAhPSAndW5kZWZpbmVkJyAmJiBtb2R1bGVbJ2V4cG9ydHMnXSkgbW9kdWxlWydleHBvcnRzJ10gPSBtYWtlKCk7XHJcbiAgZWxzZSByb290W25hbWVdID0gbWFrZSgpO1xyXG59KHRoaXMsICd2ZXJnZScsIGZ1bmN0aW9uKCkge1xyXG5cclxuICB2YXIgeHBvcnRzID0ge31cclxuICAgICwgd2luID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3dcclxuICAgICwgZG9jID0gdHlwZW9mIGRvY3VtZW50ICE9ICd1bmRlZmluZWQnICYmIGRvY3VtZW50XHJcbiAgICAsIGRvY0VsZW0gPSBkb2MgJiYgZG9jLmRvY3VtZW50RWxlbWVudFxyXG4gICAgLCBtYXRjaE1lZGlhID0gd2luWydtYXRjaE1lZGlhJ10gfHwgd2luWydtc01hdGNoTWVkaWEnXVxyXG4gICAgLCBtcSA9IG1hdGNoTWVkaWEgPyBmdW5jdGlvbihxKSB7XHJcbiAgICAgICAgcmV0dXJuICEhbWF0Y2hNZWRpYS5jYWxsKHdpbiwgcSkubWF0Y2hlcztcclxuICAgICAgfSA6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgLCB2aWV3cG9ydFcgPSB4cG9ydHNbJ3ZpZXdwb3J0VyddID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGEgPSBkb2NFbGVtWydjbGllbnRXaWR0aCddLCBiID0gd2luWydpbm5lcldpZHRoJ107XHJcbiAgICAgICAgcmV0dXJuIGEgPCBiID8gYiA6IGE7XHJcbiAgICAgIH1cclxuICAgICwgdmlld3BvcnRIID0geHBvcnRzWyd2aWV3cG9ydEgnXSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBhID0gZG9jRWxlbVsnY2xpZW50SGVpZ2h0J10sIGIgPSB3aW5bJ2lubmVySGVpZ2h0J107XHJcbiAgICAgICAgcmV0dXJuIGEgPCBiID8gYiA6IGE7XHJcbiAgICAgIH07XHJcbiAgXHJcbiAgLyoqIFxyXG4gICAqIFRlc3QgaWYgYSBtZWRpYSBxdWVyeSBpcyBhY3RpdmUuIExpa2UgTW9kZXJuaXpyLm1xXHJcbiAgICogQHNpbmNlIDEuNi4wXHJcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cclxuICAgKi8gIFxyXG4gIHhwb3J0c1snbXEnXSA9IG1xO1xyXG5cclxuICAvKiogXHJcbiAgICogTm9ybWFsaXplZCBtYXRjaE1lZGlhXHJcbiAgICogQHNpbmNlIDEuNi4wXHJcbiAgICogQHJldHVybiB7TWVkaWFRdWVyeUxpc3R8T2JqZWN0fVxyXG4gICAqLyBcclxuICB4cG9ydHNbJ21hdGNoTWVkaWEnXSA9IG1hdGNoTWVkaWEgPyBmdW5jdGlvbigpIHtcclxuICAgIC8vIG1hdGNoTWVkaWEgbXVzdCBiZSBiaW5kZWQgdG8gd2luZG93XHJcbiAgICByZXR1cm4gbWF0Y2hNZWRpYS5hcHBseSh3aW4sIGFyZ3VtZW50cyk7XHJcbiAgfSA6IGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gR3JhY2VmdWxseSBkZWdyYWRlIHRvIHBsYWluIG9iamVjdFxyXG4gICAgcmV0dXJuIHt9O1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIEBzaW5jZSAxLjguMFxyXG4gICAqIEByZXR1cm4ge3t3aWR0aDpudW1iZXIsIGhlaWdodDpudW1iZXJ9fVxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIHZpZXdwb3J0KCkge1xyXG4gICAgcmV0dXJuIHsnd2lkdGgnOnZpZXdwb3J0VygpLCAnaGVpZ2h0Jzp2aWV3cG9ydEgoKX07XHJcbiAgfVxyXG4gIHhwb3J0c1sndmlld3BvcnQnXSA9IHZpZXdwb3J0O1xyXG4gIFxyXG4gIC8qKiBcclxuICAgKiBDcm9zcy1icm93c2VyIHdpbmRvdy5zY3JvbGxYXHJcbiAgICogQHNpbmNlIDEuMC4wXHJcbiAgICogQHJldHVybiB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIHhwb3J0c1snc2Nyb2xsWCddID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gd2luLnBhZ2VYT2Zmc2V0IHx8IGRvY0VsZW0uc2Nyb2xsTGVmdDsgXHJcbiAgfTtcclxuXHJcbiAgLyoqIFxyXG4gICAqIENyb3NzLWJyb3dzZXIgd2luZG93LnNjcm9sbFlcclxuICAgKiBAc2luY2UgMS4wLjBcclxuICAgKiBAcmV0dXJuIHtudW1iZXJ9XHJcbiAgICovXHJcbiAgeHBvcnRzWydzY3JvbGxZJ10gPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB3aW4ucGFnZVlPZmZzZXQgfHwgZG9jRWxlbS5zY3JvbGxUb3A7IFxyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7e3RvcDpudW1iZXIsIHJpZ2h0Om51bWJlciwgYm90dG9tOm51bWJlciwgbGVmdDpudW1iZXJ9fSBjb29yZHNcclxuICAgKiBAcGFyYW0ge251bWJlcj19IGN1c2hpb24gYWRqdXN0bWVudFxyXG4gICAqIEByZXR1cm4ge09iamVjdH1cclxuICAgKi9cclxuICBmdW5jdGlvbiBjYWxpYnJhdGUoY29vcmRzLCBjdXNoaW9uKSB7XHJcbiAgICB2YXIgbyA9IHt9O1xyXG4gICAgY3VzaGlvbiA9ICtjdXNoaW9uIHx8IDA7XHJcbiAgICBvWyd3aWR0aCddID0gKG9bJ3JpZ2h0J10gPSBjb29yZHNbJ3JpZ2h0J10gKyBjdXNoaW9uKSAtIChvWydsZWZ0J10gPSBjb29yZHNbJ2xlZnQnXSAtIGN1c2hpb24pO1xyXG4gICAgb1snaGVpZ2h0J10gPSAob1snYm90dG9tJ10gPSBjb29yZHNbJ2JvdHRvbSddICsgY3VzaGlvbikgLSAob1sndG9wJ10gPSBjb29yZHNbJ3RvcCddIC0gY3VzaGlvbik7XHJcbiAgICByZXR1cm4gbztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyb3NzLWJyb3dzZXIgZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QgcGx1cyBvcHRpb25hbCBjdXNoaW9uLlxyXG4gICAqIENvb3JkcyBhcmUgcmVsYXRpdmUgdG8gdGhlIHRvcC1sZWZ0IGNvcm5lciBvZiB0aGUgdmlld3BvcnQuXHJcbiAgICogQHNpbmNlIDEuMC4wXHJcbiAgICogQHBhcmFtIHtFbGVtZW50fE9iamVjdH0gZWwgZWxlbWVudCBvciBzdGFjayAodXNlcyBmaXJzdCBpdGVtKVxyXG4gICAqIEBwYXJhbSB7bnVtYmVyPX0gY3VzaGlvbiArLy0gcGl4ZWwgYWRqdXN0bWVudCBhbW91bnRcclxuICAgKiBAcmV0dXJuIHtPYmplY3R8Ym9vbGVhbn1cclxuICAgKi9cclxuICBmdW5jdGlvbiByZWN0YW5nbGUoZWwsIGN1c2hpb24pIHtcclxuICAgIGVsID0gZWwgJiYgIWVsLm5vZGVUeXBlID8gZWxbMF0gOiBlbDtcclxuICAgIGlmICghZWwgfHwgMSAhPT0gZWwubm9kZVR5cGUpIHJldHVybiBmYWxzZTtcclxuICAgIHJldHVybiBjYWxpYnJhdGUoZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksIGN1c2hpb24pO1xyXG4gIH1cclxuICB4cG9ydHNbJ3JlY3RhbmdsZSddID0gcmVjdGFuZ2xlO1xyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIHZpZXdwb3J0IGFzcGVjdCByYXRpbyAob3IgdGhlIGFzcGVjdCByYXRpbyBvZiBhbiBvYmplY3Qgb3IgZWxlbWVudClcclxuICAgKiBAc2luY2UgMS43LjBcclxuICAgKiBAcGFyYW0geyhFbGVtZW50fE9iamVjdCk9fSBvIG9wdGlvbmFsIG9iamVjdCB3aXRoIHdpZHRoL2hlaWdodCBwcm9wcyBvciBtZXRob2RzXHJcbiAgICogQHJldHVybiB7bnVtYmVyfVxyXG4gICAqIEBsaW5rIGh0dHA6Ly93My5vcmcvVFIvY3NzMy1tZWRpYXF1ZXJpZXMvI29yaWVudGF0aW9uXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gYXNwZWN0KG8pIHtcclxuICAgIG8gPSBudWxsID09IG8gPyB2aWV3cG9ydCgpIDogMSA9PT0gby5ub2RlVHlwZSA/IHJlY3RhbmdsZShvKSA6IG87XHJcbiAgICB2YXIgaCA9IG9bJ2hlaWdodCddLCB3ID0gb1snd2lkdGgnXTtcclxuICAgIGggPSB0eXBlb2YgaCA9PSAnZnVuY3Rpb24nID8gaC5jYWxsKG8pIDogaDtcclxuICAgIHcgPSB0eXBlb2YgdyA9PSAnZnVuY3Rpb24nID8gdy5jYWxsKG8pIDogdztcclxuICAgIHJldHVybiB3L2g7XHJcbiAgfVxyXG4gIHhwb3J0c1snYXNwZWN0J10gPSBhc3BlY3Q7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRlc3QgaWYgYW4gZWxlbWVudCBpcyBpbiB0aGUgc2FtZSB4LWF4aXMgc2VjdGlvbiBhcyB0aGUgdmlld3BvcnQuXHJcbiAgICogQHNpbmNlIDEuMC4wXHJcbiAgICogQHBhcmFtIHtFbGVtZW50fE9iamVjdH0gZWxcclxuICAgKiBAcGFyYW0ge251bWJlcj19IGN1c2hpb25cclxuICAgKiBAcmV0dXJuIHtib29sZWFufVxyXG4gICAqL1xyXG4gIHhwb3J0c1snaW5YJ10gPSBmdW5jdGlvbihlbCwgY3VzaGlvbikge1xyXG4gICAgdmFyIHIgPSByZWN0YW5nbGUoZWwsIGN1c2hpb24pO1xyXG4gICAgcmV0dXJuICEhciAmJiByLnJpZ2h0ID49IDAgJiYgci5sZWZ0IDw9IHZpZXdwb3J0VygpO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFRlc3QgaWYgYW4gZWxlbWVudCBpcyBpbiB0aGUgc2FtZSB5LWF4aXMgc2VjdGlvbiBhcyB0aGUgdmlld3BvcnQuXHJcbiAgICogQHNpbmNlIDEuMC4wXHJcbiAgICogQHBhcmFtIHtFbGVtZW50fE9iamVjdH0gZWxcclxuICAgKiBAcGFyYW0ge251bWJlcj19IGN1c2hpb25cclxuICAgKiBAcmV0dXJuIHtib29sZWFufVxyXG4gICAqL1xyXG4gIHhwb3J0c1snaW5ZJ10gPSBmdW5jdGlvbihlbCwgY3VzaGlvbikge1xyXG4gICAgdmFyIHIgPSByZWN0YW5nbGUoZWwsIGN1c2hpb24pO1xyXG4gICAgcmV0dXJuICEhciAmJiByLmJvdHRvbSA+PSAwICYmIHIudG9wIDw9IHZpZXdwb3J0SCgpO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFRlc3QgaWYgYW4gZWxlbWVudCBpcyBpbiB0aGUgdmlld3BvcnQuXHJcbiAgICogQHNpbmNlIDEuMC4wXHJcbiAgICogQHBhcmFtIHtFbGVtZW50fE9iamVjdH0gZWxcclxuICAgKiBAcGFyYW0ge251bWJlcj19IGN1c2hpb25cclxuICAgKiBAcmV0dXJuIHtib29sZWFufVxyXG4gICAqL1xyXG4gIHhwb3J0c1snaW5WaWV3cG9ydCddID0gZnVuY3Rpb24oZWwsIGN1c2hpb24pIHtcclxuICAgIC8vIEVxdWl2IHRvIGBpblgoZWwsIGN1c2hpb24pICYmIGluWShlbCwgY3VzaGlvbilgIGJ1dCBqdXN0IG1hbnVhbGx5IGRvIGJvdGggXHJcbiAgICAvLyB0byBhdm9pZCBjYWxsaW5nIHJlY3RhbmdsZSgpIHR3aWNlLiBJdCBnemlwcyBqdXN0IGFzIHNtYWxsIGxpa2UgdGhpcy5cclxuICAgIHZhciByID0gcmVjdGFuZ2xlKGVsLCBjdXNoaW9uKTtcclxuICAgIHJldHVybiAhIXIgJiYgci5ib3R0b20gPj0gMCAmJiByLnJpZ2h0ID49IDAgJiYgci50b3AgPD0gdmlld3BvcnRIKCkgJiYgci5sZWZ0IDw9IHZpZXdwb3J0VygpO1xyXG4gIH07XHJcblxyXG4gIHJldHVybiB4cG9ydHM7XHJcbn0pKTsiLCIvKiFcbiAqIEV2ZW50RW1pdHRlciB2NC4yLjExIC0gZ2l0LmlvL2VlXG4gKiBVbmxpY2Vuc2UgLSBodHRwOi8vdW5saWNlbnNlLm9yZy9cbiAqIE9saXZlciBDYWxkd2VsbCAtIGh0dHA6Ly9vbGkubWUudWsvXG4gKiBAcHJlc2VydmVcbiAqL1xuXG47KGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICAvKipcbiAgICAgKiBDbGFzcyBmb3IgbWFuYWdpbmcgZXZlbnRzLlxuICAgICAqIENhbiBiZSBleHRlbmRlZCB0byBwcm92aWRlIGV2ZW50IGZ1bmN0aW9uYWxpdHkgaW4gb3RoZXIgY2xhc3Nlcy5cbiAgICAgKlxuICAgICAqIEBjbGFzcyBFdmVudEVtaXR0ZXIgTWFuYWdlcyBldmVudCByZWdpc3RlcmluZyBhbmQgZW1pdHRpbmcuXG4gICAgICovXG4gICAgZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge31cblxuICAgIC8vIFNob3J0Y3V0cyB0byBpbXByb3ZlIHNwZWVkIGFuZCBzaXplXG4gICAgdmFyIHByb3RvID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZTtcbiAgICB2YXIgZXhwb3J0cyA9IHRoaXM7XG4gICAgdmFyIG9yaWdpbmFsR2xvYmFsVmFsdWUgPSBleHBvcnRzLkV2ZW50RW1pdHRlcjtcblxuICAgIC8qKlxuICAgICAqIEZpbmRzIHRoZSBpbmRleCBvZiB0aGUgbGlzdGVuZXIgZm9yIHRoZSBldmVudCBpbiBpdHMgc3RvcmFnZSBhcnJheS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb25bXX0gbGlzdGVuZXJzIEFycmF5IG9mIGxpc3RlbmVycyB0byBzZWFyY2ggdGhyb3VnaC5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciBNZXRob2QgdG8gbG9vayBmb3IuXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBJbmRleCBvZiB0aGUgc3BlY2lmaWVkIGxpc3RlbmVyLCAtMSBpZiBub3QgZm91bmRcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpbmRleE9mTGlzdGVuZXIobGlzdGVuZXJzLCBsaXN0ZW5lcikge1xuICAgICAgICB2YXIgaSA9IGxpc3RlbmVycy5sZW5ndGg7XG4gICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgIGlmIChsaXN0ZW5lcnNbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWxpYXMgYSBtZXRob2Qgd2hpbGUga2VlcGluZyB0aGUgY29udGV4dCBjb3JyZWN0LCB0byBhbGxvdyBmb3Igb3ZlcndyaXRpbmcgb2YgdGFyZ2V0IG1ldGhvZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSB0YXJnZXQgbWV0aG9kLlxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgYWxpYXNlZCBtZXRob2RcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhbGlhcyhuYW1lKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBhbGlhc0Nsb3N1cmUoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpc1tuYW1lXS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGxpc3RlbmVyIGFycmF5IGZvciB0aGUgc3BlY2lmaWVkIGV2ZW50LlxuICAgICAqIFdpbGwgaW5pdGlhbGlzZSB0aGUgZXZlbnQgb2JqZWN0IGFuZCBsaXN0ZW5lciBhcnJheXMgaWYgcmVxdWlyZWQuXG4gICAgICogV2lsbCByZXR1cm4gYW4gb2JqZWN0IGlmIHlvdSB1c2UgYSByZWdleCBzZWFyY2guIFRoZSBvYmplY3QgY29udGFpbnMga2V5cyBmb3IgZWFjaCBtYXRjaGVkIGV2ZW50LiBTbyAvYmFbcnpdLyBtaWdodCByZXR1cm4gYW4gb2JqZWN0IGNvbnRhaW5pbmcgYmFyIGFuZCBiYXouIEJ1dCBvbmx5IGlmIHlvdSBoYXZlIGVpdGhlciBkZWZpbmVkIHRoZW0gd2l0aCBkZWZpbmVFdmVudCBvciBhZGRlZCBzb21lIGxpc3RlbmVycyB0byB0aGVtLlxuICAgICAqIEVhY2ggcHJvcGVydHkgaW4gdGhlIG9iamVjdCByZXNwb25zZSBpcyBhbiBhcnJheSBvZiBsaXN0ZW5lciBmdW5jdGlvbnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xSZWdFeHB9IGV2dCBOYW1lIG9mIHRoZSBldmVudCB0byByZXR1cm4gdGhlIGxpc3RlbmVycyBmcm9tLlxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9uW118T2JqZWN0fSBBbGwgbGlzdGVuZXIgZnVuY3Rpb25zIGZvciB0aGUgZXZlbnQuXG4gICAgICovXG4gICAgcHJvdG8uZ2V0TGlzdGVuZXJzID0gZnVuY3Rpb24gZ2V0TGlzdGVuZXJzKGV2dCkge1xuICAgICAgICB2YXIgZXZlbnRzID0gdGhpcy5fZ2V0RXZlbnRzKCk7XG4gICAgICAgIHZhciByZXNwb25zZTtcbiAgICAgICAgdmFyIGtleTtcblxuICAgICAgICAvLyBSZXR1cm4gYSBjb25jYXRlbmF0ZWQgYXJyYXkgb2YgYWxsIG1hdGNoaW5nIGV2ZW50cyBpZlxuICAgICAgICAvLyB0aGUgc2VsZWN0b3IgaXMgYSByZWd1bGFyIGV4cHJlc3Npb24uXG4gICAgICAgIGlmIChldnQgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgICAgIHJlc3BvbnNlID0ge307XG4gICAgICAgICAgICBmb3IgKGtleSBpbiBldmVudHMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnRzLmhhc093blByb3BlcnR5KGtleSkgJiYgZXZ0LnRlc3Qoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICByZXNwb25zZVtrZXldID0gZXZlbnRzW2tleV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVzcG9uc2UgPSBldmVudHNbZXZ0XSB8fCAoZXZlbnRzW2V2dF0gPSBbXSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFRha2VzIGEgbGlzdCBvZiBsaXN0ZW5lciBvYmplY3RzIGFuZCBmbGF0dGVucyBpdCBpbnRvIGEgbGlzdCBvZiBsaXN0ZW5lciBmdW5jdGlvbnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdFtdfSBsaXN0ZW5lcnMgUmF3IGxpc3RlbmVyIG9iamVjdHMuXG4gICAgICogQHJldHVybiB7RnVuY3Rpb25bXX0gSnVzdCB0aGUgbGlzdGVuZXIgZnVuY3Rpb25zLlxuICAgICAqL1xuICAgIHByb3RvLmZsYXR0ZW5MaXN0ZW5lcnMgPSBmdW5jdGlvbiBmbGF0dGVuTGlzdGVuZXJzKGxpc3RlbmVycykge1xuICAgICAgICB2YXIgZmxhdExpc3RlbmVycyA9IFtdO1xuICAgICAgICB2YXIgaTtcblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBmbGF0TGlzdGVuZXJzLnB1c2gobGlzdGVuZXJzW2ldLmxpc3RlbmVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmbGF0TGlzdGVuZXJzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBGZXRjaGVzIHRoZSByZXF1ZXN0ZWQgbGlzdGVuZXJzIHZpYSBnZXRMaXN0ZW5lcnMgYnV0IHdpbGwgYWx3YXlzIHJldHVybiB0aGUgcmVzdWx0cyBpbnNpZGUgYW4gb2JqZWN0LiBUaGlzIGlzIG1haW5seSBmb3IgaW50ZXJuYWwgdXNlIGJ1dCBvdGhlcnMgbWF5IGZpbmQgaXQgdXNlZnVsLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8UmVnRXhwfSBldnQgTmFtZSBvZiB0aGUgZXZlbnQgdG8gcmV0dXJuIHRoZSBsaXN0ZW5lcnMgZnJvbS5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEFsbCBsaXN0ZW5lciBmdW5jdGlvbnMgZm9yIGFuIGV2ZW50IGluIGFuIG9iamVjdC5cbiAgICAgKi9cbiAgICBwcm90by5nZXRMaXN0ZW5lcnNBc09iamVjdCA9IGZ1bmN0aW9uIGdldExpc3RlbmVyc0FzT2JqZWN0KGV2dCkge1xuICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5nZXRMaXN0ZW5lcnMoZXZ0KTtcbiAgICAgICAgdmFyIHJlc3BvbnNlO1xuXG4gICAgICAgIGlmIChsaXN0ZW5lcnMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgcmVzcG9uc2UgPSB7fTtcbiAgICAgICAgICAgIHJlc3BvbnNlW2V2dF0gPSBsaXN0ZW5lcnM7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzcG9uc2UgfHwgbGlzdGVuZXJzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbGlzdGVuZXIgZnVuY3Rpb24gdG8gdGhlIHNwZWNpZmllZCBldmVudC5cbiAgICAgKiBUaGUgbGlzdGVuZXIgd2lsbCBub3QgYmUgYWRkZWQgaWYgaXQgaXMgYSBkdXBsaWNhdGUuXG4gICAgICogSWYgdGhlIGxpc3RlbmVyIHJldHVybnMgdHJ1ZSB0aGVuIGl0IHdpbGwgYmUgcmVtb3ZlZCBhZnRlciBpdCBpcyBjYWxsZWQuXG4gICAgICogSWYgeW91IHBhc3MgYSByZWd1bGFyIGV4cHJlc3Npb24gYXMgdGhlIGV2ZW50IG5hbWUgdGhlbiB0aGUgbGlzdGVuZXIgd2lsbCBiZSBhZGRlZCB0byBhbGwgZXZlbnRzIHRoYXQgbWF0Y2ggaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xSZWdFeHB9IGV2dCBOYW1lIG9mIHRoZSBldmVudCB0byBhdHRhY2ggdGhlIGxpc3RlbmVyIHRvLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIE1ldGhvZCB0byBiZSBjYWxsZWQgd2hlbiB0aGUgZXZlbnQgaXMgZW1pdHRlZC4gSWYgdGhlIGZ1bmN0aW9uIHJldHVybnMgdHJ1ZSB0aGVuIGl0IHdpbGwgYmUgcmVtb3ZlZCBhZnRlciBjYWxsaW5nLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLmFkZExpc3RlbmVyID0gZnVuY3Rpb24gYWRkTGlzdGVuZXIoZXZ0LCBsaXN0ZW5lcikge1xuICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5nZXRMaXN0ZW5lcnNBc09iamVjdChldnQpO1xuICAgICAgICB2YXIgbGlzdGVuZXJJc1dyYXBwZWQgPSB0eXBlb2YgbGlzdGVuZXIgPT09ICdvYmplY3QnO1xuICAgICAgICB2YXIga2V5O1xuXG4gICAgICAgIGZvciAoa2V5IGluIGxpc3RlbmVycykge1xuICAgICAgICAgICAgaWYgKGxpc3RlbmVycy5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIGluZGV4T2ZMaXN0ZW5lcihsaXN0ZW5lcnNba2V5XSwgbGlzdGVuZXIpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyc1trZXldLnB1c2gobGlzdGVuZXJJc1dyYXBwZWQgPyBsaXN0ZW5lciA6IHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXI6IGxpc3RlbmVyLFxuICAgICAgICAgICAgICAgICAgICBvbmNlOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFsaWFzIG9mIGFkZExpc3RlbmVyXG4gICAgICovXG4gICAgcHJvdG8ub24gPSBhbGlhcygnYWRkTGlzdGVuZXInKTtcblxuICAgIC8qKlxuICAgICAqIFNlbWktYWxpYXMgb2YgYWRkTGlzdGVuZXIuIEl0IHdpbGwgYWRkIGEgbGlzdGVuZXIgdGhhdCB3aWxsIGJlXG4gICAgICogYXV0b21hdGljYWxseSByZW1vdmVkIGFmdGVyIGl0cyBmaXJzdCBleGVjdXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xSZWdFeHB9IGV2dCBOYW1lIG9mIHRoZSBldmVudCB0byBhdHRhY2ggdGhlIGxpc3RlbmVyIHRvLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIE1ldGhvZCB0byBiZSBjYWxsZWQgd2hlbiB0aGUgZXZlbnQgaXMgZW1pdHRlZC4gSWYgdGhlIGZ1bmN0aW9uIHJldHVybnMgdHJ1ZSB0aGVuIGl0IHdpbGwgYmUgcmVtb3ZlZCBhZnRlciBjYWxsaW5nLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLmFkZE9uY2VMaXN0ZW5lciA9IGZ1bmN0aW9uIGFkZE9uY2VMaXN0ZW5lcihldnQsIGxpc3RlbmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZExpc3RlbmVyKGV2dCwge1xuICAgICAgICAgICAgbGlzdGVuZXI6IGxpc3RlbmVyLFxuICAgICAgICAgICAgb25jZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQWxpYXMgb2YgYWRkT25jZUxpc3RlbmVyLlxuICAgICAqL1xuICAgIHByb3RvLm9uY2UgPSBhbGlhcygnYWRkT25jZUxpc3RlbmVyJyk7XG5cbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGFuIGV2ZW50IG5hbWUuIFRoaXMgaXMgcmVxdWlyZWQgaWYgeW91IHdhbnQgdG8gdXNlIGEgcmVnZXggdG8gYWRkIGEgbGlzdGVuZXIgdG8gbXVsdGlwbGUgZXZlbnRzIGF0IG9uY2UuIElmIHlvdSBkb24ndCBkbyB0aGlzIHRoZW4gaG93IGRvIHlvdSBleHBlY3QgaXQgdG8ga25vdyB3aGF0IGV2ZW50IHRvIGFkZCB0bz8gU2hvdWxkIGl0IGp1c3QgYWRkIHRvIGV2ZXJ5IHBvc3NpYmxlIG1hdGNoIGZvciBhIHJlZ2V4PyBOby4gVGhhdCBpcyBzY2FyeSBhbmQgYmFkLlxuICAgICAqIFlvdSBuZWVkIHRvIHRlbGwgaXQgd2hhdCBldmVudCBuYW1lcyBzaG91bGQgYmUgbWF0Y2hlZCBieSBhIHJlZ2V4LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGV2dCBOYW1lIG9mIHRoZSBldmVudCB0byBjcmVhdGUuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgcHJvdG8uZGVmaW5lRXZlbnQgPSBmdW5jdGlvbiBkZWZpbmVFdmVudChldnQpIHtcbiAgICAgICAgdGhpcy5nZXRMaXN0ZW5lcnMoZXZ0KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFVzZXMgZGVmaW5lRXZlbnQgdG8gZGVmaW5lIG11bHRpcGxlIGV2ZW50cy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nW119IGV2dHMgQW4gYXJyYXkgb2YgZXZlbnQgbmFtZXMgdG8gZGVmaW5lLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLmRlZmluZUV2ZW50cyA9IGZ1bmN0aW9uIGRlZmluZUV2ZW50cyhldnRzKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXZ0cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgdGhpcy5kZWZpbmVFdmVudChldnRzW2ldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhIGxpc3RlbmVyIGZ1bmN0aW9uIGZyb20gdGhlIHNwZWNpZmllZCBldmVudC5cbiAgICAgKiBXaGVuIHBhc3NlZCBhIHJlZ3VsYXIgZXhwcmVzc2lvbiBhcyB0aGUgZXZlbnQgbmFtZSwgaXQgd2lsbCByZW1vdmUgdGhlIGxpc3RlbmVyIGZyb20gYWxsIGV2ZW50cyB0aGF0IG1hdGNoIGl0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8UmVnRXhwfSBldnQgTmFtZSBvZiB0aGUgZXZlbnQgdG8gcmVtb3ZlIHRoZSBsaXN0ZW5lciBmcm9tLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIE1ldGhvZCB0byByZW1vdmUgZnJvbSB0aGUgZXZlbnQuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgcHJvdG8ucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcihldnQsIGxpc3RlbmVyKSB7XG4gICAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLmdldExpc3RlbmVyc0FzT2JqZWN0KGV2dCk7XG4gICAgICAgIHZhciBpbmRleDtcbiAgICAgICAgdmFyIGtleTtcblxuICAgICAgICBmb3IgKGtleSBpbiBsaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIGlmIChsaXN0ZW5lcnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gaW5kZXhPZkxpc3RlbmVyKGxpc3RlbmVyc1trZXldLCBsaXN0ZW5lcik7XG5cbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyc1trZXldLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFsaWFzIG9mIHJlbW92ZUxpc3RlbmVyXG4gICAgICovXG4gICAgcHJvdG8ub2ZmID0gYWxpYXMoJ3JlbW92ZUxpc3RlbmVyJyk7XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGxpc3RlbmVycyBpbiBidWxrIHVzaW5nIHRoZSBtYW5pcHVsYXRlTGlzdGVuZXJzIG1ldGhvZC5cbiAgICAgKiBJZiB5b3UgcGFzcyBhbiBvYmplY3QgYXMgdGhlIHNlY29uZCBhcmd1bWVudCB5b3UgY2FuIGFkZCB0byBtdWx0aXBsZSBldmVudHMgYXQgb25jZS4gVGhlIG9iamVjdCBzaG91bGQgY29udGFpbiBrZXkgdmFsdWUgcGFpcnMgb2YgZXZlbnRzIGFuZCBsaXN0ZW5lcnMgb3IgbGlzdGVuZXIgYXJyYXlzLiBZb3UgY2FuIGFsc28gcGFzcyBpdCBhbiBldmVudCBuYW1lIGFuZCBhbiBhcnJheSBvZiBsaXN0ZW5lcnMgdG8gYmUgYWRkZWQuXG4gICAgICogWW91IGNhbiBhbHNvIHBhc3MgaXQgYSByZWd1bGFyIGV4cHJlc3Npb24gdG8gYWRkIHRoZSBhcnJheSBvZiBsaXN0ZW5lcnMgdG8gYWxsIGV2ZW50cyB0aGF0IG1hdGNoIGl0LlxuICAgICAqIFllYWgsIHRoaXMgZnVuY3Rpb24gZG9lcyBxdWl0ZSBhIGJpdC4gVGhhdCdzIHByb2JhYmx5IGEgYmFkIHRoaW5nLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fFJlZ0V4cH0gZXZ0IEFuIGV2ZW50IG5hbWUgaWYgeW91IHdpbGwgcGFzcyBhbiBhcnJheSBvZiBsaXN0ZW5lcnMgbmV4dC4gQW4gb2JqZWN0IGlmIHlvdSB3aXNoIHRvIGFkZCB0byBtdWx0aXBsZSBldmVudHMgYXQgb25jZS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9uW119IFtsaXN0ZW5lcnNdIEFuIG9wdGlvbmFsIGFycmF5IG9mIGxpc3RlbmVyIGZ1bmN0aW9ucyB0byBhZGQuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgcHJvdG8uYWRkTGlzdGVuZXJzID0gZnVuY3Rpb24gYWRkTGlzdGVuZXJzKGV2dCwgbGlzdGVuZXJzKSB7XG4gICAgICAgIC8vIFBhc3MgdGhyb3VnaCB0byBtYW5pcHVsYXRlTGlzdGVuZXJzXG4gICAgICAgIHJldHVybiB0aGlzLm1hbmlwdWxhdGVMaXN0ZW5lcnMoZmFsc2UsIGV2dCwgbGlzdGVuZXJzKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBsaXN0ZW5lcnMgaW4gYnVsayB1c2luZyB0aGUgbWFuaXB1bGF0ZUxpc3RlbmVycyBtZXRob2QuXG4gICAgICogSWYgeW91IHBhc3MgYW4gb2JqZWN0IGFzIHRoZSBzZWNvbmQgYXJndW1lbnQgeW91IGNhbiByZW1vdmUgZnJvbSBtdWx0aXBsZSBldmVudHMgYXQgb25jZS4gVGhlIG9iamVjdCBzaG91bGQgY29udGFpbiBrZXkgdmFsdWUgcGFpcnMgb2YgZXZlbnRzIGFuZCBsaXN0ZW5lcnMgb3IgbGlzdGVuZXIgYXJyYXlzLlxuICAgICAqIFlvdSBjYW4gYWxzbyBwYXNzIGl0IGFuIGV2ZW50IG5hbWUgYW5kIGFuIGFycmF5IG9mIGxpc3RlbmVycyB0byBiZSByZW1vdmVkLlxuICAgICAqIFlvdSBjYW4gYWxzbyBwYXNzIGl0IGEgcmVndWxhciBleHByZXNzaW9uIHRvIHJlbW92ZSB0aGUgbGlzdGVuZXJzIGZyb20gYWxsIGV2ZW50cyB0aGF0IG1hdGNoIGl0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fFJlZ0V4cH0gZXZ0IEFuIGV2ZW50IG5hbWUgaWYgeW91IHdpbGwgcGFzcyBhbiBhcnJheSBvZiBsaXN0ZW5lcnMgbmV4dC4gQW4gb2JqZWN0IGlmIHlvdSB3aXNoIHRvIHJlbW92ZSBmcm9tIG11bHRpcGxlIGV2ZW50cyBhdCBvbmNlLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb25bXX0gW2xpc3RlbmVyc10gQW4gb3B0aW9uYWwgYXJyYXkgb2YgbGlzdGVuZXIgZnVuY3Rpb25zIHRvIHJlbW92ZS5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKi9cbiAgICBwcm90by5yZW1vdmVMaXN0ZW5lcnMgPSBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcnMoZXZ0LCBsaXN0ZW5lcnMpIHtcbiAgICAgICAgLy8gUGFzcyB0aHJvdWdoIHRvIG1hbmlwdWxhdGVMaXN0ZW5lcnNcbiAgICAgICAgcmV0dXJuIHRoaXMubWFuaXB1bGF0ZUxpc3RlbmVycyh0cnVlLCBldnQsIGxpc3RlbmVycyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEVkaXRzIGxpc3RlbmVycyBpbiBidWxrLiBUaGUgYWRkTGlzdGVuZXJzIGFuZCByZW1vdmVMaXN0ZW5lcnMgbWV0aG9kcyBib3RoIHVzZSB0aGlzIHRvIGRvIHRoZWlyIGpvYi4gWW91IHNob3VsZCByZWFsbHkgdXNlIHRob3NlIGluc3RlYWQsIHRoaXMgaXMgYSBsaXR0bGUgbG93ZXIgbGV2ZWwuXG4gICAgICogVGhlIGZpcnN0IGFyZ3VtZW50IHdpbGwgZGV0ZXJtaW5lIGlmIHRoZSBsaXN0ZW5lcnMgYXJlIHJlbW92ZWQgKHRydWUpIG9yIGFkZGVkIChmYWxzZSkuXG4gICAgICogSWYgeW91IHBhc3MgYW4gb2JqZWN0IGFzIHRoZSBzZWNvbmQgYXJndW1lbnQgeW91IGNhbiBhZGQvcmVtb3ZlIGZyb20gbXVsdGlwbGUgZXZlbnRzIGF0IG9uY2UuIFRoZSBvYmplY3Qgc2hvdWxkIGNvbnRhaW4ga2V5IHZhbHVlIHBhaXJzIG9mIGV2ZW50cyBhbmQgbGlzdGVuZXJzIG9yIGxpc3RlbmVyIGFycmF5cy5cbiAgICAgKiBZb3UgY2FuIGFsc28gcGFzcyBpdCBhbiBldmVudCBuYW1lIGFuZCBhbiBhcnJheSBvZiBsaXN0ZW5lcnMgdG8gYmUgYWRkZWQvcmVtb3ZlZC5cbiAgICAgKiBZb3UgY2FuIGFsc28gcGFzcyBpdCBhIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byBtYW5pcHVsYXRlIHRoZSBsaXN0ZW5lcnMgb2YgYWxsIGV2ZW50cyB0aGF0IG1hdGNoIGl0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtCb29sZWFufSByZW1vdmUgVHJ1ZSBpZiB5b3Ugd2FudCB0byByZW1vdmUgbGlzdGVuZXJzLCBmYWxzZSBpZiB5b3Ugd2FudCB0byBhZGQuXG4gICAgICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fFJlZ0V4cH0gZXZ0IEFuIGV2ZW50IG5hbWUgaWYgeW91IHdpbGwgcGFzcyBhbiBhcnJheSBvZiBsaXN0ZW5lcnMgbmV4dC4gQW4gb2JqZWN0IGlmIHlvdSB3aXNoIHRvIGFkZC9yZW1vdmUgZnJvbSBtdWx0aXBsZSBldmVudHMgYXQgb25jZS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9uW119IFtsaXN0ZW5lcnNdIEFuIG9wdGlvbmFsIGFycmF5IG9mIGxpc3RlbmVyIGZ1bmN0aW9ucyB0byBhZGQvcmVtb3ZlLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLm1hbmlwdWxhdGVMaXN0ZW5lcnMgPSBmdW5jdGlvbiBtYW5pcHVsYXRlTGlzdGVuZXJzKHJlbW92ZSwgZXZ0LCBsaXN0ZW5lcnMpIHtcbiAgICAgICAgdmFyIGk7XG4gICAgICAgIHZhciB2YWx1ZTtcbiAgICAgICAgdmFyIHNpbmdsZSA9IHJlbW92ZSA/IHRoaXMucmVtb3ZlTGlzdGVuZXIgOiB0aGlzLmFkZExpc3RlbmVyO1xuICAgICAgICB2YXIgbXVsdGlwbGUgPSByZW1vdmUgPyB0aGlzLnJlbW92ZUxpc3RlbmVycyA6IHRoaXMuYWRkTGlzdGVuZXJzO1xuXG4gICAgICAgIC8vIElmIGV2dCBpcyBhbiBvYmplY3QgdGhlbiBwYXNzIGVhY2ggb2YgaXRzIHByb3BlcnRpZXMgdG8gdGhpcyBtZXRob2RcbiAgICAgICAgaWYgKHR5cGVvZiBldnQgPT09ICdvYmplY3QnICYmICEoZXZ0IGluc3RhbmNlb2YgUmVnRXhwKSkge1xuICAgICAgICAgICAgZm9yIChpIGluIGV2dCkge1xuICAgICAgICAgICAgICAgIGlmIChldnQuaGFzT3duUHJvcGVydHkoaSkgJiYgKHZhbHVlID0gZXZ0W2ldKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBQYXNzIHRoZSBzaW5nbGUgbGlzdGVuZXIgc3RyYWlnaHQgdGhyb3VnaCB0byB0aGUgc2luZ3VsYXIgbWV0aG9kXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpbmdsZS5jYWxsKHRoaXMsIGksIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSBwYXNzIGJhY2sgdG8gdGhlIG11bHRpcGxlIGZ1bmN0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICBtdWx0aXBsZS5jYWxsKHRoaXMsIGksIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIFNvIGV2dCBtdXN0IGJlIGEgc3RyaW5nXG4gICAgICAgICAgICAvLyBBbmQgbGlzdGVuZXJzIG11c3QgYmUgYW4gYXJyYXkgb2YgbGlzdGVuZXJzXG4gICAgICAgICAgICAvLyBMb29wIG92ZXIgaXQgYW5kIHBhc3MgZWFjaCBvbmUgdG8gdGhlIG11bHRpcGxlIG1ldGhvZFxuICAgICAgICAgICAgaSA9IGxpc3RlbmVycy5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgc2luZ2xlLmNhbGwodGhpcywgZXZ0LCBsaXN0ZW5lcnNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYWxsIGxpc3RlbmVycyBmcm9tIGEgc3BlY2lmaWVkIGV2ZW50LlxuICAgICAqIElmIHlvdSBkbyBub3Qgc3BlY2lmeSBhbiBldmVudCB0aGVuIGFsbCBsaXN0ZW5lcnMgd2lsbCBiZSByZW1vdmVkLlxuICAgICAqIFRoYXQgbWVhbnMgZXZlcnkgZXZlbnQgd2lsbCBiZSBlbXB0aWVkLlxuICAgICAqIFlvdSBjYW4gYWxzbyBwYXNzIGEgcmVnZXggdG8gcmVtb3ZlIGFsbCBldmVudHMgdGhhdCBtYXRjaCBpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfFJlZ0V4cH0gW2V2dF0gT3B0aW9uYWwgbmFtZSBvZiB0aGUgZXZlbnQgdG8gcmVtb3ZlIGFsbCBsaXN0ZW5lcnMgZm9yLiBXaWxsIHJlbW92ZSBmcm9tIGV2ZXJ5IGV2ZW50IGlmIG5vdCBwYXNzZWQuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgcHJvdG8ucmVtb3ZlRXZlbnQgPSBmdW5jdGlvbiByZW1vdmVFdmVudChldnQpIHtcbiAgICAgICAgdmFyIHR5cGUgPSB0eXBlb2YgZXZ0O1xuICAgICAgICB2YXIgZXZlbnRzID0gdGhpcy5fZ2V0RXZlbnRzKCk7XG4gICAgICAgIHZhciBrZXk7XG5cbiAgICAgICAgLy8gUmVtb3ZlIGRpZmZlcmVudCB0aGluZ3MgZGVwZW5kaW5nIG9uIHRoZSBzdGF0ZSBvZiBldnRcbiAgICAgICAgaWYgKHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgYWxsIGxpc3RlbmVycyBmb3IgdGhlIHNwZWNpZmllZCBldmVudFxuICAgICAgICAgICAgZGVsZXRlIGV2ZW50c1tldnRdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGV2dCBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICAgICAgLy8gUmVtb3ZlIGFsbCBldmVudHMgbWF0Y2hpbmcgdGhlIHJlZ2V4LlxuICAgICAgICAgICAgZm9yIChrZXkgaW4gZXZlbnRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50cy5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIGV2dC50ZXN0KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGV2ZW50c1trZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSBhbGwgbGlzdGVuZXJzIGluIGFsbCBldmVudHNcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHM7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQWxpYXMgb2YgcmVtb3ZlRXZlbnQuXG4gICAgICpcbiAgICAgKiBBZGRlZCB0byBtaXJyb3IgdGhlIG5vZGUgQVBJLlxuICAgICAqL1xuICAgIHByb3RvLnJlbW92ZUFsbExpc3RlbmVycyA9IGFsaWFzKCdyZW1vdmVFdmVudCcpO1xuXG4gICAgLyoqXG4gICAgICogRW1pdHMgYW4gZXZlbnQgb2YgeW91ciBjaG9pY2UuXG4gICAgICogV2hlbiBlbWl0dGVkLCBldmVyeSBsaXN0ZW5lciBhdHRhY2hlZCB0byB0aGF0IGV2ZW50IHdpbGwgYmUgZXhlY3V0ZWQuXG4gICAgICogSWYgeW91IHBhc3MgdGhlIG9wdGlvbmFsIGFyZ3VtZW50IGFycmF5IHRoZW4gdGhvc2UgYXJndW1lbnRzIHdpbGwgYmUgcGFzc2VkIHRvIGV2ZXJ5IGxpc3RlbmVyIHVwb24gZXhlY3V0aW9uLlxuICAgICAqIEJlY2F1c2UgaXQgdXNlcyBgYXBwbHlgLCB5b3VyIGFycmF5IG9mIGFyZ3VtZW50cyB3aWxsIGJlIHBhc3NlZCBhcyBpZiB5b3Ugd3JvdGUgdGhlbSBvdXQgc2VwYXJhdGVseS5cbiAgICAgKiBTbyB0aGV5IHdpbGwgbm90IGFycml2ZSB3aXRoaW4gdGhlIGFycmF5IG9uIHRoZSBvdGhlciBzaWRlLCB0aGV5IHdpbGwgYmUgc2VwYXJhdGUuXG4gICAgICogWW91IGNhbiBhbHNvIHBhc3MgYSByZWd1bGFyIGV4cHJlc3Npb24gdG8gZW1pdCB0byBhbGwgZXZlbnRzIHRoYXQgbWF0Y2ggaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xSZWdFeHB9IGV2dCBOYW1lIG9mIHRoZSBldmVudCB0byBlbWl0IGFuZCBleGVjdXRlIGxpc3RlbmVycyBmb3IuXG4gICAgICogQHBhcmFtIHtBcnJheX0gW2FyZ3NdIE9wdGlvbmFsIGFycmF5IG9mIGFyZ3VtZW50cyB0byBiZSBwYXNzZWQgdG8gZWFjaCBsaXN0ZW5lci5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKi9cbiAgICBwcm90by5lbWl0RXZlbnQgPSBmdW5jdGlvbiBlbWl0RXZlbnQoZXZ0LCBhcmdzKSB7XG4gICAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLmdldExpc3RlbmVyc0FzT2JqZWN0KGV2dCk7XG4gICAgICAgIHZhciBsaXN0ZW5lcjtcbiAgICAgICAgdmFyIGk7XG4gICAgICAgIHZhciBrZXk7XG4gICAgICAgIHZhciByZXNwb25zZTtcblxuICAgICAgICBmb3IgKGtleSBpbiBsaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIGlmIChsaXN0ZW5lcnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIGkgPSBsaXN0ZW5lcnNba2V5XS5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSBsaXN0ZW5lciByZXR1cm5zIHRydWUgdGhlbiBpdCBzaGFsbCBiZSByZW1vdmVkIGZyb20gdGhlIGV2ZW50XG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZSBmdW5jdGlvbiBpcyBleGVjdXRlZCBlaXRoZXIgd2l0aCBhIGJhc2ljIGNhbGwgb3IgYW4gYXBwbHkgaWYgdGhlcmUgaXMgYW4gYXJncyBhcnJheVxuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lciA9IGxpc3RlbmVyc1trZXldW2ldO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lci5vbmNlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKGV2dCwgbGlzdGVuZXIubGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBsaXN0ZW5lci5saXN0ZW5lci5hcHBseSh0aGlzLCBhcmdzIHx8IFtdKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UgPT09IHRoaXMuX2dldE9uY2VSZXR1cm5WYWx1ZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKGV2dCwgbGlzdGVuZXIubGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFsaWFzIG9mIGVtaXRFdmVudFxuICAgICAqL1xuICAgIHByb3RvLnRyaWdnZXIgPSBhbGlhcygnZW1pdEV2ZW50Jyk7XG5cbiAgICAvKipcbiAgICAgKiBTdWJ0bHkgZGlmZmVyZW50IGZyb20gZW1pdEV2ZW50IGluIHRoYXQgaXQgd2lsbCBwYXNzIGl0cyBhcmd1bWVudHMgb24gdG8gdGhlIGxpc3RlbmVycywgYXMgb3Bwb3NlZCB0byB0YWtpbmcgYSBzaW5nbGUgYXJyYXkgb2YgYXJndW1lbnRzIHRvIHBhc3Mgb24uXG4gICAgICogQXMgd2l0aCBlbWl0RXZlbnQsIHlvdSBjYW4gcGFzcyBhIHJlZ2V4IGluIHBsYWNlIG9mIHRoZSBldmVudCBuYW1lIHRvIGVtaXQgdG8gYWxsIGV2ZW50cyB0aGF0IG1hdGNoIGl0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8UmVnRXhwfSBldnQgTmFtZSBvZiB0aGUgZXZlbnQgdG8gZW1pdCBhbmQgZXhlY3V0ZSBsaXN0ZW5lcnMgZm9yLlxuICAgICAqIEBwYXJhbSB7Li4uKn0gT3B0aW9uYWwgYWRkaXRpb25hbCBhcmd1bWVudHMgdG8gYmUgcGFzc2VkIHRvIGVhY2ggbGlzdGVuZXIuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgcHJvdG8uZW1pdCA9IGZ1bmN0aW9uIGVtaXQoZXZ0KSB7XG4gICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW1pdEV2ZW50KGV2dCwgYXJncyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGN1cnJlbnQgdmFsdWUgdG8gY2hlY2sgYWdhaW5zdCB3aGVuIGV4ZWN1dGluZyBsaXN0ZW5lcnMuIElmIGFcbiAgICAgKiBsaXN0ZW5lcnMgcmV0dXJuIHZhbHVlIG1hdGNoZXMgdGhlIG9uZSBzZXQgaGVyZSB0aGVuIGl0IHdpbGwgYmUgcmVtb3ZlZFxuICAgICAqIGFmdGVyIGV4ZWN1dGlvbi4gVGhpcyB2YWx1ZSBkZWZhdWx0cyB0byB0cnVlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgbmV3IHZhbHVlIHRvIGNoZWNrIGZvciB3aGVuIGV4ZWN1dGluZyBsaXN0ZW5lcnMuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgcHJvdG8uc2V0T25jZVJldHVyblZhbHVlID0gZnVuY3Rpb24gc2V0T25jZVJldHVyblZhbHVlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX29uY2VSZXR1cm5WYWx1ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRmV0Y2hlcyB0aGUgY3VycmVudCB2YWx1ZSB0byBjaGVjayBhZ2FpbnN0IHdoZW4gZXhlY3V0aW5nIGxpc3RlbmVycy4gSWZcbiAgICAgKiB0aGUgbGlzdGVuZXJzIHJldHVybiB2YWx1ZSBtYXRjaGVzIHRoaXMgb25lIHRoZW4gaXQgc2hvdWxkIGJlIHJlbW92ZWRcbiAgICAgKiBhdXRvbWF0aWNhbGx5LiBJdCB3aWxsIHJldHVybiB0cnVlIGJ5IGRlZmF1bHQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHsqfEJvb2xlYW59IFRoZSBjdXJyZW50IHZhbHVlIHRvIGNoZWNrIGZvciBvciB0aGUgZGVmYXVsdCwgdHJ1ZS5cbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBwcm90by5fZ2V0T25jZVJldHVyblZhbHVlID0gZnVuY3Rpb24gX2dldE9uY2VSZXR1cm5WYWx1ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzT3duUHJvcGVydHkoJ19vbmNlUmV0dXJuVmFsdWUnKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX29uY2VSZXR1cm5WYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEZldGNoZXMgdGhlIGV2ZW50cyBvYmplY3QgYW5kIGNyZWF0ZXMgb25lIGlmIHJlcXVpcmVkLlxuICAgICAqXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgZXZlbnRzIHN0b3JhZ2Ugb2JqZWN0LlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIHByb3RvLl9nZXRFdmVudHMgPSBmdW5jdGlvbiBfZ2V0RXZlbnRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZXZlbnRzIHx8ICh0aGlzLl9ldmVudHMgPSB7fSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldmVydHMgdGhlIGdsb2JhbCB7QGxpbmsgRXZlbnRFbWl0dGVyfSB0byBpdHMgcHJldmlvdXMgdmFsdWUgYW5kIHJldHVybnMgYSByZWZlcmVuY2UgdG8gdGhpcyB2ZXJzaW9uLlxuICAgICAqXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IE5vbiBjb25mbGljdGluZyBFdmVudEVtaXR0ZXIgY2xhc3MuXG4gICAgICovXG4gICAgRXZlbnRFbWl0dGVyLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiBub0NvbmZsaWN0KCkge1xuICAgICAgICBleHBvcnRzLkV2ZW50RW1pdHRlciA9IG9yaWdpbmFsR2xvYmFsVmFsdWU7XG4gICAgICAgIHJldHVybiBFdmVudEVtaXR0ZXI7XG4gICAgfTtcblxuICAgIC8vIEV4cG9zZSB0aGUgY2xhc3MgZWl0aGVyIHZpYSBBTUQsIENvbW1vbkpTIG9yIHRoZSBnbG9iYWwgb2JqZWN0XG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIEV2ZW50RW1pdHRlcjtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKXtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBleHBvcnRzLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcbiAgICB9XG59LmNhbGwodGhpcykpO1xuIiwiIyMjKlxuICogVGhlIHB1cnBvc2Ugb2YgdGhpcyBsYXllciBpcyB0byBkZWNsYXJlIGFuZCBhYnN0cmFjdCB0aGUgYWNjZXNzIHRvXG4gKiB0aGUgY29yZSBiYXNlIG9mIGxpYnJhcmllcyB0aGF0IHRoZSByZXN0IG9mIHRoZSBzdGFjayAodGhlIGFwcCBmcmFtZXdvcmspXG4gKiB3aWxsIGRlcGVuZC5cbiAqIEBhdXRob3IgRnJhbmNpc2NvIFJhbWluaSA8ZnJhbWluaSBhdCBnbWFpbC5jb20+XG4jIyNcbigocm9vdCwgZmFjdG9yeSkgLT5cblxuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyb290LCB7fSlcblxuKSh3aW5kb3csIChyb290LCBCYXNlKSAtPlxuXG4gICAgIyBBcnJheSB0aGF0IGhvbGRzIGhhcmQgZGVwZW5kZW5jaWVzIGZvciB0aGUgU0RLXG4gICAgZGVwZW5kZW5jaWVzID0gW1xuICAgICAgICAgICAgXCJuYW1lXCI6IFwialF1ZXJ5XCJcbiAgICAgICAgICAgIFwicmVxdWlyZWRcIjogXCIxLjEwXCIgIyByZXF1aXJlZCB2ZXJzaW9uXG4gICAgICAgICAgICBcIm9ialwiOiByb290LiQgIyBnbG9iYWwgb2JqZWN0XG4gICAgICAgICAgICBcInZlcnNpb25cIjogaWYgcm9vdC4kIHRoZW4gcm9vdC4kLmZuLmpxdWVyeSBlbHNlIDAgIyBnaXZlcyB0aGUgdmVyc2lvbiBudW1iZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBvZiB0aGUgbG9hZGVkIGxpYlxuICAgICAgICAsXG4gICAgICAgICAgICBcIm5hbWVcIjogXCJVbmRlcnNjb3JlXCJcbiAgICAgICAgICAgIFwicmVxdWlyZWRcIjogXCIxLjcuMFwiICMgcmVxdWlyZWQgdmVyc2lvblxuICAgICAgICAgICAgXCJvYmpcIjogcm9vdC5fICMgZ2xvYmFsIG9iamVjdFxuICAgICAgICAgICAgXCJ2ZXJzaW9uXCI6IGlmIHJvb3QuXyB0aGVuIHJvb3QuXy5WRVJTSU9OIGVsc2UgMFxuICAgIF1cblxuICAgICMgVmVyc2lvbiBjaGVja2VyIHV0aWxcbiAgICBWZXJzaW9uQ2hlY2tlciA9IHJlcXVpcmUgJy4vdXRpbC92ZXJzaW9uY2hlY2tlci5jb2ZmZWUnXG5cbiAgICAjIEluIGNhc2UgYW55IG9mIG91ciBkZXBlbmRlbmNpZXMgd2VyZSBub3QgbG9hZGVkLCBvciBpdHMgdmVyc2lvbiBkb2VzdCBub3QgY29ycmVzcG9uZCB0byBvdXJzXG4gICAgIyBuZWVkcywgdGhlIHZlcnNpb25DaGVja2VyIHdpbGwgdGhvcncgYW4gZXJyb3IgZXhwbGFpbmluZyB3aHlcbiAgICBWZXJzaW9uQ2hlY2tlci5jaGVjayhkZXBlbmRlbmNpZXMpXG5cbiAgICAjIExvZ2dlclxuICAgIEJhc2UubG9nID0gcmVxdWlyZSAnLi91dGlsL2xvZ2dlci5jb2ZmZWUnXG5cbiAgICAjIERldmljZSBkZXRlY3Rpb25cbiAgICBCYXNlLmRldmljZSA9IHJlcXVpcmUgJy4vdXRpbC9kZXZpY2VkZXRlY3Rpb24uY29mZmVlJ1xuXG4gICAgIyBDb29raWVzIEFQSVxuICAgIEJhc2UuY29va2llcyA9IHJlcXVpcmUgJy4vdXRpbC9jb29raWVzLmNvZmZlZSdcblxuICAgICMgVmlld3BvcnQgZGV0ZWN0aW9uXG4gICAgQmFzZS52cCA9IHJlcXVpcmUgJy4vdXRpbC92aWV3cG9ydGRldGVjdGlvbi5jb2ZmZWUnXG5cbiAgICAjIEZ1bmN0aW9uIHRoYXQgaXMgZ29ubmEgaGFuZGxlIHJlc3BvbnNpdmUgaW1hZ2VzXG4gICAgQmFzZS5JbWFnZXIgPSByZXF1aXJlICdpbWFnZXIuanMnXG5cbiAgICAjIEV2ZW50IEJ1c1xuICAgIEJhc2UuRXZlbnRzID0gcmVxdWlyZSAnLi91dGlsL2V2ZW50YnVzLmNvZmZlZSdcblxuICAgICMgR2VuZXJhbCBVdGlsc1xuICAgIFV0aWxzID0gcmVxdWlyZSAnLi91dGlsL2dlbmVyYWwuY29mZmVlJ1xuXG4gICAgIyBVdGlsc1xuICAgIEJhc2UudXRpbCA9IHJvb3QuXy5leHRlbmQgVXRpbHMsIHJvb3QuX1xuXG4gICAgcmV0dXJuIEJhc2VcbikiLCIoKHJvb3QsIGZhY3RvcnkpIC0+XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3Rvcnkocm9vdCwge30pXG5cbikod2luZG93LCAocm9vdCwgRXh0KSAtPlxuXG4gICAgQmFzZSAgID0gcmVxdWlyZSgnLi8uLi9iYXNlLmNvZmZlZScpXG4gICAgTW9kdWxlID0gcmVxdWlyZSgnLi8uLi91dGlsL21vZHVsZS5jb2ZmZWUnKVxuXG4gICAgY2xhc3MgQ29tcG9uZW50XG5cbiAgICAgICAgIyBvYmplY3QgdG8gc3RvcmUgaW5pdGlhbGl6ZWQgY29tcG9uZW50c1xuICAgICAgICBAaW5pdGlhbGl6ZWRDb21wb25lbnRzIDoge31cblxuICAgICAgICAjIyMqXG4gICAgICAgICAqIHN0YXJ0QWxsIG1ldGhvZFxuICAgICAgICAgKiBUaGlzIG1ldGhvZCB3aWxsIGxvb2sgZm9yIGNvbXBvbmVudHMgdG8gc3RhcnQgd2l0aGluIHRoZSBwYXNzZWQgc2VsZWN0b3JcbiAgICAgICAgICogYW5kIGNhbGwgdGhlaXIgLmluaXRpYWxpemUoKSBtZXRob2RcbiAgICAgICAgICogQGF1dGhvciBGcmFuY2lzY28gUmFtaW5pIDxmcmFuY2lzY28ucmFtaW5pIGF0IGdsb2JhbnQuY29tPlxuICAgICAgICAgKiBAcGFyYW0gIHtbdHlwZV19IHNlbGVjdG9yID0gJ2JvZHknLiBDU1Mgc2VsZWN0b3IgdG8gdGVsbCB0aGUgYXBwIHdoZXJlIHRvIGxvb2sgZm9yIGNvbXBvbmVudHNcbiAgICAgICAgICogQHJldHVybiB7W3R5cGVdfVxuICAgICAgICAjIyNcbiAgICAgICAgQHN0YXJ0QWxsOiAoc2VsZWN0b3IgPSAnYm9keScsIGFwcCwgbmFtZXNwYWNlID0gUGVzdGxlLm1vZHVsZXMpIC0+XG5cbiAgICAgICAgICAgIGNvbXBvbmVudHMgPSBDb21wb25lbnQucGFyc2Uoc2VsZWN0b3IsIGFwcC5jb25maWcubmFtZXNwYWNlKVxuXG4gICAgICAgICAgICBjbXBjbG9uZSA9IEJhc2UudXRpbC5jbG9uZSBjb21wb25lbnRzXG5cbiAgICAgICAgICAgIEJhc2UubG9nLmluZm8gXCJQYXJzZWQgY29tcG9uZW50c1wiXG4gICAgICAgICAgICBCYXNlLmxvZy5kZWJ1ZyBjbXBjbG9uZVxuXG4gICAgICAgICAgICAjIGFkZGVkIHRvIGtlZXAgbmFtZXNwYWNlLk5BTUUgPSBERUZJTklUSU9OIHNpbnRheC4gVGhpcyB3aWxsIGV4dGVuZFxuICAgICAgICAgICAgIyB0aGUgb2JqZWN0IGRlZmluaXRpb24gd2l0aCB0aGUgTW9kdWxlIGNsYXNzXG4gICAgICAgICAgICAjIHRoaXMgbWlnaHQgbmVlZCB0byBiZSByZW1vdmVkXG4gICAgICAgICAgICB1bmxlc3MgQmFzZS51dGlsLmlzRW1wdHkgY29tcG9uZW50c1xuICAgICAgICAgICAgICAgIEJhc2UudXRpbC5lYWNoIG5hbWVzcGFjZSwgKGRlZmluaXRpb24sIG5hbWUpIC0+XG4gICAgICAgICAgICAgICAgICAgIHVubGVzcyBCYXNlLnV0aWwuaXNGdW5jdGlvbiBkZWZpbml0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICBNb2R1bGUuZXh0ZW5kIG5hbWUsIGRlZmluaXRpb25cblxuICAgICAgICAgICAgIyBncmFiIGEgcmVmZXJlbmNlIG9mIGFsbCB0aGUgbW9kdWxlIGRlZmluZWQgdXNpbmcgdGhlIE1vZHVsZS5hZGRcbiAgICAgICAgICAgICMgbWV0aG9kLlxuICAgICAgICAgICAgQmFzZS51dGlsLmV4dGVuZCBuYW1lc3BhY2UsIFBlc3RsZS5Nb2R1bGUubGlzdFxuXG4gICAgICAgICAgICBDb21wb25lbnQuaW5zdGFudGlhdGUoY29tcG9uZW50cywgYXBwKVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGFsbDogQ29tcG9uZW50LmluaXRpYWxpemVkQ29tcG9uZW50c1xuICAgICAgICAgICAgICAgIG5ldzogY21wY2xvbmVcbiAgICAgICAgICAgIH1cblxuICAgICAgICAjIyMqXG4gICAgICAgICAqIHRoZSBwYXJzZSBtZXRob2Qgd2lsbCBsb29rIGZvciBjb21wb25lbnRzIGRlZmluZWQgdXNpbmdcbiAgICAgICAgICogdGhlIGNvbmZpZ3VyZWQgbmFtZXNwYWNlIGFuZCBsaXZpbmcgd2l0aGluIHRoZSBwYXNzZWRcbiAgICAgICAgICogQ1NTIHNlbGVjdG9yXG4gICAgICAgICAqIEBhdXRob3IgRnJhbmNpc2NvIFJhbWluaSA8ZnJhbWluaSBhdCBnbWFpbC5jb20+XG4gICAgICAgICAqIEBwYXJhbSAge1t0eXBlXX0gc2VsZWN0b3IgIFtkZXNjcmlwdGlvbl1cbiAgICAgICAgICogQHBhcmFtICB7W3R5cGVdfSBuYW1lc3BhY2UgW2Rlc2NyaXB0aW9uXVxuICAgICAgICAgKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICAgICMjI1xuICAgICAgICBAcGFyc2U6IChzZWxlY3RvciwgbmFtZXNwYWNlKSAtPlxuICAgICAgICAgICAgIyBhcnJheSB0byBzdG9yZSBwYXJzZWQgY29tcG9uZW50c1xuICAgICAgICAgICAgbGlzdCA9IFtdXG5cbiAgICAgICAgICAgICMgaWYgYW4gYXJyYXkgaXMgcGFzc2VkLCB1c2UgaXQgYXMgaXQgaXNcbiAgICAgICAgICAgIGlmIEJhc2UudXRpbC5pc0FycmF5IG5hbWVzcGFjZVxuICAgICAgICAgICAgICAgIG5hbWVzcGFjZXMgPSBuYW1lc3BhY2VcbiAgICAgICAgICAgICMgaWYgYSBzdHJpbmcgaXMgcGFzc2VkIGFzIHBhcmFtZXRlciwgY29udmVydCBpdCB0byBhbiBhcnJheVxuICAgICAgICAgICAgZWxzZSBpZiBCYXNlLnV0aWwuaXNTdHJpbmcgbmFtZXNwYWNlXG4gICAgICAgICAgICAgICAgbmFtZXNwYWNlcyA9IG5hbWVzcGFjZS5zcGxpdCAnLCdcblxuICAgICAgICAgICAgIyBhcnJheSB0byBzdG9yZSB0aGUgY29tcG9zZWQgY3NzIHNlbGVjdG9yIHRoYXQgd2lsbCBsb29rIHVwIGZvclxuICAgICAgICAgICAgIyBjb21wb25lbnQgZGVmaW5pdGlvbnNcbiAgICAgICAgICAgIGNzc1NlbGVjdG9ycyA9IFtdXG5cbiAgICAgICAgICAgICMgaXRlcmF0ZXMgb3ZlciB0aGUgbmFtZXNwYWNlIGFycmF5IGFuZCBjcmVhdGUgdGhlIG5lZWRlZCBjc3Mgc2VsZWN0b3JzXG4gICAgICAgICAgICBCYXNlLnV0aWwuZWFjaCBuYW1lc3BhY2VzLCAobnMsIGkpIC0+XG4gICAgICAgICAgICAgICAgIyBpZiBhIG5ldyBuYW1lc3BhY2UgaGFzIGJlZW4gcHJvdmlkZWQgbGV0cyBhZGQgaXQgdG8gdGhlIGxpc3RcbiAgICAgICAgICAgICAgICBjc3NTZWxlY3RvcnMucHVzaCBcIltkYXRhLVwiICsgbnMgKyBcIi1jb21wb25lbnRdXCJcblxuICAgICAgICAgICAgIyBUT0RPOiBBY2Nlc3MgdGhlc2UgRE9NIGZ1bmN0aW9uYWxpdHkgdGhyb3VnaCBCYXNlXG4gICAgICAgICAgICAkKHNlbGVjdG9yKS5maW5kKGNzc1NlbGVjdG9ycy5qb2luKCcsJykpLmVhY2ggKGksIGNvbXApIC0+XG5cbiAgICAgICAgICAgICAgICAjIGlmIHRoZSBjb21wIGFscmVhZHkgaGFzIHRoZSBwZXN0bGUtZ3VpZCBhdHRhY2hlZCwgaXQgbWVhbnNcbiAgICAgICAgICAgICAgICAjIGl0IHdhcyBhbHJlYWR5IHN0YXJ0ZWQsIHNvIHdlJ2xsIG9ubHkgbG9vayBmb3IgdW5uaXRpYWxpemVkXG4gICAgICAgICAgICAgICAgIyBjb21wb25lbnRzIGhlcmVcbiAgICAgICAgICAgICAgICB1bmxlc3MgJChjb21wKS5kYXRhKCdwZXN0bGUtZ3VpZCcpXG5cbiAgICAgICAgICAgICAgICAgICAgbnMgPSBkbyAoKSAtPlxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZXNwYWNlID0gXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgQmFzZS51dGlsLmVhY2ggbmFtZXNwYWNlcywgKG5zLCBpKSAtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICMgVGhpcyB3YXkgd2Ugb2J0YWluIHRoZSBuYW1lc3BhY2Ugb2YgdGhlIGN1cnJlbnQgY29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgJChjb21wKS5kYXRhKG5zICsgXCItY29tcG9uZW50XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVzcGFjZSA9IG5zXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuYW1lc3BhY2VcblxuICAgICAgICAgICAgICAgICAgICAjIG9wdGlvbnMgd2lsbCBob2xkIGFsbCB0aGUgZGF0YS0qIGF0dHJpYnV0ZXMgcmVsYXRlZCB0byB0aGUgY29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBDb21wb25lbnQucGFyc2VDb21wb25lbnRPcHRpb25zKEAsIG5zKVxuXG4gICAgICAgICAgICAgICAgICAgIGxpc3QucHVzaCh7IG5hbWU6IG9wdGlvbnMubmFtZSwgb3B0aW9uczogb3B0aW9ucyB9KVxuXG4gICAgICAgICAgICByZXR1cm4gbGlzdFxuXG4gICAgICAgICMgdGhpcyBtZXRob2Qgd2lsbCBiZSBpbiBjaGFyZ2Ugb2YgcGFyc2luZyBhbGwgdGhlIGRhdGEtKiBhdHRyaWJ1dGVzXG4gICAgICAgICMgZGVmaW5lZCBpbiB0aGUgaXRzICRlbCBtYXJrdXAgYW5kIHBsYWNpbmcgdGhlbSBpbiBhIG9iamVjdFxuICAgICAgICBAcGFyc2VDb21wb25lbnRPcHRpb25zOiAoZWwsIG5hbWVzcGFjZSwgb3B0cykgLT5cbiAgICAgICAgICAgIG9wdGlvbnMgPSBCYXNlLnV0aWwuY2xvbmUob3B0cyB8fCB7fSlcbiAgICAgICAgICAgIG9wdGlvbnMuZWwgPSBlbFxuXG4gICAgICAgICAgICAjIFRPRE86IGFjY2VzcyB0aGlzIERPTSBmdW5jdGlvbiB0aHJvdWdoIEJhc2VcbiAgICAgICAgICAgIGRhdGEgPSAkKGVsKS5kYXRhKClcbiAgICAgICAgICAgIG5hbWUgPSAnJ1xuICAgICAgICAgICAgbGVuZ3RoID0gMFxuXG4gICAgICAgICAgICBCYXNlLnV0aWwuZWFjaCBkYXRhLCAodiwgaykgLT5cblxuICAgICAgICAgICAgICAgICMgcmVtb3ZlcyB0aGUgbmFtZXNwYWNlXG4gICAgICAgICAgICAgICAgayA9IGsucmVwbGFjZShuZXcgUmVnRXhwKFwiXlwiICsgbmFtZXNwYWNlKSwgXCJcIilcblxuICAgICAgICAgICAgICAgICMgZGVjYW1lbGl6ZSB0aGUgb3B0aW9uIG5hbWVcbiAgICAgICAgICAgICAgICBrID0gay5jaGFyQXQoMCkudG9Mb3dlckNhc2UoKSArIGsuc2xpY2UoMSlcblxuICAgICAgICAgICAgICAgICMgaWYgdGhlIGtleSBpcyBkaWZmZXJlbnQgZnJvbSBcImNvbXBvbmVudFwiIGl0IG1lYW5zIGl0IGlzXG4gICAgICAgICAgICAgICAgIyBhbiBvcHRpb24gdmFsdWVcbiAgICAgICAgICAgICAgICBpZiBrICE9IFwiY29tcG9uZW50XCJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc1trXSA9IHZcbiAgICAgICAgICAgICAgICAgICAgbGVuZ3RoKytcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIG5hbWUgPSB2XG5cbiAgICAgICAgICAgICMgYWRkIG9uZSBiZWNhdXNlIHdlJ3ZlIGFkZGVkICdlbCcgYXV0b21hdGljYWxseSBhcyBhbiBleHRyYSBvcHRpb25cbiAgICAgICAgICAgIG9wdGlvbnMubGVuZ3RoID0gbGVuZ3RoICsgMVxuXG4gICAgICAgICAgICAjIGJ1aWxkIGFkIHJldHVybiB0aGUgb3B0aW9uIG9iamVjdFxuICAgICAgICAgICAgQ29tcG9uZW50LmJ1aWxkT3B0aW9uc09iamVjdChuYW1lLCBvcHRpb25zKVxuXG5cbiAgICAgICAgQGJ1aWxkT3B0aW9uc09iamVjdDogKG5hbWUsIG9wdGlvbnMpIC0+XG5cbiAgICAgICAgICAgIG9wdGlvbnMubmFtZSA9IG5hbWVcblxuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnNcblxuICAgICAgICBAaW5zdGFudGlhdGU6IChjb21wb25lbnRzLCBhcHApIC0+XG5cbiAgICAgICAgICAgIGlmIGNvbXBvbmVudHMubGVuZ3RoID4gMFxuXG4gICAgICAgICAgICAgICAgbSA9IGNvbXBvbmVudHMuc2hpZnQoKVxuXG4gICAgICAgICAgICAgICAgIyBDaGVjayBpZiB0aGUgbW9kdWxlcyBhcmUgZGVmaW5lZCB1c2luZyB0aGUgbW9kdWxlcyBuYW1lc3BhY2VcbiAgICAgICAgICAgICAgICAjIFRPRE86IFByb3ZpZGUgYW4gYWx0ZXJuYXRlIHdheSB0byBkZWZpbmUgdGhlXG4gICAgICAgICAgICAgICAgIyBnbG9iYWwgb2JqZWN0IHRoYXQgaXMgZ29ubmEgaG9sZCB0aGUgbW9kdWxlIGRlZmluaXRpb25cbiAgICAgICAgICAgICAgICBpZiBub3QgQmFzZS51dGlsLmlzRW1wdHkoUGVzdGxlLm1vZHVsZXMpIGFuZCBQZXN0bGUubW9kdWxlc1ttLm5hbWVdIGFuZCBtLm9wdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgbW9kID0gUGVzdGxlLm1vZHVsZXNbbS5uYW1lXVxuXG4gICAgICAgICAgICAgICAgICAgICMgY3JlYXRlIGEgbmV3IHNhbmRib3ggZm9yIHRoaXMgbW9kdWxlXG4gICAgICAgICAgICAgICAgICAgIHNiID0gYXBwLmNyZWF0ZVNhbmRib3gobS5uYW1lKVxuXG4gICAgICAgICAgICAgICAgICAgICMgZ2VuZXJhdGVzIGFuIHVuaXF1ZSBndWlkIGZvciB0aGUgbW9kdWxlXG4gICAgICAgICAgICAgICAgICAgIG0ub3B0aW9ucy5ndWlkID0gQmFzZS51dGlsLnVuaXF1ZUlkKG0ubmFtZSArIFwiX1wiKVxuXG4gICAgICAgICAgICAgICAgICAgIG0ub3B0aW9ucy5fX2RlZmF1bHRzX18gPSBhcHAuY29uZmlnLmNvbXBvbmVudFttLm5hbWVdXG5cbiAgICAgICAgICAgICAgICAgICAgIyBpbmplY3QgdGhlIHNhbmRib3ggYW5kIHRoZSBvcHRpb25zIGluIHRoZSBtb2R1bGUgcHJvdG9cbiAgICAgICAgICAgICAgICAgICAgIyBCYXNlLnV0aWwuZXh0ZW5kIG1vZCwgc2FuZGJveCA6IHNiLCBvcHRpb25zOiBtLm9wdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgbW9keCA9IG5ldyBtb2Qoc2FuZGJveCA6IHNiLCBvcHRpb25zOiBtLm9wdGlvbnMpXG5cbiAgICAgICAgICAgICAgICAgICAgIyBpbml0IHRoZSBtb2R1bGVcbiAgICAgICAgICAgICAgICAgICAgbW9keC5pbml0aWFsaXplKClcblxuICAgICAgICAgICAgICAgICAgICAjIHN0b3JlIGEgcmVmZXJlbmNlIG9mIHRoZSBnZW5lcmF0ZWQgZ3VpZCBvbiB0aGUgZWxcbiAgICAgICAgICAgICAgICAgICAgJChtLm9wdGlvbnMuZWwpLmRhdGEgJ3Blc3RsZS1ndWlkJywgbS5vcHRpb25zLmd1aWRcblxuICAgICAgICAgICAgICAgICAgICAjIHNhdmVzIGEgcmVmZXJlbmNlIG9mIHRoZSBpbml0aWFsaXplZCBtb2R1bGVcbiAgICAgICAgICAgICAgICAgICAgQ29tcG9uZW50LmluaXRpYWxpemVkQ29tcG9uZW50c1sgbS5vcHRpb25zLmd1aWQgXSA9IG1vZHhcblxuICAgICAgICAgICAgICAgIENvbXBvbmVudC5pbnN0YW50aWF0ZShjb21wb25lbnRzLCBhcHApXG5cblxuICAgICMjXG4gICAgIyByZXR1cm5zIGFuIG9iamVjdCB3aXRoIHRoZSBpbml0aWFsaXplIG1ldGhvZCB0aGF0IHdpbGwgaW5pdCB0aGUgZXh0ZW5zaW9uXG4gICAgIyNcblxuICAgICMgY29uc3RydWN0b3JcbiAgICBpbml0aWFsaXplIDogKGFwcCkgLT5cblxuICAgICAgICBCYXNlLmxvZy5pbmZvIFwiW2V4dF0gQ29tcG9uZW50IGV4dGVuc2lvbiBpbml0aWFsaXplZFwiXG5cbiAgICAgICAgaW5pdGlhbGl6ZWRDb21wb25lbnRzID0ge31cblxuICAgICAgICBhcHAuc2FuZGJveC5zdGFydENvbXBvbmVudHMgPSAoc2VsZWN0b3IsIGFwcCkgLT5cblxuICAgICAgICAgICAgaW5pdGlhbGl6ZWRDb21wb25lbnRzID0gQ29tcG9uZW50LnN0YXJ0QWxsKHNlbGVjdG9yLCBhcHApXG5cbiAgICAgICAgYXBwLnNhbmRib3guZ2V0SW5pdGlhbGl6ZWRDb21wb25lbnRzID0gKCkgLT5cblxuICAgICAgICAgICAgcmV0dXJuIGluaXRpYWxpemVkQ29tcG9uZW50cy5hbGxcblxuICAgICAgICBhcHAuc2FuZGJveC5nZXRMYXN0ZXN0SW5pdGlhbGl6ZWRDb21wb25lbnRzID0gKCkgLT5cblxuICAgICAgICAgICAgcmV0dXJuIGluaXRpYWxpemVkQ29tcG9uZW50cy5uZXdcblxuXG4gICAgIyB0aGlzIG1ldGhvZCB3aWxsIGJlIGNhbGxlZCBvbmNlIGFsbCB0aGUgZXh0ZW5zaW9ucyBoYXZlIGJlZW4gbG9hZGVkXG4gICAgYWZ0ZXJBcHBTdGFydGVkOiAoc2VsZWN0b3IsIGFwcCkgLT5cblxuICAgICAgICBCYXNlLmxvZy5pbmZvIFwiQ2FsbGluZyBzdGFydENvbXBvbmVudHMgZnJvbSBhZnRlckFwcFN0YXJ0ZWRcIlxuICAgICAgICBzID0gaWYgc2VsZWN0b3IgdGhlbiBzZWxlY3RvciBlbHNlIG51bGxcbiAgICAgICAgYXBwLnNhbmRib3guc3RhcnRDb21wb25lbnRzKHMsIGFwcClcblxuICAgIG5hbWU6ICdDb21wb25lbnQgRXh0ZW5zaW9uJ1xuXG4gICAgIyB0aGlzIHByb3BlcnR5IHdpbGwgYmUgdXNlZCBmb3IgdGVzdGluZyBwdXJwb3Nlc1xuICAgICMgdG8gdmFsaWRhdGUgdGhlIENvbXBvbmVudCBjbGFzcyBpbiBpc29sYXRpb25cbiAgICBjbGFzc2VzIDogQ29tcG9uZW50XG5cbiAgICAjIFRoZSBleHBvc2VkIGtleSBuYW1lIHRoYXQgY291bGQgYmUgdXNlZCB0byBwYXNzIG9wdGlvbnNcbiAgICAjIHRvIHRoZSBleHRlbnNpb24uXG4gICAgIyBUaGlzIGlzIGdvbm5hIGJlIHVzZWQgd2hlbiBpbnN0YW50aWF0aW5nIHRoZSBDb3JlIG9iamVjdC5cbiAgICAjIE5vdGU6IEJ5IGNvbnZlbnRpb24gd2UnbGwgdXNlIHRoZSBmaWxlbmFtZVxuICAgIG9wdGlvbktleTogJ2NvbXBvbmVudHMnXG4pXG4iLCIjIyMqXG4gKiBUaGlzIGV4dGVuc2lvbiB3aWxsIGJlIHRyaWdnZXJpbmcgZXZlbnRzIG9uY2UgdGhlIERldmljZSBpbiB3aGljaCB0aGVcbiAqIHVzZXIgaXMgbmF2aWdhdGluZyB0aGUgc2l0ZSBpcyBkZXRlY3RlZC4gSXRzIGZ1Y2lvbmFsaXR5IG1vc3RseSBkZXBlbmRzXG4gKiBvbiB0aGUgY29uZmlndXJhdGlvbnMgc2V0dGluZ3MgKHByb3ZpZGVkIGJ5IGRlZmF1bHQsIGJ1dCB0aGV5IGNhbiBiZSBvdmVycmlkZW4pXG4jIyNcbigocm9vdCwgZmFjdG9yeSkgLT5cblxuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyb290LCB7fSlcblxuKSh3aW5kb3csIChyb290LCBFeHQpIC0+XG5cbiAgICBCYXNlID0gcmVxdWlyZSgnLi8uLi9iYXNlLmNvZmZlZScpXG5cbiAgICBjbGFzcyBSZXNwb25zaXZlRGVzaWduXG5cbiAgICAgICAgY2ZnIDpcbiAgICAgICAgICAgICMgVGhpcyBsaW1pdCB3aWxsIGJlIHVzZWQgdG8gbWFrZSB0aGUgZGV2aWNlIGRldGVjdGlvblxuICAgICAgICAgICAgIyB3aGVuIHRoZSB1c2VyIHJlc2l6ZSB0aGUgd2luZG93XG4gICAgICAgICAgICB3YWl0TGltaXQ6IDMwMFxuXG4gICAgICAgICAgICAjIGRlZmluZXMgaWYgd2UgaGF2ZSB0byBsaXN0ZW4gZm9yIHRoZSByZXNpemUgZXZlbnQgb24gdGhlIHdpbmRvdyBvYmpcbiAgICAgICAgICAgIHdpbmRvd1Jlc2l6ZUV2ZW50OiB0cnVlXG5cbiAgICAgICAgICAgICMgRGVmYXVsdCBicmVha3BvaW50c1xuICAgICAgICAgICAgYnJlYWtwb2ludHMgOiBbXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibW9iaWxlXCJcbiAgICAgICAgICAgICAgICAgICAgIyB1bnRpbCB0aGlzIHBvaW50IHdpbGwgYmVoYXZlcyBhcyBtb2JpbGVcbiAgICAgICAgICAgICAgICAgICAgYnBtaW46IDBcbiAgICAgICAgICAgICAgICAgICAgYnBtYXg6IDc2N1xuICAgICAgICAgICAgICAgICxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0YWJsZXRcIlxuICAgICAgICAgICAgICAgICAgICBicG1pbjogNzY4XG4gICAgICAgICAgICAgICAgICAgIGJwbWF4OiA5NTlcbiAgICAgICAgICAgICAgICAsXG4gICAgICAgICAgICAgICAgICAgICMgYnkgZGVmYXVsdCBhbnl0aGluZyBncmVhdGVyIHRoYW4gdGFibGV0IGlzIGEgZGVza3RvcFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRlc2t0b3BcIlxuICAgICAgICAgICAgICAgICAgICBicG1pbjogOTYwXG4gICAgICAgICAgICBdXG5cbiAgICAgICAgY29uc3RydWN0b3I6IChjb25maWcgPSB7fSkgLT5cblxuICAgICAgICAgICAgQmFzZS51dGlsLmJpbmRBbGwgQCwgXCJfaW5pdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGV0ZWN0RGV2aWNlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJfY2hlY2tWaWV3cG9ydFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwiX2F0dGFjaFdpbmRvd0hhbmRsZXJzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICBcImdldERldmljZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJfcmVzaXplSGFuZGxlclwiXG5cbiAgICAgICAgICAgIEBjb25maWcgPSBCYXNlLnV0aWwuZXh0ZW5kIHt9LCBAY2ZnLCBjb25maWdcblxuICAgICAgICAgICAgQF9pbml0KClcblxuICAgICAgICBfaW5pdDogKCkgLT5cblxuICAgICAgICAgICAgQF9hdHRhY2hXaW5kb3dIYW5kbGVycygpIGlmIEBjb25maWcud2luZG93UmVzaXplRXZlbnRcblxuICAgICAgICAgICAgQGRldGVjdERldmljZSgpXG5cbiAgICAgICAgX2F0dGFjaFdpbmRvd0hhbmRsZXJzOiAoKSAtPlxuXG4gICAgICAgICAgICBsYXp5UmVzaXplID0gQmFzZS51dGlsLmRlYm91bmNlIEBfcmVzaXplSGFuZGxlciwgQGNvbmZpZy53YWl0TGltaXRcblxuICAgICAgICAgICAgJCh3aW5kb3cpLnJlc2l6ZShsYXp5UmVzaXplKVxuXG4gICAgICAgIF9yZXNpemVIYW5kbGVyOiAoKSAtPlxuICAgICAgICAgICAgIyB0cmlnZ2VycyBhIHdpbmRvd3NyZXNpemUgZXZlbnQgc28gdGhpcyB3YXkgd2UgaGF2ZSBhIGNlbnRyYWxpemVkXG4gICAgICAgICAgICAjIHdheSB0byBsaXN0ZW4gZm9yIHRoZSByZXNpemUgZXZlbnQgb24gdGhlIHdpbmRvd3MgYW5kIHRoZSBjb21wb25lbnNcbiAgICAgICAgICAgICMgY2FuIGxpc3RlbiBkaXJlY3RseSB0byB0aGlzIGV2ZW50IGluc3RlYWQgb2YgZGVmaW5pbmcgYSBuZXcgbGlzdGVuZXJcbiAgICAgICAgICAgIFBlc3RsZS5lbWl0IFwicndkOndpbmRvd3Jlc2l6ZVwiXG5cbiAgICAgICAgICAgIEBkZXRlY3REZXZpY2UoKVxuXG4gICAgICAgIGRldGVjdERldmljZTogKCkgLT5cblxuICAgICAgICAgICAgYnAgPSBAY29uZmlnLmJyZWFrcG9pbnRzXG5cbiAgICAgICAgICAgIHZwID0gQmFzZS52cC52aWV3cG9ydFcoKVxuXG4gICAgICAgICAgICAjIGdldCBhIHJlZmVyZW5jZSAoaWYgYW55KSB0byB0aGUgY29ycmVzcG9uZGluZyBicmVha3BvaW50XG4gICAgICAgICAgICAjIGRlZmluZWQgaW4gdGhlIGNvbmZpZy5cbiAgICAgICAgICAgIHZwZCA9IEBfY2hlY2tWaWV3cG9ydCh2cCwgYnApXG5cbiAgICAgICAgICAgIGlmIG5vdCBCYXNlLnV0aWwuaXNFbXB0eSB2cGRcblxuICAgICAgICAgICAgICAgIGNhcGl0YWxpemVkQlBOYW1lID0gQmFzZS51dGlsLnN0cmluZy5jYXBpdGFsaXplKHZwZC5uYW1lKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICMgbGV0J3MgZmlzdCBjaGVjayBpZiB3ZSBoYXZlIGEgbWV0aG9kIHRvIGRldGVjdCB0aGUgZGV2aWNlIHRocm91Z2ggVUFcbiAgICAgICAgICAgICAgICBpZiBCYXNlLnV0aWwuaXNGdW5jdGlvbiBCYXNlLmRldmljZVsnaXMnICsgY2FwaXRhbGl6ZWRCUE5hbWVdXG4gICAgICAgICAgICAgICAgICAgIFVBRGV0ZWN0b3IgPSBCYXNlLmRldmljZVsnaXMnICsgY2FwaXRhbGl6ZWRCUE5hbWVdXG5cbiAgICAgICAgICAgICAgICAjIHZhcmlhYmxlIHRoYXQgaG9sZHMgdGhlIHJlc3VsdCBvZiBhIFVBIGNoZWNrLlxuICAgICAgICAgICAgICAgICMgVW5sZXNzIHRoZXJlIGlzIGEgbWV0aG9kIHRvIGNoZWNrIHRoZSBVQSwgbGV0c1xuICAgICAgICAgICAgICAgICMgbGVhdmUgaXQgYXMgZmFsc2UgYW5kIHVzZSBvbmx5IHRoZSB2aWV3cG9ydCB0b1xuICAgICAgICAgICAgICAgICMgbWFrZSB0aGUgZGV2aWNlIGRldGVjdGlvblxuICAgICAgICAgICAgICAgIHN0YXRlVUEgPSBmYWxzZVxuICAgICAgICAgICAgICAgIGlmIEJhc2UudXRpbC5pc0Z1bmN0aW9uIFVBRGV0ZWN0b3JcblxuICAgICAgICAgICAgICAgICAgICBzdGF0ZVVBID0gVUFEZXRlY3RvcigpXG5cbiAgICAgICAgICAgICAgICAjIEZpbmFsIGNoZWNrLiBGaXJzdCB3ZSdsbCB0cnkgdG8gbWFrZSB0byBtYWtlIHRoZSBkZWNpc2lvblxuICAgICAgICAgICAgICAgICMgdXBvbiB0aGUgY3VycmVudCBkZXZpY2UgYmFzZWQgb24gVUEsIGlmIGlzIG5vdCBwb3NzaWJsZSwgbGV0cyBqdXN0XG4gICAgICAgICAgICAgICAgIyB1c2UgdGhlIHZpZXdwb3J0XG4gICAgICAgICAgICAgICAgaWYgc3RhdGVVQSBvciB2cGQubmFtZVxuICAgICAgICAgICAgICAgICAgICAjIFRyaWdnZXIgYSBldmVudCB0aGF0IGZvbGxvd3MgdGhlIGZvbGxvd2luZyBuYW1pbmcgY29udmVudGlvblxuICAgICAgICAgICAgICAgICAgICAjIHJ3ZDo8ZGV2aWNlPlxuICAgICAgICAgICAgICAgICAgICAjIEV4YW1wbGU6IHJ3ZDp0YWJsZXQgb3IgcndkOm1vYmlsZVxuXG4gICAgICAgICAgICAgICAgICAgIGV2dCA9ICdyd2Q6JyArIHZwZC5uYW1lLnRvTG93ZXJDYXNlKClcblxuICAgICAgICAgICAgICAgICAgICBCYXNlLmxvZy5pbmZvIFwiW2V4dF0gUmVzcG9uc2l2ZSBEZXNpZ24gZXh0ZW5zaW9uIGlzIHRyaWdnZXJpbmcgdGhlIGZvbGxvd2luZ1wiXG4gICAgICAgICAgICAgICAgICAgIEJhc2UubG9nLmluZm8gZXZ0XG5cbiAgICAgICAgICAgICAgICAgICAgUGVzdGxlLmVtaXQgZXZ0XG5cbiAgICAgICAgICAgICAgICAgICAgIyBTdG9yZSB0aGUgY3VycmVudCBkZXZpY2VcbiAgICAgICAgICAgICAgICAgICAgQGRldmljZSA9IHZwZC5uYW1lLnRvTG93ZXJDYXNlKClcblxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIG1zZyA9IFwiW2V4dF0gVGhlIHBhc3NlZCBzZXR0aW5ncyB0byB0aGUgUmVzcG9uc2l2ZSBEZXNpZ24gRXh0ZW5zaW9uIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtaWdodCBub3QgYmUgY29ycmVjdCBzaW5jZSB3ZSBoYXZlbid0IGJlZW4gYWJsZSB0byBkZXRlY3QgYW4gXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcImFzb2NpYXRlZCBicmVha3BvaW50IHRvIHRoZSBjdXJyZW50IHZpZXdwb3J0XCJcbiAgICAgICAgICAgICAgICBCYXNlLmxvZy53YXJuIG1zZ1xuXG4gICAgICAgIGdldERldmljZTogKCkgLT5cblxuICAgICAgICAgICAgcmV0dXJuIEBkZXZpY2VcblxuICAgICAgICAjIyMqXG4gICAgICAgICAqIGRldGVjdCBpZiB0aGUgY3VycmVudCB2aWV3cG9ydFxuICAgICAgICAgKiBjb3JyZXNwb25kIHRvIGFueSBvZiB0aGUgZGVmaW5lZCBicCBpbiB0aGUgY29uZmlnIHNldHRpbmdcbiAgICAgICAgICogQHBhcmFtICB7W3R5cGVdfSB2cCBbbnVtYmVyLiBDdXJyZW50IHZpZXdwb3J0XVxuICAgICAgICAgKiBAcGFyYW0gIHtbdHlwZV19IGJyZWFrcG9pbnRzIFtjbG9uZSBvZiB0aGUgYnJlYWtwb2ludCBrZXkgb2JqZWN0XVxuICAgICAgICAgKiBAcmV0dXJuIHtbdHlwZV19IHRoZSBicmVha3BvaW50IHRoYXQgY29ycmVzcG9uZHMgdG8gdGhlIGN1cnJlbnRseVxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIGRldGVjdGVkIHZpZXdwb3J0XG4gICAgICAgICMjI1xuICAgICAgICBfY2hlY2tWaWV3cG9ydDogKHZwLCBicmVha3BvaW50cykgLT5cblxuICAgICAgICAgICAgYnJlYWtwb2ludCA9IEJhc2UudXRpbC5maWx0ZXIoYnJlYWtwb2ludHMsIChicCkgLT5cblxuICAgICAgICAgICAgICAgICMgc3RhcnRzIGNoZWNraW5nIGlmIHRoZSBkZXRlY3RlZCB2aWV3cG9ydCBpc1xuICAgICAgICAgICAgICAgICMgYmlnZ2VyIHRoYW4gdGhlIGJwbWluIGRlZmluZWQgaW4gdGhlIGN1cnJlbnRcbiAgICAgICAgICAgICAgICAjIGl0ZXJhdGVkIGJyZWFrcG9pbnRcbiAgICAgICAgICAgICAgICBpZiB2cCA+PSBicC5icG1pblxuXG4gICAgICAgICAgICAgICAgICAgICMgd2UnbGwgbmVlZCB0byBjaGVjayB0aGlzIHdheSBiZWNhdXNlIGJ5IGRlZmF1bHRcbiAgICAgICAgICAgICAgICAgICAgIyBpZiBhIEJQIGRvZXNuJ3QgaGF2ZSBhIGJwbWF4IHByb3BlcnR5IGl0IG1lYW5zXG4gICAgICAgICAgICAgICAgICAgICMgaXMgdGhlIGxhc3QgYW5kIGJpZ2dlciBjYXNlIHRvIGNoZWNrLiBCeSBkZWZhdWx0XG4gICAgICAgICAgICAgICAgICAgICMgaXMgZGVza3RvcFxuICAgICAgICAgICAgICAgICAgICBpZiBicC5icG1heCBhbmQgYnAuYnBtYXggIT0gMFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAjIGlmIGl0J3Mgd2l0aGluIHRoZSByYW5nZSwgYWxsIGdvb2RcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIHZwIDw9IGJwLmJwbWF4XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcblxuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAjIHRoaXMgc2hvdWxkIG9ubHkgYmUgdHJ1ZSBpbiBvbmx5IG9uZSBjYXNlXG4gICAgICAgICAgICAgICAgICAgICAgICAjIEJ5IGRlZmF1bHQsIGp1c3QgZm9yIGRlc2t0b3Agd2hpY2ggZG9lc24ndCBoYXZlXG4gICAgICAgICAgICAgICAgICAgICAgICAjIGFuIFwidW50aWxcIiBicmVha3BvaW50XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBmYWxzZVxuXG4gICAgICAgICAgICApXG5cbiAgICAgICAgICAgIGlmIGJyZWFrcG9pbnQubGVuZ3RoID4gMFxuICAgICAgICAgICAgICAgIHJldHVybiBicmVha3BvaW50LnNoaWZ0KClcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXR1cm4ge31cblxuXG4gICAgIyByZXR1cm5zIGFuIG9iamVjdCB3aXRoIHRoZSBpbml0aWFsaXplIG1ldGhvZCB0aGF0IHdpbGwgYmUgdXNlZCB0b1xuICAgICMgaW5pdCB0aGUgZXh0ZW5zaW9uXG4gICAgaW5pdGlhbGl6ZSA6IChhcHApIC0+XG5cbiAgICAgICAgQmFzZS5sb2cuaW5mbyBcIltleHRdIFJlc3BvbnNpdmUgRGVzaWduIEV4dGVuc2lvbiBpbml0aWFsaXplZFwiXG5cbiAgICAgICAgY29uZmlnID0ge31cblxuICAgICAgICAjIENoZWNrIGlmIHRoZSBleHRlbnNpb24gaGFzIGEgY3VzdG9tIGNvbmZpZyB0byB1c2VcbiAgICAgICAgaWYgYXBwLmNvbmZpZy5leHRlbnNpb24gYW5kIGFwcC5jb25maWcuZXh0ZW5zaW9uW0BvcHRpb25LZXldXG4gICAgICAgICAgICBjb25maWcgPSBCYXNlLnV0aWwuZGVmYXVsdHMge30sIGFwcC5jb25maWcuZXh0ZW5zaW9uW0BvcHRpb25LZXldXG5cbiAgICAgICAgcndkID0gbmV3IFJlc3BvbnNpdmVEZXNpZ24oY29uZmlnKVxuXG4gICAgICAgIGFwcC5zYW5kYm94LnJ3ZCA9ICgpIC0+XG4gICAgICAgICAgICAjIGNhbGwgZGV0ZWN0IERldmljZSBpbiBvcmRlciB0byB0cmlnZ2VyIHRoZSBjb3JyZXNwb25kaW5nXG4gICAgICAgICAgICAjIGRldmljZSBldmVudFxuICAgICAgICAgICAgcndkLmRldGVjdERldmljZSgpXG5cbiAgICAgICAgYXBwLnNhbmRib3gucndkLmdldERldmljZSA9ICgpIC0+XG5cbiAgICAgICAgICAgIHJ3ZC5nZXREZXZpY2UoKVxuXG4gICAgIyB0aGlzIG1ldGhvZCBpcyBtZWFudCB0byBiZSBleGVjdXRlZCBhZnRlciBjb21wb25lbnRzIGhhdmUgYmVlblxuICAgICMgaW5pdGlhbGl6ZWRcbiAgICBhZnRlckFwcEluaXRpYWxpemVkOiAoYXBwKSAtPlxuXG4gICAgICAgIEJhc2UubG9nLmluZm8gXCJhZnRlckFwcEluaXRpYWxpemVkIG1ldGhvZCBmcm9tIFJlc3BvbnNpdmVEZXNpZ25cIlxuXG4gICAgICAgIGFwcC5zYW5kYm94LnJ3ZCgpXG5cbiAgICBuYW1lOiAnUmVzcG9uc2l2ZSBEZXNpZ24gRXh0ZW5zaW9uJ1xuXG4gICAgIyBUaGUgZXhwb3NlZCBrZXkgbmFtZSB0aGF0IGNvdWxkIGJlIHVzZWQgdG8gcGFzcyBvcHRpb25zXG4gICAgIyB0byB0aGUgZXh0ZW5zaW9uLlxuICAgICMgVGhpcyBpcyBnb25uYSBiZSB1c2VkIHdoZW4gaW5zdGFudGlhdGluZyB0aGUgQ29yZSBvYmplY3QuXG4gICAgIyBOb3RlOiBCeSBjb252ZW50aW9uIHdlJ2xsIHVzZSB0aGUgZmlsZW5hbWVcbiAgICBvcHRpb25LZXk6ICdyZXNwb25zaXZlZGVzaWduJ1xuKSIsIiMjIypcbiAqIFRoaXMgZXh0ZW5zaW9uIHdpbGwgYmUgaGFuZGxpbmcgdGhlIGNyZWF0aW9uIG9mIHRoZSByZXNwb25zaXZlIGltYWdlc1xuIyMjXG4oKHJvb3QsIGZhY3RvcnkpIC0+XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3Rvcnkocm9vdCwge30pXG5cbikod2luZG93LCAocm9vdCwgRXh0KSAtPlxuXG4gICAgQmFzZSA9IHJlcXVpcmUoJy4vLi4vYmFzZS5jb2ZmZWUnKVxuXG4gICAgY2xhc3MgUmVzcG9uc2l2ZUltYWdlc1xuXG4gICAgICAgIGNmZyA6XG4gICAgICAgICAgICAjIEFycmF5IG9mIHN1cHBvcnRlZCBQaXhlbCB3aWR0aCBmb3IgaW1hZ2VzXG4gICAgICAgICAgICBhdmFpbGFibGVXaWR0aHM6IFsxMzMsMTUyLDE2MiwyMjUsMjEwLDIyNCwyODAsMzUyLDQ3MCw1MzYsNTkwLDY3Niw3MTAsNzY4LDg4NSw5NDUsMTE5MF1cblxuICAgICAgICAgICAgIyBBcnJheSBvZiBzdXBwb3J0ZXIgcGl4ZWwgcmF0aW9zXG4gICAgICAgICAgICBhdmFpbGFibGVQaXhlbFJhdGlvczogWzEsIDIsIDNdXG5cbiAgICAgICAgICAgICMgU2VsZWN0b3IgdG8gYmUgdXNlZCB3aGVuIGluc3RhbnRpbmcgSW1hZ2VyXG4gICAgICAgICAgICBkZWZhdWx0U2VsZWN0b3IgOiAnLmRlbGF5ZWQtaW1hZ2UtbG9hZCdcblxuICAgICAgICAgICAgIyBsYXp5IG1vZGUgZW5hYmxlZFxuICAgICAgICAgICAgbGF6eW1vZGUgOiB0cnVlXG5cbiAgICAgICAgY29uc3RydWN0b3I6IChjb25maWcgPSB7fSkgLT5cblxuICAgICAgICAgICAgQmFzZS51dGlsLmJpbmRBbGwgQCwgXCJfaW5pdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwiX2NyZWF0ZUxpc3RlbmVyc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwiX2NyZWF0ZUluc3RhbmNlXCJcblxuICAgICAgICAgICAgQGNvbmZpZyA9IEJhc2UudXRpbC5leHRlbmQge30sIEBjZmcsIGNvbmZpZ1xuXG4gICAgICAgICAgICBAX2luaXQoKVxuXG4gICAgICAgIF9pbml0OiAoKSAtPlxuXG4gICAgICAgICAgICAjIGNyZWF0ZXMgbGlzdGVuZXJzIHRvIGFsbG93IHRoZSBpbnN0YW50aWF0b24gb2YgdGhlIEltYWdlclxuICAgICAgICAgICAgIyBpbiBsYXp5IGxvYWQgbW9kZS5cbiAgICAgICAgICAgICMgVXNlZnVsIGZvciBpbmZpbml0ZSBzY3JvbGxzIG9yIGltYWdlcyBjcmVhdGVkIG9uIGRlbWFuZFxuICAgICAgICAgICAgQF9jcmVhdGVMaXN0ZW5lcnMoKSBpZiBAY29uZmlnLmxhenltb2RlXG5cbiAgICAgICAgICAgICMgQXMgc29vbiBhcyB0aGlzIGV4dGVuc2lvbiBpcyBpbml0aWFsaXplZCB3ZSBhcmUgZ29ubmEgYmUgY3JlYXRpbmdcbiAgICAgICAgICAgICMgdGhlIHJlc3BvbnNpdmUgaW1hZ2VzXG4gICAgICAgICAgICBAX2NyZWF0ZUluc3RhbmNlKClcblxuICAgICAgICBfY3JlYXRlTGlzdGVuZXJzOiAoKSAtPlxuICAgICAgICAgICAgIyB0aGlzIGdpdmVzIHRoZSBhYmlsaXR5IHRvIGNyZWF0ZSByZXNwb25zaXZlIGltYWdlc1xuICAgICAgICAgICAgIyBieSB0cmlnZ2VyIHRoaXMgZXZlbnQgd2l0aCBvcHRpb25hbCBhdHRyaWJ1dGVzXG4gICAgICAgICAgICBQZXN0bGUub24gJ3Jlc3BvbnNpdmVpbWFnZXM6Y3JlYXRlJywgQF9jcmVhdGVJbnN0YW5jZVxuXG4gICAgICAgIF9jcmVhdGVJbnN0YW5jZSA6IChvcHRpb25zID0ge30pIC0+XG5cbiAgICAgICAgICAgIEJhc2UubG9nLmluZm8gXCJbZXh0XSBSZXNwb25zaXZlIEltYWdlcyBFeHRlbnNpb24gY3JlYXRpbmcgYSBuZXcgSW1hZ2VyIGluc3RhbmNlXCJcblxuICAgICAgICAgICAgc2VsZWN0b3IgPSBvcHRpb25zLnNlbGVjdG9yIG9yIEBjb25maWcuZGVmYXVsdFNlbGVjdG9yXG4gICAgICAgICAgICBvcHRzID0gaWYgbm90IEJhc2UudXRpbC5pc0VtcHR5IG9wdGlvbnMgdGhlbiBvcHRpb25zIGVsc2UgQGNvbmZpZ1xuXG4gICAgICAgICAgICBuZXcgQmFzZS5JbWFnZXIoc2VsZWN0b3IsIG9wdHMpXG5cbiAgICAjIHJldHVybnMgYW4gb2JqZWN0IHdpdGggdGhlIGluaXRpYWxpemUgbWV0aG9kIHRoYXQgd2lsbCBiZSB1c2VkIHRvXG4gICAgIyBpbml0IHRoZSBleHRlbnNpb25cbiAgICBpbml0aWFsaXplIDogKGFwcCkgLT5cblxuICAgICAgICBCYXNlLmxvZy5pbmZvIFwiW2V4dF0gUmVzcG9uc2l2ZSBJbWFnZXMgRXh0ZW5zaW9uIGluaXRpYWxpemVkXCJcblxuICAgICAgICBjb25maWcgPSB7fVxuXG4gICAgICAgICMgQ2hlY2sgaWYgdGhlIGV4dGVuc2lvbiBoYXMgYSBjdXN0b20gY29uZmlnIHRvIHVzZVxuICAgICAgICBpZiBhcHAuY29uZmlnLmV4dGVuc2lvbiBhbmQgYXBwLmNvbmZpZy5leHRlbnNpb25bQG9wdGlvbktleV1cbiAgICAgICAgICAgIGNvbmZpZyA9IEJhc2UudXRpbC5kZWZhdWx0cyB7fSwgYXBwLmNvbmZpZy5leHRlbnNpb25bQG9wdGlvbktleV1cblxuICAgICAgICBhcHAuc2FuZGJveC5yZXNwb25zaXZlaW1hZ2VzID0gKCkgLT5cblxuICAgICAgICAgICAgcnAgPSBuZXcgUmVzcG9uc2l2ZUltYWdlcyhjb25maWcpXG5cbiAgICAgICAgICAgICMgdHJpZ2dlciB0aGUgZXZlbnQgdG8gbGV0IGV2ZXJ5Ym9keSBrbm93cyB0aGF0IHRoaXMgZXh0ZW5zaW9uIGZpbmlzaGVkXG4gICAgICAgICAgICAjIGl0cyBpbml0aWFsaXphdGlvblxuICAgICAgICAgICAgUGVzdGxlLmVtaXQgJ3Jlc3BvbnNpdmVpbWFnZXM6aW5pdGlhbGl6ZWQnXG5cbiAgICAjIHRoaXMgbWV0aG9kIGlzIG1lYW50IHRvIGJlIGV4ZWN1dGVkIGFmdGVyIGNvbXBvbmVudHMgaGF2ZSBiZWVuXG4gICAgIyBpbml0aWFsaXplZFxuICAgIGFmdGVyQXBwSW5pdGlhbGl6ZWQ6IChhcHApIC0+XG5cbiAgICAgICAgQmFzZS5sb2cuaW5mbyBcImFmdGVyQXBwSW5pdGlhbGl6ZWQgbWV0aG9kIGZyb20gUmVzcG9uc2l2ZUltYWdlc1wiXG5cbiAgICAgICAgYXBwLnNhbmRib3gucmVzcG9uc2l2ZWltYWdlcygpXG5cblxuICAgIG5hbWU6ICdSZXNwb25zaXZlIEltYWdlcyBFeHRlbnNpb24nXG5cbiAgICAjIFRoZSBleHBvc2VkIGtleSBuYW1lIHRoYXQgY291bGQgYmUgdXNlZCB0byBwYXNzIG9wdGlvbnNcbiAgICAjIHRvIHRoZSBleHRlbnNpb24uXG4gICAgIyBUaGlzIGlzIGdvbm5hIGJlIHVzZWQgd2hlbiBpbnN0YW50aWF0aW5nIHRoZSBDb3JlIG9iamVjdC5cbiAgICAjIE5vdGU6IEJ5IGNvbnZlbnRpb24gd2UnbGwgdXNlIHRoZSBmaWxlbmFtZVxuICAgIG9wdGlvbktleTogJ3Jlc3BvbnNpdmVpbWFnZXMnXG4pXG4iLCIoKHJvb3QsIGZhY3RvcnkpIC0+XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3Rvcnkocm9vdCwge30pXG5cbikod2luZG93LCAocm9vdCwgQ29va2llcykgLT5cblxuICAgICMgTG9nZ2VyXG4gICAgY29va2llcyA9IHJlcXVpcmUoJ2Nvb2tpZXMtanMnKVxuXG4gICAgIyBFeHBvc2UgQ29va2llcyBBUElcbiAgICBDb29raWVzID1cblxuICAgICAgICBzZXQ6IChrZXksIHZhbHVlLCBvcHRpb25zKSAtPlxuICAgICAgICAgICAgY29va2llcy5zZXQga2V5LCB2YWx1ZSwgb3B0aW9uc1xuXG4gICAgICAgIGdldDogKGtleSkgLT5cbiAgICAgICAgICAgIGNvb2tpZXMuZ2V0IGtleVxuXG4gICAgICAgIGV4cGlyZTogKGtleSwgb3B0aW9ucykgLT5cbiAgICAgICAgICAgIGNvb2tpZXMuZXhwaXJlIGtleSwgb3B0aW9uc1xuXG4gICAgcmV0dXJuIENvb2tpZXNcbikiLCIoKHJvb3QsIGZhY3RvcnkpIC0+XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3Rvcnkocm9vdCwge30pXG5cbikod2luZG93LCAocm9vdCwgRGV2aWNlRGV0ZWN0aW9uKSAtPlxuXG4gICAgIyBEZXZpY2UgZGV0ZWN0aW9uXG4gICAgaXNNb2JpbGUgPSByZXF1aXJlKCdpc21vYmlsZWpzJylcblxuICAgICMgRXhwb3NlIGRldmljZSBkZXRlY3Rpb24gQVBJXG4gICAgRGV2aWNlRGV0ZWN0aW9uID1cblxuICAgICAgICAjIEdyb3Vwc1xuICAgICAgICBpc01vYmlsZTogKCkgLT5cbiAgICAgICAgICAgIGlzTW9iaWxlLnBob25lXG5cbiAgICAgICAgaXNUYWJsZXQ6ICgpIC0+XG4gICAgICAgICAgICBpc01vYmlsZS50YWJsZXRcblxuICAgICAgICAjIEFwcGxlIGRldmljZXNcbiAgICAgICAgaXNJcGhvbmU6ICgpIC0+XG4gICAgICAgICAgICBpc01vYmlsZS5hcHBsZS5waG9uZVxuXG4gICAgICAgIGlzSXBvZDogKCkgLT5cbiAgICAgICAgICAgIGlzTW9iaWxlLmFwcGxlLmlwb2RcblxuICAgICAgICBpc0lwYWQ6ICgpIC0+XG4gICAgICAgICAgICBpc01vYmlsZS5hcHBsZS50YWJsZXRcblxuICAgICAgICBpc0FwcGxlIDogKCkgLT5cbiAgICAgICAgICAgIGlzTW9iaWxlLmFwcGxlLmRldmljZVxuXG4gICAgICAgICMgQW5kcm9pZCBkZXZpY2VzXG4gICAgICAgIGlzQW5kcm9pZFBob25lOiAoKSAtPlxuICAgICAgICAgICAgaXNNb2JpbGUuYW5kcm9pZC5waG9uZVxuXG4gICAgICAgIGlzQW5kcm9pZFRhYmxldDogKCkgLT5cbiAgICAgICAgICAgIGlzTW9iaWxlLmFuZHJvaWQudGFibGV0XG5cbiAgICAgICAgaXNBbmRyb2lkRGV2aWNlOiAoKSAtPlxuICAgICAgICAgICAgaXNNb2JpbGUuYW5kcm9pZC5kZXZpY2VcblxuICAgICAgICAjIFdpbmRvd3MgZGV2aWNlc1xuICAgICAgICBpc1dpbmRvd3NQaG9uZTogKCkgLT5cbiAgICAgICAgICAgIGlzTW9iaWxlLndpbmRvd3MucGhvbmVcblxuICAgICAgICBpc1dpbmRvd3NUYWJsZXQ6ICgpIC0+XG4gICAgICAgICAgICBpc01vYmlsZS53aW5kb3dzLnRhYmxldFxuXG4gICAgICAgIGlzV2luZG93c0RldmljZTogKCkgLT5cbiAgICAgICAgICAgIGlzTW9iaWxlLndpbmRvd3MuZGV2aWNlXG5cbiAgICByZXR1cm4gRGV2aWNlRGV0ZWN0aW9uXG4pIiwiKChyb290LCBmYWN0b3J5KSAtPlxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJvb3QsIHt9KVxuXG4pKHdpbmRvdywgKHJvb3QsIEV2ZW50QnVzKSAtPlxuXG4gICAgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnd29sZnk4Ny1ldmVudGVtaXR0ZXInKVxuXG4gICAgIyMjKlxuICAgICAqIGNsYXNzIHRoYXQgc2VydmVzIGFzIGEgZmFjYWRlIGZvciB0aGUgRXZlbnRFbWl0dGVyIGNsYXNzXG4gICAgIyMjXG4gICAgY2xhc3MgRXZlbnRCdXMgZXh0ZW5kcyBFdmVudEVtaXR0ZXJcblxuICAgIHJldHVybiBFdmVudEJ1c1xuKSIsIiMjIypcbiAqIFRoZSBFeHRlbnNpb24gTWFuYW5nZXIgd2lsbCBwcm92aWRlIHRoZSBiYXNlIHNldCBvZiBmdW5jdGlvbmFsaXRpZXNcbiAqIHRvIG1ha2UgdGhlIENvcmUgbGlicmFyeSBleHRlbnNpYmxlLlxuICogQGF1dGhvciBGcmFuY2lzY28gUmFtaW5pIDxmcmFtaW5pIGF0IGdtYWlsLmNvbT5cbiMjI1xuKChyb290LCBmYWN0b3J5KSAtPlxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJvb3QsIHt9KVxuXG4pKHdpbmRvdywgKHJvb3QsIEV4dE1hbmFnZXIpIC0+XG5cbiAgICBCYXNlID0gcmVxdWlyZSgnLi4vYmFzZS5jb2ZmZWUnKVxuXG4gICAgY2xhc3MgRXh0TWFuYWdlclxuXG4gICAgICAgICMjIypcbiAgICAgICAgICogRGVmYXVsdHMgY29uZmlncyBmb3IgdGhlIG1vZHVsZVxuICAgICAgICAgKiBAdHlwZSB7W3R5cGVdfVxuICAgICAgICAjIyNcbiAgICAgICAgX2V4dGVuc2lvbkNvbmZpZ0RlZmF1bHRzOlxuICAgICAgICAgICAgYWN0aXZhdGVkIDogdHJ1ZSAjIHVubGVzcyBzYWlkIG90aGVyd2lzZSwgZXZlcnkgYWRkZWQgZXh0ZW5zaW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICMgd2lsbCBiZSBhY3RpdmF0ZWQgb24gc3RhcnRcblxuICAgICAgICBjb25zdHJ1Y3RvcjogKCkgLT5cbiAgICAgICAgICAgICMgdG8ga2VlcCB0cmFjayBvZiBhbGwgZXh0ZW5zaW9uc1xuICAgICAgICAgICAgQF9leHRlbnNpb25zID0gW11cblxuICAgICAgICAgICAgIyB0byBrZWVwIHRyYWNrIG9mIGFsbCBpbml0aWFsaXplZCBleHRlbnNpb25cbiAgICAgICAgICAgIEBfaW5pdGlhbGl6ZWRFeHRlbnNpb25zID0gW11cblxuICAgICAgICBhZGQ6IChleHQpIC0+XG5cbiAgICAgICAgICAgICMgY2hlY2tzIGlmIHRoZSBuYW1lIGZvciB0aGUgZXh0ZW5zaW9uIGhhdmUgYmVlbiBkZWZpbmVkLlxuICAgICAgICAgICAgIyBpZiBub3QgbG9nIGEgd2FybmluZyBtZXNzYWdlXG4gICAgICAgICAgICB1bmxlc3MgZXh0Lm5hbWVcbiAgICAgICAgICAgICAgICBtc2cgPSBcIlRoZSBleHRlbnNpb24gZG9lc24ndCBoYXZlIGEgbmFtZSBhc3NvY2lhdGVkLiBJdCB3aWxsIGJlIGhlcGZ1bGwgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgIFwiaWYgeW91IGhhdmUgYXNzaW5nIGFsbCBvZiB5b3VyIGV4dGVuc2lvbnMgYSBuYW1lIGZvciBiZXR0ZXIgZGVidWdnaW5nXCJcbiAgICAgICAgICAgICAgICBCYXNlLmxvZy53YXJuIG1zZ1xuXG4gICAgICAgICAgICAjIExldHMgdGhyb3cgYW4gZXJyb3IgaWYgd2UgdHJ5IHRvIGluaXRpYWxpemUgdGhlIHNhbWUgZXh0ZW5zaW9uIHR3aWNlc1xuICAgICAgICAgICAgQmFzZS51dGlsLmVhY2ggQF9leHRlbnNpb25zLCAoeHQsIGkpIC0+XG4gICAgICAgICAgICAgICAgaWYgXy5pc0VxdWFsIHh0LCBleHRcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXh0ZW5zaW9uOiBcIiArIGV4dC5uYW1lICsgXCIgYWxyZWFkeSBleGlzdHMuXCIpXG5cbiAgICAgICAgICAgIEBfZXh0ZW5zaW9ucy5wdXNoKGV4dClcblxuICAgICAgICBpbml0IDogKGNvbnRleHQpIC0+XG4gICAgICAgICAgICB4dGNsb25lID0gQmFzZS51dGlsLmNsb25lIEBfZXh0ZW5zaW9uc1xuXG4gICAgICAgICAgICBCYXNlLmxvZy5pbmZvIFwiQWRkZWQgZXh0ZW5zaW9ucyAoc3RpbGwgbm90IGluaXRpYWxpemVkKTpcIlxuICAgICAgICAgICAgQmFzZS5sb2cuZGVidWcgeHRjbG9uZVxuXG4gICAgICAgICAgICBAX2luaXRFeHRlbnNpb24oQF9leHRlbnNpb25zLCBjb250ZXh0KVxuXG4gICAgICAgICAgICBCYXNlLmxvZy5pbmZvIFwiSW5pdGlhbGl6ZWQgZXh0ZW5zaW9uczpcIlxuICAgICAgICAgICAgQmFzZS5sb2cuZGVidWcgQF9pbml0aWFsaXplZEV4dGVuc2lvbnNcblxuICAgICAgICBfaW5pdEV4dGVuc2lvbiA6IChleHRlbnNpb25zLCBjb250ZXh0KSAtPlxuXG4gICAgICAgICAgICBpZiBleHRlbnNpb25zLmxlbmd0aCA+IDBcblxuICAgICAgICAgICAgICAgIHh0ID0gZXh0ZW5zaW9ucy5zaGlmdCgpXG5cbiAgICAgICAgICAgICAgICAjIENhbGwgZXh0ZW5zaW9ucyBjb25zdHJ1Y3RvclxuICAgICAgICAgICAgICAgIGlmIEBfaXNFeHRlbnNpb25BbGxvd2VkVG9CZUFjdGl2YXRlZCh4dCwgY29udGV4dC5jb25maWcpXG4gICAgICAgICAgICAgICAgICAgICMgdGhpcyBzdGF0ZSBjb3VsZCB0ZWxsIHRvIHRoZSByZXN0IG9mIHRoZSB3b3JsZCBpZlxuICAgICAgICAgICAgICAgICAgICAjIGV4dGVuc2lvbnMgaGFzIGJlZW4gaW5pdGlhbGl6ZWQgb3Igbm90XG4gICAgICAgICAgICAgICAgICAgIHh0LmFjdGl2YXRlZCA9IHRydWVcblxuICAgICAgICAgICAgICAgICAgICAjIGNhbGwgdG8gdGhlIGV4dGVuc2lvbiBpbml0aWFsaXplIG1ldGhvZFxuICAgICAgICAgICAgICAgICAgICB4dC5pbml0aWFsaXplKGNvbnRleHQpXG5cbiAgICAgICAgICAgICAgICAgICAgIyBLZWVwIHRyYWNrIG9mIHRoZSBpbml0aWFsaXplZCBleHRlbnNpb25zIGZvciBmdXR1cmUgcmVmZXJlbmNlXG4gICAgICAgICAgICAgICAgICAgIEBfaW5pdGlhbGl6ZWRFeHRlbnNpb25zLnB1c2ggeHRcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHh0LmFjdGl2YXRlZCA9IGZhbHNlXG5cbiAgICAgICAgICAgICAgICAjIGNhbGwgdGhpcyBtZXRob2QgcmVjdXJzaXZlbHkgdW50aWwgdGhlcmUgYXJlIG5vIG1vcmVcbiAgICAgICAgICAgICAgICAjIGVsZW1lbnRzIGluIHRoZSBhcnJheVxuICAgICAgICAgICAgICAgIEBfaW5pdEV4dGVuc2lvbihleHRlbnNpb25zLCBjb250ZXh0KVxuXG4gICAgICAgIF9pc0V4dGVuc2lvbkFsbG93ZWRUb0JlQWN0aXZhdGVkOiAoeHQsIGNvbmZpZykgLT5cblxuICAgICAgICAgICAgIyBmaXJzdCB3ZSBoYXZlIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSBcIm9wdGlvbnNcIiBrZXkgaXMgZGVmaW5lZFxuICAgICAgICAgICAgIyBieSB0aGUgZXh0ZW5zaW9uXG4gICAgICAgICAgICB1bmxlc3MgeHQub3B0aW9uS2V5XG4gICAgICAgICAgICAgICAgbXNnID0gXCJUaGUgb3B0aW9uS2V5IGlzIHJlcXVpcmVkIGFuZCB3YXMgbm90IGRlZmluZWQgYnk6IFwiICsgeHQubmFtZVxuICAgICAgICAgICAgICAgIEJhc2UubG9nLmVycm9yIG1zZ1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpXG5cbiAgICAgICAgICAgICMgaWYgb3B0aW9ucyB3ZXJlIHByb3ZpZGVkIHRvIHRoZSBleHRlbnNpb24sIGxldHMgY2hlY2sganVzdCBmb3IgXCJhY3RpdmF0ZWRcIlxuICAgICAgICAgICAgIyB3aGljaCBpcyB0aGUgb25seSBvcHRpb24gdGhhdCBzaG91bGQgbWF0dGVyIHdpdGhpbiB0aGlzIG1ldGhvZFxuICAgICAgICAgICAgaWYgY29uZmlnLmV4dGVuc2lvbiBhbmQgY29uZmlnLmV4dGVuc2lvblt4dC5vcHRpb25LZXldIGFuZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnLmV4dGVuc2lvblt4dC5vcHRpb25LZXldLmhhc093blByb3BlcnR5ICdhY3RpdmF0ZWQnXG4gICAgICAgICAgICAgICAgYWN0aXZhdGVkID0gY29uZmlnLmV4dGVuc2lvblt4dC5vcHRpb25LZXldLmFjdGl2YXRlZFxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGFjdGl2YXRlZCA9IEBfZXh0ZW5zaW9uQ29uZmlnRGVmYXVsdHMuYWN0aXZhdGVkXG5cbiAgICAgICAgICAgIHJldHVybiBhY3RpdmF0ZWRcblxuXG4gICAgICAgIGdldEluaXRpYWxpemVkRXh0ZW5zaW9ucyA6ICgpIC0+XG4gICAgICAgICAgICByZXR1cm4gQF9pbml0aWFsaXplZEV4dGVuc2lvbnNcblxuICAgICAgICBnZXRJbml0aWFsaXplZEV4dGVuc2lvbkJ5TmFtZSA6IChuYW1lKSAtPlxuICAgICAgICAgICAgQmFzZS51dGlsLndoZXJlIEBfaW5pdGlhbGl6ZWRFeHRlbnNpb25zLCBvcHRpb25LZXk6IG5hbWVcblxuICAgICAgICBnZXRFeHRlbnNpb25zIDogKCkgLT5cbiAgICAgICAgICAgIHJldHVybiBAX2V4dGVuc2lvbnNcblxuICAgICAgICBnZXRFeHRlbnNpb25CeU5hbWUgOiAobmFtZSkgLT5cbiAgICAgICAgICAgIEJhc2UudXRpbC53aGVyZSBAX2V4dGVuc2lvbnMsIG9wdGlvbktleTogbmFtZVxuXG4gICAgcmV0dXJuIEV4dE1hbmFnZXJcblxuKVxuIiwiKChyb290LCBmYWN0b3J5KSAtPlxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJvb3QsIHt9KVxuXG4pKHdpbmRvdywgKHJvb3QsIFV0aWxzKSAtPlxuXG4gICAgIyBFeHBvc2UgVXRpbHMgQVBJXG4gICAgVXRpbHMgPVxuXG4gICAgICAgICMjIypcbiAgICAgICAgICogRnVuY3Rpb24gdG8gY29tcGFyZSBsaWJyYXJ5IHZlcnNpb25pbmdcbiAgICAgICAgIyMjXG4gICAgICAgIHZlcnNpb25Db21wYXJlIDogKHYxLCB2Miwgb3B0aW9ucykgLT5cblxuICAgICAgICAgICAgaXNWYWxpZFBhcnQgPSAoeCkgLT5cbiAgICAgICAgICAgICAgICAoKGlmIGxleGljb2dyYXBoaWNhbCB0aGVuIC9eXFxkK1tBLVphLXpdKiQvIGVsc2UgL15cXGQrJC8pKS50ZXN0IHhcblxuICAgICAgICAgICAgbGV4aWNvZ3JhcGhpY2FsID0gb3B0aW9ucyBhbmQgb3B0aW9ucy5sZXhpY29ncmFwaGljYWxcbiAgICAgICAgICAgIHplcm9FeHRlbmQgPSBvcHRpb25zIGFuZCBvcHRpb25zLnplcm9FeHRlbmRcbiAgICAgICAgICAgIHYxcGFydHMgPSB2MS5zcGxpdChcIi5cIilcbiAgICAgICAgICAgIHYycGFydHMgPSB2Mi5zcGxpdChcIi5cIilcblxuICAgICAgICAgICAgcmV0dXJuIE5hTiBpZiBub3QgdjFwYXJ0cy5ldmVyeShpc1ZhbGlkUGFydCkgb3Igbm90IHYycGFydHMuZXZlcnkoaXNWYWxpZFBhcnQpXG5cbiAgICAgICAgICAgIGlmIHplcm9FeHRlbmRcbiAgICAgICAgICAgICAgICB2MXBhcnRzLnB1c2ggXCIwXCIgICAgd2hpbGUgdjFwYXJ0cy5sZW5ndGggPCB2MnBhcnRzLmxlbmd0aFxuICAgICAgICAgICAgICAgIHYycGFydHMucHVzaCBcIjBcIiAgICB3aGlsZSB2MnBhcnRzLmxlbmd0aCA8IHYxcGFydHMubGVuZ3RoXG5cbiAgICAgICAgICAgIHVubGVzcyBsZXhpY29ncmFwaGljYWxcbiAgICAgICAgICAgICAgICB2MXBhcnRzID0gdjFwYXJ0cy5tYXAoTnVtYmVyKVxuICAgICAgICAgICAgICAgIHYycGFydHMgPSB2MnBhcnRzLm1hcChOdW1iZXIpXG5cbiAgICAgICAgICAgIGkgPSAtMVxuICAgICAgICAgICAgd2hpbGUgaSA8IHYxcGFydHMubGVuZ3RoXG4gICAgICAgICAgICAgICAgaSsrXG5cbiAgICAgICAgICAgICAgICBpZiB2MnBhcnRzLmxlbmd0aCA8IGlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDFcbiAgICAgICAgICAgICAgICBpZiB2MXBhcnRzW2ldID09IHYycGFydHNbaV1cbiAgICAgICAgICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICAgICAgICBlbHNlIGlmIHYxcGFydHNbaV0gPiB2MnBhcnRzW2ldXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAxXG4gICAgICAgICAgICAgICAgZWxzZSBpZiB2MnBhcnRzW2ldID4gdjFwYXJ0c1tpXVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gLTFcblxuICAgICAgICAgICAgcmV0dXJuIC0xIGlmIHYxcGFydHMubGVuZ3RoICE9IHYycGFydHMubGVuZ3RoXG5cbiAgICAgICAgICAgIHJldHVybiAwXG5cbiAgICAgICAgc3RyaW5nOlxuICAgICAgICAgICAgY2FwaXRhbGl6ZTogKHN0cikgLT5cbiAgICAgICAgICAgICAgICBzdHIgPSAoaWYgbm90IHN0cj8gdGhlbiBcIlwiIGVsc2UgU3RyaW5nKHN0cikpXG4gICAgICAgICAgICAgICAgc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyLnNsaWNlKDEpXG5cbiAgICByZXR1cm4gVXRpbHNcbikiLCIoKHJvb3QsIGZhY3RvcnkpIC0+XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3Rvcnkocm9vdCwge30pXG5cbikod2luZG93LCAocm9vdCwgTG9nZ2VyKSAtPlxuXG4gICAgIyBMb2dnZXJcbiAgICBsb2dsZXZlbCA9IHJlcXVpcmUoJ2xvZ2xldmVsJylcblxuICAgIHNlbnRyeSA9IHJlcXVpcmUoJy4vc2VudHJ5LmNvZmZlZScpXG5cbiAgICAjIEV4cG9zZSB0aGUgTG9nZ2VyIEFQSVxuICAgIExvZ2dlciA9XG5cbiAgICAgICAgc2V0TGV2ZWw6IChsZXZlbCkgLT5cbiAgICAgICAgICAgIGxvZ2xldmVsLnNldExldmVsKGxldmVsKVxuXG4gICAgICAgIHNldENvbmZpZzogKGNvbmZpZykgLT5cbiAgICAgICAgICAgIGxvZ2xldmVsLnNldExldmVsKGNvbmZpZy5sb2dMZXZlbClcbiAgICAgICAgICAgIGlmIGNvbmZpZy5zZW50cnlcbiAgICAgICAgICAgICAgICBzZW50cnkuaW5pdGlhbGl6ZShjb25maWcuc2VudHJ5KVxuXG4gICAgICAgIHRyYWNlOiAobXNnKSAtPlxuICAgICAgICAgICAgbG9nbGV2ZWwudHJhY2UobXNnKVxuXG4gICAgICAgIGRlYnVnOiAobXNnKSAtPlxuICAgICAgICAgICAgbG9nbGV2ZWwuZGVidWcobXNnKVxuXG4gICAgICAgIGluZm86IChtc2cpIC0+XG4gICAgICAgICAgICBsb2dsZXZlbC5pbmZvKG1zZylcblxuICAgICAgICB3YXJuOiAobXNnKSAtPlxuICAgICAgICAgICAgbG9nbGV2ZWwud2Fybihtc2cpXG5cbiAgICAgICAgZXJyb3I6IChtc2cpIC0+XG4gICAgICAgICAgICBsb2dsZXZlbC5lcnJvcihtc2cpXG4gICAgICAgICAgICBzZW50cnkuc2VuZE1lc3NhZ2UobXNnKVxuXG5cbiAgICByZXR1cm4gTG9nZ2VyXG4pIiwiIyMjKlxuICogVGhpcyB3aWxsIHByb3ZpZGUgdGhlIGZ1bmN0aW9uYWxpdHkgdG8gZGVmaW5lIE1vZHVsZXNcbiAqIGFuZCBwcm92aWRlIGEgd2F5IHRvIGV4dGVuZCB0aGVtXG4gKiBAYXV0aG9yIEZyYW5jaXNjbyBSYW1pbmkgPGZyYW1pbmkgYXQgZ21haWwuY29tPlxuIyMjXG4oKHJvb3QsIGZhY3RvcnkpIC0+XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3Rvcnkocm9vdCwge30pXG5cbikod2luZG93LCAocm9vdCwgTW9kdWxlKSAtPlxuXG4gICAgQmFzZSA9IHJlcXVpcmUoJy4uL2Jhc2UuY29mZmVlJylcblxuICAgICMgdGhpcyB3aWxsIHNlcnZlIGFzIHRoZSBiYXNlIGNsYXNzIGZvciBhIE1vZHVsZVxuICAgIGNsYXNzIE1vZHVsZVxuICAgICAgICBjb25zdHJ1Y3RvcjogKG9wdCkgLT5cbiAgICAgICAgICAgIEBzYW5kYm94ID0gb3B0LnNhbmRib3hcbiAgICAgICAgICAgIEBvcHRpb25zID0gb3B0Lm9wdGlvbnNcbiAgICAgICAgICAgIEBzZXRFbGVtZW50KClcblxuXG4gICAgIyB0aGlzIGNsYXNzIHdpbGwgZXhwb3NlIHN0YXRpYyBtZXRob2RzIHRvIGFkZCwgZXh0ZW5kIGFuZFxuICAgICMgZ2V0IHRoZSBsaXN0IG9mIGFkZGVkIG1vZHVsZXNcbiAgICBjbGFzcyBNb2R1bGVzXG5cbiAgICAgICAgIyB0aGlzIHdpbGwgaG9sZCB0aGUgbGlzdCBvZiBhZGRlZCBtb2R1bGVzXG4gICAgICAgIEBsaXN0IDoge31cblxuICAgICAgICAjIyMqXG4gICAgICAgICAqIGp1c3QgYW4gYWxpYXMgZm9yIHRoZSBleHRlbmQgbWV0aG9kXG4gICAgICAgICAqIEBhdXRob3IgRnJhbmNpc2NvIFJhbWluaSA8ZnJhbWluaSBhdCBnbWFpbC5jb20+XG4gICAgICAgICAqIEBwYXJhbSAge1tTdHJpbmddfSBuYW1lXG4gICAgICAgICAqIEBwYXJhbSAge1tPYmplY3RdfSBkZWZpbml0aW9uXG4gICAgICAgICMjI1xuICAgICAgICBAYWRkIDogKG5hbWUsIGRlZmluaXRpb24pIC0+XG4gICAgICAgICAgICBAZXh0ZW5kKG5hbWUsIGRlZmluaXRpb24sIE1vZHVsZSlcblxuICAgICAgICAjIyMqXG4gICAgICAgICAqIGdldHRlciBmb3IgcmV0cmlldmluZyBtb2R1bGVzIGRlZmluaXRpb25zXG4gICAgICAgICAqIEBhdXRob3IgRnJhbmNpc2NvIFJhbWluaSA8ZnJhbWluaSBhdCBnbWFpbC5jb20+XG4gICAgICAgICAqIEBwYXJhbSAge1t0eXBlXX0gbmFtZVxuICAgICAgICAgKiBAcmV0dXJuIHtbRnVuY3Rpb24vdW5kZWZpbmVkXX1cbiAgICAgICAgIyMjXG4gICAgICAgIEBnZXQgOiAobmFtZSkgLT5cbiAgICAgICAgICAgIGlmIEJhc2UudXRpbC5pc1N0cmluZyhuYW1lKSBhbmQgQGxpc3RbbmFtZV1cbiAgICAgICAgICAgICAgICByZXR1cm4gQGxpc3RbbmFtZV1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkXG5cbiAgICAgICAgIyMjKlxuICAgICAgICAgKiB0aGlzIHdpbGwgYWxsb3dzIHVzIHRvIHNpbXBsaWZ5IGFuZCBoYXZlIG1vcmUgY29udHJvbFxuICAgICAgICAgKiBvdmVyIGFkZGluZy9kZWZpbmluZyBtb2R1bGVzXG4gICAgICAgICAqIEBhdXRob3IgRnJhbmNpc2NvIFJhbWluaSA8ZnJhbWluaSBhdCBnbWFpbC5jb20+XG4gICAgICAgICAqIEBwYXJhbSAge1tTdHJpbmddfSBuYW1lXG4gICAgICAgICAqIEBwYXJhbSAge1tPYmplY3RdfSBkZWZpbml0aW9uXG4gICAgICAgICAqIEBwYXJhbSAge1tTdHJpbmcvRnVuY3Rpb25dfSBCYXNlQ2xhc3NcbiAgICAgICAgIyMjXG4gICAgICAgIEBleHRlbmQgOiAobmFtZSwgZGVmaW5pdGlvbiwgQmFzZUNsYXNzKSAtPlxuICAgICAgICAgICAgaWYgQmFzZS51dGlsLmlzU3RyaW5nKG5hbWUpIGFuZCBCYXNlLnV0aWwuaXNPYmplY3QoZGVmaW5pdGlvbilcbiAgICAgICAgICAgICAgICAjIGlmIG5vIEJhc2VDbGFzcyBpcyBwYXNzZWQsIGJ5IGRlZmF1bHQgd2UnbGwgdXNlIHRoZSBNb2R1bGUgY2xhc3NcbiAgICAgICAgICAgICAgICB1bmxlc3MgQmFzZUNsYXNzXG4gICAgICAgICAgICAgICAgICAgIEJhc2VDbGFzcyA9IE1vZHVsZVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgIyBpZiB3ZSBhcmUgcGFzc2luZyB0aGUgQmFzZUNsYXNzIGFzIGEgc3RyaW5nLCBpdCBtZWFucyB0aGF0IGNsYXNzXG4gICAgICAgICAgICAgICAgICAgICMgc2hvdWxkIGhhdmUgYmVlbiBhZGRlZCBwcmV2aW91c2x5LCBzbyB3ZSdsbCBsb29rIHVuZGVyIHRoZSBsaXN0IG9ialxuICAgICAgICAgICAgICAgICAgICBpZiBCYXNlLnV0aWwuaXNTdHJpbmcgQmFzZUNsYXNzXG4gICAgICAgICAgICAgICAgICAgICAgICAjIGNoZWNrIGlmIHRoZSBjbGFzcyBoYXMgYmVlbiBhbHJlYWR5IGFkZGVkXG4gICAgICAgICAgICAgICAgICAgICAgICBiYyA9IEBsaXN0W0Jhc2VDbGFzc11cbiAgICAgICAgICAgICAgICAgICAgICAgICMgaWYgdGhlIGRlZmluaXRpb24gZXhpc3RzLCBsZXRzIGFzc2lnbiBpdCB0byBCYXNlQ2xhc3NcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIGJjXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQmFzZUNsYXNzID0gYmNcbiAgICAgICAgICAgICAgICAgICAgICAgICMgaWYgbm90LCBsZXRzIHRocm93IGFuIGVycm9yXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbXNnID0gJ1tNb2R1bGUvICcrIG5hbWUgKycgXTogaXMgdHJ5aW5nIHRvIGV4dGVuZCBbJyArIEJhc2VDbGFzcyArICddIHdoaWNoIGRvZXMgbm90IGV4aXN0J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJhc2UubG9nLmVycm9yIG1zZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpXG4gICAgICAgICAgICAgICAgICAgICMgaWYgaXQgaXMgYSBmdW5jdGlvbiwgd2UnbGwgdXNlIGl0IGRpcmVjdGx5XG4gICAgICAgICAgICAgICAgICAgICMgVE9ETzogZG8gc29tZSBjaGVja2luZyBiZWZvcmUgdHJ5aW5nIHRvIHVzZSBpdCBkaXJlY3RseVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIEJhc2UudXRpbC5pc0Z1bmN0aW9uIEJhc2VDbGFzc1xuICAgICAgICAgICAgICAgICAgICAgICAgQmFzZUNsYXNzID0gQmFzZUNsYXNzXG5cbiAgICAgICAgICAgICAgICBleHRlbmRlZENsYXNzID0gZXh0ZW5kLmNhbGwgQmFzZUNsYXNzLCBkZWZpbml0aW9uXG4gICAgICAgICAgICAgICAgIyB3ZSdsbCBvbmx5IHRyeSB0byBhZGQgdGhpcyBkZWZpbml0aW9uIGluIGNhc2VcbiAgICAgICAgICAgICAgICB1bmxlc3MgQmFzZS51dGlsLmhhcyBAbGlzdCwgbmFtZVxuICAgICAgICAgICAgICAgICAgICAjIGV4dGVuZHMgdGhlIGN1cnJlbnQgZGVmaW5pdGlvbiB3aXRoIHRoZSBNb2R1bGUgY2xhc3NcbiAgICAgICAgICAgICAgICAgICAgZXh0ZW5kZWREZWZpbml0aW9uID0gZXh0ZW5kLmNhbGwgQmFzZUNsYXNzLCBkZWZpbml0aW9uXG4gICAgICAgICAgICAgICAgICAgICMgc3RvcmUgdGhlIHJlZmVyZW5jZSBmb3IgbGF0ZXIgdXNhZ2VcbiAgICAgICAgICAgICAgICAgICAgQGxpc3RbbmFtZV0gPSBleHRlbmRlZERlZmluaXRpb25cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXh0ZW5kZWREZWZpbml0aW9uXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAjIGluZm9ybSB0aGUgZGV2cyB0aGF0IHNvbWVvbmUgaXMgdHJ5aW5nIHRvIGFkZCBhIG1vZHVsZSdzXG4gICAgICAgICAgICAgICAgICAgICMgZGVmaW5pdGlvbiB0aGF0IGhhcyBiZWVuIHByZXZpb3VzbHkgYWRkZWRcbiAgICAgICAgICAgICAgICAgICAgbXNnID0gJ1tDb21wb25lbnQ6JyArIG5hbWUgKyAnXSBoYXZlIGFscmVhZHkgYmVlbiBkZWZpbmVkJyBcbiAgICAgICAgICAgICAgICAgICAgQmFzZS5sb2cud2FybiBtc2dcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gQFxuXG5cbiAgICBCYXNlLnV0aWwuZXh0ZW5kIE1vZHVsZTo6LCBCYXNlLkV2ZW50cyxcblxuICAgICAgICAjIHRoaXMgaGFzIHRvIGJlIG92ZXdyaXR0ZW4gYnkgdGhlIG1vZHVsZSBkZWZpbml0aW9uXG4gICAgICAgIGluaXRpYWxpemU6ICgpIC0+XG4gICAgICAgICAgICBtc2cgPSAnW0NvbXBvbmVudC8nICsgQG9wdGlvbnMubmFtZSArICddOicgKyAnRG9lc25cXCd0IGhhdmUgYW4gaW5pdGlhbGl6ZSBtZXRob2QgZGVmaW5lZCdcbiAgICAgICAgICAgIEJhc2UubG9nLndhcm4gbXNnXG5cbiAgICAgICAgc2V0RWxlbWVudDogKCkgLT5cbiAgICAgICAgICAgIEB1bmRlbGVnYXRlRXZlbnRzKClcblxuICAgICAgICAgICAgQGVsID0gQG9wdGlvbnMuZWxcbiAgICAgICAgICAgIEAkZWwgPSAkKEBlbClcblxuICAgICAgICAgICAgQGRlbGVnYXRlRXZlbnRzKClcblxuICAgICAgICBkZWxlZ2F0ZUV2ZW50czogKGV2ZW50cykgLT5cbiAgICAgICAgICAgICMgcmVnZXggdG8gc3BsaXQgdGhlIGV2ZW50cyBrZXkgKHNlcGFyYXRlcyB0aGUgZXZlbnQgZnJvbSB0aGUgc2VsZWN0b3IpXG4gICAgICAgICAgICBkZWxlZ2F0ZUV2ZW50U3BsaXR0ZXIgPSAvXihcXFMrKVxccyooLiopJC9cblxuICAgICAgICAgICAgIyBpZiB0aGUgZXZlbnRzIG9iamVjdCBpcyBub3QgZGVmaW5lZCBvciBwYXNzZWQgYXMgYSBwYXJhbWV0ZXJcbiAgICAgICAgICAgICMgdGhlcmUgaXMgbm90aGluZyB0byBkbyBoZXJlXG4gICAgICAgICAgICByZXR1cm4gICAgdW5sZXNzIGV2ZW50cyBvciAoZXZlbnRzID0gQmFzZS51dGlsLnJlc3VsdChALCBcImV2ZW50c1wiKSlcbiAgICAgICAgICAgICMgYmVmb3JlIHRyeWluZyB0byBhdHRhY2ggbmV3IGV2ZW50cywgbGV0cyByZW1vdmUgYW55IHByZXZpb3VzXG4gICAgICAgICAgICAjIGF0dGFjaGVkIGV2ZW50XG4gICAgICAgICAgICBAdW5kZWxlZ2F0ZUV2ZW50cygpXG5cbiAgICAgICAgICAgIGZvciBrZXkgb2YgZXZlbnRzXG4gICAgICAgICAgICAgICAgIyBncmFiIHRoZSBtZXRob2QgbmFtZVxuICAgICAgICAgICAgICAgIG1ldGhvZCA9IGV2ZW50c1trZXldXG4gICAgICAgICAgICAgICAgIyBncmFiIHRoZSBtZXRob2QncyBkZWZpbml0aW9uXG4gICAgICAgICAgICAgICAgbWV0aG9kID0gQFtldmVudHNba2V5XV0gICAgdW5sZXNzIEJhc2UudXRpbC5pc0Z1bmN0aW9uKG1ldGhvZClcbiAgICAgICAgICAgICAgICBjb250aW51ZSAgICB1bmxlc3MgbWV0aG9kXG4gICAgICAgICAgICAgICAgbWF0Y2ggPSBrZXkubWF0Y2goZGVsZWdhdGVFdmVudFNwbGl0dGVyKVxuICAgICAgICAgICAgICAgIEBkZWxlZ2F0ZSBtYXRjaFsxXSwgbWF0Y2hbMl0sIEJhc2UudXRpbC5iaW5kKG1ldGhvZCwgQClcblxuICAgICAgICAgICAgcmV0dXJuIEBcblxuICAgICAgICBkZWxlZ2F0ZTogKGV2ZW50TmFtZSwgc2VsZWN0b3IsIGxpc3RlbmVyKSAtPlxuICAgICAgICAgICAgQCRlbC5vbiBldmVudE5hbWUgKyBcIi5wZXN0bGVFdmVudFwiICsgQG9wdGlvbnMuZ3VpZCwgc2VsZWN0b3IsIGxpc3RlbmVyXG4gICAgICAgICAgICByZXR1cm4gQFxuXG4gICAgICAgIHVuZGVsZWdhdGVFdmVudHM6ICgpIC0+XG4gICAgICAgICAgICBAJGVsLm9mZignLnBlc3RsZUV2ZW50JyArIEBvcHRpb25zLmd1aWQpICAgIGlmIEAkZWxcbiAgICAgICAgICAgIHJldHVybiBAXG5cbiAgICAgICAgIyBieSBkZWZhdWx0LCBpdCB3aWxsIHJlbW92ZSBldmVudGxpc3RlbmVycyBhbmQgcmVtb3ZlIHRoZVxuICAgICAgICAjICRlbCBmcm9tIHRoZSBET01cbiAgICAgICAgc3RvcDogKCkgLT5cbiAgICAgICAgICAgIEB1bmRlbGVnYXRlRXZlbnRzKClcbiAgICAgICAgICAgIEAkZWwucmVtb3ZlKCkgaWYgQCRlbFxuXG4gICAgIyBIZWxwZXJzXG4gICAgZXh0ZW5kID0gKHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSAtPlxuICAgICAgICBwYXJlbnQgPSBAXG5cbiAgICAgICAgIyBUaGUgY29uc3RydWN0b3IgZnVuY3Rpb24gZm9yIHRoZSBuZXcgc3ViY2xhc3MgaXMgZWl0aGVyIGRlZmluZWQgYnkgeW91XG4gICAgICAgICMgKHRoZSBcImNvbnN0cnVjdG9yXCIgcHJvcGVydHkgaW4geW91ciBgZXh0ZW5kYCBkZWZpbml0aW9uKSwgb3IgZGVmYXVsdGVkXG4gICAgICAgICMgYnkgdXMgdG8gc2ltcGx5IGNhbGwgdGhlIHBhcmVudCdzIGNvbnN0cnVjdG9yXG4gICAgICAgIGlmIHByb3RvUHJvcHMgYW5kIEJhc2UudXRpbC5oYXMocHJvdG9Qcm9wcywgXCJjb25zdHJ1Y3RvclwiKVxuICAgICAgICAgICAgY2hpbGQgPSBwcm90b1Byb3BzLmNvbnN0cnVjdG9yXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGNoaWxkID0gLT5cbiAgICAgICAgICAgICAgICBwYXJlbnQuYXBwbHkgQCwgYXJndW1lbnRzXG5cbiAgICAgICAgIyBBZGQgc3RhdGljIHByb3BlcnRpZXMgdG8gdGhlIGNvbnN0cnVjdG9yIGZ1bmN0aW9uLCBpZiBzdXBwbGllZC5cbiAgICAgICAgQmFzZS51dGlsLmV4dGVuZCBjaGlsZCwgcGFyZW50LCBzdGF0aWNQcm9wc1xuXG4gICAgICAgICMgU2V0IHRoZSBwcm90b3R5cGUgY2hhaW4gdG8gaW5oZXJpdCBmcm9tIGBwYXJlbnRgLCB3aXRob3V0IGNhbGxpbmdcbiAgICAgICAgIyBgcGFyZW50YCdzIGNvbnN0cnVjdG9yIGZ1bmN0aW9uLlxuICAgICAgICBTdXJyb2dhdGUgPSAtPlxuICAgICAgICAgICAgQGNvbnN0cnVjdG9yID0gY2hpbGRcbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIFN1cnJvZ2F0ZTo6ID0gcGFyZW50OjpcbiAgICAgICAgY2hpbGQ6OiA9IG5ldyBTdXJyb2dhdGVcblxuICAgICAgICAjIEFkZCBwcm90b3R5cGUgcHJvcGVydGllcyAoaW5zdGFuY2UgcHJvcGVydGllcykgdG8gdGhlIHN1YmNsYXNzLFxuICAgICAgICAjIGlmIHN1cHBsaWVkLlxuICAgICAgICBCYXNlLnV0aWwuZXh0ZW5kIGNoaWxkOjosIHByb3RvUHJvcHMgICAgaWYgcHJvdG9Qcm9wc1xuXG4gICAgICAgICMgc3RvcmUgYSByZWZlcmVuY2UgdG8gdGhlIGluaXRpYWxpemUgbWV0aG9kIHNvIGl0IGNhbiBiZSBjYWxsZWRcbiAgICAgICAgIyBmcm9tIGl0cyBjaGlsZHNcbiAgICAgICAgY2hpbGQ6Ol9zdXBlcl8gPSBwYXJlbnQ6OmluaXRpYWxpemVcblxuICAgICAgICByZXR1cm4gY2hpbGRcblxuICAgICMgU3RvcmUgYSByZWZlcmVuY2UgdG8gdGhlIGJhc2UgY2xhc3MgZm9yIG1vZHVsZXNcbiAgICBNb2R1bGVzLk1vZHVsZSA9IE1vZHVsZVxuXG4gICAgcmV0dXJuIE1vZHVsZXNcbikiLCIoKHJvb3QsIGZhY3RvcnkpIC0+XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3Rvcnkocm9vdCwge30pXG5cbikod2luZG93LCAocm9vdCwgU2VudHJ5KSAtPlxuXG4gICAgIyBSYXZlbiAtIFNlbnRyeSBDbGllbnRcbiAgICBSYXZlbiA9IHJlcXVpcmUoJ3JhdmVuLWpzJylcblxuICAgICMgRXhwb3NlIHRoZSBTZW50cnkgQVBJXG4gICAgU2VudHJ5ID1cbiAgICAgICAgaW5pdGlhbGl6ZSA6IChjb25maWcpIC0+XG4gICAgICAgICAgICBSYXZlbi5jb25maWcoY29uZmlnLmVuZFBvaW50LCBjb25maWcub3B0aW9ucylcbiAgICAgICAgICAgIFJhdmVuLmluc3RhbGwoKVxuXG4gICAgICAgIHNlbmRNZXNzYWdlIDogKG1zZykgLT5cbiAgICAgICAgICAgIGlmIFJhdmVuLmlzU2V0dXAoKVxuICAgICAgICAgICAgICAgIFJhdmVuLmNhcHR1cmVNZXNzYWdlKG1zZylcblxuICAgIHJldHVybiBTZW50cnlcbikiLCIoKHJvb3QsIGZhY3RvcnkpIC0+XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3Rvcnkocm9vdCwge30pXG5cbikod2luZG93LCAocm9vdCwgVmVyc2lvbkNoZWNrZXIpIC0+XG5cbiAgICBsb2cgPSByZXF1aXJlICcuL2xvZ2dlci5jb2ZmZWUnXG4gICAgVXRpbHMgPSByZXF1aXJlICcuL2dlbmVyYWwuY29mZmVlJ1xuXG4gICAgIyBFeHBvc2UgVmVyc2lvbkNoZWNrZXIgQVBJXG4gICAgVmVyc2lvbkNoZWNrZXIgPVxuXG4gICAgICAgICMjIypcbiAgICAgICAgICogUmVjdXJzaXZlIG1ldGhvZCB0byBjaGVjayB2ZXJzaW9uaW5nIGZvciBhbGwgdGhlIGRlZmluZWQgbGlicmFyaWVzXG4gICAgICAgICAqIHdpdGhpbiB0aGUgZGVwZW5kZW5jeSBhcnJheVxuICAgICAgICAjIyNcbiAgICAgICAgY2hlY2s6IChkZXBlbmRlbmNpZXMpIC0+XG5cbiAgICAgICAgICAgIGlmIGRlcGVuZGVuY2llcy5sZW5ndGggPiAwXG5cbiAgICAgICAgICAgICAgICBkcCA9IGRlcGVuZGVuY2llcy5zaGlmdCgpXG5cbiAgICAgICAgICAgICAgICB1bmxlc3MgZHAub2JqXG4gICAgICAgICAgICAgICAgICAgIG1zZyA9IGRwLm5hbWUgKyBcIiBpcyBhIGhhcmQgZGVwZW5kZW5jeSBhbmQgaXQgaGFzIHRvIGJlIGxvYWRlZCBiZWZvcmUgcGVzdGxlLmpzXCJcbiAgICAgICAgICAgICAgICAgICAgbG9nLmVycm9yIG1zZ1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKVxuXG4gICAgICAgICAgICAgICAgIyBjb21wYXJlIHRoZSB2ZXJzaW9uXG4gICAgICAgICAgICAgICAgdW5sZXNzIFV0aWxzLnZlcnNpb25Db21wYXJlKGRwLnZlcnNpb24sIGRwLnJlcXVpcmVkKSA+PSAwXG4gICAgICAgICAgICAgICAgICAgICMgaWYgd2UgZW50ZXIgaGVyZSBpdCBtZWFucyB0aGUgbG9hZGVkIGxpYnJhcnkgZG9lc3Qgbm90IGZ1bGZpbGwgb3VyIG5lZWRzXG4gICAgICAgICAgICAgICAgICAgIG1zZyA9IFwiW0ZBSUxdIFwiICsgZHAubmFtZSArIFwiOiB2ZXJzaW9uIHJlcXVpcmVkOiBcIiArIGRwLnJlcXVpcmVkICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgPC0tPiBMb2FkZWQgdmVyc2lvbjogXCIgKyBkcC52ZXJzaW9uXG4gICAgICAgICAgICAgICAgICAgIGxvZy5lcnJvciBtc2dcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZylcblxuICAgICAgICAgICAgICAgIFZlcnNpb25DaGVja2VyLmNoZWNrKGRlcGVuZGVuY2llcylcblxuXG4gICAgcmV0dXJuIFZlcnNpb25DaGVja2VyXG4pIiwiKChyb290LCBmYWN0b3J5KSAtPlxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJvb3QsIHt9KVxuXG4pKHdpbmRvdywgKHJvb3QsIFZpZXdwb3J0KSAtPlxuXG4gICAgIyBMb2dnZXJcbiAgICB2aWV3cG9ydCA9IHJlcXVpcmUoJ3ZlcmdlJylcblxuICAgICMgRXhwb3NlIFZpZXdwb3J0IGRldGVjdGlvbiBBUElcbiAgICBWaWV3cG9ydCA9XG5cbiAgICAgICAgdmlld3BvcnRXOiAoKSAtPlxuICAgICAgICAgICAgdmlld3BvcnQudmlld3BvcnRXKClcblxuICAgICAgICB2aWV3cG9ydEg6IChrZXkpIC0+XG4gICAgICAgICAgICB2aWV3cG9ydC52aWV3cG9ydEgoKVxuXG4gICAgICAgIHZpZXdwb3J0OiAoa2V5KSAtPlxuICAgICAgICAgICAgdmlld3BvcnQudmlld3BvcnQoKVxuXG4gICAgICAgIGluVmlld3BvcnQ6IChlbCwgY3VzaGlvbikgLT5cbiAgICAgICAgICAgIHZpZXdwb3J0LmluVmlld3BvcnQoZWwsIGN1c2hpb24pXG5cbiAgICAgICAgaW5YOiAoZWwsIGN1c2hpb24pIC0+XG4gICAgICAgICAgICB2aWV3cG9ydC5pblgoZWwsIGN1c2hpb24pXG5cbiAgICAgICAgaW5ZOiAoZWwsIGN1c2hpb24pIC0+XG4gICAgICAgICAgICB2aWV3cG9ydC5pblkoZWwsIGN1c2hpb24pXG5cbiAgICAgICAgc2Nyb2xsWDogKCkgLT5cbiAgICAgICAgICAgIHZpZXdwb3J0LnNjcm9sbFgoKVxuXG4gICAgICAgIHNjcm9sbFk6ICgpIC0+XG4gICAgICAgICAgICB2aWV3cG9ydC5zY3JvbGxZKClcblxuICAgICAgICAjIFRvIHRlc3QgaWYgYSBtZWRpYSBxdWVyeSBpcyBhY3RpdmVcbiAgICAgICAgbXE6IChtZWRpYVF1ZXJ5U3RyaW5nKSAtPlxuICAgICAgICAgICAgdmlld3BvcnQubXEobWVkaWFRdWVyeVN0cmluZylcblxuICAgICAgICByZWN0YW5nbGU6IChlbCwgY3VzaGlvbikgLT5cbiAgICAgICAgICAgIHZpZXdwb3J0LnJlY3RhbmdsZShlbCwgY3VzaGlvbilcblxuICAgICAgICAjIGlmIG5vIGFyZ3VtZW50IGlzIHBhc3NlZCwgdGhlbiBpdCByZXR1cm5zIHRoZSBhc3BlY3RcbiAgICAgICAgIyByYXRpbyBvZiB0aGUgdmlld3BvcnQuIElmIGFuIGVsZW1lbnQgaXMgcGFzc2VkIGl0IHJldHVybnNcbiAgICAgICAgIyB0aGUgYXNwZWN0IHJhdGlvIG9mIHRoZSBlbGVtZW50XG4gICAgICAgIGFzcGVjdDogKG8pIC0+XG4gICAgICAgICAgICB2aWV3cG9ydC5hc3BlY3QobylcblxuICAgIHJldHVybiBWaWV3cG9ydFxuKSJdfQ==
