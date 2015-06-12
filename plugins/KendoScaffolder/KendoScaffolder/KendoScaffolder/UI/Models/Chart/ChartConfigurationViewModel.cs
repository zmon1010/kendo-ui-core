using Microsoft.AspNet.Scaffolding;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KendoScaffolder.UI.Models
{
    public enum ChartSeriesType
    {
        Area,
        Bar,

    }

    public enum ChartLegendPosition
    {
        Top,
        Bottom,
        Left,
        Right
    }

    public class ChartLegend
    {
        public bool Visible { get; set; }
        public ChartLegendPosition Position { get; set; }
    }

    public class ChartConfigurationViewModel : WidgetConfigurationViewModel
    {
        public string Title { get; set; }
        public ChartLegend Legend { get; set; }
        public bool TooltipVisible { get; set; }

        public ChartConfigurationViewModel(CodeGenerationContext context)
            : base(context)
        {

        }
    }
}
