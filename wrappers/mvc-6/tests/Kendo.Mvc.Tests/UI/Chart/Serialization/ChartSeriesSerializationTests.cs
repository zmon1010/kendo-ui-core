using System;
using Xunit;
using Kendo.Mvc.UI;
using Kendo.Mvc.UI.Fluent;
using Kendo.Mvc.Tests;

namespace Kendo.Mvc.UI.Tests
{
    public class ChartSeriesSerializationTests
	{
		private readonly ChartSeries series;

		public ChartSeriesSerializationTests()
		{
            series = new ChartSeries();
		}

		[Fact]
		public void Serializes_Data()
		{
            var data = new int[] { 1, 2, 3 };
            series.Data = data;
            series.Serialize()["data"].ShouldBeSameAs(data);
        }

        [Fact]
        public void Does_not_serialize_empty_data()
        {
            series.Serialize().ContainsKey("data").ShouldBeFalse();
        }
    }
}