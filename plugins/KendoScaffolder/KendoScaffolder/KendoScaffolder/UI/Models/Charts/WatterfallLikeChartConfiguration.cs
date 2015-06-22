using Microsoft.AspNet.Scaffolding.Core.Metadata;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KendoScaffolder.UI.Models.Charts
{
    // Used for Watterfall, HorizontalWatterfall
    public class WatterfallLikeChartConfiguration : IChartConfiguration
    {
        #region Required properties
        public PropertyMetadata Value { get; set; }
        #endregion

        #region Optional properties
        public PropertyMetadata Category { get; set; }
        public PropertyMetadata Summary { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }
        #endregion

        //#region Axises
        //public PropertyMetadata CategoryAxis { get; set; }
        //#endregion
    }
}
