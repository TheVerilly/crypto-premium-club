const { src, dest, watch, series, parallel } = require("gulp");

const babel = require('gulp-babel');

const sync = require("browser-sync").create();

const dartSass = require('sass');
const gulpSass = require('gulp-sass');
const sass = gulpSass(dartSass);

function generateCSS(cb) {
    src('./src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('public/css'))
        .pipe(sync.stream());
    cb();
}

const generateHTML = () => {
    return src('index.html')
        .pipe(dest('public/'));
};

function generateJS() {
    return src('src/js/*.js')
        .pipe(babel())
        .pipe(dest('public/js'));
}

function watchFiles() {
    watch('./src/scss/**/*.scss', generateCSS);
    watch('./src/js/**/*.js', generateJS);
    watch("./index.html").on('change',sync.reload);
}

function browserSync() {
    sync.init({
        server: {
            baseDir: "./"
        }
    });
    watch('./src/scss/**/*.scss', generateCSS);
    watch('./src/js/**/*.js', generateJS);
    watch("./index.html").on('change',sync.reload);
}

exports.serve = series(generateCSS,generateHTML, generateJS, browserSync);
exports.default = series(generateCSS,generateHTML, generateJS);