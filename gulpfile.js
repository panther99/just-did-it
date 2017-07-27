var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnext = require('cssnext');
var precss = require('precss');
var coffee = require('gulp-coffee');
var mkdirp = require('mkdirp');

var tasks = {
    css: function() {
        var processors = [
            autoprefixer,
            cssnext,
            precss
        ];
        gulp.src('./src/css/*.css')
            .pipe(postcss(processors))
            .pipe(gulp.dest('./dest/css'));        
    },
    coffee: function() {
        gulp.src('./src/js/*.coffee')
            .pipe(coffee({ bare: true }))
            .pipe(gulp.dest('./dest/js'));
    }
}

gulp.task('css', function() {
    tasks.css();
});

gulp.task('coffee', function() {
    tasks.coffee();
});

gulp.task('setup', function() {
    mkdirp('./dest/css', function(err) {
        if (err) console.error(err)
        else console.log('CSS production directory made (./dest/css)');
    });

    mkdirp('./dest/js', function(err) {
        if (err) console.error(err)
        else console.log('JavaScript production directory made (./dest/js)');
    });

    tasks.css();
    tasks.coffee();
});