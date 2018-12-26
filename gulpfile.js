
var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');

gulp.task('compile-scss', function(){
	console.log("compiling scss...");
	return gulp.src('src/scss/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(concat('bundle.min.css'))
		.pipe(minifyCSS())
		.pipe(gulp.dest('dist/assets/css'));
})

gulp.task('clean-scripts', function(){
	console.log("cleaning js...");
	return gulp.src('src/js/*.js')
	.pipe(concat('bundle.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/assets/js'));
})

gulp.task('clean-pages', function() {
  return gulp.src(['src/**/*.html'])
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('dist'));
});