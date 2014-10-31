var gulp = require('gulp');
var react = require('gulp-react');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var traceur = require('gulp-traceur');
gulp.task('default', function () {
    return gulp.src('lib/**')
    		.pipe(gulp.dest('dist/reacticus'))
        .pipe(react())
        .pipe(traceur())
        .pipe(concat('reacticus.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});
