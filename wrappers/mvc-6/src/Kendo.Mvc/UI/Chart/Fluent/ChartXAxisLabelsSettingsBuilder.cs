using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartXAxisLabelsSettings
    /// </summary>
    public partial class ChartXAxisLabelsSettingsBuilder<T>
        where T : class 
    {
        public ChartXAxisLabelsSettingsBuilder(ChartXAxisLabelsSettings<T> container)
        {
            Container = container;
        }

        protected ChartXAxisLabelsSettings<T> Container
        {
            get;
            private set;
        }

        /// <summary>
        /// The rotation angle of the labels. By default the labels are not rotated.
        /// </summary>
        /// <param name="value">The value for Rotation</param>
        public ChartXAxisLabelsSettingsBuilder<T> Rotation(double value)
        {
            Container.Rotation.Angle = value;
            return this;
        }

        // Place custom settings here
    }
}
