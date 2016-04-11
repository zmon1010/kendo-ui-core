using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI.Fluent;
using System;
using Xunit;

namespace Kendo.Mvc.UI.Tests
{
    public class SpreadsheetDynamicFilterBuilderTests
    {
        private readonly SpreadsheetSheetFilterSettingsColumn column;
        private readonly SpreadsheetDynamicFilterBuilder builder;

        public SpreadsheetDynamicFilterBuilderTests()
        {
            column = new SpreadsheetSheetFilterSettingsColumn();
            builder = new SpreadsheetDynamicFilterBuilder(column);
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
            builder.Index(10.2).ShouldBeType<SpreadsheetDynamicFilterBuilder>();
        }

        [Fact]
        public void Type_sets_the_corresponding_property()
        {
            foreach (SpreadsheetDynamicFilterType filterType in Enum.GetValues(typeof(SpreadsheetDynamicFilterType)))
            {
                builder.Type(filterType);

                column.Type.ShouldEqual(filterType.ToString().ToCamelCase());
            }
        }

        [Fact]
        public void Type_returns_correct_Builder()
        {
            builder.Type(SpreadsheetDynamicFilterType.LastQuarter).ShouldBeType<SpreadsheetDynamicFilterBuilder>();
        }
    }
}
