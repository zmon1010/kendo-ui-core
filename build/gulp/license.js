/* jshint browser:false, node:true, esnext: true */

var insert = require('gulp-insert');
var lazypipe = require('lazypipe');
var argv = require('yargs').argv;
var fs = require('fs');
var replace = require('gulp-replace');

var license;
if (argv['license-pad']) {
license =
`/*!
${Array(22).join(Array(200).join(" ") + "\n")}
*/
`;
} else {
    license = fs.readFileSync('resources/legal/core-license.txt').toString();
    license = license.replace('<%= year %>', new Date().getFullYear());
}

var version = JSON.parse(fs.readFileSync('VERSION'));

var now = new Date();

var versionYear = version.year;

var month = Math.max((now.getMonth() + 1 + (now.getFullYear() - versionYear) * 12), 0);

var versionQ = version.release;

var versionString = process.env.VERSION || `${versionYear}.${versionQ}.${month * 100 + now.getDate()}`;


module.exports = lazypipe()
    .pipe(replace, "$KENDO_VERSION", versionString)
    .pipe(insert.prepend, license);
