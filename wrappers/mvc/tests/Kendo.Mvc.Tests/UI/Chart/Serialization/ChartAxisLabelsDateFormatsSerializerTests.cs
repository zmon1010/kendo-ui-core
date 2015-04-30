namespace Kendo.Mvc.UI.Tests
{
    using System.Collections.Generic;
    using Kendo.Mvc.UI;
    using Xunit;

    public class ChartAxisLabelsDateFormatsSerializerTests
    {
        private readonly ChartAxisLabelsDateFormats dateFormats;

        public ChartAxisLabelsDateFormatsSerializerTests()
        {
            dateFormats = new ChartAxisLabelsDateFormats();
        }

        [Fact]
        public void Serializes_seconds_format()
        {
            dateFormats.Seconds = "HH:mm";
            GetJson()["seconds"].ShouldEqual("HH:mm");
        }

        [Fact]
        public void Does_not_serialize_default_seconds_format()
        {
            GetJson().ContainsKey("seconds").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_minutes_format()
        {
            dateFormats.Minutes = "HH:mm";
            GetJson()["minutes"].ShouldEqual("HH:mm");
        }

        [Fact]
        public void Does_not_serialize_default_minutes_format()
        {
            GetJson().ContainsKey("minutes").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_hours_format()
        {
            dateFormats.Hours = "HH:mm";
            GetJson()["hours"].ShouldEqual("HH:mm");
        }

        [Fact]
        public void Does_not_serialize_default_hours_format()
        {
            GetJson().ContainsKey("hours").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_days_format()
        {
            dateFormats.Days = "HH:mm";
            GetJson()["days"].ShouldEqual("HH:mm");
        }

        [Fact]
        public void Does_not_serialize_default_days_format()
        {
            GetJson().ContainsKey("days").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_weeks_format()
        {
            dateFormats.Weeks = "HH:mm";
            GetJson()["weeks"].ShouldEqual("HH:mm");
        }

        [Fact]
        public void Does_not_serialize_default_weeks_format()
        {
            GetJson().ContainsKey("weeks").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_months_format()
        {
            dateFormats.Months = "HH:mm";
            GetJson()["months"].ShouldEqual("HH:mm");
        }

        [Fact]
        public void Does_not_serialize_default_months_format()
        {
            GetJson().ContainsKey("months").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_years_format()
        {
            dateFormats.Years = "HH:mm";
            GetJson()["years"].ShouldEqual("HH:mm");
        }

        [Fact]
        public void Does_not_serialize_default_years_format()
        {
            GetJson().ContainsKey("years").ShouldBeFalse();
        }

        private IDictionary<string, object> GetJson()
        {
            return dateFormats.CreateSerializer().Serialize();
        }
    }
}