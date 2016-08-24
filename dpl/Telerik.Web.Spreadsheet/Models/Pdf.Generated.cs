using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System;

namespace Telerik.Web.Spreadsheet
{
    /// <summary>
    /// Represents a Pdf
    /// </summary>
    [DataContract]
    public partial class Pdf
    {
        /// <summary>
        /// The area to export. Possible values:
        /// </summary>
        [DataMember(Name = "area", EmitDefaultValue = false)]
        public string Area { get; set; }

        /// <summary>
        /// The author of the PDF document.
        /// </summary>
        [DataMember(Name = "author", EmitDefaultValue = false)]
        public string Author { get; set; }

        /// <summary>
        /// The creator of the PDF document.
        /// </summary>
        [DataMember(Name = "creator", EmitDefaultValue = false)]
        public string Creator { get; set; }

        /// <summary>
        /// The date when the PDF document is created. Defaults to new Date().
        /// </summary>
        [DataMember(Name = "date", EmitDefaultValue = false)]
        public DateTime? Date { get; set; }

        /// <summary>
        /// Specifies the file name of the exported PDF file.
        /// </summary>
        [DataMember(Name = "fileName", EmitDefaultValue = false)]
        public string FileName { get; set; }

        /// <summary>
        /// An option indicating whether to fit the spreadsheet content to page width.
        /// </summary>
        [DataMember(Name = "fitWidth", EmitDefaultValue = false)]
        public bool? FitWidth { get; set; }

        /// <summary>
        /// If set to true, the content will be forwarded to proxyURL even if the browser supports saving files locally.
        /// </summary>
        [DataMember(Name = "forceProxy", EmitDefaultValue = false)]
        public bool? ForceProxy { get; set; }

        /// <summary>
        /// An option indicating whether to export the cell guidelines.
        /// </summary>
        [DataMember(Name = "guidelines", EmitDefaultValue = false)]
        public bool? Guidelines { get; set; }

        /// <summary>
        /// An option indicating whether to center the content horizontally.See also vCenter.
        /// </summary>
        [DataMember(Name = "hCenter", EmitDefaultValue = false)]
        public bool? HCenter { get; set; }

        /// <summary>
        /// Specifies the keywords of the exported PDF file.
        /// </summary>
        [DataMember(Name = "keywords", EmitDefaultValue = false)]
        public string Keywords { get; set; }

        /// <summary>
        /// Set to true to reverse the paper dimensions if needed such that width is the larger edge.
        /// </summary>
        [DataMember(Name = "landscape", EmitDefaultValue = false)]
        public bool? Landscape { get; set; }

        /// <summary>
        /// Specifies the margins of the page (numbers or strings with units). Supported
		/// units are "mm", "cm", "in" and "pt" (default).
        /// </summary>
        [DataMember(Name = "margin", EmitDefaultValue = false)]
        public Margin Margin
        {
            get;
            set;
        }

        /// <summary>
        /// Specifies the paper size of the PDF document.
		/// The default "auto" means paper size is determined by content.Supported values:
        /// </summary>
        [DataMember(Name = "paperSize", EmitDefaultValue = false)]
        public string PaperSize { get; set; }

        /// <summary>
        /// The URL of the server side proxy which will stream the file to the end user.A proxy will be used when the browser isn't capable of saving files locally e.g. Internet Explorer 9 and Safari. PDF export is not supported in Internet Explorer 8 and below.The developer is responsible for implementing the server-side proxy.The proxy will receive a POST request with the following parameters in the request body:The proxy should return the decoded file with the "Content-Disposition" header set to
		/// attachment; filename="&lt;fileName.pdf&gt;".
        /// </summary>
        [DataMember(Name = "proxyURL", EmitDefaultValue = false)]
        public string ProxyURL { get; set; }

        /// <summary>
        /// A name or keyword indicating where to display the document returned from the proxy.If you want to display the document in a new window or iframe,
		/// the proxy should set the "Content-Disposition" header to inline; filename="&lt;fileName.pdf&gt;".
        /// </summary>
        [DataMember(Name = "proxyTarget", EmitDefaultValue = false)]
        public string ProxyTarget { get; set; }

        /// <summary>
        /// Sets the subject of the PDF file.
        /// </summary>
        [DataMember(Name = "subject", EmitDefaultValue = false)]
        public string Subject { get; set; }

        /// <summary>
        /// Sets the title of the PDF file.
        /// </summary>
        [DataMember(Name = "title", EmitDefaultValue = false)]
        public string Title { get; set; }

        /// <summary>
        /// An option indicating whether to center the content vertically.See also hCenter.
        /// </summary>
        [DataMember(Name = "vCenter", EmitDefaultValue = false)]
        public bool? VCenter { get; set; }


        /// <summary>
        /// Serialize current instance to Dictionary
        /// </summary>
        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            if (Area != null)
            {
                settings["area"] = Area;
            }

            if (Author != null)
            {
                settings["author"] = Author;
            }

            if (Creator != null)
            {
                settings["creator"] = Creator;
            }

            if (Date != null)
            {
                settings["date"] = Date;
            }

            if (FileName != null)
            {
                settings["fileName"] = FileName;
            }

            if (FitWidth != null)
            {
                settings["fitWidth"] = FitWidth;
            }

            if (ForceProxy != null)
            {
                settings["forceProxy"] = ForceProxy;
            }

            if (Guidelines != null)
            {
                settings["guidelines"] = Guidelines;
            }

            if (HCenter != null)
            {
                settings["hCenter"] = HCenter;
            }

            if (Keywords != null)
            {
                settings["keywords"] = Keywords;
            }

            if (Landscape != null)
            {
                settings["landscape"] = Landscape;
            }

            if (Margin != null)
            {
                settings["margin"] = Margin.Serialize();
            }

            if (PaperSize != null)
            {
                settings["paperSize"] = PaperSize;
            }

            if (ProxyURL != null)
            {
                settings["proxyURL"] = ProxyURL;
            }

            if (ProxyTarget != null)
            {
                settings["proxyTarget"] = ProxyTarget;
            }

            if (Subject != null)
            {
                settings["subject"] = Subject;
            }

            if (Title != null)
            {
                settings["title"] = Title;
            }

            if (VCenter != null)
            {
                settings["vCenter"] = VCenter;
            }

            return settings;
        }
    }
}
