using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring RadialGaugeScaleLabelsSettings
    /// </summary>
    public partial class RadialGaugeScaleLabelsSettingsBuilder
        
    {
        public RadialGaugeScaleLabelsSettingsBuilder(RadialGaugeScaleLabelsSettings container)
        {
            Container = container;
        }

        protected RadialGaugeScaleLabelsSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
