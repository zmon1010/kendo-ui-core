namespace Kendo.Mvc.UI.Html
{
    public class ChartHtmlBuilder<T> : HtmlBuilderBase where T : class
    {
        private readonly Chart<T> chart;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartHtmlBuilder{T}" /> class.
        /// </summary>
        /// <param name="component">The Chart component.</param>
        public ChartHtmlBuilder(Chart<T> component)
        {
            chart = component;
        }

        /// <summary>
        /// Creates the chart top-level div.
        /// </summary>
        public IHtmlNode CreateChart()
        {
            return new HtmlElement("div")
                .Attributes(chart.HtmlAttributes)
                .PrependClass("k-chart");
        }

        /// <summary>
        /// Builds the Chart component markup.
        /// </summary>
        protected override IHtmlNode BuildCore()
        {
            return CreateChart();
        }
    }
}
