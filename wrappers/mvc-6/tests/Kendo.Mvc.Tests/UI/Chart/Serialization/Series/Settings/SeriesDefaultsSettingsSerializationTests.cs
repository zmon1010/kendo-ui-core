using System;
using Xunit;
using Kendo.Mvc.UI;
using Kendo.Mvc.UI.Fluent;
using Kendo.Mvc.Tests;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Tests
{
    public class SeriesDefaultsSettingsSerializationTests
    {
        private readonly ChartSeriesDefaultsSettings<object> settings;

        public SeriesDefaultsSettingsSerializationTests()
        {
            settings = new ChartSeriesDefaultsSettings<object>();
        }

        [Fact]
        public void Default_Area_series_should_not_be_serialized()
        {
            settings.Serialize().ContainsKey("area").ShouldBeFalse();
        }

        [Fact]
        public void Area_series_should_be_serialized()
        {
            settings.Area.Data = new int[] { 1, 2, 3 };

            settings.Serialize().ContainsKey("area").ShouldBeTrue();
        }

        [Fact]
        public void Default_Bar_series_should_not_be_serialized()
        {
            settings.Serialize().ContainsKey("bar").ShouldBeFalse();
        }

        [Fact]
        public void Bar_series_should_be_serialized()
        {
            settings.Bar.Data = new int[] { 1, 2, 3 };

            settings.Serialize().ContainsKey("bar").ShouldBeTrue();
        }

        [Fact]
        public void Default_Bubble_series_should_not_be_serialized()
        {
            settings.Serialize().ContainsKey("bubble").ShouldBeFalse();
        }

        [Fact]
        public void Bubble_series_should_be_serialized()
        {
            settings.Bubble.Data = new int[] { 1, 2, 3 };

            settings.Serialize().ContainsKey("bubble").ShouldBeTrue();
        }

        [Fact]
        public void Default_Bullet_series_should_not_be_serialized()
        {
            settings.Serialize().ContainsKey("bullet").ShouldBeFalse();
        }

        [Fact]
        public void Bullet_series_should_be_serialized()
        {
            settings.Bullet.Data = new int[] { 1, 2, 3 };

            settings.Serialize().ContainsKey("bullet").ShouldBeTrue();
        }

        [Fact]
        public void Default_Candlestick_series_should_not_be_serialized()
        {
            settings.Serialize().ContainsKey("candlestick").ShouldBeFalse();
        }

        [Fact]
        public void Candlestick_series_should_be_serialized()
        {
            settings.Candlestick.Data = new int[] { 1, 2, 3 };

            settings.Serialize().ContainsKey("candlestick").ShouldBeTrue();
        }

        [Fact]
        public void Default_Column_series_should_not_be_serialized()
        {
            settings.Serialize().ContainsKey("column").ShouldBeFalse();
        }

        [Fact]
        public void Column_series_should_be_serialized()
        {
            settings.Column.Data = new int[] { 1, 2, 3 };

            settings.Serialize().ContainsKey("column").ShouldBeTrue();
        }

        [Fact]
        public void Default_Donut_series_should_not_be_serialized()
        {
            settings.Serialize().ContainsKey("donut").ShouldBeFalse();
        }

        [Fact]
        public void Donut_series_should_be_serialized()
        {
            settings.Donut.Data = new int[] { 1, 2, 3 };

            settings.Serialize().ContainsKey("donut").ShouldBeTrue();
        }

        [Fact]
        public void Default_Funnel_series_should_not_be_serialized()
        {
            settings.Serialize().ContainsKey("funnel").ShouldBeFalse();
        }

        [Fact]
        public void Funnel_series_should_be_serialized()
        {
            settings.Funnel.Data = new int[] { 1, 2, 3 };

            settings.Serialize().ContainsKey("funnel").ShouldBeTrue();
        }

        [Fact]
        public void Default_Line_series_should_not_be_serialized()
        {
            settings.Serialize().ContainsKey("line").ShouldBeFalse();
        }

        [Fact]
        public void Line_series_should_be_serialized()
        {
            settings.Line.Data = new int[] { 1, 2, 3 };

            settings.Serialize().ContainsKey("line").ShouldBeTrue();
        }

        [Fact]
        public void Default_OHLC_series_should_not_be_serialized()
        {
            settings.Serialize().ContainsKey("ohlc").ShouldBeFalse();
        }

        [Fact]
        public void OHLC_series_should_be_serialized()
        {
            settings.OHLC.Data = new int[] { 1, 2, 3 };

            settings.Serialize().ContainsKey("ohlc").ShouldBeTrue();
        }

        [Fact]
        public void Default_Pie_series_should_not_be_serialized()
        {
            settings.Serialize().ContainsKey("pie").ShouldBeFalse();
        }

        [Fact]
        public void Pie_series_should_be_serialized()
        {
            settings.Pie.Data = new int[] { 1, 2, 3 };

            settings.Serialize().ContainsKey("pie").ShouldBeTrue();
        }

        [Fact]
        public void Default_ScatterLine_series_should_not_be_serialized()
        {
            settings.Serialize().ContainsKey("scatterLine").ShouldBeFalse();
        }

        [Fact]
        public void ScatterLine_series_should_be_serialized()
        {
            settings.ScatterLine.Data = new int[] { 1, 2, 3 };

            settings.Serialize().ContainsKey("scatterLine").ShouldBeTrue();
        }

        [Fact]
        public void Default_Scatter_series_should_not_be_serialized()
        {
            settings.Serialize().ContainsKey("scatter").ShouldBeFalse();
        }

        [Fact]
        public void Scatter_series_should_be_serialized()
        {
            settings.Scatter.Data = new int[] { 1, 2, 3 };

            settings.Serialize().ContainsKey("scatter").ShouldBeTrue();
        }

        [Fact]
        public void Default_VerticalBullet_series_should_not_be_serialized()
        {
            settings.Serialize().ContainsKey("verticalBullet").ShouldBeFalse();
        }

        [Fact]
        public void VerticalBullet_series_should_be_serialized()
        {
            settings.VerticalBullet.Data = new int[] { 1, 2, 3 };

            settings.Serialize().ContainsKey("verticalBullet").ShouldBeTrue();
        }
    }
}