namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Extensions;

    internal class ChartNavigatorSelectionSerializer : IChartSerializer
    {
        private readonly ChartNavigatorSelection selection;

        public ChartNavigatorSelectionSerializer(ChartNavigatorSelection selection)
        {
            this.selection = selection;
        }

        public virtual IDictionary<string, object> Serialize()
        {
            var result = new Dictionary<string, object>();
            
            FluentDictionary.For(result)
                .Add("from", selection.From.ToJavaScriptString(), () => selection.From.HasValue)
                .Add("to", selection.To.ToJavaScriptString(), () => selection.To.HasValue);

            if (selection.Mousewheel.Enabled)
            {
                var mousewheelSerialization = selection.Mousewheel.CreateSerializer().Serialize();
                if (mousewheelSerialization.Count > 0)
                {
                    result.Add("mousewheel", mousewheelSerialization);
                }
            }
            else
            {
                result.Add("mousewheel", false);
            }

            return result;
        }
    }
}