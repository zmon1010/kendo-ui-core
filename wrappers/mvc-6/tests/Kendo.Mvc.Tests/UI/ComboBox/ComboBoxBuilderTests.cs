using System;
using Xunit;
using Kendo.Mvc.UI.Fluent;
using Kendo.Mvc.Tests;
using System.Collections.Generic;
using Microsoft.AspNet.Mvc.Rendering;

namespace Kendo.Mvc.UI.Tests
{
    public class ComboBoxBuilderTests
    {
        private readonly ComboBox component;
        private readonly ComboBoxBuilder builder;

        public ComboBoxBuilderTests()
        {
            component = new ComboBox(TestHelper.CreateViewContext());
            builder = new ComboBoxBuilder(component);
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
            builder.BindTo(new List<string>()).ShouldBeType<ComboBoxBuilder>();
        }

        [Fact]
        public void Items_method_sets_datasource_data_property()
        {
            builder.Items(items => {
                items.Add().Text("item 1");
                items.Add().Text("item 2");
            });

            component.DataSource.Data.ShouldNotBeEmpty();
        }

        [Fact]
        public void Items_method_returns_ComboBoxBuilder()
        {
            builder.Items(items => items.Add().Text("item 1")).ShouldBeType<ComboBoxBuilder>();
        }

        [Fact]
        public void Animation_bool_method_sets_animation_Enabled_property()
        {
            builder.Animation(false);

            component.Animation.Enabled.ShouldBeFalse();
        }

        [Fact]
        public void Animation_bool_method_returns_ComboBoxBuilder()
        {
            builder.Animation(false).ShouldBeType<ComboBoxBuilder>();
        }

        [Fact]
        public void Animation_settings_method_sets_animation_properties()
        {
            builder.Animation(animation =>
            {
                animation.Open(open =>
                {
                    open.SlideIn(SlideDirection.Down);
                });
            });

            component.Animation.Open.Container.Count.ShouldEqual(1);
        }

        [Fact]
        public void Animation_settings_method_returns_ComboBoxBuilder()
        {
            builder.Animation(animation =>
            {
                animation.Open(open =>
                {
                    open.SlideIn(SlideDirection.Down);
                });
            }).ShouldBeType<ComboBoxBuilder>();
        }
    }
}