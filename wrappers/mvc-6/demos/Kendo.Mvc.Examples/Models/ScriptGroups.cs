using System.Collections.Generic;

namespace Kendo.Mvc.Examples.Models
{
    public static class ScriptGroups
    {
        private static readonly string jQueryPath = "//code.jquery.com/jquery-1.12.3.min.js";

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
