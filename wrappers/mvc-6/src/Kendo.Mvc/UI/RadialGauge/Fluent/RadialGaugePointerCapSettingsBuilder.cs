using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring RadialGaugePointerCapSettings
    /// </summary>
    public partial class RadialGaugePointerCapSettingsBuilder
        
    {
        public RadialGaugePointerCapSettingsBuilder(RadialGaugePointerCapSettings container)
        {
            Container = container;
        }

        protected RadialGaugePointerCapSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
