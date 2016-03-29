using System.Collections.Generic;
using Kendo.Mvc.UI;
using Kendo.Mvc.UI.Fluent;
using Kendo.Mvc.UI.Tests;
using Xunit;

namespace Kendo.Mvc.Tests
{
    public class XAxisPlotBandFactoryTests
    {
        private readonly List<ChartXAxisPlotBand<SalesData>> items;
        private readonly ChartXAxisPlotBandFactory<SalesData> factory;

        public XAxisPlotBandFactoryTests()
        {
            items = new List<ChartXAxisPlotBand<SalesData>>();
            factory = new ChartXAxisPlotBandFactory<SalesData>(items);
        }

        [Fact]
        public void Builder_should_set_Color()
        {
            var from = 1.1;
            var to = 2.2;
            var color = "red";

            factory.Add(from, to, color);

            items[0].From.ShouldEqual(from);
            items[0].To.ShouldEqual(to);
            items[0].Color.ShouldEqual(color);
        }        
    }
}
