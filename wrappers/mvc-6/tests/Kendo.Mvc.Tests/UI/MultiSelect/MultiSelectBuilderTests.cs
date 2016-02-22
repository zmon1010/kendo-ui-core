using System;
using Xunit;
using Kendo.Mvc.UI.Fluent;
using Kendo.Mvc.Tests;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Tests
{
    public class MultiSelectBuilderTests
    {
        private readonly MultiSelect component;
        private readonly MultiSelectBuilder builder;

        public MultiSelectBuilderTests()
        {
            component = new MultiSelect(TestHelper.CreateViewContext());
            builder = new MultiSelectBuilder(component);
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
            builder.BindTo(new List<string>()).ShouldBeType<MultiSelectBuilder>();
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
        public void Items_method_returns_MultiSelectBuilder()
        {
            builder.Items(items => items.Add().Text("item 1")).ShouldBeType<MultiSelectBuilder>();
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
            builder.Animation(false).ShouldBeType<MultiSelectBuilder>();
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
            }).ShouldBeType<MultiSelectBuilder>();
        }
    }
}