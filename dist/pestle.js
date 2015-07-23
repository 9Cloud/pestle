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



},{"./base.coffee":"/home/ariel/code/pestle/src/base.coffee","./extension/components.coffee":"/home/ariel/code/pestle/src/extension/components.coffee","./extension/responsivedesign.coffee":"/home/ariel/code/pestle/src/extension/responsivedesign.coffee","./extension/responsiveimages.coffee":"/home/ariel/code/pestle/src/extension/responsiveimages.coffee","./util/extmanager.coffee":"/home/ariel/code/pestle/src/util/extmanager.coffee","./util/module.coffee":"/home/ariel/code/pestle/src/util/module.coffee"}],"/home/ariel/code/pestle/node_modules/cookies-js/dist/cookies.js":[function(_dereq_,module,exports){
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
},{}],"/home/ariel/code/pestle/node_modules/imager.js/Imager.js":[function(_dereq_,module,exports){
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
},{}],"/home/ariel/code/pestle/node_modules/ismobilejs/isMobile.js":[function(_dereq_,module,exports){
/**
 * isMobile.js v0.3.9
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
        amazon_phone        = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,
        amazon_tablet       = /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,
        windows_phone       = /IEMobile/i,
        windows_tablet      = /(?=.*\bWindows\b)(?=.*\bARM\b)/i, // Match 'Windows' AND 'ARM'
        other_blackberry    = /BlackBerry/i,
        other_blackberry_10 = /BB10/i,
        other_opera         = /Opera Mini/i,
        other_chrome        = /(CriOS|Chrome)(?=.*\bMobile\b)/i,
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
        // Facebook mobile app's integrated browser adds a bunch of strings that
        // match everything. Strip it out if it exists.
        var tmp = ua.split('[FBAN');
        if (typeof tmp[1] !== 'undefined') {
            ua = tmp[0];
        }

        this.apple = {
            phone:  match(apple_phone, ua),
            ipod:   match(apple_ipod, ua),
            tablet: !match(apple_phone, ua) && match(apple_tablet, ua),
            device: match(apple_phone, ua) || match(apple_ipod, ua) || match(apple_tablet, ua)
        };
        this.amazon = {
            phone:  match(amazon_phone, ua),
            tablet: !match(amazon_phone, ua) && match(amazon_tablet, ua),
            device: match(amazon_phone, ua) || match(amazon_tablet, ua)
        };
        this.android = {
            phone:  match(amazon_phone, ua) || match(android_phone, ua),
            tablet: !match(amazon_phone, ua) && !match(android_phone, ua) && (match(amazon_tablet, ua) || match(android_tablet, ua)),
            device: match(amazon_phone, ua) || match(amazon_tablet, ua) || match(android_phone, ua) || match(android_tablet, ua)
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
            chrome:       match(other_chrome, ua),
            device:       match(other_blackberry, ua) || match(other_blackberry_10, ua) || match(other_opera, ua) || match(other_firefox, ua) || match(other_chrome, ua)
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
        define('isMobile', [], global.isMobile = instantiate());
    } else {
        global.isMobile = instantiate();
    }

})(this);

},{}],"/home/ariel/code/pestle/node_modules/loglevel/lib/loglevel.js":[function(_dereq_,module,exports){
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

        self.setLevel(self.levels[storedLevel], false);
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

    self.setLevel = function (level, persist) {
        if (typeof level === "string" && self.levels[level.toUpperCase()] !== undefined) {
            level = self.levels[level.toUpperCase()];
        }
        if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {
            if (persist !== false) {  // defaults to true
                persistLevelIfPossible(level);
            }
            replaceLoggingMethods(level);
            if (typeof console === undefinedType && level < self.levels.SILENT) {
                return "No console available for logging";
            }
        } else {
            throw "log.setLevel() called with invalid level: " + level;
        }
    };

    self.enableAll = function(persist) {
        self.setLevel(self.levels.TRACE, persist);
    };

    self.disableAll = function(persist) {
        self.setLevel(self.levels.SILENT, persist);
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

},{}],"/home/ariel/code/pestle/node_modules/raven-js/dist/raven.js":[function(_dereq_,module,exports){
/*! Raven.js 1.1.19 (b51bc89) | github.com/getsentry/raven-js */

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
    VERSION: '1.1.19',

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
     * Set the dataCallback option
     *
     * @param {function} callback The callback to run which allows the
     *                            data blob to be mutated before sending
     * @return {Raven}
     */
    setDataCallback: function(callback) {
        globalOptions.dataCallback = callback;

        return Raven;
    },

    /*
     * Set the shouldSendCallback option
     *
     * @param {function} callback The callback to run which allows
     *                            introspecting the blob before sending
     * @return {Raven}
     */
    setShouldSendCallback: function(callback) {
        globalOptions.shouldSendCallback = callback;

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
    return what === void 0;
}

function isFunction(what) {
    return typeof what === 'function';
}

function isString(what) {
    return objectPrototype.toString.call(what) === '[object String]';
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
        data = globalOptions.dataCallback(data) || data;
    }

    // Why??????????
    if (!data || isEmptyObject(data)) {
        return;
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
    var img = newImage(),
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

// Note: this is shitty, but I can't figure out how to get
// sinon to stub document.createElement without breaking everything
// so this wrapper is just so I can stub it for tests.
function newImage() {
    return document.createElement('img');
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

})(typeof window !== 'undefined' ? window : this);

},{}],"/home/ariel/code/pestle/node_modules/verge/verge.js":[function(_dereq_,module,exports){
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
},{}],"/home/ariel/code/pestle/node_modules/wolfy87-eventemitter/EventEmitter.js":[function(_dereq_,module,exports){
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

},{}],"/home/ariel/code/pestle/src/base.coffee":[function(_dereq_,module,exports){

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



},{"./util/cookies.coffee":"/home/ariel/code/pestle/src/util/cookies.coffee","./util/devicedetection.coffee":"/home/ariel/code/pestle/src/util/devicedetection.coffee","./util/eventbus.coffee":"/home/ariel/code/pestle/src/util/eventbus.coffee","./util/general.coffee":"/home/ariel/code/pestle/src/util/general.coffee","./util/logger.coffee":"/home/ariel/code/pestle/src/util/logger.coffee","./util/versionchecker.coffee":"/home/ariel/code/pestle/src/util/versionchecker.coffee","./util/viewportdetection.coffee":"/home/ariel/code/pestle/src/util/viewportdetection.coffee","imager.js":"/home/ariel/code/pestle/node_modules/imager.js/Imager.js"}],"/home/ariel/code/pestle/src/extension/components.coffee":[function(_dereq_,module,exports){
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
      var m, mod, modx, prefix, sb;
      if (components.length > 0) {
        m = components.shift();
        if (!Base.util.isEmpty(Pestle.modules) && Pestle.modules[m.name] && m.options) {
          mod = Pestle.modules[m.name];
          sb = app.createSandbox(m.name);
          prefix = m.name + "_";
          m.options.guid = prefix + (Base.util.keys(Component.initializedComponents).filter(function(component) {
            return Base.util.contains(component, prefix);
          }).length + 1);
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



},{"./../base.coffee":"/home/ariel/code/pestle/src/base.coffee","./../util/module.coffee":"/home/ariel/code/pestle/src/util/module.coffee"}],"/home/ariel/code/pestle/src/extension/responsivedesign.coffee":[function(_dereq_,module,exports){

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



},{"./../base.coffee":"/home/ariel/code/pestle/src/base.coffee"}],"/home/ariel/code/pestle/src/extension/responsiveimages.coffee":[function(_dereq_,module,exports){

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



},{"./../base.coffee":"/home/ariel/code/pestle/src/base.coffee"}],"/home/ariel/code/pestle/src/util/cookies.coffee":[function(_dereq_,module,exports){
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



},{"cookies-js":"/home/ariel/code/pestle/node_modules/cookies-js/dist/cookies.js"}],"/home/ariel/code/pestle/src/util/devicedetection.coffee":[function(_dereq_,module,exports){
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



},{"ismobilejs":"/home/ariel/code/pestle/node_modules/ismobilejs/isMobile.js"}],"/home/ariel/code/pestle/src/util/eventbus.coffee":[function(_dereq_,module,exports){
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



},{"wolfy87-eventemitter":"/home/ariel/code/pestle/node_modules/wolfy87-eventemitter/EventEmitter.js"}],"/home/ariel/code/pestle/src/util/extmanager.coffee":[function(_dereq_,module,exports){

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



},{"../base.coffee":"/home/ariel/code/pestle/src/base.coffee"}],"/home/ariel/code/pestle/src/util/general.coffee":[function(_dereq_,module,exports){
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



},{}],"/home/ariel/code/pestle/src/util/logger.coffee":[function(_dereq_,module,exports){
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



},{"./sentry.coffee":"/home/ariel/code/pestle/src/util/sentry.coffee","loglevel":"/home/ariel/code/pestle/node_modules/loglevel/lib/loglevel.js"}],"/home/ariel/code/pestle/src/util/module.coffee":[function(_dereq_,module,exports){

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



},{"../base.coffee":"/home/ariel/code/pestle/src/base.coffee"}],"/home/ariel/code/pestle/src/util/sentry.coffee":[function(_dereq_,module,exports){
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



},{"raven-js":"/home/ariel/code/pestle/node_modules/raven-js/dist/raven.js"}],"/home/ariel/code/pestle/src/util/versionchecker.coffee":[function(_dereq_,module,exports){
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



},{"./general.coffee":"/home/ariel/code/pestle/src/util/general.coffee","./logger.coffee":"/home/ariel/code/pestle/src/util/logger.coffee"}],"/home/ariel/code/pestle/src/util/viewportdetection.coffee":[function(_dereq_,module,exports){
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



},{"verge":"/home/ariel/code/pestle/node_modules/verge/verge.js"}]},{},["./src/core.coffee"])("./src/core.coffee")
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9hcmllbC9jb2RlL3Blc3RsZS9zcmMvY29yZS5jb2ZmZWUiLCJub2RlX21vZHVsZXMvY29va2llcy1qcy9kaXN0L2Nvb2tpZXMuanMiLCJub2RlX21vZHVsZXMvaW1hZ2VyLmpzL0ltYWdlci5qcyIsIm5vZGVfbW9kdWxlcy9pc21vYmlsZWpzL2lzTW9iaWxlLmpzIiwibm9kZV9tb2R1bGVzL2xvZ2xldmVsL2xpYi9sb2dsZXZlbC5qcyIsIm5vZGVfbW9kdWxlcy9yYXZlbi1qcy9kaXN0L3JhdmVuLmpzIiwibm9kZV9tb2R1bGVzL3ZlcmdlL3ZlcmdlLmpzIiwibm9kZV9tb2R1bGVzL3dvbGZ5ODctZXZlbnRlbWl0dGVyL0V2ZW50RW1pdHRlci5qcyIsIi9ob21lL2FyaWVsL2NvZGUvcGVzdGxlL3NyYy9iYXNlLmNvZmZlZSIsIi9ob21lL2FyaWVsL2NvZGUvcGVzdGxlL3NyYy9leHRlbnNpb24vY29tcG9uZW50cy5jb2ZmZWUiLCIvaG9tZS9hcmllbC9jb2RlL3Blc3RsZS9zcmMvZXh0ZW5zaW9uL3Jlc3BvbnNpdmVkZXNpZ24uY29mZmVlIiwiL2hvbWUvYXJpZWwvY29kZS9wZXN0bGUvc3JjL2V4dGVuc2lvbi9yZXNwb25zaXZlaW1hZ2VzLmNvZmZlZSIsIi9ob21lL2FyaWVsL2NvZGUvcGVzdGxlL3NyYy91dGlsL2Nvb2tpZXMuY29mZmVlIiwiL2hvbWUvYXJpZWwvY29kZS9wZXN0bGUvc3JjL3V0aWwvZGV2aWNlZGV0ZWN0aW9uLmNvZmZlZSIsIi9ob21lL2FyaWVsL2NvZGUvcGVzdGxlL3NyYy91dGlsL2V2ZW50YnVzLmNvZmZlZSIsIi9ob21lL2FyaWVsL2NvZGUvcGVzdGxlL3NyYy91dGlsL2V4dG1hbmFnZXIuY29mZmVlIiwiL2hvbWUvYXJpZWwvY29kZS9wZXN0bGUvc3JjL3V0aWwvZ2VuZXJhbC5jb2ZmZWUiLCIvaG9tZS9hcmllbC9jb2RlL3Blc3RsZS9zcmMvdXRpbC9sb2dnZXIuY29mZmVlIiwiL2hvbWUvYXJpZWwvY29kZS9wZXN0bGUvc3JjL3V0aWwvbW9kdWxlLmNvZmZlZSIsIi9ob21lL2FyaWVsL2NvZGUvcGVzdGxlL3NyYy91dGlsL3NlbnRyeS5jb2ZmZWUiLCIvaG9tZS9hcmllbC9jb2RlL3Blc3RsZS9zcmMvdXRpbC92ZXJzaW9uY2hlY2tlci5jb2ZmZWUiLCIvaG9tZS9hcmllbC9jb2RlL3Blc3RsZS9zcmMvdXRpbC92aWV3cG9ydGRldGVjdGlvbi5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQUE7Ozs7O0FBS0EsQ0FBQyxTQUFDLElBQUQsRUFBTyxPQUFQO1NBRUcsTUFBTSxDQUFDLE9BQVAsR0FBaUIsSUFBSSxDQUFDLE1BQUwsR0FBYyxPQUFBLENBQVEsSUFBUixFQUFjLEVBQWQ7QUFGbEMsQ0FBRCxDQUFBLENBSUUsTUFKRixFQUlVLFNBQUMsSUFBRCxFQUFPLE1BQVA7QUFFTixNQUFBO0VBQUEsSUFBQSxHQUFhLE9BQUEsQ0FBUSxlQUFSO0VBQ2IsVUFBQSxHQUFhLE9BQUEsQ0FBUSwwQkFBUjtFQUdiLE1BQUEsR0FBYSxJQUFBLElBQUksQ0FBQyxNQUFMLENBQUE7RUFFYixNQUFNLENBQUMsTUFBUCxHQUFnQixPQUFBLENBQVEsc0JBQVI7RUFHaEIsTUFBTSxDQUFDLE9BQVAsR0FBaUI7RUFFWCxNQUFNLENBQUM7bUJBRVQsT0FBQSxHQUFTOzttQkFFVCxHQUFBLEdBQ0k7TUFBQSxLQUFBLEVBQ0k7UUFBQSxRQUFBLEVBQVUsQ0FBVjtPQURKO01BR0EsU0FBQSxFQUFXLFVBSFg7TUFLQSxTQUFBLEVBQVcsRUFMWDtNQU9BLFNBQUEsRUFBVyxFQVBYOzs7SUFTUyxjQUFDLE1BQUQ7QUFFVCxVQUFBOztRQUZVLFNBQVM7O01BRW5CLElBQUMsQ0FBQSxTQUFELENBQVcsTUFBWDtNQUlBLElBQUMsQ0FBQSxPQUFELEdBQVc7TUFJWCxJQUFDLENBQUEsVUFBRCxHQUFrQixJQUFBLFVBQUEsQ0FBQTtNQUlsQixJQUFDLENBQUEsT0FBRCxHQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBVixDQUFnQixJQUFoQjtNQUdYLElBQUMsQ0FBQSxTQUFELEdBQWE7TUFHYixVQUFBLEdBQWEsT0FBQSxDQUFRLCtCQUFSO01BQ2IsZ0JBQUEsR0FBbUIsT0FBQSxDQUFRLHFDQUFSO01BQ25CLGdCQUFBLEdBQW1CLE9BQUEsQ0FBUSxxQ0FBUjtNQUduQixJQUFDLENBQUEsVUFBVSxDQUFDLEdBQVosQ0FBZ0IsVUFBaEI7TUFDQSxJQUFDLENBQUEsVUFBVSxDQUFDLEdBQVosQ0FBZ0IsZ0JBQWhCO01BQ0EsSUFBQyxDQUFBLFVBQVUsQ0FBQyxHQUFaLENBQWdCLGdCQUFoQjtJQTNCUzs7bUJBNkJiLFlBQUEsR0FBYyxTQUFDLEdBQUQ7TUFHVixJQUFBLENBQU8sSUFBQyxDQUFBLE9BQVI7ZUFDSSxJQUFDLENBQUEsVUFBVSxDQUFDLEdBQVosQ0FBZ0IsR0FBaEIsRUFESjtPQUFBLE1BQUE7UUFHSSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQVQsQ0FBZSxrRkFBZjtBQUNBLGNBQVUsSUFBQSxLQUFBLENBQU0sb0VBQU4sRUFKZDs7SUFIVTs7bUJBV2QsU0FBQSxHQUFXLFNBQUMsTUFBRDtBQUNQLFVBQUE7TUFBQSxJQUFBLENBQU8sSUFBQyxDQUFBLE9BQVI7UUFDSSxJQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBVixDQUFtQixNQUFuQixDQUFIO1VBSUksSUFBQSxDQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBVixDQUFrQixJQUFDLENBQUEsTUFBbkIsQ0FBUDttQkFDSSxJQUFDLENBQUEsTUFBRCxHQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBVixDQUFtQixNQUFuQixFQUEyQixJQUFDLENBQUEsTUFBNUIsRUFEZDtXQUFBLE1BQUE7bUJBS0ksSUFBQyxDQUFBLE1BQUQsR0FBVSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVYsQ0FBbUIsTUFBbkIsRUFBMkIsSUFBQyxDQUFBLEdBQTVCLEVBTGQ7V0FKSjtTQUFBLE1BQUE7VUFXSSxHQUFBLEdBQU0sOEVBQUEsR0FBaUYsT0FBTztVQUM5RixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQVQsQ0FBZSxHQUFmO0FBQ0EsZ0JBQVUsSUFBQSxLQUFBLENBQU0sR0FBTixFQWJkO1NBREo7T0FBQSxNQUFBO1FBZ0JJLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBVCxDQUFlLDRFQUFmO0FBQ0EsY0FBVSxJQUFBLEtBQUEsQ0FBTSw2REFBTixFQWpCZDs7SUFETzs7bUJBb0JYLGtCQUFBLEdBQW9CLFNBQUMsSUFBRCxFQUFPLE1BQVA7QUFDaEIsVUFBQTtNQUFBLElBQUEsQ0FBTyxJQUFDLENBQUEsT0FBUjtRQUVJLElBQUEsQ0FBQSxDQUFPLElBQUEsSUFBUyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVYsQ0FBbUIsSUFBbkIsQ0FBaEIsQ0FBQTtVQUNJLEdBQUEsR0FBTSwyRUFBQSxHQUE4RSxPQUFPO1VBQzNGLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBVCxDQUFlLEdBQWY7QUFDQSxnQkFBVSxJQUFBLEtBQUEsQ0FBTSxHQUFOLEVBSGQ7O1FBS0EsSUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVYsQ0FBbUIsTUFBbkIsQ0FBSDtVQUlJLElBQUEsQ0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQVYsQ0FBa0IsSUFBQyxDQUFBLE1BQW5CLENBQVA7bUJBQ0ksSUFBQyxDQUFBLE1BQU0sQ0FBQyxTQUFVLENBQUEsSUFBQSxDQUFsQixHQUEwQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVYsQ0FBbUIsTUFBbkIsRUFBMkIsSUFBQyxDQUFBLE1BQU0sQ0FBQyxTQUFVLENBQUEsSUFBQSxDQUE3QyxFQUQ5QjtXQUFBLE1BQUE7WUFJSSxJQUFDLENBQUEsTUFBRCxHQUFVLElBQUMsQ0FBQSxNQUFELElBQVc7bUJBQ3JCLElBQUMsQ0FBQSxNQUFNLENBQUMsU0FBVSxDQUFBLElBQUEsQ0FBbEIsR0FBMEIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFWLENBQW1CLE1BQW5CLEVBQTJCLElBQUMsQ0FBQSxHQUFHLENBQUMsU0FBVSxDQUFBLElBQUEsQ0FBMUMsRUFMOUI7V0FKSjtTQUFBLE1BQUE7VUFXSSxHQUFBLEdBQU0sNkVBQUEsR0FBZ0YsT0FBTztVQUM3RixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQVQsQ0FBZSxHQUFmO0FBQ0EsZ0JBQVUsSUFBQSxLQUFBLENBQU0sR0FBTixFQWJkO1NBUEo7T0FBQSxNQUFBO1FBc0JJLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBVCxDQUFlLGdGQUFmO0FBQ0EsY0FBVSxJQUFBLEtBQUEsQ0FBTSw2REFBTixFQXZCZDs7SUFEZ0I7O21CQTBCcEIsS0FBQSxHQUFPLFNBQUMsUUFBRDtBQUdILFVBQUE7O1FBSEksV0FBVzs7TUFHZixJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVQsQ0FBbUIsSUFBQyxDQUFBLE1BQU0sQ0FBQyxLQUEzQjtNQUdBLElBQUcsSUFBQyxDQUFBLE9BQUQsSUFBYSxRQUFBLEtBQWMsRUFBOUI7UUFFSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQVQsQ0FBYyxvQ0FBZDtlQUVBLElBQUMsQ0FBQSxPQUFPLENBQUMsZUFBVCxDQUF5QixRQUF6QixFQUFtQyxJQUFuQyxFQUpKO09BQUEsTUFBQTtRQVdJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBVCxDQUFjLHlDQUFkO1FBRUEsSUFBQyxDQUFBLE9BQUQsR0FBVztRQUdYLElBQUMsQ0FBQSxVQUFVLENBQUMsSUFBWixDQUFpQixJQUFqQjtRQUtBLEVBQUEsR0FBSyxDQUFDLENBQUMsU0FBRixDQUFZLGVBQVo7UUFNTCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQVYsQ0FBZSxJQUFDLENBQUEsVUFBVSxDQUFDLHdCQUFaLENBQUEsQ0FBZixFQUF1RCxDQUFBLFNBQUEsS0FBQTtpQkFBQSxTQUFDLEdBQUQsRUFBTSxDQUFOO1lBRW5ELElBQUcsR0FBSDtjQUVJLElBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFWLENBQXFCLEdBQUcsQ0FBQyxlQUF6QixDQUFBLElBQThDLEdBQUcsQ0FBQyxTQUFyRDtnQkFNSSxJQUFHLEdBQUcsQ0FBQyxTQUFKLEtBQWlCLFlBQXBCO2tCQUNJLEdBQUcsQ0FBQyxlQUFKLENBQW9CLFFBQXBCLEVBQThCLEtBQTlCLEVBREo7aUJBQUEsTUFBQTtrQkFHSSxHQUFHLENBQUMsZUFBSixDQUFvQixLQUFwQixFQUhKO2lCQU5KOztjQVdBLElBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFWLENBQXFCLEdBQUcsQ0FBQyxtQkFBekIsQ0FBQSxJQUFrRCxHQUFHLENBQUMsU0FBekQ7dUJBQ0ksRUFBRSxDQUFDLEdBQUgsQ0FBTyxHQUFHLENBQUMsbUJBQVgsRUFESjtlQWJKOztVQUZtRDtRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBdkQ7ZUFtQkEsRUFBRSxDQUFDLElBQUgsQ0FBUSxJQUFSLEVBOUNKOztJQU5HOzttQkFzRFAsYUFBQSxHQUFlLFNBQUMsSUFBRCxFQUFPLElBQVA7YUFDWCxJQUFDLENBQUEsU0FBVSxDQUFBLElBQUEsQ0FBWCxHQUFtQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQVYsQ0FBaUIsRUFBakIsRUFBcUIsSUFBQyxDQUFBLE9BQXRCLEVBQStCO1FBQUEsSUFBQSxFQUFPLElBQVA7T0FBL0I7SUFEUjs7bUJBR2Ysd0JBQUEsR0FBMEIsU0FBQTthQUN0QixJQUFDLENBQUEsT0FBTyxDQUFDLHdCQUFULENBQUE7SUFEc0I7Ozs7O0FBSTlCLFNBQU87QUE5S0QsQ0FKVjs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbmRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyM0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3hkQTs7Ozs7O0FBTUEsQ0FBQyxTQUFDLElB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LEVBQUksU0FBQyxnQkFBRDthQUNBLFFBQVEsQ0FBQyxFQUFULENBQVksZ0JBQVo7SUFEQSxDQXpCSjtJQTRCQSxTQUFBLEVBQVcsU0FBQyxFQUFELEVBQUssT0FBTDthQUNQLFFBQVEsQ0FBQyxTQUFULENBQW1CLEVBQW5CLEVBQXVCLE9BQXZCO0lBRE8sQ0E1Qlg7SUFrQ0EsTUFBQSxFQUFRLFNBQUMsQ0FBRDthQUNKLFFBQVEsQ0FBQyxNQUFULENBQWdCLENBQWhCO0lBREksQ0FsQ1I7O0FBcUNKLFNBQU87QUE3Q0QsQ0FKViIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIjIyMqXG4gKiBUaGUgY29yZSBsYXllciB3aWxsIGRlcGVuZCBvbiB0aGUgYmFzZSBsYXllciBhbmQgd2lsbCBwcm92aWRlXG4gKiB0aGUgY29yZSBzZXQgb2YgZnVuY3Rpb25hbGl0eSB0byBhcHBsaWNhdGlvbiBmcmFtZXdvcmtcbiAqIEBhdXRob3IgRnJhbmNpc2NvIFJhbWluaSA8ZnJhbWluaSBhdCBnbWFpbC5jb20+XG4jIyNcbigocm9vdCwgZmFjdG9yeSkgLT5cblxuICAgIG1vZHVsZS5leHBvcnRzID0gcm9vdC5QZXN0bGUgPSBmYWN0b3J5KHJvb3QsIHt9KVxuXG4pKHdpbmRvdywgKHJvb3QsIFBlc3RsZSkgLT5cblxuICAgIEJhc2UgICAgICAgPSByZXF1aXJlKCcuL2Jhc2UuY29mZmVlJylcbiAgICBFeHRNYW5hZ2VyID0gcmVxdWlyZSgnLi91dGlsL2V4dG1hbmFnZXIuY29mZmVlJylcblxuICAgICMgd2UnbGwgdXNlIHRoZSBQZXN0bGUgb2JqZWN0IGFzIHRoZSBnbG9iYWwgRXZlbnQgYnVzXG4gICAgUGVzdGxlID0gbmV3IEJhc2UuRXZlbnRzKClcblxuICAgIFBlc3RsZS5Nb2R1bGUgPSByZXF1aXJlKCcuL3V0aWwvbW9kdWxlLmNvZmZlZScpXG5cbiAgICAjIE5hbWVzcGFjZSBmb3IgbW9kdWxlIGRlZmluaXRpb25cbiAgICBQZXN0bGUubW9kdWxlcyA9IHt9XG5cbiAgICBjbGFzcyBQZXN0bGUuQ29yZVxuICAgICAgICAjIGN1cnJlbnQgdmVyc2lvbiBvZiB0aGUgbGlicmFyeVxuICAgICAgICB2ZXJzaW9uOiBcIjAuMC4xXCJcblxuICAgICAgICBjZmc6XG4gICAgICAgICAgICBkZWJ1ZzpcbiAgICAgICAgICAgICAgICBsb2dMZXZlbDogNSAjIGJ5IGRlZmF1bHQgdGhlIGxvZ2dpbmcgd2lsbCBiZSBkaXNhYmxlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICMgdmFsdWVzIGNhbiBnbyBmcm9tIDAgdG8gNSAoNSBtZWFucyBkaXNhYmxlZClcbiAgICAgICAgICAgIG5hbWVzcGFjZTogJ3BsYXRmb3JtJ1xuXG4gICAgICAgICAgICBleHRlbnNpb246IHt9ICMgZGVmaW5lIHRoZSBuYW1lc3BhY2UgdG8gZGVmaW5lIGV4dGVuc2lvbiBzcGVjaWZpYyBzZXR0aW5nc1xuXG4gICAgICAgICAgICBjb21wb25lbnQ6IHt9ICMgZGVmaW5lIHRoZSBuYW1lc3BhY2UgdG8gZGVmaW5lIGNvbXBvbmVudCBzcGVjaWZpYyBzZXR0aW5nc1xuXG4gICAgICAgIGNvbnN0cnVjdG9yOiAoY29uZmlnID0ge30pIC0+XG4gICAgICAgICAgICAjIGluaXRpYWxpemUgdGhlIGNvbmZpZyBvYmplY3RcbiAgICAgICAgICAgIEBzZXRDb25maWcoY29uZmlnKVxuXG4gICAgICAgICAgICAjIHRoaXMgd2lsbCB0cmFjayB0aGUgc3RhdGUgb2YgdGhlIENvcmUuIFdoZW4gaXQgaXNcbiAgICAgICAgICAgICMgdHJ1ZSwgaXQgbWVhbnMgdGhlIFwic3RhcnQoKVwiIGhhcyBiZWVuIGNhbGxlZFxuICAgICAgICAgICAgQHN0YXJ0ZWQgPSBmYWxzZVxuXG4gICAgICAgICAgICAjIFRoZSBleHRlbnNpb24gbWFuYWdlciB3aWxsIGJlIG9uIGNoYXJnZSBvZiBsb2FkaW5nIGV4dGVuc2lvbnNcbiAgICAgICAgICAgICMgYW5kIG1ha2UgaXRzIGZ1bmN0aW9uYWxpdHkgYXZhaWxhYmxlIHRvIHRoZSBzdGFja1xuICAgICAgICAgICAgQGV4dE1hbmFnZXIgPSBuZXcgRXh0TWFuYWdlcigpXG5cbiAgICAgICAgICAgICMgdGhyb3VnaCB0aGlzIG9iamVjdCB0aGUgbW9kdWxlcyB3aWxsIGJlIGFjY2VzaW5nIHRoZSBtZXRob2RzIGRlZmluZWQgYnkgdGhlXG4gICAgICAgICAgICAjIGV4dGVuc2lvbnNcbiAgICAgICAgICAgIEBzYW5kYm94ID0gQmFzZS51dGlsLmNsb25lIEJhc2VcblxuICAgICAgICAgICAgIyBuYW1lc3BhY2UgdG8gaG9sZCBhbGwgdGhlIHNhbmRib3hlc1xuICAgICAgICAgICAgQHNhbmRib3hlcyA9IHt9XG5cbiAgICAgICAgICAgICMgUmVxdWlyZSBjb3JlIGV4dGVuc2lvbnNcbiAgICAgICAgICAgIENvbXBvbmVudHMgPSByZXF1aXJlKCcuL2V4dGVuc2lvbi9jb21wb25lbnRzLmNvZmZlZScpXG4gICAgICAgICAgICBSZXNwb25zaXZlRGVzaWduID0gcmVxdWlyZSgnLi9leHRlbnNpb24vcmVzcG9uc2l2ZWRlc2lnbi5jb2ZmZWUnKVxuICAgICAgICAgICAgUmVzcG9uc2l2ZUltYWdlcyA9IHJlcXVpcmUoJy4vZXh0ZW5zaW9uL3Jlc3BvbnNpdmVpbWFnZXMuY29mZmVlJylcblxuICAgICAgICAgICAgIyBBZGQgY29yZSBleHRlbnNpb25zIHRvIHRoZSBhcHBcbiAgICAgICAgICAgIEBleHRNYW5hZ2VyLmFkZChDb21wb25lbnRzKVxuICAgICAgICAgICAgQGV4dE1hbmFnZXIuYWRkKFJlc3BvbnNpdmVEZXNpZ24pXG4gICAgICAgICAgICBAZXh0TWFuYWdlci5hZGQoUmVzcG9uc2l2ZUltYWdlcylcblxuICAgICAgICBhZGRFeHRlbnNpb246IChleHQpIC0+XG4gICAgICAgICAgICAjIHdlJ2xsIG9ubHkgYWxsb3cgdG8gYWRkIG5ldyBleHRlbnNpb25zIGJlZm9yZVxuICAgICAgICAgICAgIyB0aGUgQ29yZSBnZXQgc3RhcnRlZFxuICAgICAgICAgICAgdW5sZXNzIEBzdGFydGVkXG4gICAgICAgICAgICAgICAgQGV4dE1hbmFnZXIuYWRkKGV4dClcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBCYXNlLmxvZy5lcnJvcihcIlRoZSBDb3JlIGhhcyBhbHJlYWR5IGJlZW4gc3RhcnRlZC4gWW91IGNhbiBub3QgYWRkIG5ldyBleHRlbnNpb25zIGF0IHRoaXMgcG9pbnQuXCIpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgY2FuIG5vdCBhZGQgZXh0ZW5zaW9ucyB3aGVuIHRoZSBDb3JlIGhhcyBhbHJlYWR5IGJlZW4gc3RhcnRlZC4nKVxuXG4gICAgICAgICMgcHJvdmlkZXMgYSB3YXkgZm9yIHNldHRpbmcgdXAgY29uZmlnc1xuICAgICAgICAjIGFmdGVyIFBlc3RsZSBoYXMgYmVlbiBpbnN0YW50aWF0ZWRcbiAgICAgICAgc2V0Q29uZmlnOiAoY29uZmlnKSAtPlxuICAgICAgICAgICAgdW5sZXNzIEBzdGFydGVkXG4gICAgICAgICAgICAgICAgaWYgQmFzZS51dGlsLmlzT2JqZWN0IGNvbmZpZ1xuICAgICAgICAgICAgICAgICAgICAjIGlmIHdlIGVudGVyIGhlcmUgaXQgbWVhbnMgUGVzdGxlIGhhcyBiZWVuIGFscmVhZHkgaW5pdGlhbGl6ZWRcbiAgICAgICAgICAgICAgICAgICAgIyBkdXJpbmcgaW5zdGFudGlhdGlvbiwgc28gd2UnbGwgdXNlIHRoZSBjb25maWcgb2JqZWN0IGFzIGFcbiAgICAgICAgICAgICAgICAgICAgIyBwcm92aWRlciBmb3IgZGVmYXVsdCB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICB1bmxlc3MgQmFzZS51dGlsLmlzRW1wdHkgQGNvbmZpZ1xuICAgICAgICAgICAgICAgICAgICAgICAgQGNvbmZpZyA9IEJhc2UudXRpbC5kZWZhdWx0cyBjb25maWcsIEBjb25maWdcbiAgICAgICAgICAgICAgICAgICAgIyBpZiBpdCBpcyBlbXB0eSwgaXQgbWVhbnMgd2UgYXJlIGdvaW5nIHNldHRpbmcgdXAgUGVzdGxlIGZvclxuICAgICAgICAgICAgICAgICAgICAjIHRoZSBmaXJzdCB0aW1lXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIEBjb25maWcgPSBCYXNlLnV0aWwuZGVmYXVsdHMgY29uZmlnLCBAY2ZnXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBtc2cgPSBcIltzZXRDb25maWcgbWV0aG9kXSBvbmx5IGFjY2VwdCBhbiBvYmplY3QgYXMgYSBwYXJhbWV0ZXIgYW5kIHlvdSdyZSBwYXNzaW5nOiBcIiArIHR5cGVvZiBjb25maWdcbiAgICAgICAgICAgICAgICAgICAgQmFzZS5sb2cuZXJyb3IobXNnKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIEJhc2UubG9nLmVycm9yKFwiUGVzdGxlIGhhcyBhbHJlYWR5IGJlZW4gc3RhcnRlZC4gWW91IGNhbiBub3Qgc2V0IHVwIGNvbmZpZ3MgYXQgdGhpcyBwb2ludC5cIilcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBjYW4gbm90IHNldCB1cCBjb25maWdzIHdoZW4gUGVzdGxlIGhhcyBhbHJlYWR5IHN0YXJ0ZWQuJylcblxuICAgICAgICBzZXRDb21wb25lbnRDb25maWc6IChjb21wLCBjb25maWcpIC0+XG4gICAgICAgICAgICB1bmxlc3MgQHN0YXJ0ZWRcblxuICAgICAgICAgICAgICAgIHVubGVzcyBjb21wIGFuZCBCYXNlLnV0aWwuaXNTdHJpbmcgY29tcFxuICAgICAgICAgICAgICAgICAgICBtc2cgPSBcIltzZXRDb21wb25lbnRDb25maWcgbWV0aG9kXSAxc3QgcGFyYW0gc2hvdWxkIGJlIGEgc3RyaW5nLCB5b3UncmUgcGFzc2luZzpcIiArIHR5cGVvZiBjb25maWdcbiAgICAgICAgICAgICAgICAgICAgQmFzZS5sb2cuZXJyb3IobXNnKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKVxuXG4gICAgICAgICAgICAgICAgaWYgQmFzZS51dGlsLmlzT2JqZWN0IGNvbmZpZ1xuICAgICAgICAgICAgICAgICAgICAjIGlmIHdlIGVudGVyIGhlcmUgaXQgbWVhbnMgUGVzdGxlIGhhcyBiZWVuIGFscmVhZHkgaW5pdGlhbGl6ZWRcbiAgICAgICAgICAgICAgICAgICAgIyBkdXJpbmcgaW5zdGFudGlhdGlvbiwgc28gd2UnbGwgdXNlIHRoZSBjb25maWcgb2JqZWN0IGFzIGFcbiAgICAgICAgICAgICAgICAgICAgIyBwcm92aWRlciBmb3IgZGVmYXVsdCB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICB1bmxlc3MgQmFzZS51dGlsLmlzRW1wdHkgQGNvbmZpZ1xuICAgICAgICAgICAgICAgICAgICAgICAgQGNvbmZpZy5jb21wb25lbnRbY29tcF0gPSBCYXNlLnV0aWwuZGVmYXVsdHMgY29uZmlnLCBAY29uZmlnLmNvbXBvbmVudFtjb21wXVxuXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIEBjb25maWcgPSBAY29uZmlnIG9yIHt9XG4gICAgICAgICAgICAgICAgICAgICAgICBAY29uZmlnLmNvbXBvbmVudFtjb21wXSA9IEJhc2UudXRpbC5kZWZhdWx0cyBjb25maWcsIEBjZmcuY29tcG9uZW50W2NvbXBdXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBtc2cgPSBcIltzZXRDb21wb25lbnRDb25maWcgbWV0aG9kXSAybmQgcGFyYW0gc2hvdWxkIGJlIGFuIG9iamVjdCAmIHlvdSdyZSBwYXNzaW5nOlwiICsgdHlwZW9mIGNvbmZpZ1xuICAgICAgICAgICAgICAgICAgICBCYXNlLmxvZy5lcnJvcihtc2cpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgQmFzZS5sb2cuZXJyb3IoXCJQZXN0bGUgaGFzIGFscmVhZHkgYmVlbiBzdGFydGVkLiBZb3UgY2FuIG5vdCBhZGQgbmV3IGV4dGVuc2lvbnMgYXQgdGhpcyBwb2ludC5cIilcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBjYW4gbm90IGFkZCBleHRlbnNpb25zIHdoZW4gUGVzdGxlIGhhcyBhbHJlYWR5IHN0YXJ0ZWQuJylcblxuICAgICAgICBzdGFydDogKHNlbGVjdG9yID0gJycpIC0+XG5cbiAgICAgICAgICAgICMgU2V0IHRoZSBsb2dnaW5nIGNvbmZpZ3VyYXRpb24gZm9yIHRoZSBhcHBcbiAgICAgICAgICAgIEJhc2UubG9nLnNldENvbmZpZyhAY29uZmlnLmRlYnVnKVxuXG4gICAgICAgICAgICAjIHRoaXMgd2lsbCBsZXQgdXMgaW5pdGlhbGl6ZSBjb21wb25lbnRzIGF0IGEgbGF0ZXIgc3RhZ2VcbiAgICAgICAgICAgIGlmIEBzdGFydGVkIGFuZCBzZWxlY3RvciBpc250ICcnXG5cbiAgICAgICAgICAgICAgICBCYXNlLmxvZy5pbmZvKFwiUGVzdGxlIGlzIGluaXRpYWxpemluZyBhIGNvbXBvbmVudFwiKVxuXG4gICAgICAgICAgICAgICAgQHNhbmRib3guc3RhcnRDb21wb25lbnRzIHNlbGVjdG9yLCBAXG5cblxuICAgICAgICAgICAgIyBpZiB3ZSBlbnRlciBoZXJlLCBpdCBtZWFucyBpdCBpcyB0aGUgZmlzdCB0aW1lIHRoZSBzdGFydFxuICAgICAgICAgICAgIyBtZXRob2QgaXMgY2FsbGVkIGFuZCB3ZSdsbCBoYXZlIHRvIGluaXRpYWxpemUgYWxsIHRoZSBleHRlbnNpb25zXG4gICAgICAgICAgICBlbHNlXG5cbiAgICAgICAgICAgICAgICBCYXNlLmxvZy5pbmZvKFwiUGVzdGxlIHN0YXJ0ZWQgdGhlIGluaXRpYWxpemluZyBwcm9jZXNzXCIpXG5cbiAgICAgICAgICAgICAgICBAc3RhcnRlZCA9IHRydWVcblxuICAgICAgICAgICAgICAgICMgSW5pdCBhbGwgdGhlIGV4dGVuc2lvbnNcbiAgICAgICAgICAgICAgICBAZXh0TWFuYWdlci5pbml0KEApXG5cbiAgICAgICAgICAgICAgICAjIENhbGxiYWNrIG9iamVjdCB0aGF0IGlzIGdvbm5hIGhvbGQgZnVuY3Rpb25zIHRvIGJlIGV4ZWN1dGVkXG4gICAgICAgICAgICAgICAgIyBhZnRlciBhbGwgZXh0ZW5zaW9ucyBoYXMgYmVlbiBpbml0aWFsaXplZCBhbmQgdGhlIGVhY2ggYWZ0ZXJBcHBTdGFydGVkXG4gICAgICAgICAgICAgICAgIyBtZXRob2QgZXhlY3V0ZWRcbiAgICAgICAgICAgICAgICBjYiA9ICQuQ2FsbGJhY2tzIFwidW5pcXVlIG1lbW9yeVwiXG5cbiAgICAgICAgICAgICAgICAjIE9uY2UgdGhlIGV4dGVuc2lvbnMgaGF2ZSBiZWVuIGluaXRpYWxpemVkLCBsZXRzIGNhbGwgdGhlIGFmdGVyQXBwU3RhcnRlZFxuICAgICAgICAgICAgICAgICMgZnJvbSBlYWNoIGV4dGVuc2lvblxuICAgICAgICAgICAgICAgICMgTm90ZTogVGhpcyBtZXRob2Qgd2lsbCBsZXQgZWFjaCBleHRlbnNpb24gdG8gYXV0b21hdGljYWxseSBleGVjdXRlIHNvbWUgY29kZVxuICAgICAgICAgICAgICAgICMgICAgICAgb25jZSB0aGUgYXBwIGhhcyBzdGFydGVkLlxuICAgICAgICAgICAgICAgIEJhc2UudXRpbC5lYWNoIEBleHRNYW5hZ2VyLmdldEluaXRpYWxpemVkRXh0ZW5zaW9ucygpLCAoZXh0LCBpKSA9PlxuXG4gICAgICAgICAgICAgICAgICAgIGlmIGV4dFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiBCYXNlLnV0aWwuaXNGdW5jdGlvbihleHQuYWZ0ZXJBcHBTdGFydGVkKSBhbmQgZXh0LmFjdGl2YXRlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICMgc2luY2UgdGhlIGNvbXBvbmVudCBleHRlbnNpb24gaXMgdGhlIGVudHJ5IHBvaW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBmb3IgaW5pdGlhbGl6aW5nIHRoZSBhcHAsIHdlJ2xsIGdpdmUgaXQgc3BlY2lhbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICMgdHJlYXRtZW50IGFuZCBnaXZlIGl0IHRoZSBhYmlsaXR5IHRvIHJlY2VpdmUgYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGV4dHJhIHBhcmFtZXRlciAodG8gc3RhcnQgY29tcG9uZW50cyB0aGF0IG9ubHkgYmVsb25nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIyB0byBhIHBhcnRpY3VsYXIgRE9NIGVsZW1lbnQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgZXh0Lm9wdGlvbktleSBpcyBcImNvbXBvbmVudHNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHQuYWZ0ZXJBcHBTdGFydGVkIHNlbGVjdG9yLCBAXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHQuYWZ0ZXJBcHBTdGFydGVkKEApXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIEJhc2UudXRpbC5pc0Z1bmN0aW9uKGV4dC5hZnRlckFwcEluaXRpYWxpemVkKSBhbmQgZXh0LmFjdGl2YXRlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNiLmFkZCBleHQuYWZ0ZXJBcHBJbml0aWFsaXplZFxuXG4gICAgICAgICAgICAgICAgIyBDYWxsIHRoZSAuYWZ0ZXJBcHBJbml0aWFsaXplZCBjYWxsYmFja3Mgd2l0aCBAIGFzIHBhcmFtZXRlclxuICAgICAgICAgICAgICAgIGNiLmZpcmUgQFxuXG4gICAgICAgIGNyZWF0ZVNhbmRib3g6IChuYW1lLCBvcHRzKSAtPlxuICAgICAgICAgICAgQHNhbmRib3hlc1tuYW1lXSA9IEJhc2UudXRpbC5leHRlbmQge30sIEBzYW5kYm94LCBuYW1lIDogbmFtZVxuXG4gICAgICAgIGdldEluaXRpYWxpemVkQ29tcG9uZW50czogKCkgLT5cbiAgICAgICAgICAgIEBzYW5kYm94LmdldEluaXRpYWxpemVkQ29tcG9uZW50cygpXG5cblxuICAgIHJldHVybiBQZXN0bGVcbilcbiIsIi8qXHJcbiAqIENvb2tpZXMuanMgLSAxLjIuMVxyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vU2NvdHRIYW1wZXIvQ29va2llc1xyXG4gKlxyXG4gKiBUaGlzIGlzIGZyZWUgYW5kIHVuZW5jdW1iZXJlZCBzb2Z0d2FyZSByZWxlYXNlZCBpbnRvIHRoZSBwdWJsaWMgZG9tYWluLlxyXG4gKi9cclxuKGZ1bmN0aW9uIChnbG9iYWwsIHVuZGVmaW5lZCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIHZhciBmYWN0b3J5ID0gZnVuY3Rpb24gKHdpbmRvdykge1xyXG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93LmRvY3VtZW50ICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nvb2tpZXMuanMgcmVxdWlyZXMgYSBgd2luZG93YCB3aXRoIGEgYGRvY3VtZW50YCBvYmplY3QnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBDb29raWVzID0gZnVuY3Rpb24gKGtleSwgdmFsdWUsIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPT09IDEgP1xyXG4gICAgICAgICAgICAgICAgQ29va2llcy5nZXQoa2V5KSA6IENvb2tpZXMuc2V0KGtleSwgdmFsdWUsIG9wdGlvbnMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIEFsbG93cyBmb3Igc2V0dGVyIGluamVjdGlvbiBpbiB1bml0IHRlc3RzXHJcbiAgICAgICAgQ29va2llcy5fZG9jdW1lbnQgPSB3aW5kb3cuZG9jdW1lbnQ7XHJcblxyXG4gICAgICAgIC8vIFVzZWQgdG8gZW5zdXJlIGNvb2tpZSBrZXlzIGRvIG5vdCBjb2xsaWRlIHdpdGhcclxuICAgICAgICAvLyBidWlsdC1pbiBgT2JqZWN0YCBwcm9wZXJ0aWVzXHJcbiAgICAgICAgQ29va2llcy5fY2FjaGVLZXlQcmVmaXggPSAnY29va2V5Lic7IC8vIEh1cnIgaHVyciwgOilcclxuICAgICAgICBcclxuICAgICAgICBDb29raWVzLl9tYXhFeHBpcmVEYXRlID0gbmV3IERhdGUoJ0ZyaSwgMzEgRGVjIDk5OTkgMjM6NTk6NTkgVVRDJyk7XHJcblxyXG4gICAgICAgIENvb2tpZXMuZGVmYXVsdHMgPSB7XHJcbiAgICAgICAgICAgIHBhdGg6ICcvJyxcclxuICAgICAgICAgICAgc2VjdXJlOiBmYWxzZVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIENvb2tpZXMuZ2V0ID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICBpZiAoQ29va2llcy5fY2FjaGVkRG9jdW1lbnRDb29raWUgIT09IENvb2tpZXMuX2RvY3VtZW50LmNvb2tpZSkge1xyXG4gICAgICAgICAgICAgICAgQ29va2llcy5fcmVuZXdDYWNoZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gQ29va2llcy5fY2FjaGVbQ29va2llcy5fY2FjaGVLZXlQcmVmaXggKyBrZXldO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIENvb2tpZXMuc2V0ID0gZnVuY3Rpb24gKGtleSwgdmFsdWUsIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgb3B0aW9ucyA9IENvb2tpZXMuX2dldEV4dGVuZGVkT3B0aW9ucyhvcHRpb25zKTtcclxuICAgICAgICAgICAgb3B0aW9ucy5leHBpcmVzID0gQ29va2llcy5fZ2V0RXhwaXJlc0RhdGUodmFsdWUgPT09IHVuZGVmaW5lZCA/IC0xIDogb3B0aW9ucy5leHBpcmVzKTtcclxuXHJcbiAgICAgICAgICAgIENvb2tpZXMuX2RvY3VtZW50LmNvb2tpZSA9IENvb2tpZXMuX2dlbmVyYXRlQ29va2llU3RyaW5nKGtleSwgdmFsdWUsIG9wdGlvbnMpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIENvb2tpZXM7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgQ29va2llcy5leHBpcmUgPSBmdW5jdGlvbiAoa2V5LCBvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBDb29raWVzLnNldChrZXksIHVuZGVmaW5lZCwgb3B0aW9ucyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgQ29va2llcy5fZ2V0RXh0ZW5kZWRPcHRpb25zID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHBhdGg6IG9wdGlvbnMgJiYgb3B0aW9ucy5wYXRoIHx8IENvb2tpZXMuZGVmYXVsdHMucGF0aCxcclxuICAgICAgICAgICAgICAgIGRvbWFpbjogb3B0aW9ucyAmJiBvcHRpb25zLmRvbWFpbiB8fCBDb29raWVzLmRlZmF1bHRzLmRvbWFpbixcclxuICAgICAgICAgICAgICAgIGV4cGlyZXM6IG9wdGlvbnMgJiYgb3B0aW9ucy5leHBpcmVzIHx8IENvb2tpZXMuZGVmYXVsdHMuZXhwaXJlcyxcclxuICAgICAgICAgICAgICAgIHNlY3VyZTogb3B0aW9ucyAmJiBvcHRpb25zLnNlY3VyZSAhPT0gdW5kZWZpbmVkID8gIG9wdGlvbnMuc2VjdXJlIDogQ29va2llcy5kZWZhdWx0cy5zZWN1cmVcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBDb29raWVzLl9pc1ZhbGlkRGF0ZSA9IGZ1bmN0aW9uIChkYXRlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZGF0ZSkgPT09ICdbb2JqZWN0IERhdGVdJyAmJiAhaXNOYU4oZGF0ZS5nZXRUaW1lKCkpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIENvb2tpZXMuX2dldEV4cGlyZXNEYXRlID0gZnVuY3Rpb24gKGV4cGlyZXMsIG5vdykge1xyXG4gICAgICAgICAgICBub3cgPSBub3cgfHwgbmV3IERhdGUoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZXhwaXJlcyA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgICAgIGV4cGlyZXMgPSBleHBpcmVzID09PSBJbmZpbml0eSA/XHJcbiAgICAgICAgICAgICAgICAgICAgQ29va2llcy5fbWF4RXhwaXJlRGF0ZSA6IG5ldyBEYXRlKG5vdy5nZXRUaW1lKCkgKyBleHBpcmVzICogMTAwMCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGV4cGlyZXMgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICBleHBpcmVzID0gbmV3IERhdGUoZXhwaXJlcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChleHBpcmVzICYmICFDb29raWVzLl9pc1ZhbGlkRGF0ZShleHBpcmVzKSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdgZXhwaXJlc2AgcGFyYW1ldGVyIGNhbm5vdCBiZSBjb252ZXJ0ZWQgdG8gYSB2YWxpZCBEYXRlIGluc3RhbmNlJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBleHBpcmVzO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIENvb2tpZXMuX2dlbmVyYXRlQ29va2llU3RyaW5nID0gZnVuY3Rpb24gKGtleSwgdmFsdWUsIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAga2V5ID0ga2V5LnJlcGxhY2UoL1teIyQmK1xcXmB8XS9nLCBlbmNvZGVVUklDb21wb25lbnQpO1xyXG4gICAgICAgICAgICBrZXkgPSBrZXkucmVwbGFjZSgvXFwoL2csICclMjgnKS5yZXBsYWNlKC9cXCkvZywgJyUyOScpO1xyXG4gICAgICAgICAgICB2YWx1ZSA9ICh2YWx1ZSArICcnKS5yZXBsYWNlKC9bXiEjJCYtK1xcLS06PC1cXFtcXF0tfl0vZywgZW5jb2RlVVJJQ29tcG9uZW50KTtcclxuICAgICAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblxyXG4gICAgICAgICAgICB2YXIgY29va2llU3RyaW5nID0ga2V5ICsgJz0nICsgdmFsdWU7XHJcbiAgICAgICAgICAgIGNvb2tpZVN0cmluZyArPSBvcHRpb25zLnBhdGggPyAnO3BhdGg9JyArIG9wdGlvbnMucGF0aCA6ICcnO1xyXG4gICAgICAgICAgICBjb29raWVTdHJpbmcgKz0gb3B0aW9ucy5kb21haW4gPyAnO2RvbWFpbj0nICsgb3B0aW9ucy5kb21haW4gOiAnJztcclxuICAgICAgICAgICAgY29va2llU3RyaW5nICs9IG9wdGlvbnMuZXhwaXJlcyA/ICc7ZXhwaXJlcz0nICsgb3B0aW9ucy5leHBpcmVzLnRvVVRDU3RyaW5nKCkgOiAnJztcclxuICAgICAgICAgICAgY29va2llU3RyaW5nICs9IG9wdGlvbnMuc2VjdXJlID8gJztzZWN1cmUnIDogJyc7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY29va2llU3RyaW5nO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIENvb2tpZXMuX2dldENhY2hlRnJvbVN0cmluZyA9IGZ1bmN0aW9uIChkb2N1bWVudENvb2tpZSkge1xyXG4gICAgICAgICAgICB2YXIgY29va2llQ2FjaGUgPSB7fTtcclxuICAgICAgICAgICAgdmFyIGNvb2tpZXNBcnJheSA9IGRvY3VtZW50Q29va2llID8gZG9jdW1lbnRDb29raWUuc3BsaXQoJzsgJykgOiBbXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29va2llc0FycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29va2llS3ZwID0gQ29va2llcy5fZ2V0S2V5VmFsdWVQYWlyRnJvbUNvb2tpZVN0cmluZyhjb29raWVzQXJyYXlbaV0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjb29raWVDYWNoZVtDb29raWVzLl9jYWNoZUtleVByZWZpeCArIGNvb2tpZUt2cC5rZXldID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb29raWVDYWNoZVtDb29raWVzLl9jYWNoZUtleVByZWZpeCArIGNvb2tpZUt2cC5rZXldID0gY29va2llS3ZwLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY29va2llQ2FjaGU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgQ29va2llcy5fZ2V0S2V5VmFsdWVQYWlyRnJvbUNvb2tpZVN0cmluZyA9IGZ1bmN0aW9uIChjb29raWVTdHJpbmcpIHtcclxuICAgICAgICAgICAgLy8gXCI9XCIgaXMgYSB2YWxpZCBjaGFyYWN0ZXIgaW4gYSBjb29raWUgdmFsdWUgYWNjb3JkaW5nIHRvIFJGQzYyNjUsIHNvIGNhbm5vdCBgc3BsaXQoJz0nKWBcclxuICAgICAgICAgICAgdmFyIHNlcGFyYXRvckluZGV4ID0gY29va2llU3RyaW5nLmluZGV4T2YoJz0nKTtcclxuXHJcbiAgICAgICAgICAgIC8vIElFIG9taXRzIHRoZSBcIj1cIiB3aGVuIHRoZSBjb29raWUgdmFsdWUgaXMgYW4gZW1wdHkgc3RyaW5nXHJcbiAgICAgICAgICAgIHNlcGFyYXRvckluZGV4ID0gc2VwYXJhdG9ySW5kZXggPCAwID8gY29va2llU3RyaW5nLmxlbmd0aCA6IHNlcGFyYXRvckluZGV4O1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGtleTogZGVjb2RlVVJJQ29tcG9uZW50KGNvb2tpZVN0cmluZy5zdWJzdHIoMCwgc2VwYXJhdG9ySW5kZXgpKSxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBkZWNvZGVVUklDb21wb25lbnQoY29va2llU3RyaW5nLnN1YnN0cihzZXBhcmF0b3JJbmRleCArIDEpKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIENvb2tpZXMuX3JlbmV3Q2FjaGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIENvb2tpZXMuX2NhY2hlID0gQ29va2llcy5fZ2V0Q2FjaGVGcm9tU3RyaW5nKENvb2tpZXMuX2RvY3VtZW50LmNvb2tpZSk7XHJcbiAgICAgICAgICAgIENvb2tpZXMuX2NhY2hlZERvY3VtZW50Q29va2llID0gQ29va2llcy5fZG9jdW1lbnQuY29va2llO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIENvb2tpZXMuX2FyZUVuYWJsZWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciB0ZXN0S2V5ID0gJ2Nvb2tpZXMuanMnO1xyXG4gICAgICAgICAgICB2YXIgYXJlRW5hYmxlZCA9IENvb2tpZXMuc2V0KHRlc3RLZXksIDEpLmdldCh0ZXN0S2V5KSA9PT0gJzEnO1xyXG4gICAgICAgICAgICBDb29raWVzLmV4cGlyZSh0ZXN0S2V5KTtcclxuICAgICAgICAgICAgcmV0dXJuIGFyZUVuYWJsZWQ7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgQ29va2llcy5lbmFibGVkID0gQ29va2llcy5fYXJlRW5hYmxlZCgpO1xyXG5cclxuICAgICAgICByZXR1cm4gQ29va2llcztcclxuICAgIH07XHJcblxyXG4gICAgdmFyIGNvb2tpZXNFeHBvcnQgPSB0eXBlb2YgZ2xvYmFsLmRvY3VtZW50ID09PSAnb2JqZWN0JyA/IGZhY3RvcnkoZ2xvYmFsKSA6IGZhY3Rvcnk7XHJcblxyXG4gICAgLy8gQU1EIHN1cHBvcnRcclxuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcclxuICAgICAgICBkZWZpbmUoZnVuY3Rpb24gKCkgeyByZXR1cm4gY29va2llc0V4cG9ydDsgfSk7XHJcbiAgICAvLyBDb21tb25KUy9Ob2RlLmpzIHN1cHBvcnRcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgLy8gU3VwcG9ydCBOb2RlLmpzIHNwZWNpZmljIGBtb2R1bGUuZXhwb3J0c2AgKHdoaWNoIGNhbiBiZSBhIGZ1bmN0aW9uKVxyXG4gICAgICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGNvb2tpZXNFeHBvcnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEJ1dCBhbHdheXMgc3VwcG9ydCBDb21tb25KUyBtb2R1bGUgMS4xLjEgc3BlYyAoYGV4cG9ydHNgIGNhbm5vdCBiZSBhIGZ1bmN0aW9uKVxyXG4gICAgICAgIGV4cG9ydHMuQ29va2llcyA9IGNvb2tpZXNFeHBvcnQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGdsb2JhbC5Db29raWVzID0gY29va2llc0V4cG9ydDtcclxuICAgIH1cclxufSkodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgPyB0aGlzIDogd2luZG93KTsiLCI7XG4oZnVuY3Rpb24od2luZG93LCBkb2N1bWVudCkge1xuXG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIGRlZmF1bHRXaWR0aHMsIGdldEtleXMsIG5leHRUaWNrLCBhZGRFdmVudCwgZ2V0TmF0dXJhbFdpZHRoO1xuXG4gICAgbmV4dFRpY2sgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMDAgLyA2MCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGFwcGx5RWFjaChjb2xsZWN0aW9uLCBjYWxsYmFja0VhY2gpIHtcbiAgICAgICAgdmFyIGkgPSAwLFxuICAgICAgICAgICAgbGVuZ3RoID0gY29sbGVjdGlvbi5sZW5ndGgsXG4gICAgICAgICAgICBuZXdfY29sbGVjdGlvbiA9IFtdO1xuXG4gICAgICAgIGZvciAoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIG5ld19jb2xsZWN0aW9uW2ldID0gY2FsbGJhY2tFYWNoKGNvbGxlY3Rpb25baV0sIGkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ld19jb2xsZWN0aW9uO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJldHVybkRpcmVjdFZhbHVlKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXROYXR1cmFsV2lkdGggPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyksICduYXR1cmFsV2lkdGgnKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGltYWdlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGltYWdlLm5hdHVyYWxXaWR0aDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgLy8gSUU4IGFuZCBiZWxvdyBsYWNrcyB0aGUgbmF0dXJhbFdpZHRoIHByb3BlcnR5XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzb3VyY2UpIHtcbiAgICAgICAgICAgIHZhciBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgICAgIGltZy5zcmMgPSBzb3VyY2Uuc3JjO1xuICAgICAgICAgICAgcmV0dXJuIGltZy53aWR0aDtcbiAgICAgICAgfTtcbiAgICB9KSgpO1xuXG4gICAgYWRkRXZlbnQgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gYWRkU3RhbmRhcmRFdmVudExpc3RlbmVyKGVsLCBldmVudE5hbWUsIGZuKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBmbiwgZmFsc2UpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiBhZGRJRUV2ZW50TGlzdGVuZXIoZWwsIGV2ZW50TmFtZSwgZm4pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZWwuYXR0YWNoRXZlbnQoJ29uJyArIGV2ZW50TmFtZSwgZm4pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0pKCk7XG5cbiAgICBkZWZhdWx0V2lkdGhzID0gWzk2LCAxMzAsIDE2NSwgMjAwLCAyMzUsIDI3MCwgMzA0LCAzNDAsIDM3NSwgNDEwLCA0NDUsIDQ4NSwgNTIwLCA1NTUsIDU5MCwgNjI1LCA2NjAsIDY5NSwgNzM2XTtcblxuICAgIGdldEtleXMgPSB0eXBlb2YgT2JqZWN0LmtleXMgPT09ICdmdW5jdGlvbicgPyBPYmplY3Qua2V5cyA6IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgICAgICB2YXIga2V5cyA9IFtdLFxuICAgICAgICAgICAga2V5O1xuXG4gICAgICAgIGZvciAoa2V5IGluIG9iamVjdCkge1xuICAgICAgICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ga2V5cztcbiAgICB9O1xuXG5cbiAgICAvKlxuICAgICAgICBDb25zdHJ1Y3QgYSBuZXcgSW1hZ2VyIGluc3RhbmNlLCBwYXNzaW5nIGFuIG9wdGlvbmFsIGNvbmZpZ3VyYXRpb24gb2JqZWN0LlxuXG4gICAgICAgIEV4YW1wbGUgdXNhZ2U6XG5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBBdmFpbGFibGUgd2lkdGhzIGZvciB5b3VyIGltYWdlc1xuICAgICAgICAgICAgICAgIGF2YWlsYWJsZVdpZHRoczogW051bWJlcl0sXG5cbiAgICAgICAgICAgICAgICAvLyBTZWxlY3RvciB0byBiZSB1c2VkIHRvIGxvY2F0ZSB5b3VyIGRpdiBwbGFjZWhvbGRlcnNcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJycsXG5cbiAgICAgICAgICAgICAgICAvLyBDbGFzcyBuYW1lIHRvIGdpdmUgeW91ciByZXNpemFibGUgaW1hZ2VzXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnJyxcblxuICAgICAgICAgICAgICAgIC8vIElmIHNldCB0byB0cnVlLCBJbWFnZXIgd2lsbCB1cGRhdGUgdGhlIHNyYyBhdHRyaWJ1dGUgb2YgdGhlIHJlbGV2YW50IGltYWdlc1xuICAgICAgICAgICAgICAgIG9uUmVzaXplOiBCb29sZWFuLFxuXG4gICAgICAgICAgICAgICAgLy8gVG9nZ2xlIHRoZSBsYXp5IGxvYWQgZnVuY3Rpb25hbGl0eSBvbiBvciBvZmZcbiAgICAgICAgICAgICAgICBsYXp5bG9hZDogQm9vbGVhbixcblxuICAgICAgICAgICAgICAgIC8vIFVzZWQgYWxvbmdzaWRlIHRoZSBsYXp5bG9hZCBmZWF0dXJlIChoZWxwcyBwZXJmb3JtYW5jZSBieSBzZXR0aW5nIGEgaGlnaGVyIGRlbGF5KVxuICAgICAgICAgICAgICAgIHNjcm9sbERlbGF5OiBOdW1iZXJcbiAgICAgICAgICAgIH1cblxuICAgICAgICBAcGFyYW0ge29iamVjdH0gY29uZmlndXJhdGlvbiBzZXR0aW5nc1xuICAgICAgICBAcmV0dXJuIHtvYmplY3R9IGluc3RhbmNlIG9mIEltYWdlclxuICAgICAqL1xuICAgIGZ1bmN0aW9uIEltYWdlcihlbGVtZW50cywgb3B0cykge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgICAgICBkb2MgPSBkb2N1bWVudDtcblxuICAgICAgICBvcHRzID0gb3B0cyB8fCB7fTtcblxuICAgICAgICBpZiAoZWxlbWVudHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gZmlyc3QgYXJndW1lbnQgaXMgc2VsZWN0b3Igc3RyaW5nXG4gICAgICAgICAgICBpZiAodHlwZW9mIGVsZW1lbnRzID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIG9wdHMuc2VsZWN0b3IgPSBlbGVtZW50cztcbiAgICAgICAgICAgICAgICBlbGVtZW50cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gZmlyc3QgYXJndW1lbnQgaXMgdGhlIGBvcHRzYCBvYmplY3QsIGBlbGVtZW50c2AgaXMgaW1wbGljaXRseSB0aGUgYG9wdHMuc2VsZWN0b3JgIHN0cmluZ1xuICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIGVsZW1lbnRzLmxlbmd0aCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBvcHRzID0gZWxlbWVudHM7XG4gICAgICAgICAgICAgICAgZWxlbWVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmltYWdlc09mZlNjcmVlbiA9IFtdO1xuICAgICAgICB0aGlzLnZpZXdwb3J0SGVpZ2h0ID0gZG9jLmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgICAgIHRoaXMuc2VsZWN0b3IgPSBvcHRzLnNlbGVjdG9yIHx8ICcuZGVsYXllZC1pbWFnZS1sb2FkJztcbiAgICAgICAgdGhpcy5jbGFzc05hbWUgPSBvcHRzLmNsYXNzTmFtZSB8fCAnaW1hZ2UtcmVwbGFjZSc7XG4gICAgICAgIHRoaXMuZ2lmID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICB0aGlzLmdpZi5zcmMgPSAnZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoRUFBSkFJQUFBUC8vL3dBQUFDSDVCQUVBQUFBQUxBQUFBQUFRQUFrQUFBSUtoSStweSswUG81eVVGUUE3JztcbiAgICAgICAgdGhpcy5naWYuY2xhc3NOYW1lID0gdGhpcy5jbGFzc05hbWU7XG4gICAgICAgIHRoaXMuZ2lmLmFsdCA9ICcnO1xuICAgICAgICB0aGlzLnNjcm9sbERlbGF5ID0gb3B0cy5zY3JvbGxEZWxheSB8fCAyNTA7XG4gICAgICAgIHRoaXMub25SZXNpemUgPSBvcHRzLmhhc093blByb3BlcnR5KCdvblJlc2l6ZScpID8gb3B0cy5vblJlc2l6ZSA6IHRydWU7XG4gICAgICAgIHRoaXMubGF6eWxvYWQgPSBvcHRzLmhhc093blByb3BlcnR5KCdsYXp5bG9hZCcpID8gb3B0cy5sYXp5bG9hZCA6IGZhbHNlO1xuICAgICAgICB0aGlzLnNjcm9sbGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYXZhaWxhYmxlUGl4ZWxSYXRpb3MgPSBvcHRzLmF2YWlsYWJsZVBpeGVsUmF0aW9zIHx8IFsxLCAyXTtcbiAgICAgICAgdGhpcy5hdmFpbGFibGVXaWR0aHMgPSBvcHRzLmF2YWlsYWJsZVdpZHRocyB8fCBkZWZhdWx0V2lkdGhzO1xuICAgICAgICB0aGlzLm9uSW1hZ2VzUmVwbGFjZWQgPSBvcHRzLm9uSW1hZ2VzUmVwbGFjZWQgfHwgZnVuY3Rpb24oKSB7fTtcbiAgICAgICAgdGhpcy53aWR0aHNNYXAgPSB7fTtcbiAgICAgICAgdGhpcy5yZWZyZXNoUGl4ZWxSYXRpbygpO1xuICAgICAgICB0aGlzLndpZHRoSW50ZXJwb2xhdG9yID0gb3B0cy53aWR0aEludGVycG9sYXRvciB8fCByZXR1cm5EaXJlY3RWYWx1ZTtcbiAgICAgICAgdGhpcy5kZWx0YVNxdWFyZSA9IG9wdHMuZGVsdGFTcXVhcmUgfHwgMS41O1xuICAgICAgICB0aGlzLnNxdWFyZVNlbGVjdG9yID0gb3B0cy5zcXVhcmVTZWxlY3RvciB8fCAnc3FyY3JvcCc7XG4gICAgICAgIHRoaXMuYWRhcHRTZWxlY3RvciA9IHRoaXMuYWRhcHRTZWxlY3RvciB8fCAnYWRhcHQnO1xuICAgICAgICB0aGlzLmFsbG93ZWRFeHRlbnNpb25zID0gW1wianBnXCIsXCJibXBcIixcInBuZ1wiLFwianBlZ1wiXTtcblxuICAgICAgICAvLyBOZWVkZWQgYXMgSUU4IGFkZHMgYSBkZWZhdWx0IGB3aWR0aGAvYGhlaWdodGAgYXR0cmlidXRl4oCmXG4gICAgICAgIHRoaXMuZ2lmLnJlbW92ZUF0dHJpYnV0ZSgnaGVpZ2h0Jyk7XG4gICAgICAgIHRoaXMuZ2lmLnJlbW92ZUF0dHJpYnV0ZSgnd2lkdGgnKTtcblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuYXZhaWxhYmxlV2lkdGhzICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuYXZhaWxhYmxlV2lkdGhzLmxlbmd0aCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLndpZHRoc01hcCA9IEltYWdlci5jcmVhdGVXaWR0aHNNYXAodGhpcy5hdmFpbGFibGVXaWR0aHMsIHRoaXMud2lkdGhJbnRlcnBvbGF0b3IpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLndpZHRoc01hcCA9IHRoaXMuYXZhaWxhYmxlV2lkdGhzO1xuICAgICAgICAgICAgICAgIHRoaXMuYXZhaWxhYmxlV2lkdGhzID0gZ2V0S2V5cyh0aGlzLmF2YWlsYWJsZVdpZHRocyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuYXZhaWxhYmxlV2lkdGhzID0gdGhpcy5hdmFpbGFibGVXaWR0aHMuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGEgLSBiO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuXG5cbiAgICAgICAgaWYgKGVsZW1lbnRzKSB7XG4gICAgICAgICAgICB0aGlzLmRpdnMgPSBhcHBseUVhY2goZWxlbWVudHMsIHJldHVybkRpcmVjdFZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0b3IgPSBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kaXZzID0gYXBwbHlFYWNoKGRvYy5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuc2VsZWN0b3IpLCByZXR1cm5EaXJlY3RWYWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNoYW5nZURpdnNUb0VtcHR5SW1hZ2VzKCk7XG5cbiAgICAgICAgbmV4dFRpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZWxmLmluaXQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgSW1hZ2VyLnByb3RvdHlwZS5zY3JvbGxDaGVjayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5zY3JvbGxlZCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmltYWdlc09mZlNjcmVlbi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5kaXZzID0gdGhpcy5pbWFnZXNPZmZTY3JlZW4uc2xpY2UoMCk7IC8vIGNvcHkgYnkgdmFsdWUsIGRvbid0IGNvcHkgYnkgcmVmZXJlbmNlXG4gICAgICAgICAgICB0aGlzLmltYWdlc09mZlNjcmVlbi5sZW5ndGggPSAwO1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEaXZzVG9FbXB0eUltYWdlcygpO1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIEltYWdlci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jaGVja0ltYWdlc05lZWRSZXBsYWNpbmcodGhpcy5kaXZzKTtcblxuICAgICAgICBpZiAodGhpcy5vblJlc2l6ZSkge1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlclJlc2l6ZUV2ZW50KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5sYXp5bG9hZCkge1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlclNjcm9sbEV2ZW50KCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgSW1hZ2VyLnByb3RvdHlwZS5jcmVhdGVHaWYgPSBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgIC8vIGlmIHRoZSBlbGVtZW50IGlzIGFscmVhZHkgYSByZXNwb25zaXZlIGltYWdlIHRoZW4gd2UgZG9uJ3QgcmVwbGFjZSBpdCBhZ2FpblxuICAgICAgICBpZiAoZWxlbWVudC5jbGFzc05hbWUubWF0Y2gobmV3IFJlZ0V4cCgnKF58ICknICsgdGhpcy5jbGFzc05hbWUgKyAnKCB8JCknKSkpIHtcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGVsZW1lbnRDbGFzc05hbWUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1jbGFzcycpO1xuICAgICAgICB2YXIgZWxlbWVudFdpZHRoID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtd2lkdGgnKTtcbiAgICAgICAgdmFyIGdpZiA9IHRoaXMuZ2lmLmNsb25lTm9kZShmYWxzZSk7XG5cbiAgICAgICAgaWYgKGVsZW1lbnRXaWR0aCkge1xuICAgICAgICAgICAgZ2lmLndpZHRoID0gZWxlbWVudFdpZHRoO1xuICAgICAgICAgICAgZ2lmLnNldEF0dHJpYnV0ZSgnZGF0YS13aWR0aCcsIGVsZW1lbnRXaWR0aCk7XG4gICAgICAgIH1cblxuICAgICAgICBnaWYuY2xhc3NOYW1lID0gKGVsZW1lbnRDbGFzc05hbWUgPyBlbGVtZW50Q2xhc3NOYW1lICsgJyAnIDogJycpICsgdGhpcy5jbGFzc05hbWU7XG4gICAgICAgIGdpZi5zZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJywgZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJykpO1xuICAgICAgICBnaWYuc2V0QXR0cmlidXRlKCdhbHQnLCBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1hbHQnKSB8fCB0aGlzLmdpZi5hbHQpO1xuICAgICAgICBnaWYuc2V0QXR0cmlidXRlKCdpdGVtcHJvcCcsIGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWl0ZW1wcm9wJykgfHwgXCJjb250ZW50VXJsXCIpO1xuXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBkYXRhLXRpdGxlIGF0dHJpYnV0ZSBpcyB0aGVyZVxuICAgICAgICB2YXIgdGl0bGVUZXh0ID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGl0bGUnKTtcbiAgICAgICAgaWYgKHRpdGxlVGV4dCkge1xuICAgICAgICAgICAgZ2lmLnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aXRsZVRleHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgZWxlbWVudC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChnaWYsIGVsZW1lbnQpO1xuXG4gICAgICAgIHJldHVybiBnaWY7XG4gICAgfTtcblxuICAgIEltYWdlci5wcm90b3R5cGUuY2hhbmdlRGl2c1RvRW1wdHlJbWFnZXMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIGFwcGx5RWFjaCh0aGlzLmRpdnMsIGZ1bmN0aW9uKGVsZW1lbnQsIGkpIHtcbiAgICAgICAgICAgIGlmIChzZWxmLmxhenlsb2FkKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuaXNUaGlzRWxlbWVudE9uU2NyZWVuKGVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZGl2c1tpXSA9IHNlbGYuY3JlYXRlR2lmKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VzT2ZmU2NyZWVuLnB1c2goZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxmLmRpdnNbaV0gPSBzZWxmLmNyZWF0ZUdpZihlbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tJbWFnZXNOZWVkUmVwbGFjaW5nKHRoaXMuZGl2cyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgSW1hZ2VyLnByb3RvdHlwZS5pc1RoaXNFbGVtZW50T25TY3JlZW4gPSBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgIC8vIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIHdhcyB3b3JraW5nIGluIENocm9tZSBidXQgZGlkbid0IHdvcmsgb24gRmlyZWZveCwgc28gaGFkIHRvIHJlc29ydCB0byB3aW5kb3cucGFnZVlPZmZzZXRcbiAgICAgICAgLy8gYnV0IGNhbid0IGZhbGxiYWNrIHRvIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIGFzIHRoYXQgZG9lc24ndCB3b3JrIGluIElFIHdpdGggYSBkb2N0eXBlICg/KSBzbyBoYXZlIHRvIHVzZSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wXG4gICAgICAgIHZhciBvZmZzZXQgPSBJbWFnZXIuZ2V0UGFnZU9mZnNldCgpO1xuICAgICAgICB2YXIgZWxlbWVudE9mZnNldFRvcCA9IDA7XG5cbiAgICAgICAgaWYgKGVsZW1lbnQub2Zmc2V0UGFyZW50KSB7XG4gICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgZWxlbWVudE9mZnNldFRvcCArPSBlbGVtZW50Lm9mZnNldFRvcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdoaWxlIChlbGVtZW50ID0gZWxlbWVudC5vZmZzZXRQYXJlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChlbGVtZW50T2Zmc2V0VG9wIDwgKHRoaXMudmlld3BvcnRIZWlnaHQgKyBvZmZzZXQpKSA/IHRydWUgOiBmYWxzZTtcbiAgICB9O1xuXG4gICAgSW1hZ2VyLnByb3RvdHlwZS5jaGVja0ltYWdlc05lZWRSZXBsYWNpbmcgPSBmdW5jdGlvbihpbWFnZXMpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIGlmICghdGhpcy5pc1Jlc2l6aW5nKSB7XG4gICAgICAgICAgICB0aGlzLmlzUmVzaXppbmcgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoUGl4ZWxSYXRpbygpO1xuXG4gICAgICAgICAgICBhcHBseUVhY2goaW1hZ2VzLCBmdW5jdGlvbihpbWFnZSkge1xuICAgICAgICAgICAgICAgIHNlbGYucmVwbGFjZUltYWdlc0Jhc2VkT25TY3JlZW5EaW1lbnNpb25zKGltYWdlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLmlzUmVzaXppbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMub25JbWFnZXNSZXBsYWNlZChpbWFnZXMpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIEltYWdlci5wcm90b3R5cGUucmVwbGFjZUltYWdlc0Jhc2VkT25TY3JlZW5EaW1lbnNpb25zID0gZnVuY3Rpb24oaW1hZ2UpIHtcbiAgICAgICAgdmFyIGNvbXB1dGVkV2lkdGgsIHNyYywgbmF0dXJhbFdpZHRoO1xuXG4gICAgICAgIG5hdHVyYWxXaWR0aCA9IGdldE5hdHVyYWxXaWR0aChpbWFnZSk7XG4gICAgICAgIGNvbXB1dGVkV2lkdGggPSB0eXBlb2YgdGhpcy5hdmFpbGFibGVXaWR0aHMgPT09ICdmdW5jdGlvbicgPyB0aGlzLmF2YWlsYWJsZVdpZHRocyhpbWFnZSkgOiB0aGlzLmRldGVybWluZUFwcHJvcHJpYXRlUmVzb2x1dGlvbihpbWFnZSk7XG5cbiAgICAgICAgaW1hZ2Uud2lkdGggPSBjb21wdXRlZFdpZHRoO1xuXG4gICAgICAgIGlmIChpbWFnZS5zcmMgIT09IHRoaXMuZ2lmLnNyYyAmJiBjb21wdXRlZFdpZHRoIDw9IG5hdHVyYWxXaWR0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNFeHRlbnNpb25BbGxvd2VkKGltYWdlKSkge1xuICAgICAgICAgICAgc3JjID0gdGhpcy5jaGFuZ2VJbWFnZVNyY1RvVXNlTmV3SW1hZ2VEaW1lbnNpb25zKHRoaXMuYnVpbGRVcmxTdHJ1Y3R1cmUoaW1hZ2UuZ2V0QXR0cmlidXRlKCdkYXRhLXNyYycpLCBpbWFnZSksIGNvbXB1dGVkV2lkdGgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3JjID0gdGhpcy5yZW1vdmVNb2RpZmllcnNmcm9tSW1hZ2VTcmMoaW1hZ2UuZ2V0QXR0cmlidXRlKCdkYXRhLXNyYycpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGltYWdlLnNyYyA9IHNyYztcbiAgICB9O1xuXG4gICAgSW1hZ2VyLnByb3RvdHlwZS5yZW1vdmVNb2RpZmllcnNmcm9tSW1hZ2VTcmMgPSBmdW5jdGlvbihzcmMpIHtcbiAgICAgICAgdmFyIHJlZ0V4cCA9IG5ldyBSZWdFeHAoXCJcXFxcL3t3aWR0aH1cXFxcL3twaXhlbF9yYXRpb31cIiwgXCJnXCIpO1xuICAgICAgICByZXR1cm4gc3JjLnJlcGxhY2UocmVnRXhwLCAnJyk7XG4gICAgfTtcblxuICAgIEltYWdlci5wcm90b3R5cGUuaXNFeHRlbnNpb25BbGxvd2VkID0gZnVuY3Rpb24oaW1hZ2UpIHtcbiAgICAgICAgdmFyIGltYWdlRXh0ZW5zaW9uID0gdGhpcy5nZXRJbWFnZUV4dGVuc2lvbihpbWFnZSk7XG4gICAgICAgIHJldHVybiBpbWFnZUV4dGVuc2lvbiA/IHRoaXMuYWxsb3dlZEV4dGVuc2lvbnMuaW5kZXhPZihpbWFnZUV4dGVuc2lvbi50b0xvd2VyQ2FzZSgpKSA+IC0xIDogZmFsc2U7XG4gICAgfTtcblxuICAgIEltYWdlci5wcm90b3R5cGUuZ2V0SW1hZ2VFeHRlbnNpb24gPSBmdW5jdGlvbihpbWFnZSkge1xuICAgICAgICB2YXIgcmVnRXhwID0gbmV3IFJlZ0V4cChcIlxcXFwvLipcXFxcLiguKilcXFxcL3t3aWR0aH1cXFxcL3twaXhlbF9yYXRpb30/XCIsIFwiZ2lcIik7XG4gICAgICAgIHZhciBtYXRjaCA9IHJlZ0V4cC5leGVjKGltYWdlLmdldEF0dHJpYnV0ZSgnZGF0YS1zcmMnKSk7XG4gICAgICAgIHJldHVybiBtYXRjaCA/IG1hdGNoWzFdIDogXCJcIjtcbiAgICB9O1xuXG4gICAgSW1hZ2VyLnByb3RvdHlwZS5kZXRlcm1pbmVBcHByb3ByaWF0ZVJlc29sdXRpb24gPSBmdW5jdGlvbihpbWFnZSkge1xuICAgICAgICByZXR1cm4gSW1hZ2VyLmdldENsb3Nlc3RWYWx1ZShpbWFnZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtd2lkdGgnKSB8fCBpbWFnZS5wYXJlbnROb2RlLmNsaWVudFdpZHRoLCB0aGlzLmF2YWlsYWJsZVdpZHRocyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIGRldmljZSBwaXhlbCByYXRpbyB2YWx1ZSB1c2VkIGJ5IEltYWdlclxuICAgICAqXG4gICAgICogSXQgaXMgcGVyZm9ybWVkIGJlZm9yZSBlYWNoIHJlcGxhY2VtZW50IGxvb3AsIGluIGNhc2UgYSB1c2VyIHpvb21lZCBpbi9vdXRcbiAgICAgKiBhbmQgdGh1cyB1cGRhdGVkIHRoZSBgd2luZG93LmRldmljZVBpeGVsUmF0aW9gIHZhbHVlLlxuICAgICAqXG4gICAgICogQGFwaVxuICAgICAqIEBzaW5jZSAxLjAuMVxuICAgICAqL1xuICAgIEltYWdlci5wcm90b3R5cGUucmVmcmVzaFBpeGVsUmF0aW8gPSBmdW5jdGlvbiByZWZyZXNoUGl4ZWxSYXRpbygpIHtcbiAgICAgICAgdGhpcy5kZXZpY2VQaXhlbFJhdGlvID0gSW1hZ2VyLmdldENsb3Nlc3RWYWx1ZShJbWFnZXIuZ2V0UGl4ZWxSYXRpbygpLCB0aGlzLmF2YWlsYWJsZVBpeGVsUmF0aW9zKTtcbiAgICB9O1xuXG4gICAgSW1hZ2VyLnByb3RvdHlwZS5jaGFuZ2VJbWFnZVNyY1RvVXNlTmV3SW1hZ2VEaW1lbnNpb25zID0gZnVuY3Rpb24oc3JjLCBzZWxlY3RlZFdpZHRoKSB7XG4gICAgICAgIHJldHVybiBzcmNcbiAgICAgICAgICAgIC5yZXBsYWNlKC97d2lkdGh9L2csIEltYWdlci50cmFuc2Zvcm1zLndpZHRoKHNlbGVjdGVkV2lkdGgsIHRoaXMud2lkdGhzTWFwKSlcbiAgICAgICAgICAgIC5yZXBsYWNlKC97cGl4ZWxfcmF0aW99L2csIEltYWdlci50cmFuc2Zvcm1zLnBpeGVsUmF0aW8odGhpcy5kZXZpY2VQaXhlbFJhdGlvKSk7XG4gICAgfTtcblxuICAgIEltYWdlci5wcm90b3R5cGUuYnVpbGRVcmxTdHJ1Y3R1cmUgPSBmdW5jdGlvbihzcmMsIGltYWdlKSB7XG4gICAgICAgIHZhciBzcXVhcmVTZWxlY3RvciA9IHRoaXMuaXNJbWFnZUNvbnRhaW5lclNxdWFyZShpbWFnZSkgPyAnLicgKyB0aGlzLnNxdWFyZVNlbGVjdG9yIDogJyc7XG5cbiAgICAgICAgdmFyIHJlZ0V4cCA9IG5ldyBSZWdFeHAoXCJcXFxcLihcIiArIHRoaXMuYWxsb3dlZEV4dGVuc2lvbnMuam9pbihcInxcIikgICsgXCIpXFxcXC8oe3dpZHRofSlcXFxcLyh7cGl4ZWxfcmF0aW99KT9cIiwgXCJnaVwiKTtcblxuICAgICAgICByZXR1cm4gc3JjLnJlcGxhY2UocmVnRXhwLCAnLicgKyB0aGlzLmFkYXB0U2VsZWN0b3IgKyAnLiQyLiQzJyArIHNxdWFyZVNlbGVjdG9yICsgJy4kMScpO1xuICAgIH07XG5cbiAgICBJbWFnZXIucHJvdG90eXBlLmlzSW1hZ2VDb250YWluZXJTcXVhcmUgPSBmdW5jdGlvbihpbWFnZSkge1xuICAgICAgICByZXR1cm4gKGltYWdlLnBhcmVudE5vZGUuY2xpZW50V2lkdGggLyBpbWFnZS5wYXJlbnROb2RlLmNsaWVudEhlaWdodCkgPD0gdGhpcy5kZWx0YVNxdWFyZVxuICAgIH07XG5cbiAgICBJbWFnZXIuZ2V0UGl4ZWxSYXRpbyA9IGZ1bmN0aW9uIGdldFBpeGVsUmF0aW8oY29udGV4dCkge1xuICAgICAgICByZXR1cm4gKGNvbnRleHQgfHwgd2luZG93KVsnZGV2aWNlUGl4ZWxSYXRpbyddIHx8IDE7XG4gICAgfTtcblxuICAgIEltYWdlci5jcmVhdGVXaWR0aHNNYXAgPSBmdW5jdGlvbiBjcmVhdGVXaWR0aHNNYXAod2lkdGhzLCBpbnRlcnBvbGF0b3IpIHtcbiAgICAgICAgdmFyIG1hcCA9IHt9LFxuICAgICAgICAgICAgaSA9IHdpZHRocy5sZW5ndGg7XG5cbiAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgbWFwW3dpZHRoc1tpXV0gPSBpbnRlcnBvbGF0b3Iod2lkdGhzW2ldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtYXA7XG4gICAgfTtcblxuICAgIEltYWdlci50cmFuc2Zvcm1zID0ge1xuICAgICAgICBwaXhlbFJhdGlvOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICB3aWR0aDogZnVuY3Rpb24od2lkdGgsIG1hcCkge1xuICAgICAgICAgICAgcmV0dXJuIG1hcFt3aWR0aF0gfHwgd2lkdGg7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgY2xvc2VzdCB1cHBlciB2YWx1ZS5cbiAgICAgKlxuICAgICAqIGBgYGpzXG4gICAgICogdmFyIGNhbmRpZGF0ZXMgPSBbMSwgMS41LCAyXTtcbiAgICAgKlxuICAgICAqIEltYWdlci5nZXRDbG9zZXN0VmFsdWUoMC44LCBjYW5kaWRhdGVzKTsgLy8gLT4gMVxuICAgICAqIEltYWdlci5nZXRDbG9zZXN0VmFsdWUoMSwgY2FuZGlkYXRlcyk7IC8vIC0+IDFcbiAgICAgKiBJbWFnZXIuZ2V0Q2xvc2VzdFZhbHVlKDEuMywgY2FuZGlkYXRlcyk7IC8vIC0+IDEuNVxuICAgICAqIEltYWdlci5nZXRDbG9zZXN0VmFsdWUoMywgY2FuZGlkYXRlcyk7IC8vIC0+IDJcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIEBhcGlcbiAgICAgKiBAc2luY2UgMS4wLjFcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gYmFzZVZhbHVlXG4gICAgICogQHBhcmFtIHtBcnJheS48TnVtYmVyPn0gY2FuZGlkYXRlc1xuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAgICovXG4gICAgSW1hZ2VyLmdldENsb3Nlc3RWYWx1ZSA9IGZ1bmN0aW9uIGdldENsb3Nlc3RWYWx1ZShiYXNlVmFsdWUsIGNhbmRpZGF0ZXMpIHtcbiAgICAgICAgdmFyIGkgPSBjYW5kaWRhdGVzLmxlbmd0aCxcbiAgICAgICAgICAgIHNlbGVjdGVkV2lkdGggPSBjYW5kaWRhdGVzW2kgLSAxXTtcblxuICAgICAgICBiYXNlVmFsdWUgPSBwYXJzZUZsb2F0KGJhc2VWYWx1ZSwgMTApO1xuXG4gICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgIGlmIChiYXNlVmFsdWUgPD0gY2FuZGlkYXRlc1tpXSkge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkV2lkdGggPSBjYW5kaWRhdGVzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlbGVjdGVkV2lkdGg7XG4gICAgfTtcblxuICAgIEltYWdlci5wcm90b3R5cGUucmVnaXN0ZXJSZXNpemVFdmVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgYWRkRXZlbnQod2luZG93LCAncmVzaXplJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZWxmLmNoZWNrSW1hZ2VzTmVlZFJlcGxhY2luZyhzZWxmLmRpdnMpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgSW1hZ2VyLnByb3RvdHlwZS5yZWdpc3RlclNjcm9sbEV2ZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICB0aGlzLnNjcm9sbGVkID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5pbnRlcnZhbCA9IHdpbmRvdy5zZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNlbGYuc2Nyb2xsQ2hlY2soKTtcbiAgICAgICAgfSwgc2VsZi5zY3JvbGxEZWxheSk7XG5cbiAgICAgICAgYWRkRXZlbnQod2luZG93LCAnc2Nyb2xsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZWxmLnNjcm9sbGVkID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIEltYWdlci5nZXRQYWdlT2Zmc2V0R2VuZXJhdG9yID0gZnVuY3Rpb24gZ2V0UGFnZVZlcnRpY2FsT2Zmc2V0KHRlc3RDYXNlKSB7XG4gICAgICAgIGlmICh0ZXN0Q2FzZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cucGFnZVlPZmZzZXQ7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBUaGlzIGZvcm0gaXMgdXNlZCBiZWNhdXNlIGl0IHNlZW1zIGltcG9zc2libGUgdG8gc3R1YiBgd2luZG93LnBhZ2VZT2Zmc2V0YFxuICAgIEltYWdlci5nZXRQYWdlT2Zmc2V0ID0gSW1hZ2VyLmdldFBhZ2VPZmZzZXRHZW5lcmF0b3IoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHdpbmRvdywgJ3BhZ2VZT2Zmc2V0JykpO1xuXG4gICAgLy8gRXhwb3J0aW5nIGZvciB0ZXN0aW5nIHB1cnBvc2VcbiAgICBJbWFnZXIuYXBwbHlFYWNoID0gYXBwbHlFYWNoO1xuXG4gICAgLyogZ2xvYmFsIG1vZHVsZSwgZXhwb3J0czogdHJ1ZSwgZGVmaW5lICovXG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgLy8gQ29tbW9uSlMsIGp1c3QgZXhwb3J0XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IEltYWdlcjtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICAvLyBBTUQgc3VwcG9ydFxuICAgICAgICBkZWZpbmUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gSW1hZ2VyO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIC8vIElmIG5vIEFNRCBhbmQgd2UgYXJlIGluIHRoZSBicm93c2VyLCBhdHRhY2ggdG8gd2luZG93XG4gICAgICAgIHdpbmRvdy5JbWFnZXIgPSBJbWFnZXI7XG4gICAgfVxuICAgIC8qIGdsb2JhbCAtbW9kdWxlLCAtZXhwb3J0cywgLWRlZmluZSAqL1xuXG59KHdpbmRvdywgZG9jdW1lbnQpKTsiLCIvKipcbiAqIGlzTW9iaWxlLmpzIHYwLjMuOVxuICpcbiAqIEEgc2ltcGxlIGxpYnJhcnkgdG8gZGV0ZWN0IEFwcGxlIHBob25lcyBhbmQgdGFibGV0cyxcbiAqIEFuZHJvaWQgcGhvbmVzIGFuZCB0YWJsZXRzLCBvdGhlciBtb2JpbGUgZGV2aWNlcyAobGlrZSBibGFja2JlcnJ5LCBtaW5pLW9wZXJhIGFuZCB3aW5kb3dzIHBob25lKSxcbiAqIGFuZCBhbnkga2luZCBvZiBzZXZlbiBpbmNoIGRldmljZSwgdmlhIHVzZXIgYWdlbnQgc25pZmZpbmcuXG4gKlxuICogQGF1dGhvcjogS2FpIE1hbGxlYSAoa21hbGxlYUBnbWFpbC5jb20pXG4gKlxuICogQGxpY2Vuc2U6IGh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL3B1YmxpY2RvbWFpbi96ZXJvLzEuMC9cbiAqL1xuKGZ1bmN0aW9uIChnbG9iYWwpIHtcblxuICAgIHZhciBhcHBsZV9waG9uZSAgICAgICAgID0gL2lQaG9uZS9pLFxuICAgICAgICBhcHBsZV9pcG9kICAgICAgICAgID0gL2lQb2QvaSxcbiAgICAgICAgYXBwbGVfdGFibGV0ICAgICAgICA9IC9pUGFkL2ksXG4gICAgICAgIGFuZHJvaWRfcGhvbmUgICAgICAgPSAvKD89LipcXGJBbmRyb2lkXFxiKSg/PS4qXFxiTW9iaWxlXFxiKS9pLCAvLyBNYXRjaCAnQW5kcm9pZCcgQU5EICdNb2JpbGUnXG4gICAgICAgIGFuZHJvaWRfdGFibGV0ICAgICAgPSAvQW5kcm9pZC9pLFxuICAgICAgICBhbWF6b25fcGhvbmUgICAgICAgID0gLyg/PS4qXFxiQW5kcm9pZFxcYikoPz0uKlxcYlNENDkzMFVSXFxiKS9pLFxuICAgICAgICBhbWF6b25fdGFibGV0ICAgICAgID0gLyg/PS4qXFxiQW5kcm9pZFxcYikoPz0uKlxcYig/OktGT1R8S0ZUVHxLRkpXSXxLRkpXQXxLRlNPV0l8S0ZUSFdJfEtGVEhXQXxLRkFQV0l8S0ZBUFdBfEtGQVJXSXxLRkFTV0l8S0ZTQVdJfEtGU0FXQSlcXGIpL2ksXG4gICAgICAgIHdpbmRvd3NfcGhvbmUgICAgICAgPSAvSUVNb2JpbGUvaSxcbiAgICAgICAgd2luZG93c190YWJsZXQgICAgICA9IC8oPz0uKlxcYldpbmRvd3NcXGIpKD89LipcXGJBUk1cXGIpL2ksIC8vIE1hdGNoICdXaW5kb3dzJyBBTkQgJ0FSTSdcbiAgICAgICAgb3RoZXJfYmxhY2tiZXJyeSAgICA9IC9CbGFja0JlcnJ5L2ksXG4gICAgICAgIG90aGVyX2JsYWNrYmVycnlfMTAgPSAvQkIxMC9pLFxuICAgICAgICBvdGhlcl9vcGVyYSAgICAgICAgID0gL09wZXJhIE1pbmkvaSxcbiAgICAgICAgb3RoZXJfY2hyb21lICAgICAgICA9IC8oQ3JpT1N8Q2hyb21lKSg/PS4qXFxiTW9iaWxlXFxiKS9pLFxuICAgICAgICBvdGhlcl9maXJlZm94ICAgICAgID0gLyg/PS4qXFxiRmlyZWZveFxcYikoPz0uKlxcYk1vYmlsZVxcYikvaSwgLy8gTWF0Y2ggJ0ZpcmVmb3gnIEFORCAnTW9iaWxlJ1xuICAgICAgICBzZXZlbl9pbmNoID0gbmV3IFJlZ0V4cChcbiAgICAgICAgICAgICcoPzonICsgICAgICAgICAvLyBOb24tY2FwdHVyaW5nIGdyb3VwXG5cbiAgICAgICAgICAgICdOZXh1cyA3JyArICAgICAvLyBOZXh1cyA3XG5cbiAgICAgICAgICAgICd8JyArICAgICAgICAgICAvLyBPUlxuXG4gICAgICAgICAgICAnQk5UVjI1MCcgKyAgICAgLy8gQiZOIE5vb2sgVGFibGV0IDcgaW5jaFxuXG4gICAgICAgICAgICAnfCcgKyAgICAgICAgICAgLy8gT1JcblxuICAgICAgICAgICAgJ0tpbmRsZSBGaXJlJyArIC8vIEtpbmRsZSBGaXJlXG5cbiAgICAgICAgICAgICd8JyArICAgICAgICAgICAvLyBPUlxuXG4gICAgICAgICAgICAnU2lsaycgKyAgICAgICAgLy8gS2luZGxlIEZpcmUsIFNpbGsgQWNjZWxlcmF0ZWRcblxuICAgICAgICAgICAgJ3wnICsgICAgICAgICAgIC8vIE9SXG5cbiAgICAgICAgICAgICdHVC1QMTAwMCcgKyAgICAvLyBHYWxheHkgVGFiIDcgaW5jaFxuXG4gICAgICAgICAgICAnKScsICAgICAgICAgICAgLy8gRW5kIG5vbi1jYXB0dXJpbmcgZ3JvdXBcblxuICAgICAgICAgICAgJ2knKTsgICAgICAgICAgIC8vIENhc2UtaW5zZW5zaXRpdmUgbWF0Y2hpbmdcblxuICAgIHZhciBtYXRjaCA9IGZ1bmN0aW9uKHJlZ2V4LCB1c2VyQWdlbnQpIHtcbiAgICAgICAgcmV0dXJuIHJlZ2V4LnRlc3QodXNlckFnZW50KTtcbiAgICB9O1xuXG4gICAgdmFyIElzTW9iaWxlQ2xhc3MgPSBmdW5jdGlvbih1c2VyQWdlbnQpIHtcbiAgICAgICAgdmFyIHVhID0gdXNlckFnZW50IHx8IG5hdmlnYXRvci51c2VyQWdlbnQ7XG4gICAgICAgIC8vIEZhY2Vib29rIG1vYmlsZSBhcHAncyBpbnRlZ3JhdGVkIGJyb3dzZXIgYWRkcyBhIGJ1bmNoIG9mIHN0cmluZ3MgdGhhdFxuICAgICAgICAvLyBtYXRjaCBldmVyeXRoaW5nLiBTdHJpcCBpdCBvdXQgaWYgaXQgZXhpc3RzLlxuICAgICAgICB2YXIgdG1wID0gdWEuc3BsaXQoJ1tGQkFOJyk7XG4gICAgICAgIGlmICh0eXBlb2YgdG1wWzFdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdWEgPSB0bXBbMF07XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFwcGxlID0ge1xuICAgICAgICAgICAgcGhvbmU6ICBtYXRjaChhcHBsZV9waG9uZSwgdWEpLFxuICAgICAgICAgICAgaXBvZDogICBtYXRjaChhcHBsZV9pcG9kLCB1YSksXG4gICAgICAgICAgICB0YWJsZXQ6ICFtYXRjaChhcHBsZV9waG9uZSwgdWEpICYmIG1hdGNoKGFwcGxlX3RhYmxldCwgdWEpLFxuICAgICAgICAgICAgZGV2aWNlOiBtYXRjaChhcHBsZV9waG9uZSwgdWEpIHx8IG1hdGNoKGFwcGxlX2lwb2QsIHVhKSB8fCBtYXRjaChhcHBsZV90YWJsZXQsIHVhKVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFtYXpvbiA9IHtcbiAgICAgICAgICAgIHBob25lOiAgbWF0Y2goYW1hem9uX3Bob25lLCB1YSksXG4gICAgICAgICAgICB0YWJsZXQ6ICFtYXRjaChhbWF6b25fcGhvbmUsIHVhKSAmJiBtYXRjaChhbWF6b25fdGFibGV0LCB1YSksXG4gICAgICAgICAgICBkZXZpY2U6IG1hdGNoKGFtYXpvbl9waG9uZSwgdWEpIHx8IG1hdGNoKGFtYXpvbl90YWJsZXQsIHVhKVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFuZHJvaWQgPSB7XG4gICAgICAgICAgICBwaG9uZTogIG1hdGNoKGFtYXpvbl9waG9uZSwgdWEpIHx8IG1hdGNoKGFuZHJvaWRfcGhvbmUsIHVhKSxcbiAgICAgICAgICAgIHRhYmxldDogIW1hdGNoKGFtYXpvbl9waG9uZSwgdWEpICYmICFtYXRjaChhbmRyb2lkX3Bob25lLCB1YSkgJiYgKG1hdGNoKGFtYXpvbl90YWJsZXQsIHVhKSB8fCBtYXRjaChhbmRyb2lkX3RhYmxldCwgdWEpKSxcbiAgICAgICAgICAgIGRldmljZTogbWF0Y2goYW1hem9uX3Bob25lLCB1YSkgfHwgbWF0Y2goYW1hem9uX3RhYmxldCwgdWEpIHx8IG1hdGNoKGFuZHJvaWRfcGhvbmUsIHVhKSB8fCBtYXRjaChhbmRyb2lkX3RhYmxldCwgdWEpXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMud2luZG93cyA9IHtcbiAgICAgICAgICAgIHBob25lOiAgbWF0Y2god2luZG93c19waG9uZSwgdWEpLFxuICAgICAgICAgICAgdGFibGV0OiBtYXRjaCh3aW5kb3dzX3RhYmxldCwgdWEpLFxuICAgICAgICAgICAgZGV2aWNlOiBtYXRjaCh3aW5kb3dzX3Bob25lLCB1YSkgfHwgbWF0Y2god2luZG93c190YWJsZXQsIHVhKVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLm90aGVyID0ge1xuICAgICAgICAgICAgYmxhY2tiZXJyeTogICBtYXRjaChvdGhlcl9ibGFja2JlcnJ5LCB1YSksXG4gICAgICAgICAgICBibGFja2JlcnJ5MTA6IG1hdGNoKG90aGVyX2JsYWNrYmVycnlfMTAsIHVhKSxcbiAgICAgICAgICAgIG9wZXJhOiAgICAgICAgbWF0Y2gob3RoZXJfb3BlcmEsIHVhKSxcbiAgICAgICAgICAgIGZpcmVmb3g6ICAgICAgbWF0Y2gob3RoZXJfZmlyZWZveCwgdWEpLFxuICAgICAgICAgICAgY2hyb21lOiAgICAgICBtYXRjaChvdGhlcl9jaHJvbWUsIHVhKSxcbiAgICAgICAgICAgIGRldmljZTogICAgICAgbWF0Y2gob3RoZXJfYmxhY2tiZXJyeSwgdWEpIHx8IG1hdGNoKG90aGVyX2JsYWNrYmVycnlfMTAsIHVhKSB8fCBtYXRjaChvdGhlcl9vcGVyYSwgdWEpIHx8IG1hdGNoKG90aGVyX2ZpcmVmb3gsIHVhKSB8fCBtYXRjaChvdGhlcl9jaHJvbWUsIHVhKVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNldmVuX2luY2ggPSBtYXRjaChzZXZlbl9pbmNoLCB1YSk7XG4gICAgICAgIHRoaXMuYW55ID0gdGhpcy5hcHBsZS5kZXZpY2UgfHwgdGhpcy5hbmRyb2lkLmRldmljZSB8fCB0aGlzLndpbmRvd3MuZGV2aWNlIHx8IHRoaXMub3RoZXIuZGV2aWNlIHx8IHRoaXMuc2V2ZW5faW5jaDtcbiAgICAgICAgLy8gZXhjbHVkZXMgJ290aGVyJyBkZXZpY2VzIGFuZCBpcG9kcywgdGFyZ2V0aW5nIHRvdWNoc2NyZWVuIHBob25lc1xuICAgICAgICB0aGlzLnBob25lID0gdGhpcy5hcHBsZS5waG9uZSB8fCB0aGlzLmFuZHJvaWQucGhvbmUgfHwgdGhpcy53aW5kb3dzLnBob25lO1xuICAgICAgICAvLyBleGNsdWRlcyA3IGluY2ggZGV2aWNlcywgY2xhc3NpZnlpbmcgYXMgcGhvbmUgb3IgdGFibGV0IGlzIGxlZnQgdG8gdGhlIHVzZXJcbiAgICAgICAgdGhpcy50YWJsZXQgPSB0aGlzLmFwcGxlLnRhYmxldCB8fCB0aGlzLmFuZHJvaWQudGFibGV0IHx8IHRoaXMud2luZG93cy50YWJsZXQ7XG5cbiAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgaW5zdGFudGlhdGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIElNID0gbmV3IElzTW9iaWxlQ2xhc3MoKTtcbiAgICAgICAgSU0uQ2xhc3MgPSBJc01vYmlsZUNsYXNzO1xuICAgICAgICByZXR1cm4gSU07XG4gICAgfTtcblxuICAgIGlmICh0eXBlb2YgbW9kdWxlICE9ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzICYmIHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIC8vbm9kZVxuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IElzTW9iaWxlQ2xhc3M7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlICE9ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIC8vYnJvd3NlcmlmeVxuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGluc3RhbnRpYXRlKCk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgLy9BTURcbiAgICAgICAgZGVmaW5lKCdpc01vYmlsZScsIFtdLCBnbG9iYWwuaXNNb2JpbGUgPSBpbnN0YW50aWF0ZSgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBnbG9iYWwuaXNNb2JpbGUgPSBpbnN0YW50aWF0ZSgpO1xuICAgIH1cblxufSkodGhpcyk7XG4iLCIvKlxyXG4qIGxvZ2xldmVsIC0gaHR0cHM6Ly9naXRodWIuY29tL3BpbXRlcnJ5L2xvZ2xldmVsXHJcbipcclxuKiBDb3B5cmlnaHQgKGMpIDIwMTMgVGltIFBlcnJ5XHJcbiogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxyXG4qL1xyXG4oZnVuY3Rpb24gKHJvb3QsIGRlZmluaXRpb24pIHtcclxuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyAmJiB0eXBlb2YgcmVxdWlyZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZGVmaW5pdGlvbigpO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUuYW1kID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIGRlZmluZShkZWZpbml0aW9uKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcm9vdC5sb2cgPSBkZWZpbml0aW9uKCk7XHJcbiAgICB9XHJcbn0odGhpcywgZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHNlbGYgPSB7fTtcclxuICAgIHZhciBub29wID0gZnVuY3Rpb24oKSB7fTtcclxuICAgIHZhciB1bmRlZmluZWRUeXBlID0gXCJ1bmRlZmluZWRcIjtcclxuXHJcbiAgICBmdW5jdGlvbiByZWFsTWV0aG9kKG1ldGhvZE5hbWUpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUgPT09IHVuZGVmaW5lZFR5cGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBXZSBjYW4ndCBidWlsZCBhIHJlYWwgbWV0aG9kIHdpdGhvdXQgYSBjb25zb2xlIHRvIGxvZyB0b1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY29uc29sZVttZXRob2ROYW1lXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBiaW5kTWV0aG9kKGNvbnNvbGUsIG1ldGhvZE5hbWUpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY29uc29sZS5sb2cgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYmluZE1ldGhvZChjb25zb2xlLCAnbG9nJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5vb3A7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGJpbmRNZXRob2Qob2JqLCBtZXRob2ROYW1lKSB7XHJcbiAgICAgICAgdmFyIG1ldGhvZCA9IG9ialttZXRob2ROYW1lXTtcclxuICAgICAgICBpZiAodHlwZW9mIG1ldGhvZC5iaW5kID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtZXRob2QuYmluZChvYmopO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQuY2FsbChtZXRob2QsIG9iaik7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIC8vIE1pc3NpbmcgYmluZCBzaGltIG9yIElFOCArIE1vZGVybml6ciwgZmFsbGJhY2sgdG8gd3JhcHBpbmdcclxuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmFwcGx5KG1ldGhvZCwgW29iaiwgYXJndW1lbnRzXSk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGVuYWJsZUxvZ2dpbmdXaGVuQ29uc29sZUFycml2ZXMobWV0aG9kTmFtZSwgbGV2ZWwpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09IHVuZGVmaW5lZFR5cGUpIHtcclxuICAgICAgICAgICAgICAgIHJlcGxhY2VMb2dnaW5nTWV0aG9kcyhsZXZlbCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmW21ldGhvZE5hbWVdLmFwcGx5KHNlbGYsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBsb2dNZXRob2RzID0gW1xyXG4gICAgICAgIFwidHJhY2VcIixcclxuICAgICAgICBcImRlYnVnXCIsXHJcbiAgICAgICAgXCJpbmZvXCIsXHJcbiAgICAgICAgXCJ3YXJuXCIsXHJcbiAgICAgICAgXCJlcnJvclwiXHJcbiAgICBdO1xyXG5cclxuICAgIGZ1bmN0aW9uIHJlcGxhY2VMb2dnaW5nTWV0aG9kcyhsZXZlbCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbG9nTWV0aG9kcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgbWV0aG9kTmFtZSA9IGxvZ01ldGhvZHNbaV07XHJcbiAgICAgICAgICAgIHNlbGZbbWV0aG9kTmFtZV0gPSAoaSA8IGxldmVsKSA/IG5vb3AgOiBzZWxmLm1ldGhvZEZhY3RvcnkobWV0aG9kTmFtZSwgbGV2ZWwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwZXJzaXN0TGV2ZWxJZlBvc3NpYmxlKGxldmVsTnVtKSB7XHJcbiAgICAgICAgdmFyIGxldmVsTmFtZSA9IChsb2dNZXRob2RzW2xldmVsTnVtXSB8fCAnc2lsZW50JykudG9VcHBlckNhc2UoKTtcclxuXHJcbiAgICAgICAgLy8gVXNlIGxvY2FsU3RvcmFnZSBpZiBhdmFpbGFibGVcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlWydsb2dsZXZlbCddID0gbGV2ZWxOYW1lO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfSBjYXRjaCAoaWdub3JlKSB7fVxyXG5cclxuICAgICAgICAvLyBVc2Ugc2Vzc2lvbiBjb29raWUgYXMgZmFsbGJhY2tcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB3aW5kb3cuZG9jdW1lbnQuY29va2llID0gXCJsb2dsZXZlbD1cIiArIGxldmVsTmFtZSArIFwiO1wiO1xyXG4gICAgICAgIH0gY2F0Y2ggKGlnbm9yZSkge31cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBsb2FkUGVyc2lzdGVkTGV2ZWwoKSB7XHJcbiAgICAgICAgdmFyIHN0b3JlZExldmVsO1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBzdG9yZWRMZXZlbCA9IHdpbmRvdy5sb2NhbFN0b3JhZ2VbJ2xvZ2xldmVsJ107XHJcbiAgICAgICAgfSBjYXRjaCAoaWdub3JlKSB7fVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHN0b3JlZExldmVsID09PSB1bmRlZmluZWRUeXBlKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBzdG9yZWRMZXZlbCA9IC9sb2dsZXZlbD0oW147XSspLy5leGVjKHdpbmRvdy5kb2N1bWVudC5jb29raWUpWzFdO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChpZ25vcmUpIHt9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChzZWxmLmxldmVsc1tzdG9yZWRMZXZlbF0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBzdG9yZWRMZXZlbCA9IFwiV0FSTlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZi5zZXRMZXZlbChzZWxmLmxldmVsc1tzdG9yZWRMZXZlbF0sIGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgICpcclxuICAgICAqIFB1YmxpYyBBUElcclxuICAgICAqXHJcbiAgICAgKi9cclxuXHJcbiAgICBzZWxmLmxldmVscyA9IHsgXCJUUkFDRVwiOiAwLCBcIkRFQlVHXCI6IDEsIFwiSU5GT1wiOiAyLCBcIldBUk5cIjogMyxcclxuICAgICAgICBcIkVSUk9SXCI6IDQsIFwiU0lMRU5UXCI6IDV9O1xyXG5cclxuICAgIHNlbGYubWV0aG9kRmFjdG9yeSA9IGZ1bmN0aW9uIChtZXRob2ROYW1lLCBsZXZlbCkge1xyXG4gICAgICAgIHJldHVybiByZWFsTWV0aG9kKG1ldGhvZE5hbWUpIHx8XHJcbiAgICAgICAgICAgICAgIGVuYWJsZUxvZ2dpbmdXaGVuQ29uc29sZUFycml2ZXMobWV0aG9kTmFtZSwgbGV2ZWwpO1xyXG4gICAgfTtcclxuXHJcbiAgICBzZWxmLnNldExldmVsID0gZnVuY3Rpb24gKGxldmVsLCBwZXJzaXN0KSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBsZXZlbCA9PT0gXCJzdHJpbmdcIiAmJiBzZWxmLmxldmVsc1tsZXZlbC50b1VwcGVyQ2FzZSgpXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGxldmVsID0gc2VsZi5sZXZlbHNbbGV2ZWwudG9VcHBlckNhc2UoKV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgbGV2ZWwgPT09IFwibnVtYmVyXCIgJiYgbGV2ZWwgPj0gMCAmJiBsZXZlbCA8PSBzZWxmLmxldmVscy5TSUxFTlQpIHtcclxuICAgICAgICAgICAgaWYgKHBlcnNpc3QgIT09IGZhbHNlKSB7ICAvLyBkZWZhdWx0cyB0byB0cnVlXHJcbiAgICAgICAgICAgICAgICBwZXJzaXN0TGV2ZWxJZlBvc3NpYmxlKGxldmVsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXBsYWNlTG9nZ2luZ01ldGhvZHMobGV2ZWwpO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUgPT09IHVuZGVmaW5lZFR5cGUgJiYgbGV2ZWwgPCBzZWxmLmxldmVscy5TSUxFTlQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIk5vIGNvbnNvbGUgYXZhaWxhYmxlIGZvciBsb2dnaW5nXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBcImxvZy5zZXRMZXZlbCgpIGNhbGxlZCB3aXRoIGludmFsaWQgbGV2ZWw6IFwiICsgbGV2ZWw7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBzZWxmLmVuYWJsZUFsbCA9IGZ1bmN0aW9uKHBlcnNpc3QpIHtcclxuICAgICAgICBzZWxmLnNldExldmVsKHNlbGYubGV2ZWxzLlRSQUNFLCBwZXJzaXN0KTtcclxuICAgIH07XHJcblxyXG4gICAgc2VsZi5kaXNhYmxlQWxsID0gZnVuY3Rpb24ocGVyc2lzdCkge1xyXG4gICAgICAgIHNlbGYuc2V0TGV2ZWwoc2VsZi5sZXZlbHMuU0lMRU5ULCBwZXJzaXN0KTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gR3JhYiB0aGUgY3VycmVudCBnbG9iYWwgbG9nIHZhcmlhYmxlIGluIGNhc2Ugb2Ygb3ZlcndyaXRlXHJcbiAgICB2YXIgX2xvZyA9ICh0eXBlb2Ygd2luZG93ICE9PSB1bmRlZmluZWRUeXBlKSA/IHdpbmRvdy5sb2cgOiB1bmRlZmluZWQ7XHJcbiAgICBzZWxmLm5vQ29uZmxpY3QgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gdW5kZWZpbmVkVHlwZSAmJlxyXG4gICAgICAgICAgICAgICB3aW5kb3cubG9nID09PSBzZWxmKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2cgPSBfbG9nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNlbGY7XHJcbiAgICB9O1xyXG5cclxuICAgIGxvYWRQZXJzaXN0ZWRMZXZlbCgpO1xyXG4gICAgcmV0dXJuIHNlbGY7XHJcbn0pKTtcclxuIiwiLyohIFJhdmVuLmpzIDEuMS4xOSAoYjUxYmM4OSkgfCBnaXRodWIuY29tL2dldHNlbnRyeS9yYXZlbi1qcyAqL1xuXG4vKlxuICogSW5jbHVkZXMgVHJhY2VLaXRcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9nZXRzZW50cnkvVHJhY2VLaXRcbiAqXG4gKiBDb3B5cmlnaHQgMjAxNSBNYXR0IFJvYmVub2x0IGFuZCBvdGhlciBjb250cmlidXRvcnNcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBCU0QgbGljZW5zZVxuICogaHR0cHM6Ly9naXRodWIuY29tL2dldHNlbnRyeS9yYXZlbi1qcy9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKlxuICovXG47KGZ1bmN0aW9uKHdpbmRvdywgdW5kZWZpbmVkKXtcbid1c2Ugc3RyaWN0JztcblxuLypcbiBUcmFjZUtpdCAtIENyb3NzIGJyb3dlciBzdGFjayB0cmFjZXMgLSBnaXRodWIuY29tL29jYy9UcmFjZUtpdFxuIE1JVCBsaWNlbnNlXG4qL1xuXG52YXIgVHJhY2VLaXQgPSB7XG4gICAgcmVtb3RlRmV0Y2hpbmc6IGZhbHNlLFxuICAgIGNvbGxlY3RXaW5kb3dFcnJvcnM6IHRydWUsXG4gICAgLy8gMyBsaW5lcyBiZWZvcmUsIHRoZSBvZmZlbmRpbmcgbGluZSwgMyBsaW5lcyBhZnRlclxuICAgIGxpbmVzT2ZDb250ZXh0OiA3XG59O1xuXG4vLyBnbG9iYWwgcmVmZXJlbmNlIHRvIHNsaWNlXG52YXIgX3NsaWNlID0gW10uc2xpY2U7XG52YXIgVU5LTk9XTl9GVU5DVElPTiA9ICc/JztcblxuXG4vKipcbiAqIFRyYWNlS2l0LndyYXA6IFdyYXAgYW55IGZ1bmN0aW9uIGluIGEgVHJhY2VLaXQgcmVwb3J0ZXJcbiAqIEV4YW1wbGU6IGZ1bmMgPSBUcmFjZUtpdC53cmFwKGZ1bmMpO1xuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgRnVuY3Rpb24gdG8gYmUgd3JhcHBlZFxuICogQHJldHVybiB7RnVuY3Rpb259IFRoZSB3cmFwcGVkIGZ1bmNcbiAqL1xuVHJhY2VLaXQud3JhcCA9IGZ1bmN0aW9uIHRyYWNlS2l0V3JhcHBlcihmdW5jKSB7XG4gICAgZnVuY3Rpb24gd3JhcHBlZCgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIFRyYWNlS2l0LnJlcG9ydChlKTtcbiAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHdyYXBwZWQ7XG59O1xuXG4vKipcbiAqIFRyYWNlS2l0LnJlcG9ydDogY3Jvc3MtYnJvd3NlciBwcm9jZXNzaW5nIG9mIHVuaGFuZGxlZCBleGNlcHRpb25zXG4gKlxuICogU3ludGF4OlxuICogICBUcmFjZUtpdC5yZXBvcnQuc3Vic2NyaWJlKGZ1bmN0aW9uKHN0YWNrSW5mbykgeyAuLi4gfSlcbiAqICAgVHJhY2VLaXQucmVwb3J0LnVuc3Vic2NyaWJlKGZ1bmN0aW9uKHN0YWNrSW5mbykgeyAuLi4gfSlcbiAqICAgVHJhY2VLaXQucmVwb3J0KGV4Y2VwdGlvbilcbiAqICAgdHJ5IHsgLi4uY29kZS4uLiB9IGNhdGNoKGV4KSB7IFRyYWNlS2l0LnJlcG9ydChleCk7IH1cbiAqXG4gKiBTdXBwb3J0czpcbiAqICAgLSBGaXJlZm94OiBmdWxsIHN0YWNrIHRyYWNlIHdpdGggbGluZSBudW1iZXJzLCBwbHVzIGNvbHVtbiBudW1iZXJcbiAqICAgICAgICAgICAgICBvbiB0b3AgZnJhbWU7IGNvbHVtbiBudW1iZXIgaXMgbm90IGd1YXJhbnRlZWRcbiAqICAgLSBPcGVyYTogICBmdWxsIHN0YWNrIHRyYWNlIHdpdGggbGluZSBhbmQgY29sdW1uIG51bWJlcnNcbiAqICAgLSBDaHJvbWU6ICBmdWxsIHN0YWNrIHRyYWNlIHdpdGggbGluZSBhbmQgY29sdW1uIG51bWJlcnNcbiAqICAgLSBTYWZhcmk6ICBsaW5lIGFuZCBjb2x1bW4gbnVtYmVyIGZvciB0aGUgdG9wIGZyYW1lIG9ubHk7IHNvbWUgZnJhbWVzXG4gKiAgICAgICAgICAgICAgbWF5IGJlIG1pc3NpbmcsIGFuZCBjb2x1bW4gbnVtYmVyIGlzIG5vdCBndWFyYW50ZWVkXG4gKiAgIC0gSUU6ICAgICAgbGluZSBhbmQgY29sdW1uIG51bWJlciBmb3IgdGhlIHRvcCBmcmFtZSBvbmx5OyBzb21lIGZyYW1lc1xuICogICAgICAgICAgICAgIG1heSBiZSBtaXNzaW5nLCBhbmQgY29sdW1uIG51bWJlciBpcyBub3QgZ3VhcmFudGVlZFxuICpcbiAqIEluIHRoZW9yeSwgVHJhY2VLaXQgc2hvdWxkIHdvcmsgb24gYWxsIG9mIHRoZSBmb2xsb3dpbmcgdmVyc2lvbnM6XG4gKiAgIC0gSUU1LjUrIChvbmx5IDguMCB0ZXN0ZWQpXG4gKiAgIC0gRmlyZWZveCAwLjkrIChvbmx5IDMuNSsgdGVzdGVkKVxuICogICAtIE9wZXJhIDcrIChvbmx5IDEwLjUwIHRlc3RlZDsgdmVyc2lvbnMgOSBhbmQgZWFybGllciBtYXkgcmVxdWlyZVxuICogICAgIEV4Y2VwdGlvbnMgSGF2ZSBTdGFja3RyYWNlIHRvIGJlIGVuYWJsZWQgaW4gb3BlcmE6Y29uZmlnKVxuICogICAtIFNhZmFyaSAzKyAob25seSA0KyB0ZXN0ZWQpXG4gKiAgIC0gQ2hyb21lIDErIChvbmx5IDUrIHRlc3RlZClcbiAqICAgLSBLb25xdWVyb3IgMy41KyAodW50ZXN0ZWQpXG4gKlxuICogUmVxdWlyZXMgVHJhY2VLaXQuY29tcHV0ZVN0YWNrVHJhY2UuXG4gKlxuICogVHJpZXMgdG8gY2F0Y2ggYWxsIHVuaGFuZGxlZCBleGNlcHRpb25zIGFuZCByZXBvcnQgdGhlbSB0byB0aGVcbiAqIHN1YnNjcmliZWQgaGFuZGxlcnMuIFBsZWFzZSBub3RlIHRoYXQgVHJhY2VLaXQucmVwb3J0IHdpbGwgcmV0aHJvdyB0aGVcbiAqIGV4Y2VwdGlvbi4gVGhpcyBpcyBSRVFVSVJFRCBpbiBvcmRlciB0byBnZXQgYSB1c2VmdWwgc3RhY2sgdHJhY2UgaW4gSUUuXG4gKiBJZiB0aGUgZXhjZXB0aW9uIGRvZXMgbm90IHJlYWNoIHRoZSB0b3Agb2YgdGhlIGJyb3dzZXIsIHlvdSB3aWxsIG9ubHlcbiAqIGdldCBhIHN0YWNrIHRyYWNlIGZyb20gdGhlIHBvaW50IHdoZXJlIFRyYWNlS2l0LnJlcG9ydCB3YXMgY2FsbGVkLlxuICpcbiAqIEhhbmRsZXJzIHJlY2VpdmUgYSBzdGFja0luZm8gb2JqZWN0IGFzIGRlc2NyaWJlZCBpbiB0aGVcbiAqIFRyYWNlS2l0LmNvbXB1dGVTdGFja1RyYWNlIGRvY3MuXG4gKi9cblRyYWNlS2l0LnJlcG9ydCA9IChmdW5jdGlvbiByZXBvcnRNb2R1bGVXcmFwcGVyKCkge1xuICAgIHZhciBoYW5kbGVycyA9IFtdLFxuICAgICAgICBsYXN0QXJncyA9IG51bGwsXG4gICAgICAgIGxhc3RFeGNlcHRpb24gPSBudWxsLFxuICAgICAgICBsYXN0RXhjZXB0aW9uU3RhY2sgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQWRkIGEgY3Jhc2ggaGFuZGxlci5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYW5kbGVyXG4gICAgICovXG4gICAgZnVuY3Rpb24gc3Vic2NyaWJlKGhhbmRsZXIpIHtcbiAgICAgICAgaW5zdGFsbEdsb2JhbEhhbmRsZXIoKTtcbiAgICAgICAgaGFuZGxlcnMucHVzaChoYW5kbGVyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYSBjcmFzaCBoYW5kbGVyLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXJcbiAgICAgKi9cbiAgICBmdW5jdGlvbiB1bnN1YnNjcmliZShoYW5kbGVyKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSBoYW5kbGVycy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICAgICAgaWYgKGhhbmRsZXJzW2ldID09PSBoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlcnMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGFsbCBjcmFzaCBoYW5kbGVycy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiB1bnN1YnNjcmliZUFsbCgpIHtcbiAgICAgICAgdW5pbnN0YWxsR2xvYmFsSGFuZGxlcigpO1xuICAgICAgICBoYW5kbGVycyA9IFtdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERpc3BhdGNoIHN0YWNrIGluZm9ybWF0aW9uIHRvIGFsbCBoYW5kbGVycy5cbiAgICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCAqPn0gc3RhY2tcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBub3RpZnlIYW5kbGVycyhzdGFjaywgaXNXaW5kb3dFcnJvcikge1xuICAgICAgICB2YXIgZXhjZXB0aW9uID0gbnVsbDtcbiAgICAgICAgaWYgKGlzV2luZG93RXJyb3IgJiYgIVRyYWNlS2l0LmNvbGxlY3RXaW5kb3dFcnJvcnMpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSBpbiBoYW5kbGVycykge1xuICAgICAgICAgICAgaWYgKGhhc0tleShoYW5kbGVycywgaSkpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyc1tpXS5hcHBseShudWxsLCBbc3RhY2tdLmNvbmNhdChfc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpKSk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoaW5uZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgZXhjZXB0aW9uID0gaW5uZXI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGV4Y2VwdGlvbikge1xuICAgICAgICAgICAgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIF9vbGRPbmVycm9ySGFuZGxlciwgX29uRXJyb3JIYW5kbGVySW5zdGFsbGVkO1xuXG4gICAgLyoqXG4gICAgICogRW5zdXJlcyBhbGwgZ2xvYmFsIHVuaGFuZGxlZCBleGNlcHRpb25zIGFyZSByZWNvcmRlZC5cbiAgICAgKiBTdXBwb3J0ZWQgYnkgR2Vja28gYW5kIElFLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIEVycm9yIG1lc3NhZ2UuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCBVUkwgb2Ygc2NyaXB0IHRoYXQgZ2VuZXJhdGVkIHRoZSBleGNlcHRpb24uXG4gICAgICogQHBhcmFtIHsobnVtYmVyfHN0cmluZyl9IGxpbmVObyBUaGUgbGluZSBudW1iZXIgYXQgd2hpY2ggdGhlIGVycm9yXG4gICAgICogb2NjdXJyZWQuXG4gICAgICogQHBhcmFtIHs/KG51bWJlcnxzdHJpbmcpfSBjb2xObyBUaGUgY29sdW1uIG51bWJlciBhdCB3aGljaCB0aGUgZXJyb3JcbiAgICAgKiBvY2N1cnJlZC5cbiAgICAgKiBAcGFyYW0gez9FcnJvcn0gZXggVGhlIGFjdHVhbCBFcnJvciBvYmplY3QuXG4gICAgICovXG4gICAgZnVuY3Rpb24gdHJhY2VLaXRXaW5kb3dPbkVycm9yKG1lc3NhZ2UsIHVybCwgbGluZU5vLCBjb2xObywgZXgpIHtcbiAgICAgICAgdmFyIHN0YWNrID0gbnVsbDtcblxuICAgICAgICBpZiAobGFzdEV4Y2VwdGlvblN0YWNrKSB7XG4gICAgICAgICAgICBUcmFjZUtpdC5jb21wdXRlU3RhY2tUcmFjZS5hdWdtZW50U3RhY2tUcmFjZVdpdGhJbml0aWFsRWxlbWVudChsYXN0RXhjZXB0aW9uU3RhY2ssIHVybCwgbGluZU5vLCBtZXNzYWdlKTtcbiAgICAgICAgICAgIHByb2Nlc3NMYXN0RXhjZXB0aW9uKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZXgpIHtcbiAgICAgICAgICAgIC8vIE5ldyBjaHJvbWUgYW5kIGJsaW5rIHNlbmQgYWxvbmcgYSByZWFsIGVycm9yIG9iamVjdFxuICAgICAgICAgICAgLy8gTGV0J3MganVzdCByZXBvcnQgdGhhdCBsaWtlIGEgbm9ybWFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU2VlOiBodHRwczovL21pa2V3ZXN0Lm9yZy8yMDEzLzA4L2RlYnVnZ2luZy1ydW50aW1lLWVycm9ycy13aXRoLXdpbmRvdy1vbmVycm9yXG4gICAgICAgICAgICBzdGFjayA9IFRyYWNlS2l0LmNvbXB1dGVTdGFja1RyYWNlKGV4KTtcbiAgICAgICAgICAgIG5vdGlmeUhhbmRsZXJzKHN0YWNrLCB0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBsb2NhdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAndXJsJzogdXJsLFxuICAgICAgICAgICAgICAgICdsaW5lJzogbGluZU5vLFxuICAgICAgICAgICAgICAgICdjb2x1bW4nOiBjb2xOb1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGxvY2F0aW9uLmZ1bmMgPSBUcmFjZUtpdC5jb21wdXRlU3RhY2tUcmFjZS5ndWVzc0Z1bmN0aW9uTmFtZShsb2NhdGlvbi51cmwsIGxvY2F0aW9uLmxpbmUpO1xuICAgICAgICAgICAgbG9jYXRpb24uY29udGV4dCA9IFRyYWNlS2l0LmNvbXB1dGVTdGFja1RyYWNlLmdhdGhlckNvbnRleHQobG9jYXRpb24udXJsLCBsb2NhdGlvbi5saW5lKTtcbiAgICAgICAgICAgIHN0YWNrID0ge1xuICAgICAgICAgICAgICAgICdtZXNzYWdlJzogbWVzc2FnZSxcbiAgICAgICAgICAgICAgICAndXJsJzogZG9jdW1lbnQubG9jYXRpb24uaHJlZixcbiAgICAgICAgICAgICAgICAnc3RhY2snOiBbbG9jYXRpb25dXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbm90aWZ5SGFuZGxlcnMoc3RhY2ssIHRydWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF9vbGRPbmVycm9ySGFuZGxlcikge1xuICAgICAgICAgICAgcmV0dXJuIF9vbGRPbmVycm9ySGFuZGxlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxHbG9iYWxIYW5kbGVyICgpXG4gICAge1xuICAgICAgICBpZiAoX29uRXJyb3JIYW5kbGVySW5zdGFsbGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgX29sZE9uZXJyb3JIYW5kbGVyID0gd2luZG93Lm9uZXJyb3I7XG4gICAgICAgIHdpbmRvdy5vbmVycm9yID0gdHJhY2VLaXRXaW5kb3dPbkVycm9yO1xuICAgICAgICBfb25FcnJvckhhbmRsZXJJbnN0YWxsZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVuaW5zdGFsbEdsb2JhbEhhbmRsZXIgKClcbiAgICB7XG4gICAgICAgIGlmICghX29uRXJyb3JIYW5kbGVySW5zdGFsbGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgd2luZG93Lm9uZXJyb3IgPSBfb2xkT25lcnJvckhhbmRsZXI7XG4gICAgICAgIF9vbkVycm9ySGFuZGxlckluc3RhbGxlZCA9IGZhbHNlO1xuICAgICAgICBfb2xkT25lcnJvckhhbmRsZXIgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHJvY2Vzc0xhc3RFeGNlcHRpb24oKSB7XG4gICAgICAgIHZhciBfbGFzdEV4Y2VwdGlvblN0YWNrID0gbGFzdEV4Y2VwdGlvblN0YWNrLFxuICAgICAgICAgICAgX2xhc3RBcmdzID0gbGFzdEFyZ3M7XG4gICAgICAgIGxhc3RBcmdzID0gbnVsbDtcbiAgICAgICAgbGFzdEV4Y2VwdGlvblN0YWNrID0gbnVsbDtcbiAgICAgICAgbGFzdEV4Y2VwdGlvbiA9IG51bGw7XG4gICAgICAgIG5vdGlmeUhhbmRsZXJzLmFwcGx5KG51bGwsIFtfbGFzdEV4Y2VwdGlvblN0YWNrLCBmYWxzZV0uY29uY2F0KF9sYXN0QXJncykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlcG9ydHMgYW4gdW5oYW5kbGVkIEVycm9yIHRvIFRyYWNlS2l0LlxuICAgICAqIEBwYXJhbSB7RXJyb3J9IGV4XG4gICAgICogQHBhcmFtIHs/Ym9vbGVhbn0gcmV0aHJvdyBJZiBmYWxzZSwgZG8gbm90IHJlLXRocm93IHRoZSBleGNlcHRpb24uXG4gICAgICogT25seSB1c2VkIGZvciB3aW5kb3cub25lcnJvciB0byBub3QgY2F1c2UgYW4gaW5maW5pdGUgbG9vcCBvZlxuICAgICAqIHJldGhyb3dpbmcuXG4gICAgICovXG4gICAgZnVuY3Rpb24gcmVwb3J0KGV4LCByZXRocm93KSB7XG4gICAgICAgIHZhciBhcmdzID0gX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgaWYgKGxhc3RFeGNlcHRpb25TdGFjaykge1xuICAgICAgICAgICAgaWYgKGxhc3RFeGNlcHRpb24gPT09IGV4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuOyAvLyBhbHJlYWR5IGNhdWdodCBieSBhbiBpbm5lciBjYXRjaCBibG9jaywgaWdub3JlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBwcm9jZXNzTGFzdEV4Y2VwdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHN0YWNrID0gVHJhY2VLaXQuY29tcHV0ZVN0YWNrVHJhY2UoZXgpO1xuICAgICAgICBsYXN0RXhjZXB0aW9uU3RhY2sgPSBzdGFjaztcbiAgICAgICAgbGFzdEV4Y2VwdGlvbiA9IGV4O1xuICAgICAgICBsYXN0QXJncyA9IGFyZ3M7XG5cbiAgICAgICAgLy8gSWYgdGhlIHN0YWNrIHRyYWNlIGlzIGluY29tcGxldGUsIHdhaXQgZm9yIDIgc2Vjb25kcyBmb3JcbiAgICAgICAgLy8gc2xvdyBzbG93IElFIHRvIHNlZSBpZiBvbmVycm9yIG9jY3VycyBvciBub3QgYmVmb3JlIHJlcG9ydGluZ1xuICAgICAgICAvLyB0aGlzIGV4Y2VwdGlvbjsgb3RoZXJ3aXNlLCB3ZSB3aWxsIGVuZCB1cCB3aXRoIGFuIGluY29tcGxldGVcbiAgICAgICAgLy8gc3RhY2sgdHJhY2VcbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKGxhc3RFeGNlcHRpb24gPT09IGV4KSB7XG4gICAgICAgICAgICAgICAgcHJvY2Vzc0xhc3RFeGNlcHRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgKHN0YWNrLmluY29tcGxldGUgPyAyMDAwIDogMCkpO1xuXG4gICAgICAgIGlmIChyZXRocm93ICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhyb3cgZXg7IC8vIHJlLXRocm93IHRvIHByb3BhZ2F0ZSB0byB0aGUgdG9wIGxldmVsIChhbmQgY2F1c2Ugd2luZG93Lm9uZXJyb3IpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXBvcnQuc3Vic2NyaWJlID0gc3Vic2NyaWJlO1xuICAgIHJlcG9ydC51bnN1YnNjcmliZSA9IHVuc3Vic2NyaWJlO1xuICAgIHJlcG9ydC51bmluc3RhbGwgPSB1bnN1YnNjcmliZUFsbDtcbiAgICByZXR1cm4gcmVwb3J0O1xufSgpKTtcblxuLyoqXG4gKiBUcmFjZUtpdC5jb21wdXRlU3RhY2tUcmFjZTogY3Jvc3MtYnJvd3NlciBzdGFjayB0cmFjZXMgaW4gSmF2YVNjcmlwdFxuICpcbiAqIFN5bnRheDpcbiAqICAgcyA9IFRyYWNlS2l0LmNvbXB1dGVTdGFja1RyYWNlKGV4Y2VwdGlvbikgLy8gY29uc2lkZXIgdXNpbmcgVHJhY2VLaXQucmVwb3J0IGluc3RlYWQgKHNlZSBiZWxvdylcbiAqIFJldHVybnM6XG4gKiAgIHMubmFtZSAgICAgICAgICAgICAgLSBleGNlcHRpb24gbmFtZVxuICogICBzLm1lc3NhZ2UgICAgICAgICAgIC0gZXhjZXB0aW9uIG1lc3NhZ2VcbiAqICAgcy5zdGFja1tpXS51cmwgICAgICAtIEphdmFTY3JpcHQgb3IgSFRNTCBmaWxlIFVSTFxuICogICBzLnN0YWNrW2ldLmZ1bmMgICAgIC0gZnVuY3Rpb24gbmFtZSwgb3IgZW1wdHkgZm9yIGFub255bW91cyBmdW5jdGlvbnMgKGlmIGd1ZXNzaW5nIGRpZCBub3Qgd29yaylcbiAqICAgcy5zdGFja1tpXS5hcmdzICAgICAtIGFyZ3VtZW50cyBwYXNzZWQgdG8gdGhlIGZ1bmN0aW9uLCBpZiBrbm93blxuICogICBzLnN0YWNrW2ldLmxpbmUgICAgIC0gbGluZSBudW1iZXIsIGlmIGtub3duXG4gKiAgIHMuc3RhY2tbaV0uY29sdW1uICAgLSBjb2x1bW4gbnVtYmVyLCBpZiBrbm93blxuICogICBzLnN0YWNrW2ldLmNvbnRleHQgIC0gYW4gYXJyYXkgb2Ygc291cmNlIGNvZGUgbGluZXM7IHRoZSBtaWRkbGUgZWxlbWVudCBjb3JyZXNwb25kcyB0byB0aGUgY29ycmVjdCBsaW5lI1xuICpcbiAqIFN1cHBvcnRzOlxuICogICAtIEZpcmVmb3g6ICBmdWxsIHN0YWNrIHRyYWNlIHdpdGggbGluZSBudW1iZXJzIGFuZCB1bnJlbGlhYmxlIGNvbHVtblxuICogICAgICAgICAgICAgICBudW1iZXIgb24gdG9wIGZyYW1lXG4gKiAgIC0gT3BlcmEgMTA6IGZ1bGwgc3RhY2sgdHJhY2Ugd2l0aCBsaW5lIGFuZCBjb2x1bW4gbnVtYmVyc1xuICogICAtIE9wZXJhIDktOiBmdWxsIHN0YWNrIHRyYWNlIHdpdGggbGluZSBudW1iZXJzXG4gKiAgIC0gQ2hyb21lOiAgIGZ1bGwgc3RhY2sgdHJhY2Ugd2l0aCBsaW5lIGFuZCBjb2x1bW4gbnVtYmVyc1xuICogICAtIFNhZmFyaTogICBsaW5lIGFuZCBjb2x1bW4gbnVtYmVyIGZvciB0aGUgdG9wbW9zdCBzdGFja3RyYWNlIGVsZW1lbnRcbiAqICAgICAgICAgICAgICAgb25seVxuICogICAtIElFOiAgICAgICBubyBsaW5lIG51bWJlcnMgd2hhdHNvZXZlclxuICpcbiAqIFRyaWVzIHRvIGd1ZXNzIG5hbWVzIG9mIGFub255bW91cyBmdW5jdGlvbnMgYnkgbG9va2luZyBmb3IgYXNzaWdubWVudHNcbiAqIGluIHRoZSBzb3VyY2UgY29kZS4gSW4gSUUgYW5kIFNhZmFyaSwgd2UgaGF2ZSB0byBndWVzcyBzb3VyY2UgZmlsZSBuYW1lc1xuICogYnkgc2VhcmNoaW5nIGZvciBmdW5jdGlvbiBib2RpZXMgaW5zaWRlIGFsbCBwYWdlIHNjcmlwdHMuIFRoaXMgd2lsbCBub3RcbiAqIHdvcmsgZm9yIHNjcmlwdHMgdGhhdCBhcmUgbG9hZGVkIGNyb3NzLWRvbWFpbi5cbiAqIEhlcmUgYmUgZHJhZ29uczogc29tZSBmdW5jdGlvbiBuYW1lcyBtYXkgYmUgZ3Vlc3NlZCBpbmNvcnJlY3RseSwgYW5kXG4gKiBkdXBsaWNhdGUgZnVuY3Rpb25zIG1heSBiZSBtaXNtYXRjaGVkLlxuICpcbiAqIFRyYWNlS2l0LmNvbXB1dGVTdGFja1RyYWNlIHNob3VsZCBvbmx5IGJlIHVzZWQgZm9yIHRyYWNpbmcgcHVycG9zZXMuXG4gKiBMb2dnaW5nIG9mIHVuaGFuZGxlZCBleGNlcHRpb25zIHNob3VsZCBiZSBkb25lIHdpdGggVHJhY2VLaXQucmVwb3J0LFxuICogd2hpY2ggYnVpbGRzIG9uIHRvcCBvZiBUcmFjZUtpdC5jb21wdXRlU3RhY2tUcmFjZSBhbmQgcHJvdmlkZXMgYmV0dGVyXG4gKiBJRSBzdXBwb3J0IGJ5IHV0aWxpemluZyB0aGUgd2luZG93Lm9uZXJyb3IgZXZlbnQgdG8gcmV0cmlldmUgaW5mb3JtYXRpb25cbiAqIGFib3V0IHRoZSB0b3Agb2YgdGhlIHN0YWNrLlxuICpcbiAqIE5vdGU6IEluIElFIGFuZCBTYWZhcmksIG5vIHN0YWNrIHRyYWNlIGlzIHJlY29yZGVkIG9uIHRoZSBFcnJvciBvYmplY3QsXG4gKiBzbyBjb21wdXRlU3RhY2tUcmFjZSBpbnN0ZWFkIHdhbGtzIGl0cyAqb3duKiBjaGFpbiBvZiBjYWxsZXJzLlxuICogVGhpcyBtZWFucyB0aGF0OlxuICogICogaW4gU2FmYXJpLCBzb21lIG1ldGhvZHMgbWF5IGJlIG1pc3NpbmcgZnJvbSB0aGUgc3RhY2sgdHJhY2U7XG4gKiAgKiBpbiBJRSwgdGhlIHRvcG1vc3QgZnVuY3Rpb24gaW4gdGhlIHN0YWNrIHRyYWNlIHdpbGwgYWx3YXlzIGJlIHRoZVxuICogICAgY2FsbGVyIG9mIGNvbXB1dGVTdGFja1RyYWNlLlxuICpcbiAqIFRoaXMgaXMgb2theSBmb3IgdHJhY2luZyAoYmVjYXVzZSB5b3UgYXJlIGxpa2VseSB0byBiZSBjYWxsaW5nXG4gKiBjb21wdXRlU3RhY2tUcmFjZSBmcm9tIHRoZSBmdW5jdGlvbiB5b3Ugd2FudCB0byBiZSB0aGUgdG9wbW9zdCBlbGVtZW50XG4gKiBvZiB0aGUgc3RhY2sgdHJhY2UgYW55d2F5KSwgYnV0IG5vdCBva2F5IGZvciBsb2dnaW5nIHVuaGFuZGxlZFxuICogZXhjZXB0aW9ucyAoYmVjYXVzZSB5b3VyIGNhdGNoIGJsb2NrIHdpbGwgbGlrZWx5IGJlIGZhciBhd2F5IGZyb20gdGhlXG4gKiBpbm5lciBmdW5jdGlvbiB0aGF0IGFjdHVhbGx5IGNhdXNlZCB0aGUgZXhjZXB0aW9uKS5cbiAqXG4gKi9cblRyYWNlS2l0LmNvbXB1dGVTdGFja1RyYWNlID0gKGZ1bmN0aW9uIGNvbXB1dGVTdGFja1RyYWNlV3JhcHBlcigpIHtcbiAgICB2YXIgZGVidWcgPSBmYWxzZSxcbiAgICAgICAgc291cmNlQ2FjaGUgPSB7fTtcblxuICAgIC8qKlxuICAgICAqIEF0dGVtcHRzIHRvIHJldHJpZXZlIHNvdXJjZSBjb2RlIHZpYSBYTUxIdHRwUmVxdWVzdCwgd2hpY2ggaXMgdXNlZFxuICAgICAqIHRvIGxvb2sgdXAgYW5vbnltb3VzIGZ1bmN0aW9uIG5hbWVzLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVVJMIG9mIHNvdXJjZSBjb2RlLlxuICAgICAqIEByZXR1cm4ge3N0cmluZ30gU291cmNlIGNvbnRlbnRzLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGxvYWRTb3VyY2UodXJsKSB7XG4gICAgICAgIGlmICghVHJhY2VLaXQucmVtb3RlRmV0Y2hpbmcpIHsgLy9Pbmx5IGF0dGVtcHQgcmVxdWVzdCBpZiByZW1vdGVGZXRjaGluZyBpcyBvbi5cbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIGdldFhIUiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgd2luZG93LlhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBleHBsaWNpdGx5IGJ1YmJsZSB1cCB0aGUgZXhjZXB0aW9uIGlmIG5vdCBmb3VuZFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHdpbmRvdy5BY3RpdmVYT2JqZWN0KCdNaWNyb3NvZnQuWE1MSFRUUCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZhciByZXF1ZXN0ID0gZ2V0WEhSKCk7XG4gICAgICAgICAgICByZXF1ZXN0Lm9wZW4oJ0dFVCcsIHVybCwgZmFsc2UpO1xuICAgICAgICAgICAgcmVxdWVzdC5zZW5kKCcnKTtcbiAgICAgICAgICAgIHJldHVybiByZXF1ZXN0LnJlc3BvbnNlVGV4dDtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0cmlldmVzIHNvdXJjZSBjb2RlIGZyb20gdGhlIHNvdXJjZSBjb2RlIGNhY2hlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVVJMIG9mIHNvdXJjZSBjb2RlLlxuICAgICAqIEByZXR1cm4ge0FycmF5LjxzdHJpbmc+fSBTb3VyY2UgY29udGVudHMuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0U291cmNlKHVybCkge1xuICAgICAgICBpZiAoIWlzU3RyaW5nKHVybCkpIHJldHVybiBbXTtcbiAgICAgICAgaWYgKCFoYXNLZXkoc291cmNlQ2FjaGUsIHVybCkpIHtcbiAgICAgICAgICAgIC8vIFVSTCBuZWVkcyB0byBiZSBhYmxlIHRvIGZldGNoZWQgd2l0aGluIHRoZSBhY2NlcHRhYmxlIGRvbWFpbi4gIE90aGVyd2lzZSxcbiAgICAgICAgICAgIC8vIGNyb3NzLWRvbWFpbiBlcnJvcnMgd2lsbCBiZSB0cmlnZ2VyZWQuXG4gICAgICAgICAgICB2YXIgc291cmNlID0gJyc7XG4gICAgICAgICAgICBpZiAodXJsLmluZGV4T2YoZG9jdW1lbnQuZG9tYWluKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBzb3VyY2UgPSBsb2FkU291cmNlKHVybCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzb3VyY2VDYWNoZVt1cmxdID0gc291cmNlID8gc291cmNlLnNwbGl0KCdcXG4nKSA6IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNvdXJjZUNhY2hlW3VybF07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZXMgdG8gdXNlIGFuIGV4dGVybmFsbHkgbG9hZGVkIGNvcHkgb2Ygc291cmNlIGNvZGUgdG8gZGV0ZXJtaW5lXG4gICAgICogdGhlIG5hbWUgb2YgYSBmdW5jdGlvbiBieSBsb29raW5nIGF0IHRoZSBuYW1lIG9mIHRoZSB2YXJpYWJsZSBpdCB3YXNcbiAgICAgKiBhc3NpZ25lZCB0bywgaWYgYW55LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVVJMIG9mIHNvdXJjZSBjb2RlLlxuICAgICAqIEBwYXJhbSB7KHN0cmluZ3xudW1iZXIpfSBsaW5lTm8gTGluZSBudW1iZXIgaW4gc291cmNlIGNvZGUuXG4gICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgZnVuY3Rpb24gbmFtZSwgaWYgZGlzY292ZXJhYmxlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGd1ZXNzRnVuY3Rpb25OYW1lKHVybCwgbGluZU5vKSB7XG4gICAgICAgIHZhciByZUZ1bmN0aW9uQXJnTmFtZXMgPSAvZnVuY3Rpb24gKFteKF0qKVxcKChbXildKilcXCkvLFxuICAgICAgICAgICAgcmVHdWVzc0Z1bmN0aW9uID0gL1snXCJdPyhbMC05QS1aYS16JF9dKylbJ1wiXT9cXHMqWzo9XVxccyooZnVuY3Rpb258ZXZhbHxuZXcgRnVuY3Rpb24pLyxcbiAgICAgICAgICAgIGxpbmUgPSAnJyxcbiAgICAgICAgICAgIG1heExpbmVzID0gMTAsXG4gICAgICAgICAgICBzb3VyY2UgPSBnZXRTb3VyY2UodXJsKSxcbiAgICAgICAgICAgIG07XG5cbiAgICAgICAgaWYgKCFzb3VyY2UubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gVU5LTk9XTl9GVU5DVElPTjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdhbGsgYmFja3dhcmRzIGZyb20gdGhlIGZpcnN0IGxpbmUgaW4gdGhlIGZ1bmN0aW9uIHVudGlsIHdlIGZpbmQgdGhlIGxpbmUgd2hpY2hcbiAgICAgICAgLy8gbWF0Y2hlcyB0aGUgcGF0dGVybiBhYm92ZSwgd2hpY2ggaXMgdGhlIGZ1bmN0aW9uIGRlZmluaXRpb25cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtYXhMaW5lczsgKytpKSB7XG4gICAgICAgICAgICBsaW5lID0gc291cmNlW2xpbmVObyAtIGldICsgbGluZTtcblxuICAgICAgICAgICAgaWYgKCFpc1VuZGVmaW5lZChsaW5lKSkge1xuICAgICAgICAgICAgICAgIGlmICgobSA9IHJlR3Vlc3NGdW5jdGlvbi5leGVjKGxpbmUpKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbVsxXTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKChtID0gcmVGdW5jdGlvbkFyZ05hbWVzLmV4ZWMobGluZSkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtWzFdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBVTktOT1dOX0ZVTkNUSU9OO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHJpZXZlcyB0aGUgc3Vycm91bmRpbmcgbGluZXMgZnJvbSB3aGVyZSBhbiBleGNlcHRpb24gb2NjdXJyZWQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCBVUkwgb2Ygc291cmNlIGNvZGUuXG4gICAgICogQHBhcmFtIHsoc3RyaW5nfG51bWJlcil9IGxpbmUgTGluZSBudW1iZXIgaW4gc291cmNlIGNvZGUgdG8gY2VudHJlXG4gICAgICogYXJvdW5kIGZvciBjb250ZXh0LlxuICAgICAqIEByZXR1cm4gez9BcnJheS48c3RyaW5nPn0gTGluZXMgb2Ygc291cmNlIGNvZGUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2F0aGVyQ29udGV4dCh1cmwsIGxpbmUpIHtcbiAgICAgICAgdmFyIHNvdXJjZSA9IGdldFNvdXJjZSh1cmwpO1xuXG4gICAgICAgIGlmICghc291cmNlLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgY29udGV4dCA9IFtdLFxuICAgICAgICAgICAgLy8gbGluZXNCZWZvcmUgJiBsaW5lc0FmdGVyIGFyZSBpbmNsdXNpdmUgd2l0aCB0aGUgb2ZmZW5kaW5nIGxpbmUuXG4gICAgICAgICAgICAvLyBpZiBsaW5lc09mQ29udGV4dCBpcyBldmVuLCB0aGVyZSB3aWxsIGJlIG9uZSBleHRyYSBsaW5lXG4gICAgICAgICAgICAvLyAgICpiZWZvcmUqIHRoZSBvZmZlbmRpbmcgbGluZS5cbiAgICAgICAgICAgIGxpbmVzQmVmb3JlID0gTWF0aC5mbG9vcihUcmFjZUtpdC5saW5lc09mQ29udGV4dCAvIDIpLFxuICAgICAgICAgICAgLy8gQWRkIG9uZSBleHRyYSBsaW5lIGlmIGxpbmVzT2ZDb250ZXh0IGlzIG9kZFxuICAgICAgICAgICAgbGluZXNBZnRlciA9IGxpbmVzQmVmb3JlICsgKFRyYWNlS2l0LmxpbmVzT2ZDb250ZXh0ICUgMiksXG4gICAgICAgICAgICBzdGFydCA9IE1hdGgubWF4KDAsIGxpbmUgLSBsaW5lc0JlZm9yZSAtIDEpLFxuICAgICAgICAgICAgZW5kID0gTWF0aC5taW4oc291cmNlLmxlbmd0aCwgbGluZSArIGxpbmVzQWZ0ZXIgLSAxKTtcblxuICAgICAgICBsaW5lIC09IDE7IC8vIGNvbnZlcnQgdG8gMC1iYXNlZCBpbmRleFxuXG4gICAgICAgIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKHNvdXJjZVtpXSkpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0LnB1c2goc291cmNlW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb250ZXh0Lmxlbmd0aCA+IDAgPyBjb250ZXh0IDogbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFc2NhcGVzIHNwZWNpYWwgY2hhcmFjdGVycywgZXhjZXB0IGZvciB3aGl0ZXNwYWNlLCBpbiBhIHN0cmluZyB0byBiZVxuICAgICAqIHVzZWQgaW5zaWRlIGEgcmVndWxhciBleHByZXNzaW9uIGFzIGEgc3RyaW5nIGxpdGVyYWwuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRleHQgVGhlIHN0cmluZy5cbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBlc2NhcGVkIHN0cmluZyBsaXRlcmFsLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGVzY2FwZVJlZ0V4cCh0ZXh0KSB7XG4gICAgICAgIHJldHVybiB0ZXh0LnJlcGxhY2UoL1tcXC1cXFtcXF17fSgpKis/LixcXFxcXFxeJHwjXS9nLCAnXFxcXCQmJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXNjYXBlcyBzcGVjaWFsIGNoYXJhY3RlcnMgaW4gYSBzdHJpbmcgdG8gYmUgdXNlZCBpbnNpZGUgYSByZWd1bGFyXG4gICAgICogZXhwcmVzc2lvbiBhcyBhIHN0cmluZyBsaXRlcmFsLiBBbHNvIGVuc3VyZXMgdGhhdCBIVE1MIGVudGl0aWVzIHdpbGxcbiAgICAgKiBiZSBtYXRjaGVkIHRoZSBzYW1lIGFzIHRoZWlyIGxpdGVyYWwgZnJpZW5kcy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYm9keSBUaGUgc3RyaW5nLlxuICAgICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIGVzY2FwZWQgc3RyaW5nLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGVzY2FwZUNvZGVBc1JlZ0V4cEZvck1hdGNoaW5nSW5zaWRlSFRNTChib2R5KSB7XG4gICAgICAgIHJldHVybiBlc2NhcGVSZWdFeHAoYm9keSkucmVwbGFjZSgnPCcsICcoPzo8fCZsdDspJykucmVwbGFjZSgnPicsICcoPzo+fCZndDspJykucmVwbGFjZSgnJicsICcoPzomfCZhbXA7KScpLnJlcGxhY2UoJ1wiJywgJyg/OlwifCZxdW90OyknKS5yZXBsYWNlKC9cXHMrL2csICdcXFxccysnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIHdoZXJlIGEgY29kZSBmcmFnbWVudCBvY2N1cnMgaW4gdGhlIHNvdXJjZSBjb2RlLlxuICAgICAqIEBwYXJhbSB7UmVnRXhwfSByZSBUaGUgZnVuY3Rpb24gZGVmaW5pdGlvbi5cbiAgICAgKiBAcGFyYW0ge0FycmF5LjxzdHJpbmc+fSB1cmxzIEEgbGlzdCBvZiBVUkxzIHRvIHNlYXJjaC5cbiAgICAgKiBAcmV0dXJuIHs/T2JqZWN0LjxzdHJpbmcsIChzdHJpbmd8bnVtYmVyKT59IEFuIG9iamVjdCBjb250YWluaW5nXG4gICAgICogdGhlIHVybCwgbGluZSwgYW5kIGNvbHVtbiBudW1iZXIgb2YgdGhlIGRlZmluZWQgZnVuY3Rpb24uXG4gICAgICovXG4gICAgZnVuY3Rpb24gZmluZFNvdXJjZUluVXJscyhyZSwgdXJscykge1xuICAgICAgICB2YXIgc291cmNlLCBtO1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgaiA9IHVybHMubGVuZ3RoOyBpIDwgajsgKytpKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnc2VhcmNoaW5nJywgdXJsc1tpXSk7XG4gICAgICAgICAgICBpZiAoKHNvdXJjZSA9IGdldFNvdXJjZSh1cmxzW2ldKSkubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgc291cmNlID0gc291cmNlLmpvaW4oJ1xcbicpO1xuICAgICAgICAgICAgICAgIGlmICgobSA9IHJlLmV4ZWMoc291cmNlKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ0ZvdW5kIGZ1bmN0aW9uIGluICcgKyB1cmxzW2ldKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VybCc6IHVybHNbaV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnbGluZSc6IHNvdXJjZS5zdWJzdHJpbmcoMCwgbS5pbmRleCkuc3BsaXQoJ1xcbicpLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICdjb2x1bW4nOiBtLmluZGV4IC0gc291cmNlLmxhc3RJbmRleE9mKCdcXG4nLCBtLmluZGV4KSAtIDFcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjb25zb2xlLmxvZygnbm8gbWF0Y2gnKTtcblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIGF0IHdoaWNoIGNvbHVtbiBhIGNvZGUgZnJhZ21lbnQgb2NjdXJzIG9uIGEgbGluZSBvZiB0aGVcbiAgICAgKiBzb3VyY2UgY29kZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZnJhZ21lbnQgVGhlIGNvZGUgZnJhZ21lbnQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHNlYXJjaC5cbiAgICAgKiBAcGFyYW0geyhzdHJpbmd8bnVtYmVyKX0gbGluZSBUaGUgbGluZSBudW1iZXIgdG8gZXhhbWluZS5cbiAgICAgKiBAcmV0dXJuIHs/bnVtYmVyfSBUaGUgY29sdW1uIG51bWJlci5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBmaW5kU291cmNlSW5MaW5lKGZyYWdtZW50LCB1cmwsIGxpbmUpIHtcbiAgICAgICAgdmFyIHNvdXJjZSA9IGdldFNvdXJjZSh1cmwpLFxuICAgICAgICAgICAgcmUgPSBuZXcgUmVnRXhwKCdcXFxcYicgKyBlc2NhcGVSZWdFeHAoZnJhZ21lbnQpICsgJ1xcXFxiJyksXG4gICAgICAgICAgICBtO1xuXG4gICAgICAgIGxpbmUgLT0gMTtcblxuICAgICAgICBpZiAoc291cmNlICYmIHNvdXJjZS5sZW5ndGggPiBsaW5lICYmIChtID0gcmUuZXhlYyhzb3VyY2VbbGluZV0pKSkge1xuICAgICAgICAgICAgcmV0dXJuIG0uaW5kZXg7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIHdoZXJlIGEgZnVuY3Rpb24gd2FzIGRlZmluZWQgd2l0aGluIHRoZSBzb3VyY2UgY29kZS5cbiAgICAgKiBAcGFyYW0geyhGdW5jdGlvbnxzdHJpbmcpfSBmdW5jIEEgZnVuY3Rpb24gcmVmZXJlbmNlIG9yIHNlcmlhbGl6ZWRcbiAgICAgKiBmdW5jdGlvbiBkZWZpbml0aW9uLlxuICAgICAqIEByZXR1cm4gez9PYmplY3QuPHN0cmluZywgKHN0cmluZ3xudW1iZXIpPn0gQW4gb2JqZWN0IGNvbnRhaW5pbmdcbiAgICAgKiB0aGUgdXJsLCBsaW5lLCBhbmQgY29sdW1uIG51bWJlciBvZiB0aGUgZGVmaW5lZCBmdW5jdGlvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBmaW5kU291cmNlQnlGdW5jdGlvbkJvZHkoZnVuYykge1xuICAgICAgICB2YXIgdXJscyA9IFt3aW5kb3cubG9jYXRpb24uaHJlZl0sXG4gICAgICAgICAgICBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpLFxuICAgICAgICAgICAgYm9keSxcbiAgICAgICAgICAgIGNvZGUgPSAnJyArIGZ1bmMsXG4gICAgICAgICAgICBjb2RlUkUgPSAvXmZ1bmN0aW9uKD86XFxzKyhbXFx3JF0rKSk/XFxzKlxcKChbXFx3XFxzLF0qKVxcKVxccypcXHtcXHMqKFxcU1tcXHNcXFNdKlxcUylcXHMqXFx9XFxzKiQvLFxuICAgICAgICAgICAgZXZlbnRSRSA9IC9eZnVuY3Rpb24gb24oW1xcdyRdKylcXHMqXFwoZXZlbnRcXClcXHMqXFx7XFxzKihcXFNbXFxzXFxTXSpcXFMpXFxzKlxcfVxccyokLyxcbiAgICAgICAgICAgIHJlLFxuICAgICAgICAgICAgcGFydHMsXG4gICAgICAgICAgICByZXN1bHQ7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzY3JpcHRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICB2YXIgc2NyaXB0ID0gc2NyaXB0c1tpXTtcbiAgICAgICAgICAgIGlmIChzY3JpcHQuc3JjKSB7XG4gICAgICAgICAgICAgICAgdXJscy5wdXNoKHNjcmlwdC5zcmMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCEocGFydHMgPSBjb2RlUkUuZXhlYyhjb2RlKSkpIHtcbiAgICAgICAgICAgIHJlID0gbmV3IFJlZ0V4cChlc2NhcGVSZWdFeHAoY29kZSkucmVwbGFjZSgvXFxzKy9nLCAnXFxcXHMrJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbm90IHN1cmUgaWYgdGhpcyBpcyByZWFsbHkgbmVjZXNzYXJ5LCBidXQgSSBkb27igJl0IGhhdmUgYSB0ZXN0XG4gICAgICAgIC8vIGNvcnB1cyBsYXJnZSBlbm91Z2ggdG8gY29uZmlybSB0aGF0IGFuZCBpdCB3YXMgaW4gdGhlIG9yaWdpbmFsLlxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBuYW1lID0gcGFydHNbMV0gPyAnXFxcXHMrJyArIHBhcnRzWzFdIDogJycsXG4gICAgICAgICAgICAgICAgYXJncyA9IHBhcnRzWzJdLnNwbGl0KCcsJykuam9pbignXFxcXHMqLFxcXFxzKicpO1xuXG4gICAgICAgICAgICBib2R5ID0gZXNjYXBlUmVnRXhwKHBhcnRzWzNdKS5yZXBsYWNlKC87JC8sICc7PycpOyAvLyBzZW1pY29sb24gaXMgaW5zZXJ0ZWQgaWYgdGhlIGZ1bmN0aW9uIGVuZHMgd2l0aCBhIGNvbW1lbnQucmVwbGFjZSgvXFxzKy9nLCAnXFxcXHMrJyk7XG4gICAgICAgICAgICByZSA9IG5ldyBSZWdFeHAoJ2Z1bmN0aW9uJyArIG5hbWUgKyAnXFxcXHMqXFxcXChcXFxccyonICsgYXJncyArICdcXFxccypcXFxcKVxcXFxzKntcXFxccyonICsgYm9keSArICdcXFxccyp9Jyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBsb29rIGZvciBhIG5vcm1hbCBmdW5jdGlvbiBkZWZpbml0aW9uXG4gICAgICAgIGlmICgocmVzdWx0ID0gZmluZFNvdXJjZUluVXJscyhyZSwgdXJscykpKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbG9vayBmb3IgYW4gb2xkLXNjaG9vbCBldmVudCBoYW5kbGVyIGZ1bmN0aW9uXG4gICAgICAgIGlmICgocGFydHMgPSBldmVudFJFLmV4ZWMoY29kZSkpKSB7XG4gICAgICAgICAgICB2YXIgZXZlbnQgPSBwYXJ0c1sxXTtcbiAgICAgICAgICAgIGJvZHkgPSBlc2NhcGVDb2RlQXNSZWdFeHBGb3JNYXRjaGluZ0luc2lkZUhUTUwocGFydHNbMl0pO1xuXG4gICAgICAgICAgICAvLyBsb29rIGZvciBhIGZ1bmN0aW9uIGRlZmluZWQgaW4gSFRNTCBhcyBhbiBvblhYWCBoYW5kbGVyXG4gICAgICAgICAgICByZSA9IG5ldyBSZWdFeHAoJ29uJyArIGV2ZW50ICsgJz1bXFxcXFxcJ1wiXVxcXFxzKicgKyBib2R5ICsgJ1xcXFxzKltcXFxcXFwnXCJdJywgJ2knKTtcblxuICAgICAgICAgICAgaWYgKChyZXN1bHQgPSBmaW5kU291cmNlSW5VcmxzKHJlLCB1cmxzWzBdKSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBsb29rIGZvciA/Pz9cbiAgICAgICAgICAgIHJlID0gbmV3IFJlZ0V4cChib2R5KTtcblxuICAgICAgICAgICAgaWYgKChyZXN1bHQgPSBmaW5kU291cmNlSW5VcmxzKHJlLCB1cmxzKSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gQ29udGVudHMgb2YgRXhjZXB0aW9uIGluIHZhcmlvdXMgYnJvd3NlcnMuXG4gICAgLy9cbiAgICAvLyBTQUZBUkk6XG4gICAgLy8gZXgubWVzc2FnZSA9IENhbid0IGZpbmQgdmFyaWFibGU6IHFxXG4gICAgLy8gZXgubGluZSA9IDU5XG4gICAgLy8gZXguc291cmNlSWQgPSA1ODAyMzgxOTJcbiAgICAvLyBleC5zb3VyY2VVUkwgPSBodHRwOi8vLi4uXG4gICAgLy8gZXguZXhwcmVzc2lvbkJlZ2luT2Zmc2V0ID0gOTZcbiAgICAvLyBleC5leHByZXNzaW9uQ2FyZXRPZmZzZXQgPSA5OFxuICAgIC8vIGV4LmV4cHJlc3Npb25FbmRPZmZzZXQgPSA5OFxuICAgIC8vIGV4Lm5hbWUgPSBSZWZlcmVuY2VFcnJvclxuICAgIC8vXG4gICAgLy8gRklSRUZPWDpcbiAgICAvLyBleC5tZXNzYWdlID0gcXEgaXMgbm90IGRlZmluZWRcbiAgICAvLyBleC5maWxlTmFtZSA9IGh0dHA6Ly8uLi5cbiAgICAvLyBleC5saW5lTnVtYmVyID0gNTlcbiAgICAvLyBleC5jb2x1bW5OdW1iZXIgPSA2OVxuICAgIC8vIGV4LnN0YWNrID0gLi4uc3RhY2sgdHJhY2UuLi4gKHNlZSB0aGUgZXhhbXBsZSBiZWxvdylcbiAgICAvLyBleC5uYW1lID0gUmVmZXJlbmNlRXJyb3JcbiAgICAvL1xuICAgIC8vIENIUk9NRTpcbiAgICAvLyBleC5tZXNzYWdlID0gcXEgaXMgbm90IGRlZmluZWRcbiAgICAvLyBleC5uYW1lID0gUmVmZXJlbmNlRXJyb3JcbiAgICAvLyBleC50eXBlID0gbm90X2RlZmluZWRcbiAgICAvLyBleC5hcmd1bWVudHMgPSBbJ2FhJ11cbiAgICAvLyBleC5zdGFjayA9IC4uLnN0YWNrIHRyYWNlLi4uXG4gICAgLy9cbiAgICAvLyBJTlRFUk5FVCBFWFBMT1JFUjpcbiAgICAvLyBleC5tZXNzYWdlID0gLi4uXG4gICAgLy8gZXgubmFtZSA9IFJlZmVyZW5jZUVycm9yXG4gICAgLy9cbiAgICAvLyBPUEVSQTpcbiAgICAvLyBleC5tZXNzYWdlID0gLi4ubWVzc2FnZS4uLiAoc2VlIHRoZSBleGFtcGxlIGJlbG93KVxuICAgIC8vIGV4Lm5hbWUgPSBSZWZlcmVuY2VFcnJvclxuICAgIC8vIGV4Lm9wZXJhI3NvdXJjZWxvYyA9IDExICAocHJldHR5IG11Y2ggdXNlbGVzcywgZHVwbGljYXRlcyB0aGUgaW5mbyBpbiBleC5tZXNzYWdlKVxuICAgIC8vIGV4LnN0YWNrdHJhY2UgPSBuL2E7IHNlZSAnb3BlcmE6Y29uZmlnI1VzZXJQcmVmc3xFeGNlcHRpb25zIEhhdmUgU3RhY2t0cmFjZSdcblxuICAgIC8qKlxuICAgICAqIENvbXB1dGVzIHN0YWNrIHRyYWNlIGluZm9ybWF0aW9uIGZyb20gdGhlIHN0YWNrIHByb3BlcnR5LlxuICAgICAqIENocm9tZSBhbmQgR2Vja28gdXNlIHRoaXMgcHJvcGVydHkuXG4gICAgICogQHBhcmFtIHtFcnJvcn0gZXhcbiAgICAgKiBAcmV0dXJuIHs/T2JqZWN0LjxzdHJpbmcsICo+fSBTdGFjayB0cmFjZSBpbmZvcm1hdGlvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjb21wdXRlU3RhY2tUcmFjZUZyb21TdGFja1Byb3AoZXgpIHtcbiAgICAgICAgaWYgKCFleC5zdGFjaykge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgY2hyb21lID0gL15cXHMqYXQgKC4qPykgP1xcKD8oKD86ZmlsZXxodHRwcz98Y2hyb21lLWV4dGVuc2lvbik6Lio/KTooXFxkKykoPzo6KFxcZCspKT9cXCk/XFxzKiQvaSxcbiAgICAgICAgICAgIGdlY2tvID0gL15cXHMqKC4qPykoPzpcXCgoLio/KVxcKSk/QCgoPzpmaWxlfGh0dHBzP3xjaHJvbWUpLio/KTooXFxkKykoPzo6KFxcZCspKT9cXHMqJC9pLFxuICAgICAgICAgICAgbGluZXMgPSBleC5zdGFjay5zcGxpdCgnXFxuJyksXG4gICAgICAgICAgICBzdGFjayA9IFtdLFxuICAgICAgICAgICAgcGFydHMsXG4gICAgICAgICAgICBlbGVtZW50LFxuICAgICAgICAgICAgcmVmZXJlbmNlID0gL14oLiopIGlzIHVuZGVmaW5lZCQvLmV4ZWMoZXgubWVzc2FnZSk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGogPSBsaW5lcy5sZW5ndGg7IGkgPCBqOyArK2kpIHtcbiAgICAgICAgICAgIGlmICgocGFydHMgPSBnZWNrby5leGVjKGxpbmVzW2ldKSkpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0ge1xuICAgICAgICAgICAgICAgICAgICAndXJsJzogcGFydHNbM10sXG4gICAgICAgICAgICAgICAgICAgICdmdW5jJzogcGFydHNbMV0gfHwgVU5LTk9XTl9GVU5DVElPTixcbiAgICAgICAgICAgICAgICAgICAgJ2FyZ3MnOiBwYXJ0c1syXSA/IHBhcnRzWzJdLnNwbGl0KCcsJykgOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgJ2xpbmUnOiArcGFydHNbNF0sXG4gICAgICAgICAgICAgICAgICAgICdjb2x1bW4nOiBwYXJ0c1s1XSA/ICtwYXJ0c1s1XSA6IG51bGxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSBlbHNlIGlmICgocGFydHMgPSBjaHJvbWUuZXhlYyhsaW5lc1tpXSkpKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IHtcbiAgICAgICAgICAgICAgICAgICAgJ3VybCc6IHBhcnRzWzJdLFxuICAgICAgICAgICAgICAgICAgICAnZnVuYyc6IHBhcnRzWzFdIHx8IFVOS05PV05fRlVOQ1RJT04sXG4gICAgICAgICAgICAgICAgICAgICdsaW5lJzogK3BhcnRzWzNdLFxuICAgICAgICAgICAgICAgICAgICAnY29sdW1uJzogcGFydHNbNF0gPyArcGFydHNbNF0gOiBudWxsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghZWxlbWVudC5mdW5jICYmIGVsZW1lbnQubGluZSkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuZnVuYyA9IGd1ZXNzRnVuY3Rpb25OYW1lKGVsZW1lbnQudXJsLCBlbGVtZW50LmxpbmUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZWxlbWVudC5saW5lKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5jb250ZXh0ID0gZ2F0aGVyQ29udGV4dChlbGVtZW50LnVybCwgZWxlbWVudC5saW5lKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3RhY2sucHVzaChlbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghc3RhY2subGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdGFja1swXS5saW5lICYmICFzdGFja1swXS5jb2x1bW4gJiYgcmVmZXJlbmNlKSB7XG4gICAgICAgICAgICBzdGFja1swXS5jb2x1bW4gPSBmaW5kU291cmNlSW5MaW5lKHJlZmVyZW5jZVsxXSwgc3RhY2tbMF0udXJsLCBzdGFja1swXS5saW5lKTtcbiAgICAgICAgfSBlbHNlIGlmICghc3RhY2tbMF0uY29sdW1uICYmICFpc1VuZGVmaW5lZChleC5jb2x1bW5OdW1iZXIpKSB7XG4gICAgICAgICAgICAvLyBGaXJlRm94IHVzZXMgdGhpcyBhd2Vzb21lIGNvbHVtbk51bWJlciBwcm9wZXJ0eSBmb3IgaXRzIHRvcCBmcmFtZVxuICAgICAgICAgICAgLy8gQWxzbyBub3RlLCBGaXJlZm94J3MgY29sdW1uIG51bWJlciBpcyAwLWJhc2VkIGFuZCBldmVyeXRoaW5nIGVsc2UgZXhwZWN0cyAxLWJhc2VkLFxuICAgICAgICAgICAgLy8gc28gYWRkaW5nIDFcbiAgICAgICAgICAgIHN0YWNrWzBdLmNvbHVtbiA9IGV4LmNvbHVtbk51bWJlciArIDE7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ25hbWUnOiBleC5uYW1lLFxuICAgICAgICAgICAgJ21lc3NhZ2UnOiBleC5tZXNzYWdlLFxuICAgICAgICAgICAgJ3VybCc6IGRvY3VtZW50LmxvY2F0aW9uLmhyZWYsXG4gICAgICAgICAgICAnc3RhY2snOiBzdGFja1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbXB1dGVzIHN0YWNrIHRyYWNlIGluZm9ybWF0aW9uIGZyb20gdGhlIHN0YWNrdHJhY2UgcHJvcGVydHkuXG4gICAgICogT3BlcmEgMTAgdXNlcyB0aGlzIHByb3BlcnR5LlxuICAgICAqIEBwYXJhbSB7RXJyb3J9IGV4XG4gICAgICogQHJldHVybiB7P09iamVjdC48c3RyaW5nLCAqPn0gU3RhY2sgdHJhY2UgaW5mb3JtYXRpb24uXG4gICAgICovXG4gICAgZnVuY3Rpb24gY29tcHV0ZVN0YWNrVHJhY2VGcm9tU3RhY2t0cmFjZVByb3AoZXgpIHtcbiAgICAgICAgLy8gQWNjZXNzIGFuZCBzdG9yZSB0aGUgc3RhY2t0cmFjZSBwcm9wZXJ0eSBiZWZvcmUgZG9pbmcgQU5ZVEhJTkdcbiAgICAgICAgLy8gZWxzZSB0byBpdCBiZWNhdXNlIE9wZXJhIGlzIG5vdCB2ZXJ5IGdvb2QgYXQgcHJvdmlkaW5nIGl0XG4gICAgICAgIC8vIHJlbGlhYmx5IGluIG90aGVyIGNpcmN1bXN0YW5jZXMuXG4gICAgICAgIHZhciBzdGFja3RyYWNlID0gZXguc3RhY2t0cmFjZTtcblxuICAgICAgICB2YXIgdGVzdFJFID0gLyBsaW5lIChcXGQrKSwgY29sdW1uIChcXGQrKSBpbiAoPzo8YW5vbnltb3VzIGZ1bmN0aW9uOiAoW14+XSspPnwoW15cXCldKykpXFwoKC4qKVxcKSBpbiAoLiopOlxccyokL2ksXG4gICAgICAgICAgICBsaW5lcyA9IHN0YWNrdHJhY2Uuc3BsaXQoJ1xcbicpLFxuICAgICAgICAgICAgc3RhY2sgPSBbXSxcbiAgICAgICAgICAgIHBhcnRzO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBqID0gbGluZXMubGVuZ3RoOyBpIDwgajsgaSArPSAyKSB7XG4gICAgICAgICAgICBpZiAoKHBhcnRzID0gdGVzdFJFLmV4ZWMobGluZXNbaV0pKSkge1xuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50ID0ge1xuICAgICAgICAgICAgICAgICAgICAnbGluZSc6ICtwYXJ0c1sxXSxcbiAgICAgICAgICAgICAgICAgICAgJ2NvbHVtbic6ICtwYXJ0c1syXSxcbiAgICAgICAgICAgICAgICAgICAgJ2Z1bmMnOiBwYXJ0c1szXSB8fCBwYXJ0c1s0XSxcbiAgICAgICAgICAgICAgICAgICAgJ2FyZ3MnOiBwYXJ0c1s1XSA/IHBhcnRzWzVdLnNwbGl0KCcsJykgOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgJ3VybCc6IHBhcnRzWzZdXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGlmICghZWxlbWVudC5mdW5jICYmIGVsZW1lbnQubGluZSkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmZ1bmMgPSBndWVzc0Z1bmN0aW9uTmFtZShlbGVtZW50LnVybCwgZWxlbWVudC5saW5lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQubGluZSkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5jb250ZXh0ID0gZ2F0aGVyQ29udGV4dChlbGVtZW50LnVybCwgZWxlbWVudC5saW5lKTtcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXhjKSB7fVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghZWxlbWVudC5jb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuY29udGV4dCA9IFtsaW5lc1tpICsgMV1dO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHN0YWNrLnB1c2goZWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXN0YWNrLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ25hbWUnOiBleC5uYW1lLFxuICAgICAgICAgICAgJ21lc3NhZ2UnOiBleC5tZXNzYWdlLFxuICAgICAgICAgICAgJ3VybCc6IGRvY3VtZW50LmxvY2F0aW9uLmhyZWYsXG4gICAgICAgICAgICAnc3RhY2snOiBzdGFja1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE5PVCBURVNURUQuXG4gICAgICogQ29tcHV0ZXMgc3RhY2sgdHJhY2UgaW5mb3JtYXRpb24gZnJvbSBhbiBlcnJvciBtZXNzYWdlIHRoYXQgaW5jbHVkZXNcbiAgICAgKiB0aGUgc3RhY2sgdHJhY2UuXG4gICAgICogT3BlcmEgOSBhbmQgZWFybGllciB1c2UgdGhpcyBtZXRob2QgaWYgdGhlIG9wdGlvbiB0byBzaG93IHN0YWNrXG4gICAgICogdHJhY2VzIGlzIHR1cm5lZCBvbiBpbiBvcGVyYTpjb25maWcuXG4gICAgICogQHBhcmFtIHtFcnJvcn0gZXhcbiAgICAgKiBAcmV0dXJuIHs/T2JqZWN0LjxzdHJpbmcsICo+fSBTdGFjayBpbmZvcm1hdGlvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjb21wdXRlU3RhY2tUcmFjZUZyb21PcGVyYU11bHRpTGluZU1lc3NhZ2UoZXgpIHtcbiAgICAgICAgLy8gT3BlcmEgaW5jbHVkZXMgYSBzdGFjayB0cmFjZSBpbnRvIHRoZSBleGNlcHRpb24gbWVzc2FnZS4gQW4gZXhhbXBsZSBpczpcbiAgICAgICAgLy9cbiAgICAgICAgLy8gU3RhdGVtZW50IG9uIGxpbmUgMzogVW5kZWZpbmVkIHZhcmlhYmxlOiB1bmRlZmluZWRGdW5jXG4gICAgICAgIC8vIEJhY2t0cmFjZTpcbiAgICAgICAgLy8gICBMaW5lIDMgb2YgbGlua2VkIHNjcmlwdCBmaWxlOi8vbG9jYWxob3N0L1VzZXJzL2FuZHJleXZpdC9Qcm9qZWN0cy9UcmFjZUtpdC9qYXZhc2NyaXB0LWNsaWVudC9zYW1wbGUuanM6IEluIGZ1bmN0aW9uIHp6elxuICAgICAgICAvLyAgICAgICAgIHVuZGVmaW5lZEZ1bmMoYSk7XG4gICAgICAgIC8vICAgTGluZSA3IG9mIGlubGluZSMxIHNjcmlwdCBpbiBmaWxlOi8vbG9jYWxob3N0L1VzZXJzL2FuZHJleXZpdC9Qcm9qZWN0cy9UcmFjZUtpdC9qYXZhc2NyaXB0LWNsaWVudC9zYW1wbGUuaHRtbDogSW4gZnVuY3Rpb24geXl5XG4gICAgICAgIC8vICAgICAgICAgICB6enooeCwgeSwgeik7XG4gICAgICAgIC8vICAgTGluZSAzIG9mIGlubGluZSMxIHNjcmlwdCBpbiBmaWxlOi8vbG9jYWxob3N0L1VzZXJzL2FuZHJleXZpdC9Qcm9qZWN0cy9UcmFjZUtpdC9qYXZhc2NyaXB0LWNsaWVudC9zYW1wbGUuaHRtbDogSW4gZnVuY3Rpb24geHh4XG4gICAgICAgIC8vICAgICAgICAgICB5eXkoYSwgYSwgYSk7XG4gICAgICAgIC8vICAgTGluZSAxIG9mIGZ1bmN0aW9uIHNjcmlwdFxuICAgICAgICAvLyAgICAgdHJ5IHsgeHh4KCdoaScpOyByZXR1cm4gZmFsc2U7IH0gY2F0Y2goZXgpIHsgVHJhY2VLaXQucmVwb3J0KGV4KTsgfVxuICAgICAgICAvLyAgIC4uLlxuXG4gICAgICAgIHZhciBsaW5lcyA9IGV4Lm1lc3NhZ2Uuc3BsaXQoJ1xcbicpO1xuICAgICAgICBpZiAobGluZXMubGVuZ3RoIDwgNCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbGluZVJFMSA9IC9eXFxzKkxpbmUgKFxcZCspIG9mIGxpbmtlZCBzY3JpcHQgKCg/OmZpbGV8aHR0cHM/KVxcUyspKD86OiBpbiBmdW5jdGlvbiAoXFxTKykpP1xccyokL2ksXG4gICAgICAgICAgICBsaW5lUkUyID0gL15cXHMqTGluZSAoXFxkKykgb2YgaW5saW5lIyhcXGQrKSBzY3JpcHQgaW4gKCg/OmZpbGV8aHR0cHM/KVxcUyspKD86OiBpbiBmdW5jdGlvbiAoXFxTKykpP1xccyokL2ksXG4gICAgICAgICAgICBsaW5lUkUzID0gL15cXHMqTGluZSAoXFxkKykgb2YgZnVuY3Rpb24gc2NyaXB0XFxzKiQvaSxcbiAgICAgICAgICAgIHN0YWNrID0gW10sXG4gICAgICAgICAgICBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpLFxuICAgICAgICAgICAgaW5saW5lU2NyaXB0QmxvY2tzID0gW10sXG4gICAgICAgICAgICBwYXJ0cyxcbiAgICAgICAgICAgIGksXG4gICAgICAgICAgICBsZW4sXG4gICAgICAgICAgICBzb3VyY2U7XG5cbiAgICAgICAgZm9yIChpIGluIHNjcmlwdHMpIHtcbiAgICAgICAgICAgIGlmIChoYXNLZXkoc2NyaXB0cywgaSkgJiYgIXNjcmlwdHNbaV0uc3JjKSB7XG4gICAgICAgICAgICAgICAgaW5saW5lU2NyaXB0QmxvY2tzLnB1c2goc2NyaXB0c1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGkgPSAyLCBsZW4gPSBsaW5lcy5sZW5ndGg7IGkgPCBsZW47IGkgKz0gMikge1xuICAgICAgICAgICAgdmFyIGl0ZW0gPSBudWxsO1xuICAgICAgICAgICAgaWYgKChwYXJ0cyA9IGxpbmVSRTEuZXhlYyhsaW5lc1tpXSkpKSB7XG4gICAgICAgICAgICAgICAgaXRlbSA9IHtcbiAgICAgICAgICAgICAgICAgICAgJ3VybCc6IHBhcnRzWzJdLFxuICAgICAgICAgICAgICAgICAgICAnZnVuYyc6IHBhcnRzWzNdLFxuICAgICAgICAgICAgICAgICAgICAnbGluZSc6ICtwYXJ0c1sxXVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGVsc2UgaWYgKChwYXJ0cyA9IGxpbmVSRTIuZXhlYyhsaW5lc1tpXSkpKSB7XG4gICAgICAgICAgICAgICAgaXRlbSA9IHtcbiAgICAgICAgICAgICAgICAgICAgJ3VybCc6IHBhcnRzWzNdLFxuICAgICAgICAgICAgICAgICAgICAnZnVuYyc6IHBhcnRzWzRdXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB2YXIgcmVsYXRpdmVMaW5lID0gKCtwYXJ0c1sxXSk7IC8vIHJlbGF0aXZlIHRvIHRoZSBzdGFydCBvZiB0aGUgPFNDUklQVD4gYmxvY2tcbiAgICAgICAgICAgICAgICB2YXIgc2NyaXB0ID0gaW5saW5lU2NyaXB0QmxvY2tzW3BhcnRzWzJdIC0gMV07XG4gICAgICAgICAgICAgICAgaWYgKHNjcmlwdCkge1xuICAgICAgICAgICAgICAgICAgICBzb3VyY2UgPSBnZXRTb3VyY2UoaXRlbS51cmwpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2UgPSBzb3VyY2Uuam9pbignXFxuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcG9zID0gc291cmNlLmluZGV4T2Yoc2NyaXB0LmlubmVyVGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocG9zID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmxpbmUgPSByZWxhdGl2ZUxpbmUgKyBzb3VyY2Uuc3Vic3RyaW5nKDAsIHBvcykuc3BsaXQoJ1xcbicpLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKHBhcnRzID0gbGluZVJFMy5leGVjKGxpbmVzW2ldKSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWYucmVwbGFjZSgvIy4qJC8sICcnKSxcbiAgICAgICAgICAgICAgICAgICAgbGluZSA9IHBhcnRzWzFdO1xuICAgICAgICAgICAgICAgIHZhciByZSA9IG5ldyBSZWdFeHAoZXNjYXBlQ29kZUFzUmVnRXhwRm9yTWF0Y2hpbmdJbnNpZGVIVE1MKGxpbmVzW2kgKyAxXSkpO1xuICAgICAgICAgICAgICAgIHNvdXJjZSA9IGZpbmRTb3VyY2VJblVybHMocmUsIFt1cmxdKTtcbiAgICAgICAgICAgICAgICBpdGVtID0ge1xuICAgICAgICAgICAgICAgICAgICAndXJsJzogdXJsLFxuICAgICAgICAgICAgICAgICAgICAnbGluZSc6IHNvdXJjZSA/IHNvdXJjZS5saW5lIDogbGluZSxcbiAgICAgICAgICAgICAgICAgICAgJ2Z1bmMnOiAnJ1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpdGVtLmZ1bmMpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5mdW5jID0gZ3Vlc3NGdW5jdGlvbk5hbWUoaXRlbS51cmwsIGl0ZW0ubGluZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBjb250ZXh0ID0gZ2F0aGVyQ29udGV4dChpdGVtLnVybCwgaXRlbS5saW5lKTtcbiAgICAgICAgICAgICAgICB2YXIgbWlkbGluZSA9IChjb250ZXh0ID8gY29udGV4dFtNYXRoLmZsb29yKGNvbnRleHQubGVuZ3RoIC8gMildIDogbnVsbCk7XG4gICAgICAgICAgICAgICAgaWYgKGNvbnRleHQgJiYgbWlkbGluZS5yZXBsYWNlKC9eXFxzKi8sICcnKSA9PT0gbGluZXNbaSArIDFdLnJlcGxhY2UoL15cXHMqLywgJycpKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgKGNvbnRleHQpIGFsZXJ0KFwiQ29udGV4dCBtaXNtYXRjaC4gQ29ycmVjdCBtaWRsaW5lOlxcblwiICsgbGluZXNbaSsxXSArIFwiXFxuXFxuTWlkbGluZTpcXG5cIiArIG1pZGxpbmUgKyBcIlxcblxcbkNvbnRleHQ6XFxuXCIgKyBjb250ZXh0LmpvaW4oXCJcXG5cIikgKyBcIlxcblxcblVSTDpcXG5cIiArIGl0ZW0udXJsKTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jb250ZXh0ID0gW2xpbmVzW2kgKyAxXV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN0YWNrLnB1c2goaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFzdGFjay5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsOyAvLyBjb3VsZCBub3QgcGFyc2UgbXVsdGlsaW5lIGV4Y2VwdGlvbiBtZXNzYWdlIGFzIE9wZXJhIHN0YWNrIHRyYWNlXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ25hbWUnOiBleC5uYW1lLFxuICAgICAgICAgICAgJ21lc3NhZ2UnOiBsaW5lc1swXSxcbiAgICAgICAgICAgICd1cmwnOiBkb2N1bWVudC5sb2NhdGlvbi5ocmVmLFxuICAgICAgICAgICAgJ3N0YWNrJzogc3RhY2tcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGluZm9ybWF0aW9uIGFib3V0IHRoZSBmaXJzdCBmcmFtZSB0byBpbmNvbXBsZXRlIHN0YWNrIHRyYWNlcy5cbiAgICAgKiBTYWZhcmkgYW5kIElFIHJlcXVpcmUgdGhpcyB0byBnZXQgY29tcGxldGUgZGF0YSBvbiB0aGUgZmlyc3QgZnJhbWUuXG4gICAgICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywgKj59IHN0YWNrSW5mbyBTdGFjayB0cmFjZSBpbmZvcm1hdGlvbiBmcm9tXG4gICAgICogb25lIG9mIHRoZSBjb21wdXRlKiBtZXRob2RzLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIFVSTCBvZiB0aGUgc2NyaXB0IHRoYXQgY2F1c2VkIGFuIGVycm9yLlxuICAgICAqIEBwYXJhbSB7KG51bWJlcnxzdHJpbmcpfSBsaW5lTm8gVGhlIGxpbmUgbnVtYmVyIG9mIHRoZSBzY3JpcHQgdGhhdFxuICAgICAqIGNhdXNlZCBhbiBlcnJvci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZz19IG1lc3NhZ2UgVGhlIGVycm9yIGdlbmVyYXRlZCBieSB0aGUgYnJvd3Nlciwgd2hpY2hcbiAgICAgKiBob3BlZnVsbHkgY29udGFpbnMgdGhlIG5hbWUgb2YgdGhlIG9iamVjdCB0aGF0IGNhdXNlZCB0aGUgZXJyb3IuXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gV2hldGhlciBvciBub3QgdGhlIHN0YWNrIGluZm9ybWF0aW9uIHdhc1xuICAgICAqIGF1Z21lbnRlZC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhdWdtZW50U3RhY2tUcmFjZVdpdGhJbml0aWFsRWxlbWVudChzdGFja0luZm8sIHVybCwgbGluZU5vLCBtZXNzYWdlKSB7XG4gICAgICAgIHZhciBpbml0aWFsID0ge1xuICAgICAgICAgICAgJ3VybCc6IHVybCxcbiAgICAgICAgICAgICdsaW5lJzogbGluZU5vXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGluaXRpYWwudXJsICYmIGluaXRpYWwubGluZSkge1xuICAgICAgICAgICAgc3RhY2tJbmZvLmluY29tcGxldGUgPSBmYWxzZTtcblxuICAgICAgICAgICAgaWYgKCFpbml0aWFsLmZ1bmMpIHtcbiAgICAgICAgICAgICAgICBpbml0aWFsLmZ1bmMgPSBndWVzc0Z1bmN0aW9uTmFtZShpbml0aWFsLnVybCwgaW5pdGlhbC5saW5lKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFpbml0aWFsLmNvbnRleHQpIHtcbiAgICAgICAgICAgICAgICBpbml0aWFsLmNvbnRleHQgPSBnYXRoZXJDb250ZXh0KGluaXRpYWwudXJsLCBpbml0aWFsLmxpbmUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcmVmZXJlbmNlID0gLyAnKFteJ10rKScgLy5leGVjKG1lc3NhZ2UpO1xuICAgICAgICAgICAgaWYgKHJlZmVyZW5jZSkge1xuICAgICAgICAgICAgICAgIGluaXRpYWwuY29sdW1uID0gZmluZFNvdXJjZUluTGluZShyZWZlcmVuY2VbMV0sIGluaXRpYWwudXJsLCBpbml0aWFsLmxpbmUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc3RhY2tJbmZvLnN0YWNrLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBpZiAoc3RhY2tJbmZvLnN0YWNrWzBdLnVybCA9PT0gaW5pdGlhbC51cmwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YWNrSW5mby5zdGFja1swXS5saW5lID09PSBpbml0aWFsLmxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTsgLy8gYWxyZWFkeSBpbiBzdGFjayB0cmFjZVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFzdGFja0luZm8uc3RhY2tbMF0ubGluZSAmJiBzdGFja0luZm8uc3RhY2tbMF0uZnVuYyA9PT0gaW5pdGlhbC5mdW5jKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFja0luZm8uc3RhY2tbMF0ubGluZSA9IGluaXRpYWwubGluZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrSW5mby5zdGFja1swXS5jb250ZXh0ID0gaW5pdGlhbC5jb250ZXh0O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzdGFja0luZm8uc3RhY2sudW5zaGlmdChpbml0aWFsKTtcbiAgICAgICAgICAgIHN0YWNrSW5mby5wYXJ0aWFsID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RhY2tJbmZvLmluY29tcGxldGUgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbXB1dGVzIHN0YWNrIHRyYWNlIGluZm9ybWF0aW9uIGJ5IHdhbGtpbmcgdGhlIGFyZ3VtZW50cy5jYWxsZXJcbiAgICAgKiBjaGFpbiBhdCB0aGUgdGltZSB0aGUgZXhjZXB0aW9uIG9jY3VycmVkLiBUaGlzIHdpbGwgY2F1c2UgZWFybGllclxuICAgICAqIGZyYW1lcyB0byBiZSBtaXNzZWQgYnV0IGlzIHRoZSBvbmx5IHdheSB0byBnZXQgYW55IHN0YWNrIHRyYWNlIGluXG4gICAgICogU2FmYXJpIGFuZCBJRS4gVGhlIHRvcCBmcmFtZSBpcyByZXN0b3JlZCBieVxuICAgICAqIHtAbGluayBhdWdtZW50U3RhY2tUcmFjZVdpdGhJbml0aWFsRWxlbWVudH0uXG4gICAgICogQHBhcmFtIHtFcnJvcn0gZXhcbiAgICAgKiBAcmV0dXJuIHs/T2JqZWN0LjxzdHJpbmcsICo+fSBTdGFjayB0cmFjZSBpbmZvcm1hdGlvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjb21wdXRlU3RhY2tUcmFjZUJ5V2Fsa2luZ0NhbGxlckNoYWluKGV4LCBkZXB0aCkge1xuICAgICAgICB2YXIgZnVuY3Rpb25OYW1lID0gL2Z1bmN0aW9uXFxzKyhbXyRhLXpBLVpcXHhBMC1cXHVGRkZGXVtfJGEtekEtWjAtOVxceEEwLVxcdUZGRkZdKik/XFxzKlxcKC9pLFxuICAgICAgICAgICAgc3RhY2sgPSBbXSxcbiAgICAgICAgICAgIGZ1bmNzID0ge30sXG4gICAgICAgICAgICByZWN1cnNpb24gPSBmYWxzZSxcbiAgICAgICAgICAgIHBhcnRzLFxuICAgICAgICAgICAgaXRlbSxcbiAgICAgICAgICAgIHNvdXJjZTtcblxuICAgICAgICBmb3IgKHZhciBjdXJyID0gY29tcHV0ZVN0YWNrVHJhY2VCeVdhbGtpbmdDYWxsZXJDaGFpbi5jYWxsZXI7IGN1cnIgJiYgIXJlY3Vyc2lvbjsgY3VyciA9IGN1cnIuY2FsbGVyKSB7XG4gICAgICAgICAgICBpZiAoY3VyciA9PT0gY29tcHV0ZVN0YWNrVHJhY2UgfHwgY3VyciA9PT0gVHJhY2VLaXQucmVwb3J0KSB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3NraXBwaW5nIGludGVybmFsIGZ1bmN0aW9uJyk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgJ3VybCc6IG51bGwsXG4gICAgICAgICAgICAgICAgJ2Z1bmMnOiBVTktOT1dOX0ZVTkNUSU9OLFxuICAgICAgICAgICAgICAgICdsaW5lJzogbnVsbCxcbiAgICAgICAgICAgICAgICAnY29sdW1uJzogbnVsbFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKGN1cnIubmFtZSkge1xuICAgICAgICAgICAgICAgIGl0ZW0uZnVuYyA9IGN1cnIubmFtZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKHBhcnRzID0gZnVuY3Rpb25OYW1lLmV4ZWMoY3Vyci50b1N0cmluZygpKSkpIHtcbiAgICAgICAgICAgICAgICBpdGVtLmZ1bmMgPSBwYXJ0c1sxXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKChzb3VyY2UgPSBmaW5kU291cmNlQnlGdW5jdGlvbkJvZHkoY3VycikpKSB7XG4gICAgICAgICAgICAgICAgaXRlbS51cmwgPSBzb3VyY2UudXJsO1xuICAgICAgICAgICAgICAgIGl0ZW0ubGluZSA9IHNvdXJjZS5saW5lO1xuXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uZnVuYyA9PT0gVU5LTk9XTl9GVU5DVElPTikge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmZ1bmMgPSBndWVzc0Z1bmN0aW9uTmFtZShpdGVtLnVybCwgaXRlbS5saW5lKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgcmVmZXJlbmNlID0gLyAnKFteJ10rKScgLy5leGVjKGV4Lm1lc3NhZ2UgfHwgZXguZGVzY3JpcHRpb24pO1xuICAgICAgICAgICAgICAgIGlmIChyZWZlcmVuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jb2x1bW4gPSBmaW5kU291cmNlSW5MaW5lKHJlZmVyZW5jZVsxXSwgc291cmNlLnVybCwgc291cmNlLmxpbmUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGZ1bmNzWycnICsgY3Vycl0pIHtcbiAgICAgICAgICAgICAgICByZWN1cnNpb24gPSB0cnVlO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgZnVuY3NbJycgKyBjdXJyXSA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHN0YWNrLnB1c2goaXRlbSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGVwdGgpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdkZXB0aCBpcyAnICsgZGVwdGgpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3N0YWNrIGlzICcgKyBzdGFjay5sZW5ndGgpO1xuICAgICAgICAgICAgc3RhY2suc3BsaWNlKDAsIGRlcHRoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByZXN1bHQgPSB7XG4gICAgICAgICAgICAnbmFtZSc6IGV4Lm5hbWUsXG4gICAgICAgICAgICAnbWVzc2FnZSc6IGV4Lm1lc3NhZ2UsXG4gICAgICAgICAgICAndXJsJzogZG9jdW1lbnQubG9jYXRpb24uaHJlZixcbiAgICAgICAgICAgICdzdGFjayc6IHN0YWNrXG4gICAgICAgIH07XG4gICAgICAgIGF1Z21lbnRTdGFja1RyYWNlV2l0aEluaXRpYWxFbGVtZW50KHJlc3VsdCwgZXguc291cmNlVVJMIHx8IGV4LmZpbGVOYW1lLCBleC5saW5lIHx8IGV4LmxpbmVOdW1iZXIsIGV4Lm1lc3NhZ2UgfHwgZXguZGVzY3JpcHRpb24pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbXB1dGVzIGEgc3RhY2sgdHJhY2UgZm9yIGFuIGV4Y2VwdGlvbi5cbiAgICAgKiBAcGFyYW0ge0Vycm9yfSBleFxuICAgICAqIEBwYXJhbSB7KHN0cmluZ3xudW1iZXIpPX0gZGVwdGhcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjb21wdXRlU3RhY2tUcmFjZShleCwgZGVwdGgpIHtcbiAgICAgICAgdmFyIHN0YWNrID0gbnVsbDtcbiAgICAgICAgZGVwdGggPSAoZGVwdGggPT0gbnVsbCA/IDAgOiArZGVwdGgpO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBUaGlzIG11c3QgYmUgdHJpZWQgZmlyc3QgYmVjYXVzZSBPcGVyYSAxMCAqZGVzdHJveXMqXG4gICAgICAgICAgICAvLyBpdHMgc3RhY2t0cmFjZSBwcm9wZXJ0eSBpZiB5b3UgdHJ5IHRvIGFjY2VzcyB0aGUgc3RhY2tcbiAgICAgICAgICAgIC8vIHByb3BlcnR5IGZpcnN0ISFcbiAgICAgICAgICAgIHN0YWNrID0gY29tcHV0ZVN0YWNrVHJhY2VGcm9tU3RhY2t0cmFjZVByb3AoZXgpO1xuICAgICAgICAgICAgaWYgKHN0YWNrKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YWNrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBpZiAoZGVidWcpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHN0YWNrID0gY29tcHV0ZVN0YWNrVHJhY2VGcm9tU3RhY2tQcm9wKGV4KTtcbiAgICAgICAgICAgIGlmIChzdGFjaykge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdGFjaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgaWYgKGRlYnVnKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzdGFjayA9IGNvbXB1dGVTdGFja1RyYWNlRnJvbU9wZXJhTXVsdGlMaW5lTWVzc2FnZShleCk7XG4gICAgICAgICAgICBpZiAoc3RhY2spIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhY2s7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGlmIChkZWJ1Zykge1xuICAgICAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgc3RhY2sgPSBjb21wdXRlU3RhY2tUcmFjZUJ5V2Fsa2luZ0NhbGxlckNoYWluKGV4LCBkZXB0aCArIDEpO1xuICAgICAgICAgICAgaWYgKHN0YWNrKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YWNrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBpZiAoZGVidWcpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH1cblxuICAgIGNvbXB1dGVTdGFja1RyYWNlLmF1Z21lbnRTdGFja1RyYWNlV2l0aEluaXRpYWxFbGVtZW50ID0gYXVnbWVudFN0YWNrVHJhY2VXaXRoSW5pdGlhbEVsZW1lbnQ7XG4gICAgY29tcHV0ZVN0YWNrVHJhY2UuY29tcHV0ZVN0YWNrVHJhY2VGcm9tU3RhY2tQcm9wID0gY29tcHV0ZVN0YWNrVHJhY2VGcm9tU3RhY2tQcm9wO1xuICAgIGNvbXB1dGVTdGFja1RyYWNlLmd1ZXNzRnVuY3Rpb25OYW1lID0gZ3Vlc3NGdW5jdGlvbk5hbWU7XG4gICAgY29tcHV0ZVN0YWNrVHJhY2UuZ2F0aGVyQ29udGV4dCA9IGdhdGhlckNvbnRleHQ7XG5cbiAgICByZXR1cm4gY29tcHV0ZVN0YWNrVHJhY2U7XG59KCkpO1xuXG4ndXNlIHN0cmljdCc7XG5cbi8vIEZpcnN0LCBjaGVjayBmb3IgSlNPTiBzdXBwb3J0XG4vLyBJZiB0aGVyZSBpcyBubyBKU09OLCB3ZSBuby1vcCB0aGUgY29yZSBmZWF0dXJlcyBvZiBSYXZlblxuLy8gc2luY2UgSlNPTiBpcyByZXF1aXJlZCB0byBlbmNvZGUgdGhlIHBheWxvYWRcbnZhciBfUmF2ZW4gPSB3aW5kb3cuUmF2ZW4sXG4gICAgaGFzSlNPTiA9ICEhKHR5cGVvZiBKU09OID09PSAnb2JqZWN0JyAmJiBKU09OLnN0cmluZ2lmeSksXG4gICAgbGFzdENhcHR1cmVkRXhjZXB0aW9uLFxuICAgIGxhc3RFdmVudElkLFxuICAgIGdsb2JhbFNlcnZlcixcbiAgICBnbG9iYWxVc2VyLFxuICAgIGdsb2JhbEtleSxcbiAgICBnbG9iYWxQcm9qZWN0LFxuICAgIGdsb2JhbE9wdGlvbnMgPSB7XG4gICAgICAgIGxvZ2dlcjogJ2phdmFzY3JpcHQnLFxuICAgICAgICBpZ25vcmVFcnJvcnM6IFtdLFxuICAgICAgICBpZ25vcmVVcmxzOiBbXSxcbiAgICAgICAgd2hpdGVsaXN0VXJsczogW10sXG4gICAgICAgIGluY2x1ZGVQYXRoczogW10sXG4gICAgICAgIGNvbGxlY3RXaW5kb3dFcnJvcnM6IHRydWUsXG4gICAgICAgIHRhZ3M6IHt9LFxuICAgICAgICBtYXhNZXNzYWdlTGVuZ3RoOiAxMDAsXG4gICAgICAgIGV4dHJhOiB7fVxuICAgIH0sXG4gICAgYXV0aFF1ZXJ5U3RyaW5nLFxuICAgIGlzUmF2ZW5JbnN0YWxsZWQgPSBmYWxzZSxcblxuICAgIG9iamVjdFByb3RvdHlwZSA9IE9iamVjdC5wcm90b3R5cGUsXG4gICAgc3RhcnRUaW1lID0gbm93KCk7XG5cbi8qXG4gKiBUaGUgY29yZSBSYXZlbiBzaW5nbGV0b25cbiAqXG4gKiBAdGhpcyB7UmF2ZW59XG4gKi9cbnZhciBSYXZlbiA9IHtcbiAgICBWRVJTSU9OOiAnMS4xLjE5JyxcblxuICAgIGRlYnVnOiB0cnVlLFxuXG4gICAgLypcbiAgICAgKiBBbGxvdyBtdWx0aXBsZSB2ZXJzaW9ucyBvZiBSYXZlbiB0byBiZSBpbnN0YWxsZWQuXG4gICAgICogU3RyaXAgUmF2ZW4gZnJvbSB0aGUgZ2xvYmFsIGNvbnRleHQgYW5kIHJldHVybnMgdGhlIGluc3RhbmNlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7UmF2ZW59XG4gICAgICovXG4gICAgbm9Db25mbGljdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHdpbmRvdy5SYXZlbiA9IF9SYXZlbjtcbiAgICAgICAgcmV0dXJuIFJhdmVuO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAqIENvbmZpZ3VyZSBSYXZlbiB3aXRoIGEgRFNOIGFuZCBleHRyYSBvcHRpb25zXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZHNuIFRoZSBwdWJsaWMgU2VudHJ5IERTTlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIE9wdGlvbmFsIHNldCBvZiBvZiBnbG9iYWwgb3B0aW9ucyBbb3B0aW9uYWxdXG4gICAgICogQHJldHVybiB7UmF2ZW59XG4gICAgICovXG4gICAgY29uZmlnOiBmdW5jdGlvbihkc24sIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKGdsb2JhbFNlcnZlcikge1xuICAgICAgICAgICAgbG9nRGVidWcoJ2Vycm9yJywgJ0Vycm9yOiBSYXZlbiBoYXMgYWxyZWFkeSBiZWVuIGNvbmZpZ3VyZWQnKTtcbiAgICAgICAgICAgIHJldHVybiBSYXZlbjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWRzbikgcmV0dXJuIFJhdmVuO1xuXG4gICAgICAgIHZhciB1cmkgPSBwYXJzZURTTihkc24pLFxuICAgICAgICAgICAgbGFzdFNsYXNoID0gdXJpLnBhdGgubGFzdEluZGV4T2YoJy8nKSxcbiAgICAgICAgICAgIHBhdGggPSB1cmkucGF0aC5zdWJzdHIoMSwgbGFzdFNsYXNoKTtcblxuICAgICAgICAvLyBtZXJnZSBpbiBvcHRpb25zXG4gICAgICAgIGlmIChvcHRpb25zKSB7XG4gICAgICAgICAgICBlYWNoKG9wdGlvbnMsIGZ1bmN0aW9uKGtleSwgdmFsdWUpe1xuICAgICAgICAgICAgICAgIGdsb2JhbE9wdGlvbnNba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBcIlNjcmlwdCBlcnJvci5cIiBpcyBoYXJkIGNvZGVkIGludG8gYnJvd3NlcnMgZm9yIGVycm9ycyB0aGF0IGl0IGNhbid0IHJlYWQuXG4gICAgICAgIC8vIHRoaXMgaXMgdGhlIHJlc3VsdCBvZiBhIHNjcmlwdCBiZWluZyBwdWxsZWQgaW4gZnJvbSBhbiBleHRlcm5hbCBkb21haW4gYW5kIENPUlMuXG4gICAgICAgIGdsb2JhbE9wdGlvbnMuaWdub3JlRXJyb3JzLnB1c2goL15TY3JpcHQgZXJyb3JcXC4/JC8pO1xuICAgICAgICBnbG9iYWxPcHRpb25zLmlnbm9yZUVycm9ycy5wdXNoKC9eSmF2YXNjcmlwdCBlcnJvcjogU2NyaXB0IGVycm9yXFwuPyBvbiBsaW5lIDAkLyk7XG5cbiAgICAgICAgLy8gam9pbiByZWdleHAgcnVsZXMgaW50byBvbmUgYmlnIHJ1bGVcbiAgICAgICAgZ2xvYmFsT3B0aW9ucy5pZ25vcmVFcnJvcnMgPSBqb2luUmVnRXhwKGdsb2JhbE9wdGlvbnMuaWdub3JlRXJyb3JzKTtcbiAgICAgICAgZ2xvYmFsT3B0aW9ucy5pZ25vcmVVcmxzID0gZ2xvYmFsT3B0aW9ucy5pZ25vcmVVcmxzLmxlbmd0aCA/IGpvaW5SZWdFeHAoZ2xvYmFsT3B0aW9ucy5pZ25vcmVVcmxzKSA6IGZhbHNlO1xuICAgICAgICBnbG9iYWxPcHRpb25zLndoaXRlbGlzdFVybHMgPSBnbG9iYWxPcHRpb25zLndoaXRlbGlzdFVybHMubGVuZ3RoID8gam9pblJlZ0V4cChnbG9iYWxPcHRpb25zLndoaXRlbGlzdFVybHMpIDogZmFsc2U7XG4gICAgICAgIGdsb2JhbE9wdGlvbnMuaW5jbHVkZVBhdGhzID0gam9pblJlZ0V4cChnbG9iYWxPcHRpb25zLmluY2x1ZGVQYXRocyk7XG5cbiAgICAgICAgZ2xvYmFsS2V5ID0gdXJpLnVzZXI7XG4gICAgICAgIGdsb2JhbFByb2plY3QgPSB1cmkucGF0aC5zdWJzdHIobGFzdFNsYXNoICsgMSk7XG5cbiAgICAgICAgLy8gYXNzZW1ibGUgdGhlIGVuZHBvaW50IGZyb20gdGhlIHVyaSBwaWVjZXNcbiAgICAgICAgZ2xvYmFsU2VydmVyID0gJy8vJyArIHVyaS5ob3N0ICtcbiAgICAgICAgICAgICAgICAgICAgICAodXJpLnBvcnQgPyAnOicgKyB1cmkucG9ydCA6ICcnKSArXG4gICAgICAgICAgICAgICAgICAgICAgJy8nICsgcGF0aCArICdhcGkvJyArIGdsb2JhbFByb2plY3QgKyAnL3N0b3JlLyc7XG5cbiAgICAgICAgaWYgKHVyaS5wcm90b2NvbCkge1xuICAgICAgICAgICAgZ2xvYmFsU2VydmVyID0gdXJpLnByb3RvY29sICsgJzonICsgZ2xvYmFsU2VydmVyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGdsb2JhbE9wdGlvbnMuZmV0Y2hDb250ZXh0KSB7XG4gICAgICAgICAgICBUcmFjZUtpdC5yZW1vdGVGZXRjaGluZyA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZ2xvYmFsT3B0aW9ucy5saW5lc09mQ29udGV4dCkge1xuICAgICAgICAgICAgVHJhY2VLaXQubGluZXNPZkNvbnRleHQgPSBnbG9iYWxPcHRpb25zLmxpbmVzT2ZDb250ZXh0O1xuICAgICAgICB9XG5cbiAgICAgICAgVHJhY2VLaXQuY29sbGVjdFdpbmRvd0Vycm9ycyA9ICEhZ2xvYmFsT3B0aW9ucy5jb2xsZWN0V2luZG93RXJyb3JzO1xuXG4gICAgICAgIHNldEF1dGhRdWVyeVN0cmluZygpO1xuXG4gICAgICAgIC8vIHJldHVybiBmb3IgY2hhaW5pbmdcbiAgICAgICAgcmV0dXJuIFJhdmVuO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAqIEluc3RhbGxzIGEgZ2xvYmFsIHdpbmRvdy5vbmVycm9yIGVycm9yIGhhbmRsZXJcbiAgICAgKiB0byBjYXB0dXJlIGFuZCByZXBvcnQgdW5jYXVnaHQgZXhjZXB0aW9ucy5cbiAgICAgKiBBdCB0aGlzIHBvaW50LCBpbnN0YWxsKCkgaXMgcmVxdWlyZWQgdG8gYmUgY2FsbGVkIGR1ZVxuICAgICAqIHRvIHRoZSB3YXkgVHJhY2VLaXQgaXMgc2V0IHVwLlxuICAgICAqXG4gICAgICogQHJldHVybiB7UmF2ZW59XG4gICAgICovXG4gICAgaW5zdGFsbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChpc1NldHVwKCkgJiYgIWlzUmF2ZW5JbnN0YWxsZWQpIHtcbiAgICAgICAgICAgIFRyYWNlS2l0LnJlcG9ydC5zdWJzY3JpYmUoaGFuZGxlU3RhY2tJbmZvKTtcbiAgICAgICAgICAgIGlzUmF2ZW5JbnN0YWxsZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFJhdmVuO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAqIFdyYXAgY29kZSB3aXRoaW4gYSBjb250ZXh0IHNvIFJhdmVuIGNhbiBjYXB0dXJlIGVycm9yc1xuICAgICAqIHJlbGlhYmx5IGFjcm9zcyBkb21haW5zIHRoYXQgaXMgZXhlY3V0ZWQgaW1tZWRpYXRlbHkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyBBIHNwZWNpZmljIHNldCBvZiBvcHRpb25zIGZvciB0aGlzIGNvbnRleHQgW29wdGlvbmFsXVxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmMgVGhlIGNhbGxiYWNrIHRvIGJlIGltbWVkaWF0ZWx5IGV4ZWN1dGVkIHdpdGhpbiB0aGUgY29udGV4dFxuICAgICAqIEBwYXJhbSB7YXJyYXl9IGFyZ3MgQW4gYXJyYXkgb2YgYXJndW1lbnRzIHRvIGJlIGNhbGxlZCB3aXRoIHRoZSBjYWxsYmFjayBbb3B0aW9uYWxdXG4gICAgICovXG4gICAgY29udGV4dDogZnVuY3Rpb24ob3B0aW9ucywgZnVuYywgYXJncykge1xuICAgICAgICBpZiAoaXNGdW5jdGlvbihvcHRpb25zKSkge1xuICAgICAgICAgICAgYXJncyA9IGZ1bmMgfHwgW107XG4gICAgICAgICAgICBmdW5jID0gb3B0aW9ucztcbiAgICAgICAgICAgIG9wdGlvbnMgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUmF2ZW4ud3JhcChvcHRpb25zLCBmdW5jKS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBXcmFwIGNvZGUgd2l0aGluIGEgY29udGV4dCBhbmQgcmV0dXJucyBiYWNrIGEgbmV3IGZ1bmN0aW9uIHRvIGJlIGV4ZWN1dGVkXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyBBIHNwZWNpZmljIHNldCBvZiBvcHRpb25zIGZvciB0aGlzIGNvbnRleHQgW29wdGlvbmFsXVxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGJlIHdyYXBwZWQgaW4gYSBuZXcgY29udGV4dFxuICAgICAqIEByZXR1cm4ge2Z1bmN0aW9ufSBUaGUgbmV3bHkgd3JhcHBlZCBmdW5jdGlvbnMgd2l0aCBhIGNvbnRleHRcbiAgICAgKi9cbiAgICB3cmFwOiBmdW5jdGlvbihvcHRpb25zLCBmdW5jKSB7XG4gICAgICAgIC8vIDEgYXJndW1lbnQgaGFzIGJlZW4gcGFzc2VkLCBhbmQgaXQncyBub3QgYSBmdW5jdGlvblxuICAgICAgICAvLyBzbyBqdXN0IHJldHVybiBpdFxuICAgICAgICBpZiAoaXNVbmRlZmluZWQoZnVuYykgJiYgIWlzRnVuY3Rpb24ob3B0aW9ucykpIHtcbiAgICAgICAgICAgIHJldHVybiBvcHRpb25zO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gb3B0aW9ucyBpcyBvcHRpb25hbFxuICAgICAgICBpZiAoaXNGdW5jdGlvbihvcHRpb25zKSkge1xuICAgICAgICAgICAgZnVuYyA9IG9wdGlvbnM7XG4gICAgICAgICAgICBvcHRpb25zID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQXQgdGhpcyBwb2ludCwgd2UndmUgcGFzc2VkIGFsb25nIDIgYXJndW1lbnRzLCBhbmQgdGhlIHNlY29uZCBvbmVcbiAgICAgICAgLy8gaXMgbm90IGEgZnVuY3Rpb24gZWl0aGVyLCBzbyB3ZSdsbCBqdXN0IHJldHVybiB0aGUgc2Vjb25kIGFyZ3VtZW50LlxuICAgICAgICBpZiAoIWlzRnVuY3Rpb24oZnVuYykpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2UgZG9uJ3Qgd2FubmEgd3JhcCBpdCB0d2ljZSFcbiAgICAgICAgaWYgKGZ1bmMuX19yYXZlbl9fKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuYztcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHdyYXBwZWQoKSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IFtdLCBpID0gYXJndW1lbnRzLmxlbmd0aCxcbiAgICAgICAgICAgICAgICBkZWVwID0gIW9wdGlvbnMgfHwgb3B0aW9ucyAmJiBvcHRpb25zLmRlZXAgIT09IGZhbHNlO1xuICAgICAgICAgICAgLy8gUmVjdXJzaXZlbHkgd3JhcCBhbGwgb2YgYSBmdW5jdGlvbidzIGFyZ3VtZW50cyB0aGF0IGFyZVxuICAgICAgICAgICAgLy8gZnVuY3Rpb25zIHRoZW1zZWx2ZXMuXG5cbiAgICAgICAgICAgIHdoaWxlKGktLSkgYXJnc1tpXSA9IGRlZXAgPyBSYXZlbi53cmFwKG9wdGlvbnMsIGFyZ3VtZW50c1tpXSkgOiBhcmd1bWVudHNbaV07XG5cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgLypqc2hpbnQgLVcwNDAqL1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICAgICAgUmF2ZW4uY2FwdHVyZUV4Y2VwdGlvbihlLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29weSBvdmVyIHByb3BlcnRpZXMgb2YgdGhlIG9sZCBmdW5jdGlvblxuICAgICAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiBmdW5jKSB7XG4gICAgICAgICAgICBpZiAoaGFzS2V5KGZ1bmMsIHByb3BlcnR5KSkge1xuICAgICAgICAgICAgICAgIHdyYXBwZWRbcHJvcGVydHldID0gZnVuY1twcm9wZXJ0eV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTaWduYWwgdGhhdCB0aGlzIGZ1bmN0aW9uIGhhcyBiZWVuIHdyYXBwZWQgYWxyZWFkeVxuICAgICAgICAvLyBmb3IgYm90aCBkZWJ1Z2dpbmcgYW5kIHRvIHByZXZlbnQgaXQgdG8gYmVpbmcgd3JhcHBlZCB0d2ljZVxuICAgICAgICB3cmFwcGVkLl9fcmF2ZW5fXyA9IHRydWU7XG4gICAgICAgIHdyYXBwZWQuX19pbm5lcl9fID0gZnVuYztcblxuICAgICAgICByZXR1cm4gd3JhcHBlZDtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBVbmluc3RhbGxzIHRoZSBnbG9iYWwgZXJyb3IgaGFuZGxlci5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1JhdmVufVxuICAgICAqL1xuICAgIHVuaW5zdGFsbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIFRyYWNlS2l0LnJlcG9ydC51bmluc3RhbGwoKTtcbiAgICAgICAgaXNSYXZlbkluc3RhbGxlZCA9IGZhbHNlO1xuXG4gICAgICAgIHJldHVybiBSYXZlbjtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBNYW51YWxseSBjYXB0dXJlIGFuIGV4Y2VwdGlvbiBhbmQgc2VuZCBpdCBvdmVyIHRvIFNlbnRyeVxuICAgICAqXG4gICAgICogQHBhcmFtIHtlcnJvcn0gZXggQW4gZXhjZXB0aW9uIHRvIGJlIGxvZ2dlZFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIEEgc3BlY2lmaWMgc2V0IG9mIG9wdGlvbnMgZm9yIHRoaXMgZXJyb3IgW29wdGlvbmFsXVxuICAgICAqIEByZXR1cm4ge1JhdmVufVxuICAgICAqL1xuICAgIGNhcHR1cmVFeGNlcHRpb246IGZ1bmN0aW9uKGV4LCBvcHRpb25zKSB7XG4gICAgICAgIC8vIElmIG5vdCBhbiBFcnJvciBpcyBwYXNzZWQgdGhyb3VnaCwgcmVjYWxsIGFzIGEgbWVzc2FnZSBpbnN0ZWFkXG4gICAgICAgIGlmICghaXNFcnJvcihleCkpIHJldHVybiBSYXZlbi5jYXB0dXJlTWVzc2FnZShleCwgb3B0aW9ucyk7XG5cbiAgICAgICAgLy8gU3RvcmUgdGhlIHJhdyBleGNlcHRpb24gb2JqZWN0IGZvciBwb3RlbnRpYWwgZGVidWdnaW5nIGFuZCBpbnRyb3NwZWN0aW9uXG4gICAgICAgIGxhc3RDYXB0dXJlZEV4Y2VwdGlvbiA9IGV4O1xuXG4gICAgICAgIC8vIFRyYWNlS2l0LnJlcG9ydCB3aWxsIHJlLXJhaXNlIGFueSBleGNlcHRpb24gcGFzc2VkIHRvIGl0LFxuICAgICAgICAvLyB3aGljaCBtZWFucyB5b3UgaGF2ZSB0byB3cmFwIGl0IGluIHRyeS9jYXRjaC4gSW5zdGVhZCwgd2VcbiAgICAgICAgLy8gY2FuIHdyYXAgaXQgaGVyZSBhbmQgb25seSByZS1yYWlzZSBpZiBUcmFjZUtpdC5yZXBvcnRcbiAgICAgICAgLy8gcmFpc2VzIGFuIGV4Y2VwdGlvbiBkaWZmZXJlbnQgZnJvbSB0aGUgb25lIHdlIGFza2VkIHRvXG4gICAgICAgIC8vIHJlcG9ydCBvbi5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIFRyYWNlS2l0LnJlcG9ydChleCwgb3B0aW9ucyk7XG4gICAgICAgIH0gY2F0Y2goZXgxKSB7XG4gICAgICAgICAgICBpZihleCAhPT0gZXgxKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXgxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFJhdmVuO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAqIE1hbnVhbGx5IHNlbmQgYSBtZXNzYWdlIHRvIFNlbnRyeVxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1zZyBBIHBsYWluIG1lc3NhZ2UgdG8gYmUgY2FwdHVyZWQgaW4gU2VudHJ5XG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgQSBzcGVjaWZpYyBzZXQgb2Ygb3B0aW9ucyBmb3IgdGhpcyBtZXNzYWdlIFtvcHRpb25hbF1cbiAgICAgKiBAcmV0dXJuIHtSYXZlbn1cbiAgICAgKi9cbiAgICBjYXB0dXJlTWVzc2FnZTogZnVuY3Rpb24obXNnLCBvcHRpb25zKSB7XG4gICAgICAgIC8vIGNvbmZpZygpIGF1dG9tYWdpY2FsbHkgY29udmVydHMgaWdub3JlRXJyb3JzIGZyb20gYSBsaXN0IHRvIGEgUmVnRXhwIHNvIHdlIG5lZWQgdG8gdGVzdCBmb3IgYW5cbiAgICAgICAgLy8gZWFybHkgY2FsbDsgd2UnbGwgZXJyb3Igb24gdGhlIHNpZGUgb2YgbG9nZ2luZyBhbnl0aGluZyBjYWxsZWQgYmVmb3JlIGNvbmZpZ3VyYXRpb24gc2luY2UgaXQnc1xuICAgICAgICAvLyBwcm9iYWJseSBzb21ldGhpbmcgeW91IHNob3VsZCBzZWU6XG4gICAgICAgIGlmICghIWdsb2JhbE9wdGlvbnMuaWdub3JlRXJyb3JzLnRlc3QgJiYgZ2xvYmFsT3B0aW9ucy5pZ25vcmVFcnJvcnMudGVzdChtc2cpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBGaXJlIGF3YXkhXG4gICAgICAgIHNlbmQoXG4gICAgICAgICAgICBvYmplY3RNZXJnZSh7XG4gICAgICAgICAgICAgICAgbWVzc2FnZTogbXNnICsgJycgIC8vIE1ha2Ugc3VyZSBpdCdzIGFjdHVhbGx5IGEgc3RyaW5nXG4gICAgICAgICAgICB9LCBvcHRpb25zKVxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiBSYXZlbjtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBTZXQvY2xlYXIgYSB1c2VyIHRvIGJlIHNlbnQgYWxvbmcgd2l0aCB0aGUgcGF5bG9hZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSB1c2VyIEFuIG9iamVjdCByZXByZXNlbnRpbmcgdXNlciBkYXRhIFtvcHRpb25hbF1cbiAgICAgKiBAcmV0dXJuIHtSYXZlbn1cbiAgICAgKi9cbiAgICBzZXRVc2VyQ29udGV4dDogZnVuY3Rpb24odXNlcikge1xuICAgICAgICBnbG9iYWxVc2VyID0gdXNlcjtcblxuICAgICAgICByZXR1cm4gUmF2ZW47XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogU2V0IGV4dHJhIGF0dHJpYnV0ZXMgdG8gYmUgc2VudCBhbG9uZyB3aXRoIHRoZSBwYXlsb2FkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGV4dHJhIEFuIG9iamVjdCByZXByZXNlbnRpbmcgZXh0cmEgZGF0YSBbb3B0aW9uYWxdXG4gICAgICogQHJldHVybiB7UmF2ZW59XG4gICAgICovXG4gICAgc2V0RXh0cmFDb250ZXh0OiBmdW5jdGlvbihleHRyYSkge1xuICAgICAgICBnbG9iYWxPcHRpb25zLmV4dHJhID0gZXh0cmEgfHwge307XG5cbiAgICAgICAgcmV0dXJuIFJhdmVuO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAqIFNldCB0YWdzIHRvIGJlIHNlbnQgYWxvbmcgd2l0aCB0aGUgcGF5bG9hZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSB0YWdzIEFuIG9iamVjdCByZXByZXNlbnRpbmcgdGFncyBbb3B0aW9uYWxdXG4gICAgICogQHJldHVybiB7UmF2ZW59XG4gICAgICovXG4gICAgc2V0VGFnc0NvbnRleHQ6IGZ1bmN0aW9uKHRhZ3MpIHtcbiAgICAgICAgZ2xvYmFsT3B0aW9ucy50YWdzID0gdGFncyB8fCB7fTtcblxuICAgICAgICByZXR1cm4gUmF2ZW47XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogU2V0IHJlbGVhc2UgdmVyc2lvbiBvZiBhcHBsaWNhdGlvblxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHJlbGVhc2UgVHlwaWNhbGx5IHNvbWV0aGluZyBsaWtlIGEgZ2l0IFNIQSB0byBpZGVudGlmeSB2ZXJzaW9uXG4gICAgICogQHJldHVybiB7UmF2ZW59XG4gICAgICovXG4gICAgc2V0UmVsZWFzZUNvbnRleHQ6IGZ1bmN0aW9uKHJlbGVhc2UpIHtcbiAgICAgICAgZ2xvYmFsT3B0aW9ucy5yZWxlYXNlID0gcmVsZWFzZTtcblxuICAgICAgICByZXR1cm4gUmF2ZW47XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogU2V0IHRoZSBkYXRhQ2FsbGJhY2sgb3B0aW9uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgY2FsbGJhY2sgdG8gcnVuIHdoaWNoIGFsbG93cyB0aGVcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhIGJsb2IgdG8gYmUgbXV0YXRlZCBiZWZvcmUgc2VuZGluZ1xuICAgICAqIEByZXR1cm4ge1JhdmVufVxuICAgICAqL1xuICAgIHNldERhdGFDYWxsYmFjazogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgICAgZ2xvYmFsT3B0aW9ucy5kYXRhQ2FsbGJhY2sgPSBjYWxsYmFjaztcblxuICAgICAgICByZXR1cm4gUmF2ZW47XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogU2V0IHRoZSBzaG91bGRTZW5kQ2FsbGJhY2sgb3B0aW9uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgY2FsbGJhY2sgdG8gcnVuIHdoaWNoIGFsbG93c1xuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludHJvc3BlY3RpbmcgdGhlIGJsb2IgYmVmb3JlIHNlbmRpbmdcbiAgICAgKiBAcmV0dXJuIHtSYXZlbn1cbiAgICAgKi9cbiAgICBzZXRTaG91bGRTZW5kQ2FsbGJhY2s6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgIGdsb2JhbE9wdGlvbnMuc2hvdWxkU2VuZENhbGxiYWNrID0gY2FsbGJhY2s7XG5cbiAgICAgICAgcmV0dXJuIFJhdmVuO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAqIEdldCB0aGUgbGF0ZXN0IHJhdyBleGNlcHRpb24gdGhhdCB3YXMgY2FwdHVyZWQgYnkgUmF2ZW4uXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtlcnJvcn1cbiAgICAgKi9cbiAgICBsYXN0RXhjZXB0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGxhc3RDYXB0dXJlZEV4Y2VwdGlvbjtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBHZXQgdGhlIGxhc3QgZXZlbnQgaWRcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKi9cbiAgICBsYXN0RXZlbnRJZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBsYXN0RXZlbnRJZDtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBEZXRlcm1pbmUgaWYgUmF2ZW4gaXMgc2V0dXAgYW5kIHJlYWR5IHRvIGdvLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBpc1NldHVwOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGlzU2V0dXAoKTtcbiAgICB9XG59O1xuXG5SYXZlbi5zZXRVc2VyID0gUmF2ZW4uc2V0VXNlckNvbnRleHQ7IC8vIFRvIGJlIGRlcHJlY2F0ZWRcblxuZnVuY3Rpb24gdHJpZ2dlckV2ZW50KGV2ZW50VHlwZSwgb3B0aW9ucykge1xuICAgIHZhciBldmVudCwga2V5O1xuXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICBldmVudFR5cGUgPSAncmF2ZW4nICsgZXZlbnRUeXBlLnN1YnN0cigwLDEpLnRvVXBwZXJDYXNlKCkgKyBldmVudFR5cGUuc3Vic3RyKDEpO1xuXG4gICAgaWYgKGRvY3VtZW50LmNyZWF0ZUV2ZW50KSB7XG4gICAgICAgIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0hUTUxFdmVudHMnKTtcbiAgICAgICAgZXZlbnQuaW5pdEV2ZW50KGV2ZW50VHlwZSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudE9iamVjdCgpO1xuICAgICAgICBldmVudC5ldmVudFR5cGUgPSBldmVudFR5cGU7XG4gICAgfVxuXG4gICAgZm9yIChrZXkgaW4gb3B0aW9ucykgaWYgKGhhc0tleShvcHRpb25zLCBrZXkpKSB7XG4gICAgICAgIGV2ZW50W2tleV0gPSBvcHRpb25zW2tleV07XG4gICAgfVxuXG4gICAgaWYgKGRvY3VtZW50LmNyZWF0ZUV2ZW50KSB7XG4gICAgICAgIC8vIElFOSBpZiBzdGFuZGFyZHNcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gSUU4IHJlZ2FyZGxlc3Mgb2YgUXVpcmtzIG9yIFN0YW5kYXJkc1xuICAgICAgICAvLyBJRTkgaWYgcXVpcmtzXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBkb2N1bWVudC5maXJlRXZlbnQoJ29uJyArIGV2ZW50LmV2ZW50VHlwZS50b0xvd2VyQ2FzZSgpLCBldmVudCk7XG4gICAgICAgIH0gY2F0Y2goZSkge31cbiAgICB9XG59XG5cbnZhciBkc25LZXlzID0gJ3NvdXJjZSBwcm90b2NvbCB1c2VyIHBhc3MgaG9zdCBwb3J0IHBhdGgnLnNwbGl0KCcgJyksXG4gICAgZHNuUGF0dGVybiA9IC9eKD86KFxcdyspOik/XFwvXFwvKFxcdyspKDpcXHcrKT9AKFtcXHdcXC4tXSspKD86OihcXGQrKSk/KFxcLy4qKS87XG5cbmZ1bmN0aW9uIFJhdmVuQ29uZmlnRXJyb3IobWVzc2FnZSkge1xuICAgIHRoaXMubmFtZSA9ICdSYXZlbkNvbmZpZ0Vycm9yJztcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xufVxuUmF2ZW5Db25maWdFcnJvci5wcm90b3R5cGUgPSBuZXcgRXJyb3IoKTtcblJhdmVuQ29uZmlnRXJyb3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUmF2ZW5Db25maWdFcnJvcjtcblxuLyoqKiogUHJpdmF0ZSBmdW5jdGlvbnMgKioqKi9cbmZ1bmN0aW9uIHBhcnNlRFNOKHN0cikge1xuICAgIHZhciBtID0gZHNuUGF0dGVybi5leGVjKHN0ciksXG4gICAgICAgIGRzbiA9IHt9LFxuICAgICAgICBpID0gNztcblxuICAgIHRyeSB7XG4gICAgICAgIHdoaWxlIChpLS0pIGRzbltkc25LZXlzW2ldXSA9IG1baV0gfHwgJyc7XG4gICAgfSBjYXRjaChlKSB7XG4gICAgICAgIHRocm93IG5ldyBSYXZlbkNvbmZpZ0Vycm9yKCdJbnZhbGlkIERTTjogJyArIHN0cik7XG4gICAgfVxuXG4gICAgaWYgKGRzbi5wYXNzKVxuICAgICAgICB0aHJvdyBuZXcgUmF2ZW5Db25maWdFcnJvcignRG8gbm90IHNwZWNpZnkgeW91ciBwcml2YXRlIGtleSBpbiB0aGUgRFNOIScpO1xuXG4gICAgcmV0dXJuIGRzbjtcbn1cblxuZnVuY3Rpb24gaXNVbmRlZmluZWQod2hhdCkge1xuICAgIHJldHVybiB3aGF0ID09PSB2b2lkIDA7XG59XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24od2hhdCkge1xuICAgIHJldHVybiB0eXBlb2Ygd2hhdCA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZnVuY3Rpb24gaXNTdHJpbmcod2hhdCkge1xuICAgIHJldHVybiBvYmplY3RQcm90b3R5cGUudG9TdHJpbmcuY2FsbCh3aGF0KSA9PT0gJ1tvYmplY3QgU3RyaW5nXSc7XG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KHdoYXQpIHtcbiAgICByZXR1cm4gdHlwZW9mIHdoYXQgPT09ICdvYmplY3QnICYmIHdoYXQgIT09IG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzRW1wdHlPYmplY3Qod2hhdCkge1xuICAgIGZvciAodmFyIGsgaW4gd2hhdCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiB0cnVlO1xufVxuXG4vLyBTb3J0YSB5YW5rZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vam95ZW50L25vZGUvYmxvYi9hYTNiNGI0L2xpYi91dGlsLmpzI0w1NjBcbi8vIHdpdGggc29tZSB0aW55IG1vZGlmaWNhdGlvbnNcbmZ1bmN0aW9uIGlzRXJyb3Iod2hhdCkge1xuICAgIHJldHVybiBpc09iamVjdCh3aGF0KSAmJlxuICAgICAgICBvYmplY3RQcm90b3R5cGUudG9TdHJpbmcuY2FsbCh3aGF0KSA9PT0gJ1tvYmplY3QgRXJyb3JdJyB8fFxuICAgICAgICB3aGF0IGluc3RhbmNlb2YgRXJyb3I7XG59XG5cbi8qKlxuICogaGFzS2V5LCBhIGJldHRlciBmb3JtIG9mIGhhc093blByb3BlcnR5XG4gKiBFeGFtcGxlOiBoYXNLZXkoTWFpbkhvc3RPYmplY3QsIHByb3BlcnR5KSA9PT0gdHJ1ZS9mYWxzZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBob3N0IG9iamVjdCB0byBjaGVjayBwcm9wZXJ0eVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSB0byBjaGVja1xuICovXG5mdW5jdGlvbiBoYXNLZXkob2JqZWN0LCBrZXkpIHtcbiAgICByZXR1cm4gb2JqZWN0UHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpO1xufVxuXG5mdW5jdGlvbiBlYWNoKG9iaiwgY2FsbGJhY2spIHtcbiAgICB2YXIgaSwgajtcblxuICAgIGlmIChpc1VuZGVmaW5lZChvYmoubGVuZ3RoKSkge1xuICAgICAgICBmb3IgKGkgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZiAoaGFzS2V5KG9iaiwgaSkpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKG51bGwsIGksIG9ialtpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBqID0gb2JqLmxlbmd0aDtcbiAgICAgICAgaWYgKGopIHtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBqOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKG51bGwsIGksIG9ialtpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuZnVuY3Rpb24gc2V0QXV0aFF1ZXJ5U3RyaW5nKCkge1xuICAgIGF1dGhRdWVyeVN0cmluZyA9XG4gICAgICAgICc/c2VudHJ5X3ZlcnNpb249NCcgK1xuICAgICAgICAnJnNlbnRyeV9jbGllbnQ9cmF2ZW4tanMvJyArIFJhdmVuLlZFUlNJT04gK1xuICAgICAgICAnJnNlbnRyeV9rZXk9JyArIGdsb2JhbEtleTtcbn1cblxuXG5mdW5jdGlvbiBoYW5kbGVTdGFja0luZm8oc3RhY2tJbmZvLCBvcHRpb25zKSB7XG4gICAgdmFyIGZyYW1lcyA9IFtdO1xuXG4gICAgaWYgKHN0YWNrSW5mby5zdGFjayAmJiBzdGFja0luZm8uc3RhY2subGVuZ3RoKSB7XG4gICAgICAgIGVhY2goc3RhY2tJbmZvLnN0YWNrLCBmdW5jdGlvbihpLCBzdGFjaykge1xuICAgICAgICAgICAgdmFyIGZyYW1lID0gbm9ybWFsaXplRnJhbWUoc3RhY2spO1xuICAgICAgICAgICAgaWYgKGZyYW1lKSB7XG4gICAgICAgICAgICAgICAgZnJhbWVzLnB1c2goZnJhbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB0cmlnZ2VyRXZlbnQoJ2hhbmRsZScsIHtcbiAgICAgICAgc3RhY2tJbmZvOiBzdGFja0luZm8sXG4gICAgICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgICB9KTtcblxuICAgIHByb2Nlc3NFeGNlcHRpb24oXG4gICAgICAgIHN0YWNrSW5mby5uYW1lLFxuICAgICAgICBzdGFja0luZm8ubWVzc2FnZSxcbiAgICAgICAgc3RhY2tJbmZvLnVybCxcbiAgICAgICAgc3RhY2tJbmZvLmxpbmVubyxcbiAgICAgICAgZnJhbWVzLFxuICAgICAgICBvcHRpb25zXG4gICAgKTtcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplRnJhbWUoZnJhbWUpIHtcbiAgICBpZiAoIWZyYW1lLnVybCkgcmV0dXJuO1xuXG4gICAgLy8gbm9ybWFsaXplIHRoZSBmcmFtZXMgZGF0YVxuICAgIHZhciBub3JtYWxpemVkID0ge1xuICAgICAgICBmaWxlbmFtZTogICBmcmFtZS51cmwsXG4gICAgICAgIGxpbmVubzogICAgIGZyYW1lLmxpbmUsXG4gICAgICAgIGNvbG5vOiAgICAgIGZyYW1lLmNvbHVtbixcbiAgICAgICAgJ2Z1bmN0aW9uJzogZnJhbWUuZnVuYyB8fCAnPydcbiAgICB9LCBjb250ZXh0ID0gZXh0cmFjdENvbnRleHRGcm9tRnJhbWUoZnJhbWUpLCBpO1xuXG4gICAgaWYgKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIGtleXMgPSBbJ3ByZV9jb250ZXh0JywgJ2NvbnRleHRfbGluZScsICdwb3N0X2NvbnRleHQnXTtcbiAgICAgICAgaSA9IDM7XG4gICAgICAgIHdoaWxlIChpLS0pIG5vcm1hbGl6ZWRba2V5c1tpXV0gPSBjb250ZXh0W2ldO1xuICAgIH1cblxuICAgIG5vcm1hbGl6ZWQuaW5fYXBwID0gISggLy8gZGV0ZXJtaW5lIGlmIGFuIGV4Y2VwdGlvbiBjYW1lIGZyb20gb3V0c2lkZSBvZiBvdXIgYXBwXG4gICAgICAgIC8vIGZpcnN0IHdlIGNoZWNrIHRoZSBnbG9iYWwgaW5jbHVkZVBhdGhzIGxpc3QuXG4gICAgICAgICFnbG9iYWxPcHRpb25zLmluY2x1ZGVQYXRocy50ZXN0KG5vcm1hbGl6ZWQuZmlsZW5hbWUpIHx8XG4gICAgICAgIC8vIE5vdyB3ZSBjaGVjayBmb3IgZnVuLCBpZiB0aGUgZnVuY3Rpb24gbmFtZSBpcyBSYXZlbiBvciBUcmFjZUtpdFxuICAgICAgICAvKFJhdmVufFRyYWNlS2l0KVxcLi8udGVzdChub3JtYWxpemVkWydmdW5jdGlvbiddKSB8fFxuICAgICAgICAvLyBmaW5hbGx5LCB3ZSBkbyBhIGxhc3QgZGl0Y2ggZWZmb3J0IGFuZCBjaGVjayBmb3IgcmF2ZW4ubWluLmpzXG4gICAgICAgIC9yYXZlblxcLihtaW5cXC4pP2pzJC8udGVzdChub3JtYWxpemVkLmZpbGVuYW1lKVxuICAgICk7XG5cbiAgICByZXR1cm4gbm9ybWFsaXplZDtcbn1cblxuZnVuY3Rpb24gZXh0cmFjdENvbnRleHRGcm9tRnJhbWUoZnJhbWUpIHtcbiAgICAvLyBpbW1lZGlhdGVseSBjaGVjayBpZiB3ZSBzaG91bGQgZXZlbiBhdHRlbXB0IHRvIHBhcnNlIGEgY29udGV4dFxuICAgIGlmICghZnJhbWUuY29udGV4dCB8fCAhZ2xvYmFsT3B0aW9ucy5mZXRjaENvbnRleHQpIHJldHVybjtcblxuICAgIHZhciBjb250ZXh0ID0gZnJhbWUuY29udGV4dCxcbiAgICAgICAgcGl2b3QgPSB+fihjb250ZXh0Lmxlbmd0aCAvIDIpLFxuICAgICAgICBpID0gY29udGV4dC5sZW5ndGgsIGlzTWluaWZpZWQgPSBmYWxzZTtcblxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgLy8gV2UncmUgbWFraW5nIGEgZ3Vlc3MgdG8gc2VlIGlmIHRoZSBzb3VyY2UgaXMgbWluaWZpZWQgb3Igbm90LlxuICAgICAgICAvLyBUbyBkbyB0aGF0LCB3ZSBtYWtlIHRoZSBhc3N1bXB0aW9uIGlmICphbnkqIG9mIHRoZSBsaW5lcyBwYXNzZWRcbiAgICAgICAgLy8gaW4gYXJlIGdyZWF0ZXIgdGhhbiAzMDAgY2hhcmFjdGVycyBsb25nLCB3ZSBiYWlsLlxuICAgICAgICAvLyBTZW50cnkgd2lsbCBzZWUgdGhhdCB0aGVyZSBpc24ndCBhIGNvbnRleHRcbiAgICAgICAgaWYgKGNvbnRleHRbaV0ubGVuZ3RoID4gMzAwKSB7XG4gICAgICAgICAgICBpc01pbmlmaWVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGlzTWluaWZpZWQpIHtcbiAgICAgICAgLy8gVGhlIHNvdXJjZSBpcyBtaW5pZmllZCBhbmQgd2UgZG9uJ3Qga25vdyB3aGljaCBjb2x1bW4uIEZ1Y2sgaXQuXG4gICAgICAgIGlmIChpc1VuZGVmaW5lZChmcmFtZS5jb2x1bW4pKSByZXR1cm47XG5cbiAgICAgICAgLy8gSWYgdGhlIHNvdXJjZSBpcyBtaW5pZmllZCBhbmQgaGFzIGEgZnJhbWUgY29sdW1uXG4gICAgICAgIC8vIHdlIHRha2UgYSBjaHVuayBvZiB0aGUgb2ZmZW5kaW5nIGxpbmUgdG8gaG9wZWZ1bGx5IHNoZWQgc29tZSBsaWdodFxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgW10sICAvLyBubyBwcmVfY29udGV4dFxuICAgICAgICAgICAgY29udGV4dFtwaXZvdF0uc3Vic3RyKGZyYW1lLmNvbHVtbiwgNTApLCAvLyBncmFiIDUwIGNoYXJhY3RlcnMsIHN0YXJ0aW5nIGF0IHRoZSBvZmZlbmRpbmcgY29sdW1uXG4gICAgICAgICAgICBbXSAgIC8vIG5vIHBvc3RfY29udGV4dFxuICAgICAgICBdO1xuICAgIH1cblxuICAgIHJldHVybiBbXG4gICAgICAgIGNvbnRleHQuc2xpY2UoMCwgcGl2b3QpLCAgICAvLyBwcmVfY29udGV4dFxuICAgICAgICBjb250ZXh0W3Bpdm90XSwgICAgICAgICAgICAgLy8gY29udGV4dF9saW5lXG4gICAgICAgIGNvbnRleHQuc2xpY2UocGl2b3QgKyAxKSAgICAvLyBwb3N0X2NvbnRleHRcbiAgICBdO1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzRXhjZXB0aW9uKHR5cGUsIG1lc3NhZ2UsIGZpbGV1cmwsIGxpbmVubywgZnJhbWVzLCBvcHRpb25zKSB7XG4gICAgdmFyIHN0YWNrdHJhY2UsIGxhYmVsLCBpO1xuXG4gICAgLy8gSW4gc29tZSBpbnN0YW5jZXMgbWVzc2FnZSBpcyBub3QgYWN0dWFsbHkgYSBzdHJpbmcsIG5vIGlkZWEgd2h5LFxuICAgIC8vIHNvIHdlIHdhbnQgdG8gYWx3YXlzIGNvZXJjZSBpdCB0byBvbmUuXG4gICAgbWVzc2FnZSArPSAnJztcblxuICAgIC8vIFNvbWV0aW1lcyBhbiBleGNlcHRpb24gaXMgZ2V0dGluZyBsb2dnZWQgaW4gU2VudHJ5IGFzXG4gICAgLy8gPG5vIG1lc3NhZ2UgdmFsdWU+XG4gICAgLy8gVGhpcyBjYW4gb25seSBtZWFuIHRoYXQgdGhlIG1lc3NhZ2Ugd2FzIGZhbHNleSBzaW5jZSB0aGlzIHZhbHVlXG4gICAgLy8gaXMgaGFyZGNvZGVkIGludG8gU2VudHJ5IGl0c2VsZi5cbiAgICAvLyBBdCB0aGlzIHBvaW50LCBpZiB0aGUgbWVzc2FnZSBpcyBmYWxzZXksIHdlIGJhaWwgc2luY2UgaXQncyB1c2VsZXNzXG4gICAgaWYgKHR5cGUgPT09ICdFcnJvcicgJiYgIW1lc3NhZ2UpIHJldHVybjtcblxuICAgIGlmIChnbG9iYWxPcHRpb25zLmlnbm9yZUVycm9ycy50ZXN0KG1lc3NhZ2UpKSByZXR1cm47XG5cbiAgICBpZiAoZnJhbWVzICYmIGZyYW1lcy5sZW5ndGgpIHtcbiAgICAgICAgZmlsZXVybCA9IGZyYW1lc1swXS5maWxlbmFtZSB8fCBmaWxldXJsO1xuICAgICAgICAvLyBTZW50cnkgZXhwZWN0cyBmcmFtZXMgb2xkZXN0IHRvIG5ld2VzdFxuICAgICAgICAvLyBhbmQgSlMgc2VuZHMgdGhlbSBhcyBuZXdlc3QgdG8gb2xkZXN0XG4gICAgICAgIGZyYW1lcy5yZXZlcnNlKCk7XG4gICAgICAgIHN0YWNrdHJhY2UgPSB7ZnJhbWVzOiBmcmFtZXN9O1xuICAgIH0gZWxzZSBpZiAoZmlsZXVybCkge1xuICAgICAgICBzdGFja3RyYWNlID0ge1xuICAgICAgICAgICAgZnJhbWVzOiBbe1xuICAgICAgICAgICAgICAgIGZpbGVuYW1lOiBmaWxldXJsLFxuICAgICAgICAgICAgICAgIGxpbmVubzogbGluZW5vLFxuICAgICAgICAgICAgICAgIGluX2FwcDogdHJ1ZVxuICAgICAgICAgICAgfV1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBUcnVuY2F0ZSB0aGUgbWVzc2FnZSB0byBhIG1heCBvZiBjaGFyYWN0ZXJzXG4gICAgbWVzc2FnZSA9IHRydW5jYXRlKG1lc3NhZ2UsIGdsb2JhbE9wdGlvbnMubWF4TWVzc2FnZUxlbmd0aCk7XG5cbiAgICBpZiAoZ2xvYmFsT3B0aW9ucy5pZ25vcmVVcmxzICYmIGdsb2JhbE9wdGlvbnMuaWdub3JlVXJscy50ZXN0KGZpbGV1cmwpKSByZXR1cm47XG4gICAgaWYgKGdsb2JhbE9wdGlvbnMud2hpdGVsaXN0VXJscyAmJiAhZ2xvYmFsT3B0aW9ucy53aGl0ZWxpc3RVcmxzLnRlc3QoZmlsZXVybCkpIHJldHVybjtcblxuICAgIGxhYmVsID0gbGluZW5vID8gbWVzc2FnZSArICcgYXQgJyArIGxpbmVubyA6IG1lc3NhZ2U7XG5cbiAgICAvLyBGaXJlIGF3YXkhXG4gICAgc2VuZChcbiAgICAgICAgb2JqZWN0TWVyZ2Uoe1xuICAgICAgICAgICAgLy8gc2VudHJ5LmludGVyZmFjZXMuRXhjZXB0aW9uXG4gICAgICAgICAgICBleGNlcHRpb246IHtcbiAgICAgICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBtZXNzYWdlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gc2VudHJ5LmludGVyZmFjZXMuU3RhY2t0cmFjZVxuICAgICAgICAgICAgc3RhY2t0cmFjZTogc3RhY2t0cmFjZSxcbiAgICAgICAgICAgIGN1bHByaXQ6IGZpbGV1cmwsXG4gICAgICAgICAgICBtZXNzYWdlOiBsYWJlbFxuICAgICAgICB9LCBvcHRpb25zKVxuICAgICk7XG59XG5cbmZ1bmN0aW9uIG9iamVjdE1lcmdlKG9iajEsIG9iajIpIHtcbiAgICBpZiAoIW9iajIpIHtcbiAgICAgICAgcmV0dXJuIG9iajE7XG4gICAgfVxuICAgIGVhY2gob2JqMiwgZnVuY3Rpb24oa2V5LCB2YWx1ZSl7XG4gICAgICAgIG9iajFba2V5XSA9IHZhbHVlO1xuICAgIH0pO1xuICAgIHJldHVybiBvYmoxO1xufVxuXG5mdW5jdGlvbiB0cnVuY2F0ZShzdHIsIG1heCkge1xuICAgIHJldHVybiBzdHIubGVuZ3RoIDw9IG1heCA/IHN0ciA6IHN0ci5zdWJzdHIoMCwgbWF4KSArICdcXHUyMDI2Jztcbn1cblxuZnVuY3Rpb24gbm93KCkge1xuICAgIHJldHVybiArbmV3IERhdGUoKTtcbn1cblxuZnVuY3Rpb24gZ2V0SHR0cERhdGEoKSB7XG4gICAgdmFyIGh0dHAgPSB7XG4gICAgICAgIHVybDogZG9jdW1lbnQubG9jYXRpb24uaHJlZixcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ1VzZXItQWdlbnQnOiBuYXZpZ2F0b3IudXNlckFnZW50XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKGRvY3VtZW50LnJlZmVycmVyKSB7XG4gICAgICAgIGh0dHAuaGVhZGVycy5SZWZlcmVyID0gZG9jdW1lbnQucmVmZXJyZXI7XG4gICAgfVxuXG4gICAgcmV0dXJuIGh0dHA7XG59XG5cbmZ1bmN0aW9uIHNlbmQoZGF0YSkge1xuICAgIGlmICghaXNTZXR1cCgpKSByZXR1cm47XG5cbiAgICBkYXRhID0gb2JqZWN0TWVyZ2Uoe1xuICAgICAgICBwcm9qZWN0OiBnbG9iYWxQcm9qZWN0LFxuICAgICAgICBsb2dnZXI6IGdsb2JhbE9wdGlvbnMubG9nZ2VyLFxuICAgICAgICBwbGF0Zm9ybTogJ2phdmFzY3JpcHQnLFxuICAgICAgICAvLyBzZW50cnkuaW50ZXJmYWNlcy5IdHRwXG4gICAgICAgIHJlcXVlc3Q6IGdldEh0dHBEYXRhKClcbiAgICB9LCBkYXRhKTtcblxuICAgIC8vIE1lcmdlIGluIHRoZSB0YWdzIGFuZCBleHRyYSBzZXBhcmF0ZWx5IHNpbmNlIG9iamVjdE1lcmdlIGRvZXNuJ3QgaGFuZGxlIGEgZGVlcCBtZXJnZVxuICAgIGRhdGEudGFncyA9IG9iamVjdE1lcmdlKG9iamVjdE1lcmdlKHt9LCBnbG9iYWxPcHRpb25zLnRhZ3MpLCBkYXRhLnRhZ3MpO1xuICAgIGRhdGEuZXh0cmEgPSBvYmplY3RNZXJnZShvYmplY3RNZXJnZSh7fSwgZ2xvYmFsT3B0aW9ucy5leHRyYSksIGRhdGEuZXh0cmEpO1xuXG4gICAgLy8gU2VuZCBhbG9uZyBvdXIgb3duIGNvbGxlY3RlZCBtZXRhZGF0YSB3aXRoIGV4dHJhXG4gICAgZGF0YS5leHRyYSA9IG9iamVjdE1lcmdlKHtcbiAgICAgICAgJ3Nlc3Npb246ZHVyYXRpb24nOiBub3coKSAtIHN0YXJ0VGltZVxuICAgIH0sIGRhdGEuZXh0cmEpO1xuXG4gICAgLy8gSWYgdGhlcmUgYXJlIG5vIHRhZ3MvZXh0cmEsIHN0cmlwIHRoZSBrZXkgZnJvbSB0aGUgcGF5bG9hZCBhbGx0b2d0aGVyLlxuICAgIGlmIChpc0VtcHR5T2JqZWN0KGRhdGEudGFncykpIGRlbGV0ZSBkYXRhLnRhZ3M7XG5cbiAgICBpZiAoZ2xvYmFsVXNlcikge1xuICAgICAgICAvLyBzZW50cnkuaW50ZXJmYWNlcy5Vc2VyXG4gICAgICAgIGRhdGEudXNlciA9IGdsb2JhbFVzZXI7XG4gICAgfVxuXG4gICAgLy8gSW5jbHVkZSB0aGUgcmVsZWFzZSBpZmYgaXQncyBkZWZpbmVkIGluIGdsb2JhbE9wdGlvbnNcbiAgICBpZiAoZ2xvYmFsT3B0aW9ucy5yZWxlYXNlKSBkYXRhLnJlbGVhc2UgPSBnbG9iYWxPcHRpb25zLnJlbGVhc2U7XG5cbiAgICBpZiAoaXNGdW5jdGlvbihnbG9iYWxPcHRpb25zLmRhdGFDYWxsYmFjaykpIHtcbiAgICAgICAgZGF0YSA9IGdsb2JhbE9wdGlvbnMuZGF0YUNhbGxiYWNrKGRhdGEpIHx8IGRhdGE7XG4gICAgfVxuXG4gICAgLy8gV2h5Pz8/Pz8/Pz8/P1xuICAgIGlmICghZGF0YSB8fCBpc0VtcHR5T2JqZWN0KGRhdGEpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBpZiB0aGUgcmVxdWVzdCBzaG91bGQgYmUgZmlsdGVyZWQgb3Igbm90XG4gICAgaWYgKGlzRnVuY3Rpb24oZ2xvYmFsT3B0aW9ucy5zaG91bGRTZW5kQ2FsbGJhY2spICYmICFnbG9iYWxPcHRpb25zLnNob3VsZFNlbmRDYWxsYmFjayhkYXRhKSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gU2VuZCBhbG9uZyBhbiBldmVudF9pZCBpZiBub3QgZXhwbGljaXRseSBwYXNzZWQuXG4gICAgLy8gVGhpcyBldmVudF9pZCBjYW4gYmUgdXNlZCB0byByZWZlcmVuY2UgdGhlIGVycm9yIHdpdGhpbiBTZW50cnkgaXRzZWxmLlxuICAgIC8vIFNldCBsYXN0RXZlbnRJZCBhZnRlciB3ZSBrbm93IHRoZSBlcnJvciBzaG91bGQgYWN0dWFsbHkgYmUgc2VudFxuICAgIGxhc3RFdmVudElkID0gZGF0YS5ldmVudF9pZCB8fCAoZGF0YS5ldmVudF9pZCA9IHV1aWQ0KCkpO1xuXG4gICAgbWFrZVJlcXVlc3QoZGF0YSk7XG59XG5cblxuZnVuY3Rpb24gbWFrZVJlcXVlc3QoZGF0YSkge1xuICAgIHZhciBpbWcgPSBuZXdJbWFnZSgpLFxuICAgICAgICBzcmMgPSBnbG9iYWxTZXJ2ZXIgKyBhdXRoUXVlcnlTdHJpbmcgKyAnJnNlbnRyeV9kYXRhPScgKyBlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuXG4gICAgaW1nLmNyb3NzT3JpZ2luID0gJ2Fub255bW91cyc7XG4gICAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uIHN1Y2Nlc3MoKSB7XG4gICAgICAgIHRyaWdnZXJFdmVudCgnc3VjY2VzcycsIHtcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICBzcmM6IHNyY1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIGltZy5vbmVycm9yID0gaW1nLm9uYWJvcnQgPSBmdW5jdGlvbiBmYWlsdXJlKCkge1xuICAgICAgICB0cmlnZ2VyRXZlbnQoJ2ZhaWx1cmUnLCB7XG4gICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgc3JjOiBzcmNcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBpbWcuc3JjID0gc3JjO1xufVxuXG4vLyBOb3RlOiB0aGlzIGlzIHNoaXR0eSwgYnV0IEkgY2FuJ3QgZmlndXJlIG91dCBob3cgdG8gZ2V0XG4vLyBzaW5vbiB0byBzdHViIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgd2l0aG91dCBicmVha2luZyBldmVyeXRoaW5nXG4vLyBzbyB0aGlzIHdyYXBwZXIgaXMganVzdCBzbyBJIGNhbiBzdHViIGl0IGZvciB0ZXN0cy5cbmZ1bmN0aW9uIG5ld0ltYWdlKCkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbn1cblxuZnVuY3Rpb24gaXNTZXR1cCgpIHtcbiAgICBpZiAoIWhhc0pTT04pIHJldHVybiBmYWxzZTsgIC8vIG5lZWRzIEpTT04gc3VwcG9ydFxuICAgIGlmICghZ2xvYmFsU2VydmVyKSB7XG4gICAgICAgIGxvZ0RlYnVnKCdlcnJvcicsICdFcnJvcjogUmF2ZW4gaGFzIG5vdCBiZWVuIGNvbmZpZ3VyZWQuJyk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGpvaW5SZWdFeHAocGF0dGVybnMpIHtcbiAgICAvLyBDb21iaW5lIGFuIGFycmF5IG9mIHJlZ3VsYXIgZXhwcmVzc2lvbnMgYW5kIHN0cmluZ3MgaW50byBvbmUgbGFyZ2UgcmVnZXhwXG4gICAgLy8gQmUgbWFkLlxuICAgIHZhciBzb3VyY2VzID0gW10sXG4gICAgICAgIGkgPSAwLCBsZW4gPSBwYXR0ZXJucy5sZW5ndGgsXG4gICAgICAgIHBhdHRlcm47XG5cbiAgICBmb3IgKDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHBhdHRlcm4gPSBwYXR0ZXJuc1tpXTtcbiAgICAgICAgaWYgKGlzU3RyaW5nKHBhdHRlcm4pKSB7XG4gICAgICAgICAgICAvLyBJZiBpdCdzIGEgc3RyaW5nLCB3ZSBuZWVkIHRvIGVzY2FwZSBpdFxuICAgICAgICAgICAgLy8gVGFrZW4gZnJvbTogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9HdWlkZS9SZWd1bGFyX0V4cHJlc3Npb25zXG4gICAgICAgICAgICBzb3VyY2VzLnB1c2gocGF0dGVybi5yZXBsYWNlKC8oWy4qKz9ePSE6JHt9KCl8XFxbXFxdXFwvXFxcXF0pL2csIFwiXFxcXCQxXCIpKTtcbiAgICAgICAgfSBlbHNlIGlmIChwYXR0ZXJuICYmIHBhdHRlcm4uc291cmNlKSB7XG4gICAgICAgICAgICAvLyBJZiBpdCdzIGEgcmVnZXhwIGFscmVhZHksIHdlIHdhbnQgdG8gZXh0cmFjdCB0aGUgc291cmNlXG4gICAgICAgICAgICBzb3VyY2VzLnB1c2gocGF0dGVybi5zb3VyY2UpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEludGVudGlvbmFsbHkgc2tpcCBvdGhlciBjYXNlc1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFJlZ0V4cChzb3VyY2VzLmpvaW4oJ3wnKSwgJ2knKTtcbn1cblxuLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMDUwMzQvaG93LXRvLWNyZWF0ZS1hLWd1aWQtdXVpZC1pbi1qYXZhc2NyaXB0LzIxMTc1MjMjMjExNzUyM1xuZnVuY3Rpb24gdXVpZDQoKSB7XG4gICAgcmV0dXJuICd4eHh4eHh4eHh4eHg0eHh4eXh4eHh4eHh4eHh4eHh4eCcucmVwbGFjZSgvW3h5XS9nLCBmdW5jdGlvbihjKSB7XG4gICAgICAgIHZhciByID0gTWF0aC5yYW5kb20oKSoxNnwwLFxuICAgICAgICAgICAgdiA9IGMgPT0gJ3gnID8gciA6IChyJjB4M3wweDgpO1xuICAgICAgICByZXR1cm4gdi50b1N0cmluZygxNik7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGxvZ0RlYnVnKGxldmVsLCBtZXNzYWdlKSB7XG4gICAgaWYgKHdpbmRvdy5jb25zb2xlICYmIGNvbnNvbGVbbGV2ZWxdICYmIFJhdmVuLmRlYnVnKSB7XG4gICAgICAgIGNvbnNvbGVbbGV2ZWxdKG1lc3NhZ2UpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gYWZ0ZXJMb2FkKCkge1xuICAgIC8vIEF0dGVtcHQgdG8gaW5pdGlhbGl6ZSBSYXZlbiBvbiBsb2FkXG4gICAgdmFyIFJhdmVuQ29uZmlnID0gd2luZG93LlJhdmVuQ29uZmlnO1xuICAgIGlmIChSYXZlbkNvbmZpZykge1xuICAgICAgICBSYXZlbi5jb25maWcoUmF2ZW5Db25maWcuZHNuLCBSYXZlbkNvbmZpZy5jb25maWcpLmluc3RhbGwoKTtcbiAgICB9XG59XG5hZnRlckxvYWQoKTtcblxuLy8gRXhwb3NlIFJhdmVuIHRvIHRoZSB3b3JsZFxuaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIC8vIEFNRFxuICAgIHdpbmRvdy5SYXZlbiA9IFJhdmVuO1xuICAgIGRlZmluZSgncmF2ZW4nLCBbXSwgZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gUmF2ZW47XG4gICAgfSk7XG59IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKSB7XG4gICAgLy8gYnJvd3NlcmlmeVxuICAgIG1vZHVsZS5leHBvcnRzID0gUmF2ZW47XG59IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgIC8vIENvbW1vbkpTXG4gICAgZXhwb3J0cyA9IFJhdmVuO1xufSBlbHNlIHtcbiAgICAvLyBFdmVyeXRoaW5nIGVsc2VcbiAgICB3aW5kb3cuUmF2ZW4gPSBSYXZlbjtcbn1cblxufSkodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiB0aGlzKTtcbiIsIi8qIVxyXG4gKiB2ZXJnZSAxLjkuMSsyMDE0MDIxMzA4MDNcclxuICogaHR0cHM6Ly9naXRodWIuY29tL3J5YW52ZS92ZXJnZVxyXG4gKiBNSVQgTGljZW5zZSAyMDEzIFJ5YW4gVmFuIEV0dGVuXHJcbiAqL1xyXG5cclxuKGZ1bmN0aW9uKHJvb3QsIG5hbWUsIG1ha2UpIHtcclxuICBpZiAodHlwZW9mIG1vZHVsZSAhPSAndW5kZWZpbmVkJyAmJiBtb2R1bGVbJ2V4cG9ydHMnXSkgbW9kdWxlWydleHBvcnRzJ10gPSBtYWtlKCk7XHJcbiAgZWxzZSByb290W25hbWVdID0gbWFrZSgpO1xyXG59KHRoaXMsICd2ZXJnZScsIGZ1bmN0aW9uKCkge1xyXG5cclxuICB2YXIgeHBvcnRzID0ge31cclxuICAgICwgd2luID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3dcclxuICAgICwgZG9jID0gdHlwZW9mIGRvY3VtZW50ICE9ICd1bmRlZmluZWQnICYmIGRvY3VtZW50XHJcbiAgICAsIGRvY0VsZW0gPSBkb2MgJiYgZG9jLmRvY3VtZW50RWxlbWVudFxyXG4gICAgLCBtYXRjaE1lZGlhID0gd2luWydtYXRjaE1lZGlhJ10gfHwgd2luWydtc01hdGNoTWVkaWEnXVxyXG4gICAgLCBtcSA9IG1hdGNoTWVkaWEgPyBmdW5jdGlvbihxKSB7XHJcbiAgICAgICAgcmV0dXJuICEhbWF0Y2hNZWRpYS5jYWxsKHdpbiwgcSkubWF0Y2hlcztcclxuICAgICAgfSA6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgLCB2aWV3cG9ydFcgPSB4cG9ydHNbJ3ZpZXdwb3J0VyddID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGEgPSBkb2NFbGVtWydjbGllbnRXaWR0aCddLCBiID0gd2luWydpbm5lcldpZHRoJ107XHJcbiAgICAgICAgcmV0dXJuIGEgPCBiID8gYiA6IGE7XHJcbiAgICAgIH1cclxuICAgICwgdmlld3BvcnRIID0geHBvcnRzWyd2aWV3cG9ydEgnXSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBhID0gZG9jRWxlbVsnY2xpZW50SGVpZ2h0J10sIGIgPSB3aW5bJ2lubmVySGVpZ2h0J107XHJcbiAgICAgICAgcmV0dXJuIGEgPCBiID8gYiA6IGE7XHJcbiAgICAgIH07XHJcbiAgXHJcbiAgLyoqIFxyXG4gICAqIFRlc3QgaWYgYSBtZWRpYSBxdWVyeSBpcyBhY3RpdmUuIExpa2UgTW9kZXJuaXpyLm1xXHJcbiAgICogQHNpbmNlIDEuNi4wXHJcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cclxuICAgKi8gIFxyXG4gIHhwb3J0c1snbXEnXSA9IG1xO1xyXG5cclxuICAvKiogXHJcbiAgICogTm9ybWFsaXplZCBtYXRjaE1lZGlhXHJcbiAgICogQHNpbmNlIDEuNi4wXHJcbiAgICogQHJldHVybiB7TWVkaWFRdWVyeUxpc3R8T2JqZWN0fVxyXG4gICAqLyBcclxuICB4cG9ydHNbJ21hdGNoTWVkaWEnXSA9IG1hdGNoTWVkaWEgPyBmdW5jdGlvbigpIHtcclxuICAgIC8vIG1hdGNoTWVkaWEgbXVzdCBiZSBiaW5kZWQgdG8gd2luZG93XHJcbiAgICByZXR1cm4gbWF0Y2hNZWRpYS5hcHBseSh3aW4sIGFyZ3VtZW50cyk7XHJcbiAgfSA6IGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gR3JhY2VmdWxseSBkZWdyYWRlIHRvIHBsYWluIG9iamVjdFxyXG4gICAgcmV0dXJuIHt9O1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIEBzaW5jZSAxLjguMFxyXG4gICAqIEByZXR1cm4ge3t3aWR0aDpudW1iZXIsIGhlaWdodDpudW1iZXJ9fVxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIHZpZXdwb3J0KCkge1xyXG4gICAgcmV0dXJuIHsnd2lkdGgnOnZpZXdwb3J0VygpLCAnaGVpZ2h0Jzp2aWV3cG9ydEgoKX07XHJcbiAgfVxyXG4gIHhwb3J0c1sndmlld3BvcnQnXSA9IHZpZXdwb3J0O1xyXG4gIFxyXG4gIC8qKiBcclxuICAgKiBDcm9zcy1icm93c2VyIHdpbmRvdy5zY3JvbGxYXHJcbiAgICogQHNpbmNlIDEuMC4wXHJcbiAgICogQHJldHVybiB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIHhwb3J0c1snc2Nyb2xsWCddID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gd2luLnBhZ2VYT2Zmc2V0IHx8IGRvY0VsZW0uc2Nyb2xsTGVmdDsgXHJcbiAgfTtcclxuXHJcbiAgLyoqIFxyXG4gICAqIENyb3NzLWJyb3dzZXIgd2luZG93LnNjcm9sbFlcclxuICAgKiBAc2luY2UgMS4wLjBcclxuICAgKiBAcmV0dXJuIHtudW1iZXJ9XHJcbiAgICovXHJcbiAgeHBvcnRzWydzY3JvbGxZJ10gPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB3aW4ucGFnZVlPZmZzZXQgfHwgZG9jRWxlbS5zY3JvbGxUb3A7IFxyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7e3RvcDpudW1iZXIsIHJpZ2h0Om51bWJlciwgYm90dG9tOm51bWJlciwgbGVmdDpudW1iZXJ9fSBjb29yZHNcclxuICAgKiBAcGFyYW0ge251bWJlcj19IGN1c2hpb24gYWRqdXN0bWVudFxyXG4gICAqIEByZXR1cm4ge09iamVjdH1cclxuICAgKi9cclxuICBmdW5jdGlvbiBjYWxpYnJhdGUoY29vcmRzLCBjdXNoaW9uKSB7XHJcbiAgICB2YXIgbyA9IHt9O1xyXG4gICAgY3VzaGlvbiA9ICtjdXNoaW9uIHx8IDA7XHJcbiAgICBvWyd3aWR0aCddID0gKG9bJ3JpZ2h0J10gPSBjb29yZHNbJ3JpZ2h0J10gKyBjdXNoaW9uKSAtIChvWydsZWZ0J10gPSBjb29yZHNbJ2xlZnQnXSAtIGN1c2hpb24pO1xyXG4gICAgb1snaGVpZ2h0J10gPSAob1snYm90dG9tJ10gPSBjb29yZHNbJ2JvdHRvbSddICsgY3VzaGlvbikgLSAob1sndG9wJ10gPSBjb29yZHNbJ3RvcCddIC0gY3VzaGlvbik7XHJcbiAgICByZXR1cm4gbztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyb3NzLWJyb3dzZXIgZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QgcGx1cyBvcHRpb25hbCBjdXNoaW9uLlxyXG4gICAqIENvb3JkcyBhcmUgcmVsYXRpdmUgdG8gdGhlIHRvcC1sZWZ0IGNvcm5lciBvZiB0aGUgdmlld3BvcnQuXHJcbiAgICogQHNpbmNlIDEuMC4wXHJcbiAgICogQHBhcmFtIHtFbGVtZW50fE9iamVjdH0gZWwgZWxlbWVudCBvciBzdGFjayAodXNlcyBmaXJzdCBpdGVtKVxyXG4gICAqIEBwYXJhbSB7bnVtYmVyPX0gY3VzaGlvbiArLy0gcGl4ZWwgYWRqdXN0bWVudCBhbW91bnRcclxuICAgKiBAcmV0dXJuIHtPYmplY3R8Ym9vbGVhbn1cclxuICAgKi9cclxuICBmdW5jdGlvbiByZWN0YW5nbGUoZWwsIGN1c2hpb24pIHtcclxuICAgIGVsID0gZWwgJiYgIWVsLm5vZGVUeXBlID8gZWxbMF0gOiBlbDtcclxuICAgIGlmICghZWwgfHwgMSAhPT0gZWwubm9kZVR5cGUpIHJldHVybiBmYWxzZTtcclxuICAgIHJldHVybiBjYWxpYnJhdGUoZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksIGN1c2hpb24pO1xyXG4gIH1cclxuICB4cG9ydHNbJ3JlY3RhbmdsZSddID0gcmVjdGFuZ2xlO1xyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIHZpZXdwb3J0IGFzcGVjdCByYXRpbyAob3IgdGhlIGFzcGVjdCByYXRpbyBvZiBhbiBvYmplY3Qgb3IgZWxlbWVudClcclxuICAgKiBAc2luY2UgMS43LjBcclxuICAgKiBAcGFyYW0geyhFbGVtZW50fE9iamVjdCk9fSBvIG9wdGlvbmFsIG9iamVjdCB3aXRoIHdpZHRoL2hlaWdodCBwcm9wcyBvciBtZXRob2RzXHJcbiAgICogQHJldHVybiB7bnVtYmVyfVxyXG4gICAqIEBsaW5rIGh0dHA6Ly93My5vcmcvVFIvY3NzMy1tZWRpYXF1ZXJpZXMvI29yaWVudGF0aW9uXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gYXNwZWN0KG8pIHtcclxuICAgIG8gPSBudWxsID09IG8gPyB2aWV3cG9ydCgpIDogMSA9PT0gby5ub2RlVHlwZSA/IHJlY3RhbmdsZShvKSA6IG87XHJcbiAgICB2YXIgaCA9IG9bJ2hlaWdodCddLCB3ID0gb1snd2lkdGgnXTtcclxuICAgIGggPSB0eXBlb2YgaCA9PSAnZnVuY3Rpb24nID8gaC5jYWxsKG8pIDogaDtcclxuICAgIHcgPSB0eXBlb2YgdyA9PSAnZnVuY3Rpb24nID8gdy5jYWxsKG8pIDogdztcclxuICAgIHJldHVybiB3L2g7XHJcbiAgfVxyXG4gIHhwb3J0c1snYXNwZWN0J10gPSBhc3BlY3Q7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRlc3QgaWYgYW4gZWxlbWVudCBpcyBpbiB0aGUgc2FtZSB4LWF4aXMgc2VjdGlvbiBhcyB0aGUgdmlld3BvcnQuXHJcbiAgICogQHNpbmNlIDEuMC4wXHJcbiAgICogQHBhcmFtIHtFbGVtZW50fE9iamVjdH0gZWxcclxuICAgKiBAcGFyYW0ge251bWJlcj19IGN1c2hpb25cclxuICAgKiBAcmV0dXJuIHtib29sZWFufVxyXG4gICAqL1xyXG4gIHhwb3J0c1snaW5YJ10gPSBmdW5jdGlvbihlbCwgY3VzaGlvbikge1xyXG4gICAgdmFyIHIgPSByZWN0YW5nbGUoZWwsIGN1c2hpb24pO1xyXG4gICAgcmV0dXJuICEhciAmJiByLnJpZ2h0ID49IDAgJiYgci5sZWZ0IDw9IHZpZXdwb3J0VygpO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFRlc3QgaWYgYW4gZWxlbWVudCBpcyBpbiB0aGUgc2FtZSB5LWF4aXMgc2VjdGlvbiBhcyB0aGUgdmlld3BvcnQuXHJcbiAgICogQHNpbmNlIDEuMC4wXHJcbiAgICogQHBhcmFtIHtFbGVtZW50fE9iamVjdH0gZWxcclxuICAgKiBAcGFyYW0ge251bWJlcj19IGN1c2hpb25cclxuICAgKiBAcmV0dXJuIHtib29sZWFufVxyXG4gICAqL1xyXG4gIHhwb3J0c1snaW5ZJ10gPSBmdW5jdGlvbihlbCwgY3VzaGlvbikge1xyXG4gICAgdmFyIHIgPSByZWN0YW5nbGUoZWwsIGN1c2hpb24pO1xyXG4gICAgcmV0dXJuICEhciAmJiByLmJvdHRvbSA+PSAwICYmIHIudG9wIDw9IHZpZXdwb3J0SCgpO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFRlc3QgaWYgYW4gZWxlbWVudCBpcyBpbiB0aGUgdmlld3BvcnQuXHJcbiAgICogQHNpbmNlIDEuMC4wXHJcbiAgICogQHBhcmFtIHtFbGVtZW50fE9iamVjdH0gZWxcclxuICAgKiBAcGFyYW0ge251bWJlcj19IGN1c2hpb25cclxuICAgKiBAcmV0dXJuIHtib29sZWFufVxyXG4gICAqL1xyXG4gIHhwb3J0c1snaW5WaWV3cG9ydCddID0gZnVuY3Rpb24oZWwsIGN1c2hpb24pIHtcclxuICAgIC8vIEVxdWl2IHRvIGBpblgoZWwsIGN1c2hpb24pICYmIGluWShlbCwgY3VzaGlvbilgIGJ1dCBqdXN0IG1hbnVhbGx5IGRvIGJvdGggXHJcbiAgICAvLyB0byBhdm9pZCBjYWxsaW5nIHJlY3RhbmdsZSgpIHR3aWNlLiBJdCBnemlwcyBqdXN0IGFzIHNtYWxsIGxpa2UgdGhpcy5cclxuICAgIHZhciByID0gcmVjdGFuZ2xlKGVsLCBjdXNoaW9uKTtcclxuICAgIHJldHVybiAhIXIgJiYgci5ib3R0b20gPj0gMCAmJiByLnJpZ2h0ID49IDAgJiYgci50b3AgPD0gdmlld3BvcnRIKCkgJiYgci5sZWZ0IDw9IHZpZXdwb3J0VygpO1xyXG4gIH07XHJcblxyXG4gIHJldHVybiB4cG9ydHM7XHJcbn0pKTsiLCIvKiFcbiAqIEV2ZW50RW1pdHRlciB2NC4yLjExIC0gZ2l0LmlvL2VlXG4gKiBVbmxpY2Vuc2UgLSBodHRwOi8vdW5saWNlbnNlLm9yZy9cbiAqIE9saXZlciBDYWxkd2VsbCAtIGh0dHA6Ly9vbGkubWUudWsvXG4gKiBAcHJlc2VydmVcbiAqL1xuXG47KGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICAvKipcbiAgICAgKiBDbGFzcyBmb3IgbWFuYWdpbmcgZXZlbnRzLlxuICAgICAqIENhbiBiZSBleHRlbmRlZCB0byBwcm92aWRlIGV2ZW50IGZ1bmN0aW9uYWxpdHkgaW4gb3RoZXIgY2xhc3Nlcy5cbiAgICAgKlxuICAgICAqIEBjbGFzcyBFdmVudEVtaXR0ZXIgTWFuYWdlcyBldmVudCByZWdpc3RlcmluZyBhbmQgZW1pdHRpbmcuXG4gICAgICovXG4gICAgZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge31cblxuICAgIC8vIFNob3J0Y3V0cyB0byBpbXByb3ZlIHNwZWVkIGFuZCBzaXplXG4gICAgdmFyIHByb3RvID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZTtcbiAgICB2YXIgZXhwb3J0cyA9IHRoaXM7XG4gICAgdmFyIG9yaWdpbmFsR2xvYmFsVmFsdWUgPSBleHBvcnRzLkV2ZW50RW1pdHRlcjtcblxuICAgIC8qKlxuICAgICAqIEZpbmRzIHRoZSBpbmRleCBvZiB0aGUgbGlzdGVuZXIgZm9yIHRoZSBldmVudCBpbiBpdHMgc3RvcmFnZSBhcnJheS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb25bXX0gbGlzdGVuZXJzIEFycmF5IG9mIGxpc3RlbmVycyB0byBzZWFyY2ggdGhyb3VnaC5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciBNZXRob2QgdG8gbG9vayBmb3IuXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBJbmRleCBvZiB0aGUgc3BlY2lmaWVkIGxpc3RlbmVyLCAtMSBpZiBub3QgZm91bmRcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpbmRleE9mTGlzdGVuZXIobGlzdGVuZXJzLCBsaXN0ZW5lcikge1xuICAgICAgICB2YXIgaSA9IGxpc3RlbmVycy5sZW5ndGg7XG4gICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgIGlmIChsaXN0ZW5lcnNbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWxpYXMgYSBtZXRob2Qgd2hpbGUga2VlcGluZyB0aGUgY29udGV4dCBjb3JyZWN0LCB0byBhbGxvdyBmb3Igb3ZlcndyaXRpbmcgb2YgdGFyZ2V0IG1ldGhvZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSB0YXJnZXQgbWV0aG9kLlxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgYWxpYXNlZCBtZXRob2RcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhbGlhcyhuYW1lKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBhbGlhc0Nsb3N1cmUoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpc1tuYW1lXS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGxpc3RlbmVyIGFycmF5IGZvciB0aGUgc3BlY2lmaWVkIGV2ZW50LlxuICAgICAqIFdpbGwgaW5pdGlhbGlzZSB0aGUgZXZlbnQgb2JqZWN0IGFuZCBsaXN0ZW5lciBhcnJheXMgaWYgcmVxdWlyZWQuXG4gICAgICogV2lsbCByZXR1cm4gYW4gb2JqZWN0IGlmIHlvdSB1c2UgYSByZWdleCBzZWFyY2guIFRoZSBvYmplY3QgY29udGFpbnMga2V5cyBmb3IgZWFjaCBtYXRjaGVkIGV2ZW50LiBTbyAvYmFbcnpdLyBtaWdodCByZXR1cm4gYW4gb2JqZWN0IGNvbnRhaW5pbmcgYmFyIGFuZCBiYXouIEJ1dCBvbmx5IGlmIHlvdSBoYXZlIGVpdGhlciBkZWZpbmVkIHRoZW0gd2l0aCBkZWZpbmVFdmVudCBvciBhZGRlZCBzb21lIGxpc3RlbmVycyB0byB0aGVtLlxuICAgICAqIEVhY2ggcHJvcGVydHkgaW4gdGhlIG9iamVjdCByZXNwb25zZSBpcyBhbiBhcnJheSBvZiBsaXN0ZW5lciBmdW5jdGlvbnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xSZWdFeHB9IGV2dCBOYW1lIG9mIHRoZSBldmVudCB0byByZXR1cm4gdGhlIGxpc3RlbmVycyBmcm9tLlxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9uW118T2JqZWN0fSBBbGwgbGlzdGVuZXIgZnVuY3Rpb25zIGZvciB0aGUgZXZlbnQuXG4gICAgICovXG4gICAgcHJvdG8uZ2V0TGlzdGVuZXJzID0gZnVuY3Rpb24gZ2V0TGlzdGVuZXJzKGV2dCkge1xuICAgICAgICB2YXIgZXZlbnRzID0gdGhpcy5fZ2V0RXZlbnRzKCk7XG4gICAgICAgIHZhciByZXNwb25zZTtcbiAgICAgICAgdmFyIGtleTtcblxuICAgICAgICAvLyBSZXR1cm4gYSBjb25jYXRlbmF0ZWQgYXJyYXkgb2YgYWxsIG1hdGNoaW5nIGV2ZW50cyBpZlxuICAgICAgICAvLyB0aGUgc2VsZWN0b3IgaXMgYSByZWd1bGFyIGV4cHJlc3Npb24uXG4gICAgICAgIGlmIChldnQgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgICAgIHJlc3BvbnNlID0ge307XG4gICAgICAgICAgICBmb3IgKGtleSBpbiBldmVudHMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnRzLmhhc093blByb3BlcnR5KGtleSkgJiYgZXZ0LnRlc3Qoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICByZXNwb25zZVtrZXldID0gZXZlbnRzW2tleV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVzcG9uc2UgPSBldmVudHNbZXZ0XSB8fCAoZXZlbnRzW2V2dF0gPSBbXSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFRha2VzIGEgbGlzdCBvZiBsaXN0ZW5lciBvYmplY3RzIGFuZCBmbGF0dGVucyBpdCBpbnRvIGEgbGlzdCBvZiBsaXN0ZW5lciBmdW5jdGlvbnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdFtdfSBsaXN0ZW5lcnMgUmF3IGxpc3RlbmVyIG9iamVjdHMuXG4gICAgICogQHJldHVybiB7RnVuY3Rpb25bXX0gSnVzdCB0aGUgbGlzdGVuZXIgZnVuY3Rpb25zLlxuICAgICAqL1xuICAgIHByb3RvLmZsYXR0ZW5MaXN0ZW5lcnMgPSBmdW5jdGlvbiBmbGF0dGVuTGlzdGVuZXJzKGxpc3RlbmVycykge1xuICAgICAgICB2YXIgZmxhdExpc3RlbmVycyA9IFtdO1xuICAgICAgICB2YXIgaTtcblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBmbGF0TGlzdGVuZXJzLnB1c2gobGlzdGVuZXJzW2ldLmxpc3RlbmVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmbGF0TGlzdGVuZXJzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBGZXRjaGVzIHRoZSByZXF1ZXN0ZWQgbGlzdGVuZXJzIHZpYSBnZXRMaXN0ZW5lcnMgYnV0IHdpbGwgYWx3YXlzIHJldHVybiB0aGUgcmVzdWx0cyBpbnNpZGUgYW4gb2JqZWN0LiBUaGlzIGlzIG1haW5seSBmb3IgaW50ZXJuYWwgdXNlIGJ1dCBvdGhlcnMgbWF5IGZpbmQgaXQgdXNlZnVsLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8UmVnRXhwfSBldnQgTmFtZSBvZiB0aGUgZXZlbnQgdG8gcmV0dXJuIHRoZSBsaXN0ZW5lcnMgZnJvbS5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEFsbCBsaXN0ZW5lciBmdW5jdGlvbnMgZm9yIGFuIGV2ZW50IGluIGFuIG9iamVjdC5cbiAgICAgKi9cbiAgICBwcm90by5nZXRMaXN0ZW5lcnNBc09iamVjdCA9IGZ1bmN0aW9uIGdldExpc3RlbmVyc0FzT2JqZWN0KGV2dCkge1xuICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5nZXRMaXN0ZW5lcnMoZXZ0KTtcbiAgICAgICAgdmFyIHJlc3BvbnNlO1xuXG4gICAgICAgIGlmIChsaXN0ZW5lcnMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgcmVzcG9uc2UgPSB7fTtcbiAgICAgICAgICAgIHJlc3BvbnNlW2V2dF0gPSBsaXN0ZW5lcnM7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzcG9uc2UgfHwgbGlzdGVuZXJzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbGlzdGVuZXIgZnVuY3Rpb24gdG8gdGhlIHNwZWNpZmllZCBldmVudC5cbiAgICAgKiBUaGUgbGlzdGVuZXIgd2lsbCBub3QgYmUgYWRkZWQgaWYgaXQgaXMgYSBkdXBsaWNhdGUuXG4gICAgICogSWYgdGhlIGxpc3RlbmVyIHJldHVybnMgdHJ1ZSB0aGVuIGl0IHdpbGwgYmUgcmVtb3ZlZCBhZnRlciBpdCBpcyBjYWxsZWQuXG4gICAgICogSWYgeW91IHBhc3MgYSByZWd1bGFyIGV4cHJlc3Npb24gYXMgdGhlIGV2ZW50IG5hbWUgdGhlbiB0aGUgbGlzdGVuZXIgd2lsbCBiZSBhZGRlZCB0byBhbGwgZXZlbnRzIHRoYXQgbWF0Y2ggaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xSZWdFeHB9IGV2dCBOYW1lIG9mIHRoZSBldmVudCB0byBhdHRhY2ggdGhlIGxpc3RlbmVyIHRvLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIE1ldGhvZCB0byBiZSBjYWxsZWQgd2hlbiB0aGUgZXZlbnQgaXMgZW1pdHRlZC4gSWYgdGhlIGZ1bmN0aW9uIHJldHVybnMgdHJ1ZSB0aGVuIGl0IHdpbGwgYmUgcmVtb3ZlZCBhZnRlciBjYWxsaW5nLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLmFkZExpc3RlbmVyID0gZnVuY3Rpb24gYWRkTGlzdGVuZXIoZXZ0LCBsaXN0ZW5lcikge1xuICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5nZXRMaXN0ZW5lcnNBc09iamVjdChldnQpO1xuICAgICAgICB2YXIgbGlzdGVuZXJJc1dyYXBwZWQgPSB0eXBlb2YgbGlzdGVuZXIgPT09ICdvYmplY3QnO1xuICAgICAgICB2YXIga2V5O1xuXG4gICAgICAgIGZvciAoa2V5IGluIGxpc3RlbmVycykge1xuICAgICAgICAgICAgaWYgKGxpc3RlbmVycy5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIGluZGV4T2ZMaXN0ZW5lcihsaXN0ZW5lcnNba2V5XSwgbGlzdGVuZXIpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyc1trZXldLnB1c2gobGlzdGVuZXJJc1dyYXBwZWQgPyBsaXN0ZW5lciA6IHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXI6IGxpc3RlbmVyLFxuICAgICAgICAgICAgICAgICAgICBvbmNlOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFsaWFzIG9mIGFkZExpc3RlbmVyXG4gICAgICovXG4gICAgcHJvdG8ub24gPSBhbGlhcygnYWRkTGlzdGVuZXInKTtcblxuICAgIC8qKlxuICAgICAqIFNlbWktYWxpYXMgb2YgYWRkTGlzdGVuZXIuIEl0IHdpbGwgYWRkIGEgbGlzdGVuZXIgdGhhdCB3aWxsIGJlXG4gICAgICogYXV0b21hdGljYWxseSByZW1vdmVkIGFmdGVyIGl0cyBmaXJzdCBleGVjdXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xSZWdFeHB9IGV2dCBOYW1lIG9mIHRoZSBldmVudCB0byBhdHRhY2ggdGhlIGxpc3RlbmVyIHRvLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIE1ldGhvZCB0byBiZSBjYWxsZWQgd2hlbiB0aGUgZXZlbnQgaXMgZW1pdHRlZC4gSWYgdGhlIGZ1bmN0aW9uIHJldHVybnMgdHJ1ZSB0aGVuIGl0IHdpbGwgYmUgcmVtb3ZlZCBhZnRlciBjYWxsaW5nLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLmFkZE9uY2VMaXN0ZW5lciA9IGZ1bmN0aW9uIGFkZE9uY2VMaXN0ZW5lcihldnQsIGxpc3RlbmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZExpc3RlbmVyKGV2dCwge1xuICAgICAgICAgICAgbGlzdGVuZXI6IGxpc3RlbmVyLFxuICAgICAgICAgICAgb25jZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQWxpYXMgb2YgYWRkT25jZUxpc3RlbmVyLlxuICAgICAqL1xuICAgIHByb3RvLm9uY2UgPSBhbGlhcygnYWRkT25jZUxpc3RlbmVyJyk7XG5cbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGFuIGV2ZW50IG5hbWUuIFRoaXMgaXMgcmVxdWlyZWQgaWYgeW91IHdhbnQgdG8gdXNlIGEgcmVnZXggdG8gYWRkIGEgbGlzdGVuZXIgdG8gbXVsdGlwbGUgZXZlbnRzIGF0IG9uY2UuIElmIHlvdSBkb24ndCBkbyB0aGlzIHRoZW4gaG93IGRvIHlvdSBleHBlY3QgaXQgdG8ga25vdyB3aGF0IGV2ZW50IHRvIGFkZCB0bz8gU2hvdWxkIGl0IGp1c3QgYWRkIHRvIGV2ZXJ5IHBvc3NpYmxlIG1hdGNoIGZvciBhIHJlZ2V4PyBOby4gVGhhdCBpcyBzY2FyeSBhbmQgYmFkLlxuICAgICAqIFlvdSBuZWVkIHRvIHRlbGwgaXQgd2hhdCBldmVudCBuYW1lcyBzaG91bGQgYmUgbWF0Y2hlZCBieSBhIHJlZ2V4LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGV2dCBOYW1lIG9mIHRoZSBldmVudCB0byBjcmVhdGUuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgcHJvdG8uZGVmaW5lRXZlbnQgPSBmdW5jdGlvbiBkZWZpbmVFdmVudChldnQpIHtcbiAgICAgICAgdGhpcy5nZXRMaXN0ZW5lcnMoZXZ0KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFVzZXMgZGVmaW5lRXZlbnQgdG8gZGVmaW5lIG11bHRpcGxlIGV2ZW50cy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nW119IGV2dHMgQW4gYXJyYXkgb2YgZXZlbnQgbmFtZXMgdG8gZGVmaW5lLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLmRlZmluZUV2ZW50cyA9IGZ1bmN0aW9uIGRlZmluZUV2ZW50cyhldnRzKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXZ0cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgdGhpcy5kZWZpbmVFdmVudChldnRzW2ldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhIGxpc3RlbmVyIGZ1bmN0aW9uIGZyb20gdGhlIHNwZWNpZmllZCBldmVudC5cbiAgICAgKiBXaGVuIHBhc3NlZCBhIHJlZ3VsYXIgZXhwcmVzc2lvbiBhcyB0aGUgZXZlbnQgbmFtZSwgaXQgd2lsbCByZW1vdmUgdGhlIGxpc3RlbmVyIGZyb20gYWxsIGV2ZW50cyB0aGF0IG1hdGNoIGl0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8UmVnRXhwfSBldnQgTmFtZSBvZiB0aGUgZXZlbnQgdG8gcmVtb3ZlIHRoZSBsaXN0ZW5lciBmcm9tLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIE1ldGhvZCB0byByZW1vdmUgZnJvbSB0aGUgZXZlbnQuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgcHJvdG8ucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcihldnQsIGxpc3RlbmVyKSB7XG4gICAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLmdldExpc3RlbmVyc0FzT2JqZWN0KGV2dCk7XG4gICAgICAgIHZhciBpbmRleDtcbiAgICAgICAgdmFyIGtleTtcblxuICAgICAgICBmb3IgKGtleSBpbiBsaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIGlmIChsaXN0ZW5lcnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gaW5kZXhPZkxpc3RlbmVyKGxpc3RlbmVyc1trZXldLCBsaXN0ZW5lcik7XG5cbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyc1trZXldLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFsaWFzIG9mIHJlbW92ZUxpc3RlbmVyXG4gICAgICovXG4gICAgcHJvdG8ub2ZmID0gYWxpYXMoJ3JlbW92ZUxpc3RlbmVyJyk7XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGxpc3RlbmVycyBpbiBidWxrIHVzaW5nIHRoZSBtYW5pcHVsYXRlTGlzdGVuZXJzIG1ldGhvZC5cbiAgICAgKiBJZiB5b3UgcGFzcyBhbiBvYmplY3QgYXMgdGhlIHNlY29uZCBhcmd1bWVudCB5b3UgY2FuIGFkZCB0byBtdWx0aXBsZSBldmVudHMgYXQgb25jZS4gVGhlIG9iamVjdCBzaG91bGQgY29udGFpbiBrZXkgdmFsdWUgcGFpcnMgb2YgZXZlbnRzIGFuZCBsaXN0ZW5lcnMgb3IgbGlzdGVuZXIgYXJyYXlzLiBZb3UgY2FuIGFsc28gcGFzcyBpdCBhbiBldmVudCBuYW1lIGFuZCBhbiBhcnJheSBvZiBsaXN0ZW5lcnMgdG8gYmUgYWRkZWQuXG4gICAgICogWW91IGNhbiBhbHNvIHBhc3MgaXQgYSByZWd1bGFyIGV4cHJlc3Npb24gdG8gYWRkIHRoZSBhcnJheSBvZiBsaXN0ZW5lcnMgdG8gYWxsIGV2ZW50cyB0aGF0IG1hdGNoIGl0LlxuICAgICAqIFllYWgsIHRoaXMgZnVuY3Rpb24gZG9lcyBxdWl0ZSBhIGJpdC4gVGhhdCdzIHByb2JhYmx5IGEgYmFkIHRoaW5nLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fFJlZ0V4cH0gZXZ0IEFuIGV2ZW50IG5hbWUgaWYgeW91IHdpbGwgcGFzcyBhbiBhcnJheSBvZiBsaXN0ZW5lcnMgbmV4dC4gQW4gb2JqZWN0IGlmIHlvdSB3aXNoIHRvIGFkZCB0byBtdWx0aXBsZSBldmVudHMgYXQgb25jZS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9uW119IFtsaXN0ZW5lcnNdIEFuIG9wdGlvbmFsIGFycmF5IG9mIGxpc3RlbmVyIGZ1bmN0aW9ucyB0byBhZGQuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgcHJvdG8uYWRkTGlzdGVuZXJzID0gZnVuY3Rpb24gYWRkTGlzdGVuZXJzKGV2dCwgbGlzdGVuZXJzKSB7XG4gICAgICAgIC8vIFBhc3MgdGhyb3VnaCB0byBtYW5pcHVsYXRlTGlzdGVuZXJzXG4gICAgICAgIHJldHVybiB0aGlzLm1hbmlwdWxhdGVMaXN0ZW5lcnMoZmFsc2UsIGV2dCwgbGlzdGVuZXJzKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBsaXN0ZW5lcnMgaW4gYnVsayB1c2luZyB0aGUgbWFuaXB1bGF0ZUxpc3RlbmVycyBtZXRob2QuXG4gICAgICogSWYgeW91IHBhc3MgYW4gb2JqZWN0IGFzIHRoZSBzZWNvbmQgYXJndW1lbnQgeW91IGNhbiByZW1vdmUgZnJvbSBtdWx0aXBsZSBldmVudHMgYXQgb25jZS4gVGhlIG9iamVjdCBzaG91bGQgY29udGFpbiBrZXkgdmFsdWUgcGFpcnMgb2YgZXZlbnRzIGFuZCBsaXN0ZW5lcnMgb3IgbGlzdGVuZXIgYXJyYXlzLlxuICAgICAqIFlvdSBjYW4gYWxzbyBwYXNzIGl0IGFuIGV2ZW50IG5hbWUgYW5kIGFuIGFycmF5IG9mIGxpc3RlbmVycyB0byBiZSByZW1vdmVkLlxuICAgICAqIFlvdSBjYW4gYWxzbyBwYXNzIGl0IGEgcmVndWxhciBleHByZXNzaW9uIHRvIHJlbW92ZSB0aGUgbGlzdGVuZXJzIGZyb20gYWxsIGV2ZW50cyB0aGF0IG1hdGNoIGl0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fFJlZ0V4cH0gZXZ0IEFuIGV2ZW50IG5hbWUgaWYgeW91IHdpbGwgcGFzcyBhbiBhcnJheSBvZiBsaXN0ZW5lcnMgbmV4dC4gQW4gb2JqZWN0IGlmIHlvdSB3aXNoIHRvIHJlbW92ZSBmcm9tIG11bHRpcGxlIGV2ZW50cyBhdCBvbmNlLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb25bXX0gW2xpc3RlbmVyc10gQW4gb3B0aW9uYWwgYXJyYXkgb2YgbGlzdGVuZXIgZnVuY3Rpb25zIHRvIHJlbW92ZS5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKi9cbiAgICBwcm90by5yZW1vdmVMaXN0ZW5lcnMgPSBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcnMoZXZ0LCBsaXN0ZW5lcnMpIHtcbiAgICAgICAgLy8gUGFzcyB0aHJvdWdoIHRvIG1hbmlwdWxhdGVMaXN0ZW5lcnNcbiAgICAgICAgcmV0dXJuIHRoaXMubWFuaXB1bGF0ZUxpc3RlbmVycyh0cnVlLCBldnQsIGxpc3RlbmVycyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEVkaXRzIGxpc3RlbmVycyBpbiBidWxrLiBUaGUgYWRkTGlzdGVuZXJzIGFuZCByZW1vdmVMaXN0ZW5lcnMgbWV0aG9kcyBib3RoIHVzZSB0aGlzIHRvIGRvIHRoZWlyIGpvYi4gWW91IHNob3VsZCByZWFsbHkgdXNlIHRob3NlIGluc3RlYWQsIHRoaXMgaXMgYSBsaXR0bGUgbG93ZXIgbGV2ZWwuXG4gICAgICogVGhlIGZpcnN0IGFyZ3VtZW50IHdpbGwgZGV0ZXJtaW5lIGlmIHRoZSBsaXN0ZW5lcnMgYXJlIHJlbW92ZWQgKHRydWUpIG9yIGFkZGVkIChmYWxzZSkuXG4gICAgICogSWYgeW91IHBhc3MgYW4gb2JqZWN0IGFzIHRoZSBzZWNvbmQgYXJndW1lbnQgeW91IGNhbiBhZGQvcmVtb3ZlIGZyb20gbXVsdGlwbGUgZXZlbnRzIGF0IG9uY2UuIFRoZSBvYmplY3Qgc2hvdWxkIGNvbnRhaW4ga2V5IHZhbHVlIHBhaXJzIG9mIGV2ZW50cyBhbmQgbGlzdGVuZXJzIG9yIGxpc3RlbmVyIGFycmF5cy5cbiAgICAgKiBZb3UgY2FuIGFsc28gcGFzcyBpdCBhbiBldmVudCBuYW1lIGFuZCBhbiBhcnJheSBvZiBsaXN0ZW5lcnMgdG8gYmUgYWRkZWQvcmVtb3ZlZC5cbiAgICAgKiBZb3UgY2FuIGFsc28gcGFzcyBpdCBhIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byBtYW5pcHVsYXRlIHRoZSBsaXN0ZW5lcnMgb2YgYWxsIGV2ZW50cyB0aGF0IG1hdGNoIGl0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtCb29sZWFufSByZW1vdmUgVHJ1ZSBpZiB5b3Ugd2FudCB0byByZW1vdmUgbGlzdGVuZXJzLCBmYWxzZSBpZiB5b3Ugd2FudCB0byBhZGQuXG4gICAgICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fFJlZ0V4cH0gZXZ0IEFuIGV2ZW50IG5hbWUgaWYgeW91IHdpbGwgcGFzcyBhbiBhcnJheSBvZiBsaXN0ZW5lcnMgbmV4dC4gQW4gb2JqZWN0IGlmIHlvdSB3aXNoIHRvIGFkZC9yZW1vdmUgZnJvbSBtdWx0aXBsZSBldmVudHMgYXQgb25jZS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9uW119IFtsaXN0ZW5lcnNdIEFuIG9wdGlvbmFsIGFycmF5IG9mIGxpc3RlbmVyIGZ1bmN0aW9ucyB0byBhZGQvcmVtb3ZlLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLm1hbmlwdWxhdGVMaXN0ZW5lcnMgPSBmdW5jdGlvbiBtYW5pcHVsYXRlTGlzdGVuZXJzKHJlbW92ZSwgZXZ0LCBsaXN0ZW5lcnMpIHtcbiAgICAgICAgdmFyIGk7XG4gICAgICAgIHZhciB2YWx1ZTtcbiAgICAgICAgdmFyIHNpbmdsZSA9IHJlbW92ZSA/IHRoaXMucmVtb3ZlTGlzdGVuZXIgOiB0aGlzLmFkZExpc3RlbmVyO1xuICAgICAgICB2YXIgbXVsdGlwbGUgPSByZW1vdmUgPyB0aGlzLnJlbW92ZUxpc3RlbmVycyA6IHRoaXMuYWRkTGlzdGVuZXJzO1xuXG4gICAgICAgIC8vIElmIGV2dCBpcyBhbiBvYmplY3QgdGhlbiBwYXNzIGVhY2ggb2YgaXRzIHByb3BlcnRpZXMgdG8gdGhpcyBtZXRob2RcbiAgICAgICAgaWYgKHR5cGVvZiBldnQgPT09ICdvYmplY3QnICYmICEoZXZ0IGluc3RhbmNlb2YgUmVnRXhwKSkge1xuICAgICAgICAgICAgZm9yIChpIGluIGV2dCkge1xuICAgICAgICAgICAgICAgIGlmIChldnQuaGFzT3duUHJvcGVydHkoaSkgJiYgKHZhbHVlID0gZXZ0W2ldKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBQYXNzIHRoZSBzaW5nbGUgbGlzdGVuZXIgc3RyYWlnaHQgdGhyb3VnaCB0byB0aGUgc2luZ3VsYXIgbWV0aG9kXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpbmdsZS5jYWxsKHRoaXMsIGksIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSBwYXNzIGJhY2sgdG8gdGhlIG11bHRpcGxlIGZ1bmN0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICBtdWx0aXBsZS5jYWxsKHRoaXMsIGksIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIFNvIGV2dCBtdXN0IGJlIGEgc3RyaW5nXG4gICAgICAgICAgICAvLyBBbmQgbGlzdGVuZXJzIG11c3QgYmUgYW4gYXJyYXkgb2YgbGlzdGVuZXJzXG4gICAgICAgICAgICAvLyBMb29wIG92ZXIgaXQgYW5kIHBhc3MgZWFjaCBvbmUgdG8gdGhlIG11bHRpcGxlIG1ldGhvZFxuICAgICAgICAgICAgaSA9IGxpc3RlbmVycy5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgc2luZ2xlLmNhbGwodGhpcywgZXZ0LCBsaXN0ZW5lcnNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYWxsIGxpc3RlbmVycyBmcm9tIGEgc3BlY2lmaWVkIGV2ZW50LlxuICAgICAqIElmIHlvdSBkbyBub3Qgc3BlY2lmeSBhbiBldmVudCB0aGVuIGFsbCBsaXN0ZW5lcnMgd2lsbCBiZSByZW1vdmVkLlxuICAgICAqIFRoYXQgbWVhbnMgZXZlcnkgZXZlbnQgd2lsbCBiZSBlbXB0aWVkLlxuICAgICAqIFlvdSBjYW4gYWxzbyBwYXNzIGEgcmVnZXggdG8gcmVtb3ZlIGFsbCBldmVudHMgdGhhdCBtYXRjaCBpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfFJlZ0V4cH0gW2V2dF0gT3B0aW9uYWwgbmFtZSBvZiB0aGUgZXZlbnQgdG8gcmVtb3ZlIGFsbCBsaXN0ZW5lcnMgZm9yLiBXaWxsIHJlbW92ZSBmcm9tIGV2ZXJ5IGV2ZW50IGlmIG5vdCBwYXNzZWQuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgcHJvdG8ucmVtb3ZlRXZlbnQgPSBmdW5jdGlvbiByZW1vdmVFdmVudChldnQpIHtcbiAgICAgICAgdmFyIHR5cGUgPSB0eXBlb2YgZXZ0O1xuICAgICAgICB2YXIgZXZlbnRzID0gdGhpcy5fZ2V0RXZlbnRzKCk7XG4gICAgICAgIHZhciBrZXk7XG5cbiAgICAgICAgLy8gUmVtb3ZlIGRpZmZlcmVudCB0aGluZ3MgZGVwZW5kaW5nIG9uIHRoZSBzdGF0ZSBvZiBldnRcbiAgICAgICAgaWYgKHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgYWxsIGxpc3RlbmVycyBmb3IgdGhlIHNwZWNpZmllZCBldmVudFxuICAgICAgICAgICAgZGVsZXRlIGV2ZW50c1tldnRdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGV2dCBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICAgICAgLy8gUmVtb3ZlIGFsbCBldmVudHMgbWF0Y2hpbmcgdGhlIHJlZ2V4LlxuICAgICAgICAgICAgZm9yIChrZXkgaW4gZXZlbnRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50cy5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIGV2dC50ZXN0KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGV2ZW50c1trZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSBhbGwgbGlzdGVuZXJzIGluIGFsbCBldmVudHNcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHM7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQWxpYXMgb2YgcmVtb3ZlRXZlbnQuXG4gICAgICpcbiAgICAgKiBBZGRlZCB0byBtaXJyb3IgdGhlIG5vZGUgQVBJLlxuICAgICAqL1xuICAgIHByb3RvLnJlbW92ZUFsbExpc3RlbmVycyA9IGFsaWFzKCdyZW1vdmVFdmVudCcpO1xuXG4gICAgLyoqXG4gICAgICogRW1pdHMgYW4gZXZlbnQgb2YgeW91ciBjaG9pY2UuXG4gICAgICogV2hlbiBlbWl0dGVkLCBldmVyeSBsaXN0ZW5lciBhdHRhY2hlZCB0byB0aGF0IGV2ZW50IHdpbGwgYmUgZXhlY3V0ZWQuXG4gICAgICogSWYgeW91IHBhc3MgdGhlIG9wdGlvbmFsIGFyZ3VtZW50IGFycmF5IHRoZW4gdGhvc2UgYXJndW1lbnRzIHdpbGwgYmUgcGFzc2VkIHRvIGV2ZXJ5IGxpc3RlbmVyIHVwb24gZXhlY3V0aW9uLlxuICAgICAqIEJlY2F1c2UgaXQgdXNlcyBgYXBwbHlgLCB5b3VyIGFycmF5IG9mIGFyZ3VtZW50cyB3aWxsIGJlIHBhc3NlZCBhcyBpZiB5b3Ugd3JvdGUgdGhlbSBvdXQgc2VwYXJhdGVseS5cbiAgICAgKiBTbyB0aGV5IHdpbGwgbm90IGFycml2ZSB3aXRoaW4gdGhlIGFycmF5IG9uIHRoZSBvdGhlciBzaWRlLCB0aGV5IHdpbGwgYmUgc2VwYXJhdGUuXG4gICAgICogWW91IGNhbiBhbHNvIHBhc3MgYSByZWd1bGFyIGV4cHJlc3Npb24gdG8gZW1pdCB0byBhbGwgZXZlbnRzIHRoYXQgbWF0Y2ggaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xSZWdFeHB9IGV2dCBOYW1lIG9mIHRoZSBldmVudCB0byBlbWl0IGFuZCBleGVjdXRlIGxpc3RlbmVycyBmb3IuXG4gICAgICogQHBhcmFtIHtBcnJheX0gW2FyZ3NdIE9wdGlvbmFsIGFycmF5IG9mIGFyZ3VtZW50cyB0byBiZSBwYXNzZWQgdG8gZWFjaCBsaXN0ZW5lci5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKi9cbiAgICBwcm90by5lbWl0RXZlbnQgPSBmdW5jdGlvbiBlbWl0RXZlbnQoZXZ0LCBhcmdzKSB7XG4gICAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLmdldExpc3RlbmVyc0FzT2JqZWN0KGV2dCk7XG4gICAgICAgIHZhciBsaXN0ZW5lcjtcbiAgICAgICAgdmFyIGk7XG4gICAgICAgIHZhciBrZXk7XG4gICAgICAgIHZhciByZXNwb25zZTtcblxuICAgICAgICBmb3IgKGtleSBpbiBsaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIGlmIChsaXN0ZW5lcnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIGkgPSBsaXN0ZW5lcnNba2V5XS5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSBsaXN0ZW5lciByZXR1cm5zIHRydWUgdGhlbiBpdCBzaGFsbCBiZSByZW1vdmVkIGZyb20gdGhlIGV2ZW50XG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZSBmdW5jdGlvbiBpcyBleGVjdXRlZCBlaXRoZXIgd2l0aCBhIGJhc2ljIGNhbGwgb3IgYW4gYXBwbHkgaWYgdGhlcmUgaXMgYW4gYXJncyBhcnJheVxuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lciA9IGxpc3RlbmVyc1trZXldW2ldO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lci5vbmNlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKGV2dCwgbGlzdGVuZXIubGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBsaXN0ZW5lci5saXN0ZW5lci5hcHBseSh0aGlzLCBhcmdzIHx8IFtdKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UgPT09IHRoaXMuX2dldE9uY2VSZXR1cm5WYWx1ZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKGV2dCwgbGlzdGVuZXIubGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFsaWFzIG9mIGVtaXRFdmVudFxuICAgICAqL1xuICAgIHByb3RvLnRyaWdnZXIgPSBhbGlhcygnZW1pdEV2ZW50Jyk7XG5cbiAgICAvKipcbiAgICAgKiBTdWJ0bHkgZGlmZmVyZW50IGZyb20gZW1pdEV2ZW50IGluIHRoYXQgaXQgd2lsbCBwYXNzIGl0cyBhcmd1bWVudHMgb24gdG8gdGhlIGxpc3RlbmVycywgYXMgb3Bwb3NlZCB0byB0YWtpbmcgYSBzaW5nbGUgYXJyYXkgb2YgYXJndW1lbnRzIHRvIHBhc3Mgb24uXG4gICAgICogQXMgd2l0aCBlbWl0RXZlbnQsIHlvdSBjYW4gcGFzcyBhIHJlZ2V4IGluIHBsYWNlIG9mIHRoZSBldmVudCBuYW1lIHRvIGVtaXQgdG8gYWxsIGV2ZW50cyB0aGF0IG1hdGNoIGl0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8UmVnRXhwfSBldnQgTmFtZSBvZiB0aGUgZXZlbnQgdG8gZW1pdCBhbmQgZXhlY3V0ZSBsaXN0ZW5lcnMgZm9yLlxuICAgICAqIEBwYXJhbSB7Li4uKn0gT3B0aW9uYWwgYWRkaXRpb25hbCBhcmd1bWVudHMgdG8gYmUgcGFzc2VkIHRvIGVhY2ggbGlzdGVuZXIuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgcHJvdG8uZW1pdCA9IGZ1bmN0aW9uIGVtaXQoZXZ0KSB7XG4gICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW1pdEV2ZW50KGV2dCwgYXJncyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGN1cnJlbnQgdmFsdWUgdG8gY2hlY2sgYWdhaW5zdCB3aGVuIGV4ZWN1dGluZyBsaXN0ZW5lcnMuIElmIGFcbiAgICAgKiBsaXN0ZW5lcnMgcmV0dXJuIHZhbHVlIG1hdGNoZXMgdGhlIG9uZSBzZXQgaGVyZSB0aGVuIGl0IHdpbGwgYmUgcmVtb3ZlZFxuICAgICAqIGFmdGVyIGV4ZWN1dGlvbi4gVGhpcyB2YWx1ZSBkZWZhdWx0cyB0byB0cnVlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgbmV3IHZhbHVlIHRvIGNoZWNrIGZvciB3aGVuIGV4ZWN1dGluZyBsaXN0ZW5lcnMuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgcHJvdG8uc2V0T25jZVJldHVyblZhbHVlID0gZnVuY3Rpb24gc2V0T25jZVJldHVyblZhbHVlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX29uY2VSZXR1cm5WYWx1ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRmV0Y2hlcyB0aGUgY3VycmVudCB2YWx1ZSB0byBjaGVjayBhZ2FpbnN0IHdoZW4gZXhlY3V0aW5nIGxpc3RlbmVycy4gSWZcbiAgICAgKiB0aGUgbGlzdGVuZXJzIHJldHVybiB2YWx1ZSBtYXRjaGVzIHRoaXMgb25lIHRoZW4gaXQgc2hvdWxkIGJlIHJlbW92ZWRcbiAgICAgKiBhdXRvbWF0aWNhbGx5LiBJdCB3aWxsIHJldHVybiB0cnVlIGJ5IGRlZmF1bHQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHsqfEJvb2xlYW59IFRoZSBjdXJyZW50IHZhbHVlIHRvIGNoZWNrIGZvciBvciB0aGUgZGVmYXVsdCwgdHJ1ZS5cbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBwcm90by5fZ2V0T25jZVJldHVyblZhbHVlID0gZnVuY3Rpb24gX2dldE9uY2VSZXR1cm5WYWx1ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzT3duUHJvcGVydHkoJ19vbmNlUmV0dXJuVmFsdWUnKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX29uY2VSZXR1cm5WYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEZldGNoZXMgdGhlIGV2ZW50cyBvYmplY3QgYW5kIGNyZWF0ZXMgb25lIGlmIHJlcXVpcmVkLlxuICAgICAqXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgZXZlbnRzIHN0b3JhZ2Ugb2JqZWN0LlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIHByb3RvLl9nZXRFdmVudHMgPSBmdW5jdGlvbiBfZ2V0RXZlbnRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZXZlbnRzIHx8ICh0aGlzLl9ldmVudHMgPSB7fSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldmVydHMgdGhlIGdsb2JhbCB7QGxpbmsgRXZlbnRFbWl0dGVyfSB0byBpdHMgcHJldmlvdXMgdmFsdWUgYW5kIHJldHVybnMgYSByZWZlcmVuY2UgdG8gdGhpcyB2ZXJzaW9uLlxuICAgICAqXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IE5vbiBjb25mbGljdGluZyBFdmVudEVtaXR0ZXIgY2xhc3MuXG4gICAgICovXG4gICAgRXZlbnRFbWl0dGVyLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiBub0NvbmZsaWN0KCkge1xuICAgICAgICBleHBvcnRzLkV2ZW50RW1pdHRlciA9IG9yaWdpbmFsR2xvYmFsVmFsdWU7XG4gICAgICAgIHJldHVybiBFdmVudEVtaXR0ZXI7XG4gICAgfTtcblxuICAgIC8vIEV4cG9zZSB0aGUgY2xhc3MgZWl0aGVyIHZpYSBBTUQsIENvbW1vbkpTIG9yIHRoZSBnbG9iYWwgb2JqZWN0XG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIEV2ZW50RW1pdHRlcjtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKXtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBleHBvcnRzLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcbiAgICB9XG59LmNhbGwodGhpcykpO1xuIiwiIyMjKlxuICogVGhlIHB1cnBvc2Ugb2YgdGhpcyBsYXllciBpcyB0byBkZWNsYXJlIGFuZCBhYnN0cmFjdCB0aGUgYWNjZXNzIHRvXG4gKiB0aGUgY29yZSBiYXNlIG9mIGxpYnJhcmllcyB0aGF0IHRoZSByZXN0IG9mIHRoZSBzdGFjayAodGhlIGFwcCBmcmFtZXdvcmspXG4gKiB3aWxsIGRlcGVuZC5cbiAqIEBhdXRob3IgRnJhbmNpc2NvIFJhbWluaSA8ZnJhbWluaSBhdCBnbWFpbC5jb20+XG4jIyNcbigocm9vdCwgZmFjdG9yeSkgLT5cblxuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyb290LCB7fSlcblxuKSh3aW5kb3csIChyb290LCBCYXNlKSAtPlxuXG4gICAgIyBBcnJheSB0aGF0IGhvbGRzIGhhcmQgZGVwZW5kZW5jaWVzIGZvciB0aGUgU0RLXG4gICAgZGVwZW5kZW5jaWVzID0gW1xuICAgICAgICAgICAgXCJuYW1lXCI6IFwialF1ZXJ5XCJcbiAgICAgICAgICAgIFwicmVxdWlyZWRcIjogXCIxLjEwXCIgIyByZXF1aXJlZCB2ZXJzaW9uXG4gICAgICAgICAgICBcIm9ialwiOiByb290LiQgIyBnbG9iYWwgb2JqZWN0XG4gICAgICAgICAgICBcInZlcnNpb25cIjogaWYgcm9vdC4kIHRoZW4gcm9vdC4kLmZuLmpxdWVyeSBlbHNlIDAgIyBnaXZlcyB0aGUgdmVyc2lvbiBudW1iZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBvZiB0aGUgbG9hZGVkIGxpYlxuICAgICAgICAsXG4gICAgICAgICAgICBcIm5hbWVcIjogXCJVbmRlcnNjb3JlXCJcbiAgICAgICAgICAgIFwicmVxdWlyZWRcIjogXCIxLjcuMFwiICMgcmVxdWlyZWQgdmVyc2lvblxuICAgICAgICAgICAgXCJvYmpcIjogcm9vdC5fICMgZ2xvYmFsIG9iamVjdFxuICAgICAgICAgICAgXCJ2ZXJzaW9uXCI6IGlmIHJvb3QuXyB0aGVuIHJvb3QuXy5WRVJTSU9OIGVsc2UgMFxuICAgIF1cblxuICAgICMgVmVyc2lvbiBjaGVja2VyIHV0aWxcbiAgICBWZXJzaW9uQ2hlY2tlciA9IHJlcXVpcmUgJy4vdXRpbC92ZXJzaW9uY2hlY2tlci5jb2ZmZWUnXG5cbiAgICAjIEluIGNhc2UgYW55IG9mIG91ciBkZXBlbmRlbmNpZXMgd2VyZSBub3QgbG9hZGVkLCBvciBpdHMgdmVyc2lvbiBkb2VzdCBub3QgY29ycmVzcG9uZCB0byBvdXJzXG4gICAgIyBuZWVkcywgdGhlIHZlcnNpb25DaGVja2VyIHdpbGwgdGhvcncgYW4gZXJyb3IgZXhwbGFpbmluZyB3aHlcbiAgICBWZXJzaW9uQ2hlY2tlci5jaGVjayhkZXBlbmRlbmNpZXMpXG5cbiAgICAjIExvZ2dlclxuICAgIEJhc2UubG9nID0gcmVxdWlyZSAnLi91dGlsL2xvZ2dlci5jb2ZmZWUnXG5cbiAgICAjIERldmljZSBkZXRlY3Rpb25cbiAgICBCYXNlLmRldmljZSA9IHJlcXVpcmUgJy4vdXRpbC9kZXZpY2VkZXRlY3Rpb24uY29mZmVlJ1xuXG4gICAgIyBDb29raWVzIEFQSVxuICAgIEJhc2UuY29va2llcyA9IHJlcXVpcmUgJy4vdXRpbC9jb29raWVzLmNvZmZlZSdcblxuICAgICMgVmlld3BvcnQgZGV0ZWN0aW9uXG4gICAgQmFzZS52cCA9IHJlcXVpcmUgJy4vdXRpbC92aWV3cG9ydGRldGVjdGlvbi5jb2ZmZWUnXG5cbiAgICAjIEZ1bmN0aW9uIHRoYXQgaXMgZ29ubmEgaGFuZGxlIHJlc3BvbnNpdmUgaW1hZ2VzXG4gICAgQmFzZS5JbWFnZXIgPSByZXF1aXJlICdpbWFnZXIuanMnXG5cbiAgICAjIEV2ZW50IEJ1c1xuICAgIEJhc2UuRXZlbnRzID0gcmVxdWlyZSAnLi91dGlsL2V2ZW50YnVzLmNvZmZlZSdcblxuICAgICMgR2VuZXJhbCBVdGlsc1xuICAgIFV0aWxzID0gcmVxdWlyZSAnLi91dGlsL2dlbmVyYWwuY29mZmVlJ1xuXG4gICAgIyBVdGlsc1xuICAgIEJhc2UudXRpbCA9IHJvb3QuXy5leHRlbmQgVXRpbHMsIHJvb3QuX1xuXG4gICAgcmV0dXJuIEJhc2VcbikiLCIoKHJvb3QsIGZhY3RvcnkpIC0+XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3Rvcnkocm9vdCwge30pXG5cbikod2luZG93LCAocm9vdCwgRXh0KSAtPlxuXG4gICAgQmFzZSAgID0gcmVxdWlyZSgnLi8uLi9iYXNlLmNvZmZlZScpXG4gICAgTW9kdWxlID0gcmVxdWlyZSgnLi8uLi91dGlsL21vZHVsZS5jb2ZmZWUnKVxuXG4gICAgY2xhc3MgQ29tcG9uZW50XG5cbiAgICAgICAgIyBvYmplY3QgdG8gc3RvcmUgaW5pdGlhbGl6ZWQgY29tcG9uZW50c1xuICAgICAgICBAaW5pdGlhbGl6ZWRDb21wb25lbnRzIDoge31cblxuICAgICAgICAjIyMqXG4gICAgICAgICAqIHN0YXJ0QWxsIG1ldGhvZFxuICAgICAgICAgKiBUaGlzIG1ldGhvZCB3aWxsIGxvb2sgZm9yIGNvbXBvbmVudHMgdG8gc3RhcnQgd2l0aGluIHRoZSBwYXNzZWQgc2VsZWN0b3JcbiAgICAgICAgICogYW5kIGNhbGwgdGhlaXIgLmluaXRpYWxpemUoKSBtZXRob2RcbiAgICAgICAgICogQGF1dGhvciBGcmFuY2lzY28gUmFtaW5pIDxmcmFuY2lzY28ucmFtaW5pIGF0IGdsb2JhbnQuY29tPlxuICAgICAgICAgKiBAcGFyYW0gIHtbdHlwZV19IHNlbGVjdG9yID0gJ2JvZHknLiBDU1Mgc2VsZWN0b3IgdG8gdGVsbCB0aGUgYXBwIHdoZXJlIHRvIGxvb2sgZm9yIGNvbXBvbmVudHNcbiAgICAgICAgICogQHJldHVybiB7W3R5cGVdfVxuICAgICAgICAjIyNcbiAgICAgICAgQHN0YXJ0QWxsOiAoc2VsZWN0b3IgPSAnYm9keScsIGFwcCwgbmFtZXNwYWNlID0gUGVzdGxlLm1vZHVsZXMpIC0+XG5cbiAgICAgICAgICAgIGNvbXBvbmVudHMgPSBDb21wb25lbnQucGFyc2Uoc2VsZWN0b3IsIGFwcC5jb25maWcubmFtZXNwYWNlKVxuXG4gICAgICAgICAgICBjbXBjbG9uZSA9IEJhc2UudXRpbC5jbG9uZSBjb21wb25lbnRzXG5cbiAgICAgICAgICAgIEJhc2UubG9nLmluZm8gXCJQYXJzZWQgY29tcG9uZW50c1wiXG4gICAgICAgICAgICBCYXNlLmxvZy5kZWJ1ZyBjbXBjbG9uZVxuXG4gICAgICAgICAgICAjIGFkZGVkIHRvIGtlZXAgbmFtZXNwYWNlLk5BTUUgPSBERUZJTklUSU9OIHNpbnRheC4gVGhpcyB3aWxsIGV4dGVuZFxuICAgICAgICAgICAgIyB0aGUgb2JqZWN0IGRlZmluaXRpb24gd2l0aCB0aGUgTW9kdWxlIGNsYXNzXG4gICAgICAgICAgICAjIHRoaXMgbWlnaHQgbmVlZCB0byBiZSByZW1vdmVkXG4gICAgICAgICAgICB1bmxlc3MgQmFzZS51dGlsLmlzRW1wdHkgY29tcG9uZW50c1xuICAgICAgICAgICAgICAgIEJhc2UudXRpbC5lYWNoIG5hbWVzcGFjZSwgKGRlZmluaXRpb24sIG5hbWUpIC0+XG4gICAgICAgICAgICAgICAgICAgIHVubGVzcyBCYXNlLnV0aWwuaXNGdW5jdGlvbiBkZWZpbml0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICBNb2R1bGUuZXh0ZW5kIG5hbWUsIGRlZmluaXRpb25cblxuICAgICAgICAgICAgIyBncmFiIGEgcmVmZXJlbmNlIG9mIGFsbCB0aGUgbW9kdWxlIGRlZmluZWQgdXNpbmcgdGhlIE1vZHVsZS5hZGRcbiAgICAgICAgICAgICMgbWV0aG9kLlxuICAgICAgICAgICAgQmFzZS51dGlsLmV4dGVuZCBuYW1lc3BhY2UsIFBlc3RsZS5Nb2R1bGUubGlzdFxuXG4gICAgICAgICAgICBDb21wb25lbnQuaW5zdGFudGlhdGUoY29tcG9uZW50cywgYXBwKVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGFsbDogQ29tcG9uZW50LmluaXRpYWxpemVkQ29tcG9uZW50c1xuICAgICAgICAgICAgICAgIG5ldzogY21wY2xvbmVcbiAgICAgICAgICAgIH1cblxuICAgICAgICAjIyMqXG4gICAgICAgICAqIHRoZSBwYXJzZSBtZXRob2Qgd2lsbCBsb29rIGZvciBjb21wb25lbnRzIGRlZmluZWQgdXNpbmdcbiAgICAgICAgICogdGhlIGNvbmZpZ3VyZWQgbmFtZXNwYWNlIGFuZCBsaXZpbmcgd2l0aGluIHRoZSBwYXNzZWRcbiAgICAgICAgICogQ1NTIHNlbGVjdG9yXG4gICAgICAgICAqIEBhdXRob3IgRnJhbmNpc2NvIFJhbWluaSA8ZnJhbWluaSBhdCBnbWFpbC5jb20+XG4gICAgICAgICAqIEBwYXJhbSAge1t0eXBlXX0gc2VsZWN0b3IgIFtkZXNjcmlwdGlvbl1cbiAgICAgICAgICogQHBhcmFtICB7W3R5cGVdfSBuYW1lc3BhY2UgW2Rlc2NyaXB0aW9uXVxuICAgICAgICAgKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICAgICMjI1xuICAgICAgICBAcGFyc2U6IChzZWxlY3RvciwgbmFtZXNwYWNlKSAtPlxuICAgICAgICAgICAgIyBhcnJheSB0byBzdG9yZSBwYXJzZWQgY29tcG9uZW50c1xuICAgICAgICAgICAgbGlzdCA9IFtdXG5cbiAgICAgICAgICAgICMgaWYgYW4gYXJyYXkgaXMgcGFzc2VkLCB1c2UgaXQgYXMgaXQgaXNcbiAgICAgICAgICAgIGlmIEJhc2UudXRpbC5pc0FycmF5IG5hbWVzcGFjZVxuICAgICAgICAgICAgICAgIG5hbWVzcGFjZXMgPSBuYW1lc3BhY2VcbiAgICAgICAgICAgICMgaWYgYSBzdHJpbmcgaXMgcGFzc2VkIGFzIHBhcmFtZXRlciwgY29udmVydCBpdCB0byBhbiBhcnJheVxuICAgICAgICAgICAgZWxzZSBpZiBCYXNlLnV0aWwuaXNTdHJpbmcgbmFtZXNwYWNlXG4gICAgICAgICAgICAgICAgbmFtZXNwYWNlcyA9IG5hbWVzcGFjZS5zcGxpdCAnLCdcblxuICAgICAgICAgICAgIyBhcnJheSB0byBzdG9yZSB0aGUgY29tcG9zZWQgY3NzIHNlbGVjdG9yIHRoYXQgd2lsbCBsb29rIHVwIGZvclxuICAgICAgICAgICAgIyBjb21wb25lbnQgZGVmaW5pdGlvbnNcbiAgICAgICAgICAgIGNzc1NlbGVjdG9ycyA9IFtdXG5cbiAgICAgICAgICAgICMgaXRlcmF0ZXMgb3ZlciB0aGUgbmFtZXNwYWNlIGFycmF5IGFuZCBjcmVhdGUgdGhlIG5lZWRlZCBjc3Mgc2VsZWN0b3JzXG4gICAgICAgICAgICBCYXNlLnV0aWwuZWFjaCBuYW1lc3BhY2VzLCAobnMsIGkpIC0+XG4gICAgICAgICAgICAgICAgIyBpZiBhIG5ldyBuYW1lc3BhY2UgaGFzIGJlZW4gcHJvdmlkZWQgbGV0cyBhZGQgaXQgdG8gdGhlIGxpc3RcbiAgICAgICAgICAgICAgICBjc3NTZWxlY3RvcnMucHVzaCBcIltkYXRhLVwiICsgbnMgKyBcIi1jb21wb25lbnRdXCJcblxuICAgICAgICAgICAgIyBUT0RPOiBBY2Nlc3MgdGhlc2UgRE9NIGZ1bmN0aW9uYWxpdHkgdGhyb3VnaCBCYXNlXG4gICAgICAgICAgICAkKHNlbGVjdG9yKS5maW5kKGNzc1NlbGVjdG9ycy5qb2luKCcsJykpLmVhY2ggKGksIGNvbXApIC0+XG5cbiAgICAgICAgICAgICAgICAjIGlmIHRoZSBjb21wIGFscmVhZHkgaGFzIHRoZSBwZXN0bGUtZ3VpZCBhdHRhY2hlZCwgaXQgbWVhbnNcbiAgICAgICAgICAgICAgICAjIGl0IHdhcyBhbHJlYWR5IHN0YXJ0ZWQsIHNvIHdlJ2xsIG9ubHkgbG9vayBmb3IgdW5uaXRpYWxpemVkXG4gICAgICAgICAgICAgICAgIyBjb21wb25lbnRzIGhlcmVcbiAgICAgICAgICAgICAgICB1bmxlc3MgJChjb21wKS5kYXRhKCdwZXN0bGUtZ3VpZCcpXG5cbiAgICAgICAgICAgICAgICAgICAgbnMgPSBkbyAoKSAtPlxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZXNwYWNlID0gXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgQmFzZS51dGlsLmVhY2ggbmFtZXNwYWNlcywgKG5zLCBpKSAtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICMgVGhpcyB3YXkgd2Ugb2J0YWluIHRoZSBuYW1lc3BhY2Ugb2YgdGhlIGN1cnJlbnQgY29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgJChjb21wKS5kYXRhKG5zICsgXCItY29tcG9uZW50XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVzcGFjZSA9IG5zXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuYW1lc3BhY2VcblxuICAgICAgICAgICAgICAgICAgICAjIG9wdGlvbnMgd2lsbCBob2xkIGFsbCB0aGUgZGF0YS0qIGF0dHJpYnV0ZXMgcmVsYXRlZCB0byB0aGUgY29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBDb21wb25lbnQucGFyc2VDb21wb25lbnRPcHRpb25zKEAsIG5zKVxuXG4gICAgICAgICAgICAgICAgICAgIGxpc3QucHVzaCh7IG5hbWU6IG9wdGlvbnMubmFtZSwgb3B0aW9uczogb3B0aW9ucyB9KVxuXG4gICAgICAgICAgICByZXR1cm4gbGlzdFxuXG4gICAgICAgICMgdGhpcyBtZXRob2Qgd2lsbCBiZSBpbiBjaGFyZ2Ugb2YgcGFyc2luZyBhbGwgdGhlIGRhdGEtKiBhdHRyaWJ1dGVzXG4gICAgICAgICMgZGVmaW5lZCBpbiB0aGUgaXRzICRlbCBtYXJrdXAgYW5kIHBsYWNpbmcgdGhlbSBpbiBhIG9iamVjdFxuICAgICAgICBAcGFyc2VDb21wb25lbnRPcHRpb25zOiAoZWwsIG5hbWVzcGFjZSwgb3B0cykgLT5cbiAgICAgICAgICAgIG9wdGlvbnMgPSBCYXNlLnV0aWwuY2xvbmUob3B0cyB8fCB7fSlcbiAgICAgICAgICAgIG9wdGlvbnMuZWwgPSBlbFxuXG4gICAgICAgICAgICAjIFRPRE86IGFjY2VzcyB0aGlzIERPTSBmdW5jdGlvbiB0aHJvdWdoIEJhc2VcbiAgICAgICAgICAgIGRhdGEgPSAkKGVsKS5kYXRhKClcbiAgICAgICAgICAgIG5hbWUgPSAnJ1xuICAgICAgICAgICAgbGVuZ3RoID0gMFxuXG4gICAgICAgICAgICBCYXNlLnV0aWwuZWFjaCBkYXRhLCAodiwgaykgLT5cblxuICAgICAgICAgICAgICAgICMgcmVtb3ZlcyB0aGUgbmFtZXNwYWNlXG4gICAgICAgICAgICAgICAgayA9IGsucmVwbGFjZShuZXcgUmVnRXhwKFwiXlwiICsgbmFtZXNwYWNlKSwgXCJcIilcblxuICAgICAgICAgICAgICAgICMgZGVjYW1lbGl6ZSB0aGUgb3B0aW9uIG5hbWVcbiAgICAgICAgICAgICAgICBrID0gay5jaGFyQXQoMCkudG9Mb3dlckNhc2UoKSArIGsuc2xpY2UoMSlcblxuICAgICAgICAgICAgICAgICMgaWYgdGhlIGtleSBpcyBkaWZmZXJlbnQgZnJvbSBcImNvbXBvbmVudFwiIGl0IG1lYW5zIGl0IGlzXG4gICAgICAgICAgICAgICAgIyBhbiBvcHRpb24gdmFsdWVcbiAgICAgICAgICAgICAgICBpZiBrICE9IFwiY29tcG9uZW50XCJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc1trXSA9IHZcbiAgICAgICAgICAgICAgICAgICAgbGVuZ3RoKytcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIG5hbWUgPSB2XG5cbiAgICAgICAgICAgICMgYWRkIG9uZSBiZWNhdXNlIHdlJ3ZlIGFkZGVkICdlbCcgYXV0b21hdGljYWxseSBhcyBhbiBleHRyYSBvcHRpb25cbiAgICAgICAgICAgIG9wdGlvbnMubGVuZ3RoID0gbGVuZ3RoICsgMVxuXG4gICAgICAgICAgICAjIGJ1aWxkIGFkIHJldHVybiB0aGUgb3B0aW9uIG9iamVjdFxuICAgICAgICAgICAgQ29tcG9uZW50LmJ1aWxkT3B0aW9uc09iamVjdChuYW1lLCBvcHRpb25zKVxuXG5cbiAgICAgICAgQGJ1aWxkT3B0aW9uc09iamVjdDogKG5hbWUsIG9wdGlvbnMpIC0+XG5cbiAgICAgICAgICAgIG9wdGlvbnMubmFtZSA9IG5hbWVcblxuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnNcblxuICAgICAgICBAaW5zdGFudGlhdGU6IChjb21wb25lbnRzLCBhcHApIC0+XG5cbiAgICAgICAgICAgIGlmIGNvbXBvbmVudHMubGVuZ3RoID4gMFxuXG4gICAgICAgICAgICAgICAgbSA9IGNvbXBvbmVudHMuc2hpZnQoKVxuXG4gICAgICAgICAgICAgICAgIyBDaGVjayBpZiB0aGUgbW9kdWxlcyBhcmUgZGVmaW5lZCB1c2luZyB0aGUgbW9kdWxlcyBuYW1lc3BhY2VcbiAgICAgICAgICAgICAgICAjIFRPRE86IFByb3ZpZGUgYW4gYWx0ZXJuYXRlIHdheSB0byBkZWZpbmUgdGhlXG4gICAgICAgICAgICAgICAgIyBnbG9iYWwgb2JqZWN0IHRoYXQgaXMgZ29ubmEgaG9sZCB0aGUgbW9kdWxlIGRlZmluaXRpb25cbiAgICAgICAgICAgICAgICBpZiBub3QgQmFzZS51dGlsLmlzRW1wdHkoUGVzdGxlLm1vZHVsZXMpIGFuZCBQZXN0bGUubW9kdWxlc1ttLm5hbWVdIGFuZCBtLm9wdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgbW9kID0gUGVzdGxlLm1vZHVsZXNbbS5uYW1lXVxuXG4gICAgICAgICAgICAgICAgICAgICMgY3JlYXRlIGEgbmV3IHNhbmRib3ggZm9yIHRoaXMgbW9kdWxlXG4gICAgICAgICAgICAgICAgICAgIHNiID0gYXBwLmNyZWF0ZVNhbmRib3gobS5uYW1lKVxuXG4gICAgICAgICAgICAgICAgICAgICMgZ2VuZXJhdGVzIGFuIHVuaXF1ZSBndWlkIGZvciBlYWNoIG1vZHVsZVxuICAgICAgICAgICAgICAgICAgICBwcmVmaXggPSBtLm5hbWUgKyBcIl9cIlxuICAgICAgICAgICAgICAgICAgICBtLm9wdGlvbnMuZ3VpZCA9IHByZWZpeCArIChCYXNlLnV0aWwua2V5cyhDb21wb25lbnQuaW5pdGlhbGl6ZWRDb21wb25lbnRzKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlciAoY29tcG9uZW50KSAtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBCYXNlLnV0aWwuY29udGFpbnMoY29tcG9uZW50LCBwcmVmaXgpXG4gICAgICAgICAgICAgICAgICAgICAgICAubGVuZ3RoICsgMSlcblxuICAgICAgICAgICAgICAgICAgICBtLm9wdGlvbnMuX19kZWZhdWx0c19fID0gYXBwLmNvbmZpZy5jb21wb25lbnRbbS5uYW1lXVxuXG4gICAgICAgICAgICAgICAgICAgICMgaW5qZWN0IHRoZSBzYW5kYm94IGFuZCB0aGUgb3B0aW9ucyBpbiB0aGUgbW9kdWxlIHByb3RvXG4gICAgICAgICAgICAgICAgICAgICMgQmFzZS51dGlsLmV4dGVuZCBtb2QsIHNhbmRib3ggOiBzYiwgb3B0aW9uczogbS5vcHRpb25zXG4gICAgICAgICAgICAgICAgICAgIG1vZHggPSBuZXcgbW9kKHNhbmRib3ggOiBzYiwgb3B0aW9uczogbS5vcHRpb25zKVxuXG4gICAgICAgICAgICAgICAgICAgICMgaW5pdCB0aGUgbW9kdWxlXG4gICAgICAgICAgICAgICAgICAgIG1vZHguaW5pdGlhbGl6ZSgpXG5cbiAgICAgICAgICAgICAgICAgICAgIyBzdG9yZSBhIHJlZmVyZW5jZSBvZiB0aGUgZ2VuZXJhdGVkIGd1aWQgb24gdGhlIGVsXG4gICAgICAgICAgICAgICAgICAgICQobS5vcHRpb25zLmVsKS5kYXRhICdwZXN0bGUtZ3VpZCcsIG0ub3B0aW9ucy5ndWlkXG5cbiAgICAgICAgICAgICAgICAgICAgIyBzYXZlcyBhIHJlZmVyZW5jZSBvZiB0aGUgaW5pdGlhbGl6ZWQgbW9kdWxlXG4gICAgICAgICAgICAgICAgICAgIENvbXBvbmVudC5pbml0aWFsaXplZENvbXBvbmVudHNbIG0ub3B0aW9ucy5ndWlkIF0gPSBtb2R4XG5cbiAgICAgICAgICAgICAgICBDb21wb25lbnQuaW5zdGFudGlhdGUoY29tcG9uZW50cywgYXBwKVxuXG5cbiAgICAjI1xuICAgICMgcmV0dXJucyBhbiBvYmplY3Qgd2l0aCB0aGUgaW5pdGlhbGl6ZSBtZXRob2QgdGhhdCB3aWxsIGluaXQgdGhlIGV4dGVuc2lvblxuICAgICMjXG5cbiAgICAjIGNvbnN0cnVjdG9yXG4gICAgaW5pdGlhbGl6ZSA6IChhcHApIC0+XG5cbiAgICAgICAgQmFzZS5sb2cuaW5mbyBcIltleHRdIENvbXBvbmVudCBleHRlbnNpb24gaW5pdGlhbGl6ZWRcIlxuXG4gICAgICAgIGluaXRpYWxpemVkQ29tcG9uZW50cyA9IHt9XG5cbiAgICAgICAgYXBwLnNhbmRib3guc3RhcnRDb21wb25lbnRzID0gKHNlbGVjdG9yLCBhcHApIC0+XG5cbiAgICAgICAgICAgIGluaXRpYWxpemVkQ29tcG9uZW50cyA9IENvbXBvbmVudC5zdGFydEFsbChzZWxlY3RvciwgYXBwKVxuXG4gICAgICAgIGFwcC5zYW5kYm94LmdldEluaXRpYWxpemVkQ29tcG9uZW50cyA9ICgpIC0+XG5cbiAgICAgICAgICAgIHJldHVybiBpbml0aWFsaXplZENvbXBvbmVudHMuYWxsXG5cbiAgICAgICAgYXBwLnNhbmRib3guZ2V0TGFzdGVzdEluaXRpYWxpemVkQ29tcG9uZW50cyA9ICgpIC0+XG5cbiAgICAgICAgICAgIHJldHVybiBpbml0aWFsaXplZENvbXBvbmVudHMubmV3XG5cblxuICAgICMgdGhpcyBtZXRob2Qgd2lsbCBiZSBjYWxsZWQgb25jZSBhbGwgdGhlIGV4dGVuc2lvbnMgaGF2ZSBiZWVuIGxvYWRlZFxuICAgIGFmdGVyQXBwU3RhcnRlZDogKHNlbGVjdG9yLCBhcHApIC0+XG5cbiAgICAgICAgQmFzZS5sb2cuaW5mbyBcIkNhbGxpbmcgc3RhcnRDb21wb25lbnRzIGZyb20gYWZ0ZXJBcHBTdGFydGVkXCJcbiAgICAgICAgcyA9IGlmIHNlbGVjdG9yIHRoZW4gc2VsZWN0b3IgZWxzZSBudWxsXG4gICAgICAgIGFwcC5zYW5kYm94LnN0YXJ0Q29tcG9uZW50cyhzLCBhcHApXG5cbiAgICBuYW1lOiAnQ29tcG9uZW50IEV4dGVuc2lvbidcblxuICAgICMgdGhpcyBwcm9wZXJ0eSB3aWxsIGJlIHVzZWQgZm9yIHRlc3RpbmcgcHVycG9zZXNcbiAgICAjIHRvIHZhbGlkYXRlIHRoZSBDb21wb25lbnQgY2xhc3MgaW4gaXNvbGF0aW9uXG4gICAgY2xhc3NlcyA6IENvbXBvbmVudFxuXG4gICAgIyBUaGUgZXhwb3NlZCBrZXkgbmFtZSB0aGF0IGNvdWxkIGJlIHVzZWQgdG8gcGFzcyBvcHRpb25zXG4gICAgIyB0byB0aGUgZXh0ZW5zaW9uLlxuICAgICMgVGhpcyBpcyBnb25uYSBiZSB1c2VkIHdoZW4gaW5zdGFudGlhdGluZyB0aGUgQ29yZSBvYmplY3QuXG4gICAgIyBOb3RlOiBCeSBjb252ZW50aW9uIHdlJ2xsIHVzZSB0aGUgZmlsZW5hbWVcbiAgICBvcHRpb25LZXk6ICdjb21wb25lbnRzJ1xuKVxuIiwiIyMjKlxuICogVGhpcyBleHRlbnNpb24gd2lsbCBiZSB0cmlnZ2VyaW5nIGV2ZW50cyBvbmNlIHRoZSBEZXZpY2UgaW4gd2hpY2ggdGhlXG4gKiB1c2VyIGlzIG5hdmlnYXRpbmcgdGhlIHNpdGUgaXMgZGV0ZWN0ZWQuIEl0cyBmdWNpb25hbGl0eSBtb3N0bHkgZGVwZW5kc1xuICogb24gdGhlIGNvbmZpZ3VyYXRpb25zIHNldHRpbmdzIChwcm92aWRlZCBieSBkZWZhdWx0LCBidXQgdGhleSBjYW4gYmUgb3ZlcnJpZGVuKVxuIyMjXG4oKHJvb3QsIGZhY3RvcnkpIC0+XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3Rvcnkocm9vdCwge30pXG5cbikod2luZG93LCAocm9vdCwgRXh0KSAtPlxuXG4gICAgQmFzZSA9IHJlcXVpcmUoJy4vLi4vYmFzZS5jb2ZmZWUnKVxuXG4gICAgY2xhc3MgUmVzcG9uc2l2ZURlc2lnblxuXG4gICAgICAgIGNmZyA6XG4gICAgICAgICAgICAjIFRoaXMgbGltaXQgd2lsbCBiZSB1c2VkIHRvIG1ha2UgdGhlIGRldmljZSBkZXRlY3Rpb25cbiAgICAgICAgICAgICMgd2hlbiB0aGUgdXNlciByZXNpemUgdGhlIHdpbmRvd1xuICAgICAgICAgICAgd2FpdExpbWl0OiAzMDBcblxuICAgICAgICAgICAgIyBkZWZpbmVzIGlmIHdlIGhhdmUgdG8gbGlzdGVuIGZvciB0aGUgcmVzaXplIGV2ZW50IG9uIHRoZSB3aW5kb3cgb2JqXG4gICAgICAgICAgICB3aW5kb3dSZXNpemVFdmVudDogdHJ1ZVxuXG4gICAgICAgICAgICAjIERlZmF1bHQgYnJlYWtwb2ludHNcbiAgICAgICAgICAgIGJyZWFrcG9pbnRzIDogW1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1vYmlsZVwiXG4gICAgICAgICAgICAgICAgICAgICMgdW50aWwgdGhpcyBwb2ludCB3aWxsIGJlaGF2ZXMgYXMgbW9iaWxlXG4gICAgICAgICAgICAgICAgICAgIGJwbWluOiAwXG4gICAgICAgICAgICAgICAgICAgIGJwbWF4OiA3NjdcbiAgICAgICAgICAgICAgICAsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidGFibGV0XCJcbiAgICAgICAgICAgICAgICAgICAgYnBtaW46IDc2OFxuICAgICAgICAgICAgICAgICAgICBicG1heDogOTU5XG4gICAgICAgICAgICAgICAgLFxuICAgICAgICAgICAgICAgICAgICAjIGJ5IGRlZmF1bHQgYW55dGhpbmcgZ3JlYXRlciB0aGFuIHRhYmxldCBpcyBhIGRlc2t0b3BcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkZXNrdG9wXCJcbiAgICAgICAgICAgICAgICAgICAgYnBtaW46IDk2MFxuICAgICAgICAgICAgXVxuXG4gICAgICAgIGNvbnN0cnVjdG9yOiAoY29uZmlnID0ge30pIC0+XG5cbiAgICAgICAgICAgIEJhc2UudXRpbC5iaW5kQWxsIEAsIFwiX2luaXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcImRldGVjdERldmljZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwiX2NoZWNrVmlld3BvcnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcIl9hdHRhY2hXaW5kb3dIYW5kbGVyc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJnZXREZXZpY2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgIFwiX3Jlc2l6ZUhhbmRsZXJcIlxuXG4gICAgICAgICAgICBAY29uZmlnID0gQmFzZS51dGlsLmV4dGVuZCB7fSwgQGNmZywgY29uZmlnXG5cbiAgICAgICAgICAgIEBfaW5pdCgpXG5cbiAgICAgICAgX2luaXQ6ICgpIC0+XG5cbiAgICAgICAgICAgIEBfYXR0YWNoV2luZG93SGFuZGxlcnMoKSBpZiBAY29uZmlnLndpbmRvd1Jlc2l6ZUV2ZW50XG5cbiAgICAgICAgICAgIEBkZXRlY3REZXZpY2UoKVxuXG4gICAgICAgIF9hdHRhY2hXaW5kb3dIYW5kbGVyczogKCkgLT5cblxuICAgICAgICAgICAgbGF6eVJlc2l6ZSA9IEJhc2UudXRpbC5kZWJvdW5jZSBAX3Jlc2l6ZUhhbmRsZXIsIEBjb25maWcud2FpdExpbWl0XG5cbiAgICAgICAgICAgICQod2luZG93KS5yZXNpemUobGF6eVJlc2l6ZSlcblxuICAgICAgICBfcmVzaXplSGFuZGxlcjogKCkgLT5cbiAgICAgICAgICAgICMgdHJpZ2dlcnMgYSB3aW5kb3dzcmVzaXplIGV2ZW50IHNvIHRoaXMgd2F5IHdlIGhhdmUgYSBjZW50cmFsaXplZFxuICAgICAgICAgICAgIyB3YXkgdG8gbGlzdGVuIGZvciB0aGUgcmVzaXplIGV2ZW50IG9uIHRoZSB3aW5kb3dzIGFuZCB0aGUgY29tcG9uZW5zXG4gICAgICAgICAgICAjIGNhbiBsaXN0ZW4gZGlyZWN0bHkgdG8gdGhpcyBldmVudCBpbnN0ZWFkIG9mIGRlZmluaW5nIGEgbmV3IGxpc3RlbmVyXG4gICAgICAgICAgICBQZXN0bGUuZW1pdCBcInJ3ZDp3aW5kb3dyZXNpemVcIlxuXG4gICAgICAgICAgICBAZGV0ZWN0RGV2aWNlKClcblxuICAgICAgICBkZXRlY3REZXZpY2U6ICgpIC0+XG5cbiAgICAgICAgICAgIGJwID0gQGNvbmZpZy5icmVha3BvaW50c1xuXG4gICAgICAgICAgICB2cCA9IEJhc2UudnAudmlld3BvcnRXKClcblxuICAgICAgICAgICAgIyBnZXQgYSByZWZlcmVuY2UgKGlmIGFueSkgdG8gdGhlIGNvcnJlc3BvbmRpbmcgYnJlYWtwb2ludFxuICAgICAgICAgICAgIyBkZWZpbmVkIGluIHRoZSBjb25maWcuXG4gICAgICAgICAgICB2cGQgPSBAX2NoZWNrVmlld3BvcnQodnAsIGJwKVxuXG4gICAgICAgICAgICBpZiBub3QgQmFzZS51dGlsLmlzRW1wdHkgdnBkXG5cbiAgICAgICAgICAgICAgICBjYXBpdGFsaXplZEJQTmFtZSA9IEJhc2UudXRpbC5zdHJpbmcuY2FwaXRhbGl6ZSh2cGQubmFtZSlcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAjIGxldCdzIGZpc3QgY2hlY2sgaWYgd2UgaGF2ZSBhIG1ldGhvZCB0byBkZXRlY3QgdGhlIGRldmljZSB0aHJvdWdoIFVBXG4gICAgICAgICAgICAgICAgaWYgQmFzZS51dGlsLmlzRnVuY3Rpb24gQmFzZS5kZXZpY2VbJ2lzJyArIGNhcGl0YWxpemVkQlBOYW1lXVxuICAgICAgICAgICAgICAgICAgICBVQURldGVjdG9yID0gQmFzZS5kZXZpY2VbJ2lzJyArIGNhcGl0YWxpemVkQlBOYW1lXVxuXG4gICAgICAgICAgICAgICAgIyB2YXJpYWJsZSB0aGF0IGhvbGRzIHRoZSByZXN1bHQgb2YgYSBVQSBjaGVjay5cbiAgICAgICAgICAgICAgICAjIFVubGVzcyB0aGVyZSBpcyBhIG1ldGhvZCB0byBjaGVjayB0aGUgVUEsIGxldHNcbiAgICAgICAgICAgICAgICAjIGxlYXZlIGl0IGFzIGZhbHNlIGFuZCB1c2Ugb25seSB0aGUgdmlld3BvcnQgdG9cbiAgICAgICAgICAgICAgICAjIG1ha2UgdGhlIGRldmljZSBkZXRlY3Rpb25cbiAgICAgICAgICAgICAgICBzdGF0ZVVBID0gZmFsc2VcbiAgICAgICAgICAgICAgICBpZiBCYXNlLnV0aWwuaXNGdW5jdGlvbiBVQURldGVjdG9yXG5cbiAgICAgICAgICAgICAgICAgICAgc3RhdGVVQSA9IFVBRGV0ZWN0b3IoKVxuXG4gICAgICAgICAgICAgICAgIyBGaW5hbCBjaGVjay4gRmlyc3Qgd2UnbGwgdHJ5IHRvIG1ha2UgdG8gbWFrZSB0aGUgZGVjaXNpb25cbiAgICAgICAgICAgICAgICAjIHVwb24gdGhlIGN1cnJlbnQgZGV2aWNlIGJhc2VkIG9uIFVBLCBpZiBpcyBub3QgcG9zc2libGUsIGxldHMganVzdFxuICAgICAgICAgICAgICAgICMgdXNlIHRoZSB2aWV3cG9ydFxuICAgICAgICAgICAgICAgIGlmIHN0YXRlVUEgb3IgdnBkLm5hbWVcbiAgICAgICAgICAgICAgICAgICAgIyBUcmlnZ2VyIGEgZXZlbnQgdGhhdCBmb2xsb3dzIHRoZSBmb2xsb3dpbmcgbmFtaW5nIGNvbnZlbnRpb25cbiAgICAgICAgICAgICAgICAgICAgIyByd2Q6PGRldmljZT5cbiAgICAgICAgICAgICAgICAgICAgIyBFeGFtcGxlOiByd2Q6dGFibGV0IG9yIHJ3ZDptb2JpbGVcblxuICAgICAgICAgICAgICAgICAgICBldnQgPSAncndkOicgKyB2cGQubmFtZS50b0xvd2VyQ2FzZSgpXG5cbiAgICAgICAgICAgICAgICAgICAgQmFzZS5sb2cuaW5mbyBcIltleHRdIFJlc3BvbnNpdmUgRGVzaWduIGV4dGVuc2lvbiBpcyB0cmlnZ2VyaW5nIHRoZSBmb2xsb3dpbmdcIlxuICAgICAgICAgICAgICAgICAgICBCYXNlLmxvZy5pbmZvIGV2dFxuXG4gICAgICAgICAgICAgICAgICAgIFBlc3RsZS5lbWl0IGV2dFxuXG4gICAgICAgICAgICAgICAgICAgICMgU3RvcmUgdGhlIGN1cnJlbnQgZGV2aWNlXG4gICAgICAgICAgICAgICAgICAgIEBkZXZpY2UgPSB2cGQubmFtZS50b0xvd2VyQ2FzZSgpXG5cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBtc2cgPSBcIltleHRdIFRoZSBwYXNzZWQgc2V0dGluZ3MgdG8gdGhlIFJlc3BvbnNpdmUgRGVzaWduIEV4dGVuc2lvbiBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwibWlnaHQgbm90IGJlIGNvcnJlY3Qgc2luY2Ugd2UgaGF2ZW4ndCBiZWVuIGFibGUgdG8gZGV0ZWN0IGFuIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhc29jaWF0ZWQgYnJlYWtwb2ludCB0byB0aGUgY3VycmVudCB2aWV3cG9ydFwiXG4gICAgICAgICAgICAgICAgQmFzZS5sb2cud2FybiBtc2dcblxuICAgICAgICBnZXREZXZpY2U6ICgpIC0+XG5cbiAgICAgICAgICAgIHJldHVybiBAZGV2aWNlXG5cbiAgICAgICAgIyMjKlxuICAgICAgICAgKiBkZXRlY3QgaWYgdGhlIGN1cnJlbnQgdmlld3BvcnRcbiAgICAgICAgICogY29ycmVzcG9uZCB0byBhbnkgb2YgdGhlIGRlZmluZWQgYnAgaW4gdGhlIGNvbmZpZyBzZXR0aW5nXG4gICAgICAgICAqIEBwYXJhbSAge1t0eXBlXX0gdnAgW251bWJlci4gQ3VycmVudCB2aWV3cG9ydF1cbiAgICAgICAgICogQHBhcmFtICB7W3R5cGVdfSBicmVha3BvaW50cyBbY2xvbmUgb2YgdGhlIGJyZWFrcG9pbnQga2V5IG9iamVjdF1cbiAgICAgICAgICogQHJldHVybiB7W3R5cGVdfSB0aGUgYnJlYWtwb2ludCB0aGF0IGNvcnJlc3BvbmRzIHRvIHRoZSBjdXJyZW50bHlcbiAgICAgICAgICogICAgICAgICAgICAgICAgICBkZXRlY3RlZCB2aWV3cG9ydFxuICAgICAgICAjIyNcbiAgICAgICAgX2NoZWNrVmlld3BvcnQ6ICh2cCwgYnJlYWtwb2ludHMpIC0+XG5cbiAgICAgICAgICAgIGJyZWFrcG9pbnQgPSBCYXNlLnV0aWwuZmlsdGVyKGJyZWFrcG9pbnRzLCAoYnApIC0+XG5cbiAgICAgICAgICAgICAgICAjIHN0YXJ0cyBjaGVja2luZyBpZiB0aGUgZGV0ZWN0ZWQgdmlld3BvcnQgaXNcbiAgICAgICAgICAgICAgICAjIGJpZ2dlciB0aGFuIHRoZSBicG1pbiBkZWZpbmVkIGluIHRoZSBjdXJyZW50XG4gICAgICAgICAgICAgICAgIyBpdGVyYXRlZCBicmVha3BvaW50XG4gICAgICAgICAgICAgICAgaWYgdnAgPj0gYnAuYnBtaW5cblxuICAgICAgICAgICAgICAgICAgICAjIHdlJ2xsIG5lZWQgdG8gY2hlY2sgdGhpcyB3YXkgYmVjYXVzZSBieSBkZWZhdWx0XG4gICAgICAgICAgICAgICAgICAgICMgaWYgYSBCUCBkb2Vzbid0IGhhdmUgYSBicG1heCBwcm9wZXJ0eSBpdCBtZWFuc1xuICAgICAgICAgICAgICAgICAgICAjIGlzIHRoZSBsYXN0IGFuZCBiaWdnZXIgY2FzZSB0byBjaGVjay4gQnkgZGVmYXVsdFxuICAgICAgICAgICAgICAgICAgICAjIGlzIGRlc2t0b3BcbiAgICAgICAgICAgICAgICAgICAgaWYgYnAuYnBtYXggYW5kIGJwLmJwbWF4ICE9IDBcblxuICAgICAgICAgICAgICAgICAgICAgICAgIyBpZiBpdCdzIHdpdGhpbiB0aGUgcmFuZ2UsIGFsbCBnb29kXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiB2cCA8PSBicC5icG1heFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG5cbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgIyB0aGlzIHNob3VsZCBvbmx5IGJlIHRydWUgaW4gb25seSBvbmUgY2FzZVxuICAgICAgICAgICAgICAgICAgICAgICAgIyBCeSBkZWZhdWx0LCBqdXN0IGZvciBkZXNrdG9wIHdoaWNoIGRvZXNuJ3QgaGF2ZVxuICAgICAgICAgICAgICAgICAgICAgICAgIyBhbiBcInVudGlsXCIgYnJlYWtwb2ludFxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcblxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgZmFsc2VcblxuICAgICAgICAgICAgKVxuXG4gICAgICAgICAgICBpZiBicmVha3BvaW50Lmxlbmd0aCA+IDBcbiAgICAgICAgICAgICAgICByZXR1cm4gYnJlYWtwb2ludC5zaGlmdCgpXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHt9XG5cblxuICAgICMgcmV0dXJucyBhbiBvYmplY3Qgd2l0aCB0aGUgaW5pdGlhbGl6ZSBtZXRob2QgdGhhdCB3aWxsIGJlIHVzZWQgdG9cbiAgICAjIGluaXQgdGhlIGV4dGVuc2lvblxuICAgIGluaXRpYWxpemUgOiAoYXBwKSAtPlxuXG4gICAgICAgIEJhc2UubG9nLmluZm8gXCJbZXh0XSBSZXNwb25zaXZlIERlc2lnbiBFeHRlbnNpb24gaW5pdGlhbGl6ZWRcIlxuXG4gICAgICAgIGNvbmZpZyA9IHt9XG5cbiAgICAgICAgIyBDaGVjayBpZiB0aGUgZXh0ZW5zaW9uIGhhcyBhIGN1c3RvbSBjb25maWcgdG8gdXNlXG4gICAgICAgIGlmIGFwcC5jb25maWcuZXh0ZW5zaW9uIGFuZCBhcHAuY29uZmlnLmV4dGVuc2lvbltAb3B0aW9uS2V5XVxuICAgICAgICAgICAgY29uZmlnID0gQmFzZS51dGlsLmRlZmF1bHRzIHt9LCBhcHAuY29uZmlnLmV4dGVuc2lvbltAb3B0aW9uS2V5XVxuXG4gICAgICAgIHJ3ZCA9IG5ldyBSZXNwb25zaXZlRGVzaWduKGNvbmZpZylcblxuICAgICAgICBhcHAuc2FuZGJveC5yd2QgPSAoKSAtPlxuICAgICAgICAgICAgIyBjYWxsIGRldGVjdCBEZXZpY2UgaW4gb3JkZXIgdG8gdHJpZ2dlciB0aGUgY29ycmVzcG9uZGluZ1xuICAgICAgICAgICAgIyBkZXZpY2UgZXZlbnRcbiAgICAgICAgICAgIHJ3ZC5kZXRlY3REZXZpY2UoKVxuXG4gICAgICAgIGFwcC5zYW5kYm94LnJ3ZC5nZXREZXZpY2UgPSAoKSAtPlxuXG4gICAgICAgICAgICByd2QuZ2V0RGV2aWNlKClcblxuICAgICMgdGhpcyBtZXRob2QgaXMgbWVhbnQgdG8gYmUgZXhlY3V0ZWQgYWZ0ZXIgY29tcG9uZW50cyBoYXZlIGJlZW5cbiAgICAjIGluaXRpYWxpemVkXG4gICAgYWZ0ZXJBcHBJbml0aWFsaXplZDogKGFwcCkgLT5cblxuICAgICAgICBCYXNlLmxvZy5pbmZvIFwiYWZ0ZXJBcHBJbml0aWFsaXplZCBtZXRob2QgZnJvbSBSZXNwb25zaXZlRGVzaWduXCJcblxuICAgICAgICBhcHAuc2FuZGJveC5yd2QoKVxuXG4gICAgbmFtZTogJ1Jlc3BvbnNpdmUgRGVzaWduIEV4dGVuc2lvbidcblxuICAgICMgVGhlIGV4cG9zZWQga2V5IG5hbWUgdGhhdCBjb3VsZCBiZSB1c2VkIHRvIHBhc3Mgb3B0aW9uc1xuICAgICMgdG8gdGhlIGV4dGVuc2lvbi5cbiAgICAjIFRoaXMgaXMgZ29ubmEgYmUgdXNlZCB3aGVuIGluc3RhbnRpYXRpbmcgdGhlIENvcmUgb2JqZWN0LlxuICAgICMgTm90ZTogQnkgY29udmVudGlvbiB3ZSdsbCB1c2UgdGhlIGZpbGVuYW1lXG4gICAgb3B0aW9uS2V5OiAncmVzcG9uc2l2ZWRlc2lnbidcbikiLCIjIyMqXG4gKiBUaGlzIGV4dGVuc2lvbiB3aWxsIGJlIGhhbmRsaW5nIHRoZSBjcmVhdGlvbiBvZiB0aGUgcmVzcG9uc2l2ZSBpbWFnZXNcbiMjI1xuKChyb290LCBmYWN0b3J5KSAtPlxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJvb3QsIHt9KVxuXG4pKHdpbmRvdywgKHJvb3QsIEV4dCkgLT5cblxuICAgIEJhc2UgPSByZXF1aXJlKCcuLy4uL2Jhc2UuY29mZmVlJylcblxuICAgIGNsYXNzIFJlc3BvbnNpdmVJbWFnZXNcblxuICAgICAgICBjZmcgOlxuICAgICAgICAgICAgIyBBcnJheSBvZiBzdXBwb3J0ZWQgUGl4ZWwgd2lkdGggZm9yIGltYWdlc1xuICAgICAgICAgICAgYXZhaWxhYmxlV2lkdGhzOiBbMTMzLDE1MiwxNjIsMjI1LDIxMCwyMjQsMjgwLDM1Miw0NzAsNTM2LDU5MCw2NzYsNzEwLDc2OCw4ODUsOTQ1LDExOTBdXG5cbiAgICAgICAgICAgICMgQXJyYXkgb2Ygc3VwcG9ydGVyIHBpeGVsIHJhdGlvc1xuICAgICAgICAgICAgYXZhaWxhYmxlUGl4ZWxSYXRpb3M6IFsxLCAyLCAzXVxuXG4gICAgICAgICAgICAjIFNlbGVjdG9yIHRvIGJlIHVzZWQgd2hlbiBpbnN0YW50aW5nIEltYWdlclxuICAgICAgICAgICAgZGVmYXVsdFNlbGVjdG9yIDogJy5kZWxheWVkLWltYWdlLWxvYWQnXG5cbiAgICAgICAgICAgICMgbGF6eSBtb2RlIGVuYWJsZWRcbiAgICAgICAgICAgIGxhenltb2RlIDogdHJ1ZVxuXG4gICAgICAgIGNvbnN0cnVjdG9yOiAoY29uZmlnID0ge30pIC0+XG5cbiAgICAgICAgICAgIEJhc2UudXRpbC5iaW5kQWxsIEAsIFwiX2luaXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcIl9jcmVhdGVMaXN0ZW5lcnNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcIl9jcmVhdGVJbnN0YW5jZVwiXG5cbiAgICAgICAgICAgIEBjb25maWcgPSBCYXNlLnV0aWwuZXh0ZW5kIHt9LCBAY2ZnLCBjb25maWdcblxuICAgICAgICAgICAgQF9pbml0KClcblxuICAgICAgICBfaW5pdDogKCkgLT5cblxuICAgICAgICAgICAgIyBjcmVhdGVzIGxpc3RlbmVycyB0byBhbGxvdyB0aGUgaW5zdGFudGlhdG9uIG9mIHRoZSBJbWFnZXJcbiAgICAgICAgICAgICMgaW4gbGF6eSBsb2FkIG1vZGUuXG4gICAgICAgICAgICAjIFVzZWZ1bCBmb3IgaW5maW5pdGUgc2Nyb2xscyBvciBpbWFnZXMgY3JlYXRlZCBvbiBkZW1hbmRcbiAgICAgICAgICAgIEBfY3JlYXRlTGlzdGVuZXJzKCkgaWYgQGNvbmZpZy5sYXp5bW9kZVxuXG4gICAgICAgICAgICAjIEFzIHNvb24gYXMgdGhpcyBleHRlbnNpb24gaXMgaW5pdGlhbGl6ZWQgd2UgYXJlIGdvbm5hIGJlIGNyZWF0aW5nXG4gICAgICAgICAgICAjIHRoZSByZXNwb25zaXZlIGltYWdlc1xuICAgICAgICAgICAgQF9jcmVhdGVJbnN0YW5jZSgpXG5cbiAgICAgICAgX2NyZWF0ZUxpc3RlbmVyczogKCkgLT5cbiAgICAgICAgICAgICMgdGhpcyBnaXZlcyB0aGUgYWJpbGl0eSB0byBjcmVhdGUgcmVzcG9uc2l2ZSBpbWFnZXNcbiAgICAgICAgICAgICMgYnkgdHJpZ2dlciB0aGlzIGV2ZW50IHdpdGggb3B0aW9uYWwgYXR0cmlidXRlc1xuICAgICAgICAgICAgUGVzdGxlLm9uICdyZXNwb25zaXZlaW1hZ2VzOmNyZWF0ZScsIEBfY3JlYXRlSW5zdGFuY2VcblxuICAgICAgICBfY3JlYXRlSW5zdGFuY2UgOiAob3B0aW9ucyA9IHt9KSAtPlxuXG4gICAgICAgICAgICBCYXNlLmxvZy5pbmZvIFwiW2V4dF0gUmVzcG9uc2l2ZSBJbWFnZXMgRXh0ZW5zaW9uIGNyZWF0aW5nIGEgbmV3IEltYWdlciBpbnN0YW5jZVwiXG5cbiAgICAgICAgICAgIHNlbGVjdG9yID0gb3B0aW9ucy5zZWxlY3RvciBvciBAY29uZmlnLmRlZmF1bHRTZWxlY3RvclxuICAgICAgICAgICAgb3B0cyA9IGlmIG5vdCBCYXNlLnV0aWwuaXNFbXB0eSBvcHRpb25zIHRoZW4gb3B0aW9ucyBlbHNlIEBjb25maWdcblxuICAgICAgICAgICAgbmV3IEJhc2UuSW1hZ2VyKHNlbGVjdG9yLCBvcHRzKVxuXG4gICAgIyByZXR1cm5zIGFuIG9iamVjdCB3aXRoIHRoZSBpbml0aWFsaXplIG1ldGhvZCB0aGF0IHdpbGwgYmUgdXNlZCB0b1xuICAgICMgaW5pdCB0aGUgZXh0ZW5zaW9uXG4gICAgaW5pdGlhbGl6ZSA6IChhcHApIC0+XG5cbiAgICAgICAgQmFzZS5sb2cuaW5mbyBcIltleHRdIFJlc3BvbnNpdmUgSW1hZ2VzIEV4dGVuc2lvbiBpbml0aWFsaXplZFwiXG5cbiAgICAgICAgY29uZmlnID0ge31cblxuICAgICAgICAjIENoZWNrIGlmIHRoZSBleHRlbnNpb24gaGFzIGEgY3VzdG9tIGNvbmZpZyB0byB1c2VcbiAgICAgICAgaWYgYXBwLmNvbmZpZy5leHRlbnNpb24gYW5kIGFwcC5jb25maWcuZXh0ZW5zaW9uW0BvcHRpb25LZXldXG4gICAgICAgICAgICBjb25maWcgPSBCYXNlLnV0aWwuZGVmYXVsdHMge30sIGFwcC5jb25maWcuZXh0ZW5zaW9uW0BvcHRpb25LZXldXG5cbiAgICAgICAgYXBwLnNhbmRib3gucmVzcG9uc2l2ZWltYWdlcyA9ICgpIC0+XG5cbiAgICAgICAgICAgIHJwID0gbmV3IFJlc3BvbnNpdmVJbWFnZXMoY29uZmlnKVxuXG4gICAgICAgICAgICAjIHRyaWdnZXIgdGhlIGV2ZW50IHRvIGxldCBldmVyeWJvZHkga25vd3MgdGhhdCB0aGlzIGV4dGVuc2lvbiBmaW5pc2hlZFxuICAgICAgICAgICAgIyBpdHMgaW5pdGlhbGl6YXRpb25cbiAgICAgICAgICAgIFBlc3RsZS5lbWl0ICdyZXNwb25zaXZlaW1hZ2VzOmluaXRpYWxpemVkJ1xuXG4gICAgIyB0aGlzIG1ldGhvZCBpcyBtZWFudCB0byBiZSBleGVjdXRlZCBhZnRlciBjb21wb25lbnRzIGhhdmUgYmVlblxuICAgICMgaW5pdGlhbGl6ZWRcbiAgICBhZnRlckFwcEluaXRpYWxpemVkOiAoYXBwKSAtPlxuXG4gICAgICAgIEJhc2UubG9nLmluZm8gXCJhZnRlckFwcEluaXRpYWxpemVkIG1ldGhvZCBmcm9tIFJlc3BvbnNpdmVJbWFnZXNcIlxuXG4gICAgICAgIGFwcC5zYW5kYm94LnJlc3BvbnNpdmVpbWFnZXMoKVxuXG5cbiAgICBuYW1lOiAnUmVzcG9uc2l2ZSBJbWFnZXMgRXh0ZW5zaW9uJ1xuXG4gICAgIyBUaGUgZXhwb3NlZCBrZXkgbmFtZSB0aGF0IGNvdWxkIGJlIHVzZWQgdG8gcGFzcyBvcHRpb25zXG4gICAgIyB0byB0aGUgZXh0ZW5zaW9uLlxuICAgICMgVGhpcyBpcyBnb25uYSBiZSB1c2VkIHdoZW4gaW5zdGFudGlhdGluZyB0aGUgQ29yZSBvYmplY3QuXG4gICAgIyBOb3RlOiBCeSBjb252ZW50aW9uIHdlJ2xsIHVzZSB0aGUgZmlsZW5hbWVcbiAgICBvcHRpb25LZXk6ICdyZXNwb25zaXZlaW1hZ2VzJ1xuKVxuIiwiKChyb290LCBmYWN0b3J5KSAtPlxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJvb3QsIHt9KVxuXG4pKHdpbmRvdywgKHJvb3QsIENvb2tpZXMpIC0+XG5cbiAgICAjIExvZ2dlclxuICAgIGNvb2tpZXMgPSByZXF1aXJlKCdjb29raWVzLWpzJylcblxuICAgICMgRXhwb3NlIENvb2tpZXMgQVBJXG4gICAgQ29va2llcyA9XG5cbiAgICAgICAgc2V0OiAoa2V5LCB2YWx1ZSwgb3B0aW9ucykgLT5cbiAgICAgICAgICAgIGNvb2tpZXMuc2V0IGtleSwgdmFsdWUsIG9wdGlvbnNcblxuICAgICAgICBnZXQ6IChrZXkpIC0+XG4gICAgICAgICAgICBjb29raWVzLmdldCBrZXlcblxuICAgICAgICBleHBpcmU6IChrZXksIG9wdGlvbnMpIC0+XG4gICAgICAgICAgICBjb29raWVzLmV4cGlyZSBrZXksIG9wdGlvbnNcblxuICAgIHJldHVybiBDb29raWVzXG4pIiwiKChyb290LCBmYWN0b3J5KSAtPlxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJvb3QsIHt9KVxuXG4pKHdpbmRvdywgKHJvb3QsIERldmljZURldGVjdGlvbikgLT5cblxuICAgICMgRGV2aWNlIGRldGVjdGlvblxuICAgIGlzTW9iaWxlID0gcmVxdWlyZSgnaXNtb2JpbGVqcycpXG5cbiAgICAjIEV4cG9zZSBkZXZpY2UgZGV0ZWN0aW9uIEFQSVxuICAgIERldmljZURldGVjdGlvbiA9XG5cbiAgICAgICAgIyBHcm91cHNcbiAgICAgICAgaXNNb2JpbGU6ICgpIC0+XG4gICAgICAgICAgICBpc01vYmlsZS5waG9uZVxuXG4gICAgICAgIGlzVGFibGV0OiAoKSAtPlxuICAgICAgICAgICAgaXNNb2JpbGUudGFibGV0XG5cbiAgICAgICAgIyBBcHBsZSBkZXZpY2VzXG4gICAgICAgIGlzSXBob25lOiAoKSAtPlxuICAgICAgICAgICAgaXNNb2JpbGUuYXBwbGUucGhvbmVcblxuICAgICAgICBpc0lwb2Q6ICgpIC0+XG4gICAgICAgICAgICBpc01vYmlsZS5hcHBsZS5pcG9kXG5cbiAgICAgICAgaXNJcGFkOiAoKSAtPlxuICAgICAgICAgICAgaXNNb2JpbGUuYXBwbGUudGFibGV0XG5cbiAgICAgICAgaXNBcHBsZSA6ICgpIC0+XG4gICAgICAgICAgICBpc01vYmlsZS5hcHBsZS5kZXZpY2VcblxuICAgICAgICAjIEFuZHJvaWQgZGV2aWNlc1xuICAgICAgICBpc0FuZHJvaWRQaG9uZTogKCkgLT5cbiAgICAgICAgICAgIGlzTW9iaWxlLmFuZHJvaWQucGhvbmVcblxuICAgICAgICBpc0FuZHJvaWRUYWJsZXQ6ICgpIC0+XG4gICAgICAgICAgICBpc01vYmlsZS5hbmRyb2lkLnRhYmxldFxuXG4gICAgICAgIGlzQW5kcm9pZERldmljZTogKCkgLT5cbiAgICAgICAgICAgIGlzTW9iaWxlLmFuZHJvaWQuZGV2aWNlXG5cbiAgICAgICAgIyBXaW5kb3dzIGRldmljZXNcbiAgICAgICAgaXNXaW5kb3dzUGhvbmU6ICgpIC0+XG4gICAgICAgICAgICBpc01vYmlsZS53aW5kb3dzLnBob25lXG5cbiAgICAgICAgaXNXaW5kb3dzVGFibGV0OiAoKSAtPlxuICAgICAgICAgICAgaXNNb2JpbGUud2luZG93cy50YWJsZXRcblxuICAgICAgICBpc1dpbmRvd3NEZXZpY2U6ICgpIC0+XG4gICAgICAgICAgICBpc01vYmlsZS53aW5kb3dzLmRldmljZVxuXG4gICAgcmV0dXJuIERldmljZURldGVjdGlvblxuKSIsIigocm9vdCwgZmFjdG9yeSkgLT5cblxuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyb290LCB7fSlcblxuKSh3aW5kb3csIChyb290LCBFdmVudEJ1cykgLT5cblxuICAgIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ3dvbGZ5ODctZXZlbnRlbWl0dGVyJylcblxuICAgICMjIypcbiAgICAgKiBjbGFzcyB0aGF0IHNlcnZlcyBhcyBhIGZhY2FkZSBmb3IgdGhlIEV2ZW50RW1pdHRlciBjbGFzc1xuICAgICMjI1xuICAgIGNsYXNzIEV2ZW50QnVzIGV4dGVuZHMgRXZlbnRFbWl0dGVyXG5cbiAgICByZXR1cm4gRXZlbnRCdXNcbikiLCIjIyMqXG4gKiBUaGUgRXh0ZW5zaW9uIE1hbmFuZ2VyIHdpbGwgcHJvdmlkZSB0aGUgYmFzZSBzZXQgb2YgZnVuY3Rpb25hbGl0aWVzXG4gKiB0byBtYWtlIHRoZSBDb3JlIGxpYnJhcnkgZXh0ZW5zaWJsZS5cbiAqIEBhdXRob3IgRnJhbmNpc2NvIFJhbWluaSA8ZnJhbWluaSBhdCBnbWFpbC5jb20+XG4jIyNcbigocm9vdCwgZmFjdG9yeSkgLT5cblxuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyb290LCB7fSlcblxuKSh3aW5kb3csIChyb290LCBFeHRNYW5hZ2VyKSAtPlxuXG4gICAgQmFzZSA9IHJlcXVpcmUoJy4uL2Jhc2UuY29mZmVlJylcblxuICAgIGNsYXNzIEV4dE1hbmFnZXJcblxuICAgICAgICAjIyMqXG4gICAgICAgICAqIERlZmF1bHRzIGNvbmZpZ3MgZm9yIHRoZSBtb2R1bGVcbiAgICAgICAgICogQHR5cGUge1t0eXBlXX1cbiAgICAgICAgIyMjXG4gICAgICAgIF9leHRlbnNpb25Db25maWdEZWZhdWx0czpcbiAgICAgICAgICAgIGFjdGl2YXRlZCA6IHRydWUgIyB1bmxlc3Mgc2FpZCBvdGhlcndpc2UsIGV2ZXJ5IGFkZGVkIGV4dGVuc2lvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjIHdpbGwgYmUgYWN0aXZhdGVkIG9uIHN0YXJ0XG5cbiAgICAgICAgY29uc3RydWN0b3I6ICgpIC0+XG4gICAgICAgICAgICAjIHRvIGtlZXAgdHJhY2sgb2YgYWxsIGV4dGVuc2lvbnNcbiAgICAgICAgICAgIEBfZXh0ZW5zaW9ucyA9IFtdXG5cbiAgICAgICAgICAgICMgdG8ga2VlcCB0cmFjayBvZiBhbGwgaW5pdGlhbGl6ZWQgZXh0ZW5zaW9uXG4gICAgICAgICAgICBAX2luaXRpYWxpemVkRXh0ZW5zaW9ucyA9IFtdXG5cbiAgICAgICAgYWRkOiAoZXh0KSAtPlxuXG4gICAgICAgICAgICAjIGNoZWNrcyBpZiB0aGUgbmFtZSBmb3IgdGhlIGV4dGVuc2lvbiBoYXZlIGJlZW4gZGVmaW5lZC5cbiAgICAgICAgICAgICMgaWYgbm90IGxvZyBhIHdhcm5pbmcgbWVzc2FnZVxuICAgICAgICAgICAgdW5sZXNzIGV4dC5uYW1lXG4gICAgICAgICAgICAgICAgbXNnID0gXCJUaGUgZXh0ZW5zaW9uIGRvZXNuJ3QgaGF2ZSBhIG5hbWUgYXNzb2NpYXRlZC4gSXQgd2lsbCBiZSBoZXBmdWxsIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICBcImlmIHlvdSBoYXZlIGFzc2luZyBhbGwgb2YgeW91ciBleHRlbnNpb25zIGEgbmFtZSBmb3IgYmV0dGVyIGRlYnVnZ2luZ1wiXG4gICAgICAgICAgICAgICAgQmFzZS5sb2cud2FybiBtc2dcblxuICAgICAgICAgICAgIyBMZXRzIHRocm93IGFuIGVycm9yIGlmIHdlIHRyeSB0byBpbml0aWFsaXplIHRoZSBzYW1lIGV4dGVuc2lvbiB0d2ljZXNcbiAgICAgICAgICAgIEJhc2UudXRpbC5lYWNoIEBfZXh0ZW5zaW9ucywgKHh0LCBpKSAtPlxuICAgICAgICAgICAgICAgIGlmIF8uaXNFcXVhbCB4dCwgZXh0XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkV4dGVuc2lvbjogXCIgKyBleHQubmFtZSArIFwiIGFscmVhZHkgZXhpc3RzLlwiKVxuXG4gICAgICAgICAgICBAX2V4dGVuc2lvbnMucHVzaChleHQpXG5cbiAgICAgICAgaW5pdCA6IChjb250ZXh0KSAtPlxuICAgICAgICAgICAgeHRjbG9uZSA9IEJhc2UudXRpbC5jbG9uZSBAX2V4dGVuc2lvbnNcblxuICAgICAgICAgICAgQmFzZS5sb2cuaW5mbyBcIkFkZGVkIGV4dGVuc2lvbnMgKHN0aWxsIG5vdCBpbml0aWFsaXplZCk6XCJcbiAgICAgICAgICAgIEJhc2UubG9nLmRlYnVnIHh0Y2xvbmVcblxuICAgICAgICAgICAgQF9pbml0RXh0ZW5zaW9uKEBfZXh0ZW5zaW9ucywgY29udGV4dClcblxuICAgICAgICAgICAgQmFzZS5sb2cuaW5mbyBcIkluaXRpYWxpemVkIGV4dGVuc2lvbnM6XCJcbiAgICAgICAgICAgIEJhc2UubG9nLmRlYnVnIEBfaW5pdGlhbGl6ZWRFeHRlbnNpb25zXG5cbiAgICAgICAgX2luaXRFeHRlbnNpb24gOiAoZXh0ZW5zaW9ucywgY29udGV4dCkgLT5cblxuICAgICAgICAgICAgaWYgZXh0ZW5zaW9ucy5sZW5ndGggPiAwXG5cbiAgICAgICAgICAgICAgICB4dCA9IGV4dGVuc2lvbnMuc2hpZnQoKVxuXG4gICAgICAgICAgICAgICAgIyBDYWxsIGV4dGVuc2lvbnMgY29uc3RydWN0b3JcbiAgICAgICAgICAgICAgICBpZiBAX2lzRXh0ZW5zaW9uQWxsb3dlZFRvQmVBY3RpdmF0ZWQoeHQsIGNvbnRleHQuY29uZmlnKVxuICAgICAgICAgICAgICAgICAgICAjIHRoaXMgc3RhdGUgY291bGQgdGVsbCB0byB0aGUgcmVzdCBvZiB0aGUgd29ybGQgaWZcbiAgICAgICAgICAgICAgICAgICAgIyBleHRlbnNpb25zIGhhcyBiZWVuIGluaXRpYWxpemVkIG9yIG5vdFxuICAgICAgICAgICAgICAgICAgICB4dC5hY3RpdmF0ZWQgPSB0cnVlXG5cbiAgICAgICAgICAgICAgICAgICAgIyBjYWxsIHRvIHRoZSBleHRlbnNpb24gaW5pdGlhbGl6ZSBtZXRob2RcbiAgICAgICAgICAgICAgICAgICAgeHQuaW5pdGlhbGl6ZShjb250ZXh0KVxuXG4gICAgICAgICAgICAgICAgICAgICMgS2VlcCB0cmFjayBvZiB0aGUgaW5pdGlhbGl6ZWQgZXh0ZW5zaW9ucyBmb3IgZnV0dXJlIHJlZmVyZW5jZVxuICAgICAgICAgICAgICAgICAgICBAX2luaXRpYWxpemVkRXh0ZW5zaW9ucy5wdXNoIHh0XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICB4dC5hY3RpdmF0ZWQgPSBmYWxzZVxuXG4gICAgICAgICAgICAgICAgIyBjYWxsIHRoaXMgbWV0aG9kIHJlY3Vyc2l2ZWx5IHVudGlsIHRoZXJlIGFyZSBubyBtb3JlXG4gICAgICAgICAgICAgICAgIyBlbGVtZW50cyBpbiB0aGUgYXJyYXlcbiAgICAgICAgICAgICAgICBAX2luaXRFeHRlbnNpb24oZXh0ZW5zaW9ucywgY29udGV4dClcblxuICAgICAgICBfaXNFeHRlbnNpb25BbGxvd2VkVG9CZUFjdGl2YXRlZDogKHh0LCBjb25maWcpIC0+XG5cbiAgICAgICAgICAgICMgZmlyc3Qgd2UgaGF2ZSB0byBtYWtlIHN1cmUgdGhhdCB0aGUgXCJvcHRpb25zXCIga2V5IGlzIGRlZmluZWRcbiAgICAgICAgICAgICMgYnkgdGhlIGV4dGVuc2lvblxuICAgICAgICAgICAgdW5sZXNzIHh0Lm9wdGlvbktleVxuICAgICAgICAgICAgICAgIG1zZyA9IFwiVGhlIG9wdGlvbktleSBpcyByZXF1aXJlZCBhbmQgd2FzIG5vdCBkZWZpbmVkIGJ5OiBcIiArIHh0Lm5hbWVcbiAgICAgICAgICAgICAgICBCYXNlLmxvZy5lcnJvciBtc2dcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKVxuXG4gICAgICAgICAgICAjIGlmIG9wdGlvbnMgd2VyZSBwcm92aWRlZCB0byB0aGUgZXh0ZW5zaW9uLCBsZXRzIGNoZWNrIGp1c3QgZm9yIFwiYWN0aXZhdGVkXCJcbiAgICAgICAgICAgICMgd2hpY2ggaXMgdGhlIG9ubHkgb3B0aW9uIHRoYXQgc2hvdWxkIG1hdHRlciB3aXRoaW4gdGhpcyBtZXRob2RcbiAgICAgICAgICAgIGlmIGNvbmZpZy5leHRlbnNpb24gYW5kIGNvbmZpZy5leHRlbnNpb25beHQub3B0aW9uS2V5XSBhbmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZy5leHRlbnNpb25beHQub3B0aW9uS2V5XS5oYXNPd25Qcm9wZXJ0eSAnYWN0aXZhdGVkJ1xuICAgICAgICAgICAgICAgIGFjdGl2YXRlZCA9IGNvbmZpZy5leHRlbnNpb25beHQub3B0aW9uS2V5XS5hY3RpdmF0ZWRcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBhY3RpdmF0ZWQgPSBAX2V4dGVuc2lvbkNvbmZpZ0RlZmF1bHRzLmFjdGl2YXRlZFxuXG4gICAgICAgICAgICByZXR1cm4gYWN0aXZhdGVkXG5cblxuICAgICAgICBnZXRJbml0aWFsaXplZEV4dGVuc2lvbnMgOiAoKSAtPlxuICAgICAgICAgICAgcmV0dXJuIEBfaW5pdGlhbGl6ZWRFeHRlbnNpb25zXG5cbiAgICAgICAgZ2V0SW5pdGlhbGl6ZWRFeHRlbnNpb25CeU5hbWUgOiAobmFtZSkgLT5cbiAgICAgICAgICAgIEJhc2UudXRpbC53aGVyZSBAX2luaXRpYWxpemVkRXh0ZW5zaW9ucywgb3B0aW9uS2V5OiBuYW1lXG5cbiAgICAgICAgZ2V0RXh0ZW5zaW9ucyA6ICgpIC0+XG4gICAgICAgICAgICByZXR1cm4gQF9leHRlbnNpb25zXG5cbiAgICAgICAgZ2V0RXh0ZW5zaW9uQnlOYW1lIDogKG5hbWUpIC0+XG4gICAgICAgICAgICBCYXNlLnV0aWwud2hlcmUgQF9leHRlbnNpb25zLCBvcHRpb25LZXk6IG5hbWVcblxuICAgIHJldHVybiBFeHRNYW5hZ2VyXG5cbilcbiIsIigocm9vdCwgZmFjdG9yeSkgLT5cblxuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyb290LCB7fSlcblxuKSh3aW5kb3csIChyb290LCBVdGlscykgLT5cblxuICAgICMgRXhwb3NlIFV0aWxzIEFQSVxuICAgIFV0aWxzID1cblxuICAgICAgICAjIyMqXG4gICAgICAgICAqIEZ1bmN0aW9uIHRvIGNvbXBhcmUgbGlicmFyeSB2ZXJzaW9uaW5nXG4gICAgICAgICMjI1xuICAgICAgICB2ZXJzaW9uQ29tcGFyZSA6ICh2MSwgdjIsIG9wdGlvbnMpIC0+XG5cbiAgICAgICAgICAgIGlzVmFsaWRQYXJ0ID0gKHgpIC0+XG4gICAgICAgICAgICAgICAgKChpZiBsZXhpY29ncmFwaGljYWwgdGhlbiAvXlxcZCtbQS1aYS16XSokLyBlbHNlIC9eXFxkKyQvKSkudGVzdCB4XG5cbiAgICAgICAgICAgIGxleGljb2dyYXBoaWNhbCA9IG9wdGlvbnMgYW5kIG9wdGlvbnMubGV4aWNvZ3JhcGhpY2FsXG4gICAgICAgICAgICB6ZXJvRXh0ZW5kID0gb3B0aW9ucyBhbmQgb3B0aW9ucy56ZXJvRXh0ZW5kXG4gICAgICAgICAgICB2MXBhcnRzID0gdjEuc3BsaXQoXCIuXCIpXG4gICAgICAgICAgICB2MnBhcnRzID0gdjIuc3BsaXQoXCIuXCIpXG5cbiAgICAgICAgICAgIHJldHVybiBOYU4gaWYgbm90IHYxcGFydHMuZXZlcnkoaXNWYWxpZFBhcnQpIG9yIG5vdCB2MnBhcnRzLmV2ZXJ5KGlzVmFsaWRQYXJ0KVxuXG4gICAgICAgICAgICBpZiB6ZXJvRXh0ZW5kXG4gICAgICAgICAgICAgICAgdjFwYXJ0cy5wdXNoIFwiMFwiICAgIHdoaWxlIHYxcGFydHMubGVuZ3RoIDwgdjJwYXJ0cy5sZW5ndGhcbiAgICAgICAgICAgICAgICB2MnBhcnRzLnB1c2ggXCIwXCIgICAgd2hpbGUgdjJwYXJ0cy5sZW5ndGggPCB2MXBhcnRzLmxlbmd0aFxuXG4gICAgICAgICAgICB1bmxlc3MgbGV4aWNvZ3JhcGhpY2FsXG4gICAgICAgICAgICAgICAgdjFwYXJ0cyA9IHYxcGFydHMubWFwKE51bWJlcilcbiAgICAgICAgICAgICAgICB2MnBhcnRzID0gdjJwYXJ0cy5tYXAoTnVtYmVyKVxuXG4gICAgICAgICAgICBpID0gLTFcbiAgICAgICAgICAgIHdoaWxlIGkgPCB2MXBhcnRzLmxlbmd0aFxuICAgICAgICAgICAgICAgIGkrK1xuXG4gICAgICAgICAgICAgICAgaWYgdjJwYXJ0cy5sZW5ndGggPCBpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAxXG4gICAgICAgICAgICAgICAgaWYgdjFwYXJ0c1tpXSA9PSB2MnBhcnRzW2ldXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICAgICAgZWxzZSBpZiB2MXBhcnRzW2ldID4gdjJwYXJ0c1tpXVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgdjJwYXJ0c1tpXSA+IHYxcGFydHNbaV1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xXG5cbiAgICAgICAgICAgIHJldHVybiAtMSBpZiB2MXBhcnRzLmxlbmd0aCAhPSB2MnBhcnRzLmxlbmd0aFxuXG4gICAgICAgICAgICByZXR1cm4gMFxuXG4gICAgICAgIHN0cmluZzpcbiAgICAgICAgICAgIGNhcGl0YWxpemU6IChzdHIpIC0+XG4gICAgICAgICAgICAgICAgc3RyID0gKGlmIG5vdCBzdHI/IHRoZW4gXCJcIiBlbHNlIFN0cmluZyhzdHIpKVxuICAgICAgICAgICAgICAgIHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKVxuXG4gICAgcmV0dXJuIFV0aWxzXG4pIiwiKChyb290LCBmYWN0b3J5KSAtPlxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJvb3QsIHt9KVxuXG4pKHdpbmRvdywgKHJvb3QsIExvZ2dlcikgLT5cblxuICAgICMgTG9nZ2VyXG4gICAgbG9nbGV2ZWwgPSByZXF1aXJlKCdsb2dsZXZlbCcpXG5cbiAgICBzZW50cnkgPSByZXF1aXJlKCcuL3NlbnRyeS5jb2ZmZWUnKVxuXG4gICAgIyBFeHBvc2UgdGhlIExvZ2dlciBBUElcbiAgICBMb2dnZXIgPVxuXG4gICAgICAgIHNldExldmVsOiAobGV2ZWwpIC0+XG4gICAgICAgICAgICBsb2dsZXZlbC5zZXRMZXZlbChsZXZlbClcblxuICAgICAgICBzZXRDb25maWc6IChjb25maWcpIC0+XG4gICAgICAgICAgICBsb2dsZXZlbC5zZXRMZXZlbChjb25maWcubG9nTGV2ZWwpXG4gICAgICAgICAgICBpZiBjb25maWcuc2VudHJ5XG4gICAgICAgICAgICAgICAgc2VudHJ5LmluaXRpYWxpemUoY29uZmlnLnNlbnRyeSlcblxuICAgICAgICB0cmFjZTogKG1zZykgLT5cbiAgICAgICAgICAgIGxvZ2xldmVsLnRyYWNlKG1zZylcblxuICAgICAgICBkZWJ1ZzogKG1zZykgLT5cbiAgICAgICAgICAgIGxvZ2xldmVsLmRlYnVnKG1zZylcblxuICAgICAgICBpbmZvOiAobXNnKSAtPlxuICAgICAgICAgICAgbG9nbGV2ZWwuaW5mbyhtc2cpXG5cbiAgICAgICAgd2FybjogKG1zZykgLT5cbiAgICAgICAgICAgIGxvZ2xldmVsLndhcm4obXNnKVxuXG4gICAgICAgIGVycm9yOiAobXNnKSAtPlxuICAgICAgICAgICAgbG9nbGV2ZWwuZXJyb3IobXNnKVxuICAgICAgICAgICAgc2VudHJ5LnNlbmRNZXNzYWdlKG1zZylcblxuXG4gICAgcmV0dXJuIExvZ2dlclxuKSIsIiMjIypcbiAqIFRoaXMgd2lsbCBwcm92aWRlIHRoZSBmdW5jdGlvbmFsaXR5IHRvIGRlZmluZSBNb2R1bGVzXG4gKiBhbmQgcHJvdmlkZSBhIHdheSB0byBleHRlbmQgdGhlbVxuICogQGF1dGhvciBGcmFuY2lzY28gUmFtaW5pIDxmcmFtaW5pIGF0IGdtYWlsLmNvbT5cbiMjI1xuKChyb290LCBmYWN0b3J5KSAtPlxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJvb3QsIHt9KVxuXG4pKHdpbmRvdywgKHJvb3QsIE1vZHVsZSkgLT5cblxuICAgIEJhc2UgPSByZXF1aXJlKCcuLi9iYXNlLmNvZmZlZScpXG5cbiAgICAjIHRoaXMgd2lsbCBzZXJ2ZSBhcyB0aGUgYmFzZSBjbGFzcyBmb3IgYSBNb2R1bGVcbiAgICBjbGFzcyBNb2R1bGVcbiAgICAgICAgY29uc3RydWN0b3I6IChvcHQpIC0+XG4gICAgICAgICAgICBAc2FuZGJveCA9IG9wdC5zYW5kYm94XG4gICAgICAgICAgICBAb3B0aW9ucyA9IG9wdC5vcHRpb25zXG4gICAgICAgICAgICBAc2V0RWxlbWVudCgpXG5cblxuICAgICMgdGhpcyBjbGFzcyB3aWxsIGV4cG9zZSBzdGF0aWMgbWV0aG9kcyB0byBhZGQsIGV4dGVuZCBhbmRcbiAgICAjIGdldCB0aGUgbGlzdCBvZiBhZGRlZCBtb2R1bGVzXG4gICAgY2xhc3MgTW9kdWxlc1xuXG4gICAgICAgICMgdGhpcyB3aWxsIGhvbGQgdGhlIGxpc3Qgb2YgYWRkZWQgbW9kdWxlc1xuICAgICAgICBAbGlzdCA6IHt9XG5cbiAgICAgICAgIyMjKlxuICAgICAgICAgKiBqdXN0IGFuIGFsaWFzIGZvciB0aGUgZXh0ZW5kIG1ldGhvZFxuICAgICAgICAgKiBAYXV0aG9yIEZyYW5jaXNjbyBSYW1pbmkgPGZyYW1pbmkgYXQgZ21haWwuY29tPlxuICAgICAgICAgKiBAcGFyYW0gIHtbU3RyaW5nXX0gbmFtZVxuICAgICAgICAgKiBAcGFyYW0gIHtbT2JqZWN0XX0gZGVmaW5pdGlvblxuICAgICAgICAjIyNcbiAgICAgICAgQGFkZCA6IChuYW1lLCBkZWZpbml0aW9uKSAtPlxuICAgICAgICAgICAgQGV4dGVuZChuYW1lLCBkZWZpbml0aW9uLCBNb2R1bGUpXG5cbiAgICAgICAgIyMjKlxuICAgICAgICAgKiBnZXR0ZXIgZm9yIHJldHJpZXZpbmcgbW9kdWxlcyBkZWZpbml0aW9uc1xuICAgICAgICAgKiBAYXV0aG9yIEZyYW5jaXNjbyBSYW1pbmkgPGZyYW1pbmkgYXQgZ21haWwuY29tPlxuICAgICAgICAgKiBAcGFyYW0gIHtbdHlwZV19IG5hbWVcbiAgICAgICAgICogQHJldHVybiB7W0Z1bmN0aW9uL3VuZGVmaW5lZF19XG4gICAgICAgICMjI1xuICAgICAgICBAZ2V0IDogKG5hbWUpIC0+XG4gICAgICAgICAgICBpZiBCYXNlLnV0aWwuaXNTdHJpbmcobmFtZSkgYW5kIEBsaXN0W25hbWVdXG4gICAgICAgICAgICAgICAgcmV0dXJuIEBsaXN0W25hbWVdXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuXG4gICAgICAgICMjIypcbiAgICAgICAgICogdGhpcyB3aWxsIGFsbG93cyB1cyB0byBzaW1wbGlmeSBhbmQgaGF2ZSBtb3JlIGNvbnRyb2xcbiAgICAgICAgICogb3ZlciBhZGRpbmcvZGVmaW5pbmcgbW9kdWxlc1xuICAgICAgICAgKiBAYXV0aG9yIEZyYW5jaXNjbyBSYW1pbmkgPGZyYW1pbmkgYXQgZ21haWwuY29tPlxuICAgICAgICAgKiBAcGFyYW0gIHtbU3RyaW5nXX0gbmFtZVxuICAgICAgICAgKiBAcGFyYW0gIHtbT2JqZWN0XX0gZGVmaW5pdGlvblxuICAgICAgICAgKiBAcGFyYW0gIHtbU3RyaW5nL0Z1bmN0aW9uXX0gQmFzZUNsYXNzXG4gICAgICAgICMjI1xuICAgICAgICBAZXh0ZW5kIDogKG5hbWUsIGRlZmluaXRpb24sIEJhc2VDbGFzcykgLT5cbiAgICAgICAgICAgIGlmIEJhc2UudXRpbC5pc1N0cmluZyhuYW1lKSBhbmQgQmFzZS51dGlsLmlzT2JqZWN0KGRlZmluaXRpb24pXG4gICAgICAgICAgICAgICAgIyBpZiBubyBCYXNlQ2xhc3MgaXMgcGFzc2VkLCBieSBkZWZhdWx0IHdlJ2xsIHVzZSB0aGUgTW9kdWxlIGNsYXNzXG4gICAgICAgICAgICAgICAgdW5sZXNzIEJhc2VDbGFzc1xuICAgICAgICAgICAgICAgICAgICBCYXNlQ2xhc3MgPSBNb2R1bGVcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICMgaWYgd2UgYXJlIHBhc3NpbmcgdGhlIEJhc2VDbGFzcyBhcyBhIHN0cmluZywgaXQgbWVhbnMgdGhhdCBjbGFzc1xuICAgICAgICAgICAgICAgICAgICAjIHNob3VsZCBoYXZlIGJlZW4gYWRkZWQgcHJldmlvdXNseSwgc28gd2UnbGwgbG9vayB1bmRlciB0aGUgbGlzdCBvYmpcbiAgICAgICAgICAgICAgICAgICAgaWYgQmFzZS51dGlsLmlzU3RyaW5nIEJhc2VDbGFzc1xuICAgICAgICAgICAgICAgICAgICAgICAgIyBjaGVjayBpZiB0aGUgY2xhc3MgaGFzIGJlZW4gYWxyZWFkeSBhZGRlZFxuICAgICAgICAgICAgICAgICAgICAgICAgYmMgPSBAbGlzdFtCYXNlQ2xhc3NdXG4gICAgICAgICAgICAgICAgICAgICAgICAjIGlmIHRoZSBkZWZpbml0aW9uIGV4aXN0cywgbGV0cyBhc3NpZ24gaXQgdG8gQmFzZUNsYXNzXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiBiY1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJhc2VDbGFzcyA9IGJjXG4gICAgICAgICAgICAgICAgICAgICAgICAjIGlmIG5vdCwgbGV0cyB0aHJvdyBhbiBlcnJvclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1zZyA9ICdbTW9kdWxlLyAnKyBuYW1lICsnIF06IGlzIHRyeWluZyB0byBleHRlbmQgWycgKyBCYXNlQ2xhc3MgKyAnXSB3aGljaCBkb2VzIG5vdCBleGlzdCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBCYXNlLmxvZy5lcnJvciBtc2dcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKVxuICAgICAgICAgICAgICAgICAgICAjIGlmIGl0IGlzIGEgZnVuY3Rpb24sIHdlJ2xsIHVzZSBpdCBkaXJlY3RseVxuICAgICAgICAgICAgICAgICAgICAjIFRPRE86IGRvIHNvbWUgY2hlY2tpbmcgYmVmb3JlIHRyeWluZyB0byB1c2UgaXQgZGlyZWN0bHlcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiBCYXNlLnV0aWwuaXNGdW5jdGlvbiBCYXNlQ2xhc3NcbiAgICAgICAgICAgICAgICAgICAgICAgIEJhc2VDbGFzcyA9IEJhc2VDbGFzc1xuXG4gICAgICAgICAgICAgICAgZXh0ZW5kZWRDbGFzcyA9IGV4dGVuZC5jYWxsIEJhc2VDbGFzcywgZGVmaW5pdGlvblxuICAgICAgICAgICAgICAgICMgd2UnbGwgb25seSB0cnkgdG8gYWRkIHRoaXMgZGVmaW5pdGlvbiBpbiBjYXNlXG4gICAgICAgICAgICAgICAgdW5sZXNzIEJhc2UudXRpbC5oYXMgQGxpc3QsIG5hbWVcbiAgICAgICAgICAgICAgICAgICAgIyBleHRlbmRzIHRoZSBjdXJyZW50IGRlZmluaXRpb24gd2l0aCB0aGUgTW9kdWxlIGNsYXNzXG4gICAgICAgICAgICAgICAgICAgIGV4dGVuZGVkRGVmaW5pdGlvbiA9IGV4dGVuZC5jYWxsIEJhc2VDbGFzcywgZGVmaW5pdGlvblxuICAgICAgICAgICAgICAgICAgICAjIHN0b3JlIHRoZSByZWZlcmVuY2UgZm9yIGxhdGVyIHVzYWdlXG4gICAgICAgICAgICAgICAgICAgIEBsaXN0W25hbWVdID0gZXh0ZW5kZWREZWZpbml0aW9uXG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV4dGVuZGVkRGVmaW5pdGlvblxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgIyBpbmZvcm0gdGhlIGRldnMgdGhhdCBzb21lb25lIGlzIHRyeWluZyB0byBhZGQgYSBtb2R1bGUnc1xuICAgICAgICAgICAgICAgICAgICAjIGRlZmluaXRpb24gdGhhdCBoYXMgYmVlbiBwcmV2aW91c2x5IGFkZGVkXG4gICAgICAgICAgICAgICAgICAgIG1zZyA9ICdbQ29tcG9uZW50OicgKyBuYW1lICsgJ10gaGF2ZSBhbHJlYWR5IGJlZW4gZGVmaW5lZCcgXG4gICAgICAgICAgICAgICAgICAgIEJhc2UubG9nLndhcm4gbXNnXG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEBcblxuXG4gICAgQmFzZS51dGlsLmV4dGVuZCBNb2R1bGU6OiwgQmFzZS5FdmVudHMsXG5cbiAgICAgICAgIyB0aGlzIGhhcyB0byBiZSBvdmV3cml0dGVuIGJ5IHRoZSBtb2R1bGUgZGVmaW5pdGlvblxuICAgICAgICBpbml0aWFsaXplOiAoKSAtPlxuICAgICAgICAgICAgbXNnID0gJ1tDb21wb25lbnQvJyArIEBvcHRpb25zLm5hbWUgKyAnXTonICsgJ0RvZXNuXFwndCBoYXZlIGFuIGluaXRpYWxpemUgbWV0aG9kIGRlZmluZWQnXG4gICAgICAgICAgICBCYXNlLmxvZy53YXJuIG1zZ1xuXG4gICAgICAgIHNldEVsZW1lbnQ6ICgpIC0+XG4gICAgICAgICAgICBAdW5kZWxlZ2F0ZUV2ZW50cygpXG5cbiAgICAgICAgICAgIEBlbCA9IEBvcHRpb25zLmVsXG4gICAgICAgICAgICBAJGVsID0gJChAZWwpXG5cbiAgICAgICAgICAgIEBkZWxlZ2F0ZUV2ZW50cygpXG5cbiAgICAgICAgZGVsZWdhdGVFdmVudHM6IChldmVudHMpIC0+XG4gICAgICAgICAgICAjIHJlZ2V4IHRvIHNwbGl0IHRoZSBldmVudHMga2V5IChzZXBhcmF0ZXMgdGhlIGV2ZW50IGZyb20gdGhlIHNlbGVjdG9yKVxuICAgICAgICAgICAgZGVsZWdhdGVFdmVudFNwbGl0dGVyID0gL14oXFxTKylcXHMqKC4qKSQvXG5cbiAgICAgICAgICAgICMgaWYgdGhlIGV2ZW50cyBvYmplY3QgaXMgbm90IGRlZmluZWQgb3IgcGFzc2VkIGFzIGEgcGFyYW1ldGVyXG4gICAgICAgICAgICAjIHRoZXJlIGlzIG5vdGhpbmcgdG8gZG8gaGVyZVxuICAgICAgICAgICAgcmV0dXJuICAgIHVubGVzcyBldmVudHMgb3IgKGV2ZW50cyA9IEJhc2UudXRpbC5yZXN1bHQoQCwgXCJldmVudHNcIikpXG4gICAgICAgICAgICAjIGJlZm9yZSB0cnlpbmcgdG8gYXR0YWNoIG5ldyBldmVudHMsIGxldHMgcmVtb3ZlIGFueSBwcmV2aW91c1xuICAgICAgICAgICAgIyBhdHRhY2hlZCBldmVudFxuICAgICAgICAgICAgQHVuZGVsZWdhdGVFdmVudHMoKVxuXG4gICAgICAgICAgICBmb3Iga2V5IG9mIGV2ZW50c1xuICAgICAgICAgICAgICAgICMgZ3JhYiB0aGUgbWV0aG9kIG5hbWVcbiAgICAgICAgICAgICAgICBtZXRob2QgPSBldmVudHNba2V5XVxuICAgICAgICAgICAgICAgICMgZ3JhYiB0aGUgbWV0aG9kJ3MgZGVmaW5pdGlvblxuICAgICAgICAgICAgICAgIG1ldGhvZCA9IEBbZXZlbnRzW2tleV1dICAgIHVubGVzcyBCYXNlLnV0aWwuaXNGdW5jdGlvbihtZXRob2QpXG4gICAgICAgICAgICAgICAgY29udGludWUgICAgdW5sZXNzIG1ldGhvZFxuICAgICAgICAgICAgICAgIG1hdGNoID0ga2V5Lm1hdGNoKGRlbGVnYXRlRXZlbnRTcGxpdHRlcilcbiAgICAgICAgICAgICAgICBAZGVsZWdhdGUgbWF0Y2hbMV0sIG1hdGNoWzJdLCBCYXNlLnV0aWwuYmluZChtZXRob2QsIEApXG5cbiAgICAgICAgICAgIHJldHVybiBAXG5cbiAgICAgICAgZGVsZWdhdGU6IChldmVudE5hbWUsIHNlbGVjdG9yLCBsaXN0ZW5lcikgLT5cbiAgICAgICAgICAgIEAkZWwub24gZXZlbnROYW1lICsgXCIucGVzdGxlRXZlbnRcIiArIEBvcHRpb25zLmd1aWQsIHNlbGVjdG9yLCBsaXN0ZW5lclxuICAgICAgICAgICAgcmV0dXJuIEBcblxuICAgICAgICB1bmRlbGVnYXRlRXZlbnRzOiAoKSAtPlxuICAgICAgICAgICAgQCRlbC5vZmYoJy5wZXN0bGVFdmVudCcgKyBAb3B0aW9ucy5ndWlkKSAgICBpZiBAJGVsXG4gICAgICAgICAgICByZXR1cm4gQFxuXG4gICAgICAgICMgYnkgZGVmYXVsdCwgaXQgd2lsbCByZW1vdmUgZXZlbnRsaXN0ZW5lcnMgYW5kIHJlbW92ZSB0aGVcbiAgICAgICAgIyAkZWwgZnJvbSB0aGUgRE9NXG4gICAgICAgIHN0b3A6ICgpIC0+XG4gICAgICAgICAgICBAdW5kZWxlZ2F0ZUV2ZW50cygpXG4gICAgICAgICAgICBAJGVsLnJlbW92ZSgpIGlmIEAkZWxcblxuICAgICMgSGVscGVyc1xuICAgIGV4dGVuZCA9IChwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgLT5cbiAgICAgICAgcGFyZW50ID0gQFxuXG4gICAgICAgICMgVGhlIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIGZvciB0aGUgbmV3IHN1YmNsYXNzIGlzIGVpdGhlciBkZWZpbmVkIGJ5IHlvdVxuICAgICAgICAjICh0aGUgXCJjb25zdHJ1Y3RvclwiIHByb3BlcnR5IGluIHlvdXIgYGV4dGVuZGAgZGVmaW5pdGlvbiksIG9yIGRlZmF1bHRlZFxuICAgICAgICAjIGJ5IHVzIHRvIHNpbXBseSBjYWxsIHRoZSBwYXJlbnQncyBjb25zdHJ1Y3RvclxuICAgICAgICBpZiBwcm90b1Byb3BzIGFuZCBCYXNlLnV0aWwuaGFzKHByb3RvUHJvcHMsIFwiY29uc3RydWN0b3JcIilcbiAgICAgICAgICAgIGNoaWxkID0gcHJvdG9Qcm9wcy5jb25zdHJ1Y3RvclxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBjaGlsZCA9IC0+XG4gICAgICAgICAgICAgICAgcGFyZW50LmFwcGx5IEAsIGFyZ3VtZW50c1xuXG4gICAgICAgICMgQWRkIHN0YXRpYyBwcm9wZXJ0aWVzIHRvIHRoZSBjb25zdHJ1Y3RvciBmdW5jdGlvbiwgaWYgc3VwcGxpZWQuXG4gICAgICAgIEJhc2UudXRpbC5leHRlbmQgY2hpbGQsIHBhcmVudCwgc3RhdGljUHJvcHNcblxuICAgICAgICAjIFNldCB0aGUgcHJvdG90eXBlIGNoYWluIHRvIGluaGVyaXQgZnJvbSBgcGFyZW50YCwgd2l0aG91dCBjYWxsaW5nXG4gICAgICAgICMgYHBhcmVudGAncyBjb25zdHJ1Y3RvciBmdW5jdGlvbi5cbiAgICAgICAgU3Vycm9nYXRlID0gLT5cbiAgICAgICAgICAgIEBjb25zdHJ1Y3RvciA9IGNoaWxkXG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICBTdXJyb2dhdGU6OiA9IHBhcmVudDo6XG4gICAgICAgIGNoaWxkOjogPSBuZXcgU3Vycm9nYXRlXG5cbiAgICAgICAgIyBBZGQgcHJvdG90eXBlIHByb3BlcnRpZXMgKGluc3RhbmNlIHByb3BlcnRpZXMpIHRvIHRoZSBzdWJjbGFzcyxcbiAgICAgICAgIyBpZiBzdXBwbGllZC5cbiAgICAgICAgQmFzZS51dGlsLmV4dGVuZCBjaGlsZDo6LCBwcm90b1Byb3BzICAgIGlmIHByb3RvUHJvcHNcblxuICAgICAgICAjIHN0b3JlIGEgcmVmZXJlbmNlIHRvIHRoZSBpbml0aWFsaXplIG1ldGhvZCBzbyBpdCBjYW4gYmUgY2FsbGVkXG4gICAgICAgICMgZnJvbSBpdHMgY2hpbGRzXG4gICAgICAgIGNoaWxkOjpfc3VwZXJfID0gcGFyZW50Ojppbml0aWFsaXplXG5cbiAgICAgICAgcmV0dXJuIGNoaWxkXG5cbiAgICAjIFN0b3JlIGEgcmVmZXJlbmNlIHRvIHRoZSBiYXNlIGNsYXNzIGZvciBtb2R1bGVzXG4gICAgTW9kdWxlcy5Nb2R1bGUgPSBNb2R1bGVcblxuICAgIHJldHVybiBNb2R1bGVzXG4pIiwiKChyb290LCBmYWN0b3J5KSAtPlxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJvb3QsIHt9KVxuXG4pKHdpbmRvdywgKHJvb3QsIFNlbnRyeSkgLT5cblxuICAgICMgUmF2ZW4gLSBTZW50cnkgQ2xpZW50XG4gICAgUmF2ZW4gPSByZXF1aXJlKCdyYXZlbi1qcycpXG5cbiAgICAjIEV4cG9zZSB0aGUgU2VudHJ5IEFQSVxuICAgIFNlbnRyeSA9XG4gICAgICAgIGluaXRpYWxpemUgOiAoY29uZmlnKSAtPlxuICAgICAgICAgICAgUmF2ZW4uY29uZmlnKGNvbmZpZy5lbmRQb2ludCwgY29uZmlnLm9wdGlvbnMpXG4gICAgICAgICAgICBSYXZlbi5pbnN0YWxsKClcblxuICAgICAgICBzZW5kTWVzc2FnZSA6IChtc2cpIC0+XG4gICAgICAgICAgICBpZiBSYXZlbi5pc1NldHVwKClcbiAgICAgICAgICAgICAgICBSYXZlbi5jYXB0dXJlTWVzc2FnZShtc2cpXG5cbiAgICByZXR1cm4gU2VudHJ5XG4pIiwiKChyb290LCBmYWN0b3J5KSAtPlxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJvb3QsIHt9KVxuXG4pKHdpbmRvdywgKHJvb3QsIFZlcnNpb25DaGVja2VyKSAtPlxuXG4gICAgbG9nID0gcmVxdWlyZSAnLi9sb2dnZXIuY29mZmVlJ1xuICAgIFV0aWxzID0gcmVxdWlyZSAnLi9nZW5lcmFsLmNvZmZlZSdcblxuICAgICMgRXhwb3NlIFZlcnNpb25DaGVja2VyIEFQSVxuICAgIFZlcnNpb25DaGVja2VyID1cblxuICAgICAgICAjIyMqXG4gICAgICAgICAqIFJlY3Vyc2l2ZSBtZXRob2QgdG8gY2hlY2sgdmVyc2lvbmluZyBmb3IgYWxsIHRoZSBkZWZpbmVkIGxpYnJhcmllc1xuICAgICAgICAgKiB3aXRoaW4gdGhlIGRlcGVuZGVuY3kgYXJyYXlcbiAgICAgICAgIyMjXG4gICAgICAgIGNoZWNrOiAoZGVwZW5kZW5jaWVzKSAtPlxuXG4gICAgICAgICAgICBpZiBkZXBlbmRlbmNpZXMubGVuZ3RoID4gMFxuXG4gICAgICAgICAgICAgICAgZHAgPSBkZXBlbmRlbmNpZXMuc2hpZnQoKVxuXG4gICAgICAgICAgICAgICAgdW5sZXNzIGRwLm9ialxuICAgICAgICAgICAgICAgICAgICBtc2cgPSBkcC5uYW1lICsgXCIgaXMgYSBoYXJkIGRlcGVuZGVuY3kgYW5kIGl0IGhhcyB0byBiZSBsb2FkZWQgYmVmb3JlIHBlc3RsZS5qc1wiXG4gICAgICAgICAgICAgICAgICAgIGxvZy5lcnJvciBtc2dcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZylcblxuICAgICAgICAgICAgICAgICMgY29tcGFyZSB0aGUgdmVyc2lvblxuICAgICAgICAgICAgICAgIHVubGVzcyBVdGlscy52ZXJzaW9uQ29tcGFyZShkcC52ZXJzaW9uLCBkcC5yZXF1aXJlZCkgPj0gMFxuICAgICAgICAgICAgICAgICAgICAjIGlmIHdlIGVudGVyIGhlcmUgaXQgbWVhbnMgdGhlIGxvYWRlZCBsaWJyYXJ5IGRvZXN0IG5vdCBmdWxmaWxsIG91ciBuZWVkc1xuICAgICAgICAgICAgICAgICAgICBtc2cgPSBcIltGQUlMXSBcIiArIGRwLm5hbWUgKyBcIjogdmVyc2lvbiByZXF1aXJlZDogXCIgKyBkcC5yZXF1aXJlZCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiIDwtLT4gTG9hZGVkIHZlcnNpb246IFwiICsgZHAudmVyc2lvblxuICAgICAgICAgICAgICAgICAgICBsb2cuZXJyb3IgbXNnXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpXG5cbiAgICAgICAgICAgICAgICBWZXJzaW9uQ2hlY2tlci5jaGVjayhkZXBlbmRlbmNpZXMpXG5cblxuICAgIHJldHVybiBWZXJzaW9uQ2hlY2tlclxuKSIsIigocm9vdCwgZmFjdG9yeSkgLT5cblxuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyb290LCB7fSlcblxuKSh3aW5kb3csIChyb290LCBWaWV3cG9ydCkgLT5cblxuICAgICMgTG9nZ2VyXG4gICAgdmlld3BvcnQgPSByZXF1aXJlKCd2ZXJnZScpXG5cbiAgICAjIEV4cG9zZSBWaWV3cG9ydCBkZXRlY3Rpb24gQVBJXG4gICAgVmlld3BvcnQgPVxuXG4gICAgICAgIHZpZXdwb3J0VzogKCkgLT5cbiAgICAgICAgICAgIHZpZXdwb3J0LnZpZXdwb3J0VygpXG5cbiAgICAgICAgdmlld3BvcnRIOiAoa2V5KSAtPlxuICAgICAgICAgICAgdmlld3BvcnQudmlld3BvcnRIKClcblxuICAgICAgICB2aWV3cG9ydDogKGtleSkgLT5cbiAgICAgICAgICAgIHZpZXdwb3J0LnZpZXdwb3J0KClcblxuICAgICAgICBpblZpZXdwb3J0OiAoZWwsIGN1c2hpb24pIC0+XG4gICAgICAgICAgICB2aWV3cG9ydC5pblZpZXdwb3J0KGVsLCBjdXNoaW9uKVxuXG4gICAgICAgIGluWDogKGVsLCBjdXNoaW9uKSAtPlxuICAgICAgICAgICAgdmlld3BvcnQuaW5YKGVsLCBjdXNoaW9uKVxuXG4gICAgICAgIGluWTogKGVsLCBjdXNoaW9uKSAtPlxuICAgICAgICAgICAgdmlld3BvcnQuaW5ZKGVsLCBjdXNoaW9uKVxuXG4gICAgICAgIHNjcm9sbFg6ICgpIC0+XG4gICAgICAgICAgICB2aWV3cG9ydC5zY3JvbGxYKClcblxuICAgICAgICBzY3JvbGxZOiAoKSAtPlxuICAgICAgICAgICAgdmlld3BvcnQuc2Nyb2xsWSgpXG5cbiAgICAgICAgIyBUbyB0ZXN0IGlmIGEgbWVkaWEgcXVlcnkgaXMgYWN0aXZlXG4gICAgICAgIG1xOiAobWVkaWFRdWVyeVN0cmluZykgLT5cbiAgICAgICAgICAgIHZpZXdwb3J0Lm1xKG1lZGlhUXVlcnlTdHJpbmcpXG5cbiAgICAgICAgcmVjdGFuZ2xlOiAoZWwsIGN1c2hpb24pIC0+XG4gICAgICAgICAgICB2aWV3cG9ydC5yZWN0YW5nbGUoZWwsIGN1c2hpb24pXG5cbiAgICAgICAgIyBpZiBubyBhcmd1bWVudCBpcyBwYXNzZWQsIHRoZW4gaXQgcmV0dXJucyB0aGUgYXNwZWN0XG4gICAgICAgICMgcmF0aW8gb2YgdGhlIHZpZXdwb3J0LiBJZiBhbiBlbGVtZW50IGlzIHBhc3NlZCBpdCByZXR1cm5zXG4gICAgICAgICMgdGhlIGFzcGVjdCByYXRpbyBvZiB0aGUgZWxlbWVudFxuICAgICAgICBhc3BlY3Q6IChvKSAtPlxuICAgICAgICAgICAgdmlld3BvcnQuYXNwZWN0KG8pXG5cbiAgICByZXR1cm4gVmlld3BvcnRcbikiXX0=
