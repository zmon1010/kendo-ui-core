using System;
using Xunit;
using Kendo.Mvc.UI.Fluent;
using Kendo.Mvc.Tests;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Kendo.Mvc.UI.Tests
{
    public class GanttResourcesBuilderTests
    {
        private readonly Gantt<GanttTask, GanttDependency> component;
        private readonly GanttBuilder<GanttTask, GanttDependency> builder;

        public GanttResourcesBuilderTests()
        {
            component = new Gantt<GanttTask, GanttDependency>(TestHelper.CreateViewContext());
            builder = new GanttBuilder<GanttTask, GanttDependency>(component);
        }

        [Fact]
        public void Resources_are_initialized()
        {
            Assert.NotNull(component.Resources);
            Assert.IsType<GanttResourcesSettings>(component.Resources);
        }

        [Fact]
        public void GanttResourceSettings_initialize_dataSource()
        {
            Assert.NotNull(component.Resources.DataSource);
            Assert.IsType<DataSource>(component.Resources.DataSource);
        }

        [Fact]
        public void DataColorField_sets_the_corresponding_property()
        {
            var dataColorField = "Color";
            builder.Resources(r => r.DataColorField(dataColorField));

            Assert.Equal(dataColorField, component.Resources.DataColorField);
        }

        [Fact]
        public void DataTextField_sets_the_corresponding_property()
        {
            var dataTextField = "Text";
            builder.Resources(r => r.DataTextField(dataTextField));

            Assert.Equal(dataTextField, component.Resources.DataTextField);
        }

        [Fact]
        public void Field_sets_the_corresponding_property()
        {
            var field = "Resources";
            builder.Resources(r => r.Field(field));

            Assert.Equal(field, component.Resources.Field);
        }

        [Fact]
        public void BindTo_serialize_data()
        {
            var data = new[] {
                new { Text = "Alex", id = 1, Color = "#f8a398" } ,
                new { Text = "Bob", id = 2, Color = "#51a0ed" } ,
                new { Text = "Charlie", id = 3, Color = "#56ca85" }
            };

            builder.Resources(r => r.BindTo(data));

            component.Resources.DataSource.Data.ShouldBeSameAs(data);
        }
    }
}