using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring LinearGaugeScaleLabelsSettings
    /// </summary>
    public partial class LinearGaugeScaleLabelsSettingsBuilder
        
    {
        public LinearGaugeScaleLabelsSettingsBuilder(LinearGaugeScaleLabelsSettings container)
        {
            Container = container;
        }

        protected LinearGaugeScaleLabelsSettings Container
        {
            get;
            private set;
        }

        /// <param name="margin">The labels margin.</param>  
        public LinearGaugeScaleLabelsSettingsBuilder Margin(int margin)
        {
            Container.Margin.All(margin);

            return this;
        }

        /// <param name="padding">The labels padding.</param>     
        public LinearGaugeScaleLabelsSettingsBuilder Padding(int padding)
        {
            Container.Padding.All(padding);

            return this;
        }
    }
}
