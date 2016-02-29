using System;
using Xunit;
using Kendo.Mvc.UI;
using Kendo.Mvc.UI.Fluent;
using Kendo.Mvc.Tests;

namespace Kendo.Mvc.UI.Tests
{
    public class LineSettingsSerializationTests
    {
        private readonly ChartSeriesLineSettings<object> settings;

        public LineSettingsSerializationTests()
        {
            settings = new ChartSeriesLineSettings<object>();
        }

        [Fact]
        public void Default_Style_should_not_be_serialized()
        {
            settings.Serialize().ContainsKey("style").ShouldBeFalse();
        }

        [Fact]
        public void Style_should_be_serialized()
        {
            settings.Style = ChartAreaStyle.Smooth;

            settings.Serialize()["style"].ShouldEqual("smooth");
        }
    }
}