using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI.Fluent;
using System;
using Xunit;

namespace Kendo.Mvc.UI.Tests
{
    public class SpreadsheetTopFilterBuilderTests
    {
        private readonly SpreadsheetSheetFilterSettingsColumn column;
        private readonly SpreadsheetTopFilterBuilder builder;

        public SpreadsheetTopFilterBuilderTests()
        {
            column = new SpreadsheetSheetFilterSettingsColumn();
            builder = new SpreadsheetTopFilterBuilder(column);
        }

        [Fact]
        public void Index_sets_the_corresponding_property()
        {
            var value = 10.2;
            builder.Index(value);

            column.Index.ShouldEqual(value);
        }

        [Fact]
        public void Index_returns_correct_Builder()
        {
            builder.Index(10.2).ShouldBeType<SpreadsheetTopFilterBuilder>();
        }

        [Fact]
        public void Type_sets_the_corresponding_property()
        {
            foreach (SpreadsheetTopFilterType filterType in Enum.GetValues(typeof(SpreadsheetTopFilterType)))
            {
                builder.Type(filterType);

                column.Type.ShouldEqual(filterType.ToString().ToCamelCase());
            }
        }

        [Fact]
        public void Type_returns_correct_Builder()
        {
            builder.Type(SpreadsheetTopFilterType.TopNumber).ShouldBeType<SpreadsheetTopFilterBuilder>();
        }

        [Fact]
        public void Value_sets_the_corresponding_property()
        {
            var value = 10.2;
            builder.Value(value);

            column.Value.ShouldEqual(value);
        }

        [Fact]
        public void Value_returns_correct_Builder()
        {
            builder.Value(10.2).ShouldBeType<SpreadsheetTopFilterBuilder>();
        }
    }
}
