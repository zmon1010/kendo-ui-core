using System;
using Xunit;
using Kendo.Mvc.UI.Fluent;
using Kendo.Mvc.Tests;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Kendo.Mvc.UI.Tests
{
    public class GanttColumnTests
    {
        public GanttColumnTests()
        {

        }

        [Fact]
        public void Field_is_set()
        {
            var column = new GanttBoundColumn<GanttTask, GanttDependency, string>(c => c.Title, new EmptyModelMetadataProvider());

            column.Field.ShouldEqual("title");
        }

        [Fact]
        public void Field_is_set_camelcase_for_IGanttTask_interface_properties()
        {
            var column = new GanttBoundColumn<GanttTask, GanttDependency, string>(c => c.Title, new EmptyModelMetadataProvider());

            column.Field.ShouldEqual("title");
        }

        [Fact]
        public void Field_is_set_for_non_IGanttTask_interface_properties()
        {
            var column = new GanttBoundColumn<GanttTask, GanttDependency, string>(c => c.CustomProperty, new EmptyModelMetadataProvider());

            column.Field.ShouldEqual("CustomProperty");
        }

        [Fact]
        public void Title_is_set()
        {
            var column = new GanttBoundColumn<GanttTask, GanttDependency, string>(c => c.Title, new EmptyModelMetadataProvider());

            column.Title.ShouldEqual("Title");
        }
    }
}