var
  gulp = require('gulp'),
  sass = require('gulp-sass'),
  fs = require('fs'),
  header = require('gulp-header'),
  pkg = require('../package.json'),
  gutil = require('gulp-util');

module.exports = function(entry, name, dest) {
  return gulp.src(entry)
    .pipe(sass())
    .on('error', gutil.log)
    .on('end', () => {
      gutil.log('File Saved', gutil.colors.cyan(dest + '/' + name + '.css'));
    })
    .pipe(header(fs.readFileSync('tasks/header.ejs', 'utf8'), {pkg: pkg}))
    .pipe(gulp.dest(dest));
}

