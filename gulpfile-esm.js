import gulp from 'gulp';
import sass from "gulp-sass";
import cssnano from 'gulp-cssnano';
import rename from 'gulp-rename';
import browserSync from 'browser-sync';
import autoprefixer from 'gulp-autoprefixer';

const browSync = () => {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
}

export const html = () => {
	return gulp.src('app/*.html')
		.pipe(browserSync.reload({ stream: true }))
}

export const SASS = () => {
	return gulp.src('app/sass/**/*.sass')
		.pipe(sass())
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true}))
		.pipe(cssnano())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}))
}

export const scripts = () => {
	return gulp.src(['app/js/common.js', 'app/libs/**/*.js'])
		.pipe(browserSync.reload({ stream: true }))
}

export const watch = () => {
	gulp.watch('app/sass/**/*.sass', gulp.parallel(SASS) );
	gulp.watch('app/*.html', gulp.parallel(html) );
	gulp.watch('app/js/**/*.js', gulp.parallel(scripts) );
}
export default gulp.series(
	gulp.parallel(SASS, browSync, watch)
)