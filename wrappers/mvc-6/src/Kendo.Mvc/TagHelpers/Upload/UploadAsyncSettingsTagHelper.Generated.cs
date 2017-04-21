using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using System.Linq;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace Kendo.Mvc.TagHelpers
{
    public partial class UploadAsyncSettingsTagHelper
    {
        /// <summary>
        /// The selected files will be uploaded immediately by default. You can change this behavior by setting autoUpload to false.
        /// </summary>
        public bool? AutoUpload { get; set; }

        /// <summary>
        /// The selected files will be uploaded in separate requests, if this is supported by the browser.
		/// You can change this behavior by setting batch to true, in which case all selected files will be uploaded in one request.The batch mode applies to multiple files, which are selected at the same time.
		/// Files selected one after the other will be uploaded in separate requests.
        /// </summary>
        public bool? Batch { get; set; }

        /// <summary>
        /// When the property is set, the selected files are uploaded with the declared size chunk by chunk. Each request sends a separate file blob and additional string metadata to the server. This metadata is in a stringified JSON format and contains the chunkIndex, contentType, totalFileSize, totalChunks, uploadUid properties. These properties enable the validation and combination of the file on the server side. The response also returns a JSON object with the uploaded and fileUid properties, which notifies the client what is the next chunk.You can use this property only when async.batch is set to false.
        /// </summary>
        public double? ChunkSize { get; set; }

        /// <summary>
        /// By default, the selected files are uploaded one after another. When set to true, all selected files start uploading simultaneously.This property is available when the async.chunkSize is set.
        /// </summary>
        public bool? Concurrent { get; set; }

        /// <summary>
        /// If you set the property, the failed upload request is repeated after the declared amount of miliseconds.
        /// </summary>
        public double? AutoRetryAfter { get; set; }

        /// <summary>
        /// Sets the maximum number of attempts that are performed if an upload fails.The property is only used when the async.autoRetryAfter property is also defined.
        /// </summary>
        public double? MaxAutoRetries { get; set; }

        /// <summary>
        /// The name of the form field submitted to the Remove URL.
        /// </summary>
        public string RemoveField { get; set; }

        /// <summary>
        /// The URL of the handler responsible for removing uploaded files (if any). The handler must accept POST
		/// requests containing one or more "fileNames" fields specifying the files to be deleted.
        /// </summary>
        public string RemoveUrl { get; set; }

        /// <summary>
        /// The HTTP verb to be used by the remove action.
        /// </summary>
        public string RemoveVerb { get; set; }

        /// <summary>
        /// The name of the form field submitted to the save URL. The default value is the input name.
        /// </summary>
        public string SaveField { get; set; }

        /// <summary>
        /// The URL of the handler that will receive the submitted files. The handler must accept POST requests
		/// containing one or more fields with the same name as the original input name.
        /// </summary>
        public string SaveUrl { get; set; }

        /// <summary>
        /// By default, the files are uploaded as filedata. When set to true, the files are read as file buffer by using FileReader and
		///  this buffer is send in the request body.
        /// </summary>
        public bool? UseArrayBuffer { get; set; }

        /// <summary>
        /// Controls whether to send credentials (cookies, headers) for cross-site requests.
		/// This option will be ignored if the browser doesn't support File API.
        /// </summary>
        public bool? WithCredentials { get; set; }

        internal Dictionary<string, object> Serialize()
        {
            var settings = new Dictionary<string, object>();

            if (AutoUpload.HasValue)
            {
                settings["autoUpload"] = AutoUpload;
            }

            if (Batch.HasValue)
            {
                settings["batch"] = Batch;
            }

            if (ChunkSize.HasValue)
            {
                settings["chunkSize"] = ChunkSize;
            }

            if (Concurrent.HasValue)
            {
                settings["concurrent"] = Concurrent;
            }

            if (AutoRetryAfter.HasValue)
            {
                settings["autoRetryAfter"] = AutoRetryAfter;
            }

            if (MaxAutoRetries.HasValue)
            {
                settings["maxAutoRetries"] = MaxAutoRetries;
            }

            if (RemoveField?.HasValue() == true)
            {
                settings["removeField"] = RemoveField;
            }

            if (RemoveUrl?.HasValue() == true)
            {
                settings["removeUrl"] = RemoveUrl;
            }

            if (RemoveVerb?.HasValue() == true)
            {
                settings["removeVerb"] = RemoveVerb;
            }

            if (SaveField?.HasValue() == true)
            {
                settings["saveField"] = SaveField;
            }

            if (SaveUrl?.HasValue() == true)
            {
                settings["saveUrl"] = SaveUrl;
            }

            if (UseArrayBuffer.HasValue)
            {
                settings["useArrayBuffer"] = UseArrayBuffer;
            }

            if (WithCredentials.HasValue)
            {
                settings["withCredentials"] = WithCredentials;
            }

            return settings;
        }
    }
}
