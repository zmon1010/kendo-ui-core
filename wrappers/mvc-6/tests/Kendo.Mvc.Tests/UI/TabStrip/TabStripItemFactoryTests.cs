using Xunit;
using Kendo.Mvc.UI.Fluent;
using Kendo.Mvc.Tests;
using System.Collections.Generic;
using Moq;

namespace Kendo.Mvc.UI.Tests
{
    public class TabStripItemFactoryTests
    {
        private readonly Mock<INavigationItemContainer<TabStripItem>> _container;
        private readonly IList<TabStripItem> _items;
        private readonly TabStripItemFactory _factory;

        public TabStripItemFactoryTests()
        {
            _items = new List<TabStripItem>();

            _container = new Mock<INavigationItemContainer<TabStripItem>>();
            _container.SetupGet(container => container.Items).Returns(_items);

            _factory = new TabStripItemFactory(_container.Object, TestHelper.CreateViewContext());
        }

        [Fact]
        public void Add_should_return_new_instance()
        {
            Assert.NotNull(_factory.Add());
        }

        [Fact]
        public void Add_should_register_new_instance_in_container()
        {
            _factory.Add();

            Assert.NotEmpty(_items);
        }
    }
}