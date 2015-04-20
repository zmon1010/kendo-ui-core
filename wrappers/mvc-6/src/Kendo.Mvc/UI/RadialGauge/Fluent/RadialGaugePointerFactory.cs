using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring List<RadialGaugePointer>
    /// </summary>
    public partial class RadialGaugePointerFactory
        
    {
        public RadialGaugePointerFactory(List<RadialGaugePointer> container)
        {
            Container = container;
        }

        protected List<RadialGaugePointer> Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
