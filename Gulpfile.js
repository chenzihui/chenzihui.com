'use strict';

var gulp     = require('gulp'),
    sass     = require('gulp-sass'),
    serve    = require('gulp-serve'),
    del      = require('del');

var SRC_DIR  = 'src',
    DIST_DIR = 'dist';

// Clean up HTML files.
gulp.task('clean:html', function(done) {
  return del([DIST_DIR + '/*.html']);
});

// Clean up CSS files.
gulp.task('clean:css', function(done) {
  return del([DIST_DIR + '/styles/*.css']);
});

// Copy HTML files to dist.
gulp.task('html', ['clean:html'], function() {
  return gulp.src(SRC_DIR + '/index.html')
    .pipe(gulp.dest(DIST_DIR));
});

// Compile SASS files and copy to dist.
gulp.task('stylesheets', ['clean:css'], function() {
  return gulp.src(SRC_DIR + '/styles/app.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: SRC_DIR + '/styles/**'
    }))
    .pipe(gulp.dest(DIST_DIR + '/styles'));
});

// Bootstrap development server.
gulp.task('serve', ['stylesheets', 'html'], serve(DIST_DIR));

gulp.task('default', ['serve']);
