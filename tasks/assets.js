'use strict';
var gulp = require('gulp');
var less = require('gulp-less');
var config = require('./config');
var path = require('path');

/**
 *  Tasks to copy html
 */
exports.html = function html() {
  return gulp.src(config.htmlAssets)
    .pipe(gulp.dest(config.target));
};

/**
 * Task to build less into css
 */
exports.css = function css() {
  return gulp.src(config.cssAssets)
    .pipe(less())
    .pipe(gulp.dest(path.join(config.target, 'css')));
};
