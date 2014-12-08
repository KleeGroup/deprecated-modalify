var gulp = require('gulp');
var concat = require('gulp-concat');
/**
 * Build all the jade templates.
 * @return {function}
 */
gulp.task('templates', function() {
  var jade = require('gulp-jade');
  var defineModule = require('gulp-define-module');
  gulp.src('./lib/templates/*.jade')
    .pipe(jade({
      client: true
    }))
    .pipe(defineModule('commonjs'))
    .pipe(gulp.dest('./lib/templates/'));
});

gulp.task('browserify', ['templates'], function() {
  var browserify = require('browserify');
  var source = require('vinyl-source-stream');
  return browserify('./lib/index.js')
    .bundle()
    //Pass desired output filename to vinyl-source-stream
    .pipe(source('modalify.js'))
    // Start piping stream to tasks!
    .pipe(gulp.dest('./dist/'))
    .pipe(gulp.dest('./example/'));
});

gulp.task('style', function() {
  var less = require('gulp-less');
  var path = require('path');
  var concat = require('gulp-concat');
  gulp.src('./lib/styles/*.less')
    .pipe(less(
      /*{
            paths: [ path.join(__dirname, 'less', 'includes') ]
          }*/
    ))
    //.pipe(concat('modalify.css'))
    .pipe(gulp.dest('./dist/'))
    .pipe(gulp.dest('./example/'));
});
//
var browserSync = require('browser-sync');
var reload = browserSync.reload;
// Watch Files For Changes & Reload
gulp.task('serve', ['browserify', 'style'], function() {
  browserSync({
    notify: false,
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: {
      baseDir: ['example']
    }
  });

  gulp.watch(['lib/**/*.js'], ['browserify', reload]);
  gulp.watch(['lib/templates/*.jade'], ['templates', reload]);
  gulp.watch(['lib/styles/*.{less,css}'], ['style', reload]);
  gulp.watch(['lib/*.json'], ['browserify', reload]);
  //gulp.watch(['app/scripts/**/*.js'], jshint);
  //gulp.watch(['app/images/**/*'], reload);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['browserify', 'style']);