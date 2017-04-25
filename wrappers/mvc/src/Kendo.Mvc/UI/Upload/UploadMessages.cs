namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using Kendo.Mvc.Resources;
    using Kendo.Mvc.Infrastructure;

    public class UploadMessages : JsonObject, IUploadMessages
    { 
        private const string DefaultCancel = "Cancel";

        private const string DefaultDropFilesHere = "drop files here to upload";

        private const string DefaultRemove = "Remove";

        private const string DefaultRetry = "Retry";

        private const string DefaultSelect = "Select...";

        private const string DefaultStatusFailed = "failed";

        private const string DefaultStatusUploaded = "uploaded";

        private const string DefaultStatusUploading = "uploading";

        private const string DefaultUploadSelectedFiles = "Upload files";

        private const string DefaultHeaderStatusUploading = "Uploading...";

        private const string DefaultHeaderStatusUploaded = "Done";

        private const string DefaultInvalidMaxFileSize = "File size too large.";

        private const string DefaultInvalidMinFileSize = "File size too small.";

        private const string DefaultInvalidFileExtension = "File type not allowed.";

        private const string DefaultInvalidFiles = "Invalid file(s). Please check file upload requirements.";

        private const string DefaultClearSelectedFiles = "Clear";

        public UploadMessages()
        {
            Cancel = Messages.Upload_Cancel;
            DropFilesHere = Messages.Upload_DropFilesHere;
            Remove = Messages.Upload_Remove;
            Retry = Messages.Upload_Retry;
            Select = Messages.Upload_Select;
            StatusFailed = Messages.Upload_StatusFailed;
            StatusUploaded = Messages.Upload_StatusUploaded;
            StatusUploading = Messages.Upload_StatusUploading;
            UploadSelectedFiles = Messages.Upload_UploadSelectedFiles;
            HeaderStatusUploading = Messages.Upload_HeaderStatusUploading;
            HeaderStatusUploaded = Messages.Upload_HeaderStatusUploaded;
            InvalidMaxFileSize = Messages.Upload_InvalidMaxFileSize;
            InvalidMinFileSize = Messages.Upload_InvalidMinFileSize;
            InvalidFileExtension = Messages.Upload_InvalidFileExtension;
            InvalidFiles = Messages.Upload_InvalidFiles;
            ClearSelectedFiles = Messages.Upload_ClearSelectedFiles;
        }

        public string Cancel { get; set; }

        public string DropFilesHere { get; set; }

        public string Remove { get; set; }

        public string Retry { get; set; }

        public string Select { get; set; }

        public string StatusFailed { get; set; }

        public string StatusUploaded { get; set; }

        public string StatusUploading { get; set; }

        public string UploadSelectedFiles { get; set; }

        public string HeaderStatusUploading { get; set; }

        public string HeaderStatusUploaded { get; set; }

        public string InvalidMaxFileSize { get; set; }

		public string InvalidMinFileSize { get; set; }

		public string InvalidFileExtension { get; set; }

        public string InvalidFiles { get; set; }

		public string ClearSelectedFiles { get; set; }

        protected override void Serialize(IDictionary<string, object> json)
        {
            FluentDictionary.For(json)
                .Add("cancel", Cancel, DefaultCancel)
                .Add("dropFilesHere", DropFilesHere, DefaultDropFilesHere)
                .Add("remove", Remove, DefaultRemove)
                .Add("retry", Retry, DefaultRetry)
                .Add("select", Select, DefaultSelect)
                .Add("statusFailed", StatusFailed, DefaultStatusFailed)
                .Add("statusUploaded", StatusUploaded, DefaultStatusUploaded)
                .Add("statusUploading", StatusUploading, DefaultStatusUploading)
                .Add("uploadSelectedFiles", UploadSelectedFiles, DefaultUploadSelectedFiles)
                .Add("headerStatusUploading", HeaderStatusUploading, DefaultHeaderStatusUploading)
                .Add("headerStatusUploaded", HeaderStatusUploaded, DefaultHeaderStatusUploaded)
                .Add("invalidMaxFileSize", InvalidMaxFileSize, DefaultInvalidMaxFileSize)
                .Add("invalidMinFileSize", InvalidMinFileSize, DefaultInvalidMinFileSize)
                .Add("invalidFileExtension", InvalidFileExtension, DefaultInvalidFileExtension)
                .Add("invalidFileExtension", InvalidFiles, DefaultInvalidFiles)
                .Add("clearSelectedFiles", ClearSelectedFiles, DefaultClearSelectedFiles);
        }
    }
}