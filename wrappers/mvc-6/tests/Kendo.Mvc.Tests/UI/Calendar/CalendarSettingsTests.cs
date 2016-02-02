using System;
using Kendo.Mvc.Extensions.Tests;
using Kendo.Mvc.Tests;
using Xunit;

namespace Kendo.Mvc.UI.Html.Tests
{
    public class CalendarSettingsTests
    {
        private Calendar calendar;

        public CalendarSettingsTests()
        {
            calendar = new Calendar(TestHelper.CreateViewContext());
        }

        [Fact]
        public void Does_not_serialize_disabled_dates()
        {
            calendar.AssertSettings(settings =>
            {
                settings.ContainsKey("disableDates").ShouldBeFalse();
            });
        }
        
        [Fact]
        public void Serializes_disabled_abbreviations()
        {
            calendar.DisableDates = new string[] { "mo", "we" };
            calendar.AssertSettings(settings =>
            {
                settings["disableDates"].ShouldEqual(calendar.DisableDates);
            });
        }
        
        [Fact]
        public void Serializes_disabled_dates_handler()
        {
            calendar.DisableDatesHandler = new ClientHandlerDescriptor { HandlerName = "foo" };

            calendar.AssertSettings(settings =>
            {
                settings["disableDates"].ShouldEqual(calendar.DisableDatesHandler);
            });
        }
        
        [Fact]
        public void Serializes_disabled_dates_handler_over_dates()
        {
            calendar.DisableDates = new string[] { "mo", "we" };
            calendar.DisableDatesHandler = new ClientHandlerDescriptor { HandlerName = "foo" };

            calendar.AssertSettings(settings =>
            {
                settings["disableDates"].ShouldEqual(calendar.DisableDatesHandler);
            });
        }
    }
}