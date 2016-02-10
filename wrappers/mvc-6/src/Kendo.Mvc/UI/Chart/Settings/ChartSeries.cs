using System.Collections;
using System.Collections.Generic;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI ChartSeries class
    /// </summary>
    public partial class ChartSeries<T> where T : class 
    {
        public IEnumerable Data { get; set; }

        public Dictionary<string, object> Serialize()
        {
            var settings = SerializeSettings();

            if (Data != null)
            {
                settings["data"] = Data;
            }

            return settings;
        }
    }
}
