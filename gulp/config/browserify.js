var glob = require('glob');
var config = require('./general');

// Browserify lacks of globs, so we define all lodash submodules as external.
var lodashExternals = glob.sync(
                        'lodash/**/*.js', {
                          cwd: './node_modules'
                        }).map(function(filePath){
                            return filePath.replace('.js','');
                        });

module.exports = {
    // Enable source maps
    debug: true,
    // Additional file extentions to make optional
    extensions: ['.coffee', '.handlebars'],
    // Name used for standalone mode
    moduleName: 'pestle',
    // A separate bundle will be generated for each
    // bundle config in the list below
    bundleConfigs: [{
        entries: './src/core.coffee',
        external: ['jquery'].concat(lodashExternals),
        dest: config.paths.build,
        outputName: 'pestle.js',
        dist: true
    }, {
        entries: './example/main.coffee',
        dest: config.paths.build,
        outputName: 'main.js',
        dist: ''
    }]
};
