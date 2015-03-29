'use strict';

var gulp = require('gulp');
var util = require('gulp-util')
var path = require('path');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var watchify = require('watchify');
var karma = require('karma').server;

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
  },
  htmlAssets: [
    'src/index.html'
  ]
};

/**
 * Assets tasks
 */
gulp.task('assets', ['assets:html']);

gulp.task('assets:html', function() {
  return gulp.src(options.htmlAssets)
    .pipe(gulp.dest(options.target));
});


/**
 * JS Tasks
 */
gulp.task('js', ['bundle:app']);

/**
 * Bundle Vendors
 */
gulp.task('bundle:vendors', function() {
  return browserify()
    .require(options.vendors.modules)
    .bundle()
    .pipe(source(options.vendors.target))
    .pipe(gulp.dest(path.join(options.target,'js')));
});

/**
 * Bundle app
 */
gulp.task('bundle:app', ['bundle:vendors'], function() {
  return browserify(options.app.src)
    .external(options.vendors.modules)
    .transform(babelify)
    .bundle()
    .pipe(source(options.app.target))
    .pipe(gulp.dest(path.join(options.target,'js')));
});

/**
 * Watchify
 */
gulp.task('watchify', function() {
  var bundle = browserify(options.app.src, watchify.args)
    .external(options.vendors.modules)
    .transform(babelify);

  function updateBundle(watch) {
    return watch.bundle()
      .pipe(source(options.app.target))
      .pipe(gulp.dest(path.join(options.target,'js')));
  }

  var watcher = watchify(bundle);

  watcher.on('update', function() {
    updateBundle(watcher);
  });

  watcher.on('log', function(msg) {
    util.log(util.colors.green(msg));
  });

  return updateBundle(watcher);
});

/**
 * Test task
 */
gulp.task('tdd', function(done) {
  karma.start({
    configFile: path.join(__dirname, 'karma.conf.js')
  }, done)
});

gulp.task('default', ['js', 'assets']);
