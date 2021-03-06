
var gulp = require('gulp');
var wiredep = require('wiredep').stream;
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();



// Sass Compile
gulp.task('sass', function () {
  gulp.src('./app/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/css'));
});

gulp.task('info',function(){
  console.info('TodoVue App');
});

gulp.task('bower', function () {
  gulp.src('app/index.html')
    .pipe(wiredep({ignorePath: /^(\.\.\/)*\.\./}))
    .pipe(gulp.dest('app'));
});

// Watch file changes
gulp.task('watch',function(){
  gulp.watch('./app/js/**/*.js',function(){
    console.info('File changes');
  });

  gulp.watch('./app/scss/**/*',['sass']);

});

// Browser-sync
// Static server
gulp.task('browser-sync', function() {

    browserSync.init({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['app'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });
    
});




gulp.task('default',['info','watch','browser-sync']);
