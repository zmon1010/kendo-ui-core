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

        public static readonly IList<string> Metro = new string[]
        {
            "kendo.common.min.css",
            "kendo.rtl.min.css",
            "kendo.metro.min.css"
        };

        public static readonly IList<string> Simulator = new string[]
        {
            "kendo.common.min.css",
            "kendo.metroblack.min.css"
        };

        public static readonly IList<string> Mobile = new string[]
        {
            "kendo.common-nova.min.css",
            "kendo.nova.min.css",
            "kendo.mobile.nova.min.css"
        };

        public static readonly IList<string> Bootstrap = new string[]
        {
            "kendo.common-bootstrap.min.css",
            "kendo.bootstrap.min.css"
        };

        public static readonly IList<string> MobileThemeBuilder = new string[]
        {
            "kendo.common.min.css",
            "kendo.default.min.css",
            "kendo.mobile.all.min.css",
        };
    }
}
