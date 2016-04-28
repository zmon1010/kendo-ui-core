using Xunit;
using Kendo.Mvc.UI.Fluent;
using Kendo.Mvc.Tests;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Tests
{
    public class AutoCompleteBuilderTests
    {
        private readonly AutoComplete component;
        private readonly AutoCompleteBuilder builder;

        public AutoCompleteBuilderTests()
        {
            component = new AutoComplete(TestHelper.CreateViewContext());
            builder = new AutoCompleteBuilder(component);
        }


        [Fact]
        public void BindTo_IEnumerable_method_sets_datasource_data_property()
        {
            var items = new List<string>() { "item 1", "item 2" };

            builder.BindTo(items);

            component.DataSource.Data.ShouldBeSameAs(items);
        }

        [Fact]
        public void BindTo_IEnumerable_method_returns_AutoCompleteBuilder()
        {
            builder.BindTo(new List<string>()).ShouldBeType<AutoCompleteBuilder>();
        }
        
        [Fact]
        public void Filter_with_enum_parameter_should_set_Filter_property()
        {
            var filterType = FilterType.EndsWith;

            builder.Filter(filterType);

            component.Filter.ShouldEqual(filterType.ToString());
        }

        [Fact]
        public void Filter_with_enum_parameter_should_return_builder()
        {
            builder.Filter(FilterType.EndsWith).ShouldBeType<AutoCompleteBuilder>();
        }
    }
}