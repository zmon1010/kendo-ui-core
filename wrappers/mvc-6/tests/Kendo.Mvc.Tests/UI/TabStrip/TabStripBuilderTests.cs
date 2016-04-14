using System;
using Xunit;
using Kendo.Mvc.UI.Fluent;
using Kendo.Mvc.Tests;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Tests
{
    public class TabStripBuilderTests
    {
        private readonly TabStrip component;
        private readonly TabStripBuilder builder;

        public TabStripBuilderTests()
        {
            component = new TabStrip(TestHelper.CreateViewContext());
            builder = new TabStripBuilder(component);
        }

        [Fact]
        public void Should_be_able_to_set_items()
        {
            builder.Items(item =>
            {
                item.Add();
                item.Add();
            }
                          );

            Assert.Equal(2, component.Items.Count);
        }

        [Fact]
        public void BintTo_for_IEnumerable_should_create_two_items()
        {
            List<TestObject> list = new List<TestObject>
                                    {
                                        new TestObject{Text="", Url=""},
                                        new TestObject{Text="", Url=""}
                                    };



            Action<TabStripItem, TestObject> action = (item, obj) => { if (!string.IsNullOrEmpty(obj.Url)) { item.Url = obj.Url; } };
            builder.BindTo(list, action);

            Assert.Equal(2, component.Items.Count);
        }

        [Fact]
        public void BintTo_for_IEnumerable_should_returnbuilder()
        {
            var returnedBuilder = builder.BindTo(new List<TestObject>(), (item, obj) => { });

            Assert.IsType(typeof(TabStripBuilder), returnedBuilder);
        }

        [Fact]
        public void ItemAction_should_set_ItemAction_property_of_panelBar()
        {
            Action<TabStripItem> action = (item) => { };
            builder.ItemAction(action);

            Assert.Equal(action, component.ItemAction);
        }

        [Fact]
        public void ItemAction_should_returnbuilder()
        {
            Action<TabStripItem> action = (item) => { };
            var returnedBuilder = builder.ItemAction(action);

            Assert.IsType(typeof(TabStripBuilder), returnedBuilder);
        }

        [Fact]
        public void SelectedIndex_should_set_SelectedIndex_property_of_PanelBar()
        {
            const int value = 0;

            builder.SelectedIndex(value);

            Assert.Equal(value, component.SelectedIndex);
        }

        [Fact]
        public void SelectedIndex_should_returnbuilder()
        {
            const int value = 0;
            var returnedBuilder = builder.SelectedIndex(value);

            Assert.IsType(typeof(TabStripBuilder), returnedBuilder);
        }

        [Fact]
        public void HighlightPath_should_set_HighlightPath_property_of_PanelBar()
        {
            const bool value = true;

            builder.HighlightPath(value);

            Assert.Equal(value, component.HighlightPath);
        }

        [Fact]
        public void HighlightPath_should_returnbuilder()
        {
            const bool value = true;
            var returnedBuilder = builder.HighlightPath(value);

            Assert.IsType(typeof(TabStripBuilder), returnedBuilder);
        }
    }
}