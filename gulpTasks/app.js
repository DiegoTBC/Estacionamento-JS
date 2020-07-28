const gulp = require('gulp')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const uglifycss = require('gulp-uglifycss')
const concat = require('gulp-concat')
const htmlmin = require('gulp-htmlmin')
const imagemin = require('gulp-imagemin')

function appHtml(){
    return gulp.src('src/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true}))
    .pipe(gulp.dest('build'))
}

function appCSS(){
    return gulp.src('src/assets/css/**/*.css')
    .pipe(uglifycss({"uglyComments": true}))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('build/assets/css'))
}

function appJS(){
    return gulp.src('src/assets/js/**/*.js')
    .pipe(babel())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('build/assets/js'))
}

function appIMG(){
    return gulp.src('src/assets/imgs/**/*.*')
    .pipe(imagemin())
    .pipe(gulp.dest('build/assets/imgs'))
}

gulp.task('appHtml', appHtml)
gulp.task('appCSS', appCSS)
gulp.task('appJS', appJS)
gulp.task('appIMG', appIMG)


module.exports = {
    appHtml,
    appCSS,
    appJS,
    appIMG
}