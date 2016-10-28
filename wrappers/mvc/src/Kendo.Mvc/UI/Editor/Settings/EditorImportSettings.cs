namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;
    using System.Web;

    public class EditorImportSettings : JsonObject
    {
        private readonly Editor editor;
        public EditorImportSettings(Editor editorComponent)
        {
            editor = editorComponent;
            Proxy = new RequestSettings();

            Complete = new ClientHandlerDescriptor();
            Error = new ClientHandlerDescriptor();
            Progress = new ClientHandlerDescriptor();
            Select = new ClientHandlerDescriptor();
            Success = new ClientHandlerDescriptor();
        }

        /// <summary>
        ///  Defines the handler of the Complete client-side event
        /// </summary>
        public ClientHandlerDescriptor Complete { get; set; }

        /// <summary>
        ///  Defines the handler of the Error client-side event
        /// </summary>
        public ClientHandlerDescriptor Error { get; set; }

        /// <summary>
        ///  Defines the handler of the Progress client-side event
        /// </summary>
        public ClientHandlerDescriptor Progress { get; set; }

        /// <summary>
        ///  Defines the handler of the Select client-side event
        /// </summary>
        public ClientHandlerDescriptor Select { get; set; }

        /// <summary>
        ///  Defines the handler of the Success client-side event
        /// </summary>
        public ClientHandlerDescriptor Success { get; set; }

        /// <summary>
        /// Defines the import action
        /// </summary>
        public INavigatable Proxy { get; set; }

        /// <summary>
        /// Lists which file extensions are allowed to be uploaded
        /// </summary>
        public string[] AllowedExtensions { get; set; }

        /// <summary>
        /// Defines the maximum file size that can be uploaded in bytes
        /// </summary>
        public double? MaxFileSize { get; set; }

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (Proxy.HasValue())
            {
                Func<string, string> encoder = (string url) => editor.IsSelfInitialized ? HttpUtility.UrlDecode(url) : url;
                json["proxyUrl"] = encoder(Proxy.GenerateUrl(editor.ViewContext, editor.UrlGenerator));
            }

            if (AllowedExtensions != null)
            {
                json["allowedExtensions"] = AllowedExtensions;
            }

            if (MaxFileSize.HasValue)
            {
                json["maxFileSize"] = MaxFileSize;
            }

            if (Complete.HasValue())
            {
                json["complete"] = Complete;
            }

            if (Error.HasValue())
            {
                json["error"] = Error;
            }

            if (Progress.HasValue())
            {
                json["progress"] = Progress;
            }

            if (Select.HasValue())
            {
                json["select"] = Select;
            }

            if (Success.HasValue())
            {
                json["success"] = Success;
            }
        }
    }
}
