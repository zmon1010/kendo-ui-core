using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSerieErrorBarsSettings
    /// </summary>
    public partial class ChartSerieErrorBarsSettingsBuilder
        
    {
        /// <summary>
        /// The error bars value.The following value types are supported:
        /// </summary>
        /// <param name="value">The value for Value</param>
        public ChartSerieErrorBarsSettingsBuilder Value(string value)
        {
            Container.Value = value;
            return this;
        }

        /// <summary>
        /// A function that can be used to create a custom visual for the error bars. The available argument fields are:
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will be evaluated.</param>
        public ChartSerieErrorBarsSettingsBuilder Visual(string handler)
        {
            Container.Visual = new ClientHandlerDescriptor { HandlerName = handler };
            return this;
        }

        /// <summary>
        /// A function that can be used to create a custom visual for the error bars. The available argument fields are:
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag.</param>
        public ChartSerieErrorBarsSettingsBuilder Visual(Func<object, object> handler)
        {
            Container.Visual = new ClientHandlerDescriptor { TemplateDelegate = handler };
            return this;
        }
        /// <summary>
        /// The xAxis error bars value. See the series.errorBars.value option for a list of the supported value types.
        /// </summary>
        /// <param name="value">The value for XValue</param>
        public ChartSerieErrorBarsSettingsBuilder XValue(string value)
        {
            Container.XValue = value;
            return this;
        }

        /// <summary>
        /// The yAxis error bars value. See the series.errorBars.value option for a list of the supported value types.
        /// </summary>
        /// <param name="value">The value for YValue</param>
        public ChartSerieErrorBarsSettingsBuilder YValue(string value)
        {
            Container.YValue = value;
            return this;
        }

        /// <summary>
        /// If set to false, the error bars caps will not be displayed. By default the caps are visible.
        /// </summary>
        /// <param name="value">The value for EndCaps</param>
        public ChartSerieErrorBarsSettingsBuilder EndCaps(bool value)
        {
            Container.EndCaps = value;
            return this;
        }

        /// <summary>
        /// The color of the error bars. Accepts a valid CSS color string, including hex and rgb.
        /// </summary>
        /// <param name="value">The value for Color</param>
        public ChartSerieErrorBarsSettingsBuilder Color(string value)
        {
            Container.Color = value;
            return this;
        }

        /// <summary>
        /// The error bars line options.
        /// </summary>
        /// <param name="configurator">The configurator for the line setting.</param>
        public ChartSerieErrorBarsSettingsBuilder Line(Action<ChartSerieErrorBarsLineSettingsBuilder> configurator)
        {

            Container.Line.Chart = Container.Chart;
            configurator(new ChartSerieErrorBarsLineSettingsBuilder(Container.Line));

            return this;
        }

    }
}
