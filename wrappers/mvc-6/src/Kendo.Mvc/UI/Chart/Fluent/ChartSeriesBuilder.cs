using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeries
    /// </summary>
    public partial class ChartSeriesBuilder<T>
        where T : class
    {
        public ChartSeriesBuilder(ChartSeries<T> container)
        {
            Container = container;
        }

        protected ChartSeries<T> Container
        {
            get;
            private set;
        }

        // Place custom settings here

        /// <summary>
        /// The aggregate function to apply for date series.This function is used when a category (an year, month, etc.) contains two or more points.
        /// The function return value is displayed instead of the individual points.The supported values are:
        /// </summary>
        /// <param name="configurator">The configurator for the aggregates setting.</param>
        public ChartSeriesBuilder<T> Aggregate(Action<ChartSeriesAggregateSettingsBuilder<T>> configurator)
        {

            Container.Aggregates.Chart = Container.Chart;
            configurator(new ChartSeriesAggregateSettingsBuilder<T>(Container.Aggregates));

            return this;
        }

        /// <summary>
        /// A boolean value indicating if the series should be stacked.
        /// A string value is interpreted as series.stack.group.
        /// </summary>
        /// <param name="configurator">The configurator for the stack setting.</param>
        public ChartSeriesBuilder<T> Stack(ChartStackType value)
        {
            Container.Stack.Type = value;

            return this;
        }
    }
}
