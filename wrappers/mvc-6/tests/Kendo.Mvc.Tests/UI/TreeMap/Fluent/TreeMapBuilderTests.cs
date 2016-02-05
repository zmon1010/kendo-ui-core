using System;
using System.Collections.Generic;
using Kendo.Mvc.UI.Tests;
using Moq;
using Xunit;

namespace Kendo.Mvc.UI.Fluent.Tests
{
    public class TreeMapBuilderTests
    {
        private readonly TreeMap treeMap;
        private readonly TreeMapBuilder builder;

        public TreeMapBuilderTests()
        {
            treeMap = TreeMapTestHelper.CreateTreeMap();
            builder = new TreeMapBuilder(treeMap);
        }

        [Fact]
        public void DataSource_returns_builder()
        {
            builder.DataSource(delegate { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void AutoBind_sets_widget_autoBind()
        {
            var value = true;

            builder.AutoBind(value);

            treeMap.AutoBind.ShouldEqual(value);
        }

        [Fact]
        public void AutoBind_returns_builder()
        {
            builder.AutoBind(true).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Theme_sets_widget_theme()
        {
            var value = "value";

            builder.Theme(value);

            treeMap.Theme.ShouldEqual(value);
        }

        [Fact]
        public void Theme_returns_builder()
        {
            builder.Theme("value").ShouldBeSameAs(builder);
        }

        [Fact]
        public void ValueField_sets_widget_theme()
        {
            var value = "value";

            builder.ValueField(value);

            treeMap.ValueField.ShouldEqual(value);
        }

        [Fact]
        public void ValueField_returns_builder()
        {
            builder.ValueField("value").ShouldBeSameAs(builder);
        }

        [Fact]
        public void ColorField_sets_widget_theme()
        {
            var value = "value";

            builder.ColorField(value);

            treeMap.ColorField.ShouldEqual(value);
        }

        [Fact]
        public void ColorField_returns_builder()
        {
            builder.ColorField("value").ShouldBeSameAs(builder);
        }

        [Fact]
        public void TextField_sets_widget_theme()
        {
            var value = "value";

            builder.TextField(value);

            treeMap.TextField.ShouldEqual(value);
        }

        [Fact]
        public void TextField_returns_builder()
        {
            builder.TextField("value").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Template_sets_widget_theme()
        {
            var value = "value";

            builder.Template(value);

            treeMap.Template.ShouldEqual(value);
        }

        [Fact]
        public void Template_returns_builder()
        {
            builder.Template("value").ShouldBeSameAs(builder);
        }

        [Fact]
        public void TemplateId_sets_widget_theme()
        {
            var value = "value";

            builder.TemplateId(value);

            treeMap.TemplateId.ShouldEqual(value);
        }

        [Fact]
        public void TemplateId_returns_builder()
        {
            builder.TemplateId("value").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Colors_sets_widget_colors()
        {
            var colors = new string[] { "red", "green", "blue" };

            builder.Colors(colors);

            treeMap.Colors.ShouldBeSameAs(colors);
        }

        [Fact]
        public void Colors_returns_builder()
        {
            builder.Colors(new string[] { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Colors_sets_widget_colorRanges()
        {
            builder.Colors(colors => colors.AddRange("red", "green"));

            treeMap.ColorRanges.ShouldEqual(new List<string[]> { new string[] { "red", "green" } });
        }

        [Fact]
        public void ColorRanges_returns_builder()
        {
            builder.Colors(colors => colors.AddRange("red", "green")).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Type_sets_widget_type()
        {
            var type = TreeMapType.Squarified;

            builder.Type(type);

            treeMap.Type.ShouldEqual(type);
        }

        [Fact]
        public void Type_return_builder()
        {
            builder.Type(TreeMapType.Squarified).ShouldBeSameAs(builder);
        }
    }
}