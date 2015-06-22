using Microsoft.AspNet.Scaffolding.Core.Metadata;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KendoScaffolder.UI.Models.Charts
{
    /* Used for Bullet, VerticalBullet */
    public class BulletLikeChartConfiguration : IChartConfiguration
    {
        #region Required properties
        public PropertyMetadata Current { get; set; }
        public PropertyMetadata Target { get; set; }
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
