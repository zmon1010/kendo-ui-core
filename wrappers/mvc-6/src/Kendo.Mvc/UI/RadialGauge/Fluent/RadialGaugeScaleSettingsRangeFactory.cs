using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring List<RadialGaugeScaleSettingsRange>
    /// </summary>
    public partial class RadialGaugeScaleSettingsRangeFactory
        
    {
        public RadialGaugeScaleSettingsRangeFactory(List<RadialGaugeScaleSettingsRange> container)
        {
            Container = container;
        }

        protected List<RadialGaugeScaleSettingsRange> Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
