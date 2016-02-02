using System;
using Kendo.Mvc.UI.Fluent;
using Xunit;

namespace Kendo.Mvc.UI.Tests
{
    public class CalendarBuilderTests
    {
        private Calendar component;
        private CalendarBuilder builder;

        public CalendarBuilderTests()
        {
            component = CalendarTestHelper.CreateCalendar(null);
            builder = new CalendarBuilder(component);
        }

        [Fact]
        public void DisableDates_sets_strings()
        {
            var values = new string[] { "foo", "bar" };

            builder.DisableDates(values);
            component.DisableDates.ShouldEqual(values);
        }

        [Fact]
        public void DisableDates_with_strings_returns_builder()
        {
            builder.DisableDates(new string[] { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void DisableDates_sets_days()
        {
            builder.DisableDates(DayOfWeek.Thursday, DayOfWeek.Saturday);
            component.DisableDates.ShouldEqual(new string[] { "th", "sa" });
        }

        [Fact]
        public void DisableDates_with_days_returns_builder()
        {
            builder.DisableDates(new DayOfWeek[] { DayOfWeek.Thursday, DayOfWeek.Saturday }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void DisableDates_sets_handler()
        {
            builder.DisableDates("foo");
            component.DisableDatesHandler.HandlerName.ShouldEqual("foo");
        }

        [Fact]
        public void DisableDates_with_handler_returns_builder()
        {
            builder.DisableDates("foo").ShouldBeSameAs(builder);
        }
    }
}