var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync').create();

function defaultTask(cb) {
	browserSync.init({
        server: "dist"
    });
	// place code for your default task here
	// Watch .js files
	gulp.watch('src/assets/js/*.js', function(){
		console.log("cleaning js...");
		return gulp.src('src/assets/js/*.js')
			.pipe(concat('bundle.min.js'))
			.pipe(uglify())
			.pipe(gulp.dest('dist/assets/js'))
			.pipe(browserSync.stream());
	});
	// Watch .scss files
	gulp.watch('src/assets/scss/*.scss', function(){
		console.log("compiling scss...");
		return gulp.src('src/assets/scss/*.scss')
			.pipe(sass().on('error', sass.logError))
			.pipe(autoprefixer())
			.pipe(concat('bundle.min.css'))
			.pipe(minifyCSS())
			.pipe(gulp.dest('dist/assets/css'))
			.pipe(browserSync.stream());
	});

	gulp.watch('src/**/*.html', function () {
		console.log("cleaning pages...");
		return gulp.src(['src/**/*.html'])
			.pipe(htmlmin({
				collapseWhitespace: true,
				removeComments: true
			}))
			.pipe(gulp.dest('dist'))
			.pipe(browserSync.stream());
	});
	// // Watch image files
	// gulp.watch('src/images/**/*', ['images']);
 	cb();
}

exports.default = defaultTask