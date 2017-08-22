import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins'
import del from 'del';
import lazypipe from 'lazypipe';
import runSequence from 'run-sequence';
const $ = gulpLoadPlugins();

gulp.task('default', (cb) => {
    runSequence('clean:dist', 'build', 'server', 'watch', cb);
});

gulp.task('build', () => {
    return gulp.src('./src/**/*.html')
        .pipe($.usemin({
            // $.sourcemaps.init(),  $.cleanCss(), , $.sourcemaps.write('.')
            css: [$.less(), $.autoprefixer(), $.cleanCss(), $.rev()],
            // html: [$.htmlmin({ collapseWhitespace: true })],
            //$.sourcemaps.init(), $.uglify(), , $.sourcemaps.write('.')
            js: [$.babel(), $.browserify(), $.rev(), $.uglify()],
            // inlinejs: [$.uglify()],
            // inlinecss: [$.cleanCss(), 'concat']
        }))
        .pipe(gulp.dest('./dist/'))
        .pipe($.connect.reload());
})

gulp.task('watch', () => {
    return gulp.watch(['./src/**'], ['build']);
})

gulp.task('server', () => {
    return $.connect.server({
        port: 9000,
        livereload: true,
        debug: true,
        root: 'dist'
    });
});

gulp.task('clean:dist', () => {
    return del(['dist/**/*']);
})