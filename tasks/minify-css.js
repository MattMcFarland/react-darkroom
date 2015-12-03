var
  gulp = require('gulp'),
  fs = require('fs'),
  header = require('gulp-header'),
  pkg = require('../package.json'),
  minifyCss = require('gulp-minify-css'),
  rename = require('gulp-rename');

module.exports = function(source, name, dest) {
  return gulp.src(source)
    .pipe(rename(name))
    .pipe(minifyCss({compatibility: 'ie9'}))
    .pipe(header(fs.readFileSync('tasks/header.ejs', 'utf8'), {pkg: pkg}))
    .pipe(gulp.dest(dest));
}
