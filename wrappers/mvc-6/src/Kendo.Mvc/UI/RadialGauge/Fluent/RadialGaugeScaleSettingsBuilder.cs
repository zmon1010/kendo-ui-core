using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring RadialGaugeScaleSettings
    /// </summary>
    public partial class RadialGaugeScaleSettingsBuilder
        
    {
        public RadialGaugeScaleSettingsBuilder(RadialGaugeScaleSettings container)
        {
            Container = container;
        }

        protected RadialGaugeScaleSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
