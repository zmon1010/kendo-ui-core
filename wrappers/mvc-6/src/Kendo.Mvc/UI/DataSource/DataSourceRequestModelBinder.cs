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
			DataSourceRequest req = new DataSourceRequest();

			await Task.Factory.ContinueWhenAll(
				new[] {
					TryGetValue<string>(bindingContext, DataSourceRequestUrlParameters.Sort, (request, sort) =>
						request.Sorts = DataSourceDescriptorSerializer.Deserialize<SortDescriptor>(sort)
					),
					 TryGetValue<int>(bindingContext, DataSourceRequestUrlParameters.Page, (request, currentPage) => request.Page = currentPage),
					TryGetValue<int>(bindingContext, DataSourceRequestUrlParameters.PageSize, (request, pageSize) => request.PageSize = pageSize),
					TryGetValue<string>(bindingContext, DataSourceRequestUrlParameters.Filter, (request, filter) =>
						request.Filters = FilterDescriptorFactory.Create(filter)
					),
					TryGetValue<string>(bindingContext, DataSourceRequestUrlParameters.Group, (request, group) =>
						request.Groups = DataSourceDescriptorSerializer.Deserialize<GroupDescriptor>(group)
					),
					TryGetValue<string>(bindingContext, DataSourceRequestUrlParameters.Aggregates, (request, aggregates) =>
						request.Aggregates = DataSourceDescriptorSerializer.Deserialize<AggregateDescriptor>(aggregates)
					)
				},
				(results) => results.Each(x => x.Result(req))
			);

			bindingContext.Model = req;

			return true;
		}

		private Task<Action<DataSourceRequest>> TryGetValue<T>(ModelBindingContext bindingContext, string key, Action<DataSourceRequest, T> setter)
		{
			if (bindingContext.ModelMetadata.BinderModelName.HasValue())
			{
				key = bindingContext.ModelName + "-" + key;
			}

			return bindingContext.ValueProvider
				.GetValueAsync(key)
				.ContinueWith(x =>
				{
					var value = x.Result;
					Action<DataSourceRequest> action = (r) => { };

					if (value != null)
					{
						action = r => setter(r, (T)value.ConvertTo(typeof(T)));
					}
					return action;
				});
		}
	}
}
