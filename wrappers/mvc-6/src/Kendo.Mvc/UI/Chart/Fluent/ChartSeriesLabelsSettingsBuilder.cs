using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeriesLabelsSettings
    /// </summary>
    public partial class ChartSeriesLabelsSettingsBuilder<T>
        where T : class
    {
        public ChartSeriesLabelsSettingsBuilder(ChartSeriesLabelsSettings<T> container)
        {
            Container = container;
        }

        protected ChartSeriesLabelsSettings<T> Container
        {
            get;
            private set;
        }

        // Place custom settings here

        /// <summary>
        /// Specifies the position of the labels.
        /// </summary>
        /// <param name="value">The value for Position</param>
        public ChartSeriesLabelsSettingsBuilder<T> Position(ChartPieLabelsPosition value)
        {
            try
            {
                Container.Position = (ChartSeriesLabelsPosition?)Enum.Parse(typeof(ChartSeriesLabelsPosition), value.ToString());
            }
            catch (Exception)
            {
            }

            return this;
        }
    }
}
