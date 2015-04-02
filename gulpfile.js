'use strict';

var gulp = require('gulp');
var assets = require('./tasks/assets');
var bundle = require('./tasks/bundle');
var test = require('./tasks/test');
var config = require('./tasks/config');

/**
 * Assets tasks
 */
gulp.task('assets', ['assets:html', 'assets:css']);
gulp.task('assets:html', assets.html);
gulp.task('assets:css', assets.css);

/**
 * JS Tasks
 */
gulp.task('js', ['bundle:app']);

/**
 * Bundle Vendors
 */
gulp.task('bundle:vendors', bundle.vendors);

/**
 * Bundle app
 */
gulp.task('bundle:app', ['bundle:vendors'], bundle.app);

/**
 * Watchify
 */
gulp.task('watchify', bundle.watch);

/**
 * Test task
 */
gulp.task('tdd', test.tdd);
gulp.task('ci', test.ci);

// Default task
gulp.task('default', ['js', 'assets', 'watch']);

gulp.task('watch', ['watchify'], function() {
  gulp.watch(config.htmlAssets, assets.html);
  gulp.watch(config.cssAssets, assets.css);
});
