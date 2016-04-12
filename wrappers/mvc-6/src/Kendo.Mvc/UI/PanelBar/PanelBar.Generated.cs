using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI PanelBar component
    /// </summary>
    public partial class PanelBar 
    {
        public PanelBarExpandMode? ExpandMode { get; set; }


        protected override Dictionary<string, object> SerializeSettings()
        {
            var settings = base.SerializeSettings();

            if (ExpandMode.HasValue)
            {
                settings["expandMode"] = ExpandMode?.Serialize();
            }

            return settings;
        }
    }
}
