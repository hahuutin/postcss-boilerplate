var gulp = require('gulp');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var postcsscssnext = require('postcss-cssnext');
var precss = require('precss');
var lost = require('lost');
var postcssdiscardcomments = require('postcss-discard-comments');
var cssmqpacker = require('css-mqpacker');
var cssnano = require('cssnano');
var postcssimport = require('postcss-import');
var rucksack = require('gulp-rucksack');
var bem = require('postcss-bem');

// Task PostCSS
gulp.task('css', function () {
  var processor = [
    postcssimport,
    autoprefixer({ browsers: ['last 2 versions'] }),
    postcssdiscardcomments,
    postcsscssnext({warnForDuplicates: false}),
    precss,
    lost,
    cssmqpacker,
	bem({
		separators: {
			namespace: '-',
			descendent: '__',
			modifier: '--'
		}
	})
  ];
  return gulp
    .src('postcss/*.css')
    .pipe(sourcemaps.init())
    .pipe(postcss(processor))
	.pipe(rucksack())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('css'));
});

// Task watch
gulp.task('watch', function() {
  return gulp
    .watch('postcss/**/*.css', ['css']);
});

// Run default
gulp.task('default', ['css', 'watch']);