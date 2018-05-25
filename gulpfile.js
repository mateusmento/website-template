require('attract')({basePath: __dirname + '/src'});

const gulp = require('gulp');
const scss = require('gulp-sass');
const typescript = require('gulp-typescript');

const config = required('config');


gulp.task('scss', function(){

    gulp.src(config.STYLESHEETS_PATH + '/*.scss')
        .pipe(scss({outputStyle: 'expanded'}).on('error', scss.logError))
        .pipe(gulp.dest(config.CSS_PATH));

});

gulp.task('watch', function(){

    gulp.watch(config.STYLESHEETS_PATH + '/**/*.scss', ['scss']);

});

gulp.task('default', ['scss', 'watch']);
