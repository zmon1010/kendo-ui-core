namespace Kendo.Mvc.UI.Tests
{

    using System;
    using Xunit;
    using Kendo.Mvc.UI.Fluent;
    using Kendo.Mvc.Tests;

    public class DatePickerBuilderTests
    {
        private readonly DatePicker component;
        private readonly DatePickerBuilder builder;

        public DatePickerBuilderTests()
        {
            component = new DatePicker(TestHelper.CreateViewContext());
            builder = new DatePickerBuilder(component);
        }

        [Fact]
        public void Animation_with_false_argument_disables_animation()
        {
            builder.Animation(false);

            component.Animation.Enabled.ShouldEqual(false);
        }

        [Fact]
        public void Animation_sets_animation_effects_of_the_datepicker()
        {
            builder.Animation(b => b.Open(o => o.Duration(200).Expand()));

            component.Animation.Open.Duration.ShouldEqual(200);
            component.Animation.Open.Container[0].ShouldEqual("expand");
        }

        [Fact]
        public void Animation_returns_builder()
        {
            builder.Animation(false).ShouldBeType<DatePickerBuilder>();
        }

        [Fact]
        public void ClientEvents_sets_events_of_the_datepicker()
        {
            builder.Events(b => b.Change("change"));

            var @event = component.Events["change"] as ClientHandlerDescriptor;

            Assert.NotNull(@event);

            @event.HandlerName.ShouldEqual("change");
        }

        [Fact]
        public void ClientEvents_returns_builder()
        {
            builder.Events(b => b.Change("change")).ShouldBeType<DatePickerBuilder>();
        }

        [Fact]
        public void Enable_method_sets_enabled_property()
        {
            builder.Enable(false);

            component.Enabled.ShouldEqual(false);
        }

        [Fact]
        public void Enable_method_returns_DatePickerBuilder()
        {
            builder.Enable(true).ShouldBeType<DatePickerBuilder>();
        }

        [Fact]
        public void Format_method_sets_Format_property()
        {
            var format = "dd/MM/yyyy";
            
            builder.Format(format);

            component.Format.ShouldEqual(format);
        }

        [Fact]
        public void Format_method_returns_DatePickerBuilder()
        {
            builder.Format("dd").ShouldBeType<DatePickerBuilder>();
        }

        [Fact]
        public void Footer_method_sets_footer_template()
        {
            var template = "#= test #";

            builder.Footer(template);

            component.Footer.ShouldEqual(template);
        }

        [Fact]
        public void Footer_method_returns_DatePickerBuilder()
        {
            builder.Footer("").ShouldBeType<DatePickerBuilder>();
        }

        [Fact]
        public void Depth_method_sets_depth_property()
        {
            builder.Depth(CalendarView.Year);

            component.Depth.Value.ShouldEqual(CalendarView.Year);            
        }

        [Fact]
        public void Depth_method_returns_DatePickerBuilder()
        {
            builder.Depth(CalendarView.Decade).ShouldBeType<DatePickerBuilder>();
        }

        [Fact]
        public void Start_method_sets_start_property()
        {
            builder.Start(CalendarView.Year);

            component.Start.Value.ShouldEqual(CalendarView.Year);
        }

        [Fact]
        public void Start_method_returns_DatePickerBuilder()
        {
            builder.Start(CalendarView.Decade).ShouldBeType<DatePickerBuilder>();
        }

        [Fact]
        public void MonthTemplate_sets_month_content_template()
        {
            builder.MonthTemplate("#= test #");

            component.MonthTemplate.Content.ShouldEqual("#= test #");
        }

        [Fact]
        public void MonthTemplate_sets_month_template_using_builder()
        {
            builder.MonthTemplate(month => month.Empty("empty").Content("content"));

            component.MonthTemplate.Empty.ShouldEqual("empty");
            component.MonthTemplate.Content.ShouldEqual("content");
        }

        [Fact]
        public void ParseFormats_method_sets_ParseFormats_list()
        {
            builder.ParseFormats(new string[] { "mm/dd/yyy" });
            builder.ParseFormats(new string[] { "mm/DD/yyyy" });

            component.ParseFormats.Length.ShouldEqual(1);
        }

        [Fact]
        public void ParseFormats_method_returns_DatePickerBuilder()
        {
            builder.ParseFormats(new string[] {}).ShouldBeType<DatePickerBuilder>();
        }

        [Fact]
        public void Value_method_sets_value_property()
        {
            var date = DateTime.Today;

            builder.Value(date);

            component.Value.ShouldEqual(date);
        }

        [Fact]
        public void Value_method_parses_string_argument()
        {
            builder.Value("10/10/2000");

            component.Value.Value.Year.ShouldEqual(2000);
        }
        
        [Fact]
        public void Value_method_returns_DatePickerBuilder()
        {
            builder.Value("").ShouldBeType<DatePickerBuilder>();
        }

        [Fact]
        public void Min_method_sets_min_property()
        {
            var date = new DateTime();

            builder.Min(date);

            component.Min.ShouldEqual(date);
        }

        [Fact]
        public void Min_method_parses_string_argument()
        {
            builder.Min("10/10/2000");

            component.Min.Value.Year.ShouldEqual(2000);
        }

        [Fact]
        public void Min_method_returns_DatePickerBuilder()
        {
            builder.Min(DateTime.Today).ShouldBeType<DatePickerBuilder>();
        }

        [Fact]
        public void Max_method_sets_max_property()
        {
            var date = new DateTime();

            builder.Max(date);

            component.Max.ShouldEqual(date);
        }

        [Fact]
        public void Max_method_parses_string_argument()
        {
            builder.Max("10/10/2000");

            component.Max.Value.Year.ShouldEqual(2000);
        }

        [Fact]
        public void Max_method_returns_DatePickerBuilder()
        {
            builder.Max(DateTime.Today).ShouldBeType<DatePickerBuilder>();
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