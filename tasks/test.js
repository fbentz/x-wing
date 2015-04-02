'use strict';
var path = require('path');
var karma = require('karma').server;

/**
 * Test task
 */
exports.tdd = function tdd(done) {
  karma.start({
    configFile: path.join(__dirname, '../', 'karma.conf.js')
  }, done);
};


exports.ci = function ci(done) {
  karma.start({
    configFile: path.join(__dirname, '../', 'karma.conf.js'),
    autoWatch: false,
    singleRun: true
  }, function(status) {
    if(status > 0) {
      throw Error('Test failed');
    }
    return done;
  });
};
