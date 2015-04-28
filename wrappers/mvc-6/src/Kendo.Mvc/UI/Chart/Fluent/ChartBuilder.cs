using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring the Kendo UI Chart
    /// </summary>
    public partial class ChartBuilder: WidgetBuilderBase<Chart, ChartBuilder>
        
    {
        public ChartBuilder(Chart component) : base(component)
        {
        }

        /// <summary>
        /// The chart title.
        /// </summary>
        /// <param name="title">The value of the Chart title</param>
        public ChartBuilder Title(string title)
        {
            Container.Title.Text = title;
            return this;
        }
    }
}

