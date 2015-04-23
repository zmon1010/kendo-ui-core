using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI Chart component
    /// </summary>
    public partial class Chart 
    {
        public bool? AutoBind { get; set; }

        public List<ChartCategoryAxis> CategoryAxis { get; set; } = new List<ChartCategoryAxis>();

        public ChartChartAreaSettings ChartArea { get; } = new ChartChartAreaSettings();

        public ChartLegendSettings Legend { get; } = new ChartLegendSettings();

        public List<ChartPane> Panes { get; set; } = new List<ChartPane>();

        public ChartPdfSettings Pdf { get; } = new ChartPdfSettings();

        public ChartPlotAreaSettings PlotArea { get; } = new ChartPlotAreaSettings();

        public List<ChartSerie> Series { get; set; } = new List<ChartSerie>();

        public String[] SeriesColors { get; set; }

        public string Theme { get; set; }

        public ChartTitleSettings Title { get; } = new ChartTitleSettings();

        public ChartTooltipSettings Tooltip { get; } = new ChartTooltipSettings();

        public bool? Transitions { get; set; }

        public List<ChartValueAxis> ValueAxis { get; set; } = new List<ChartValueAxis>();

        public List<ChartXAxis> XAxis { get; set; } = new List<ChartXAxis>();

        public List<ChartYAxis> YAxis { get; set; } = new List<ChartYAxis>();

        public RenderingMode? RenderAs { get; set; }


        protected override Dictionary<string, object> SerializeSettings()
        {
            var settings = base.SerializeSettings();

            if (AutoBind.HasValue)
            {
                settings["autoBind"] = AutoBind;
            }

            var categoryAxis = CategoryAxis.Select(i => i.Serialize());
            if (categoryAxis.Any())
            {
                settings["categoryAxis"] = categoryAxis;
            }

            var chartArea = ChartArea.Serialize();
            if (chartArea.Any())
            {
                settings["chartArea"] = chartArea;
            }

            var legend = Legend.Serialize();
            if (legend.Any())
            {
                settings["legend"] = legend;
            }

            var panes = Panes.Select(i => i.Serialize());
            if (panes.Any())
            {
                settings["panes"] = panes;
            }

            var pdf = Pdf.Serialize();
            if (pdf.Any())
            {
                settings["pdf"] = pdf;
            }

            var plotArea = PlotArea.Serialize();
            if (plotArea.Any())
            {
                settings["plotArea"] = plotArea;
            }

            var series = Series.Select(i => i.Serialize());
            if (series.Any())
            {
                settings["series"] = series;
            }

            if (SeriesColors?.Any() == true)
            {
                settings["seriesColors"] = SeriesColors;
            }

            if (Theme?.HasValue() == true)
            {
                settings["theme"] = Theme;
            }

            var title = Title.Serialize();
            if (title.Any())
            {
                settings["title"] = title;
            }

            var tooltip = Tooltip.Serialize();
            if (tooltip.Any())
            {
                settings["tooltip"] = tooltip;
            }

            if (Transitions.HasValue)
            {
                settings["transitions"] = Transitions;
            }

            var valueAxis = ValueAxis.Select(i => i.Serialize());
            if (valueAxis.Any())
            {
                settings["valueAxis"] = valueAxis;
            }

            var xAxis = XAxis.Select(i => i.Serialize());
            if (xAxis.Any())
            {
                settings["xAxis"] = xAxis;
            }

            var yAxis = YAxis.Select(i => i.Serialize());
            if (yAxis.Any())
            {
                settings["yAxis"] = yAxis;
            }

            if (RenderAs.HasValue)
            {
                settings["renderAs"] = RenderAs?.Serialize();
            }

            return settings;
        }
    }
}
