using System;
using Kendo.Mvc.Extensions.Tests;
using Kendo.Mvc.Tests;
using Xunit;

namespace Kendo.Mvc.UI.Html.Tests
{
    public class DatePickerSettingsTests
    {
        private DatePicker component;

        public DatePickerSettingsTests()
        {
            component = new DatePicker(TestHelper.CreateViewContext());
        }

        [Fact]
        public void Does_not_serialize_disabled_dates()
        {
            component.AssertSettings(settings =>
            {
                settings.ContainsKey("disableDates").ShouldBeFalse();
            });
        }
        
        [Fact]
        public void Serializes_disabled_abbreviations()
        {
            component.DisableDates = new string[] { "mo", "we" };
            component.AssertSettings(settings =>
            {
                settings["disableDates"].ShouldEqual(component.DisableDates);
            });
        }
        
        [Fact]
        public void Serializes_disabled_dates_handler()
        {
            component.DisableDatesHandler = new ClientHandlerDescriptor { HandlerName = "foo" };

            component.AssertSettings(settings =>
            {
                settings["disableDates"].ShouldEqual(component.DisableDatesHandler);
            });
        }
        
        [Fact]
        public void Serializes_disabled_dates_handler_over_dates()
        {
            component.DisableDates = new string[] { "mo", "we" };
            component.DisableDatesHandler = new ClientHandlerDescriptor { HandlerName = "foo" };

            component.AssertSettings(settings =>
            {
                settings["disableDates"].ShouldEqual(component.DisableDatesHandler);
            });
        }
    }
}