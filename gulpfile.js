var gulp = require('gulp'),
    csso = require('gulp-csso'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    spritesmith = require('gulp.spritesmith'),
    reload = browserSync.reload;

var paths = {
    scss: 'scss/*.scss',
    html: '*.html',
    imgSrc: 'img/*.*'
};

gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: "./"
        },
        port: 8080,
        open: true,
        notify: false
    });
});

gulp.task('html', function() {
    gulp.src(paths.html)
        .pipe(reload({stream: true}))
});

gulp.task('scss', function() {
    return gulp.src('scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(csso())
        .pipe(gulp.dest('cssBuild'))
        .pipe(reload({stream: true}))
});

gulp.task('sprite', function() {
    var spriteData = gulp.src('img/spritesSrc/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        imgPath: '/img/sprite.png',
        cssName: '_sprites.scss'
    }));

    spriteData.img.pipe(gulp.dest('img'));
    spriteData.css.pipe(gulp.dest('scss'));
});

gulp.task('watch', function () {
    gulp.watch(paths.scss, ['scss']);
    gulp.watch(paths.html, ['html']);
});

gulp.task('default', ['watch', 'browserSync']);
gulp.task('build', ['sprite', 'scss']);

