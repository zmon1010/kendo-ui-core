"use strict";

const karma = require('karma');
const gulp = require('gulp');
const glob = require('glob');
const path = require('path');
const runSequence = require('run-sequence');
const fs = require('fs');
const meta = require("../../kendo-meta.js");

const argv = require('yargs').argv;
const browserOption = argv.browser;
const testsOption = argv.tests;
const jqueryOption = argv.jquery;
const excludeOption = argv.exclude;

// Load a list of all files (including subfiles like editor/main.js etc.)
const allKendoFiles = () =>
    meta.loadAll().map((f) => path.join('src', f));

// support different test sets for public|private repo
const TESTS = require(glob.sync('../../test-paths-*.js', { cwd: __dirname })[0]);

const BATCH_SIZE = 10;

var jquery, browsers, exclude;
var batches = [];

if (testsOption) {
    batches = [ [ testsOption ] ];
} else {
    const paths = fs.readdirSync('tests').filter((file) =>
        fs.statSync(path.join('tests', file)).isDirectory() && file !== 'download-builder'
    ).map(path => `tests/${path}/**/*.js`);

    let batch = [];
    paths.forEach((path, i) => {
        batch.push(path);

        if ((i + 1) % BATCH_SIZE === 0) {
            batches.push(batch);
            batch = [];
        }
    });
}

exclude = excludeOption ? [excludeOption] : [];

if (jqueryOption) {
    jquery = "http://code.jquery.com/jquery-" + jqueryOption + ".min.js";
} else {
    jquery = 'src/jquery.js';
}

if (browserOption) {
    browsers = [ browserOption ];
} else {
    browsers = ['Chrome'];
}

TESTS.beforeTestFiles.push(jquery);
TESTS.beforeTestFiles.push('tests/jquery.mockjax.js');
TESTS.beforeTestFiles.push('src/angular.js');
TESTS.beforeTestFiles.push('tests/angular-route.js');
TESTS.beforeTestFiles.push('tests/jasmine.js');
TESTS.beforeTestFiles.push('tests/jasmine-boot.js');

var defaultOptions = {
    reportSlowerThan: 500,
    basePath: '',
    frameworks: ['qunit'],
    preprocessors: {
        'tests/**/.html': [],
        'tests/**/*-fixture.html': ['html2js']
    },
    reporters: ['progress'],
    colors: true,
    autoWatch: true,
    browsers: browsers,
    customLaunchers: {
        ChromiumTravis: {
            base: 'Chrome',
            flags: ['--no-sandbox']
        }
    },
    junitReporter: {
      outputDir: '.',
      outputFile: argv['junit-results']
    },
    captureTimeout: 60000,
    browserNoActivityTimeout: 60000,
    singleRun: argv['single-run'],
    exclude: exclude
};

var flavours = {
    jenkins: {
        reporters: ['dots', 'junit'],
        singleRun: true,
        browsers: browsers,

        files: (tests) => [].concat(
            TESTS.beforeTestFiles,
            allKendoFiles(),
            TESTS.afterTestFiles,
            tests
        )
    },

    travis: {
        reporters: ['dots'],
        singleRun: true,
        browsers: [ 'ChromiumTravis' ],

        files: (tests) => [].concat(
            TESTS.beforeTestFiles,
            TESTS.ciFiles,
            TESTS.afterTestFiles,
            tests
        )
    },

    unit: {
        files: (tests) => [].concat(
            TESTS.beforeTestFiles,
            allKendoFiles(),
            TESTS.afterTestFiles,
            tests
        )
    }
};

const components = (batch) => batch.map((path) => path.match(/\/(\w+)\//)[1]);
Object.keys(flavours).forEach((flavour) => {
    const tasks = [];
    batches.forEach((batch, i) => {
        const name = `karma-${flavour}-batch-${i + 1}.${batches.length}`;
        tasks.push(name);

        // Spawn sub-tasks for each batch
        gulp.task(name, (done) => {
            const options = Object.assign({}, defaultOptions, flavours[flavour]);
            options.files = options.files(batch);

            console.log(`INFO: Components: [${components(batch).join(', ')}]`);

            new karma.Server(
                options,
                (exitCode) => done(exitCode ? new Error("Tests failed") : null)
            ).start();
        });
    });

    gulp.task(`karma-${flavour}`, (done) => runSequence.apply(this, [].concat(tasks, done)));
});
