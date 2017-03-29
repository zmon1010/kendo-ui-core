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
        /// When the property is set the selected files will be uploaded chunk by chunk with the declared size. 
		/// Each request sends a separate file blob and additional string metadata to the server. 
		/// This metadata is a stringified JSON and contains chunkIndex, contentType, totalFileSize, totalChunks, uploadUid properties that
		/// allow validating and combining the file on the server side. The response also returns a JSON object with uploaded and fileUid properties
		/// that notifies the client which should be the next chunk.
        /// </summary>
        public double? ChunkSize { get; set; }

        /// <summary>
        /// By default the selected files are uploaded one after another. When set to 'true' all 
		/// the selected files start uploading simultaneously.
		/// (The property is available when the async.chunkSize is set.)
        /// </summary>
        public bool? Concurrent { get; set; }

        /// <summary>
        /// It sets the number of attempts that will be performed if an upload is failing.
		/// The property is only used when the async.retryAfter property is also defined.
        /// </summary>
        public double? MaxRetries { get; set; }

        /// <summary>
        /// If the property is set the failed upload request will be repeated after the declared amount of ticks.
        /// </summary>
        public double? RetryAfter { get; set; }

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

            if (MaxRetries.HasValue)
            {
                settings["maxRetries"] = MaxRetries;
            }

            if (RetryAfter.HasValue)
            {
                settings["retryAfter"] = RetryAfter;
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

            if (WithCredentials.HasValue)
            {
                settings["withCredentials"] = WithCredentials;
            }

            return settings;
        }
    }
}
