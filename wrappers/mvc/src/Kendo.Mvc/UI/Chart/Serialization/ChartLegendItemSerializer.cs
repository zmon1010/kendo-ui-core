namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    public class ChartLegendItemSerializer : IChartSerializer
    {
        private readonly ChartLegendItem legendItem;

        public ChartLegendItemSerializer(ChartLegendItem legendItem)
        {
            this.legendItem = legendItem;
        }

        public System.Collections.Generic.IDictionary<string, object> Serialize()
        {
            var result = new Dictionary<string, object>();
            if (this.legendItem.Visual != null)
            {
                result["visual"] = this.legendItem.Visual;
            }
            return result;
        }
    }
}
