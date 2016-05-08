module.exports = function(grunt) {
  grunt.initConfig ({
    sass: {
      dist: {
        files: {
          'public/css/style.css' : 'src/scss/application.scss'
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      source: {
        files: ['gruntfile.js','src/scss/**/*.scss','src/js/**/*.js'],
        tasks: ['rebuild'],
        options: {
          livereload: false, // needed to run LiveReload
        }
      },
      express: {
        files:  ['views/**/*.ejs'],
        tasks:  [ 'express:dev' ],
        options: {
          spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
        }
      }
    },
    concat: {
      dist: {
        src: ['src/js/**/*.js'],
        dest: 'public/scripts/main.js',
      },
    },
    uglify: {
      dist: {
        files: {
          'public/scripts/main.min.js': ['public/scripts/main.js'],
        }
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'public/css',
          src: ['style.css', '!*.min.css'],
          dest: 'public/css',
          ext: '.min.css'
        }]
      }
    },
    express: {
      dev: {
        options: {
          script: 'app.js'
        }
      }
    },
    copy: {
      main: {
        expand: true,
        src: 'src/fonts/*',
        dest: 'public/css/fonts/',
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('rebuild', ['copy','sass', 'concat', 'uglify', 'cssmin']);
  grunt.registerTask('dev', ['rebuild', 'express', 'watch']);
  grunt.registerTask('default', ['copy','sass', 'concat', 'uglify', 'cssmin']);


};