using System;
using Xunit;
using Kendo.Mvc.UI;
using Kendo.Mvc.UI.Fluent;
using Kendo.Mvc.Tests;

namespace Kendo.Mvc.UI.Tests
{
    public class StackSettingsSerializationTests
    {
        private readonly ChartSeriesStackSettings<object> settings;

        public StackSettingsSerializationTests()
        {
            settings = new ChartSeriesStackSettings<object>();
        }

        [Fact]
        public void Default_Type_should_not_be_serialized()
        {
            settings.Serialize().ContainsKey("type").ShouldBeFalse();
        }

        [Fact]
        public void Type_should_be_serialized()
        {
            settings.Type = ChartStackType.Stack100;

            settings.Serialize()["type"].ShouldEqual("100%");
        }
    }
}