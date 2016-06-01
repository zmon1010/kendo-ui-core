using System;
using Xunit;
using Kendo.Mvc.UI.Fluent;
using Kendo.Mvc.Tests;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Kendo.Mvc.UI.Tests
{
    public class GanttAssignmentsBuilderTests
    {
        private readonly Gantt<GanttTask, GanttDependency> component;
        private readonly GanttBuilder<GanttTask, GanttDependency> builder;

        public GanttAssignmentsBuilderTests()
        {
            component = new Gantt<GanttTask, GanttDependency>(TestHelper.CreateViewContext());
            builder = new GanttBuilder<GanttTask, GanttDependency>(component);
        }

        [Fact]
        public void Assignments_are_initialized()
        {
            Assert.NotNull(component.Assignments);
            Assert.IsType<GanttAssignmentsSettings>(component.Assignments);
        }

        [Fact]
        public void GanttAssignmentsSettings_initialize_dataSource()
        {
            Assert.NotNull(component.Assignments.DataSource);
            Assert.IsType<DataSource>(component.Assignments.DataSource);
        }

        [Fact]
        public void DataTaskIdField_sets_the_corresponding_property()
        {
            var dataTaskId = "ID";
            builder.Assignments<GanttAssignment>(a => a.DataTaskIdField(dataTaskId));

            Assert.Equal(dataTaskId, component.Assignments.DataTaskIdField);
        }

        [Fact]
        public void DataResourceIdField_sets_the_corresponding_property()
        {
            var dataResourceId = "RID";
            builder.Assignments<GanttAssignment>(a => a.DataResourceIdField(dataResourceId));

            Assert.Equal(dataResourceId, component.Assignments.DataResourceIdField);
        }

        [Fact]
        public void DataValueField_sets_the_corresponding_property()
        {
            var dataValueField = "Value";
            builder.Assignments<GanttAssignment>(a => a.DataValueField(dataValueField));

            Assert.Equal(dataValueField, component.Assignments.DataValueField);
        }

        [Fact]
        public void BindTo_serialize_data()
        {
            var data = new[] {
                new { Text = "Alex", id = 1, Color = "#f8a398" } ,
                new { Text = "Bob", id = 2, Color = "#51a0ed" } ,
                new { Text = "Charlie", id = 3, Color = "#56ca85" }
            };

            builder.Assignments<GanttAssignment>(r => r.BindTo(data));

            component.Assignments.DataSource.Data.ShouldBeSameAs(data);
        }
    }
}