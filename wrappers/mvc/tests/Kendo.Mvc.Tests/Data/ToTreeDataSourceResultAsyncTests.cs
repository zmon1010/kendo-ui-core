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
    using System.Linq.Expressions;

    public class ToTreeDataSourceResultAsyncTests
    {
        private readonly DataSourceRequest dataSourceRequest;
        private readonly ModelStateDictionary modelState;
        private readonly Func<object, object> function;
        private readonly Expression<Func<object, object>> idSelector;
        private readonly Expression<Func<object, object>> parentIdSelector;
        private readonly Expression<Func<object, bool>> rootSelector;

        public ToTreeDataSourceResultAsyncTests()
        {
            this.dataSourceRequest = new DataSourceRequest();
            this.modelState = new ModelStateDictionary();
            this.function = (data) => null;
            this.idSelector = (data) => null;
            this.parentIdSelector = (data) => null;
            this.rootSelector = (data) => true;
        }

        [Fact]
        public async Task Should_return_TreeDataSourceResult_with_Enumerable()
        {
            var enumerable = new Mock<IEnumerable>().Object;

            var result = await enumerable.ToTreeDataSourceResultAsync(dataSourceRequest);

            result.ShouldBeType<TreeDataSourceResult>();
        }

        [Fact]
        public async Task Should_return_TreeDataSourceResult_with_Enumerable_and_ModelState()
        {
            var enumerable = new Mock<IEnumerable>().Object;

            var result = await enumerable.ToTreeDataSourceResultAsync(dataSourceRequest, modelState);

            result.ShouldBeType<TreeDataSourceResult>();
        }

        [Fact]
        public async Task Should_return_TreeDataSourceResult_with_Queryable_and_Function()
        {
            var queryable = new Mock<IQueryable<object>>().Object;

            var result = await queryable.ToTreeDataSourceResultAsync<object, object>(dataSourceRequest, function);

            result.ShouldBeType<TreeDataSourceResult>();
        }

        [Fact]
        public async Task Should_return_TreeDataSourceResult_with_Enumerable_and_Function()
        {
            var enumerable = new Mock<IEnumerable<object>>().Object;

            var result = await enumerable.ToTreeDataSourceResultAsync<object, object>(dataSourceRequest, function);

            result.ShouldBeType<TreeDataSourceResult>();
        }

        [Fact]
        public async Task Should_return_TreeDataSourceResult_with_Queryable_and_Two_Selectors()
        {
            var queryable = new Mock<IQueryable<object>>().Object;

            var result = await queryable.ToTreeDataSourceResultAsync<object, object, object>(dataSourceRequest, idSelector, parentIdSelector);

            result.ShouldBeType<TreeDataSourceResult>();
        }

        [Fact]
        public async Task Should_return_TreeDataSourceResult_with_Queryable_and_Three_Selectors()
        {
            var queryable = new Mock<IQueryable<object>>().Object;

            var result = await queryable.ToTreeDataSourceResultAsync<object, object, object>(
                dataSourceRequest, idSelector, parentIdSelector, rootSelector);

            result.ShouldBeType<TreeDataSourceResult>();
        }

        [Fact]
        public async Task Should_return_TreeDataSourceResult_with_Queryable_and_Multiple_Selectors()
        {
            var queryable = new Mock<IQueryable<object>>().Object;

            var result = await queryable.ToTreeDataSourceResultAsync<object, object, object, object>(
                dataSourceRequest, idSelector, parentIdSelector, rootSelector, function);

            result.ShouldBeType<TreeDataSourceResult>();
        }

        [Fact]
        public async Task Should_return_TreeDataSourceResult_with_Queryable_Three_Selectors_and_ModelState()
        {
            var queryable = new Mock<IQueryable<object>>().Object;

            var result = await queryable.ToTreeDataSourceResultAsync<object, object, object>(
                dataSourceRequest, idSelector, parentIdSelector, modelState);

            result.ShouldBeType<TreeDataSourceResult>();
        }

        [Fact]
        public async Task Should_return_TreeDataSourceResult_with_Queryable_Multiple_Selectors_and_ModelState()
        {
            var queryable = new Mock<IQueryable<object>>().Object;

            var result = await queryable.ToTreeDataSourceResultAsync<object, object, object>(
                dataSourceRequest, idSelector, parentIdSelector, rootSelector, modelState);

            result.ShouldBeType<TreeDataSourceResult>();
        }

        [Fact]
        public async Task Should_return_TreeDataSourceResult_with_Queryable_Three_Selectors_and_Function()
        {
            var queryable = new Mock<IQueryable<object>>().Object;

            var result = await queryable.ToTreeDataSourceResultAsync<object, object, object, object>(
                dataSourceRequest, idSelector, parentIdSelector, function);

            result.ShouldBeType<TreeDataSourceResult>();
        }

        [Fact]
        public async Task Should_return_TreeDataSourceResult_with_Queryable_ModelState_and_Function()
        {
            var queryable = new Mock<IQueryable<object>>().Object;

            var result = await queryable.ToTreeDataSourceResultAsync<object, object, object, object>(
                dataSourceRequest, idSelector, parentIdSelector, modelState, function);

            result.ShouldBeType<TreeDataSourceResult>();
        }

        [Fact]
        public async Task Should_return_TreeDataSourceResult_with_Queryable_Multiple_Selectors_ModelState_and_Function()
        {
            var queryable = new Mock<IQueryable<object>>().Object;

            var result = await queryable.ToTreeDataSourceResultAsync<object, object, object, object>(
                dataSourceRequest, idSelector, parentIdSelector, rootSelector, modelState, function);

            result.ShouldBeType<TreeDataSourceResult>();
        }

        [Fact]
        public async Task Should_return_TreeDataSourceResult_with_Enumerable_and_Two_Selectors()
        {
            var enumerable = new Mock<IEnumerable<object>>().Object;

            var result = await enumerable.ToTreeDataSourceResultAsync<object, object, object>(
                dataSourceRequest, idSelector, parentIdSelector);

            result.ShouldBeType<TreeDataSourceResult>();
        }

        [Fact]
        public async Task Should_return_TreeDataSourceResult_with_Enumerable_and_Three_Selectors()
        {
            var enumerable = new Mock<IEnumerable<object>>().Object;

            var result = await enumerable.ToTreeDataSourceResultAsync<object, object, object>(
                dataSourceRequest, idSelector, parentIdSelector, rootSelector);

            result.ShouldBeType<TreeDataSourceResult>();
        }

        [Fact]
        public async Task Should_return_TreeDataSourceResult_with_Enumerable_and_Multiple_Selectors()
        {
            var enumerable = new Mock<IEnumerable<object>>().Object;

            var result = await enumerable.ToTreeDataSourceResultAsync<object, object, object, object>(
                dataSourceRequest, idSelector, parentIdSelector, rootSelector, function);

            result.ShouldBeType<TreeDataSourceResult>();
        }

        [Fact]
        public async Task Should_return_TreeDataSourceResult_with_Enumerable_Three_Selectors_and_ModelState()
        {
            var enumerable = new Mock<IEnumerable<object>>().Object;

            var result = await enumerable.ToTreeDataSourceResultAsync<object, object, object>(
                dataSourceRequest, idSelector, parentIdSelector, modelState);

            result.ShouldBeType<TreeDataSourceResult>();
        }

        [Fact]
        public async Task Should_return_TreeDataSourceResult_with_Enumerable_Multiple_Selectors_and_ModelState()
        {
            var enumerable = new Mock<IEnumerable<object>>().Object;

            var result = await enumerable.ToTreeDataSourceResultAsync<object, object, object>(
                dataSourceRequest, idSelector, parentIdSelector, rootSelector, modelState);

            result.ShouldBeType<TreeDataSourceResult>();
        }

        [Fact]
        public async Task Should_return_TreeDataSourceResult_with_Enumerable_Two_Selectors_and_Function()
        {
            var enumerable = new Mock<IEnumerable<object>>().Object;

            var result = await enumerable.ToTreeDataSourceResultAsync<object, object, object, object>(
                dataSourceRequest, idSelector, parentIdSelector, function);

            result.ShouldBeType<TreeDataSourceResult>();
        }

        [Fact]
        public async Task Should_return_TreeDataSourceResult_with_Enumerable_Two_Selectors_ModelState_and_Function()
        {
            var enumerable = new Mock<IEnumerable<object>>().Object;

            var result = await enumerable.ToTreeDataSourceResultAsync<object, object, object, object>(
                dataSourceRequest, idSelector, parentIdSelector, modelState, function);

            result.ShouldBeType<TreeDataSourceResult>();
        }

        [Fact]
        public async Task Should_return_TreeDataSourceResult_with_Enumerable_Multiple_Selectors_ModelState_and_Function()
        {
            var enumerable = new Mock<IEnumerable<object>>().Object;

            var result = await enumerable.ToTreeDataSourceResultAsync<object, object, object, object>(
                dataSourceRequest, idSelector, parentIdSelector, rootSelector, modelState, function);

            result.ShouldBeType<TreeDataSourceResult>();
        }
    }
}
