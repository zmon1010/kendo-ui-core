using Microsoft.AspNet.Mvc;

namespace Kendo.Mvc.UI
{
    public class DataSourceRequestAttribute : ModelBinderAttribute
    {
        public DataSourceRequestAttribute()
        {
            BinderType = typeof(DataSourceRequestModelBinder);
        }
        
    }
}