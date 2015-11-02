module.exports = function(config) {
    config.set({
        browsers: ['PhantomJS2'],
        frameworks: ['mocha'],
        phantomjsLauncher: {
            exitOnResourceError: true
        }
    });
};
