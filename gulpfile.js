var gulp=require('gulp');
var browsersync=require('browser-sync');
var autoprefixer=require('gulp-autoprefixer');
var concat=require('gulp-concat');
var imagemin=require('gulp-imagemin');
var rename=require('gulp-rename');
var sass=require('gulp-sass');
var sourcemaps=require('gulp-sourcemaps');
var uglify=require('gulp-uglify');

async function styles()
{
    return gulp.src('src/scss/styles.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle:'compressed'})).on('error',sass.logError)
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browsersync.stream())
}
 async  function bootstrap_styles()
   {
       return gulp.src('src/bootstrap/bootstrap.scss')
           .pipe(sourcemaps.init())
           .pipe(sass({outputStyle:'compressed'})).on('error',sass.logError)
           .pipe(autoprefixer())
           .pipe(sourcemaps.write())
           .pipe(rename('bootstrap.min.css'))
           .pipe(gulp.dest('dist/css'))
           .pipe(browsersync.stream())


   }
async function scripts() {
    gulp.src('src/js/**/*.js')
        .pipe(uglify())
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(browsersync.stream());
}
function watch()
{
    browsersync.init({
        server:{
            baseDir:'./'
        }
    });
    gulp.watch('src/scss/**/*.scss',styles);
    gulp.watch('src/bootstrap/**/*.scss',bootstrap_styles);
    gulp.watch('src/js/**/*.js',scripts);


}

exports.default=gulp.series(
    styles,
    bootstrap_styles,
    scripts,
    watch
);




