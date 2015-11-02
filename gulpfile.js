var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var eslint = require('gulp-eslint');
var source = require('vinyl-source-stream');
var buffer = require( 'vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var webserver = require('gulp-webserver');
var mochaPhantomJS = require('gulp-mocha-phantomjs');

var mainFile = 'src/workaholic.es6';
var es6Files = 'src/*.es6';
var testFiles = 'spec/*.js';
var distFile = 'workaholic.js';
var distDir = './dist';
var watchOptions = {
    debounceDelay: 2000
};

gulp.task('build', ['lint'], function() {
    browserify(mainFile, { debug: true })
    .transform(babelify)
    .bundle()
    .on('error', function (err) { console.log('Error : ' + err.message); })
    .pipe(source(distFile))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(distDir))
});

gulp.task('lint', function(){
    return gulp.src(es6Files)
    .pipe(eslint({useEslintrc: true}))
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('test', function() {
    return gulp
    .src('test/runner.html')
    .pipe(mochaPhantomJS());
});

gulp.task('watch', function(){
    gulp.watch(es6Files, watchOptions, ['build']);
    //gulp.watch([testFiles, distDir + '/' + distFile], ['test']);
});

gulp.task('webserver', function() {
    gulp.src('./')
    .pipe(webserver({
        host: '127.0.0.1',
        port: 5000,
        livereload: true
    }));
});

gulp.task('default', ['build', 'watch', 'webserver']);
