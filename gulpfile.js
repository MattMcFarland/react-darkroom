'use strict';

/* Module Dependencies */
const
  gulp    = require('gulp'),
  gutil   = require('gulp-util'),
  server  = require('gulp-webserver');

/* Tasks */
const
  bundle    = require('./tasks/bundle'),
  bundlemin = require("./tasks/bundlemin"),
  lint      = require('./tasks/lint'),
  minifyCss = require('./tasks/minify-css'),
  sass      = require('./tasks/sass');


// minor tasks
gulp.task('lint',       () => lint('src/markedarea.js'));
gulp.task('sass-dist',  () => sass('style/markedarea.scss', 'markedarea', 'dist'));
gulp.task('sass-lib',   () => sass('style/markedarea.scss', 'markedarea', 'lib'));
gulp.task('minify-css', () => minifyCss('lib/markedarea.css', 'markedarea.min.css', 'dist'));
gulp.task('header',     () => header('dist/**', 'dist'));
gulp.task('sass',       ['sass-lib', 'sass-dist']);

// bundlers
gulp.task('bundle-lib',        () => bundle('src/markedarea',      'markedarea', 'lib'));
gulp.task('bundle-dist-min',   () => bundlemin('src/markedarea',   'markedarea', 'dist'));
gulp.task('bundle-dist-debug', () => bundle('src/markedarea',      'markedarea', 'dist'));

// bundle UMD distribution files
gulp.task('bundle-dist', ['lint', 'sass', 'minify-css', 'bundle-dist', 'bundle-dist-min']);

// Bundle Package
gulp.task('bundle',  ['lint', 'sass', 'minify-css', 'bundle-dist-debug', 'bundle-dist-min', 'bundle-lib']);

// Web server.
gulp.task('serve', function() {
  gulp.src('examples/basic')
    .pipe(server({
      open: true
    }));
});
