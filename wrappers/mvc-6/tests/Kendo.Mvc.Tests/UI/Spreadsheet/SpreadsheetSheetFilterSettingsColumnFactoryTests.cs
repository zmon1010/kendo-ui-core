using Xunit;
using Kendo.Mvc.UI.Fluent;
using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Tests
{
    public class SpreadsheetSheetFilterSettingsColumnFactoryTests
    {
        private readonly List<SpreadsheetSheetFilterSettingsColumn> container;
        private readonly SpreadsheetSheetFilterSettingsColumnFactory factory;

        public SpreadsheetSheetFilterSettingsColumnFactoryTests()
        {
            container = new List<SpreadsheetSheetFilterSettingsColumn>();
            factory = new SpreadsheetSheetFilterSettingsColumnFactory(container);
        }

        [Fact]
        public void ValueFilter_adds_SpreadsheetSheetFilterSettingsColumn_with_correct_filter_type()
        {
            factory.ValueFilter(f => f.Index(10.2));

            container[0].Filter.ShouldEqual("value");
        }

        [Fact]
        public void ValueFilter_returns_correct_factory()
        {
            factory.ValueFilter(f => f.Index(10.2)).ShouldBeType<SpreadsheetSheetFilterSettingsColumnFactory>();
        }

        [Fact]
        public void TopFilter_adds_SpreadsheetSheetFilterSettingsColumn_with_correct_filter_type()
        {
            factory.TopFilter(f => f.Index(10.2));

            container[0].Filter.ShouldEqual("top");
        }

        [Fact]
        public void TopFilter_returns_correct_factory()
        {
            factory.TopFilter(f => f.Index(10.2)).ShouldBeType<SpreadsheetSheetFilterSettingsColumnFactory>();
        }

        [Fact]
        public void DynamicFilter_adds_SpreadsheetSheetFilterSettingsColumn_with_correct_filter_type()
        {
            factory.DynamicFilter(f => f.Index(10.2));

            container[0].Filter.ShouldEqual("dynamic");
        }

        [Fact]
        public void DynamicFilter_returns_correct_factory()
        {
            factory.DynamicFilter(f => f.Index(10.2)).ShouldBeType<SpreadsheetSheetFilterSettingsColumnFactory>();
        }

        [Fact]
        public void CustomFilter_adds_SpreadsheetSheetFilterSettingsColumn_with_correct_filter_type()
        {
            factory.CustomFilter(f => f.Index(10.2));

            container[0].Filter.ShouldEqual("custom");
        }

        [Fact]
        public void CustomFilter_returns_correct_factory()
        {
            factory.CustomFilter(f => f.Index(10.2)).ShouldBeType<SpreadsheetSheetFilterSettingsColumnFactory>();
        }
    }
}