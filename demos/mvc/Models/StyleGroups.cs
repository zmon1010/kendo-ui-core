using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Models
{
    public static class StyleGroups
    {
        public static readonly IList<string> All = new string[]
        {
#if DEBUG
            "web/kendo.CURRENT_COMMON.css",
            "web/kendo.rtl.css",
            "web/kendo.CURRENT_THEME.css",
            "web/kendo.CURRENT_THEME.mobile.css"
#else
            "kendo.CURRENT_COMMON.min.css",
            "kendo.rtl.min.css",
            "kendo.CURRENT_THEME.min.css",
            "kendo.CURRENT_THEME.mobile.min.css"
#endif
        };

        public static readonly IList<string> Metro = new string[]
        {
#if DEBUG
            "web/kendo.common.css",
            "web/kendo.rtl.css",
            "web/kendo.metro.css"
#else
            "kendo.common.min.css",
            "kendo.rtl.min.css",
            "kendo.metro.min.css"
#endif
        };

        public static readonly IList<string> Simulator = new string[]
        {
#if DEBUG
            "web/kendo.common.css",
            "web/kendo.metroblack.css"
#else
            "kendo.common.min.css",
            "kendo.metroblack.min.css"
#endif
        };

        public static readonly IList<string> Mobile = new string[]
        {
#if DEBUG
            "web/kendo.common.css",
            "web/kendo.default.css",
            "mobile/kendo.mobile.ios.css"
#else
            "kendo.common.min.css",
            "kendo.default.min.css",
            "kendo.mobile.ios.min.css"
#endif
        };

        public static readonly IList<string> Bootstrap = new string[]
        {
#if DEBUG
            "web/kendo.common-bootstrap.css",
            "web/kendo.bootstrap.css"
#else
            "kendo.common-bootstrap.min.css",
            "kendo.bootstrap.min.css"
#endif
        };

        public static readonly IList<string> MobileThemeBuilder = new string[]
        {
#if DEBUG
            "web/kendo.common.css",
            "web/kendo.default.css",
            "mobile/kendo.mobile.all.css",
#else
            "kendo.common.min.css",
            "kendo.default.min.css",
            "kendo.mobile.all.min.css",
#endif
        };
    }
}
