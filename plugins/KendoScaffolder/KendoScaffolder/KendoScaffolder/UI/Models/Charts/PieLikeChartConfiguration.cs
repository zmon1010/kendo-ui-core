using Microsoft.AspNet.Scaffolding.Core.Metadata;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KendoScaffolder.UI.Models.Charts
{
    /* Used for Funnel, Pie, Donut */
    public class PieLikeChartConfiguration : IChartConfiguration
    {
        #region Required properties
        public PropertyMetadata Value { get; set; }
        #endregion

        #region Optional properties
        public PropertyMetadata Category { get; set; }
        public string Color { get; set; }
        public string Name { get; set; }
        #endregion
    }
}
