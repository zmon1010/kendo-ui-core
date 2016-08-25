namespace Kendo.Mvc.UI
{
    public interface IUploadValidationSettings
    {
        /// <summary>
        /// Lists which file extensions are allowed to be uploaded
        /// </summary>
        string [] AllowedExtensions { get; set; }

        /// <summary>
        /// Defines the maximum file size that can be uploaded in bytes
        /// </summary>
        double? MaxFileSize { get; set; }

        /// <summary>
        /// Defines the minimum file size that can be uploaded in bytes
        /// </summary>
        double? MinFileSize { get; set; }
    }
}