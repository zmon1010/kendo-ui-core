/* jshint browser:false, node:true, esnext: true */

var insert = require('gulp-insert');
var lazypipe = require('lazypipe');

var licensePad = "/** \n @license\n ";

for (var i = 0; i < 22; i++) {
   licensePad += " \n";
}

licensePad += " */\n";

module.exports = lazypipe().pipe(insert.prepend, licensePad);
