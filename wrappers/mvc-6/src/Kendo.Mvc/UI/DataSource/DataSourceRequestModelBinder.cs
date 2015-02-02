using System;
using System.Threading.Tasks;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.Infrastructure;
using Microsoft.AspNet.Mvc.ModelBinding;

namespace Kendo.Mvc.UI
{
    public class DataSourceRequestModelBinder : IModelBinder
    {
        public virtual async Task<bool> BindModelAsync(ModelBindingContext bindingContext)
        {
            DataSourceRequest request = new DataSourceRequest();
            await Task.WhenAll(
                TryGetValue<string>(bindingContext, GridUrlParameters.Sort, sort =>
                    request.Sorts = GridDescriptorSerializer.Deserialize<SortDescriptor>(sort)
                ),
                TryGetValue<int>(bindingContext, GridUrlParameters.Page, currentPage => request.Page = currentPage),
                TryGetValue<int>(bindingContext, GridUrlParameters.PageSize, pageSize => request.PageSize = pageSize),
                TryGetValue<string>(bindingContext, GridUrlParameters.Filter, filter =>
                    request.Filters = FilterDescriptorFactory.Create(filter)
                ),
                TryGetValue<string>(bindingContext, GridUrlParameters.Group, group =>
                    request.Groups = GridDescriptorSerializer.Deserialize<GroupDescriptor>(group)
                ),
                TryGetValue<string>(bindingContext, GridUrlParameters.Aggregates, aggregates =>
                    request.Aggregates = GridDescriptorSerializer.Deserialize<AggregateDescriptor>(aggregates)
                )
            );

            bindingContext.Model = request;

            return true;
        }

        private async Task TryGetValue<T>(ModelBindingContext bindingContext, string key, Action<T> action)
        {
            if (bindingContext.ModelMetadata.BinderModelName.HasValue())
            {
                key = bindingContext.ModelName + "-" + key;
            }

            var value = await bindingContext.ValueProvider.GetValueAsync(key);

            if (value != null)
            {
                var result = (T)value.ConvertTo(typeof(T));

                action(result);
            }
        }
    }
}
