/* jshint browser:false, node:true, esnext: true */

var gulp = require('gulp');
var debug = require('gulp-debug'); // jshint ignore:line
var logger = require('gulp-logger');
var clone = require('gulp-clone');
var plumber = require('gulp-plumber');
var filter = require('gulp-filter');
var sourcemaps = require('gulp-sourcemaps');
var gulpIf = require('gulp-if');

var ignore = require('gulp-ignore');

var merge = require('merge2');
var lazypipe = require('lazypipe');
var browserSync = require('browser-sync').create();
var argv = require('yargs').argv;

var license = require('./build/gulp/license');
var cssUtils = require('./build/gulp/css');
var umdWrapToCore = require('./build/gulp/wrap-umd');
var gatherAmd = require('./build/gulp/gather-amd');
var uglify = require('./build/gulp/uglify');

gulp.task("css-assets", function() {
    return gulp.src("styles/**/*.{less,woff,ttf,eot,png,gif,css,svg,txt}")
        .pipe(gulpIf((file) => file.path.match(/.less$/), license() ))
        .pipe(gulp.dest("dist/styles"));
});

gulp.task("build-skin", ["css-assets"], function() {
    var resumeOnErrors = lazypipe()
        .pipe(plumber, {
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        });

    var mapLogger = logger({ after: 'source map complete!', extname: '.css.map', showChange: true });

    var allFiles = "styles/**/*.less";
    var filesToBuild = argv.s || 'styles/**/kendo.*.less';

    return gulp.src(allFiles)
        .pipe(resumeOnErrors())
        .pipe(cssUtils.cacheLessDependencies())
        .pipe(filter([
            filesToBuild.replace(/(styles|mobile|web)/, "**")
        ]))
        .pipe(sourcemaps.init())
        .pipe(CSS.fromLess())
        .pipe(mapLogger)
        .pipe(sourcemaps.write("maps", { sourceRoot: "../../../../styles" }))
        .pipe(gulp.dest('dist/styles'))
        .pipe(browserSync.stream({ match: '**/*.css' }));
});

gulp.task("less",function() {
    var css = gulp.src("styles/**/kendo*.less")
        .pipe(license())
        .pipe(cssUtils.fromLess());

    var minCss = css.pipe(clone())
        .pipe(sourcemaps.init())
        .pipe(cssUtils.minify())
        .pipe(sourcemaps.write("./"));

    return merge(css, minCss)
        .pipe(gulp.dest('dist/styles'));
});

gulp.task("styles", [ "less", "css-assets" ]);

gulp.task("watch-styles", [ "build-skin", "css-assets" ], function() {
    browserSync.init({ proxy: "localhost", open: false });
    return gulp.watch("styles/**/*.less", [ "build-skin" ]);
});

// cloning those somehow fails, I think that it is due to the RTL symbols in the culture
function cultures() {
   return gulp.src('src/cultures/kendo.culture.*.js', { base: 'src' })
        .pipe(umdWrapToCore())
        .pipe(license());
}

function messages() {
   return gulp.src('src/messages/kendo.messages.*.js', { base: 'src' })
        .pipe(umdWrapToCore())
        .pipe(license());
}

gulp.task("scripts", function() {
    var toDist = lazypipe().pipe(gulp.dest,  "dist/js");

    var src = gulp.src('src/kendo.*.js').pipe(gatherAmd()).pipe(license());

    var thirdParty = gulp.src('src/{jquery,angular,pako,jszip}*.*');

    var gatheredSrc = src.pipe(clone())
        .pipe(ignore.include(["**/src/kendo.**.js"]));

    var minSrc = merge(cultures(), messages(), gatheredSrc)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(logger({after: 'source map complete!', extname: '.map', showChange: true}))
        .pipe(sourcemaps.write("./"));

    // the duplication below is due to something strange with merge2 and concat
    // resulting in "cannot switch to old mode now" error
    return merge(
        cultures().pipe(toDist()),
        messages().pipe(toDist()),
        src.pipe(toDist()),
        minSrc.pipe(toDist()),
        thirdParty.pipe(toDist())
    );
});
