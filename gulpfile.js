// gulp package
var gulp = require('gulp');
// npm install jshint gulp-jshint gulp-sass gulp-concat gulp-uglify gulp-rename --save-dev

//jS
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

//  browser reload, IMG mini
var livereload = require('gulp-livereload');
var imagemin = require('gulp-imagemin');
//CSS
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var sassdoc = require('sassdoc');

// where ?
// JS
var inputJs ='js/*.js';
var outputJs ='minjs';
// SASS
var inputSass = 'scss/**/*.scss';
var outputSass = 'css';
// IMG
var inputImg = 'img/*';

// error log
function errorLog(error) {
    console.error.bind(error);
    this.emit('end');
}

// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .on('error', errorLog)
        .pipe(jshint.reporter('jshint-stylish'));
});


// #########################  JS UGLIFY
// source to dir src
// uglify file
// destination file
gulp.task('scripts', function(){
        gulp.src(inputJs)
        .pipe(concat('all.js'))
        .pipe(gulp.dest(outputJs))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .on('error', errorLog)
        .pipe(gulp.dest(outputJs));
    console.log('##### uglify done!');
});

// #########################   SASS
var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'compressed'
};

var autoprefixerOptions = {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

gulp.task('sass', function(){
    // find all sass
    // run on this files
    // write results in output
    gulp.src(inputSass)
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions)
            .on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest(outputSass))
        .pipe(livereload());
    console.log('##### sass done!');
});

// SASS doc

gulp.task('sassdoc', function () {
    console.log('######### sassdoc genereted check DIR sassdoc');
    return gulp.src(inputSass)
        .pipe(sassdoc());
});

// Img
// minimal compress
gulp.task('image', function(){
    gulp.src(inputImg)
        .pipe(imagemin())
        .pipe(gulp.dest('img/compress'));

    console.log('##### IMG compress done!');
});
// watch task
// sass
// js
gulp.task('watch', function(){
    // livereload css, plugin livereload needed
    livereload.listen();
    gulp.watch('js/*.js', ['scripts']);
    gulp.watch('scss/**/*.scss', ['sass']);
    });

gulp.task('default', ['lint', 'scripts', 'sass', 'watch']);


//var concat= require('gulp-concat');
//var uglify= require('gulp-uglify');
//var rename= require('gulp-rename');
//
//gulp.task('scripts', function() {
//    return gulp.src('js/*.js')
//        .pipe(concat('all.js'))
//        .pipe(gulp.dest('dist'))
//        .pipe(rename('all.min.js'))
//        .pipe(uglify())
//        .pipe(gulp.dest('dist'));
//});
//var sass= require('gulp-sass');co
//gulp.task('sass', function() {
//    return gulp.src('scss/*.scss')
//        .pipe(sass())
//        .pipe(gulp.dest('css'));
//});

//gulp.task("watch", function(){
//    gulp.watch('js/*js', ['lint', 'scripts'])
//});

// our task to do
//gulp.task('default', ['sass']);