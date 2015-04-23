using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI ChartLegendInactiveItemsSettings class
    /// </summary>
    public partial class ChartLegendInactiveItemsSettings 
    {
        public ChartLegendInactiveItemsLabelsSettings Labels { get; } = new ChartLegendInactiveItemsLabelsSettings();


        public Chart Chart { get; set; }

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            var labels = Labels.Serialize();
            if (labels.Any())
            {
                settings["labels"] = labels;
            }

            return settings;
        }
    }
}
