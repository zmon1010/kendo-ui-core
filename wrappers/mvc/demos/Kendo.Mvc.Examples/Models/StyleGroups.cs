using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.Examples.Models
{
    public static class StyleGroups
    {
        public static readonly IList<string> All = new string[]
        {
            "kendo.CURRENT_COMMON.min.css",
            "kendo.rtl.min.css",
            "kendo.CURRENT_THEME.min.css",
            "kendo.CURRENT_THEME.mobile.min.css"
        };

        public static readonly IList<string> Mobile = new string[]
        {
            "kendo.common-nova.min.css",
            "kendo.nova.min.css",
            "kendo.mobile.nova.min.css"
        };
    }
}
