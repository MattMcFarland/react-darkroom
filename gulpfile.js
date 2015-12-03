'use strict';

/* Module Dependencies */
const
  gulp    = require('gulp'),
  gutil = require('gulp-util'),
  server  = require('gulp-webserver');

/* Tasks */
const
  bundle      = require('./tasks/bundle'),
  bundlemin   = require("./tasks/bundlemin"),
  bundledeps  = require('./tasks/bundledeps'),
  lint        = require('./tasks/lint'),
  watch       = require('./tasks/watch'),
  minifyCss   = require('./tasks/minify-css'),
  sass        = require('./tasks/sass');


gulp.task('bundle-vendor', (done) => {
  bundledeps('vendor', 'example/js', done);
});

// minor tasks
gulp.task('lint',       () => lint('src/darkroom.js'));
gulp.task('sass-dist',  () => sass('style/**/*.scss', 'darkroom', 'dist'));
gulp.task('sass-lib',   () => sass('style/**/*.scss', 'darkroom', 'lib'));
gulp.task('sass-cont',  () => sass('style/**/*.scss', 'darkroom', 'example/css'));
gulp.task('minify-css', () => minifyCss('lib/darkroom.css', 'darkroom.min.css', 'dist'));
gulp.task('header',     () => header('dist/**', 'dist'));
gulp.task('sass',       ['sass-lib', 'sass-dist']);

// bundlers
gulp.task('bundle-cont',       () => bundle('src/container',     'container', 'example/js'));
gulp.task('bundle-lib',        () => bundle('src/darkroom',      'darkroom', 'lib'));
gulp.task('bundle-dist-min',   () => bundlemin('src/darkroom',   'darkroom', 'dist'));
gulp.task('bundle-dist-debug', () => bundle('src/darkroom',      'darkroom', 'dist'));

gulp.task('bundle-container', ['sass-cont', 'bundle-cont']);

// bundle UMD distribution files
gulp.task('bundle-dist', ['lint', 'sass', 'minify-css', 'bundle-dist', 'bundle-dist-min']);

// Bundle Package
gulp.task('bundle',  ['lint', 'sass', 'minify-css', 'bundle-dist-debug', 'bundle-dist-min', 'bundle-lib']);

gulp.task('watch', () => watch('src/container',  'container', 'example/js'));


gulp.task('watch-sass', () => {
  gutil.log('Watch style/**/*.scss');
  gulp.watch('style/**/*.scss', (e) => {
    gutil.log('File Changed', gutil.colors.cyan(e.path));
    sass('style/darkroom.scss', 'darkroom', 'example/css')
  });
});

// Web server.
gulp.task('serve', function() {
  gulp.src('example')
    .pipe(server({
      open: true
    }));
});
