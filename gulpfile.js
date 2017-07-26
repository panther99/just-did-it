var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnext = require('cssnext');
var precss = require('precss');
var mkdirp = require('mkdirp');
var copydir = require('copy-dir');

gulp.task('css', function() {
    var processors = [
        autoprefixer,
        cssnext,
        precss
    ];
    return gulp.src('./src/css/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dest/css'));
});

gulp.task('setup', function() {
    mkdirp('./dest/css', function(err) {
        if (err) console.error(err)
        else console.log('CSS production directory made (./dest/css)');
    });

    copydir('./src/js', './dest/js', function (err) {
        if (err) console.error(err)
        else console.log('JavaScript production directory made (./dest/js)');
    });
});