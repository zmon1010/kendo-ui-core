using System;
using System.Linq;
using System.Web.Mvc;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Populates a DataSourceRequest object with information about paging, sorting, filtering and grouping of data.
    /// </summary>
    public class DataSourceRequestAttribute : CustomModelBinderAttribute
    {
        public string Prefix { get; set; }

        public override IModelBinder GetBinder()
        {
            return new DataSourceRequestModelBinder() { Prefix = Prefix };
        }
    }
}