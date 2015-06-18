using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartYAxisLabelsSettings
    /// </summary>
    public partial class ChartYAxisLabelsSettingsBuilder
        
    {
        public ChartYAxisLabelsSettingsBuilder(ChartYAxisLabelsSettings container)
        {
            Container = container;
        }

        protected ChartYAxisLabelsSettings Container
        {
            get;
            private set;
        }

        /// <summary>
        /// The rotation angle of the labels. By default the labels are not rotated.
        /// </summary>
        /// <param name="value">The value for Rotation</param>
        public ChartYAxisLabelsSettingsBuilder Rotation(double value)
        {
            Container.Rotation.Angle = value;
            return this;
        }

        // Place custom settings here
    }
}
