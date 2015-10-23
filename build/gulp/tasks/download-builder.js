/* jshint browser:false, node:true, esnext: true, loopfunc: true */
var gulp = require('gulp');
var util = require('gulp-util');

var FS = require("fs");
var PATH = require("path");
var META = require("../../kendo-meta.js");
var UTILS = require("../../grunt/tasks/utils.js");

gulp.task("download-builder-min", function() {
    // files directly in src/
    var mainKendoFiles = META.listKendoFiles().map((f) => PATH.join("src", f));

    mainKendoFiles.forEach(function(f) {
        var destDir = f.dest;
        var ext = f.ext;

        f.src.forEach(function(f){
            var basename = PATH.basename(f, PATH.extname(f));
            var dest = PATH.join(destDir, basename + ext);
            var comp = META.getKendoFile(f.replace(/^src\//, "")), code;

                var srcFiles = comp.getBuildDeps().map(function(f){
                    return "src/" + f;
                });
                if (UTILS.outdated(srcFiles, dest)) {
                    if (comp.isBundle()) {
                        return;
                    }
                    util.log("Making ", dest);
                    code = comp.buildMinSource_noAMD();
                    FS.writeFileSync(dest, code);
                }
        });
    });
});

gulp.task("download-builder-config", function() {
    var data = META.buildKendoConfig();
    FS.writeFileSync("download-builder/config/kendo-config.json", JSON.stringify(data, null, 2));
});
