using System;
using Xunit;
using Kendo.Mvc.UI;
using Kendo.Mvc.UI.Fluent;
using Kendo.Mvc.Tests;

namespace Kendo.Mvc.UI.Tests
{
    public class ChartSeriesFactoryTests
	{
        private readonly Chart chart;
		private readonly ChartSeriesFactory factory;

		public ChartSeriesFactoryTests()
		{
            chart = new Chart(TestHelper.CreateViewContext());
            factory = new ChartSeriesFactory(chart.Series);
		}

		[Fact]
		public void Creates_area_series()
		{
            var series = factory.Area(null);
            chart.Series[0].Type.ShouldEqual("area");
        }

        [Fact]
        public void Sets_area_series_data()
        {
            var data = new int[] { 1, 2, 3 };
            var series = factory.Area(data);
            chart.Series[0].Data.ShouldBeSameAs(data);
        }
    }
}