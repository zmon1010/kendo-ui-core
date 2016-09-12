namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="ChartNavigatorSelectionBuilder"/>.
    /// </summary>
    public class ChartNavigatorSelectionBuilder : IHideObjectMembers
    {
        private readonly ChartNavigatorSelection selection;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartNavigatorSelectionBuilder" /> class.
        /// </summary>
        /// <param name="chartLegend">The chart legend.</param>
        public ChartNavigatorSelectionBuilder(ChartNavigatorSelection chartSelection)
        {
            selection = chartSelection;
        }

        /// <summary>
        /// Sets the selection lower boundary
        /// </summary>
        /// <param name="fromDate">The selection lower boundary.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().StockChart(Model)
        ///             .Name("Chart")
        ///             . .Navigator(nav => nav.Select(x => x.From(DateTime.Today)))
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public ChartNavigatorSelectionBuilder From(DateTime fromDate)
        {
            selection.From = fromDate;
            return this;
        }

        /// <summary>
        /// Sets the selection upper boundary
        /// </summary>
        /// <param name="toDate">The selection upper boundary.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().StockChart(Model)
        ///             .Name("Chart")
        ///             . .Navigator(nav => nav.Select(x => x.To(DateTime.Today)))
        ///             )
        /// %&gt;
        /// %&gt;
        /// </code>
        /// </example>
        public ChartNavigatorSelectionBuilder To(DateTime toDate)
        {
            selection.To = toDate;
            return this;
        }
        
        /// <summary>
        /// Enable or disable mouse wheel zooming.
        /// </summary>
        public ChartNavigatorSelectionBuilder Mousewheel(bool enabled)
        {
            selection.Mousewheel.Enabled = enabled;

            return this;
        }

        /// <summary>
        /// Configures the mousewheel selection options
        /// </summary>
        /// <param name="configurator">The mousewheel zoom options</param>
        public ChartNavigatorSelectionBuilder Mousewheel(Action<ChartSelectionMousewheelBuilder> configurator)
        {
            configurator(new ChartSelectionMousewheelBuilder(selection.Mousewheel));
            return this;
        }
    }
}
