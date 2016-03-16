var gulp = require('gulp');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
// Fallback
var autoprefixer = require('autoprefixer');
// Future CSS Syntax
var postcsscssnext = require('postcss-cssnext');
// Sass
var precss = require('precss');
// Grid
var lost = require('lost');
// Optimization
var postcssdiscardcomments = require('postcss-discard-comments');
var cssmqpacker = require('css-mqpacker');
// Production
var cssnano = require('cssnano');
// Dev
var postcssimport = require('postcss-import');

// Task PostCSS
gulp.task('css', function () {
  var processor = [
    postcssimport,
    // autoprefixer({ browsers: ['last 2 versions'] }),
    postcssdiscardcomments,
    postcsscssnext,
    precss,
    lost,
    cssmqpacker
  ];
  return gulp
    .src('postcss/*.css')
    .pipe(sourcemaps.init())
    .pipe(postcss(processor))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('css'));
});

// Task watch
gulp.task('watch', function() {
  return gulp
    .watch('postcss/*.css', ['css']);
});

// Run default
gulp.task('default', ['css', 'watch']);