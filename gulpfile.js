var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var filesize = require('gulp-filesize');
var less = require('gulp-less');
var changed = require('gulp-changed');
var watch = require('gulp-watch');

gulp.task('clean', function () {
  return gulp.src('build', {read: false})
    .pipe(clean());
});

gulp.task('vendor', function() {
  return gulp.src('vendor/*.js')
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('build'))
    .pipe(filesize())
    .pipe(uglify())
    .pipe(rename('vendor.min.js'))
    .pipe(gulp.dest('build'))
    .pipe(filesize())
    .on('error', gutil.log)
});

gulp.task('css', function () {
  return gulp.src('less/**/*.less')
    .pipe(changed('build/css'))
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('build/css'))
    .on('error', gutil.log);
});

gulp.task('css:watch', function () {
  watch({
    glob: 'less/**/*.less',
    emit: 'one',
    emitOnGlob: false
  }, function(files) {
    return files
      .pipe(less({
        paths: [ path.join(__dirname, 'less', 'includes') ]
      }))
      .pipe(gulp.dest('build/css'))
      .on('error', gutil.log);
  });
});