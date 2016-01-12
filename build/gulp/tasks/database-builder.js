var GULP = require('gulp');
var SHELL = require('gulp-shell')
var PATH = require("path");
var FS = require("fs");
var RESOURCES_ROOT = 'resources/sample-data/';

GULP.task('database-builder-mvc6', function() {
  var resourcesPath = RESOURCES_ROOT + 'mvc6/';
  var demosPath = 'wrappers/mvc-6/demos/Kendo.Mvc.Examples/';
  var demosAppData = demosPath + 'wwwroot/App_Data/';
  var dbFileName = 'sample.db';

  //remove old dataBase
  FS.unlink(demosAppData + dbFileName);
  
  //create new dataBase
  var sqlFiles = GULP.src(resourcesPath + '*.sql').pipe(SHELL([
	'sqlite3 ' + demosAppData + dbFileName + ' < <%=file.path%>'
  ]));
});