using Microsoft.AspNet.Scaffolding.Core.Metadata;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KendoScaffolder.UI.Models.Charts
{
    /* Used for Candlestick, OHLC */
    public class CandlestickLikeChartConfiguration : IChartConfiguration
    {
        #region Required properties
        public PropertyMetadata Open { get; set; }
        public PropertyMetadata High { get; set; }
        public PropertyMetadata Low { get; set; }
        public PropertyMetadata Close { get; set; }
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
