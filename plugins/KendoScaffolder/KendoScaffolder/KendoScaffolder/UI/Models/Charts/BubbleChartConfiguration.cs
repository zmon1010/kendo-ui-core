using Microsoft.AspNet.Scaffolding.Core.Metadata;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KendoScaffolder.UI.Models.Charts
{
    public class BubbleChartConfiguration : IChartConfiguration
    {
        #region Required properties
        public PropertyMetadata X { get; set; }
        public PropertyMetadata Y { get; set; }
        public PropertyMetadata Size { get; set; }
        #endregion

        #region Optional properties
        public string Color { get; set; }
        public string Name { get; set; }
        #endregion
    }
}
