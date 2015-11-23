using System;
using System.Threading.Tasks;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.Infrastructure;
using Microsoft.AspNet.Mvc.ModelBinding;

namespace Kendo.Mvc.UI
{
    public class DataSourceRequestModelBinder : IModelBinder
    {
        public virtual async Task<ModelBindingResult> BindModelAsync(ModelBindingContext bindingContext)
        {
            var request = new DataSourceRequest();

            TryGetValue(bindingContext, DataSourceRequestUrlParameters.Sort, (string sort) =>
                request.Sorts = DataSourceDescriptorSerializer.Deserialize<SortDescriptor>(sort)
            );

            TryGetValue(bindingContext, DataSourceRequestUrlParameters.Page, (int currentPage) => request.Page = currentPage);

            TryGetValue(bindingContext, DataSourceRequestUrlParameters.PageSize, (int pageSize) => request.PageSize = pageSize);

            TryGetValue(bindingContext, DataSourceRequestUrlParameters.Filter, (string filter) =>
                request.Filters = FilterDescriptorFactory.Create(filter)
            );

            TryGetValue(bindingContext, DataSourceRequestUrlParameters.Group, (string group) =>
                request.Groups = DataSourceDescriptorSerializer.Deserialize<GroupDescriptor>(group)
            );

            TryGetValue(bindingContext, DataSourceRequestUrlParameters.Aggregates, (string aggregates) =>
                request.Aggregates = DataSourceDescriptorSerializer.Deserialize<AggregateDescriptor>(aggregates)
            );

            bindingContext.Model = request;

            return await ModelBindingResult.SuccessAsync(bindingContext.ModelName ?? string.Empty, request);
        }

        private void TryGetValue<T>(ModelBindingContext bindingContext, string key, Action<T> action)
        {
            if (bindingContext.ModelMetadata.BinderModelName.HasValue())
            {
                key = bindingContext.ModelName + "-" + key;
            }

            var value = bindingContext.ValueProvider.GetValue(key);
            if (value != null && value.FirstValue != null)
            {
                action((T)value.ConvertTo(typeof(T)));
            }
        }
    }
}