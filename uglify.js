/* jshint browser:false, node:true, esnext: true */
var uglify = require('uglify-js');

var compress = {
    unsafe       : true,
    hoist_vars   : true,
    warnings     : false,
    pure_getters : true
};

var mangle = {
    except: [ "define" ]
};

module.exports = function (inp, callback) {
    callback(null, uglify.minify(inp, { fromString: true, compress: compress, mangle: mangle }).code);
};
