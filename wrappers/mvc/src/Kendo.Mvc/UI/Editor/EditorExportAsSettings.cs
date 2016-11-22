using Kendo.Mvc.Extensions;
using System.Linq;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System;
using System.Web;

namespace Kendo.Mvc.UI
{
    public class EditorExportAsSettings : JsonObject
    {
        private readonly Editor editor;
        public EditorExportAsSettings(Editor editorComponent)
        {
            editor = editorComponent;
            Proxy = new RequestSettings();
        }

        /// <summary>
        /// Defines the exported file name
        /// </summary>
        public string FileName { get; set; }

         /// <summary>
        /// Defines the export action
        /// </summary>
        public INavigatable Proxy { get; set; }

        protected override void Serialize(System.Collections.Generic.IDictionary<string, object> json)
        {
            if (!String.IsNullOrEmpty(FileName))
            {
                json["fileName"] = FileName;
            }

            if (Proxy.HasValue())
            {
                Func<string, string> encoder = (string url) => editor.IsSelfInitialized ? HttpUtility.UrlDecode(url) : url;
                json["proxyURL"] = encoder(Proxy.GenerateUrl(editor.ViewContext, editor.UrlGenerator));
            }
        }
    }
}
