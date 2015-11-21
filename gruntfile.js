module.exports = function(grunt) {

  grunt.initConfig({

    ngconstant: {
      options: {
        name: 'config'
      },

      development: {
        options: {
          dest: 'app/config.js'
        },
        constants: {
          ENV: {
            name: 'development',
            apiendpoint: 'http://localhost:5555'
          }
        }
      },

      production: {
        options: {
          dest: 'app/config.js'
        },
        constants: {
          ENV: {
            name: 'production',
            apiendpoint: 'http://www.lawkanet.xyz'
          }
        }
      }

    }


  });

  grunt.loadNpmTasks('grunt-ng-constant');

  grunt.registerTask('builddev', ['ngconstant:development']);
  grunt.registerTask('buildpro', ['ngconstant:production']);

};