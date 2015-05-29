using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI ChartTitleSettings class
    /// </summary>
    public partial class ChartSeriesDefaultsSettings 
    {
        public ChartSeries Area { get; } = new ChartSeries();

        public ChartSeries Bar { get; } = new ChartSeries();

        public ChartSeries Column { get; } = new ChartSeries();

        public ChartSeries Line { get; } = new ChartSeries();

        public ChartSeries VerticalArea { get; } = new ChartSeries();

        public ChartSeries VerticalLine { get; } = new ChartSeries();

        public ChartSeries RadarArea { get; } = new ChartSeries();

        public ChartSeries RadarColumn { get; } = new ChartSeries();

        public ChartSeries RadarLine { get; } = new ChartSeries();

        public ChartSeries BoxPlot { get; } = new ChartSeries();

        public ChartSeries Bubble { get; } = new ChartSeries();

        public ChartSeries Bullet { get; } = new ChartSeries();

        public ChartSeries VerticalBullet { get; } = new ChartSeries();

        public ChartSeries Candlestick { get; } = new ChartSeries();

        public ChartSeries OHLC { get; } = new ChartSeries();

        public ChartSeries Funnel { get; } = new ChartSeries();

        public ChartSeries RangeColumn { get; } = new ChartSeries();

        public ChartSeries RangeBar { get; } = new ChartSeries();

        public ChartSeries Pie { get; } = new ChartSeries();

        public ChartSeries Donut { get; } = new ChartSeries();

        public ChartSeries Scatter { get; } = new ChartSeries();

        public ChartSeries ScatterLine { get; } = new ChartSeries();

        public ChartSeries PolarArea { get; } = new ChartSeries();

        public ChartSeries PolarLine { get; } = new ChartSeries();

        public ChartSeries PolarScatter { get; } = new ChartSeries();

        public ChartSeries Waterfall { get; } = new ChartSeries();

        public ChartSeries HorizontalWaterfall { get; } = new ChartSeries();


        public Dictionary<string, object> Serialize()
        {
            var settings = new Dictionary<string, object>();

            var area = Area.Serialize();
            if (area.Any())
            {
                settings["area"] = area;
            }

            var bar = Bar.Serialize();
            if (bar.Any())
            {
                settings["bar"] = bar;
            }

            var column = Column.Serialize();
            if (column.Any())
            {
                settings["column"] = column;
            }

            var line = Line.Serialize();
            if (line.Any())
            {
                settings["line"] = line;
            }

            var verticalArea = VerticalArea.Serialize();
            if (verticalArea.Any())
            {
                settings["verticalArea"] = verticalArea;
            }

            var verticalLine = VerticalLine.Serialize();
            if (verticalLine.Any())
            {
                settings["verticalLine"] = verticalLine;
            }

            var radarArea = RadarArea.Serialize();
            if (radarArea.Any())
            {
                settings["radarArea"] = radarArea;
            }

            var radarColumn = RadarColumn.Serialize();
            if (radarColumn.Any())
            {
                settings["radarColumn"] = radarColumn;
            }

            var radarLine = RadarLine.Serialize();
            if (radarLine.Any())
            {
                settings["radarLine"] = radarLine;
            }

            var boxPlot = BoxPlot.Serialize();
            if (boxPlot.Any())
            {
                settings["boxPlot"] = boxPlot;
            }

            var bubble = Bubble.Serialize();
            if (bubble.Any())
            {
                settings["bubble"] = bubble;
            }

            var bullet = Bullet.Serialize();
            if (bullet.Any())
            {
                settings["bullet"] = bullet;
            }

            var verticalBullet = VerticalBullet.Serialize();
            if (verticalBullet.Any())
            {
                settings["verticalBullet"] = verticalBullet;
            }

            var candlestick = Candlestick.Serialize();
            if (candlestick.Any())
            {
                settings["candlestick"] = candlestick;
            }

            var ohlc = OHLC.Serialize();
            if (ohlc.Any())
            {
                settings["ohlc"] = ohlc;
            }

            var funnel = Funnel.Serialize();
            if (funnel.Any())
            {
                settings["funnel"] = funnel;
            }

            var rangeColumn = RangeColumn.Serialize();
            if (rangeColumn.Any())
            {
                settings["rangeColumn"] = rangeColumn;
            }

            var rangeBar = RangeBar.Serialize();
            if (rangeBar.Any())
            {
                settings["rangeBar"] = rangeBar;
            }

            var pie = Pie.Serialize();
            if (pie.Any())
            {
                settings["pie"] = pie;
            }

            var donut = Donut.Serialize();
            if (donut.Any())
            {
                settings["donut"] = donut;
            }

            var scatter = Scatter.Serialize();
            if (scatter.Any())
            {
                settings["scatter"] = scatter;
            }

            var scatterLine = ScatterLine.Serialize();
            if (scatterLine.Any())
            {
                settings["scatterLine"] = scatterLine;
            }

            var polarArea = PolarArea.Serialize();
            if (polarArea.Any())
            {
                settings["polarArea"] = polarArea;
            }

            var polarLine = PolarLine.Serialize();
            if (polarLine.Any())
            {
                settings["polarLine"] = polarLine;
            }

            var polarScatter = PolarScatter.Serialize();
            if (polarScatter.Any())
            {
                settings["polarScatter"] = polarScatter;
            }

            var waterfall = Waterfall.Serialize();
            if (waterfall.Any())
            {
                settings["waterfall"] = waterfall;
            }

            var horizontalWaterfall = HorizontalWaterfall.Serialize();
            if (horizontalWaterfall.Any())
            {
                settings["horizontalWaterfall"] = horizontalWaterfall;
            }

            return settings;
        }
    }
}
