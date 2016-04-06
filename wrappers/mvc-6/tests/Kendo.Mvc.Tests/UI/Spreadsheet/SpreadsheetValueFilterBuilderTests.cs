using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI.Fluent;
using System;
using Xunit;

namespace Kendo.Mvc.UI.Tests
{
    public class SpreadsheetValueFilterBuilderTests
    {
        private readonly SpreadsheetSheetFilterSettingsColumn column;
        private readonly SpreadsheetValueFilterBuilder builder;

        public SpreadsheetValueFilterBuilderTests()
        {
            column = new SpreadsheetSheetFilterSettingsColumn();
            builder = new SpreadsheetValueFilterBuilder(column);
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
            builder.Index(10.2).ShouldBeType<SpreadsheetValueFilterBuilder>();
        }

        [Fact]
        public void Values_sets_the_corresponding_property()
        {
            var values = new object[] { 10.2, "string" };
            builder.Values(values);

            column.Values.ShouldEqual(values);
        }

        [Fact]
        public void Values_returns_correct_Builder()
        {
            builder.Values(new object[] { 10.2, "string" }).ShouldBeType<SpreadsheetValueFilterBuilder>();
        }
    }
}
