using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI RangeSlider component
    /// </summary>
    public partial class RangeSlider<T> where T : struct, IComparable 
    {
        public T? LargeStep { get; set; }

        public T? Max { get; set; }

        public T? Min { get; set; }

        public SliderOrientation? Orientation { get; set; }

        public T? SelectionEnd { get; set; }

        public T? SelectionStart { get; set; }

        public T? SmallStep { get; set; }

        public SliderTickPlacement? TickPlacement { get; set; }

        public RangeSliderTooltipSettings<T> Tooltip { get; } = new RangeSliderTooltipSettings<T>();


        protected override Dictionary<string, object> SerializeSettings()
        {
            var settings = base.SerializeSettings();

            if (LargeStep.HasValue)
            {
                settings["largeStep"] = LargeStep;
            }

            if (Max.HasValue)
            {
                settings["max"] = Max;
            }

            if (Min.HasValue)
            {
                settings["min"] = Min;
            }

            if (Orientation.HasValue)
            {
                settings["orientation"] = Orientation?.Serialize();
            }

            if (SelectionEnd.HasValue)
            {
                settings["selectionEnd"] = SelectionEnd;
            }

            if (SelectionStart.HasValue)
            {
                settings["selectionStart"] = SelectionStart;
            }

            if (SmallStep.HasValue)
            {
                settings["smallStep"] = SmallStep;
            }

            if (TickPlacement.HasValue)
            {
                settings["tickPlacement"] = TickPlacement?.Serialize();
            }

            var tooltip = Tooltip.Serialize();
            if (tooltip.Any())
            {
                settings["tooltip"] = tooltip;
            }

            return settings;
        }
    }
}
