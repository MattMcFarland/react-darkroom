'use strict';

/* Module Dependencies */
const
  gulp    = require('gulp'),
  gutil   = require('gulp-util');

/* Tasks */
const
  lint        = require('./tasks/lint'),
  sass        = require('./tasks/sass');


gulp.task('sass-lib',   () => sass('lib/scss/**/*.scss', 'darkroom', 'lib/css'));
gulp.task('sass-cont',  () => sass('lib/scss/**/*.scss', 'darkroom', 'example/css'));
gulp.task('minify-css', () => minifyCss('lib/darkroom.css', 'darkroom.min.css', 'dist'));
gulp.task('header',     () => header('dist/**', 'dist'));
gulp.task('sass',       ['sass-cont', 'sass-lib']);

gulp.task('watch-sass', () => {
  gutil.log('Watch scss/**/*.scss');
  gulp.watch('lib/scss/**/*.scss', (e) => {
    gutil.log('File Changed', gutil.colors.cyan(e.path));
    sass('lib/scss/darkroom.scss', 'darkroom', 'example/css')
  });
});
