'use strict';
var gulp = require('gulp');
var util = require('gulp-util');
var browserify = require('browserify');
var config = require('./config');
var path = require('path');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var watchify = require('watchify');


/**
 * Task to create vendors bundle
 */
exports.vendors = function bundleVendors() {
  return browserify()
    .require(config.vendors.modules)
    .bundle()
    .pipe(source(config.vendors.target))
    .pipe(gulp.dest(path.join(config.target, 'js')));
};

/**
 * Task to create app bundle
 */
exports.app = function bundleApp() {
  return browserify(config.app.src)
    .external(config.vendors.modules)
    .transform(babelify.configure({
      optional: ['asyncToGenerator']
    }))
    .bundle()
    .pipe(source(config.app.target))
    .pipe(gulp.dest(path.join(config.target, 'js')));
};

/**
 * Task to rebundle on the fly when you develop
 */
exports.watch = function watchBundleApp() {
  var bundle = browserify(config.app.src, watchify.args)
    .external(config.vendors.modules)
    .transform(babelify);

  function updateBundle(watch) {
    return watch.bundle()
      .pipe(source(config.app.target))
      .pipe(gulp.dest(path.join(config.target, 'js')));
  }

  var watcher = watchify(bundle);

  watcher.on('update', function() {
    updateBundle(watcher);
  });

  watcher.on('log', function(msg) {
    util.log(util.colors.green(msg));
  });

  return updateBundle(watcher);
};
