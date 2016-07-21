using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;

namespace Kendo.Mvc.Examples.Models
{
    public static class ScriptGroups
    {
        private static readonly string jQueryPath = string.Format(
            "//code.jquery.com/jquery-{0}.min.js",
            ConfigurationManager.AppSettings["JQUERY_VERSION"]
        );

        private static readonly string JSZipPath = "jszip.min.js";

        public static IList<string> All = new string[]
        {
#if DEBUG
            "jquery.min.js",
#else
            jQueryPath,
#endif
            JSZipPath,
            "kendo.all.min.js",
            "kendo.aspnetmvc.min.js",
            "kendo.timezones.min.js"
        };
    }
}
