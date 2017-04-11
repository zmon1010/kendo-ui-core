namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Web;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Infrastructure;
    
    public class UploadAsyncSettings : IUploadAsyncSettings
    {
        private readonly Upload upload;

        /// <summary>
        /// Initializes a new instance of the <see cref="UploadAsyncSettings" /> class.
        /// </summary>
        public UploadAsyncSettings(Upload uploadComponent)
        {
            upload = uploadComponent;
            Save = new RequestSettings();
            Remove = new RequestSettings();
        }
        
        /// <summary>
        /// Defines the Save action
        /// </summary>
        public INavigatable Save { get; set; }

        /// <summary>
        /// Defines the name of the form field submitted to the Save action.
        /// The default value is the Upload name.
        /// </summary>
        public string SaveField { get; set; }
        
        /// <summary>
        /// Defines the Remove action
        /// </summary>
        public INavigatable Remove { get; set; }

        /// <summary>
        /// Defines the name of the form field submitted to the Remove action.
        /// The default value is "removeField".
        /// </summary>
        public string RemoveField { get; set; }
        
        /// <summary>
        /// Gets or sets a value indicating whether to start the upload immediately after selecting a file
        /// </summary>
        /// <value>
        /// true if the upload should start immediately after selecting a file, false otherwise; true by default
        /// </value>
        public bool? AutoUpload { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether to upload selected files in one batch (request)
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
        /// The property is only used when the async.autoRetryAfter property is also defined.
        /// </summary>
        public double? MaxAutoRetries { get; set; }

        /// <summary>
        /// If the property is set the failed upload request will be repeated after the declared amount of ticks.
        /// </summary>
        public double? AutoRetryAfter { get; set; }

        /// <summary>
        /// Gets or sets a value whether to send credentials as part of XHR requests
        /// </summary>
        public bool? WithCredentials { get; set; }

        /// <summary>
        /// Serializes the asynchronous uploading settings to the writer.
        /// </summary>
        /// <param name="key">The serialization key.</param>
        /// <param name="options">The target dictionary.</param>
        public void SerializeTo(string key, IDictionary<string, object> options)
        {
            if (Save.HasValue())
            {
                Func<string, string> encoder = (string url) => upload.IsSelfInitialized ? HttpUtility.UrlDecode(url) : url;
                var config = new Dictionary<string, object>();

                config["saveUrl"] = encoder(Save.GenerateUrl(upload.ViewContext, upload.UrlGenerator));

                FluentDictionary.For(config)
                    .Add("saveField", SaveField, () => SaveField.HasValue())
                    .Add("removeField", RemoveField, () => RemoveField.HasValue())
                    .Add("autoUpload", AutoUpload, () => AutoUpload.HasValue)
                    .Add("batch", Batch, () => Batch.HasValue)
                    .Add("chunkSize", ChunkSize, () => ChunkSize.HasValue)
                    .Add("concurrent", Concurrent, () => Concurrent.HasValue)
                    .Add("maxAutoRetries", MaxAutoRetries, () => MaxAutoRetries.HasValue)
                    .Add("autoRetryAfter", AutoRetryAfter, () => AutoRetryAfter.HasValue)
                    .Add("withCredentials", WithCredentials, () => WithCredentials.HasValue);

                if (Remove.HasValue())
                {
                    config["removeUrl"] = encoder(Remove.GenerateUrl(upload.ViewContext, upload.UrlGenerator));
                }

                options.Add(key, config);
            }
        }
    }
}
