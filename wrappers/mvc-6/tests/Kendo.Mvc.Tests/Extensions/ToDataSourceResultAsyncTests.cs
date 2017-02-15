namespace Kendo.Mvc.Tests.Data
{
    using System;
    using System.Linq;
    using Kendo.Mvc.Extensions;
    using Xunit;
    using Kendo.Mvc.UI;
    using System.Threading.Tasks;
    using System.Data;
    using Moq;
    using System.Collections;
    using System.Collections.Generic;
    using Microsoft.AspNetCore.Mvc.ModelBinding;

    public class ToDataSourceResultAsyncTests
    {
        private readonly DataSourceRequest dataSourceRequest;
        private readonly ModelStateDictionary modelState;
        private readonly Func<object, object> function;

        public ToDataSourceResultAsyncTests()
        {
            this.dataSourceRequest = new DataSourceRequest();
            this.modelState = new ModelStateDictionary();
            this.function = (data) => null;
        }

        [Fact]
        public async Task Should_return_DataSourceResult_with_Enumerable()
        {
            var enumerable = GetEnumerable();

            var result = await enumerable.ToDataSourceResultAsync(dataSourceRequest);

            result.ShouldBeType<DataSourceResult>();
        }

        [Fact]
        public async Task Should_return_DataSourceResult_with_Enumerable_and_ModelState()
        {
            var enumerable = GetEnumerable(); ;

            var result = await enumerable.ToDataSourceResultAsync(dataSourceRequest, modelState);

            result.ShouldBeType<DataSourceResult>();
        }

        [Fact]
        public async Task Should_return_DataSourceResult_with_Queryable()
        {
            var queryable = GetQueryable();;;

            var result = await queryable.ToDataSourceResultAsync(dataSourceRequest);

            result.ShouldBeType<DataSourceResult>();
        }

        [Fact]
        public async Task Should_return_DataSourceResult_with_Enumerable_and_Function()
        {
            var enumerable = GetEnumerable();

            var result = await enumerable.ToDataSourceResultAsync<object, object>(dataSourceRequest, function);

            result.ShouldBeType<DataSourceResult>();
        }

        [Fact]
        public async Task Should_return_DataSourceResult_with_Enumerable_ModelState_and_Function()
        {
            var enumerable = GetEnumerable();

            var result = await enumerable.ToDataSourceResultAsync<object, object>(dataSourceRequest, modelState, function);

            result.ShouldBeType<DataSourceResult>();
        }

        [Fact]
        public async Task Should_return_DataSourceResult_with_Queryable_and_Function()
        {
            var queryable = GetQueryable();;

            var result = await queryable.ToDataSourceResultAsync<object, object>(dataSourceRequest, function);

            result.ShouldBeType<DataSourceResult>();
        }

        [Fact]
        public async Task Should_return_DataSourceResult_with_Queryable_ModelState_and_Function()
        {
            var queryable = GetQueryable();

            var result = await queryable.ToDataSourceResultAsync<object, object>(dataSourceRequest, modelState, function);

            result.ShouldBeType<DataSourceResult>();
        }

        [Fact]
        public async Task Should_return_DataSourceResult_with_Queryable_and_ModelState()
        {
            var queryable = GetQueryable();

            var result = await queryable.ToDataSourceResultAsync(dataSourceRequest, modelState);

            result.ShouldBeType<DataSourceResult>();
        }

        private IEnumerable<object> GetEnumerable()
        {
            return new List<object>();
        }

        private IQueryable<object> GetQueryable()
        {
            return GetEnumerable().AsQueryable();
        }
    }
}
