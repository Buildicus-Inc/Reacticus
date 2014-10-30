var gulp = require('gulp');
var react = require('gulp-react');

gulp.task('default', function () {
    return gulp.src('lib/**')
        .pipe(react())
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});