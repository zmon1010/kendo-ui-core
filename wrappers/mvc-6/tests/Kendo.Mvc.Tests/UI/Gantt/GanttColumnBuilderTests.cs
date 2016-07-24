using System;
using Xunit;
using Kendo.Mvc.UI.Fluent;
using Kendo.Mvc.Tests;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Kendo.Mvc.UI.Tests
{
    public class GanttColumnBuilderTests
    {
        private readonly GanttColumn<GanttTask, GanttDependency> component;
        private readonly GanttColumnBuilder<GanttTask, GanttDependency> builder;

        public GanttColumnBuilderTests()
        {
            component = new GanttColumn<GanttTask, GanttDependency>();
            builder = new GanttColumnBuilder<GanttTask, GanttDependency>(component);
        }

        [Fact]
        public void Format_is_Url_Decoded()
        {
            builder.Format(System.Net.WebUtility.UrlEncode("{0}"));

            component.Format.ShouldEqual("{0}");
        }

        [Fact]
        public void Width_with_numeric_values_sets_width_in_pixels()
        {
            builder.Width(20);

            component.Width.ShouldEqual("20px");
        }
    }
}