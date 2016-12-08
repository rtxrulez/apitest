var gulp = require('gulp'),
    browserSync = require('browser-sync').create();

// корневая папка сервера
var serverDir = '.';

// стили
gulp.task('styles', function(){
    return gulp.src('styles/*.css')
        .pipe(browserSync.stream());
});

// скрипты
gulp.task('scripts', function() {
    return gulp.src('scripts/*.js')
        .pipe(browserSync.stream());
});

// Сервер
gulp.task('serv', ['styles', 'scripts'], function() {
    // запускаем сервер
    browserSync.init({
        server: serverDir // корневой каталог сервака
    });

    gulp.watch('styles/*.css', ['styles']);
    gulp.watch('scripts/*.js', ['scripts']);
    gulp.watch('*.html').on('change', browserSync.reload);
});


// задачи по умолчанию
gulp.task('default', ['serv']);
