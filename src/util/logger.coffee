((root, factory) ->

    module.exports = factory(root, {})

)(window, (root, Logger) ->

    # Logger
    loglevel = require('loglevel')

    sentry = require('./sentry.coffee')

    # Expose the Logger API
    Logger =

        setLevel: (level) ->
            loglevel.setLevel(level)

        setConfig: (config) ->
            loglevel.setLevel(config.logLevel)
            if config.sentry
                sentry.initialize(config.sentry)

        trace: (msg) ->
            loglevel.trace(msg)

        debug: (msg) ->
            loglevel.debug(msg)

        info: (msg) ->
            loglevel.info(msg)

        warn: (msg) ->
            loglevel.warn(msg)

        error: (msg) ->
            loglevel.error(msg)
            sentry.sendMessage(msg)


    return Logger
)