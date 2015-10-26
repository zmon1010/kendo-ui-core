/* jshint browser:false, node:true, esnext: true, loopfunc: true */
var fs = require("fs");

var karma = require('karma');
var gulp = require('gulp');
var ignore = require('gulp-ignore');
var replace = require('gulp-replace');
var filter = require('gulp-filter');
var argv = require('yargs').argv;

var META = require("../../kendo-meta");

var uglify = require('../uglify');
var kendoVersion = require("../kendo-version");
var gatherAmd = require('../gather-amd');

gulp.task("download-builder-min", function() {
    return gulp.src('src/kendo.*.js')
        .pipe(filter((file) => fs.readFileSync(file.path).indexOf('"bundle all";') == -1))
        .pipe(gatherAmd.gather())
        .pipe(ignore.include(["**/src/kendo.**.js"]))
        .pipe(replace("$KENDO_VERSION", kendoVersion))
        .pipe(uglify())
        .pipe(gulp.dest("dist/download-builder/content/js"));
});

gulp.task("download-builder-config", function() {
    var data = META.buildKendoConfig();
    fs.writeFileSync("download-builder/config/kendo-config.json", JSON.stringify(data, null, 2));
});

gulp.task('download-builder', ['download-builder-config', 'download-builder-min']);

var karmaOptions = {
    basePath: '',
    frameworks: ['qunit'],
    preprocessors: {
        'tests/**/.html': [],
        'tests/**/*-fixture.html': ['html2js']
    },
    reporters: ['dots', 'junit'],
    colors: true,
    autoWatch: true,
    browsers: ['Chrome'],

    junitReporter: {
      outputDir: '.',
      outputFile: argv['junit-results']
    },
    captureTimeout: 60000,
    browserNoActivityTimeout: 30000,
    singleRun: true,
    reportSlowerThan: 5000,

    files: [].concat(
        'src/jquery.js',
        "download-builder/scripts/script-resolver.js",
        { pattern: "dist/download-builder/content/js/\*.js", included: false, served: true },
        { pattern: "download-builder/config/kendo-config.json", included: false, served: true },
        "tests/download-builder/\*.js"
    )
};

gulp.task('download-builder-tests', function(done) {
    new karma.Server(karmaOptions, done).start();
});
