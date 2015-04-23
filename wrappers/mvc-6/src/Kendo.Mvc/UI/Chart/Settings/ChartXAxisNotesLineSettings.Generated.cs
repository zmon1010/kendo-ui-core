using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI ChartXAxisNotesLineSettings class
    /// </summary>
    public partial class ChartXAxisNotesLineSettings 
    {
        public double? Width { get; set; }

        public string Color { get; set; }

        public double? Length { get; set; }


        public Chart Chart { get; set; }

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            if (Width.HasValue)
            {
                settings["width"] = Width;
            }

            if (Color?.HasValue() == true)
            {
                settings["color"] = Color;
            }

            if (Length.HasValue)
            {
                settings["length"] = Length;
            }

            return settings;
        }
    }
}
