using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI TreeListExcelSettings class
    /// </summary>
    public partial class TreeListExcelSettings<T> 
    {
        public string FileName { get; set; }

        public bool? Filterable { get; set; }

        public bool? ForceProxy { get; set; }

        public string ProxyURL { get; set; }



        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            if (FileName.HasValue())
            {
                settings["fileName"] = FileName;
            }

            if (Filterable.HasValue)
            {
                settings["filterable"] = Filterable;
            }

            if (ForceProxy.HasValue)
            {
                settings["forceProxy"] = ForceProxy;
            }

            if (ProxyURL.HasValue())
            {
                settings["proxyURL"] = ProxyURL;
            }


            return settings;
        }
    }
}
