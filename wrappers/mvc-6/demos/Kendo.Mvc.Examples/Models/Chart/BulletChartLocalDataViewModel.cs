using System.Collections.Generic;

namespace Kendo.Mvc.Examples.Models
{
    public class BulletChartLocalDataViewModel
    {
        public BulletChartLocalDataViewModel()
        {
            mmHg = new List<BulletChartItem>();
            hPa = new List<BulletChartItem>();
        }

        public List<BulletChartItem> mmHg;
        public List<BulletChartItem> hPa;
    }
}