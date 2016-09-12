'use strict';

var gulp  = require('gulp'),
    sass  = require('gulp-sass'),
    serve = require('gulp-serve'),
    watch = require('gulp-watch'),
    del   = require('del');

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

// Build files for dist.
gulp.task('build', ['stylesheets', 'html']);

// Bootstrap development server.
gulp.task('serve', ['build'], serve(DIST_DIR));

// File watcher.
gulp.task('watch', function(done) {
  watch([SRC_DIR + '/*.html', SRC_DIR + '/styles/*.scss'], function() {
    return gulp.start('build');
  });
});

gulp.task('default', ['serve', 'watch']);
