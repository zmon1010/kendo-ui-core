using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring the Kendo UI PivotGrid
    /// </summary>
    public partial class PivotGridBuilder<T>: WidgetBuilderBase<PivotGrid<T>, PivotGridBuilder<T>>
        where T : class 
    {
        public PivotGridBuilder(PivotGrid<T> component) : base(component)
        {
        }

        /// <summary>
        /// Use it to set the Id of the PivotConfigurator.
        /// </summary>
        /// <param name="configurator">The configurator</param>
        public PivotGridBuilder<T> Configurator(string configurator)
        {
            Component.Configurator = configurator;

            return this;
        }

        /// <summary>
        /// Sets the data source configuration of the grid.
        /// </summary>
        /// <param name="configurator">The lambda which configures the data source</param>
        public PivotGridBuilder<T> DataSource(Action<PivotDataSourceBuilder<T>> configurator)
        {
            configurator(new PivotDataSourceBuilder<T>(Component.DataSource, Component.ViewContext, Component.UrlGenerator));

            return this;
        }

        /// <summary>
        /// Binds the pivotGrid to a list of objects
        /// </summary>
        /// <param name="dataSource">The data source.</param>
        public PivotGridBuilder<T> BindTo(IEnumerable<T> dataSource)
        {
            Component.DataSource.Data = dataSource;

            return this;
        }
    }
}

