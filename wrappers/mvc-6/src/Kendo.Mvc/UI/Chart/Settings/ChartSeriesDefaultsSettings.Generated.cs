using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Defines the Chart series defaults settings
    /// </summary>
    public partial class ChartSeriesDefaultsSettings<T> where T : class
    {

        /// <summary>
        /// The Area series default settings.
        /// </summary>
        public ChartSeries<T> Area { get; } = new ChartSeries<T>();

        /// <summary>
        /// The Bar series default settings.
        /// </summary>
        public ChartSeries<T> Bar { get; } = new ChartSeries<T>();

        /// <summary>
        /// The Candlestick series default settings.
        /// </summary>
        public ChartSeries<T> Candlestick { get; } = new ChartSeries<T>();

        /// <summary>
        /// The Column series default settings.
        /// </summary>
        public ChartSeries<T> Column { get; } = new ChartSeries<T>();

        /// <summary>
        /// The Line series default settings.
        /// </summary>
        public ChartSeries<T> Line { get; } = new ChartSeries<T>();

        public IDictionary<string, object> Serialize()
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

            var candlestick = Candlestick.Serialize();

            if (candlestick.Any())
            {
                settings["candlestick"] = candlestick;
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

            return settings;
        }
    }
}
