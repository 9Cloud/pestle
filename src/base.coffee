###*
 * The purpose of this layer is to declare and abstract the access to
 * the core base of libraries that the rest of the stack (the app framework)
 * will depend.
 * @author Francisco Ramini <framini at gmail.com>
###
((root, factory) ->

    module.exports = factory(root, {})

)(window, (root, Base) ->

    # Logger
    Base.log = require './util/logger.coffee'

    # Device detection
    Base.device = require './util/devicedetection.coffee'

    # Cookies API
    Base.cookies = require './util/cookies.coffee'

    # Viewport detection
    Base.vp = require './util/viewportdetection.coffee'

    # Function that is gonna handle responsive images
    Base.Imager = require 'imager.js'

    # Event Bus
    Base.Events = require './util/eventbus.coffee'

    # General Utils
    Base.util = require './util/general.coffee'

    return Base
)
