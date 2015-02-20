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
                TryGetValue(bindingContext, DataSourceRequestUrlParameters.Sort, (string sort) =>
                    request.Sorts = DataSourceDescriptorSerializer.Deserialize<SortDescriptor>(sort)
                ),
                TryGetValue(bindingContext, DataSourceRequestUrlParameters.Page, (int currentPage) => request.Page = currentPage),
                TryGetValue(bindingContext, DataSourceRequestUrlParameters.PageSize, (int pageSize) => request.PageSize = pageSize),
                TryGetValue(bindingContext, DataSourceRequestUrlParameters.Filter, (string filter) =>
                    request.Filters = FilterDescriptorFactory.Create(filter)
                ),
                TryGetValue(bindingContext, DataSourceRequestUrlParameters.Group, (string group) =>
                    request.Groups = DataSourceDescriptorSerializer.Deserialize<GroupDescriptor>(group)
                ),
                TryGetValue(bindingContext, DataSourceRequestUrlParameters.Aggregates, (string aggregates) =>
                    request.Aggregates = DataSourceDescriptorSerializer.Deserialize<AggregateDescriptor>(aggregates)
                )
            );

            bindingContext.Model = request;

            return true;
        }

        private Task TryGetValue<T>(ModelBindingContext bindingContext, string key, Action<T> action)
        {
            if (bindingContext.ModelMetadata.BinderModelName.HasValue())
            {
                key = bindingContext.ModelName + "-" + key;
            }

            return bindingContext.ValueProvider
                .GetValueAsync(key)
                .ContinueWith(result => {
                    var value = result.Result;
                    if (value != null)
                    {
                        action((T)value.ConvertTo(typeof(T)));
                    }
                });
        }
    }
}
