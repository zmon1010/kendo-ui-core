using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartCategoryAxisLabelsSettings
    /// </summary>
    public partial class ChartCategoryAxisLabelsSettingsBuilder
        
    {
        public ChartCategoryAxisLabelsSettingsBuilder(ChartCategoryAxisLabelsSettings container)
        {
            Container = container;
        }

        protected ChartCategoryAxisLabelsSettings Container
        {
            get;
            private set;
        }

        /// <summary>
        /// The rotation angle of the labels. By default the labels are not rotated.
        /// </summary>
        /// <param name="value">The value for Rotation</param>
        public ChartCategoryAxisLabelsSettingsBuilder Rotation(double value)
        {
            Container.Rotation.Angle = value;
            return this;
        }

        // Place custom settings here
    }
}
