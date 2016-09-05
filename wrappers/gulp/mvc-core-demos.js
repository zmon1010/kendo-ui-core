"use strict";

const shell = require('gulp-shell');
const zip = require('gulp-zip');

const tasks = (gulp) => {
    gulp.task('mvc-core-demos:assets',
        // Inception!
        shell.task(['rake mvc:assets'], { cwd: '..' })
    );

    gulp.task('mvc-core-demos:build', ['mvc-core-demos:assets'],
        shell.task([
            'dotnet restore',
            'rm -r demos/Kendo.Mvc.Examples/bin',
            'dotnet publish --framework netcoreapp1.0 --configuration Release demos/Kendo.Mvc.Examples'
        ], { cwd: 'mvc-6' })
    );

    gulp.task('mvc-core-demos:pack', ['mvc-core-demos:build'], () => {
        const dest = process.env.REDIST_PATH;
        if (!dest) {
            throw new Error('No REDIST_PATH specified');
        }

        return gulp.src('mvc-6/demos/Kendo.Mvc.Examples/bin/Release/netcoreapp1.0/publish/**/*')
                   .pipe(zip('online-mvc-core-examples.zip'))
                   .pipe(gulp.dest(dest));
    });
}

module.exports = tasks;
