using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI RadialGaugeGaugeAreaSettings class
    /// </summary>
    public partial class RadialGaugeGaugeAreaSettings
    {
        /// <summary>
        /// Gets or sets the gauge area margin.
        /// </summary>
        /// <value>
        /// The gauge area margin.
        /// </value>
        public ChartSpacing Margin { get; set; } = new ChartSpacing();

        public Dictionary<string, object> Serialize()
        {
            var settings = SerializeSettings();

            var margin = Margin.Serialize();
            if (margin.Any())
            {
                settings["margin"] = margin;
            }

            return settings;
        }
    }
}
