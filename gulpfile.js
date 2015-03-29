'use strict';

var gulp = require('gulp');
var path = require('path');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var babelify = require('babelify');

/**
 * Configuration options
 */
var options = {
  target: 'build',
  app: {
    src: './src/js/app.js',
    target: 'app.js'
  },
  vendors: {
    target: 'vendors.js',
    modules: [
      'react/addons',
      'material-ui'
    ]
  }
};

/**
 * JS Tasks
 */
gulp.task('js', ['bundle:app']);

gulp.task('bundle:vendors', function() {
  return browserify()
    .require(options.vendors.modules)
    .bundle()
    .pipe(source(options.vendors.target))
    .pipe(gulp.dest(path.join(options.target,'js')));
});

gulp.task('bundle:app', ['bundle:vendors'], function() {
  return browserify(options.app.src)
    .external(options.vendors.modules)
    .transform(babelify)
    .bundle()
    .pipe(source(options.app.target))
    .pipe(gulp.dest(path.join(options.target, 'js')));
});
