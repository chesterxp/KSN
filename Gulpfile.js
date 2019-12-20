var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require("gulp-rename");
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
let uglify = require('gulp-uglify-es').default;
let babel = require('gulp-babel');
var runSequence = require('run-sequence');

gulp.task('watch', function () {
	gulp.watch('./src/scss/*.scss', ['sass-dev']);
	gulp.watch('./src/js/*.js', ['scripts-dev']);
});


gulp.task('sass-dev', function () {
	return gulp.src('./src/scss/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('./dist/css'));
});


gulp.task('scripts-dev', function () {
	return gulp.src('./src/js/*.js')
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('./dist/js'));
});


gulp.task('build', function () {
	runSequence(
	'start',
	'styles',
	'scripts',
	'end'
	);
});

gulp.task('start', function(){
	console.log('Buduje paczkę....');
})
gulp.task('styles', function () {
	return gulp.src('./src/scss/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(cssnano())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('scripts', function () {
	return gulp.src('./src/js/*.js')
		.pipe(babel({
			presets: ['@babel/preset-env']
		}))
		.pipe(uglify({
			compress: true
		}))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('./dist/js'));
});

gulp.task('end', function(){
	console.log('Wyprodukowano paczkę');
})