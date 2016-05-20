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
    public class GanttViewFactoryTests
    {
        private readonly Gantt<GanttTask, GanttDependency> component;
        private readonly GanttViewFactory<GanttTask, GanttDependency> viewFactory;

        public GanttViewFactoryTests()
        {
            component = new Gantt<GanttTask, GanttDependency>(TestHelper.CreateViewContext());
            viewFactory = new GanttViewFactory<GanttTask, GanttDependency>(component.Views);
        }

        [Fact]
        public void DayView_adds_day_type_view()
        {
            viewFactory.DayView();

            Assert.Equal(GanttViewType.Day, component.Views.First().Type);
        }

        [Fact]
        public void WeekView_adds_week_type_view()
        {
            viewFactory.WeekView();

            Assert.Equal(GanttViewType.Week, component.Views.First().Type);
        }

        [Fact]
        public void MonthView_adds_month_type_view()
        {
            viewFactory.MonthView();

            Assert.Equal(GanttViewType.Month, component.Views.First().Type);
        }

        [Fact]
        public void YearView_adds_year_type_view()
        {
            viewFactory.YearView();

            Assert.Equal(GanttViewType.Year, component.Views.First().Type);
        }
    }
}
