using System;
using Xunit;
using Kendo.Mvc.UI;
using Kendo.Mvc.UI.Fluent;
using Kendo.Mvc.Tests;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Tests
{
    public class EditorToolBuilderTests
    {
        private readonly EditorTool tool;
        private readonly EditorToolBuilder builder;

        public EditorToolBuilderTests()
        {
            tool = new EditorTool();
            builder = new EditorToolBuilder(tool);
        }


        [Fact]
        public void Builder_should_set_Tooltip()
        {
            var value = "value";

            builder.Tooltip(value);

            tool.Tooltip.ShouldEqual(value);
        }

        [Fact]
        public void Tooltip_should_return_builder()
        {
            builder.Tooltip("value").ShouldBeSameAs(builder);
        }
    }
}