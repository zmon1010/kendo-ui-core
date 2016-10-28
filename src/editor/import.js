(function(f, define){
    define([ "./main" ], f);
})(function(){
    (function($, undefined) {
        var kendo = window.kendo,
            extend = $.extend,
            proxy = $.proxy,
            Editor = kendo.ui.editor,
            EditorUtils = Editor.EditorUtils,
            Command = Editor.Command,
            Tool = Editor.Tool,
            registerTool = EditorUtils.registerTool,
            ToolTemplate = Editor.ToolTemplate;

        var ImportCommand = Command.extend({
            exec: function() {
                (this.editor._uploadWidget || this._initializeUploadWidget()).element.click();
            },

            _initializeUploadWidget: function(){
                var cmd = this;
                var editor = cmd.editor;
                var importOptions = editor.options.import;// jshint ignore:line
                var upload = $('<input id="editorImport" name="files" type="file" />').kendoUpload({
                    success: proxy(cmd._onUploadSuccess, cmd),
                    progress: proxy(cmd._onUploadProgress, cmd),
                    select: proxy(cmd._onUploadSelect, cmd),
                    error: proxy(cmd._onUploadError, cmd),
                    complete: proxy(cmd._onUploadComplete, cmd),
                    showFileList: false,
                    multiple: false,
                    async: {
                        saveUrl:  importOptions.proxyUrl,
                        autoUpload: true,
                        saveField: "file"
                    },
                    validation: {
                        allowedExtensions: importOptions.allowedExtensions,
                        maxFileSize: importOptions.maxFileSize
                    }
                }).getKendoUpload();

                editor._uploadWidget = upload;

                return upload;
            },
            _onUploadComplete: function(ev){
                this._trigger("complete", ev);
                ev.sender.clearAllFiles();
            },
            _onUploadSuccess: function(ev){
                this._trigger("success", ev);
                this.editor.value(ev.response.html.replace(/<\/?body>/ig, ""));
            },
            _onUploadProgress: function(ev){
                this._trigger("progress", ev);
            },
            _onUploadSelect: function(ev){
                this._trigger("select", ev);
            },
            _onUploadError: function(ev){
                this._trigger("error", ev);
            },

            _trigger: function(eventType, uploadEvent) {
                var editor = this.editor;
                var importOptions = editor.options.import;// jshint ignore:line
                if (typeof importOptions[eventType] === "function") {
                    importOptions[eventType].call(editor, uploadEvent);
                }
            }
        });

        extend(Editor, {
            ImportCommand: ImportCommand
        });

        registerTool("import", new Tool({ command: ImportCommand, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Import"})}));
    }(window.kendo.jQuery));

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3) { (a3 || a2)(); });
