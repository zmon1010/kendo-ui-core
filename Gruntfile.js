/* jshint browser:false, node:true, esnext:true */
/* global KENDO_SRC_DIR */
var META = require("./build/kendo-meta.js");
var PATH = require("path");

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-debug-task');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadTasks('build/grunt/tasks');

    function addSrc(f) {
        return PATH.join(KENDO_SRC_DIR, f);
    }

    // files directly in src/
    var mainKendoFiles = META.listKendoFiles().map(addSrc);

    // Project configuration.

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        download_builder: {
            min: {
                src: mainKendoFiles,
                ext: ".min.js",
                dest: PATH.join("dist", "download-builder", "content", "js")
            },
            config: {
                src: mainKendoFiles,
                dest: "download-builder/config/kendo-config.json"
            }
        },

        shell: {
            options: {
                stderr: false
            },
            gulpStyles: {
                command: 'node node_modules/.bin/gulp styles'
            },
            scripts: {
                command: 'node node_modules/.bin/gulp scripts'
            },
            jshint: {
                command: 'node node_modules/.bin/gulp jshint'
            },
            karma: {
                command: function(flavour) {
                    console.log(`grunt karma:${flavour} is now  proxy to gulp karma-${flavour} - use gulp!`);
                    var cmd = `node node_modules/.bin/gulp karma-${flavour} ${process.argv.slice(3).join(' ')}`;
                    console.log(cmd);
                    return cmd;
                }
            },
            custom: {
                command: function(components) {
                    return 'node node_modules/.bin/gulp custom -c ' + components;
                }
            }
        },

        license: {
            apply: {
                src:  [ "<%= kendo.options.destDir %>/**/*" ],
                filter: (src) => PATH.basename(src).match(/^kendo(.+)(js|css|less)$/)
            }
        }

    });


    // migrated gulp tasks
    grunt.registerTask('styles', [ 'shell:gulpStyles' ]);
    grunt.registerTask('kendo',  [ 'shell:scripts' ]);
    grunt.registerTask('jshint', [ 'shell:jshint' ]);

    grunt.registerTask('karma', function() {
        grunt.task.run("shell:karma:" + this.args[0].trim());
    });

    // Default task(s).
    grunt.registerTask('default', ['karma:unit']);
    grunt.registerTask('tests', [ 'styles', 'karma:unit' ]);

    grunt.registerTask('custom', function() {
        if (this.args.length === 0) {
            grunt.log.writeln("No components specified for the custom task");
        }
        else {
            grunt.task.run("shell:custom:" + this.args[0].trim());
        }
    });
    grunt.registerTask('all', [ 'kendo', 'download_builder' ]);
    grunt.registerTask('build', [ 'kendo', 'styles', 'license' ]);
    grunt.registerTask('download_builder_tests', ['download_builder', 'karma:download_builder']);

    grunt.registerTask('ci', [ "all", 'styles', 'karma:jenkins' ]);
    grunt.registerTask("travis", [ 'jshint', 'build', 'karma:travis' ]);
};
