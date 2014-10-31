var gulp = require('gulp');
var react = require('gulp-react');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
gulp.task('default', function () {
    return gulp.src('lib/**')
    		.pipe(concat('reacticus.js'))
        .pipe(react())
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});