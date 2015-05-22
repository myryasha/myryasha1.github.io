var gulp = require('gulp'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat-css'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect');
var less = require('gulp-less');
var path = require('path');   
gulp.task('connect', function() {
  connect.server({
    root: '',
    livereload: true
  });
});

gulp.task('less', function () {
  gulp.src('app/less/common.less')
    // .pipe(concat('common.css'))
    .pipe(less({
      paths: [ path.join('less', 'includes') ]
    }))
    .pipe(autoprefixer())
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(gulp.dest('./dist/'))
    .pipe(connect.reload());
});

gulp.task('html', function () {
  gulp.src('index.html')
    .pipe(connect.reload());
});

gulp.task('js', function () {
  gulp.src('app/js/main.js')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
    	gulp.watch('index.html', ['html'])
        gulp.watch('app/less/*.less', ['less'])
        gulp.watch('app/js/main.js', ['html']);
       
});

gulp.task('default', ['connect', 'less', 'html', 'js', 'watch']);

// gulp.src('./less/**/*.less')
    
//     .pipe(gulp.dest('./public/css'));