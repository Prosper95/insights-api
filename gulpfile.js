const gulp   = require('gulp');
const babel  = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');

gulp.task('babel', () => {
    return gulp.src('src/js/*.js')
    	.pipe(concat('index.js', {
        	newLine: '\n'
        }))
    	.pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist/js/'))
	        .pipe(rename('index.min.js'))
	        .pipe(uglify())
	        .pipe(gulp.dest('dist/js/'));
});