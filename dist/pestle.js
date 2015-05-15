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



},{"./base.coffee":"/Users/abaylus/Dropbox (National Geographic)/Projects/pestle/src/base.coffee","./extension/components.coffee":"/Users/abaylus/Dropbox (National Geographic)/Projects/pestle/src/extension/components.coffee","./extension/responsivedesign.coffee":"/Users/abaylus/Dropbox (National Geographic)/Projects/pestle/src/extension/responsivedesign.coffee","./extension/responsiveimages.coffee":"/Users/abaylus/Dropbox (National Geographic)/Projects/pestle/src/extension/responsiveimages.coffee","./util/extmanager.coffee":"/Users/abaylus/Dropbox (National Geographic)/Projects/pestle/src/util/extmanager.coffee","./util/module.coffee":"/Users/abaylus/Dropbox (National Geographic)/Projects/pestle/src/util/module.coffee"}],"/Users/abaylus/Dropbox (National Geographic)/Projects/pestle/node_modules/cookies-js/dist/cookies.js":[function(_dereq_,module,exports){
/*
 * Cookies.js - 1.2.1
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
        
        Cookies._maxExpireDate = new Date('Fri, 31 Dec 9999 23:59:59 UTC');

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

            if (typeof expires === 'number') {
                expires = expires === Infinity ?
                    Cookies._maxExpireDate : new Date(now.getTime() + expires * 1000);
            } else if (typeof expires === 'string') {
                expires = new Date(expires);
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
},{}],"/Users/abaylus/Dropbox (National Geographic)/Projects/pestle/node_modules/imager.js/Imager.js":[function(_dereq_,module,exports){
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
},{}],"/Users/abaylus/Dropbox (National Geographic)/Projects/pestle/node_modules/ismobilejs/isMobile.js":[function(_dereq_,module,exports){
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

},{}],"/Users/abaylus/Dropbox (National Geographic)/Projects/pestle/node_modules/loglevel/lib/loglevel.js":[function(_dereq_,module,exports){
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

},{}],"/Users/abaylus/Dropbox (National Geographic)/Projects/pestle/node_modules/raven-js/dist/raven.js":[function(_dereq_,module,exports){
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

},{}],"/Users/abaylus/Dropbox (National Geographic)/Projects/pestle/node_modules/verge/verge.js":[function(_dereq_,module,exports){
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
},{}],"/Users/abaylus/Dropbox (National Geographic)/Projects/pestle/node_modules/wolfy87-eventemitter/EventEmitter.js":[function(_dereq_,module,exports){
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

},{}],"/Users/abaylus/Dropbox (National Geographic)/Projects/pestle/src/base.coffee":[function(_dereq_,module,exports){

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



},{"./util/cookies.coffee":"/Users/abaylus/Dropbox (National Geographic)/Projects/pestle/src/util/cookies.coffee","./util/devicedetection.coffee":"/Users/abaylus/Dropbox (National Geographic)/Projects/pestle/src/util/devicedetection.coffee","./util/eventbus.coffee":"/Users/abaylus/Dropbox (National Geographic)/Projects/pestle/src/util/eventbus.coffee","./util/general.coffee":"/Users/abaylus/Dropbox (National Geographic)/Projects/pestle/src/util/general.coffee","./util/logger.coffee":"/Users/abaylus/Dropbox (National Geographic)/Projects/pestle/src/util/logger.coffee","./util/versionchecker.coffee":"/Users/abaylus/Dropbox (National Geographic)/Projects/pestle/src/util/versionchecker.coffee","./util/viewportdetection.coffee":"/Users/abaylus/Dropbox (National Geographic)/Projects/pestle/src/util/viewportdetection.coffee","imager.js":"/Users/abaylus/Dropbox (National Geographic)/Projects/pestle/node_modules/imager.js/Imager.js"}],"/Users/abaylus/Dropbox (National Geographic)/Projects/pestle/src/extension/components.coffee":[function(_dereq_,module,exports){
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



},{"./../base.coffee":"/Users/abaylus/Dropbox (National Geographic)/Projects/pestle/src/base.coffee","./../util/module.coffee":"/Users/abaylus/Dropbox (National Geographic)/Projects/pestle/src/util/module.coffee"}],"/Users/abaylus/Dropbox (National Geographic)/Projects/pestle/src/extension/responsivedesign.coffee":[function(_dereq_,module,exports){

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



},{"./../base.coffee":"/Users/abaylus/Dropbox (National Geographic)/Projects/pestle/src/base.coffee"}],"/Users/abaylus/Dropbox (National Geographic)/Projects/pestle/src/extension/responsiveimages.coffee":[function(_dereq_,module,exports){

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



},{"./../base.coffee":"/Users/abaylus/Dropbox (National Geographic)/Projects/pestle/src/base.coffee"}],"/Users/abaylus/Dropbox (National Geographic)/Projects/pestle/src/util/cookies.coffee":[function(_dereq_,module,exports){
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



},{"cookies-js":"/Users/abaylus/Dropbox (National Geographic)/Projects/pestle/node_modules/cookies-js/dist/cookies.js"}],"/Users/abaylus/Dropbox (National Geographic)/Projects/pestle/src/util/devicedetection.coffee":[function(_dereq_,module,exports){
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



},{"ismobilejs":"/Users/abaylus/Dropbox (National Geographic)/Projects/pestle/node_modules/ismobilejs/isMobile.js"}],"/Users/abaylus/Dropbox (National Geographic)/Projects/pestle/src/util/eventbus.coffee":[function(_dereq_,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

(function(root, factory) {
  return module.exports = factory(root, {});
})(window, function(root, EventBus) {
  var EventEmitter;
  EventEmitter = _dereq_('wolfy87-eventemitter');

  /**
   * class that serves as a facade for the EventEmitter class
   */
  EventBus = (function(superClass) {
    extend(EventBus, superClass);

    function EventBus() {
      return EventBus.__super__.constructor.apply(this, arguments);
    }

    return EventBus;

  })(EventEmitter);
  return EventBus;
});



},{"wolfy87-eventemitter":"/Users/abaylus/Dropbox (National Geographic)/Projects/pestle/node_modules/wolfy87-eventemitter/EventEmitter.js"}],"/Users/abaylus/Dropbox (National Geographic)/Projects/pestle/src/util/extmanager.coffee":[function(_dereq_,module,exports){

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



},{"../base.coffee":"/Users/abaylus/Dropbox (National Geographic)/Projects/pestle/src/base.coffee"}],"/Users/abaylus/Dropbox (National Geographic)/Projects/pestle/src/util/general.coffee":[function(_dereq_,module,exports){
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



},{}],"/Users/abaylus/Dropbox (National Geographic)/Projects/pestle/src/util/logger.coffee":[function(_dereq_,module,exports){
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



},{"./sentry.coffee":"/Users/abaylus/Dropbox (National Geographic)/Projects/pestle/src/util/sentry.coffee","loglevel":"/Users/abaylus/Dropbox (National Geographic)/Projects/pestle/node_modules/loglevel/lib/loglevel.js"}],"/Users/abaylus/Dropbox (National Geographic)/Projects/pestle/src/util/module.coffee":[function(_dereq_,module,exports){

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



},{"../base.coffee":"/Users/abaylus/Dropbox (National Geographic)/Projects/pestle/src/base.coffee"}],"/Users/abaylus/Dropbox (National Geographic)/Projects/pestle/src/util/sentry.coffee":[function(_dereq_,module,exports){
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



},{"raven-js":"/Users/abaylus/Dropbox (National Geographic)/Projects/pestle/node_modules/raven-js/dist/raven.js"}],"/Users/abaylus/Dropbox (National Geographic)/Projects/pestle/src/util/versionchecker.coffee":[function(_dereq_,module,exports){
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



},{"./general.coffee":"/Users/abaylus/Dropbox (National Geographic)/Projects/pestle/src/util/general.coffee","./logger.coffee":"/Users/abaylus/Dropbox (National Geographic)/Projects/pestle/src/util/logger.coffee"}],"/Users/abaylus/Dropbox (National Geographic)/Projects/pestle/src/util/viewportdetection.coffee":[function(_dereq_,module,exports){
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



},{"verge":"/Users/abaylus/Dropbox (National Geographic)/Projects/pestle/node_modules/verge/verge.js"}]},{},["./src/core.coffee"])("./src/core.coffee")
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYWJheWx1cy9Ecm9wYm94IChOYXRpb25hbCBHZW9ncmFwaGljKS9Qcm9qZWN0cy9wZXN0bGUvc3JjL2NvcmUuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Nvb2tpZXMtanMvZGlzdC9jb29raWVzLmpzIiwibm9kZV9tb2R1bGVzL2ltYWdlci5qcy9JbWFnZXIuanMiLCJub2RlX21vZHVsZXMvaXNtb2JpbGVqcy9pc01vYmlsZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2dsZXZlbC9saWIvbG9nbGV2ZWwuanMiLCJub2RlX21vZHVsZXMvcmF2ZW4tanMvZGlzdC9yYXZlbi5qcyIsIm5vZGVfbW9kdWxlcy92ZXJnZS92ZXJnZS5qcyIsIm5vZGVfbW9kdWxlcy93b2xmeTg3LWV2ZW50ZW1pdHRlci9FdmVudEVtaXR0ZXIuanMiLCIvVXNlcnMvYWJheWx1cy9Ecm9wYm94IChOYXRpb25hbCBHZW9ncmFwaGljKS9Qcm9qZWN0cy9wZXN0bGUvc3JjL2Jhc2UuY29mZmVlIiwiL1VzZXJzL2FiYXlsdXMvRHJvcGJveCAoTmF0aW9uYWwgR2VvZ3JhcGhpYykvUHJvamVjdHMvcGVzdGxlL3NyYy9leHRlbnNpb24vY29tcG9uZW50cy5jb2ZmZWUiLCIvVXNlcnMvYWJheWx1cy9Ecm9wYm94IChOYXRpb25hbCBHZW9ncmFwaGljKS9Qcm9qZWN0cy9wZXN0bGUvc3JjL2V4dGVuc2lvbi9yZXNwb25zaXZlZGVzaWduLmNvZmZlZSIsIi9Vc2Vycy9hYmF5bHVzL0Ryb3Bib3ggKE5hdGlvbmFsIEdlb2dyYXBoaWMpL1Byb2plY3RzL3Blc3RsZS9zcmMvZXh0ZW5zaW9uL3Jlc3BvbnNpdmVpbWFnZXMuY29mZmVlIiwiL1VzZXJzL2FiYXlsdXMvRHJvcGJveCAoTmF0aW9uYWwgR2VvZ3JhcGhpYykvUHJvamVjdHMvcGVzdGxlL3NyYy91dGlsL2Nvb2tpZXMuY29mZmVlIiwiL1VzZXJzL2FiYXlsdXMvRHJvcGJveCAoTmF0aW9uYWwgR2VvZ3JhcGhpYykvUHJvamVjdHMvcGVzdGxlL3NyYy91dGlsL2RldmljZWRldGVjdGlvbi5jb2ZmZWUiLCIvVXNlcnMvYWJheWx1cy9Ecm9wYm94IChOYXRpb25hbCBHZW9ncmFwaGljKS9Qcm9qZWN0cy9wZXN0bGUvc3JjL3V0aWwvZXZlbnRidXMuY29mZmVlIiwiL1VzZXJzL2FiYXlsdXMvRHJvcGJveCAoTmF0aW9uYWwgR2VvZ3JhcGhpYykvUHJvamVjdHMvcGVzdGxlL3NyYy91dGlsL2V4dG1hbmFnZXIuY29mZmVlIiwiL1VzZXJzL2FiYXlsdXMvRHJvcGJveCAoTmF0aW9uYWwgR2VvZ3JhcGhpYykvUHJvamVjdHMvcGVzdGxlL3NyYy91dGlsL2dlbmVyYWwuY29mZmVlIiwiL1VzZXJzL2FiYXlsdXMvRHJvcGJveCAoTmF0aW9uYWwgR2VvZ3JhcGhpYykvUHJvamVjdHMvcGVzdGxlL3NyYy91dGlsL2xvZ2dlci5jb2ZmZWUiLCIvVXNlcnMvYWJheWx1cy9Ecm9wYm94IChOYXRpb25hbCBHZW9ncmFwaGljKS9Qcm9qZWN0cy9wZXN0bGUvc3JjL3V0aWwvbW9kdWxlLmNvZmZlZSIsIi9Vc2Vycy9hYmF5bHVzL0Ryb3Bib3ggKE5hdGlvbmFsIEdlb2dyYXBoaWMpL1Byb2plY3RzL3Blc3RsZS9zcmMvdXRpbC9zZW50cnkuY29mZmVlIiwiL1VzZXJzL2FiYXlsdXMvRHJvcGJveCAoTmF0aW9uYWwgR2VvZ3JhcGhpYykvUHJvamVjdHMvcGVzdGxlL3NyYy91dGlsL3ZlcnNpb25jaGVja2VyLmNvZmZlZSIsIi9Vc2Vycy9hYmF5bHVzL0Ryb3Bib3ggKE5hdGlvbmFsIEdlb2dyYXBoaWMpL1Byb2plY3RzL3Blc3RsZS9zcmMvdXRpbC92aWV3cG9ydGRldGVjdGlvbi5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUFBOzs7O0dBQUE7QUFBQSxDQUtDLFNBQUMsSUFBRCxFQUFPLE9BQVAsR0FBQTtTQUVH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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvMERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUFRLENBQUMsT0FBVCxDQUFBLEVBREs7SUFBQSxDQWxCVDtBQUFBLElBcUJBLE9BQUEsRUFBUyxTQUFBLEdBQUE7YUFDTCxRQUFRLENBQUMsT0FBVCxDQUFBLEVBREs7SUFBQSxDQXJCVDtBQUFBLElBeUJBLEVBQUEsRUFBSSxTQUFDLGdCQUFELEdBQUE7YUFDQSxRQUFRLENBQUMsRUFBVCxDQUFZLGdCQUFaLEVBREE7SUFBQSxDQXpCSjtBQUFBLElBNEJBLFNBQUEsRUFBVyxTQUFDLEVBQUQsRUFBSyxPQUFMLEdBQUE7YUFDUCxRQUFRLENBQUMsU0FBVCxDQUFtQixFQUFuQixFQUF1QixPQUF2QixFQURPO0lBQUEsQ0E1Qlg7QUFBQSxJQWtDQSxNQUFBLEVBQVEsU0FBQyxDQUFELEdBQUE7YUFDSixRQUFRLENBQUMsTUFBVCxDQUFnQixDQUFoQixFQURJO0lBQUEsQ0FsQ1I7R0FMSixDQUFBO0FBMENBLFNBQU8sUUFBUCxDQTdDTTtBQUFBLENBSlYsQ0FBQSxDQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIiMjIypcbiAqIFRoZSBjb3JlIGxheWVyIHdpbGwgZGVwZW5kIG9uIHRoZSBiYXNlIGxheWVyIGFuZCB3aWxsIHByb3ZpZGVcbiAqIHRoZSBjb3JlIHNldCBvZiBmdW5jdGlvbmFsaXR5IHRvIGFwcGxpY2F0aW9uIGZyYW1ld29ya1xuICogQGF1dGhvciBGcmFuY2lzY28gUmFtaW5pIDxmcmFtaW5pIGF0IGdtYWlsLmNvbT5cbiMjI1xuKChyb290LCBmYWN0b3J5KSAtPlxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSByb290LlBlc3RsZSA9IGZhY3Rvcnkocm9vdCwge30pXG5cbikod2luZG93LCAocm9vdCwgUGVzdGxlKSAtPlxuXG4gICAgQmFzZSAgICAgICA9IHJlcXVpcmUoJy4vYmFzZS5jb2ZmZWUnKVxuICAgIEV4dE1hbmFnZXIgPSByZXF1aXJlKCcuL3V0aWwvZXh0bWFuYWdlci5jb2ZmZWUnKVxuXG4gICAgIyB3ZSdsbCB1c2UgdGhlIFBlc3RsZSBvYmplY3QgYXMgdGhlIGdsb2JhbCBFdmVudCBidXNcbiAgICBQZXN0bGUgPSBuZXcgQmFzZS5FdmVudHMoKVxuXG4gICAgUGVzdGxlLk1vZHVsZSA9IHJlcXVpcmUoJy4vdXRpbC9tb2R1bGUuY29mZmVlJylcblxuICAgICMgTmFtZXNwYWNlIGZvciBtb2R1bGUgZGVmaW5pdGlvblxuICAgIFBlc3RsZS5tb2R1bGVzID0ge31cblxuICAgIGNsYXNzIFBlc3RsZS5Db3JlXG4gICAgICAgICMgY3VycmVudCB2ZXJzaW9uIG9mIHRoZSBsaWJyYXJ5XG4gICAgICAgIHZlcnNpb246IFwiMC4wLjFcIlxuXG4gICAgICAgIGNmZzpcbiAgICAgICAgICAgIGRlYnVnOlxuICAgICAgICAgICAgICAgIGxvZ0xldmVsOiA1ICMgYnkgZGVmYXVsdCB0aGUgbG9nZ2luZyB3aWxsIGJlIGRpc2FibGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIyB2YWx1ZXMgY2FuIGdvIGZyb20gMCB0byA1ICg1IG1lYW5zIGRpc2FibGVkKVxuICAgICAgICAgICAgbmFtZXNwYWNlOiAncGxhdGZvcm0nXG5cbiAgICAgICAgICAgIGV4dGVuc2lvbjoge30gIyBkZWZpbmUgdGhlIG5hbWVzcGFjZSB0byBkZWZpbmUgZXh0ZW5zaW9uIHNwZWNpZmljIHNldHRpbmdzXG5cbiAgICAgICAgICAgIGNvbXBvbmVudDoge30gIyBkZWZpbmUgdGhlIG5hbWVzcGFjZSB0byBkZWZpbmUgY29tcG9uZW50IHNwZWNpZmljIHNldHRpbmdzXG5cbiAgICAgICAgY29uc3RydWN0b3I6IChjb25maWcgPSB7fSkgLT5cbiAgICAgICAgICAgICMgaW5pdGlhbGl6ZSB0aGUgY29uZmlnIG9iamVjdFxuICAgICAgICAgICAgQHNldENvbmZpZyhjb25maWcpXG5cbiAgICAgICAgICAgICMgdGhpcyB3aWxsIHRyYWNrIHRoZSBzdGF0ZSBvZiB0aGUgQ29yZS4gV2hlbiBpdCBpc1xuICAgICAgICAgICAgIyB0cnVlLCBpdCBtZWFucyB0aGUgXCJzdGFydCgpXCIgaGFzIGJlZW4gY2FsbGVkXG4gICAgICAgICAgICBAc3RhcnRlZCA9IGZhbHNlXG5cbiAgICAgICAgICAgICMgVGhlIGV4dGVuc2lvbiBtYW5hZ2VyIHdpbGwgYmUgb24gY2hhcmdlIG9mIGxvYWRpbmcgZXh0ZW5zaW9uc1xuICAgICAgICAgICAgIyBhbmQgbWFrZSBpdHMgZnVuY3Rpb25hbGl0eSBhdmFpbGFibGUgdG8gdGhlIHN0YWNrXG4gICAgICAgICAgICBAZXh0TWFuYWdlciA9IG5ldyBFeHRNYW5hZ2VyKClcblxuICAgICAgICAgICAgIyB0aHJvdWdoIHRoaXMgb2JqZWN0IHRoZSBtb2R1bGVzIHdpbGwgYmUgYWNjZXNpbmcgdGhlIG1ldGhvZHMgZGVmaW5lZCBieSB0aGVcbiAgICAgICAgICAgICMgZXh0ZW5zaW9uc1xuICAgICAgICAgICAgQHNhbmRib3ggPSBCYXNlLnV0aWwuY2xvbmUgQmFzZVxuXG4gICAgICAgICAgICAjIG5hbWVzcGFjZSB0byBob2xkIGFsbCB0aGUgc2FuZGJveGVzXG4gICAgICAgICAgICBAc2FuZGJveGVzID0ge31cblxuICAgICAgICAgICAgIyBSZXF1aXJlIGNvcmUgZXh0ZW5zaW9uc1xuICAgICAgICAgICAgQ29tcG9uZW50cyA9IHJlcXVpcmUoJy4vZXh0ZW5zaW9uL2NvbXBvbmVudHMuY29mZmVlJylcbiAgICAgICAgICAgIFJlc3BvbnNpdmVEZXNpZ24gPSByZXF1aXJlKCcuL2V4dGVuc2lvbi9yZXNwb25zaXZlZGVzaWduLmNvZmZlZScpXG4gICAgICAgICAgICBSZXNwb25zaXZlSW1hZ2VzID0gcmVxdWlyZSgnLi9leHRlbnNpb24vcmVzcG9uc2l2ZWltYWdlcy5jb2ZmZWUnKVxuXG4gICAgICAgICAgICAjIEFkZCBjb3JlIGV4dGVuc2lvbnMgdG8gdGhlIGFwcFxuICAgICAgICAgICAgQGV4dE1hbmFnZXIuYWRkKENvbXBvbmVudHMpXG4gICAgICAgICAgICBAZXh0TWFuYWdlci5hZGQoUmVzcG9uc2l2ZURlc2lnbilcbiAgICAgICAgICAgIEBleHRNYW5hZ2VyLmFkZChSZXNwb25zaXZlSW1hZ2VzKVxuXG4gICAgICAgIGFkZEV4dGVuc2lvbjogKGV4dCkgLT5cbiAgICAgICAgICAgICMgd2UnbGwgb25seSBhbGxvdyB0byBhZGQgbmV3IGV4dGVuc2lvbnMgYmVmb3JlXG4gICAgICAgICAgICAjIHRoZSBDb3JlIGdldCBzdGFydGVkXG4gICAgICAgICAgICB1bmxlc3MgQHN0YXJ0ZWRcbiAgICAgICAgICAgICAgICBAZXh0TWFuYWdlci5hZGQoZXh0KVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIEJhc2UubG9nLmVycm9yKFwiVGhlIENvcmUgaGFzIGFscmVhZHkgYmVlbiBzdGFydGVkLiBZb3UgY2FuIG5vdCBhZGQgbmV3IGV4dGVuc2lvbnMgYXQgdGhpcyBwb2ludC5cIilcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBjYW4gbm90IGFkZCBleHRlbnNpb25zIHdoZW4gdGhlIENvcmUgaGFzIGFscmVhZHkgYmVlbiBzdGFydGVkLicpXG5cbiAgICAgICAgIyBwcm92aWRlcyBhIHdheSBmb3Igc2V0dGluZyB1cCBjb25maWdzXG4gICAgICAgICMgYWZ0ZXIgUGVzdGxlIGhhcyBiZWVuIGluc3RhbnRpYXRlZFxuICAgICAgICBzZXRDb25maWc6IChjb25maWcpIC0+XG4gICAgICAgICAgICB1bmxlc3MgQHN0YXJ0ZWRcbiAgICAgICAgICAgICAgICBpZiBCYXNlLnV0aWwuaXNPYmplY3QgY29uZmlnXG4gICAgICAgICAgICAgICAgICAgICMgaWYgd2UgZW50ZXIgaGVyZSBpdCBtZWFucyBQZXN0bGUgaGFzIGJlZW4gYWxyZWFkeSBpbml0aWFsaXplZFxuICAgICAgICAgICAgICAgICAgICAjIGR1cmluZyBpbnN0YW50aWF0aW9uLCBzbyB3ZSdsbCB1c2UgdGhlIGNvbmZpZyBvYmplY3QgYXMgYVxuICAgICAgICAgICAgICAgICAgICAjIHByb3ZpZGVyIGZvciBkZWZhdWx0IHZhbHVlXG4gICAgICAgICAgICAgICAgICAgIHVubGVzcyBCYXNlLnV0aWwuaXNFbXB0eSBAY29uZmlnXG4gICAgICAgICAgICAgICAgICAgICAgICBAY29uZmlnID0gQmFzZS51dGlsLmRlZmF1bHRzIGNvbmZpZywgQGNvbmZpZ1xuICAgICAgICAgICAgICAgICAgICAjIGlmIGl0IGlzIGVtcHR5LCBpdCBtZWFucyB3ZSBhcmUgZ29pbmcgc2V0dGluZyB1cCBQZXN0bGUgZm9yXG4gICAgICAgICAgICAgICAgICAgICMgdGhlIGZpcnN0IHRpbWVcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgQGNvbmZpZyA9IEJhc2UudXRpbC5kZWZhdWx0cyBjb25maWcsIEBjZmdcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIG1zZyA9IFwiW3NldENvbmZpZyBtZXRob2RdIG9ubHkgYWNjZXB0IGFuIG9iamVjdCBhcyBhIHBhcmFtZXRlciBhbmQgeW91J3JlIHBhc3Npbmc6IFwiICsgdHlwZW9mIGNvbmZpZ1xuICAgICAgICAgICAgICAgICAgICBCYXNlLmxvZy5lcnJvcihtc2cpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgQmFzZS5sb2cuZXJyb3IoXCJQZXN0bGUgaGFzIGFscmVhZHkgYmVlbiBzdGFydGVkLiBZb3UgY2FuIG5vdCBzZXQgdXAgY29uZmlncyBhdCB0aGlzIHBvaW50LlwiKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IGNhbiBub3Qgc2V0IHVwIGNvbmZpZ3Mgd2hlbiBQZXN0bGUgaGFzIGFscmVhZHkgc3RhcnRlZC4nKVxuXG4gICAgICAgIHNldENvbXBvbmVudENvbmZpZzogKGNvbXAsIGNvbmZpZykgLT5cbiAgICAgICAgICAgIHVubGVzcyBAc3RhcnRlZFxuXG4gICAgICAgICAgICAgICAgdW5sZXNzIGNvbXAgYW5kIEJhc2UudXRpbC5pc1N0cmluZyBjb21wXG4gICAgICAgICAgICAgICAgICAgIG1zZyA9IFwiW3NldENvbXBvbmVudENvbmZpZyBtZXRob2RdIDFzdCBwYXJhbSBzaG91bGQgYmUgYSBzdHJpbmcsIHlvdSdyZSBwYXNzaW5nOlwiICsgdHlwZW9mIGNvbmZpZ1xuICAgICAgICAgICAgICAgICAgICBCYXNlLmxvZy5lcnJvcihtc2cpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpXG5cbiAgICAgICAgICAgICAgICBpZiBCYXNlLnV0aWwuaXNPYmplY3QgY29uZmlnXG4gICAgICAgICAgICAgICAgICAgICMgaWYgd2UgZW50ZXIgaGVyZSBpdCBtZWFucyBQZXN0bGUgaGFzIGJlZW4gYWxyZWFkeSBpbml0aWFsaXplZFxuICAgICAgICAgICAgICAgICAgICAjIGR1cmluZyBpbnN0YW50aWF0aW9uLCBzbyB3ZSdsbCB1c2UgdGhlIGNvbmZpZyBvYmplY3QgYXMgYVxuICAgICAgICAgICAgICAgICAgICAjIHByb3ZpZGVyIGZvciBkZWZhdWx0IHZhbHVlXG4gICAgICAgICAgICAgICAgICAgIHVubGVzcyBCYXNlLnV0aWwuaXNFbXB0eSBAY29uZmlnXG4gICAgICAgICAgICAgICAgICAgICAgICBAY29uZmlnLmNvbXBvbmVudFtjb21wXSA9IEJhc2UudXRpbC5kZWZhdWx0cyBjb25maWcsIEBjb25maWcuY29tcG9uZW50W2NvbXBdXG5cbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgQGNvbmZpZyA9IEBjb25maWcgb3Ige31cbiAgICAgICAgICAgICAgICAgICAgICAgIEBjb25maWcuY29tcG9uZW50W2NvbXBdID0gQmFzZS51dGlsLmRlZmF1bHRzIGNvbmZpZywgQGNmZy5jb21wb25lbnRbY29tcF1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIG1zZyA9IFwiW3NldENvbXBvbmVudENvbmZpZyBtZXRob2RdIDJuZCBwYXJhbSBzaG91bGQgYmUgYW4gb2JqZWN0ICYgeW91J3JlIHBhc3Npbmc6XCIgKyB0eXBlb2YgY29uZmlnXG4gICAgICAgICAgICAgICAgICAgIEJhc2UubG9nLmVycm9yKG1zZylcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZylcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBCYXNlLmxvZy5lcnJvcihcIlBlc3RsZSBoYXMgYWxyZWFkeSBiZWVuIHN0YXJ0ZWQuIFlvdSBjYW4gbm90IGFkZCBuZXcgZXh0ZW5zaW9ucyBhdCB0aGlzIHBvaW50LlwiKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IGNhbiBub3QgYWRkIGV4dGVuc2lvbnMgd2hlbiBQZXN0bGUgaGFzIGFscmVhZHkgc3RhcnRlZC4nKVxuXG4gICAgICAgIHN0YXJ0OiAoc2VsZWN0b3IgPSAnJykgLT5cblxuICAgICAgICAgICAgIyBTZXQgdGhlIGxvZ2dpbmcgY29uZmlndXJhdGlvbiBmb3IgdGhlIGFwcFxuICAgICAgICAgICAgQmFzZS5sb2cuc2V0Q29uZmlnKEBjb25maWcuZGVidWcpXG5cbiAgICAgICAgICAgICMgdGhpcyB3aWxsIGxldCB1cyBpbml0aWFsaXplIGNvbXBvbmVudHMgYXQgYSBsYXRlciBzdGFnZVxuICAgICAgICAgICAgaWYgQHN0YXJ0ZWQgYW5kIHNlbGVjdG9yIGlzbnQgJydcblxuICAgICAgICAgICAgICAgIEJhc2UubG9nLmluZm8oXCJQZXN0bGUgaXMgaW5pdGlhbGl6aW5nIGEgY29tcG9uZW50XCIpXG5cbiAgICAgICAgICAgICAgICBAc2FuZGJveC5zdGFydENvbXBvbmVudHMgc2VsZWN0b3IsIEBcblxuXG4gICAgICAgICAgICAjIGlmIHdlIGVudGVyIGhlcmUsIGl0IG1lYW5zIGl0IGlzIHRoZSBmaXN0IHRpbWUgdGhlIHN0YXJ0XG4gICAgICAgICAgICAjIG1ldGhvZCBpcyBjYWxsZWQgYW5kIHdlJ2xsIGhhdmUgdG8gaW5pdGlhbGl6ZSBhbGwgdGhlIGV4dGVuc2lvbnNcbiAgICAgICAgICAgIGVsc2VcblxuICAgICAgICAgICAgICAgIEJhc2UubG9nLmluZm8oXCJQZXN0bGUgc3RhcnRlZCB0aGUgaW5pdGlhbGl6aW5nIHByb2Nlc3NcIilcblxuICAgICAgICAgICAgICAgIEBzdGFydGVkID0gdHJ1ZVxuXG4gICAgICAgICAgICAgICAgIyBJbml0IGFsbCB0aGUgZXh0ZW5zaW9uc1xuICAgICAgICAgICAgICAgIEBleHRNYW5hZ2VyLmluaXQoQClcblxuICAgICAgICAgICAgICAgICMgQ2FsbGJhY2sgb2JqZWN0IHRoYXQgaXMgZ29ubmEgaG9sZCBmdW5jdGlvbnMgdG8gYmUgZXhlY3V0ZWRcbiAgICAgICAgICAgICAgICAjIGFmdGVyIGFsbCBleHRlbnNpb25zIGhhcyBiZWVuIGluaXRpYWxpemVkIGFuZCB0aGUgZWFjaCBhZnRlckFwcFN0YXJ0ZWRcbiAgICAgICAgICAgICAgICAjIG1ldGhvZCBleGVjdXRlZFxuICAgICAgICAgICAgICAgIGNiID0gJC5DYWxsYmFja3MgXCJ1bmlxdWUgbWVtb3J5XCJcblxuICAgICAgICAgICAgICAgICMgT25jZSB0aGUgZXh0ZW5zaW9ucyBoYXZlIGJlZW4gaW5pdGlhbGl6ZWQsIGxldHMgY2FsbCB0aGUgYWZ0ZXJBcHBTdGFydGVkXG4gICAgICAgICAgICAgICAgIyBmcm9tIGVhY2ggZXh0ZW5zaW9uXG4gICAgICAgICAgICAgICAgIyBOb3RlOiBUaGlzIG1ldGhvZCB3aWxsIGxldCBlYWNoIGV4dGVuc2lvbiB0byBhdXRvbWF0aWNhbGx5IGV4ZWN1dGUgc29tZSBjb2RlXG4gICAgICAgICAgICAgICAgIyAgICAgICBvbmNlIHRoZSBhcHAgaGFzIHN0YXJ0ZWQuXG4gICAgICAgICAgICAgICAgQmFzZS51dGlsLmVhY2ggQGV4dE1hbmFnZXIuZ2V0SW5pdGlhbGl6ZWRFeHRlbnNpb25zKCksIChleHQsIGkpID0+XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgZXh0XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIEJhc2UudXRpbC5pc0Z1bmN0aW9uKGV4dC5hZnRlckFwcFN0YXJ0ZWQpIGFuZCBleHQuYWN0aXZhdGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBzaW5jZSB0aGUgY29tcG9uZW50IGV4dGVuc2lvbiBpcyB0aGUgZW50cnkgcG9pbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGZvciBpbml0aWFsaXppbmcgdGhlIGFwcCwgd2UnbGwgZ2l2ZSBpdCBzcGVjaWFsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIyB0cmVhdG1lbnQgYW5kIGdpdmUgaXQgdGhlIGFiaWxpdHkgdG8gcmVjZWl2ZSBhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICMgZXh0cmEgcGFyYW1ldGVyICh0byBzdGFydCBjb21wb25lbnRzIHRoYXQgb25seSBiZWxvbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAjIHRvIGEgcGFydGljdWxhciBET00gZWxlbWVudClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiBleHQub3B0aW9uS2V5IGlzIFwiY29tcG9uZW50c1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4dC5hZnRlckFwcFN0YXJ0ZWQgc2VsZWN0b3IsIEBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4dC5hZnRlckFwcFN0YXJ0ZWQoQClcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgQmFzZS51dGlsLmlzRnVuY3Rpb24oZXh0LmFmdGVyQXBwSW5pdGlhbGl6ZWQpIGFuZCBleHQuYWN0aXZhdGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2IuYWRkIGV4dC5hZnRlckFwcEluaXRpYWxpemVkXG5cbiAgICAgICAgICAgICAgICAjIENhbGwgdGhlIC5hZnRlckFwcEluaXRpYWxpemVkIGNhbGxiYWNrcyB3aXRoIEAgYXMgcGFyYW1ldGVyXG4gICAgICAgICAgICAgICAgY2IuZmlyZSBAXG5cbiAgICAgICAgY3JlYXRlU2FuZGJveDogKG5hbWUsIG9wdHMpIC0+XG4gICAgICAgICAgICBAc2FuZGJveGVzW25hbWVdID0gQmFzZS51dGlsLmV4dGVuZCB7fSwgQHNhbmRib3gsIG5hbWUgOiBuYW1lXG5cbiAgICAgICAgZ2V0SW5pdGlhbGl6ZWRDb21wb25lbnRzOiAoKSAtPlxuICAgICAgICAgICAgQHNhbmRib3guZ2V0SW5pdGlhbGl6ZWRDb21wb25lbnRzKClcblxuXG4gICAgcmV0dXJuIFBlc3RsZVxuKVxuIiwiLypcclxuICogQ29va2llcy5qcyAtIDEuMi4xXHJcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9TY290dEhhbXBlci9Db29raWVzXHJcbiAqXHJcbiAqIFRoaXMgaXMgZnJlZSBhbmQgdW5lbmN1bWJlcmVkIHNvZnR3YXJlIHJlbGVhc2VkIGludG8gdGhlIHB1YmxpYyBkb21haW4uXHJcbiAqL1xyXG4oZnVuY3Rpb24gKGdsb2JhbCwgdW5kZWZpbmVkKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgdmFyIGZhY3RvcnkgPSBmdW5jdGlvbiAod2luZG93KSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cuZG9jdW1lbnQgIT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ29va2llcy5qcyByZXF1aXJlcyBhIGB3aW5kb3dgIHdpdGggYSBgZG9jdW1lbnRgIG9iamVjdCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIENvb2tpZXMgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSwgb3B0aW9ucykge1xyXG4gICAgICAgICAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA9PT0gMSA/XHJcbiAgICAgICAgICAgICAgICBDb29raWVzLmdldChrZXkpIDogQ29va2llcy5zZXQoa2V5LCB2YWx1ZSwgb3B0aW9ucyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gQWxsb3dzIGZvciBzZXR0ZXIgaW5qZWN0aW9uIGluIHVuaXQgdGVzdHNcclxuICAgICAgICBDb29raWVzLl9kb2N1bWVudCA9IHdpbmRvdy5kb2N1bWVudDtcclxuXHJcbiAgICAgICAgLy8gVXNlZCB0byBlbnN1cmUgY29va2llIGtleXMgZG8gbm90IGNvbGxpZGUgd2l0aFxyXG4gICAgICAgIC8vIGJ1aWx0LWluIGBPYmplY3RgIHByb3BlcnRpZXNcclxuICAgICAgICBDb29raWVzLl9jYWNoZUtleVByZWZpeCA9ICdjb29rZXkuJzsgLy8gSHVyciBodXJyLCA6KVxyXG4gICAgICAgIFxyXG4gICAgICAgIENvb2tpZXMuX21heEV4cGlyZURhdGUgPSBuZXcgRGF0ZSgnRnJpLCAzMSBEZWMgOTk5OSAyMzo1OTo1OSBVVEMnKTtcclxuXHJcbiAgICAgICAgQ29va2llcy5kZWZhdWx0cyA9IHtcclxuICAgICAgICAgICAgcGF0aDogJy8nLFxyXG4gICAgICAgICAgICBzZWN1cmU6IGZhbHNlXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgQ29va2llcy5nZXQgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgIGlmIChDb29raWVzLl9jYWNoZWREb2N1bWVudENvb2tpZSAhPT0gQ29va2llcy5fZG9jdW1lbnQuY29va2llKSB7XHJcbiAgICAgICAgICAgICAgICBDb29raWVzLl9yZW5ld0NhY2hlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBDb29raWVzLl9jYWNoZVtDb29raWVzLl9jYWNoZUtleVByZWZpeCArIGtleV07XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgQ29va2llcy5zZXQgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSwgb3B0aW9ucykge1xyXG4gICAgICAgICAgICBvcHRpb25zID0gQ29va2llcy5fZ2V0RXh0ZW5kZWRPcHRpb25zKG9wdGlvbnMpO1xyXG4gICAgICAgICAgICBvcHRpb25zLmV4cGlyZXMgPSBDb29raWVzLl9nZXRFeHBpcmVzRGF0ZSh2YWx1ZSA9PT0gdW5kZWZpbmVkID8gLTEgOiBvcHRpb25zLmV4cGlyZXMpO1xyXG5cclxuICAgICAgICAgICAgQ29va2llcy5fZG9jdW1lbnQuY29va2llID0gQ29va2llcy5fZ2VuZXJhdGVDb29raWVTdHJpbmcoa2V5LCB2YWx1ZSwgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gQ29va2llcztcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBDb29raWVzLmV4cGlyZSA9IGZ1bmN0aW9uIChrZXksIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIENvb2tpZXMuc2V0KGtleSwgdW5kZWZpbmVkLCBvcHRpb25zKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBDb29raWVzLl9nZXRFeHRlbmRlZE9wdGlvbnMgPSBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgcGF0aDogb3B0aW9ucyAmJiBvcHRpb25zLnBhdGggfHwgQ29va2llcy5kZWZhdWx0cy5wYXRoLFxyXG4gICAgICAgICAgICAgICAgZG9tYWluOiBvcHRpb25zICYmIG9wdGlvbnMuZG9tYWluIHx8IENvb2tpZXMuZGVmYXVsdHMuZG9tYWluLFxyXG4gICAgICAgICAgICAgICAgZXhwaXJlczogb3B0aW9ucyAmJiBvcHRpb25zLmV4cGlyZXMgfHwgQ29va2llcy5kZWZhdWx0cy5leHBpcmVzLFxyXG4gICAgICAgICAgICAgICAgc2VjdXJlOiBvcHRpb25zICYmIG9wdGlvbnMuc2VjdXJlICE9PSB1bmRlZmluZWQgPyAgb3B0aW9ucy5zZWN1cmUgOiBDb29raWVzLmRlZmF1bHRzLnNlY3VyZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIENvb2tpZXMuX2lzVmFsaWREYXRlID0gZnVuY3Rpb24gKGRhdGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChkYXRlKSA9PT0gJ1tvYmplY3QgRGF0ZV0nICYmICFpc05hTihkYXRlLmdldFRpbWUoKSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgQ29va2llcy5fZ2V0RXhwaXJlc0RhdGUgPSBmdW5jdGlvbiAoZXhwaXJlcywgbm93KSB7XHJcbiAgICAgICAgICAgIG5vdyA9IG5vdyB8fCBuZXcgRGF0ZSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBleHBpcmVzID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICAgICAgZXhwaXJlcyA9IGV4cGlyZXMgPT09IEluZmluaXR5ID9cclxuICAgICAgICAgICAgICAgICAgICBDb29raWVzLl9tYXhFeHBpcmVEYXRlIDogbmV3IERhdGUobm93LmdldFRpbWUoKSArIGV4cGlyZXMgKiAxMDAwKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZXhwaXJlcyA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgIGV4cGlyZXMgPSBuZXcgRGF0ZShleHBpcmVzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGV4cGlyZXMgJiYgIUNvb2tpZXMuX2lzVmFsaWREYXRlKGV4cGlyZXMpKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2BleHBpcmVzYCBwYXJhbWV0ZXIgY2Fubm90IGJlIGNvbnZlcnRlZCB0byBhIHZhbGlkIERhdGUgaW5zdGFuY2UnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGV4cGlyZXM7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgQ29va2llcy5fZ2VuZXJhdGVDb29raWVTdHJpbmcgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSwgb3B0aW9ucykge1xyXG4gICAgICAgICAgICBrZXkgPSBrZXkucmVwbGFjZSgvW14jJCYrXFxeYHxdL2csIGVuY29kZVVSSUNvbXBvbmVudCk7XHJcbiAgICAgICAgICAgIGtleSA9IGtleS5yZXBsYWNlKC9cXCgvZywgJyUyOCcpLnJlcGxhY2UoL1xcKS9nLCAnJTI5Jyk7XHJcbiAgICAgICAgICAgIHZhbHVlID0gKHZhbHVlICsgJycpLnJlcGxhY2UoL1teISMkJi0rXFwtLTo8LVxcW1xcXS1+XS9nLCBlbmNvZGVVUklDb21wb25lbnQpO1xyXG4gICAgICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjb29raWVTdHJpbmcgPSBrZXkgKyAnPScgKyB2YWx1ZTtcclxuICAgICAgICAgICAgY29va2llU3RyaW5nICs9IG9wdGlvbnMucGF0aCA/ICc7cGF0aD0nICsgb3B0aW9ucy5wYXRoIDogJyc7XHJcbiAgICAgICAgICAgIGNvb2tpZVN0cmluZyArPSBvcHRpb25zLmRvbWFpbiA/ICc7ZG9tYWluPScgKyBvcHRpb25zLmRvbWFpbiA6ICcnO1xyXG4gICAgICAgICAgICBjb29raWVTdHJpbmcgKz0gb3B0aW9ucy5leHBpcmVzID8gJztleHBpcmVzPScgKyBvcHRpb25zLmV4cGlyZXMudG9VVENTdHJpbmcoKSA6ICcnO1xyXG4gICAgICAgICAgICBjb29raWVTdHJpbmcgKz0gb3B0aW9ucy5zZWN1cmUgPyAnO3NlY3VyZScgOiAnJztcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjb29raWVTdHJpbmc7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgQ29va2llcy5fZ2V0Q2FjaGVGcm9tU3RyaW5nID0gZnVuY3Rpb24gKGRvY3VtZW50Q29va2llKSB7XHJcbiAgICAgICAgICAgIHZhciBjb29raWVDYWNoZSA9IHt9O1xyXG4gICAgICAgICAgICB2YXIgY29va2llc0FycmF5ID0gZG9jdW1lbnRDb29raWUgPyBkb2N1bWVudENvb2tpZS5zcGxpdCgnOyAnKSA6IFtdO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb29raWVzQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBjb29raWVLdnAgPSBDb29raWVzLl9nZXRLZXlWYWx1ZVBhaXJGcm9tQ29va2llU3RyaW5nKGNvb2tpZXNBcnJheVtpXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNvb2tpZUNhY2hlW0Nvb2tpZXMuX2NhY2hlS2V5UHJlZml4ICsgY29va2llS3ZwLmtleV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvb2tpZUNhY2hlW0Nvb2tpZXMuX2NhY2hlS2V5UHJlZml4ICsgY29va2llS3ZwLmtleV0gPSBjb29raWVLdnAudmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjb29raWVDYWNoZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBDb29raWVzLl9nZXRLZXlWYWx1ZVBhaXJGcm9tQ29va2llU3RyaW5nID0gZnVuY3Rpb24gKGNvb2tpZVN0cmluZykge1xyXG4gICAgICAgICAgICAvLyBcIj1cIiBpcyBhIHZhbGlkIGNoYXJhY3RlciBpbiBhIGNvb2tpZSB2YWx1ZSBhY2NvcmRpbmcgdG8gUkZDNjI2NSwgc28gY2Fubm90IGBzcGxpdCgnPScpYFxyXG4gICAgICAgICAgICB2YXIgc2VwYXJhdG9ySW5kZXggPSBjb29raWVTdHJpbmcuaW5kZXhPZignPScpO1xyXG5cclxuICAgICAgICAgICAgLy8gSUUgb21pdHMgdGhlIFwiPVwiIHdoZW4gdGhlIGNvb2tpZSB2YWx1ZSBpcyBhbiBlbXB0eSBzdHJpbmdcclxuICAgICAgICAgICAgc2VwYXJhdG9ySW5kZXggPSBzZXBhcmF0b3JJbmRleCA8IDAgPyBjb29raWVTdHJpbmcubGVuZ3RoIDogc2VwYXJhdG9ySW5kZXg7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAga2V5OiBkZWNvZGVVUklDb21wb25lbnQoY29va2llU3RyaW5nLnN1YnN0cigwLCBzZXBhcmF0b3JJbmRleCkpLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IGRlY29kZVVSSUNvbXBvbmVudChjb29raWVTdHJpbmcuc3Vic3RyKHNlcGFyYXRvckluZGV4ICsgMSkpXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgQ29va2llcy5fcmVuZXdDYWNoZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgQ29va2llcy5fY2FjaGUgPSBDb29raWVzLl9nZXRDYWNoZUZyb21TdHJpbmcoQ29va2llcy5fZG9jdW1lbnQuY29va2llKTtcclxuICAgICAgICAgICAgQ29va2llcy5fY2FjaGVkRG9jdW1lbnRDb29raWUgPSBDb29raWVzLl9kb2N1bWVudC5jb29raWU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgQ29va2llcy5fYXJlRW5hYmxlZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHRlc3RLZXkgPSAnY29va2llcy5qcyc7XHJcbiAgICAgICAgICAgIHZhciBhcmVFbmFibGVkID0gQ29va2llcy5zZXQodGVzdEtleSwgMSkuZ2V0KHRlc3RLZXkpID09PSAnMSc7XHJcbiAgICAgICAgICAgIENvb2tpZXMuZXhwaXJlKHRlc3RLZXkpO1xyXG4gICAgICAgICAgICByZXR1cm4gYXJlRW5hYmxlZDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBDb29raWVzLmVuYWJsZWQgPSBDb29raWVzLl9hcmVFbmFibGVkKCk7XHJcblxyXG4gICAgICAgIHJldHVybiBDb29raWVzO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgY29va2llc0V4cG9ydCA9IHR5cGVvZiBnbG9iYWwuZG9jdW1lbnQgPT09ICdvYmplY3QnID8gZmFjdG9yeShnbG9iYWwpIDogZmFjdG9yeTtcclxuXHJcbiAgICAvLyBBTUQgc3VwcG9ydFxyXG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xyXG4gICAgICAgIGRlZmluZShmdW5jdGlvbiAoKSB7IHJldHVybiBjb29raWVzRXhwb3J0OyB9KTtcclxuICAgIC8vIENvbW1vbkpTL05vZGUuanMgc3VwcG9ydFxyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAvLyBTdXBwb3J0IE5vZGUuanMgc3BlY2lmaWMgYG1vZHVsZS5leHBvcnRzYCAod2hpY2ggY2FuIGJlIGEgZnVuY3Rpb24pXHJcbiAgICAgICAgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gY29va2llc0V4cG9ydDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQnV0IGFsd2F5cyBzdXBwb3J0IENvbW1vbkpTIG1vZHVsZSAxLjEuMSBzcGVjIChgZXhwb3J0c2AgY2Fubm90IGJlIGEgZnVuY3Rpb24pXHJcbiAgICAgICAgZXhwb3J0cy5Db29raWVzID0gY29va2llc0V4cG9ydDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZ2xvYmFsLkNvb2tpZXMgPSBjb29raWVzRXhwb3J0O1xyXG4gICAgfVxyXG59KSh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyA/IHRoaXMgOiB3aW5kb3cpOyIsIjtcbihmdW5jdGlvbih3aW5kb3csIGRvY3VtZW50KSB7XG5cbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgZGVmYXVsdFdpZHRocywgZ2V0S2V5cywgbmV4dFRpY2ssIGFkZEV2ZW50LCBnZXROYXR1cmFsV2lkdGg7XG5cbiAgICBuZXh0VGljayA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgIGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gYXBwbHlFYWNoKGNvbGxlY3Rpb24sIGNhbGxiYWNrRWFjaCkge1xuICAgICAgICB2YXIgaSA9IDAsXG4gICAgICAgICAgICBsZW5ndGggPSBjb2xsZWN0aW9uLmxlbmd0aCxcbiAgICAgICAgICAgIG5ld19jb2xsZWN0aW9uID0gW107XG5cbiAgICAgICAgZm9yICg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbmV3X2NvbGxlY3Rpb25baV0gPSBjYWxsYmFja0VhY2goY29sbGVjdGlvbltpXSwgaSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3X2NvbGxlY3Rpb247XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmV0dXJuRGlyZWN0VmFsdWUodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIGdldE5hdHVyYWxXaWR0aCA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKSwgJ25hdHVyYWxXaWR0aCcpKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oaW1hZ2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaW1hZ2UubmF0dXJhbFdpZHRoO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJRTggYW5kIGJlbG93IGxhY2tzIHRoZSBuYXR1cmFsV2lkdGggcHJvcGVydHlcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNvdXJjZSkge1xuICAgICAgICAgICAgdmFyIGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICAgICAgaW1nLnNyYyA9IHNvdXJjZS5zcmM7XG4gICAgICAgICAgICByZXR1cm4gaW1nLndpZHRoO1xuICAgICAgICB9O1xuICAgIH0pKCk7XG5cbiAgICBhZGRFdmVudCA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiBhZGRTdGFuZGFyZEV2ZW50TGlzdGVuZXIoZWwsIGV2ZW50TmFtZSwgZm4pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGZuLCBmYWxzZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGFkZElFRXZlbnRMaXN0ZW5lcihlbCwgZXZlbnROYW1lLCBmbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbC5hdHRhY2hFdmVudCgnb24nICsgZXZlbnROYW1lLCBmbik7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfSkoKTtcblxuICAgIGRlZmF1bHRXaWR0aHMgPSBbOTYsIDEzMCwgMTY1LCAyMDAsIDIzNSwgMjcwLCAzMDQsIDM0MCwgMzc1LCA0MTAsIDQ0NSwgNDg1LCA1MjAsIDU1NSwgNTkwLCA2MjUsIDY2MCwgNjk1LCA3MzZdO1xuXG4gICAgZ2V0S2V5cyA9IHR5cGVvZiBPYmplY3Qua2V5cyA9PT0gJ2Z1bmN0aW9uJyA/IE9iamVjdC5rZXlzIDogZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgICAgIHZhciBrZXlzID0gW10sXG4gICAgICAgICAgICBrZXk7XG5cbiAgICAgICAgZm9yIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBrZXlzO1xuICAgIH07XG5cblxuICAgIC8qXG4gICAgICAgIENvbnN0cnVjdCBhIG5ldyBJbWFnZXIgaW5zdGFuY2UsIHBhc3NpbmcgYW4gb3B0aW9uYWwgY29uZmlndXJhdGlvbiBvYmplY3QuXG5cbiAgICAgICAgRXhhbXBsZSB1c2FnZTpcblxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIEF2YWlsYWJsZSB3aWR0aHMgZm9yIHlvdXIgaW1hZ2VzXG4gICAgICAgICAgICAgICAgYXZhaWxhYmxlV2lkdGhzOiBbTnVtYmVyXSxcblxuICAgICAgICAgICAgICAgIC8vIFNlbGVjdG9yIHRvIGJlIHVzZWQgdG8gbG9jYXRlIHlvdXIgZGl2IHBsYWNlaG9sZGVyc1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnJyxcblxuICAgICAgICAgICAgICAgIC8vIENsYXNzIG5hbWUgdG8gZ2l2ZSB5b3VyIHJlc2l6YWJsZSBpbWFnZXNcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICcnLFxuXG4gICAgICAgICAgICAgICAgLy8gSWYgc2V0IHRvIHRydWUsIEltYWdlciB3aWxsIHVwZGF0ZSB0aGUgc3JjIGF0dHJpYnV0ZSBvZiB0aGUgcmVsZXZhbnQgaW1hZ2VzXG4gICAgICAgICAgICAgICAgb25SZXNpemU6IEJvb2xlYW4sXG5cbiAgICAgICAgICAgICAgICAvLyBUb2dnbGUgdGhlIGxhenkgbG9hZCBmdW5jdGlvbmFsaXR5IG9uIG9yIG9mZlxuICAgICAgICAgICAgICAgIGxhenlsb2FkOiBCb29sZWFuLFxuXG4gICAgICAgICAgICAgICAgLy8gVXNlZCBhbG9uZ3NpZGUgdGhlIGxhenlsb2FkIGZlYXR1cmUgKGhlbHBzIHBlcmZvcm1hbmNlIGJ5IHNldHRpbmcgYSBoaWdoZXIgZGVsYXkpXG4gICAgICAgICAgICAgICAgc2Nyb2xsRGVsYXk6IE51bWJlclxuICAgICAgICAgICAgfVxuXG4gICAgICAgIEBwYXJhbSB7b2JqZWN0fSBjb25maWd1cmF0aW9uIHNldHRpbmdzXG4gICAgICAgIEByZXR1cm4ge29iamVjdH0gaW5zdGFuY2Ugb2YgSW1hZ2VyXG4gICAgICovXG4gICAgZnVuY3Rpb24gSW1hZ2VyKGVsZW1lbnRzLCBvcHRzKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgICAgIGRvYyA9IGRvY3VtZW50O1xuXG4gICAgICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xuXG4gICAgICAgIGlmIChlbGVtZW50cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBmaXJzdCBhcmd1bWVudCBpcyBzZWxlY3RvciBzdHJpbmdcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZWxlbWVudHMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgb3B0cy5zZWxlY3RvciA9IGVsZW1lbnRzO1xuICAgICAgICAgICAgICAgIGVsZW1lbnRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBmaXJzdCBhcmd1bWVudCBpcyB0aGUgYG9wdHNgIG9iamVjdCwgYGVsZW1lbnRzYCBpcyBpbXBsaWNpdGx5IHRoZSBgb3B0cy5zZWxlY3RvcmAgc3RyaW5nXG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgZWxlbWVudHMubGVuZ3RoID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIG9wdHMgPSBlbGVtZW50cztcbiAgICAgICAgICAgICAgICBlbGVtZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaW1hZ2VzT2ZmU2NyZWVuID0gW107XG4gICAgICAgIHRoaXMudmlld3BvcnRIZWlnaHQgPSBkb2MuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodDtcbiAgICAgICAgdGhpcy5zZWxlY3RvciA9IG9wdHMuc2VsZWN0b3IgfHwgJy5kZWxheWVkLWltYWdlLWxvYWQnO1xuICAgICAgICB0aGlzLmNsYXNzTmFtZSA9IG9wdHMuY2xhc3NOYW1lIHx8ICdpbWFnZS1yZXBsYWNlJztcbiAgICAgICAgdGhpcy5naWYgPSBkb2MuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgIHRoaXMuZ2lmLnNyYyA9ICdkYXRhOmltYWdlL2dpZjtiYXNlNjQsUjBsR09EbGhFQUFKQUlBQUFQLy8vd0FBQUNINUJBRUFBQUFBTEFBQUFBQVFBQWtBQUFJS2hJK3B5KzBQbzV5VUZRQTcnO1xuICAgICAgICB0aGlzLmdpZi5jbGFzc05hbWUgPSB0aGlzLmNsYXNzTmFtZTtcbiAgICAgICAgdGhpcy5naWYuYWx0ID0gJyc7XG4gICAgICAgIHRoaXMuc2Nyb2xsRGVsYXkgPSBvcHRzLnNjcm9sbERlbGF5IHx8IDI1MDtcbiAgICAgICAgdGhpcy5vblJlc2l6ZSA9IG9wdHMuaGFzT3duUHJvcGVydHkoJ29uUmVzaXplJykgPyBvcHRzLm9uUmVzaXplIDogdHJ1ZTtcbiAgICAgICAgdGhpcy5sYXp5bG9hZCA9IG9wdHMuaGFzT3duUHJvcGVydHkoJ2xhenlsb2FkJykgPyBvcHRzLmxhenlsb2FkIDogZmFsc2U7XG4gICAgICAgIHRoaXMuc2Nyb2xsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5hdmFpbGFibGVQaXhlbFJhdGlvcyA9IG9wdHMuYXZhaWxhYmxlUGl4ZWxSYXRpb3MgfHwgWzEsIDJdO1xuICAgICAgICB0aGlzLmF2YWlsYWJsZVdpZHRocyA9IG9wdHMuYXZhaWxhYmxlV2lkdGhzIHx8IGRlZmF1bHRXaWR0aHM7XG4gICAgICAgIHRoaXMub25JbWFnZXNSZXBsYWNlZCA9IG9wdHMub25JbWFnZXNSZXBsYWNlZCB8fCBmdW5jdGlvbigpIHt9O1xuICAgICAgICB0aGlzLndpZHRoc01hcCA9IHt9O1xuICAgICAgICB0aGlzLnJlZnJlc2hQaXhlbFJhdGlvKCk7XG4gICAgICAgIHRoaXMud2lkdGhJbnRlcnBvbGF0b3IgPSBvcHRzLndpZHRoSW50ZXJwb2xhdG9yIHx8IHJldHVybkRpcmVjdFZhbHVlO1xuICAgICAgICB0aGlzLmRlbHRhU3F1YXJlID0gb3B0cy5kZWx0YVNxdWFyZSB8fCAxLjU7XG4gICAgICAgIHRoaXMuc3F1YXJlU2VsZWN0b3IgPSBvcHRzLnNxdWFyZVNlbGVjdG9yIHx8ICdzcXJjcm9wJztcbiAgICAgICAgdGhpcy5hZGFwdFNlbGVjdG9yID0gdGhpcy5hZGFwdFNlbGVjdG9yIHx8ICdhZGFwdCc7XG4gICAgICAgIHRoaXMuYWxsb3dlZEV4dGVuc2lvbnMgPSBbXCJqcGdcIixcImJtcFwiLFwicG5nXCIsXCJqcGVnXCJdO1xuXG4gICAgICAgIC8vIE5lZWRlZCBhcyBJRTggYWRkcyBhIGRlZmF1bHQgYHdpZHRoYC9gaGVpZ2h0YCBhdHRyaWJ1dGXigKZcbiAgICAgICAgdGhpcy5naWYucmVtb3ZlQXR0cmlidXRlKCdoZWlnaHQnKTtcbiAgICAgICAgdGhpcy5naWYucmVtb3ZlQXR0cmlidXRlKCd3aWR0aCcpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5hdmFpbGFibGVXaWR0aHMgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5hdmFpbGFibGVXaWR0aHMubGVuZ3RoID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIHRoaXMud2lkdGhzTWFwID0gSW1hZ2VyLmNyZWF0ZVdpZHRoc01hcCh0aGlzLmF2YWlsYWJsZVdpZHRocywgdGhpcy53aWR0aEludGVycG9sYXRvcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMud2lkdGhzTWFwID0gdGhpcy5hdmFpbGFibGVXaWR0aHM7XG4gICAgICAgICAgICAgICAgdGhpcy5hdmFpbGFibGVXaWR0aHMgPSBnZXRLZXlzKHRoaXMuYXZhaWxhYmxlV2lkdGhzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5hdmFpbGFibGVXaWR0aHMgPSB0aGlzLmF2YWlsYWJsZVdpZHRocy5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYSAtIGI7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG5cblxuICAgICAgICBpZiAoZWxlbWVudHMpIHtcbiAgICAgICAgICAgIHRoaXMuZGl2cyA9IGFwcGx5RWFjaChlbGVtZW50cywgcmV0dXJuRGlyZWN0VmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RvciA9IG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRpdnMgPSBhcHBseUVhY2goZG9jLnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5zZWxlY3RvciksIHJldHVybkRpcmVjdFZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2hhbmdlRGl2c1RvRW1wdHlJbWFnZXMoKTtcblxuICAgICAgICBuZXh0VGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNlbGYuaW5pdCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBJbWFnZXIucHJvdG90eXBlLnNjcm9sbENoZWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnNjcm9sbGVkKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaW1hZ2VzT2ZmU2NyZWVuLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmRpdnMgPSB0aGlzLmltYWdlc09mZlNjcmVlbi5zbGljZSgwKTsgLy8gY29weSBieSB2YWx1ZSwgZG9uJ3QgY29weSBieSByZWZlcmVuY2VcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VzT2ZmU2NyZWVuLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZURpdnNUb0VtcHR5SW1hZ2VzKCk7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgSW1hZ2VyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmNoZWNrSW1hZ2VzTmVlZFJlcGxhY2luZyh0aGlzLmRpdnMpO1xuXG4gICAgICAgIGlmICh0aGlzLm9uUmVzaXplKSB7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyUmVzaXplRXZlbnQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmxhenlsb2FkKSB7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyU2Nyb2xsRXZlbnQoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBJbWFnZXIucHJvdG90eXBlLmNyZWF0ZUdpZiA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgICAgLy8gaWYgdGhlIGVsZW1lbnQgaXMgYWxyZWFkeSBhIHJlc3BvbnNpdmUgaW1hZ2UgdGhlbiB3ZSBkb24ndCByZXBsYWNlIGl0IGFnYWluXG4gICAgICAgIGlmIChlbGVtZW50LmNsYXNzTmFtZS5tYXRjaChuZXcgUmVnRXhwKCcoXnwgKScgKyB0aGlzLmNsYXNzTmFtZSArICcoIHwkKScpKSkge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZWxlbWVudENsYXNzTmFtZSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWNsYXNzJyk7XG4gICAgICAgIHZhciBlbGVtZW50V2lkdGggPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS13aWR0aCcpO1xuICAgICAgICB2YXIgZ2lmID0gdGhpcy5naWYuY2xvbmVOb2RlKGZhbHNlKTtcblxuICAgICAgICBpZiAoZWxlbWVudFdpZHRoKSB7XG4gICAgICAgICAgICBnaWYud2lkdGggPSBlbGVtZW50V2lkdGg7XG4gICAgICAgICAgICBnaWYuc2V0QXR0cmlidXRlKCdkYXRhLXdpZHRoJywgZWxlbWVudFdpZHRoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdpZi5jbGFzc05hbWUgPSAoZWxlbWVudENsYXNzTmFtZSA/IGVsZW1lbnRDbGFzc05hbWUgKyAnICcgOiAnJykgKyB0aGlzLmNsYXNzTmFtZTtcbiAgICAgICAgZ2lmLnNldEF0dHJpYnV0ZSgnZGF0YS1zcmMnLCBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1zcmMnKSk7XG4gICAgICAgIGdpZi5zZXRBdHRyaWJ1dGUoJ2FsdCcsIGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWFsdCcpIHx8IHRoaXMuZ2lmLmFsdCk7XG4gICAgICAgIGdpZi5zZXRBdHRyaWJ1dGUoJ2l0ZW1wcm9wJywgZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaXRlbXByb3AnKSB8fCBcImNvbnRlbnRVcmxcIik7XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIGRhdGEtdGl0bGUgYXR0cmlidXRlIGlzIHRoZXJlXG4gICAgICAgIHZhciB0aXRsZVRleHQgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS10aXRsZScpO1xuICAgICAgICBpZiAodGl0bGVUZXh0KSB7XG4gICAgICAgICAgICBnaWYuc2V0QXR0cmlidXRlKCd0aXRsZScsIHRpdGxlVGV4dCk7XG4gICAgICAgIH1cblxuICAgICAgICBlbGVtZW50LnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGdpZiwgZWxlbWVudCk7XG5cbiAgICAgICAgcmV0dXJuIGdpZjtcbiAgICB9O1xuXG4gICAgSW1hZ2VyLnByb3RvdHlwZS5jaGFuZ2VEaXZzVG9FbXB0eUltYWdlcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgYXBwbHlFYWNoKHRoaXMuZGl2cywgZnVuY3Rpb24oZWxlbWVudCwgaSkge1xuICAgICAgICAgICAgaWYgKHNlbGYubGF6eWxvYWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5pc1RoaXNFbGVtZW50T25TY3JlZW4oZWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kaXZzW2ldID0gc2VsZi5jcmVhdGVHaWYoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5pbWFnZXNPZmZTY3JlZW4ucHVzaChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGYuZGl2c1tpXSA9IHNlbGYuY3JlYXRlR2lmKGVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgdGhpcy5jaGVja0ltYWdlc05lZWRSZXBsYWNpbmcodGhpcy5kaXZzKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBJbWFnZXIucHJvdG90eXBlLmlzVGhpc0VsZW1lbnRPblNjcmVlbiA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgICAgLy8gZG9jdW1lbnQuYm9keS5zY3JvbGxUb3Agd2FzIHdvcmtpbmcgaW4gQ2hyb21lIGJ1dCBkaWRuJ3Qgd29yayBvbiBGaXJlZm94LCBzbyBoYWQgdG8gcmVzb3J0IHRvIHdpbmRvdy5wYWdlWU9mZnNldFxuICAgICAgICAvLyBidXQgY2FuJ3QgZmFsbGJhY2sgdG8gZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgYXMgdGhhdCBkb2Vzbid0IHdvcmsgaW4gSUUgd2l0aCBhIGRvY3R5cGUgKD8pIHNvIGhhdmUgdG8gdXNlIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3BcbiAgICAgICAgdmFyIG9mZnNldCA9IEltYWdlci5nZXRQYWdlT2Zmc2V0KCk7XG4gICAgICAgIHZhciBlbGVtZW50T2Zmc2V0VG9wID0gMDtcblxuICAgICAgICBpZiAoZWxlbWVudC5vZmZzZXRQYXJlbnQpIHtcbiAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50T2Zmc2V0VG9wICs9IGVsZW1lbnQub2Zmc2V0VG9wO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2hpbGUgKGVsZW1lbnQgPSBlbGVtZW50Lm9mZnNldFBhcmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKGVsZW1lbnRPZmZzZXRUb3AgPCAodGhpcy52aWV3cG9ydEhlaWdodCArIG9mZnNldCkpID8gdHJ1ZSA6IGZhbHNlO1xuICAgIH07XG5cbiAgICBJbWFnZXIucHJvdG90eXBlLmNoZWNrSW1hZ2VzTmVlZFJlcGxhY2luZyA9IGZ1bmN0aW9uKGltYWdlcykge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgaWYgKCF0aGlzLmlzUmVzaXppbmcpIHtcbiAgICAgICAgICAgIHRoaXMuaXNSZXNpemluZyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hQaXhlbFJhdGlvKCk7XG5cbiAgICAgICAgICAgIGFwcGx5RWFjaChpbWFnZXMsIGZ1bmN0aW9uKGltYWdlKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5yZXBsYWNlSW1hZ2VzQmFzZWRPblNjcmVlbkRpbWVuc2lvbnMoaW1hZ2UpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuaXNSZXNpemluZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5vbkltYWdlc1JlcGxhY2VkKGltYWdlcyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgSW1hZ2VyLnByb3RvdHlwZS5yZXBsYWNlSW1hZ2VzQmFzZWRPblNjcmVlbkRpbWVuc2lvbnMgPSBmdW5jdGlvbihpbWFnZSkge1xuICAgICAgICB2YXIgY29tcHV0ZWRXaWR0aCwgc3JjLCBuYXR1cmFsV2lkdGg7XG5cbiAgICAgICAgbmF0dXJhbFdpZHRoID0gZ2V0TmF0dXJhbFdpZHRoKGltYWdlKTtcbiAgICAgICAgY29tcHV0ZWRXaWR0aCA9IHR5cGVvZiB0aGlzLmF2YWlsYWJsZVdpZHRocyA9PT0gJ2Z1bmN0aW9uJyA/IHRoaXMuYXZhaWxhYmxlV2lkdGhzKGltYWdlKSA6IHRoaXMuZGV0ZXJtaW5lQXBwcm9wcmlhdGVSZXNvbHV0aW9uKGltYWdlKTtcblxuICAgICAgICBpbWFnZS53aWR0aCA9IGNvbXB1dGVkV2lkdGg7XG5cbiAgICAgICAgaWYgKGltYWdlLnNyYyAhPT0gdGhpcy5naWYuc3JjICYmIGNvbXB1dGVkV2lkdGggPD0gbmF0dXJhbFdpZHRoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc0V4dGVuc2lvbkFsbG93ZWQoaW1hZ2UpKSB7XG4gICAgICAgICAgICBzcmMgPSB0aGlzLmNoYW5nZUltYWdlU3JjVG9Vc2VOZXdJbWFnZURpbWVuc2lvbnModGhpcy5idWlsZFVybFN0cnVjdHVyZShpbWFnZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJyksIGltYWdlKSwgY29tcHV0ZWRXaWR0aCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzcmMgPSB0aGlzLnJlbW92ZU1vZGlmaWVyc2Zyb21JbWFnZVNyYyhpbWFnZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgaW1hZ2Uuc3JjID0gc3JjO1xuICAgIH07XG5cbiAgICBJbWFnZXIucHJvdG90eXBlLnJlbW92ZU1vZGlmaWVyc2Zyb21JbWFnZVNyYyA9IGZ1bmN0aW9uKHNyYykge1xuICAgICAgICB2YXIgcmVnRXhwID0gbmV3IFJlZ0V4cChcIlxcXFwve3dpZHRofVxcXFwve3BpeGVsX3JhdGlvfVwiLCBcImdcIik7XG4gICAgICAgIHJldHVybiBzcmMucmVwbGFjZShyZWdFeHAsICcnKTtcbiAgICB9O1xuXG4gICAgSW1hZ2VyLnByb3RvdHlwZS5pc0V4dGVuc2lvbkFsbG93ZWQgPSBmdW5jdGlvbihpbWFnZSkge1xuICAgICAgICB2YXIgaW1hZ2VFeHRlbnNpb24gPSB0aGlzLmdldEltYWdlRXh0ZW5zaW9uKGltYWdlKTtcbiAgICAgICAgcmV0dXJuIGltYWdlRXh0ZW5zaW9uID8gdGhpcy5hbGxvd2VkRXh0ZW5zaW9ucy5pbmRleE9mKGltYWdlRXh0ZW5zaW9uLnRvTG93ZXJDYXNlKCkpID4gLTEgOiBmYWxzZTtcbiAgICB9O1xuXG4gICAgSW1hZ2VyLnByb3RvdHlwZS5nZXRJbWFnZUV4dGVuc2lvbiA9IGZ1bmN0aW9uKGltYWdlKSB7XG4gICAgICAgIHZhciByZWdFeHAgPSBuZXcgUmVnRXhwKFwiXFxcXC8uKlxcXFwuKC4qKVxcXFwve3dpZHRofVxcXFwve3BpeGVsX3JhdGlvfT9cIiwgXCJnaVwiKTtcbiAgICAgICAgdmFyIG1hdGNoID0gcmVnRXhwLmV4ZWMoaW1hZ2UuZ2V0QXR0cmlidXRlKCdkYXRhLXNyYycpKTtcbiAgICAgICAgcmV0dXJuIG1hdGNoID8gbWF0Y2hbMV0gOiBcIlwiO1xuICAgIH07XG5cbiAgICBJbWFnZXIucHJvdG90eXBlLmRldGVybWluZUFwcHJvcHJpYXRlUmVzb2x1dGlvbiA9IGZ1bmN0aW9uKGltYWdlKSB7XG4gICAgICAgIHJldHVybiBJbWFnZXIuZ2V0Q2xvc2VzdFZhbHVlKGltYWdlLmdldEF0dHJpYnV0ZSgnZGF0YS13aWR0aCcpIHx8IGltYWdlLnBhcmVudE5vZGUuY2xpZW50V2lkdGgsIHRoaXMuYXZhaWxhYmxlV2lkdGhzKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgZGV2aWNlIHBpeGVsIHJhdGlvIHZhbHVlIHVzZWQgYnkgSW1hZ2VyXG4gICAgICpcbiAgICAgKiBJdCBpcyBwZXJmb3JtZWQgYmVmb3JlIGVhY2ggcmVwbGFjZW1lbnQgbG9vcCwgaW4gY2FzZSBhIHVzZXIgem9vbWVkIGluL291dFxuICAgICAqIGFuZCB0aHVzIHVwZGF0ZWQgdGhlIGB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpb2AgdmFsdWUuXG4gICAgICpcbiAgICAgKiBAYXBpXG4gICAgICogQHNpbmNlIDEuMC4xXG4gICAgICovXG4gICAgSW1hZ2VyLnByb3RvdHlwZS5yZWZyZXNoUGl4ZWxSYXRpbyA9IGZ1bmN0aW9uIHJlZnJlc2hQaXhlbFJhdGlvKCkge1xuICAgICAgICB0aGlzLmRldmljZVBpeGVsUmF0aW8gPSBJbWFnZXIuZ2V0Q2xvc2VzdFZhbHVlKEltYWdlci5nZXRQaXhlbFJhdGlvKCksIHRoaXMuYXZhaWxhYmxlUGl4ZWxSYXRpb3MpO1xuICAgIH07XG5cbiAgICBJbWFnZXIucHJvdG90eXBlLmNoYW5nZUltYWdlU3JjVG9Vc2VOZXdJbWFnZURpbWVuc2lvbnMgPSBmdW5jdGlvbihzcmMsIHNlbGVjdGVkV2lkdGgpIHtcbiAgICAgICAgcmV0dXJuIHNyY1xuICAgICAgICAgICAgLnJlcGxhY2UoL3t3aWR0aH0vZywgSW1hZ2VyLnRyYW5zZm9ybXMud2lkdGgoc2VsZWN0ZWRXaWR0aCwgdGhpcy53aWR0aHNNYXApKVxuICAgICAgICAgICAgLnJlcGxhY2UoL3twaXhlbF9yYXRpb30vZywgSW1hZ2VyLnRyYW5zZm9ybXMucGl4ZWxSYXRpbyh0aGlzLmRldmljZVBpeGVsUmF0aW8pKTtcbiAgICB9O1xuXG4gICAgSW1hZ2VyLnByb3RvdHlwZS5idWlsZFVybFN0cnVjdHVyZSA9IGZ1bmN0aW9uKHNyYywgaW1hZ2UpIHtcbiAgICAgICAgdmFyIHNxdWFyZVNlbGVjdG9yID0gdGhpcy5pc0ltYWdlQ29udGFpbmVyU3F1YXJlKGltYWdlKSA/ICcuJyArIHRoaXMuc3F1YXJlU2VsZWN0b3IgOiAnJztcblxuICAgICAgICB2YXIgcmVnRXhwID0gbmV3IFJlZ0V4cChcIlxcXFwuKFwiICsgdGhpcy5hbGxvd2VkRXh0ZW5zaW9ucy5qb2luKFwifFwiKSAgKyBcIilcXFxcLyh7d2lkdGh9KVxcXFwvKHtwaXhlbF9yYXRpb30pP1wiLCBcImdpXCIpO1xuXG4gICAgICAgIHJldHVybiBzcmMucmVwbGFjZShyZWdFeHAsICcuJyArIHRoaXMuYWRhcHRTZWxlY3RvciArICcuJDIuJDMnICsgc3F1YXJlU2VsZWN0b3IgKyAnLiQxJyk7XG4gICAgfTtcblxuICAgIEltYWdlci5wcm90b3R5cGUuaXNJbWFnZUNvbnRhaW5lclNxdWFyZSA9IGZ1bmN0aW9uKGltYWdlKSB7XG4gICAgICAgIHJldHVybiAoaW1hZ2UucGFyZW50Tm9kZS5jbGllbnRXaWR0aCAvIGltYWdlLnBhcmVudE5vZGUuY2xpZW50SGVpZ2h0KSA8PSB0aGlzLmRlbHRhU3F1YXJlXG4gICAgfTtcblxuICAgIEltYWdlci5nZXRQaXhlbFJhdGlvID0gZnVuY3Rpb24gZ2V0UGl4ZWxSYXRpbyhjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiAoY29udGV4dCB8fCB3aW5kb3cpWydkZXZpY2VQaXhlbFJhdGlvJ10gfHwgMTtcbiAgICB9O1xuXG4gICAgSW1hZ2VyLmNyZWF0ZVdpZHRoc01hcCA9IGZ1bmN0aW9uIGNyZWF0ZVdpZHRoc01hcCh3aWR0aHMsIGludGVycG9sYXRvcikge1xuICAgICAgICB2YXIgbWFwID0ge30sXG4gICAgICAgICAgICBpID0gd2lkdGhzLmxlbmd0aDtcblxuICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICBtYXBbd2lkdGhzW2ldXSA9IGludGVycG9sYXRvcih3aWR0aHNbaV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1hcDtcbiAgICB9O1xuXG4gICAgSW1hZ2VyLnRyYW5zZm9ybXMgPSB7XG4gICAgICAgIHBpeGVsUmF0aW86IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIHdpZHRoOiBmdW5jdGlvbih3aWR0aCwgbWFwKSB7XG4gICAgICAgICAgICByZXR1cm4gbWFwW3dpZHRoXSB8fCB3aWR0aDtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBjbG9zZXN0IHVwcGVyIHZhbHVlLlxuICAgICAqXG4gICAgICogYGBganNcbiAgICAgKiB2YXIgY2FuZGlkYXRlcyA9IFsxLCAxLjUsIDJdO1xuICAgICAqXG4gICAgICogSW1hZ2VyLmdldENsb3Nlc3RWYWx1ZSgwLjgsIGNhbmRpZGF0ZXMpOyAvLyAtPiAxXG4gICAgICogSW1hZ2VyLmdldENsb3Nlc3RWYWx1ZSgxLCBjYW5kaWRhdGVzKTsgLy8gLT4gMVxuICAgICAqIEltYWdlci5nZXRDbG9zZXN0VmFsdWUoMS4zLCBjYW5kaWRhdGVzKTsgLy8gLT4gMS41XG4gICAgICogSW1hZ2VyLmdldENsb3Nlc3RWYWx1ZSgzLCBjYW5kaWRhdGVzKTsgLy8gLT4gMlxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogQGFwaVxuICAgICAqIEBzaW5jZSAxLjAuMVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBiYXNlVmFsdWVcbiAgICAgKiBAcGFyYW0ge0FycmF5LjxOdW1iZXI+fSBjYW5kaWRhdGVzXG4gICAgICogQHJldHVybnMge051bWJlcn1cbiAgICAgKi9cbiAgICBJbWFnZXIuZ2V0Q2xvc2VzdFZhbHVlID0gZnVuY3Rpb24gZ2V0Q2xvc2VzdFZhbHVlKGJhc2VWYWx1ZSwgY2FuZGlkYXRlcykge1xuICAgICAgICB2YXIgaSA9IGNhbmRpZGF0ZXMubGVuZ3RoLFxuICAgICAgICAgICAgc2VsZWN0ZWRXaWR0aCA9IGNhbmRpZGF0ZXNbaSAtIDFdO1xuXG4gICAgICAgIGJhc2VWYWx1ZSA9IHBhcnNlRmxvYXQoYmFzZVZhbHVlLCAxMCk7XG5cbiAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgaWYgKGJhc2VWYWx1ZSA8PSBjYW5kaWRhdGVzW2ldKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRXaWR0aCA9IGNhbmRpZGF0ZXNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2VsZWN0ZWRXaWR0aDtcbiAgICB9O1xuXG4gICAgSW1hZ2VyLnByb3RvdHlwZS5yZWdpc3RlclJlc2l6ZUV2ZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICBhZGRFdmVudCh3aW5kb3csICdyZXNpemUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNlbGYuY2hlY2tJbWFnZXNOZWVkUmVwbGFjaW5nKHNlbGYuZGl2cyk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBJbWFnZXIucHJvdG90eXBlLnJlZ2lzdGVyU2Nyb2xsRXZlbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMuc2Nyb2xsZWQgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLmludGVydmFsID0gd2luZG93LnNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2VsZi5zY3JvbGxDaGVjaygpO1xuICAgICAgICB9LCBzZWxmLnNjcm9sbERlbGF5KTtcblxuICAgICAgICBhZGRFdmVudCh3aW5kb3csICdzY3JvbGwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNlbGYuc2Nyb2xsZWQgPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgSW1hZ2VyLmdldFBhZ2VPZmZzZXRHZW5lcmF0b3IgPSBmdW5jdGlvbiBnZXRQYWdlVmVydGljYWxPZmZzZXQodGVzdENhc2UpIHtcbiAgICAgICAgaWYgKHRlc3RDYXNlKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5wYWdlWU9mZnNldDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8vIFRoaXMgZm9ybSBpcyB1c2VkIGJlY2F1c2UgaXQgc2VlbXMgaW1wb3NzaWJsZSB0byBzdHViIGB3aW5kb3cucGFnZVlPZmZzZXRgXG4gICAgSW1hZ2VyLmdldFBhZ2VPZmZzZXQgPSBJbWFnZXIuZ2V0UGFnZU9mZnNldEdlbmVyYXRvcihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwod2luZG93LCAncGFnZVlPZmZzZXQnKSk7XG5cbiAgICAvLyBFeHBvcnRpbmcgZm9yIHRlc3RpbmcgcHVycG9zZVxuICAgIEltYWdlci5hcHBseUVhY2ggPSBhcHBseUVhY2g7XG5cbiAgICAvKiBnbG9iYWwgbW9kdWxlLCBleHBvcnRzOiB0cnVlLCBkZWZpbmUgKi9cbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICAvLyBDb21tb25KUywganVzdCBleHBvcnRcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gSW1hZ2VyO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIC8vIEFNRCBzdXBwb3J0XG4gICAgICAgIGRlZmluZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBJbWFnZXI7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgLy8gSWYgbm8gQU1EIGFuZCB3ZSBhcmUgaW4gdGhlIGJyb3dzZXIsIGF0dGFjaCB0byB3aW5kb3dcbiAgICAgICAgd2luZG93LkltYWdlciA9IEltYWdlcjtcbiAgICB9XG4gICAgLyogZ2xvYmFsIC1tb2R1bGUsIC1leHBvcnRzLCAtZGVmaW5lICovXG5cbn0od2luZG93LCBkb2N1bWVudCkpOyIsIi8qKlxuICogaXNNb2JpbGUuanMgdjAuMy41XG4gKlxuICogQSBzaW1wbGUgbGlicmFyeSB0byBkZXRlY3QgQXBwbGUgcGhvbmVzIGFuZCB0YWJsZXRzLFxuICogQW5kcm9pZCBwaG9uZXMgYW5kIHRhYmxldHMsIG90aGVyIG1vYmlsZSBkZXZpY2VzIChsaWtlIGJsYWNrYmVycnksIG1pbmktb3BlcmEgYW5kIHdpbmRvd3MgcGhvbmUpLFxuICogYW5kIGFueSBraW5kIG9mIHNldmVuIGluY2ggZGV2aWNlLCB2aWEgdXNlciBhZ2VudCBzbmlmZmluZy5cbiAqXG4gKiBAYXV0aG9yOiBLYWkgTWFsbGVhIChrbWFsbGVhQGdtYWlsLmNvbSlcbiAqXG4gKiBAbGljZW5zZTogaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvcHVibGljZG9tYWluL3plcm8vMS4wL1xuICovXG4oZnVuY3Rpb24gKGdsb2JhbCkge1xuXG4gICAgdmFyIGFwcGxlX3Bob25lICAgICAgICAgPSAvaVBob25lL2ksXG4gICAgICAgIGFwcGxlX2lwb2QgICAgICAgICAgPSAvaVBvZC9pLFxuICAgICAgICBhcHBsZV90YWJsZXQgICAgICAgID0gL2lQYWQvaSxcbiAgICAgICAgYW5kcm9pZF9waG9uZSAgICAgICA9IC8oPz0uKlxcYkFuZHJvaWRcXGIpKD89LipcXGJNb2JpbGVcXGIpL2ksIC8vIE1hdGNoICdBbmRyb2lkJyBBTkQgJ01vYmlsZSdcbiAgICAgICAgYW5kcm9pZF90YWJsZXQgICAgICA9IC9BbmRyb2lkL2ksXG4gICAgICAgIHdpbmRvd3NfcGhvbmUgICAgICAgPSAvSUVNb2JpbGUvaSxcbiAgICAgICAgd2luZG93c190YWJsZXQgICAgICA9IC8oPz0uKlxcYldpbmRvd3NcXGIpKD89LipcXGJBUk1cXGIpL2ksIC8vIE1hdGNoICdXaW5kb3dzJyBBTkQgJ0FSTSdcbiAgICAgICAgb3RoZXJfYmxhY2tiZXJyeSAgICA9IC9CbGFja0JlcnJ5L2ksXG4gICAgICAgIG90aGVyX2JsYWNrYmVycnlfMTAgPSAvQkIxMC9pLFxuICAgICAgICBvdGhlcl9vcGVyYSAgICAgICAgID0gL09wZXJhIE1pbmkvaSxcbiAgICAgICAgb3RoZXJfZmlyZWZveCAgICAgICA9IC8oPz0uKlxcYkZpcmVmb3hcXGIpKD89LipcXGJNb2JpbGVcXGIpL2ksIC8vIE1hdGNoICdGaXJlZm94JyBBTkQgJ01vYmlsZSdcbiAgICAgICAgc2V2ZW5faW5jaCA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICAnKD86JyArICAgICAgICAgLy8gTm9uLWNhcHR1cmluZyBncm91cFxuXG4gICAgICAgICAgICAnTmV4dXMgNycgKyAgICAgLy8gTmV4dXMgN1xuXG4gICAgICAgICAgICAnfCcgKyAgICAgICAgICAgLy8gT1JcblxuICAgICAgICAgICAgJ0JOVFYyNTAnICsgICAgIC8vIEImTiBOb29rIFRhYmxldCA3IGluY2hcblxuICAgICAgICAgICAgJ3wnICsgICAgICAgICAgIC8vIE9SXG5cbiAgICAgICAgICAgICdLaW5kbGUgRmlyZScgKyAvLyBLaW5kbGUgRmlyZVxuXG4gICAgICAgICAgICAnfCcgKyAgICAgICAgICAgLy8gT1JcblxuICAgICAgICAgICAgJ1NpbGsnICsgICAgICAgIC8vIEtpbmRsZSBGaXJlLCBTaWxrIEFjY2VsZXJhdGVkXG5cbiAgICAgICAgICAgICd8JyArICAgICAgICAgICAvLyBPUlxuXG4gICAgICAgICAgICAnR1QtUDEwMDAnICsgICAgLy8gR2FsYXh5IFRhYiA3IGluY2hcblxuICAgICAgICAgICAgJyknLCAgICAgICAgICAgIC8vIEVuZCBub24tY2FwdHVyaW5nIGdyb3VwXG5cbiAgICAgICAgICAgICdpJyk7ICAgICAgICAgICAvLyBDYXNlLWluc2Vuc2l0aXZlIG1hdGNoaW5nXG5cbiAgICB2YXIgbWF0Y2ggPSBmdW5jdGlvbihyZWdleCwgdXNlckFnZW50KSB7XG4gICAgICAgIHJldHVybiByZWdleC50ZXN0KHVzZXJBZ2VudCk7XG4gICAgfTtcblxuICAgIHZhciBJc01vYmlsZUNsYXNzID0gZnVuY3Rpb24odXNlckFnZW50KSB7XG4gICAgICAgIHZhciB1YSA9IHVzZXJBZ2VudCB8fCBuYXZpZ2F0b3IudXNlckFnZW50O1xuXG4gICAgICAgIHRoaXMuYXBwbGUgPSB7XG4gICAgICAgICAgICBwaG9uZTogIG1hdGNoKGFwcGxlX3Bob25lLCB1YSksXG4gICAgICAgICAgICBpcG9kOiAgIG1hdGNoKGFwcGxlX2lwb2QsIHVhKSxcbiAgICAgICAgICAgIHRhYmxldDogbWF0Y2goYXBwbGVfdGFibGV0LCB1YSksXG4gICAgICAgICAgICBkZXZpY2U6IG1hdGNoKGFwcGxlX3Bob25lLCB1YSkgfHwgbWF0Y2goYXBwbGVfaXBvZCwgdWEpIHx8IG1hdGNoKGFwcGxlX3RhYmxldCwgdWEpXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5kcm9pZCA9IHtcbiAgICAgICAgICAgIHBob25lOiAgbWF0Y2goYW5kcm9pZF9waG9uZSwgdWEpLFxuICAgICAgICAgICAgdGFibGV0OiAhbWF0Y2goYW5kcm9pZF9waG9uZSwgdWEpICYmIG1hdGNoKGFuZHJvaWRfdGFibGV0LCB1YSksXG4gICAgICAgICAgICBkZXZpY2U6IG1hdGNoKGFuZHJvaWRfcGhvbmUsIHVhKSB8fCBtYXRjaChhbmRyb2lkX3RhYmxldCwgdWEpXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMud2luZG93cyA9IHtcbiAgICAgICAgICAgIHBob25lOiAgbWF0Y2god2luZG93c19waG9uZSwgdWEpLFxuICAgICAgICAgICAgdGFibGV0OiBtYXRjaCh3aW5kb3dzX3RhYmxldCwgdWEpLFxuICAgICAgICAgICAgZGV2aWNlOiBtYXRjaCh3aW5kb3dzX3Bob25lLCB1YSkgfHwgbWF0Y2god2luZG93c190YWJsZXQsIHVhKVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLm90aGVyID0ge1xuICAgICAgICAgICAgYmxhY2tiZXJyeTogICBtYXRjaChvdGhlcl9ibGFja2JlcnJ5LCB1YSksXG4gICAgICAgICAgICBibGFja2JlcnJ5MTA6IG1hdGNoKG90aGVyX2JsYWNrYmVycnlfMTAsIHVhKSxcbiAgICAgICAgICAgIG9wZXJhOiAgICAgICAgbWF0Y2gob3RoZXJfb3BlcmEsIHVhKSxcbiAgICAgICAgICAgIGZpcmVmb3g6ICAgICAgbWF0Y2gob3RoZXJfZmlyZWZveCwgdWEpLFxuICAgICAgICAgICAgZGV2aWNlOiAgICAgICBtYXRjaChvdGhlcl9ibGFja2JlcnJ5LCB1YSkgfHwgbWF0Y2gob3RoZXJfYmxhY2tiZXJyeV8xMCwgdWEpIHx8IG1hdGNoKG90aGVyX29wZXJhLCB1YSkgfHwgbWF0Y2gob3RoZXJfZmlyZWZveCwgdWEpXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2V2ZW5faW5jaCA9IG1hdGNoKHNldmVuX2luY2gsIHVhKTtcbiAgICAgICAgdGhpcy5hbnkgPSB0aGlzLmFwcGxlLmRldmljZSB8fCB0aGlzLmFuZHJvaWQuZGV2aWNlIHx8IHRoaXMud2luZG93cy5kZXZpY2UgfHwgdGhpcy5vdGhlci5kZXZpY2UgfHwgdGhpcy5zZXZlbl9pbmNoO1xuICAgICAgICAvLyBleGNsdWRlcyAnb3RoZXInIGRldmljZXMgYW5kIGlwb2RzLCB0YXJnZXRpbmcgdG91Y2hzY3JlZW4gcGhvbmVzXG4gICAgICAgIHRoaXMucGhvbmUgPSB0aGlzLmFwcGxlLnBob25lIHx8IHRoaXMuYW5kcm9pZC5waG9uZSB8fCB0aGlzLndpbmRvd3MucGhvbmU7XG4gICAgICAgIC8vIGV4Y2x1ZGVzIDcgaW5jaCBkZXZpY2VzLCBjbGFzc2lmeWluZyBhcyBwaG9uZSBvciB0YWJsZXQgaXMgbGVmdCB0byB0aGUgdXNlclxuICAgICAgICB0aGlzLnRhYmxldCA9IHRoaXMuYXBwbGUudGFibGV0IHx8IHRoaXMuYW5kcm9pZC50YWJsZXQgfHwgdGhpcy53aW5kb3dzLnRhYmxldDtcblxuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHZhciBpbnN0YW50aWF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgSU0gPSBuZXcgSXNNb2JpbGVDbGFzcygpO1xuICAgICAgICBJTS5DbGFzcyA9IElzTW9iaWxlQ2xhc3M7XG4gICAgICAgIHJldHVybiBJTTtcbiAgICB9O1xuXG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgIT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMgJiYgdHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgLy9ub2RlXG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gSXNNb2JpbGVDbGFzcztcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgIT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgLy9icm93c2VyaWZ5XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gaW5zdGFudGlhdGUoKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICAvL0FNRFxuICAgICAgICBkZWZpbmUoZ2xvYmFsLmlzTW9iaWxlID0gaW5zdGFudGlhdGUoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZ2xvYmFsLmlzTW9iaWxlID0gaW5zdGFudGlhdGUoKTtcbiAgICB9XG5cbn0pKHRoaXMpO1xuIiwiLypcclxuKiBsb2dsZXZlbCAtIGh0dHBzOi8vZ2l0aHViLmNvbS9waW10ZXJyeS9sb2dsZXZlbFxyXG4qXHJcbiogQ29weXJpZ2h0IChjKSAyMDEzIFRpbSBQZXJyeVxyXG4qIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cclxuKi9cclxuKGZ1bmN0aW9uIChyb290LCBkZWZpbml0aW9uKSB7XHJcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgJiYgdHlwZW9mIHJlcXVpcmUgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGRlZmluaXRpb24oKTtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmaW5lLmFtZCA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICBkZWZpbmUoZGVmaW5pdGlvbik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJvb3QubG9nID0gZGVmaW5pdGlvbigpO1xyXG4gICAgfVxyXG59KHRoaXMsIGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBzZWxmID0ge307XHJcbiAgICB2YXIgbm9vcCA9IGZ1bmN0aW9uKCkge307XHJcbiAgICB2YXIgdW5kZWZpbmVkVHlwZSA9IFwidW5kZWZpbmVkXCI7XHJcblxyXG4gICAgZnVuY3Rpb24gcmVhbE1ldGhvZChtZXRob2ROYW1lKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlID09PSB1bmRlZmluZWRUeXBlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTsgLy8gV2UgY2FuJ3QgYnVpbGQgYSByZWFsIG1ldGhvZCB3aXRob3V0IGEgY29uc29sZSB0byBsb2cgdG9cclxuICAgICAgICB9IGVsc2UgaWYgKGNvbnNvbGVbbWV0aG9kTmFtZV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYmluZE1ldGhvZChjb25zb2xlLCBtZXRob2ROYW1lKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGNvbnNvbGUubG9nICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGJpbmRNZXRob2QoY29uc29sZSwgJ2xvZycpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBub29wO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBiaW5kTWV0aG9kKG9iaiwgbWV0aG9kTmFtZSkge1xyXG4gICAgICAgIHZhciBtZXRob2QgPSBvYmpbbWV0aG9kTmFtZV07XHJcbiAgICAgICAgaWYgKHR5cGVvZiBtZXRob2QuYmluZCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICByZXR1cm4gbWV0aG9kLmJpbmQob2JqKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kLmNhbGwobWV0aG9kLCBvYmopO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBNaXNzaW5nIGJpbmQgc2hpbSBvciBJRTggKyBNb2Rlcm5penIsIGZhbGxiYWNrIHRvIHdyYXBwaW5nXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5hcHBseShtZXRob2QsIFtvYmosIGFyZ3VtZW50c10pO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBlbmFibGVMb2dnaW5nV2hlbkNvbnNvbGVBcnJpdmVzKG1ldGhvZE5hbWUsIGxldmVsKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSB1bmRlZmluZWRUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICByZXBsYWNlTG9nZ2luZ01ldGhvZHMobGV2ZWwpO1xyXG4gICAgICAgICAgICAgICAgc2VsZlttZXRob2ROYW1lXS5hcHBseShzZWxmLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgbG9nTWV0aG9kcyA9IFtcclxuICAgICAgICBcInRyYWNlXCIsXHJcbiAgICAgICAgXCJkZWJ1Z1wiLFxyXG4gICAgICAgIFwiaW5mb1wiLFxyXG4gICAgICAgIFwid2FyblwiLFxyXG4gICAgICAgIFwiZXJyb3JcIlxyXG4gICAgXTtcclxuXHJcbiAgICBmdW5jdGlvbiByZXBsYWNlTG9nZ2luZ01ldGhvZHMobGV2ZWwpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxvZ01ldGhvZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIG1ldGhvZE5hbWUgPSBsb2dNZXRob2RzW2ldO1xyXG4gICAgICAgICAgICBzZWxmW21ldGhvZE5hbWVdID0gKGkgPCBsZXZlbCkgPyBub29wIDogc2VsZi5tZXRob2RGYWN0b3J5KG1ldGhvZE5hbWUsIGxldmVsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcGVyc2lzdExldmVsSWZQb3NzaWJsZShsZXZlbE51bSkge1xyXG4gICAgICAgIHZhciBsZXZlbE5hbWUgPSAobG9nTWV0aG9kc1tsZXZlbE51bV0gfHwgJ3NpbGVudCcpLnRvVXBwZXJDYXNlKCk7XHJcblxyXG4gICAgICAgIC8vIFVzZSBsb2NhbFN0b3JhZ2UgaWYgYXZhaWxhYmxlXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZVsnbG9nbGV2ZWwnXSA9IGxldmVsTmFtZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH0gY2F0Y2ggKGlnbm9yZSkge31cclxuXHJcbiAgICAgICAgLy8gVXNlIHNlc3Npb24gY29va2llIGFzIGZhbGxiYWNrXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgd2luZG93LmRvY3VtZW50LmNvb2tpZSA9IFwibG9nbGV2ZWw9XCIgKyBsZXZlbE5hbWUgKyBcIjtcIjtcclxuICAgICAgICB9IGNhdGNoIChpZ25vcmUpIHt9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbG9hZFBlcnNpc3RlZExldmVsKCkge1xyXG4gICAgICAgIHZhciBzdG9yZWRMZXZlbDtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgc3RvcmVkTGV2ZWwgPSB3aW5kb3cubG9jYWxTdG9yYWdlWydsb2dsZXZlbCddO1xyXG4gICAgICAgIH0gY2F0Y2ggKGlnbm9yZSkge31cclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBzdG9yZWRMZXZlbCA9PT0gdW5kZWZpbmVkVHlwZSkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgc3RvcmVkTGV2ZWwgPSAvbG9nbGV2ZWw9KFteO10rKS8uZXhlYyh3aW5kb3cuZG9jdW1lbnQuY29va2llKVsxXTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoaWdub3JlKSB7fVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZiAoc2VsZi5sZXZlbHNbc3RvcmVkTGV2ZWxdID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgc3RvcmVkTGV2ZWwgPSBcIldBUk5cIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGYuc2V0TGV2ZWwoc2VsZi5sZXZlbHNbc3RvcmVkTGV2ZWxdKTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgICpcclxuICAgICAqIFB1YmxpYyBBUElcclxuICAgICAqXHJcbiAgICAgKi9cclxuXHJcbiAgICBzZWxmLmxldmVscyA9IHsgXCJUUkFDRVwiOiAwLCBcIkRFQlVHXCI6IDEsIFwiSU5GT1wiOiAyLCBcIldBUk5cIjogMyxcclxuICAgICAgICBcIkVSUk9SXCI6IDQsIFwiU0lMRU5UXCI6IDV9O1xyXG5cclxuICAgIHNlbGYubWV0aG9kRmFjdG9yeSA9IGZ1bmN0aW9uIChtZXRob2ROYW1lLCBsZXZlbCkge1xyXG4gICAgICAgIHJldHVybiByZWFsTWV0aG9kKG1ldGhvZE5hbWUpIHx8XHJcbiAgICAgICAgICAgICAgIGVuYWJsZUxvZ2dpbmdXaGVuQ29uc29sZUFycml2ZXMobWV0aG9kTmFtZSwgbGV2ZWwpO1xyXG4gICAgfTtcclxuXHJcbiAgICBzZWxmLnNldExldmVsID0gZnVuY3Rpb24gKGxldmVsKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBsZXZlbCA9PT0gXCJzdHJpbmdcIiAmJiBzZWxmLmxldmVsc1tsZXZlbC50b1VwcGVyQ2FzZSgpXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGxldmVsID0gc2VsZi5sZXZlbHNbbGV2ZWwudG9VcHBlckNhc2UoKV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgbGV2ZWwgPT09IFwibnVtYmVyXCIgJiYgbGV2ZWwgPj0gMCAmJiBsZXZlbCA8PSBzZWxmLmxldmVscy5TSUxFTlQpIHtcclxuICAgICAgICAgICAgcGVyc2lzdExldmVsSWZQb3NzaWJsZShsZXZlbCk7XHJcbiAgICAgICAgICAgIHJlcGxhY2VMb2dnaW5nTWV0aG9kcyhsZXZlbCk7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY29uc29sZSA9PT0gdW5kZWZpbmVkVHlwZSAmJiBsZXZlbCA8IHNlbGYubGV2ZWxzLlNJTEVOVCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiTm8gY29uc29sZSBhdmFpbGFibGUgZm9yIGxvZ2dpbmdcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IFwibG9nLnNldExldmVsKCkgY2FsbGVkIHdpdGggaW52YWxpZCBsZXZlbDogXCIgKyBsZXZlbDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHNlbGYuZW5hYmxlQWxsID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgc2VsZi5zZXRMZXZlbChzZWxmLmxldmVscy5UUkFDRSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHNlbGYuZGlzYWJsZUFsbCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHNlbGYuc2V0TGV2ZWwoc2VsZi5sZXZlbHMuU0lMRU5UKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gR3JhYiB0aGUgY3VycmVudCBnbG9iYWwgbG9nIHZhcmlhYmxlIGluIGNhc2Ugb2Ygb3ZlcndyaXRlXHJcbiAgICB2YXIgX2xvZyA9ICh0eXBlb2Ygd2luZG93ICE9PSB1bmRlZmluZWRUeXBlKSA/IHdpbmRvdy5sb2cgOiB1bmRlZmluZWQ7XHJcbiAgICBzZWxmLm5vQ29uZmxpY3QgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gdW5kZWZpbmVkVHlwZSAmJlxyXG4gICAgICAgICAgICAgICB3aW5kb3cubG9nID09PSBzZWxmKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2cgPSBfbG9nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNlbGY7XHJcbiAgICB9O1xyXG5cclxuICAgIGxvYWRQZXJzaXN0ZWRMZXZlbCgpO1xyXG4gICAgcmV0dXJuIHNlbGY7XHJcbn0pKTtcclxuIiwiLyohIFJhdmVuLmpzIDEuMS4xOCAoOGFkMTViYykgfCBnaXRodWIuY29tL2dldHNlbnRyeS9yYXZlbi1qcyAqL1xuXG4vKlxuICogSW5jbHVkZXMgVHJhY2VLaXRcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9nZXRzZW50cnkvVHJhY2VLaXRcbiAqXG4gKiBDb3B5cmlnaHQgMjAxNSBNYXR0IFJvYmVub2x0IGFuZCBvdGhlciBjb250cmlidXRvcnNcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBCU0QgbGljZW5zZVxuICogaHR0cHM6Ly9naXRodWIuY29tL2dldHNlbnRyeS9yYXZlbi1qcy9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKlxuICovXG47KGZ1bmN0aW9uKHdpbmRvdywgdW5kZWZpbmVkKXtcbid1c2Ugc3RyaWN0JztcblxuLypcbiBUcmFjZUtpdCAtIENyb3NzIGJyb3dlciBzdGFjayB0cmFjZXMgLSBnaXRodWIuY29tL29jYy9UcmFjZUtpdFxuIE1JVCBsaWNlbnNlXG4qL1xuXG52YXIgVHJhY2VLaXQgPSB7XG4gICAgcmVtb3RlRmV0Y2hpbmc6IGZhbHNlLFxuICAgIGNvbGxlY3RXaW5kb3dFcnJvcnM6IHRydWUsXG4gICAgLy8gMyBsaW5lcyBiZWZvcmUsIHRoZSBvZmZlbmRpbmcgbGluZSwgMyBsaW5lcyBhZnRlclxuICAgIGxpbmVzT2ZDb250ZXh0OiA3XG59O1xuXG4vLyBnbG9iYWwgcmVmZXJlbmNlIHRvIHNsaWNlXG52YXIgX3NsaWNlID0gW10uc2xpY2U7XG52YXIgVU5LTk9XTl9GVU5DVElPTiA9ICc/JztcblxuXG4vKipcbiAqIFRyYWNlS2l0LndyYXA6IFdyYXAgYW55IGZ1bmN0aW9uIGluIGEgVHJhY2VLaXQgcmVwb3J0ZXJcbiAqIEV4YW1wbGU6IGZ1bmMgPSBUcmFjZUtpdC53cmFwKGZ1bmMpO1xuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgRnVuY3Rpb24gdG8gYmUgd3JhcHBlZFxuICogQHJldHVybiB7RnVuY3Rpb259IFRoZSB3cmFwcGVkIGZ1bmNcbiAqL1xuVHJhY2VLaXQud3JhcCA9IGZ1bmN0aW9uIHRyYWNlS2l0V3JhcHBlcihmdW5jKSB7XG4gICAgZnVuY3Rpb24gd3JhcHBlZCgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIFRyYWNlS2l0LnJlcG9ydChlKTtcbiAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHdyYXBwZWQ7XG59O1xuXG4vKipcbiAqIFRyYWNlS2l0LnJlcG9ydDogY3Jvc3MtYnJvd3NlciBwcm9jZXNzaW5nIG9mIHVuaGFuZGxlZCBleGNlcHRpb25zXG4gKlxuICogU3ludGF4OlxuICogICBUcmFjZUtpdC5yZXBvcnQuc3Vic2NyaWJlKGZ1bmN0aW9uKHN0YWNrSW5mbykgeyAuLi4gfSlcbiAqICAgVHJhY2VLaXQucmVwb3J0LnVuc3Vic2NyaWJlKGZ1bmN0aW9uKHN0YWNrSW5mbykgeyAuLi4gfSlcbiAqICAgVHJhY2VLaXQucmVwb3J0KGV4Y2VwdGlvbilcbiAqICAgdHJ5IHsgLi4uY29kZS4uLiB9IGNhdGNoKGV4KSB7IFRyYWNlS2l0LnJlcG9ydChleCk7IH1cbiAqXG4gKiBTdXBwb3J0czpcbiAqICAgLSBGaXJlZm94OiBmdWxsIHN0YWNrIHRyYWNlIHdpdGggbGluZSBudW1iZXJzLCBwbHVzIGNvbHVtbiBudW1iZXJcbiAqICAgICAgICAgICAgICBvbiB0b3AgZnJhbWU7IGNvbHVtbiBudW1iZXIgaXMgbm90IGd1YXJhbnRlZWRcbiAqICAgLSBPcGVyYTogICBmdWxsIHN0YWNrIHRyYWNlIHdpdGggbGluZSBhbmQgY29sdW1uIG51bWJlcnNcbiAqICAgLSBDaHJvbWU6ICBmdWxsIHN0YWNrIHRyYWNlIHdpdGggbGluZSBhbmQgY29sdW1uIG51bWJlcnNcbiAqICAgLSBTYWZhcmk6ICBsaW5lIGFuZCBjb2x1bW4gbnVtYmVyIGZvciB0aGUgdG9wIGZyYW1lIG9ubHk7IHNvbWUgZnJhbWVzXG4gKiAgICAgICAgICAgICAgbWF5IGJlIG1pc3NpbmcsIGFuZCBjb2x1bW4gbnVtYmVyIGlzIG5vdCBndWFyYW50ZWVkXG4gKiAgIC0gSUU6ICAgICAgbGluZSBhbmQgY29sdW1uIG51bWJlciBmb3IgdGhlIHRvcCBmcmFtZSBvbmx5OyBzb21lIGZyYW1lc1xuICogICAgICAgICAgICAgIG1heSBiZSBtaXNzaW5nLCBhbmQgY29sdW1uIG51bWJlciBpcyBub3QgZ3VhcmFudGVlZFxuICpcbiAqIEluIHRoZW9yeSwgVHJhY2VLaXQgc2hvdWxkIHdvcmsgb24gYWxsIG9mIHRoZSBmb2xsb3dpbmcgdmVyc2lvbnM6XG4gKiAgIC0gSUU1LjUrIChvbmx5IDguMCB0ZXN0ZWQpXG4gKiAgIC0gRmlyZWZveCAwLjkrIChvbmx5IDMuNSsgdGVzdGVkKVxuICogICAtIE9wZXJhIDcrIChvbmx5IDEwLjUwIHRlc3RlZDsgdmVyc2lvbnMgOSBhbmQgZWFybGllciBtYXkgcmVxdWlyZVxuICogICAgIEV4Y2VwdGlvbnMgSGF2ZSBTdGFja3RyYWNlIHRvIGJlIGVuYWJsZWQgaW4gb3BlcmE6Y29uZmlnKVxuICogICAtIFNhZmFyaSAzKyAob25seSA0KyB0ZXN0ZWQpXG4gKiAgIC0gQ2hyb21lIDErIChvbmx5IDUrIHRlc3RlZClcbiAqICAgLSBLb25xdWVyb3IgMy41KyAodW50ZXN0ZWQpXG4gKlxuICogUmVxdWlyZXMgVHJhY2VLaXQuY29tcHV0ZVN0YWNrVHJhY2UuXG4gKlxuICogVHJpZXMgdG8gY2F0Y2ggYWxsIHVuaGFuZGxlZCBleGNlcHRpb25zIGFuZCByZXBvcnQgdGhlbSB0byB0aGVcbiAqIHN1YnNjcmliZWQgaGFuZGxlcnMuIFBsZWFzZSBub3RlIHRoYXQgVHJhY2VLaXQucmVwb3J0IHdpbGwgcmV0aHJvdyB0aGVcbiAqIGV4Y2VwdGlvbi4gVGhpcyBpcyBSRVFVSVJFRCBpbiBvcmRlciB0byBnZXQgYSB1c2VmdWwgc3RhY2sgdHJhY2UgaW4gSUUuXG4gKiBJZiB0aGUgZXhjZXB0aW9uIGRvZXMgbm90IHJlYWNoIHRoZSB0b3Agb2YgdGhlIGJyb3dzZXIsIHlvdSB3aWxsIG9ubHlcbiAqIGdldCBhIHN0YWNrIHRyYWNlIGZyb20gdGhlIHBvaW50IHdoZXJlIFRyYWNlS2l0LnJlcG9ydCB3YXMgY2FsbGVkLlxuICpcbiAqIEhhbmRsZXJzIHJlY2VpdmUgYSBzdGFja0luZm8gb2JqZWN0IGFzIGRlc2NyaWJlZCBpbiB0aGVcbiAqIFRyYWNlS2l0LmNvbXB1dGVTdGFja1RyYWNlIGRvY3MuXG4gKi9cblRyYWNlS2l0LnJlcG9ydCA9IChmdW5jdGlvbiByZXBvcnRNb2R1bGVXcmFwcGVyKCkge1xuICAgIHZhciBoYW5kbGVycyA9IFtdLFxuICAgICAgICBsYXN0QXJncyA9IG51bGwsXG4gICAgICAgIGxhc3RFeGNlcHRpb24gPSBudWxsLFxuICAgICAgICBsYXN0RXhjZXB0aW9uU3RhY2sgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQWRkIGEgY3Jhc2ggaGFuZGxlci5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYW5kbGVyXG4gICAgICovXG4gICAgZnVuY3Rpb24gc3Vic2NyaWJlKGhhbmRsZXIpIHtcbiAgICAgICAgaW5zdGFsbEdsb2JhbEhhbmRsZXIoKTtcbiAgICAgICAgaGFuZGxlcnMucHVzaChoYW5kbGVyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYSBjcmFzaCBoYW5kbGVyLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXJcbiAgICAgKi9cbiAgICBmdW5jdGlvbiB1bnN1YnNjcmliZShoYW5kbGVyKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSBoYW5kbGVycy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICAgICAgaWYgKGhhbmRsZXJzW2ldID09PSBoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlcnMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGFsbCBjcmFzaCBoYW5kbGVycy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiB1bnN1YnNjcmliZUFsbCgpIHtcbiAgICAgICAgdW5pbnN0YWxsR2xvYmFsSGFuZGxlcigpO1xuICAgICAgICBoYW5kbGVycyA9IFtdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERpc3BhdGNoIHN0YWNrIGluZm9ybWF0aW9uIHRvIGFsbCBoYW5kbGVycy5cbiAgICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCAqPn0gc3RhY2tcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBub3RpZnlIYW5kbGVycyhzdGFjaywgaXNXaW5kb3dFcnJvcikge1xuICAgICAgICB2YXIgZXhjZXB0aW9uID0gbnVsbDtcbiAgICAgICAgaWYgKGlzV2luZG93RXJyb3IgJiYgIVRyYWNlS2l0LmNvbGxlY3RXaW5kb3dFcnJvcnMpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSBpbiBoYW5kbGVycykge1xuICAgICAgICAgICAgaWYgKGhhc0tleShoYW5kbGVycywgaSkpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyc1tpXS5hcHBseShudWxsLCBbc3RhY2tdLmNvbmNhdChfc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpKSk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoaW5uZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgZXhjZXB0aW9uID0gaW5uZXI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGV4Y2VwdGlvbikge1xuICAgICAgICAgICAgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIF9vbGRPbmVycm9ySGFuZGxlciwgX29uRXJyb3JIYW5kbGVySW5zdGFsbGVkO1xuXG4gICAgLyoqXG4gICAgICogRW5zdXJlcyBhbGwgZ2xvYmFsIHVuaGFuZGxlZCBleGNlcHRpb25zIGFyZSByZWNvcmRlZC5cbiAgICAgKiBTdXBwb3J0ZWQgYnkgR2Vja28gYW5kIElFLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIEVycm9yIG1lc3NhZ2UuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCBVUkwgb2Ygc2NyaXB0IHRoYXQgZ2VuZXJhdGVkIHRoZSBleGNlcHRpb24uXG4gICAgICogQHBhcmFtIHsobnVtYmVyfHN0cmluZyl9IGxpbmVObyBUaGUgbGluZSBudW1iZXIgYXQgd2hpY2ggdGhlIGVycm9yXG4gICAgICogb2NjdXJyZWQuXG4gICAgICogQHBhcmFtIHs/KG51bWJlcnxzdHJpbmcpfSBjb2xObyBUaGUgY29sdW1uIG51bWJlciBhdCB3aGljaCB0aGUgZXJyb3JcbiAgICAgKiBvY2N1cnJlZC5cbiAgICAgKiBAcGFyYW0gez9FcnJvcn0gZXggVGhlIGFjdHVhbCBFcnJvciBvYmplY3QuXG4gICAgICovXG4gICAgZnVuY3Rpb24gdHJhY2VLaXRXaW5kb3dPbkVycm9yKG1lc3NhZ2UsIHVybCwgbGluZU5vLCBjb2xObywgZXgpIHtcbiAgICAgICAgdmFyIHN0YWNrID0gbnVsbDtcblxuICAgICAgICBpZiAobGFzdEV4Y2VwdGlvblN0YWNrKSB7XG4gICAgICAgICAgICBUcmFjZUtpdC5jb21wdXRlU3RhY2tUcmFjZS5hdWdtZW50U3RhY2tUcmFjZVdpdGhJbml0aWFsRWxlbWVudChsYXN0RXhjZXB0aW9uU3RhY2ssIHVybCwgbGluZU5vLCBtZXNzYWdlKTtcbiAgICAgICAgICAgIHByb2Nlc3NMYXN0RXhjZXB0aW9uKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZXgpIHtcbiAgICAgICAgICAgIC8vIE5ldyBjaHJvbWUgYW5kIGJsaW5rIHNlbmQgYWxvbmcgYSByZWFsIGVycm9yIG9iamVjdFxuICAgICAgICAgICAgLy8gTGV0J3MganVzdCByZXBvcnQgdGhhdCBsaWtlIGEgbm9ybWFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU2VlOiBodHRwczovL21pa2V3ZXN0Lm9yZy8yMDEzLzA4L2RlYnVnZ2luZy1ydW50aW1lLWVycm9ycy13aXRoLXdpbmRvdy1vbmVycm9yXG4gICAgICAgICAgICBzdGFjayA9IFRyYWNlS2l0LmNvbXB1dGVTdGFja1RyYWNlKGV4KTtcbiAgICAgICAgICAgIG5vdGlmeUhhbmRsZXJzKHN0YWNrLCB0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBsb2NhdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAndXJsJzogdXJsLFxuICAgICAgICAgICAgICAgICdsaW5lJzogbGluZU5vLFxuICAgICAgICAgICAgICAgICdjb2x1bW4nOiBjb2xOb1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGxvY2F0aW9uLmZ1bmMgPSBUcmFjZUtpdC5jb21wdXRlU3RhY2tUcmFjZS5ndWVzc0Z1bmN0aW9uTmFtZShsb2NhdGlvbi51cmwsIGxvY2F0aW9uLmxpbmUpO1xuICAgICAgICAgICAgbG9jYXRpb24uY29udGV4dCA9IFRyYWNlS2l0LmNvbXB1dGVTdGFja1RyYWNlLmdhdGhlckNvbnRleHQobG9jYXRpb24udXJsLCBsb2NhdGlvbi5saW5lKTtcbiAgICAgICAgICAgIHN0YWNrID0ge1xuICAgICAgICAgICAgICAgICdtZXNzYWdlJzogbWVzc2FnZSxcbiAgICAgICAgICAgICAgICAndXJsJzogZG9jdW1lbnQubG9jYXRpb24uaHJlZixcbiAgICAgICAgICAgICAgICAnc3RhY2snOiBbbG9jYXRpb25dXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbm90aWZ5SGFuZGxlcnMoc3RhY2ssIHRydWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF9vbGRPbmVycm9ySGFuZGxlcikge1xuICAgICAgICAgICAgcmV0dXJuIF9vbGRPbmVycm9ySGFuZGxlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxHbG9iYWxIYW5kbGVyICgpXG4gICAge1xuICAgICAgICBpZiAoX29uRXJyb3JIYW5kbGVySW5zdGFsbGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgX29sZE9uZXJyb3JIYW5kbGVyID0gd2luZG93Lm9uZXJyb3I7XG4gICAgICAgIHdpbmRvdy5vbmVycm9yID0gdHJhY2VLaXRXaW5kb3dPbkVycm9yO1xuICAgICAgICBfb25FcnJvckhhbmRsZXJJbnN0YWxsZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVuaW5zdGFsbEdsb2JhbEhhbmRsZXIgKClcbiAgICB7XG4gICAgICAgIGlmICghX29uRXJyb3JIYW5kbGVySW5zdGFsbGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgd2luZG93Lm9uZXJyb3IgPSBfb2xkT25lcnJvckhhbmRsZXI7XG4gICAgICAgIF9vbkVycm9ySGFuZGxlckluc3RhbGxlZCA9IGZhbHNlO1xuICAgICAgICBfb2xkT25lcnJvckhhbmRsZXIgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHJvY2Vzc0xhc3RFeGNlcHRpb24oKSB7XG4gICAgICAgIHZhciBfbGFzdEV4Y2VwdGlvblN0YWNrID0gbGFzdEV4Y2VwdGlvblN0YWNrLFxuICAgICAgICAgICAgX2xhc3RBcmdzID0gbGFzdEFyZ3M7XG4gICAgICAgIGxhc3RBcmdzID0gbnVsbDtcbiAgICAgICAgbGFzdEV4Y2VwdGlvblN0YWNrID0gbnVsbDtcbiAgICAgICAgbGFzdEV4Y2VwdGlvbiA9IG51bGw7XG4gICAgICAgIG5vdGlmeUhhbmRsZXJzLmFwcGx5KG51bGwsIFtfbGFzdEV4Y2VwdGlvblN0YWNrLCBmYWxzZV0uY29uY2F0KF9sYXN0QXJncykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlcG9ydHMgYW4gdW5oYW5kbGVkIEVycm9yIHRvIFRyYWNlS2l0LlxuICAgICAqIEBwYXJhbSB7RXJyb3J9IGV4XG4gICAgICogQHBhcmFtIHs/Ym9vbGVhbn0gcmV0aHJvdyBJZiBmYWxzZSwgZG8gbm90IHJlLXRocm93IHRoZSBleGNlcHRpb24uXG4gICAgICogT25seSB1c2VkIGZvciB3aW5kb3cub25lcnJvciB0byBub3QgY2F1c2UgYW4gaW5maW5pdGUgbG9vcCBvZlxuICAgICAqIHJldGhyb3dpbmcuXG4gICAgICovXG4gICAgZnVuY3Rpb24gcmVwb3J0KGV4LCByZXRocm93KSB7XG4gICAgICAgIHZhciBhcmdzID0gX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgaWYgKGxhc3RFeGNlcHRpb25TdGFjaykge1xuICAgICAgICAgICAgaWYgKGxhc3RFeGNlcHRpb24gPT09IGV4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuOyAvLyBhbHJlYWR5IGNhdWdodCBieSBhbiBpbm5lciBjYXRjaCBibG9jaywgaWdub3JlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBwcm9jZXNzTGFzdEV4Y2VwdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHN0YWNrID0gVHJhY2VLaXQuY29tcHV0ZVN0YWNrVHJhY2UoZXgpO1xuICAgICAgICBsYXN0RXhjZXB0aW9uU3RhY2sgPSBzdGFjaztcbiAgICAgICAgbGFzdEV4Y2VwdGlvbiA9IGV4O1xuICAgICAgICBsYXN0QXJncyA9IGFyZ3M7XG5cbiAgICAgICAgLy8gSWYgdGhlIHN0YWNrIHRyYWNlIGlzIGluY29tcGxldGUsIHdhaXQgZm9yIDIgc2Vjb25kcyBmb3JcbiAgICAgICAgLy8gc2xvdyBzbG93IElFIHRvIHNlZSBpZiBvbmVycm9yIG9jY3VycyBvciBub3QgYmVmb3JlIHJlcG9ydGluZ1xuICAgICAgICAvLyB0aGlzIGV4Y2VwdGlvbjsgb3RoZXJ3aXNlLCB3ZSB3aWxsIGVuZCB1cCB3aXRoIGFuIGluY29tcGxldGVcbiAgICAgICAgLy8gc3RhY2sgdHJhY2VcbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKGxhc3RFeGNlcHRpb24gPT09IGV4KSB7XG4gICAgICAgICAgICAgICAgcHJvY2Vzc0xhc3RFeGNlcHRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgKHN0YWNrLmluY29tcGxldGUgPyAyMDAwIDogMCkpO1xuXG4gICAgICAgIGlmIChyZXRocm93ICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhyb3cgZXg7IC8vIHJlLXRocm93IHRvIHByb3BhZ2F0ZSB0byB0aGUgdG9wIGxldmVsIChhbmQgY2F1c2Ugd2luZG93Lm9uZXJyb3IpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXBvcnQuc3Vic2NyaWJlID0gc3Vic2NyaWJlO1xuICAgIHJlcG9ydC51bnN1YnNjcmliZSA9IHVuc3Vic2NyaWJlO1xuICAgIHJlcG9ydC51bmluc3RhbGwgPSB1bnN1YnNjcmliZUFsbDtcbiAgICByZXR1cm4gcmVwb3J0O1xufSgpKTtcblxuLyoqXG4gKiBUcmFjZUtpdC5jb21wdXRlU3RhY2tUcmFjZTogY3Jvc3MtYnJvd3NlciBzdGFjayB0cmFjZXMgaW4gSmF2YVNjcmlwdFxuICpcbiAqIFN5bnRheDpcbiAqICAgcyA9IFRyYWNlS2l0LmNvbXB1dGVTdGFja1RyYWNlKGV4Y2VwdGlvbikgLy8gY29uc2lkZXIgdXNpbmcgVHJhY2VLaXQucmVwb3J0IGluc3RlYWQgKHNlZSBiZWxvdylcbiAqIFJldHVybnM6XG4gKiAgIHMubmFtZSAgICAgICAgICAgICAgLSBleGNlcHRpb24gbmFtZVxuICogICBzLm1lc3NhZ2UgICAgICAgICAgIC0gZXhjZXB0aW9uIG1lc3NhZ2VcbiAqICAgcy5zdGFja1tpXS51cmwgICAgICAtIEphdmFTY3JpcHQgb3IgSFRNTCBmaWxlIFVSTFxuICogICBzLnN0YWNrW2ldLmZ1bmMgICAgIC0gZnVuY3Rpb24gbmFtZSwgb3IgZW1wdHkgZm9yIGFub255bW91cyBmdW5jdGlvbnMgKGlmIGd1ZXNzaW5nIGRpZCBub3Qgd29yaylcbiAqICAgcy5zdGFja1tpXS5hcmdzICAgICAtIGFyZ3VtZW50cyBwYXNzZWQgdG8gdGhlIGZ1bmN0aW9uLCBpZiBrbm93blxuICogICBzLnN0YWNrW2ldLmxpbmUgICAgIC0gbGluZSBudW1iZXIsIGlmIGtub3duXG4gKiAgIHMuc3RhY2tbaV0uY29sdW1uICAgLSBjb2x1bW4gbnVtYmVyLCBpZiBrbm93blxuICogICBzLnN0YWNrW2ldLmNvbnRleHQgIC0gYW4gYXJyYXkgb2Ygc291cmNlIGNvZGUgbGluZXM7IHRoZSBtaWRkbGUgZWxlbWVudCBjb3JyZXNwb25kcyB0byB0aGUgY29ycmVjdCBsaW5lI1xuICpcbiAqIFN1cHBvcnRzOlxuICogICAtIEZpcmVmb3g6ICBmdWxsIHN0YWNrIHRyYWNlIHdpdGggbGluZSBudW1iZXJzIGFuZCB1bnJlbGlhYmxlIGNvbHVtblxuICogICAgICAgICAgICAgICBudW1iZXIgb24gdG9wIGZyYW1lXG4gKiAgIC0gT3BlcmEgMTA6IGZ1bGwgc3RhY2sgdHJhY2Ugd2l0aCBsaW5lIGFuZCBjb2x1bW4gbnVtYmVyc1xuICogICAtIE9wZXJhIDktOiBmdWxsIHN0YWNrIHRyYWNlIHdpdGggbGluZSBudW1iZXJzXG4gKiAgIC0gQ2hyb21lOiAgIGZ1bGwgc3RhY2sgdHJhY2Ugd2l0aCBsaW5lIGFuZCBjb2x1bW4gbnVtYmVyc1xuICogICAtIFNhZmFyaTogICBsaW5lIGFuZCBjb2x1bW4gbnVtYmVyIGZvciB0aGUgdG9wbW9zdCBzdGFja3RyYWNlIGVsZW1lbnRcbiAqICAgICAgICAgICAgICAgb25seVxuICogICAtIElFOiAgICAgICBubyBsaW5lIG51bWJlcnMgd2hhdHNvZXZlclxuICpcbiAqIFRyaWVzIHRvIGd1ZXNzIG5hbWVzIG9mIGFub255bW91cyBmdW5jdGlvbnMgYnkgbG9va2luZyBmb3IgYXNzaWdubWVudHNcbiAqIGluIHRoZSBzb3VyY2UgY29kZS4gSW4gSUUgYW5kIFNhZmFyaSwgd2UgaGF2ZSB0byBndWVzcyBzb3VyY2UgZmlsZSBuYW1lc1xuICogYnkgc2VhcmNoaW5nIGZvciBmdW5jdGlvbiBib2RpZXMgaW5zaWRlIGFsbCBwYWdlIHNjcmlwdHMuIFRoaXMgd2lsbCBub3RcbiAqIHdvcmsgZm9yIHNjcmlwdHMgdGhhdCBhcmUgbG9hZGVkIGNyb3NzLWRvbWFpbi5cbiAqIEhlcmUgYmUgZHJhZ29uczogc29tZSBmdW5jdGlvbiBuYW1lcyBtYXkgYmUgZ3Vlc3NlZCBpbmNvcnJlY3RseSwgYW5kXG4gKiBkdXBsaWNhdGUgZnVuY3Rpb25zIG1heSBiZSBtaXNtYXRjaGVkLlxuICpcbiAqIFRyYWNlS2l0LmNvbXB1dGVTdGFja1RyYWNlIHNob3VsZCBvbmx5IGJlIHVzZWQgZm9yIHRyYWNpbmcgcHVycG9zZXMuXG4gKiBMb2dnaW5nIG9mIHVuaGFuZGxlZCBleGNlcHRpb25zIHNob3VsZCBiZSBkb25lIHdpdGggVHJhY2VLaXQucmVwb3J0LFxuICogd2hpY2ggYnVpbGRzIG9uIHRvcCBvZiBUcmFjZUtpdC5jb21wdXRlU3RhY2tUcmFjZSBhbmQgcHJvdmlkZXMgYmV0dGVyXG4gKiBJRSBzdXBwb3J0IGJ5IHV0aWxpemluZyB0aGUgd2luZG93Lm9uZXJyb3IgZXZlbnQgdG8gcmV0cmlldmUgaW5mb3JtYXRpb25cbiAqIGFib3V0IHRoZSB0b3Agb2YgdGhlIHN0YWNrLlxuICpcbiAqIE5vdGU6IEluIElFIGFuZCBTYWZhcmksIG5vIHN0YWNrIHRyYWNlIGlzIHJlY29yZGVkIG9uIHRoZSBFcnJvciBvYmplY3QsXG4gKiBzbyBjb21wdXRlU3RhY2tUcmFjZSBpbnN0ZWFkIHdhbGtzIGl0cyAqb3duKiBjaGFpbiBvZiBjYWxsZXJzLlxuICogVGhpcyBtZWFucyB0aGF0OlxuICogICogaW4gU2FmYXJpLCBzb21lIG1ldGhvZHMgbWF5IGJlIG1pc3NpbmcgZnJvbSB0aGUgc3RhY2sgdHJhY2U7XG4gKiAgKiBpbiBJRSwgdGhlIHRvcG1vc3QgZnVuY3Rpb24gaW4gdGhlIHN0YWNrIHRyYWNlIHdpbGwgYWx3YXlzIGJlIHRoZVxuICogICAgY2FsbGVyIG9mIGNvbXB1dGVTdGFja1RyYWNlLlxuICpcbiAqIFRoaXMgaXMgb2theSBmb3IgdHJhY2luZyAoYmVjYXVzZSB5b3UgYXJlIGxpa2VseSB0byBiZSBjYWxsaW5nXG4gKiBjb21wdXRlU3RhY2tUcmFjZSBmcm9tIHRoZSBmdW5jdGlvbiB5b3Ugd2FudCB0byBiZSB0aGUgdG9wbW9zdCBlbGVtZW50XG4gKiBvZiB0aGUgc3RhY2sgdHJhY2UgYW55d2F5KSwgYnV0IG5vdCBva2F5IGZvciBsb2dnaW5nIHVuaGFuZGxlZFxuICogZXhjZXB0aW9ucyAoYmVjYXVzZSB5b3VyIGNhdGNoIGJsb2NrIHdpbGwgbGlrZWx5IGJlIGZhciBhd2F5IGZyb20gdGhlXG4gKiBpbm5lciBmdW5jdGlvbiB0aGF0IGFjdHVhbGx5IGNhdXNlZCB0aGUgZXhjZXB0aW9uKS5cbiAqXG4gKi9cblRyYWNlS2l0LmNvbXB1dGVTdGFja1RyYWNlID0gKGZ1bmN0aW9uIGNvbXB1dGVTdGFja1RyYWNlV3JhcHBlcigpIHtcbiAgICB2YXIgZGVidWcgPSBmYWxzZSxcbiAgICAgICAgc291cmNlQ2FjaGUgPSB7fTtcblxuICAgIC8qKlxuICAgICAqIEF0dGVtcHRzIHRvIHJldHJpZXZlIHNvdXJjZSBjb2RlIHZpYSBYTUxIdHRwUmVxdWVzdCwgd2hpY2ggaXMgdXNlZFxuICAgICAqIHRvIGxvb2sgdXAgYW5vbnltb3VzIGZ1bmN0aW9uIG5hbWVzLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVVJMIG9mIHNvdXJjZSBjb2RlLlxuICAgICAqIEByZXR1cm4ge3N0cmluZ30gU291cmNlIGNvbnRlbnRzLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGxvYWRTb3VyY2UodXJsKSB7XG4gICAgICAgIGlmICghVHJhY2VLaXQucmVtb3RlRmV0Y2hpbmcpIHsgLy9Pbmx5IGF0dGVtcHQgcmVxdWVzdCBpZiByZW1vdGVGZXRjaGluZyBpcyBvbi5cbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIGdldFhIUiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgd2luZG93LlhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBleHBsaWNpdGx5IGJ1YmJsZSB1cCB0aGUgZXhjZXB0aW9uIGlmIG5vdCBmb3VuZFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHdpbmRvdy5BY3RpdmVYT2JqZWN0KCdNaWNyb3NvZnQuWE1MSFRUUCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZhciByZXF1ZXN0ID0gZ2V0WEhSKCk7XG4gICAgICAgICAgICByZXF1ZXN0Lm9wZW4oJ0dFVCcsIHVybCwgZmFsc2UpO1xuICAgICAgICAgICAgcmVxdWVzdC5zZW5kKCcnKTtcbiAgICAgICAgICAgIHJldHVybiByZXF1ZXN0LnJlc3BvbnNlVGV4dDtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0cmlldmVzIHNvdXJjZSBjb2RlIGZyb20gdGhlIHNvdXJjZSBjb2RlIGNhY2hlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVVJMIG9mIHNvdXJjZSBjb2RlLlxuICAgICAqIEByZXR1cm4ge0FycmF5LjxzdHJpbmc+fSBTb3VyY2UgY29udGVudHMuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0U291cmNlKHVybCkge1xuICAgICAgICBpZiAoIWlzU3RyaW5nKHVybCkpIHJldHVybiBbXTtcbiAgICAgICAgaWYgKCFoYXNLZXkoc291cmNlQ2FjaGUsIHVybCkpIHtcbiAgICAgICAgICAgIC8vIFVSTCBuZWVkcyB0byBiZSBhYmxlIHRvIGZldGNoZWQgd2l0aGluIHRoZSBhY2NlcHRhYmxlIGRvbWFpbi4gIE90aGVyd2lzZSxcbiAgICAgICAgICAgIC8vIGNyb3NzLWRvbWFpbiBlcnJvcnMgd2lsbCBiZSB0cmlnZ2VyZWQuXG4gICAgICAgICAgICB2YXIgc291cmNlID0gJyc7XG4gICAgICAgICAgICBpZiAodXJsLmluZGV4T2YoZG9jdW1lbnQuZG9tYWluKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBzb3VyY2UgPSBsb2FkU291cmNlKHVybCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzb3VyY2VDYWNoZVt1cmxdID0gc291cmNlID8gc291cmNlLnNwbGl0KCdcXG4nKSA6IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNvdXJjZUNhY2hlW3VybF07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZXMgdG8gdXNlIGFuIGV4dGVybmFsbHkgbG9hZGVkIGNvcHkgb2Ygc291cmNlIGNvZGUgdG8gZGV0ZXJtaW5lXG4gICAgICogdGhlIG5hbWUgb2YgYSBmdW5jdGlvbiBieSBsb29raW5nIGF0IHRoZSBuYW1lIG9mIHRoZSB2YXJpYWJsZSBpdCB3YXNcbiAgICAgKiBhc3NpZ25lZCB0bywgaWYgYW55LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVVJMIG9mIHNvdXJjZSBjb2RlLlxuICAgICAqIEBwYXJhbSB7KHN0cmluZ3xudW1iZXIpfSBsaW5lTm8gTGluZSBudW1iZXIgaW4gc291cmNlIGNvZGUuXG4gICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgZnVuY3Rpb24gbmFtZSwgaWYgZGlzY292ZXJhYmxlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGd1ZXNzRnVuY3Rpb25OYW1lKHVybCwgbGluZU5vKSB7XG4gICAgICAgIHZhciByZUZ1bmN0aW9uQXJnTmFtZXMgPSAvZnVuY3Rpb24gKFteKF0qKVxcKChbXildKilcXCkvLFxuICAgICAgICAgICAgcmVHdWVzc0Z1bmN0aW9uID0gL1snXCJdPyhbMC05QS1aYS16JF9dKylbJ1wiXT9cXHMqWzo9XVxccyooZnVuY3Rpb258ZXZhbHxuZXcgRnVuY3Rpb24pLyxcbiAgICAgICAgICAgIGxpbmUgPSAnJyxcbiAgICAgICAgICAgIG1heExpbmVzID0gMTAsXG4gICAgICAgICAgICBzb3VyY2UgPSBnZXRTb3VyY2UodXJsKSxcbiAgICAgICAgICAgIG07XG5cbiAgICAgICAgaWYgKCFzb3VyY2UubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gVU5LTk9XTl9GVU5DVElPTjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdhbGsgYmFja3dhcmRzIGZyb20gdGhlIGZpcnN0IGxpbmUgaW4gdGhlIGZ1bmN0aW9uIHVudGlsIHdlIGZpbmQgdGhlIGxpbmUgd2hpY2hcbiAgICAgICAgLy8gbWF0Y2hlcyB0aGUgcGF0dGVybiBhYm92ZSwgd2hpY2ggaXMgdGhlIGZ1bmN0aW9uIGRlZmluaXRpb25cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtYXhMaW5lczsgKytpKSB7XG4gICAgICAgICAgICBsaW5lID0gc291cmNlW2xpbmVObyAtIGldICsgbGluZTtcblxuICAgICAgICAgICAgaWYgKCFpc1VuZGVmaW5lZChsaW5lKSkge1xuICAgICAgICAgICAgICAgIGlmICgobSA9IHJlR3Vlc3NGdW5jdGlvbi5leGVjKGxpbmUpKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbVsxXTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKChtID0gcmVGdW5jdGlvbkFyZ05hbWVzLmV4ZWMobGluZSkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtWzFdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBVTktOT1dOX0ZVTkNUSU9OO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHJpZXZlcyB0aGUgc3Vycm91bmRpbmcgbGluZXMgZnJvbSB3aGVyZSBhbiBleGNlcHRpb24gb2NjdXJyZWQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCBVUkwgb2Ygc291cmNlIGNvZGUuXG4gICAgICogQHBhcmFtIHsoc3RyaW5nfG51bWJlcil9IGxpbmUgTGluZSBudW1iZXIgaW4gc291cmNlIGNvZGUgdG8gY2VudHJlXG4gICAgICogYXJvdW5kIGZvciBjb250ZXh0LlxuICAgICAqIEByZXR1cm4gez9BcnJheS48c3RyaW5nPn0gTGluZXMgb2Ygc291cmNlIGNvZGUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2F0aGVyQ29udGV4dCh1cmwsIGxpbmUpIHtcbiAgICAgICAgdmFyIHNvdXJjZSA9IGdldFNvdXJjZSh1cmwpO1xuXG4gICAgICAgIGlmICghc291cmNlLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgY29udGV4dCA9IFtdLFxuICAgICAgICAgICAgLy8gbGluZXNCZWZvcmUgJiBsaW5lc0FmdGVyIGFyZSBpbmNsdXNpdmUgd2l0aCB0aGUgb2ZmZW5kaW5nIGxpbmUuXG4gICAgICAgICAgICAvLyBpZiBsaW5lc09mQ29udGV4dCBpcyBldmVuLCB0aGVyZSB3aWxsIGJlIG9uZSBleHRyYSBsaW5lXG4gICAgICAgICAgICAvLyAgICpiZWZvcmUqIHRoZSBvZmZlbmRpbmcgbGluZS5cbiAgICAgICAgICAgIGxpbmVzQmVmb3JlID0gTWF0aC5mbG9vcihUcmFjZUtpdC5saW5lc09mQ29udGV4dCAvIDIpLFxuICAgICAgICAgICAgLy8gQWRkIG9uZSBleHRyYSBsaW5lIGlmIGxpbmVzT2ZDb250ZXh0IGlzIG9kZFxuICAgICAgICAgICAgbGluZXNBZnRlciA9IGxpbmVzQmVmb3JlICsgKFRyYWNlS2l0LmxpbmVzT2ZDb250ZXh0ICUgMiksXG4gICAgICAgICAgICBzdGFydCA9IE1hdGgubWF4KDAsIGxpbmUgLSBsaW5lc0JlZm9yZSAtIDEpLFxuICAgICAgICAgICAgZW5kID0gTWF0aC5taW4oc291cmNlLmxlbmd0aCwgbGluZSArIGxpbmVzQWZ0ZXIgLSAxKTtcblxuICAgICAgICBsaW5lIC09IDE7IC8vIGNvbnZlcnQgdG8gMC1iYXNlZCBpbmRleFxuXG4gICAgICAgIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKHNvdXJjZVtpXSkpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0LnB1c2goc291cmNlW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb250ZXh0Lmxlbmd0aCA+IDAgPyBjb250ZXh0IDogbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFc2NhcGVzIHNwZWNpYWwgY2hhcmFjdGVycywgZXhjZXB0IGZvciB3aGl0ZXNwYWNlLCBpbiBhIHN0cmluZyB0byBiZVxuICAgICAqIHVzZWQgaW5zaWRlIGEgcmVndWxhciBleHByZXNzaW9uIGFzIGEgc3RyaW5nIGxpdGVyYWwuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRleHQgVGhlIHN0cmluZy5cbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBlc2NhcGVkIHN0cmluZyBsaXRlcmFsLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGVzY2FwZVJlZ0V4cCh0ZXh0KSB7XG4gICAgICAgIHJldHVybiB0ZXh0LnJlcGxhY2UoL1tcXC1cXFtcXF17fSgpKis/LixcXFxcXFxeJHwjXS9nLCAnXFxcXCQmJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXNjYXBlcyBzcGVjaWFsIGNoYXJhY3RlcnMgaW4gYSBzdHJpbmcgdG8gYmUgdXNlZCBpbnNpZGUgYSByZWd1bGFyXG4gICAgICogZXhwcmVzc2lvbiBhcyBhIHN0cmluZyBsaXRlcmFsLiBBbHNvIGVuc3VyZXMgdGhhdCBIVE1MIGVudGl0aWVzIHdpbGxcbiAgICAgKiBiZSBtYXRjaGVkIHRoZSBzYW1lIGFzIHRoZWlyIGxpdGVyYWwgZnJpZW5kcy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYm9keSBUaGUgc3RyaW5nLlxuICAgICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIGVzY2FwZWQgc3RyaW5nLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGVzY2FwZUNvZGVBc1JlZ0V4cEZvck1hdGNoaW5nSW5zaWRlSFRNTChib2R5KSB7XG4gICAgICAgIHJldHVybiBlc2NhcGVSZWdFeHAoYm9keSkucmVwbGFjZSgnPCcsICcoPzo8fCZsdDspJykucmVwbGFjZSgnPicsICcoPzo+fCZndDspJykucmVwbGFjZSgnJicsICcoPzomfCZhbXA7KScpLnJlcGxhY2UoJ1wiJywgJyg/OlwifCZxdW90OyknKS5yZXBsYWNlKC9cXHMrL2csICdcXFxccysnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIHdoZXJlIGEgY29kZSBmcmFnbWVudCBvY2N1cnMgaW4gdGhlIHNvdXJjZSBjb2RlLlxuICAgICAqIEBwYXJhbSB7UmVnRXhwfSByZSBUaGUgZnVuY3Rpb24gZGVmaW5pdGlvbi5cbiAgICAgKiBAcGFyYW0ge0FycmF5LjxzdHJpbmc+fSB1cmxzIEEgbGlzdCBvZiBVUkxzIHRvIHNlYXJjaC5cbiAgICAgKiBAcmV0dXJuIHs/T2JqZWN0LjxzdHJpbmcsIChzdHJpbmd8bnVtYmVyKT59IEFuIG9iamVjdCBjb250YWluaW5nXG4gICAgICogdGhlIHVybCwgbGluZSwgYW5kIGNvbHVtbiBudW1iZXIgb2YgdGhlIGRlZmluZWQgZnVuY3Rpb24uXG4gICAgICovXG4gICAgZnVuY3Rpb24gZmluZFNvdXJjZUluVXJscyhyZSwgdXJscykge1xuICAgICAgICB2YXIgc291cmNlLCBtO1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgaiA9IHVybHMubGVuZ3RoOyBpIDwgajsgKytpKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnc2VhcmNoaW5nJywgdXJsc1tpXSk7XG4gICAgICAgICAgICBpZiAoKHNvdXJjZSA9IGdldFNvdXJjZSh1cmxzW2ldKSkubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgc291cmNlID0gc291cmNlLmpvaW4oJ1xcbicpO1xuICAgICAgICAgICAgICAgIGlmICgobSA9IHJlLmV4ZWMoc291cmNlKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ0ZvdW5kIGZ1bmN0aW9uIGluICcgKyB1cmxzW2ldKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VybCc6IHVybHNbaV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnbGluZSc6IHNvdXJjZS5zdWJzdHJpbmcoMCwgbS5pbmRleCkuc3BsaXQoJ1xcbicpLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICdjb2x1bW4nOiBtLmluZGV4IC0gc291cmNlLmxhc3RJbmRleE9mKCdcXG4nLCBtLmluZGV4KSAtIDFcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjb25zb2xlLmxvZygnbm8gbWF0Y2gnKTtcblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIGF0IHdoaWNoIGNvbHVtbiBhIGNvZGUgZnJhZ21lbnQgb2NjdXJzIG9uIGEgbGluZSBvZiB0aGVcbiAgICAgKiBzb3VyY2UgY29kZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZnJhZ21lbnQgVGhlIGNvZGUgZnJhZ21lbnQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHNlYXJjaC5cbiAgICAgKiBAcGFyYW0geyhzdHJpbmd8bnVtYmVyKX0gbGluZSBUaGUgbGluZSBudW1iZXIgdG8gZXhhbWluZS5cbiAgICAgKiBAcmV0dXJuIHs/bnVtYmVyfSBUaGUgY29sdW1uIG51bWJlci5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBmaW5kU291cmNlSW5MaW5lKGZyYWdtZW50LCB1cmwsIGxpbmUpIHtcbiAgICAgICAgdmFyIHNvdXJjZSA9IGdldFNvdXJjZSh1cmwpLFxuICAgICAgICAgICAgcmUgPSBuZXcgUmVnRXhwKCdcXFxcYicgKyBlc2NhcGVSZWdFeHAoZnJhZ21lbnQpICsgJ1xcXFxiJyksXG4gICAgICAgICAgICBtO1xuXG4gICAgICAgIGxpbmUgLT0gMTtcblxuICAgICAgICBpZiAoc291cmNlICYmIHNvdXJjZS5sZW5ndGggPiBsaW5lICYmIChtID0gcmUuZXhlYyhzb3VyY2VbbGluZV0pKSkge1xuICAgICAgICAgICAgcmV0dXJuIG0uaW5kZXg7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIHdoZXJlIGEgZnVuY3Rpb24gd2FzIGRlZmluZWQgd2l0aGluIHRoZSBzb3VyY2UgY29kZS5cbiAgICAgKiBAcGFyYW0geyhGdW5jdGlvbnxzdHJpbmcpfSBmdW5jIEEgZnVuY3Rpb24gcmVmZXJlbmNlIG9yIHNlcmlhbGl6ZWRcbiAgICAgKiBmdW5jdGlvbiBkZWZpbml0aW9uLlxuICAgICAqIEByZXR1cm4gez9PYmplY3QuPHN0cmluZywgKHN0cmluZ3xudW1iZXIpPn0gQW4gb2JqZWN0IGNvbnRhaW5pbmdcbiAgICAgKiB0aGUgdXJsLCBsaW5lLCBhbmQgY29sdW1uIG51bWJlciBvZiB0aGUgZGVmaW5lZCBmdW5jdGlvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBmaW5kU291cmNlQnlGdW5jdGlvbkJvZHkoZnVuYykge1xuICAgICAgICB2YXIgdXJscyA9IFt3aW5kb3cubG9jYXRpb24uaHJlZl0sXG4gICAgICAgICAgICBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpLFxuICAgICAgICAgICAgYm9keSxcbiAgICAgICAgICAgIGNvZGUgPSAnJyArIGZ1bmMsXG4gICAgICAgICAgICBjb2RlUkUgPSAvXmZ1bmN0aW9uKD86XFxzKyhbXFx3JF0rKSk/XFxzKlxcKChbXFx3XFxzLF0qKVxcKVxccypcXHtcXHMqKFxcU1tcXHNcXFNdKlxcUylcXHMqXFx9XFxzKiQvLFxuICAgICAgICAgICAgZXZlbnRSRSA9IC9eZnVuY3Rpb24gb24oW1xcdyRdKylcXHMqXFwoZXZlbnRcXClcXHMqXFx7XFxzKihcXFNbXFxzXFxTXSpcXFMpXFxzKlxcfVxccyokLyxcbiAgICAgICAgICAgIHJlLFxuICAgICAgICAgICAgcGFydHMsXG4gICAgICAgICAgICByZXN1bHQ7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzY3JpcHRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICB2YXIgc2NyaXB0ID0gc2NyaXB0c1tpXTtcbiAgICAgICAgICAgIGlmIChzY3JpcHQuc3JjKSB7XG4gICAgICAgICAgICAgICAgdXJscy5wdXNoKHNjcmlwdC5zcmMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCEocGFydHMgPSBjb2RlUkUuZXhlYyhjb2RlKSkpIHtcbiAgICAgICAgICAgIHJlID0gbmV3IFJlZ0V4cChlc2NhcGVSZWdFeHAoY29kZSkucmVwbGFjZSgvXFxzKy9nLCAnXFxcXHMrJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbm90IHN1cmUgaWYgdGhpcyBpcyByZWFsbHkgbmVjZXNzYXJ5LCBidXQgSSBkb27igJl0IGhhdmUgYSB0ZXN0XG4gICAgICAgIC8vIGNvcnB1cyBsYXJnZSBlbm91Z2ggdG8gY29uZmlybSB0aGF0IGFuZCBpdCB3YXMgaW4gdGhlIG9yaWdpbmFsLlxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBuYW1lID0gcGFydHNbMV0gPyAnXFxcXHMrJyArIHBhcnRzWzFdIDogJycsXG4gICAgICAgICAgICAgICAgYXJncyA9IHBhcnRzWzJdLnNwbGl0KCcsJykuam9pbignXFxcXHMqLFxcXFxzKicpO1xuXG4gICAgICAgICAgICBib2R5ID0gZXNjYXBlUmVnRXhwKHBhcnRzWzNdKS5yZXBsYWNlKC87JC8sICc7PycpOyAvLyBzZW1pY29sb24gaXMgaW5zZXJ0ZWQgaWYgdGhlIGZ1bmN0aW9uIGVuZHMgd2l0aCBhIGNvbW1lbnQucmVwbGFjZSgvXFxzKy9nLCAnXFxcXHMrJyk7XG4gICAgICAgICAgICByZSA9IG5ldyBSZWdFeHAoJ2Z1bmN0aW9uJyArIG5hbWUgKyAnXFxcXHMqXFxcXChcXFxccyonICsgYXJncyArICdcXFxccypcXFxcKVxcXFxzKntcXFxccyonICsgYm9keSArICdcXFxccyp9Jyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBsb29rIGZvciBhIG5vcm1hbCBmdW5jdGlvbiBkZWZpbml0aW9uXG4gICAgICAgIGlmICgocmVzdWx0ID0gZmluZFNvdXJjZUluVXJscyhyZSwgdXJscykpKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbG9vayBmb3IgYW4gb2xkLXNjaG9vbCBldmVudCBoYW5kbGVyIGZ1bmN0aW9uXG4gICAgICAgIGlmICgocGFydHMgPSBldmVudFJFLmV4ZWMoY29kZSkpKSB7XG4gICAgICAgICAgICB2YXIgZXZlbnQgPSBwYXJ0c1sxXTtcbiAgICAgICAgICAgIGJvZHkgPSBlc2NhcGVDb2RlQXNSZWdFeHBGb3JNYXRjaGluZ0luc2lkZUhUTUwocGFydHNbMl0pO1xuXG4gICAgICAgICAgICAvLyBsb29rIGZvciBhIGZ1bmN0aW9uIGRlZmluZWQgaW4gSFRNTCBhcyBhbiBvblhYWCBoYW5kbGVyXG4gICAgICAgICAgICByZSA9IG5ldyBSZWdFeHAoJ29uJyArIGV2ZW50ICsgJz1bXFxcXFxcJ1wiXVxcXFxzKicgKyBib2R5ICsgJ1xcXFxzKltcXFxcXFwnXCJdJywgJ2knKTtcblxuICAgICAgICAgICAgaWYgKChyZXN1bHQgPSBmaW5kU291cmNlSW5VcmxzKHJlLCB1cmxzWzBdKSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBsb29rIGZvciA/Pz9cbiAgICAgICAgICAgIHJlID0gbmV3IFJlZ0V4cChib2R5KTtcblxuICAgICAgICAgICAgaWYgKChyZXN1bHQgPSBmaW5kU291cmNlSW5VcmxzKHJlLCB1cmxzKSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gQ29udGVudHMgb2YgRXhjZXB0aW9uIGluIHZhcmlvdXMgYnJvd3NlcnMuXG4gICAgLy9cbiAgICAvLyBTQUZBUkk6XG4gICAgLy8gZXgubWVzc2FnZSA9IENhbid0IGZpbmQgdmFyaWFibGU6IHFxXG4gICAgLy8gZXgubGluZSA9IDU5XG4gICAgLy8gZXguc291cmNlSWQgPSA1ODAyMzgxOTJcbiAgICAvLyBleC5zb3VyY2VVUkwgPSBodHRwOi8vLi4uXG4gICAgLy8gZXguZXhwcmVzc2lvbkJlZ2luT2Zmc2V0ID0gOTZcbiAgICAvLyBleC5leHByZXNzaW9uQ2FyZXRPZmZzZXQgPSA5OFxuICAgIC8vIGV4LmV4cHJlc3Npb25FbmRPZmZzZXQgPSA5OFxuICAgIC8vIGV4Lm5hbWUgPSBSZWZlcmVuY2VFcnJvclxuICAgIC8vXG4gICAgLy8gRklSRUZPWDpcbiAgICAvLyBleC5tZXNzYWdlID0gcXEgaXMgbm90IGRlZmluZWRcbiAgICAvLyBleC5maWxlTmFtZSA9IGh0dHA6Ly8uLi5cbiAgICAvLyBleC5saW5lTnVtYmVyID0gNTlcbiAgICAvLyBleC5jb2x1bW5OdW1iZXIgPSA2OVxuICAgIC8vIGV4LnN0YWNrID0gLi4uc3RhY2sgdHJhY2UuLi4gKHNlZSB0aGUgZXhhbXBsZSBiZWxvdylcbiAgICAvLyBleC5uYW1lID0gUmVmZXJlbmNlRXJyb3JcbiAgICAvL1xuICAgIC8vIENIUk9NRTpcbiAgICAvLyBleC5tZXNzYWdlID0gcXEgaXMgbm90IGRlZmluZWRcbiAgICAvLyBleC5uYW1lID0gUmVmZXJlbmNlRXJyb3JcbiAgICAvLyBleC50eXBlID0gbm90X2RlZmluZWRcbiAgICAvLyBleC5hcmd1bWVudHMgPSBbJ2FhJ11cbiAgICAvLyBleC5zdGFjayA9IC4uLnN0YWNrIHRyYWNlLi4uXG4gICAgLy9cbiAgICAvLyBJTlRFUk5FVCBFWFBMT1JFUjpcbiAgICAvLyBleC5tZXNzYWdlID0gLi4uXG4gICAgLy8gZXgubmFtZSA9IFJlZmVyZW5jZUVycm9yXG4gICAgLy9cbiAgICAvLyBPUEVSQTpcbiAgICAvLyBleC5tZXNzYWdlID0gLi4ubWVzc2FnZS4uLiAoc2VlIHRoZSBleGFtcGxlIGJlbG93KVxuICAgIC8vIGV4Lm5hbWUgPSBSZWZlcmVuY2VFcnJvclxuICAgIC8vIGV4Lm9wZXJhI3NvdXJjZWxvYyA9IDExICAocHJldHR5IG11Y2ggdXNlbGVzcywgZHVwbGljYXRlcyB0aGUgaW5mbyBpbiBleC5tZXNzYWdlKVxuICAgIC8vIGV4LnN0YWNrdHJhY2UgPSBuL2E7IHNlZSAnb3BlcmE6Y29uZmlnI1VzZXJQcmVmc3xFeGNlcHRpb25zIEhhdmUgU3RhY2t0cmFjZSdcblxuICAgIC8qKlxuICAgICAqIENvbXB1dGVzIHN0YWNrIHRyYWNlIGluZm9ybWF0aW9uIGZyb20gdGhlIHN0YWNrIHByb3BlcnR5LlxuICAgICAqIENocm9tZSBhbmQgR2Vja28gdXNlIHRoaXMgcHJvcGVydHkuXG4gICAgICogQHBhcmFtIHtFcnJvcn0gZXhcbiAgICAgKiBAcmV0dXJuIHs/T2JqZWN0LjxzdHJpbmcsICo+fSBTdGFjayB0cmFjZSBpbmZvcm1hdGlvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjb21wdXRlU3RhY2tUcmFjZUZyb21TdGFja1Byb3AoZXgpIHtcbiAgICAgICAgaWYgKCFleC5zdGFjaykge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgY2hyb21lID0gL15cXHMqYXQgKC4qPykgP1xcKD8oKD86ZmlsZXxodHRwcz98Y2hyb21lLWV4dGVuc2lvbik6Lio/KTooXFxkKykoPzo6KFxcZCspKT9cXCk/XFxzKiQvaSxcbiAgICAgICAgICAgIGdlY2tvID0gL15cXHMqKC4qPykoPzpcXCgoLio/KVxcKSk/QCgoPzpmaWxlfGh0dHBzP3xjaHJvbWUpLio/KTooXFxkKykoPzo6KFxcZCspKT9cXHMqJC9pLFxuICAgICAgICAgICAgbGluZXMgPSBleC5zdGFjay5zcGxpdCgnXFxuJyksXG4gICAgICAgICAgICBzdGFjayA9IFtdLFxuICAgICAgICAgICAgcGFydHMsXG4gICAgICAgICAgICBlbGVtZW50LFxuICAgICAgICAgICAgcmVmZXJlbmNlID0gL14oLiopIGlzIHVuZGVmaW5lZCQvLmV4ZWMoZXgubWVzc2FnZSk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGogPSBsaW5lcy5sZW5ndGg7IGkgPCBqOyArK2kpIHtcbiAgICAgICAgICAgIGlmICgocGFydHMgPSBnZWNrby5leGVjKGxpbmVzW2ldKSkpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0ge1xuICAgICAgICAgICAgICAgICAgICAndXJsJzogcGFydHNbM10sXG4gICAgICAgICAgICAgICAgICAgICdmdW5jJzogcGFydHNbMV0gfHwgVU5LTk9XTl9GVU5DVElPTixcbiAgICAgICAgICAgICAgICAgICAgJ2FyZ3MnOiBwYXJ0c1syXSA/IHBhcnRzWzJdLnNwbGl0KCcsJykgOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgJ2xpbmUnOiArcGFydHNbNF0sXG4gICAgICAgICAgICAgICAgICAgICdjb2x1bW4nOiBwYXJ0c1s1XSA/ICtwYXJ0c1s1XSA6IG51bGxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSBlbHNlIGlmICgocGFydHMgPSBjaHJvbWUuZXhlYyhsaW5lc1tpXSkpKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IHtcbiAgICAgICAgICAgICAgICAgICAgJ3VybCc6IHBhcnRzWzJdLFxuICAgICAgICAgICAgICAgICAgICAnZnVuYyc6IHBhcnRzWzFdIHx8IFVOS05PV05fRlVOQ1RJT04sXG4gICAgICAgICAgICAgICAgICAgICdsaW5lJzogK3BhcnRzWzNdLFxuICAgICAgICAgICAgICAgICAgICAnY29sdW1uJzogcGFydHNbNF0gPyArcGFydHNbNF0gOiBudWxsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghZWxlbWVudC5mdW5jICYmIGVsZW1lbnQubGluZSkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuZnVuYyA9IGd1ZXNzRnVuY3Rpb25OYW1lKGVsZW1lbnQudXJsLCBlbGVtZW50LmxpbmUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZWxlbWVudC5saW5lKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5jb250ZXh0ID0gZ2F0aGVyQ29udGV4dChlbGVtZW50LnVybCwgZWxlbWVudC5saW5lKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3RhY2sucHVzaChlbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghc3RhY2subGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdGFja1swXS5saW5lICYmICFzdGFja1swXS5jb2x1bW4gJiYgcmVmZXJlbmNlKSB7XG4gICAgICAgICAgICBzdGFja1swXS5jb2x1bW4gPSBmaW5kU291cmNlSW5MaW5lKHJlZmVyZW5jZVsxXSwgc3RhY2tbMF0udXJsLCBzdGFja1swXS5saW5lKTtcbiAgICAgICAgfSBlbHNlIGlmICghc3RhY2tbMF0uY29sdW1uICYmICFpc1VuZGVmaW5lZChleC5jb2x1bW5OdW1iZXIpKSB7XG4gICAgICAgICAgICAvLyBGaXJlRm94IHVzZXMgdGhpcyBhd2Vzb21lIGNvbHVtbk51bWJlciBwcm9wZXJ0eSBmb3IgaXRzIHRvcCBmcmFtZVxuICAgICAgICAgICAgLy8gQWxzbyBub3RlLCBGaXJlZm94J3MgY29sdW1uIG51bWJlciBpcyAwLWJhc2VkIGFuZCBldmVyeXRoaW5nIGVsc2UgZXhwZWN0cyAxLWJhc2VkLFxuICAgICAgICAgICAgLy8gc28gYWRkaW5nIDFcbiAgICAgICAgICAgIHN0YWNrWzBdLmNvbHVtbiA9IGV4LmNvbHVtbk51bWJlciArIDE7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ25hbWUnOiBleC5uYW1lLFxuICAgICAgICAgICAgJ21lc3NhZ2UnOiBleC5tZXNzYWdlLFxuICAgICAgICAgICAgJ3VybCc6IGRvY3VtZW50LmxvY2F0aW9uLmhyZWYsXG4gICAgICAgICAgICAnc3RhY2snOiBzdGFja1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbXB1dGVzIHN0YWNrIHRyYWNlIGluZm9ybWF0aW9uIGZyb20gdGhlIHN0YWNrdHJhY2UgcHJvcGVydHkuXG4gICAgICogT3BlcmEgMTAgdXNlcyB0aGlzIHByb3BlcnR5LlxuICAgICAqIEBwYXJhbSB7RXJyb3J9IGV4XG4gICAgICogQHJldHVybiB7P09iamVjdC48c3RyaW5nLCAqPn0gU3RhY2sgdHJhY2UgaW5mb3JtYXRpb24uXG4gICAgICovXG4gICAgZnVuY3Rpb24gY29tcHV0ZVN0YWNrVHJhY2VGcm9tU3RhY2t0cmFjZVByb3AoZXgpIHtcbiAgICAgICAgLy8gQWNjZXNzIGFuZCBzdG9yZSB0aGUgc3RhY2t0cmFjZSBwcm9wZXJ0eSBiZWZvcmUgZG9pbmcgQU5ZVEhJTkdcbiAgICAgICAgLy8gZWxzZSB0byBpdCBiZWNhdXNlIE9wZXJhIGlzIG5vdCB2ZXJ5IGdvb2QgYXQgcHJvdmlkaW5nIGl0XG4gICAgICAgIC8vIHJlbGlhYmx5IGluIG90aGVyIGNpcmN1bXN0YW5jZXMuXG4gICAgICAgIHZhciBzdGFja3RyYWNlID0gZXguc3RhY2t0cmFjZTtcblxuICAgICAgICB2YXIgdGVzdFJFID0gLyBsaW5lIChcXGQrKSwgY29sdW1uIChcXGQrKSBpbiAoPzo8YW5vbnltb3VzIGZ1bmN0aW9uOiAoW14+XSspPnwoW15cXCldKykpXFwoKC4qKVxcKSBpbiAoLiopOlxccyokL2ksXG4gICAgICAgICAgICBsaW5lcyA9IHN0YWNrdHJhY2Uuc3BsaXQoJ1xcbicpLFxuICAgICAgICAgICAgc3RhY2sgPSBbXSxcbiAgICAgICAgICAgIHBhcnRzO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBqID0gbGluZXMubGVuZ3RoOyBpIDwgajsgaSArPSAyKSB7XG4gICAgICAgICAgICBpZiAoKHBhcnRzID0gdGVzdFJFLmV4ZWMobGluZXNbaV0pKSkge1xuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50ID0ge1xuICAgICAgICAgICAgICAgICAgICAnbGluZSc6ICtwYXJ0c1sxXSxcbiAgICAgICAgICAgICAgICAgICAgJ2NvbHVtbic6ICtwYXJ0c1syXSxcbiAgICAgICAgICAgICAgICAgICAgJ2Z1bmMnOiBwYXJ0c1szXSB8fCBwYXJ0c1s0XSxcbiAgICAgICAgICAgICAgICAgICAgJ2FyZ3MnOiBwYXJ0c1s1XSA/IHBhcnRzWzVdLnNwbGl0KCcsJykgOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgJ3VybCc6IHBhcnRzWzZdXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGlmICghZWxlbWVudC5mdW5jICYmIGVsZW1lbnQubGluZSkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmZ1bmMgPSBndWVzc0Z1bmN0aW9uTmFtZShlbGVtZW50LnVybCwgZWxlbWVudC5saW5lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQubGluZSkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5jb250ZXh0ID0gZ2F0aGVyQ29udGV4dChlbGVtZW50LnVybCwgZWxlbWVudC5saW5lKTtcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXhjKSB7fVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghZWxlbWVudC5jb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuY29udGV4dCA9IFtsaW5lc1tpICsgMV1dO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHN0YWNrLnB1c2goZWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXN0YWNrLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ25hbWUnOiBleC5uYW1lLFxuICAgICAgICAgICAgJ21lc3NhZ2UnOiBleC5tZXNzYWdlLFxuICAgICAgICAgICAgJ3VybCc6IGRvY3VtZW50LmxvY2F0aW9uLmhyZWYsXG4gICAgICAgICAgICAnc3RhY2snOiBzdGFja1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE5PVCBURVNURUQuXG4gICAgICogQ29tcHV0ZXMgc3RhY2sgdHJhY2UgaW5mb3JtYXRpb24gZnJvbSBhbiBlcnJvciBtZXNzYWdlIHRoYXQgaW5jbHVkZXNcbiAgICAgKiB0aGUgc3RhY2sgdHJhY2UuXG4gICAgICogT3BlcmEgOSBhbmQgZWFybGllciB1c2UgdGhpcyBtZXRob2QgaWYgdGhlIG9wdGlvbiB0byBzaG93IHN0YWNrXG4gICAgICogdHJhY2VzIGlzIHR1cm5lZCBvbiBpbiBvcGVyYTpjb25maWcuXG4gICAgICogQHBhcmFtIHtFcnJvcn0gZXhcbiAgICAgKiBAcmV0dXJuIHs/T2JqZWN0LjxzdHJpbmcsICo+fSBTdGFjayBpbmZvcm1hdGlvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjb21wdXRlU3RhY2tUcmFjZUZyb21PcGVyYU11bHRpTGluZU1lc3NhZ2UoZXgpIHtcbiAgICAgICAgLy8gT3BlcmEgaW5jbHVkZXMgYSBzdGFjayB0cmFjZSBpbnRvIHRoZSBleGNlcHRpb24gbWVzc2FnZS4gQW4gZXhhbXBsZSBpczpcbiAgICAgICAgLy9cbiAgICAgICAgLy8gU3RhdGVtZW50IG9uIGxpbmUgMzogVW5kZWZpbmVkIHZhcmlhYmxlOiB1bmRlZmluZWRGdW5jXG4gICAgICAgIC8vIEJhY2t0cmFjZTpcbiAgICAgICAgLy8gICBMaW5lIDMgb2YgbGlua2VkIHNjcmlwdCBmaWxlOi8vbG9jYWxob3N0L1VzZXJzL2FuZHJleXZpdC9Qcm9qZWN0cy9UcmFjZUtpdC9qYXZhc2NyaXB0LWNsaWVudC9zYW1wbGUuanM6IEluIGZ1bmN0aW9uIHp6elxuICAgICAgICAvLyAgICAgICAgIHVuZGVmaW5lZEZ1bmMoYSk7XG4gICAgICAgIC8vICAgTGluZSA3IG9mIGlubGluZSMxIHNjcmlwdCBpbiBmaWxlOi8vbG9jYWxob3N0L1VzZXJzL2FuZHJleXZpdC9Qcm9qZWN0cy9UcmFjZUtpdC9qYXZhc2NyaXB0LWNsaWVudC9zYW1wbGUuaHRtbDogSW4gZnVuY3Rpb24geXl5XG4gICAgICAgIC8vICAgICAgICAgICB6enooeCwgeSwgeik7XG4gICAgICAgIC8vICAgTGluZSAzIG9mIGlubGluZSMxIHNjcmlwdCBpbiBmaWxlOi8vbG9jYWxob3N0L1VzZXJzL2FuZHJleXZpdC9Qcm9qZWN0cy9UcmFjZUtpdC9qYXZhc2NyaXB0LWNsaWVudC9zYW1wbGUuaHRtbDogSW4gZnVuY3Rpb24geHh4XG4gICAgICAgIC8vICAgICAgICAgICB5eXkoYSwgYSwgYSk7XG4gICAgICAgIC8vICAgTGluZSAxIG9mIGZ1bmN0aW9uIHNjcmlwdFxuICAgICAgICAvLyAgICAgdHJ5IHsgeHh4KCdoaScpOyByZXR1cm4gZmFsc2U7IH0gY2F0Y2goZXgpIHsgVHJhY2VLaXQucmVwb3J0KGV4KTsgfVxuICAgICAgICAvLyAgIC4uLlxuXG4gICAgICAgIHZhciBsaW5lcyA9IGV4Lm1lc3NhZ2Uuc3BsaXQoJ1xcbicpO1xuICAgICAgICBpZiAobGluZXMubGVuZ3RoIDwgNCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbGluZVJFMSA9IC9eXFxzKkxpbmUgKFxcZCspIG9mIGxpbmtlZCBzY3JpcHQgKCg/OmZpbGV8aHR0cHM/KVxcUyspKD86OiBpbiBmdW5jdGlvbiAoXFxTKykpP1xccyokL2ksXG4gICAgICAgICAgICBsaW5lUkUyID0gL15cXHMqTGluZSAoXFxkKykgb2YgaW5saW5lIyhcXGQrKSBzY3JpcHQgaW4gKCg/OmZpbGV8aHR0cHM/KVxcUyspKD86OiBpbiBmdW5jdGlvbiAoXFxTKykpP1xccyokL2ksXG4gICAgICAgICAgICBsaW5lUkUzID0gL15cXHMqTGluZSAoXFxkKykgb2YgZnVuY3Rpb24gc2NyaXB0XFxzKiQvaSxcbiAgICAgICAgICAgIHN0YWNrID0gW10sXG4gICAgICAgICAgICBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpLFxuICAgICAgICAgICAgaW5saW5lU2NyaXB0QmxvY2tzID0gW10sXG4gICAgICAgICAgICBwYXJ0cyxcbiAgICAgICAgICAgIGksXG4gICAgICAgICAgICBsZW4sXG4gICAgICAgICAgICBzb3VyY2U7XG5cbiAgICAgICAgZm9yIChpIGluIHNjcmlwdHMpIHtcbiAgICAgICAgICAgIGlmIChoYXNLZXkoc2NyaXB0cywgaSkgJiYgIXNjcmlwdHNbaV0uc3JjKSB7XG4gICAgICAgICAgICAgICAgaW5saW5lU2NyaXB0QmxvY2tzLnB1c2goc2NyaXB0c1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGkgPSAyLCBsZW4gPSBsaW5lcy5sZW5ndGg7IGkgPCBsZW47IGkgKz0gMikge1xuICAgICAgICAgICAgdmFyIGl0ZW0gPSBudWxsO1xuICAgICAgICAgICAgaWYgKChwYXJ0cyA9IGxpbmVSRTEuZXhlYyhsaW5lc1tpXSkpKSB7XG4gICAgICAgICAgICAgICAgaXRlbSA9IHtcbiAgICAgICAgICAgICAgICAgICAgJ3VybCc6IHBhcnRzWzJdLFxuICAgICAgICAgICAgICAgICAgICAnZnVuYyc6IHBhcnRzWzNdLFxuICAgICAgICAgICAgICAgICAgICAnbGluZSc6ICtwYXJ0c1sxXVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGVsc2UgaWYgKChwYXJ0cyA9IGxpbmVSRTIuZXhlYyhsaW5lc1tpXSkpKSB7XG4gICAgICAgICAgICAgICAgaXRlbSA9IHtcbiAgICAgICAgICAgICAgICAgICAgJ3VybCc6IHBhcnRzWzNdLFxuICAgICAgICAgICAgICAgICAgICAnZnVuYyc6IHBhcnRzWzRdXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB2YXIgcmVsYXRpdmVMaW5lID0gKCtwYXJ0c1sxXSk7IC8vIHJlbGF0aXZlIHRvIHRoZSBzdGFydCBvZiB0aGUgPFNDUklQVD4gYmxvY2tcbiAgICAgICAgICAgICAgICB2YXIgc2NyaXB0ID0gaW5saW5lU2NyaXB0QmxvY2tzW3BhcnRzWzJdIC0gMV07XG4gICAgICAgICAgICAgICAgaWYgKHNjcmlwdCkge1xuICAgICAgICAgICAgICAgICAgICBzb3VyY2UgPSBnZXRTb3VyY2UoaXRlbS51cmwpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2UgPSBzb3VyY2Uuam9pbignXFxuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcG9zID0gc291cmNlLmluZGV4T2Yoc2NyaXB0LmlubmVyVGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocG9zID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmxpbmUgPSByZWxhdGl2ZUxpbmUgKyBzb3VyY2Uuc3Vic3RyaW5nKDAsIHBvcykuc3BsaXQoJ1xcbicpLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKHBhcnRzID0gbGluZVJFMy5leGVjKGxpbmVzW2ldKSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWYucmVwbGFjZSgvIy4qJC8sICcnKSxcbiAgICAgICAgICAgICAgICAgICAgbGluZSA9IHBhcnRzWzFdO1xuICAgICAgICAgICAgICAgIHZhciByZSA9IG5ldyBSZWdFeHAoZXNjYXBlQ29kZUFzUmVnRXhwRm9yTWF0Y2hpbmdJbnNpZGVIVE1MKGxpbmVzW2kgKyAxXSkpO1xuICAgICAgICAgICAgICAgIHNvdXJjZSA9IGZpbmRTb3VyY2VJblVybHMocmUsIFt1cmxdKTtcbiAgICAgICAgICAgICAgICBpdGVtID0ge1xuICAgICAgICAgICAgICAgICAgICAndXJsJzogdXJsLFxuICAgICAgICAgICAgICAgICAgICAnbGluZSc6IHNvdXJjZSA/IHNvdXJjZS5saW5lIDogbGluZSxcbiAgICAgICAgICAgICAgICAgICAgJ2Z1bmMnOiAnJ1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpdGVtLmZ1bmMpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5mdW5jID0gZ3Vlc3NGdW5jdGlvbk5hbWUoaXRlbS51cmwsIGl0ZW0ubGluZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBjb250ZXh0ID0gZ2F0aGVyQ29udGV4dChpdGVtLnVybCwgaXRlbS5saW5lKTtcbiAgICAgICAgICAgICAgICB2YXIgbWlkbGluZSA9IChjb250ZXh0ID8gY29udGV4dFtNYXRoLmZsb29yKGNvbnRleHQubGVuZ3RoIC8gMildIDogbnVsbCk7XG4gICAgICAgICAgICAgICAgaWYgKGNvbnRleHQgJiYgbWlkbGluZS5yZXBsYWNlKC9eXFxzKi8sICcnKSA9PT0gbGluZXNbaSArIDFdLnJlcGxhY2UoL15cXHMqLywgJycpKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgKGNvbnRleHQpIGFsZXJ0KFwiQ29udGV4dCBtaXNtYXRjaC4gQ29ycmVjdCBtaWRsaW5lOlxcblwiICsgbGluZXNbaSsxXSArIFwiXFxuXFxuTWlkbGluZTpcXG5cIiArIG1pZGxpbmUgKyBcIlxcblxcbkNvbnRleHQ6XFxuXCIgKyBjb250ZXh0LmpvaW4oXCJcXG5cIikgKyBcIlxcblxcblVSTDpcXG5cIiArIGl0ZW0udXJsKTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jb250ZXh0ID0gW2xpbmVzW2kgKyAxXV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN0YWNrLnB1c2goaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFzdGFjay5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsOyAvLyBjb3VsZCBub3QgcGFyc2UgbXVsdGlsaW5lIGV4Y2VwdGlvbiBtZXNzYWdlIGFzIE9wZXJhIHN0YWNrIHRyYWNlXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ25hbWUnOiBleC5uYW1lLFxuICAgICAgICAgICAgJ21lc3NhZ2UnOiBsaW5lc1swXSxcbiAgICAgICAgICAgICd1cmwnOiBkb2N1bWVudC5sb2NhdGlvbi5ocmVmLFxuICAgICAgICAgICAgJ3N0YWNrJzogc3RhY2tcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGluZm9ybWF0aW9uIGFib3V0IHRoZSBmaXJzdCBmcmFtZSB0byBpbmNvbXBsZXRlIHN0YWNrIHRyYWNlcy5cbiAgICAgKiBTYWZhcmkgYW5kIElFIHJlcXVpcmUgdGhpcyB0byBnZXQgY29tcGxldGUgZGF0YSBvbiB0aGUgZmlyc3QgZnJhbWUuXG4gICAgICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywgKj59IHN0YWNrSW5mbyBTdGFjayB0cmFjZSBpbmZvcm1hdGlvbiBmcm9tXG4gICAgICogb25lIG9mIHRoZSBjb21wdXRlKiBtZXRob2RzLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIFVSTCBvZiB0aGUgc2NyaXB0IHRoYXQgY2F1c2VkIGFuIGVycm9yLlxuICAgICAqIEBwYXJhbSB7KG51bWJlcnxzdHJpbmcpfSBsaW5lTm8gVGhlIGxpbmUgbnVtYmVyIG9mIHRoZSBzY3JpcHQgdGhhdFxuICAgICAqIGNhdXNlZCBhbiBlcnJvci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZz19IG1lc3NhZ2UgVGhlIGVycm9yIGdlbmVyYXRlZCBieSB0aGUgYnJvd3Nlciwgd2hpY2hcbiAgICAgKiBob3BlZnVsbHkgY29udGFpbnMgdGhlIG5hbWUgb2YgdGhlIG9iamVjdCB0aGF0IGNhdXNlZCB0aGUgZXJyb3IuXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gV2hldGhlciBvciBub3QgdGhlIHN0YWNrIGluZm9ybWF0aW9uIHdhc1xuICAgICAqIGF1Z21lbnRlZC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhdWdtZW50U3RhY2tUcmFjZVdpdGhJbml0aWFsRWxlbWVudChzdGFja0luZm8sIHVybCwgbGluZU5vLCBtZXNzYWdlKSB7XG4gICAgICAgIHZhciBpbml0aWFsID0ge1xuICAgICAgICAgICAgJ3VybCc6IHVybCxcbiAgICAgICAgICAgICdsaW5lJzogbGluZU5vXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGluaXRpYWwudXJsICYmIGluaXRpYWwubGluZSkge1xuICAgICAgICAgICAgc3RhY2tJbmZvLmluY29tcGxldGUgPSBmYWxzZTtcblxuICAgICAgICAgICAgaWYgKCFpbml0aWFsLmZ1bmMpIHtcbiAgICAgICAgICAgICAgICBpbml0aWFsLmZ1bmMgPSBndWVzc0Z1bmN0aW9uTmFtZShpbml0aWFsLnVybCwgaW5pdGlhbC5saW5lKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFpbml0aWFsLmNvbnRleHQpIHtcbiAgICAgICAgICAgICAgICBpbml0aWFsLmNvbnRleHQgPSBnYXRoZXJDb250ZXh0KGluaXRpYWwudXJsLCBpbml0aWFsLmxpbmUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcmVmZXJlbmNlID0gLyAnKFteJ10rKScgLy5leGVjKG1lc3NhZ2UpO1xuICAgICAgICAgICAgaWYgKHJlZmVyZW5jZSkge1xuICAgICAgICAgICAgICAgIGluaXRpYWwuY29sdW1uID0gZmluZFNvdXJjZUluTGluZShyZWZlcmVuY2VbMV0sIGluaXRpYWwudXJsLCBpbml0aWFsLmxpbmUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc3RhY2tJbmZvLnN0YWNrLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBpZiAoc3RhY2tJbmZvLnN0YWNrWzBdLnVybCA9PT0gaW5pdGlhbC51cmwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YWNrSW5mby5zdGFja1swXS5saW5lID09PSBpbml0aWFsLmxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTsgLy8gYWxyZWFkeSBpbiBzdGFjayB0cmFjZVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFzdGFja0luZm8uc3RhY2tbMF0ubGluZSAmJiBzdGFja0luZm8uc3RhY2tbMF0uZnVuYyA9PT0gaW5pdGlhbC5mdW5jKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFja0luZm8uc3RhY2tbMF0ubGluZSA9IGluaXRpYWwubGluZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrSW5mby5zdGFja1swXS5jb250ZXh0ID0gaW5pdGlhbC5jb250ZXh0O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzdGFja0luZm8uc3RhY2sudW5zaGlmdChpbml0aWFsKTtcbiAgICAgICAgICAgIHN0YWNrSW5mby5wYXJ0aWFsID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RhY2tJbmZvLmluY29tcGxldGUgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbXB1dGVzIHN0YWNrIHRyYWNlIGluZm9ybWF0aW9uIGJ5IHdhbGtpbmcgdGhlIGFyZ3VtZW50cy5jYWxsZXJcbiAgICAgKiBjaGFpbiBhdCB0aGUgdGltZSB0aGUgZXhjZXB0aW9uIG9jY3VycmVkLiBUaGlzIHdpbGwgY2F1c2UgZWFybGllclxuICAgICAqIGZyYW1lcyB0byBiZSBtaXNzZWQgYnV0IGlzIHRoZSBvbmx5IHdheSB0byBnZXQgYW55IHN0YWNrIHRyYWNlIGluXG4gICAgICogU2FmYXJpIGFuZCBJRS4gVGhlIHRvcCBmcmFtZSBpcyByZXN0b3JlZCBieVxuICAgICAqIHtAbGluayBhdWdtZW50U3RhY2tUcmFjZVdpdGhJbml0aWFsRWxlbWVudH0uXG4gICAgICogQHBhcmFtIHtFcnJvcn0gZXhcbiAgICAgKiBAcmV0dXJuIHs/T2JqZWN0LjxzdHJpbmcsICo+fSBTdGFjayB0cmFjZSBpbmZvcm1hdGlvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjb21wdXRlU3RhY2tUcmFjZUJ5V2Fsa2luZ0NhbGxlckNoYWluKGV4LCBkZXB0aCkge1xuICAgICAgICB2YXIgZnVuY3Rpb25OYW1lID0gL2Z1bmN0aW9uXFxzKyhbXyRhLXpBLVpcXHhBMC1cXHVGRkZGXVtfJGEtekEtWjAtOVxceEEwLVxcdUZGRkZdKik/XFxzKlxcKC9pLFxuICAgICAgICAgICAgc3RhY2sgPSBbXSxcbiAgICAgICAgICAgIGZ1bmNzID0ge30sXG4gICAgICAgICAgICByZWN1cnNpb24gPSBmYWxzZSxcbiAgICAgICAgICAgIHBhcnRzLFxuICAgICAgICAgICAgaXRlbSxcbiAgICAgICAgICAgIHNvdXJjZTtcblxuICAgICAgICBmb3IgKHZhciBjdXJyID0gY29tcHV0ZVN0YWNrVHJhY2VCeVdhbGtpbmdDYWxsZXJDaGFpbi5jYWxsZXI7IGN1cnIgJiYgIXJlY3Vyc2lvbjsgY3VyciA9IGN1cnIuY2FsbGVyKSB7XG4gICAgICAgICAgICBpZiAoY3VyciA9PT0gY29tcHV0ZVN0YWNrVHJhY2UgfHwgY3VyciA9PT0gVHJhY2VLaXQucmVwb3J0KSB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3NraXBwaW5nIGludGVybmFsIGZ1bmN0aW9uJyk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgJ3VybCc6IG51bGwsXG4gICAgICAgICAgICAgICAgJ2Z1bmMnOiBVTktOT1dOX0ZVTkNUSU9OLFxuICAgICAgICAgICAgICAgICdsaW5lJzogbnVsbCxcbiAgICAgICAgICAgICAgICAnY29sdW1uJzogbnVsbFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKGN1cnIubmFtZSkge1xuICAgICAgICAgICAgICAgIGl0ZW0uZnVuYyA9IGN1cnIubmFtZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKHBhcnRzID0gZnVuY3Rpb25OYW1lLmV4ZWMoY3Vyci50b1N0cmluZygpKSkpIHtcbiAgICAgICAgICAgICAgICBpdGVtLmZ1bmMgPSBwYXJ0c1sxXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKChzb3VyY2UgPSBmaW5kU291cmNlQnlGdW5jdGlvbkJvZHkoY3VycikpKSB7XG4gICAgICAgICAgICAgICAgaXRlbS51cmwgPSBzb3VyY2UudXJsO1xuICAgICAgICAgICAgICAgIGl0ZW0ubGluZSA9IHNvdXJjZS5saW5lO1xuXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uZnVuYyA9PT0gVU5LTk9XTl9GVU5DVElPTikge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmZ1bmMgPSBndWVzc0Z1bmN0aW9uTmFtZShpdGVtLnVybCwgaXRlbS5saW5lKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgcmVmZXJlbmNlID0gLyAnKFteJ10rKScgLy5leGVjKGV4Lm1lc3NhZ2UgfHwgZXguZGVzY3JpcHRpb24pO1xuICAgICAgICAgICAgICAgIGlmIChyZWZlcmVuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jb2x1bW4gPSBmaW5kU291cmNlSW5MaW5lKHJlZmVyZW5jZVsxXSwgc291cmNlLnVybCwgc291cmNlLmxpbmUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGZ1bmNzWycnICsgY3Vycl0pIHtcbiAgICAgICAgICAgICAgICByZWN1cnNpb24gPSB0cnVlO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgZnVuY3NbJycgKyBjdXJyXSA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHN0YWNrLnB1c2goaXRlbSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGVwdGgpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdkZXB0aCBpcyAnICsgZGVwdGgpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3N0YWNrIGlzICcgKyBzdGFjay5sZW5ndGgpO1xuICAgICAgICAgICAgc3RhY2suc3BsaWNlKDAsIGRlcHRoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByZXN1bHQgPSB7XG4gICAgICAgICAgICAnbmFtZSc6IGV4Lm5hbWUsXG4gICAgICAgICAgICAnbWVzc2FnZSc6IGV4Lm1lc3NhZ2UsXG4gICAgICAgICAgICAndXJsJzogZG9jdW1lbnQubG9jYXRpb24uaHJlZixcbiAgICAgICAgICAgICdzdGFjayc6IHN0YWNrXG4gICAgICAgIH07XG4gICAgICAgIGF1Z21lbnRTdGFja1RyYWNlV2l0aEluaXRpYWxFbGVtZW50KHJlc3VsdCwgZXguc291cmNlVVJMIHx8IGV4LmZpbGVOYW1lLCBleC5saW5lIHx8IGV4LmxpbmVOdW1iZXIsIGV4Lm1lc3NhZ2UgfHwgZXguZGVzY3JpcHRpb24pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbXB1dGVzIGEgc3RhY2sgdHJhY2UgZm9yIGFuIGV4Y2VwdGlvbi5cbiAgICAgKiBAcGFyYW0ge0Vycm9yfSBleFxuICAgICAqIEBwYXJhbSB7KHN0cmluZ3xudW1iZXIpPX0gZGVwdGhcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjb21wdXRlU3RhY2tUcmFjZShleCwgZGVwdGgpIHtcbiAgICAgICAgdmFyIHN0YWNrID0gbnVsbDtcbiAgICAgICAgZGVwdGggPSAoZGVwdGggPT0gbnVsbCA/IDAgOiArZGVwdGgpO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBUaGlzIG11c3QgYmUgdHJpZWQgZmlyc3QgYmVjYXVzZSBPcGVyYSAxMCAqZGVzdHJveXMqXG4gICAgICAgICAgICAvLyBpdHMgc3RhY2t0cmFjZSBwcm9wZXJ0eSBpZiB5b3UgdHJ5IHRvIGFjY2VzcyB0aGUgc3RhY2tcbiAgICAgICAgICAgIC8vIHByb3BlcnR5IGZpcnN0ISFcbiAgICAgICAgICAgIHN0YWNrID0gY29tcHV0ZVN0YWNrVHJhY2VGcm9tU3RhY2t0cmFjZVByb3AoZXgpO1xuICAgICAgICAgICAgaWYgKHN0YWNrKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YWNrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBpZiAoZGVidWcpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHN0YWNrID0gY29tcHV0ZVN0YWNrVHJhY2VGcm9tU3RhY2tQcm9wKGV4KTtcbiAgICAgICAgICAgIGlmIChzdGFjaykge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdGFjaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgaWYgKGRlYnVnKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzdGFjayA9IGNvbXB1dGVTdGFja1RyYWNlRnJvbU9wZXJhTXVsdGlMaW5lTWVzc2FnZShleCk7XG4gICAgICAgICAgICBpZiAoc3RhY2spIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhY2s7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGlmIChkZWJ1Zykge1xuICAgICAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgc3RhY2sgPSBjb21wdXRlU3RhY2tUcmFjZUJ5V2Fsa2luZ0NhbGxlckNoYWluKGV4LCBkZXB0aCArIDEpO1xuICAgICAgICAgICAgaWYgKHN0YWNrKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YWNrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBpZiAoZGVidWcpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH1cblxuICAgIGNvbXB1dGVTdGFja1RyYWNlLmF1Z21lbnRTdGFja1RyYWNlV2l0aEluaXRpYWxFbGVtZW50ID0gYXVnbWVudFN0YWNrVHJhY2VXaXRoSW5pdGlhbEVsZW1lbnQ7XG4gICAgY29tcHV0ZVN0YWNrVHJhY2UuY29tcHV0ZVN0YWNrVHJhY2VGcm9tU3RhY2tQcm9wID0gY29tcHV0ZVN0YWNrVHJhY2VGcm9tU3RhY2tQcm9wO1xuICAgIGNvbXB1dGVTdGFja1RyYWNlLmd1ZXNzRnVuY3Rpb25OYW1lID0gZ3Vlc3NGdW5jdGlvbk5hbWU7XG4gICAgY29tcHV0ZVN0YWNrVHJhY2UuZ2F0aGVyQ29udGV4dCA9IGdhdGhlckNvbnRleHQ7XG5cbiAgICByZXR1cm4gY29tcHV0ZVN0YWNrVHJhY2U7XG59KCkpO1xuXG4ndXNlIHN0cmljdCc7XG5cbi8vIEZpcnN0LCBjaGVjayBmb3IgSlNPTiBzdXBwb3J0XG4vLyBJZiB0aGVyZSBpcyBubyBKU09OLCB3ZSBuby1vcCB0aGUgY29yZSBmZWF0dXJlcyBvZiBSYXZlblxuLy8gc2luY2UgSlNPTiBpcyByZXF1aXJlZCB0byBlbmNvZGUgdGhlIHBheWxvYWRcbnZhciBfUmF2ZW4gPSB3aW5kb3cuUmF2ZW4sXG4gICAgaGFzSlNPTiA9ICEhKHR5cGVvZiBKU09OID09PSAnb2JqZWN0JyAmJiBKU09OLnN0cmluZ2lmeSksXG4gICAgbGFzdENhcHR1cmVkRXhjZXB0aW9uLFxuICAgIGxhc3RFdmVudElkLFxuICAgIGdsb2JhbFNlcnZlcixcbiAgICBnbG9iYWxVc2VyLFxuICAgIGdsb2JhbEtleSxcbiAgICBnbG9iYWxQcm9qZWN0LFxuICAgIGdsb2JhbE9wdGlvbnMgPSB7XG4gICAgICAgIGxvZ2dlcjogJ2phdmFzY3JpcHQnLFxuICAgICAgICBpZ25vcmVFcnJvcnM6IFtdLFxuICAgICAgICBpZ25vcmVVcmxzOiBbXSxcbiAgICAgICAgd2hpdGVsaXN0VXJsczogW10sXG4gICAgICAgIGluY2x1ZGVQYXRoczogW10sXG4gICAgICAgIGNvbGxlY3RXaW5kb3dFcnJvcnM6IHRydWUsXG4gICAgICAgIHRhZ3M6IHt9LFxuICAgICAgICBtYXhNZXNzYWdlTGVuZ3RoOiAxMDAsXG4gICAgICAgIGV4dHJhOiB7fVxuICAgIH0sXG4gICAgYXV0aFF1ZXJ5U3RyaW5nLFxuICAgIGlzUmF2ZW5JbnN0YWxsZWQgPSBmYWxzZSxcblxuICAgIG9iamVjdFByb3RvdHlwZSA9IE9iamVjdC5wcm90b3R5cGUsXG4gICAgc3RhcnRUaW1lID0gbm93KCk7XG5cbi8qXG4gKiBUaGUgY29yZSBSYXZlbiBzaW5nbGV0b25cbiAqXG4gKiBAdGhpcyB7UmF2ZW59XG4gKi9cbnZhciBSYXZlbiA9IHtcbiAgICBWRVJTSU9OOiAnMS4xLjE4JyxcblxuICAgIGRlYnVnOiB0cnVlLFxuXG4gICAgLypcbiAgICAgKiBBbGxvdyBtdWx0aXBsZSB2ZXJzaW9ucyBvZiBSYXZlbiB0byBiZSBpbnN0YWxsZWQuXG4gICAgICogU3RyaXAgUmF2ZW4gZnJvbSB0aGUgZ2xvYmFsIGNvbnRleHQgYW5kIHJldHVybnMgdGhlIGluc3RhbmNlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7UmF2ZW59XG4gICAgICovXG4gICAgbm9Db25mbGljdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHdpbmRvdy5SYXZlbiA9IF9SYXZlbjtcbiAgICAgICAgcmV0dXJuIFJhdmVuO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAqIENvbmZpZ3VyZSBSYXZlbiB3aXRoIGEgRFNOIGFuZCBleHRyYSBvcHRpb25zXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZHNuIFRoZSBwdWJsaWMgU2VudHJ5IERTTlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIE9wdGlvbmFsIHNldCBvZiBvZiBnbG9iYWwgb3B0aW9ucyBbb3B0aW9uYWxdXG4gICAgICogQHJldHVybiB7UmF2ZW59XG4gICAgICovXG4gICAgY29uZmlnOiBmdW5jdGlvbihkc24sIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKGdsb2JhbFNlcnZlcikge1xuICAgICAgICAgICAgbG9nRGVidWcoJ2Vycm9yJywgJ0Vycm9yOiBSYXZlbiBoYXMgYWxyZWFkeSBiZWVuIGNvbmZpZ3VyZWQnKTtcbiAgICAgICAgICAgIHJldHVybiBSYXZlbjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWRzbikgcmV0dXJuIFJhdmVuO1xuXG4gICAgICAgIHZhciB1cmkgPSBwYXJzZURTTihkc24pLFxuICAgICAgICAgICAgbGFzdFNsYXNoID0gdXJpLnBhdGgubGFzdEluZGV4T2YoJy8nKSxcbiAgICAgICAgICAgIHBhdGggPSB1cmkucGF0aC5zdWJzdHIoMSwgbGFzdFNsYXNoKTtcblxuICAgICAgICAvLyBtZXJnZSBpbiBvcHRpb25zXG4gICAgICAgIGlmIChvcHRpb25zKSB7XG4gICAgICAgICAgICBlYWNoKG9wdGlvbnMsIGZ1bmN0aW9uKGtleSwgdmFsdWUpe1xuICAgICAgICAgICAgICAgIGdsb2JhbE9wdGlvbnNba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBcIlNjcmlwdCBlcnJvci5cIiBpcyBoYXJkIGNvZGVkIGludG8gYnJvd3NlcnMgZm9yIGVycm9ycyB0aGF0IGl0IGNhbid0IHJlYWQuXG4gICAgICAgIC8vIHRoaXMgaXMgdGhlIHJlc3VsdCBvZiBhIHNjcmlwdCBiZWluZyBwdWxsZWQgaW4gZnJvbSBhbiBleHRlcm5hbCBkb21haW4gYW5kIENPUlMuXG4gICAgICAgIGdsb2JhbE9wdGlvbnMuaWdub3JlRXJyb3JzLnB1c2goL15TY3JpcHQgZXJyb3JcXC4/JC8pO1xuICAgICAgICBnbG9iYWxPcHRpb25zLmlnbm9yZUVycm9ycy5wdXNoKC9eSmF2YXNjcmlwdCBlcnJvcjogU2NyaXB0IGVycm9yXFwuPyBvbiBsaW5lIDAkLyk7XG5cbiAgICAgICAgLy8gam9pbiByZWdleHAgcnVsZXMgaW50byBvbmUgYmlnIHJ1bGVcbiAgICAgICAgZ2xvYmFsT3B0aW9ucy5pZ25vcmVFcnJvcnMgPSBqb2luUmVnRXhwKGdsb2JhbE9wdGlvbnMuaWdub3JlRXJyb3JzKTtcbiAgICAgICAgZ2xvYmFsT3B0aW9ucy5pZ25vcmVVcmxzID0gZ2xvYmFsT3B0aW9ucy5pZ25vcmVVcmxzLmxlbmd0aCA/IGpvaW5SZWdFeHAoZ2xvYmFsT3B0aW9ucy5pZ25vcmVVcmxzKSA6IGZhbHNlO1xuICAgICAgICBnbG9iYWxPcHRpb25zLndoaXRlbGlzdFVybHMgPSBnbG9iYWxPcHRpb25zLndoaXRlbGlzdFVybHMubGVuZ3RoID8gam9pblJlZ0V4cChnbG9iYWxPcHRpb25zLndoaXRlbGlzdFVybHMpIDogZmFsc2U7XG4gICAgICAgIGdsb2JhbE9wdGlvbnMuaW5jbHVkZVBhdGhzID0gam9pblJlZ0V4cChnbG9iYWxPcHRpb25zLmluY2x1ZGVQYXRocyk7XG5cbiAgICAgICAgZ2xvYmFsS2V5ID0gdXJpLnVzZXI7XG4gICAgICAgIGdsb2JhbFByb2plY3QgPSB1cmkucGF0aC5zdWJzdHIobGFzdFNsYXNoICsgMSk7XG5cbiAgICAgICAgLy8gYXNzZW1ibGUgdGhlIGVuZHBvaW50IGZyb20gdGhlIHVyaSBwaWVjZXNcbiAgICAgICAgZ2xvYmFsU2VydmVyID0gJy8vJyArIHVyaS5ob3N0ICtcbiAgICAgICAgICAgICAgICAgICAgICAodXJpLnBvcnQgPyAnOicgKyB1cmkucG9ydCA6ICcnKSArXG4gICAgICAgICAgICAgICAgICAgICAgJy8nICsgcGF0aCArICdhcGkvJyArIGdsb2JhbFByb2plY3QgKyAnL3N0b3JlLyc7XG5cbiAgICAgICAgaWYgKHVyaS5wcm90b2NvbCkge1xuICAgICAgICAgICAgZ2xvYmFsU2VydmVyID0gdXJpLnByb3RvY29sICsgJzonICsgZ2xvYmFsU2VydmVyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGdsb2JhbE9wdGlvbnMuZmV0Y2hDb250ZXh0KSB7XG4gICAgICAgICAgICBUcmFjZUtpdC5yZW1vdGVGZXRjaGluZyA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZ2xvYmFsT3B0aW9ucy5saW5lc09mQ29udGV4dCkge1xuICAgICAgICAgICAgVHJhY2VLaXQubGluZXNPZkNvbnRleHQgPSBnbG9iYWxPcHRpb25zLmxpbmVzT2ZDb250ZXh0O1xuICAgICAgICB9XG5cbiAgICAgICAgVHJhY2VLaXQuY29sbGVjdFdpbmRvd0Vycm9ycyA9ICEhZ2xvYmFsT3B0aW9ucy5jb2xsZWN0V2luZG93RXJyb3JzO1xuXG4gICAgICAgIHNldEF1dGhRdWVyeVN0cmluZygpO1xuXG4gICAgICAgIC8vIHJldHVybiBmb3IgY2hhaW5pbmdcbiAgICAgICAgcmV0dXJuIFJhdmVuO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAqIEluc3RhbGxzIGEgZ2xvYmFsIHdpbmRvdy5vbmVycm9yIGVycm9yIGhhbmRsZXJcbiAgICAgKiB0byBjYXB0dXJlIGFuZCByZXBvcnQgdW5jYXVnaHQgZXhjZXB0aW9ucy5cbiAgICAgKiBBdCB0aGlzIHBvaW50LCBpbnN0YWxsKCkgaXMgcmVxdWlyZWQgdG8gYmUgY2FsbGVkIGR1ZVxuICAgICAqIHRvIHRoZSB3YXkgVHJhY2VLaXQgaXMgc2V0IHVwLlxuICAgICAqXG4gICAgICogQHJldHVybiB7UmF2ZW59XG4gICAgICovXG4gICAgaW5zdGFsbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChpc1NldHVwKCkgJiYgIWlzUmF2ZW5JbnN0YWxsZWQpIHtcbiAgICAgICAgICAgIFRyYWNlS2l0LnJlcG9ydC5zdWJzY3JpYmUoaGFuZGxlU3RhY2tJbmZvKTtcbiAgICAgICAgICAgIGlzUmF2ZW5JbnN0YWxsZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFJhdmVuO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAqIFdyYXAgY29kZSB3aXRoaW4gYSBjb250ZXh0IHNvIFJhdmVuIGNhbiBjYXB0dXJlIGVycm9yc1xuICAgICAqIHJlbGlhYmx5IGFjcm9zcyBkb21haW5zIHRoYXQgaXMgZXhlY3V0ZWQgaW1tZWRpYXRlbHkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyBBIHNwZWNpZmljIHNldCBvZiBvcHRpb25zIGZvciB0aGlzIGNvbnRleHQgW29wdGlvbmFsXVxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmMgVGhlIGNhbGxiYWNrIHRvIGJlIGltbWVkaWF0ZWx5IGV4ZWN1dGVkIHdpdGhpbiB0aGUgY29udGV4dFxuICAgICAqIEBwYXJhbSB7YXJyYXl9IGFyZ3MgQW4gYXJyYXkgb2YgYXJndW1lbnRzIHRvIGJlIGNhbGxlZCB3aXRoIHRoZSBjYWxsYmFjayBbb3B0aW9uYWxdXG4gICAgICovXG4gICAgY29udGV4dDogZnVuY3Rpb24ob3B0aW9ucywgZnVuYywgYXJncykge1xuICAgICAgICBpZiAoaXNGdW5jdGlvbihvcHRpb25zKSkge1xuICAgICAgICAgICAgYXJncyA9IGZ1bmMgfHwgW107XG4gICAgICAgICAgICBmdW5jID0gb3B0aW9ucztcbiAgICAgICAgICAgIG9wdGlvbnMgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUmF2ZW4ud3JhcChvcHRpb25zLCBmdW5jKS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBXcmFwIGNvZGUgd2l0aGluIGEgY29udGV4dCBhbmQgcmV0dXJucyBiYWNrIGEgbmV3IGZ1bmN0aW9uIHRvIGJlIGV4ZWN1dGVkXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyBBIHNwZWNpZmljIHNldCBvZiBvcHRpb25zIGZvciB0aGlzIGNvbnRleHQgW29wdGlvbmFsXVxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGJlIHdyYXBwZWQgaW4gYSBuZXcgY29udGV4dFxuICAgICAqIEByZXR1cm4ge2Z1bmN0aW9ufSBUaGUgbmV3bHkgd3JhcHBlZCBmdW5jdGlvbnMgd2l0aCBhIGNvbnRleHRcbiAgICAgKi9cbiAgICB3cmFwOiBmdW5jdGlvbihvcHRpb25zLCBmdW5jKSB7XG4gICAgICAgIC8vIDEgYXJndW1lbnQgaGFzIGJlZW4gcGFzc2VkLCBhbmQgaXQncyBub3QgYSBmdW5jdGlvblxuICAgICAgICAvLyBzbyBqdXN0IHJldHVybiBpdFxuICAgICAgICBpZiAoaXNVbmRlZmluZWQoZnVuYykgJiYgIWlzRnVuY3Rpb24ob3B0aW9ucykpIHtcbiAgICAgICAgICAgIHJldHVybiBvcHRpb25zO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gb3B0aW9ucyBpcyBvcHRpb25hbFxuICAgICAgICBpZiAoaXNGdW5jdGlvbihvcHRpb25zKSkge1xuICAgICAgICAgICAgZnVuYyA9IG9wdGlvbnM7XG4gICAgICAgICAgICBvcHRpb25zID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQXQgdGhpcyBwb2ludCwgd2UndmUgcGFzc2VkIGFsb25nIDIgYXJndW1lbnRzLCBhbmQgdGhlIHNlY29uZCBvbmVcbiAgICAgICAgLy8gaXMgbm90IGEgZnVuY3Rpb24gZWl0aGVyLCBzbyB3ZSdsbCBqdXN0IHJldHVybiB0aGUgc2Vjb25kIGFyZ3VtZW50LlxuICAgICAgICBpZiAoIWlzRnVuY3Rpb24oZnVuYykpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2UgZG9uJ3Qgd2FubmEgd3JhcCBpdCB0d2ljZSFcbiAgICAgICAgaWYgKGZ1bmMuX19yYXZlbl9fKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuYztcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHdyYXBwZWQoKSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IFtdLCBpID0gYXJndW1lbnRzLmxlbmd0aCxcbiAgICAgICAgICAgICAgICBkZWVwID0gIW9wdGlvbnMgfHwgb3B0aW9ucyAmJiBvcHRpb25zLmRlZXAgIT09IGZhbHNlO1xuICAgICAgICAgICAgLy8gUmVjdXJzaXZlbHkgd3JhcCBhbGwgb2YgYSBmdW5jdGlvbidzIGFyZ3VtZW50cyB0aGF0IGFyZVxuICAgICAgICAgICAgLy8gZnVuY3Rpb25zIHRoZW1zZWx2ZXMuXG5cbiAgICAgICAgICAgIHdoaWxlKGktLSkgYXJnc1tpXSA9IGRlZXAgPyBSYXZlbi53cmFwKG9wdGlvbnMsIGFyZ3VtZW50c1tpXSkgOiBhcmd1bWVudHNbaV07XG5cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgLypqc2hpbnQgLVcwNDAqL1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICAgICAgUmF2ZW4uY2FwdHVyZUV4Y2VwdGlvbihlLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29weSBvdmVyIHByb3BlcnRpZXMgb2YgdGhlIG9sZCBmdW5jdGlvblxuICAgICAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiBmdW5jKSB7XG4gICAgICAgICAgICBpZiAoaGFzS2V5KGZ1bmMsIHByb3BlcnR5KSkge1xuICAgICAgICAgICAgICAgIHdyYXBwZWRbcHJvcGVydHldID0gZnVuY1twcm9wZXJ0eV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTaWduYWwgdGhhdCB0aGlzIGZ1bmN0aW9uIGhhcyBiZWVuIHdyYXBwZWQgYWxyZWFkeVxuICAgICAgICAvLyBmb3IgYm90aCBkZWJ1Z2dpbmcgYW5kIHRvIHByZXZlbnQgaXQgdG8gYmVpbmcgd3JhcHBlZCB0d2ljZVxuICAgICAgICB3cmFwcGVkLl9fcmF2ZW5fXyA9IHRydWU7XG4gICAgICAgIHdyYXBwZWQuX19pbm5lcl9fID0gZnVuYztcblxuICAgICAgICByZXR1cm4gd3JhcHBlZDtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBVbmluc3RhbGxzIHRoZSBnbG9iYWwgZXJyb3IgaGFuZGxlci5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1JhdmVufVxuICAgICAqL1xuICAgIHVuaW5zdGFsbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIFRyYWNlS2l0LnJlcG9ydC51bmluc3RhbGwoKTtcbiAgICAgICAgaXNSYXZlbkluc3RhbGxlZCA9IGZhbHNlO1xuXG4gICAgICAgIHJldHVybiBSYXZlbjtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBNYW51YWxseSBjYXB0dXJlIGFuIGV4Y2VwdGlvbiBhbmQgc2VuZCBpdCBvdmVyIHRvIFNlbnRyeVxuICAgICAqXG4gICAgICogQHBhcmFtIHtlcnJvcn0gZXggQW4gZXhjZXB0aW9uIHRvIGJlIGxvZ2dlZFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIEEgc3BlY2lmaWMgc2V0IG9mIG9wdGlvbnMgZm9yIHRoaXMgZXJyb3IgW29wdGlvbmFsXVxuICAgICAqIEByZXR1cm4ge1JhdmVufVxuICAgICAqL1xuICAgIGNhcHR1cmVFeGNlcHRpb246IGZ1bmN0aW9uKGV4LCBvcHRpb25zKSB7XG4gICAgICAgIC8vIElmIG5vdCBhbiBFcnJvciBpcyBwYXNzZWQgdGhyb3VnaCwgcmVjYWxsIGFzIGEgbWVzc2FnZSBpbnN0ZWFkXG4gICAgICAgIGlmICghaXNFcnJvcihleCkpIHJldHVybiBSYXZlbi5jYXB0dXJlTWVzc2FnZShleCwgb3B0aW9ucyk7XG5cbiAgICAgICAgLy8gU3RvcmUgdGhlIHJhdyBleGNlcHRpb24gb2JqZWN0IGZvciBwb3RlbnRpYWwgZGVidWdnaW5nIGFuZCBpbnRyb3NwZWN0aW9uXG4gICAgICAgIGxhc3RDYXB0dXJlZEV4Y2VwdGlvbiA9IGV4O1xuXG4gICAgICAgIC8vIFRyYWNlS2l0LnJlcG9ydCB3aWxsIHJlLXJhaXNlIGFueSBleGNlcHRpb24gcGFzc2VkIHRvIGl0LFxuICAgICAgICAvLyB3aGljaCBtZWFucyB5b3UgaGF2ZSB0byB3cmFwIGl0IGluIHRyeS9jYXRjaC4gSW5zdGVhZCwgd2VcbiAgICAgICAgLy8gY2FuIHdyYXAgaXQgaGVyZSBhbmQgb25seSByZS1yYWlzZSBpZiBUcmFjZUtpdC5yZXBvcnRcbiAgICAgICAgLy8gcmFpc2VzIGFuIGV4Y2VwdGlvbiBkaWZmZXJlbnQgZnJvbSB0aGUgb25lIHdlIGFza2VkIHRvXG4gICAgICAgIC8vIHJlcG9ydCBvbi5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIFRyYWNlS2l0LnJlcG9ydChleCwgb3B0aW9ucyk7XG4gICAgICAgIH0gY2F0Y2goZXgxKSB7XG4gICAgICAgICAgICBpZihleCAhPT0gZXgxKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXgxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFJhdmVuO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAqIE1hbnVhbGx5IHNlbmQgYSBtZXNzYWdlIHRvIFNlbnRyeVxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1zZyBBIHBsYWluIG1lc3NhZ2UgdG8gYmUgY2FwdHVyZWQgaW4gU2VudHJ5XG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgQSBzcGVjaWZpYyBzZXQgb2Ygb3B0aW9ucyBmb3IgdGhpcyBtZXNzYWdlIFtvcHRpb25hbF1cbiAgICAgKiBAcmV0dXJuIHtSYXZlbn1cbiAgICAgKi9cbiAgICBjYXB0dXJlTWVzc2FnZTogZnVuY3Rpb24obXNnLCBvcHRpb25zKSB7XG4gICAgICAgIC8vIGNvbmZpZygpIGF1dG9tYWdpY2FsbHkgY29udmVydHMgaWdub3JlRXJyb3JzIGZyb20gYSBsaXN0IHRvIGEgUmVnRXhwIHNvIHdlIG5lZWQgdG8gdGVzdCBmb3IgYW5cbiAgICAgICAgLy8gZWFybHkgY2FsbDsgd2UnbGwgZXJyb3Igb24gdGhlIHNpZGUgb2YgbG9nZ2luZyBhbnl0aGluZyBjYWxsZWQgYmVmb3JlIGNvbmZpZ3VyYXRpb24gc2luY2UgaXQnc1xuICAgICAgICAvLyBwcm9iYWJseSBzb21ldGhpbmcgeW91IHNob3VsZCBzZWU6XG4gICAgICAgIGlmICghIWdsb2JhbE9wdGlvbnMuaWdub3JlRXJyb3JzLnRlc3QgJiYgZ2xvYmFsT3B0aW9ucy5pZ25vcmVFcnJvcnMudGVzdChtc2cpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBGaXJlIGF3YXkhXG4gICAgICAgIHNlbmQoXG4gICAgICAgICAgICBvYmplY3RNZXJnZSh7XG4gICAgICAgICAgICAgICAgbWVzc2FnZTogbXNnICsgJycgIC8vIE1ha2Ugc3VyZSBpdCdzIGFjdHVhbGx5IGEgc3RyaW5nXG4gICAgICAgICAgICB9LCBvcHRpb25zKVxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiBSYXZlbjtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBTZXQvY2xlYXIgYSB1c2VyIHRvIGJlIHNlbnQgYWxvbmcgd2l0aCB0aGUgcGF5bG9hZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSB1c2VyIEFuIG9iamVjdCByZXByZXNlbnRpbmcgdXNlciBkYXRhIFtvcHRpb25hbF1cbiAgICAgKiBAcmV0dXJuIHtSYXZlbn1cbiAgICAgKi9cbiAgICBzZXRVc2VyQ29udGV4dDogZnVuY3Rpb24odXNlcikge1xuICAgICAgICBnbG9iYWxVc2VyID0gdXNlcjtcblxuICAgICAgICByZXR1cm4gUmF2ZW47XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogU2V0IGV4dHJhIGF0dHJpYnV0ZXMgdG8gYmUgc2VudCBhbG9uZyB3aXRoIHRoZSBwYXlsb2FkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGV4dHJhIEFuIG9iamVjdCByZXByZXNlbnRpbmcgZXh0cmEgZGF0YSBbb3B0aW9uYWxdXG4gICAgICogQHJldHVybiB7UmF2ZW59XG4gICAgICovXG4gICAgc2V0RXh0cmFDb250ZXh0OiBmdW5jdGlvbihleHRyYSkge1xuICAgICAgICBnbG9iYWxPcHRpb25zLmV4dHJhID0gZXh0cmEgfHwge307XG5cbiAgICAgICAgcmV0dXJuIFJhdmVuO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAqIFNldCB0YWdzIHRvIGJlIHNlbnQgYWxvbmcgd2l0aCB0aGUgcGF5bG9hZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSB0YWdzIEFuIG9iamVjdCByZXByZXNlbnRpbmcgdGFncyBbb3B0aW9uYWxdXG4gICAgICogQHJldHVybiB7UmF2ZW59XG4gICAgICovXG4gICAgc2V0VGFnc0NvbnRleHQ6IGZ1bmN0aW9uKHRhZ3MpIHtcbiAgICAgICAgZ2xvYmFsT3B0aW9ucy50YWdzID0gdGFncyB8fCB7fTtcblxuICAgICAgICByZXR1cm4gUmF2ZW47XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogU2V0IHJlbGVhc2UgdmVyc2lvbiBvZiBhcHBsaWNhdGlvblxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHJlbGVhc2UgVHlwaWNhbGx5IHNvbWV0aGluZyBsaWtlIGEgZ2l0IFNIQSB0byBpZGVudGlmeSB2ZXJzaW9uXG4gICAgICogQHJldHVybiB7UmF2ZW59XG4gICAgICovXG4gICAgc2V0UmVsZWFzZUNvbnRleHQ6IGZ1bmN0aW9uKHJlbGVhc2UpIHtcbiAgICAgICAgZ2xvYmFsT3B0aW9ucy5yZWxlYXNlID0gcmVsZWFzZTtcblxuICAgICAgICByZXR1cm4gUmF2ZW47XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogR2V0IHRoZSBsYXRlc3QgcmF3IGV4Y2VwdGlvbiB0aGF0IHdhcyBjYXB0dXJlZCBieSBSYXZlbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge2Vycm9yfVxuICAgICAqL1xuICAgIGxhc3RFeGNlcHRpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbGFzdENhcHR1cmVkRXhjZXB0aW9uO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAqIEdldCB0aGUgbGFzdCBldmVudCBpZFxuICAgICAqXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqL1xuICAgIGxhc3RFdmVudElkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGxhc3RFdmVudElkO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAqIERldGVybWluZSBpZiBSYXZlbiBpcyBzZXR1cCBhbmQgcmVhZHkgdG8gZ28uXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuICAgIGlzU2V0dXA6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gaXNTZXR1cCgpO1xuICAgIH1cbn07XG5cblJhdmVuLnNldFVzZXIgPSBSYXZlbi5zZXRVc2VyQ29udGV4dDsgLy8gVG8gYmUgZGVwcmVjYXRlZFxuXG5mdW5jdGlvbiB0cmlnZ2VyRXZlbnQoZXZlbnRUeXBlLCBvcHRpb25zKSB7XG4gICAgdmFyIGV2ZW50LCBrZXk7XG5cbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgIGV2ZW50VHlwZSA9ICdyYXZlbicgKyBldmVudFR5cGUuc3Vic3RyKDAsMSkudG9VcHBlckNhc2UoKSArIGV2ZW50VHlwZS5zdWJzdHIoMSk7XG5cbiAgICBpZiAoZG9jdW1lbnQuY3JlYXRlRXZlbnQpIHtcbiAgICAgICAgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnSFRNTEV2ZW50cycpO1xuICAgICAgICBldmVudC5pbml0RXZlbnQoZXZlbnRUeXBlLCB0cnVlLCB0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50T2JqZWN0KCk7XG4gICAgICAgIGV2ZW50LmV2ZW50VHlwZSA9IGV2ZW50VHlwZTtcbiAgICB9XG5cbiAgICBmb3IgKGtleSBpbiBvcHRpb25zKSBpZiAoaGFzS2V5KG9wdGlvbnMsIGtleSkpIHtcbiAgICAgICAgZXZlbnRba2V5XSA9IG9wdGlvbnNba2V5XTtcbiAgICB9XG5cbiAgICBpZiAoZG9jdW1lbnQuY3JlYXRlRXZlbnQpIHtcbiAgICAgICAgLy8gSUU5IGlmIHN0YW5kYXJkc1xuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBJRTggcmVnYXJkbGVzcyBvZiBRdWlya3Mgb3IgU3RhbmRhcmRzXG4gICAgICAgIC8vIElFOSBpZiBxdWlya3NcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGRvY3VtZW50LmZpcmVFdmVudCgnb24nICsgZXZlbnQuZXZlbnRUeXBlLnRvTG93ZXJDYXNlKCksIGV2ZW50KTtcbiAgICAgICAgfSBjYXRjaChlKSB7fVxuICAgIH1cbn1cblxudmFyIGRzbktleXMgPSAnc291cmNlIHByb3RvY29sIHVzZXIgcGFzcyBob3N0IHBvcnQgcGF0aCcuc3BsaXQoJyAnKSxcbiAgICBkc25QYXR0ZXJuID0gL14oPzooXFx3Kyk6KT9cXC9cXC8oXFx3KykoOlxcdyspP0AoW1xcd1xcLi1dKykoPzo6KFxcZCspKT8oXFwvLiopLztcblxuZnVuY3Rpb24gUmF2ZW5Db25maWdFcnJvcihtZXNzYWdlKSB7XG4gICAgdGhpcy5uYW1lID0gJ1JhdmVuQ29uZmlnRXJyb3InO1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG59XG5SYXZlbkNvbmZpZ0Vycm9yLnByb3RvdHlwZSA9IG5ldyBFcnJvcigpO1xuUmF2ZW5Db25maWdFcnJvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBSYXZlbkNvbmZpZ0Vycm9yO1xuXG4vKioqKiBQcml2YXRlIGZ1bmN0aW9ucyAqKioqL1xuZnVuY3Rpb24gcGFyc2VEU04oc3RyKSB7XG4gICAgdmFyIG0gPSBkc25QYXR0ZXJuLmV4ZWMoc3RyKSxcbiAgICAgICAgZHNuID0ge30sXG4gICAgICAgIGkgPSA3O1xuXG4gICAgdHJ5IHtcbiAgICAgICAgd2hpbGUgKGktLSkgZHNuW2RzbktleXNbaV1dID0gbVtpXSB8fCAnJztcbiAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IFJhdmVuQ29uZmlnRXJyb3IoJ0ludmFsaWQgRFNOOiAnICsgc3RyKTtcbiAgICB9XG5cbiAgICBpZiAoZHNuLnBhc3MpXG4gICAgICAgIHRocm93IG5ldyBSYXZlbkNvbmZpZ0Vycm9yKCdEbyBub3Qgc3BlY2lmeSB5b3VyIHByaXZhdGUga2V5IGluIHRoZSBEU04hJyk7XG5cbiAgICByZXR1cm4gZHNuO1xufVxuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZCh3aGF0KSB7XG4gICAgcmV0dXJuIHR5cGVvZiB3aGF0ID09PSAndW5kZWZpbmVkJztcbn1cblxuZnVuY3Rpb24gaXNGdW5jdGlvbih3aGF0KSB7XG4gICAgcmV0dXJuIHR5cGVvZiB3aGF0ID09PSAnZnVuY3Rpb24nO1xufVxuXG5mdW5jdGlvbiBpc1N0cmluZyh3aGF0KSB7XG4gICAgcmV0dXJuIHR5cGVvZiB3aGF0ID09PSAnc3RyaW5nJztcbn1cblxuZnVuY3Rpb24gaXNPYmplY3Qod2hhdCkge1xuICAgIHJldHVybiB0eXBlb2Ygd2hhdCA9PT0gJ29iamVjdCcgJiYgd2hhdCAhPT0gbnVsbDtcbn1cblxuZnVuY3Rpb24gaXNFbXB0eU9iamVjdCh3aGF0KSB7XG4gICAgZm9yICh2YXIgayBpbiB3aGF0KSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbi8vIFNvcnRhIHlhbmtlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9qb3llbnQvbm9kZS9ibG9iL2FhM2I0YjQvbGliL3V0aWwuanMjTDU2MFxuLy8gd2l0aCBzb21lIHRpbnkgbW9kaWZpY2F0aW9uc1xuZnVuY3Rpb24gaXNFcnJvcih3aGF0KSB7XG4gICAgcmV0dXJuIGlzT2JqZWN0KHdoYXQpICYmXG4gICAgICAgIG9iamVjdFByb3RvdHlwZS50b1N0cmluZy5jYWxsKHdoYXQpID09PSAnW29iamVjdCBFcnJvcl0nIHx8XG4gICAgICAgIHdoYXQgaW5zdGFuY2VvZiBFcnJvcjtcbn1cblxuLyoqXG4gKiBoYXNLZXksIGEgYmV0dGVyIGZvcm0gb2YgaGFzT3duUHJvcGVydHlcbiAqIEV4YW1wbGU6IGhhc0tleShNYWluSG9zdE9iamVjdCwgcHJvcGVydHkpID09PSB0cnVlL2ZhbHNlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGhvc3Qgb2JqZWN0IHRvIGNoZWNrIHByb3BlcnR5XG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IHRvIGNoZWNrXG4gKi9cbmZ1bmN0aW9uIGhhc0tleShvYmplY3QsIGtleSkge1xuICAgIHJldHVybiBvYmplY3RQcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSk7XG59XG5cbmZ1bmN0aW9uIGVhY2gob2JqLCBjYWxsYmFjaykge1xuICAgIHZhciBpLCBqO1xuXG4gICAgaWYgKGlzVW5kZWZpbmVkKG9iai5sZW5ndGgpKSB7XG4gICAgICAgIGZvciAoaSBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmIChoYXNLZXkob2JqLCBpKSkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwobnVsbCwgaSwgb2JqW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGogPSBvYmoubGVuZ3RoO1xuICAgICAgICBpZiAoaikge1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGo7IGkrKykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwobnVsbCwgaSwgb2JqW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5mdW5jdGlvbiBzZXRBdXRoUXVlcnlTdHJpbmcoKSB7XG4gICAgYXV0aFF1ZXJ5U3RyaW5nID1cbiAgICAgICAgJz9zZW50cnlfdmVyc2lvbj00JyArXG4gICAgICAgICcmc2VudHJ5X2NsaWVudD1yYXZlbi1qcy8nICsgUmF2ZW4uVkVSU0lPTiArXG4gICAgICAgICcmc2VudHJ5X2tleT0nICsgZ2xvYmFsS2V5O1xufVxuXG5cbmZ1bmN0aW9uIGhhbmRsZVN0YWNrSW5mbyhzdGFja0luZm8sIG9wdGlvbnMpIHtcbiAgICB2YXIgZnJhbWVzID0gW107XG5cbiAgICBpZiAoc3RhY2tJbmZvLnN0YWNrICYmIHN0YWNrSW5mby5zdGFjay5sZW5ndGgpIHtcbiAgICAgICAgZWFjaChzdGFja0luZm8uc3RhY2ssIGZ1bmN0aW9uKGksIHN0YWNrKSB7XG4gICAgICAgICAgICB2YXIgZnJhbWUgPSBub3JtYWxpemVGcmFtZShzdGFjayk7XG4gICAgICAgICAgICBpZiAoZnJhbWUpIHtcbiAgICAgICAgICAgICAgICBmcmFtZXMucHVzaChmcmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHRyaWdnZXJFdmVudCgnaGFuZGxlJywge1xuICAgICAgICBzdGFja0luZm86IHN0YWNrSW5mbyxcbiAgICAgICAgb3B0aW9uczogb3B0aW9uc1xuICAgIH0pO1xuXG4gICAgcHJvY2Vzc0V4Y2VwdGlvbihcbiAgICAgICAgc3RhY2tJbmZvLm5hbWUsXG4gICAgICAgIHN0YWNrSW5mby5tZXNzYWdlLFxuICAgICAgICBzdGFja0luZm8udXJsLFxuICAgICAgICBzdGFja0luZm8ubGluZW5vLFxuICAgICAgICBmcmFtZXMsXG4gICAgICAgIG9wdGlvbnNcbiAgICApO1xufVxuXG5mdW5jdGlvbiBub3JtYWxpemVGcmFtZShmcmFtZSkge1xuICAgIGlmICghZnJhbWUudXJsKSByZXR1cm47XG5cbiAgICAvLyBub3JtYWxpemUgdGhlIGZyYW1lcyBkYXRhXG4gICAgdmFyIG5vcm1hbGl6ZWQgPSB7XG4gICAgICAgIGZpbGVuYW1lOiAgIGZyYW1lLnVybCxcbiAgICAgICAgbGluZW5vOiAgICAgZnJhbWUubGluZSxcbiAgICAgICAgY29sbm86ICAgICAgZnJhbWUuY29sdW1uLFxuICAgICAgICAnZnVuY3Rpb24nOiBmcmFtZS5mdW5jIHx8ICc/J1xuICAgIH0sIGNvbnRleHQgPSBleHRyYWN0Q29udGV4dEZyb21GcmFtZShmcmFtZSksIGk7XG5cbiAgICBpZiAoY29udGV4dCkge1xuICAgICAgICB2YXIga2V5cyA9IFsncHJlX2NvbnRleHQnLCAnY29udGV4dF9saW5lJywgJ3Bvc3RfY29udGV4dCddO1xuICAgICAgICBpID0gMztcbiAgICAgICAgd2hpbGUgKGktLSkgbm9ybWFsaXplZFtrZXlzW2ldXSA9IGNvbnRleHRbaV07XG4gICAgfVxuXG4gICAgbm9ybWFsaXplZC5pbl9hcHAgPSAhKCAvLyBkZXRlcm1pbmUgaWYgYW4gZXhjZXB0aW9uIGNhbWUgZnJvbSBvdXRzaWRlIG9mIG91ciBhcHBcbiAgICAgICAgLy8gZmlyc3Qgd2UgY2hlY2sgdGhlIGdsb2JhbCBpbmNsdWRlUGF0aHMgbGlzdC5cbiAgICAgICAgIWdsb2JhbE9wdGlvbnMuaW5jbHVkZVBhdGhzLnRlc3Qobm9ybWFsaXplZC5maWxlbmFtZSkgfHxcbiAgICAgICAgLy8gTm93IHdlIGNoZWNrIGZvciBmdW4sIGlmIHRoZSBmdW5jdGlvbiBuYW1lIGlzIFJhdmVuIG9yIFRyYWNlS2l0XG4gICAgICAgIC8oUmF2ZW58VHJhY2VLaXQpXFwuLy50ZXN0KG5vcm1hbGl6ZWRbJ2Z1bmN0aW9uJ10pIHx8XG4gICAgICAgIC8vIGZpbmFsbHksIHdlIGRvIGEgbGFzdCBkaXRjaCBlZmZvcnQgYW5kIGNoZWNrIGZvciByYXZlbi5taW4uanNcbiAgICAgICAgL3JhdmVuXFwuKG1pblxcLik/anMkLy50ZXN0KG5vcm1hbGl6ZWQuZmlsZW5hbWUpXG4gICAgKTtcblxuICAgIHJldHVybiBub3JtYWxpemVkO1xufVxuXG5mdW5jdGlvbiBleHRyYWN0Q29udGV4dEZyb21GcmFtZShmcmFtZSkge1xuICAgIC8vIGltbWVkaWF0ZWx5IGNoZWNrIGlmIHdlIHNob3VsZCBldmVuIGF0dGVtcHQgdG8gcGFyc2UgYSBjb250ZXh0XG4gICAgaWYgKCFmcmFtZS5jb250ZXh0IHx8ICFnbG9iYWxPcHRpb25zLmZldGNoQ29udGV4dCkgcmV0dXJuO1xuXG4gICAgdmFyIGNvbnRleHQgPSBmcmFtZS5jb250ZXh0LFxuICAgICAgICBwaXZvdCA9IH5+KGNvbnRleHQubGVuZ3RoIC8gMiksXG4gICAgICAgIGkgPSBjb250ZXh0Lmxlbmd0aCwgaXNNaW5pZmllZCA9IGZhbHNlO1xuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgICAvLyBXZSdyZSBtYWtpbmcgYSBndWVzcyB0byBzZWUgaWYgdGhlIHNvdXJjZSBpcyBtaW5pZmllZCBvciBub3QuXG4gICAgICAgIC8vIFRvIGRvIHRoYXQsIHdlIG1ha2UgdGhlIGFzc3VtcHRpb24gaWYgKmFueSogb2YgdGhlIGxpbmVzIHBhc3NlZFxuICAgICAgICAvLyBpbiBhcmUgZ3JlYXRlciB0aGFuIDMwMCBjaGFyYWN0ZXJzIGxvbmcsIHdlIGJhaWwuXG4gICAgICAgIC8vIFNlbnRyeSB3aWxsIHNlZSB0aGF0IHRoZXJlIGlzbid0IGEgY29udGV4dFxuICAgICAgICBpZiAoY29udGV4dFtpXS5sZW5ndGggPiAzMDApIHtcbiAgICAgICAgICAgIGlzTWluaWZpZWQgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaXNNaW5pZmllZCkge1xuICAgICAgICAvLyBUaGUgc291cmNlIGlzIG1pbmlmaWVkIGFuZCB3ZSBkb24ndCBrbm93IHdoaWNoIGNvbHVtbi4gRnVjayBpdC5cbiAgICAgICAgaWYgKGlzVW5kZWZpbmVkKGZyYW1lLmNvbHVtbikpIHJldHVybjtcblxuICAgICAgICAvLyBJZiB0aGUgc291cmNlIGlzIG1pbmlmaWVkIGFuZCBoYXMgYSBmcmFtZSBjb2x1bW5cbiAgICAgICAgLy8gd2UgdGFrZSBhIGNodW5rIG9mIHRoZSBvZmZlbmRpbmcgbGluZSB0byBob3BlZnVsbHkgc2hlZCBzb21lIGxpZ2h0XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBbXSwgIC8vIG5vIHByZV9jb250ZXh0XG4gICAgICAgICAgICBjb250ZXh0W3Bpdm90XS5zdWJzdHIoZnJhbWUuY29sdW1uLCA1MCksIC8vIGdyYWIgNTAgY2hhcmFjdGVycywgc3RhcnRpbmcgYXQgdGhlIG9mZmVuZGluZyBjb2x1bW5cbiAgICAgICAgICAgIFtdICAgLy8gbm8gcG9zdF9jb250ZXh0XG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgcmV0dXJuIFtcbiAgICAgICAgY29udGV4dC5zbGljZSgwLCBwaXZvdCksICAgIC8vIHByZV9jb250ZXh0XG4gICAgICAgIGNvbnRleHRbcGl2b3RdLCAgICAgICAgICAgICAvLyBjb250ZXh0X2xpbmVcbiAgICAgICAgY29udGV4dC5zbGljZShwaXZvdCArIDEpICAgIC8vIHBvc3RfY29udGV4dFxuICAgIF07XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NFeGNlcHRpb24odHlwZSwgbWVzc2FnZSwgZmlsZXVybCwgbGluZW5vLCBmcmFtZXMsIG9wdGlvbnMpIHtcbiAgICB2YXIgc3RhY2t0cmFjZSwgbGFiZWwsIGk7XG5cbiAgICAvLyBJbiBzb21lIGluc3RhbmNlcyBtZXNzYWdlIGlzIG5vdCBhY3R1YWxseSBhIHN0cmluZywgbm8gaWRlYSB3aHksXG4gICAgLy8gc28gd2Ugd2FudCB0byBhbHdheXMgY29lcmNlIGl0IHRvIG9uZS5cbiAgICBtZXNzYWdlICs9ICcnO1xuXG4gICAgLy8gU29tZXRpbWVzIGFuIGV4Y2VwdGlvbiBpcyBnZXR0aW5nIGxvZ2dlZCBpbiBTZW50cnkgYXNcbiAgICAvLyA8bm8gbWVzc2FnZSB2YWx1ZT5cbiAgICAvLyBUaGlzIGNhbiBvbmx5IG1lYW4gdGhhdCB0aGUgbWVzc2FnZSB3YXMgZmFsc2V5IHNpbmNlIHRoaXMgdmFsdWVcbiAgICAvLyBpcyBoYXJkY29kZWQgaW50byBTZW50cnkgaXRzZWxmLlxuICAgIC8vIEF0IHRoaXMgcG9pbnQsIGlmIHRoZSBtZXNzYWdlIGlzIGZhbHNleSwgd2UgYmFpbCBzaW5jZSBpdCdzIHVzZWxlc3NcbiAgICBpZiAodHlwZSA9PT0gJ0Vycm9yJyAmJiAhbWVzc2FnZSkgcmV0dXJuO1xuXG4gICAgaWYgKGdsb2JhbE9wdGlvbnMuaWdub3JlRXJyb3JzLnRlc3QobWVzc2FnZSkpIHJldHVybjtcblxuICAgIGlmIChmcmFtZXMgJiYgZnJhbWVzLmxlbmd0aCkge1xuICAgICAgICBmaWxldXJsID0gZnJhbWVzWzBdLmZpbGVuYW1lIHx8IGZpbGV1cmw7XG4gICAgICAgIC8vIFNlbnRyeSBleHBlY3RzIGZyYW1lcyBvbGRlc3QgdG8gbmV3ZXN0XG4gICAgICAgIC8vIGFuZCBKUyBzZW5kcyB0aGVtIGFzIG5ld2VzdCB0byBvbGRlc3RcbiAgICAgICAgZnJhbWVzLnJldmVyc2UoKTtcbiAgICAgICAgc3RhY2t0cmFjZSA9IHtmcmFtZXM6IGZyYW1lc307XG4gICAgfSBlbHNlIGlmIChmaWxldXJsKSB7XG4gICAgICAgIHN0YWNrdHJhY2UgPSB7XG4gICAgICAgICAgICBmcmFtZXM6IFt7XG4gICAgICAgICAgICAgICAgZmlsZW5hbWU6IGZpbGV1cmwsXG4gICAgICAgICAgICAgICAgbGluZW5vOiBsaW5lbm8sXG4gICAgICAgICAgICAgICAgaW5fYXBwOiB0cnVlXG4gICAgICAgICAgICB9XVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIFRydW5jYXRlIHRoZSBtZXNzYWdlIHRvIGEgbWF4IG9mIGNoYXJhY3RlcnNcbiAgICBtZXNzYWdlID0gdHJ1bmNhdGUobWVzc2FnZSwgZ2xvYmFsT3B0aW9ucy5tYXhNZXNzYWdlTGVuZ3RoKTtcblxuICAgIGlmIChnbG9iYWxPcHRpb25zLmlnbm9yZVVybHMgJiYgZ2xvYmFsT3B0aW9ucy5pZ25vcmVVcmxzLnRlc3QoZmlsZXVybCkpIHJldHVybjtcbiAgICBpZiAoZ2xvYmFsT3B0aW9ucy53aGl0ZWxpc3RVcmxzICYmICFnbG9iYWxPcHRpb25zLndoaXRlbGlzdFVybHMudGVzdChmaWxldXJsKSkgcmV0dXJuO1xuXG4gICAgbGFiZWwgPSBsaW5lbm8gPyBtZXNzYWdlICsgJyBhdCAnICsgbGluZW5vIDogbWVzc2FnZTtcblxuICAgIC8vIEZpcmUgYXdheSFcbiAgICBzZW5kKFxuICAgICAgICBvYmplY3RNZXJnZSh7XG4gICAgICAgICAgICAvLyBzZW50cnkuaW50ZXJmYWNlcy5FeGNlcHRpb25cbiAgICAgICAgICAgIGV4Y2VwdGlvbjoge1xuICAgICAgICAgICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgICAgICAgICAgdmFsdWU6IG1lc3NhZ2VcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBzZW50cnkuaW50ZXJmYWNlcy5TdGFja3RyYWNlXG4gICAgICAgICAgICBzdGFja3RyYWNlOiBzdGFja3RyYWNlLFxuICAgICAgICAgICAgY3VscHJpdDogZmlsZXVybCxcbiAgICAgICAgICAgIG1lc3NhZ2U6IGxhYmVsXG4gICAgICAgIH0sIG9wdGlvbnMpXG4gICAgKTtcbn1cblxuZnVuY3Rpb24gb2JqZWN0TWVyZ2Uob2JqMSwgb2JqMikge1xuICAgIGlmICghb2JqMikge1xuICAgICAgICByZXR1cm4gb2JqMTtcbiAgICB9XG4gICAgZWFjaChvYmoyLCBmdW5jdGlvbihrZXksIHZhbHVlKXtcbiAgICAgICAgb2JqMVtrZXldID0gdmFsdWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIG9iajE7XG59XG5cbmZ1bmN0aW9uIHRydW5jYXRlKHN0ciwgbWF4KSB7XG4gICAgcmV0dXJuIHN0ci5sZW5ndGggPD0gbWF4ID8gc3RyIDogc3RyLnN1YnN0cigwLCBtYXgpICsgJ1xcdTIwMjYnO1xufVxuXG5mdW5jdGlvbiBub3coKSB7XG4gICAgcmV0dXJuICtuZXcgRGF0ZSgpO1xufVxuXG5mdW5jdGlvbiBnZXRIdHRwRGF0YSgpIHtcbiAgICB2YXIgaHR0cCA9IHtcbiAgICAgICAgdXJsOiBkb2N1bWVudC5sb2NhdGlvbi5ocmVmLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnVXNlci1BZ2VudCc6IG5hdmlnYXRvci51c2VyQWdlbnRcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAoZG9jdW1lbnQucmVmZXJyZXIpIHtcbiAgICAgICAgaHR0cC5oZWFkZXJzLlJlZmVyZXIgPSBkb2N1bWVudC5yZWZlcnJlcjtcbiAgICB9XG5cbiAgICByZXR1cm4gaHR0cDtcbn1cblxuZnVuY3Rpb24gc2VuZChkYXRhKSB7XG4gICAgaWYgKCFpc1NldHVwKCkpIHJldHVybjtcblxuICAgIGRhdGEgPSBvYmplY3RNZXJnZSh7XG4gICAgICAgIHByb2plY3Q6IGdsb2JhbFByb2plY3QsXG4gICAgICAgIGxvZ2dlcjogZ2xvYmFsT3B0aW9ucy5sb2dnZXIsXG4gICAgICAgIHBsYXRmb3JtOiAnamF2YXNjcmlwdCcsXG4gICAgICAgIC8vIHNlbnRyeS5pbnRlcmZhY2VzLkh0dHBcbiAgICAgICAgcmVxdWVzdDogZ2V0SHR0cERhdGEoKVxuICAgIH0sIGRhdGEpO1xuXG4gICAgLy8gTWVyZ2UgaW4gdGhlIHRhZ3MgYW5kIGV4dHJhIHNlcGFyYXRlbHkgc2luY2Ugb2JqZWN0TWVyZ2UgZG9lc24ndCBoYW5kbGUgYSBkZWVwIG1lcmdlXG4gICAgZGF0YS50YWdzID0gb2JqZWN0TWVyZ2Uob2JqZWN0TWVyZ2Uoe30sIGdsb2JhbE9wdGlvbnMudGFncyksIGRhdGEudGFncyk7XG4gICAgZGF0YS5leHRyYSA9IG9iamVjdE1lcmdlKG9iamVjdE1lcmdlKHt9LCBnbG9iYWxPcHRpb25zLmV4dHJhKSwgZGF0YS5leHRyYSk7XG5cbiAgICAvLyBTZW5kIGFsb25nIG91ciBvd24gY29sbGVjdGVkIG1ldGFkYXRhIHdpdGggZXh0cmFcbiAgICBkYXRhLmV4dHJhID0gb2JqZWN0TWVyZ2Uoe1xuICAgICAgICAnc2Vzc2lvbjpkdXJhdGlvbic6IG5vdygpIC0gc3RhcnRUaW1lXG4gICAgfSwgZGF0YS5leHRyYSk7XG5cbiAgICAvLyBJZiB0aGVyZSBhcmUgbm8gdGFncy9leHRyYSwgc3RyaXAgdGhlIGtleSBmcm9tIHRoZSBwYXlsb2FkIGFsbHRvZ3RoZXIuXG4gICAgaWYgKGlzRW1wdHlPYmplY3QoZGF0YS50YWdzKSkgZGVsZXRlIGRhdGEudGFncztcblxuICAgIGlmIChnbG9iYWxVc2VyKSB7XG4gICAgICAgIC8vIHNlbnRyeS5pbnRlcmZhY2VzLlVzZXJcbiAgICAgICAgZGF0YS51c2VyID0gZ2xvYmFsVXNlcjtcbiAgICB9XG5cbiAgICAvLyBJbmNsdWRlIHRoZSByZWxlYXNlIGlmZiBpdCdzIGRlZmluZWQgaW4gZ2xvYmFsT3B0aW9uc1xuICAgIGlmIChnbG9iYWxPcHRpb25zLnJlbGVhc2UpIGRhdGEucmVsZWFzZSA9IGdsb2JhbE9wdGlvbnMucmVsZWFzZTtcblxuICAgIGlmIChpc0Z1bmN0aW9uKGdsb2JhbE9wdGlvbnMuZGF0YUNhbGxiYWNrKSkge1xuICAgICAgICBkYXRhID0gZ2xvYmFsT3B0aW9ucy5kYXRhQ2FsbGJhY2soZGF0YSk7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgaWYgdGhlIHJlcXVlc3Qgc2hvdWxkIGJlIGZpbHRlcmVkIG9yIG5vdFxuICAgIGlmIChpc0Z1bmN0aW9uKGdsb2JhbE9wdGlvbnMuc2hvdWxkU2VuZENhbGxiYWNrKSAmJiAhZ2xvYmFsT3B0aW9ucy5zaG91bGRTZW5kQ2FsbGJhY2soZGF0YSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFNlbmQgYWxvbmcgYW4gZXZlbnRfaWQgaWYgbm90IGV4cGxpY2l0bHkgcGFzc2VkLlxuICAgIC8vIFRoaXMgZXZlbnRfaWQgY2FuIGJlIHVzZWQgdG8gcmVmZXJlbmNlIHRoZSBlcnJvciB3aXRoaW4gU2VudHJ5IGl0c2VsZi5cbiAgICAvLyBTZXQgbGFzdEV2ZW50SWQgYWZ0ZXIgd2Uga25vdyB0aGUgZXJyb3Igc2hvdWxkIGFjdHVhbGx5IGJlIHNlbnRcbiAgICBsYXN0RXZlbnRJZCA9IGRhdGEuZXZlbnRfaWQgfHwgKGRhdGEuZXZlbnRfaWQgPSB1dWlkNCgpKTtcblxuICAgIG1ha2VSZXF1ZXN0KGRhdGEpO1xufVxuXG5cbmZ1bmN0aW9uIG1ha2VSZXF1ZXN0KGRhdGEpIHtcbiAgICB2YXIgaW1nID0gbmV3IEltYWdlKCksXG4gICAgICAgIHNyYyA9IGdsb2JhbFNlcnZlciArIGF1dGhRdWVyeVN0cmluZyArICcmc2VudHJ5X2RhdGE9JyArIGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG5cbiAgICBpbWcuY3Jvc3NPcmlnaW4gPSAnYW5vbnltb3VzJztcbiAgICBpbWcub25sb2FkID0gZnVuY3Rpb24gc3VjY2VzcygpIHtcbiAgICAgICAgdHJpZ2dlckV2ZW50KCdzdWNjZXNzJywge1xuICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgIHNyYzogc3JjXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgaW1nLm9uZXJyb3IgPSBpbWcub25hYm9ydCA9IGZ1bmN0aW9uIGZhaWx1cmUoKSB7XG4gICAgICAgIHRyaWdnZXJFdmVudCgnZmFpbHVyZScsIHtcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICBzcmM6IHNyY1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIGltZy5zcmMgPSBzcmM7XG59XG5cbmZ1bmN0aW9uIGlzU2V0dXAoKSB7XG4gICAgaWYgKCFoYXNKU09OKSByZXR1cm4gZmFsc2U7ICAvLyBuZWVkcyBKU09OIHN1cHBvcnRcbiAgICBpZiAoIWdsb2JhbFNlcnZlcikge1xuICAgICAgICBsb2dEZWJ1ZygnZXJyb3InLCAnRXJyb3I6IFJhdmVuIGhhcyBub3QgYmVlbiBjb25maWd1cmVkLicpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBqb2luUmVnRXhwKHBhdHRlcm5zKSB7XG4gICAgLy8gQ29tYmluZSBhbiBhcnJheSBvZiByZWd1bGFyIGV4cHJlc3Npb25zIGFuZCBzdHJpbmdzIGludG8gb25lIGxhcmdlIHJlZ2V4cFxuICAgIC8vIEJlIG1hZC5cbiAgICB2YXIgc291cmNlcyA9IFtdLFxuICAgICAgICBpID0gMCwgbGVuID0gcGF0dGVybnMubGVuZ3RoLFxuICAgICAgICBwYXR0ZXJuO1xuXG4gICAgZm9yICg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBwYXR0ZXJuID0gcGF0dGVybnNbaV07XG4gICAgICAgIGlmIChpc1N0cmluZyhwYXR0ZXJuKSkge1xuICAgICAgICAgICAgLy8gSWYgaXQncyBhIHN0cmluZywgd2UgbmVlZCB0byBlc2NhcGUgaXRcbiAgICAgICAgICAgIC8vIFRha2VuIGZyb206IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvR3VpZGUvUmVndWxhcl9FeHByZXNzaW9uc1xuICAgICAgICAgICAgc291cmNlcy5wdXNoKHBhdHRlcm4ucmVwbGFjZSgvKFsuKis/Xj0hOiR7fSgpfFxcW1xcXVxcL1xcXFxdKS9nLCBcIlxcXFwkMVwiKSk7XG4gICAgICAgIH0gZWxzZSBpZiAocGF0dGVybiAmJiBwYXR0ZXJuLnNvdXJjZSkge1xuICAgICAgICAgICAgLy8gSWYgaXQncyBhIHJlZ2V4cCBhbHJlYWR5LCB3ZSB3YW50IHRvIGV4dHJhY3QgdGhlIHNvdXJjZVxuICAgICAgICAgICAgc291cmNlcy5wdXNoKHBhdHRlcm4uc291cmNlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJbnRlbnRpb25hbGx5IHNraXAgb3RoZXIgY2FzZXNcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoc291cmNlcy5qb2luKCd8JyksICdpJyk7XG59XG5cbi8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTA1MDM0L2hvdy10by1jcmVhdGUtYS1ndWlkLXV1aWQtaW4tamF2YXNjcmlwdC8yMTE3NTIzIzIxMTc1MjNcbmZ1bmN0aW9uIHV1aWQ0KCkge1xuICAgIHJldHVybiAneHh4eHh4eHh4eHh4NHh4eHl4eHh4eHh4eHh4eHh4eHgnLnJlcGxhY2UoL1t4eV0vZywgZnVuY3Rpb24oYykge1xuICAgICAgICB2YXIgciA9IE1hdGgucmFuZG9tKCkqMTZ8MCxcbiAgICAgICAgICAgIHYgPSBjID09ICd4JyA/IHIgOiAociYweDN8MHg4KTtcbiAgICAgICAgcmV0dXJuIHYudG9TdHJpbmcoMTYpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBsb2dEZWJ1ZyhsZXZlbCwgbWVzc2FnZSkge1xuICAgIGlmICh3aW5kb3cuY29uc29sZSAmJiBjb25zb2xlW2xldmVsXSAmJiBSYXZlbi5kZWJ1Zykge1xuICAgICAgICBjb25zb2xlW2xldmVsXShtZXNzYWdlKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGFmdGVyTG9hZCgpIHtcbiAgICAvLyBBdHRlbXB0IHRvIGluaXRpYWxpemUgUmF2ZW4gb24gbG9hZFxuICAgIHZhciBSYXZlbkNvbmZpZyA9IHdpbmRvdy5SYXZlbkNvbmZpZztcbiAgICBpZiAoUmF2ZW5Db25maWcpIHtcbiAgICAgICAgUmF2ZW4uY29uZmlnKFJhdmVuQ29uZmlnLmRzbiwgUmF2ZW5Db25maWcuY29uZmlnKS5pbnN0YWxsKCk7XG4gICAgfVxufVxuYWZ0ZXJMb2FkKCk7XG5cbi8vIEV4cG9zZSBSYXZlbiB0byB0aGUgd29ybGRcbmlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAvLyBBTURcbiAgICB3aW5kb3cuUmF2ZW4gPSBSYXZlbjtcbiAgICBkZWZpbmUoJ3JhdmVuJywgW10sIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIFJhdmVuO1xuICAgIH0pO1xufSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jykge1xuICAgIC8vIGJyb3dzZXJpZnlcbiAgICBtb2R1bGUuZXhwb3J0cyA9IFJhdmVuO1xufSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAvLyBDb21tb25KU1xuICAgIGV4cG9ydHMgPSBSYXZlbjtcbn0gZWxzZSB7XG4gICAgLy8gRXZlcnl0aGluZyBlbHNlXG4gICAgd2luZG93LlJhdmVuID0gUmF2ZW47XG59XG5cbn0pKHdpbmRvdyk7XG4iLCIvKiFcclxuICogdmVyZ2UgMS45LjErMjAxNDAyMTMwODAzXHJcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9yeWFudmUvdmVyZ2VcclxuICogTUlUIExpY2Vuc2UgMjAxMyBSeWFuIFZhbiBFdHRlblxyXG4gKi9cclxuXHJcbihmdW5jdGlvbihyb290LCBuYW1lLCBtYWtlKSB7XHJcbiAgaWYgKHR5cGVvZiBtb2R1bGUgIT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlWydleHBvcnRzJ10pIG1vZHVsZVsnZXhwb3J0cyddID0gbWFrZSgpO1xyXG4gIGVsc2Ugcm9vdFtuYW1lXSA9IG1ha2UoKTtcclxufSh0aGlzLCAndmVyZ2UnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgdmFyIHhwb3J0cyA9IHt9XHJcbiAgICAsIHdpbiA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93XHJcbiAgICAsIGRvYyA9IHR5cGVvZiBkb2N1bWVudCAhPSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudFxyXG4gICAgLCBkb2NFbGVtID0gZG9jICYmIGRvYy5kb2N1bWVudEVsZW1lbnRcclxuICAgICwgbWF0Y2hNZWRpYSA9IHdpblsnbWF0Y2hNZWRpYSddIHx8IHdpblsnbXNNYXRjaE1lZGlhJ11cclxuICAgICwgbXEgPSBtYXRjaE1lZGlhID8gZnVuY3Rpb24ocSkge1xyXG4gICAgICAgIHJldHVybiAhIW1hdGNoTWVkaWEuY2FsbCh3aW4sIHEpLm1hdGNoZXM7XHJcbiAgICAgIH0gOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICwgdmlld3BvcnRXID0geHBvcnRzWyd2aWV3cG9ydFcnXSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBhID0gZG9jRWxlbVsnY2xpZW50V2lkdGgnXSwgYiA9IHdpblsnaW5uZXJXaWR0aCddO1xyXG4gICAgICAgIHJldHVybiBhIDwgYiA/IGIgOiBhO1xyXG4gICAgICB9XHJcbiAgICAsIHZpZXdwb3J0SCA9IHhwb3J0c1sndmlld3BvcnRIJ10gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgYSA9IGRvY0VsZW1bJ2NsaWVudEhlaWdodCddLCBiID0gd2luWydpbm5lckhlaWdodCddO1xyXG4gICAgICAgIHJldHVybiBhIDwgYiA/IGIgOiBhO1xyXG4gICAgICB9O1xyXG4gIFxyXG4gIC8qKiBcclxuICAgKiBUZXN0IGlmIGEgbWVkaWEgcXVlcnkgaXMgYWN0aXZlLiBMaWtlIE1vZGVybml6ci5tcVxyXG4gICAqIEBzaW5jZSAxLjYuMFxyXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAgICovICBcclxuICB4cG9ydHNbJ21xJ10gPSBtcTtcclxuXHJcbiAgLyoqIFxyXG4gICAqIE5vcm1hbGl6ZWQgbWF0Y2hNZWRpYVxyXG4gICAqIEBzaW5jZSAxLjYuMFxyXG4gICAqIEByZXR1cm4ge01lZGlhUXVlcnlMaXN0fE9iamVjdH1cclxuICAgKi8gXHJcbiAgeHBvcnRzWydtYXRjaE1lZGlhJ10gPSBtYXRjaE1lZGlhID8gZnVuY3Rpb24oKSB7XHJcbiAgICAvLyBtYXRjaE1lZGlhIG11c3QgYmUgYmluZGVkIHRvIHdpbmRvd1xyXG4gICAgcmV0dXJuIG1hdGNoTWVkaWEuYXBwbHkod2luLCBhcmd1bWVudHMpO1xyXG4gIH0gOiBmdW5jdGlvbigpIHtcclxuICAgIC8vIEdyYWNlZnVsbHkgZGVncmFkZSB0byBwbGFpbiBvYmplY3RcclxuICAgIHJldHVybiB7fTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBAc2luY2UgMS44LjBcclxuICAgKiBAcmV0dXJuIHt7d2lkdGg6bnVtYmVyLCBoZWlnaHQ6bnVtYmVyfX1cclxuICAgKi9cclxuICBmdW5jdGlvbiB2aWV3cG9ydCgpIHtcclxuICAgIHJldHVybiB7J3dpZHRoJzp2aWV3cG9ydFcoKSwgJ2hlaWdodCc6dmlld3BvcnRIKCl9O1xyXG4gIH1cclxuICB4cG9ydHNbJ3ZpZXdwb3J0J10gPSB2aWV3cG9ydDtcclxuICBcclxuICAvKiogXHJcbiAgICogQ3Jvc3MtYnJvd3NlciB3aW5kb3cuc2Nyb2xsWFxyXG4gICAqIEBzaW5jZSAxLjAuMFxyXG4gICAqIEByZXR1cm4ge251bWJlcn1cclxuICAgKi9cclxuICB4cG9ydHNbJ3Njcm9sbFgnXSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHdpbi5wYWdlWE9mZnNldCB8fCBkb2NFbGVtLnNjcm9sbExlZnQ7IFxyXG4gIH07XHJcblxyXG4gIC8qKiBcclxuICAgKiBDcm9zcy1icm93c2VyIHdpbmRvdy5zY3JvbGxZXHJcbiAgICogQHNpbmNlIDEuMC4wXHJcbiAgICogQHJldHVybiB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIHhwb3J0c1snc2Nyb2xsWSddID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gd2luLnBhZ2VZT2Zmc2V0IHx8IGRvY0VsZW0uc2Nyb2xsVG9wOyBcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge3t0b3A6bnVtYmVyLCByaWdodDpudW1iZXIsIGJvdHRvbTpudW1iZXIsIGxlZnQ6bnVtYmVyfX0gY29vcmRzXHJcbiAgICogQHBhcmFtIHtudW1iZXI9fSBjdXNoaW9uIGFkanVzdG1lbnRcclxuICAgKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAgICovXHJcbiAgZnVuY3Rpb24gY2FsaWJyYXRlKGNvb3JkcywgY3VzaGlvbikge1xyXG4gICAgdmFyIG8gPSB7fTtcclxuICAgIGN1c2hpb24gPSArY3VzaGlvbiB8fCAwO1xyXG4gICAgb1snd2lkdGgnXSA9IChvWydyaWdodCddID0gY29vcmRzWydyaWdodCddICsgY3VzaGlvbikgLSAob1snbGVmdCddID0gY29vcmRzWydsZWZ0J10gLSBjdXNoaW9uKTtcclxuICAgIG9bJ2hlaWdodCddID0gKG9bJ2JvdHRvbSddID0gY29vcmRzWydib3R0b20nXSArIGN1c2hpb24pIC0gKG9bJ3RvcCddID0gY29vcmRzWyd0b3AnXSAtIGN1c2hpb24pO1xyXG4gICAgcmV0dXJuIG87XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcm9zcy1icm93c2VyIGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0IHBsdXMgb3B0aW9uYWwgY3VzaGlvbi5cclxuICAgKiBDb29yZHMgYXJlIHJlbGF0aXZlIHRvIHRoZSB0b3AtbGVmdCBjb3JuZXIgb2YgdGhlIHZpZXdwb3J0LlxyXG4gICAqIEBzaW5jZSAxLjAuMFxyXG4gICAqIEBwYXJhbSB7RWxlbWVudHxPYmplY3R9IGVsIGVsZW1lbnQgb3Igc3RhY2sgKHVzZXMgZmlyc3QgaXRlbSlcclxuICAgKiBAcGFyYW0ge251bWJlcj19IGN1c2hpb24gKy8tIHBpeGVsIGFkanVzdG1lbnQgYW1vdW50XHJcbiAgICogQHJldHVybiB7T2JqZWN0fGJvb2xlYW59XHJcbiAgICovXHJcbiAgZnVuY3Rpb24gcmVjdGFuZ2xlKGVsLCBjdXNoaW9uKSB7XHJcbiAgICBlbCA9IGVsICYmICFlbC5ub2RlVHlwZSA/IGVsWzBdIDogZWw7XHJcbiAgICBpZiAoIWVsIHx8IDEgIT09IGVsLm5vZGVUeXBlKSByZXR1cm4gZmFsc2U7XHJcbiAgICByZXR1cm4gY2FsaWJyYXRlKGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLCBjdXNoaW9uKTtcclxuICB9XHJcbiAgeHBvcnRzWydyZWN0YW5nbGUnXSA9IHJlY3RhbmdsZTtcclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSB2aWV3cG9ydCBhc3BlY3QgcmF0aW8gKG9yIHRoZSBhc3BlY3QgcmF0aW8gb2YgYW4gb2JqZWN0IG9yIGVsZW1lbnQpXHJcbiAgICogQHNpbmNlIDEuNy4wXHJcbiAgICogQHBhcmFtIHsoRWxlbWVudHxPYmplY3QpPX0gbyBvcHRpb25hbCBvYmplY3Qgd2l0aCB3aWR0aC9oZWlnaHQgcHJvcHMgb3IgbWV0aG9kc1xyXG4gICAqIEByZXR1cm4ge251bWJlcn1cclxuICAgKiBAbGluayBodHRwOi8vdzMub3JnL1RSL2NzczMtbWVkaWFxdWVyaWVzLyNvcmllbnRhdGlvblxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIGFzcGVjdChvKSB7XHJcbiAgICBvID0gbnVsbCA9PSBvID8gdmlld3BvcnQoKSA6IDEgPT09IG8ubm9kZVR5cGUgPyByZWN0YW5nbGUobykgOiBvO1xyXG4gICAgdmFyIGggPSBvWydoZWlnaHQnXSwgdyA9IG9bJ3dpZHRoJ107XHJcbiAgICBoID0gdHlwZW9mIGggPT0gJ2Z1bmN0aW9uJyA/IGguY2FsbChvKSA6IGg7XHJcbiAgICB3ID0gdHlwZW9mIHcgPT0gJ2Z1bmN0aW9uJyA/IHcuY2FsbChvKSA6IHc7XHJcbiAgICByZXR1cm4gdy9oO1xyXG4gIH1cclxuICB4cG9ydHNbJ2FzcGVjdCddID0gYXNwZWN0O1xyXG5cclxuICAvKipcclxuICAgKiBUZXN0IGlmIGFuIGVsZW1lbnQgaXMgaW4gdGhlIHNhbWUgeC1heGlzIHNlY3Rpb24gYXMgdGhlIHZpZXdwb3J0LlxyXG4gICAqIEBzaW5jZSAxLjAuMFxyXG4gICAqIEBwYXJhbSB7RWxlbWVudHxPYmplY3R9IGVsXHJcbiAgICogQHBhcmFtIHtudW1iZXI9fSBjdXNoaW9uXHJcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cclxuICAgKi9cclxuICB4cG9ydHNbJ2luWCddID0gZnVuY3Rpb24oZWwsIGN1c2hpb24pIHtcclxuICAgIHZhciByID0gcmVjdGFuZ2xlKGVsLCBjdXNoaW9uKTtcclxuICAgIHJldHVybiAhIXIgJiYgci5yaWdodCA+PSAwICYmIHIubGVmdCA8PSB2aWV3cG9ydFcoKTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBUZXN0IGlmIGFuIGVsZW1lbnQgaXMgaW4gdGhlIHNhbWUgeS1heGlzIHNlY3Rpb24gYXMgdGhlIHZpZXdwb3J0LlxyXG4gICAqIEBzaW5jZSAxLjAuMFxyXG4gICAqIEBwYXJhbSB7RWxlbWVudHxPYmplY3R9IGVsXHJcbiAgICogQHBhcmFtIHtudW1iZXI9fSBjdXNoaW9uXHJcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cclxuICAgKi9cclxuICB4cG9ydHNbJ2luWSddID0gZnVuY3Rpb24oZWwsIGN1c2hpb24pIHtcclxuICAgIHZhciByID0gcmVjdGFuZ2xlKGVsLCBjdXNoaW9uKTtcclxuICAgIHJldHVybiAhIXIgJiYgci5ib3R0b20gPj0gMCAmJiByLnRvcCA8PSB2aWV3cG9ydEgoKTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBUZXN0IGlmIGFuIGVsZW1lbnQgaXMgaW4gdGhlIHZpZXdwb3J0LlxyXG4gICAqIEBzaW5jZSAxLjAuMFxyXG4gICAqIEBwYXJhbSB7RWxlbWVudHxPYmplY3R9IGVsXHJcbiAgICogQHBhcmFtIHtudW1iZXI9fSBjdXNoaW9uXHJcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cclxuICAgKi9cclxuICB4cG9ydHNbJ2luVmlld3BvcnQnXSA9IGZ1bmN0aW9uKGVsLCBjdXNoaW9uKSB7XHJcbiAgICAvLyBFcXVpdiB0byBgaW5YKGVsLCBjdXNoaW9uKSAmJiBpblkoZWwsIGN1c2hpb24pYCBidXQganVzdCBtYW51YWxseSBkbyBib3RoIFxyXG4gICAgLy8gdG8gYXZvaWQgY2FsbGluZyByZWN0YW5nbGUoKSB0d2ljZS4gSXQgZ3ppcHMganVzdCBhcyBzbWFsbCBsaWtlIHRoaXMuXHJcbiAgICB2YXIgciA9IHJlY3RhbmdsZShlbCwgY3VzaGlvbik7XHJcbiAgICByZXR1cm4gISFyICYmIHIuYm90dG9tID49IDAgJiYgci5yaWdodCA+PSAwICYmIHIudG9wIDw9IHZpZXdwb3J0SCgpICYmIHIubGVmdCA8PSB2aWV3cG9ydFcoKTtcclxuICB9O1xyXG5cclxuICByZXR1cm4geHBvcnRzO1xyXG59KSk7IiwiLyohXG4gKiBFdmVudEVtaXR0ZXIgdjQuMi4xMSAtIGdpdC5pby9lZVxuICogVW5saWNlbnNlIC0gaHR0cDovL3VubGljZW5zZS5vcmcvXG4gKiBPbGl2ZXIgQ2FsZHdlbGwgLSBodHRwOi8vb2xpLm1lLnVrL1xuICogQHByZXNlcnZlXG4gKi9cblxuOyhmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgLyoqXG4gICAgICogQ2xhc3MgZm9yIG1hbmFnaW5nIGV2ZW50cy5cbiAgICAgKiBDYW4gYmUgZXh0ZW5kZWQgdG8gcHJvdmlkZSBldmVudCBmdW5jdGlvbmFsaXR5IGluIG90aGVyIGNsYXNzZXMuXG4gICAgICpcbiAgICAgKiBAY2xhc3MgRXZlbnRFbWl0dGVyIE1hbmFnZXMgZXZlbnQgcmVnaXN0ZXJpbmcgYW5kIGVtaXR0aW5nLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHt9XG5cbiAgICAvLyBTaG9ydGN1dHMgdG8gaW1wcm92ZSBzcGVlZCBhbmQgc2l6ZVxuICAgIHZhciBwcm90byA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGU7XG4gICAgdmFyIGV4cG9ydHMgPSB0aGlzO1xuICAgIHZhciBvcmlnaW5hbEdsb2JhbFZhbHVlID0gZXhwb3J0cy5FdmVudEVtaXR0ZXI7XG5cbiAgICAvKipcbiAgICAgKiBGaW5kcyB0aGUgaW5kZXggb2YgdGhlIGxpc3RlbmVyIGZvciB0aGUgZXZlbnQgaW4gaXRzIHN0b3JhZ2UgYXJyYXkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9uW119IGxpc3RlbmVycyBBcnJheSBvZiBsaXN0ZW5lcnMgdG8gc2VhcmNoIHRocm91Z2guXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIgTWV0aG9kIHRvIGxvb2sgZm9yLlxuICAgICAqIEByZXR1cm4ge051bWJlcn0gSW5kZXggb2YgdGhlIHNwZWNpZmllZCBsaXN0ZW5lciwgLTEgaWYgbm90IGZvdW5kXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgZnVuY3Rpb24gaW5kZXhPZkxpc3RlbmVyKGxpc3RlbmVycywgbGlzdGVuZXIpIHtcbiAgICAgICAgdmFyIGkgPSBsaXN0ZW5lcnMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICBpZiAobGlzdGVuZXJzW2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFsaWFzIGEgbWV0aG9kIHdoaWxlIGtlZXBpbmcgdGhlIGNvbnRleHQgY29ycmVjdCwgdG8gYWxsb3cgZm9yIG92ZXJ3cml0aW5nIG9mIHRhcmdldCBtZXRob2QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgdGFyZ2V0IG1ldGhvZC5cbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gVGhlIGFsaWFzZWQgbWV0aG9kXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgZnVuY3Rpb24gYWxpYXMobmFtZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gYWxpYXNDbG9zdXJlKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXNbbmFtZV0uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBsaXN0ZW5lciBhcnJheSBmb3IgdGhlIHNwZWNpZmllZCBldmVudC5cbiAgICAgKiBXaWxsIGluaXRpYWxpc2UgdGhlIGV2ZW50IG9iamVjdCBhbmQgbGlzdGVuZXIgYXJyYXlzIGlmIHJlcXVpcmVkLlxuICAgICAqIFdpbGwgcmV0dXJuIGFuIG9iamVjdCBpZiB5b3UgdXNlIGEgcmVnZXggc2VhcmNoLiBUaGUgb2JqZWN0IGNvbnRhaW5zIGtleXMgZm9yIGVhY2ggbWF0Y2hlZCBldmVudC4gU28gL2JhW3J6XS8gbWlnaHQgcmV0dXJuIGFuIG9iamVjdCBjb250YWluaW5nIGJhciBhbmQgYmF6LiBCdXQgb25seSBpZiB5b3UgaGF2ZSBlaXRoZXIgZGVmaW5lZCB0aGVtIHdpdGggZGVmaW5lRXZlbnQgb3IgYWRkZWQgc29tZSBsaXN0ZW5lcnMgdG8gdGhlbS5cbiAgICAgKiBFYWNoIHByb3BlcnR5IGluIHRoZSBvYmplY3QgcmVzcG9uc2UgaXMgYW4gYXJyYXkgb2YgbGlzdGVuZXIgZnVuY3Rpb25zLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8UmVnRXhwfSBldnQgTmFtZSBvZiB0aGUgZXZlbnQgdG8gcmV0dXJuIHRoZSBsaXN0ZW5lcnMgZnJvbS5cbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbltdfE9iamVjdH0gQWxsIGxpc3RlbmVyIGZ1bmN0aW9ucyBmb3IgdGhlIGV2ZW50LlxuICAgICAqL1xuICAgIHByb3RvLmdldExpc3RlbmVycyA9IGZ1bmN0aW9uIGdldExpc3RlbmVycyhldnQpIHtcbiAgICAgICAgdmFyIGV2ZW50cyA9IHRoaXMuX2dldEV2ZW50cygpO1xuICAgICAgICB2YXIgcmVzcG9uc2U7XG4gICAgICAgIHZhciBrZXk7XG5cbiAgICAgICAgLy8gUmV0dXJuIGEgY29uY2F0ZW5hdGVkIGFycmF5IG9mIGFsbCBtYXRjaGluZyBldmVudHMgaWZcbiAgICAgICAgLy8gdGhlIHNlbGVjdG9yIGlzIGEgcmVndWxhciBleHByZXNzaW9uLlxuICAgICAgICBpZiAoZXZ0IGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgICAgICByZXNwb25zZSA9IHt9O1xuICAgICAgICAgICAgZm9yIChrZXkgaW4gZXZlbnRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50cy5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIGV2dC50ZXN0KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2Vba2V5XSA9IGV2ZW50c1trZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlc3BvbnNlID0gZXZlbnRzW2V2dF0gfHwgKGV2ZW50c1tldnRdID0gW10pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBUYWtlcyBhIGxpc3Qgb2YgbGlzdGVuZXIgb2JqZWN0cyBhbmQgZmxhdHRlbnMgaXQgaW50byBhIGxpc3Qgb2YgbGlzdGVuZXIgZnVuY3Rpb25zLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3RbXX0gbGlzdGVuZXJzIFJhdyBsaXN0ZW5lciBvYmplY3RzLlxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9uW119IEp1c3QgdGhlIGxpc3RlbmVyIGZ1bmN0aW9ucy5cbiAgICAgKi9cbiAgICBwcm90by5mbGF0dGVuTGlzdGVuZXJzID0gZnVuY3Rpb24gZmxhdHRlbkxpc3RlbmVycyhsaXN0ZW5lcnMpIHtcbiAgICAgICAgdmFyIGZsYXRMaXN0ZW5lcnMgPSBbXTtcbiAgICAgICAgdmFyIGk7XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgZmxhdExpc3RlbmVycy5wdXNoKGxpc3RlbmVyc1tpXS5saXN0ZW5lcik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmxhdExpc3RlbmVycztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRmV0Y2hlcyB0aGUgcmVxdWVzdGVkIGxpc3RlbmVycyB2aWEgZ2V0TGlzdGVuZXJzIGJ1dCB3aWxsIGFsd2F5cyByZXR1cm4gdGhlIHJlc3VsdHMgaW5zaWRlIGFuIG9iamVjdC4gVGhpcyBpcyBtYWlubHkgZm9yIGludGVybmFsIHVzZSBidXQgb3RoZXJzIG1heSBmaW5kIGl0IHVzZWZ1bC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfFJlZ0V4cH0gZXZ0IE5hbWUgb2YgdGhlIGV2ZW50IHRvIHJldHVybiB0aGUgbGlzdGVuZXJzIGZyb20uXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBBbGwgbGlzdGVuZXIgZnVuY3Rpb25zIGZvciBhbiBldmVudCBpbiBhbiBvYmplY3QuXG4gICAgICovXG4gICAgcHJvdG8uZ2V0TGlzdGVuZXJzQXNPYmplY3QgPSBmdW5jdGlvbiBnZXRMaXN0ZW5lcnNBc09iamVjdChldnQpIHtcbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuZ2V0TGlzdGVuZXJzKGV2dCk7XG4gICAgICAgIHZhciByZXNwb25zZTtcblxuICAgICAgICBpZiAobGlzdGVuZXJzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIHJlc3BvbnNlID0ge307XG4gICAgICAgICAgICByZXNwb25zZVtldnRdID0gbGlzdGVuZXJzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlIHx8IGxpc3RlbmVycztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGxpc3RlbmVyIGZ1bmN0aW9uIHRvIHRoZSBzcGVjaWZpZWQgZXZlbnQuXG4gICAgICogVGhlIGxpc3RlbmVyIHdpbGwgbm90IGJlIGFkZGVkIGlmIGl0IGlzIGEgZHVwbGljYXRlLlxuICAgICAqIElmIHRoZSBsaXN0ZW5lciByZXR1cm5zIHRydWUgdGhlbiBpdCB3aWxsIGJlIHJlbW92ZWQgYWZ0ZXIgaXQgaXMgY2FsbGVkLlxuICAgICAqIElmIHlvdSBwYXNzIGEgcmVndWxhciBleHByZXNzaW9uIGFzIHRoZSBldmVudCBuYW1lIHRoZW4gdGhlIGxpc3RlbmVyIHdpbGwgYmUgYWRkZWQgdG8gYWxsIGV2ZW50cyB0aGF0IG1hdGNoIGl0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8UmVnRXhwfSBldnQgTmFtZSBvZiB0aGUgZXZlbnQgdG8gYXR0YWNoIHRoZSBsaXN0ZW5lciB0by5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciBNZXRob2QgdG8gYmUgY2FsbGVkIHdoZW4gdGhlIGV2ZW50IGlzIGVtaXR0ZWQuIElmIHRoZSBmdW5jdGlvbiByZXR1cm5zIHRydWUgdGhlbiBpdCB3aWxsIGJlIHJlbW92ZWQgYWZ0ZXIgY2FsbGluZy5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKi9cbiAgICBwcm90by5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uIGFkZExpc3RlbmVyKGV2dCwgbGlzdGVuZXIpIHtcbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuZ2V0TGlzdGVuZXJzQXNPYmplY3QoZXZ0KTtcbiAgICAgICAgdmFyIGxpc3RlbmVySXNXcmFwcGVkID0gdHlwZW9mIGxpc3RlbmVyID09PSAnb2JqZWN0JztcbiAgICAgICAgdmFyIGtleTtcblxuICAgICAgICBmb3IgKGtleSBpbiBsaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIGlmIChsaXN0ZW5lcnMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBpbmRleE9mTGlzdGVuZXIobGlzdGVuZXJzW2tleV0sIGxpc3RlbmVyKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcnNba2V5XS5wdXNoKGxpc3RlbmVySXNXcmFwcGVkID8gbGlzdGVuZXIgOiB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyOiBsaXN0ZW5lcixcbiAgICAgICAgICAgICAgICAgICAgb25jZTogZmFsc2VcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBbGlhcyBvZiBhZGRMaXN0ZW5lclxuICAgICAqL1xuICAgIHByb3RvLm9uID0gYWxpYXMoJ2FkZExpc3RlbmVyJyk7XG5cbiAgICAvKipcbiAgICAgKiBTZW1pLWFsaWFzIG9mIGFkZExpc3RlbmVyLiBJdCB3aWxsIGFkZCBhIGxpc3RlbmVyIHRoYXQgd2lsbCBiZVxuICAgICAqIGF1dG9tYXRpY2FsbHkgcmVtb3ZlZCBhZnRlciBpdHMgZmlyc3QgZXhlY3V0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8UmVnRXhwfSBldnQgTmFtZSBvZiB0aGUgZXZlbnQgdG8gYXR0YWNoIHRoZSBsaXN0ZW5lciB0by5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciBNZXRob2QgdG8gYmUgY2FsbGVkIHdoZW4gdGhlIGV2ZW50IGlzIGVtaXR0ZWQuIElmIHRoZSBmdW5jdGlvbiByZXR1cm5zIHRydWUgdGhlbiBpdCB3aWxsIGJlIHJlbW92ZWQgYWZ0ZXIgY2FsbGluZy5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKi9cbiAgICBwcm90by5hZGRPbmNlTGlzdGVuZXIgPSBmdW5jdGlvbiBhZGRPbmNlTGlzdGVuZXIoZXZ0LCBsaXN0ZW5lcikge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGRMaXN0ZW5lcihldnQsIHtcbiAgICAgICAgICAgIGxpc3RlbmVyOiBsaXN0ZW5lcixcbiAgICAgICAgICAgIG9uY2U6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFsaWFzIG9mIGFkZE9uY2VMaXN0ZW5lci5cbiAgICAgKi9cbiAgICBwcm90by5vbmNlID0gYWxpYXMoJ2FkZE9uY2VMaXN0ZW5lcicpO1xuXG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBhbiBldmVudCBuYW1lLiBUaGlzIGlzIHJlcXVpcmVkIGlmIHlvdSB3YW50IHRvIHVzZSBhIHJlZ2V4IHRvIGFkZCBhIGxpc3RlbmVyIHRvIG11bHRpcGxlIGV2ZW50cyBhdCBvbmNlLiBJZiB5b3UgZG9uJ3QgZG8gdGhpcyB0aGVuIGhvdyBkbyB5b3UgZXhwZWN0IGl0IHRvIGtub3cgd2hhdCBldmVudCB0byBhZGQgdG8/IFNob3VsZCBpdCBqdXN0IGFkZCB0byBldmVyeSBwb3NzaWJsZSBtYXRjaCBmb3IgYSByZWdleD8gTm8uIFRoYXQgaXMgc2NhcnkgYW5kIGJhZC5cbiAgICAgKiBZb3UgbmVlZCB0byB0ZWxsIGl0IHdoYXQgZXZlbnQgbmFtZXMgc2hvdWxkIGJlIG1hdGNoZWQgYnkgYSByZWdleC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldnQgTmFtZSBvZiB0aGUgZXZlbnQgdG8gY3JlYXRlLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLmRlZmluZUV2ZW50ID0gZnVuY3Rpb24gZGVmaW5lRXZlbnQoZXZ0KSB7XG4gICAgICAgIHRoaXMuZ2V0TGlzdGVuZXJzKGV2dCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBVc2VzIGRlZmluZUV2ZW50IHRvIGRlZmluZSBtdWx0aXBsZSBldmVudHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ1tdfSBldnRzIEFuIGFycmF5IG9mIGV2ZW50IG5hbWVzIHRvIGRlZmluZS5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKi9cbiAgICBwcm90by5kZWZpbmVFdmVudHMgPSBmdW5jdGlvbiBkZWZpbmVFdmVudHMoZXZ0cykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV2dHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHRoaXMuZGVmaW5lRXZlbnQoZXZ0c1tpXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYSBsaXN0ZW5lciBmdW5jdGlvbiBmcm9tIHRoZSBzcGVjaWZpZWQgZXZlbnQuXG4gICAgICogV2hlbiBwYXNzZWQgYSByZWd1bGFyIGV4cHJlc3Npb24gYXMgdGhlIGV2ZW50IG5hbWUsIGl0IHdpbGwgcmVtb3ZlIHRoZSBsaXN0ZW5lciBmcm9tIGFsbCBldmVudHMgdGhhdCBtYXRjaCBpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfFJlZ0V4cH0gZXZ0IE5hbWUgb2YgdGhlIGV2ZW50IHRvIHJlbW92ZSB0aGUgbGlzdGVuZXIgZnJvbS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciBNZXRob2QgdG8gcmVtb3ZlIGZyb20gdGhlIGV2ZW50LlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIoZXZ0LCBsaXN0ZW5lcikge1xuICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5nZXRMaXN0ZW5lcnNBc09iamVjdChldnQpO1xuICAgICAgICB2YXIgaW5kZXg7XG4gICAgICAgIHZhciBrZXk7XG5cbiAgICAgICAgZm9yIChrZXkgaW4gbGlzdGVuZXJzKSB7XG4gICAgICAgICAgICBpZiAobGlzdGVuZXJzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IGluZGV4T2ZMaXN0ZW5lcihsaXN0ZW5lcnNba2V5XSwgbGlzdGVuZXIpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnNba2V5XS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBbGlhcyBvZiByZW1vdmVMaXN0ZW5lclxuICAgICAqL1xuICAgIHByb3RvLm9mZiA9IGFsaWFzKCdyZW1vdmVMaXN0ZW5lcicpO1xuXG4gICAgLyoqXG4gICAgICogQWRkcyBsaXN0ZW5lcnMgaW4gYnVsayB1c2luZyB0aGUgbWFuaXB1bGF0ZUxpc3RlbmVycyBtZXRob2QuXG4gICAgICogSWYgeW91IHBhc3MgYW4gb2JqZWN0IGFzIHRoZSBzZWNvbmQgYXJndW1lbnQgeW91IGNhbiBhZGQgdG8gbXVsdGlwbGUgZXZlbnRzIGF0IG9uY2UuIFRoZSBvYmplY3Qgc2hvdWxkIGNvbnRhaW4ga2V5IHZhbHVlIHBhaXJzIG9mIGV2ZW50cyBhbmQgbGlzdGVuZXJzIG9yIGxpc3RlbmVyIGFycmF5cy4gWW91IGNhbiBhbHNvIHBhc3MgaXQgYW4gZXZlbnQgbmFtZSBhbmQgYW4gYXJyYXkgb2YgbGlzdGVuZXJzIHRvIGJlIGFkZGVkLlxuICAgICAqIFlvdSBjYW4gYWxzbyBwYXNzIGl0IGEgcmVndWxhciBleHByZXNzaW9uIHRvIGFkZCB0aGUgYXJyYXkgb2YgbGlzdGVuZXJzIHRvIGFsbCBldmVudHMgdGhhdCBtYXRjaCBpdC5cbiAgICAgKiBZZWFoLCB0aGlzIGZ1bmN0aW9uIGRvZXMgcXVpdGUgYSBiaXQuIFRoYXQncyBwcm9iYWJseSBhIGJhZCB0aGluZy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdHxSZWdFeHB9IGV2dCBBbiBldmVudCBuYW1lIGlmIHlvdSB3aWxsIHBhc3MgYW4gYXJyYXkgb2YgbGlzdGVuZXJzIG5leHQuIEFuIG9iamVjdCBpZiB5b3Ugd2lzaCB0byBhZGQgdG8gbXVsdGlwbGUgZXZlbnRzIGF0IG9uY2UuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbltdfSBbbGlzdGVuZXJzXSBBbiBvcHRpb25hbCBhcnJheSBvZiBsaXN0ZW5lciBmdW5jdGlvbnMgdG8gYWRkLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLmFkZExpc3RlbmVycyA9IGZ1bmN0aW9uIGFkZExpc3RlbmVycyhldnQsIGxpc3RlbmVycykge1xuICAgICAgICAvLyBQYXNzIHRocm91Z2ggdG8gbWFuaXB1bGF0ZUxpc3RlbmVyc1xuICAgICAgICByZXR1cm4gdGhpcy5tYW5pcHVsYXRlTGlzdGVuZXJzKGZhbHNlLCBldnQsIGxpc3RlbmVycyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgbGlzdGVuZXJzIGluIGJ1bGsgdXNpbmcgdGhlIG1hbmlwdWxhdGVMaXN0ZW5lcnMgbWV0aG9kLlxuICAgICAqIElmIHlvdSBwYXNzIGFuIG9iamVjdCBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50IHlvdSBjYW4gcmVtb3ZlIGZyb20gbXVsdGlwbGUgZXZlbnRzIGF0IG9uY2UuIFRoZSBvYmplY3Qgc2hvdWxkIGNvbnRhaW4ga2V5IHZhbHVlIHBhaXJzIG9mIGV2ZW50cyBhbmQgbGlzdGVuZXJzIG9yIGxpc3RlbmVyIGFycmF5cy5cbiAgICAgKiBZb3UgY2FuIGFsc28gcGFzcyBpdCBhbiBldmVudCBuYW1lIGFuZCBhbiBhcnJheSBvZiBsaXN0ZW5lcnMgdG8gYmUgcmVtb3ZlZC5cbiAgICAgKiBZb3UgY2FuIGFsc28gcGFzcyBpdCBhIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byByZW1vdmUgdGhlIGxpc3RlbmVycyBmcm9tIGFsbCBldmVudHMgdGhhdCBtYXRjaCBpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdHxSZWdFeHB9IGV2dCBBbiBldmVudCBuYW1lIGlmIHlvdSB3aWxsIHBhc3MgYW4gYXJyYXkgb2YgbGlzdGVuZXJzIG5leHQuIEFuIG9iamVjdCBpZiB5b3Ugd2lzaCB0byByZW1vdmUgZnJvbSBtdWx0aXBsZSBldmVudHMgYXQgb25jZS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9uW119IFtsaXN0ZW5lcnNdIEFuIG9wdGlvbmFsIGFycmF5IG9mIGxpc3RlbmVyIGZ1bmN0aW9ucyB0byByZW1vdmUuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgcHJvdG8ucmVtb3ZlTGlzdGVuZXJzID0gZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXJzKGV2dCwgbGlzdGVuZXJzKSB7XG4gICAgICAgIC8vIFBhc3MgdGhyb3VnaCB0byBtYW5pcHVsYXRlTGlzdGVuZXJzXG4gICAgICAgIHJldHVybiB0aGlzLm1hbmlwdWxhdGVMaXN0ZW5lcnModHJ1ZSwgZXZ0LCBsaXN0ZW5lcnMpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBFZGl0cyBsaXN0ZW5lcnMgaW4gYnVsay4gVGhlIGFkZExpc3RlbmVycyBhbmQgcmVtb3ZlTGlzdGVuZXJzIG1ldGhvZHMgYm90aCB1c2UgdGhpcyB0byBkbyB0aGVpciBqb2IuIFlvdSBzaG91bGQgcmVhbGx5IHVzZSB0aG9zZSBpbnN0ZWFkLCB0aGlzIGlzIGEgbGl0dGxlIGxvd2VyIGxldmVsLlxuICAgICAqIFRoZSBmaXJzdCBhcmd1bWVudCB3aWxsIGRldGVybWluZSBpZiB0aGUgbGlzdGVuZXJzIGFyZSByZW1vdmVkICh0cnVlKSBvciBhZGRlZCAoZmFsc2UpLlxuICAgICAqIElmIHlvdSBwYXNzIGFuIG9iamVjdCBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50IHlvdSBjYW4gYWRkL3JlbW92ZSBmcm9tIG11bHRpcGxlIGV2ZW50cyBhdCBvbmNlLiBUaGUgb2JqZWN0IHNob3VsZCBjb250YWluIGtleSB2YWx1ZSBwYWlycyBvZiBldmVudHMgYW5kIGxpc3RlbmVycyBvciBsaXN0ZW5lciBhcnJheXMuXG4gICAgICogWW91IGNhbiBhbHNvIHBhc3MgaXQgYW4gZXZlbnQgbmFtZSBhbmQgYW4gYXJyYXkgb2YgbGlzdGVuZXJzIHRvIGJlIGFkZGVkL3JlbW92ZWQuXG4gICAgICogWW91IGNhbiBhbHNvIHBhc3MgaXQgYSByZWd1bGFyIGV4cHJlc3Npb24gdG8gbWFuaXB1bGF0ZSB0aGUgbGlzdGVuZXJzIG9mIGFsbCBldmVudHMgdGhhdCBtYXRjaCBpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gcmVtb3ZlIFRydWUgaWYgeW91IHdhbnQgdG8gcmVtb3ZlIGxpc3RlbmVycywgZmFsc2UgaWYgeW91IHdhbnQgdG8gYWRkLlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdHxSZWdFeHB9IGV2dCBBbiBldmVudCBuYW1lIGlmIHlvdSB3aWxsIHBhc3MgYW4gYXJyYXkgb2YgbGlzdGVuZXJzIG5leHQuIEFuIG9iamVjdCBpZiB5b3Ugd2lzaCB0byBhZGQvcmVtb3ZlIGZyb20gbXVsdGlwbGUgZXZlbnRzIGF0IG9uY2UuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbltdfSBbbGlzdGVuZXJzXSBBbiBvcHRpb25hbCBhcnJheSBvZiBsaXN0ZW5lciBmdW5jdGlvbnMgdG8gYWRkL3JlbW92ZS5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKi9cbiAgICBwcm90by5tYW5pcHVsYXRlTGlzdGVuZXJzID0gZnVuY3Rpb24gbWFuaXB1bGF0ZUxpc3RlbmVycyhyZW1vdmUsIGV2dCwgbGlzdGVuZXJzKSB7XG4gICAgICAgIHZhciBpO1xuICAgICAgICB2YXIgdmFsdWU7XG4gICAgICAgIHZhciBzaW5nbGUgPSByZW1vdmUgPyB0aGlzLnJlbW92ZUxpc3RlbmVyIDogdGhpcy5hZGRMaXN0ZW5lcjtcbiAgICAgICAgdmFyIG11bHRpcGxlID0gcmVtb3ZlID8gdGhpcy5yZW1vdmVMaXN0ZW5lcnMgOiB0aGlzLmFkZExpc3RlbmVycztcblxuICAgICAgICAvLyBJZiBldnQgaXMgYW4gb2JqZWN0IHRoZW4gcGFzcyBlYWNoIG9mIGl0cyBwcm9wZXJ0aWVzIHRvIHRoaXMgbWV0aG9kXG4gICAgICAgIGlmICh0eXBlb2YgZXZ0ID09PSAnb2JqZWN0JyAmJiAhKGV2dCBpbnN0YW5jZW9mIFJlZ0V4cCkpIHtcbiAgICAgICAgICAgIGZvciAoaSBpbiBldnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXZ0Lmhhc093blByb3BlcnR5KGkpICYmICh2YWx1ZSA9IGV2dFtpXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUGFzcyB0aGUgc2luZ2xlIGxpc3RlbmVyIHN0cmFpZ2h0IHRocm91Z2ggdG8gdGhlIHNpbmd1bGFyIG1ldGhvZFxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaW5nbGUuY2FsbCh0aGlzLCBpLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2UgcGFzcyBiYWNrIHRvIHRoZSBtdWx0aXBsZSBmdW5jdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgbXVsdGlwbGUuY2FsbCh0aGlzLCBpLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBTbyBldnQgbXVzdCBiZSBhIHN0cmluZ1xuICAgICAgICAgICAgLy8gQW5kIGxpc3RlbmVycyBtdXN0IGJlIGFuIGFycmF5IG9mIGxpc3RlbmVyc1xuICAgICAgICAgICAgLy8gTG9vcCBvdmVyIGl0IGFuZCBwYXNzIGVhY2ggb25lIHRvIHRoZSBtdWx0aXBsZSBtZXRob2RcbiAgICAgICAgICAgIGkgPSBsaXN0ZW5lcnMubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgIHNpbmdsZS5jYWxsKHRoaXMsIGV2dCwgbGlzdGVuZXJzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFsbCBsaXN0ZW5lcnMgZnJvbSBhIHNwZWNpZmllZCBldmVudC5cbiAgICAgKiBJZiB5b3UgZG8gbm90IHNwZWNpZnkgYW4gZXZlbnQgdGhlbiBhbGwgbGlzdGVuZXJzIHdpbGwgYmUgcmVtb3ZlZC5cbiAgICAgKiBUaGF0IG1lYW5zIGV2ZXJ5IGV2ZW50IHdpbGwgYmUgZW1wdGllZC5cbiAgICAgKiBZb3UgY2FuIGFsc28gcGFzcyBhIHJlZ2V4IHRvIHJlbW92ZSBhbGwgZXZlbnRzIHRoYXQgbWF0Y2ggaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xSZWdFeHB9IFtldnRdIE9wdGlvbmFsIG5hbWUgb2YgdGhlIGV2ZW50IHRvIHJlbW92ZSBhbGwgbGlzdGVuZXJzIGZvci4gV2lsbCByZW1vdmUgZnJvbSBldmVyeSBldmVudCBpZiBub3QgcGFzc2VkLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLnJlbW92ZUV2ZW50ID0gZnVuY3Rpb24gcmVtb3ZlRXZlbnQoZXZ0KSB7XG4gICAgICAgIHZhciB0eXBlID0gdHlwZW9mIGV2dDtcbiAgICAgICAgdmFyIGV2ZW50cyA9IHRoaXMuX2dldEV2ZW50cygpO1xuICAgICAgICB2YXIga2V5O1xuXG4gICAgICAgIC8vIFJlbW92ZSBkaWZmZXJlbnQgdGhpbmdzIGRlcGVuZGluZyBvbiB0aGUgc3RhdGUgb2YgZXZ0XG4gICAgICAgIGlmICh0eXBlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgLy8gUmVtb3ZlIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBzcGVjaWZpZWQgZXZlbnRcbiAgICAgICAgICAgIGRlbGV0ZSBldmVudHNbZXZ0XTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChldnQgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSBhbGwgZXZlbnRzIG1hdGNoaW5nIHRoZSByZWdleC5cbiAgICAgICAgICAgIGZvciAoa2V5IGluIGV2ZW50cykge1xuICAgICAgICAgICAgICAgIGlmIChldmVudHMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBldnQudGVzdChrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBldmVudHNba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgYWxsIGxpc3RlbmVycyBpbiBhbGwgZXZlbnRzXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fZXZlbnRzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFsaWFzIG9mIHJlbW92ZUV2ZW50LlxuICAgICAqXG4gICAgICogQWRkZWQgdG8gbWlycm9yIHRoZSBub2RlIEFQSS5cbiAgICAgKi9cbiAgICBwcm90by5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBhbGlhcygncmVtb3ZlRXZlbnQnKTtcblxuICAgIC8qKlxuICAgICAqIEVtaXRzIGFuIGV2ZW50IG9mIHlvdXIgY2hvaWNlLlxuICAgICAqIFdoZW4gZW1pdHRlZCwgZXZlcnkgbGlzdGVuZXIgYXR0YWNoZWQgdG8gdGhhdCBldmVudCB3aWxsIGJlIGV4ZWN1dGVkLlxuICAgICAqIElmIHlvdSBwYXNzIHRoZSBvcHRpb25hbCBhcmd1bWVudCBhcnJheSB0aGVuIHRob3NlIGFyZ3VtZW50cyB3aWxsIGJlIHBhc3NlZCB0byBldmVyeSBsaXN0ZW5lciB1cG9uIGV4ZWN1dGlvbi5cbiAgICAgKiBCZWNhdXNlIGl0IHVzZXMgYGFwcGx5YCwgeW91ciBhcnJheSBvZiBhcmd1bWVudHMgd2lsbCBiZSBwYXNzZWQgYXMgaWYgeW91IHdyb3RlIHRoZW0gb3V0IHNlcGFyYXRlbHkuXG4gICAgICogU28gdGhleSB3aWxsIG5vdCBhcnJpdmUgd2l0aGluIHRoZSBhcnJheSBvbiB0aGUgb3RoZXIgc2lkZSwgdGhleSB3aWxsIGJlIHNlcGFyYXRlLlxuICAgICAqIFlvdSBjYW4gYWxzbyBwYXNzIGEgcmVndWxhciBleHByZXNzaW9uIHRvIGVtaXQgdG8gYWxsIGV2ZW50cyB0aGF0IG1hdGNoIGl0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8UmVnRXhwfSBldnQgTmFtZSBvZiB0aGUgZXZlbnQgdG8gZW1pdCBhbmQgZXhlY3V0ZSBsaXN0ZW5lcnMgZm9yLlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IFthcmdzXSBPcHRpb25hbCBhcnJheSBvZiBhcmd1bWVudHMgdG8gYmUgcGFzc2VkIHRvIGVhY2ggbGlzdGVuZXIuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgcHJvdG8uZW1pdEV2ZW50ID0gZnVuY3Rpb24gZW1pdEV2ZW50KGV2dCwgYXJncykge1xuICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5nZXRMaXN0ZW5lcnNBc09iamVjdChldnQpO1xuICAgICAgICB2YXIgbGlzdGVuZXI7XG4gICAgICAgIHZhciBpO1xuICAgICAgICB2YXIga2V5O1xuICAgICAgICB2YXIgcmVzcG9uc2U7XG5cbiAgICAgICAgZm9yIChrZXkgaW4gbGlzdGVuZXJzKSB7XG4gICAgICAgICAgICBpZiAobGlzdGVuZXJzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBpID0gbGlzdGVuZXJzW2tleV0ubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGUgbGlzdGVuZXIgcmV0dXJucyB0cnVlIHRoZW4gaXQgc2hhbGwgYmUgcmVtb3ZlZCBmcm9tIHRoZSBldmVudFxuICAgICAgICAgICAgICAgICAgICAvLyBUaGUgZnVuY3Rpb24gaXMgZXhlY3V0ZWQgZWl0aGVyIHdpdGggYSBiYXNpYyBjYWxsIG9yIGFuIGFwcGx5IGlmIHRoZXJlIGlzIGFuIGFyZ3MgYXJyYXlcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXIgPSBsaXN0ZW5lcnNba2V5XVtpXTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXIub25jZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcihldnQsIGxpc3RlbmVyLmxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gbGlzdGVuZXIubGlzdGVuZXIuYXBwbHkodGhpcywgYXJncyB8fCBbXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlID09PSB0aGlzLl9nZXRPbmNlUmV0dXJuVmFsdWUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcihldnQsIGxpc3RlbmVyLmxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBbGlhcyBvZiBlbWl0RXZlbnRcbiAgICAgKi9cbiAgICBwcm90by50cmlnZ2VyID0gYWxpYXMoJ2VtaXRFdmVudCcpO1xuXG4gICAgLyoqXG4gICAgICogU3VidGx5IGRpZmZlcmVudCBmcm9tIGVtaXRFdmVudCBpbiB0aGF0IGl0IHdpbGwgcGFzcyBpdHMgYXJndW1lbnRzIG9uIHRvIHRoZSBsaXN0ZW5lcnMsIGFzIG9wcG9zZWQgdG8gdGFraW5nIGEgc2luZ2xlIGFycmF5IG9mIGFyZ3VtZW50cyB0byBwYXNzIG9uLlxuICAgICAqIEFzIHdpdGggZW1pdEV2ZW50LCB5b3UgY2FuIHBhc3MgYSByZWdleCBpbiBwbGFjZSBvZiB0aGUgZXZlbnQgbmFtZSB0byBlbWl0IHRvIGFsbCBldmVudHMgdGhhdCBtYXRjaCBpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfFJlZ0V4cH0gZXZ0IE5hbWUgb2YgdGhlIGV2ZW50IHRvIGVtaXQgYW5kIGV4ZWN1dGUgbGlzdGVuZXJzIGZvci5cbiAgICAgKiBAcGFyYW0gey4uLip9IE9wdGlvbmFsIGFkZGl0aW9uYWwgYXJndW1lbnRzIHRvIGJlIHBhc3NlZCB0byBlYWNoIGxpc3RlbmVyLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLmVtaXQgPSBmdW5jdGlvbiBlbWl0KGV2dCkge1xuICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgIHJldHVybiB0aGlzLmVtaXRFdmVudChldnQsIGFyZ3MpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBjdXJyZW50IHZhbHVlIHRvIGNoZWNrIGFnYWluc3Qgd2hlbiBleGVjdXRpbmcgbGlzdGVuZXJzLiBJZiBhXG4gICAgICogbGlzdGVuZXJzIHJldHVybiB2YWx1ZSBtYXRjaGVzIHRoZSBvbmUgc2V0IGhlcmUgdGhlbiBpdCB3aWxsIGJlIHJlbW92ZWRcbiAgICAgKiBhZnRlciBleGVjdXRpb24uIFRoaXMgdmFsdWUgZGVmYXVsdHMgdG8gdHJ1ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIG5ldyB2YWx1ZSB0byBjaGVjayBmb3Igd2hlbiBleGVjdXRpbmcgbGlzdGVuZXJzLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLnNldE9uY2VSZXR1cm5WYWx1ZSA9IGZ1bmN0aW9uIHNldE9uY2VSZXR1cm5WYWx1ZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9vbmNlUmV0dXJuVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEZldGNoZXMgdGhlIGN1cnJlbnQgdmFsdWUgdG8gY2hlY2sgYWdhaW5zdCB3aGVuIGV4ZWN1dGluZyBsaXN0ZW5lcnMuIElmXG4gICAgICogdGhlIGxpc3RlbmVycyByZXR1cm4gdmFsdWUgbWF0Y2hlcyB0aGlzIG9uZSB0aGVuIGl0IHNob3VsZCBiZSByZW1vdmVkXG4gICAgICogYXV0b21hdGljYWxseS4gSXQgd2lsbCByZXR1cm4gdHJ1ZSBieSBkZWZhdWx0LlxuICAgICAqXG4gICAgICogQHJldHVybiB7KnxCb29sZWFufSBUaGUgY3VycmVudCB2YWx1ZSB0byBjaGVjayBmb3Igb3IgdGhlIGRlZmF1bHQsIHRydWUuXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgcHJvdG8uX2dldE9uY2VSZXR1cm5WYWx1ZSA9IGZ1bmN0aW9uIF9nZXRPbmNlUmV0dXJuVmFsdWUoKSB7XG4gICAgICAgIGlmICh0aGlzLmhhc093blByb3BlcnR5KCdfb25jZVJldHVyblZhbHVlJykpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9vbmNlUmV0dXJuVmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBGZXRjaGVzIHRoZSBldmVudHMgb2JqZWN0IGFuZCBjcmVhdGVzIG9uZSBpZiByZXF1aXJlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIGV2ZW50cyBzdG9yYWdlIG9iamVjdC5cbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBwcm90by5fZ2V0RXZlbnRzID0gZnVuY3Rpb24gX2dldEV2ZW50cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50cyB8fCAodGhpcy5fZXZlbnRzID0ge30pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXZlcnRzIHRoZSBnbG9iYWwge0BsaW5rIEV2ZW50RW1pdHRlcn0gdG8gaXRzIHByZXZpb3VzIHZhbHVlIGFuZCByZXR1cm5zIGEgcmVmZXJlbmNlIHRvIHRoaXMgdmVyc2lvbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBOb24gY29uZmxpY3RpbmcgRXZlbnRFbWl0dGVyIGNsYXNzLlxuICAgICAqL1xuICAgIEV2ZW50RW1pdHRlci5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gbm9Db25mbGljdCgpIHtcbiAgICAgICAgZXhwb3J0cy5FdmVudEVtaXR0ZXIgPSBvcmlnaW5hbEdsb2JhbFZhbHVlO1xuICAgICAgICByZXR1cm4gRXZlbnRFbWl0dGVyO1xuICAgIH07XG5cbiAgICAvLyBFeHBvc2UgdGhlIGNsYXNzIGVpdGhlciB2aWEgQU1ELCBDb21tb25KUyBvciB0aGUgZ2xvYmFsIG9iamVjdFxuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBFdmVudEVtaXR0ZXI7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyl7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZXhwb3J0cy5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG4gICAgfVxufS5jYWxsKHRoaXMpKTtcbiIsIiMjIypcbiAqIFRoZSBwdXJwb3NlIG9mIHRoaXMgbGF5ZXIgaXMgdG8gZGVjbGFyZSBhbmQgYWJzdHJhY3QgdGhlIGFjY2VzcyB0b1xuICogdGhlIGNvcmUgYmFzZSBvZiBsaWJyYXJpZXMgdGhhdCB0aGUgcmVzdCBvZiB0aGUgc3RhY2sgKHRoZSBhcHAgZnJhbWV3b3JrKVxuICogd2lsbCBkZXBlbmQuXG4gKiBAYXV0aG9yIEZyYW5jaXNjbyBSYW1pbmkgPGZyYW1pbmkgYXQgZ21haWwuY29tPlxuIyMjXG4oKHJvb3QsIGZhY3RvcnkpIC0+XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3Rvcnkocm9vdCwge30pXG5cbikod2luZG93LCAocm9vdCwgQmFzZSkgLT5cblxuICAgICMgQXJyYXkgdGhhdCBob2xkcyBoYXJkIGRlcGVuZGVuY2llcyBmb3IgdGhlIFNES1xuICAgIGRlcGVuZGVuY2llcyA9IFtcbiAgICAgICAgICAgIFwibmFtZVwiOiBcImpRdWVyeVwiXG4gICAgICAgICAgICBcInJlcXVpcmVkXCI6IFwiMS4xMFwiICMgcmVxdWlyZWQgdmVyc2lvblxuICAgICAgICAgICAgXCJvYmpcIjogcm9vdC4kICMgZ2xvYmFsIG9iamVjdFxuICAgICAgICAgICAgXCJ2ZXJzaW9uXCI6IGlmIHJvb3QuJCB0aGVuIHJvb3QuJC5mbi5qcXVlcnkgZWxzZSAwICMgZ2l2ZXMgdGhlIHZlcnNpb24gbnVtYmVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICMgb2YgdGhlIGxvYWRlZCBsaWJcbiAgICAgICAgLFxuICAgICAgICAgICAgXCJuYW1lXCI6IFwiVW5kZXJzY29yZVwiXG4gICAgICAgICAgICBcInJlcXVpcmVkXCI6IFwiMS43LjBcIiAjIHJlcXVpcmVkIHZlcnNpb25cbiAgICAgICAgICAgIFwib2JqXCI6IHJvb3QuXyAjIGdsb2JhbCBvYmplY3RcbiAgICAgICAgICAgIFwidmVyc2lvblwiOiBpZiByb290Ll8gdGhlbiByb290Ll8uVkVSU0lPTiBlbHNlIDBcbiAgICBdXG5cbiAgICAjIFZlcnNpb24gY2hlY2tlciB1dGlsXG4gICAgVmVyc2lvbkNoZWNrZXIgPSByZXF1aXJlICcuL3V0aWwvdmVyc2lvbmNoZWNrZXIuY29mZmVlJ1xuXG4gICAgIyBJbiBjYXNlIGFueSBvZiBvdXIgZGVwZW5kZW5jaWVzIHdlcmUgbm90IGxvYWRlZCwgb3IgaXRzIHZlcnNpb24gZG9lc3Qgbm90IGNvcnJlc3BvbmQgdG8gb3Vyc1xuICAgICMgbmVlZHMsIHRoZSB2ZXJzaW9uQ2hlY2tlciB3aWxsIHRob3J3IGFuIGVycm9yIGV4cGxhaW5pbmcgd2h5XG4gICAgVmVyc2lvbkNoZWNrZXIuY2hlY2soZGVwZW5kZW5jaWVzKVxuXG4gICAgIyBMb2dnZXJcbiAgICBCYXNlLmxvZyA9IHJlcXVpcmUgJy4vdXRpbC9sb2dnZXIuY29mZmVlJ1xuXG4gICAgIyBEZXZpY2UgZGV0ZWN0aW9uXG4gICAgQmFzZS5kZXZpY2UgPSByZXF1aXJlICcuL3V0aWwvZGV2aWNlZGV0ZWN0aW9uLmNvZmZlZSdcblxuICAgICMgQ29va2llcyBBUElcbiAgICBCYXNlLmNvb2tpZXMgPSByZXF1aXJlICcuL3V0aWwvY29va2llcy5jb2ZmZWUnXG5cbiAgICAjIFZpZXdwb3J0IGRldGVjdGlvblxuICAgIEJhc2UudnAgPSByZXF1aXJlICcuL3V0aWwvdmlld3BvcnRkZXRlY3Rpb24uY29mZmVlJ1xuXG4gICAgIyBGdW5jdGlvbiB0aGF0IGlzIGdvbm5hIGhhbmRsZSByZXNwb25zaXZlIGltYWdlc1xuICAgIEJhc2UuSW1hZ2VyID0gcmVxdWlyZSAnaW1hZ2VyLmpzJ1xuXG4gICAgIyBFdmVudCBCdXNcbiAgICBCYXNlLkV2ZW50cyA9IHJlcXVpcmUgJy4vdXRpbC9ldmVudGJ1cy5jb2ZmZWUnXG5cbiAgICAjIEdlbmVyYWwgVXRpbHNcbiAgICBVdGlscyA9IHJlcXVpcmUgJy4vdXRpbC9nZW5lcmFsLmNvZmZlZSdcblxuICAgICMgVXRpbHNcbiAgICBCYXNlLnV0aWwgPSByb290Ll8uZXh0ZW5kIFV0aWxzLCByb290Ll9cblxuICAgIHJldHVybiBCYXNlXG4pIiwiKChyb290LCBmYWN0b3J5KSAtPlxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJvb3QsIHt9KVxuXG4pKHdpbmRvdywgKHJvb3QsIEV4dCkgLT5cblxuICAgIEJhc2UgICA9IHJlcXVpcmUoJy4vLi4vYmFzZS5jb2ZmZWUnKVxuICAgIE1vZHVsZSA9IHJlcXVpcmUoJy4vLi4vdXRpbC9tb2R1bGUuY29mZmVlJylcblxuICAgIGNsYXNzIENvbXBvbmVudFxuXG4gICAgICAgICMgb2JqZWN0IHRvIHN0b3JlIGluaXRpYWxpemVkIGNvbXBvbmVudHNcbiAgICAgICAgQGluaXRpYWxpemVkQ29tcG9uZW50cyA6IHt9XG5cbiAgICAgICAgIyMjKlxuICAgICAgICAgKiBzdGFydEFsbCBtZXRob2RcbiAgICAgICAgICogVGhpcyBtZXRob2Qgd2lsbCBsb29rIGZvciBjb21wb25lbnRzIHRvIHN0YXJ0IHdpdGhpbiB0aGUgcGFzc2VkIHNlbGVjdG9yXG4gICAgICAgICAqIGFuZCBjYWxsIHRoZWlyIC5pbml0aWFsaXplKCkgbWV0aG9kXG4gICAgICAgICAqIEBhdXRob3IgRnJhbmNpc2NvIFJhbWluaSA8ZnJhbmNpc2NvLnJhbWluaSBhdCBnbG9iYW50LmNvbT5cbiAgICAgICAgICogQHBhcmFtICB7W3R5cGVdfSBzZWxlY3RvciA9ICdib2R5Jy4gQ1NTIHNlbGVjdG9yIHRvIHRlbGwgdGhlIGFwcCB3aGVyZSB0byBsb29rIGZvciBjb21wb25lbnRzXG4gICAgICAgICAqIEByZXR1cm4ge1t0eXBlXX1cbiAgICAgICAgIyMjXG4gICAgICAgIEBzdGFydEFsbDogKHNlbGVjdG9yID0gJ2JvZHknLCBhcHAsIG5hbWVzcGFjZSA9IFBlc3RsZS5tb2R1bGVzKSAtPlxuXG4gICAgICAgICAgICBjb21wb25lbnRzID0gQ29tcG9uZW50LnBhcnNlKHNlbGVjdG9yLCBhcHAuY29uZmlnLm5hbWVzcGFjZSlcblxuICAgICAgICAgICAgY21wY2xvbmUgPSBCYXNlLnV0aWwuY2xvbmUgY29tcG9uZW50c1xuXG4gICAgICAgICAgICBCYXNlLmxvZy5pbmZvIFwiUGFyc2VkIGNvbXBvbmVudHNcIlxuICAgICAgICAgICAgQmFzZS5sb2cuZGVidWcgY21wY2xvbmVcblxuICAgICAgICAgICAgIyBhZGRlZCB0byBrZWVwIG5hbWVzcGFjZS5OQU1FID0gREVGSU5JVElPTiBzaW50YXguIFRoaXMgd2lsbCBleHRlbmRcbiAgICAgICAgICAgICMgdGhlIG9iamVjdCBkZWZpbml0aW9uIHdpdGggdGhlIE1vZHVsZSBjbGFzc1xuICAgICAgICAgICAgIyB0aGlzIG1pZ2h0IG5lZWQgdG8gYmUgcmVtb3ZlZFxuICAgICAgICAgICAgdW5sZXNzIEJhc2UudXRpbC5pc0VtcHR5IGNvbXBvbmVudHNcbiAgICAgICAgICAgICAgICBCYXNlLnV0aWwuZWFjaCBuYW1lc3BhY2UsIChkZWZpbml0aW9uLCBuYW1lKSAtPlxuICAgICAgICAgICAgICAgICAgICB1bmxlc3MgQmFzZS51dGlsLmlzRnVuY3Rpb24gZGVmaW5pdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgTW9kdWxlLmV4dGVuZCBuYW1lLCBkZWZpbml0aW9uXG5cbiAgICAgICAgICAgICMgZ3JhYiBhIHJlZmVyZW5jZSBvZiBhbGwgdGhlIG1vZHVsZSBkZWZpbmVkIHVzaW5nIHRoZSBNb2R1bGUuYWRkXG4gICAgICAgICAgICAjIG1ldGhvZC5cbiAgICAgICAgICAgIEJhc2UudXRpbC5leHRlbmQgbmFtZXNwYWNlLCBQZXN0bGUuTW9kdWxlLmxpc3RcblxuICAgICAgICAgICAgQ29tcG9uZW50Lmluc3RhbnRpYXRlKGNvbXBvbmVudHMsIGFwcClcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBhbGw6IENvbXBvbmVudC5pbml0aWFsaXplZENvbXBvbmVudHNcbiAgICAgICAgICAgICAgICBuZXc6IGNtcGNsb25lXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgIyMjKlxuICAgICAgICAgKiB0aGUgcGFyc2UgbWV0aG9kIHdpbGwgbG9vayBmb3IgY29tcG9uZW50cyBkZWZpbmVkIHVzaW5nXG4gICAgICAgICAqIHRoZSBjb25maWd1cmVkIG5hbWVzcGFjZSBhbmQgbGl2aW5nIHdpdGhpbiB0aGUgcGFzc2VkXG4gICAgICAgICAqIENTUyBzZWxlY3RvclxuICAgICAgICAgKiBAYXV0aG9yIEZyYW5jaXNjbyBSYW1pbmkgPGZyYW1pbmkgYXQgZ21haWwuY29tPlxuICAgICAgICAgKiBAcGFyYW0gIHtbdHlwZV19IHNlbGVjdG9yICBbZGVzY3JpcHRpb25dXG4gICAgICAgICAqIEBwYXJhbSAge1t0eXBlXX0gbmFtZXNwYWNlIFtkZXNjcmlwdGlvbl1cbiAgICAgICAgICogQHJldHVybiB7W3R5cGVdfSAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAgICAjIyNcbiAgICAgICAgQHBhcnNlOiAoc2VsZWN0b3IsIG5hbWVzcGFjZSkgLT5cbiAgICAgICAgICAgICMgYXJyYXkgdG8gc3RvcmUgcGFyc2VkIGNvbXBvbmVudHNcbiAgICAgICAgICAgIGxpc3QgPSBbXVxuXG4gICAgICAgICAgICAjIGlmIGFuIGFycmF5IGlzIHBhc3NlZCwgdXNlIGl0IGFzIGl0IGlzXG4gICAgICAgICAgICBpZiBCYXNlLnV0aWwuaXNBcnJheSBuYW1lc3BhY2VcbiAgICAgICAgICAgICAgICBuYW1lc3BhY2VzID0gbmFtZXNwYWNlXG4gICAgICAgICAgICAjIGlmIGEgc3RyaW5nIGlzIHBhc3NlZCBhcyBwYXJhbWV0ZXIsIGNvbnZlcnQgaXQgdG8gYW4gYXJyYXlcbiAgICAgICAgICAgIGVsc2UgaWYgQmFzZS51dGlsLmlzU3RyaW5nIG5hbWVzcGFjZVxuICAgICAgICAgICAgICAgIG5hbWVzcGFjZXMgPSBuYW1lc3BhY2Uuc3BsaXQgJywnXG5cbiAgICAgICAgICAgICMgYXJyYXkgdG8gc3RvcmUgdGhlIGNvbXBvc2VkIGNzcyBzZWxlY3RvciB0aGF0IHdpbGwgbG9vayB1cCBmb3JcbiAgICAgICAgICAgICMgY29tcG9uZW50IGRlZmluaXRpb25zXG4gICAgICAgICAgICBjc3NTZWxlY3RvcnMgPSBbXVxuXG4gICAgICAgICAgICAjIGl0ZXJhdGVzIG92ZXIgdGhlIG5hbWVzcGFjZSBhcnJheSBhbmQgY3JlYXRlIHRoZSBuZWVkZWQgY3NzIHNlbGVjdG9yc1xuICAgICAgICAgICAgQmFzZS51dGlsLmVhY2ggbmFtZXNwYWNlcywgKG5zLCBpKSAtPlxuICAgICAgICAgICAgICAgICMgaWYgYSBuZXcgbmFtZXNwYWNlIGhhcyBiZWVuIHByb3ZpZGVkIGxldHMgYWRkIGl0IHRvIHRoZSBsaXN0XG4gICAgICAgICAgICAgICAgY3NzU2VsZWN0b3JzLnB1c2ggXCJbZGF0YS1cIiArIG5zICsgXCItY29tcG9uZW50XVwiXG5cbiAgICAgICAgICAgICMgVE9ETzogQWNjZXNzIHRoZXNlIERPTSBmdW5jdGlvbmFsaXR5IHRocm91Z2ggQmFzZVxuICAgICAgICAgICAgJChzZWxlY3RvcikuZmluZChjc3NTZWxlY3RvcnMuam9pbignLCcpKS5lYWNoIChpLCBjb21wKSAtPlxuXG4gICAgICAgICAgICAgICAgIyBpZiB0aGUgY29tcCBhbHJlYWR5IGhhcyB0aGUgcGVzdGxlLWd1aWQgYXR0YWNoZWQsIGl0IG1lYW5zXG4gICAgICAgICAgICAgICAgIyBpdCB3YXMgYWxyZWFkeSBzdGFydGVkLCBzbyB3ZSdsbCBvbmx5IGxvb2sgZm9yIHVubml0aWFsaXplZFxuICAgICAgICAgICAgICAgICMgY29tcG9uZW50cyBoZXJlXG4gICAgICAgICAgICAgICAgdW5sZXNzICQoY29tcCkuZGF0YSgncGVzdGxlLWd1aWQnKVxuXG4gICAgICAgICAgICAgICAgICAgIG5zID0gZG8gKCkgLT5cbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVzcGFjZSA9IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIEJhc2UudXRpbC5lYWNoIG5hbWVzcGFjZXMsIChucywgaSkgLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAjIFRoaXMgd2F5IHdlIG9idGFpbiB0aGUgbmFtZXNwYWNlIG9mIHRoZSBjdXJyZW50IGNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICQoY29tcCkuZGF0YShucyArIFwiLWNvbXBvbmVudFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lc3BhY2UgPSBuc1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmFtZXNwYWNlXG5cbiAgICAgICAgICAgICAgICAgICAgIyBvcHRpb25zIHdpbGwgaG9sZCBhbGwgdGhlIGRhdGEtKiBhdHRyaWJ1dGVzIHJlbGF0ZWQgdG8gdGhlIGNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zID0gQ29tcG9uZW50LnBhcnNlQ29tcG9uZW50T3B0aW9ucyhALCBucylcblxuICAgICAgICAgICAgICAgICAgICBsaXN0LnB1c2goeyBuYW1lOiBvcHRpb25zLm5hbWUsIG9wdGlvbnM6IG9wdGlvbnMgfSlcblxuICAgICAgICAgICAgcmV0dXJuIGxpc3RcblxuICAgICAgICAjIHRoaXMgbWV0aG9kIHdpbGwgYmUgaW4gY2hhcmdlIG9mIHBhcnNpbmcgYWxsIHRoZSBkYXRhLSogYXR0cmlidXRlc1xuICAgICAgICAjIGRlZmluZWQgaW4gdGhlIGl0cyAkZWwgbWFya3VwIGFuZCBwbGFjaW5nIHRoZW0gaW4gYSBvYmplY3RcbiAgICAgICAgQHBhcnNlQ29tcG9uZW50T3B0aW9uczogKGVsLCBuYW1lc3BhY2UsIG9wdHMpIC0+XG4gICAgICAgICAgICBvcHRpb25zID0gQmFzZS51dGlsLmNsb25lKG9wdHMgfHwge30pXG4gICAgICAgICAgICBvcHRpb25zLmVsID0gZWxcblxuICAgICAgICAgICAgIyBUT0RPOiBhY2Nlc3MgdGhpcyBET00gZnVuY3Rpb24gdGhyb3VnaCBCYXNlXG4gICAgICAgICAgICBkYXRhID0gJChlbCkuZGF0YSgpXG4gICAgICAgICAgICBuYW1lID0gJydcbiAgICAgICAgICAgIGxlbmd0aCA9IDBcblxuICAgICAgICAgICAgQmFzZS51dGlsLmVhY2ggZGF0YSwgKHYsIGspIC0+XG5cbiAgICAgICAgICAgICAgICAjIHJlbW92ZXMgdGhlIG5hbWVzcGFjZVxuICAgICAgICAgICAgICAgIGsgPSBrLnJlcGxhY2UobmV3IFJlZ0V4cChcIl5cIiArIG5hbWVzcGFjZSksIFwiXCIpXG5cbiAgICAgICAgICAgICAgICAjIGRlY2FtZWxpemUgdGhlIG9wdGlvbiBuYW1lXG4gICAgICAgICAgICAgICAgayA9IGsuY2hhckF0KDApLnRvTG93ZXJDYXNlKCkgKyBrLnNsaWNlKDEpXG5cbiAgICAgICAgICAgICAgICAjIGlmIHRoZSBrZXkgaXMgZGlmZmVyZW50IGZyb20gXCJjb21wb25lbnRcIiBpdCBtZWFucyBpdCBpc1xuICAgICAgICAgICAgICAgICMgYW4gb3B0aW9uIHZhbHVlXG4gICAgICAgICAgICAgICAgaWYgayAhPSBcImNvbXBvbmVudFwiXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnNba10gPSB2XG4gICAgICAgICAgICAgICAgICAgIGxlbmd0aCsrXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBuYW1lID0gdlxuXG4gICAgICAgICAgICAjIGFkZCBvbmUgYmVjYXVzZSB3ZSd2ZSBhZGRlZCAnZWwnIGF1dG9tYXRpY2FsbHkgYXMgYW4gZXh0cmEgb3B0aW9uXG4gICAgICAgICAgICBvcHRpb25zLmxlbmd0aCA9IGxlbmd0aCArIDFcblxuICAgICAgICAgICAgIyBidWlsZCBhZCByZXR1cm4gdGhlIG9wdGlvbiBvYmplY3RcbiAgICAgICAgICAgIENvbXBvbmVudC5idWlsZE9wdGlvbnNPYmplY3QobmFtZSwgb3B0aW9ucylcblxuXG4gICAgICAgIEBidWlsZE9wdGlvbnNPYmplY3Q6IChuYW1lLCBvcHRpb25zKSAtPlxuXG4gICAgICAgICAgICBvcHRpb25zLm5hbWUgPSBuYW1lXG5cbiAgICAgICAgICAgIHJldHVybiBvcHRpb25zXG5cbiAgICAgICAgQGluc3RhbnRpYXRlOiAoY29tcG9uZW50cywgYXBwKSAtPlxuXG4gICAgICAgICAgICBpZiBjb21wb25lbnRzLmxlbmd0aCA+IDBcblxuICAgICAgICAgICAgICAgIG0gPSBjb21wb25lbnRzLnNoaWZ0KClcblxuICAgICAgICAgICAgICAgICMgQ2hlY2sgaWYgdGhlIG1vZHVsZXMgYXJlIGRlZmluZWQgdXNpbmcgdGhlIG1vZHVsZXMgbmFtZXNwYWNlXG4gICAgICAgICAgICAgICAgIyBUT0RPOiBQcm92aWRlIGFuIGFsdGVybmF0ZSB3YXkgdG8gZGVmaW5lIHRoZVxuICAgICAgICAgICAgICAgICMgZ2xvYmFsIG9iamVjdCB0aGF0IGlzIGdvbm5hIGhvbGQgdGhlIG1vZHVsZSBkZWZpbml0aW9uXG4gICAgICAgICAgICAgICAgaWYgbm90IEJhc2UudXRpbC5pc0VtcHR5KFBlc3RsZS5tb2R1bGVzKSBhbmQgUGVzdGxlLm1vZHVsZXNbbS5uYW1lXSBhbmQgbS5vcHRpb25zXG4gICAgICAgICAgICAgICAgICAgIG1vZCA9IFBlc3RsZS5tb2R1bGVzW20ubmFtZV1cblxuICAgICAgICAgICAgICAgICAgICAjIGNyZWF0ZSBhIG5ldyBzYW5kYm94IGZvciB0aGlzIG1vZHVsZVxuICAgICAgICAgICAgICAgICAgICBzYiA9IGFwcC5jcmVhdGVTYW5kYm94KG0ubmFtZSlcblxuICAgICAgICAgICAgICAgICAgICAjIGdlbmVyYXRlcyBhbiB1bmlxdWUgZ3VpZCBmb3IgdGhlIG1vZHVsZVxuICAgICAgICAgICAgICAgICAgICBtLm9wdGlvbnMuZ3VpZCA9IEJhc2UudXRpbC51bmlxdWVJZChtLm5hbWUgKyBcIl9cIilcblxuICAgICAgICAgICAgICAgICAgICBtLm9wdGlvbnMuX19kZWZhdWx0c19fID0gYXBwLmNvbmZpZy5jb21wb25lbnRbbS5uYW1lXVxuXG4gICAgICAgICAgICAgICAgICAgICMgaW5qZWN0IHRoZSBzYW5kYm94IGFuZCB0aGUgb3B0aW9ucyBpbiB0aGUgbW9kdWxlIHByb3RvXG4gICAgICAgICAgICAgICAgICAgICMgQmFzZS51dGlsLmV4dGVuZCBtb2QsIHNhbmRib3ggOiBzYiwgb3B0aW9uczogbS5vcHRpb25zXG4gICAgICAgICAgICAgICAgICAgIG1vZHggPSBuZXcgbW9kKHNhbmRib3ggOiBzYiwgb3B0aW9uczogbS5vcHRpb25zKVxuXG4gICAgICAgICAgICAgICAgICAgICMgaW5pdCB0aGUgbW9kdWxlXG4gICAgICAgICAgICAgICAgICAgIG1vZHguaW5pdGlhbGl6ZSgpXG5cbiAgICAgICAgICAgICAgICAgICAgIyBzdG9yZSBhIHJlZmVyZW5jZSBvZiB0aGUgZ2VuZXJhdGVkIGd1aWQgb24gdGhlIGVsXG4gICAgICAgICAgICAgICAgICAgICQobS5vcHRpb25zLmVsKS5kYXRhICdwZXN0bGUtZ3VpZCcsIG0ub3B0aW9ucy5ndWlkXG5cbiAgICAgICAgICAgICAgICAgICAgIyBzYXZlcyBhIHJlZmVyZW5jZSBvZiB0aGUgaW5pdGlhbGl6ZWQgbW9kdWxlXG4gICAgICAgICAgICAgICAgICAgIENvbXBvbmVudC5pbml0aWFsaXplZENvbXBvbmVudHNbIG0ub3B0aW9ucy5ndWlkIF0gPSBtb2R4XG5cbiAgICAgICAgICAgICAgICBDb21wb25lbnQuaW5zdGFudGlhdGUoY29tcG9uZW50cywgYXBwKVxuXG5cbiAgICAjI1xuICAgICMgcmV0dXJucyBhbiBvYmplY3Qgd2l0aCB0aGUgaW5pdGlhbGl6ZSBtZXRob2QgdGhhdCB3aWxsIGluaXQgdGhlIGV4dGVuc2lvblxuICAgICMjXG5cbiAgICAjIGNvbnN0cnVjdG9yXG4gICAgaW5pdGlhbGl6ZSA6IChhcHApIC0+XG5cbiAgICAgICAgQmFzZS5sb2cuaW5mbyBcIltleHRdIENvbXBvbmVudCBleHRlbnNpb24gaW5pdGlhbGl6ZWRcIlxuXG4gICAgICAgIGluaXRpYWxpemVkQ29tcG9uZW50cyA9IHt9XG5cbiAgICAgICAgYXBwLnNhbmRib3guc3RhcnRDb21wb25lbnRzID0gKHNlbGVjdG9yLCBhcHApIC0+XG5cbiAgICAgICAgICAgIGluaXRpYWxpemVkQ29tcG9uZW50cyA9IENvbXBvbmVudC5zdGFydEFsbChzZWxlY3RvciwgYXBwKVxuXG4gICAgICAgIGFwcC5zYW5kYm94LmdldEluaXRpYWxpemVkQ29tcG9uZW50cyA9ICgpIC0+XG5cbiAgICAgICAgICAgIHJldHVybiBpbml0aWFsaXplZENvbXBvbmVudHMuYWxsXG5cbiAgICAgICAgYXBwLnNhbmRib3guZ2V0TGFzdGVzdEluaXRpYWxpemVkQ29tcG9uZW50cyA9ICgpIC0+XG5cbiAgICAgICAgICAgIHJldHVybiBpbml0aWFsaXplZENvbXBvbmVudHMubmV3XG5cblxuICAgICMgdGhpcyBtZXRob2Qgd2lsbCBiZSBjYWxsZWQgb25jZSBhbGwgdGhlIGV4dGVuc2lvbnMgaGF2ZSBiZWVuIGxvYWRlZFxuICAgIGFmdGVyQXBwU3RhcnRlZDogKHNlbGVjdG9yLCBhcHApIC0+XG5cbiAgICAgICAgQmFzZS5sb2cuaW5mbyBcIkNhbGxpbmcgc3RhcnRDb21wb25lbnRzIGZyb20gYWZ0ZXJBcHBTdGFydGVkXCJcbiAgICAgICAgcyA9IGlmIHNlbGVjdG9yIHRoZW4gc2VsZWN0b3IgZWxzZSBudWxsXG4gICAgICAgIGFwcC5zYW5kYm94LnN0YXJ0Q29tcG9uZW50cyhzLCBhcHApXG5cbiAgICBuYW1lOiAnQ29tcG9uZW50IEV4dGVuc2lvbidcblxuICAgICMgdGhpcyBwcm9wZXJ0eSB3aWxsIGJlIHVzZWQgZm9yIHRlc3RpbmcgcHVycG9zZXNcbiAgICAjIHRvIHZhbGlkYXRlIHRoZSBDb21wb25lbnQgY2xhc3MgaW4gaXNvbGF0aW9uXG4gICAgY2xhc3NlcyA6IENvbXBvbmVudFxuXG4gICAgIyBUaGUgZXhwb3NlZCBrZXkgbmFtZSB0aGF0IGNvdWxkIGJlIHVzZWQgdG8gcGFzcyBvcHRpb25zXG4gICAgIyB0byB0aGUgZXh0ZW5zaW9uLlxuICAgICMgVGhpcyBpcyBnb25uYSBiZSB1c2VkIHdoZW4gaW5zdGFudGlhdGluZyB0aGUgQ29yZSBvYmplY3QuXG4gICAgIyBOb3RlOiBCeSBjb252ZW50aW9uIHdlJ2xsIHVzZSB0aGUgZmlsZW5hbWVcbiAgICBvcHRpb25LZXk6ICdjb21wb25lbnRzJ1xuKVxuIiwiIyMjKlxuICogVGhpcyBleHRlbnNpb24gd2lsbCBiZSB0cmlnZ2VyaW5nIGV2ZW50cyBvbmNlIHRoZSBEZXZpY2UgaW4gd2hpY2ggdGhlXG4gKiB1c2VyIGlzIG5hdmlnYXRpbmcgdGhlIHNpdGUgaXMgZGV0ZWN0ZWQuIEl0cyBmdWNpb25hbGl0eSBtb3N0bHkgZGVwZW5kc1xuICogb24gdGhlIGNvbmZpZ3VyYXRpb25zIHNldHRpbmdzIChwcm92aWRlZCBieSBkZWZhdWx0LCBidXQgdGhleSBjYW4gYmUgb3ZlcnJpZGVuKVxuIyMjXG4oKHJvb3QsIGZhY3RvcnkpIC0+XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3Rvcnkocm9vdCwge30pXG5cbikod2luZG93LCAocm9vdCwgRXh0KSAtPlxuXG4gICAgQmFzZSA9IHJlcXVpcmUoJy4vLi4vYmFzZS5jb2ZmZWUnKVxuXG4gICAgY2xhc3MgUmVzcG9uc2l2ZURlc2lnblxuXG4gICAgICAgIGNmZyA6XG4gICAgICAgICAgICAjIFRoaXMgbGltaXQgd2lsbCBiZSB1c2VkIHRvIG1ha2UgdGhlIGRldmljZSBkZXRlY3Rpb25cbiAgICAgICAgICAgICMgd2hlbiB0aGUgdXNlciByZXNpemUgdGhlIHdpbmRvd1xuICAgICAgICAgICAgd2FpdExpbWl0OiAzMDBcblxuICAgICAgICAgICAgIyBkZWZpbmVzIGlmIHdlIGhhdmUgdG8gbGlzdGVuIGZvciB0aGUgcmVzaXplIGV2ZW50IG9uIHRoZSB3aW5kb3cgb2JqXG4gICAgICAgICAgICB3aW5kb3dSZXNpemVFdmVudDogdHJ1ZVxuXG4gICAgICAgICAgICAjIERlZmF1bHQgYnJlYWtwb2ludHNcbiAgICAgICAgICAgIGJyZWFrcG9pbnRzIDogW1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1vYmlsZVwiXG4gICAgICAgICAgICAgICAgICAgICMgdW50aWwgdGhpcyBwb2ludCB3aWxsIGJlaGF2ZXMgYXMgbW9iaWxlXG4gICAgICAgICAgICAgICAgICAgIGJwbWluOiAwXG4gICAgICAgICAgICAgICAgICAgIGJwbWF4OiA3NjdcbiAgICAgICAgICAgICAgICAsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidGFibGV0XCJcbiAgICAgICAgICAgICAgICAgICAgYnBtaW46IDc2OFxuICAgICAgICAgICAgICAgICAgICBicG1heDogOTU5XG4gICAgICAgICAgICAgICAgLFxuICAgICAgICAgICAgICAgICAgICAjIGJ5IGRlZmF1bHQgYW55dGhpbmcgZ3JlYXRlciB0aGFuIHRhYmxldCBpcyBhIGRlc2t0b3BcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkZXNrdG9wXCJcbiAgICAgICAgICAgICAgICAgICAgYnBtaW46IDk2MFxuICAgICAgICAgICAgXVxuXG4gICAgICAgIGNvbnN0cnVjdG9yOiAoY29uZmlnID0ge30pIC0+XG5cbiAgICAgICAgICAgIEJhc2UudXRpbC5iaW5kQWxsIEAsIFwiX2luaXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcImRldGVjdERldmljZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwiX2NoZWNrVmlld3BvcnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcIl9hdHRhY2hXaW5kb3dIYW5kbGVyc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJnZXREZXZpY2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgIFwiX3Jlc2l6ZUhhbmRsZXJcIlxuXG4gICAgICAgICAgICBAY29uZmlnID0gQmFzZS51dGlsLmV4dGVuZCB7fSwgQGNmZywgY29uZmlnXG5cbiAgICAgICAgICAgIEBfaW5pdCgpXG5cbiAgICAgICAgX2luaXQ6ICgpIC0+XG5cbiAgICAgICAgICAgIEBfYXR0YWNoV2luZG93SGFuZGxlcnMoKSBpZiBAY29uZmlnLndpbmRvd1Jlc2l6ZUV2ZW50XG5cbiAgICAgICAgICAgIEBkZXRlY3REZXZpY2UoKVxuXG4gICAgICAgIF9hdHRhY2hXaW5kb3dIYW5kbGVyczogKCkgLT5cblxuICAgICAgICAgICAgbGF6eVJlc2l6ZSA9IEJhc2UudXRpbC5kZWJvdW5jZSBAX3Jlc2l6ZUhhbmRsZXIsIEBjb25maWcud2FpdExpbWl0XG5cbiAgICAgICAgICAgICQod2luZG93KS5yZXNpemUobGF6eVJlc2l6ZSlcblxuICAgICAgICBfcmVzaXplSGFuZGxlcjogKCkgLT5cbiAgICAgICAgICAgICMgdHJpZ2dlcnMgYSB3aW5kb3dzcmVzaXplIGV2ZW50IHNvIHRoaXMgd2F5IHdlIGhhdmUgYSBjZW50cmFsaXplZFxuICAgICAgICAgICAgIyB3YXkgdG8gbGlzdGVuIGZvciB0aGUgcmVzaXplIGV2ZW50IG9uIHRoZSB3aW5kb3dzIGFuZCB0aGUgY29tcG9uZW5zXG4gICAgICAgICAgICAjIGNhbiBsaXN0ZW4gZGlyZWN0bHkgdG8gdGhpcyBldmVudCBpbnN0ZWFkIG9mIGRlZmluaW5nIGEgbmV3IGxpc3RlbmVyXG4gICAgICAgICAgICBQZXN0bGUuZW1pdCBcInJ3ZDp3aW5kb3dyZXNpemVcIlxuXG4gICAgICAgICAgICBAZGV0ZWN0RGV2aWNlKClcblxuICAgICAgICBkZXRlY3REZXZpY2U6ICgpIC0+XG5cbiAgICAgICAgICAgIGJwID0gQGNvbmZpZy5icmVha3BvaW50c1xuXG4gICAgICAgICAgICB2cCA9IEJhc2UudnAudmlld3BvcnRXKClcblxuICAgICAgICAgICAgIyBnZXQgYSByZWZlcmVuY2UgKGlmIGFueSkgdG8gdGhlIGNvcnJlc3BvbmRpbmcgYnJlYWtwb2ludFxuICAgICAgICAgICAgIyBkZWZpbmVkIGluIHRoZSBjb25maWcuXG4gICAgICAgICAgICB2cGQgPSBAX2NoZWNrVmlld3BvcnQodnAsIGJwKVxuXG4gICAgICAgICAgICBpZiBub3QgQmFzZS51dGlsLmlzRW1wdHkgdnBkXG5cbiAgICAgICAgICAgICAgICBjYXBpdGFsaXplZEJQTmFtZSA9IEJhc2UudXRpbC5zdHJpbmcuY2FwaXRhbGl6ZSh2cGQubmFtZSlcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAjIGxldCdzIGZpc3QgY2hlY2sgaWYgd2UgaGF2ZSBhIG1ldGhvZCB0byBkZXRlY3QgdGhlIGRldmljZSB0aHJvdWdoIFVBXG4gICAgICAgICAgICAgICAgaWYgQmFzZS51dGlsLmlzRnVuY3Rpb24gQmFzZS5kZXZpY2VbJ2lzJyArIGNhcGl0YWxpemVkQlBOYW1lXVxuICAgICAgICAgICAgICAgICAgICBVQURldGVjdG9yID0gQmFzZS5kZXZpY2VbJ2lzJyArIGNhcGl0YWxpemVkQlBOYW1lXVxuXG4gICAgICAgICAgICAgICAgIyB2YXJpYWJsZSB0aGF0IGhvbGRzIHRoZSByZXN1bHQgb2YgYSBVQSBjaGVjay5cbiAgICAgICAgICAgICAgICAjIFVubGVzcyB0aGVyZSBpcyBhIG1ldGhvZCB0byBjaGVjayB0aGUgVUEsIGxldHNcbiAgICAgICAgICAgICAgICAjIGxlYXZlIGl0IGFzIGZhbHNlIGFuZCB1c2Ugb25seSB0aGUgdmlld3BvcnQgdG9cbiAgICAgICAgICAgICAgICAjIG1ha2UgdGhlIGRldmljZSBkZXRlY3Rpb25cbiAgICAgICAgICAgICAgICBzdGF0ZVVBID0gZmFsc2VcbiAgICAgICAgICAgICAgICBpZiBCYXNlLnV0aWwuaXNGdW5jdGlvbiBVQURldGVjdG9yXG5cbiAgICAgICAgICAgICAgICAgICAgc3RhdGVVQSA9IFVBRGV0ZWN0b3IoKVxuXG4gICAgICAgICAgICAgICAgIyBGaW5hbCBjaGVjay4gRmlyc3Qgd2UnbGwgdHJ5IHRvIG1ha2UgdG8gbWFrZSB0aGUgZGVjaXNpb25cbiAgICAgICAgICAgICAgICAjIHVwb24gdGhlIGN1cnJlbnQgZGV2aWNlIGJhc2VkIG9uIFVBLCBpZiBpcyBub3QgcG9zc2libGUsIGxldHMganVzdFxuICAgICAgICAgICAgICAgICMgdXNlIHRoZSB2aWV3cG9ydFxuICAgICAgICAgICAgICAgIGlmIHN0YXRlVUEgb3IgdnBkLm5hbWVcbiAgICAgICAgICAgICAgICAgICAgIyBUcmlnZ2VyIGEgZXZlbnQgdGhhdCBmb2xsb3dzIHRoZSBmb2xsb3dpbmcgbmFtaW5nIGNvbnZlbnRpb25cbiAgICAgICAgICAgICAgICAgICAgIyByd2Q6PGRldmljZT5cbiAgICAgICAgICAgICAgICAgICAgIyBFeGFtcGxlOiByd2Q6dGFibGV0IG9yIHJ3ZDptb2JpbGVcblxuICAgICAgICAgICAgICAgICAgICBldnQgPSAncndkOicgKyB2cGQubmFtZS50b0xvd2VyQ2FzZSgpXG5cbiAgICAgICAgICAgICAgICAgICAgQmFzZS5sb2cuaW5mbyBcIltleHRdIFJlc3BvbnNpdmUgRGVzaWduIGV4dGVuc2lvbiBpcyB0cmlnZ2VyaW5nIHRoZSBmb2xsb3dpbmdcIlxuICAgICAgICAgICAgICAgICAgICBCYXNlLmxvZy5pbmZvIGV2dFxuXG4gICAgICAgICAgICAgICAgICAgIFBlc3RsZS5lbWl0IGV2dFxuXG4gICAgICAgICAgICAgICAgICAgICMgU3RvcmUgdGhlIGN1cnJlbnQgZGV2aWNlXG4gICAgICAgICAgICAgICAgICAgIEBkZXZpY2UgPSB2cGQubmFtZS50b0xvd2VyQ2FzZSgpXG5cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBtc2cgPSBcIltleHRdIFRoZSBwYXNzZWQgc2V0dGluZ3MgdG8gdGhlIFJlc3BvbnNpdmUgRGVzaWduIEV4dGVuc2lvbiBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwibWlnaHQgbm90IGJlIGNvcnJlY3Qgc2luY2Ugd2UgaGF2ZW4ndCBiZWVuIGFibGUgdG8gZGV0ZWN0IGFuIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhc29jaWF0ZWQgYnJlYWtwb2ludCB0byB0aGUgY3VycmVudCB2aWV3cG9ydFwiXG4gICAgICAgICAgICAgICAgQmFzZS5sb2cud2FybiBtc2dcblxuICAgICAgICBnZXREZXZpY2U6ICgpIC0+XG5cbiAgICAgICAgICAgIHJldHVybiBAZGV2aWNlXG5cbiAgICAgICAgIyMjKlxuICAgICAgICAgKiBkZXRlY3QgaWYgdGhlIGN1cnJlbnQgdmlld3BvcnRcbiAgICAgICAgICogY29ycmVzcG9uZCB0byBhbnkgb2YgdGhlIGRlZmluZWQgYnAgaW4gdGhlIGNvbmZpZyBzZXR0aW5nXG4gICAgICAgICAqIEBwYXJhbSAge1t0eXBlXX0gdnAgW251bWJlci4gQ3VycmVudCB2aWV3cG9ydF1cbiAgICAgICAgICogQHBhcmFtICB7W3R5cGVdfSBicmVha3BvaW50cyBbY2xvbmUgb2YgdGhlIGJyZWFrcG9pbnQga2V5IG9iamVjdF1cbiAgICAgICAgICogQHJldHVybiB7W3R5cGVdfSB0aGUgYnJlYWtwb2ludCB0aGF0IGNvcnJlc3BvbmRzIHRvIHRoZSBjdXJyZW50bHlcbiAgICAgICAgICogICAgICAgICAgICAgICAgICBkZXRlY3RlZCB2aWV3cG9ydFxuICAgICAgICAjIyNcbiAgICAgICAgX2NoZWNrVmlld3BvcnQ6ICh2cCwgYnJlYWtwb2ludHMpIC0+XG5cbiAgICAgICAgICAgIGJyZWFrcG9pbnQgPSBCYXNlLnV0aWwuZmlsdGVyKGJyZWFrcG9pbnRzLCAoYnApIC0+XG5cbiAgICAgICAgICAgICAgICAjIHN0YXJ0cyBjaGVja2luZyBpZiB0aGUgZGV0ZWN0ZWQgdmlld3BvcnQgaXNcbiAgICAgICAgICAgICAgICAjIGJpZ2dlciB0aGFuIHRoZSBicG1pbiBkZWZpbmVkIGluIHRoZSBjdXJyZW50XG4gICAgICAgICAgICAgICAgIyBpdGVyYXRlZCBicmVha3BvaW50XG4gICAgICAgICAgICAgICAgaWYgdnAgPj0gYnAuYnBtaW5cblxuICAgICAgICAgICAgICAgICAgICAjIHdlJ2xsIG5lZWQgdG8gY2hlY2sgdGhpcyB3YXkgYmVjYXVzZSBieSBkZWZhdWx0XG4gICAgICAgICAgICAgICAgICAgICMgaWYgYSBCUCBkb2Vzbid0IGhhdmUgYSBicG1heCBwcm9wZXJ0eSBpdCBtZWFuc1xuICAgICAgICAgICAgICAgICAgICAjIGlzIHRoZSBsYXN0IGFuZCBiaWdnZXIgY2FzZSB0byBjaGVjay4gQnkgZGVmYXVsdFxuICAgICAgICAgICAgICAgICAgICAjIGlzIGRlc2t0b3BcbiAgICAgICAgICAgICAgICAgICAgaWYgYnAuYnBtYXggYW5kIGJwLmJwbWF4ICE9IDBcblxuICAgICAgICAgICAgICAgICAgICAgICAgIyBpZiBpdCdzIHdpdGhpbiB0aGUgcmFuZ2UsIGFsbCBnb29kXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiB2cCA8PSBicC5icG1heFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG5cbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgIyB0aGlzIHNob3VsZCBvbmx5IGJlIHRydWUgaW4gb25seSBvbmUgY2FzZVxuICAgICAgICAgICAgICAgICAgICAgICAgIyBCeSBkZWZhdWx0LCBqdXN0IGZvciBkZXNrdG9wIHdoaWNoIGRvZXNuJ3QgaGF2ZVxuICAgICAgICAgICAgICAgICAgICAgICAgIyBhbiBcInVudGlsXCIgYnJlYWtwb2ludFxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcblxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgZmFsc2VcblxuICAgICAgICAgICAgKVxuXG4gICAgICAgICAgICBpZiBicmVha3BvaW50Lmxlbmd0aCA+IDBcbiAgICAgICAgICAgICAgICByZXR1cm4gYnJlYWtwb2ludC5zaGlmdCgpXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHt9XG5cblxuICAgICMgcmV0dXJucyBhbiBvYmplY3Qgd2l0aCB0aGUgaW5pdGlhbGl6ZSBtZXRob2QgdGhhdCB3aWxsIGJlIHVzZWQgdG9cbiAgICAjIGluaXQgdGhlIGV4dGVuc2lvblxuICAgIGluaXRpYWxpemUgOiAoYXBwKSAtPlxuXG4gICAgICAgIEJhc2UubG9nLmluZm8gXCJbZXh0XSBSZXNwb25zaXZlIERlc2lnbiBFeHRlbnNpb24gaW5pdGlhbGl6ZWRcIlxuXG4gICAgICAgIGNvbmZpZyA9IHt9XG5cbiAgICAgICAgIyBDaGVjayBpZiB0aGUgZXh0ZW5zaW9uIGhhcyBhIGN1c3RvbSBjb25maWcgdG8gdXNlXG4gICAgICAgIGlmIGFwcC5jb25maWcuZXh0ZW5zaW9uIGFuZCBhcHAuY29uZmlnLmV4dGVuc2lvbltAb3B0aW9uS2V5XVxuICAgICAgICAgICAgY29uZmlnID0gQmFzZS51dGlsLmRlZmF1bHRzIHt9LCBhcHAuY29uZmlnLmV4dGVuc2lvbltAb3B0aW9uS2V5XVxuXG4gICAgICAgIHJ3ZCA9IG5ldyBSZXNwb25zaXZlRGVzaWduKGNvbmZpZylcblxuICAgICAgICBhcHAuc2FuZGJveC5yd2QgPSAoKSAtPlxuICAgICAgICAgICAgIyBjYWxsIGRldGVjdCBEZXZpY2UgaW4gb3JkZXIgdG8gdHJpZ2dlciB0aGUgY29ycmVzcG9uZGluZ1xuICAgICAgICAgICAgIyBkZXZpY2UgZXZlbnRcbiAgICAgICAgICAgIHJ3ZC5kZXRlY3REZXZpY2UoKVxuXG4gICAgICAgIGFwcC5zYW5kYm94LnJ3ZC5nZXREZXZpY2UgPSAoKSAtPlxuXG4gICAgICAgICAgICByd2QuZ2V0RGV2aWNlKClcblxuICAgICMgdGhpcyBtZXRob2QgaXMgbWVhbnQgdG8gYmUgZXhlY3V0ZWQgYWZ0ZXIgY29tcG9uZW50cyBoYXZlIGJlZW5cbiAgICAjIGluaXRpYWxpemVkXG4gICAgYWZ0ZXJBcHBJbml0aWFsaXplZDogKGFwcCkgLT5cblxuICAgICAgICBCYXNlLmxvZy5pbmZvIFwiYWZ0ZXJBcHBJbml0aWFsaXplZCBtZXRob2QgZnJvbSBSZXNwb25zaXZlRGVzaWduXCJcblxuICAgICAgICBhcHAuc2FuZGJveC5yd2QoKVxuXG4gICAgbmFtZTogJ1Jlc3BvbnNpdmUgRGVzaWduIEV4dGVuc2lvbidcblxuICAgICMgVGhlIGV4cG9zZWQga2V5IG5hbWUgdGhhdCBjb3VsZCBiZSB1c2VkIHRvIHBhc3Mgb3B0aW9uc1xuICAgICMgdG8gdGhlIGV4dGVuc2lvbi5cbiAgICAjIFRoaXMgaXMgZ29ubmEgYmUgdXNlZCB3aGVuIGluc3RhbnRpYXRpbmcgdGhlIENvcmUgb2JqZWN0LlxuICAgICMgTm90ZTogQnkgY29udmVudGlvbiB3ZSdsbCB1c2UgdGhlIGZpbGVuYW1lXG4gICAgb3B0aW9uS2V5OiAncmVzcG9uc2l2ZWRlc2lnbidcbikiLCIjIyMqXG4gKiBUaGlzIGV4dGVuc2lvbiB3aWxsIGJlIGhhbmRsaW5nIHRoZSBjcmVhdGlvbiBvZiB0aGUgcmVzcG9uc2l2ZSBpbWFnZXNcbiMjI1xuKChyb290LCBmYWN0b3J5KSAtPlxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJvb3QsIHt9KVxuXG4pKHdpbmRvdywgKHJvb3QsIEV4dCkgLT5cblxuICAgIEJhc2UgPSByZXF1aXJlKCcuLy4uL2Jhc2UuY29mZmVlJylcblxuICAgIGNsYXNzIFJlc3BvbnNpdmVJbWFnZXNcblxuICAgICAgICBjZmcgOlxuICAgICAgICAgICAgIyBBcnJheSBvZiBzdXBwb3J0ZWQgUGl4ZWwgd2lkdGggZm9yIGltYWdlc1xuICAgICAgICAgICAgYXZhaWxhYmxlV2lkdGhzOiBbMTMzLDE1MiwxNjIsMjI1LDIxMCwyMjQsMjgwLDM1Miw0NzAsNTM2LDU5MCw2NzYsNzEwLDc2OCw4ODUsOTQ1LDExOTBdXG5cbiAgICAgICAgICAgICMgQXJyYXkgb2Ygc3VwcG9ydGVyIHBpeGVsIHJhdGlvc1xuICAgICAgICAgICAgYXZhaWxhYmxlUGl4ZWxSYXRpb3M6IFsxLCAyLCAzXVxuXG4gICAgICAgICAgICAjIFNlbGVjdG9yIHRvIGJlIHVzZWQgd2hlbiBpbnN0YW50aW5nIEltYWdlclxuICAgICAgICAgICAgZGVmYXVsdFNlbGVjdG9yIDogJy5kZWxheWVkLWltYWdlLWxvYWQnXG5cbiAgICAgICAgICAgICMgbGF6eSBtb2RlIGVuYWJsZWRcbiAgICAgICAgICAgIGxhenltb2RlIDogdHJ1ZVxuXG4gICAgICAgIGNvbnN0cnVjdG9yOiAoY29uZmlnID0ge30pIC0+XG5cbiAgICAgICAgICAgIEJhc2UudXRpbC5iaW5kQWxsIEAsIFwiX2luaXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcIl9jcmVhdGVMaXN0ZW5lcnNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcIl9jcmVhdGVJbnN0YW5jZVwiXG5cbiAgICAgICAgICAgIEBjb25maWcgPSBCYXNlLnV0aWwuZXh0ZW5kIHt9LCBAY2ZnLCBjb25maWdcblxuICAgICAgICAgICAgQF9pbml0KClcblxuICAgICAgICBfaW5pdDogKCkgLT5cblxuICAgICAgICAgICAgIyBjcmVhdGVzIGxpc3RlbmVycyB0byBhbGxvdyB0aGUgaW5zdGFudGlhdG9uIG9mIHRoZSBJbWFnZXJcbiAgICAgICAgICAgICMgaW4gbGF6eSBsb2FkIG1vZGUuXG4gICAgICAgICAgICAjIFVzZWZ1bCBmb3IgaW5maW5pdGUgc2Nyb2xscyBvciBpbWFnZXMgY3JlYXRlZCBvbiBkZW1hbmRcbiAgICAgICAgICAgIEBfY3JlYXRlTGlzdGVuZXJzKCkgaWYgQGNvbmZpZy5sYXp5bW9kZVxuXG4gICAgICAgICAgICAjIEFzIHNvb24gYXMgdGhpcyBleHRlbnNpb24gaXMgaW5pdGlhbGl6ZWQgd2UgYXJlIGdvbm5hIGJlIGNyZWF0aW5nXG4gICAgICAgICAgICAjIHRoZSByZXNwb25zaXZlIGltYWdlc1xuICAgICAgICAgICAgQF9jcmVhdGVJbnN0YW5jZSgpXG5cbiAgICAgICAgX2NyZWF0ZUxpc3RlbmVyczogKCkgLT5cbiAgICAgICAgICAgICMgdGhpcyBnaXZlcyB0aGUgYWJpbGl0eSB0byBjcmVhdGUgcmVzcG9uc2l2ZSBpbWFnZXNcbiAgICAgICAgICAgICMgYnkgdHJpZ2dlciB0aGlzIGV2ZW50IHdpdGggb3B0aW9uYWwgYXR0cmlidXRlc1xuICAgICAgICAgICAgUGVzdGxlLm9uICdyZXNwb25zaXZlaW1hZ2VzOmNyZWF0ZScsIEBfY3JlYXRlSW5zdGFuY2VcblxuICAgICAgICBfY3JlYXRlSW5zdGFuY2UgOiAob3B0aW9ucyA9IHt9KSAtPlxuXG4gICAgICAgICAgICBCYXNlLmxvZy5pbmZvIFwiW2V4dF0gUmVzcG9uc2l2ZSBJbWFnZXMgRXh0ZW5zaW9uIGNyZWF0aW5nIGEgbmV3IEltYWdlciBpbnN0YW5jZVwiXG5cbiAgICAgICAgICAgIHNlbGVjdG9yID0gb3B0aW9ucy5zZWxlY3RvciBvciBAY29uZmlnLmRlZmF1bHRTZWxlY3RvclxuICAgICAgICAgICAgb3B0cyA9IGlmIG5vdCBCYXNlLnV0aWwuaXNFbXB0eSBvcHRpb25zIHRoZW4gb3B0aW9ucyBlbHNlIEBjb25maWdcblxuICAgICAgICAgICAgbmV3IEJhc2UuSW1hZ2VyKHNlbGVjdG9yLCBvcHRzKVxuXG4gICAgIyByZXR1cm5zIGFuIG9iamVjdCB3aXRoIHRoZSBpbml0aWFsaXplIG1ldGhvZCB0aGF0IHdpbGwgYmUgdXNlZCB0b1xuICAgICMgaW5pdCB0aGUgZXh0ZW5zaW9uXG4gICAgaW5pdGlhbGl6ZSA6IChhcHApIC0+XG5cbiAgICAgICAgQmFzZS5sb2cuaW5mbyBcIltleHRdIFJlc3BvbnNpdmUgSW1hZ2VzIEV4dGVuc2lvbiBpbml0aWFsaXplZFwiXG5cbiAgICAgICAgY29uZmlnID0ge31cblxuICAgICAgICAjIENoZWNrIGlmIHRoZSBleHRlbnNpb24gaGFzIGEgY3VzdG9tIGNvbmZpZyB0byB1c2VcbiAgICAgICAgaWYgYXBwLmNvbmZpZy5leHRlbnNpb24gYW5kIGFwcC5jb25maWcuZXh0ZW5zaW9uW0BvcHRpb25LZXldXG4gICAgICAgICAgICBjb25maWcgPSBCYXNlLnV0aWwuZGVmYXVsdHMge30sIGFwcC5jb25maWcuZXh0ZW5zaW9uW0BvcHRpb25LZXldXG5cbiAgICAgICAgYXBwLnNhbmRib3gucmVzcG9uc2l2ZWltYWdlcyA9ICgpIC0+XG5cbiAgICAgICAgICAgIHJwID0gbmV3IFJlc3BvbnNpdmVJbWFnZXMoY29uZmlnKVxuXG4gICAgICAgICAgICAjIHRyaWdnZXIgdGhlIGV2ZW50IHRvIGxldCBldmVyeWJvZHkga25vd3MgdGhhdCB0aGlzIGV4dGVuc2lvbiBmaW5pc2hlZFxuICAgICAgICAgICAgIyBpdHMgaW5pdGlhbGl6YXRpb25cbiAgICAgICAgICAgIFBlc3RsZS5lbWl0ICdyZXNwb25zaXZlaW1hZ2VzOmluaXRpYWxpemVkJ1xuXG4gICAgIyB0aGlzIG1ldGhvZCBpcyBtZWFudCB0byBiZSBleGVjdXRlZCBhZnRlciBjb21wb25lbnRzIGhhdmUgYmVlblxuICAgICMgaW5pdGlhbGl6ZWRcbiAgICBhZnRlckFwcEluaXRpYWxpemVkOiAoYXBwKSAtPlxuXG4gICAgICAgIEJhc2UubG9nLmluZm8gXCJhZnRlckFwcEluaXRpYWxpemVkIG1ldGhvZCBmcm9tIFJlc3BvbnNpdmVJbWFnZXNcIlxuXG4gICAgICAgIGFwcC5zYW5kYm94LnJlc3BvbnNpdmVpbWFnZXMoKVxuXG5cbiAgICBuYW1lOiAnUmVzcG9uc2l2ZSBJbWFnZXMgRXh0ZW5zaW9uJ1xuXG4gICAgIyBUaGUgZXhwb3NlZCBrZXkgbmFtZSB0aGF0IGNvdWxkIGJlIHVzZWQgdG8gcGFzcyBvcHRpb25zXG4gICAgIyB0byB0aGUgZXh0ZW5zaW9uLlxuICAgICMgVGhpcyBpcyBnb25uYSBiZSB1c2VkIHdoZW4gaW5zdGFudGlhdGluZyB0aGUgQ29yZSBvYmplY3QuXG4gICAgIyBOb3RlOiBCeSBjb252ZW50aW9uIHdlJ2xsIHVzZSB0aGUgZmlsZW5hbWVcbiAgICBvcHRpb25LZXk6ICdyZXNwb25zaXZlaW1hZ2VzJ1xuKVxuIiwiKChyb290LCBmYWN0b3J5KSAtPlxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJvb3QsIHt9KVxuXG4pKHdpbmRvdywgKHJvb3QsIENvb2tpZXMpIC0+XG5cbiAgICAjIExvZ2dlclxuICAgIGNvb2tpZXMgPSByZXF1aXJlKCdjb29raWVzLWpzJylcblxuICAgICMgRXhwb3NlIENvb2tpZXMgQVBJXG4gICAgQ29va2llcyA9XG5cbiAgICAgICAgc2V0OiAoa2V5LCB2YWx1ZSwgb3B0aW9ucykgLT5cbiAgICAgICAgICAgIGNvb2tpZXMuc2V0IGtleSwgdmFsdWUsIG9wdGlvbnNcblxuICAgICAgICBnZXQ6IChrZXkpIC0+XG4gICAgICAgICAgICBjb29raWVzLmdldCBrZXlcblxuICAgICAgICBleHBpcmU6IChrZXksIG9wdGlvbnMpIC0+XG4gICAgICAgICAgICBjb29raWVzLmV4cGlyZSBrZXksIG9wdGlvbnNcblxuICAgIHJldHVybiBDb29raWVzXG4pIiwiKChyb290LCBmYWN0b3J5KSAtPlxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJvb3QsIHt9KVxuXG4pKHdpbmRvdywgKHJvb3QsIERldmljZURldGVjdGlvbikgLT5cblxuICAgICMgRGV2aWNlIGRldGVjdGlvblxuICAgIGlzTW9iaWxlID0gcmVxdWlyZSgnaXNtb2JpbGVqcycpXG5cbiAgICAjIEV4cG9zZSBkZXZpY2UgZGV0ZWN0aW9uIEFQSVxuICAgIERldmljZURldGVjdGlvbiA9XG5cbiAgICAgICAgIyBHcm91cHNcbiAgICAgICAgaXNNb2JpbGU6ICgpIC0+XG4gICAgICAgICAgICBpc01vYmlsZS5waG9uZVxuXG4gICAgICAgIGlzVGFibGV0OiAoKSAtPlxuICAgICAgICAgICAgaXNNb2JpbGUudGFibGV0XG5cbiAgICAgICAgIyBBcHBsZSBkZXZpY2VzXG4gICAgICAgIGlzSXBob25lOiAoKSAtPlxuICAgICAgICAgICAgaXNNb2JpbGUuYXBwbGUucGhvbmVcblxuICAgICAgICBpc0lwb2Q6ICgpIC0+XG4gICAgICAgICAgICBpc01vYmlsZS5hcHBsZS5pcG9kXG5cbiAgICAgICAgaXNJcGFkOiAoKSAtPlxuICAgICAgICAgICAgaXNNb2JpbGUuYXBwbGUudGFibGV0XG5cbiAgICAgICAgaXNBcHBsZSA6ICgpIC0+XG4gICAgICAgICAgICBpc01vYmlsZS5hcHBsZS5kZXZpY2VcblxuICAgICAgICAjIEFuZHJvaWQgZGV2aWNlc1xuICAgICAgICBpc0FuZHJvaWRQaG9uZTogKCkgLT5cbiAgICAgICAgICAgIGlzTW9iaWxlLmFuZHJvaWQucGhvbmVcblxuICAgICAgICBpc0FuZHJvaWRUYWJsZXQ6ICgpIC0+XG4gICAgICAgICAgICBpc01vYmlsZS5hbmRyb2lkLnRhYmxldFxuXG4gICAgICAgIGlzQW5kcm9pZERldmljZTogKCkgLT5cbiAgICAgICAgICAgIGlzTW9iaWxlLmFuZHJvaWQuZGV2aWNlXG5cbiAgICAgICAgIyBXaW5kb3dzIGRldmljZXNcbiAgICAgICAgaXNXaW5kb3dzUGhvbmU6ICgpIC0+XG4gICAgICAgICAgICBpc01vYmlsZS53aW5kb3dzLnBob25lXG5cbiAgICAgICAgaXNXaW5kb3dzVGFibGV0OiAoKSAtPlxuICAgICAgICAgICAgaXNNb2JpbGUud2luZG93cy50YWJsZXRcblxuICAgICAgICBpc1dpbmRvd3NEZXZpY2U6ICgpIC0+XG4gICAgICAgICAgICBpc01vYmlsZS53aW5kb3dzLmRldmljZVxuXG4gICAgcmV0dXJuIERldmljZURldGVjdGlvblxuKSIsIigocm9vdCwgZmFjdG9yeSkgLT5cblxuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyb290LCB7fSlcblxuKSh3aW5kb3csIChyb290LCBFdmVudEJ1cykgLT5cblxuICAgIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ3dvbGZ5ODctZXZlbnRlbWl0dGVyJylcblxuICAgICMjIypcbiAgICAgKiBjbGFzcyB0aGF0IHNlcnZlcyBhcyBhIGZhY2FkZSBmb3IgdGhlIEV2ZW50RW1pdHRlciBjbGFzc1xuICAgICMjI1xuICAgIGNsYXNzIEV2ZW50QnVzIGV4dGVuZHMgRXZlbnRFbWl0dGVyXG5cbiAgICByZXR1cm4gRXZlbnRCdXNcbikiLCIjIyMqXG4gKiBUaGUgRXh0ZW5zaW9uIE1hbmFuZ2VyIHdpbGwgcHJvdmlkZSB0aGUgYmFzZSBzZXQgb2YgZnVuY3Rpb25hbGl0aWVzXG4gKiB0byBtYWtlIHRoZSBDb3JlIGxpYnJhcnkgZXh0ZW5zaWJsZS5cbiAqIEBhdXRob3IgRnJhbmNpc2NvIFJhbWluaSA8ZnJhbWluaSBhdCBnbWFpbC5jb20+XG4jIyNcbigocm9vdCwgZmFjdG9yeSkgLT5cblxuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyb290LCB7fSlcblxuKSh3aW5kb3csIChyb290LCBFeHRNYW5hZ2VyKSAtPlxuXG4gICAgQmFzZSA9IHJlcXVpcmUoJy4uL2Jhc2UuY29mZmVlJylcblxuICAgIGNsYXNzIEV4dE1hbmFnZXJcblxuICAgICAgICAjIyMqXG4gICAgICAgICAqIERlZmF1bHRzIGNvbmZpZ3MgZm9yIHRoZSBtb2R1bGVcbiAgICAgICAgICogQHR5cGUge1t0eXBlXX1cbiAgICAgICAgIyMjXG4gICAgICAgIF9leHRlbnNpb25Db25maWdEZWZhdWx0czpcbiAgICAgICAgICAgIGFjdGl2YXRlZCA6IHRydWUgIyB1bmxlc3Mgc2FpZCBvdGhlcndpc2UsIGV2ZXJ5IGFkZGVkIGV4dGVuc2lvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjIHdpbGwgYmUgYWN0aXZhdGVkIG9uIHN0YXJ0XG5cbiAgICAgICAgY29uc3RydWN0b3I6ICgpIC0+XG4gICAgICAgICAgICAjIHRvIGtlZXAgdHJhY2sgb2YgYWxsIGV4dGVuc2lvbnNcbiAgICAgICAgICAgIEBfZXh0ZW5zaW9ucyA9IFtdXG5cbiAgICAgICAgICAgICMgdG8ga2VlcCB0cmFjayBvZiBhbGwgaW5pdGlhbGl6ZWQgZXh0ZW5zaW9uXG4gICAgICAgICAgICBAX2luaXRpYWxpemVkRXh0ZW5zaW9ucyA9IFtdXG5cbiAgICAgICAgYWRkOiAoZXh0KSAtPlxuXG4gICAgICAgICAgICAjIGNoZWNrcyBpZiB0aGUgbmFtZSBmb3IgdGhlIGV4dGVuc2lvbiBoYXZlIGJlZW4gZGVmaW5lZC5cbiAgICAgICAgICAgICMgaWYgbm90IGxvZyBhIHdhcm5pbmcgbWVzc2FnZVxuICAgICAgICAgICAgdW5sZXNzIGV4dC5uYW1lXG4gICAgICAgICAgICAgICAgbXNnID0gXCJUaGUgZXh0ZW5zaW9uIGRvZXNuJ3QgaGF2ZSBhIG5hbWUgYXNzb2NpYXRlZC4gSXQgd2lsbCBiZSBoZXBmdWxsIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICBcImlmIHlvdSBoYXZlIGFzc2luZyBhbGwgb2YgeW91ciBleHRlbnNpb25zIGEgbmFtZSBmb3IgYmV0dGVyIGRlYnVnZ2luZ1wiXG4gICAgICAgICAgICAgICAgQmFzZS5sb2cud2FybiBtc2dcblxuICAgICAgICAgICAgIyBMZXRzIHRocm93IGFuIGVycm9yIGlmIHdlIHRyeSB0byBpbml0aWFsaXplIHRoZSBzYW1lIGV4dGVuc2lvbiB0d2ljZXNcbiAgICAgICAgICAgIEJhc2UudXRpbC5lYWNoIEBfZXh0ZW5zaW9ucywgKHh0LCBpKSAtPlxuICAgICAgICAgICAgICAgIGlmIF8uaXNFcXVhbCB4dCwgZXh0XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkV4dGVuc2lvbjogXCIgKyBleHQubmFtZSArIFwiIGFscmVhZHkgZXhpc3RzLlwiKVxuXG4gICAgICAgICAgICBAX2V4dGVuc2lvbnMucHVzaChleHQpXG5cbiAgICAgICAgaW5pdCA6IChjb250ZXh0KSAtPlxuICAgICAgICAgICAgeHRjbG9uZSA9IEJhc2UudXRpbC5jbG9uZSBAX2V4dGVuc2lvbnNcblxuICAgICAgICAgICAgQmFzZS5sb2cuaW5mbyBcIkFkZGVkIGV4dGVuc2lvbnMgKHN0aWxsIG5vdCBpbml0aWFsaXplZCk6XCJcbiAgICAgICAgICAgIEJhc2UubG9nLmRlYnVnIHh0Y2xvbmVcblxuICAgICAgICAgICAgQF9pbml0RXh0ZW5zaW9uKEBfZXh0ZW5zaW9ucywgY29udGV4dClcblxuICAgICAgICAgICAgQmFzZS5sb2cuaW5mbyBcIkluaXRpYWxpemVkIGV4dGVuc2lvbnM6XCJcbiAgICAgICAgICAgIEJhc2UubG9nLmRlYnVnIEBfaW5pdGlhbGl6ZWRFeHRlbnNpb25zXG5cbiAgICAgICAgX2luaXRFeHRlbnNpb24gOiAoZXh0ZW5zaW9ucywgY29udGV4dCkgLT5cblxuICAgICAgICAgICAgaWYgZXh0ZW5zaW9ucy5sZW5ndGggPiAwXG5cbiAgICAgICAgICAgICAgICB4dCA9IGV4dGVuc2lvbnMuc2hpZnQoKVxuXG4gICAgICAgICAgICAgICAgIyBDYWxsIGV4dGVuc2lvbnMgY29uc3RydWN0b3JcbiAgICAgICAgICAgICAgICBpZiBAX2lzRXh0ZW5zaW9uQWxsb3dlZFRvQmVBY3RpdmF0ZWQoeHQsIGNvbnRleHQuY29uZmlnKVxuICAgICAgICAgICAgICAgICAgICAjIHRoaXMgc3RhdGUgY291bGQgdGVsbCB0byB0aGUgcmVzdCBvZiB0aGUgd29ybGQgaWZcbiAgICAgICAgICAgICAgICAgICAgIyBleHRlbnNpb25zIGhhcyBiZWVuIGluaXRpYWxpemVkIG9yIG5vdFxuICAgICAgICAgICAgICAgICAgICB4dC5hY3RpdmF0ZWQgPSB0cnVlXG5cbiAgICAgICAgICAgICAgICAgICAgIyBjYWxsIHRvIHRoZSBleHRlbnNpb24gaW5pdGlhbGl6ZSBtZXRob2RcbiAgICAgICAgICAgICAgICAgICAgeHQuaW5pdGlhbGl6ZShjb250ZXh0KVxuXG4gICAgICAgICAgICAgICAgICAgICMgS2VlcCB0cmFjayBvZiB0aGUgaW5pdGlhbGl6ZWQgZXh0ZW5zaW9ucyBmb3IgZnV0dXJlIHJlZmVyZW5jZVxuICAgICAgICAgICAgICAgICAgICBAX2luaXRpYWxpemVkRXh0ZW5zaW9ucy5wdXNoIHh0XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICB4dC5hY3RpdmF0ZWQgPSBmYWxzZVxuXG4gICAgICAgICAgICAgICAgIyBjYWxsIHRoaXMgbWV0aG9kIHJlY3Vyc2l2ZWx5IHVudGlsIHRoZXJlIGFyZSBubyBtb3JlXG4gICAgICAgICAgICAgICAgIyBlbGVtZW50cyBpbiB0aGUgYXJyYXlcbiAgICAgICAgICAgICAgICBAX2luaXRFeHRlbnNpb24oZXh0ZW5zaW9ucywgY29udGV4dClcblxuICAgICAgICBfaXNFeHRlbnNpb25BbGxvd2VkVG9CZUFjdGl2YXRlZDogKHh0LCBjb25maWcpIC0+XG5cbiAgICAgICAgICAgICMgZmlyc3Qgd2UgaGF2ZSB0byBtYWtlIHN1cmUgdGhhdCB0aGUgXCJvcHRpb25zXCIga2V5IGlzIGRlZmluZWRcbiAgICAgICAgICAgICMgYnkgdGhlIGV4dGVuc2lvblxuICAgICAgICAgICAgdW5sZXNzIHh0Lm9wdGlvbktleVxuICAgICAgICAgICAgICAgIG1zZyA9IFwiVGhlIG9wdGlvbktleSBpcyByZXF1aXJlZCBhbmQgd2FzIG5vdCBkZWZpbmVkIGJ5OiBcIiArIHh0Lm5hbWVcbiAgICAgICAgICAgICAgICBCYXNlLmxvZy5lcnJvciBtc2dcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKVxuXG4gICAgICAgICAgICAjIGlmIG9wdGlvbnMgd2VyZSBwcm92aWRlZCB0byB0aGUgZXh0ZW5zaW9uLCBsZXRzIGNoZWNrIGp1c3QgZm9yIFwiYWN0aXZhdGVkXCJcbiAgICAgICAgICAgICMgd2hpY2ggaXMgdGhlIG9ubHkgb3B0aW9uIHRoYXQgc2hvdWxkIG1hdHRlciB3aXRoaW4gdGhpcyBtZXRob2RcbiAgICAgICAgICAgIGlmIGNvbmZpZy5leHRlbnNpb24gYW5kIGNvbmZpZy5leHRlbnNpb25beHQub3B0aW9uS2V5XSBhbmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZy5leHRlbnNpb25beHQub3B0aW9uS2V5XS5oYXNPd25Qcm9wZXJ0eSAnYWN0aXZhdGVkJ1xuICAgICAgICAgICAgICAgIGFjdGl2YXRlZCA9IGNvbmZpZy5leHRlbnNpb25beHQub3B0aW9uS2V5XS5hY3RpdmF0ZWRcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBhY3RpdmF0ZWQgPSBAX2V4dGVuc2lvbkNvbmZpZ0RlZmF1bHRzLmFjdGl2YXRlZFxuXG4gICAgICAgICAgICByZXR1cm4gYWN0aXZhdGVkXG5cblxuICAgICAgICBnZXRJbml0aWFsaXplZEV4dGVuc2lvbnMgOiAoKSAtPlxuICAgICAgICAgICAgcmV0dXJuIEBfaW5pdGlhbGl6ZWRFeHRlbnNpb25zXG5cbiAgICAgICAgZ2V0SW5pdGlhbGl6ZWRFeHRlbnNpb25CeU5hbWUgOiAobmFtZSkgLT5cbiAgICAgICAgICAgIEJhc2UudXRpbC53aGVyZSBAX2luaXRpYWxpemVkRXh0ZW5zaW9ucywgb3B0aW9uS2V5OiBuYW1lXG5cbiAgICAgICAgZ2V0RXh0ZW5zaW9ucyA6ICgpIC0+XG4gICAgICAgICAgICByZXR1cm4gQF9leHRlbnNpb25zXG5cbiAgICAgICAgZ2V0RXh0ZW5zaW9uQnlOYW1lIDogKG5hbWUpIC0+XG4gICAgICAgICAgICBCYXNlLnV0aWwud2hlcmUgQF9leHRlbnNpb25zLCBvcHRpb25LZXk6IG5hbWVcblxuICAgIHJldHVybiBFeHRNYW5hZ2VyXG5cbilcbiIsIigocm9vdCwgZmFjdG9yeSkgLT5cblxuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyb290LCB7fSlcblxuKSh3aW5kb3csIChyb290LCBVdGlscykgLT5cblxuICAgICMgRXhwb3NlIFV0aWxzIEFQSVxuICAgIFV0aWxzID1cblxuICAgICAgICAjIyMqXG4gICAgICAgICAqIEZ1bmN0aW9uIHRvIGNvbXBhcmUgbGlicmFyeSB2ZXJzaW9uaW5nXG4gICAgICAgICMjI1xuICAgICAgICB2ZXJzaW9uQ29tcGFyZSA6ICh2MSwgdjIsIG9wdGlvbnMpIC0+XG5cbiAgICAgICAgICAgIGlzVmFsaWRQYXJ0ID0gKHgpIC0+XG4gICAgICAgICAgICAgICAgKChpZiBsZXhpY29ncmFwaGljYWwgdGhlbiAvXlxcZCtbQS1aYS16XSokLyBlbHNlIC9eXFxkKyQvKSkudGVzdCB4XG5cbiAgICAgICAgICAgIGxleGljb2dyYXBoaWNhbCA9IG9wdGlvbnMgYW5kIG9wdGlvbnMubGV4aWNvZ3JhcGhpY2FsXG4gICAgICAgICAgICB6ZXJvRXh0ZW5kID0gb3B0aW9ucyBhbmQgb3B0aW9ucy56ZXJvRXh0ZW5kXG4gICAgICAgICAgICB2MXBhcnRzID0gdjEuc3BsaXQoXCIuXCIpXG4gICAgICAgICAgICB2MnBhcnRzID0gdjIuc3BsaXQoXCIuXCIpXG5cbiAgICAgICAgICAgIHJldHVybiBOYU4gaWYgbm90IHYxcGFydHMuZXZlcnkoaXNWYWxpZFBhcnQpIG9yIG5vdCB2MnBhcnRzLmV2ZXJ5KGlzVmFsaWRQYXJ0KVxuXG4gICAgICAgICAgICBpZiB6ZXJvRXh0ZW5kXG4gICAgICAgICAgICAgICAgdjFwYXJ0cy5wdXNoIFwiMFwiICAgIHdoaWxlIHYxcGFydHMubGVuZ3RoIDwgdjJwYXJ0cy5sZW5ndGhcbiAgICAgICAgICAgICAgICB2MnBhcnRzLnB1c2ggXCIwXCIgICAgd2hpbGUgdjJwYXJ0cy5sZW5ndGggPCB2MXBhcnRzLmxlbmd0aFxuXG4gICAgICAgICAgICB1bmxlc3MgbGV4aWNvZ3JhcGhpY2FsXG4gICAgICAgICAgICAgICAgdjFwYXJ0cyA9IHYxcGFydHMubWFwKE51bWJlcilcbiAgICAgICAgICAgICAgICB2MnBhcnRzID0gdjJwYXJ0cy5tYXAoTnVtYmVyKVxuXG4gICAgICAgICAgICBpID0gLTFcbiAgICAgICAgICAgIHdoaWxlIGkgPCB2MXBhcnRzLmxlbmd0aFxuICAgICAgICAgICAgICAgIGkrK1xuXG4gICAgICAgICAgICAgICAgaWYgdjJwYXJ0cy5sZW5ndGggPCBpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAxXG4gICAgICAgICAgICAgICAgaWYgdjFwYXJ0c1tpXSA9PSB2MnBhcnRzW2ldXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICAgICAgZWxzZSBpZiB2MXBhcnRzW2ldID4gdjJwYXJ0c1tpXVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgdjJwYXJ0c1tpXSA+IHYxcGFydHNbaV1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xXG5cbiAgICAgICAgICAgIHJldHVybiAtMSBpZiB2MXBhcnRzLmxlbmd0aCAhPSB2MnBhcnRzLmxlbmd0aFxuXG4gICAgICAgICAgICByZXR1cm4gMFxuXG4gICAgICAgIHN0cmluZzpcbiAgICAgICAgICAgIGNhcGl0YWxpemU6IChzdHIpIC0+XG4gICAgICAgICAgICAgICAgc3RyID0gKGlmIG5vdCBzdHI/IHRoZW4gXCJcIiBlbHNlIFN0cmluZyhzdHIpKVxuICAgICAgICAgICAgICAgIHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKVxuXG4gICAgcmV0dXJuIFV0aWxzXG4pIiwiKChyb290LCBmYWN0b3J5KSAtPlxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJvb3QsIHt9KVxuXG4pKHdpbmRvdywgKHJvb3QsIExvZ2dlcikgLT5cblxuICAgICMgTG9nZ2VyXG4gICAgbG9nbGV2ZWwgPSByZXF1aXJlKCdsb2dsZXZlbCcpXG5cbiAgICBzZW50cnkgPSByZXF1aXJlKCcuL3NlbnRyeS5jb2ZmZWUnKVxuXG4gICAgIyBFeHBvc2UgdGhlIExvZ2dlciBBUElcbiAgICBMb2dnZXIgPVxuXG4gICAgICAgIHNldExldmVsOiAobGV2ZWwpIC0+XG4gICAgICAgICAgICBsb2dsZXZlbC5zZXRMZXZlbChsZXZlbClcblxuICAgICAgICBzZXRDb25maWc6IChjb25maWcpIC0+XG4gICAgICAgICAgICBsb2dsZXZlbC5zZXRMZXZlbChjb25maWcubG9nTGV2ZWwpXG4gICAgICAgICAgICBpZiBjb25maWcuc2VudHJ5XG4gICAgICAgICAgICAgICAgc2VudHJ5LmluaXRpYWxpemUoY29uZmlnLnNlbnRyeSlcblxuICAgICAgICB0cmFjZTogKG1zZykgLT5cbiAgICAgICAgICAgIGxvZ2xldmVsLnRyYWNlKG1zZylcblxuICAgICAgICBkZWJ1ZzogKG1zZykgLT5cbiAgICAgICAgICAgIGxvZ2xldmVsLmRlYnVnKG1zZylcblxuICAgICAgICBpbmZvOiAobXNnKSAtPlxuICAgICAgICAgICAgbG9nbGV2ZWwuaW5mbyhtc2cpXG5cbiAgICAgICAgd2FybjogKG1zZykgLT5cbiAgICAgICAgICAgIGxvZ2xldmVsLndhcm4obXNnKVxuXG4gICAgICAgIGVycm9yOiAobXNnKSAtPlxuICAgICAgICAgICAgbG9nbGV2ZWwuZXJyb3IobXNnKVxuICAgICAgICAgICAgc2VudHJ5LnNlbmRNZXNzYWdlKG1zZylcblxuXG4gICAgcmV0dXJuIExvZ2dlclxuKSIsIiMjIypcbiAqIFRoaXMgd2lsbCBwcm92aWRlIHRoZSBmdW5jdGlvbmFsaXR5IHRvIGRlZmluZSBNb2R1bGVzXG4gKiBhbmQgcHJvdmlkZSBhIHdheSB0byBleHRlbmQgdGhlbVxuICogQGF1dGhvciBGcmFuY2lzY28gUmFtaW5pIDxmcmFtaW5pIGF0IGdtYWlsLmNvbT5cbiMjI1xuKChyb290LCBmYWN0b3J5KSAtPlxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJvb3QsIHt9KVxuXG4pKHdpbmRvdywgKHJvb3QsIE1vZHVsZSkgLT5cblxuICAgIEJhc2UgPSByZXF1aXJlKCcuLi9iYXNlLmNvZmZlZScpXG5cbiAgICAjIHRoaXMgd2lsbCBzZXJ2ZSBhcyB0aGUgYmFzZSBjbGFzcyBmb3IgYSBNb2R1bGVcbiAgICBjbGFzcyBNb2R1bGVcbiAgICAgICAgY29uc3RydWN0b3I6IChvcHQpIC0+XG4gICAgICAgICAgICBAc2FuZGJveCA9IG9wdC5zYW5kYm94XG4gICAgICAgICAgICBAb3B0aW9ucyA9IG9wdC5vcHRpb25zXG4gICAgICAgICAgICBAc2V0RWxlbWVudCgpXG5cblxuICAgICMgdGhpcyBjbGFzcyB3aWxsIGV4cG9zZSBzdGF0aWMgbWV0aG9kcyB0byBhZGQsIGV4dGVuZCBhbmRcbiAgICAjIGdldCB0aGUgbGlzdCBvZiBhZGRlZCBtb2R1bGVzXG4gICAgY2xhc3MgTW9kdWxlc1xuXG4gICAgICAgICMgdGhpcyB3aWxsIGhvbGQgdGhlIGxpc3Qgb2YgYWRkZWQgbW9kdWxlc1xuICAgICAgICBAbGlzdCA6IHt9XG5cbiAgICAgICAgIyMjKlxuICAgICAgICAgKiBqdXN0IGFuIGFsaWFzIGZvciB0aGUgZXh0ZW5kIG1ldGhvZFxuICAgICAgICAgKiBAYXV0aG9yIEZyYW5jaXNjbyBSYW1pbmkgPGZyYW1pbmkgYXQgZ21haWwuY29tPlxuICAgICAgICAgKiBAcGFyYW0gIHtbU3RyaW5nXX0gbmFtZVxuICAgICAgICAgKiBAcGFyYW0gIHtbT2JqZWN0XX0gZGVmaW5pdGlvblxuICAgICAgICAjIyNcbiAgICAgICAgQGFkZCA6IChuYW1lLCBkZWZpbml0aW9uKSAtPlxuICAgICAgICAgICAgQGV4dGVuZChuYW1lLCBkZWZpbml0aW9uLCBNb2R1bGUpXG5cbiAgICAgICAgIyMjKlxuICAgICAgICAgKiBnZXR0ZXIgZm9yIHJldHJpZXZpbmcgbW9kdWxlcyBkZWZpbml0aW9uc1xuICAgICAgICAgKiBAYXV0aG9yIEZyYW5jaXNjbyBSYW1pbmkgPGZyYW1pbmkgYXQgZ21haWwuY29tPlxuICAgICAgICAgKiBAcGFyYW0gIHtbdHlwZV19IG5hbWVcbiAgICAgICAgICogQHJldHVybiB7W0Z1bmN0aW9uL3VuZGVmaW5lZF19XG4gICAgICAgICMjI1xuICAgICAgICBAZ2V0IDogKG5hbWUpIC0+XG4gICAgICAgICAgICBpZiBCYXNlLnV0aWwuaXNTdHJpbmcobmFtZSkgYW5kIEBsaXN0W25hbWVdXG4gICAgICAgICAgICAgICAgcmV0dXJuIEBsaXN0W25hbWVdXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuXG4gICAgICAgICMjIypcbiAgICAgICAgICogdGhpcyB3aWxsIGFsbG93cyB1cyB0byBzaW1wbGlmeSBhbmQgaGF2ZSBtb3JlIGNvbnRyb2xcbiAgICAgICAgICogb3ZlciBhZGRpbmcvZGVmaW5pbmcgbW9kdWxlc1xuICAgICAgICAgKiBAYXV0aG9yIEZyYW5jaXNjbyBSYW1pbmkgPGZyYW1pbmkgYXQgZ21haWwuY29tPlxuICAgICAgICAgKiBAcGFyYW0gIHtbU3RyaW5nXX0gbmFtZVxuICAgICAgICAgKiBAcGFyYW0gIHtbT2JqZWN0XX0gZGVmaW5pdGlvblxuICAgICAgICAgKiBAcGFyYW0gIHtbU3RyaW5nL0Z1bmN0aW9uXX0gQmFzZUNsYXNzXG4gICAgICAgICMjI1xuICAgICAgICBAZXh0ZW5kIDogKG5hbWUsIGRlZmluaXRpb24sIEJhc2VDbGFzcykgLT5cbiAgICAgICAgICAgIGlmIEJhc2UudXRpbC5pc1N0cmluZyhuYW1lKSBhbmQgQmFzZS51dGlsLmlzT2JqZWN0KGRlZmluaXRpb24pXG4gICAgICAgICAgICAgICAgIyBpZiBubyBCYXNlQ2xhc3MgaXMgcGFzc2VkLCBieSBkZWZhdWx0IHdlJ2xsIHVzZSB0aGUgTW9kdWxlIGNsYXNzXG4gICAgICAgICAgICAgICAgdW5sZXNzIEJhc2VDbGFzc1xuICAgICAgICAgICAgICAgICAgICBCYXNlQ2xhc3MgPSBNb2R1bGVcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICMgaWYgd2UgYXJlIHBhc3NpbmcgdGhlIEJhc2VDbGFzcyBhcyBhIHN0cmluZywgaXQgbWVhbnMgdGhhdCBjbGFzc1xuICAgICAgICAgICAgICAgICAgICAjIHNob3VsZCBoYXZlIGJlZW4gYWRkZWQgcHJldmlvdXNseSwgc28gd2UnbGwgbG9vayB1bmRlciB0aGUgbGlzdCBvYmpcbiAgICAgICAgICAgICAgICAgICAgaWYgQmFzZS51dGlsLmlzU3RyaW5nIEJhc2VDbGFzc1xuICAgICAgICAgICAgICAgICAgICAgICAgIyBjaGVjayBpZiB0aGUgY2xhc3MgaGFzIGJlZW4gYWxyZWFkeSBhZGRlZFxuICAgICAgICAgICAgICAgICAgICAgICAgYmMgPSBAbGlzdFtCYXNlQ2xhc3NdXG4gICAgICAgICAgICAgICAgICAgICAgICAjIGlmIHRoZSBkZWZpbml0aW9uIGV4aXN0cywgbGV0cyBhc3NpZ24gaXQgdG8gQmFzZUNsYXNzXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiBiY1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJhc2VDbGFzcyA9IGJjXG4gICAgICAgICAgICAgICAgICAgICAgICAjIGlmIG5vdCwgbGV0cyB0aHJvdyBhbiBlcnJvclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1zZyA9ICdbTW9kdWxlLyAnKyBuYW1lICsnIF06IGlzIHRyeWluZyB0byBleHRlbmQgWycgKyBCYXNlQ2xhc3MgKyAnXSB3aGljaCBkb2VzIG5vdCBleGlzdCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBCYXNlLmxvZy5lcnJvciBtc2dcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKVxuICAgICAgICAgICAgICAgICAgICAjIGlmIGl0IGlzIGEgZnVuY3Rpb24sIHdlJ2xsIHVzZSBpdCBkaXJlY3RseVxuICAgICAgICAgICAgICAgICAgICAjIFRPRE86IGRvIHNvbWUgY2hlY2tpbmcgYmVmb3JlIHRyeWluZyB0byB1c2UgaXQgZGlyZWN0bHlcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiBCYXNlLnV0aWwuaXNGdW5jdGlvbiBCYXNlQ2xhc3NcbiAgICAgICAgICAgICAgICAgICAgICAgIEJhc2VDbGFzcyA9IEJhc2VDbGFzc1xuXG4gICAgICAgICAgICAgICAgZXh0ZW5kZWRDbGFzcyA9IGV4dGVuZC5jYWxsIEJhc2VDbGFzcywgZGVmaW5pdGlvblxuICAgICAgICAgICAgICAgICMgd2UnbGwgb25seSB0cnkgdG8gYWRkIHRoaXMgZGVmaW5pdGlvbiBpbiBjYXNlXG4gICAgICAgICAgICAgICAgdW5sZXNzIEJhc2UudXRpbC5oYXMgQGxpc3QsIG5hbWVcbiAgICAgICAgICAgICAgICAgICAgIyBleHRlbmRzIHRoZSBjdXJyZW50IGRlZmluaXRpb24gd2l0aCB0aGUgTW9kdWxlIGNsYXNzXG4gICAgICAgICAgICAgICAgICAgIGV4dGVuZGVkRGVmaW5pdGlvbiA9IGV4dGVuZC5jYWxsIEJhc2VDbGFzcywgZGVmaW5pdGlvblxuICAgICAgICAgICAgICAgICAgICAjIHN0b3JlIHRoZSByZWZlcmVuY2UgZm9yIGxhdGVyIHVzYWdlXG4gICAgICAgICAgICAgICAgICAgIEBsaXN0W25hbWVdID0gZXh0ZW5kZWREZWZpbml0aW9uXG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV4dGVuZGVkRGVmaW5pdGlvblxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgIyBpbmZvcm0gdGhlIGRldnMgdGhhdCBzb21lb25lIGlzIHRyeWluZyB0byBhZGQgYSBtb2R1bGUnc1xuICAgICAgICAgICAgICAgICAgICAjIGRlZmluaXRpb24gdGhhdCBoYXMgYmVlbiBwcmV2aW91c2x5IGFkZGVkXG4gICAgICAgICAgICAgICAgICAgIG1zZyA9ICdbQ29tcG9uZW50OicgKyBuYW1lICsgJ10gaGF2ZSBhbHJlYWR5IGJlZW4gZGVmaW5lZCcgXG4gICAgICAgICAgICAgICAgICAgIEJhc2UubG9nLndhcm4gbXNnXG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEBcblxuXG4gICAgQmFzZS51dGlsLmV4dGVuZCBNb2R1bGU6OiwgQmFzZS5FdmVudHMsXG5cbiAgICAgICAgIyB0aGlzIGhhcyB0byBiZSBvdmV3cml0dGVuIGJ5IHRoZSBtb2R1bGUgZGVmaW5pdGlvblxuICAgICAgICBpbml0aWFsaXplOiAoKSAtPlxuICAgICAgICAgICAgbXNnID0gJ1tDb21wb25lbnQvJyArIEBvcHRpb25zLm5hbWUgKyAnXTonICsgJ0RvZXNuXFwndCBoYXZlIGFuIGluaXRpYWxpemUgbWV0aG9kIGRlZmluZWQnXG4gICAgICAgICAgICBCYXNlLmxvZy53YXJuIG1zZ1xuXG4gICAgICAgIHNldEVsZW1lbnQ6ICgpIC0+XG4gICAgICAgICAgICBAdW5kZWxlZ2F0ZUV2ZW50cygpXG5cbiAgICAgICAgICAgIEBlbCA9IEBvcHRpb25zLmVsXG4gICAgICAgICAgICBAJGVsID0gJChAZWwpXG5cbiAgICAgICAgICAgIEBkZWxlZ2F0ZUV2ZW50cygpXG5cbiAgICAgICAgZGVsZWdhdGVFdmVudHM6IChldmVudHMpIC0+XG4gICAgICAgICAgICAjIHJlZ2V4IHRvIHNwbGl0IHRoZSBldmVudHMga2V5IChzZXBhcmF0ZXMgdGhlIGV2ZW50IGZyb20gdGhlIHNlbGVjdG9yKVxuICAgICAgICAgICAgZGVsZWdhdGVFdmVudFNwbGl0dGVyID0gL14oXFxTKylcXHMqKC4qKSQvXG5cbiAgICAgICAgICAgICMgaWYgdGhlIGV2ZW50cyBvYmplY3QgaXMgbm90IGRlZmluZWQgb3IgcGFzc2VkIGFzIGEgcGFyYW1ldGVyXG4gICAgICAgICAgICAjIHRoZXJlIGlzIG5vdGhpbmcgdG8gZG8gaGVyZVxuICAgICAgICAgICAgcmV0dXJuICAgIHVubGVzcyBldmVudHMgb3IgKGV2ZW50cyA9IEJhc2UudXRpbC5yZXN1bHQoQCwgXCJldmVudHNcIikpXG4gICAgICAgICAgICAjIGJlZm9yZSB0cnlpbmcgdG8gYXR0YWNoIG5ldyBldmVudHMsIGxldHMgcmVtb3ZlIGFueSBwcmV2aW91c1xuICAgICAgICAgICAgIyBhdHRhY2hlZCBldmVudFxuICAgICAgICAgICAgQHVuZGVsZWdhdGVFdmVudHMoKVxuXG4gICAgICAgICAgICBmb3Iga2V5IG9mIGV2ZW50c1xuICAgICAgICAgICAgICAgICMgZ3JhYiB0aGUgbWV0aG9kIG5hbWVcbiAgICAgICAgICAgICAgICBtZXRob2QgPSBldmVudHNba2V5XVxuICAgICAgICAgICAgICAgICMgZ3JhYiB0aGUgbWV0aG9kJ3MgZGVmaW5pdGlvblxuICAgICAgICAgICAgICAgIG1ldGhvZCA9IEBbZXZlbnRzW2tleV1dICAgIHVubGVzcyBCYXNlLnV0aWwuaXNGdW5jdGlvbihtZXRob2QpXG4gICAgICAgICAgICAgICAgY29udGludWUgICAgdW5sZXNzIG1ldGhvZFxuICAgICAgICAgICAgICAgIG1hdGNoID0ga2V5Lm1hdGNoKGRlbGVnYXRlRXZlbnRTcGxpdHRlcilcbiAgICAgICAgICAgICAgICBAZGVsZWdhdGUgbWF0Y2hbMV0sIG1hdGNoWzJdLCBCYXNlLnV0aWwuYmluZChtZXRob2QsIEApXG5cbiAgICAgICAgICAgIHJldHVybiBAXG5cbiAgICAgICAgZGVsZWdhdGU6IChldmVudE5hbWUsIHNlbGVjdG9yLCBsaXN0ZW5lcikgLT5cbiAgICAgICAgICAgIEAkZWwub24gZXZlbnROYW1lICsgXCIucGVzdGxlRXZlbnRcIiArIEBvcHRpb25zLmd1aWQsIHNlbGVjdG9yLCBsaXN0ZW5lclxuICAgICAgICAgICAgcmV0dXJuIEBcblxuICAgICAgICB1bmRlbGVnYXRlRXZlbnRzOiAoKSAtPlxuICAgICAgICAgICAgQCRlbC5vZmYoJy5wZXN0bGVFdmVudCcgKyBAb3B0aW9ucy5ndWlkKSAgICBpZiBAJGVsXG4gICAgICAgICAgICByZXR1cm4gQFxuXG4gICAgICAgICMgYnkgZGVmYXVsdCwgaXQgd2lsbCByZW1vdmUgZXZlbnRsaXN0ZW5lcnMgYW5kIHJlbW92ZSB0aGVcbiAgICAgICAgIyAkZWwgZnJvbSB0aGUgRE9NXG4gICAgICAgIHN0b3A6ICgpIC0+XG4gICAgICAgICAgICBAdW5kZWxlZ2F0ZUV2ZW50cygpXG4gICAgICAgICAgICBAJGVsLnJlbW92ZSgpIGlmIEAkZWxcblxuICAgICMgSGVscGVyc1xuICAgIGV4dGVuZCA9IChwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgLT5cbiAgICAgICAgcGFyZW50ID0gQFxuXG4gICAgICAgICMgVGhlIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIGZvciB0aGUgbmV3IHN1YmNsYXNzIGlzIGVpdGhlciBkZWZpbmVkIGJ5IHlvdVxuICAgICAgICAjICh0aGUgXCJjb25zdHJ1Y3RvclwiIHByb3BlcnR5IGluIHlvdXIgYGV4dGVuZGAgZGVmaW5pdGlvbiksIG9yIGRlZmF1bHRlZFxuICAgICAgICAjIGJ5IHVzIHRvIHNpbXBseSBjYWxsIHRoZSBwYXJlbnQncyBjb25zdHJ1Y3RvclxuICAgICAgICBpZiBwcm90b1Byb3BzIGFuZCBCYXNlLnV0aWwuaGFzKHByb3RvUHJvcHMsIFwiY29uc3RydWN0b3JcIilcbiAgICAgICAgICAgIGNoaWxkID0gcHJvdG9Qcm9wcy5jb25zdHJ1Y3RvclxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBjaGlsZCA9IC0+XG4gICAgICAgICAgICAgICAgcGFyZW50LmFwcGx5IEAsIGFyZ3VtZW50c1xuXG4gICAgICAgICMgQWRkIHN0YXRpYyBwcm9wZXJ0aWVzIHRvIHRoZSBjb25zdHJ1Y3RvciBmdW5jdGlvbiwgaWYgc3VwcGxpZWQuXG4gICAgICAgIEJhc2UudXRpbC5leHRlbmQgY2hpbGQsIHBhcmVudCwgc3RhdGljUHJvcHNcblxuICAgICAgICAjIFNldCB0aGUgcHJvdG90eXBlIGNoYWluIHRvIGluaGVyaXQgZnJvbSBgcGFyZW50YCwgd2l0aG91dCBjYWxsaW5nXG4gICAgICAgICMgYHBhcmVudGAncyBjb25zdHJ1Y3RvciBmdW5jdGlvbi5cbiAgICAgICAgU3Vycm9nYXRlID0gLT5cbiAgICAgICAgICAgIEBjb25zdHJ1Y3RvciA9IGNoaWxkXG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICBTdXJyb2dhdGU6OiA9IHBhcmVudDo6XG4gICAgICAgIGNoaWxkOjogPSBuZXcgU3Vycm9nYXRlXG5cbiAgICAgICAgIyBBZGQgcHJvdG90eXBlIHByb3BlcnRpZXMgKGluc3RhbmNlIHByb3BlcnRpZXMpIHRvIHRoZSBzdWJjbGFzcyxcbiAgICAgICAgIyBpZiBzdXBwbGllZC5cbiAgICAgICAgQmFzZS51dGlsLmV4dGVuZCBjaGlsZDo6LCBwcm90b1Byb3BzICAgIGlmIHByb3RvUHJvcHNcblxuICAgICAgICAjIHN0b3JlIGEgcmVmZXJlbmNlIHRvIHRoZSBpbml0aWFsaXplIG1ldGhvZCBzbyBpdCBjYW4gYmUgY2FsbGVkXG4gICAgICAgICMgZnJvbSBpdHMgY2hpbGRzXG4gICAgICAgIGNoaWxkOjpfc3VwZXJfID0gcGFyZW50Ojppbml0aWFsaXplXG5cbiAgICAgICAgcmV0dXJuIGNoaWxkXG5cbiAgICAjIFN0b3JlIGEgcmVmZXJlbmNlIHRvIHRoZSBiYXNlIGNsYXNzIGZvciBtb2R1bGVzXG4gICAgTW9kdWxlcy5Nb2R1bGUgPSBNb2R1bGVcblxuICAgIHJldHVybiBNb2R1bGVzXG4pIiwiKChyb290LCBmYWN0b3J5KSAtPlxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJvb3QsIHt9KVxuXG4pKHdpbmRvdywgKHJvb3QsIFNlbnRyeSkgLT5cblxuICAgICMgUmF2ZW4gLSBTZW50cnkgQ2xpZW50XG4gICAgUmF2ZW4gPSByZXF1aXJlKCdyYXZlbi1qcycpXG5cbiAgICAjIEV4cG9zZSB0aGUgU2VudHJ5IEFQSVxuICAgIFNlbnRyeSA9XG4gICAgICAgIGluaXRpYWxpemUgOiAoY29uZmlnKSAtPlxuICAgICAgICAgICAgUmF2ZW4uY29uZmlnKGNvbmZpZy5lbmRQb2ludCwgY29uZmlnLm9wdGlvbnMpXG4gICAgICAgICAgICBSYXZlbi5pbnN0YWxsKClcblxuICAgICAgICBzZW5kTWVzc2FnZSA6IChtc2cpIC0+XG4gICAgICAgICAgICBpZiBSYXZlbi5pc1NldHVwKClcbiAgICAgICAgICAgICAgICBSYXZlbi5jYXB0dXJlTWVzc2FnZShtc2cpXG5cbiAgICByZXR1cm4gU2VudHJ5XG4pIiwiKChyb290LCBmYWN0b3J5KSAtPlxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJvb3QsIHt9KVxuXG4pKHdpbmRvdywgKHJvb3QsIFZlcnNpb25DaGVja2VyKSAtPlxuXG4gICAgbG9nID0gcmVxdWlyZSAnLi9sb2dnZXIuY29mZmVlJ1xuICAgIFV0aWxzID0gcmVxdWlyZSAnLi9nZW5lcmFsLmNvZmZlZSdcblxuICAgICMgRXhwb3NlIFZlcnNpb25DaGVja2VyIEFQSVxuICAgIFZlcnNpb25DaGVja2VyID1cblxuICAgICAgICAjIyMqXG4gICAgICAgICAqIFJlY3Vyc2l2ZSBtZXRob2QgdG8gY2hlY2sgdmVyc2lvbmluZyBmb3IgYWxsIHRoZSBkZWZpbmVkIGxpYnJhcmllc1xuICAgICAgICAgKiB3aXRoaW4gdGhlIGRlcGVuZGVuY3kgYXJyYXlcbiAgICAgICAgIyMjXG4gICAgICAgIGNoZWNrOiAoZGVwZW5kZW5jaWVzKSAtPlxuXG4gICAgICAgICAgICBpZiBkZXBlbmRlbmNpZXMubGVuZ3RoID4gMFxuXG4gICAgICAgICAgICAgICAgZHAgPSBkZXBlbmRlbmNpZXMuc2hpZnQoKVxuXG4gICAgICAgICAgICAgICAgdW5sZXNzIGRwLm9ialxuICAgICAgICAgICAgICAgICAgICBtc2cgPSBkcC5uYW1lICsgXCIgaXMgYSBoYXJkIGRlcGVuZGVuY3kgYW5kIGl0IGhhcyB0byBiZSBsb2FkZWQgYmVmb3JlIHBlc3RsZS5qc1wiXG4gICAgICAgICAgICAgICAgICAgIGxvZy5lcnJvciBtc2dcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZylcblxuICAgICAgICAgICAgICAgICMgY29tcGFyZSB0aGUgdmVyc2lvblxuICAgICAgICAgICAgICAgIHVubGVzcyBVdGlscy52ZXJzaW9uQ29tcGFyZShkcC52ZXJzaW9uLCBkcC5yZXF1aXJlZCkgPj0gMFxuICAgICAgICAgICAgICAgICAgICAjIGlmIHdlIGVudGVyIGhlcmUgaXQgbWVhbnMgdGhlIGxvYWRlZCBsaWJyYXJ5IGRvZXN0IG5vdCBmdWxmaWxsIG91ciBuZWVkc1xuICAgICAgICAgICAgICAgICAgICBtc2cgPSBcIltGQUlMXSBcIiArIGRwLm5hbWUgKyBcIjogdmVyc2lvbiByZXF1aXJlZDogXCIgKyBkcC5yZXF1aXJlZCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiIDwtLT4gTG9hZGVkIHZlcnNpb246IFwiICsgZHAudmVyc2lvblxuICAgICAgICAgICAgICAgICAgICBsb2cuZXJyb3IgbXNnXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpXG5cbiAgICAgICAgICAgICAgICBWZXJzaW9uQ2hlY2tlci5jaGVjayhkZXBlbmRlbmNpZXMpXG5cblxuICAgIHJldHVybiBWZXJzaW9uQ2hlY2tlclxuKSIsIigocm9vdCwgZmFjdG9yeSkgLT5cblxuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyb290LCB7fSlcblxuKSh3aW5kb3csIChyb290LCBWaWV3cG9ydCkgLT5cblxuICAgICMgTG9nZ2VyXG4gICAgdmlld3BvcnQgPSByZXF1aXJlKCd2ZXJnZScpXG5cbiAgICAjIEV4cG9zZSBWaWV3cG9ydCBkZXRlY3Rpb24gQVBJXG4gICAgVmlld3BvcnQgPVxuXG4gICAgICAgIHZpZXdwb3J0VzogKCkgLT5cbiAgICAgICAgICAgIHZpZXdwb3J0LnZpZXdwb3J0VygpXG5cbiAgICAgICAgdmlld3BvcnRIOiAoa2V5KSAtPlxuICAgICAgICAgICAgdmlld3BvcnQudmlld3BvcnRIKClcblxuICAgICAgICB2aWV3cG9ydDogKGtleSkgLT5cbiAgICAgICAgICAgIHZpZXdwb3J0LnZpZXdwb3J0KClcblxuICAgICAgICBpblZpZXdwb3J0OiAoZWwsIGN1c2hpb24pIC0+XG4gICAgICAgICAgICB2aWV3cG9ydC5pblZpZXdwb3J0KGVsLCBjdXNoaW9uKVxuXG4gICAgICAgIGluWDogKGVsLCBjdXNoaW9uKSAtPlxuICAgICAgICAgICAgdmlld3BvcnQuaW5YKGVsLCBjdXNoaW9uKVxuXG4gICAgICAgIGluWTogKGVsLCBjdXNoaW9uKSAtPlxuICAgICAgICAgICAgdmlld3BvcnQuaW5ZKGVsLCBjdXNoaW9uKVxuXG4gICAgICAgIHNjcm9sbFg6ICgpIC0+XG4gICAgICAgICAgICB2aWV3cG9ydC5zY3JvbGxYKClcblxuICAgICAgICBzY3JvbGxZOiAoKSAtPlxuICAgICAgICAgICAgdmlld3BvcnQuc2Nyb2xsWSgpXG5cbiAgICAgICAgIyBUbyB0ZXN0IGlmIGEgbWVkaWEgcXVlcnkgaXMgYWN0aXZlXG4gICAgICAgIG1xOiAobWVkaWFRdWVyeVN0cmluZykgLT5cbiAgICAgICAgICAgIHZpZXdwb3J0Lm1xKG1lZGlhUXVlcnlTdHJpbmcpXG5cbiAgICAgICAgcmVjdGFuZ2xlOiAoZWwsIGN1c2hpb24pIC0+XG4gICAgICAgICAgICB2aWV3cG9ydC5yZWN0YW5nbGUoZWwsIGN1c2hpb24pXG5cbiAgICAgICAgIyBpZiBubyBhcmd1bWVudCBpcyBwYXNzZWQsIHRoZW4gaXQgcmV0dXJucyB0aGUgYXNwZWN0XG4gICAgICAgICMgcmF0aW8gb2YgdGhlIHZpZXdwb3J0LiBJZiBhbiBlbGVtZW50IGlzIHBhc3NlZCBpdCByZXR1cm5zXG4gICAgICAgICMgdGhlIGFzcGVjdCByYXRpbyBvZiB0aGUgZWxlbWVudFxuICAgICAgICBhc3BlY3Q6IChvKSAtPlxuICAgICAgICAgICAgdmlld3BvcnQuYXNwZWN0KG8pXG5cbiAgICByZXR1cm4gVmlld3BvcnRcbikiXX0=
