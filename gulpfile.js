var gulp = require('gulp'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    livereload = require('gulp-livereload'),
    LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    autoprefix = new LessPluginAutoPrefix({
        browsers: ['last 2 version']
    });

// Styles
gulp.task('styles', function() {
    return gulp.src('assets/less/*.less')
        .pipe(concat('nunchuk.css'))
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(gulp.dest('.tmp/public/css/'))
});

// Scripts
// concatenate javascript files
gulp.task('scripts', function() {
    return gulp.src('assets/js/**/*.js')
        .pipe(concat('bootstrap.js'))
        .pipe(gulp.dest('.tmp/public/javascripts'))
});


gulp.task('copylivereload', function() {
    return gulp.src('assets/js/*.js')
        .pipe(concat('livereload.js'))
        .pipe(gulp.dest('.tmp/public/javascripts'))
});

// Views
gulp.task('views', function() {
    return gulp.src('views/*.html')
        .pipe(gulp.dest('.tmp/public/'))
});

// Watch
gulp.task('watch', function() {
    // run these tasks on watch start.
    gulp.start(['copylivereload','styles', 'scripts', 'views'])
    livereload()
    livereload.listen();
    // run these tasks when files change.
    gulp.watch(['views/*.html'], ['views']);
    gulp.watch(['assets/less/*.less'], ['styles']);
    gulp.watch(['assets/js/*.js'], ['scripts']);
    // reload these files
    gulp.watch(['views/*.html']).on('change', livereload.changed);
    gulp.watch(['.tmp/public/css/*.css']).on('change', livereload.changed);
    gulp.watch(['.tmp/public/javascripts/*.js']).on('change', livereload.changed);

});
