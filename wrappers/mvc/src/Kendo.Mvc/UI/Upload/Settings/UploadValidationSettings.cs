namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Web;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Infrastructure;
    
    public class UploadValidationSettings : IUploadValidationSettings
    {
        public UploadValidationSettings()
        {
        }

        /// <summary>
        /// Lists which file extensions are allowed to be uploaded
        /// </summary>
        public string[] AllowedExtensions { get; set; }

        /// <summary>
        /// Defines the maximum file size that can be uploaded in bytes
        /// </summary>
        public double? MaxFileSize { get; set; }

        /// <summary>
        /// Defines the minimum file size that can be uploaded in bytes
        /// </summary>
        public double? MinFileSize { get; set; }

        /// <summary>
        /// Serializes the Validation uploading settings to the writer.
        /// </summary>
        /// <param name="key">The serialization key.</param>
        /// <param name="options">The target dictionary.</param>
        public void SerializeTo(string key, IDictionary<string, object> options)
        {
            var config = new Dictionary<string, object>();

            FluentDictionary.For(config)
                .Add("allowedExtensions", AllowedExtensions, () => AllowedExtensions != null)
                .Add("maxFileSize", MaxFileSize, () => MaxFileSize.HasValue)
                .Add("minFileSize", MinFileSize, () => MinFileSize.HasValue);

            if (config.Count > 0)
            {
               options.Add(key, config);
            }
        }
    }
}
