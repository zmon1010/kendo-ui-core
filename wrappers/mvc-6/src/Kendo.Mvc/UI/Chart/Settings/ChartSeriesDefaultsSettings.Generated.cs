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

        public IDictionary<string, object> Serialize()
        {
            var settings = new Dictionary<string, object>();
            var area = Area.Serialize();
            
            if (area.Any())
            {
                settings["area"] = area;
            }
            return settings;
        }
    }
}
