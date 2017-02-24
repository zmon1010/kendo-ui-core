/* jshint browser:false, node:true, esnext: true */
const concat = require('gulp-concat');
const gulp = require('gulp');
const named = require('vinyl-named');
const replace = require('gulp-replace');
const wrap = require('gulp-wrap');
const fs = require('fs');
const stream = require('stream');

const rollup = require('gulp-rollup');
const buble = require('rollup-plugin-buble');
const path = require('path');
const classTranspiler = require('./transpilers/class-transpiler');
const rollupDependencies = require('./transpilers/rollup-dependencies');
const replaceExports = rollupDependencies.replaceExports;
const replaceDependencies = rollupDependencies.replaceDependencies;

const SRC_ROOT='../..';
const DRAWING_SRC = path.join(SRC_ROOT, 'kendo-drawing', 'src');
const CHARTS_SRC = path.join(SRC_ROOT, 'kendo-charts', 'src');

const COLOR_GLOBALS = {
    'common/class': 'kendo.Class',
    'common/support': 'kendo.support'
};

const TEXT_METRICS_GLOBALS = {
    'common': 'kendo'
};

const DRAWING_GLOBALS = {
    'common': 'kendo',
    'pdf': 'kendo.pdf',
    'text-metrics': 'kendo.util',
    'util/create-promise': 'kendo.drawing.util.createPromise',
    'util/promise-all': 'kendo.drawing.util.promiseAll'
};

const PDF_GLOBALS = {
    'common': 'kendo',
    'drawing': 'kendo.drawing',
    'geometry': 'kendo.geometry',
    'util': 'kendo.drawing.util'
};

const CORE_GLOBALS = {
    '@progress/kendo-drawing': 'kendo',
    'common/deep-extend': 'kendo.deepExtend',
    'common/getter': 'kendo.getter'
};

const CHART_GLOBALS = {
    '@progress/kendo-drawing': 'kendo',
    'date-utils': 'kendo.dataviz',
    'core': 'kendo.dataviz',
    'common/constants': 'kendo.dataviz.constants',
    'common': 'kendo.dataviz',
    'services': 'kendo.dataviz.services'
};

const SPARKLINE_GLOBALS = {
    'chart/constants': 'kendo.dataviz.constants',
    'chart': 'kendo.dataviz',
    'core': 'kendo.dataviz',
    'common/constants': 'kendo.dataviz.constants',
    'common': 'kendo.dataviz'
};

const STOCK_GLOBALS = {
    '@progress/kendo-drawing': 'kendo',
    'chart/constants': 'kendo.dataviz.constants',
    'chart': 'kendo.dataviz',
    'core': 'kendo.dataviz',
    'services': 'kendo.dataviz.services',
    'common/constants': 'kendo.dataviz.constants',
    'common': 'kendo.dataviz',
    'date-utils': 'kendo.dataviz'
};

function matchAbsolute(root, globals) {
    var paths = {};
    for (var field in globals) {
        if (field.indexOf("@") === 0) {
             paths[field] = globals[field];
        } else {
            var globalPath = path.resolve(path.join(root, field)).replace(/\\/g, '/') + ".js";
            paths[globalPath] = globals[field];
        }
    }

    return function(id) {
        return paths[id];
    };
}

const textMetricsGlobals = matchAbsolute(DRAWING_SRC, TEXT_METRICS_GLOBALS);
const colorGlobals = matchAbsolute(DRAWING_SRC, COLOR_GLOBALS);
const drawingGlobals = matchAbsolute(DRAWING_SRC, DRAWING_GLOBALS);
const pdfGlobals = matchAbsolute(DRAWING_SRC, PDF_GLOBALS);
const chartGlobals = matchAbsolute(CHARTS_SRC, CHART_GLOBALS);
const coreGlobals = matchAbsolute(CHARTS_SRC, CORE_GLOBALS);
const sparklineGlobals = matchAbsolute(CHARTS_SRC, SPARKLINE_GLOBALS);
const stockGlobals = matchAbsolute(CHARTS_SRC, STOCK_GLOBALS);


const FREEZE_REPLACE_REGEX = /Object.freeze\(([\s\S]*?)\)/gm;
const DEFAULT_VALUE_REGEX = /if \( (\w+) === void 0 \) (.*?);/g;
const TRAILING_SPACE_REGEX = / +$/gm;
const MULTI_EMPTY_LINE_REGEX = /(^\n)+/gm;

stream.Stream.prototype.pipeReplaces = function(options) {
    return this
        .pipe(replace('this.kendo = this.kendo || {};', ''))
        .pipe(replace(FREEZE_REPLACE_REGEX, '$1'))
        .pipe(replaceExports(options))
        .pipe(replaceDependencies(options))
        .pipe(replace('Object.assign', '$.extend'))
        .pipe(replace('Object.create(null)', 'Object.create ? Object.create(null) : {}'))
        .pipe(replace(DEFAULT_VALUE_REGEX, 'if ($1 === void 0) { $2; }'))
        .pipe(replace(TRAILING_SPACE_REGEX, ''))
        .pipe(replace(MULTI_EMPTY_LINE_REGEX, '\n'))
        .pipe(replace('\n', '\r\n'))
};


gulp.task('pack-text-metrics', () =>
    gulp.src(path.join(DRAWING_SRC, '**/*.js'))
        .pipe(rollup({
            entry: path.join(DRAWING_SRC, '/text-metrics.js'),
            format: 'iife',
            moduleName: 'kendo.util',
            useStrict: false,
            globals: textMetricsGlobals,
            external: textMetricsGlobals,
            plugins: [ classTranspiler(), buble() ]
        }))
        .pipe(wrap({ src: './templates/text.metrics.amd.js' }))
        .pipe(concat('text-metrics.js'))
        .pipeReplaces()
        .pipe(gulp.dest('../src/util'))
);

