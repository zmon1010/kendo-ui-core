namespace Kendo.Mvc.UI.Tests
{

    using System;
    using Xunit;
    using Kendo.Mvc.UI.Fluent;
    using System.Collections.Generic;

    public class DateTimePickerBuilderTests
    {
        private readonly DateTimePicker dateTimePicker;
        private readonly DateTimePickerBuilder builder;

        public DateTimePickerBuilderTests()
        {
            dateTimePicker = DateTimePickerTestHelper.CreateDateTimePicker(null);
            builder = new DateTimePickerBuilder(dateTimePicker);
        }
                
        [Fact]
        public void DisableDates_sets_strings()
        {
            var values = new string[] { "foo", "bar" };

            builder.DisableDates(values);
            
            dateTimePicker.DisableDates.ShouldEqual(values);
        }

        [Fact]
        public void DisableDates_with_strings_returns_builder()
        {
            builder.DisableDates(new string[] { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void DisableDates_sets_days_of_week()
        {
            builder.DisableDates(DayOfWeek.Thursday, DayOfWeek.Saturday);
            dateTimePicker.DisableDates.ShouldEqual(new string[] { "th", "sa" });
        }

        [Fact]
        public void DisableDates_with_days_of_week_returns_builder()
        {
            builder.DisableDates(new DayOfWeek[] { DayOfWeek.Thursday, DayOfWeek.Saturday }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void DisableDates_sets_handler()
        {
            builder.DisableDates("handler");
            dateTimePicker.DisableDatesHandler.HandlerName.ShouldEqual("handler");
        }

        [Fact]
        public void DisableDates_with_handler_returns_builder()
        {
            builder.DisableDates("handler").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Footer_method_sets_footer_template()
        {
            var template = "#= test #";

            builder.Footer(template);

            dateTimePicker.Footer.ShouldEqual(template);
        }

        [Fact]
        public void Footer_method_returns_DateTimePickerBuilder()
        {
            builder.Footer("").ShouldBeType<DateTimePickerBuilder>();
        }

        [Fact]
        public void Depth_method_sets_depth_property()
        {
            builder.Depth(CalendarView.Year);

            dateTimePicker.Depth.ShouldEqual("year");
        }

        [Fact]
        public void Depth_method_returns_DateTimePickerBuilder()
        {
            builder.Depth(CalendarView.Decade).ShouldBeType<DateTimePickerBuilder>();
        }

        [Fact]
        public void Start_method_sets_start_property()
        {
            builder.Start(CalendarView.Year);

            dateTimePicker.Start.ShouldEqual("year");
        }

        [Fact]
        public void Start_method_returns_DateTimePickerBuilder()
        {
            builder.Start(CalendarView.Decade).ShouldBeType<DateTimePickerBuilder>();
        }

        [Fact]
        public void MonthTemplate_sets_month_content_template()
        {
            builder.MonthTemplate("#= test #");

            dateTimePicker.MonthTemplate.Content.ShouldEqual("#= test #");
        }

        [Fact]
        public void MonthTemplate_sets_month_template_using_builder()
        {
            builder.MonthTemplate(month => month.Empty("empty").Content("content"));

            dateTimePicker.MonthTemplate.Empty.ShouldEqual("empty");
            dateTimePicker.MonthTemplate.Content.ShouldEqual("content");
        }

        [Fact]
        public void Interval_sets_interval_property()
        {
            builder.Interval(10);

            dateTimePicker.Interval.ShouldEqual(10);
        }

        [Fact]
        public void Interval_method_returns_DateTimePickerBuilder()
        {
            builder.Interval(10).ShouldBeType<DateTimePickerBuilder>();
        }

        [Fact]
        public void BindTo_method_sets_Dates_property()
        {
            builder.BindTo(new List<DateTime>() { DateTime.Today });

            dateTimePicker.Dates.Count.ShouldEqual(1);
        }

        [Fact]
        public void BindTo_method_returns_DateTimePickerBuilder()
        {
            builder.BindTo(new List<DateTime>()).ShouldBeType<DateTimePickerBuilder>();
        }
    }
}