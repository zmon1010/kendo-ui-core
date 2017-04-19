
namespace Kendo.Mvc.Tests.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.UI;
    using Mvc.UI.Fluent;
    using Xunit;
    using Microsoft.AspNetCore.Mvc.Rendering;

    public class ListBoxBuilderTests
    {
        private readonly ListBox component;
        private readonly ListBoxBuilder builder;

        public ListBoxBuilderTests()
        {
            component = new ListBox(TestHelper.CreateViewContext());
            builder = new ListBoxBuilder(component);
        }

        [Fact]
        public void BindTo_IEnumerable_method_sets_datasource_data_property()
        {
            var items = new List<string>() { "item 1", "item 2" };

            builder.BindTo(items);

            component.DataSource.Data.ShouldBeSameAs(items);
        }

        [Fact]
        public void BindTo_IEnumerable_method_returns_MultiSelectBuilder()
        {
            builder.BindTo(new List<string>()).ShouldBeType<ListBoxBuilder>();
        }

        [Fact]
        public void BindTo_IEnumerable_SelectListItem_method_returns_Sets_DataTextField_If_Not_Set()
        {
            builder.BindTo(new List<SelectListItem>());

            component.DataTextField.ShouldEqual("Text");
        }

        [Fact]
        public void BindTo_IEnumerable_SelectListItem_method_returns_Sets_DataValueField_If_Not_Set()
        {
            builder.BindTo(new List<SelectListItem>());

            component.DataValueField.ShouldEqual("Value");
        }
    }
}
