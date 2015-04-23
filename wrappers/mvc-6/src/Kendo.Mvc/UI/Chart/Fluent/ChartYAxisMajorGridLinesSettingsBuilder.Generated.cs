using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartYAxisMajorGridLinesSettings
    /// </summary>
    public partial class ChartYAxisMajorGridLinesSettingsBuilder
        
    {
        /// <summary>
        /// The color of the lines. Accepts a valid CSS color string, including hex and rgb.
        /// </summary>
        /// <param name="value">The value for Color</param>
        public ChartYAxisMajorGridLinesSettingsBuilder Color(string value)
        {
            Container.Color = value;
            return this;
        }

        /// <summary>
        /// The dash type of the line.The following dash types are supported:
        /// </summary>
        /// <param name="value">The value for DashType</param>
        public ChartYAxisMajorGridLinesSettingsBuilder DashType(string value)
        {
            Container.DashType = value;
            return this;
        }

        /// <summary>
        /// If set to true the chart will display the x major grid liness. By default the x major grid liness are visible.
        /// </summary>
        /// <param name="value">The value for Visible</param>
        public ChartYAxisMajorGridLinesSettingsBuilder Visible(bool value)
        {
            Container.Visible = value;
            return this;
        }

        /// <summary>
        /// The width of the line in pixels. Also affects the major and minor ticks, but not the grid lines.
		/// #### Example - set the scatter chart x major grid lines width
        /// </summary>
        /// <param name="value">The value for Width</param>
        public ChartYAxisMajorGridLinesSettingsBuilder Width(double value)
        {
            Container.Width = value;
            return this;
        }

        /// <summary>
        /// The step of the y axis major grid lines.
        /// </summary>
        /// <param name="value">The value for Step</param>
        public ChartYAxisMajorGridLinesSettingsBuilder Step(double value)
        {
            Container.Step = value;
            return this;
        }

        /// <summary>
        /// The skip of the y axis major grid lines.
        /// </summary>
        /// <param name="value">The value for Skip</param>
        public ChartYAxisMajorGridLinesSettingsBuilder Skip(double value)
        {
            Container.Skip = value;
            return this;
        }

    }
}
