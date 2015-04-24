using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI RadialGaugeScaleLabelsSettings class
    /// </summary>
    public partial class RadialGaugeScaleLabelsSettings 
    {
        public RadialGaugeScaleLabelsSettings()
        {
            Margin = new ChartSpacing();
            Padding = new ChartSpacing();
            Border = new ChartElementBorder();
        }

        /// <summary>
        /// Gets or sets the label margin.
        /// </summary>
        /// <value>
        /// The label margin.
        /// </value>
        public ChartSpacing Margin
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the label padding.
        /// </summary>
        /// <value>
        /// The label padding.
        /// </value>
        public ChartSpacing Padding
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the label border.
        /// </summary>
        /// <value>
        /// The label border.
        /// </value>
        public ChartElementBorder Border
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the label opacity.
        /// </summary>
        /// <value>
        /// The label opacity.
        /// </value>
        public double? Opacity
        {
            get;
            set;
        }

        public Dictionary<string, object> Serialize()
        {
            var settings = SerializeSettings();

            var margin = Margin.Serialize();
            if (margin.Any())
            {
                settings["margin"] = margin;
            }

            var padding = Padding.Serialize();
            if (padding.Any())
            {
                settings["padding"] = padding;
            }

            var border = Border.Serialize();
            if (border.Any())
            {
                settings["border"] = border;
            }

            if (Opacity.HasValue)
            {
                settings["opacity"] = Opacity;
            }

            return settings;
        }
    }
}
