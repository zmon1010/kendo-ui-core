using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI ChartCategoryAxisLabelsRotationSettings class
    /// </summary>
    public partial class ChartCategoryAxisLabelsRotationSettings<T> where T : class 
    {
        public string Align { get; set; }

        public double? Angle { get; set; }


        public Chart<T> Chart { get; set; }

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            if (Align?.HasValue() == true)
            {
                settings["align"] = Align;
            }

            if (Angle.HasValue)
            {
                settings["angle"] = Angle;
            }

            return settings;
        }
    }
}
