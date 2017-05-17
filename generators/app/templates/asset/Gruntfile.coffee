module.exports = (grunt)->
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-exec'
  grunt.initConfig
    exec:
      spec: 'npm run test'
    watch:
      mochaUser:
        files:['./server/**/*', './test/**']
        tasks: ['exec:spec']
  grunt.registerTask 'serve', ['watch']
