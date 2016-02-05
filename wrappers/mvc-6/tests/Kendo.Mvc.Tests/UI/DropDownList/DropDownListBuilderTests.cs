using System;
using Xunit;
using Kendo.Mvc.UI.Fluent;
using Kendo.Mvc.Tests;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Tests
{
    public class DropDownListBuilderTests
    {
        private readonly DropDownList component;
        private readonly DropDownListBuilder builder;

        public DropDownListBuilderTests()
        {
            component = new DropDownList(TestHelper.CreateViewContext());
            builder = new DropDownListBuilder(component);
        }


        [Fact]
        public void BindTo_IEnumerable_method_sets_datasource_data_property()
        {
            var items = new List<string>() { "item 1", "item 2" };

            builder.BindTo(items);

            component.DataSource.Data.ShouldBeSameAs(items);
        }

        [Fact]
        public void BindTo_IEnumerable_method_returns_DropDownListBuilder()
        {
            builder.BindTo(new List<string>()).ShouldBeType<DropDownListBuilder>();
        }
    }
}