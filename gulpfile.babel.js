import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins'
import del from 'del';
import lazypipe from 'lazypipe';
import runSequence from 'run-sequence';
import glob from 'glob';
import mergeStream from 'merge-stream';
const $ = gulpLoadPlugins();

const HTML_OBJECT = getEntries('./src/**/*.html');

const babel = lazypipe()
    .pipe($.babel, {
        "presets": [
            ["es2015", {
                "targets": {
                    "chrome": 52,
                    "browsers": ["last 2 versions", "safari 7", "ie 9"]
                }
            }]
        ],
        //可引入Set等新API的polyfill
        "plugins": ["transform-runtime"]
    });

gulp.task('default', (cb) => {
    runSequence('clean:dist', ['build', 'toEs5'], 'server', 'watch', cb);
});

gulp.task('build', () => {
    let task = [];

    for (let key in HTML_OBJECT) {
        let src = HTML_OBJECT[key];
        task.push(gulp.src([src])
            .pipe($.usemin({
                css: [$.less(), $.autoprefixer(), $.rev()],
                js: [babel(), $.browserify(), $.rev()],
            }))
            //压缩／map
            // .pipe($.usemin({
            //     css: [$.sourcemaps.init(), $.less(), $.autoprefixer(), $.cleanCss(), $.rev(), $.sourcemaps.write('.')],
            //     html: [$.htmlmin({ collapseWhitespace: true })],
            //     js: [$.sourcemaps.init(), babel(), $.browserify(), $.uglify(), $.rev(), $.sourcemaps.write('.')],
            //     inlinejs: [$.uglify()],
            //     inlinecss: [$.cleanCss(), 'concat']
            // }))
            .pipe(gulp.dest(`./dist/${ key }/`))
            .pipe($.connect.reload()));
    }


    return mergeStream(task);
})

gulp.task('watch', () => {
    gulp.watch(['./src/**/*', '!src/**/*.js'], ['build']);

    gulp.watch(['src/**/*.js', '!src/**/*.es5.js'], ['build', 'toEs5']);
});

gulp.task('toEs5', () => {
    return gulp.src(['./src/**/*.js', '!src/**/*.es5.js'])
        .pipe(babel())
        .pipe($.rename({ suffix: '.es5' }))
        .pipe(gulp.dest('./src'));
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
});


// 获取指定路径下的入口文件
function getEntries(globPath) {
    var files = glob.sync(globPath),
        entries = {};

    files.forEach(function(filepath) {
        // 取倒数第二层(view下面的文件夹)做包名
        var split = filepath.split('/');
        var name = split[split.length - 2];

        entries[name] = filepath;
    });

    return entries;
}