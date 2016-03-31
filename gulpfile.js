var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('build', () => {
    return gulp.src('./src/index.js')
        .pipe(babel())
        .pipe(gulp.dest('./lib'));
});