((root, factory) ->

    module.exports = factory(root, {})

)(window, (root, Utils) ->
    lodashModules =
        isFunction: require 'lodash/isFunction'
        isObject: require 'lodash/isObject'
        isEmpty: require 'lodash/isEmpty'
        isEqual: require 'lodash/isEqual'
        isArray: require 'lodash/isArray'
        isString: require 'lodash/isString'
        includes: require 'lodash/includes'
        extend: require 'lodash/extend'
        keys: require 'lodash/keys'
        clone: require 'lodash/clone'
        defaults: require 'lodash/defaults'
        map: require 'lodash/map'
        each: require 'lodash/each'
        bindAll: require 'lodash/bindAll'
        debounce: require 'lodash/debounce'
        capitalize: require 'lodash/capitalize'
        filter: require 'lodash/filter'
        where: require 'lodash/filter' # lodash 4 removed 'where' in favor filter
        has: require 'lodash/has'
        result: require 'lodash/result'

    # Expose Utils API
    Utils =

        ###*
         * Function to compare library versioning
        ###
        versionCompare : (v1, v2, options) ->

            isValidPart = (x) ->
                ((if lexicographical then /^\d+[A-Za-z]*$/ else /^\d+$/)).test x

            lexicographical = options and options.lexicographical
            zeroExtend = options and options.zeroExtend
            v1parts = v1.split(".")
            v2parts = v2.split(".")

            return NaN if not v1parts.every(isValidPart) or not v2parts.every(isValidPart)

            if zeroExtend
                v1parts.push "0"    while v1parts.length < v2parts.length
                v2parts.push "0"    while v2parts.length < v1parts.length

            unless lexicographical
                v1parts = v1parts.map(Number)
                v2parts = v2parts.map(Number)

            i = -1
            while i < v1parts.length
                i++

                if v2parts.length < i
                    return 1
                if v1parts[i] == v2parts[i]
                    continue
                else if v1parts[i] > v2parts[i]
                    return 1
                else if v2parts[i] > v1parts[i]
                    return -1

            return -1 if v1parts.length != v2parts.length

            return 0

        string:
            capitalize: (str) ->
                str = (if not str? then "" else String(str))
                str.charAt(0).toUpperCase() + str.slice(1)


    lodashModules.extend Utils, lodashModules

    return Utils
)
