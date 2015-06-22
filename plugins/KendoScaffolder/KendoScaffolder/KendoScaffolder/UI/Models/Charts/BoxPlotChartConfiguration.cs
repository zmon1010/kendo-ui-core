using Microsoft.AspNet.Scaffolding.Core.Metadata;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KendoScaffolder.UI.Models.Charts
{
    public class BoxPlotChartConfiguration : IChartConfiguration
    {
        #region Required properties
        public PropertyMetadata Lower { get; set; }
        public PropertyMetadata Q1 { get; set; }
        public PropertyMetadata Median { get; set; }
        public PropertyMetadata Q3 { get; set; }
        public PropertyMetadata Upper { get; set; }
        public PropertyMetadata Mean { get; set; }
        public PropertyMetadata Outliers { get; set; }
        #endregion

        #region Optional properties
        public PropertyMetadata Category { get; set; }
        public string Color { get; set; }
        public string Name { get; set; }
        #endregion

        //#region Axises
        //public PropertyMetadata CategoryAxis { get; set; }
        //#endregion
    }
}
