using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI GridPdfSettings class
    /// </summary>
    public partial class GridPdfSettings<T> 
    {
        public bool? AllPages { get; set; }

        public string Author { get; set; }

        public string Creator { get; set; }

        public DateTime? Date { get; set; }

        public string FileName { get; set; }

        public bool? ForceProxy { get; set; }

        public string Keywords { get; set; }

        public bool? Landscape { get; set; }

        public string ProxyURL { get; set; }

        public string ProxyTarget { get; set; }

        public string Subject { get; set; }

        public string Title { get; set; }


        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            if (AllPages.HasValue)
            {
                settings["allPages"] = AllPages;
            }

            if (Author.HasValue())
            {
                settings["author"] = Author;
            }

            if (Creator.HasValue())
            {
                settings["creator"] = Creator;
            }

            if (Date.HasValue)
            {
                settings["date"] = Date;
            }

            if (FileName.HasValue())
            {
                settings["fileName"] = FileName;
            }

            if (ForceProxy.HasValue)
            {
                settings["forceProxy"] = ForceProxy;
            }

            if (Keywords.HasValue())
            {
                settings["keywords"] = Keywords;
            }

            if (Landscape.HasValue)
            {
                settings["landscape"] = Landscape;
            }

            if (ProxyURL.HasValue())
            {
                settings["proxyURL"] = ProxyURL;
            }

            if (ProxyTarget.HasValue())
            {
                settings["proxyTarget"] = ProxyTarget;
            }

            if (Subject.HasValue())
            {
                settings["subject"] = Subject;
            }

            if (Title.HasValue())
            {
                settings["title"] = Title;
            }

            return settings;
        }
    }
}
