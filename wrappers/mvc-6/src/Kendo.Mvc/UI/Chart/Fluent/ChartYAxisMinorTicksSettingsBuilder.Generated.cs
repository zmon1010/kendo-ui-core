using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartYAxisMinorTicksSettings
    /// </summary>
    public partial class ChartYAxisMinorTicksSettingsBuilder
        
    {
        /// <summary>
        /// The color of the y axis minor ticks lines. Accepts a valid CSS color string, including hex and rgb.
        /// </summary>
        /// <param name="value">The value for Color</param>
        public ChartYAxisMinorTicksSettingsBuilder Color(string value)
        {
            Container.Color = value;
            return this;
        }

        /// <summary>
        /// The length of the tick line in pixels.
        /// </summary>
        /// <param name="value">The value for Size</param>
        public ChartYAxisMinorTicksSettingsBuilder Size(double value)
        {
            Container.Size = value;
            return this;
        }

        /// <summary>
        /// If set to true the chart will display the y axis minor ticks. By default the y axis minor ticks are not visible.
        /// </summary>
        /// <param name="value">The value for Visible</param>
        public ChartYAxisMinorTicksSettingsBuilder Visible(bool value)
        {
            Container.Visible = value;
            return this;
        }

        /// <summary>
        /// If set to true the chart will display the y axis minor ticks. By default the y axis minor ticks are not visible.
        /// </summary>
        public ChartYAxisMinorTicksSettingsBuilder Visible()
        {
            Container.Visible = true;
            return this;
        }

        /// <summary>
        /// The width of the minor ticks in pixels.
        /// </summary>
        /// <param name="value">The value for Width</param>
        public ChartYAxisMinorTicksSettingsBuilder Width(double value)
        {
            Container.Width = value;
            return this;
        }

        /// <summary>
        /// The step of the y axis minor ticks.
        /// </summary>
        /// <param name="value">The value for Step</param>
        public ChartYAxisMinorTicksSettingsBuilder Step(double value)
        {
            Container.Step = value;
            return this;
        }

        /// <summary>
        /// The skip of the y axis minor ticks.
        /// </summary>
        /// <param name="value">The value for Skip</param>
        public ChartYAxisMinorTicksSettingsBuilder Skip(double value)
        {
            Container.Skip = value;
            return this;
        }

    }
}
