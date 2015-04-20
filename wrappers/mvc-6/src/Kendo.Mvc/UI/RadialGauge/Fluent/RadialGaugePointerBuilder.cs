using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring RadialGaugePointer
    /// </summary>
    public partial class RadialGaugePointerBuilder
        
    {
        public RadialGaugePointerBuilder(RadialGaugePointer container)
        {
            Container = container;
        }

        protected RadialGaugePointer Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
