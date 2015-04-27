using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring LinearGaugeGaugeAreaSettings
    /// </summary>
    public partial class LinearGaugeGaugeAreaSettingsBuilder
        
    {
        public LinearGaugeGaugeAreaSettingsBuilder(LinearGaugeGaugeAreaSettings container)
        {
            Container = container;
        }

        public LinearGaugeGaugeAreaSettingsBuilder Margin(int margin)
        {
            Container.Margin.All(margin);

            return this;
        }

        protected LinearGaugeGaugeAreaSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
