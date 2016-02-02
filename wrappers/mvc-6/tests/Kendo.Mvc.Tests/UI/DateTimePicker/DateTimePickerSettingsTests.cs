using System;
using Kendo.Mvc.Extensions.Tests;
using Kendo.Mvc.Tests;
using Xunit;

namespace Kendo.Mvc.UI.Html.Tests
{
    public class DateTimePickerSettingsTests
    {
        private DateTimePicker component;

        public DateTimePickerSettingsTests()
        {
            component = new DateTimePicker(TestHelper.CreateViewContext());
        }

        [Fact]
        public void Does_not_serialize_disable_dates_default_value()
        {
            component.AssertSettings(settings =>
            {
                settings.ContainsKey("disableDates").ShouldBeFalse();
            });
        }

        [Fact]
        public void Serializes_disable_dates_abbreviations()
        {
            component.DisableDates = new string[] { "mo", "we" };

            component.AssertSettings(settings =>
            {
                settings["disableDates"].ShouldEqual(component.DisableDates);
            });
        }

        [Fact]
        public void Serializes_disable_dates_handler()
        {
            component.DisableDatesHandler = new ClientHandlerDescriptor { HandlerName = "handler" };

            component.AssertSettings(settings =>
            {
                settings["disableDates"].ShouldEqual(component.DisableDatesHandler);
            });
        }

        [Fact]
        public void Serializes_disable_dates_handler_over_dates()
        {
            component.DisableDates = new string[] { "mo", "we" };
            component.DisableDatesHandler = new ClientHandlerDescriptor { HandlerName = "handler" };

            component.AssertSettings(settings =>
            {
                settings["disableDates"].ShouldEqual(component.DisableDatesHandler);
            });
        }
    }
}