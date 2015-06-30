module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      components: {
        files: [
          // bower js files
          {expand: true, flatten: true, src: ['bower_components/jquery/dist/*'], dest: 'public/js/libs/jquery/', filter: 'isFile'},
          {expand: true, flatten: true, src: ['bower_components/bootstrap/dist/js/*'], dest: 'public/js/libs/bootstrap/', filter: 'isFile'},
          {expand: true, flatten: true, src: ['bower_components/angular/*'], dest: 'public/js/libs/angular/', filter: 'isFile'},
          {expand: true, flatten: true, src: ['bower_components/angular-resource/*'], dest: 'public/js/libs/angular-resource/', filter: 'isFile'},
          {expand: true, flatten: true, src: ['bower_components/angular-route/*'], dest: 'public/js/libs/angular-route/', filter: 'isFile'},

          // bower css files
          {expand: true, flatten: true, src: ['bower_components/bootstrap/dist/css/*'], dest: 'public/css/bootstrap/', filter: 'isFile'},
          {expand: true, flatten: true, src: ['bower_components/bootstrap/dist/fonts/*'], dest: 'public/css/fonts/', filter: 'isFile'},
          {expand: true, flatten: true, src: ['bower_components/angular/*.css'], dest: 'public/css/angular/', filter: 'isFile'},

        ],
      },
      assets: {
        files: [
          // app assets
          {expand: true, flatten: true, src: ['assets/css/fonts/*'], dest: 'public/css/fonts/', filter: 'isFile'},
          // {expand: true, flatten: true, src: ['assets/css/*.css'], dest: 'public/css/', filter: 'isFile'},
          {expand: true, flatten: true, src: ['assets/js/*'], dest: 'public/js/', filter: 'isFile'}

        ],
      },
    },
    watch: {
      styles: {
        files: ['assets/css/*.scss'], tasks: ['sass'], options: { spawn: false }
      },
      scripts: {
        files: ['assets/js/*.js'], tasks: ['copy:assets'], options: { spawn: false }
      }
    },
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'public/css/app.css': 'assets/css/main.scss'
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Default task(s).
  grunt.registerTask('default', ['copy', 'sass', 'watch']);

};