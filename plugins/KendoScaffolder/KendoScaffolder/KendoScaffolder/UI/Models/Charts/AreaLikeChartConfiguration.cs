using Microsoft.AspNet.Scaffolding.Core.Metadata;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KendoScaffolder.UI.Models.Charts
{
    /* Used for 
    * Area, Bar, Column, Line, VerticalArea, 
    * VerticalLine, RadarArea, RadarColumn, RadarLine,
    * Funnel, Pie, Donut, Waterfall, HorizontalWaterfall
    */
    public class AreaLikeChartConfiguration : IChartConfiguration
    {
        #region Required properties
        public PropertyMetadata Value { get; set; }
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
