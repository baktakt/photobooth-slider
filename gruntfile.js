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
      main: {
        src: ['src/js/*.js'],
        dest: 'public/scripts/main.js',
      },
      vendor: {
        src: ['src/js/vendor/*.js'],
        dest: 'public/scripts/vendor.js',
      },
    },
    uglify: {
      dist: {
        files: {
          'public/scripts/main.min.js': ['public/scripts/main.js'],
          'public/scripts/vendor.min.js': ['public/scripts/vendor.js'],
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
        cwd: 'src/fonts',
        src: '**',
        dest: 'public/css/fonts',
      },
      loader: {
        expand: true,
        cwd: 'src/img',
        src: 'ajax-loader.gif',
        dest: 'public/css/'
      },
      img: {
        expand: true,
        cwd: 'src/img',
        src: '**',
        dest: 'public/images/'
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

  grunt.registerTask('rebuild', ['sass', 'concat', 'uglify', 'cssmin']);
  grunt.registerTask('dev', ['rebuild', 'express', 'watch']);
  grunt.registerTask('default', ['copy','sass', 'concat', 'uglify', 'cssmin']);


};
