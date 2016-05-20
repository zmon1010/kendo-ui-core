using System;
using Xunit;
using Kendo.Mvc.UI.Fluent;
using Kendo.Mvc.Tests;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;
using Moq;
using System.Linq;

namespace Kendo.Mvc.UI.Tests
{
    public class GanttColumnFactoryTests
    {
        private readonly Gantt<GanttTask, GanttDependency> component;
        private readonly GanttColumnFactory<GanttTask, GanttDependency> columnFactory;

        public GanttColumnFactoryTests()
        {
            component = new Gantt<GanttTask, GanttDependency>(TestHelper.CreateViewContext());
            columnFactory = new GanttColumnFactory<GanttTask, GanttDependency>(component.Columns)
            {
                Gantt = component
            };
        }

        [Fact]
        public void Bound_with_string_parameter_creates_GanttBoundColumn()
        {
            columnFactory.Bound("title");

            component.Columns.First().ShouldBeType<GanttBoundColumn<GanttTask, GanttDependency, string>>();
        }

        [Fact]
        public void Bound_with_string_parameter_returns_GanttBoundColumnBuilder()
        {
            columnFactory.Bound("title").ShouldBeType<GanttBoundColumnBuilder<GanttTask, GanttDependency>>();
        }

        [Fact]
        public void Bound_with_type_and_string_parameters_creates_GanttBoundColumn()
        {
            columnFactory.Bound(typeof(string), "title");

            component.Columns.First().ShouldBeType<GanttBoundColumn<GanttTask, GanttDependency, string>>();
        }

        [Fact]
        public void Bound_with_type_and_string_parameters_returns_GanttBoundColumnBuilder()
        {
            columnFactory.Bound(typeof(string), "title").ShouldBeType<GanttBoundColumnBuilder<GanttTask, GanttDependency>>();
        }

        [Fact]
        public void Bound_with_expression_parameter_creates_GanttBoundColumn()
        {
            columnFactory.Bound(c => c.Title);

            component.Columns.First().ShouldBeType<GanttBoundColumn<GanttTask, GanttDependency, string>>();
        }

        [Fact]
        public void Bound_with_expression_parameter_returns_GanttBoundColumnBuilder()
        {
            columnFactory.Bound(c => c.Title).ShouldBeType<GanttBoundColumnBuilder<GanttTask, GanttDependency>>();
        }

        [Fact]
        public void Resources_creates_GanttResourceColumn()
        {
            columnFactory.Resources("resources");

            component.Columns.First().ShouldBeType<GanttResourceColumn<GanttTask, GanttDependency>>();
        }

        [Fact]
        public void Resources_returns_GanttBoundColumnBuilder()
        {
            columnFactory.Resources("resources").ShouldBeType<GanttResourceColumnBuilder<GanttTask, GanttDependency>>();
        }
    }
}
