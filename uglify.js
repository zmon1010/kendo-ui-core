#!/usr/bin/env node

/* jshint browser:false, node:true, esnext: true */
var uglify = require('uglify-js');

var contents = "";

process.stdin.on('readable', function() {
    var chunk = process.stdin.read();

    if (chunk !== null) {
        contents += chunk;
    }
});

var compress = {
    unsafe       : true,
    hoist_vars   : true,
    warnings     : false,
    pure_getters : true
};

var mangle = {
    except: [ "define" ]
};

process.stdin.on('end', function() {
    var result = uglify.minify(contents, { fromString: true, compress: compress, mangle: mangle }).code;
    process.stdout.write(result);
});
