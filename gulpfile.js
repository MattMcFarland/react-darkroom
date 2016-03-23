'use strict';

/* Module Dependencies */
const
  gulp    = require('gulp'),
  gutil   = require('gulp-util');

/* Tasks */
const
  lint        = require('./tasks/lint'),
  sass        = require('./tasks/sass');


gulp.task('sass-lib',   () => sass('src/scss/**/*.scss', 'darkroom', 'lib/css'));
gulp.task('sass-cont',  () => sass('src/scss/**/*.scss', 'darkroom', 'example/css'));
gulp.task('minify-css', () => minifyCss('src/darkroom.css', 'darkroom.min.css', 'dist'));
gulp.task('header',     () => header('lib/**', 'lib'));
gulp.task('sass',       ['sass-cont', 'sass-lib']);

gulp.task('watch-sass', () => {
  gutil.log('Watch scss/**/*.scss');
  gulp.watch('src/scss/**/*.scss', (e) => {
    gutil.log('File Changed', gutil.colors.cyan(e.path));
    sass('src/scss/darkroom.scss', 'darkroom', 'example/css')
  });
});
