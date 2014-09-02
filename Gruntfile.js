module.exports = function(grunt){

  grunt.initConfig({
    jshint: {
      src: ['Gruntfile.js', 'app.js', './lib/*.js', './routes/*.js','./util/*.js', './test/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        globals: {
          require: true,
          module: true,
          describe: true,
          before: true,
          expect: true,
          it: true
        }
      }
    },
    simplemocha: {
      options: {
        globals: ['expect'],
        timeout: 3000,
        ignoreLeaks: false,
        ui: 'bdd',
        reporter: 'tap'
      },
      all: { src: ['./test/*.js'] }
    }
  });

// Load JSHint task
grunt.loadNpmTasks('grunt-contrib-jshint');

grunt.loadNpmTasks('grunt-simple-mocha');

  // default mocha task
  grunt.registerTask('default', ['jshint','simplemocha']);
};