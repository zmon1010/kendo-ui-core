namespace Kendo.Mvc.UI.Tests
{
    using Kendo.Mvc.Tests;
    using Xunit;
    using UI;

    public class GridScrollingSettingsTests
    {
        private Grid<Customer> grid;

        public GridScrollingSettingsTests()
        {
            grid = new Grid<Customer>(TestHelper.CreateViewContext());
        }

        [Fact]
        public void Should_serialize_virtual_if_set()
        {            
            grid.Scrollable.Enabled = true;
            grid.Scrollable.Virtual = true;

            var result = grid.Scrollable.ToJson();
            result.ContainsKey("virtual").ShouldBeTrue();
        }

        [Fact]
        public void Should__not_serialize_virtual_if_not_set()
        {         
            grid.Scrollable.Enabled = true;
            grid.Scrollable.Virtual = false;

            var result = grid.Scrollable.ToJson();
            result.ContainsKey("virtual").ShouldBeFalse();
        }   
    }
}