gulp.task('pack-color', () =>
    gulp.src(path.join(DRAWING_SRC, '**/*.js'))
        .pipe(rollup({
            entry: path.join(DRAWING_SRC, '/common/color.js'),
            format: 'iife',
            moduleName: 'kendo',
            useStrict: false,
            globals: colorGlobals,
            external: colorGlobals,
            plugins: [ classTranspiler(), buble() ]
        }))
        .pipe(wrap({ src: './templates/kendo.color.amd.js' }))
        .pipe(concat('kendo.color.js'))
        .pipeReplaces()
        .pipe(gulp.dest('../src'))
);

gulp.task('pack-drawing', () =>
    gulp.src([path.join(DRAWING_SRC, '**/*.js'), path.resolve("./exports/**/*.js")])
        .pipe(rollup({
            entry: path.resolve("./exports/drawing/main.js"),
            format: 'iife',
            moduleName: 'kendo',
            useStrict: false,
            globals: drawingGlobals,
            external: drawingGlobals,
            plugins: [ classTranspiler(), buble() ]
        }))
        .pipe(wrap({ src: './templates/kendo.drawing.amd.js' }))
        .pipe(concat('kendo-drawing.js'))
        .pipeReplaces({ exclude: ["kendo.pdf"] })
        .pipe(gulp.dest('../src/drawing'))
);

gulp.task('pack-pdf', () =>
    gulp.src(path.join(DRAWING_SRC, '**/*.js'))
        .pipe(rollup({
            entry: path.join(DRAWING_SRC, 'pdf.js'),
            format: 'iife',
            moduleName: 'kendo.pdf',
            useStrict: false,
            globals: pdfGlobals,
            external: pdfGlobals,
            plugins: [ classTranspiler(), buble() ]
        }))
        .pipe(wrap({ src: './templates/kendo.pdf.amd.js' }))
        .pipe(concat('core.js'))
        .pipeReplaces()
        .pipe(gulp.dest('../src/pdf'))
);

gulp.task('pack-base-theme', () =>
    gulp.src(path.join(CHARTS_SRC, '**/*.js'))
        .pipe(rollup({
            entry: path.join(CHARTS_SRC, '/chart/base-theme.js'),
            format: 'iife',
            moduleName: 'kendo.dataviz',
            useStrict: false,
            plugins: [ buble() ]
        }))
        .pipe(wrap({ src: './templates/chart-base-theme.amd.js' }))
        .pipe(concat('chart-base-theme.js'))
        .pipe(replace('exports.baseTheme', 'exports.chartBaseTheme'))
        .pipeReplaces()
        .pipe(gulp.dest('../src/dataviz/themes'))
);

gulp.task('pack-chart', () =>
    gulp.src(path.join(CHARTS_SRC, '**/*.js'))
        .pipe(rollup({
            entry: path.join(CHARTS_SRC, 'chart-export.js'),
            format: 'iife',
            moduleName: 'kendo.dataviz',
            useStrict: false,
            globals: chartGlobals,
            external: chartGlobals,
            plugins: [ classTranspiler(), buble() ]
        }))
        .pipe(wrap({ src: './templates/kendo.dataviz.chart.amd.js' }))
        .pipe(concat('kendo-chart.js'))
        .pipeReplaces()
        .pipe(gulp.dest('../src/dataviz/chart'))
);

gulp.task('pack-core', () =>
    gulp.src(path.join(CHARTS_SRC, '**/*.js'))
        .pipe(rollup({
            entry: path.join(CHARTS_SRC, 'core-export.js'),
            format: 'iife',
            moduleName: 'kendo.dataviz',
            useStrict: false,
            globals: coreGlobals,
            external: coreGlobals,
            plugins: [ classTranspiler(), buble() ]
        }))
        .pipe(concat('kendo-core.js'))
        .pipe(wrap({ src: './templates/kendo.dataviz.core.amd.js' }))
        .pipeReplaces({ assignExport: "GRADIENTS" })
        .pipe(gulp.dest('../src/dataviz/core'))
);

gulp.task('pack-sparkline', () =>
    gulp.src(path.join(CHARTS_SRC, '**/*.js'))
        .pipe(rollup({
            entry: path.join(CHARTS_SRC, 'sparkline.js'),
            format: 'iife',
            moduleName: 'kendo.dataviz',
            useStrict: false,
            globals: sparklineGlobals,
            external: sparklineGlobals,
            plugins: [ classTranspiler(), buble() ]
        }))
        .pipe(wrap({ src: './templates/kendo.dataviz.sparkline.amd.js' }))
        .pipe(concat('kendo-sparkline.js'))
        .pipeReplaces()
        .pipe(gulp.dest('../src/dataviz/sparkline'))
);

gulp.task('pack-stock', () =>
    gulp.src(path.join(CHARTS_SRC, '**/*.js'))
        .pipe(rollup({
            entry: path.join(CHARTS_SRC, 'stock.js'),
            format: 'iife',
            moduleName: 'kendo.dataviz',
            useStrict: false,
            globals: stockGlobals,
            external: stockGlobals,
            plugins: [ classTranspiler(), buble() ]
        }))
        .pipe(wrap({ src: './templates/kendo.dataviz.stock.amd.js' }))
        .pipe(concat('kendo-stock-chart.js'))
        .pipeReplaces()
        .pipe(gulp.dest('../src/dataviz/stock'))
);

gulp.task('default', ['pack-text-metrics', 'pack-color', 'pack-drawing', 'pack-pdf', 'pack-core', 'pack-base-theme', 'pack-chart', 'pack-sparkline', 'pack-stock']);

