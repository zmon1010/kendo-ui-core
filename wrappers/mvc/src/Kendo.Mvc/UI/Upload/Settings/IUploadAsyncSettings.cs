namespace Kendo.Mvc.UI
{
    public interface IUploadAsyncSettings
    {
        /// <summary>
        /// Defines the Save action
        /// </summary>
        INavigatable Save { get; set; }

        /// <summary>
        /// Defines the name of the form field submitted to the Save action.
        /// The default value is the Upload name.
        /// </summary>
        string SaveField { get; set; }

        /// <summary>
        /// Defines the Remove action
        /// </summary>
        INavigatable Remove { get; set; }

        /// <summary>
        /// Defines the name of the form field submitted to the Remove action.
        /// The default value is "fileNames".
        /// </summary>
        string RemoveField { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether to start the upload immediately after selecting a file
        /// </summary>
        bool? AutoUpload { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether to upload selected files in one batch (request)
        /// </summary>
        bool? Batch { get; set; }

        /// <summary>
        /// Gets or sets a value indicating the chunk size
        /// This property is only in use when the async.batch is set false.
        /// </summary>
        double? ChunkSize { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the chunks are uploaded simultaneously
        /// </summary>
        bool? Concurrent { get; set; }

        /// <summary>
        /// Gets or sets a value indicating how much retries will be performed when the upload fails
        /// </summary>
        double? MaxAutoRetries { get; set; }

        /// <summary>
        /// Gets or sets a value indicating after how many ticks the upload will be retried
        /// </summary>
        double? AutoRetryAfter { get; set; }

        /// <summary>
        /// By default, the files are uploaded as filedata. When set to true, the files are read as file buffer by using FileReader and this buffer is send in the request body.
        /// </summary>
        bool? UseArrayBuffer { get; set; }

        /// <summary>
        /// Gets or sets a value whether to send credentials as part of XHR requests
        /// </summary>
        bool? WithCredentials { get; set; }
    }
}