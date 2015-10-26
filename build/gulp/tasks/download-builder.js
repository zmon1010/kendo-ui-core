/* jshint browser:false, node:true, esnext: true, loopfunc: true */
var fs = require("fs");

var gulp = require('gulp');
var ignore = require('gulp-ignore');
var replace = require('gulp-replace');
var filter = require('gulp-filter');

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
