using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI LinearGaugePointer class
    /// </summary>
    public partial class LinearGaugePointer 
    {
        public LinearGaugePointerBorderSettings Border { get; } = new LinearGaugePointerBorderSettings();

        public string Color { get; set; }

        public double? Margin { get; set; }

        public double? Opacity { get; set; }

        public string Shape { get; set; }

        public double? Size { get; set; }

        public LinearGaugePointerTrackSettings Track { get; } = new LinearGaugePointerTrackSettings();

        public double? Value { get; set; }

        public LinearGauge LinearGauge { get; set; }

        public Dictionary<string, object> Serialize()
        {
            var settings = new Dictionary<string, object>();

            var border = Border.Serialize();
            if (border.Any())
            {
                settings["border"] = border;
            }

            if (Color?.HasValue() == true)
            {
                settings["color"] = Color;
            }

            if (Margin.HasValue)
            {
                settings["margin"] = Margin;
            }

            if (Opacity.HasValue)
            {
                settings["opacity"] = Opacity;
            }

            if (Shape?.HasValue() == true)
            {
                settings["shape"] = Shape;
            }

            if (Size.HasValue)
            {
                settings["size"] = Size;
            }

            var track = Track.Serialize();
            if (track.Any())
            {
                settings["track"] = track;
            }

            if (Value.HasValue)
            {
                settings["value"] = Value;
            }

            return settings;
        }
    }
}
