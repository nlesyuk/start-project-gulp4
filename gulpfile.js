var gulp 		 = require('gulp'),
	sass 		 = require("gulp-sass"),
	cssnano		 = require('gulp-cssnano'),
	rename		 = require('gulp-rename'),
	browserSync  = require('browser-sync'),
	autoprefixer = require('gulp-autoprefixer');
 
gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('sass', function(){
	return gulp.src('app/sass/**/*.sass')
		.pipe(sass())
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true}))
		.pipe(cssnano())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('code', function() {
    return gulp.src('app/*.html')
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('scripts', function() {
    return gulp.src(['app/js/common.js', 'app/libs/**/*.js'])
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('watch', function(){
	gulp.watch('app/sass/**/*.sass', gulp.parallel('sass') );
	gulp.watch('app/*.html', gulp.parallel('code') );
    gulp.watch('app/js/**/*.js', gulp.parallel('scripts') );
});

gulp.task('default', gulp.parallel('sass', 'browser-sync', 'watch') );


// *.sass - выбирает все файлы, имеющие определенное расширение (в данном случае, .sass) в корневой папке проекта.
// **/*.js - выбирает все файлы с расширением .js во всех папках проекта.
// !header.sass - исключает файл из общей выборки
// *.+(scss|sass) - задает комплексный шаблон для нескольких типов файлов, разделенных вертикальной чертой. В данном примере в выборкупопадут любые sass и scss файлы в корне проекта.

// _part-1.sass
// @import to main file
// Обратите внимание, что при импорте в Sass простых CSS файлов библиотек, расширение файла .css не указывается.


/* 
https://codeburst.io/switching-to-gulp-4-0-271ae63530c0
*/
