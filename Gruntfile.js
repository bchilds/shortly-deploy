module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      //write concat here
      options: {
        separator: ';',
        sourceMap: true,
      },
      dist: {
        src: ['public/client/*.js'],
        dest: 'public/dist/<%= pkg.name %>.js',
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      //write uglify here
      options: {
        sourceMap: true,
        sourceMapIncludeSources: true,
        sourceMapIn: 'public/dist/<%= pkg.name %>.js.map',
      },
      build: {
        src: ['public/dist/<%= pkg.name %>.js'],
        dest: 'public/build/<%= pkg.name %>.min.js',
      },
    },

    eslint: {
      target: [
        // Add list of files to lint here
        'public/client/*.js'
      ]
    },

    cssmin: {
      target: {
        files: {
          'public/build/<%= pkg.name %>.min.css': ['public/*.css']
        }
      }
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
        //probably does a thing
        command: 'git push baz master'
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build', [
    'concat', 
    'uglify',
    'cssmin',
  ]);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', function(n) {
    // add your deploy tasks here
    if (grunt.option('prod')) {
      // add your production server task here
      grunt.task.run([ 'nodemon', 'lint', 'build', 'test', 'shell' ]);
    } else {
      grunt.task.run([ 'nodemon', 'lint', 'build', 'test' ]);
    }
  });


};
