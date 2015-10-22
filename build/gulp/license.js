/* jshint browser:false, node:true, esnext: true */

var insert = require('gulp-insert');
var lazypipe = require('lazypipe');

var licensePad =
`/*!
${Array(22).join(Array(200).join(" ") + "\n")}
*/
`;

module.exports = lazypipe().pipe(insert.prepend, licensePad);
