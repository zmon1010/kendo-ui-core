using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI ChartCategoryAxis class
    /// </summary>
    public partial class ChartCategoryAxis 
    {
        public ChartCategoryAxisAutoBaseUnitStepsSettings AutoBaseUnitSteps { get; } = new ChartCategoryAxisAutoBaseUnitStepsSettings();

        public object[] AxisCrossingValue { get; set; }

        public string Background { get; set; }

        public string BaseUnit { get; set; }

        public int? BaseUnitStep { get; set; }

        public object[] Categories { get; set; }

        public string Color { get; set; }

        public ChartCategoryAxisCrosshairSettings Crosshair { get; } = new ChartCategoryAxisCrosshairSettings();

        public string Field { get; set; }

        public bool? Justified { get; set; }

        public ChartCategoryAxisLabelsSettings Labels { get; } = new ChartCategoryAxisLabelsSettings();

        public ChartCategoryAxisLineSettings Line { get; } = new ChartCategoryAxisLineSettings();

        public ChartCategoryAxisMajorGridLinesSettings MajorGridLines { get; } = new ChartCategoryAxisMajorGridLinesSettings();

        public ChartCategoryAxisMajorTicksSettings MajorTicks { get; } = new ChartCategoryAxisMajorTicksSettings();

        public object Max { get; set; }

        public double? MaxDateGroups { get; set; }

        public object Min { get; set; }

        public ChartCategoryAxisMinorGridLinesSettings MinorGridLines { get; } = new ChartCategoryAxisMinorGridLinesSettings();

        public ChartCategoryAxisMinorTicksSettings MinorTicks { get; } = new ChartCategoryAxisMinorTicksSettings();

        public string Name { get; set; }

        public string Pane { get; set; }

        public List<ChartCategoryAxisPlotBand> PlotBands { get; set; } = new List<ChartCategoryAxisPlotBand>();

        public bool? Reverse { get; set; }

        public bool? RoundToBaseUnit { get; set; }

        public ChartCategoryAxisSelectSettings Select { get; } = new ChartCategoryAxisSelectSettings();

        public double? StartAngle { get; set; }

        public ChartCategoryAxisTitleSettings Title { get; } = new ChartCategoryAxisTitleSettings();

        public string Type { get; set; }

        public bool? Visible { get; set; }

        public double? WeekStartDay { get; set; }

        public ChartCategoryAxisNotesSettings Notes { get; } = new ChartCategoryAxisNotesSettings();


        public Chart Chart { get; set; }

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            var autoBaseUnitSteps = AutoBaseUnitSteps.Serialize();
            if (autoBaseUnitSteps.Any())
            {
                settings["autoBaseUnitSteps"] = autoBaseUnitSteps;
            }

            if (AxisCrossingValue?.Any() == true)
            {
                settings["axisCrossingValue"] = AxisCrossingValue;
            }

            if (Background?.HasValue() == true)
            {
                settings["background"] = Background;
            }

            if (BaseUnit?.HasValue() == true)
            {
                settings["baseUnit"] = BaseUnit;
            }

            if (BaseUnitStep.HasValue)
            {
                settings["baseUnitStep"] = BaseUnitStep;
            }

            if (Categories?.Any() == true)
            {
                settings["categories"] = Categories;
            }

            if (Color?.HasValue() == true)
            {
                settings["color"] = Color;
            }

            var crosshair = Crosshair.Serialize();
            if (crosshair.Any())
            {
                settings["crosshair"] = crosshair;
            }

            if (Field?.HasValue() == true)
            {
                settings["field"] = Field;
            }

            if (Justified.HasValue)
            {
                settings["justified"] = Justified;
            }

            var labels = Labels.Serialize();
            if (labels.Any())
            {
                settings["labels"] = labels;
            }

            var line = Line.Serialize();
            if (line.Any())
            {
                settings["line"] = line;
            }

            var majorGridLines = MajorGridLines.Serialize();
            if (majorGridLines.Any())
            {
                settings["majorGridLines"] = majorGridLines;
            }

            var majorTicks = MajorTicks.Serialize();
            if (majorTicks.Any())
            {
                settings["majorTicks"] = majorTicks;
            }

            if (Max != null)
            {
                settings["max"] = Max;
            }

            if (MaxDateGroups.HasValue)
            {
                settings["maxDateGroups"] = MaxDateGroups;
            }

            if (Min != null)
            {
                settings["min"] = Min;
            }

            var minorGridLines = MinorGridLines.Serialize();
            if (minorGridLines.Any())
            {
                settings["minorGridLines"] = minorGridLines;
            }

            var minorTicks = MinorTicks.Serialize();
            if (minorTicks.Any())
            {
                settings["minorTicks"] = minorTicks;
            }

            if (Name?.HasValue() == true)
            {
                settings["name"] = Name;
            }

            if (Pane?.HasValue() == true)
            {
                settings["pane"] = Pane;
            }

            var plotBands = PlotBands.Select(i => i.Serialize());
            if (plotBands.Any())
            {
                settings["plotBands"] = plotBands;
            }

            if (Reverse.HasValue)
            {
                settings["reverse"] = Reverse;
            }

            if (RoundToBaseUnit.HasValue)
            {
                settings["roundToBaseUnit"] = RoundToBaseUnit;
            }

            var select = Select.Serialize();
            if (select.Any())
            {
                settings["select"] = select;
            }

            if (StartAngle.HasValue)
            {
                settings["startAngle"] = StartAngle;
            }

            var title = Title.Serialize();
            if (title.Any())
            {
                settings["title"] = title;
            }

            if (Type?.HasValue() == true)
            {
                settings["type"] = Type;
            }

            if (Visible.HasValue)
            {
                settings["visible"] = Visible;
            }

            if (WeekStartDay.HasValue)
            {
                settings["weekStartDay"] = WeekStartDay;
            }

            var notes = Notes.Serialize();
            if (notes.Any())
            {
                settings["notes"] = notes;
            }

            return settings;
        }
    }
}
