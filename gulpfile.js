const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
/*
  -- TOP LEVEL FUNCTIONS --
  gulp.tasks - Define tasks
  gulp.src - Point to files to use
  gulp.dest - Points to folder to output
  gulp.watch - watch files and folders for changes
*/

//logs message
gulp.task('message', function(){
  return console.log('gulp is running...');
});

//copy all HTML files
gulp.task('copyHtml', function(){
  gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
});

// Optimize images
gulp.task('imageMin', function(){
  gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
});

//minify JS
gulp.task('minify', function(){
  gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

//compile sass
gulp.task('sass', function(){
  gulp.src('src/sass/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});

//scripts
gulp.task('scripts', function(){
  gulp.src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('default',[
  'message',
  'copyHtml',
  'imageMin',
  'sass',
  'scripts'
]);

//watch for auto scripts
gulp.task('watch', function(){
  gulp.watch('src/js/*.js', ['scripts']);
  gulp.watch('src/images/*', ['imageMin']);
  gulp.watch('src/sass/*.sass', ['sass']);
  gulp.watch('src/*.html', ['copyHtml']);
});
