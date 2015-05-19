using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI PivotConfigurator component
    /// </summary>
    public partial class PivotConfigurator 
    {
        public bool? Filterable { get; set; }

        public PivotConfiguratorSortableSettings Sortable { get; } = new PivotConfiguratorSortableSettings();

        public double? Height { get; set; }


        protected override Dictionary<string, object> SerializeSettings()
        {
            var settings = base.SerializeSettings();

            if (Filterable.HasValue)
            {
                settings["filterable"] = Filterable;
            }

            var sortable = Sortable.Serialize();
            if (sortable.Any())
            {
                settings["sortable"] = sortable;
            }
            else if (Sortable.Enabled == true)
            {
                settings["sortable"] = true;
            }

            if (Height.HasValue)
            {
                settings["height"] = Height;
            }

            return settings;
        }
    }
}
