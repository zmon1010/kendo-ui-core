using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI ChartXAxisNotesSettings class
    /// </summary>
    public partial class ChartXAxisNotesSettings 
    {
        public string Position { get; set; }

        public ChartXAxisNotesIconSettings Icon { get; } = new ChartXAxisNotesIconSettings();

        public ChartXAxisNotesLabelSettings Label { get; } = new ChartXAxisNotesLabelSettings();

        public ChartXAxisNotesLineSettings Line { get; } = new ChartXAxisNotesLineSettings();

        public ClientHandlerDescriptor Visual { get; set; }


        public Chart Chart { get; set; }

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            if (Position?.HasValue() == true)
            {
                settings["position"] = Position;
            }

            var icon = Icon.Serialize();
            if (icon.Any())
            {
                settings["icon"] = icon;
            }

            var label = Label.Serialize();
            if (label.Any())
            {
                settings["label"] = label;
            }

            var line = Line.Serialize();
            if (line.Any())
            {
                settings["line"] = line;
            }

            if (Visual?.HasValue() == true)
            {
                settings["visual"] = Visual;
            }

            return settings;
        }
    }
}
