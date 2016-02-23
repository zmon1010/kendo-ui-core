using System;
using Xunit;
using Kendo.Mvc.UI;
using Kendo.Mvc.UI.Fluent;
using Kendo.Mvc.Tests;

namespace Kendo.Mvc.UI.Tests
{
    public class ChartCategoryAxisSerializationTests
    {
        private readonly ChartCategoryAxis<object> categoryAxis;

        public ChartCategoryAxisSerializationTests()
        {
            categoryAxis = new ChartCategoryAxis<object>();
        }

        [Fact]
        public void Justify_should_be_serialized_as_justified()
        {
            var value = true;

            categoryAxis.Justify = value;

            categoryAxis.Serialize()["justified"].ShouldEqual(value);
        }
    }
}