namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    public interface IUploadMessages
    { 
        string Cancel { get; set; }

        string DropFilesHere { get; set; }

        string Remove { get; set; }

        string Retry { get; set; }

        string Select { get; set; }

        string StatusFailed { get; set; }

        string StatusUploaded { get; set; }

        string StatusUploading { get; set; }

        string UploadSelectedFiles { get; set; }

        string HeaderStatusUploading { get; set; }

        string HeaderStatusUploaded { get; set; }

        string InvalidMaxFileSize { get; set; }

        string InvalidMinFileSize { get; set; }

        string InvalidFileExtension { get; set; }

        string InvalidFiles { get; set; }

        string ClearSelectedFiles { get; set; }

        IDictionary<string, object> ToJson();
    }
}