var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

var curPath = process.cwd();
console.log('\x1Bc');
console.log('>>>>>>>> GULP RUNNING <<<<<<<<<');
console.log('CURRENT PATH = ', curPath);


// Static Server + watching scss/html files
gulp.task('server', ['sass'], function() {

  browserSync.init({
    server: { baseDir: "./src" },
  });

  gulp.watch("./src/scss/*.+(scss|sass)", ['sass']);
  gulp.watch("./src/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src("./src/scss/*.+(scss|sass)")
    .pipe(sass())
    // .pipe(sass.sync({outputStyle: 'compressed'}))
    .pipe(gulp.dest("./src/css"))
    .pipe(gulp.dest("./dist/css"))
    .pipe(browserSync.stream());
});

gulp.task('default', ['server']);

gulp.task("css", function () {
  return gulp.src("./src/css/*.css").pipe(gulp.dest("./dist/css"));
});
