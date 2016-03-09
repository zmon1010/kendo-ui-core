using System;
using Xunit;
using Kendo.Mvc.UI.Fluent;
using Kendo.Mvc.Tests;
using System.Collections.Generic;
using Microsoft.AspNet.Mvc.Rendering;
using Moq;

namespace Kendo.Mvc.UI.Tests
{
    public class GanttToolbarFactoryTests
    {
        private readonly Gantt<GanttTask, GanttDependency> component;
        private readonly Mock<GanttToolbarFactory<GanttTask, GanttDependency>> toolbarFactoryMoq;

        public GanttToolbarFactoryTests()
        {
            component = new Gantt<GanttTask, GanttDependency>(TestHelper.CreateViewContext());
            toolbarFactoryMoq = new Mock<GanttToolbarFactory<GanttTask, GanttDependency>>(component.Toolbar)
            {
                CallBase = true
            };
        }

        [Fact]
        public void Add_falls_back_to_Custom()
        {
            toolbarFactoryMoq.Object.Add();

            toolbarFactoryMoq.Verify(v => v.Custom());
        }
    }
}
