/* jshint browser:false, node:true, esnext: true */

var path = require('path');
var fs = require('fs');
var gulp = require('gulp');
var debug = require('gulp-debug'); // jshint ignore:line
var less = require('gulp-less');
var logger = require('gulp-logger');
var replace =  require('gulp-replace');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var clone = require('gulp-clone');
var cache = require('gulp-cached');
var progeny = require('gulp-progeny');
var plumber = require('gulp-plumber');
var filter = require('gulp-filter');
var sourcemaps = require('gulp-sourcemaps');

var amdOptimize = require("amd-optimize");
var concat = require("gulp-concat");
var ignore = require('gulp-ignore');
var foreach = require('gulp-foreach');
// var insert = require('gulp-insert');
var replace = require('gulp-replace');
var through = require("through-gulp");
var spawn = require("child_process").spawn;

var merge = require('merge2');
var lazypipe = require('lazypipe');
var autoprefix = require('less-plugin-autoprefix');
var browserSync = require('browser-sync').create();
var argv = require('yargs').argv;

var File = require('vinyl');

function cpUglify() {
  // creating a stream through which each file will pass
  var stream = through(function(file, encoding, callback) {
        console.log("uglifying", file.path);

        var uglify = spawn(require.resolve("./uglify"), { stdin: "pipe" });

        uglify.on("close", function() {
            console.log(file.path, "uglified");
        })

        file.pipe(uglify.stdin);

        this.push(new File({
            cwd: file.cwd,
            base: file.base,
            path: file.path,
            contents: uglify.stdout
        }));

        callback();

    }, function(callback) {
      console.log("uglify done");
      callback();
    });

  // returning the file stream
  return stream;
}

var browsers = [
    "Explorer >= 7",
    "Chrome >= 21",
    "Firefox ESR",
    "Opera >= 15",
    "Android >= 2.3",
    "Safari >= 6.2.6",
    "ExplorerMobile >= 10",
    "iOS >= 6",
    "BlackBerry >= 10"
].join(",");

var cleanCssOptions = {
    compatibility: 'ie7',
    aggressiveMerging: false,
    advanced: false
};

var lessLogger = logger({
    after: 'LESS complete!',
    extname: '.css',
    showChange: true
});

var minCssLogger = logger({
    after: 'Min CSS complete!',
    extname: '.min.css',
    showChange: true
});

gulp.task("css-assets", function() {
    return gulp.src("styles/**/*.{less,woff,ttf,eot,png,gif,css,svg,txt}").
        pipe(gulp.dest("dist/styles"));
});

var lessToCss = lazypipe()
    .pipe(less, { relativeUrls: true, plugins: [new autoprefix({ browsers: browsers }) ] })
    .pipe(replace, /\.\.\/mobile\//g, ''); // temp hack for the discrepancy between source and generated "source"

var resumeOnErrors = lazypipe()
    .pipe(plumber, {
        errorHandler: function (err) {
            console.log(err);
            this.emit('end');
        }
    });

var cacheLessDependencies = lazypipe()
    .pipe(cache, 'less')
    .pipe(progeny, {
        regexp: /^\s*@import\s*(?:\(\w+\)\s*)?['"]([^'"]+)['"]/
    });

gulp.task("build-skin", ["css-assets"], function() {
    var lessLogger = logger({ after: 'LESS complete!', extname: '.css', showChange: true });
    var mapLogger = logger({ after: 'map complete!', extname: '.css.map', showChange: true });

    var allFiles = "styles/**/*.less";
    var filesToBuild = argv.s || 'styles/**/kendo.*.less';

    return gulp.src(allFiles)
        .pipe(resumeOnErrors())
        .pipe(cacheLessDependencies())
        .pipe(filter([
            filesToBuild.replace(/(styles|mobile|web)/, "**")
        ]))
        .pipe(sourcemaps.init())
        .pipe(lessLogger)
        .pipe(lessToCss())
        .pipe(mapLogger)
        .pipe(sourcemaps.write("maps", { sourceRoot: "../../../../styles" }))
        .pipe(gulp.dest('dist/styles'))
        .pipe(browserSync.stream({ match: '**/*.css' }));
});

gulp.task("less",function() {
    var css = gulp.src("styles/**/kendo*.less")
        .pipe(sourcemaps.init())
        .pipe(lessLogger)
        .pipe(lessToCss());

    var minCss = css.pipe(clone())
        .pipe(minCssLogger)
        .pipe(minifyCSS(cleanCssOptions))
        .pipe(rename({ suffix: ".min" }))
        .pipe(sourcemaps.write("maps", { sourceRoot: "../../../styles" }));

    return merge(css, minCss)
        .pipe(gulp.dest('dist/styles'));
});

gulp.task("styles", [ "less", "css-assets" ]);

gulp.task("watch-styles", [ "build-skin", "css-assets" ], function() {
    browserSync.init({ proxy: "localhost", open: false });
    return gulp.watch("styles/**/*.less", [ "build-skin" ]);
});

function gatherAmd(stream, file) {
    var fileName = path.basename(file.path);
    var isBundle = fs.readFileSync(file.path).indexOf('"bundle all";') > -1;
    var moduleId = fileName.match(/kendo\.(.+)\.js/)[1];

    var gatherAMD = amdOptimize(`kendo.${moduleId}`, {
        baseUrl: "src",
        exclude: [ "jquery" ]
    });

    if (isBundle) {
        return stream
            .pipe(gatherAMD)
            .pipe(concat(fileName));

    } else {
        var whitelist = [ "**/src/kendo." + moduleId + ".js", "**/src/" + moduleId + "/**/*.js", "**/util/**/*.js" ];

        return stream
            .pipe(ignore.include(whitelist))
            .pipe(gatherAMD)
            .pipe(concat(fileName));
    }
}

gulp.task("scripts", function() {
    var src = gulp.src('src/kendo.*.js').pipe(foreach(gatherAmd));

    var minSrc = src.pipe(clone())
                    .pipe(cpUglify())
                    .pipe(rename({ suffix: ".min" }))
                    .pipe(gulp.dest("dist/gulp/js"));

    return merge(src.pipe(gulp.dest("dist/gulp/src/js")), minSrc);
});
