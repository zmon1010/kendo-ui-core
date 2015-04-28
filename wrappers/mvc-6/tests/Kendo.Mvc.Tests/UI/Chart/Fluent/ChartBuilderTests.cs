using System;
using Xunit;
using Kendo.Mvc.UI;
using Kendo.Mvc.UI.Fluent;
using Kendo.Mvc.Tests;

namespace Kendo.Mvc.UI.Tests
{
    public class ChartBuilderTests
	{
        private readonly Chart chart;
		private readonly ChartBuilder builder;

		public ChartBuilderTests()
		{
            chart = new Chart(TestHelper.CreateViewContext());
            builder = new ChartBuilder(chart);
		}

		[Fact]
		public void Sets_title()
		{
            builder.Title("Foo");
            chart.Title.Text.ShouldEqual("Foo");
        }

        [Fact]
        public void Title_returns_builder()
        {
            builder.Title("Foo").ShouldBeSameAs(builder);
        }
    }
}