// gulp
var gulp = require('gulp');

// plugins
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var minifyCSS = require('gulp-minify-css');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');

// tasks
gulp.task('lint', function() {
  gulp.src(['./app/**/*.js', '!./app/bower_components/**'])
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(jshint.reporter('fail'));
});
gulp.task('clean', function() {
  gulp.src('./dist/*')
      .pipe(clean({force: true}));
});
gulp.task('minify-css', function() {
  var opts = {comments:true,spare:true};
  gulp.src(['./app/**/*.css', '!./app/bower_components/**'])
      .pipe(minifyCSS(opts))
      .pipe(gulp.dest('./dist/'))
});
gulp.task('minify-js', function() {
  gulp.src(['./app/**/*.js', '!./app/bower_components/**'])
      .pipe(uglify({
        // inSourceMap:
        // outSourceMap: "app.js.map"
      }))
      .pipe(gulp.dest('./dist/'))
});
gulp.task('copy-bower-components', function () {
  gulp.src('./app/bower_components/**')
      .pipe(gulp.dest('dist/bower_components'));
});
gulp.task('copy-html-files', function () {
  gulp.src('./app/**/*.html')
      .pipe(gulp.dest('dist/'));
});

gulp.task('js', function () {
  gulp.src(['src/**/module.js', 'src/**/*.js'])
      .pipe(sourcemaps.init())
      .pipe(concat('app.js'))
      .pipe(ngAnnotate())
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('.'))
});

gulp.task('connect', function () {
  connect.server({
    root: 'app/',
    port: 8811
  });
});


gulp.task('watch', ['js'], function () {
    gulp.watch('src/**/*.js', ['js'])
});

gulp.task('connectDist', function () {
  connect.server({
    root: 'dist/',
    port: 9999
  });
});


// default task
gulp.task('default',
    ['lint', 'connect']
);
gulp.task('build', function() {
  runSequence(
      ['clean'],
      ['lint', 'minify-css', 'minify-js', 'copy-html-files', 'copy-bower-components', 'connectDist', 'js','watch']
  );
});
