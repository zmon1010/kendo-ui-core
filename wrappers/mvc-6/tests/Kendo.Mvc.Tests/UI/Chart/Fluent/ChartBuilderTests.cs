using System;
using Xunit;
using Kendo.Mvc.UI;
using Kendo.Mvc.UI.Fluent;
using Kendo.Mvc.Tests;

namespace Kendo.Mvc.UI.Tests
{
    public class ChartBuilderTests
	{
        private readonly Chart<object> chart;
		private readonly ChartBuilder<object> builder;

		public ChartBuilderTests()
		{
            chart = new Chart<object>(TestHelper.CreateViewContext());
            builder = new ChartBuilder<object>(chart);
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
        
        [Fact]
        public void DataSource_should_return_builder()
        {
            builder.DataSource(delegate { }).ShouldBeSameAs(builder);
        }
        
        [Fact]
        public void Chart_should_set_categoryAxis_categories()
        {
            var categories = new string[] { "category1", "category2" };

            builder.CategoryAxis(axis => axis.Categories(categories));

            chart.CategoryAxis[0].Categories.ShouldEqual(categories);
        }

        [Fact]
        public void CategoryAxis_should_return_builder()
        {
            builder.CategoryAxis(delegate { }).ShouldBeSameAs(builder);
        }
    }
}