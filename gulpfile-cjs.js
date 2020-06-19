const gulp 		 = require('gulp'),
	sass 		 = require("gulp-sass"),
	cssnano		 = require('gulp-cssnano'),
	rename		 = require('gulp-rename'),
	browserSync  = require('browser-sync'),
	autoprefixer = require('gulp-autoprefixer');
 

const browSync = () => {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
}

const html = () => {
	return gulp.src('app/*.html')
		.pipe(browserSync.reload({ stream: true }))
}

const SASS = () => {
	return gulp.src('app/sass/**/*.sass')
		.pipe(sass())
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true}))
		.pipe(cssnano())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}))
}

const scripts = () => {
	return gulp.src(['app/js/common.js', 'app/libs/**/*.js'])
		.pipe(browserSync.reload({ stream: true }))
}

const watch = () => {
	gulp.watch('app/sass/**/*.sass', gulp.parallel(SASS) );
	gulp.watch('app/*.html', gulp.parallel(html) );
	gulp.watch('app/js/**/*.js', gulp.parallel(scripts) );
}

exports.browSync = browSync;
exports.html = html;
exports.SASS = SASS;
exports.scripts = scripts;
exports.watch = watch;
exports.default = gulp.series(
	gulp.parallel(SASS, browSync, watch)
)
