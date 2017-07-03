using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring UploadAsyncSettings
    /// </summary>
    public partial class UploadAsyncSettingsBuilder
        
    {
        /// <summary>
        /// The selected files will be uploaded immediately by default. You can change this behavior by setting autoUpload to false.
        /// </summary>
        /// <param name="value">The value for AutoUpload</param>
        public UploadAsyncSettingsBuilder AutoUpload(bool value)
        {
            Container.AutoUpload = value;
            return this;
        }

        /// <summary>
        /// The selected files will be uploaded in separate requests, if this is supported by the browser. You can change this behavior by setting batch to true, in which case all selected files will be uploaded in one request.The batch mode applies to multiple files, which are selected at the same time. Files selected one after the other will be uploaded in separate requests.
        /// </summary>
        /// <param name="value">The value for Batch</param>
        public UploadAsyncSettingsBuilder Batch(bool value)
        {
            Container.Batch = value;
            return this;
        }

        /// <summary>
        /// The selected files will be uploaded in separate requests, if this is supported by the browser. You can change this behavior by setting batch to true, in which case all selected files will be uploaded in one request.The batch mode applies to multiple files, which are selected at the same time. Files selected one after the other will be uploaded in separate requests.
        /// </summary>
        public UploadAsyncSettingsBuilder Batch()
        {
            Container.Batch = true;
            return this;
        }

        /// <summary>
        /// When the property is set, the selected files are uploaded with the declared size chunk by chunk. Each request sends a separate file blob and additional string metadata to the server. This metadata is in a stringified JSON format and contains the chunkIndex, contentType, totalFileSize, totalChunks, uploadUid properties. These properties enable the validation and combination of the file on the server side. The response also returns a JSON object with the uploaded and fileUid properties, which notifies the client what is the next chunk.You can use this property only when async.batch is set to false.
        /// </summary>
        /// <param name="value">The value for ChunkSize</param>
        public UploadAsyncSettingsBuilder ChunkSize(double value)
        {
            Container.ChunkSize = value;
            return this;
        }

        /// <summary>
        /// By default, the selected files are uploaded one after another. When set to true, all selected files start uploading simultaneously.This property is available when the async.chunkSize is set.
        /// </summary>
        /// <param name="value">The value for Concurrent</param>
        public UploadAsyncSettingsBuilder Concurrent(bool value)
        {
            Container.Concurrent = value;
            return this;
        }

        /// <summary>
        /// By default, the selected files are uploaded one after another. When set to true, all selected files start uploading simultaneously.This property is available when the async.chunkSize is set.
        /// </summary>
        public UploadAsyncSettingsBuilder Concurrent()
        {
            Container.Concurrent = true;
            return this;
        }

        /// <summary>
        /// If you set the property, the failed upload request is repeated after the declared amount of miliseconds.
        /// </summary>
        /// <param name="value">The value for AutoRetryAfter</param>
        public UploadAsyncSettingsBuilder AutoRetryAfter(double value)
        {
            Container.AutoRetryAfter = value;
            return this;
        }

        /// <summary>
        /// Sets the maximum number of attempts that are performed if an upload fails.The property is only used when the async.autoRetryAfter property is also defined.
        /// </summary>
        /// <param name="value">The value for MaxAutoRetries</param>
        public UploadAsyncSettingsBuilder MaxAutoRetries(double value)
        {
            Container.MaxAutoRetries = value;
            return this;
        }

        /// <summary>
        /// The name of the form field submitted to the Remove URL.
        /// </summary>
        /// <param name="value">The value for RemoveField</param>
        public UploadAsyncSettingsBuilder RemoveField(string value)
        {
            Container.RemoveField = value;
            return this;
        }

        /// <summary>
        /// The URL of the handler responsible for removing uploaded files (if any). The handler must accept POST requests containing one or more "fileNames" fields specifying the files to be deleted.
        /// </summary>
        /// <param name="value">The value for RemoveUrl</param>
        public UploadAsyncSettingsBuilder RemoveUrl(string value)
        {
            Container.RemoveUrl = value;
            return this;
        }

        /// <summary>
        /// The HTTP verb to be used by the remove action.
        /// </summary>
        /// <param name="value">The value for RemoveVerb</param>
        public UploadAsyncSettingsBuilder RemoveVerb(string value)
        {
            Container.RemoveVerb = value;
            return this;
        }

        /// <summary>
        /// The name of the form field submitted to the save URL. The default value is the input name.
        /// </summary>
        /// <param name="value">The value for SaveField</param>
        public UploadAsyncSettingsBuilder SaveField(string value)
        {
            Container.SaveField = value;
            return this;
        }

        /// <summary>
        /// The URL of the handler that will receive the submitted files. The handler must accept POST requests containing one or more fields with the same name as the original input name.
        /// </summary>
        /// <param name="value">The value for SaveUrl</param>
        public UploadAsyncSettingsBuilder SaveUrl(string value)
        {
            Container.SaveUrl = value;
            return this;
        }

        /// <summary>
        /// By default, the files are uploaded as filedata. When set to true, the files are read as file buffer by using FileReader and this buffer is send in the request body.
        /// </summary>
        /// <param name="value">The value for UseArrayBuffer</param>
        public UploadAsyncSettingsBuilder UseArrayBuffer(bool value)
        {
            Container.UseArrayBuffer = value;
            return this;
        }

        /// <summary>
        /// By default, the files are uploaded as filedata. When set to true, the files are read as file buffer by using FileReader and this buffer is send in the request body.
        /// </summary>
        public UploadAsyncSettingsBuilder UseArrayBuffer()
        {
            Container.UseArrayBuffer = true;
            return this;
        }

        /// <summary>
        /// Controls whether to send credentials (cookies, headers) for cross-site requests. This option will be ignored if the browser doesn't support File API.
        /// </summary>
        /// <param name="value">The value for WithCredentials</param>
        public UploadAsyncSettingsBuilder WithCredentials(bool value)
        {
            Container.WithCredentials = value;
            return this;
        }

    }
}
