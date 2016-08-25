namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Linq.Expressions;
    using System.Web.Mvc;
    using System.Web.Routing;

    /// <summary>
    /// A builder class for <see cref="IUploadValidationSettings"/>
    /// </summary>
    public class UploadValidationSettingsBuilder : IHideObjectMembers
    {
        private readonly IUploadValidationSettings settings;

        /// <summary>
        /// Initializes a new instance of the <see cref="UploadValidationSettingsBuilder" /> class.
        /// </summary>
        /// <param name="validationSettings">The validation settings.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Upload()
        ///             .Name("Upload")
        ///             .Validation(async => async
        ///                 .AllowedExtensions([".jpg"])
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public UploadValidationSettingsBuilder(IUploadValidationSettings validationSettings)
        {
            settings = validationSettings;
        }

        /// <summary>
        /// Sets a value indicating whether the allowed file extensions
        /// </summary>
        /// <param name="value">the allowed file extensions</param>
        /// <remarks>
        ///
        /// </remarks>
        public UploadValidationSettingsBuilder AllowedExtensions(string[] value)
        {
            settings.AllowedExtensions = value;

            return this;
        }

        /// <summary>
        /// Sets a value indicating max file size in bytes
        /// </summary>
        /// <param name="value">max file size in bytes</param>
        /// <remarks>
        /// 
        /// </remarks>
        public UploadValidationSettingsBuilder MaxFileSize(double? value)
        {
            settings.MaxFileSize = value;

            return this;
        }

        /// <summary>
        /// Sets a value indicating min file size in bytes
        /// </summary>
        /// <param name="value">min file size in bytes</param>
        /// <remarks>
        /// 
        /// </remarks>
        public UploadValidationSettingsBuilder MinFileSize(double? value)
        {
            settings.MinFileSize = value;

            return this;
        }
    }
}
