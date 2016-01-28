var gulp = require('gulp');

gulp.task('dist', ['setDist', 'uglify', 'copy']);
