using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartValueAxisLabelsSettings
    /// </summary>
    public partial class ChartValueAxisLabelsSettingsBuilder<T>
        where T : class 
    {
        public ChartValueAxisLabelsSettingsBuilder(ChartValueAxisLabelsSettings<T> container)
        {
            Container = container;
        }

        protected ChartValueAxisLabelsSettings<T> Container
        {
            get;
            private set;
        }

        /// <summary>
        /// The rotation angle of the labels. By default the labels are not rotated.
        /// </summary>
        /// <param name="value">The value for Rotation</param>
        public ChartValueAxisLabelsSettingsBuilder<T> Rotation(double value)
        {
            Container.Rotation.Angle = value;
            return this;
        }

        // Place custom settings here
    }
}
