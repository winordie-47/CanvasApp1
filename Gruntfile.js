'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-simple-mocha');

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: true
      },
      src: ['models/**/*.js', 'routes/**/*.js', 'test/**/*.js', 'server.js', 'Gruntfile.js']
    },

    jscs: {
      src: ['models/**/*.js', 'routes/**/*.js', 'test/**/*.js', 'server.js', 'Gruntfile.js'],
      options: {
        config: '.jscsrc'
      }
    },

    simplemocha: {
      src: ['test/api_test.js']
    }
  });
  grunt.registerTask('test', ['jshint', 'jscs', 'simplemocha']);
  grunt.registerTask('default', ['test']);
};
