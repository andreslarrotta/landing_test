const { src, dest, parallel, series, watch } = require('gulp');

//my funtions
const sass = require('gulp-sass'),
  browserSync = require('browser-sync').create();

function css() {
  return src('./scss/*.scss')
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(dest('./css/'))
    .pipe(browserSync.stream())
}
function recargador(){
  return src("./")
        .pipe(browserSync.stream());
}
function navegadorSync() {
  return browserSync.init({
    server: {
      baseDir: "./"
    }
  });
}
function watcher() {
  navegadorSync()
  watch('./scss/*.scss', series(css));
  watch('./*.html', series(recargador));
}
exports.recargador = recargador;
exports.css = css;
exports.navegadorSync = navegadorSync;
exports.watcher = watcher;
exports.default = parallel(watcher);

// link para referencia
// https://www.pixemweb.com/blog/gulp-4-0-0-with-nodejs-imagemin-browsersync-sass-sourcemaps-cleancss-more/