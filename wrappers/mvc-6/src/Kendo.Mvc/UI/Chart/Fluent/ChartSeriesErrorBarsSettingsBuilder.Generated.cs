using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeriesErrorBarsSettings
    /// </summary>
    public partial class ChartSeriesErrorBarsSettingsBuilder<T>
        where T : class 
    {
        /// <summary>
        /// The error bars value.The following value types are supported: "stderr" - the standard error of the series values will be used to calculate the point low and high value; "stddev(n)" - the standard deviation of the series values will be used to calculate the point low and high value. A number can be specified between the parentheses, that will be multiplied by the calculated standard deviation.; "percentage(n)" - a percentage of the point value; A number that will be subtracted/added to the point value; An array that holds the low and high difference from the point value or A function that returns the errorBars point value.
        /// </summary>
        /// <param name="value">The value for Value</param>
        public ChartSeriesErrorBarsSettingsBuilder<T> Value(string value)
        {
            Container.Value = value;
            return this;
        }

        /// <summary>
        /// A function that can be used to create a custom visual for the error bars. The available argument fields are: rect - the kendo.geometry.Rect that defines where the visual should be rendered.; options - the error bar options.; createVisual - a function that can be used to get the default visual.; low - the error bar low value.; high - the error bar high value. or sender - the chart instance..
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will be evaluated.</param>
        public ChartSeriesErrorBarsSettingsBuilder<T> Visual(string handler)
        {
            Container.Visual = new ClientHandlerDescriptor { HandlerName = handler };
            return this;
        }

        /// <summary>
        /// A function that can be used to create a custom visual for the error bars. The available argument fields are: rect - the kendo.geometry.Rect that defines where the visual should be rendered.; options - the error bar options.; createVisual - a function that can be used to get the default visual.; low - the error bar low value.; high - the error bar high value. or sender - the chart instance..
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag.</param>
        public ChartSeriesErrorBarsSettingsBuilder<T> Visual(Func<object, object> handler)
        {
            Container.Visual = new ClientHandlerDescriptor { TemplateDelegate = handler };
            return this;
        }
        /// <summary>
        /// The xAxis error bars value. See the series.errorBars.value option for a list of the supported value types.
        /// </summary>
        /// <param name="value">The value for XValue</param>
        public ChartSeriesErrorBarsSettingsBuilder<T> XValue(string value)
        {
            Container.XValue = value;
            return this;
        }

        /// <summary>
        /// The yAxis error bars value. See the series.errorBars.value option for a list of the supported value types.
        /// </summary>
        /// <param name="value">The value for YValue</param>
        public ChartSeriesErrorBarsSettingsBuilder<T> YValue(string value)
        {
            Container.YValue = value;
            return this;
        }

        /// <summary>
        /// If set to false, the error bars caps will not be displayed. By default the caps are visible.
        /// </summary>
        /// <param name="value">The value for EndCaps</param>
        public ChartSeriesErrorBarsSettingsBuilder<T> EndCaps(bool value)
        {
            Container.EndCaps = value;
            return this;
        }

        /// <summary>
        /// The color of the error bars. Accepts a valid CSS color string, including hex and rgb.
        /// </summary>
        /// <param name="value">The value for Color</param>
        public ChartSeriesErrorBarsSettingsBuilder<T> Color(string value)
        {
            Container.Color = value;
            return this;
        }

        /// <summary>
        /// The error bars line options.
        /// </summary>
        /// <param name="configurator">The configurator for the line setting.</param>
        public ChartSeriesErrorBarsSettingsBuilder<T> Line(Action<ChartSeriesErrorBarsLineSettingsBuilder<T>> configurator)
        {

            Container.Line.Chart = Container.Chart;
            configurator(new ChartSeriesErrorBarsLineSettingsBuilder<T>(Container.Line));

            return this;
        }

    }
}
