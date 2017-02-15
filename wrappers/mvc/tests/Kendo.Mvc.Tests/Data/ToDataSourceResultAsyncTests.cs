namespace Kendo.Mvc.Tests.Data
{
    using System;
    using System.Linq;
    using Kendo.Mvc.Extensions;
    using Xunit;
    using Kendo.Mvc.UI;
    using System.Threading.Tasks;
    using System.Data;
    using System.Web.Mvc;
    using Moq;
    using System.Collections;
    using System.Collections.Generic;

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
        public async Task Should_return_DataSourceResult_with_DataTable()
        {
            var dataTable = new DataTable();

            var result = await dataTable.ToDataSourceResultAsync(dataSourceRequest);

            result.ShouldBeType<DataSourceResult>();
        }

        [Fact]
        public async Task Should_return_DataSourceResult_with_Enumerable()
        {
            var enumerable = new Mock<IEnumerable>().Object;

            var result = await enumerable.ToDataSourceResultAsync(dataSourceRequest);

            result.ShouldBeType<DataSourceResult>();
        }

        [Fact]
        public async Task Should_return_DataSourceResult_with_Enumerable_and_ModelState()
        {
            var enumerable = new Mock<IEnumerable>().Object;

            var result = await enumerable.ToDataSourceResultAsync(dataSourceRequest, modelState);

            result.ShouldBeType<DataSourceResult>();
        }

        [Fact]
        public async Task Should_return_DataSourceResult_with_Queryable()
        {
            var queryable = new Mock<IQueryable>().Object;

            var result = await queryable.ToDataSourceResultAsync(dataSourceRequest);

            result.ShouldBeType<DataSourceResult>();
        }

        [Fact]
        public async Task Should_return_DataSourceResult_with_Enumerable_and_Function()
        {
            var enumerable = new Mock<IEnumerable<object>>().Object;

            var result = await enumerable.ToDataSourceResultAsync<object, object>(dataSourceRequest, function);

            result.ShouldBeType<DataSourceResult>();
        }

        [Fact]
        public async Task Should_return_DataSourceResult_with_Enumerable_ModelState_and_Function()
        {
            var enumerable = new Mock<IEnumerable<object>>().Object;

            var result = await enumerable.ToDataSourceResultAsync<object, object>(dataSourceRequest, modelState, function);

            result.ShouldBeType<DataSourceResult>();
        }

        [Fact]
        public async Task Should_return_DataSourceResult_with_Queryable_and_Function()
        {
            var queryable = new Mock<IQueryable<object>>().Object;

            var result = await queryable.ToDataSourceResultAsync<object, object>(dataSourceRequest, function);

            result.ShouldBeType<DataSourceResult>();
        }

        [Fact]
        public async Task Should_return_DataSourceResult_with_Queryable_ModelState_and_Function()
        {
            var queryable = new Mock<IQueryable<object>>().Object;

            var result = await queryable.ToDataSourceResultAsync<object, object>(dataSourceRequest, modelState, function);

            result.ShouldBeType<DataSourceResult>();
        }

        [Fact]
        public async Task Should_return_DataSourceResult_with_Queryable_and_ModelState()
        {
            var queryable = new Mock<IQueryable>().Object;

            var result = await queryable.ToDataSourceResultAsync(dataSourceRequest, modelState);

            result.ShouldBeType<DataSourceResult>();
        }
    }
}
