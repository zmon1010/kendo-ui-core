using System.Linq;
using Xunit;
using Kendo.Mvc.UI.Fluent;

namespace Kendo.Mvc.UI.Tests.Grid
{
    public class GridFilterableSettingsTests
    {
        [Fact]
        public void Should_show_only_custom_filter_settings()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            var builder = new GridBuilder<Customer>(grid);

            builder.Filterable(f => f.Extra(false).Operators(o => o
                .ForString(str => str.Clear()
                    .Contains("ct")
                    .IsEqualTo("eq")
                    .StartsWith("st")))
            );

            builder.Columns(columns => columns.Bound(p => p.Name));
            
            var firstColumn = grid.Columns.First() as GridBoundColumn<Customer, string>;
            var operators = firstColumn.FilterableSettings.Operators.Strings.Operators;
            operators.Count().ShouldEqual(3);
        }
    }
}
