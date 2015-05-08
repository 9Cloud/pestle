((root, factory) ->

    module.exports = factory(root, {})

)(window, (root, Sentry) ->

    # Raven - Sentry Client
    Raven = require('raven-js')

    # Expose the Sentry API
    Sentry =
        initialize : (config) ->
            Raven.config(config.endPoint, config.options)
            Raven.install()

        sendMessage : (msg) ->
            if Raven.isSetup()
                Raven.captureMessage(msg)

    return Sentry
)