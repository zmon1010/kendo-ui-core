"use strict";

const karma = require('karma');
const gulp = require('gulp');
const glob = require('glob');
const path = require('path');
const runSequence = require('run-sequence');
const fs = require('fs');
const meta = require("../../kendo-meta.js");

const argv = require('yargs').argv;
const batchSizeOption = argv['batch-size'];
const browserOption = argv.browser;
const testsOption = argv.tests;
const jqueryOption = argv.jquery;
const excludeOption = argv.exclude;
const resultsFile = argv['junit-results'];

// Load a list of all files (including subfiles like editor/main.js etc.)
const allKendoFiles = () =>
    meta.loadAll().map((f) => path.join('src', f));

// support different test sets for public|private repo
const TESTS = require(glob.sync('../../test-paths-*.js', { cwd: __dirname })[0]);

let jquery, browsers, exclude;
let batches = [];

let batchSize = 10;
if (batchSizeOption) {
    batchSize = parseInt(batchSizeOption, 10);
}

let watch = false;
if (testsOption) {
    batches = [ [ testsOption ] ];
    watch = true;
} else {
    const paths = fs.readdirSync('tests').filter((file) =>
        fs.statSync(path.join('tests', file)).isDirectory() && file !== 'download-builder'
    ).map(path => `tests/${path}/**/*.js`);

    let batch = [];
    paths.forEach((path, i) => {
        batch.push(path);

        if ((i + 1) % batchSize === 0) {
            batches.push(batch);
            batch = [];
        }
    });

    if (batch.length > 0) {
        batches.push(batch);
    }
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

const defaultOptions = Object.freeze({
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
    },
    captureTimeout: 100000,
    browserNoActivityTimeout: 100000,
    singleRun: !watch,
    exclude: exclude
});

const flavours = Object.freeze({
    jenkins: {
        reporters: ['dots', 'junit'],
        singleRun: true,
        browsers: browsers,
        concurrency: 1,
        autoWatch: false,
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
        concurrency: 1,

        files: (tests) => [].concat(
            TESTS.beforeTestFiles,
            TESTS.ciFiles,
            TESTS.afterTestFiles,
            tests
        )
    },

    unit: {
        concurrency: 1,
        files: (tests) => [].concat(
            TESTS.beforeTestFiles,
            allKendoFiles(),
            TESTS.afterTestFiles,
            tests
        )
    }
});

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
            options.junitReporter.outputFile = `../${name}-${resultsFile}`;

            console.log(`INFO: Components: [${components(batch).join(', ')}]`);

            new karma.Server(
                options,
                (exitCode) => done(exitCode ? new Error("Tests failed") : null)
            ).start();
        });
    });

    gulp.task(`karma-${flavour}`, (done) => runSequence.apply(this, [].concat(tasks, done)));
});
