using Kendo.Mvc.UI.Fluent;
using System;
using Xunit;

namespace Kendo.Mvc.UI.Tests
{
    public class SpreadsheetSheetFilterSettingsColumnCriteriaBuilderTests
    {
        private readonly SpreadsheetSheetFilterSettingsColumnCriteria criteria;
        private readonly SpreadsheetSheetFilterSettingsColumnCriteriaBuilder builder;

        public SpreadsheetSheetFilterSettingsColumnCriteriaBuilderTests()
        {
            criteria = new SpreadsheetSheetFilterSettingsColumnCriteria();
            builder = new SpreadsheetSheetFilterSettingsColumnCriteriaBuilder(criteria);
        }

        [Fact]
        public void Value_with_string_sets_the_corresponding_property()
        {
            var stringValue = "StringValue";
            builder.Value(stringValue);

            criteria.Value.ShouldEqual(stringValue);
        }

        [Fact]
        public void Value_with_string_returns_correct_Builder()
        {
            builder.Value("StringValue").ShouldBeType<SpreadsheetSheetFilterSettingsColumnCriteriaBuilder>();
        }

        [Fact]
        public void Value_with_DateTime_sets_the_corresponding_property()
        {
            var dateTimeValue = DateTime.Now;
            builder.Value(dateTimeValue);

            criteria.Value.ShouldEqual(dateTimeValue);
        }

        [Fact]
        public void Value_with_DateTime_returns_correct_Builder()
        {
            builder.Value(DateTime.Now).ShouldBeType<SpreadsheetSheetFilterSettingsColumnCriteriaBuilder>();
        }

        [Fact]
        public void Value_with_double_sets_the_corresponding_property()
        {
            var doubleValue = 12.9;
            builder.Value(doubleValue);

            criteria.Value.ShouldEqual(doubleValue);
        }

        [Fact]
        public void Value_with_double_returns_correct_Builder()
        {
            builder.Value(12.9).ShouldBeType<SpreadsheetSheetFilterSettingsColumnCriteriaBuilder>();
        }
    }
}
