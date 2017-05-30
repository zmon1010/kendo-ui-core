using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Kendo.Mvc.UI
{
    public class GridSelectColumn<T> : GridColumnBase<T> where T : class
    {
        public GridSelectColumn(Grid<T> grid)
            : base(grid)
        {
        }

        protected override void Serialize(IDictionary<string, object> json)
        {
            base.Serialize(json);
            json["selectable"] = true;
        }
    }
}
