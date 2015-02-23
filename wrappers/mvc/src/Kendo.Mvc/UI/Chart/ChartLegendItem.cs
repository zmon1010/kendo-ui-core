namespace Kendo.Mvc.UI
{
    public class ChartLegendItem
    {
        /// <summary>
        /// Gets or sets the legent item visual handler.
        /// </summary>
        /// <value>
        /// The legent item visual handler.
        /// </value>
        public ClientHandlerDescriptor Visual
        {
            get;
            set;
        }

        public IChartSerializer CreateSerializer()
        {
            return new ChartLegendItemSerializer(this);
        }
    }
}