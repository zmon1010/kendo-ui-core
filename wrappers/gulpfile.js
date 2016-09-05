"use strict";

var gulp = require('gulp');
require('./gulp/mvc-core-demos')(gulp);

const taskListing = require('gulp-task-listing');
gulp.task('tasks', taskListing.withFilters(/:/));

