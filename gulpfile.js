var gulp = require('gulp'),
    react = require('gulp-react'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    del = require('del'),
    vinylPaths = require('vinyl-paths'),
    livereload = require('gulp-livereload'),
    LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    autoprefix = new LessPluginAutoPrefix({
        browsers: ['last 2 version']
    });


gulp.task('clean', function(cb) {
    del(['.tmp'], cb);
});

gulp.task('compjsx', function() {
    return gulp.src('assets/jsx/*.jsx')
        .pipe(react())
        .pipe(gulp.dest('assets/js/nunchuk'))

});

gulp.task('compless', function() {
    return gulp.src('assets/less/*.less')
        .pipe(concat('nunchuk.css'))
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(gulp.dest('.tmp/public/css/'))
});

gulp.task('concatjs', ['compjsx'], function() {
    return gulp.src(['assets/js/nunchuk/*js'])
        .pipe(concat('nunchuk.js'))
        .pipe(gulp.dest('.tmp/public/javascripts'))
});

gulp.task('copyhtml', function() {
    return gulp.src('views/*.html')
        .pipe(gulp.dest('.tmp/public/'))
});

gulp.task('copylivereload', function() {
    return gulp.src('assets/js/livereload/livereload.js')
        .pipe(gulp.dest('.tmp/public/javascripts'))
});

gulp.task('build', ['clean'], function() {
    gulp.start('compless', 'concatjs', 'copyhtml', 'copylivereload');
});

gulp.task('watch', function() {

    //start live reload
    livereload();
    //listen default port.
    livereload.listen();

    // run build task when any of these files change.
    gulp.watch(['views/*.html'], ['copyhtml']);
    gulp.watch(['assets/javascripts/*.js'], ['concatjs']);
    gulp.watch(['assets/jsx/*.jsx'], ['concatjs']);
    gulp.watch(['assets/less/*.less'], ['compless'])
        // reload these files
    gulp.watch(['.tmp/public/*.html']).on('change', livereload.changed);
    gulp.watch(['.tmp/public/css/*.css']).on('change', livereload.changed);
    gulp.watch(['.tmp/public/javascripts/nunchuk.js']).on('change', livereload.changed);
});