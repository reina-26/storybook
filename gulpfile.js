// const browserSync = require('browser-sync');
const gulp = require("gulp");
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const sassGlob = require("gulp-sass-glob");
const postcss = require('gulp-postcss');
const autoprefixer = require("gulp-autoprefixer");
const cssnext = require( "postcss-cssnext");
const htmlbeautify = require("gulp-html-beautify");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const ejs =require("gulp-ejs");
const replace = require("gulp-replace");
const convertEncoding = require("gulp-convert-encoding");
const cssnextSettings = cssnext({
  features: {
      rem: false,
  },
  browsers: AUTOPREFIXER_BROWSERS
});

var AUTOPREFIXER_BROWSERS = [
  'last 2 version',
  'ie >= 11',
  'Android >= 4'
];

const cssPlugins = [
  cssnextSettings,
];

// TODO: gulp からの browser-sync がうまくいかないため保留（npm スクリプトで実行可能）

// // browser-sync
// gulp.task('browser-sync', (done) => {
//   browserSync.init({
//     server : {
//       baseDir : './fdocs/',
//     },
//     startPath: 'index.html',
//     open: 'external',
//   });
//   done();
// });

// // browser-sync リロード設定
// gulp.task('browser-reload', (done) => {
//   browserSync.reload();
//   done();
// });

// // browser-sync 監視ファイル
// gulp.task('watch-files', (done) =>  {
//   gulp.watch("./fdocs/*", gulp.task('browser-reload'));
//   done();
// });

// vendor
gulp.task("vendor", () => {
  return gulp.src([
    "node_modules/jquery/dist/jquery.min.js",
    "node_modules/chart.js/dist/chart.min.js",
  ], { base: "node_modules" })
    .pipe(plumber())
    .pipe(rename(path => {
      path.dirname =
        path.dirname
          .replace(/\/dist(?=\/|$)/, "")
          .replace(/\\dist(?=\\|$)/, "");
      path.extname =
        path.extname
          .replace(/\.less$/, ".css");
    }))
    .pipe(gulp.dest("fdocs/js"))
    .pipe(gulp.dest("fdocs-sjis/js"));
});

// scss
gulp.task("scss", () => {
  return gulp.src([
    "src/scss/**/*.scss",
  ])
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass({ outputStyle: "expanded"}))
    .pipe( postcss( cssPlugins ) )
    .pipe(autoprefixer({ cascade:false }))
    .pipe( sourcemaps.write( '/maps' ) )
    .pipe(gulp.dest("fdocs/css"))
    .pipe(gulp.dest("fdocs-sjis/css"));
});

// ejs
gulp.task("ejs", () => {
	return gulp.src([
		"src/ejs/**/*.ejs", "!src/ejs/**/_*.ejs"
	]).pipe(ejs())
    .pipe(htmlbeautify({
      "indent_size": 2,
      "indent_char": " ",
      "max_preserve_newlines": 0,
      "preserve_newlines": true,
      "extra_liners": [],
    }))
    .pipe(rename({ extname: ".html" }))
		.pipe(gulp.dest("fdocs"))
		.pipe(gulp.dest("fdocs-sjis"));
});

// js
gulp.task("js", () => {
	return gulp.src([
		"src/js/**/*"
	]).pipe(gulp.dest("fdocs/js"))
    .pipe(gulp.dest("fdocs-sjis/js"));
});

// images
gulp.task("images", () => {
  return gulp.src([
    "src/images/**/*",
  ]).pipe(gulp.dest("fdocs/images"))
    .pipe(gulp.dest("fdocs-sjis/images"));
});

// font
gulp.task("font", () => {
  return gulp.src([
    "src/font/**/*",
  ]).pipe(gulp.dest("fdocs/font"))
    .pipe(gulp.dest("fdocs-sjis/font"));
});

// fabicon
gulp.task("fabicon", () => {
  return gulp.src([
    "src/*.ico", "src/*.png", "src/*.svg", "src/manifest.webmanifest",
  ]).pipe(gulp.dest("fdocs/"))
    .pipe(gulp.dest("fdocs-sjis/"));
});

// マークダウン
gulp.task("markdown", () => {
  return gulp.src([
    "src/*.md",
  ]).pipe(gulp.dest("fdocs/"))
    .pipe(gulp.dest("fdocs-sjis/"));
});

// 文字コードをUTF-8からShift_JISに変換
gulp.task("convertToSjis", function(done) {
  gulp.src([ "fdocs/css/*.css" ])
    .pipe(replace(/utf-8/ig, "Shift_JIS"))
    .pipe(convertEncoding({to: "Shift_JIS"}))
    .pipe(gulp.dest("fdocs-sjis/css/"));
  gulp.src([ "fdocs/js/script.js" ])
    .pipe(convertEncoding({to: "Shift_JIS"}))
    .pipe(gulp.dest("fdocs-sjis/js/"));
  gulp.src([ "fdocs/*.html" ])
    .pipe(replace(/<meta charset="utf-8">/ig, "<meta charset=\"Shift_JIS\">"))
    .pipe(convertEncoding({to: "Shift_JIS"}))
    .pipe(gulp.dest("fdocs-sjis/"));
  done();
});

function watchChangeFlie(done) {
  gulp.watch("src/scss/**/*.scss",   gulp.task("scss"));
  gulp.watch("src/ejs/**/*.ejs",  gulp.task("ejs"));
  gulp.watch("src/js/**/*.js",    gulp.task("js"));
  gulp.watch("src/images/**/*",   gulp.task("images"));
  gulp.watch(["src/*.ico", "src/*.png"], gulp.task("fabicon"));
  gulp.watch(["src/*.md"], gulp.task("markdown"));
  gulp.watch(["fdocs/**/*.html", "fdocs/css/**/*.css", "fdocs/js/script.js"], gulp.task("convertToSjis"));
  done();
}

gulp.task("default", gulp.series("vendor", "scss", "ejs", "js", "images", "font", "fabicon", "markdown", "convertToSjis"));
gulp.task("watch", gulp.series("vendor", "scss", "ejs", "js", "images", "font", "fabicon", "markdown", "convertToSjis", gulp.parallel(watchChangeFlie)));
