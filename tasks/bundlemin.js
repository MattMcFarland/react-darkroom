var
  browserify = require('browserify'),
  gulp = require('gulp'),
  fs = require('fs'),
  header = require('gulp-header'),
  pkg = require('../package.json'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  uglify = require('gulp-uglify'),
  gutil = require('gulp-util'),
  getNPMPackageIds = require('./helpers').getNPMPackageIds,
  compressionOptions = require('../config/gulpCompressionOptions');

module.exports = function(entry, name, dest, callback) {
  var b = browserify({
    entries: entry,
    standalone: 'MarkedArea'
  });
  var filename = name + ".min.js";

  getNPMPackageIds().forEach(function (id) {
    b.external(id);
  });

  b.transform({global: true}, 'browserify-shim');

  return b.bundle()
    .on('error', gutil.log)
    .pipe(source(filename))
    .pipe(buffer())
    .pipe(uglify(compressionOptions))
    .on('end', () => {
      gutil.log('File Saved', gutil.colors.cyan(dest + '/' + name + '.min.js'));
    })
    .pipe(header(fs.readFileSync('tasks/header.ejs', 'utf8'), {pkg: pkg}))
    .pipe(gulp.dest(dest));
};

