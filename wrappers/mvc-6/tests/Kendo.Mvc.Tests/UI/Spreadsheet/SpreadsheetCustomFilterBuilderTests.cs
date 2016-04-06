using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI.Fluent;
using System;
using Xunit;

namespace Kendo.Mvc.UI.Tests
{
    public class SpreadsheetCustomFilterBuilderTests
    {
        private readonly SpreadsheetSheetFilterSettingsColumn column;
        private readonly SpreadsheetCustomFilterBuilder builder;

        public SpreadsheetCustomFilterBuilderTests()
        {
            column = new SpreadsheetSheetFilterSettingsColumn();
            builder = new SpreadsheetCustomFilterBuilder(column);
        }

        [Fact]
        public void Criteria_sets_the_corresponding_property()
        {
            builder.Criteria(c => c.Add().Operator(SpreadsheetFilterOperator.EndsWith).Value("value"));

            column.Criteria.Count.ShouldEqual(1);
        }

        [Fact]
        public void Criteria_returns_correct_Builder()
        {
            builder.Criteria(c => c.Add().Operator(SpreadsheetFilterOperator.EndsWith).Value("value"))
                .ShouldBeType<SpreadsheetCustomFilterBuilder>();
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
            builder.Index(10.2).ShouldBeType<SpreadsheetCustomFilterBuilder>();
        }

        [Fact]
        public void Logic_sets_the_corresponding_property()
        {
            foreach (SpreadsheetFilterLogic logic in Enum.GetValues(typeof(SpreadsheetFilterLogic)))
            {
                builder.Logic(logic);

                column.Logic.ShouldEqual(logic.ToString().ToCamelCase());
            }
        }

        [Fact]
        public void Type_returns_correct_Builder()
        {
            builder.Logic(SpreadsheetFilterLogic.Or).ShouldBeType<SpreadsheetCustomFilterBuilder>();
        }
    }
}
