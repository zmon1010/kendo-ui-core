using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for adding items to Kendo UI RadialGauge
    /// </summary>
    public partial class RadialGaugePointerFactory
        
    {

        public RadialGauge RadialGauge { get; set; }

        /// <summary>
        /// Adds an item to the collection
        /// </summary>
        public virtual RadialGaugePointerBuilder Add()
        {
            var item = new RadialGaugePointer();
            item.RadialGauge = RadialGauge;
            Container.Add(item);

            return new RadialGaugePointerBuilder(item);
        }
    }
}
